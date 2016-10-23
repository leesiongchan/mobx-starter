#!/bin/bash
set -e

. /update-env-vars.sh

if [ $DEPLOY_ENV = 'development' ]; then
    yarn install
elif [ "$DEPLOY_ENV" = 'production' ]; then
    yarn run build
fi

exec yarn start
