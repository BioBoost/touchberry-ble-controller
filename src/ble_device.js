const bleno = require("@abandonware/bleno");

class BLEDevice {

  constructor(peripheral_name='ble-controller') {
    this.name = peripheral_name;
  }

  initialize() {
    console.log("Starting bleno ...");
  }

  enable_diagnostics() {
    bleno.on("stateChange", state => console.log(`Bleno: Adapter changed state to ${state}`));
    bleno.on("advertisingStart", err => console.log("Bleno: advertisingStart"));
    bleno.on("advertisingStartError", err => console.log("Bleno: advertisingStartError"));
    bleno.on("advertisingStop", err => console.log("Bleno: advertisingStop"));
    bleno.on("servicesSet", err => console.log("Bleno: servicesSet"));
    bleno.on("servicesSetError", err => console.log("Bleno: servicesSetError"));
    bleno.on("accept", clientAddress => console.log(`Bleno: accept ${clientAddress}`));
    bleno.on("disconnect", clientAddress => console.log(`Bleno: disconnect ${clientAddress}`));
  }

}

module.exports = BLEDevice;