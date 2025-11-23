/**
 * ESLint on staged source files before commit.
 */
export default {
  '*.{ts,tsx,js,jsx}': 'eslint --fix --max-warnings=0'
};
