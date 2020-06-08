import { BaseFont, GlyphInfo } from "./BaseFont";
import { TextFormat } from "./TextFormat";
import { VertexBuffer } from "../mesh/VertexBuffer";
import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
import { NTexture } from "../NTexture";
import { Vector2 } from "three";

var s_rect = new Rect();
var c_white = new Color4(0xFFFFFF, 1);

export class BitmapFont implements BaseFont {
    public name: string;
    public version: number = 0;
    public mainTexture: NTexture;
    public size: number = 0;
    public glyphs: { [index: string]: BMGlyph };
    public resizable: boolean;
    public hasChannel: boolean;
    public tint: boolean;

    private _color: Color4;
    private _scale: number;
    private _glyph: BMGlyph;

    constructor() {
        this.glyphs = {};
        this._color = new Color4();
    }

    public setFormat(format: TextFormat, fontSizeScale: number) {
        if (this.resizable)
            this._scale = format.size / this.size * fontSizeScale;
        else
            this._scale = fontSizeScale;
        this._color.setHex(format.color);
    }

    public prepareCharacters(text: string): void {
    }

    public getGlyph(ch: string, ret: GlyphInfo): boolean {
        if (ch == ' ') {
            ret.width = Math.round(this.size * this._scale / 2);
            ret.height = Math.round(this.size * this._scale);
            ret.baseline = ret.height;
            this._glyph = null;
            return true;
        }
        else if (this._glyph = this.glyphs[ch]) {
            ret.width = Math.round(this._glyph.advance * this._scale);
            ret.height = Math.round(this._glyph.lineHeight * this._scale);
            ret.baseline = ret.height;
            return true;
        }
        else {
            ret.width = 0;
            ret.height = 0;
            ret.baseline = 0;
            return false;
        }
    }

    public drawGlyph(x: number, y: number, vb: VertexBuffer): number {
        if (!this._glyph)
            return 0;

        let tx = x + this._glyph.x * this._scale;
        let ty = -y - this._glyph.y * this._scale;
        let bx = x + (this._glyph.x + this._glyph.width) * this._scale;
        let by = -y - (this._glyph.y + this._glyph.height) * this._scale;
        s_rect.setMinMax(tx, by, bx, ty);
        vb.addQuad(s_rect, this._glyph.uv, this.tint ? this._color : c_white);
        vb.addTriangles(-4);
        return 4;
    }

    public drawLine(x: number, y: number, width: number, fontSize: number, type: number, vb: VertexBuffer): number {
        return 0;
    }

    public getLineHeight(size: number): number {
        for (var key in this.glyphs) {
            let glyph = this.glyphs[key];
            if (this.resizable)
                return Math.round(glyph.lineHeight * size / this.size);
            else
                return glyph.lineHeight;
        }

        return 0;
    }
}

export class BMGlyph {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public advance: number = 0;
    public lineHeight: number = 0;
    public channel: number = 0;
    public uv: Array<Vector2> = [new Vector2(), new Vector2(), new Vector2(), new Vector2()];
}
