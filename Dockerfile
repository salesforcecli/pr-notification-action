FROM node:current-alpine

ADD notification.js /
RUN chmod +x /notification.js

ENTRYPOINT ["node", "/notification.js"]
