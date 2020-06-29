import { Vector2 } from "three";
import { Stage } from "../core/Stage";
import { GLoader } from "./GLoader";
import { GObject } from "./GObject";
import { GRoot } from "./GRoot";
import { Event } from "../event/Event";

var _inst: DragDropManager;

export class DragDropManager {

    private _agent: GLoader;
    private _sourceData: any;

    public static get inst(): DragDropManager {
        if (!_inst)
            _inst = new DragDropManager();
        return _inst;
    }

    constructor() {
        let a = this._agent = new GLoader();
        a.draggable = true;
        a.touchable = false;////important
        a.setSize(100, 100);
        a.setPivot(0.5, 0.5, true);
        a.align = "center";
        a.verticalAlign = "middle";
        a.sortingOrder = 1000000;
        a.on("drag_end", this.__dragEnd, this);
    }

    public get dragAgent(): GObject {
        return this._agent;
    }

    public get dragging(): boolean {
        return this._agent.parent != null;
    }

    public startDrag(icon: string, sourceData?: any, touchPointID?: number): void {
        if (this._agent.parent)
            return;

        this._sourceData = sourceData;
        this._agent.url = icon;
        GRoot.inst.addChild(this._agent);
        var pt: Vector2 = GRoot.inst.globalToLocal(Stage.touchPos.x, Stage.touchPos.y);
        this._agent.setPosition(pt.x, pt.y);
        this._agent.startDrag(touchPointID != null ? touchPointID : -1);
    }

    public cancel(): void {
        if (this._agent.parent) {
            this._agent.stopDrag();
            GRoot.inst.removeChild(this._agent);
            this._sourceData = null;
        }
    }

    private __dragEnd(evt: Event): void {
        if (this._agent.parent == null) //cancelled
            return;

        GRoot.inst.removeChild(this._agent);

        var sourceData: any = this._sourceData;
        this._sourceData = null;

        var obj: GObject = GObject.cast(Stage.touchTarget);
        while (obj) {
            if (obj.hasListener("drop")) {
                obj.dispatchEvent("drop", sourceData);
                return;
            }

            obj = obj.parent;
        }
    }
}

