import marked from "marked";
import fs from "node:fs";
import path from "path";
import { FrostError } from "./FrostError";

const IMPORT_REGEX = /#(include|import) "(.+)"/g;

marked.use({
    gfm: true,
    xhtml: true,
    sanitize: false
});

function inject(text: string, data: any = {}): string {
    if (!text) return "";
    let childText = text
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
    if (!childText.match(IMPORT_REGEX)) return childText;

    const importMatched = childText.matchAll(IMPORT_REGEX);

    for (const matched of importMatched) {
        if (!matched || !matched[2]) continue;
        let filePath = matched[2],
            filePathFinal = matched[2];
        if (!path.extname(filePath)) filePath += ".frost";
        if (filePath.startsWith("./") && data?.__dirname) filePathFinal = `${data.__dirname}/${filePath.replace(/.\//, "")}`;
        if (!fs.existsSync(filePathFinal)) throw new FrostError(`Could not locate include file "${filePath}"`);
        const fileData = fs.readFileSync(filePathFinal, { encoding: "utf-8" });
        childText = childText.replace(matched.input, fileData);
    }

    const injectedResult = inject(childText, data);
    if (!injectedResult || injectedResult === childText) return childText;
    return injectedResult;
}

export function converter<T>(source: string, data?: T) {
    if (!source || typeof source !== "string") throw new FrostError("Source was not provided");
    const rendered = marked(source);
    return inject(rendered, data || {}) || rendered;
}
