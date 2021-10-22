import { readFileSync, existsSync } from "node:fs";
import { compile } from "./Compiler";
import { converter } from "./Converter";
import { FrostError } from "./FrostError";
import path from "node:path";

export function renderFile<T = unknown>(filePath: string, data?: T) {
    if (!filePath || !existsSync(filePath)) throw new FrostError("Could not locate source file");
    const src = readFileSync(filePath, { encoding: "utf-8" });
    if (!path.isAbsolute(filePath)) filePath = path.resolve(filePath);
    // @ts-ignore
    if (!data.__dirname) data.__dirname = path.dirname(filePath);
    return render(src, data);
}

export function render<T = unknown>(source: string, data?: T) {
    if (!source || typeof source !== "string") return "";
    // @ts-ignore
    if (!data.__dirname && data?.settings?.views) data.__dirname = data.settings.views;
    const converted = converter(source, data ?? {});
    const rendered = compile(converted, data ?? {});
    return rendered;
}
