import { Color4 } from "./Color";

export class ByteBuffer {
    public stringTable: Array<string>;
    public version: number = 0;
    public littleEndian?: boolean;

    protected _buffer: ArrayBuffer;
    protected _view: DataView;
    protected _pos: number;
    protected _length: number;

    public constructor(buffer: ArrayBuffer, offset?: number, length?: number) {
        offset = offset || 0;
        if (length == null || length == -1)
            length = buffer.byteLength - offset;

        this._buffer = buffer;
        this._view = new DataView(this._buffer, offset, length);
        this._pos = 0;
        this._length = length;
    }

    public get data(): ArrayBuffer {
        return this._buffer;
    }

    public get pos(): number {
        return this._pos;
    }

    public set pos(value: number) {
        if (value > this._length) throw "Out of bounds";
        this._pos = value;
    }

    public get length(): number {
        return this._length;
    }

    public skip(count: number): void {
        this._pos += count;
    }

    private validate(forward: number): void {
        if (this._pos + forward > this._length) throw "Out of bounds";
    }

    public readByte(): number {
        this.validate(1);
        let ret: number = this._view.getUint8(this._pos);
        this._pos++;
        return ret;
    }

    public readBool(): boolean {
        return this.readByte() == 1;
    }

    public readShort(): number {
        this.validate(2);
        let ret: number = this._view.getInt16(this._pos, this.littleEndian);
        this._pos += 2;
        return ret;
    }

    public readUshort(): number {
        this.validate(2);
        let ret: number = this._view.getUint16(this._pos, this.littleEndian);
        this._pos += 2;
        return ret;
    }

    public readInt(): number {
        this.validate(4);
        let ret: number = this._view.getInt32(this._pos, this.littleEndian);
        this._pos += 4;
        return ret;
    }

    public readUint(): number {
        this.validate(4);
        let ret: number = this._view.getUint32(this._pos, this.littleEndian);
        this._pos += 4;
        return ret;
    }

    public readFloat(): number {
        this.validate(4);
        let ret: number = this._view.getFloat32(this._pos, this.littleEndian);
        this._pos += 4;
        return ret;
    }

    public readString(len?: number): string {
        if (len == undefined) len = this.readUshort();
        this.validate(len);

        let decoder = new TextDecoder();
        let ret: string = decoder.decode(new DataView(this._buffer, this._view.byteOffset + this._pos, len));
        this._pos += len;

        return ret;
    }

    public readS(): string {
        var index: number = this.readUshort();
        if (index == 65534) //null
            return null;
        else if (index == 65533)
            return ""
        else
            return this.stringTable[index];
    }

    public readSArray(cnt: number): Array<string> {
        var ret: Array<string> = new Array<string>(cnt);
        for (var i: number = 0; i < cnt; i++)
            ret[i] = this.readS();

        return ret;
    }

    public writeS(value: string): void {
        var index: number = this.readUshort();
        if (index != 65534 && index != 65533)
            this.stringTable[index] = value;
    }

    public readColor(): number {
        var r: number = this.readByte();
        var g: number = this.readByte();
        var b: number = this.readByte();
        this.readByte(); //a

        return (r << 16) + (g << 8) + b;
    }

    public readFullColor(): Color4 {
        var r: number = this.readByte();
        var g: number = this.readByte();
        var b: number = this.readByte();
        var a: number = this.readByte();
        return new Color4((r << 16) + (g << 8) + b, a / 255);
    }

    public readChar(): string {
        var i: number = this.readUshort();
        return String.fromCharCode(i);
    }

    public readBuffer(): ByteBuffer {
        var count: number = this.readUint();
        this.validate(count);
        var ba: ByteBuffer = new ByteBuffer(this._buffer, this._view.byteOffset + this._pos, count);
        ba.stringTable = this.stringTable;
        ba.version = this.version;
        this._pos += count;
        return ba;
    }

    public seek(indexTablePos: number, blockIndex: number): boolean {
        var tmp: number = this._pos;
        this._pos = indexTablePos;
        var segCount: number = this.readByte();
        if (blockIndex < segCount) {
            var useShort: boolean = this.readByte() == 1;
            var newPos: number;
            if (useShort) {
                this._pos += 2 * blockIndex;
                newPos = this.readUshort();
            }
            else {
                this._pos += 4 * blockIndex;
                newPos = this.readUint();
            }

            if (newPos > 0) {
                this._pos = indexTablePos + newPos;
                return true;
            }
            else {
                this._pos = tmp;
                return false;
            }
        }
        else {
            this._pos = tmp;
            return false;
        }
    }
}
