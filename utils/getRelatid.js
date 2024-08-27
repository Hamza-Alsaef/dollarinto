const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");

module.exports.getRelatied = async () => {
  try {
    const url = "https://lbp.sp-today.com/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const content = await page.content();
    const $ = cheerio.load(content);

    const items = $(".rate-data .container .row>div");
    const relatedList = [];
    items.each((i, elem) => {
      const name = $(elem).children("a").children("span").text();
      const price = $(elem)
        .children("a")
        .children(".line-data")
        .children("span")
        .text();
      relatedList.push({ name, price });
    });
    fs.writeFileSync("./data/related.json", JSON.stringify(relatedList), {
      encoding: "utf-8",
    });
  } catch (err) {
    console.log(err);
  }
};
