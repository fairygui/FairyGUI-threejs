import { Audio } from 'three';
import { PixelHitTestData } from "../core/hittest/PixelHitTest";
import { Frame } from "../core/MovieClip";
import { NTexture } from "../core/NTexture";
import { BitmapFont } from "../core/text/BitmapFont";
import { ByteBuffer } from "../utils/ByteBuffer";
import { Rect } from "../utils/Rect";
import { UIContentScaler } from "./UIContentScaler";
import { UIPackage } from "./UIPackage";

export class PackageItem {
    public owner: UIPackage;

    public type: number;
    public objectType: number;

    public id: string;
    public name: string;
    public width: number = 0;
    public height: number = 0;
    public file: string;
    public decoded?: boolean;
    public rawData?: ByteBuffer;

    public highResolution?: Array<string>;
    public branches?: Array<string>;

    //image
    public scale9Grid?: Rect;
    public scaleByTile?: boolean;
    public tileGridIndice?: number;
    public smoothing?: boolean;
    public texture?: NTexture;
    public pixelHitTestData?: PixelHitTestData;

    //movieclip
    public interval?: number;
    public repeatDelay?: number;
    public swing?: boolean;
    public frames?: Frame[];

    //componenet
    public extensionType?: any;

    //font 
    public bitmapFont?: BitmapFont;

    //sound
    public audioBuffer?: AudioBuffer;
    public sound?: Audio;

    constructor() {
    }

    public load(): Object {
        return this.owner.getItemAsset(this);
    }

    public getBranch(): PackageItem {
        if (this.branches && this.owner._branchIndex != -1) {
            var itemId: string = this.branches[this.owner._branchIndex];
            if (itemId)
                return this.owner.getItemById(itemId);
        }

        return this;
    }

    public getHighResolution(): PackageItem {
        if (this.highResolution && UIContentScaler.scaleLevel > 0) {
            var itemId: string = this.highResolution[UIContentScaler.scaleLevel - 1];
            if (itemId)
                return this.owner.getItemById(itemId);
        }

        return this;
    }

    public toString(): string {
        return this.name;
    }
}
