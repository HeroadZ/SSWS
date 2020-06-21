const puppeteer = require('puppeteer');
const urls = require('../data/urls.json');
const fs = require('fs');


let articles = {};

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  for(let k in urls) {
    await page.goto(urls[k], {
      waitUntil: 'domcontentloaded'
    });
    const content = await page.$eval('#img-content', node => node.innerHTML);
    articles[k] = content;
    await page.waitFor(1000);
  }

  fs.writeFile('../data/articles.json', JSON.stringify(articles), encoding='utf8', (err) => {
    if (err) throw err;
  });

  await browser.close();
})();



