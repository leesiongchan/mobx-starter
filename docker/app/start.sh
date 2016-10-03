#!/bin/bash
set -e

. /update-env-vars.sh

if [ $DEPLOY_ENV = 'development' ]; then
    npm install
elif [ "$DEPLOY_ENV" = 'production' ]; then
    npm run build
fi

exec npm start
