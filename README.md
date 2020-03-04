# TouchBerry BLE Controller

Turning the TouchBerry Pi in a BLE controller.

![TouchBerry Pi Shield](./img/touchberry-pi-v3.jpg)

## Enable I2C

```bash
sudo raspi-config
```

Select `Interfacing Options` and enable the `I2C` interface.

## Running the app

```bash
npm install
sudo npm start
```

## Docker

### Raspberry Pi Setup

Install docker on the raspberry pi

```bash
sudo apt update
curl -sSL https://get.docker.com/ | sh
sudo usermod -aG docker pi
```

Install docker compose

```bash
sudo apt install libffi-dev libssl-dev
sudo apt install python-backports.ssl-match-hostname
sudo apt install python-pip
sudo pip install docker-compose
```

Make sure to disable the bluetooth daemon

```bash
sudo systemctl stop bluetooth
sudo systemctl disable bluetooth
```

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

### Launching the container

First make sure to alter the `config.json` file. It's mounted to the container so you don't have to rebuild after changing it.

To launch it just use

```bash
docker-compose up -d
```

## Pushing to DockerHub

Change version (tagname) as needed

```bash
docker login --username <username>
docker tag vivesdevbit/touchberry-ble-controller vivesdevbit/touchberry-ble-controller:v1.0.0
docker push vivesdevbit/touchberry-ble-controller:v1.0.0
```
