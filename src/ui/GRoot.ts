import { Vector2, Object3D, Audio } from "three";
import { RelationType, PopupDirection } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GGraph } from "./GGraph";
import { GObject, Forwards } from "./GObject";
import { UIConfig } from "./UIConfig";
import { UIPackage } from "./UIPackage";
import { Window } from "./Window"
import { Stage } from "../core/Stage";
import { Color4 } from "../utils/Color";
import { DisplayObject } from "../core/DisplayObject";
import { UIContentScaler } from "./UIContentScaler";

var _inst: GRoot;

export class GRoot extends GComponent {
    private _modalLayer: GGraph;
    private _popupStack: GObject[];
    private _justClosedPopups: GObject[];
    private _modalWaitPane: GObject;
    private _tooltipWin: GObject;
    private _defaultTooltipWin: GObject;

    public static get inst(): GRoot {
        if (!_inst) {
            _inst = new GRoot();
            Stage.scene.add(_inst.displayObject.obj3D);
        }
        return _inst;
    }

    public static findFor(obj: GObject): GRoot {
        if (obj instanceof GRoot)
            return <GRoot>obj;

        if (!obj)
            return _inst;

        var p: GObject = obj._parent;
        while (p) {
            if (p instanceof GRoot)
                return <GRoot>p;
            p = p.parent;
        }
        return _inst;
    }

    constructor() {
        super();
        if (!_inst)
            _inst = this;

        this.opaque = false;
        this._popupStack = [];
        this._justClosedPopups = [];

        this.on("touch_begin", this.__stageTouchBegin, this, true);

        this._modalLayer = new GGraph();
        this._modalLayer.setSize(this.width, this.height);
        this._modalLayer.shape.drawRect(0, new Color4(0, 0), UIConfig.modalLayerColor);
        this._modalLayer.addRelation(this, RelationType.Size);

        this.applyScaleFactor();
        this.on("content_scale_factor_changed", this.applyScaleFactor, this);
    }

    private applyScaleFactor() {
        this.setSize(Math.ceil(Stage.width / UIContentScaler.scaleFactor), Math.ceil(Stage.height / UIContentScaler.scaleFactor));
        this.setScale(UIContentScaler.scaleFactor, UIContentScaler.scaleFactor);
    }

    public showWindow(win: Window): void {
        this.addChild(win);

        if (win.x > this.width)
            win.x = this.width - win.width;
        else if (win.x + win.width < 0)
            win.x = 0;

        if (win.y > this.height)
            win.y = this.height - win.height;
        else if (win.y + win.height < 0)
            win.y = 0;

        this.adjustModalLayer();
    }

    public hideWindow(win: Window): void {
        win.hide();
    }

    public hideWindowImmediately(win: Window): void {
        if (win.parent == this)
            this.removeChild(win);

        this.adjustModalLayer();
    }

    public bringToFront(win: Window): void {
        var cnt: number = this.numChildren;
        var i: number;
        if (this._modalLayer.parent && !win.modal)
            i = this.getChildIndex(this._modalLayer) - 1;
        else
            i = cnt - 1;

        for (; i >= 0; i--) {
            var g: GObject = this.getChildAt(i);
            if (g == win)
                return;
            if (g instanceof Window)
                break;
        }

        if (i >= 0)
            this.setChildIndex(win, i);
    }

    public showModalWait(msg?: string): void {
        if (UIConfig.globalModalWaiting) {
            if (this._modalWaitPane == null)
                this._modalWaitPane = UIPackage.createObjectFromURL(UIConfig.globalModalWaiting);
            this._modalWaitPane.setSize(this.width, this.height);
            this._modalWaitPane.addRelation(this, RelationType.Size);

            this.addChild(this._modalWaitPane);
            this._modalWaitPane.text = msg || "";
        }
    }

    public closeModalWait(): void {
        if (this._modalWaitPane && this._modalWaitPane.parent)
            this.removeChild(this._modalWaitPane);
    }

