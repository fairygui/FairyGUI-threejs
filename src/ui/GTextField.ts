import { InputTextField } from "../core/text/InputTextField";
import { TextField } from "../core/text/TextField";
import { TextFormat } from "../core/text/TextFormat";
import { AlignType, AutoSizeType, ObjectPropID, VertAlignType } from "./FieldTypes";
import { GObject } from "./GObject";
import { UIConfig } from "./UIConfig";
import { ByteBuffer } from "../utils/ByteBuffer";
import { UBBParser, defaultParser } from "../utils/UBBParser";
import { XMLUtils } from "../utils/xml/XMLUtils";
import { RichTextField } from "../core/text/RichTextField";

export type TextTemplate = { [index: string]: string };

export class GTextField extends GObject {
    protected _textField: TextField | RichTextField | InputTextField;
    protected _text: string;
    protected _ubbEnabled: boolean;
    protected _updatingSize: boolean;
    protected _template: TextTemplate;

    constructor() {
        super();

        let tf = this._textField.textFormat;
        tf.font = UIConfig.defaultFont;
        tf.size = 12;
        tf.lineSpacing = 3;
        this._textField.applyFormat();

        this._text = "";
        this._textField.autoSize = AutoSizeType.Both;
        this._textField.wordWrap = false;
    }

    protected createDisplayObject(): void {
        this._displayObject = this._textField = new TextField();
    }

    public get text(): string {
        if (this._displayObject instanceof InputTextField)
            this._text = this._textField.text;
        return this._text;
    }

    public set text(value: string) {
        if (value == null)
            value = "";
        this._text = value;
        this.setText();
        this.updateSize();
        this.updateGear(6);
    }

    protected setText() {
        let str = this._text;
        if (this._template)
            str = this.parseTemplate(str);

        this._textField.maxWidth = this.maxWidth;
        if (this._ubbEnabled)
            this._textField.htmlText = defaultParser.parse(XMLUtils.encodeString(str));
        else
            this._textField.text = str;
    }

    public get textTemplate(): TextTemplate {
        return this._template;
    }

    public set textTemplate(value: TextTemplate) {
        if (!this._template && !value)
            return;

        this._template = value;
        this.flushVars();
    }

    public setVar(name: string, value: string): GTextField {
        if (!this._template)
            this._template = {};
        this._template[name] = value;

        return this;
    }

    public flushVars(): void {
        this.setText();
        this.updateSize();
    }

    public get textFormat(): TextFormat {
        return this._textField.textFormat;
    }

    public applyFormat(): void {
        this._textField.applyFormat();
        if (!this._underConstruct)
            this.updateSize();
    }

    public get align(): AlignType {
        return this._textField.align;
    }

    public set align(value: AlignType) {
        this._textField.align = value;
    }

    public get verticalAlign(): VertAlignType {
        return this._textField.verticalAlign;
    }

    public set verticalAlign(value: VertAlignType) {
        this._textField.verticalAlign = value;
    }

    public get singleLine(): boolean {
        return this._textField.singleLine;
    }

    public set singleLine(value: boolean) {
        this._textField.singleLine = value;
    }

    public set ubbEnabled(value: boolean) {
        this._ubbEnabled = value;
    }

    public get ubbEnabled(): boolean {
        return this._ubbEnabled;
    }

    public get autoSize(): number {
        return this._textField.autoSize;
    }

    public set autoSize(value: number) {
        this._textField.autoSize = value;
        if (value == AutoSizeType.Both) {
            this._textField.wordWrap = false;

            if (!this._underConstruct)
                this.setSize(this._textField.textWidth, this._textField.textHeight);
        }
        else {
            this._textField.wordWrap = true;

            if (value == AutoSizeType.Height) {
                if (!this._underConstruct) {
                    this._textField.width = this.width;
                    this.height = this._textField.textHeight;
                }
            }
            else
                this._textField.setSize(this.width, this.height);
        }
    }

    public get textWidth(): number {
        return this._textField.textWidth;
    }

    public get textHeight(): number {
        return this._textField.textHeight;
    }

    public get color(): number {
        return this._textField.textFormat.color;
    }

    public set color(value: number) {
        if (this._textField.textFormat.color != value) {
            // if (this.grayed)
            //     this._textField.color = "#AAAAAA";
            // else
            //     this._textField.color = this._color;
            this._textField.textFormat.color = value;
            this._textField.applyFormat();

            this.updateGear(4);
        }
    }

