const { getCurrences, getFuel, getGold, getRelatied } = require("./utils");
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

fs.mkdir(path.resolve(__dirname, "data"), () => {});
const getData = async () => {
  try {
    getCurrences();
    getFuel();
    getGold();
    getRelatied();
  } catch (err) {
    console.log(err);
  }
};
if (fs.existsSync("./data")) {
  app.use("/data", express.static(path.join(__dirname, "data")));
}
console.log(path.join(__dirname, "data"));
getData().then(() =>
  app.listen(3000, () => {
    console.log("listening");
  })
);

setInterval(() => {
  getData();
}, 30 * 60 * 1000);
