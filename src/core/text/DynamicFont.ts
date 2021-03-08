import { NTexture } from "../NTexture";
import { TextFormat } from "./TextFormat";
import { GlyphInfo } from "./BaseFont";
import { VertexBuffer } from "../mesh/VertexBuffer";
import { Texture, LinearFilter } from "three";
import { Rect } from "../../utils/Rect";
import { Color4 } from "../../utils/Color";
import { Stage } from "../Stage";

type OutlineGlyph = {
    uvRect: Rect;
    vertRect: Rect;
    chl?: number,
    ver: number;
}

type Glyph = {
    uvRect?: Rect;
    vertRect?: Rect;
    advance?: number;
    sourceRect?: Rect;
    chl?: number,
    baseline?: number,
    ver: number;

    outlines?: { [index: number]: OutlineGlyph }
}

var s_rect = new Rect();

export class DynamicFont {
    public version: number = 0;
    public mainTexture: NTexture;
    public isDynamic: boolean = true;
    public keepCrisp: boolean = true;

    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _texture: Texture;
    protected _packers: Array<BinPacker>;
    protected _glyphs: { [index: number]: Glyph };

    protected _name: string;
    protected _format: TextFormat;
    protected _size: number;
    protected _glyph: Glyph;
    protected _color: Color4;
    protected _outlineColor: Color4;
    protected _scale: number = 1;

    protected eSpan: HTMLSpanElement;
    protected eBlock: HTMLDivElement;

    public constructor() {
        this._glyphs = {};
        this._color = new Color4();
        this._outlineColor = new Color4();
        this._packers = [new BinPacker(), new BinPacker(), new BinPacker()];

        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
        this._context.globalCompositeOperation = "lighter";
        
        this.createTexture(512);
        
        this._scale = Stage.devicePixelRatio;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
        this._canvas.id = value;
    }

    private createTexture(size: number): void {
        this._canvas.width = this._canvas.height = size;

        if (!this.mainTexture) {
            this._texture = new Texture(this._canvas);
            this._texture.generateMipmaps = false;
            this._texture.magFilter = LinearFilter;
            this._texture.minFilter = LinearFilter;
            this.mainTexture = new NTexture(this._texture);
        }
        else {
            this._texture.needsUpdate = true;
            this.mainTexture.reload(this._texture);
        }

        this.clearTexture();
    }

    private clearTexture(): void {
        this._context.fillStyle = 'black';
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.globalCompositeOperation = "lighter";

        for (let i = 0; i < 3; i++)
            this._packers[i].init(this._canvas.width, this._canvas.height);
    }

    protected rebuild(): void {
        if (this._canvas.width < 2048)
            this.createTexture(this._canvas.width * 2);
        else
            this.clearTexture();
        this.version++;
        Stage.fontRebuilt = true;
        console.log("font atlas rebuilt : %s (%d)", this.name, this._canvas.width);
    }

    public setFormat(format: TextFormat, fontSizeScale: number) {
        this._format = format;
        let size = format.size * fontSizeScale;
        this._size = Math.floor(size);
        if (this._size == 0)
            this._size = 1;
        this._color.setHex(format.color);
        this._outlineColor.setHex(format.outlineColor);
    }

    public prepareCharacters(text: string) 
    {
        let len = text.length;
        let i:number = 0;
        //绘制文本本体
        for (i = 0; i < len; i++) 
        {
            let ch = text[i];
            let glyph = this.getGlyphsOf(ch,this._size);
            if (this._format.outline > 0)
            {
                this.prepareOutline(ch, glyph, this._size, this._format.outline);
            }
            this.prepareChar(ch, this._size,glyph);
            glyph.ver = this.version;
        }
    }

    protected getGlyphsOf(ch:string,size:number):Glyph
    {
        let key: number = (size << 16) + ch.charCodeAt(0);
        let glyph: Glyph = this._glyphs[key];
        if (glyph && glyph.ver == this.version)
            return glyph;
        if (this.keepCrisp)
            size *= this._scale;
        this._context.font = size + "px " + this._name;

        if (!glyph) {
            glyph = this.measureChar(ch, size);
            this._glyphs[key] = glyph;
        }
        return glyph;
    }

