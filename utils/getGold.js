const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");

module.exports.getGold = async () => {
  try {
    const url = "https://lbp.sp-today.com/en/gold";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const content = await page.content();
    const $ = cheerio.load(content);

    const items = $(".local-cur tbody tr");
    const golds = [];
    items.each((i, elem) => {
      const name = $(elem).children("th").children("a").children("span").text();
      const price = $(elem)
        .children("td:nth-last-child(2)")
        .children("strong")
        .text();
      const change = $(elem).children("td:last-child").children("span").text();
      if (name && price && change) {
        golds.push({ name, price, change });
      }
    });

    fs.writeFileSync("./data/gold.json", JSON.stringify(golds), {
      encoding: "utf-8",
    });
    browser.close();
  } catch (err) {}
};
