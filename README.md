# This project is archived and frost-walker is now implemented natively inside frost project

# frost-walker
A template engine written for frost

# Syntax
- `#include "componentPath"`           :: Path to the component (Alias: `#import`). Renders markdown if file path ends with `.md`
- `<frost>JAVASCRIPT</frost>`          :: Renders JavaScript output
- `<frost embed>JAVASCRIPT</frost>`    :: Executes JavaScript without rendering the output
- `<!-- TEXT -->`                      :: Comment


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
frost.renderFile("./main.frost", {
    name: "John Doe",
    engine: "Frost Walker",
    languages: [
        "JavaScript",
        "TypeScript",
        "Python",
        "C++"
    ]
});
```

`main.frost`
```html
#include "./heading.md"

<h1>Hello World</h1>
```

`heading.md`
```md
# Hello World

Hello there, my name is <frost>name</frost> and I made this with <frost>engine</frost> template engine.

I love coding in these languages:
<frost embed>for (const language of languages) {</frost>
- <frost>language</frost>
<frost embed>}</frost>
```