const TouchCharacteristic = require('./touch_characteristic');
const bleno = require("@abandonware/bleno");

class ControllerService extends bleno.PrimaryService {

  static UUID = 'ecceef7c-2d85-4b1a-889b-5dd536de1d38';

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
