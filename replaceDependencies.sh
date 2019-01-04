#!/usr/bin/env bash

cat "${TRAVIS_BUILD_DIR}"/package.json | \
    jq -r '.dependencies = {"express": "^4.16.14"}' > "${TRAVIS_BUILD_DIR}"/package.json
