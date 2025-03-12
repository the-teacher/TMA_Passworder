FROM node:22

RUN apt-get update && apt-get install -y \
    build-essential \
    sqlite3 -y \
    jq -y \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable \
    && corepack prepare yarn@stable --activate

WORKDIR /app

CMD ["sleep", "infinity"] 