namespace fgui
{
    export interface IHtmlPageContext {
        createObject(owner: RichTextField, element: HtmlElement): IHtmlObject;
        freeObject(obj: IHtmlObject): void;
    }
}
