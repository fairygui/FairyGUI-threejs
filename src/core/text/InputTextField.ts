import { TextField, GUTTER_X, GUTTER_Y } from "./TextField";
import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
import { convertToHtmlColor } from "../../utils/ToolSet";
import { Stage } from "../Stage";
import { Vector2 } from "three";
import { defaultParser } from "../../utils/UBBParser";
import { UIContentScaler } from "../../ui/UIContentScaler";

type InputElement = HTMLTextAreaElement | HTMLInputElement;

export class InputTextField extends TextField {
    public maxLength: number;
    public keyboardType: string;
    public restrict: string;
    public editable: boolean;

    private _text2: string;
    private _password: boolean;
    private _promptText: string;
    private _decodedPromptText?: string;
    private _border: number;
    private _corner: number;
    private _borderColor: Color4;
    private _backgroundColor: Color4;
    private _editing: boolean;

    private _element: InputElement;

    public constructor() {
        super();
        this._touchDisabled = false;
        this.opaque = true;

        this.isInput = true;

        this._text2 = '';
        this.maxLength = 0;
        this.editable = true;
        this._borderColor = new Color4();
        this._backgroundColor = new Color4(0xFFFFFF, 0);

        this.on("focus_in", this.__focusIn, this, true);
        this.on("focus_out", this.__focusOut, this, true);
        this.on("removed_from_stage", this.__removed, this);
    }

    public get text(): string {
        if (this._editing)
            this._text2 = this._element.value;
        return this._text2;
    }

    public set text(value: string) {
        this._text2 = value;

        this.updateText();
    }

    public get promptText(): string {
        return this._promptText;
    }

    public set promptText(value: string) {
        this._promptText = value;
        this._decodedPromptText = defaultParser.parse(value);

        this.updateText();
    }

    public get password(): boolean {
        return this._password;
    }

    public set password(value: boolean) {
        this._password = value;
    }

    private updateText() {
        if (this._editing)
            this._element.value = this._text2;
        else if (this._text2.length == 0 && this._promptText)
            super.htmlText = this._decodedPromptText;
        else if (this._password)
            super.text = "*".repeat(this._text2.length);
        else
            super.text = this._text2;
    }

    protected onSizeChanged() {
        super.onSizeChanged();

        if (!this._clipRect)
            this._clipRect = new Rect();
        this._clipRect.copy(this._contentRect);

        this._clipRect.x += GUTTER_X;
        this._clipRect.y += GUTTER_Y;
        this._clipRect.width -= GUTTER_X * 2;
        this._clipRect.height -= GUTTER_Y * 2;
    }

    public applyFormat() {
        super.applyFormat();

        if (this._element)
            this.setFormat();
    }

    private createElement() {
        let e: InputElement;
        if (this.singleLine) {
            e = this._element = document.createElement("input");
        } else {
            e = this._element = document.createElement("textarea");
            e.style.resize = "none";
            e.style.overflow = "scroll";
        }

        e.id = 'InputText';
        e.style.outline = "none";
        e.style.borderWidth = "0px";
        e.style.padding = "0px";
        e.style.margin = "0px";
        e.style.position = "absolute";
        e.style.display = "none";
        e.style.background = 'transparent';
        e.style.transformOrigin = e.style["WebkitTransformOrigin"] = "0 0 0";
        Stage.domElement.parentNode.appendChild(e);

        this.setFormat();
    }

    private setFormat() {
        let e = this._element;
        e.style.font = this._textFormat.size + "px " + this._font.name;
        e.style.color = convertToHtmlColor(this._textFormat.color);
        e.style.webkitTextStroke = this._textFormat.outline + "px " + convertToHtmlColor(this._textFormat.outlineColor);
        e.style.textAlign = this._textFormat.align;
    }

    public dispose() {
        super.dispose();

        if (this._element) {
            this._element.style.display = 'none';
            if (this._element.parentNode)
                this._element.parentNode.removeChild(this._element);
            this._element = null;
        }
    }

    private __focusIn() {
        if (!this.editable || this._editing)
            return;

        if (!this._font)
            this.applyFormat();

        if (!this._element)
            this.createElement();

        this.localToGlobal(0, 0, s_v2);
        this.localToGlobal(1, 1, s_v2_2);
        s_v2_2.sub(s_v2);

        let e = this._element;

        e.style.width = this.width.toFixed(2) + "px";
        e.style.height = this.height.toFixed(2) + "px";
        e.style.display = "inline-block";
        e.style.left = (s_v2.x + 2) + "px";
        e.style.top = s_v2.y + "px";
        e.style.transform = "scale(" + s_v2_2.x.toFixed(3) + "," + s_v2_2.y.toFixed(3) + ")";

        e.value = this._text2;
        //e.maxLength = this.maxLength;
        e.focus();

        this._editing = true;
        this._graphics.material.visible = false;
        this.dispatchEvent("focus_in");
    }

    private __focusOut() {
        if (!this._editing)
            return;

        this._element.style.display = "none";
        this._element.blur();
        this._text2 = this._element.value;

        this._editing = false;
        this.updateText();
        this._graphics.material.visible = true;
        if (this.stage)
            this.dispatchEvent("focus_out");
    }

    private __removed() {
        if (this._editing)
            Stage.setFocus(null);
    }
}

var s_v2: Vector2 = new Vector2();
var s_v2_2: Vector2 = new Vector2();