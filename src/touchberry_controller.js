const TouchBerry = require('touchberry');
const BLEDevice = require('./ble_device');
const Color = require('color');

class TouchBerryController {

  constructor(id, color) {
    this.id = id;
    this.color = Color(color);
    this.initialize_shield();
    this.initialize_ble_device();
  }

  initialize_shield() {
    this.shield = TouchBerry.BoardBuilder.build();
    console.log(`Detected ${this.shield.revision()} board`);

    // Refactor later to nicer code
    this.shield.rgbledbar().all_off();
    for (let i = 0; i < 5; i++) {
      this.shield.rgbledbar().set_led(i, this.color);
    }
  }

  initialize_ble_device() {
    this.ble_device = new BLEDevice(this);
    this.ble_device.enable_diagnostics();
    this.ble_device.initialize();
  }

  key_states() {
    return this.shield.touch().key_states();
  }

  on_touch(callback) {
    this.shield.touch().on('keychange', callback);
  }
}

module.exports = TouchBerryController;