import { RichTextField } from "../../core/text/RichTextField";
import { HtmlElement } from "./HtmlElement";
import { IHtmlObject } from "./IHtmlObject";

export interface IHtmlPageContext {
    createObject(owner: RichTextField, element: HtmlElement): IHtmlObject;
    freeObject(obj: IHtmlObject): void;
}