#!/bin/bash

# Script to render and serve a local version of the website
# for technical users.

mkdir -p localhost
cd localhost
if [[ -d "tmp" ]]; then
  echo "tmp docusaurus install already exists, not installing."
else
  npx @docusaurus/init@latest init tmp classic
fi
cp ../site/config/docusaurus/docusaurus.config.js ./tmp
cp -r ../authenticated-cloud-docs/dmgt-symlinks-plugin ./tmp
cd ./tmp
rm -rf sidebars.js docs src static  # Remove default content including conflicting ./src/pages/index.js
ln -s ../../site/content/* .  # Get docs, src, and static from our content directory
npm run build
npm run serve
