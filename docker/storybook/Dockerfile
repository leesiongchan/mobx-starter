FROM node:6

RUN npm config set --global progress false
RUN npm install --global typings

WORKDIR /srv/mobx-starter-storybook

COPY package.json ./
RUN npm install

COPY tsconfig.json ./
COPY typings.json ./
COPY typings/custom typings/custom/
RUN typings install

COPY .storybook .storybook/
COPY src src/
COPY stories stories/

COPY docker/storybook/start.sh /

EXPOSE 9001
CMD ["/start.sh"]