    protected prepareChar(ch: string, size: number,glyph:Glyph): Glyph 
    {
        if (this.keepCrisp)
            size *= this._scale;
        let w: number = glyph.sourceRect.width;
        let h: number = glyph.sourceRect.height;
        if (w == 0)
            return glyph;

        let node: Node = this.addNode(w + 2, h + 2);
        if (!node) {
            this.rebuild();
            return null;
        }
    
        this._context.font = size + "px " + this._name;
        this._context.textBaseline = "alphabetic";
        this._context.fillStyle = node.z == 0 ? "#FF0000" : (node.z == 1 ? "#00FF00" : "#0000FF");
        this._context.fillText(ch, node.x + glyph.sourceRect.x, node.y + glyph.baseline);
        this._texture.needsUpdate = true;

        glyph.chl = node.z / 3;
        glyph.uvRect.set(node.x / this.mainTexture.width, 1 - (node.y + h) / this.mainTexture.height,
            w / this.mainTexture.width, h / this.mainTexture.height);

        return glyph;
    }

    protected prepareOutline(ch: string, glyph: Glyph, size: number, outline: number): void {
        if (!glyph.outlines)
            glyph.outlines = {};

        let outlineGlyph: OutlineGlyph = glyph.outlines[outline];
        if (outlineGlyph && outlineGlyph.ver == this.version || glyph.sourceRect.width == 0)
            return;

        if (!outlineGlyph) {
            outlineGlyph = { vertRect: new Rect(), uvRect: new Rect(), ver: this.version };
            glyph.outlines[outline] = outlineGlyph;
        }
        else
            outlineGlyph.ver = this.version;

        let outline2 = outline;
        if (this.keepCrisp)
            outline2 *= this._scale;
        let w: number = glyph.sourceRect.width + outline2 * 2;
        let h: number = glyph.sourceRect.height + outline2 * 2;

        let node: Node = this.addNode(w + 2, h + 2);
        if (!node) {
            this.rebuild();
            return null;
        }

        if (this.keepCrisp)
            size *= this._scale;
        this._context.font = size + "px " + this._name;
        this._context.textBaseline = "alphabetic";
        this._context.strokeStyle = node.z == 0 ? "#FF0000" : (node.z == 1 ? "#00FF00" : "#0000FF");
        this._context.lineJoin = 'round';
        this._context.lineWidth = outline2;
        this._context.strokeText(ch, node.x + glyph.sourceRect.x + outline2, node.y + glyph.baseline + outline2);
        this._texture.needsUpdate = true;

        outlineGlyph.chl = node.z / 3;
        outlineGlyph.vertRect.copy(glyph.vertRect);
        outlineGlyph.vertRect.extend(outline, outline);
        outlineGlyph.uvRect.set(node.x / this.mainTexture.width, 1 - (node.y + h) / this.mainTexture.height,
            w / this.mainTexture.width, h / this.mainTexture.height);
    }

    protected measureChar(ch: string, size: number): Glyph {
        let left: number, top: number, w: number, h: number, baseline: number;
        this._context.textBaseline = "alphabetic";
        let met: TextMetrics = this._context.measureText(ch);
        if ('actualBoundingBoxLeft' in met) {
            this._context.textBaseline = "top";
            let met1: TextMetrics = this._context.measureText(ch);

            left = met.actualBoundingBoxLeft > 0 ? Math.ceil(met.actualBoundingBoxLeft) : 0;
            top = Math.ceil(met1.actualBoundingBoxAscent) + 1;
            w = Math.ceil(left + met.actualBoundingBoxRight) + 1;
            h = Math.ceil(met.actualBoundingBoxAscent + met.actualBoundingBoxDescent) + 2;
            baseline = Math.ceil(met.actualBoundingBoxAscent);
        }
        else {
            baseline = this.getBaseline(ch, this._name, size);
            left = 0;
            if (ch == 'j')
                left = Math.ceil(size / 20); //guess
            top = 0;
            w = met["width"];
            h = size * 1.25 + 2;
        }

        let glyph: Glyph;
        if (w == 0) {
            glyph = { ver: this.version };
        }
        else {
            glyph = {
                uvRect: new Rect(),
                vertRect: new Rect(-left, -baseline, w, h),
                advance: met.width,
                sourceRect: new Rect(left, top, w, h),
                baseline: baseline,
                ver: this.version
            };

            if (this.keepCrisp) {
                glyph.vertRect.x /= this._scale;
                glyph.vertRect.y /= this._scale;
                glyph.vertRect.width /= this._scale;
                glyph.vertRect.height /= this._scale;
                glyph.advance /= this._scale;
            }
        }

        return glyph;
    }

