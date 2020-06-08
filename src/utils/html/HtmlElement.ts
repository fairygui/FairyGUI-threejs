import { Vector2 } from "three";
import { TextFormat } from "../../core/text/TextFormat";
import { Pool } from "../Pool";
import { XMLIterator } from "../xml/XMLIterator";
import { XMLUtils } from "../xml/XMLUtils";
import { IHtmlObject } from "./IHtmlObject";

export enum HtmlElementType {
    Text,
    Link,
    Image,
    Input,
    Select,
    Object,

    //internal
    LinkEnd,
}

export class HtmlElement {
    public type: HtmlElementType;
    public name: string;
    public text: string;
    public format: TextFormat;
    public charIndex: number;

    public htmlObject: IHtmlObject;
    public status: number; //1 hidden 2 clipped 4 added
    public space: number;
    public position: Vector2;

    public _attributes: { [index: string]: any };

    public constructor() {
        this.format = new TextFormat();
        this.position = new Vector2();
    }

    public getAttr(attrName: string): any {
        if (this._attributes == null)
            return null;

        return this._attributes[attrName];
    }

    public setAttr(attrName: string, attrValue: any) {
        if (this._attributes == null)
            this._attributes = {};

        this._attributes[attrName] = attrValue;
    }

    public getAttrString(attrName: string, defValue?: string) {
        return XMLUtils.getString(this._attributes, attrName, defValue);
    }

    public getAttrInt(attrName: string, defValue?: number): number {
        return XMLUtils.getInt(this._attributes, attrName, defValue);
    }

    public getAttrFloat(attrName: string, defValue?: number): number {
        return XMLUtils.getFloat(this._attributes, attrName, defValue);
    }

    public getAttrBool(attrName: string, defValue?: boolean): boolean {
        return XMLUtils.getBool(this._attributes, attrName, defValue);
    }

    public getAttrColor(attrName: string, defValue?: number): number {
        return XMLUtils.getColor(this._attributes, attrName, defValue);
    }

    public fetchAttributes() {
        this._attributes = XMLIterator.getAttributes(this._attributes);
    }

    public get isEntity(): boolean {
        return this.type == HtmlElementType.Image || this.type == HtmlElementType.Select
            || this.type == HtmlElementType.Input || this.type == HtmlElementType.Object;
    }

    public reset() {
        this.name = null;
        this.text = null;
        this.htmlObject = null;
        this.status = 0;
        this._attributes = null;
    }
}

export var elementPool = new Pool<HtmlElement>(HtmlElement,
    (element, ...argArray: any[]) => {
        element.type = argArray[0];
        if (element.type != HtmlElementType.Text && element._attributes == null)
            element._attributes = {};
    },
    element => element.reset());