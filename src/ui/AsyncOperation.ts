import { ObjectType, PackageItemType } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GList } from "./GList";
import { GObject, constructingDepth } from "./GObject";
import { PackageItem } from "./PackageItem";
import { UIConfig } from "./UIConfig";
import { UIObjectFactory } from "./UIObjectFactory";
import { UIPackage } from "./UIPackage";
import { ByteBuffer } from "../utils/ByteBuffer";
import { Timers } from "../utils/Timers";

export class AsyncOperation {
    public callback: (GObject) => void;

    private _itemList: Array<DisplayListItem>;
    private _objectPool: GObject[];
    private _index: number;

    constructor() {
        this._itemList = new Array<DisplayListItem>();
        this._objectPool = [];
    }

    public createObject(pkgName: string, resName: string): void {
        var pkg: UIPackage = UIPackage.getByName(pkgName);
        if (pkg) {
            var pi: PackageItem = pkg.getItemByName(resName);
            if (!pi)
                throw new Error("resource not found: " + resName);

            this.internalCreateObject(pi);
        }
        else
            throw new Error("package not found: " + pkgName);
    }

    public createObjectFromURL(url: string): void {
        var pi: PackageItem = UIPackage.getItemByURL(url);
        if (pi)
            this.internalCreateObject(pi);
        else
            throw new Error("resource not found: " + url);
    }

    public cancel(): void {
        Timers.remove(this.run, this);
        this._itemList.length = 0;
        if (this._objectPool.length > 0) {
            var cnt: number = this._objectPool.length;
            for (var i: number = 0; i < cnt; i++) {
                this._objectPool[i].dispose();
            }
            this._objectPool.length = 0;
        }
    }

    private internalCreateObject(item: PackageItem): void {
        this._itemList.length = 0;
        this._objectPool.length = 0;

        var di: DisplayListItem = new DisplayListItem(item, ObjectType.Component);
        di.childCount = this.collectComponentChildren(item);
        this._itemList.push(di);

        this._index = 0;
        Timers.addUpdate(this.run, this);
    }

    private collectComponentChildren(item: PackageItem): number {
        var buffer: ByteBuffer = item.rawData;
        buffer.seek(0, 2);

        var di: DisplayListItem;
        var pi: PackageItem;
        var i: number;
        var dataLen: number;
        var curPos: number;
        var pkg: UIPackage;

        var dcnt: number = buffer.readShort();
        for (i = 0; i < dcnt; i++) {
            dataLen = buffer.readShort();
            curPos = buffer.pos;

            buffer.seek(curPos, 0);

            var type: number = buffer.readByte();
            var src: string = buffer.readS();
            var pkgId: string = buffer.readS();

            buffer.pos = curPos;

            if (src != null) {
                if (pkgId != null)
                    pkg = UIPackage.getById(pkgId);
                else
                    pkg = item.owner;

                pi = pkg != null ? pkg.getItemById(src) : null;
                di = new DisplayListItem(pi, type);

                if (pi != null && pi.type == PackageItemType.Component)
                    di.childCount = this.collectComponentChildren(pi);
            }
            else {
                di = new DisplayListItem(null, type);
                if (type == ObjectType.List) //list
                    di.listItemCount = this.collectListChildren(buffer);
            }

            this._itemList.push(di);
            buffer.pos = curPos + dataLen;
        }

        return dcnt;
    }

    private collectListChildren(buffer: ByteBuffer): number {
        buffer.seek(buffer.pos, 8);

        var listItemCount: number = 0;
        var i: number;
        var nextPos: number;
        var url: string;
        var pi: PackageItem;
        var di: DisplayListItem;
        var defaultItem: string = buffer.readS();
        var itemCount: number = buffer.readShort();

        for (i = 0; i < itemCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;

            url = buffer.readS();
            if (url == null)
                url = defaultItem;
            if (url) {
                pi = UIPackage.getItemByURL(url);
                if (pi != null) {
                    di = new DisplayListItem(pi, pi.objectType);
                    if (pi.type == PackageItemType.Component)
                        di.childCount = this.collectComponentChildren(pi);

                    this._itemList.push(di);
                    listItemCount++;
                }
            }
            buffer.pos = nextPos;
        }

        return listItemCount;
    }

    private run(): void {
        var obj: GObject;
        var di: DisplayListItem;
        var poolStart: number;
        var k: number;
        var t: number = performance.now();
        var frameTime: number = UIConfig.frameTimeForAsyncUIConstruction;
        var totalItems: number = this._itemList.length;

        while (this._index < totalItems) {
            di = this._itemList[this._index];
            if (di.packageItem != null) {
                obj = UIObjectFactory.newObject(di.packageItem);
                this._objectPool.push(obj);

                constructingDepth.n++;
                if (di.packageItem.type == PackageItemType.Component) {
                    poolStart = this._objectPool.length - di.childCount - 1;

                    (<GComponent>obj).constructFromResource2(this._objectPool, poolStart);

                    this._objectPool.splice(poolStart, di.childCount);
                }
                else {
                    obj.constructFromResource();
                }
                constructingDepth.n--;
            }
            else {
                obj = UIObjectFactory.newObject(di.type);
                this._objectPool.push(obj);

                if (di.type == ObjectType.List && di.listItemCount > 0) {
                    poolStart = this._objectPool.length - di.listItemCount - 1;

                    for (k = 0; k < di.listItemCount; k++) //把他们都放到pool里，这样GList在创建时就不需要创建对象了
                        (<GList>obj).itemPool.returnObject(this._objectPool[k + poolStart]);

                    this._objectPool.splice(poolStart, di.listItemCount);
                }
            }

            this._index++;
            if ((this._index % 5 == 0) && performance.now() - t >= frameTime)
                return;
        }

        Timers.remove(this.run, this);
        var result: GObject = this._objectPool[0];
        this._itemList.length = 0;
        this._objectPool.length = 0;

        if (this.callback != null)
            this.callback(result);
    }
}

class DisplayListItem {
    public packageItem: PackageItem;
    public type: number;
    public childCount: number;
    public listItemCount: number;

    constructor(packageItem: PackageItem, type: number) {
        this.packageItem = packageItem;
        this.type = type;
    }
}

