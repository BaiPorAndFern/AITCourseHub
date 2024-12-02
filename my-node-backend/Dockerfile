# Use an official Node.js runtime as a parent image
FROM node:20.18.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY my-node-backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY my-node-backend/ .

# Expose the port your backend runs on
EXPOSE 3000

# Command to run your application
# or "npm start" if you have a start script in package.json
CMD ["node", "server.js"]  