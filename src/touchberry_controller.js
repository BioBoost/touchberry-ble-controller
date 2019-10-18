const TouchBerry = require('touchberry');
const BLEDevice = require('./ble_device');

class TouchBerryController {

  constructor() {
    this.initialize_shield();
    this.initialize_ble_device();
  }

  initialize_shield() {
    this.shield = TouchBerry.BoardBuilder.build();
    console.log(`Detected ${this.shield.revision()} board`);

    this.shield.touch().on('keydown', this.on_key_down);
  }

  initialize_ble_device() {
    this.ble_device = new BLEDevice(this);
    this.ble_device.enable_diagnostics();
    this.ble_device.initialize();
  }

  key_states() {
    return this.shield.touch().key_states();
  }

  /////////////////////////////// Internal methods ///////////////////////////////

  on_key_down(event) {
    console.log("Getting keydown event " + JSON.stringify(event));
  }
}

module.exports = TouchBerryController;