import fs from 'fs/promises';
import path from 'path';
import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CHANGELOG_PATH = path.join(process.cwd(), 'CHANGELOG.md');
const ROADMAP_PATH = path.join(process.cwd(), 'ROADMAP.md');

if (!OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not set');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function main() {
  try {
    const changelogContent = await fs.readFile(CHANGELOG_PATH, 'utf-8');
    const roadmapContent = await fs.readFile(ROADMAP_PATH, 'utf-8');

    // Extract the latest version entry from Changelog
    // Assumes "## [Version]" format
    const latestVersionMatch = changelogContent.match(/## \[.*?\].*?- \d{4}-\d{2}-\d{2}[\s\S]*?(?=## \[|$)/);
    const latestChanges = latestVersionMatch ? latestVersionMatch[0] : 'No recent changes found';

    console.log('Analyzing latest changes...');

    const prompt = `
You are a Product Manager for FlowLint. Your goal is to update the ROADMAP.md based on the latest released changes.

Context:
- We just released a new version.
- Here is the changelog snippet for this version:
"""
${latestChanges}
"""

- Here is the current ROADMAP.md:
"""
${roadmapContent}
"""

Instructions:
1. Analyze the changelog to identify completed features.
2. Mark corresponding items in the ROADMAP.md as completed (change "- [ ]" to "- [x]").
3. If a feature was completed but isn't on the roadmap, add it to a "Recently Completed" or relevant section, or just ignore if it's too minor.
4. Do NOT remove future items.
5. Return ONLY the full updated content of ROADMAP.md. Do not include markdown code fences (like 
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-5.1',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that manages product roadmaps.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
    });

    const updatedRoadmap = response.choices[0].message.content?.trim();

    if (updatedRoadmap) {
      // Basic sanity check to ensure we didn't lose too much content
      if (updatedRoadmap.length < roadmapContent.length * 0.5) {
        throw new Error('Safety check failed: Generated roadmap is significantly shorter than original.');
      }

      await fs.writeFile(ROADMAP_PATH, updatedRoadmap, 'utf-8');
      console.log('ROADMAP.md updated successfully.');
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