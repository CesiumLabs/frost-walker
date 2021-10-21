export function compile<T = unknown>(source: string, locals?: T) {
    if (!source || typeof source !== "string") return "";

    return new Function(
        "frostRender",
        `let locals = ${JSON.stringify(locals || {})};let output = ${JSON.stringify(source)
            .replace(/{{(.+?)}}/g, '"+($1)+"')
            .replace(/{%(.+?)%}/g, '";$1\noutput+="')};return output;`
    )() as string;
}
