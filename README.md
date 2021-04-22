<h1 align="center">
  Simple Link Previewer
  <br>
</h1>



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
const getLinkPreviewData = require('simple-link-previewer')


getLinkPreviewData("https://www.youtube.com/watch?v=E-znxPIeTOE")
  .then(resp=>console.log(resp))
  .catch(error=>console.log(error))
```
You will get :<br/><br/>

```js
{
  'meta-og': {
    'og:title': 'LES MINIONS "La Compétition" (Mini Film - Court Métrage)',
    'og:description': 'Un match de boxe au sommet, une compétition ENRAGÉE ! Les Minions vont, encore, trop loin ! ★ Les Meilleurs films pour Enfants Ici ► http://bit.ly/Films-Enfa...',
    'og:image': 'https://i.ytimg.com/vi/E-znxPIeTOE/maxresdefault.jpg',
    'og:url': 'https://www.youtube.com/watch?v=E-znxPIeTOE',
    'og:site_name': 'YouTube'
  },
  'meta-twitter': {
    'twitter:title': 'LES MINIONS "La Compétition" (Mini Film - Court Métrage)',
    'twitter:description': 'Un match de boxe au sommet, une compétition ENRAGÉE ! Les Minions vont, encore, trop loin ! ★ Les Meilleurs films pour Enfants Ici ► http://bit.ly/Films-Enfa...',
    'twitter:image': 'https://i.ytimg.com/vi/E-znxPIeTOE/maxresdefault.jpg',
    'twitter:url': 'https://www.youtube.com/watch?v=E-znxPIeTOE',
    'twitter:site': '@youtube'
  },
  'link': {
    'link-url': 'https://www.youtube.com/watch?v=E-znxPIeTOE',
    'image-src': 'https://i.ytimg.com/vi/E-znxPIeTOE/maxresdefault.jpg'
  },
  'meta': {
    'meta-description': 'Un match de boxe au sommet, une compétition ENRAGÉE ! Les Minions vont, encore, trop loin ! ★ Les Meilleurs films pour Enfants Ici ► http://bit.ly/Films-Enfa...',
    'keywords': 'Minions (Film), court metrage, mini, film, boxe, competition, Short Film (Film Genre)'
  },
  '<title>': 'LES MINIONS "La Compétition" (Mini Film - Court Métrage) - YouTube',
  'body': {
    'first-<h1>': 'LES MINIONS "La Compétition" (Mini Film - Court Métrage)',
    'first-<p>': '',
    'firs-<img />': ''
  }
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

