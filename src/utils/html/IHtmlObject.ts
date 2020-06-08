import { HtmlElement } from "./HtmlElement";
import { RichTextField } from "../../core/text/RichTextField";
import { DisplayObject } from "../../core/DisplayObject";

export interface IHtmlObject {
    width: number;
    height: number;
    displayObject: DisplayObject;
    element: HtmlElement;

    create(owner: RichTextField, element: HtmlElement):void;
    setPosition(x: number, y: number):void;
    add():void;
    remove():void;
    release():void;
    dispose():void;
}