    public closeAllExceptModals(): void {
        var arr: GObject[] = this._children.slice();
        var cnt: number = arr.length;
        for (var i: number = 0; i < cnt; i++) {
            var g: GObject = arr[i];
            if ((g instanceof Window) && !(<Window>g).modal)
                (<Window>g).hide();
        }
    }

    public closeAllWindows(): void {
        var arr: GObject[] = this._children.slice();
        var cnt: number = arr.length;
        for (var i: number = 0; i < cnt; i++) {
            var g: GObject = arr[i];
            if (g instanceof Window)
                (<Window>g).hide();
        }
    }

    public getTopWindow(): Window {
        var cnt: number = this.numChildren;
        for (var i: number = cnt - 1; i >= 0; i--) {
            var g: GObject = this.getChildAt(i);
            if (g instanceof Window) {
                return (<Window>g);
            }
        }

        return null;
    }

    public get modalLayer(): GObject {
        return this._modalLayer;
    }

    public get hasModalWindow(): boolean {
        return this._modalLayer.parent != null;
    }

    public get modalWaiting(): boolean {
        return this._modalWaitPane && this._modalWaitPane.onStage;
    }

    public showPopup(popup: GObject, target?: GObject, dir?: PopupDirection): void {
        if (this._popupStack.length > 0) {
            var k: number = this._popupStack.indexOf(popup);
            if (k != -1) {
                for (var i: number = this._popupStack.length - 1; i >= k; i--)
                    this.removeChild(this._popupStack.pop());
            }
        }
        this._popupStack.push(popup);

        if (target) {
            var p: GObject = target;
            while (p) {
                if (p.parent == this) {
                    if (popup.sortingOrder < p.sortingOrder) {
                        popup.sortingOrder = p.sortingOrder;
                    }
                    break;
                }
                p = p.parent;
            }
        }

        this.addChild(popup);
        this.adjustModalLayer();

        var pos: Vector2;
        var sizeW: number = 0, sizeH: number = 0;
        if (target) {
            pos = target.localToRoot(0, 0);
            let size = target.localToRoot(target.width, target.height);
            sizeW = size.x - pos.x;
            sizeH = size.y - pos.y;
        }
        else {
            pos = Stage.getTouchPos();
            pos = this.globalToLocal(pos.x, pos.y);
        }
        var xx: number, yy: number;
        xx = pos.x;
        if (xx + popup.width > this.width)
            xx = xx + sizeW - popup.width;
        yy = pos.y + sizeH;
        if (((dir == null || dir == PopupDirection.Auto) && yy + popup.height > this.height)
            || dir == PopupDirection.Up) {
            yy = pos.y - popup.height - 1;
            if (yy < 0) {
                yy = 0;
                xx += sizeW / 2;
            }
        }

        popup.setPosition(xx, yy);
    }

    public togglePopup(popup: GObject, target?: GObject, dir?: PopupDirection): void {
        if (this._justClosedPopups.indexOf(popup) != -1)
            return;

        this.showPopup(popup, target, dir);
    }

    public hidePopup(popup?: GObject): void {
        if (popup) {
            var k: number = this._popupStack.indexOf(popup);
            if (k != -1) {
                for (var i: number = this._popupStack.length - 1; i >= k; i--)
                    this.closePopup(this._popupStack.pop());
            }
        }
        else {
            var cnt: number = this._popupStack.length;
            for (i = cnt - 1; i >= 0; i--)
                this.closePopup(this._popupStack[i]);
            this._popupStack.length = 0;
        }
    }

    public get hasAnyPopup(): boolean {
        return this._popupStack.length != 0;
    }

    private closePopup(target: GObject): void {
        if (target.parent) {
            if (target instanceof Window)
                (<Window>target).hide();
            else
                this.removeChild(target);
        }
    }

