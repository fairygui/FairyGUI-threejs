import { GTextField } from "./GTextField";
import { ByteBuffer } from "../utils/ByteBuffer";
import { InputTextField } from "../core/text/InputTextField";

export class GTextInput extends GTextField {
    constructor() {
        super();
    }

    protected createDisplayObject(): void {
        this._displayObject = this._textField = new InputTextField();
    }

    public get password(): boolean {
        return (<InputTextField>this._textField).password;
    }

    public set password(value: boolean) {
        (<InputTextField>this._textField).password = value;
    }

    public get keyboardType(): string {
        return (<InputTextField>this._textField).keyboardType;
    }

    public set keyboardType(value: string) {
        (<InputTextField>this._textField).keyboardType = value;
    }

    public set editable(value: boolean) {
        (<InputTextField>this._textField).editable = value;
    }

    public get editable(): boolean {
        return (<InputTextField>this._textField).editable;
    }

    public set maxLength(value: number) {
        (<InputTextField>this._textField).maxLength = value;
    }

    public get maxLength(): number {
        return (<InputTextField>this._textField).maxLength;
    }

    public set promptText(value: string) {
        (<InputTextField>this._textField).promptText = value;
    }

    public get promptText(): string {
        return (<InputTextField>this._textField).promptText;
    }

    public set restrict(value: string) {
        (<InputTextField>this._textField).restrict = value;
    }

    public get restrict(): string {
        return (<InputTextField>this._textField).restrict;
    }

    public requestFocus(): void {
    }

    public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
        super.setup_beforeAdd(buffer, beginPos);

        buffer.seek(beginPos, 4);

        var str: string = buffer.readS();
        if (str != null)
            this.promptText = str;

        str = buffer.readS();
        if (str != null)
            this.restrict = str;

        var iv: number = buffer.readInt();
        if (iv != 0)
            this.maxLength = iv;
        iv = buffer.readInt();
        if (iv != 0) {
            if (iv == 4)
                this.keyboardType = "number";
            else if (iv == 3)
                this.keyboardType = "url";
        }
        if (buffer.readBool())
            this.password = true;
    }
}
