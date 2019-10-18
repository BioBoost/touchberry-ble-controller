const TouchBerry = require('touchberry');
const BLEDevice = require('./ble_device');

class TouchBerryController {

  constructor() {
    this.initialize_shield();
    this.ble_device = new BLEDevice();
  }

  initialize_shield() {
    this.shield = TouchBerry.BoardBuilder.build();
    console.log(`Detected ${this.shield.revision()} board`);

    this.shield.touch().on('keydown', this.on_key_down);
  }

  on_key_down(event) {
    console.log("Getting keydown event " + JSON.stringify(event));
  }
}

module.exports = TouchBerryController;