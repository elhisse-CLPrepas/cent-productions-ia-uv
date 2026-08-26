#!/usr/bin/env bash
set -euo pipefail

mkdir -p targets/github-pages/public/data targets/github-pages/public/config release
cp public/data/projects.json targets/github-pages/public/data/projects.json
cp public/data/dashboard.json targets/github-pages/public/data/dashboard.json
cp targets/github-pages/portal.pages.json targets/github-pages/public/config/portal.json
./node_modules/.bin/vite build targets/github-pages --config targets/github-pages/vite.config.js

