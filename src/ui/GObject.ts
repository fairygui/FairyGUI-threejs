import { Object3D, Vector2, Blending, NormalBlending, NoBlending, AdditiveBlending, MultiplyBlending, SubtractiveBlending } from "three";
import { DisplayObject } from "../core/DisplayObject";
import { Stage } from "../core/Stage";
import { Event, EventType } from "../event/Event";
import { GearAnimation } from "../gears/GearAnimation";
import { GearBase } from "../gears/GearBase";
import { GearColor } from "../gears/GearColor";
import { GearDisplay } from "../gears/GearDisplay";
import { GearDisplay2 } from "../gears/GearDisplay2";
import { GearFontSize } from "../gears/GearFontSize";
import { GearIcon } from "../gears/GearIcon";
import { GearLook } from "../gears/GearLook";
import { GearSize } from "../gears/GearSize";
import { GearText } from "../gears/GearText";
import { GearXY } from "../gears/GearXY";
import { ByteBuffer } from "../utils/ByteBuffer";
import { Rect } from "../utils/Rect";
import { Timers } from "../utils/Timers";
import { Controller } from "./Controller";
import { ObjectPropID, RelationType } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GGroup } from "./GGroup";
import { GTreeNode } from "./GTreeNode";
import { PackageItem } from "./PackageItem";
import { Relations } from "./Relations";
import { UIConfig } from "./UIConfig";

export class GObject {
    public data?: any;
    public packageItem?: PackageItem;
    public static draggingObject: GObject;

    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;
    private _alpha: number = 1;
    private _visible: boolean = true;
    private _touchable: boolean = true;
    private _grayed: boolean;
    private _draggable: boolean;
    private _scaleX: number = 1;
    private _scaleY: number = 1;
    private _skewX: number = 0;
    private _skewY: number = 0;
    private _pivotX: number = 0;
    private _pivotY: number = 0;
    private _pivotAsAnchor: boolean;
    private _sortingOrder: number = 0;
    private _internalVisible: boolean = true;
    private _handlingController?: boolean;
    private _tooltips: string;

    private _relations: Relations;
    private _group: GGroup;
    private _gears: GearBase[];
    private _dragBounds: Rect;

    protected _displayObject: DisplayObject;

    public minWidth: number = 0;
    public minHeight: number = 0;
    public maxWidth: number = 0;
    public maxHeight: number = 0;
    public sourceWidth: number = 0;
    public sourceHeight: number = 0;
    public initWidth: number = 0;
    public initHeight: number = 0;

    public _parent: GComponent;
    public _width: number = 0;
    public _height: number = 0;
    public _rawWidth: number = 0;
    public _rawHeight: number = 0;
    public _id: string;
    public _name: string;
    public _underConstruct: boolean;
    public _gearLocked: boolean;
    public _sizePercentInGroup: number = 0;
    public _treeNode?: GTreeNode;

    constructor() {
        this._id = "" + gInstanceCounter++;
        this._name = "";

        this.createDisplayObject();
        this._displayObject["$owner"] = this;

        this._relations = new Relations(this);
        this._gears = new Array<GearBase>(10);
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this.setPosition(value, this._y);
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this.setPosition(this._x, value);
    }

    public get z(): number {
        return this._z;
    }

    public set z(value: number) {
        this.setPosition(this._x, this._y, value);
    }

    public setPosition(xv: number, yv: number, zv?: number): void {
        if (this._x != xv || this._y != yv) {
            var dx: number = xv - this._x;
            var dy: number = yv - this._y;
            this._x = xv;
            this._y = yv;
            if (zv != null)
                this._z = zv;

            this.handlePositionChanged();
            if (this instanceof GGroup)
                this.moveChildren(dx, dy);

            this.updateGear(1);

            if (this._parent && !("itemRenderer" in this._parent)) {
                this._parent.setBoundsChangedFlag();
                if (this._group)
                    this._group.setBoundsChangedFlag(true);
                this.dispatchEvent("pos_changed");
            }

            if (GObject.draggingObject == this && !s_dragging)
                this.localToGlobalRect(0, 0, this.width, this.height, sGlobalRect);
        }
    }

    public get xMin(): number {
        return this._pivotAsAnchor ? (this._x - this._width * this._pivotX) : this._x;
    }

