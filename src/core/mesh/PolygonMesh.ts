import { Vector2, Vector3 } from "three";
import { Color4 } from "../../utils/Color";
import { Rect } from "../../utils/Rect";
import { lerp } from "../../utils/ToolSet";
import { IHitTest } from "../hittest/IHitTest";
import { IMeshFactory } from "./MeshFactory";
import { VertexBuffer } from "./VertexBuffer";

var sRestIndices: Array<number> = [];
var a: Vector2 = new Vector2();
var b: Vector2 = new Vector2();
var c: Vector2 = new Vector2();
var p: Vector2 = new Vector2();
var p0: Vector3 = new Vector3();
var p1: Vector3 = new Vector3();
var p3: Vector3 = new Vector3();
var lineVector: Vector3 = new Vector3();
var widthVector: Vector3 = new Vector3();

export class PolygonMesh implements IMeshFactory, IHitTest {
    public readonly points: Array<number>;
    public readonly texcoords: Array<number>;
    public lineWidth: number;
    public lineColor: Color4;
    public fillColor: Color4;
    public usePercentPositions: boolean;

    public constructor() {
        this.points = new Array<number>();
        this.texcoords = new Array<number>();
    }

    public add(x: number, y: number, uv_x?: number, uv_y?: number): void {
        this.points.push(x, y);
        if (uv_x != null)
            this.texcoords.push(uv_x, uv_y);
    }

    public onPopulateMesh(vb: VertexBuffer) {
        let numVertices: number = this.points.length / 2;
        if (numVertices < 3)
            return;

        let restIndexPos: number, numRestIndices: number;
        let color: Color4 = this.fillColor != null ? this.fillColor : vb.vertexColor;

        let w: number = vb.contentRect.width;
        let h: number = vb.contentRect.height;
        let useTexcoords: boolean = this.texcoords.length >= this.points.length;
        for (let i: number = 0; i < numVertices; i++) {
            let j: number = i * 2;
            let vx = this.points[j];
            let vy = this.points[j + 1];
            if (this.usePercentPositions) {
                vx *= w;
                vy *= h;
            }
            if (useTexcoords) {
                let ux = this.texcoords[j];
                let uy = this.texcoords[j + 1];
                ux = lerp(vb.uvRect.x, vb.uvRect.xMax, ux);
                uy = lerp(vb.uvRect.y, vb.uvRect.yMax, uy);
                vb.addVert(vx, vy, 0, ux, uy, color);
            }
            else
                vb.addVert(vx, vy, 0, color);
        }

        // Algorithm "Ear clipping method" described here:
        // -> https://en.wikipedia.org/wiki/Polygon_triangulation
        //
        // Implementation inspired by:
        // -> http://polyk.ivank.net
        // -> Starling

        sRestIndices.length = 0;
        for (let i: number = 0; i < numVertices; ++i)
            sRestIndices.push(i);

        restIndexPos = 0;
        numRestIndices = numVertices;

        let otherIndex: number;
        let earFound: boolean;
        let i0: number, i1: number, i2: number;

        while (numRestIndices > 3) {
            earFound = false;
            i0 = sRestIndices[restIndexPos % numRestIndices];
            i1 = sRestIndices[(restIndexPos + 1) % numRestIndices];
            i2 = sRestIndices[(restIndexPos + 2) % numRestIndices];

            a.set(this.points[i0 * 2], this.points[i0 * 2 + 1]);
            b.set(this.points[i1 * 2], this.points[i1 * 2 + 1]);
            c.set(this.points[i2 * 2], this.points[i2 * 2 + 1]);

            if ((a.y - b.y) * (c.x - b.x) + (b.x - a.x) * (c.y - b.y) >= 0) {
                earFound = true;
                for (let i: number = 3; i < numRestIndices; ++i) {
                    otherIndex = sRestIndices[(restIndexPos + i) % numRestIndices];
                    p.set(this.points[otherIndex * 2], this.points[otherIndex * 2 + 1]);

                    if (this.isPointInTriangle(p, a, b, c)) {
                        earFound = false;
                        break;
                    }
                }
            }

            if (earFound) {
                vb.addTriangle(i0, i2, i1);
                sRestIndices.splice((restIndexPos + 1) % numRestIndices, 1);

                numRestIndices--;
                restIndexPos = 0;
            }
            else {
                restIndexPos++;
                if (restIndexPos == numRestIndices) break; // no more ears
            }
        }
        vb.addTriangle(sRestIndices[0], sRestIndices[2], sRestIndices[1]);

        if (this.lineWidth > 0)
            this.drawOutline(vb);
    }

