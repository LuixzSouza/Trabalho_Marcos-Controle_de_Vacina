const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'db.json');

function loadInitialData() {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
}

module.exports = loadInitialData();
