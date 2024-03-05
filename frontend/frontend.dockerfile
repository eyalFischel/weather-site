# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container at /app
COPY package*.json ./

# Install dependencies
RUN npm install -g create-vite@latest
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app with Vite
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run the React app
CMD ["npm", "run", "start", "--", "--port", "3000", "--host"]
