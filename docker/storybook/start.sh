#!/bin/bash
set -e

. /update-env-vars.sh

yarn install

exec yarn run storybook
