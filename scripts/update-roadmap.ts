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
const ROADMAP_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'roadmap.json');

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
    const roadmapJsonContent = await fs.readFile(ROADMAP_JSON_PATH, 'utf-8');
    const roadmapData = JSON.parse(roadmapJsonContent);
    
    console.log('Fetching changelogs from all repositories...');
    const changelogs = await Promise.all(REPOS.map(fetchChangelog));
    const combinedChangelogs = changelogs.join('\n\n');

    console.log('Analyzing changes with AI...');

    const prompt = `
You are a Product Manager for FlowLint. Your goal is to update the roadmap data (JSON) based on the latest released features across the entire platform.

Context:
- We have multiple components: Core, CLI, Chrome Extension, and GitHub App.
- Below are the LATEST changelog entries from all these repositories.
- Use the current date (${new Date().toISOString().split('T')[0]}) as "lastUpdated".
- Current Quarter is Q4 2025.

Input Data (Changelogs):
"""
${combinedChangelogs}
"""

Current Roadmap JSON:
"""
${JSON.stringify(roadmapData, null, 2)}
"""

Instructions:
1. Analyze the changelogs to identify COMPLETED business features.
2. If a feature listed in "in-progress" or "planned" is completed, MOVE it to the "shipped" section.
3. If a major NEW feature was completed but isn't listed, ADD it to "shipped".
4. If there are no relevant updates for a section, keep it exactly as is.
5. "shipped" items should generally stay in "shipped".
6. Return ONLY the valid JSON object. Do not include markdown formatting or code blocks.
7. Ensure strict JSON validity.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-5.1',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that manages product roadmaps in JSON format. Return only raw JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    const updatedRoadmapJson = response.choices[0].message.content?.trim();

    if (updatedRoadmapJson) {
      // Validate JSON
      const parsed = JSON.parse(updatedRoadmapJson);
      
      // Basic sanity check
      if (!parsed.sections || !Array.isArray(parsed.sections)) {
         throw new Error('Invalid JSON structure: missing sections array');
      }

      await fs.writeFile(ROADMAP_JSON_PATH, JSON.stringify(parsed, null, 2), 'utf-8');
      console.log('src/data/roadmap.json updated successfully.');
    } else {
      console.error('Failed to generate updated roadmap JSON.');
      process.exit(1);
    }

  } catch (error) {
    console.error('Error updating roadmap:', error);
    process.exit(1);
  }
}

main();