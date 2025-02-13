FROM node:22

RUN corepack enable \
    && corepack prepare yarn@stable --activate

WORKDIR /app

CMD ["sleep", "infinity"] 