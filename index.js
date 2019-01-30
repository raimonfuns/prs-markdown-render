const MarkdownIt = require('markdown-it');
const MarkdownItFootnote = require('markdown-it-footnote');
const hljs = require('highlight.js');
const markdownItGithubPreamble = require('markdown-it-github-preamble');

exports.render = content => {
  const md = MarkdownIt({
    breaks: true,
    html: true,
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
  return md.render(content);
};
