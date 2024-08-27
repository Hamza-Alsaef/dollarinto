const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

module.exports.getCurrences = async () => {
  try {
    const url = "https://lbp.sp-today.com/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const content = await page.content();
    const $ = cheerio.load(content);

    const items = $(".local-cur tbody tr ");
    const currences = [];
    items.each((i, elem) => {
      const name = $(elem)
        .children("th ")
        .children("a")
        .children("span:first-of-type")
        .text();
      const flagUrl = $(elem)
        .children("th ")
        .children("a")
        .children("img")
        .attr("src");

      const buy = $(elem)
        .children("td:nth-last-child(3)")
        .children("strong")
        .text();

      const sell = $(elem)
        .children("td:nth-last-child(2)")
        .children("strong")
        .text();

      const change = $(elem).children("td.change-td").children("span").text();
      currences.push({ name, buy, change, sell, flagUrl });
    });
    fs.createWriteStream("./data/currences.json", {
      encoding: "utf-8",
    }).write(JSON.stringify(currences));
  } catch (err) {}
  return;
};
