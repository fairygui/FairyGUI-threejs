import { BaseFont } from "./BaseFont";
import { DynamicFont } from "./DynamicFont";

export class FontManager {
    public static fonts: { [index: string]: BaseFont } = {};
    public static packageFontGetter: (name: string) => BaseFont;

    public static registerFont(font: BaseFont) {
        this.fonts[font.name] = font;
    }

    public static unregisterFont(font: BaseFont) {
        this.fonts[font.name] = undefined;
    }

    public static getFont(name: string): BaseFont {
        if (this.packageFontGetter && name.startsWith("ui://")) {
            let font = this.packageFontGetter(name);
            if (font)
                return font;
        }

        let font = this.fonts[name];
        if (!font) {
            font = new DynamicFont();
            font.name = name;
            this.fonts[name] = font;
        }

        return font;
    }
}