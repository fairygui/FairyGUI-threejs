import { Rect } from "../../utils/Rect";

export interface IHitTest {
    hitTest(contentRect: Rect, x: number, y: number): boolean;
}