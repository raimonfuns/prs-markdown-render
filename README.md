# prs-markdown-render
PRESSone markdown render. Powered by [markdown-it](https://github.com/markdown-it/markdown-it)

## Usage

```javascript
const Markdown = require('prs-markdown-render');
const markdownText = '## hello world';
const content = Markdown.render(markdownText);
```

## Html

```html
<div class="md-body">
   {{content}}
</div>
```

## Styles

Github markdown style

```css
@import url('~prs-markdown-render/styles/github.markdown.css')
```

Syntax highlight

```css
@import url('~prs-markdown-render/styles/atom-one-light.css')
```