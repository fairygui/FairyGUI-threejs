import { Vector2 } from "three";
import { AlignType, AutoSizeType, VertAlignType } from "../../ui/FieldTypes";
import { UIConfig } from "../../ui/UIConfig";
import { HtmlElement, HtmlElementType, elementPool } from "../../utils/html/HtmlElement";
import { HtmlLink } from "../../utils/html/HtmlLink";
import { defaultParser } from "../../utils/html/HtmlParser";
import { IHtmlObject } from "../../utils/html/IHtmlObject";
import { Pool } from "../../utils/Pool";
import { Rect } from "../../utils/Rect";
import { clamp } from "../../utils/ToolSet";
import { DisplayObject } from "../DisplayObject";
import { IMeshFactory } from "../mesh/MeshFactory";
import { VertexBuffer } from "../mesh/VertexBuffer";
import { NGraphics } from "../NGraphics";
import { BaseFont, GlyphInfo } from "./BaseFont";
import { FontManager } from "./FontManager";
import { TextFormat } from "./TextFormat";

export class TextField extends DisplayObject implements IMeshFactory {
    private _verticalAlign: VertAlignType;
    private _textFormat: TextFormat;
    private _text: string;
    private _autoSize: AutoSizeType;
    private _wordWrap: boolean;
    private _singleLine: boolean;
    private _html: boolean;
    private _maxWidth: number;
    private _elements: Array<HtmlElement>;
    private _lines: Array<LineInfo>;
    private _charPositions: Array<CharPosition>;
    private _font: BaseFont;
    private _textWidth: number;
    private _textHeight: number;
    private _textChanged: boolean;
    private _yOffset: number;
    private _fontSizeScale: number;
    private _fontVersion: number;
    private _parsedText: string;
    private _updatingSize?: boolean;

    protected _input?: boolean;
    protected _rich?: boolean;

    constructor() {
        super();

        this._touchDisabled = true;

        this._graphics = new NGraphics(this.obj3D);
        this._graphics.meshFactory = this;

        this._textFormat = new TextFormat();
        this._fontSizeScale = 1;

        this._wordWrap = false;
        this._text = "";
        this._parsedText = "";

        this._elements = new Array<HtmlElement>();
        this._lines = new Array<LineInfo>();
    }

    public get textFormat(): TextFormat {
        return this._textFormat;
    }

    public applyFormat(): void {
        let fontName: string = this._textFormat.font;
        if (!fontName)
            fontName = UIConfig.defaultFont;
        let newFont: BaseFont = FontManager.getFont(fontName);
        if (this._font != newFont) {
            this._font = newFont;
            this._fontVersion = this._font.version;
            this._graphics.texture = this._font.mainTexture;
            this._graphics.setKeyword("TEXT", this._font.isDynamic);
        }

        if (this._text)
            this._textChanged = true;
    }

    public get align(): AlignType {
        return this._textFormat.align;
    }

    public set align(value: AlignType) {

        if (this._textFormat.align != value) {
            this._textFormat.align = value;
            if (this._text)
                this._textChanged = true;
        }
    }

    public get verticalAlign(): VertAlignType {
        return this._verticalAlign;
    }

    public set verticalAlign(value: VertAlignType) {

        if (this._verticalAlign != value) {
            this._verticalAlign = value;
            if (!this._textChanged)
                this.applyVertAlign();
        }
    }

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        if (this._text == value && !this._html)
            return;

