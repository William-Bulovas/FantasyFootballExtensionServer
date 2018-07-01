const express = require("express");
const fs = require("fs");
const papa = require("papaparse");

const app = express();

let borisChenMap = {};

function createBorisChenJson(data) {
  for (let i = 0; i < data.length; ++i) {
    const currentData = data[i];
    borisChenMap[currentData[1]] = currentData[0];
  }
}

function readDataAndCreateJson() {
  fs.stat("borisChen.csv", function(error, stats) {
    fs.open("borisChen.csv", "r", function(error, fd) {
      const buffer = new Buffer(stats.size);
      fs.read(fd, buffer, 0, buffer.length, null, function(
        error,
        bytesRead,
        buffer
      ) {
        const data = buffer.toString("utf8");
        createBorisChenJson(papa.parse(data).data);
      });
    });
  });
}

app.get("/", (req, res) => res.json(borisChenMap));

app.listen(3000, () => {
  readDataAndCreateJson();
});
