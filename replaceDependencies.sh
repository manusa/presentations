#!/usr/bin/env bash

mv "${TRAVIS_BUILD_DIR}"/package.json "${TRAVIS_BUILD_DIR}"/tmp-package.json
cat "${TRAVIS_BUILD_DIR}"/tmp-package.json \
    | jq -r '.dependencies = {"express": "^4.16.4"}' | cat > "${TRAVIS_BUILD_DIR}"/package.json
rm "${TRAVIS_BUILD_DIR}"/tmp-package.json
