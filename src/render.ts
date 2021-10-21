import { readFileSync, existsSync, PathLike } from "node:fs";
import { compile } from "./Compiler";
import { converter } from "./Converter";

export function renderFile<T = unknown>(path: PathLike, data?: T) {
    if (!path || !existsSync(path)) throw new Error("Could not locate source file");
    const src = readFileSync(path, { encoding: "utf-8" });
    const converted = converter(src);
    const rendered = compile(converted, data ?? {});
    return rendered;
}

export function render<T = unknown>(source: string, data?: T) {
    if (!source || typeof source !== "string") return "";
    const converted = converter(source);
    const rendered = compile(converted, data ?? {});
    return rendered;
}
