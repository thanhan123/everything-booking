#!/bin/bash
set -euo pipefail

if [ ! -f build_flag.txt ]; then
  echo "⚠️ build_flag.txt not found. Assuming no changes."
  echo "false" > build_flag.txt
fi

BUILD_FLAG=$(cat build_flag.txt)
echo "📦 Build flag: ${BUILD_FLAG}"

if [ "${BUILD_FLAG}" = "false" ]; then
  echo "🟡 No relevant changes detected, skipping this job."
  circleci step halt
fi
