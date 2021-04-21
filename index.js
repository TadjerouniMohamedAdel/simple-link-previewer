const cheerio = require('cheerio')
const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth");


const getLinkPreviewData = async (link = "https://developers.google.com/search/blog/2009/02/specify-your-canonical", puppeteerArgs = []) => {
    return new Promise(async (resolve, reject) => {

        try {
            puppeteer.use(pluginStealth())
            const browser = await puppeteer.launch({
                headless: true,
                args: [...puppeteerArgs],
            });
            const page = await browser.newPage();

            await page.goto(link, { waitUntil: 'networkidle0' });
            const content = await page.content()
            const $ = cheerio.load(content);
            const ogTitle = $("meta[property='og:title']").attr("content")?.trim()
            const ogDescription = $("meta[property='og:description']").attr("content")?.trim()
            const ogImage = $("meta[property='og:image']").attr("content")?.trim()
            const ogUrl = $("meta[property='og:url']").attr("content")?.trim()
            const linkUrl = $("link[rel='canonical']").attr("href")?.trim()
            const keywords = $("meta[name='keywords']").attr("content")?.trim()
            const metaDescription = $("meta[name='description']").attr("content")?.trim()
            const ogSite = $("meta[property='og:site_name']").attr("content")?.trim()
            const imgSrc = $("link[rel='image_src']").attr("href")?.trim()
            const firstImage = $("img").attr("src")?.trim()
            const titleTag = $("title").text()?.trim()
            const firstH1 = $("h1").text()
            const firstP = $("p").text()
            resolve({
                "og:title": ogTitle,
                "og:description": ogDescription,
                "og:image": ogImage,
                "og:site_name": ogSite,
                "og:url": ogUrl,
                "link-url": linkUrl,
                "image_src": imgSrc,
                "meta-description": metaDescription,
                "keywords": keywords,
                "<title>": titleTag,
                "first-<h1>": firstH1,
                "first-<p>": firstP,
                "firs-<img />": firstImage
            })

            await browser.close();

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = getLinkPreviewData()