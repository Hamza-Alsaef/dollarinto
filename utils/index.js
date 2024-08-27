const getCurrences = require("./getCurrences");
const getFule = require("./getFuel");
const getGold = require("./getGold");
const getRelatied = require("./getRelatid");

module.exports = { ...getCurrences, ...getFule, ...getGold, ...getRelatied };
