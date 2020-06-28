const puppeteer = require('puppeteer');
const urls = require('./urls.json'); //获取所有的url
const fs = require('fs');



(async () => {
	// 打开一个新的窗口，此处我选择了可视化，让你知道发生了什么。
	// 可以删除掉{headless: false}使程序在后台运行。
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	let articles = {};

	// 遍历url
	for (let k in urls) {
		// 访问地址，等待加载
		await page.goto(urls[k], {
			waitUntil: 'domcontentloaded'
		});
		// 获取到自己想要的DOM
		const content = await page.$eval('#img-content', node => node.innerHTML);
		// 直接存储整个HTML结构，解析可以在后面做
		articles[k] = content;
		// 一秒一次访问，防止过快被封
		await page.waitFor(1000);
	}

	// 写入json文件
	fs.writeFile('articles.json', JSON.stringify(articles), encoding = 'utf8', (err) => {
		if (err) throw err;
	});

	// 关闭浏览器
	await browser.close();
})();



