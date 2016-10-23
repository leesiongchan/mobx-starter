FROM node:6

RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3 \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        yarn

WORKDIR /srv/tripviss-web-admin

RUN echo 'set -o allexport\n. ~/.env\nset +o allexport' >> /root/.bashrc \
    && echo '' > /root/.env

COPY .babelrc ./
COPY .storybook .storybook/
COPY package.json ./
COPY src src/
COPY stories stories/
COPY yarn.lock ./

COPY docker/storybook/start.sh /
COPY docker/storybook/update-env-vars.sh /

EXPOSE 9001
CMD ["/start.sh"]
