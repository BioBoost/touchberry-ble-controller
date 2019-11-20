const TouchCharacteristic = require('./touch_characteristic');
const bleno = require("@abandonware/bleno");

class ControllerService extends bleno.PrimaryService {

  static UUID = '83aa3936-2d63-4369-9875-d7b7a20540dd';

  constructor(controller) {
    super({
      uuid: ControllerService.UUID,
      characteristics: [
        new TouchCharacteristic(controller)
      ]
    });
  }
}

module.exports = ControllerService;
