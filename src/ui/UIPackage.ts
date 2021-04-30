import { AudioLoader, FileLoader, LinearFilter, Texture, TextureLoader, Vector2 } from "three";
import { PixelHitTestData } from "../core/hittest/PixelHitTest";
import { Frame } from "../core/MovieClip";
import { NTexture } from "../core/NTexture";
import { BitmapFont, BMGlyph } from "../core/text/BitmapFont";
import { ByteBuffer } from "../utils/ByteBuffer";
import { Rect } from "../utils/Rect";
import { ObjectType, PackageItemType } from "./FieldTypes";
import { constructingDepth, GObject } from "./GObject";
import { PackageItem } from "./PackageItem";
import { UIConfig } from "./UIConfig";
import { FontManager } from "../core/text/FontManager";
import { BaseFont } from "../core/text/BaseFont";

type PackageDependency = { id: string, name: string };

export class UIPackage {
    private _id: string;
    private _name: string;
    private _items: Array<PackageItem>;
    private _itemsById: { [index: string]: PackageItem };
    private _itemsByName: { [index: string]: PackageItem };
    private _resKey: string;
    private _customId: string;
    private _sprites: { [index: string]: AtlasSprite };
    private _dependencies: Array<PackageDependency>;
    private _branches: Array<string>;
    public _branchIndex: number;

    // public static _objectFactory: typeof UIObjectFactory = UIObjectFactory;

    constructor() {
        this._items = [];
        this._itemsById = {};
        this._itemsByName = {};
        this._sprites = {};
        this._dependencies = [];
        this._branches = [];
        this._branchIndex = -1;
    }

    public static get branch(): string {
        return _branch;
    }

    public static set branch(value: string) {
        _branch = value;
        for (var pkgId in _instById) {
            var pkg: UIPackage = _instById[pkgId];
            if (pkg._branches) {
                pkg._branchIndex = pkg._branches.indexOf(value);
            }
        }
    }

    public static getVar(key: string): string {
        return _vars[key];
    }

    public static setVar(key: string, value: string) {
        _vars[key] = value;
    }

    public static getById(id: string): UIPackage {
        return _instById[id];
    }

    public static getByName(name: string): UIPackage {
        return _instByName[name];
    }

    public static loadPackage(resKey: string, onProgress?: (event: ProgressEvent) => void): Promise<UIPackage> {
        return new Promise<UIPackage>(resolve => {
            let pkg: UIPackage = _instById[resKey];
            if (pkg) {
                resolve(pkg);
                return;
            }

            let url: string = resKey;
            if (!resKey.endsWith("." + UIConfig.packageFileExtension)) {
                url += "." + UIConfig.packageFileExtension;
            }

            var loader = new FileLoader();
            loader.setResponseType("arraybuffer");
            loader.load(url, asset => {
                pkg = new UIPackage();
                pkg._resKey = resKey;
                pkg.loadPackage(new ByteBuffer(<ArrayBuffer>asset));
                let promises = [];
                let cnt: number = pkg._items.length;
                for (var i: number = 0; i < cnt; i++) {
                    var pi: PackageItem = pkg._items[i];
                    if (pi.type == PackageItemType.Atlas) {
                        promises.push(loadTexture(pi, onProgress));
                    }
                    else if (pi.type == PackageItemType.Sound) {
                        promises.push(loadSound(pi, onProgress));
                    }
                }

                let resolve2 = () => {
                    _instById[pkg.id] = pkg;
                    _instByName[pkg.name] = pkg;
                    _instById[pkg._resKey] = pkg;

                    resolve(pkg);
                };

                if (promises.length > 0)
                    Promise.all(promises).then(resolve2);
                else
                    resolve2();
            });
        });
    }

    public static removePackage(packageIdOrName: string): void {
        var pkg: UIPackage = _instById[packageIdOrName];
        if (!pkg)
            pkg = _instByName[packageIdOrName];
        if (!pkg)
            throw new Error("unknown package: " + packageIdOrName);

        pkg.dispose();
        delete _instById[pkg.id];
        delete _instByName[pkg.name];
        delete _instById[pkg._resKey];
        if (pkg._customId != null)
            delete _instById[pkg._customId];
    }

    public static createObject(pkgName: string, resName: string, userClass?: new () => GObject): GObject {
        var pkg: UIPackage = UIPackage.getByName(pkgName);
        if (pkg)
            return pkg.createObject(resName, userClass);
        else
            return null;
    }

