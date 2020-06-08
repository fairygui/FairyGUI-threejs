import * as fgui from "../../build/FairyGUI"

export default class EmojiParser extends fgui.UBBParser {

    public constructor() {
        super();

        const TAGS: Array<string> = ["88", "am", "bs", "bz", "ch", "cool", "dhq", "dn", "fd", "gz", "han", "hx", "hxiao", "hxiu"];

        TAGS.forEach(element => {
            this._handlers[":" + element] = this.onTag_Emoji;
        });
    }

    private onTag_Emoji(tagName: string, end: boolean, attr: string): string {
        return "<img src='ui://Chat/" + tagName.substr(1).toLowerCase() + "'/>";
    }
}