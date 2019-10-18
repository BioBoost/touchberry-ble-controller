const TouchBerry = require('touchberry');

class TouchBerryController {

  constructor() {
    this.initialize_shield();
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