    public getProp(index: number): any {
        switch (index) {
            case ObjectPropID.Color:
                return this.color;
            case ObjectPropID.OutlineColor:
                return this._textField.textFormat.outlineColor;
            case ObjectPropID.FontSize:
                return this._textField.textFormat.size;
            default:
                return super.getProp(index);
        }
    }

    public setProp(index: number, value: any): void {
        switch (index) {
            case ObjectPropID.Color:
                this.color = value;
                break;
            case ObjectPropID.OutlineColor:
                this._textField.textFormat.outlineColor = value;
                this._textField.applyFormat();
                break;
            case ObjectPropID.FontSize:
                this._textField.textFormat.size = value;
                this._textField.applyFormat();
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }

    private updateSize(): void {
        if (this._updatingSize)
            return;

        this._updatingSize = true;

        if (this._textField.autoSize == AutoSizeType.Both) {
            this.setSize(this._textField.width, this._textField.height);
        }
        else if (this._textField.autoSize == AutoSizeType.Height) {
            this.height = this._textField.height;
        }

        this._updatingSize = false;
    }

    protected handleSizeChanged(): void {
        if (this._updatingSize)
            return;

        if (this._underConstruct)
            this._textField.setSize(this.width, this.height);
        else if (this._textField.autoSize != AutoSizeType.Both) {
            if (this._textField.autoSize == AutoSizeType.Height) {
                this._textField.width = this.width;//先调整宽度，让文本重排
                if (this._text != "") //文本为空时，1是本来就不需要调整， 2是为了防止改掉文本为空时的默认高度，造成关联错误
                    this.setSizeDirectly(this.width, this._textField.height);
            }
            else
                this._textField.setSize(this.width, this.height);
        }
    }

    // protected handleGrayedChanged(): void {
    //     super.handleGrayedChanged();

    //     if (this.grayed)
    //         this._textField.color = "#AAAAAA";
    //     else
    //         this._textField.color = this._color;
    // }

    public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
        super.setup_beforeAdd(buffer, beginPos);

        buffer.seek(beginPos, 5);

        let tf = this._textField.textFormat;

        tf.font = buffer.readS();
        tf.size = buffer.readShort();
        tf.color = buffer.readColor();
        let c = buffer.readByte();
        this.align = c == 0 ? "left" : (c == 1 ? "center" : "right");
        c = buffer.readByte();
        this.verticalAlign = c == 0 ? "top" : (c == 1 ? "middle" : "bottom");
        tf.lineSpacing = buffer.readShort();
        tf.letterSpacing = buffer.readShort();
        this.ubbEnabled = buffer.readBool();
        this.autoSize = buffer.readByte();
        tf.underline = buffer.readBool();
        tf.italic = buffer.readBool();
        tf.bold = buffer.readBool();
        this.singleLine = buffer.readBool();
        if (buffer.readBool()) {
            tf.outlineColor = buffer.readColor();
            tf.outline = buffer.readFloat() + 1;
        }

        if (buffer.readBool()) //shadow
        {
            tf.shadowColor = buffer.readColor();
            let f1 = buffer.readFloat();
            let f2 = buffer.readFloat();
            tf.shadowOffset.set(f1, f2);
        }

        if (buffer.readBool())
            this._template = {};

        if (buffer.version >= 3)
            tf.strikethrough = buffer.readBool();

        this._textField.applyFormat();
    }

    public setup_afterAdd(buffer: ByteBuffer, beginPos: number): void {
        super.setup_afterAdd(buffer, beginPos);

        buffer.seek(beginPos, 6);

        var str: string = buffer.readS();
        if (str != null)
            this.text = str;
    }

    protected parseTemplate(template: string): string {
        var pos1: number = 0, pos2: number, pos3: number;
        var tag: string;
        var value: string;
        var result: string = "";
        while ((pos2 = template.indexOf("{", pos1)) != -1) {
            if (pos2 > 0 && template.charCodeAt(pos2 - 1) == 92)//\
            {
                result += template.substring(pos1, pos2 - 1);
                result += "{";
                pos1 = pos2 + 1;
                continue;
            }

            result += template.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = template.indexOf("}", pos1);
            if (pos2 == -1)
                break;

            if (pos2 == pos1 + 1) {
                result += template.substr(pos1, 2);
                pos1 = pos2 + 1;
                continue;
            }

            tag = template.substring(pos1 + 1, pos2);
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
                value = this._template[tag.substring(0, pos3)];
                if (value == null)
                    result += tag.substring(pos3 + 1);
                else
                    result += value;
            }
            else {
                value = this._template[tag];
                if (value != null)
                    result += value;
            }
            pos1 = pos2 + 1;
        }

        if (pos1 < template.length)
            result += template.substr(pos1);

        return result;
    }
}