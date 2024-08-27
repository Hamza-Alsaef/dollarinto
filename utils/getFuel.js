const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");

module.exports.getFuel = async () => {
  try {
    const url = "https://lbp.sp-today.com/en/fuel";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const content = await page.content();
    const $ = cheerio.load(content);

    const items = $(".local-cur tbody tr");
    const fuels = [];
    items.each((i, elem) => {
      const name = $(elem).children("th").children("a").children("span").text();
      const price = $(elem)
        .children("td:nth-last-child(2)")
        .children("strong")
        .text();
      const change = $(elem).children("td:last-child").children("span").text();

      fuels.push({ name: name, price: price, change: change });
    });
    fs.createWriteStream("./data/fuel.json", {
      encoding: "utf-8",
    }).write(JSON.stringify(fuels));
    browser.close();
  } catch (err) {
    console.log(err);
  }
};
