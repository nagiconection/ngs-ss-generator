# ./firebase/Dockerfile
FROM node:20

RUN apt-get update && \
    apt-get install -y default-jre && \
    apt-get clean
    
WORKDIR /app

COPY . .

RUN npm install -g firebase-tools

CMD ["firebase", "emulators:start", "--project", "demo-project"]