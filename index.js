const axios = require('axios')
const cheerio = require('cheerio')


const getLinkPreviewData  = ()=>{
    axios({
        method:"get",
        url:"https://twitter.com/traversymedia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
    })
    .then(response=>{
        const $ = cheerio.load(response.data);
        let ogTitle = $("meta[property='og:title']").attr("content")
        let ogDescription = $("meta[property='og:description']").attr("content")
        let ogImage = $("meta[property='og:image']").attr("content")
        let keywords = $("meta[name='keywords']").attr("content")
        let ogSite = $("meta[property='og:site_name']").attr("content")
        console.log({
            "ogTitle":ogTitle,
            "ogDescription":ogDescription,
            "ohImage":ogImage,
            "keywords":keywords,
            site:{
                name:ogSite
            }
        })

    })
    .catch(error=>{
        console.log("error")
    })

}

getLinkPreviewData()