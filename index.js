const cheerio = require('cheerio')
const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth");


const getLinkPreviewData = async (link, puppeteerArgs = []) => {
    return new Promise(async (resolve, reject) => {
        //launching the browser with the headless mode
        const browser = await puppeteer.launch({
            headless: true,
            args: [...puppeteerArgs],
        });
        puppeteer.use(pluginStealth())

        try {
            /** got to the page and wait until render and load all scripts also non-crucial element */
            const page = await browser.newPage();
            await page.goto(link, { waitUntil: 'networkidle0' });

            /**getting data from page content */
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
            const firstImage = $("img").first().attr("src")?.trim()
            const titleTag = $("title").text()?.trim()
            const firstH1 = $("h1").first().text()
            const firstP = $("p").first().text()

            const twitterImage = $("meta[name='twitter:image']").attr("content")?.trim()
            const twitterTitle = $("meta[name='twitter:title']").attr("content")?.trim()
            const twitterDescription = $("meta[name='twitter:description']").attr("content")?.trim()
            const twitterUrl = $("meta[name='twitter:url']").attr("content")?.trim()
            const twitterSite = $("meta[name='twitter:site']").attr("content")?.trim()


            resolve({
                "meta-og": {
                    "og:title": ogTitle,
                    "og:description": ogDescription,
                    "og:image": ogImage,
                    "og:url": ogUrl,
                    "og:site_name": ogSite,
                },
                "meta-twitter": {
                    "twitter:title": twitterTitle,
                    "twitter:description": twitterDescription,
                    "twitter:image": twitterImage,
                    "twitter:url": twitterUrl,
                    "twitter:site": twitterSite
                },
                "link": {
                    "link-url": linkUrl,
                    "image-src": imgSrc,
                },
                "meta": {
                    "meta-description": metaDescription,
                    "keywords": keywords,
                },
                "<title>": titleTag,
                "body": {
                    "first-<h1>": firstH1,
                    "first-<p>": firstP,
                    "firs-<img />": firstImage,
                }
            })

            //closing the browser
            await browser.close();

        } catch (error) {
            reject(error)
            await browser.close();
        }
    })
}
module.exports = getLinkPreviewData