    public static createObjectFromURL(url: string, userClass?: new () => GObject): GObject {
        var pi: PackageItem = UIPackage.getItemByURL(url);
        if (pi)
            return pi.owner.internalCreateObject(pi, userClass);
        else
            return null;
    }

    public static getItemURL(pkgName: string, resName: string): string {
        var pkg: UIPackage = UIPackage.getByName(pkgName);
        if (!pkg)
            return null;

        var pi: PackageItem = pkg._itemsByName[resName];
        if (!pi)
            return null;

        return "ui://" + pkg.id + pi.id;
    }

    public static getItemByURL(url: string): PackageItem {
        var pos1: number = url.indexOf("//");
        if (pos1 == -1)
            return null;

        var pos2: number = url.indexOf("/", pos1 + 2);
        if (pos2 == -1) {
            if (url.length > 13) {
                var pkgId: string = url.substr(5, 8);
                var pkg: UIPackage = UIPackage.getById(pkgId);
                if (pkg) {
                    var srcId: string = url.substr(13);
                    return pkg.getItemById(srcId);
                }
            }
        }
        else {
            var pkgName: string = url.substr(pos1 + 2, pos2 - pos1 - 2);
            pkg = UIPackage.getByName(pkgName);
            if (pkg) {
                var srcName: string = url.substr(pos2 + 1);
                return pkg.getItemByName(srcName);
            }
        }

        return null;
    }

    public static getItemAssetByURL(url: string): any {
        var item: PackageItem = UIPackage.getItemByURL(url);
        if (item == null)
            return null;

        return item.owner.getItemAsset(item);
    }

    public static normalizeURL(url: string): string {
        if (url == null)
            return null;

        var pos1: number = url.indexOf("//");
        if (pos1 == -1)
            return null;

        var pos2: number = url.indexOf("/", pos1 + 2);
        if (pos2 == -1)
            return url;

        var pkgName: string = url.substr(pos1 + 2, pos2 - pos1 - 2);
        var srcName: string = url.substr(pos2 + 1);
        return UIPackage.getItemURL(pkgName, srcName);
    }

    private loadPackage(buffer: ByteBuffer): void {
        if (buffer.readUint() != 0x46475549)
            throw new Error("old package format found in '" + this._resKey + "'");

        buffer.version = buffer.readInt();
        var compressed: boolean = buffer.readBool();
        this._id = buffer.readString();
        this._name = buffer.readString();
        buffer.skip(20);

        if (compressed) {
            //todo uncompress
            // var buf: Uint8Array = new Uint8Array(buffer.data, buffer.pos, buffer.length - buffer.pos);
            // var inflater = new Zlib.RawInflate(buf);
            // let buffer2: ByteBuffer = new ByteBuffer(inflater.decompress());
            // buffer2.version = buffer.version;
            // buffer = buffer2;
        }

        var ver2: boolean = buffer.version >= 2;
        var indexTablePos: number = buffer.pos;
        var cnt: number;
        var i: number;
        var j: number;
        var nextPos: number;
        var str: string;
        var branchIncluded: boolean;

        buffer.seek(indexTablePos, 4);

        cnt = buffer.readInt();
        var stringTable: string[] = [];
        for (i = 0; i < cnt; i++)
            stringTable[i] = buffer.readString();
        buffer.stringTable = stringTable;

        buffer.seek(indexTablePos, 0);
        cnt = buffer.readShort();
        for (i = 0; i < cnt; i++)
            this._dependencies.push({ id: buffer.readS(), name: buffer.readS() });

        if (ver2) {
            cnt = buffer.readShort();
            if (cnt > 0) {
                this._branches = buffer.readSArray(cnt);
                if (_branch)
                    this._branchIndex = this._branches.indexOf(_branch);
            }

            branchIncluded = cnt > 0;
        }

        buffer.seek(indexTablePos, 1);

        var pi: PackageItem;
        var fileNamePrefix: string = this._resKey + "_";

        cnt = buffer.readUshort();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readInt();
            nextPos += buffer.pos;

            pi = new PackageItem();
            pi.owner = this;
            pi.type = buffer.readByte();
            pi.id = buffer.readS();
            pi.name = buffer.readS();
            buffer.readS(); //path
            str = buffer.readS();
            if (str)
                pi.file = str;
            buffer.readBool();//exported
            pi.width = buffer.readInt();
            pi.height = buffer.readInt();

            switch (pi.type) {
                case PackageItemType.Image:
                    {
                        pi.objectType = ObjectType.Image;
                        var scaleOption: number = buffer.readByte();
                        if (scaleOption == 1) {
                            pi.scale9Grid = new Rect();
                            pi.scale9Grid.x = buffer.readInt();
                            pi.scale9Grid.y = buffer.readInt();
                            pi.scale9Grid.width = buffer.readInt();
                            pi.scale9Grid.height = buffer.readInt();

                            pi.tileGridIndice = buffer.readInt();
                        }
                        else if (scaleOption == 2)
                            pi.scaleByTile = true;

                        pi.smoothing = buffer.readBool();
                        break;
                    }

                case PackageItemType.MovieClip:
                    {
                        pi.smoothing = buffer.readBool();
                        pi.objectType = ObjectType.MovieClip;
                        pi.rawData = buffer.readBuffer();
                        break;
                    }

                case PackageItemType.Font:
                    {
                        pi.rawData = buffer.readBuffer();
                        break;
                    }

                case PackageItemType.Component:
                    {
                        var extension: number = buffer.readByte();
                        if (extension > 0)
                            pi.objectType = extension;
                        else
                            pi.objectType = ObjectType.Component;
                        pi.rawData = buffer.readBuffer();

                        Decls.UIObjectFactory.resolveExtension(pi);
                        break;
                    }

                case PackageItemType.Atlas:
                case PackageItemType.Sound:
                case PackageItemType.Misc:
                    {
                        pi.file = fileNamePrefix + pi.file;
                        break;
                    }
            }

            if (ver2) {
                str = buffer.readS();//branch
                if (str)
                    pi.name = str + "/" + pi.name;

                var branchCnt: number = buffer.readByte();
                if (branchCnt > 0) {
                    if (branchIncluded)
                        pi.branches = buffer.readSArray(branchCnt);
                    else
                        this._itemsById[buffer.readS()] = pi;
                }

                var highResCnt: number = buffer.readByte();
                if (highResCnt > 0)
                    pi.highResolution = buffer.readSArray(highResCnt);
            }

            this._items.push(pi);
            this._itemsById[pi.id] = pi;
            if (pi.name != null)
                this._itemsByName[pi.name] = pi;

            buffer.pos = nextPos;
        }

