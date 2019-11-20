const TouchberryController = require('./touchberry_controller');
const fs = require('fs');

console.log("Welcome to TouchBerry BLE controller");

let config = JSON.parse(fs.readFileSync('./config.json'));

let controller = new TouchberryController(config.id, config.color);