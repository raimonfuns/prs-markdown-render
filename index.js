const MarkdownIt = require('markdown-it');
const MarkdownItFootnote = require('markdown-it-footnote');
const hljs = require('highlight.js');
const markdownItGithubPreamble = require('markdown-it-github-preamble');
const cheerio = require('cheerio');

const render = content => {
  const md = MarkdownIt({
    breaks: true,
    html: false,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
      return '';
    },
  }).use(MarkdownItFootnote)
    .use(markdownItGithubPreamble);
  let result = md.render(removeYaml(content));
  if (window) {
    const isSafari =
      navigator.userAgent.search('Safari') >= 0 &&
      navigator.userAgent.search('Chrome') < 0 ||
      navigator.userAgent.search('AppleWebKit');
    if (isSafari) {
      result = tweakWechatImages(result);
    }
  }
  return result;
};

exports.render = render;

const removeYaml = (content = '') => {
  return content.replace(/^---[\w\S\s\d]*---/g, '');
}

const getIframeByImageUrl = url => {
  url = url.split('?')[0];
  const frameid = 'frameimg' + Math.random();
  const imgId = 'img' + Math.random();
  window[imgId] = `
    <img id="img" src='${url}' />
    <script>
      window.onload = function() {
        const iframe = parent.document.getElementById('${frameid}');
        const img = document.getElementById(\'img\');
        console.log(iframe);
        console.log(img);
        iframe.height = img.height+\'px\';
        document.body.style.textAlign = 'center';
      }
    </script>`;
  return `
    <iframe
      id="${frameid}"
      src="javascript:parent['${imgId}'];"
      frameBorder="0"
      scrolling="no"
      width="100%"
      referrerpolicy="no-referrer">
    </iframe>`;
}

const tweakWechatImages = (html) => {
  const $ = cheerio.load(html);
  $('img').each((i, img) => {
    const src = $(img).attr('src');
    if (src && src.includes('https://mmbiz.qpic.cn')) {
      $(img).replaceWith(getIframeByImageUrl(src));
    }
  });
  return $.html();
}

if (window) {
  window.prsMdRender = render;
}