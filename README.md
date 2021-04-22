<h1 align="center">
  Simple Link Previewer
  <br>
</h1>

<h4 align="center"></h4>
<br>


<p align="center">
  <a href="#about-this-project">About this package</a> •
  <a href="#installation">Installation</a> •
  <a href="#basic-usage">Basic usage</a> •
  <a href="#built-with">Built with</a> •
  <a href="#license">License</a>
</p>

##  About this package
simple-link-previewer is node package that provides you to get data from a link like title, description, images as a preview of the page's content
<br/>


## Installation


```bash
# with npm
$ npm i simple-link-previewer

# or with yarn
$ yarn add simple-link-previewer

```

## Basic usage 
```js
const linkPreviewGenerator = require("link-preview-generator");
const getLinkPreviewData = require('simple-link-previewer')


getLinkPreviewData("https://www.npmjs.com/package/simple-link-previewer")
  .then(resp=>console.log(resp))
  .catch(error=>console.log(error))
```
You will get :<br/><br/>

```js
{
  'og:title': 'simple-link-previewer',
  'og:description': '<h1>Simple Link Previewer</h1>',
  'og:image': 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png',
  'og:site_name': 'npm',
  'og:url': 'https://www.npmjs.com/package/simple-link-previewer',
  'link-url': undefined,
  'image-src': undefined,
  'meta-description': '<h1>Simple Link Previewer</h1>',
  'keywords': '',
  '<title>': 'simple-link-previewer  -  npm',
  'first-<h1>': 'npm\nSimple Link Previewer',
  'first-<p>': 'docnpm i simple-link-previewer1.0.0MIT2.94 kB3an hour ago',
  'firs-<img />': '/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9hMWY3YmMxNmNhYjA0Y2Y1YmU5MDY5YWUzNDUyNmQ4ZT9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.rYxO6FCjLIp29MAMyebv63I05oIb6R0LoUFMfxG0s-I'
}
```
## Built with

* NodeJs
* Cheerio 
* Puppeteer


## License

MIT

---

> [nagatodev.netlify.app](https://nagatodev.netlify.app/) &nbsp;&middot;&nbsp;
> GitHub [@AdelMohamedTadjerouni](https://github.com/TadjerouniMohamedAdel) &nbsp;&middot;&nbsp;
> LinkedIn [@adel_mohamed_tadjerouni](https://www.linkedin.com/in/adel-mohamed-tadjerouni-147546164/)

