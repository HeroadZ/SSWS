const puppeteer = require('puppeteer');
const urls = require('./urls.json');
const fs = require('fs');


let articles = {};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for(let k in urls) {
    await page.goto(urls[k], {
      waitUntil: 'domcontentloaded'
    });
    const content = await page.$eval('#img-content', node => node.innerHTML);
    articles[k] = content;
    await page.waitFor(1000);
  }

  fs.writeFile('articles.json', JSON.stringify(articles), encoding='utf8', (err) => {
    if (err) throw err;
  });

  await browser.close();
})();



