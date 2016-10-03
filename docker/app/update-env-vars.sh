#!/bin/bash
set -e

echo '' > ~/.env

if [ "$DEPLOY_ENV" = 'development' ]; then
    export NODE_ENV=development
    echo "NODE_ENV=$NODE_ENV" >> ~/.env
elif [ "$DEPLOY_ENV" = 'production' ]; then
    export NODE_ENV=production
    echo "NODE_ENV=$NODE_ENV" >> ~/.env
fi
