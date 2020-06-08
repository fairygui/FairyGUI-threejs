import { IHitTest } from "./IHitTest";
import { DisplayObject } from "../DisplayObject";
import { Rect } from "../../utils/Rect";
import { Vector2 } from "three";

var s_vec2: Vector2 = new Vector2();

export class ShapeHitTest implements IHitTest {
    public shape: DisplayObject;

    public constructor(obj: DisplayObject) {
        this.shape = obj;
    }

    public hitTest(contentRect: Rect, x: number, y: number): boolean {
        if (!this.shape.graphics)
            return false;

        if (this.shape.parent) {
            let p: DisplayObject = this.shape.parent["$owner"];
            if (p) {
                p.transformPoint(x, y, this.shape.obj3D, s_vec2);
                x = s_vec2.x;
                y = s_vec2.y;
            }
        }

        let ht = this.shape.graphics.meshFactory;
        if (!('hitTest' in ht))
            return false;

        return (<IHitTest>ht).hitTest(contentRect, x, y);
    }
}