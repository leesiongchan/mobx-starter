FROM node:6

RUN npm config set --global progress false

WORKDIR /srv/mobx-starter

COPY package.json ./
RUN npm install

RUN echo 'set -o allexport\n. ~/.env\nset +o allexport' >> /root/.bashrc \
    && echo '' > /root/.env

COPY .babelrc ./
COPY server server/
COPY server.babel.js ./
COPY src src/
COPY templates templates/
COPY webpack.config.babel.js ./

COPY docker/app/start.sh /
COPY docker/app/update-env-vars.sh /

EXPOSE 3000
CMD ["/start.sh"]
