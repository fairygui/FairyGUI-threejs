import { Blending, Camera, Euler, Matrix4, NormalBlending, Object3D, Plane, Quaternion, Scene, Vector2, Vector3, Vector4 } from "three";
import { EventDispatcher } from "../event/EventDispatcher";
import { Rect } from "../utils/Rect";
import { IHitTest } from "./hittest/IHitTest";
import { NGraphics } from "./NGraphics";
import { broadcastEvent, HitTestContext, screenToWorld, Stage, UILayer, worldToScreen } from "./Stage";

export class DisplayObject extends EventDispatcher {
    public opaque?: boolean;
    public hitArea?: IHitTest;
    public mask?: DisplayObject;
    public reversedMask?: boolean;
    public camera?: Camera;

    protected _contentRect: Rect;
    protected _alpha: number;
    protected _touchable: boolean;
    protected _touchDisabled?: boolean;
    protected _pos: Vector3;
    protected _rot: Euler;
    protected _pivot: Vector2;
    protected _pivotOffset: Vector3;
    protected _clipRect?: Rect;
    protected _clipPlanes?: Array<Plane>;

    protected _obj3D: Object3D;
    protected _graphics?: NGraphics;

    private _matrixDirty: boolean;

    public constructor() {
        super();

        this._obj3D = new Object3D();
        this._obj3D["isGroup"] = true;
        this._obj3D["$owner"] = this;
        this._obj3D.layers.set(UILayer);

        this._pos = this._obj3D.position;
        this._rot = this._obj3D.rotation;
        this._pivot = new Vector2();
        this._pivotOffset = new Vector3();
        this._contentRect = new Rect();
        this._alpha = 1;
        this._touchable = true;
    }

    public get obj3D(): Object3D {
        return this._obj3D;
    }

    public get name(): string {
        return this._obj3D.name;
    }

    public set name(value: string) {
        this._obj3D.name = value;
    }

    public get x(): number {
        return this._pos.x;
    }

    public set x(value: number) {
        this.setPosition(value, -this._pos.y, this._pos.z);
    }

    public get y(): number {
        return -this._pos.y;
    }

    public set y(value: number) {
        this.setPosition(this._pos.x, value, this._pos.z);
    }

    public get z(): number {
        return this._pos.z;
    }

    public set z(value: number) {
        this.setPosition(this._pos.x, -this._pos.y, value);
    }

    public setPosition(x: number, y: number, z?: number, isPivot?: boolean): void {
        z = z || 0;
        if (isPivot) {
            x -= this._pivotOffset.x;
            y += this._pivotOffset.y;
            z -= this._pivotOffset.z;
        }

        this._matrixDirty = true;
        this._pos.set(x, -y, z);
    }

    public get width(): number {
        this.ensureSizeCorrect();

        return this._contentRect.width;
    }

    public set width(value: number) {
        if (this._contentRect.width != value) {
            this._contentRect.width = value;
            this.onSizeChanged();
        }
    }

    public get height(): number {
        this.ensureSizeCorrect();

        return this._contentRect.height;
    }

    public set height(value: number) {
        if (this._contentRect.height != value) {
            this._contentRect.height = value;
            this.onSizeChanged();
        }
    }

    public setSize(wv: number, hv: number): void {
        if (wv != this._contentRect.width || hv != this._contentRect.height) {
            this._contentRect.width = wv;
            this._contentRect.height = hv;
            this.onSizeChanged();
        }
    }

    protected ensureSizeCorrect(): void {
    }

    protected onSizeChanged(): void {
        this.applyPivot();

        if (this._graphics)
            this._graphics.setDrawRect(this._contentRect);
    }

    public get pivotX(): number {
        return this._pivot.x;
    }

    public set pivotX(value: number) {
        this.setPivot(value, this._pivot.y);
    }

    public get pivotY(): number {
        return this._pivot.y;
    }

    public set pivotY(value: number) {
        this.setPosition(this._pivot.x, value);
    }

    public setPivot(xv: number, yv: number): void {
        if (this._pivot.x != xv || this._pivot.y != yv) {
            let dpx: number = (xv - this._pivot.x) * this._contentRect.width;
            let dpy: number = (this._pivot.y - yv) * this._contentRect.height;
            s_v3.copy(this._pivotOffset);

            this._pivot.set(xv, yv);
            this.updatePivotOffset();

            this._pos.x += s_v3.x - this._pivotOffset.x + dpx;
            this._pos.y += s_v3.y - this._pivotOffset.y + dpy;
            this._pos.y += s_v3.z - this._pivotOffset.z;
            this._matrixDirty = true;
        }
    }

