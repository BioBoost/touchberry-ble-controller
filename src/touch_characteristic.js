const bleno = require("@abandonware/bleno");

class TouchCharacteristic extends bleno.Characteristic {

  static UUID = 'ce8ec8f3-b582-4928-9db0-f6626f8b87c9';

  constructor(controller) {
    super({
      uuid: TouchCharacteristic.UUID,
      properties: ["read"],
      value: null,
      descriptors: [
        new bleno.Descriptor({
          uuid: "2901",
          value: "Key State"
        })
      ]
    });

    this.controller = controller;
  }

  onReadRequest(offset, callback) {
    try {
      const keystate = this.controller.key_state();
      console.log(`Returning keystate: ${keystate}`);

      let data = Buffer.alloc(1);   // Single byte
      data.writeUInt8(keystate, 0);
      callback(this.RESULT_SUCCESS, data);
    } catch (err) {
      console.error(err);
      callback(this.RESULT_UNLIKELY_ERROR);
    }
  }
}

module.exports = TouchCharacteristic;