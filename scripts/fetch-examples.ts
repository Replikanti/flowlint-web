import fs from 'fs/promises';
import path from 'path';
import { Octokit } from '@octokit/rest';

const ORG = 'Replikanti';
const REPO = 'flowlint-examples';
const BRANCH = 'main';
const BASE_URL = `https://raw.githubusercontent.com/${ORG}/${REPO}/${BRANCH}`;
const OUT_FILE = path.join(process.cwd(), 'src', 'data', 'rule-examples.json');

// Use GITHUB_TOKEN if available (e.g., in CI), otherwise anonymous (rate limited)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

interface RuleExample {
  id: string;
  readme: string;
  good: string;
  bad: string;
}

async function fetchFileContent(ruleId: string, filename: string): Promise<string> {
  const url = `${BASE_URL}/${ruleId}/${filename}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 404) return ''; // File missing is okay-ish
        throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }
    return await res.text();
  } catch (error) {
    console.warn(`Warning: Could not fetch ${filename} for ${ruleId}:`, error);
    return '';
  }
}

async function getRuleFolders(): Promise<string[]> {
  try {
    const { data } = await octokit.repos.getContent({
      owner: ORG,
      repo: REPO,
      path: '', // List root contents
      ref: BRANCH,
    });

    if (!Array.isArray(data)) {
      throw new Error('Unexpected API response for repo content.');
    }

    // Filter for directories starting with 'R'
    const ruleFolders = data
      .filter(item => item.type === 'dir' && item.name.match(/^R\d+$/))
      .map(item => item.name)
      .sort((a, b) => parseInt(a.substring(1)) - parseInt(b.substring(1))); // Sort numerically

    return ruleFolders;
  } catch (error) {
    console.error('Error fetching rule folders from GitHub API:', error);
    process.exit(1); // Exit if we can't get the list of rules
  }
}

async function main() {
  console.log('Fetching list of rule folders from GitHub...');
  const ruleFolders = await getRuleFolders();
  console.log('Found rule folders:', ruleFolders.join(', '));

  console.log('Fetching rule examples from GitHub...');
  const data: Record<string, RuleExample> = {};

  for (const ruleId of ruleFolders) {
    console.log(`Processing ${ruleId}...`);
    const [readme, good, bad] = await Promise.all([
      fetchFileContent(ruleId, 'README.md'),
      fetchFileContent(ruleId, 'good-example.json'),
      fetchFileContent(ruleId, 'bad-example.json'),
    ]);

    data[ruleId] = {
      id: ruleId,
      readme,
      good,
      bad
    };
  }

  // Ensure directory exists
  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  
  await fs.writeFile(OUT_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Examples saved to ${OUT_FILE}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});