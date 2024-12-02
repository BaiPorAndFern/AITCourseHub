# Use an official Node.js runtime as a parent image
FROM node:20.18.0-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY app-angular-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend code
COPY app-angular-frontend/ .

# Build your Angular app
RUN npm run build

# Install a simple HTTP server
RUN npm install -g serve

# Expose the port your frontend runs on
EXPOSE 4200

# Command to run your application
# Adjust the path to your built app as necessary
CMD ["serve", "-s", "dist"]  