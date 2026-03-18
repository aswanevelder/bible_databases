# Bible API

REST API serving 140+ Bible translations backed by PostgreSQL. Deployable to AWS Elastic Beanstalk.

## Quick start (local)

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure environment
cp .env.example .env
#    → set BIBLE_API_CONNSTR

# 3. Create the database
createdb bible_api

# 4. Run migration (creates tables)
npm run migrate

# 5. Import data (reads from ../formats/json/)
npm run import
#    Or a single translation: node scripts/import-data.js --translation KJV

# 6. Start the server
npm run dev
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/translations` | List all translations |
| GET | `/api/v1/translations/:code` | Translation metadata |
| GET | `/api/v1/translations/:code/books` | List books |
| GET | `/api/v1/translations/:code/books/:book` | Book info + chapter summary |
| GET | `/api/v1/translations/:code/books/:book/chapters/:chapter` | All verses in chapter |
| GET | `/api/v1/translations/:code/books/:book/chapters/:chapter/verses/:verse` | Single verse |
| GET | `/api/v1/translations/:code/books/:book/chapters/:chapter/verses/:verse?to=N` | Verse range |
| GET | `/api/v1/search?q=&translation=&book=&page=&limit=` | Full-text search |
| GET | `/api/v1/cross-references/:book/:chapter/:verse` | Cross-references |

**`:book`** accepts either a book number (`1`) or URL-encoded name (`Genesis`, `Song%20of%20Solomon`).

**Verse ranges** — add `?to=N` to return verses from `:verse` through `N` inclusive:

### Example requests

```
GET /api/v1/translations/KJV/books/Genesis/chapters/1
GET /api/v1/translations/KJV/books/1/chapters/1/verses/1
GET /api/v1/translations/ASV/books/John/chapters/3/verses/1?to=16
GET /api/v1/search?q=love+thy+neighbour&translation=KJV
GET /api/v1/cross-references/Genesis/1/1
```

## Deploy to Elastic Beanstalk

### Prerequisites
- AWS CLI + EB CLI installed
- An RDS PostgreSQL instance in the same VPC (or publicly accessible)

### Steps

```bash
# Initialise EB application (first time)
eb init bible-api --platform node.js --region us-east-1

# Set environment variables
eb setenv \
  NODE_ENV=production \
  BIBLE_API_CONNSTR="Server=xxxx.rds.amazonaws.com;Database=bible_api;Port=5432;User Id=admin;Password=secret;SSL Mode=require;" \
  RATE_LIMIT_MAX=300

# Create environment and deploy
eb create bible-api-prod --instance-type t3.small

# Run migration against RDS (from your local machine)
DATABASE_URL=postgresql://... npm run migrate

# Import data (run once against RDS — can take 20-40 min for all 140 translations)
DATABASE_URL=postgresql://... npm run import

# Deploy updates
eb deploy
```

### Environment variables

| Variable | Description |
|----------|-------------|
| `BIBLE_API_CONNSTR` | **Required.** ADO.NET-style connection string |
| `PORT` | Listening port (default `3000`) |
| `NODE_ENV` | `development` or `production` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms (default `900000` = 15 min) |
| `RATE_LIMIT_MAX` | Max requests per window (default `300`) |

**Connection string examples:**
```
# Local (no auth)
BIBLE_API_CONNSTR="Server=localhost;Database=bible_api;Port=5432;"

# With credentials
BIBLE_API_CONNSTR="Server=localhost;Database=bible_api;Port=5432;User Id=anton;Password=secret;"

# AWS RDS
BIBLE_API_CONNSTR="Server=xxxx.us-east-1.rds.amazonaws.com;Database=bible_api;Port=5432;User Id=admin;Password=secret;SSL Mode=require;"
```

Supported keys: `Server`, `Port`, `Database`, `User Id`, `Password`, `SSL Mode` (`disable` / `require` / `verify-full`).

## Data import options

```bash
# All translations + cross-references
node scripts/import-data.js

# Translations only (skip cross-references)
node scripts/import-data.js --translations-only

# Cross-references only
node scripts/import-data.js --xref-only

# Single translation
node scripts/import-data.js --translation KJV

# Custom source directory
BIBLE_JSON_DIR=/path/to/formats/json node scripts/import-data.js
```

The import is **idempotent** — safe to re-run. Already-imported translations are skipped.

## Database schema

```
translations  (id, code, title, license)
books         (id, translation_id, book_number, name)
verses        (id, book_id, chapter, verse, text, search_vector)
cross_references (id, from_book, from_chapter, from_verse,
                  to_book, to_chapter, to_verse_start, to_verse_end, votes)
```

Full-text search uses a PostgreSQL `tsvector` generated column with a GIN index.
Requires PostgreSQL 12+.
