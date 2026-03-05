#!/bin/sh
cd /home/subhanallah/repositories/garageboost

# grab latest commits
git pull --rebase origin master

# install or update dependencies
npm ci

# build the app
npm run build

# restart your Node process (pm2, systemd, etc.)
pm2 restart garageboost   # or however you run it