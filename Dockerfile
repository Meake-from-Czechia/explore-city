FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000
EXPOSE 3443

# Command to run the application
CMD ["npm", "run", "start:dev"]