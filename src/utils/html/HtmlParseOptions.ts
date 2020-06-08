export class HtmlParseOptions {
    public linkUnderline: boolean;
    public linkColor: number;
    public ignoreWhiteSpace: boolean;

    public static defaultLinkUnderline: boolean = true;
    public static defaultLinkColor: number = 0x3A67CC;

    public constructor() {
        this.linkUnderline = HtmlParseOptions.defaultLinkUnderline;
        this.linkColor = HtmlParseOptions.defaultLinkColor;
    }
}