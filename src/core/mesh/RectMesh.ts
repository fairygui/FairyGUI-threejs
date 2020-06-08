import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
import { IMeshFactory } from "./MeshFactory";
import { VertexBuffer } from "./VertexBuffer";

var s_rect: Rect = new Rect();

export class RectMesh implements IMeshFactory {
    public drawRect: Rect;
    public lineWidth: number;
    public lineColor: Color4;
    public fillColor: Color4;

    public constructor() {
        this.lineWidth = 1;
    }

    public onPopulateMesh(vb: VertexBuffer) {
        let rect: Rect = this.drawRect ? this.drawRect : vb.contentRect;
        let color: Color4 = this.fillColor ? this.fillColor : vb.vertexColor;
        let lineColor: Color4 = this.lineColor ? this.lineColor : vb.vertexColor;

        if (this.lineWidth == 0) {
            if (color.a != 0)//optimized
                vb.addQuad(rect, null, color);
        }
        else {
            let part: Rect = s_rect;

            //left,right
            part.set(rect.x, rect.y, this.lineWidth, rect.height);
            vb.addQuad(part, null, lineColor);
            part.set(rect.xMax - this.lineWidth, rect.y, this.lineWidth, rect.height);
            vb.addQuad(part, null, lineColor);

            //top, bottom
            part.set(rect.x + this.lineWidth, rect.y, rect.width - this.lineWidth * 2, this.lineWidth);
            vb.addQuad(part, null, lineColor);
            part.set(rect.x + this.lineWidth, rect.yMax - this.lineWidth, rect.width - this.lineWidth * 2, this.lineWidth);
            vb.addQuad(part, null, lineColor);

            //middle
            if (color.a != 0)//optimized
            {
                part.setMinMax(rect.x + this.lineWidth, rect.y + this.lineWidth, rect.xMax - this.lineWidth, rect.yMax - this.lineWidth);
                if (part.width > 0 && part.height > 0)
                    vb.addQuad(part, null, color);
            }
        }

        vb.addTriangles();
    }
}