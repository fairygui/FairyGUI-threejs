import { IMeshFactory } from "./MeshFactory";
import { IHitTest } from "../hittest/IHitTest";
import { Rect } from "../../utils/Rect";
import { VertexBuffer } from "./VertexBuffer";
import { Color4 } from "../../utils/Color";

export class RegularPolygonMesh implements IMeshFactory, IHitTest {
    public drawRect: Rect;
    public sides: number;
    public lineWidth: number;
    public lineColor: Color4;
    public centerColor: Color4;
    public fillColor: Color4;
    public distances: Array<number>;
    public rotation: number;

    public constructor() {
        this.sides = 3;
        this.lineWidth = 1;
        this.lineColor = new Color4();
    }

    public onPopulateMesh(vb: VertexBuffer) {
        if (this.distances != null && this.distances.length < this.sides) {
            console.error("distances.Length<sides");
            return;
        }

        let rect = this.drawRect != null ? this.drawRect : vb.contentRect;
        let color = this.fillColor != null ? this.fillColor : vb.vertexColor;

        let angleDelta: number = 2 * Math.PI / this.sides;
        let angle: number = this.rotation * Math.PI / 180;
        let radius: number = Math.min(rect.width / 2, rect.height / 2);

        let centerX: number = radius + rect.x;
        let centerY: number = radius + rect.y;
        vb.addVert(centerX, centerY, 0, this.centerColor ? this.centerColor : color);
        for (let i: number = 0; i < this.sides; i++) {
            let r: number = radius;
            if (this.distances != null)
                r *= this.distances[i];
            let xv: number = Math.cos(angle) * (r - this.lineWidth);
            let yv: number = Math.sin(angle) * (r - this.lineWidth);
            vb.addVert(xv + centerX, yv + centerY, 0, color);
            if (this.lineWidth > 0) {
                vb.addVert(xv + centerX, yv + centerY, 0, this.lineColor);

                xv = Math.cos(angle) * r + centerX;
                yv = Math.sin(angle) * r + centerY;
                vb.addVert(xv, yv, 0, this.lineColor);
            }
            angle += angleDelta;
        }

        if (this.lineWidth > 0) {
            let tmp: number = this.sides * 3;
            for (let i: number = 0; i < tmp; i += 3) {
                if (i != tmp - 3) {
                    vb.addTriangle(0, i + 4, i + 1);
                    vb.addTriangle(i + 5, i + 3, i + 2);
                    vb.addTriangle(i + 3, i + 5, i + 6);
                }
                else {
                    vb.addTriangle(0, 1, i + 1);
                    vb.addTriangle(2, i + 3, i + 2);
                    vb.addTriangle(i + 3, 2, 3);
                }
            }
        }
        else {
            for (let i: number = 0; i < this.sides; i++)
                vb.addTriangle(0, (i == this.sides - 1) ? 1 : i + 2, i + 1);
        }
    }

    public hitTest(contentRect: Rect, x: number, y: number): boolean {
        if (this.drawRect)
            return this.drawRect.contains(x, y);
        else
            return contentRect.contains(x, y);
    }
}