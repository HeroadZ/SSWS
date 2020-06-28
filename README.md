# SSWS

Simplest Single Wechat official account Spider.
最简单的单个微信公众号爬虫。

# 思路
1. 从pc微信客户端进入微信公众号，打开历史消息。
2. F12打开开发者页面，将console-code.js中的代码复制到console里，执行。
3. 新建一个json文件，将获取到的所有历史文章url保存。
4. 安装puppeteer。
5. 使用命令`node crawl.js`运行爬虫，最终获取到的所有页面保存到json文件中。
