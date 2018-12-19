#!/usr/bin/env bash
git reset --hard
git pull
echo "copy config file to current folder"
cp ~/config.js ./
chmod +x ./restart.sh
nodemon
