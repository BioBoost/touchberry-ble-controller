# TouchBerry BLE Controller

Turning the TouchBerry Pi in a BLE controller.

## Enable I2C

```shell
sudo raspi-config
```

Select `Interfacing Options` and enable the `I2C` interface.

## Running the app

```shell
npm install
sudo npm start
```

## Docker

Install docker on the raspberry pi

```shell
sudo apt update
curl -sSL https://get.docker.com/ | sh
sudo usermod -aG docker pi
```