        buffer.seek(indexTablePos, 2);

        cnt = buffer.readUshort();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readUshort();
            nextPos += buffer.pos;

            var itemId: string = buffer.readS();
            pi = this._itemsById[buffer.readS()];

            let rect: Rect = new Rect();
            rect.x = buffer.readInt();
            rect.y = buffer.readInt();
            rect.width = buffer.readInt();
            rect.height = buffer.readInt();
            var sprite: AtlasSprite = { atlas: pi, rect: rect, offset: new Vector2(), originalSize: new Vector2() };
            sprite.rotated = buffer.readBool();
            if (ver2 && buffer.readBool()) {
                sprite.offset.x = buffer.readInt();
                sprite.offset.y = buffer.readInt();
                sprite.originalSize.x = buffer.readInt();
                sprite.originalSize.y = buffer.readInt();
            }
            else {
                sprite.originalSize.x = sprite.rect.width;
                sprite.originalSize.y = sprite.rect.height;
            }
            this._sprites[itemId] = sprite;

            buffer.pos = nextPos;
        }

        if (buffer.seek(indexTablePos, 3)) {
            cnt = buffer.readUshort();
            for (i = 0; i < cnt; i++) {
                nextPos = buffer.readInt();
                nextPos += buffer.pos;

                pi = this._itemsById[buffer.readS()];
                if (pi && pi.type == PackageItemType.Image) {
                    pi.pixelHitTestData = new PixelHitTestData();
                    pi.pixelHitTestData.load(buffer);
                }

                buffer.pos = nextPos;
            }
        }
    }

    public dispose(): void {
        var cnt: number = this._items.length;
        for (var i: number = 0; i < cnt; i++) {
            var pi: PackageItem = this._items[i];
            if (pi.type == PackageItemType.Atlas) {
                if (pi.texture) {
                    pi.texture.dispose();
                    pi.texture = null;
                }
            }
            else if (pi.type == PackageItemType.Sound) {
                //todo free sound
            }
        }
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get customId(): string {
        return this._customId;
    }

    public set customId(value: string) {
        if (this._customId != null)
            delete _instById[this._customId];
        this._customId = value;
        if (this._customId != null)
            _instById[this._customId] = this;
    }

    public createObject(resName: string, userClass?: new () => GObject): GObject {
        var pi: PackageItem = this._itemsByName[resName];
        if (pi)
            return this.internalCreateObject(pi, userClass);
        else
            return null;
    }

    public internalCreateObject(item: PackageItem, userClass?: new () => GObject): GObject {
        var g: GObject = Decls.UIObjectFactory.newObject(item, userClass);

        if (g == null)
            return null;

        constructingDepth.n++;
        g.constructFromResource();
        constructingDepth.n--;
        return g;
    }

    public getItemById(itemId: string): PackageItem {
        return this._itemsById[itemId];
    }

    public getItemByName(resName: string): PackageItem {
        return this._itemsByName[resName];
    }

    public getItemAssetByName(resName: string): Object {
        var pi: PackageItem = this._itemsByName[resName];
        if (pi == null) {
            throw "Resource not found -" + resName;
        }

        return this.getItemAsset(pi);
    }

    public getItemAsset(item: PackageItem): Object {
        switch (item.type) {
            case PackageItemType.Image:
                if (!item.decoded) {
                    item.decoded = true;
                    var sprite: AtlasSprite = this._sprites[item.id];
                    if (sprite) {
                        var atlasTexture: NTexture = <NTexture>(this.getItemAsset(sprite.atlas));
                        item.texture = atlasTexture.createSubTexture(sprite.rect, sprite.rotated, sprite.offset, sprite.originalSize);
                    }
                    else
                        item.texture = null;
                }
                return item.texture;

            case PackageItemType.Atlas:
                return item.texture;

            case PackageItemType.Font:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadFont(item);
                }
                return item.bitmapFont;

            case PackageItemType.MovieClip:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadMovieClip(item);
                }
                return item.frames;

            case PackageItemType.Component:
                return item.rawData;

            default:
                return null;
        }
    }

    private loadMovieClip(item: PackageItem): void {
        var buffer: ByteBuffer = item.rawData;

        buffer.seek(0, 0);

        item.interval = buffer.readInt();
        item.swing = buffer.readBool();
        item.repeatDelay = buffer.readInt();

        buffer.seek(0, 1);

        var frameCount: number = buffer.readShort();
        item.frames = [];

        var spriteId: string;
        var frame: Frame;
        var sprite: AtlasSprite;
        var fx: number;
        var fy: number;

        for (var i: number = 0; i < frameCount; i++) {
            var nextPos: number = buffer.readShort();
            nextPos += buffer.pos;

            frame = { texture: null };
            fx = buffer.readInt();
            fy = buffer.readInt();
            buffer.readInt(); //width
            buffer.readInt(); //height
            frame.addDelay = buffer.readInt();
            spriteId = buffer.readS();

            if (spriteId != null && (sprite = this._sprites[spriteId]) != null) {
                var atlasTexture: NTexture = <NTexture>(this.getItemAsset(sprite.atlas));
                frame.texture = atlasTexture.createSubTexture(sprite.rect, sprite.rotated, new Vector2(fx, fy), new Vector2(item.width, item.height));
            }
            item.frames[i] = frame;

            buffer.pos = nextPos;
        }
    }

    private loadFont(item: PackageItem): void {
        item = item.getBranch();
        var font: BitmapFont = new BitmapFont();
        font.name = "ui://" + this._id + item.id;
        item.bitmapFont = font;
        var buffer: ByteBuffer = item.rawData;

        buffer.seek(0, 0);

        let ttf = buffer.readBool();
        font.tint = buffer.readBool();
        font.resizable = buffer.readBool();
        font.hasChannel = buffer.readBool();
        var fontSize = buffer.readInt();
        var xadvance: number = buffer.readInt();
        var lineHeight: number = buffer.readInt();

        var texScaleX: number = 1;
        var texScaleY: number = 1;
        var bgX: number;
        var bgY: number;
        var bgWidth: number;
        var bgHeight: number;

        var mainTexture: NTexture = null;
        var mainSprite: AtlasSprite = ttf ? this._sprites[item.id] : null;
        if (mainSprite) {
            mainTexture = <NTexture>(this.getItemAsset(mainSprite.atlas));
            texScaleX = mainTexture.root.uvRect.width / mainTexture.width;
            texScaleY = mainTexture.root.uvRect.height / mainTexture.height;
        }

        buffer.seek(0, 1);

        var bg: BMGlyph = null;
        var cnt: number = buffer.readInt();
        for (var i: number = 0; i < cnt; i++) {
            var nextPos: number = buffer.readShort();
            nextPos += buffer.pos;

            bg = new BMGlyph();
            var ch: string = buffer.readChar();
            font.glyphs[ch] = bg;

            var img: string = buffer.readS();
            var bx: number = buffer.readInt();
            var by: number = buffer.readInt();
            bgX = buffer.readInt();
            bgY = buffer.readInt();
            bgWidth = buffer.readInt();
            bgHeight = buffer.readInt();
            bg.advance = buffer.readInt();
            bg.channel = buffer.readByte();
            if (bg.channel == 1)
                bg.channel = 2;
            else if (bg.channel == 2)
                bg.channel = 1;
            else if (bg.channel == 4)
                bg.channel = 0;
            else if (bg.channel == 8)
                bg.channel = 3;

            if (ttf) {
                if (mainSprite.rotated) {
                    bg.uv[0].set((by + bgHeight + mainSprite.rect.x) * texScaleX,
                        1 - (mainSprite.rect.yMax - bx) * texScaleY);
                    bg.uv[1].set(bg.uv[0].x - bgHeight * texScaleX, bg.uv[0].y);
                    bg.uv[2].set(bg.uv[1].x, bg.uv[0].y + bgWidth * texScaleY);
                    bg.uv[3].set(bg.uv[0].x, bg.uv[2].y);
                }
                else {
                    bg.uv[0].set((bx + mainSprite.rect.x) * texScaleX,
                        1 - (by + bgHeight + mainSprite.rect.y) * texScaleY);
                    bg.uv[1].set(bg.uv[0].x, bg.uv[0].y + bgHeight * texScaleY);
                    bg.uv[2].set(bg.uv[0].x + bgWidth * texScaleX, bg.uv[1].y);
                    bg.uv[3].set(bg.uv[2].x, bg.uv[0].y);
                }

                bg.lineHeight = lineHeight;
                bg.x = bgX;
                bg.y = bgY;
                bg.width = bgWidth;
                bg.height = bgHeight;
            }
            else {
                var charImg: PackageItem = this._itemsById[img];
                if (charImg) {
                    charImg = charImg.getBranch();
                    bgWidth = charImg.width;
                    bgHeight = charImg.height;
                    charImg = charImg.getHighResolution();
                    this.getItemAsset(charImg);
                    charImg.texture.getUV(bg.uv);

                    texScaleX = bgWidth / charImg.width;
                    texScaleY = bgHeight / charImg.height;

                    bg.x = bgX + charImg.texture.offset.x * texScaleX;
                    bg.y = bgY + charImg.texture.offset.y * texScaleY;
                    bg.width = charImg.texture.width * texScaleX;
                    bg.height = charImg.texture.height * texScaleY;

                    if (!mainTexture)
                        mainTexture = charImg.texture.root;
                }

                if (fontSize == 0)
                    fontSize = bgHeight;

                if (bg.advance == 0) {
                    if (xadvance == 0)
                        bg.advance = bgX + bgWidth;
                    else
                        bg.advance = xadvance;
                }

                bg.lineHeight = bgY < 0 ? bgHeight : (bgY + bgHeight);
                if (bg.lineHeight < font.size)
                    bg.lineHeight = font.size;
            }

            buffer.pos = nextPos;
        }

        font.size = fontSize;
        font.mainTexture = mainTexture;
    }
}

