// 设置一个定时器，每一秒滚动到底部，让其自动加载新内容
t = setInterval(function(){
	window.scrollTo(0,document.body.scrollHeight);
}, 1000)

// 当没有更多内容时，取消这个定时器
clearInterval(t)



let titles = Array.from(document.querySelectorAll('h4.weui_media_title'));
let dates = Array.from(document.querySelectorAll('p.weui_media_extra_info'));
const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);
let infos = zip(dates, titles)
infos = infos.filter(info => info[1].innerText.includes('汇总'))
urls = {}
for (let t of infos) {
	urls[t[0].innerText] = t[1].getAttribute('hrefs')
}
copy(urls)
