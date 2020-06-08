import { ByteBuffer } from "../../utils/ByteBuffer";
import { Rect } from "../../utils/Rect";
import { IHitTest } from "./IHitTest";

export class PixelHitTestData {
    public pixelWidth: number;
    public scale: number;
    public pixels: Uint8Array;

    public load(ba: ByteBuffer) {
        ba.readInt();
        this.pixelWidth = ba.readInt();
        this.scale = 1.0 / ba.readByte();
        let len = ba.readInt();
        this.pixels = new Uint8Array(ba.data, ba.pos, len);
        ba.skip(len);
    }
}

export class PixelHitTest implements IHitTest {
    public offsetX: number;
    public offsetY: number;
    public sourceWidth: number;
    public sourceHeight: number;

    private _data: PixelHitTestData;

    public constructor(data: PixelHitTestData, offsetX: number, offsetY: number, sourceWidth: number, sourceHeight: number) {
        this._data = data;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
    }

    public hitTest(contentRect: Rect, x: number, y: number): boolean {
        if (!contentRect.contains(x, y))
            return false;

        let data = this._data;

        x = Math.floor((x * this.sourceWidth / contentRect.width - this.offsetX) * data.scale);
        y = Math.floor((y * this.sourceHeight / contentRect.height - this.offsetY) * data.scale);
        if (x < 0 || y < 0 || x >= data.pixelWidth)
            return false;

        let pos: number = y * data.pixelWidth + x;
        let pos2: number = Math.floor(pos / 8);
        let pos3: number = pos % 8;

        if (pos2 >= 0 && pos2 < data.pixels.length)
            return ((data.pixels[pos2] >> pos3) & 0x1) > 0;
        else
            return false;
    }
}