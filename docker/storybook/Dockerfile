FROM node:6

RUN npm config set --global progress false

WORKDIR /srv/mobx-starter-storybook

COPY package.json ./
RUN npm install

COPY .babelrc ./
COPY .storybook .storybook/
COPY src src/
COPY stories stories/

COPY docker/storybook/start.sh /

EXPOSE 9001
CMD ["/start.sh"]
