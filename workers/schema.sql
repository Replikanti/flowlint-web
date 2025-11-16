-- Cloudflare D1 Database Schema for FlowLint Support Requests

CREATE TABLE IF NOT EXISTS support_requests (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  repository TEXT,
  timestamp TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  response TEXT,
  responded_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_email ON support_requests(email);
CREATE INDEX IF NOT EXISTS idx_status ON support_requests(status);
CREATE INDEX IF NOT EXISTS idx_created_at ON support_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_issue_type ON support_requests(issue_type);

-- Create view for open requests
CREATE VIEW IF NOT EXISTS open_requests AS
SELECT
  id,
  name,
  email,
  issue_type,
  title,
  description,
  repository,
  created_at,
  updated_at
FROM support_requests
WHERE status = 'new'
ORDER BY created_at DESC;
