import { IMeshFactory } from "./MeshFactory";
import { IHitTest } from "../hittest/IHitTest";
import { VertexBuffer } from "./VertexBuffer";
import { Rect } from "../../utils/Rect";
import { Vector2 } from "three";

export class CompositeMesh implements IMeshFactory, IHitTest {
    public readonly elements: Array<IMeshFactory>;

    public activeIndex: number;

    public constructor() {
        this.elements = [];
        this.activeIndex = -1;
    }

    public onPopulateMesh(vb: VertexBuffer) {
        let cnt = this.elements.length;
        if (cnt == 1)
            this.elements[0].onPopulateMesh(vb);
        else {
            let vb2: VertexBuffer = VertexBuffer.begin(vb);

            for (let i = 0; i < cnt; i++) {
                if (this.activeIndex == -1 || i == this.activeIndex) {
                    vb2.clear();
                    this.elements[i].onPopulateMesh(vb2);
                    vb.append(vb2);
                }
            }

            vb2.end();
        }
    }

    public hitTest(contentRect: Rect, x: number, y: number): boolean {
        if (!contentRect.contains(x, y))
            return false;

        let flag: boolean = false;
        let cnt = this.elements.length;
        for (let i = 0; i < cnt; i++) {
            if (this.activeIndex == -1 || i == this.activeIndex) {
                let ht = this.elements[i];
                if ('hitTest' in ht) {
                    if ((<IHitTest>ht).hitTest(contentRect, x, y))
                        return true;
                }
                else
                    flag = true;
            }
        }

        return flag;
    }
}