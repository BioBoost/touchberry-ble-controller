const bleno = require("@abandonware/bleno");
const ControllerService = require('./controller_service');

class BLEDevice {

  constructor(controller, peripheral_name='ble-controller') {
    this.name = peripheral_name;
    this.controller = controller;
  }

  initialize() {
    console.log("Starting bleno ...");

    bleno.on("stateChange", state => {
      if (state === "poweredOn") this._start_advertising();
      else this._stop_advertising();
    });

    bleno.on("advertisingStart", err => {
      if (err) console.error(err);
      else this._initialize_services();
    });
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

  /////////////////////////////// Internal methods ///////////////////////////////

  _start_advertising() {
    bleno.startAdvertising(this.name, [ControllerService.UUID], err => {
      if (err) console.log(err);
    });
  }

  _stop_advertising() {
    console.log("Stopping advertising...");
    bleno.stopAdvertising();
  }

  _initialize_services() {
    console.log("Configuring services ...");

    bleno.setServices([
      new ControllerService(this.controller)
    ], err => {
      if(err) console.log(err);
      else console.log("Services configured");
    });
  }

}

module.exports = BLEDevice;