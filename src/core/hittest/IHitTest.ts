import { Rect } from "../../utils/Rect";
import { Vector3, Vector2 } from "three";
import { DisplayObject } from "../DisplayObject";

export class HitTestContext {
    public screenPt: Vector3 = new Vector3();
    public worldPt: Vector3 = new Vector3();
    public forTouch: boolean;

    public getLocal(obj: DisplayObject): Vector2 {
        s_vec3.copy(this.worldPt);
        obj.worldToLocal(s_vec3);
        s_vec2.set(s_vec3.x, s_vec3.y);
        return s_vec2;
    }
}

var s_vec3: Vector3 = new Vector3();
var s_vec2: Vector2 = new Vector2();

export interface IHitTest {
    hitTest(contentRect: Rect, x: number, y: number): boolean;
}