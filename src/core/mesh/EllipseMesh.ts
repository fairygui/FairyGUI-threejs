import { Vector2, Vector3 } from "three";
import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
import { clamp } from "../../utils/ToolSet";
import { IHitTest } from "../hittest/IHitTest";
import { IMeshFactory } from "./MeshFactory";
import { VertexBuffer } from "./VertexBuffer";

const SECTOR_CENTER_TRIANGLES: Array<number> = [
    0, 4, 1,
    0, 3, 4,
    0, 2, 3,
    0, 8, 5,
    0, 7, 8,
    0, 6, 7,
    6, 5, 2,
    2, 1, 6
];
var s_v3 = new Vector3();

export class EllipseMesh implements IMeshFactory, IHitTest {

    public drawRect: Rect;
    public lineWidth: number;
    public lineColor: Color4;
    public centerColor: Color4;
    public fillColor: Color4;
    public startDegree: number;
    public endDegreee: number;

    public constructor() {
        this.lineColor = new Color4();
        this.lineWidth = 1;
        this.startDegree = 0;
        this.endDegreee = 360;
    }

    public onPopulateMesh(vb: VertexBuffer) {
        let rect: Rect = this.drawRect ? this.drawRect : vb.contentRect;
        let color: Color4 = this.fillColor ? this.fillColor : vb.vertexColor;
        let lineColor = this.lineColor;

        let sectionStart: number = clamp(this.startDegree, 0, 360);
        let sectionEnd: number = clamp(this.endDegreee, 0, 360);
        let clipped: boolean = sectionStart > 0 || sectionEnd < 360;
        sectionStart = sectionStart * Math.PI / 180;
        sectionEnd = sectionEnd * Math.PI / 180;
        let enterColor: Color4 = this.centerColor ? this.centerColor : color;

        let radiusX: number = rect.width / 2;
        let radiusY: number = rect.height / 2;
        let sides: number = Math.ceil(Math.PI * (radiusX + radiusY) / 4);
        sides = clamp(sides, 40, 800);
        let angleDelta: number = 2 * Math.PI / sides;
        let angle: number = 0;
        let lineAngle: number = 0;

        if (this.lineWidth > 0 && clipped) {
            lineAngle = this.lineWidth / Math.max(radiusX, radiusY);
            sectionStart += lineAngle;
            sectionEnd -= lineAngle;
        }

        let vpos: number = vb.currentVertCount;
        let centerX: number = rect.x + radiusX;
        let centerY: number = rect.y + radiusY;
        vb.addVert(centerX, centerY, 0, enterColor);
        for (let i: number = 0; i < sides; i++) {
            if (angle < sectionStart)
                angle = sectionStart;
            else if (angle > sectionEnd)
                angle = sectionEnd;
            let vx: number = Math.cos(angle) * (radiusX - this.lineWidth) + centerX;
            let vy: number = Math.sin(angle) * (radiusY - this.lineWidth) + centerY;
            vb.addVert(vx, vy, 0, color);
            if (this.lineWidth > 0) {
                vb.addVert(vx, vy, 0, lineColor);
                vb.addVert(Math.cos(angle) * radiusX + centerX, Math.sin(angle) * radiusY + centerY, 0, lineColor);
            }
            angle += angleDelta;
        }

        if (this.lineWidth > 0) {
            let cnt: number = sides * 3;
            for (let i: number = 0; i < cnt; i += 3) {
                if (i != cnt - 3) {
                    vb.addTriangle(0, i + 4, i + 1);
                    vb.addTriangle(i + 5, i + 3, i + 2);
                    vb.addTriangle(i + 3, i + 5, i + 6);
                }
                else if (!clipped) {
                    vb.addTriangle(0, 1, i + 1);
                    vb.addTriangle(2, i + 3, i + 2);
                    vb.addTriangle(i + 3, 2, 3);
                }
                else {
                    vb.addTriangle(0, i + 1, i + 1);
                    vb.addTriangle(i + 2, i + 3, i + 2);
                    vb.addTriangle(i + 3, i + 2, i + 3);
                }
            }
        }
        else {
            for (let i: number = 0; i < sides; i++) {
                if (i != sides - 1)
                    vb.addTriangle(0, i + 2, i + 1);
                else if (!clipped)
                    vb.addTriangle(0, 1, i + 1);
                else
                    vb.addTriangle(0, i + 1, i + 1);
            }
        }

        if (this.lineWidth > 0 && clipped) {
            //扇形内边缘的线条

            vb.addVert(radiusX, radiusY, 0, lineColor);
            let centerRadius: number = this.lineWidth * 0.5;

            sectionStart -= lineAngle;
            angle = sectionStart + lineAngle * 0.5 + Math.PI * 0.5;
            vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
            angle -= Math.PI;
            vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
            vb.addVert(Math.cos(sectionStart) * radiusX + radiusX, Math.sin(sectionStart) * radiusY + radiusY, 0, lineColor);
            vb.getPosition(vpos + 3, s_v3);
            vb.addVert(s_v3.x, s_v3.y, s_v3.z, lineColor);

            sectionEnd += lineAngle;
            angle = sectionEnd - lineAngle * 0.5 + Math.PI * 0.5;
            vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
            angle -= Math.PI;
            vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
            vb.getPosition(vpos + sides * 3, s_v3);
            vb.addVert(s_v3.x, s_v3.y, s_v3.z, lineColor);
            vb.addVert(Math.cos(sectionEnd) * radiusX + radiusX, Math.sin(sectionEnd) * radiusY + radiusY, 0, lineColor);

            vb.addTriangles(sides * 3 + 1, SECTOR_CENTER_TRIANGLES);
        }
    }

    public hitTest(contentRect: Rect, x: number, y: number): boolean {
        if (!contentRect.contains(x, y))
            return false;

        let radiusX: number = contentRect.width * 0.5;
        let raduisY: number = contentRect.height * 0.5;
        x = x - radiusX - contentRect.x;
        y = y - raduisY - contentRect.y;
        if (Math.pow(x / radiusX, 2) + Math.pow(y / raduisY, 2) < 1) {
            if (this.startDegree != 0 || this.endDegreee != 360) {
                let deg: number = Math.atan2(y, x) * 180 / Math.PI;
                if (deg < 0)
                    deg += 360;
                return deg >= this.startDegree && deg <= this.endDegreee;
            }
            else
                return true;
        }

        return false;
    }
}