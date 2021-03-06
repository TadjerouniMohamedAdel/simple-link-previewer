const cheerio = require('cheerio')
const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')

const puppeteerArgs = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain'
]
const getLinkPreviewData = async (link) => {
    //launching the browser with the headless mode
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            ...puppeteerArgs,

        ],
    });
    puppeteer.use(pluginStealth())
    puppeteer.use(AdblockerPlugin({ blockTrackers: true }))


    try {
        /** got to the page and wait until render and load all scripts also non-crucial element */
        const page = (await browser.pages())[0]
        await page.setRequestInterception(true);

        page.on('request', request => {
            if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
                request.abort();
            else
                request.continue();
        });
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

        //closing the browser
        await browser.close();

        return {
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
        }


    } catch (error) {
        await browser.close();
        throw error
    }
}
module.exports = getLinkPreviewData