    private updatePivotOffset() {
        let px = this._pivot.x * this._contentRect.width;
        let py = this._pivot.y * this._contentRect.height;
        s_quaternion.setFromEuler(this._rot);
        s_mat.compose(s_v3_2, s_quaternion, this._obj3D.scale);
        this._pivotOffset.set(px, -py, 0);
        this._pivotOffset.applyMatrix4(s_mat);
    }

    private applyPivot() {
        if (this._pivot.x != 0 || this._pivot.y != 0) {
            s_v3.copy(this._pivotOffset);

            this.updatePivotOffset();
            this._pos.x += s_v3.x - this._pivotOffset.x;
            this._pos.y += s_v3.y - this._pivotOffset.y;
            this._matrixDirty = true;
        }
    }

    public get scaleX(): number {
        return this._obj3D.scale.x;
    }

    public set scaleX(value: number) {
        this.setScale(value, this._obj3D.scale.y);
    }

    public get scaleY(): number {
        return this._obj3D.scale.y;
    }

    public set scaleY(value: number) {
        this.setScale(this._obj3D.scale.x, value);
    }

    public setScale(xv: number, yv: number) {
        this._obj3D.scale.set(xv, yv, xv);
        this.applyPivot();
        this._matrixDirty = true;
    }

    public get rotationX(): number {
        return this._rot.x * 180 / Math.PI;
    }

    public set rotationX(value: number) {
        this._rot.x = value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
    }

    public get rotationY(): number {
        return this._rot.y * 180 / Math.PI;
    }

    public set rotationY(value: number) {
        this._rot.y = value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
    }

    public get rotation(): number {
        return -this._rot.z * 180 / Math.PI;
    }

    public set rotation(value: number) {
        this._rot.z = -value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
    }

    public get parent(): Object3D {
        return this._obj3D.parent;
    }

    public get stage(): Scene {
        let t: Object3D = this._obj3D;
        while (t.parent)
            t = t.parent;
        return t["isScene"];
    }

    public get graphics(): NGraphics {
        return this._graphics;
    }

    public get alpha(): number {
        return this._alpha;
    }
    public set alpha(value: number) {
        this._alpha = value;
    }

    public get touchable(): boolean {
        return this._touchable;
    }
    public set touchable(value: boolean) {
        this._touchable = value;
    }

    public get visible(): boolean {
        return this._obj3D.visible;
    }

    public set visible(value: boolean) {
        this._obj3D.visible = value;
    }

    public get color(): number {
        return this._graphics ? this._graphics.color : 0;
    }

    public set color(value: number) {
        if (this._graphics) this._graphics.color = value;
    }

    public get blendMode(): Blending {
        return this._graphics ? this._graphics.material.blending : NormalBlending;
    }

    public set blendMode(value: Blending) {
        if (this._graphics)
            this._graphics.material.blending = value;
    }

    public setLayer(layer: number) {
        this._obj3D.traverse(obj => obj.layers.set(layer));
    }

    public validateMatrix(): void {
        this._obj3D.traverseAncestors(e => {
            let dobj = e["$owner"];
            if (dobj && dobj._matrixDirty) {
                dobj._matrixDirty = false;
                dobj._obj3D.updateMatrixWorld(true);
            }
        });
        if (this._matrixDirty) {
            this._matrixDirty = false;
            this._obj3D.updateMatrixWorld(true);
        }
    }

    public _getRenderCamera(): Camera {
        let p = this._obj3D;
        while (p) {
            let dobj = p["$owner"];
            if (dobj && dobj.camera)
                return dobj.camera;

            p = p.parent;
        }
        return Stage.camera;
    }

    public worldToLocal(pt: Vector3, direction?: Vector3, validate?: boolean): Vector3 {
        if (validate)
            this.validateMatrix();
        pt = this._obj3D.worldToLocal(pt);
        if (pt.z != 0) {
            s_dir.copy(direction || s_forward);
            s_dir.applyQuaternion(this._obj3D.getWorldQuaternion(s_quaternion).inverse()).normalize();
            let distOnLine = -pt.dot(s_forward) / s_dir.dot(s_forward);
            pt.add(s_dir.multiplyScalar(distOnLine));
        }
        pt.y = -pt.y;
        return pt;
    }

    public localToWorld(pt: Vector3, validate?: boolean): Vector3 {
        if (validate)
            this.validateMatrix();
        pt.y = -pt.y;
        pt = this._obj3D.localToWorld(pt);
        return pt;
    }

