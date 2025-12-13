import fs from 'fs/promises';
import path from 'path';

const ORG = 'Replikanti';
const REPO = 'flowlint-examples';
const BRANCH = 'main';
const BASE_URL = `https://raw.githubusercontent.com/${ORG}/${REPO}/${BRANCH}`;
const OUT_FILE = path.join(process.cwd(), 'src', 'data', 'rule-examples.json');

// Rules range to fetch
const RULES = Array.from({ length: 14 }, (_, i) => `R${i + 1}`);

interface RuleExample {
  id: string;
  readme: string;
  good: string;
  bad: string;
}

async function fetchFile(rule: string, filename: string): Promise<string> {
  const url = `${BASE_URL}/${rule}/${filename}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 404) return ''; // File missing is okay-ish
        throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }
    return await res.text();
  } catch (error) {
    console.warn(`Warning: Could not fetch ${filename} for ${rule}`, error);
    return '';
  }
}

async function main() {
  console.log('Fetching rule examples from GitHub...');
  const data: Record<string, RuleExample> = {};

  for (const rule of RULES) {
    console.log(`Processing ${rule}...`);
    const [readme, good, bad] = await Promise.all([
      fetchFile(rule, 'README.md'),
      fetchFile(rule, 'good-example.json'),
      fetchFile(rule, 'bad-example.json'),
    ]);

    data[rule] = {
      id: rule,
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
