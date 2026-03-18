#!/usr/bin/env bash
# Creates a zip archive ready for manual upload to Elastic Beanstalk.
# Usage: ./deploy-eb.sh [version]
# Example: ./deploy-eb.sh 1.0.2

set -euo pipefail

VERSION=${1:-$(date +"%Y%m%d-%H%M%S")}
OUT="bible-api-${VERSION}.zip"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Building EB deployment package: ${OUT}"

cd "${SCRIPT_DIR}"

zip -r "${OUT}" \
  src/ \
  scripts/ \
  migrations/ \
  .ebextensions/ \
  package.json \
  package-lock.json \
  Procfile \
  .env.example \
  --exclude "*.DS_Store" \
  --exclude "*__pycache__*"

echo ""
echo "Done: ${SCRIPT_DIR}/${OUT}"
echo "Size: $(du -sh "${OUT}" | cut -f1)"
echo ""
echo "Upload this file in the AWS Console:"
echo "  Elastic Beanstalk → Your environment → Upload and deploy"
