import marked from "marked";
import fs from "node:fs";
import path from "path";

const IMPORT_REGEX = /^#(include|import) "(.+)"$/;

marked.use({
    gfm: true,
    xhtml: true,
    renderer: {
        paragraph: (text) => {
            if (!text) return "";
            const childText = text.replace(/&quot;/g, '"');
            const importMatched = childText.match(IMPORT_REGEX);
            console.log(importMatched)
            if (!importMatched || !importMatched[2]) return `<p>${text}</p>`;
            let filePath = importMatched[2];
            if (!path.extname(filePath)) filePath += ".md";
            if (!fs.existsSync(filePath)) throw new Error(`Could not locate include file "${filePath}"`);
            const fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
            const rendered = marked(fileData);
            return rendered;
        }
    }
});

export function converter(source: string) {
    if (!source || typeof source !== "string") throw new Error("Source was not provided");
    const rendered = marked(source);
    return rendered;
}