    public set xMin(value: number) {
        if (this._pivotAsAnchor)
            this.setPosition(value + this._width * this._pivotX, this._y);
        else
            this.setPosition(value, this._y);
    }

    public get yMin(): number {
        return this._pivotAsAnchor ? (this._y - this._height * this._pivotY) : this._y;
    }

    public set yMin(value: number) {
        if (this._pivotAsAnchor)
            this.setPosition(this._x, value + this._height * this._pivotY);
        else
            this.setPosition(this._x, value);
    }

    public center(restraint?: boolean): void {
        var r: GComponent;
        if (this._parent)
            r = this.parent;
        else
            r = <GComponent>Decls.GRoot.inst;

        this.setPosition(Math.floor((r.width - this.width) / 2), Math.floor((r.height - this.height) / 2));
        if (restraint) {
            this.addRelation(r, RelationType.Center_Center);
            this.addRelation(r, RelationType.Middle_Middle);
        }
    }

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this.setSize(value, this._rawHeight);
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this.setSize(this._rawWidth, value);
    }

    public setSize(wv: number, hv: number, ignorePivot?: boolean): void {
        if (this._rawWidth != wv || this._rawHeight != hv) {
            this._rawWidth = wv;
            this._rawHeight = hv;
            if (wv < this.minWidth)
                wv = this.minWidth;
            if (hv < this.minHeight)
                hv = this.minHeight;
            if (this.maxWidth > 0 && wv > this.maxWidth)
                wv = this.maxWidth;
            if (this.maxHeight > 0 && hv > this.maxHeight)
                hv = this.maxHeight;
            var dWidth: number = wv - this._width;
            var dHeight: number = hv - this._height;
            this._width = wv;
            this._height = hv;

            this.handleSizeChanged();
            if (this._pivotX != 0 || this._pivotY != 0) {
                if (!this._pivotAsAnchor) {
                    if (!ignorePivot)
                        this.setPosition(this.x - this._pivotX * dWidth, this.y - this._pivotY * dHeight);
                    else
                        this.handlePositionChanged();
                }
                else
                    this.handlePositionChanged();
            }

            if (this instanceof GGroup)
                this.resizeChildren(dWidth, dHeight);

            this.updateGear(2);

            if (this._parent) {
                this._relations.onOwnerSizeChanged(dWidth, dHeight, this._pivotAsAnchor || !ignorePivot);
                this._parent.setBoundsChangedFlag();
                if (this._group)
                    this._group.setBoundsChangedFlag();
            }

            this.dispatchEvent("size_changed");
        }
    }

    protected setSizeDirectly(wv: number, hv: number) {
        this._rawWidth = wv;
        this._rawHeight = hv;
        if (wv < 0)
            wv = 0;
        if (hv < 0)
            hv = 0;
        this._width = wv;
        this._height = hv;
    }

    public makeFullScreen(): void {
        this.setSize(Decls.GRoot.inst.width, Decls.GRoot.inst.height);
    }

    public get actualWidth(): number {
        return this.width * Math.abs(this._scaleX);
    }

    public get actualHeight(): number {
        return this.height * Math.abs(this._scaleY);
    }

    public get scaleX(): number {
        return this._scaleX;
    }

    public set scaleX(value: number) {
        this.setScale(value, this._scaleY);
    }

    public get scaleY(): number {
        return this._scaleY;
    }

    public set scaleY(value: number) {
        this.setScale(this._scaleX, value);
    }

    public setScale(sx: number, sy: number): void {
        if (this._scaleX != sx || this._scaleY != sy) {
            this._scaleX = sx;
            this._scaleY = sy;
            this.handleScaleChanged();

            this.updateGear(2);
        }
    }

    public get skewX(): number {
        return this._skewX;
    }

    public set skewX(value: number) {
        this.setSkew(value, this._skewY);
    }

    public get skewY(): number {
        return this._skewY;
    }

    public set skewY(value: number) {
        this.setSkew(this._skewX, value);
    }

    public setSkew(sx: number, sy: number): void {
        if (this._skewX != sx || this._skewY != sy) {
            this._skewX = sx;
            this._skewY = sy;
            //todo skew
        }
    }

    public get pivotX(): number {
        return this._pivotX;
    }

    public set pivotX(value: number) {
        this.setPivot(value, this._pivotY);
    }

    public get pivotY(): number {
        return this._pivotY;
    }

    public set pivotY(value: number) {
        this.setPivot(this._pivotX, value);
    }

    public setPivot(xv: number, yv: number, asAnchor?: boolean): void {
        asAnchor = asAnchor || false;
        if (this._pivotX != xv || this._pivotY != yv || this._pivotAsAnchor != asAnchor) {
            this._pivotX = xv;
            this._pivotY = yv;
            this._pivotAsAnchor = asAnchor;
            this._displayObject.setPivot(xv, yv);
            this.handlePositionChanged();
        }
    }

    public get pivotAsAnchor(): boolean {
        return this._pivotAsAnchor;
    }

    public get touchable(): boolean {
        return this._touchable;
    }

    public set touchable(value: boolean) {
        if (this._touchable != value) {
            this._touchable = value;
            this.updateGear(3);
            this._displayObject.touchable = this._touchable;
        }
    }

    public get grayed(): boolean {
        return this._grayed;
    }

    public set grayed(value: boolean) {
        if (this._grayed != value) {
            this._grayed = value;
            this.handleGrayedChanged();
            this.updateGear(3);
        }
    }

    public get enabled(): boolean {
        return !this._grayed && this._touchable;
    }

    public set enabled(value: boolean) {
        this.grayed = !value;
        this.touchable = value;
    }

    public get rotation(): number {
        return this._displayObject.rotation;
    }

    public set rotation(value: number) {
        if (this._displayObject.rotation != value) {
            this._displayObject.rotation = value;
            this.updateGear(3);
        }
    }

    public get rotationX(): number {
        return this._displayObject.rotationX;
    }

    public set rotationX(value: number) {
        this._displayObject.rotationX = value;
    }

    public get rotationY(): number {
        return this._displayObject.rotationY;
    }

    public set rotationY(value: number) {
        this._displayObject.rotationY = value;
    }

    public get alpha(): number {
        return this._alpha;
    }

    public set alpha(value: number) {
        if (this._alpha != value) {
            this._alpha = value;
            this.handleAlphaChanged();
            this.updateGear(3);
        }
    }

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(value: boolean) {
        if (this._visible != value) {
            this._visible = value;
            this.handleVisibleChanged();
            if (this._parent)
                this._parent.setBoundsChangedFlag();
            if (this._group && this._group.excludeInvisibles)
                this._group.setBoundsChangedFlag();
        }
    }

    public get internalVisible(): boolean {
        return this._internalVisible && (!this._group || this._group.internalVisible);
    }

    public get internalVisible2(): boolean {
        return this._visible && (!this._group || this._group.internalVisible2);
    }

    public get internalVisible3(): boolean {
        return this._internalVisible && this._visible;
    }

    public get sortingOrder(): number {
        return this._sortingOrder;
    }

    public set sortingOrder(value: number) {
        if (value < 0)
            value = 0;
        if (this._sortingOrder != value) {
            var old: number = this._sortingOrder;
            this._sortingOrder = value;
            if (this._parent)
                this._parent.childSortingOrderChanged(this, old, this._sortingOrder);
        }
    }

    public get tooltips(): string {
        return this._tooltips;
    }

    public set tooltips(value: string) {
        if (this._tooltips) {
            this.off("roll_over", this.__rollOver, this);
            this.off("roll_out", this.__rollOut, this);
        }

        this._tooltips = value;
        if (this._tooltips) {
            this.on("roll_over", this.__rollOver, this);
            this.on("roll_out", this.__rollOut, this);
        }
    }

    private __rollOver(): void {
        Timers.callDelay(100, this.__doShowTooltips, this);
    }

    private __doShowTooltips(): void {
        Decls.GRoot.findFor(this).showTooltips(this._tooltips);
    }

    private __rollOut(): void {
        Timers.remove(this.__doShowTooltips, this);
        Decls.GRoot.findFor(this).hideTooltips();
    }

    public get blendMode(): Blending {
        return this._displayObject.blendMode;
    }

    public set blendMode(value: Blending) {
        this._displayObject.blendMode = value;
    }

    public get onStage(): boolean {
        return this._displayObject.stage != null;
    }

    public get resourceURL(): string {
        if (this.packageItem)
            return "ui://" + this.packageItem.owner.id + this.packageItem.id;
        else
            return null;
    }

    public set group(value: GGroup) {
        if (this._group != value) {
            if (this._group)
                this._group.setBoundsChangedFlag();
            this._group = value;
            if (this._group)
                this._group.setBoundsChangedFlag();
        }
    }

    public get group(): GGroup {
        return this._group;
    }

    public getGear(index: number): GearBase {
        var gear: GearBase = this._gears[index];
        if (gear == null)
            this._gears[index] = gear = createGear(this, index);
        return gear;
    }

    protected updateGear(index: number): void {
        if (this._underConstruct || this._gearLocked)
            return;

        var gear: GearBase = this._gears[index];
        if (gear && gear.controller)
            gear.updateState();
    }

    public checkGearController(index: number, c: Controller): boolean {
        return this._gears[index] && this._gears[index].controller == c;
    }

    public updateGearFromRelations(index: number, dx: number, dy: number): void {
        if (this._gears[index])
            this._gears[index].updateFromRelations(dx, dy);
    }

    public addDisplayLock(): number {
        var gearDisplay: GearDisplay = <GearDisplay>(this._gears[0]);
        if (gearDisplay && gearDisplay.controller) {
            var ret: number = gearDisplay.addLock();
            this.checkGearDisplay();

            return ret;
        }
        else
            return 0;
    }

    public releaseDisplayLock(token: number): void {
        var gearDisplay: GearDisplay = <GearDisplay>(this._gears[0]);
        if (gearDisplay && gearDisplay.controller) {
            gearDisplay.releaseLock(token);
            this.checkGearDisplay();
        }
    }

    private checkGearDisplay(): void {
        if (this._handlingController)
            return;

        var connected: boolean = this._gears[0] == null || (<GearDisplay>(this._gears[0])).connected;
        if (this._gears[8])
            connected = (<GearDisplay2>this._gears[8]).evaluate(connected);

        if (connected != this._internalVisible) {
            this._internalVisible = connected;
            if (this._parent) {
                this._parent.childStateChanged(this);
                if (this._group && this._group.excludeInvisibles)
                    this._group.setBoundsChangedFlag();
            }
        }
    }

    public get relations(): Relations {
        return this._relations;
    }

    public addRelation(target: GObject, relationType: number, usePercent?: boolean): void {
        this._relations.add(target, relationType, usePercent);
    }

    public removeRelation(target: GObject, relationType: number): void {
        this._relations.remove(target, relationType);
    }

    public get displayObject(): DisplayObject {
        return this._displayObject;
    }

    public get obj3D(): Object3D {
        return this._displayObject.obj3D;
    }

    public get parent(): GComponent {
        return this._parent;
    }

    public set parent(val: GComponent) {
        this._parent = val;
    }

    public removeFromParent(): void {
        if (this._parent)
            this._parent.removeChild(this);
    }

    public get asCom(): GComponent {
        return <GComponent><any>this;
    }

    public get text(): string {
        return null;
    }

    public set text(value: string) {
    }

    public get icon(): string {
        return null;
    }

    public set icon(value: string) {
    }

    public get treeNode(): GTreeNode {
        return this._treeNode;
    }

    public get isDisposed(): boolean {
        return this._displayObject == null;
    }

    public dispose(): void {
        this.removeFromParent();
        this._relations.dispose();
        this._displayObject.dispose();
        this._displayObject = null;
        for (var i: number = 0; i < 10; i++) {
            var gear: GearBase = this._gears[i];
            if (gear)
                gear.dispose();
        }
    }

    public on(type: EventType, callback: Function, target?: any, capture?: boolean): void;
    public on(type: string, callback: Function, target?: any, capture?: boolean): void;
    public on(type: EventType | string, callback: Function, target?: any, capture?: boolean): void {
        this._displayObject.on(type, callback, target, capture);
    }

    public off(type: EventType, callback: Function, target?: any, capture?: boolean): void;
    public off(type: string, callback: Function, target?: any, capture?: boolean): void;
    public off(type: EventType | string, callback: Function, target?: any, capture?: boolean): void {
        this._displayObject.off(type, callback, target, capture);
    }

    public offAll(type?: EventType): void;
    public offAll(type?: string): void;
    public offAll(type?: EventType | string): void {
        this._displayObject.offAll(type);
    }

    public hasListener(type: EventType, callback?: Function, target?: any, capture?: boolean): boolean;
    public hasListener(type: string, callback?: Function, target?: any, capture?: boolean): boolean;
    public hasListener(type: EventType | string, callback?: Function, target?: any, capture?: boolean): boolean {
        return this._displayObject.hasListener(type, callback, target, capture);
    }

    public dispatchEvent(type: EventType, data?: any): boolean;
    public dispatchEvent(type: string, data?: any): boolean;
    public dispatchEvent(type: EventType | string, data?: any): boolean {
        return this._displayObject.dispatchEvent(type, data);
    }

    public onClick(listener: Function, target?: any): void {
        this.on("click", listener, target);
    }

    public offClick(listener: Function, target?: any): void {
        this.off("click", listener, target);
    }

    public hasClickListener(): boolean {
        return this.hasListener("click");
    }

    public get draggable(): boolean {
        return this._draggable;
    }

    public set draggable(value: boolean) {
        if (this._draggable != value) {
            this._draggable = value;
            this.initDrag();
        }
    }

    public get dragBounds(): Rect {
        return this._dragBounds;
    }

    public set dragBounds(value: Rect) {
        this._dragBounds = value;
    }

    public startDrag(touchId?: number): void {
        if (this._displayObject.stage == null)
            return;

        if (touchId == null)
            touchId = -1;

        this.dragBegin(touchId);
    }

    public stopDrag(): void {
        this.dragEnd();
    }

    public get dragging(): boolean {
        return GObject.draggingObject == this;
    }

    public localToGlobal(ax?: number, ay?: number, result?: Vector2): Vector2 {
        ax = ax || 0;
        ay = ay || 0;

        if (this._pivotAsAnchor) {
            ax += this._pivotX * this._width;
            ay += this._pivotY * this._height;
        }

        return this._displayObject.localToGlobal(ax, ay, result);
    }

    public globalToLocal(ax?: number, ay?: number, result?: Vector2): Vector2 {
        ax = ax || 0;
        ay = ay || 0;

        result = this._displayObject.globalToLocal(ax, ay, result);

        if (this._pivotAsAnchor) {
            result.x -= this._pivotX * this._width;
            result.y -= this._pivotY * this._height;
        }

        return result;
    }

    public localToRoot(ax: number, ay: number, result?: Vector2): Vector2 {
        let r = Decls.GRoot.findFor(this);
        let pt = this.localToGlobal(ax, ay, result);
        return r.globalToLocal(pt.x, pt.y, pt);
    }

    public rootToLocal(ax: number, ay: number, result?: Vector2): Vector2 {
        let r = Decls.GRoot.findFor(this);
        let pt = r.localToGlobal(ax, ay, result);
        return this.globalToLocal(pt.x, pt.y, pt);
    }

    public localToGlobalRect(ax: number, ay: number, aWidth: number, aHeight: number, result?: Rect): Rect {
        if (!result)
            result = new Rect();

        var pt: Vector2 = this.localToGlobal(ax, ay, s_vec2);
        result.x = pt.x;
        result.y = pt.y;
        pt = this.localToGlobal(ax + aWidth, ay + aHeight, s_vec2);
        result.width = pt.x - result.x;
        result.height = pt.y - result.y;
        return result;
    }

    public globalToLocalRect(ax: number, ay: number, aWidth: number, aHeight: number, result?: Rect): Rect {
        if (!result)
            result = new Rect();

        var pt: Vector2 = this.globalToLocal(ax, ay, s_vec2);
        result.x = pt.x;
        result.y = pt.y;
        pt = this.globalToLocal(ax + aWidth, ay + aHeight, s_vec2);
        result.width = pt.x - result.x;
        result.height = pt.y - result.y;
        return result;
    }

    public handleControllerChanged(c: Controller): void {
        this._handlingController = true;
        for (var i: number = 0; i < 10; i++) {
            var gear: GearBase = this._gears[i];
            if (gear && gear.controller == c)
                gear.apply();
        }
        this._handlingController = false;

        this.checkGearDisplay();
    }

    protected createDisplayObject(): void {
        this._displayObject = new DisplayObject();
    }

    protected handlePositionChanged(): void {
        var xv: number = this._x;
        var yv: number = this._y;
        if (!this._pivotAsAnchor) {
            xv += this._pivotX * this._width;
            yv += this._pivotY * this._height;
        }

        this._displayObject.setPosition(xv, yv, this._z, true);
    }

    protected handleSizeChanged(): void {
        this._displayObject.setSize(this._width, this._height);
    }

    protected handleScaleChanged(): void {
        this._displayObject.setScale(this._scaleX, this._scaleY);
    }

    protected handleGrayedChanged(): void {
        if (this._displayObject.graphics)
            this._displayObject.graphics.grayed = this._grayed;
    }

    protected handleAlphaChanged(): void {
        this._displayObject.alpha = this._alpha;
    }

    public handleVisibleChanged(): void {
        this._displayObject.visible = this.internalVisible2;
    }

    public getProp(index: number): any {
        switch (index) {
            case ObjectPropID.Text:
                return this.text;
            case ObjectPropID.Icon:
                return this.icon;
            case ObjectPropID.Color:
                return null;
            case ObjectPropID.OutlineColor:
                return null;
            case ObjectPropID.Playing:
                return false;
            case ObjectPropID.Frame:
                return 0;
            case ObjectPropID.DeltaTime:
                return 0;
            case ObjectPropID.TimeScale:
                return 1;
            case ObjectPropID.FontSize:
                return 0;
            case ObjectPropID.Selected:
                return false;
            default:
                return undefined;
        }
    }

    public setProp(index: number, value: any): void {
        switch (index) {
            case ObjectPropID.Text:
                this.text = value;
                break;

            case ObjectPropID.Icon:
                this.icon = value;
                break;
        }
    }

    public constructFromResource(): void {

    }

    public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
        buffer.seek(beginPos, 0);
        buffer.skip(5);

        var f1: number;
        var f2: number;

        this._id = buffer.readS();
        this._name = buffer.readS();
        f1 = buffer.readInt();
        f2 = buffer.readInt();
        this.setPosition(f1, f2);

        if (buffer.readBool()) {
            this.initWidth = buffer.readInt();
            this.initHeight = buffer.readInt();
            this.setSize(this.initWidth, this.initHeight, true);
        }

        if (buffer.readBool()) {
            this.minWidth = buffer.readInt();
            this.maxWidth = buffer.readInt();
            this.minHeight = buffer.readInt();
            this.maxHeight = buffer.readInt();
        }

        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setScale(f1, f2);
        }

        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setSkew(f1, f2);
        }

        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setPivot(f1, f2, buffer.readBool());
        }

        f1 = buffer.readFloat();
        if (f1 != 1)
            this.alpha = f1;

        f1 = buffer.readFloat();
        if (f1 != 0)
            this.rotation = f1;

        if (!buffer.readBool())
            this.visible = false;
        if (!buffer.readBool())
            this.touchable = false;
        if (buffer.readBool())
            this.grayed = true;
        var bm: number = buffer.readByte();
        this.blendMode = BlendModeTranslate[bm] || NormalBlending;

        var filter: number = buffer.readByte();
        if (filter == 1) {
            //todo set filter
            // ToolSet.setColorFilter(this._displayObject,
            //     [buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat()]);
        }

        var str: string = buffer.readS();
        if (str != null)
            this.data = str;
    }

    public setup_afterAdd(buffer: ByteBuffer, beginPos: number): void {
        buffer.seek(beginPos, 1);

        var str: string = buffer.readS();
        if (str)
            this.tooltips = str;

        var groupId: number = buffer.readShort();
        if (groupId >= 0)
            this.group = <GGroup>this.parent.getChildAt(groupId);

        buffer.seek(beginPos, 2);

        var cnt: number = buffer.readShort();
        for (var i: number = 0; i < cnt; i++) {
            var nextPos: number = buffer.readShort();
            nextPos += buffer.pos;

            var gear: GearBase = this.getGear(buffer.readByte());
            gear.setup(buffer);

            buffer.pos = nextPos;
        }
    }

    //drag support
    //-------------------------------------------------------------------
    private _dragTouchStartPos: Vector2 = new Vector2();
    private _dragTesting: boolean = false;

    private initDrag(): void {
        if (this._draggable) {
            this.on("touch_begin", this.__touchBegin, this);
            this.on("touch_move", this.__touchMove, this);
            this.on("touch_end", this.__touchEnd, this);
        }
        else {
            this.off("touch_begin", this.__touchBegin, this);
            this.off("touch_move", this.__touchMove, this);
            this.off("touch_end", this.__touchEnd, this);
        }
    }

    private dragBegin(touchId: number): void {
        if (GObject.draggingObject) {
            let tmp = GObject.draggingObject;
            GObject.draggingObject.stopDrag();
            GObject.draggingObject = null;
            tmp.dispatchEvent("drag_end");
        }

        this.on("touch_move", this.__touchMove, this);
        this.on("touch_end", this.__touchEnd, this);

        Stage.getTouchPos(touchId, sGlobalDragStart);
        this.localToGlobalRect(0, 0, this.width, this.height, sGlobalRect);
        this._dragTesting = false;

        GObject.draggingObject = this;
        Stage.addTouchMonitor(touchId, this._displayObject);
    }

    private dragEnd(): void {
        if (GObject.draggingObject == this) {
            this._dragTesting = false;
            GObject.draggingObject = null;
        }
    }

    private __touchBegin(evt: Event): void {
        if (this._dragTouchStartPos == null)
            this._dragTouchStartPos = new Vector2();
        this._dragTouchStartPos.set(evt.input.x, evt.input.y);
        this._dragTesting = true;
        evt.captureTouch();
    }

    private __touchMove(evt: Event): void {
        if (this._dragTesting && GObject.draggingObject != this) {
            let sensitivity;
            if (Stage.touchScreen)
                sensitivity = UIConfig.touchDragSensitivity;
            else
                sensitivity = UIConfig.clickDragSensitivity;
            if (Math.abs(this._dragTouchStartPos.x - evt.input.x) < sensitivity
                && Math.abs(this._dragTouchStartPos.y - evt.input.y) < sensitivity)
                return;

            this._dragTesting = false;
            if (!this.dispatchEvent("drag_start", evt.input.touchId))
                this.dragBegin(evt.input.touchId);
        }

        if (GObject.draggingObject == this) {
            let xx = evt.input.x - sGlobalDragStart.x + sGlobalRect.x;
            let yy = evt.input.y - sGlobalDragStart.y + sGlobalRect.y;

            if (this._dragBounds) {
                let rect: Rect = (<GObject>Decls.GRoot.findFor(this)).localToGlobalRect(this._dragBounds.x, this._dragBounds.y,
                    this._dragBounds.width, this._dragBounds.height, s_rect);
                if (xx < rect.x)
                    xx = rect.x;
                else if (xx + sGlobalRect.width > rect.xMax) {
                    xx = rect.xMax - sGlobalRect.width;
                    if (xx < rect.x)
                        xx = rect.x;
                }

                if (yy < rect.y)
                    yy = rect.y;
                else if (yy + sGlobalRect.height > rect.yMax) {
                    yy = rect.yMax - sGlobalRect.height;
                    if (yy < rect.y)
                        yy = rect.y;
                }
            }

            let pt = this.parent.globalToLocal(xx, yy, s_vec2);

            s_dragging = true;
            this.setPosition(Math.round(pt.x), Math.round(pt.y));
            s_dragging = false;

            this.dispatchEvent("drag_move");
        }
    }

    private __touchEnd(): void {
        if (GObject.draggingObject == this) {
            GObject.draggingObject = null;
            this.dispatchEvent("drag_end");
        }
    }

    public static cast(obj: any): GObject {
        let dobj: any;
        if (obj instanceof Object3D) {
            dobj = obj["$owner"];
            if (!dobj)
                return null;
        }
        else
            dobj = obj;

        return dobj['$owner'];
    }
}

let GearClasses: Array<typeof GearBase> = [
    GearDisplay, GearXY, GearSize, GearLook, GearColor,
    GearAnimation, GearText, GearIcon, GearDisplay2, GearFontSize
];

function createGear(owner: GObject, index: number): GearBase {
    let ret = new (GearClasses[index])();
    ret._owner = owner;
    return ret;
}

var s_vec2: Vector2 = new Vector2();
var s_rect: Rect = new Rect();

var sGlobalDragStart: Vector2 = new Vector2();
var sGlobalRect: Rect = new Rect();
var s_dragging: boolean;

const BlendModeTranslate = {
    0: NormalBlending,
    1: NoBlending,
    2: AdditiveBlending,
    3: MultiplyBlending,
    4: SubtractiveBlending,//todo Screen
}

export interface IGRoot {
    inst: any;
    findFor(obj: GObject): any;
}

export var Decls: { GRoot?: IGRoot } = {};

export var gInstanceCounter: number = 0;
export var constructingDepth: { n: number } = { n: 0 };