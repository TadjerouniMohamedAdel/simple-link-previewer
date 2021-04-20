"use strict";
const cheerio = require('cheerio')
const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth");


const getLinkPreviewData = async ( puppeteerArgs = [])=>{
    puppeteer.use(pluginStealth())
    const browser = await puppeteer.launch({
      headless: true,
      args: [...puppeteerArgs],
    });
    const page = await browser.newPage();
  
    await page.goto("https://twitter.com/traversymedia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor");
    await page.waitFor(10000);

        const content = await page.content()
            const $ = cheerio.load(content);
            let ogTitle = $("meta[property='og:title']").attr("content")
            let ogDescription = $("meta[property='og:description']").attr("content")
            let ogImage = $("meta[property='og:image']").attr("content")
            let keywords = $("meta[name='keywords']").attr("content")
            let ogSite = $("meta[property='og:site_name']").attr("content")
            console.log({
                "ogTitle": ogTitle,
                "ogDescription": ogDescription,
                "ohImage": ogImage,
                "keywords": keywords,
                site: {
                    name: ogSite
                }
            })

            await browser.close();

        }

getLinkPreviewData()