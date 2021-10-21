# frost-walker
A template engine written for frost

# Example

## With Express

```js
const frost = require("frost-walker");
const app = express();

app.engine("frost", frost.middleware.express());
app.set("view engine", "frost");
```

## Basic Example

`index.js`
```js
const frost = require("frost-walker");
const rendered = frost.renderFile("./demo.md", {
    name: "John Doe",
    engine: "Frost Walker",
    languages: [
        "JavaScript",
        "TypeScript",
        "Python",
        "C++"
    ]
});

console.log(rendered);
```

`demo.md`
```md
# Hello World

Hello there, my name is {{name}} and I made this with {{engine}} template engine.

I love coding in these languages:

{% for (const language of languages) { %}
- {{language}}
{% } %}

# My beautiful website

#include "./demo.html"
```

`demo.html`
```html
<h1 class="demo">This is my website!</h1>
<style>
    .demo {
        text-align: center;
        font-weight: bold;
    }
</style>
```

## Output

```html
<h1 id="hello-world">Hello World</h1>
<p>Hello there, my name is John Doe and I made this with Frost Walker template engine.</p>
<p>I love coding in these languages:</p>
<ul>
<li>JavaScript</li>
<li>TypeScript</li>
<li>Python</li>
<li>C++</li>
</ul>
<h1 id="my-beautiful-website">My beautiful website</h1>
<h1 class="demo">This is my website!</h1>
<style>
.demo {
    text-align: center;
    font-weight: bold;
}
</style>
```