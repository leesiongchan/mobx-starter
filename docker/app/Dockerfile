FROM node:6

RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3 \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        yarn

WORKDIR /srv/tripviss-web-admin

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

RUN echo 'set -o allexport\n. ~/.env\nset +o allexport' >> /root/.bashrc \
    && echo '' > /root/.env

COPY .babelrc ./
COPY server server/
COPY server.babel.js ./
COPY src src/
COPY templates templates/
COPY webpack.config.babel.js ./
RUN NODE_ENV=production yarn run build

COPY docker/app/start.sh /
COPY docker/app/update-env-vars.sh /

EXPOSE 3000
CMD ["/start.sh"]
