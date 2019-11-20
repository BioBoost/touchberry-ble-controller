const bleno = require("@abandonware/bleno");

class IdCharacteristic extends bleno.Characteristic {

  static UUID = '79fe0573-3f74-4587-a69d-a2ec6992d220';

  constructor(controller) {
    super({
      uuid: IdCharacteristic.UUID,
      properties: ["read"],
      value: null,
      descriptors: [
        new bleno.Descriptor({
          uuid: "2901",
          value: "Controller ID"
        })
      ]
    });

    this.controller = controller;
  }

  onReadRequest(offset, callback) {
    try {
      callback(this.RESULT_SUCCESS, Buffer.from(this.controller.get_id()));
    } catch (err) {
      console.error(err);
      callback(this.RESULT_UNLIKELY_ERROR);
    }
  }

}

module.exports = IdCharacteristic;