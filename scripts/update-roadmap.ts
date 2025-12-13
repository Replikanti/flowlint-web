import fs from 'fs/promises';
import path from 'path';
import OpenAI from 'openai';

// Configuration
const REPOS = [
  'flowlint-core',
  'flowlint-cli',
  'flowlint-chrome',
  'flowlint-github-app'
];
const ORG = 'Replikanti';
const BRANCH = 'main';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ROADMAP_PATH = path.join(process.cwd(), 'ROADMAP.md');

if (!OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not set');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function fetchChangelog(repo: string): Promise<string> {
  const url = `https://raw.githubusercontent.com/${ORG}/${repo}/${BRANCH}/CHANGELOG.md`;
  console.log(`Fetching CHANGELOG for ${repo} from ${url}...`);
  
  const headers: Record<string, string> = {};
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      console.warn(`Failed to fetch CHANGELOG for ${repo}: ${response.status} ${response.statusText}`);
      return '';
    }
    const text = await response.text();
    
    // Extract the latest version entry
    // Assumes standard Keep A Changelog / Release Please format: "## [Version] - Date"
    const latestVersionMatch = text.match(/## \[.*?\](.*?)- \d{4}-\d{2}-\d{2}[\s\S]*?(?=## \[|$)/);
    if (latestVersionMatch) {
        return `### ${repo} Latest Changes:\n${latestVersionMatch[0]}\n`;
    }
    
    return `### ${repo}: No recent changes detected in changelog format.\n`;
  } catch (error) {
    console.warn(`Error fetching ${repo}:`, error);
    return '';
  }
}

async function main() {
  try {
    const roadmapContent = await fs.readFile(ROADMAP_PATH, 'utf-8');
    
    console.log('Fetching changelogs from all repositories...');
    const changelogs = await Promise.all(REPOS.map(fetchChangelog));
    const combinedChangelogs = changelogs.join('\n\n');

    console.log('Analyzing changes with AI...');

    const prompt = `
You are a Product Manager for FlowLint. Your goal is to update the ROADMAP.md based on the latest released features across the entire platform.

Context:
- We have multiple components: Core, CLI, Chrome Extension, and GitHub App.
- Below are the LATEST changelog entries from all these repositories.
- Use the current date (${new Date().toISOString().split('T')[0]}) to identify the current Quarter (e.g., Q4 2025).

Input Data:
"""
${combinedChangelogs}
"""

Current ROADMAP.md:
"""
${roadmapContent}
"""

Instructions:
1. Analyze the changelogs to identify COMPLETED business features.
2. Look at the "current quarter" section in the ROADMAP (and potentially previous quarters if items were late).
3. Mark corresponding items as completed (change "- [ ]" to "- [x]").
4. If a major feature was completed but isn't listed, you may add it to the current quarter's section as a completed item.
5. STRICTLY PRESERVE the existing structure, future items, and formatting of the ROADMAP. Only change checkboxes or add completed items.
6. Return ONLY the full updated content of ROADMAP.md. Do not include markdown code fences.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Using a smarter model for complex context
      messages: [
        { role: 'system', content: 'You are a helpful assistant that manages product roadmaps.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1, // Low temperature for stability
    });

    const updatedRoadmap = response.choices[0].message.content?.trim();

    if (updatedRoadmap) {
      // Basic sanity check
      if (updatedRoadmap.length < roadmapContent.length * 0.5) {
        throw new Error('Safety check failed: Generated roadmap is significantly shorter than original.');
      }

      await fs.writeFile(ROADMAP_PATH, updatedRoadmap, 'utf-8');
      console.log('ROADMAP.md updated successfully based on cross-repo changes.');
    } else {
      console.error('Failed to generate updated roadmap.');
      process.exit(1);
    }

  } catch (error) {
    console.error('Error updating roadmap:', error);
    process.exit(1);
  }
}

main();
