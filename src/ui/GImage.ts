import { Image } from "../core/Image";
import { ObjectPropID } from "./FieldTypes";
import { GObject } from "./GObject";
import { PackageItem } from "./PackageItem";
import { ByteBuffer } from "../utils/ByteBuffer";

export class GImage extends GObject {
    private _image: Image;
    private _contentItem: PackageItem;

    constructor() {
        super();
    }

    public get color(): number {
        return this._image.graphics.color;
    }

    public set color(value: number) {
        if (this._image.graphics.color != value) {
            this._image.graphics.color = value;
            this.updateGear(4);
        }
    }

    public get flip(): number {
        return this._image.graphics.flip;
    }

    public set flip(value: number) {
        this._image.graphics.flip = value;
    }

    public get fillMethod(): number {
        return this._image.fillMethod;
    }

    public set fillMethod(value: number) {
        this._image.fillMethod = value;
    }

    public get fillOrigin(): number {
        return this._image.fillOrigin;
    }

    public set fillOrigin(value: number) {
        this._image.fillOrigin = value;
    }

    public get fillClockwise(): boolean {
        return this._image.fillClockwise;
    }

    public set fillClockwise(value: boolean) {
        this._image.fillClockwise = value;
    }

    public get fillAmount(): number {
        return this._image.fillAmount;
    }

    public set fillAmount(value: number) {
        this._image.fillAmount = value;
    }

    protected createDisplayObject(): void {
        this._displayObject = this._image = new Image();
    }

    protected handleSizeChanged(): void {
        this._image.width = this._width;
        this._image.height = this._height;
    }

    public constructFromResource(): void {
        this._contentItem = this.packageItem.getBranch();

        this.sourceWidth = this._contentItem.width;
        this.sourceHeight = this._contentItem.height;
        this.initWidth = this.sourceWidth;
        this.initHeight = this.sourceHeight;

        this._contentItem = this._contentItem.getHighResolution();
        this._contentItem.load();

        this._image.scale9Grid = this._contentItem.scale9Grid;
        this._image.scaleByTile = this._contentItem.scaleByTile;
        this._image.tileGridIndice = this._contentItem.tileGridIndice;
        this._image.texture = this._contentItem.texture;

        this.setSize(this.sourceWidth, this.sourceHeight);
    }

    public getProp(index: number): any {
        if (index == ObjectPropID.Color)
            return this.color;
        else
            return super.getProp(index);
    }

    public setProp(index: number, value: any): void {
        if (index == ObjectPropID.Color)
            this.color = value;
        else
            super.setProp(index, value);
    }

    public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
        super.setup_beforeAdd(buffer, beginPos);

        buffer.seek(beginPos, 5);

        if (buffer.readBool())
            this.color = buffer.readColor();
        this.flip = buffer.readByte();
        this._image.fillMethod = buffer.readByte();
        if (this._image.fillMethod != 0) {
            this._image.fillOrigin = buffer.readByte();
            this._image.fillClockwise = buffer.readBool();
            this._image.fillAmount = buffer.readFloat();
        }
    }
}