        this._text = value;
        this._textChanged = true;
        this._html = false;
    }

    public get htmlText(): string {
        return this._text;
    }

    public set htmlText(value: string) {
        if (this._text == value && this._html)
            return;

        this._text = value;
        this._textChanged = true;
        this._html = true;
    }

    public get parsedText(): string {
        return this._parsedText;
    }

    public get autoSize(): AutoSizeType {
        return this._autoSize;
    }

    public set autoSize(value: AutoSizeType) {
        if (this._autoSize != value) {
            this._autoSize = value;
            this._textChanged = true;
        }
    }

    public get wordWrap(): boolean {
        return this._wordWrap;
    }

    public set wordWrap(value: boolean) {
        if (this._wordWrap != value) {
            this._wordWrap = value;
            this._textChanged = true;
        }
    }

    public get singleLine(): boolean {
        return this._singleLine;
    }

    public set singleLine(value: boolean) {
        if (this._singleLine != value) {
            this._singleLine = value;
            this._textChanged = true;
        }
    }

    public get textWidth(): number {
        if (this._textChanged)
            this.buildLines();

        return this._textWidth;
    }

    public get textHeight(): number {
        if (this._textChanged)
            this.buildLines();

        return this._textHeight;
    }

    public get maxWidth(): number {
        return this._maxWidth;
    }

    public set maxWidth(value: number) {
        if (this._maxWidth != value) {
            this._maxWidth = value;
            this._textChanged = true;
        }
    }

    public get htmlElements(): Array<HtmlElement> {
        if (this._textChanged)
            this.buildLines();

        return this._elements;
    }

    public get lines(): Array<LineInfo> {
        if (this._textChanged)
            this.buildLines();

        return this._lines;

    }

    public get charPositions(): Array<CharPosition> {
        if (this._textChanged)
            this.buildLines();

        this._graphics.updateMesh();

        return this._charPositions;
    }

    public redraw(): boolean {
        if (this._font == null) {
            this._font = FontManager.getFont(UIConfig.defaultFont);
            this._graphics.texture = this._font.mainTexture;
            this._graphics.setKeyword("TEXT", this._font.isDynamic);
            this._fontVersion = this._font.version;
            this._textChanged = true;
        }

        if (this._font.version != this._fontVersion) {
            this._fontVersion = this._font.version;
            this._graphics.texture = this._font.mainTexture;
            this._textChanged = true;
        }

        if (this._textChanged)
            this.buildLines();

        return this._graphics.updateMesh();
    }

    public getLinesShape(startLine: number, startCharX: number, endLine: number, endCharX: number, clipped: boolean, result: Array<Rect>) {
        let line1 = this._lines[startLine];
        let line2 = this._lines[endLine];
        if (startLine == endLine) {
            let r: Rect = new Rect();
            r.setMinMax(startCharX, line1.y, endCharX, line1.y + line1.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
        }
        else if (startLine == endLine - 1) {
            let r: Rect = new Rect();
            r.setMinMax(startCharX, line1.y, GUTTER_X + line1.width, line1.y + line1.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
            r = new Rect();
            r.setMinMax(GUTTER_X, line1.y + line1.height, endCharX, line2.y + line2.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
        }
        else {
            let r = new Rect();
            r.setMinMax(startCharX, line1.y, GUTTER_X + line1.width, line1.y + line1.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
            for (let i: number = startLine + 1; i < endLine; i++) {
                let line: LineInfo = this._lines[i];
                r = new Rect();
                r.setMinMax(GUTTER_X, r.yMax, GUTTER_X + line.width, line.y + line.height);
                if (clipped)
                    result.push(r.intersection(this._contentRect));
                else
                    result.push(r);
            }
            r = new Rect();
            r.setMinMax(GUTTER_X, r.yMax, endCharX, line2.y + line2.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
        }
    }

    protected onSizeChanged() {
        if (!this._updatingSize) {
            if (this._autoSize == AutoSizeType.Shrink || this._wordWrap)
                this._textChanged = true;
            else if (this._autoSize != AutoSizeType.None)
                this._graphics.setMeshDirty();

            if (this._verticalAlign != VertAlignType.Top)
                this.applyVertAlign();
        }

        super.onSizeChanged();
    }

    public ensureSizeCorrect() {
        if (this._textChanged && this._autoSize != AutoSizeType.None)
            this.buildLines();
    }

    public update(clippingPlanes: any, alpha: number) {
        this.redraw();
        super.update(clippingPlanes, alpha);
    }

    private requestText() {
        if (!this._html) {
            this._font.setFormat(this._textFormat, this._fontSizeScale);
            this._font.prepareCharacters(this._parsedText);
        }
        else {
            let count: number = this._elements.length;
            for (let i: number = 0; i < count; i++) {
                let element: HtmlElement = this._elements[i];
                if (element.type == HtmlElementType.Text) {
                    this._font.setFormat(element.format, this._fontSizeScale);
                    this._font.prepareCharacters(element.text);
                }
            }
        }
    }

    private buildLines() {
        if (this._font == null) {
            this._font = FontManager.getFont(UIConfig.defaultFont);
            this._fontVersion = this._font.version;
            this._graphics.texture = this._font.mainTexture;
            this._graphics.setKeyword("TEXT", this._font.isDynamic);
        }

        this._textChanged = false;
        this._graphics.setMeshDirty();
        this._fontSizeScale = 1;

        this.cleanup();

        if (this._text.length == 0) {
            let emptyLine: LineInfo = lineInfoPool.borrow();
            emptyLine.width = 0;
            emptyLine.height = this._font.getLineHeight(this._textFormat.size);
            emptyLine.charIndex = emptyLine.charCount = 0;
            emptyLine.y = emptyLine.y2 = GUTTER_Y;
            this._lines.push(emptyLine);

            this._textWidth = this._textHeight = 0;
        }
        else {
            this.parseText();
            this.buildLines2();

            if (this._autoSize == AutoSizeType.Shrink)
                this.doShrink();
        }

        if (this._autoSize == AutoSizeType.Both) {
            this._updatingSize = true;
            if (this._input) {
                let w: number = Math.max(this._textFormat.size, this._textWidth);
                let h: number = Math.max(this._font.getLineHeight(this._textFormat.size) + GUTTER_Y * 2, this._textHeight);
                this.setSize(w, h);
            }
            else
                this.setSize(this._textWidth, this._textHeight);
            this._updatingSize = false;
        }
        else if (this._autoSize == AutoSizeType.Height) {
            this._updatingSize = true;
            if (this._input)
                this.height = Math.max(this._font.getLineHeight(this._textFormat.size) + GUTTER_Y * 2, this._textHeight);
            else
                this.height = this._textHeight;
            this._updatingSize = false;
        }

        this._yOffset = 0;
        this.applyVertAlign();
    }

    private parseText() {
        if (this._html) {
            defaultParser.parse(this._text, this._textFormat, this._elements, this._rich ? (<any>this).htmlParseOptions : null);

            this._parsedText = "";
        }
        else
            this._parsedText = this._text;

        let elementCount: number = this._elements.length;
        if (elementCount == 0) {
            if (this._input)
                this._parsedText = this._parsedText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        }
        else {
            let i = 0;
            while (i < elementCount) {
                let element: HtmlElement = this._elements[i];
                element.charIndex = this._parsedText.length;
                if (element.type == HtmlElementType.Text) {
                    if (this._input)
                        this._parsedText += element.text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
                    else
                        this._parsedText += element.text;
                }
                else if (element.isEntity)
                    this._parsedText += ' ';
                i++;
            }
        }
    }

    private buildLines2() {
        let letterSpacing: number = this._textFormat.letterSpacing * this._fontSizeScale;
        let lineSpacing: number = (this._textFormat.lineSpacing - 1) * this._fontSizeScale;
        let rectWidth: number = this._contentRect.width - GUTTER_X * 2;
        let wordLen: number = 0;
        let wordPossible: boolean = false;
        let posx: number = 0;

        let format: TextFormat = this._textFormat;
        this._font.setFormat(format, this._fontSizeScale);
        let wrap: boolean = this._wordWrap && !this._singleLine;
        if (this._maxWidth > 0) {
            wrap = true;
            rectWidth = this._maxWidth - GUTTER_X * 2;
        }
        this._textWidth = this._textHeight = 0;

        this.requestText();

        let elementCount: number = this._elements.length;
        let elementIndex = 0;
        let element: HtmlElement = null;
        if (elementCount > 0)
            element = this._elements[elementIndex];
        let textLength: number = this._parsedText.length;

        let line: LineInfo = lineInfoPool.borrow();
        this._lines.push(line);
        line.y = line.y2 = GUTTER_Y;

        let lineChars = sLineCharInfo;
        lineChars.length = 0;

        let glyph: GlyphInfo = { width: 0, height: 0, baseline: 0 };

        for (let charIndex = 0; charIndex < textLength; charIndex++) {
            let ch: string = this._parsedText[charIndex];

            glyph.width = glyph.height = glyph.baseline = 0;

            while (element && element.charIndex == charIndex) {
                if (element.type == HtmlElementType.Text) {
                    format = element.format;
                    this._font.setFormat(format, this._fontSizeScale);
                }
                else {
                    let htmlObject: IHtmlObject = element.htmlObject;
                    if (this._rich && !htmlObject) {
                        element.space = rectWidth - line.width - 4;
                        htmlObject = (<any>this).htmlPageContext.createObject(<any>this, element);
                        element.htmlObject = htmlObject;
                    }
                    if (htmlObject) {
                        glyph.width = htmlObject.width + 2;
                        glyph.height = htmlObject.height;
                        glyph.baseline = glyph.height * IMAGE_BASELINE;
                    }

                    if (element.isEntity)
                        ch = ""; //indicate it is a place holder
                }

                elementIndex++;
                if (elementIndex < elementCount)
                    element = this._elements[elementIndex];
                else
                    element = null;
            }

            if (ch.length == 0 || ch == '\n') {
                wordPossible = false;
            }
            else if (this._font.getGlyph(ch == '\t' ? ' ' : ch, glyph)) {
                if (ch == '\t')
                    glyph.width *= 4;

                if (wordPossible) {
                    if (' \t\n\r\v'.indexOf(ch) != -1) {
                        wordLen = 0;
                    }
                    else if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z'
                        || ch >= '0' && ch <= '9'
                        || ch == '.' || ch == '"' || ch == '\'') {
                        wordLen++;
                    }
                    else
                        wordPossible = false;
                }
                else if (' \t\n\r\v'.indexOf(ch) != -1) {
                    wordLen = 0;
                    wordPossible = true;
                }
                else
                    wordPossible = false;
            }
            else
                wordPossible = false;

            lineChars.push(glyph.width, glyph.height, glyph.baseline);
            if (glyph.width != 0) {
                if (posx != 0)
                    posx += letterSpacing;
                posx += glyph.width;
            }

            if (ch == '\n' && !this._singleLine) {
                this.updateLineInfo(line, letterSpacing, lineChars.length / 3);

                let newLine: LineInfo = lineInfoPool.borrow();
                this._lines.push(newLine);
                newLine.y = line.y + (line.height + lineSpacing);
                if (newLine.y < GUTTER_Y) //lineSpacing maybe negative
                    newLine.y = GUTTER_Y;
                newLine.y2 = newLine.y;
                newLine.charIndex = line.charIndex + line.charCount;

                lineChars.length = 0;
                wordPossible = false;
                posx = 0;
                line = newLine;
            }
            else if (wrap && posx > rectWidth) {
                let lineCharCount: number = lineChars.length / 3;
                let toMoveChars: number;

                if (wordPossible && wordLen < 20 && lineCharCount > 2) //if word had broken, move word to new line
                    toMoveChars = wordLen;
                else if (lineCharCount != 1) //only one char here, we cant move it to new line
                    toMoveChars = 1;
                else
                    toMoveChars = 0;

                this.updateLineInfo(line, letterSpacing, lineCharCount - toMoveChars);

                let newLine: LineInfo = lineInfoPool.borrow();
                this._lines.push(newLine);
                newLine.y = line.y + (line.height + lineSpacing);
                if (newLine.y < GUTTER_Y)
                    newLine.y = GUTTER_Y;
                newLine.y2 = newLine.y;
                newLine.charIndex = line.charIndex + line.charCount;

                posx = 0;
                if (toMoveChars != 0) {
                    for (let i: number = line.charCount; i < lineCharCount; i++) {
                        if (posx != 0)
                            posx += letterSpacing;
                        posx += lineChars[i * 3];
                    }

                    for (let i: number = 0; i < line.charCount * 3; i++)
                        lineChars.shift();
                }
                else
                    lineChars.length = 0;

                wordPossible = false;
                line = newLine;
            }
        }

        this.updateLineInfo(line, letterSpacing, lineChars.length / 3);

        if (this._textWidth > 0)
            this._textWidth += GUTTER_X * 2;
        this._textHeight = line.y + line.height + GUTTER_Y;

        this._textWidth = Math.round(this._textWidth);
        this._textHeight = Math.round(this._textHeight);
    }

    private updateLineInfo(line: LineInfo, letterSpacing: number, cnt: number) {
        let lineChars = sLineCharInfo;
        for (let i: number = 0; i < cnt * 3; i += 3) {
            let width = lineChars[i];
            let height = lineChars[i + 1];
            let baseline = lineChars[i + 2];

            if (baseline > line.baseline) {
                line.height += (baseline - line.baseline);
                line.baseline = baseline;
            }

            if (height - baseline > line.height - line.baseline)
                line.height += (height - baseline - (line.height - line.baseline));

            if (width > 0) {
                if (line.width != 0)
                    line.width += letterSpacing;
                line.width += width;
            }
        }

        if (line.height == 0) {
            if (this._lines.length == 1)
                line.height = this._textFormat.size;
            else
                line.height = this._lines[this._lines.length - 2].height;
        }

        if (line.width > this._textWidth)
            this._textWidth = line.width;

        line.charCount = cnt;
    }

    private doShrink() {
        if (this._lines.length > 1 && this._textHeight > this._contentRect.height) {
            //多行的情况，涉及到自动换行，得用二分法查找最合适的比例，会消耗多一点计算资源
            let low = 0;
            let high = this._textFormat.size;

            //先尝试猜测一个比例
            this._fontSizeScale = Math.sqrt(this._contentRect.height / this._textHeight);
            let cur = Math.floor(this._fontSizeScale * this._textFormat.size);

            while (true) {
                lineInfoPool.returns(this._lines);
                this.buildLines2();

                if (this._textWidth > this._contentRect.width || this._textHeight > this._contentRect.height)
                    high = cur;
                else
                    low = cur;
                if (high - low > 1 || high != low && cur == high) {
                    cur = low + (high - low) / 2;
                    this._fontSizeScale = cur / this._textFormat.size;
                }
                else
                    break;
            }
        }
        else if (this._textWidth > this._contentRect.width) {
            this._fontSizeScale = this._contentRect.width / this._textWidth;

            lineInfoPool.returns(this._lines);
            this.buildLines2();

            if (this._textWidth > this._contentRect.width) //如果还超出，缩小一点再来一次
            {
                let size = Math.floor(this._textFormat.size * this._fontSizeScale);
                size--;
                this._fontSizeScale = size / this._textFormat.size;

                lineInfoPool.returns(this._lines);
                this.buildLines2();
            }
        }
    }

    public onPopulateMesh(vb: VertexBuffer) {
        if (this._textWidth == 0 && this._lines.length == 1) {
            if (this._charPositions) {
                charPosPool.returns(this._charPositions);
                this._charPositions.push(charPosPool.borrow());
            }

            this.refreshObjects();

            return;
        }

        let letterSpacing: number = this._textFormat.letterSpacing * this._fontSizeScale;
        let format: TextFormat = this._textFormat;
        this._font.setFormat(format, this._fontSizeScale);

        let rectWidth: number = this._contentRect.width > 0 ? (this._contentRect.width - GUTTER_X * 2) : 0;
        let rectHeight: number = this._contentRect.height > 0 ? Math.max(this._contentRect.height, this._font.getLineHeight(format.size)) : 0;

        if (this._charPositions)
            charPosPool.returns(this._charPositions);

        let currentLink: HtmlLink = null;
        let linkStartX: number = 0;
        let linkStartLine: number = 0;

        let posx: number = 0;
        let indent_x: number;
        let clipping = !this._input && this._autoSize == AutoSizeType.None;
        let lineClipped: boolean;
        let lineAlign: AlignType;
        let vertCount: number;
        let underlineStart: number;
        let strikethroughStart: number;
        let minFontSize: number;
        let maxFontSize: number;

        let elementIndex: number = 0;
        let elementCount: number = this._elements.length;
        let element: HtmlElement = null;
        if (elementCount > 0)
            element = this._elements[elementIndex];
        let glyph = { width: 0, height: 0, baseline: 0 };

        let lineCount: number = this._lines.length;
        for (let i = 0; i < lineCount; ++i) {
            let line: LineInfo = this._lines[i];
            if (line.charCount == 0)
                continue;

            lineClipped = clipping && i != 0 && line.y + line.height > rectHeight;
            lineAlign = format.align;
            if (element && element.charIndex == line.charIndex)
                lineAlign = element.format.align;
            else
                lineAlign = format.align;

            if (lineAlign == AlignType.Center)
                indent_x = Math.floor((rectWidth - line.width) / 2);
            else if (lineAlign == AlignType.Right)
                indent_x = rectWidth - line.width;
            else
                indent_x = 0;

            if (indent_x < 0)
                indent_x = 0;

            posx = GUTTER_X + indent_x;

            let lineCharCount: number = line.charCount;
            underlineStart = posx;
            strikethroughStart = posx;
            minFontSize = maxFontSize = format.size;

            for (let j = 0; j < lineCharCount; j++) {
                let charIndex: number = line.charIndex + j;
                let ch: string = this._parsedText[charIndex];

                while (element && charIndex == element.charIndex) {
                    if (element.type == HtmlElementType.Text) {
                        vertCount = 0;
                        if (format.underline != element.format.underline) {
                            if (format.underline) {
                                if (!lineClipped) {
                                    let lineWidth: number = underlineStart - (clipping ? clamp(posx, GUTTER_X, GUTTER_X + rectWidth) : posx);
                                    if (lineWidth > 0)
                                        vertCount += this._font.drawLine(underlineStart < posx ? underlineStart : posx, -(line.y + line.baseline), lineWidth,
                                            maxFontSize, 0, vb);
                                }
                                maxFontSize = 0;
                            }
                            else
                                underlineStart = posx;
                        }

                        if (format.strikethrough != element.format.strikethrough) {
                            if (format.strikethrough) {
                                if (!lineClipped) {
                                    let lineWidth: number = strikethroughStart - (clipping ? clamp(posx, GUTTER_X, GUTTER_X + rectWidth) : posx);
                                    if (lineWidth > 0)
                                        vertCount += this._font.drawLine(strikethroughStart < posx ? strikethroughStart : posx, -(line.y + line.baseline), lineWidth,
                                            minFontSize, 1, vb);
                                }
                                minFontSize = Number.POSITIVE_INFINITY;
                            }
                            else
                                strikethroughStart = posx;
                        }

                        if (vertCount > 0 && this._charPositions) {
                            let cp: CharPosition = this._charPositions[this._charPositions.length - 1];
                            cp.vertCount += vertCount;
                            this._charPositions[this._charPositions.length - 1] = cp;
                        }

                        format = element.format;
                        minFontSize = Math.min(minFontSize, format.size);
                        maxFontSize = Math.max(maxFontSize, format.size);
                        this._font.setFormat(format, this._fontSizeScale);
                    }
                    else if (element.type == HtmlElementType.Link) {
                        currentLink = <HtmlLink>element.htmlObject;
                        if (currentLink) {
                            element.position.set(0, 0);
                            currentLink.setPosition(0, 0);
                            linkStartX = posx;
                            linkStartLine = i;
                        }
                    }
                    else if (element.type == HtmlElementType.LinkEnd) {
                        if (currentLink) {
                            currentLink.setArea(linkStartLine, linkStartX, i, posx);
                            currentLink = null;
                        }
                    }
                    else {
                        let htmlObj: IHtmlObject = element.htmlObject;
                        if (htmlObj) {
                            if (this._charPositions) {
                                let cp: CharPosition = charPosPool.borrow();
                                cp.lineIndex = i;
                                cp.charIndex = this._charPositions.length;
                                cp.imgIndex = elementIndex + 1;
                                cp.offsetX = posx;
                                cp.width = htmlObj.width;
                                this._charPositions.push(cp);
                            }

                            if (lineClipped || clipping && (posx < GUTTER_X || posx > GUTTER_X && posx + htmlObj.width > this._contentRect.width - GUTTER_X))
                                element.status |= 1;
                            else
                                element.status &= 254;

                            element.position = new Vector2(posx + 1, line.y + line.baseline - htmlObj.height * IMAGE_BASELINE);
                            htmlObj.setPosition(element.position.x, element.position.y);

                            posx += htmlObj.width + letterSpacing + 2;
                        }
                    }

                    if (element.isEntity)
                        ch = '\0';

                    elementIndex++;
                    if (elementIndex < elementCount)
                        element = this._elements[elementIndex];
                    else
                        element = null;
                }

                if (ch == '\0')
                    continue;

                if (this._font.getGlyph(ch == '\t' ? ' ' : ch, glyph)) {
                    if (ch == '\t')
                        glyph.width *= 4;

                    if (lineClipped || clipping && (rectWidth < 7 || posx != (GUTTER_X + indent_x)) && posx + glyph.width > this._contentRect.width - GUTTER_X + 0.5) //超出区域，剪裁
                    {
                        posx += letterSpacing + glyph.width;
                        continue;
                    }

                    vertCount = this._font.drawGlyph(posx, -(line.y + line.baseline), vb);

                    if (this._charPositions) {
                        let cp: CharPosition = charPosPool.borrow();
                        cp.lineIndex = i;
                        cp.charIndex = this._charPositions.length;
                        cp.vertCount = vertCount;
                        cp.offsetX = posx;
                        cp.width = glyph.width;
                        this._charPositions.push(cp);
                    }

                    posx += letterSpacing + glyph.width;
                }
                else //if GetGlyph failed
                {
                    if (this._charPositions) {
                        let cp: CharPosition = charPosPool.borrow();
                        cp.lineIndex = i;
                        cp.charIndex = this._charPositions.length;
                        cp.offsetX = posx;
                        this._charPositions.push(cp);
                    }

                    posx += letterSpacing;
                }
            }//text loop

            if (!lineClipped) {
                vertCount = 0;
                if (format.underline) {
                    let lineWidth: number = underlineStart - (clipping ? clamp(posx, GUTTER_X, GUTTER_X + rectWidth) : posx);
                    if (lineWidth > 0)
                        vertCount += this._font.drawLine(underlineStart < posx ? underlineStart : posx, -(line.y + line.baseline), lineWidth,
                            maxFontSize, 0, vb);
                }

                if (format.strikethrough) {
                    let lineWidth: number = strikethroughStart - (clipping ? clamp(posx, GUTTER_X, GUTTER_X + rectWidth) : posx);
                    if (lineWidth > 0)
                        vertCount += this._font.drawLine(strikethroughStart < posx ? strikethroughStart : posx, -(line.y + line.baseline), lineWidth,
                            minFontSize, 1, vb);
                }

                if (vertCount > 0 && this._charPositions) {
                    let cp: CharPosition = this._charPositions[this._charPositions.length - 1];
                    cp.vertCount += vertCount;
                }
            }

        }//line loop

        if (element && element.type == HtmlElementType.LinkEnd && currentLink)
            currentLink.setArea(linkStartLine, linkStartX, lineCount - 1, posx);

        if (this._charPositions) {
            let cp: CharPosition = charPosPool.borrow();
            cp.lineIndex = lineCount - 1;
            cp.charIndex = this._charPositions.length;
            cp.offsetX = posx;
            this._charPositions.push(cp);
        }

        this.refreshObjects();
    }

    private cleanup() {
        this.cleanupObjects();

        elementPool.returns(this._elements);
        lineInfoPool.returns(this._lines);
        this._textWidth = 0;
        this._textHeight = 0;
        this._parsedText = "";

        if (this._charPositions)
            charPosPool.returns(this._charPositions);
    }

    private applyVertAlign() {
        let oldOffset: number = this._yOffset;
        if (this._autoSize == AutoSizeType.Both || this._autoSize == AutoSizeType.Height
            || this._verticalAlign == VertAlignType.Top)
            this._yOffset = 0;
        else {
            let dh: number;
            if (this._textHeight == 0 && this._lines.length > 0)
                dh = this._contentRect.height - this._lines[0].height;
            else
                dh = this._contentRect.height - this._textHeight;
            if (dh < 0)
                dh = 0;
            if (this._verticalAlign == VertAlignType.Middle)
                this._yOffset = Math.floor(dh / 2);
            else
                this._yOffset = dh;
        }

        if (oldOffset != this._yOffset) {
            let cnt = this._lines.length;
            for (let i: number = 0; i < cnt; i++)
                this._lines[i].y = this._lines[i].y2 + this._yOffset;

            this._graphics.setMeshDirty();
        }
    }

    protected refreshObjects() {
    }

    protected cleanupObjects() {
    }
}

export const GUTTER_X: number = 2;
export const GUTTER_Y: number = 2;
const IMAGE_BASELINE: number = 0.8;
var sLineCharInfo: Array<number> = new Array<number>();

export class LineInfo {
    public width: number;
    public height: number;
    public baseline: number;
    public charIndex: number;
    public charCount: number;
    public y: number;
    public y2: number;
}

var lineInfoPool = new Pool<LineInfo>(LineInfo,
    ele => {
        ele.width = ele.height = ele.baseline = ele.y = ele.y2 = ele.charIndex = ele.charCount = 0;
    }
);

export class CharPosition {
    public charIndex: number;
    public lineIndex: number;
    public offsetX: number;
    public vertCount: number;
    public width: number;
    public imgIndex: number;
}

var charPosPool = new Pool<CharPosition>(CharPosition);