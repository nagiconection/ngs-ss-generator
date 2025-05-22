FROM node:20

WORKDIR /firebase
COPY . .
RUN npm install -g firebase-tools
RUN npm install

CMD ["firebase", "emulators:start", "--project", "demo-project"]