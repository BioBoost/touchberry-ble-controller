const bleno = require("@abandonware/bleno");

class TouchCharacteristic extends bleno.Characteristic {

  static UUID = 'ce8ec8f3-b582-4928-9db0-f6626f8b87c9';

  constructor(controller) {
    super({
      uuid: TouchCharacteristic.UUID,
      properties: ["read", "notify"],
      value: null,
      descriptors: [
        new bleno.Descriptor({
          uuid: "2901",
          value: "Key State"
        })
      ]
    });

    this.controller = controller;
    this.controller.on_touch((event) => this.sendNotificationOfKeyChange(event));
  }

  onReadRequest(offset, callback) {
    try {
      const pressedKey = this.controller.key_states().filter(k => k.state === 'pressed');

      // Max 1 pressed key
      if (pressedKey.length == 0) callback(this.RESULT_SUCCESS, Buffer.from(this.key_to_char(null)));
      else callback(this.RESULT_SUCCESS, Buffer.from(this.key_to_char(pressedKey[0].key)));

    } catch (err) {
      console.error(err);
      callback(this.RESULT_UNLIKELY_ERROR);
    }
  }

  onSubscribe(maxValueSize, updateTouchStateCallback) {
    console.log(`Client subscribed to touch characteristic`);
    this.updateTouchStateCallback = updateTouchStateCallback;
  }

  onUnsubscribe() {
    console.log("Client unsubscribed from touch characteristic");
    this.updateTouchStateCallback = null;
  }

  sendNotificationOfKeyChange(keyStateEvent) {
    if(this.updateTouchStateCallback) {
      let key = this.key_event_to_char(keyStateEvent);
      console.log(`Getting keychange event ${JSON.stringify(keyStateEvent)} => ${key}`);
      this.updateTouchStateCallback(Buffer.from(key));
    }
  }

  key_to_char(key) {
    switch(key) {
      case 0: return 'L';
      case 1: return 'R';
      case 2: return 'U';
      case 3: return 'D';
      case 4: return 'B';
      case 5: return 'A';
      case 6: return 'X';
      default: return '0';
    }
  }

  key_event_to_char(keyEvent) {
    if (keyEvent.state === 'released') return this.key_to_char(null);
    else return this.key_to_char(keyEvent.key);
  }
}

module.exports = TouchCharacteristic;