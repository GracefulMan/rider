#!/usr/bin/env bash
pm2 stop index.js
git reset --hard
git pull
echo "copy config file to current folder"
cp ~/config.js ./
chmod +x ./nodemon.sh
nodemon
