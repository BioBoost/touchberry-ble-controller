const TouchCharacteristic = require('./touch_characteristic');

const ControllerService = {
  uuid: TouchCharacteristic.UUID,
  characteristics: [
    new TouchCharacteristic()
  ]
};

module.exports = ControllerService;
