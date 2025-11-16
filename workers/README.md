# FlowLint Support Worker

Cloudflare Worker for handling FlowLint web support form submissions.

## Features

- **Form Processing**: Receives support form submissions from the web frontend
- **Email Notifications**: Sends email notifications via SendGrid (optional)
- **Database Storage**: Stores requests in Cloudflare D1 (optional)
- **CORS Support**: Properly handles cross-origin requests
- **Error Handling**: Comprehensive error handling and validation
- **Type-Safe**: Full TypeScript support

## Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` to set your Cloudflare Worker endpoint:

```env
VITE_SUPPORT_ENDPOINT=https://support.flowlint.dev/submit
```

### 3. Configure Cloudflare Worker Secrets

Set the following secrets via `wrangler secret put`:

```bash
# SendGrid API key (required for email sending)
wrangler secret put SENDGRID_API_KEY

# Support email address (required for email sending)
# Already set in wrangler.toml as a var: SUPPORT_EMAIL
```

### 4. Configure D1 Database (Optional)

If you want to store support requests in a database:

```bash
# Create the D1 database
wrangler d1 create flowlint-support

# Initialize the schema
wrangler d1 execute flowlint-support --file workers/schema.sql

# Bind the database in wrangler.toml:
# [[d1_databases]]
# binding = "SUPPORT_DB"
# database_name = "flowlint-support"
# database_id = "your-db-id"
```

## API Endpoints

### POST /submit

Submit a new support request.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "issueType": "bug",
  "title": "Bug title",
  "description": "Bug description",
  "repository": "owner/repo",
  "timestamp": "2025-11-16T10:30:00Z"
}
```

**Issue Types:**
- `bug` - Bug Report
- `feature` - Feature Request
- `question` - Question
- `installation` - Installation Help
- `configuration` - Configuration Issue
- `false-positive` - False Positive
- `performance` - Performance Issue
- `other` - Other

**Response Success (200):**

```json
{
  "success": true,
  "message": "Support request received successfully",
  "timestamp": "2025-11-16T10:30:00Z"
}
```

**Response Error (400/500):**

```json
{
  "error": "Error message",
  "details": "Additional details if available"
}
```

## Development

### Local Testing

```bash
# Start local development server
wrangler dev

# The worker will run on http://localhost:8787
```

### Test with cURL

```bash
curl -X POST http://localhost:8787/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "issueType": "question",
    "title": "Test Question",
    "description": "This is a test",
    "timestamp": "2025-11-16T10:00:00Z"
  }'
```

## Deployment

### Deploy to Production

```bash
# Deploy to production
wrangler deploy

# Deploy to staging
wrangler deploy --env staging
```

### Configure DNS Routes

In your Cloudflare dashboard:

1. Go to Workers Routes
2. Add route: `https://support.flowlint.dev/submit`
3. Service: `flowlint-support`
4. Zone: `flowlint.dev`

## Architecture

```
Frontend (Support.tsx)
        ↓
   fetch() to POST /submit
        ↓
  Cloudflare Worker
        ├─→ Validate input
        ├─→ Store in D1 (if configured)
        └─→ Send email via SendGrid (if configured)
        ↓
  Return success/error response
```

## Implementation Notes

1. **No Authentication**: Currently, the endpoint is public. Consider adding rate limiting or authentication if needed.

2. **SendGrid Alternative**: Instead of SendGrid, you can integrate with:
   - Resend
   - Mailgun
   - AWS SES
   - Custom email service

3. **Database**: D1 is optional. You can use:
   - Cloudflare D1 (native)
   - Supabase PostgreSQL
   - MongoDB
   - Any REST API-based backend

4. **CORS**: The worker accepts requests from any origin (`Access-Control-Allow-Origin: *`). Restrict this if needed.

## Troubleshooting

### "SendGrid not configured" error

- Ensure `SENDGRID_API_KEY` is set: `wrangler secret put SENDGRID_API_KEY`
- Ensure `SUPPORT_EMAIL` is set in wrangler.toml
- Check SendGrid dashboard for API key validity

### Database errors

- Ensure D1 database is created: `wrangler d1 create flowlint-support`
- Ensure schema is initialized: `wrangler d1 execute flowlint-support --file workers/schema.sql`
- Check binding name matches in wrangler.toml

### CORS errors in frontend

- Verify worker URL in `VITE_SUPPORT_ENDPOINT`
- Check browser console for exact error
- Ensure OPTIONS preflight request is handled (already implemented)

## Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [SendGrid Email API](https://sendgrid.com/docs/)