    public globalToLocal(x: number, y: number, result?: Vector2): Vector2 {
        if (!Stage.disableMatrixValidation)
            this.validateMatrix();

        screenToWorld(this._getRenderCamera(), x, y, s_v3, s_dir);
        this.worldToLocal(s_v3, s_dir);

        if (!result)
            result = new Vector2();
        result.set(s_v3.x, s_v3.y);

        return result;
    }

    public localToGlobal(x: number, y: number, result?: Vector2): Vector2 {
        if (!Stage.disableMatrixValidation)
            this.validateMatrix();

        s_v3.set(x, -y, 0);
        this._obj3D.localToWorld(s_v3);

        if (!result)
            result = new Vector2();
        worldToScreen(this._getRenderCamera(), s_v3, result);

        return result;
    }

    public getBounds(targetSpace: Object3D, result?: Rect): Rect {
        this.ensureSizeCorrect();

        if (!result)
            result = new Rect();

        if (targetSpace == this._obj3D) // optimization
            result.copy(this._contentRect);
        else if (targetSpace == this._obj3D.parent && this._rot.z == 0)
            result.set(this._pos.x, -this._pos.y,
                this._contentRect.width * this._obj3D.scale.x, this._contentRect.height * this._obj3D.scale.y);
        else
            result = this.transformRect(this._contentRect, targetSpace, result);

        return result;
    }

    public transformPoint(x: number, y: number, targetSpace?: Object3D, result?: Vector2): Vector2 {
        if (!result)
            result = new Vector2();

        if (targetSpace == this._obj3D)
            result.set(x, y);
        else {
            if (!Stage.disableMatrixValidation)
                this.validateMatrix();

            s_v3.set(x, -y, 0);
            this._obj3D.localToWorld(s_v3);
            if (targetSpace)
                targetSpace.worldToLocal(s_v3);
            result.set(s_v3.x, -s_v3.y);
        }

        return result;
    }

    public transformRect(rect: Rect, targetSpace?: Object3D, result?: Rect): Rect {
        if (!result)
            result = new Rect();

        if (targetSpace == this._obj3D) {
            result.copy(rect);
            return result;
        }

        if (targetSpace && targetSpace == this._obj3D.parent && this._rot.z == 0) {
            let scale = this._obj3D.scale;
            result.set((this._pos.x + rect.x) * scale.x, (this.y + rect.y) * scale.y, rect.width * scale.x, rect.height * scale.y);
        }
        else {
            s_v4.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);

            if (!Stage.disableMatrixValidation)
                this.validateMatrix();

            this.transformRectPoint(rect.x, rect.y, targetSpace);
            this.transformRectPoint(rect.xMax, rect.y, targetSpace);
            this.transformRectPoint(rect.x, rect.yMax, targetSpace);
            this.transformRectPoint(rect.xMax, rect.yMax, targetSpace);

            result.setMinMax(s_v4.x, s_v4.y, s_v4.z, s_v4.w);
        }
        return result;
    }

    private transformRectPoint(x: number, y: number, targetSpace: Object3D) {
        s_v3.set(x, y, 0);
        this.localToWorld(s_v3);
        if (targetSpace)
            targetSpace.worldToLocal(s_v3);

        if (s_v4.x > s_v3.x) s_v4.x = s_v3.x;
        if (s_v4.z < s_v3.x) s_v4.z = s_v3.x;
        if (s_v4.y > s_v3.y) s_v4.y = s_v3.y;
        if (s_v4.w < s_v3.y) s_v4.w = s_v3.y;
    }

    public addChild(child: DisplayObject): void {
        this.addChildAt(child, Number.POSITIVE_INFINITY);
    }

    public addChildAt(child: DisplayObject, index: number) {
        if (child._obj3D.parent) {
            let i: number = child._obj3D.parent.children.indexOf(child._obj3D);
            child._obj3D.parent.children.splice(i, 1);
        }

        if (index >= this._obj3D.children.length)
            this._obj3D.children.push(child._obj3D);
        else
            this._obj3D.children.splice(index, 0, child._obj3D);
        child._obj3D.parent = this._obj3D;
        child._obj3D.layers.mask = this._obj3D.layers.mask;

        if (this.stage)
            broadcastEvent(child.obj3D, "added_to_stage");
    }

    public removeChild(child: DisplayObject) {
        let index = this._obj3D.children.indexOf(child._obj3D);
        if (index == -1)
            throw 'not a child';

        this.removeChildAt(index);
    }

    public removeChildAt(index: number) {
        let child: Object3D = this._obj3D.children[index];
        if (this.stage)
            broadcastEvent(child, "removed_from_stage");

        this._obj3D.children.splice(index, 1);
        child.parent = null;
    }

    public setChildIndex(child: DisplayObject, index: number) {
        let oldIndex = this._obj3D.children.indexOf(child._obj3D);
        if (oldIndex == index) return;
        if (oldIndex == -1) throw 'Not a child';
        this._obj3D.children.splice(oldIndex, 1);
        if (index >= this._obj3D.children.length)
            this._obj3D.children.push(child._obj3D);
        else
            this._obj3D.children.splice(index, 0, child._obj3D);
    }

    public getIndex(child: DisplayObject): number {
        return this._obj3D.children.indexOf(child._obj3D);
    }

    public get numChildren(): number {
        return this._obj3D.children.length;
    }

    public get clipRect(): Rect {
        return this._clipRect;
    }

    public set clipRect(value: Rect) {
        this._clipRect = value;
    }

    public update(clipPlanes: any, alpha: number) {
        if (this._clipRect) {
            this.transformRect(this._clipRect, null, s_rect);

            if (clipPlanes) {
                s_rect2.setMinMax(-clipPlanes[0].constant, -clipPlanes[3].constant,
                    clipPlanes[1].constant, clipPlanes[2].constant);
                s_rect.intersection(s_rect2);
            }
            if (!this._clipPlanes) {
                this._clipPlanes = [
                    new Plane(new Vector3(1, 0, 0)),
                    new Plane(new Vector3(-1, 0, 0)),
                    new Plane(new Vector3(0, -1, 0)),
                    new Plane(new Vector3(0, 1, 0))
                ];
            }

            clipPlanes = this._clipPlanes;
            clipPlanes[0].constant = -s_rect.x;
            clipPlanes[1].constant = s_rect.xMax;
            clipPlanes[2].constant = s_rect.yMax;
            clipPlanes[3].constant = -s_rect.y;
        }

        if (this._graphics)
            this._graphics.update(clipPlanes, this._alpha * alpha);
    }

    protected hitTest(context: HitTestContext): DisplayObject {
        if (this._obj3D.scale.x == 0 || this._obj3D.scale.y == 0)
            return null;

        let backupRay: any;
        if (this.camera) {
            backupRay = context.ray;
            context.camera = this.camera;
        }

        let target: DisplayObject;
        let pt: Vector2 = context.getLocal(this);
        let lx: number = pt.x;
        let ly: number = pt.y;

        if (this.hitArea) {
            if (!this.hitArea.hitTest(this._contentRect, lx, ly))
                return null;
        }
        else {
            if (this._clipRect && !this._clipRect.contains(lx, ly))
                return null;
        }

        if (this.mask) {
            let tmp: DisplayObject = this.mask.visible ? this.mask.hitTest(context) : null;
            if (!this.reversedMask && !tmp || this.reversedMask && tmp)
                return null;
        }

        target = traverseHitTest(this._obj3D, context, this.mask);

        if (!target && this.opaque && (this.hitArea || this._contentRect.contains(lx, ly)))
            target = this;

        if (backupRay)
            context.ray = backupRay;

        return target;
    }

    public dispose() {
    }
}

