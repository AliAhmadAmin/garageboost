#!/bin/sh

# ensure we are in the right directory
cd /home/subhanallah/repositories/garageboost || exit 1

# discard any uncommitted changes; builds should never be committed
git reset --hard HEAD
git clean -fdx

# update from remote
git pull --rebase origin master || exit 1

# install/update packages
npm ci || exit 1

# build the app with extra memory (adjust as needed)
export NODE_OPTIONS="--max_old_space_size=4096"
npm run build || exit 1

# restart the process; try pm2 and fall back to npx-installed pm2
if command -v pm2 >/dev/null 2>&1; then
  pm2 restart garageboost || pm2 start npm --name garageboost -- start
else
  echo "pm2 not found; trying npx-installed pm2"
  # if the global install is not permitted, fall back to npx
  if npx pm2 --version >/dev/null 2>&1; then
    npx pm2 restart garageboost || npx pm2 start npm --name garageboost -- start
  else
    echo "installing pm2 locally as workaround"
    npm install pm2 --save-dev || echo "failed to install pm2"
    npx pm2 restart garageboost || npx pm2 start npm --name garageboost -- start
  fi
fi