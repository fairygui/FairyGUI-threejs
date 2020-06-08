import { RichTextField } from "../core/text/RichTextField";
import { defaultParser } from "../utils/UBBParser";
import { GTextField } from "./GTextField";

export class GRichTextField extends GTextField {
    constructor() {
        super();
    }

    protected createDisplayObject(): void {
        this._displayObject = this._textField = new RichTextField();
    }

    protected setText() {
        let str = this._text;
        if (this._template)
            str = this.parseTemplate(str);

        this._textField.maxWidth = this.maxWidth;
        if (this._ubbEnabled)
            this._textField.htmlText =  defaultParser.parse(str);
        else
            this._textField.htmlText = str;
    }
}
