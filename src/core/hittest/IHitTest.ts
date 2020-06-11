namespace fgui {

    export interface IHitTest {
        hitTest(contentRect: Rect, x: number, y: number): boolean;
    }
}