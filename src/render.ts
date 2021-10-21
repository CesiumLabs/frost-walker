import { readFileSync, existsSync, PathLike } from "node:fs";
import { compile } from "./Compiler";
import { converter } from "./Converter";
import { FrostError } from "./FrostError";

export function renderFile<T = unknown>(path: PathLike, data?: T) {
    if (!path || !existsSync(path)) throw new FrostError("Could not locate source file");
    const src = readFileSync(path, { encoding: "utf-8" });
    return render(src, data);
}

export function render<T = unknown>(source: string, data?: T) {
    if (!source || typeof source !== "string") return "";
    // @ts-ignore
    if (data && data.settings && data.settings.views) data.__dirname = data.settings.views;
    const converted = converter(source, data ?? {});
    const rendered = compile(converted, data ?? {});
    return rendered;
}
