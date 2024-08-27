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
getData();

setInterval(() => {
  getData();
}, 30 * 60 * 1000);

app.use("/static", express.static(path.join(__dirname, "data")));

app.listen(3000, () => {
  console.log("listening");
});