    private drawOutline(vb: VertexBuffer) {
        let numVertices: number = this.points.length / 2;
        let start: number = vb.currentVertCount - numVertices;
        let k: number = vb.currentVertCount;
        for (let i: number = 0; i < numVertices; i++) {
            vb.getPosition(start + i, p0);
            if (i < numVertices - 1)
                vb.getPosition(start + i + 1, p1);
            else
                vb.getPosition(vb.vertices[start], p1);

            lineVector.copy(p1);
            lineVector.sub(p0);

            widthVector.copy(lineVector);
            widthVector.cross(new Vector3(0, 0, 1));
            widthVector.normalize();

            widthVector.multiplyScalar(this.lineWidth * 0.5);

            p3.copy(p0);
            p3.sub(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);

            p3.copy(p0);
            p3.add(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);

            p3.copy(p1);
            p3.sub(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);

            p3.copy(p1);
            p3.add(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);

            k += 4;
            vb.addTriangle(k - 4, k - 1, k - 3);
            vb.addTriangle(k - 4, k - 2, k - 1);

            //joint
            if (i != 0) {
                vb.addTriangle(k - 6, k - 3, k - 5);
                vb.addTriangle(k - 6, k - 4, k - 3);
            }
            if (i == numVertices - 1) {
                start += numVertices;
                vb.addTriangle(k - 2, start + 1, k - 1);
                vb.addTriangle(k - 2, start, start + 1);
            }
        }
    }

    private isPointInTriangle(p: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean {
        // From Starling
        // This algorithm is described well in this article:
        // http://www.blackpawn.com/texts/pointinpoly/default.html

        let v0x: number = c.x - a.x;
        let v0y: number = c.y - a.y;
        let v1x: number = b.x - a.x;
        let v1y: number = b.y - a.y;
        let v2x: number = p.x - a.x;
        let v2y: number = p.y - a.y;

        let dot00: number = v0x * v0x + v0y * v0y;
        let dot01: number = v0x * v1x + v0y * v1y;
        let dot02: number = v0x * v2x + v0y * v2y;
        let dot11: number = v1x * v1x + v1y * v1y;
        let dot12: number = v1x * v2x + v1y * v2y;

        let invDen: number = 1.0 / (dot00 * dot11 - dot01 * dot01);
        let u: number = (dot11 * dot02 - dot01 * dot12) * invDen;
        let v: number = (dot00 * dot12 - dot01 * dot02) * invDen;

        return (u >= 0) && (v >= 0) && (u + v < 1);
    }

    public hitTest(contentRect: Rect, x: number, y: number): boolean {
        if (!contentRect.contains(x, y))
            return false;

        // Algorithm & implementation thankfully taken from:
        // -> http://alienryderflex.com/polygon/
        // inspired by Starling
        let len: number = this.points.length / 2;
        let i: number;
        let j: number = len - 1;
        let oddNodes: boolean = false;
        let w: number = contentRect.width;
        let h: number = contentRect.height;

        for (i = 0; i < len; ++i) {
            let ix: number = this.points[i * 2];
            let iy: number = this.points[i * 2 + 1];
            let jx: number = this.points[j * 2];
            let jy: number = this.points[j * 2 + 1];
            if (this.usePercentPositions) {
                ix *= w;
                iy *= h;
                ix *= w;
                iy *= h;
            }

            if ((iy < y && jy >= y || jy < y && iy >= y) && (ix <= x || jx <= x)) {
                if (ix + (y - iy) / (jy - iy) * (jx - ix) < x)
                    oddNodes = !oddNodes;
            }

            j = i;
        }

        return oddNodes;
    }
}