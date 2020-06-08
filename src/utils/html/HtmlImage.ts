import { DisplayObject } from "../../core/DisplayObject";
import { RichTextField } from "../../core/text/RichTextField";
import { LoaderFillType, ObjectType } from "../../ui/FieldTypes";
import { GLoader } from "../../ui/GLoader";
import { PackageItem } from "../../ui/PackageItem";
import { UIPackage } from "../../ui/UIPackage";
import { HtmlElement } from "./HtmlElement";
import { IHtmlObject } from "./IHtmlObject";
import { UIObjectFactory } from "../../ui/UIObjectFactory";

export class HtmlImage implements IHtmlObject {
    public readonly loader: GLoader;

    private _owner: RichTextField;
    private _element: HtmlElement;

    public constructor() {
        this.loader = <GLoader>UIObjectFactory.newObject(ObjectType.Loader);
        this.loader.fill = LoaderFillType.ScaleFree;
        this.loader.touchable = false;
    }

    public get displayObject(): DisplayObject {
        return this.loader.displayObject;
    }

    public get element(): HtmlElement {
        return this._element;
    }

    public get width(): number {
        return this.loader.width;
    }

    public get height(): number {
        return this.loader.height;
    }

    public create(owner: RichTextField, element: HtmlElement): void {
        this._owner = owner;
        this._element = element;

        let sourceWidth = 0;
        let sourceHeight = 0;
        let src: string = element.getAttrString("src");
        if (src != null) {
            let pi: PackageItem = UIPackage.getItemByURL(src);
            if (pi) {
                sourceWidth = pi.width;
                sourceHeight = pi.height;
            }
        }

        this.loader.url = src;

        let width = element.getAttrInt("width", sourceWidth);
        let height = element.getAttrInt("height", sourceHeight);

        if (width == 0)
            width = 5;
        if (height == 0)
            height = 10;
        this.loader.setSize(width, height);
    }

    public setPosition(x: number, y: number): void {
        this.loader.setPosition(x, y);
    }

    public add(): void {
        this._owner.addChild(this.loader.displayObject);
    }

    public remove(): void {
        if (this.loader.displayObject.parent)
            this._owner.removeChild(this.loader.displayObject);
    }

    public release(): void {
        this.loader.offAll();
        this.loader.url = null;
        this._owner = null;
        this._element = null;
    }

    public dispose(): void {
        this.loader.dispose();
    }
}