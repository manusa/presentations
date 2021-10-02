#!/usr/bin/env bash

mv package.json tmp-package.json
cat tmp-package.json \
    | jq -r '.dependencies = {"express": "^4.17.1"}' | cat > package.json
rm tmp-package.json