interface AtlasSprite {
    atlas: PackageItem;
    rect: Rect;
    offset: Vector2;
    originalSize: Vector2;
    rotated?: boolean;
}

var _instById: { [index: string]: UIPackage } = {};
var _instByName: { [index: string]: UIPackage } = {};
var _branch: string = "";
var _vars: { [index: string]: string } = {};

FontManager.packageFontGetter = name => <BaseFont>UIPackage.getItemAssetByURL(name);

export interface IObjectFactoryType {
    resolveExtension(pi: PackageItem): void;
    newObject(type: number | PackageItem, userClass?: new () => GObject): GObject;
}

function loadTexture(pi: PackageItem, onProgress?: (event: ProgressEvent) => void): Promise<void> {
    return new Promise((resolve, reject) => {
        new TextureLoader().load(pi.file,
            texture => {
                texture.generateMipmaps = false;
                texture.magFilter = LinearFilter;
                texture.minFilter = LinearFilter;
                pi.texture = new NTexture(texture);
                resolve();
            },
            onProgress,
            ev => {
                reject(ev.message);
            });
    });
}

function loadSound(pi: PackageItem, onProgress?: (event: ProgressEvent) => void): Promise<void> {
    return new Promise((resolve, reject) => {
        new AudioLoader().load(pi.file,
            buffer => {
                pi.audioBuffer = buffer;
                resolve();
            },
            onProgress,
            ev => {
                reject(ev.message);
            });
    });
}

export var Decls: { UIObjectFactory?: IObjectFactoryType } = {};