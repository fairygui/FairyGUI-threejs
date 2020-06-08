import { Vector2 } from "three";
import { Rect } from "../../utils/Rect";
import { DisplayObject } from "../DisplayObject";
import { HitTestContext } from "../hittest/IHitTest";
import { IMeshFactory } from "../mesh/MeshFactory";
import { VertexBuffer } from "../mesh/VertexBuffer";
import { NGraphics } from "../NGraphics";
import { EmptyTexture } from "../NTexture";

var s_rect: Rect = new Rect();

export class SelectionShape extends DisplayObject implements IMeshFactory {
    public readonly rects: Array<Rect>;

    public constructor() {
        super();

        this.rects = new Array<Rect>();

        this._graphics = new NGraphics(this._obj3D);
        this._graphics.texture = EmptyTexture;
    }

    public refresh() {
        let count = this.rects.length;
        if (count > 0) {
            s_rect.copy(this.rects[0]);
            for (let i = 1; i < count; i++)
                s_rect.union(this.rects[i]);
            this.setSize(s_rect.xMax, s_rect.yMax);
        }
        else
            this.setSize(0, 0);
        this.graphics.setMeshDirty();
    }

    public clear() {
        this.rects.length = 0;
        this.graphics.setMeshDirty();
    }

    public onPopulateMesh(vb: VertexBuffer) {
        let count = this.rects.length;
        if (count == 0)
            return;

        for (let i = 0; i < count; i++)
            vb.addQuad(this.rects[i]);
        vb.addTriangles();
    }

    protected hitTest(context: HitTestContext): DisplayObject {
        let pt: Vector2 = context.getLocal(this);

        if (this._contentRect.contains(pt)) {
            let count = this.rects.length;
            for (let i = 0; i < count; i++) {
                if (this.rects[i].contains(pt))
                    return this;
            }
        }

        return null;
    }
}