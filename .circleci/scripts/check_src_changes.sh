#!/bin/bash
set -euo pipefail

echo "🔍 Checking for src/ or Dockerfile changes..."

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Not a git repository. Exiting."
  echo "false" > build_flag.txt
  exit 0
fi

BASE_BRANCH="${BASE_BRANCH:-main}"

# Fetch latest info to compare properly
git fetch origin "${BASE_BRANCH}" --depth=1 || true

# Compare changed files
CHANGED_FILES=$(git diff --name-only "origin/${BASE_BRANCH}"...HEAD || true)

if echo "$CHANGED_FILES" | grep -E '^(src/|Dockerfile)'; then
  echo "✅ Detected changes in src/ or Dockerfile."
  echo "true" > build_flag.txt
else
  echo "🟡 No relevant changes detected."
  echo "false" > build_flag.txt
fi
