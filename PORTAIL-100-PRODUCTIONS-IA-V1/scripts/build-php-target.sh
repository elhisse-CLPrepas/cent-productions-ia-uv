#!/usr/bin/env bash
set -euo pipefail

if [ ! -f release/github-pages/index.html ]; then
  bash scripts/build-github-pages.sh
fi

rm -rf release/php-portal
mkdir -p release/php-portal/api release/php-portal/data release/php-portal/config
cp -R release/github-pages/. release/php-portal/
cp php-api/api/*.php release/php-portal/api/
cp php-api/api/.htaccess release/php-portal/api/.htaccess
cp public/data/projects.json release/php-portal/data/projects.json
cp public/data/dashboard.json release/php-portal/data/dashboard.json
cp php-api/config/portal.php.json release/php-portal/config/portal.json
cp php-api/README.md release/php-portal/README-PHP.md

