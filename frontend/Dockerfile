# Use an official Node.js image for Next.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Run Next.js in development mode
CMD ["npm", "run", "dev"]
