import { DisplayObject } from "../../core/DisplayObject";
import { RichTextField } from "../../core/text/RichTextField";
import { SelectionShape } from "../../core/text/SelectionShape";
import { HtmlElement } from "./HtmlElement";
import { IHtmlObject } from "./IHtmlObject";
import { bubbleEvent } from "../../core/Stage";

export class HtmlLink implements IHtmlObject {
    private _owner: RichTextField;
    private _element: HtmlElement;
    private _shape: SelectionShape;

    public constructor() {
        this._shape = new SelectionShape();
        this._shape.on("click", () => {
            bubbleEvent(this._owner.obj3D, "click_link", this._element.getAttrString("href"));
        });
    }

    public get displayObject(): DisplayObject {
        return this._shape;
    }

    public get element(): HtmlElement {
        return this._element;
    }

    public get width(): number {
        return 0;
    }

    public get height(): number {
        return 0;
    }

    public create(owner: RichTextField, element: HtmlElement): void {
        this._owner = owner;
        this._element = element;
    }

    public setArea(startLine: number, startCharX: number, endLine: number, endCharX: number): void {
        if (startLine == endLine && startCharX > endCharX) {
            let tmp = startCharX;
            startCharX = endCharX;
            endCharX = tmp;
        }
        this._shape.rects.length = 0;
        this._owner.getLinesShape(startLine, startCharX, endLine, endCharX, true, this._shape.rects);
        this._shape.refresh();
    }

    public setPosition(x: number, y: number): void {
        this._shape.setPosition(x, y);
    }

    public add(): void {
        this._owner.addChild(this._shape);
    }

    public remove(): void {
        if (this._shape.parent)
            this._owner.removeChild(this._shape);
    }

    public release(): void {
        this._shape.offAll();
        this._owner = null;
        this._element = null;
    }

    public dispose(): void {
        this._shape.dispose();
    }
}