import { DisplayObject } from "./DisplayObject";
import { NGraphics } from "./NGraphics";
import { RectMesh } from "./mesh/RectMesh";
import { Color4 } from "../utils/Color";
import { EmptyTexture } from "./NTexture";
import { RoundedRectMesh } from "./mesh/RoundedRectMesh";
import { EllipseMesh } from "./mesh/EllipseMesh";
import { PolygonMesh } from "./mesh/PolygonMesh";
import { RegularPolygonMesh } from "./mesh/RegularPolygonMesh";
import { IHitTest } from "./hittest/IHitTest";
import { Vector2 } from "three";
import { HitTestContext } from "./Stage";

export class Shape extends DisplayObject {
    public constructor() {
        super();

        this._graphics = new NGraphics(this._obj3D);
        this._graphics.texture = EmptyTexture;
    }

    public drawRect(lineWidth: number, lineColor: Color4, fillColor: Color4) {
        let mesh: RectMesh = this._graphics.getMeshFactory<RectMesh>(RectMesh);
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;

        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }

    public drawRoundRect(lineWidth: number, lineColor: Color4, fillColor: Color4,
        topLeftRadius: number, topRightRadius: number, bottomLeftRadius: number, bottomRightRadius: number) {
        let mesh = this._graphics.getMeshFactory<RoundedRectMesh>(RoundedRectMesh);
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        mesh.topLeftRadius = topLeftRadius;
        mesh.topRightRadius = topRightRadius;
        mesh.bottomLeftRadius = bottomLeftRadius;
        mesh.bottomRightRadius = bottomRightRadius;

        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }

    public drawEllipse(lineWidth: number, centerColor: Color4, lineColor: Color4, fillColor: Color4, startDegree?: number, endDegree?: number) {
        let mesh = this._graphics.getMeshFactory<EllipseMesh>(EllipseMesh);
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        if (centerColor.equals(fillColor))
            mesh.centerColor = null;
        else
            mesh.centerColor = centerColor;
        mesh.startDegree = startDegree;
        mesh.endDegreee = endDegree;

        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }

    public drawPolygon(points: Array<number>, fillColor: Color4, lineWidth?: number, lineColor?: Color4) {
        let mesh = this._graphics.getMeshFactory<PolygonMesh>(PolygonMesh);
        mesh.points.length = 0;
        mesh.points.push.apply(mesh.points, points);
        mesh.fillColor = fillColor;
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;

        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }

    public drawRegularPolygon(sides: number, lineWidth: number, centerColor: Color4, lineColor: Color4,
        fillColor: Color4, rotation: number, distances: Array<number>) {
        let mesh = this._graphics.getMeshFactory<RegularPolygonMesh>(RegularPolygonMesh);
        mesh.sides = sides;
        mesh.lineWidth = lineWidth;
        mesh.centerColor = centerColor;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        mesh.rotation = rotation;
        mesh.distances = distances;

        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }

    public clear() {
        this._graphics.meshFactory = null;
        this._graphics.setMeshDirty();
    }

    protected hitTest(context: HitTestContext): DisplayObject {
        if (!this._graphics.meshFactory)
            return null;

        let pt: Vector2 = context.getLocal(this);

        let ht: any = this._graphics.meshFactory;
        if ('hitTest' in ht)
            return (<IHitTest>ht).hitTest(this._contentRect, pt.x, pt.y) ? this : null;
        else if (this._contentRect.contains(pt))
            return this;
        else
            return null;
    }
}