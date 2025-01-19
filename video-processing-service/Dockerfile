# Stage 1: Build stage
# Use an official Node runtime as a parent image(on Linux)
FROM node:18 AS builder
# Set the working directory in the container to /app 
WORKDIR /app
# Copy the package.json and package-lock.json file into the container at /app
COPY package*.json ./
# Install any needed packages specified in package.json
RUN npm install
# Copy app source inside the docker image
COPY . .
# Build the app for production to the build folder
RUN npm run build

# Stage 2: Production stage
FROM node:18
# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg 
WORKDIR /app
COPY package*.json ./
# Install any needed Production dependencies specified in package.json
RUN npm install --only=production
# Copy built app from the first builder stage
COPY --from=builder /app/dist ./dist
# Make port 3000 available to the outside this container
EXPOSE 3000
# Define the command to run app using CMD (only one CMD allowed)
CMD [ "npm", "run", "serve" ]
