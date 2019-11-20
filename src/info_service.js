const IdCharacteristic = require('./id_characteristic');
const bleno = require("@abandonware/bleno");

class InfoService extends bleno.PrimaryService {

  static UUID = '81bcfa1c-0400-4909-b8e0-9c3311ccbc52';

  constructor(controller) {
    super({
      uuid: InfoService.UUID,
      characteristics: [
        new IdCharacteristic(controller)
      ]
    });
  }
}

module.exports = InfoService;