    protected addNode(w: number, h: number): Node {
        let node: Node;
        for (let i: number = 0; i < 3; i++) {
            let packer = this._packers[i];
            if (!packer.full && (node = packer.add(w, h))) {
                node.z = i;
                break;
            }
        }

        return node;
    }

    public getGlyph(ch: string, ret: GlyphInfo): boolean {
        let key: number = (this._size << 16) + ch.charCodeAt(0);
        this._glyph = this._glyphs[key];

        if (!this._glyph)
            return false;

        ret.width = this._glyph.advance;
        ret.height = Math.round(this._size * 1.25);
        ret.baseline = Math.round(this._size);

        return true;
    }

    public drawGlyph(x: number, y: number, vb: VertexBuffer): number {
        if (!this._glyph.vertRect)
            return 0;

        if (this._format.outline > 0) {
            if (!this._glyph.outlines)
                return 0;

            let outlineGlyph = this._glyph.outlines[this._format.outline];

            s_rect.copy(outlineGlyph.vertRect);
            s_rect.x += x;
            s_rect.y -= y;
            this._outlineColor.a = outlineGlyph.chl;
            vb.addQuad(s_rect, outlineGlyph.uvRect, this._outlineColor);
            vb.addTriangles(-4);
        }

        s_rect.copy(this._glyph.vertRect);
        s_rect.x += x;
        s_rect.y -= y;
        this._color.a = this._glyph.chl;
        vb.addQuad(s_rect, this._glyph.uvRect, this._color);
        vb.addTriangles(-4);
        return 4;
    }

    public drawLine(x: number, y: number, width: number, fontSize: number, type: number, vb: VertexBuffer): number {
        return 0;
    }

    public getLineHeight(size: number): number {
        return Math.round(size * 1.25);
    }

    getBaseline(ch: string, font: string, size: number): number 
    {
        if (!this.eSpan) {
            this.eSpan = document.createElement('span');
            this.eBlock = document.createElement("div");
            this.eBlock.style.display = 'inline-block';
            this.eBlock.style.width = '1px';
            this.eBlock.style.height = '0px';

            var div = document.createElement('div');
            div.id = 'measureText';
            div.style.position = 'absolute';
            div.style.visibility = 'hidden';
            div.style.left = div.style.top = '0px';
            div.appendChild(this.eSpan);
            div.appendChild(this.eBlock);
            document.body.appendChild(div);
            }

        this.eSpan.innerHTML = ch;
        this.eSpan.style.fontFamily = font;
        this.eSpan.style.fontSize = size + "px";

        let ascent: number, height: number;
        let offset = this.eSpan.offsetTop;

        this.eBlock.style.verticalAlign = 'baseline';
        ascent = this.eBlock.offsetTop - offset;

        this.eBlock.style.verticalAlign = 'bottom';
        height = this.eBlock.offsetTop - offset;

        return ascent + Math.floor((size - height));
    }
}

type Node = { x: number, y: number, z?: number };

class BinPacker {
    public full?: boolean;
    private _root: any;

    public init(w: number, h: number) {
        this._root = { x: 0, y: 0, w: w, h: h };
        delete this.full;
    }

    public add(w: number, h: number): Node {
        let node: Node;
        if (node = this.findNode(this._root, w, h))
            node = this.splitNode(node, w, h);

        if (!node)
            this.full = true;

        return node;
    }

    private findNode(root: any, w: number, h: number): any {
        if (root.used)
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        else if ((w <= root.w) && (h <= root.h))
            return root;
        else
            return null;
    }

    private splitNode(node: any, w: number, h: number): Node {
        node.used = true;
        node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
        node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
        return node;
    }
}


