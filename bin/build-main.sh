#!/bin/bash
node bin/build include dom core -o dist/temp.js
grunt main
rm -v dist/temp.js