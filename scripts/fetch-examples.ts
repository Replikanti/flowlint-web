import fs from 'fs/promises';
import path from 'path';
import { Octokit } from '@octokit/rest';
import { RULES_METADATA, type RuleMetadata } from '@replikanti/flowlint-core';

const ORG = 'Replikanti';
const REPO = 'flowlint-examples';
const BRANCH = 'main';
const BASE_URL = `https://raw.githubusercontent.com/${ORG}/${REPO}/${BRANCH}`;
const OUT_FILE = path.join(process.cwd(), 'src', 'data', 'rule-examples.json');

// Use GITHUB_TOKEN if available (e.g., in CI), otherwise anonymous (rate limited)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

interface RuleExample extends RuleMetadata {
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

async function main() {
  console.log('Fetching rule examples from GitHub...');
  
  // Use metadata from core as the source of truth for rules
  const rules = RULES_METADATA;
  console.log(`Found ${rules.length} rules defined in core.`);

  const data: Record<string, RuleExample> = {};

  for (const rule of rules) {
    console.log(`Processing ${rule.id} (${rule.name})...`);
    const [readme, good, bad] = await Promise.all([
      fetchFileContent(rule.id, 'README.md'),
      fetchFileContent(rule.id, 'good-example.json'),
      fetchFileContent(rule.id, 'bad-example.json'),
    ]);

    data[rule.id] = {
      ...rule,
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