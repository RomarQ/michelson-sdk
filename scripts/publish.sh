#!/bin/sh

set -e

# Build
yarn build

# Package & Publish
cp package.json README.md dist
cd dist
npm publish "$(npm pack)"
