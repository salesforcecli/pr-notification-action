FROM node:current-alpine

ADD package*.json /
RUN npm ci --production
ADD notification.js /
RUN chmod +x /notification.js

ENTRYPOINT ["node", "/notification.js"]
