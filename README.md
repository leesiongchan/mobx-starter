# Mobx + React + Hot Reload + PostCSS + Webpack + Storybook + Docker project starter

Nothing fancy just a suite of packages that fit my personal taste.

## Getting started

### Docker Compose

1. configure `.env` file in `docker/app`
2. configure `docker-compose.override.yml` if you're in `development` environment
3. run `$ docker-compose up -d`
4. add below codes to your `/etc/hosts`
```
127.0.0.1   storybook.mobx.dev
127.0.0.1   app.mobx.dev
```

### Manual

1. run `$ npm install`
2. configure `.env` file in `docker/app`
3. install `$ npm install -g env-cmd`
4. run `$ env-cmd docker/app/.env npm start`
5. go to browser and enter `http://localhost:3000`
