import { TextField, GUTTER_X, GUTTER_Y } from "./TextField";
import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";

export class InputTextField extends TextField {
    public promptText: string;
    public maxLength: number;
    public keyboardType: string;
    public restrict: string;
    public editable: boolean;

    private _password: boolean;
    private _promptText: string;
    private _decodedPromptText: string;
    private _border: number;
    private _corner: number;
    private _borderColor: Color4;
    private _backgroundColor: Color4;
    private _editing: boolean;

    public constructor() {
        super();
        this._touchDisabled = false;

        this._input = true;

        this.maxLength = 0;
        this.editable = true;
        this._borderColor = new Color4();
        this._backgroundColor = new Color4(0xFFFFFF, 0);
    }

    public get password(): boolean {
        return this._password;
    }

    public set password(value: boolean) {
        this._password = value;
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
}