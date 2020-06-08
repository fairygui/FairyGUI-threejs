import { NTexture } from "../NTexture";
import { TextFormat } from "./TextFormat";
import { VertexBuffer } from "../mesh/VertexBuffer";

export type GlyphInfo = {
    width: number;
    height: number;
    baseline: number;
}

export interface BaseFont {
    name: string;
    version: number;
    mainTexture: NTexture;
    isDynamic?: boolean;
    keepCrisp?: boolean;
    setFormat(format: TextFormat, fontSizeScale: number): void;
    prepareCharacters(text: string): void;
    getGlyph(ch: string, ret: GlyphInfo): boolean;
    drawGlyph(x: number, y: number, vb: VertexBuffer): number;
    drawLine(x: number, y: number, width: number, fontSize: number, type: number, vb: VertexBuffer): number;
    getLineHeight(size: number): number;
}