with ({ copy }) {
	t = setInterval(function () {
		// 滚动到底部
		window.scrollTo(0, document.body.scrollHeight);

		// 当没有更多内容时，取消这个定时器
		let noMore = document.querySelector('.js_no_more_msg');
		if (noMore.style.display != 'none') {
			clearInterval(t);
			// 将抽取到的内容复制到剪切板，然后可以粘贴到任意的编辑器，我这里是复制到json文件里。
			copy(getMyContent());
		}
	}, 1000)
}

// 根据网页设置CSS Selector，爬取所有历史文章的url
// 最好是以array或者object的形式，便于保存
let getMyContent = function () {
	// 此处是我自己想要的内容，请更改。
	let titles = Array.from(document.querySelectorAll('h4.weui_media_title'));
	let dates = Array.from(document.querySelectorAll('p.weui_media_extra_info'));
	const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);
	let infos = zip(dates, titles)
	infos = infos.filter(info => info[1].innerText.includes('汇总'))
	urls = {}
	for (let t of infos) {
        // 获取所有历史文章的链接
		urls[t[0].innerText] = t[1].getAttribute('hrefs')
	}
	return urls;
}