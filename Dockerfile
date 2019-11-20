# The base image to start from
FROM node:12.13.0-buster

# Install dependencies
RUN apt update
RUN apt install -y bluetooth bluez libbluetooth-dev libudev-dev

# Setup a working directory for our app
WORKDIR /app

# Copy the application files
COPY . .

# Install the node modules
RUN npm install

# The final command that starts the app
CMD ["node", "src/controller.js"]
  # Can't use npm here, it doesn't pass the kill signals
  # as it should, in term not allowing us to gracefully shut down the controller