var s_v3: Vector3 = new Vector3();
var s_v3_2: Vector3 = new Vector3();
var s_v4: Vector4 = new Vector4();
var s_rect: Rect = new Rect();
var s_rect2: Rect = new Rect();
var s_mat: Matrix4 = new Matrix4();
var s_quaternion: Quaternion = new Quaternion();

var s_dir: Vector3 = new Vector3();
const s_forward = new Vector3(0, 0, 1);

export function traverseUpdate(p: Object3D, clippingPlanes: any, alpha: number): void {
    let children = p.children;
    let cnt = children.length;

    let dobj = p["$owner"];
    if (dobj) {
        if (dobj._clipRect)
            clippingPlanes = dobj._clipPlanes;
        alpha *= dobj.alpha;
    }

    for (let i = 0; i < cnt; i++) {
        let child: Object3D = children[i];
        dobj = child["$owner"];
        if (dobj)
            dobj.update(clippingPlanes, alpha);

        if (child.children.length > 0)
            traverseUpdate(child, clippingPlanes, alpha);
    }
}

export function traverseHitTest(p: Object3D, context: HitTestContext, mask?: any): DisplayObject {
    let count = p.children.length;
    for (let i = count - 1; i >= 0; --i) // front to back!
    {
        let child: Object3D = p.children[i];
        if (!child.visible)
            continue;

        let dobj = child["$owner"];
        if (dobj) {
            if (dobj == mask || dobj._touchDisabled)
                continue;

            if (!context.forTouch || dobj._touchable) {
                let target = dobj.hitTest(context);
                if (target)
                    return target;
            }
        }

        if (child.children.length > 0) {
            let target = traverseHitTest(child, context);
            if (target)
                return target;
        }
    }
}