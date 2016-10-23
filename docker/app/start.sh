#!/bin/bash
set -e

. /update-env-vars.sh

if [ $DEPLOY_ENV = 'development' ]; then
    yarn install
fi

exec yarn start
