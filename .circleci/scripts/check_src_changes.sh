#!/bin/bash
set -e

echo "🔍 Checking for source or Dockerfile changes since previous commit..."

# Get the previous commit
BASE_REVISION=$(git rev-parse HEAD~1)
CURRENT_REVISION=$(git rev-parse HEAD)

echo "Comparing ${BASE_REVISION}...${CURRENT_REVISION}"

# Default to no build
BUILD_FLAG=false

# Check for file changes in src/ or Dockerfile between last two commits
if git diff --name-only "$BASE_REVISION" "$CURRENT_REVISION" | grep -E '^(src/|Dockerfile)'; then
  BUILD_FLAG=true
fi

# Save build flag result
echo "${BUILD_FLAG}" > build_flag.txt

echo "✅ Build flag set to: ${BUILD_FLAG}"

