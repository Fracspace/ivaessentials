FROM node:20-alpine

WORKDIR /app

# Copy package lock and json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
