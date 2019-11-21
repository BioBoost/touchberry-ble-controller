const TouchBerry = require('touchberry');
const BLEDevice = require('./ble_device');
const Color = require('color');

class TouchBerryController {

  constructor(id, color) {
    this.id = id;
    this.color = Color(color);
    this.initialize_shield();
    this.initialize_ble_device();
    this.show_disconnected();
  }

  initialize_shield() {
    this.shield = TouchBerry.BoardBuilder.build();
    console.log(`Detected ${this.shield.revision()} board`);
  }

  initialize_ble_device() {
    this.ble_device = new BLEDevice(this, `ble-controller-${this.id}`);
    this.ble_device.enable_diagnostics();
    this.ble_device.initialize();
    this.ble_device.on('connected', () => this.show_connected());
    this.ble_device.on('disconnected', () => this.show_disconnected());
  }

  key_states() {
    return this.shield.touch().key_states();
  }

  on_touch(callback) {
    this.shield.touch().on('keychange', callback);
  }

  get_id() {
    return this.id;
  }

  stop() {
    this.leds_off();
  }

  ////// internal methods ///////////
  show_connected() {
    clearInterval(this.disconnectionFlasher);
    this.disconnectionFlasher = null;
    this.show_colored_leds();
  }

  show_disconnected() {
    // Refactor later to nicer code
    if (!this.disconnectionFlasher) {
      let ledsOff = true;
      this.disconnectionFlasher = setInterval(() => {
        if (ledsOff) {
          this.show_colored_leds();
        } else {
          this.leds_off();
        }
        ledsOff = !ledsOff;
      }, 500);
    }
  }

  show_colored_leds() {
    for (let i = 0; i < 5; i++) {
      this.shield.rgbledbar().set_led(i, this.color);
    }
  }

  leds_off() {
    this.shield.rgbledbar().all_off();
  }
}

module.exports = TouchBerryController;