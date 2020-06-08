
export function convertToHtmlColor(argb: number, hasAlpha?: boolean): string {
    var alpha: string;
    if (hasAlpha)
        alpha = (argb >> 24 & 0xFF).toString(16);
    else
        alpha = "";
    var red: string = (argb >> 16 & 0xFF).toString(16);
    var green: string = (argb >> 8 & 0xFF).toString(16);
    var blue: string = (argb & 0xFF).toString(16);
    if (alpha.length == 1)
        alpha = "0" + alpha;
    if (red.length == 1)
        red = "0" + red;
    if (green.length == 1)
        green = "0" + green;
    if (blue.length == 1)
        blue = "0" + blue;
    return "#" + alpha + red + green + blue;
}

export function convertFromHtmlColor(str: string, hasAlpha?: boolean): number {
    if (str.length < 1)
        return 0;

    if (str.charAt(0) == "#")
        str = str.substr(1);

    if (str.length == 8)
        return (parseInt(str.substr(0, 2), 16) << 24) + parseInt(str.substr(2), 16);
    else if (hasAlpha)
        return 0xFF000000 + parseInt(str, 16);
    else
        return parseInt(str, 16);
}

export function clamp(value: number, min: number, max: number): number {
    if (value < min)
        value = min;
    else if (value > max)
        value = max;
    return value;
}

export function clamp01(value: number): number {
    if (isNaN(value))
        value = 0;
    else if (value > 1)
        value = 1;
    else if (value < 0)
        value = 0;
    return value;
}

export function lerp(start: number, end: number, percent: number): number {
    return (start + percent * (end - start));
}

export function repeat(t: number, length: number): number {
    return t - Math.floor(t / length) * length;
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}