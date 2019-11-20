const TouchberryController = require('./touchberry_controller');
const fs = require('fs');

console.log("Welcome to TouchBerry BLE controller");

let config = JSON.parse(fs.readFileSync('./config.json'));

let controller = new TouchberryController(config.id, config.color);

function shutdown() {
  console.log('Shutting down ble touchberry controller');
  controller.stop();
  console.log("Done ...");
  process.exit(0);
}

// Gracefull shutdown
process.once('SIGINT', shutdown);   // CTRL-C
process.once('SIGTERM', shutdown);  // Request to terminate (send by for example docker)

