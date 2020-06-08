import { RichTextField } from "../../core/text/RichTextField";
import { Pool } from "../Pool";
import { HtmlElement, HtmlElementType } from "./HtmlElement";
import { HtmlImage } from "./HtmlImage";
import { HtmlLink } from "./HtmlLink";
import { IHtmlObject } from "./IHtmlObject";
import { IHtmlPageContext } from "./IHtmlPageContext";

export class HtmlPageContext implements IHtmlPageContext {
    private _imagePool: Pool<HtmlImage>;
    private _linkPool: Pool<HtmlLink>;

    public constructor() {
        this._imagePool = new Pool<HtmlImage>(HtmlImage);
        this._linkPool = new Pool<HtmlLink>(HtmlLink);
    }

    public createObject(owner: RichTextField, element: HtmlElement): IHtmlObject {
        let ret: IHtmlObject = null;
        if (element.type == HtmlElementType.Image)
            ret = this._imagePool.borrow();
        else if (element.type == HtmlElementType.Link)
            ret = this._linkPool.borrow();

        if (ret)
            ret.create(owner, element);

        return ret;
    }

    public freeObject(obj: IHtmlObject): void {
        obj.release();
        if (obj instanceof HtmlImage)
            this._imagePool.returns(obj);
        else if (obj instanceof HtmlLink)
            this._linkPool.returns(obj);
    }
}

export var defaultContext: IHtmlPageContext = new HtmlPageContext();