    public showTooltips(msg: string): void {
        if (this._defaultTooltipWin == null) {
            var resourceURL: string = UIConfig.tooltipsWin;
            if (!resourceURL) {
                console.warn("UIConfig.tooltipsWin not defined");
                return;
            }

            this._defaultTooltipWin = UIPackage.createObjectFromURL(resourceURL);
        }

        this._defaultTooltipWin.text = msg;
        this.showTooltipsWin(this._defaultTooltipWin);
    }

    public showTooltipsWin(tooltipWin: GObject, xx?: number, yy?: number): void {
        this.hideTooltips();

        this._tooltipWin = tooltipWin;
        if (xx == null || yy == null) {
            xx = Stage.touchPos.x + 10;
            yy = Stage.touchPos.y + 20;
        }
        var pt: Vector2 = this.globalToLocal(xx, yy);
        xx = pt.x;
        yy = pt.y;

        if (xx + this._tooltipWin.width > this.width) {
            xx = xx - this._tooltipWin.width - 1;
            if (xx < 0)
                xx = 10;
        }
        if (yy + this._tooltipWin.height > this.height) {
            yy = yy - this._tooltipWin.height - 1;
            if (xx - this._tooltipWin.width - 1 > 0)
                xx = xx - this._tooltipWin.width - 1;
            if (yy < 0)
                yy = 10;
        }

        this._tooltipWin.x = xx;
        this._tooltipWin.y = yy;
        this.addChild(this._tooltipWin);
    }

    public hideTooltips(): void {
        if (this._tooltipWin) {
            if (this._tooltipWin.parent)
                this.removeChild(this._tooltipWin);
            this._tooltipWin = null;
        }
    }

    public playOneShotSound(url: string, volumeScale?: number): void {
        if (!Stage.audioListener)
            return;

        if (volumeScale == null) volumeScale = 1;
        let pi = UIPackage.getItemByURL(url);
        if (pi && pi.audioBuffer) {
            if (!pi.sound) {
                pi.sound = new Audio(Stage.audioListener);
                pi.sound.setBuffer(pi.audioBuffer);
                pi.sound.setLoop(false);
            }
            pi.sound.setVolume(volumeScale);
            pi.sound.play();
        }
    }

    private adjustModalLayer(): void {
        var cnt: number = this.numChildren;

        if (this._modalWaitPane && this._modalWaitPane.parent)
            this.setChildIndex(this._modalWaitPane, cnt - 1);

        for (var i: number = cnt - 1; i >= 0; i--) {
            var g: GObject = this.getChildAt(i);
            if ((g instanceof Window) && (<Window>g).modal) {
                if (this._modalLayer.parent == null)
                    this.addChildAt(this._modalLayer, i);
                else
                    this.setChildIndexBefore(this._modalLayer, i);
                return;
            }
        }

        if (this._modalLayer.parent)
            this.removeChild(this._modalLayer);
    }

    public checkPopups(): void {
        this._justClosedPopups.length = 0;

        if (this._popupStack.length > 0) {
            let mc: DisplayObject | Object3D = Stage.touchTarget;
            let handled = false;
            while (mc) {
                let gobj = GObject.cast(mc);
                if (gobj) {
                    let k = this._popupStack.indexOf(gobj);
                    if (k != -1) {
                        for (let i = this._popupStack.length - 1; i > k; i--) {
                            let last = this._popupStack.length - 1;
                            let popup: GObject = this._popupStack[last];

                            this.closePopup(popup);
                            this._justClosedPopups.push(popup);
                            this._popupStack.splice(last, 1);
                        }
                        handled = true;
                        break;
                    }
                }
                mc = mc.parent;
            }

            if (!handled) {
                for (let i = this._popupStack.length - 1; i >= 0; i--) {
                    let popup = this._popupStack[i];
                    this.closePopup(popup);
                    this._justClosedPopups.push(popup);
                    this._popupStack.splice(i, 1);
                }
            }
        }
    }

    private __stageTouchBegin(): void {
        if (this._tooltipWin)
            this.hideTooltips();

        this.checkPopups();
    }
}

Forwards.GRootType = GRoot;