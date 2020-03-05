# TouchBerry BLE Controller

Turning the TouchBerry Pi in a BLE controller.

![TouchBerry Pi Shield](./img/touchberry-pi-v3.jpg)

## Deployment with Docker

### Launch the RPi Setup Script

This repo includes a bash script that can be run on a freshly installed Raspberry Pi 4 to setup the full controller and all its dependencies.

```bash
bash <(curl -sL https://raw.githubusercontent.com/BioBoost/touchberry-ble-controller/master/rpisetup)
```

### Launching the container

First make sure to alter the `config.json` file. It's mounted to the container so you don't have to rebuild after changing it.

To launch it just use

```bash
docker-compose up -d
```

## Development

### Running the app without Docker

```bash
npm install
sudo npm start
```

Make sure to run as `sudo`. App will not give error but will not be able to start advertising.

### Building the image

Build the image using docker-compose

```bash
docker-compose build
```

or pure docker

```bash
docker build -t ble-touch-berry .
```

### Test run

Running shell

```bash
docker run --rm --net=host --privileged -i -t ble-touch-berry /bin/bash
```

No-shell

```bash
docker run --rm --net=host --privileged -i -t ble-touch-berry
```

### Pushing to DockerHub

Change version (tagname) as needed

```bash
docker login --username <username>
docker tag vivesdevbit/touchberry-ble-controller vivesdevbit/touchberry-ble-controller:v1.0.0
docker push vivesdevbit/touchberry-ble-controller:v1.0.0
```
