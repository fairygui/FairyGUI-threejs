import { Vector2, Vector3 } from "three";
import { Color4 } from "../../utils/Color";
import { Pool } from "../../utils/Pool";
import { Rect } from "../../utils/Rect";
import { lerp } from "../../utils/ToolSet";

/**
 * 1---2
 * | / |
 * 0---3
 * threejs要求逆时针顶点顺序，即 0-2-1， 0-3-2
 */
export class VertexBuffer {
    public contentRect: Rect;
    public uvRect: Rect;
    public vertexColor: Color4;
    public textureSize: Vector2;

    public readonly vertices: Array<number>;
    public readonly uvs: Array<number>;
    public readonly colors: Array<number>;
    public readonly triangles: Array<number>;

    public static begin(source?: VertexBuffer): VertexBuffer {
        let inst: VertexBuffer = pool.borrow();
        if (source) {
            inst.contentRect = source.contentRect;
            inst.uvRect = source.uvRect;
            inst.vertexColor = source.vertexColor;
            inst.textureSize = source.textureSize;
        }

        return inst;
    }

    public constructor() {
        this.vertices = new Array<number>();
        this.uvs = new Array<number>();
        this.colors = new Array<number>();
        this.triangles = new Array<number>();

        this.contentRect = new Rect();
        this.uvRect = new Rect();
        this.textureSize = new Vector2();
        this.vertexColor = new Color4();
    }

    public end() {
        this.clear();
        pool.returns(this);
    }

    public clear() {
        this.vertices.length = 0;
        this.colors.length = 0;
        this.uvs.length = 0;
        this.triangles.length = 0;
    }

    public get currentVertCount(): number {
        return this.vertices.length / 3;
    }

    public addVert(x: number, y: number, z: number, uv_x?: number | Color4, uv_y?: number, color?: Color4): void {
        y = -y;
        this.vertices.push(x, y, z ? z : 0);
        if (typeof uv_x === 'number')
            this.uvs.push(uv_x, uv_y);
        else {
            this.uvs.push(
                lerp(this.uvRect.x, this.uvRect.xMax, (x - this.contentRect.x) / this.contentRect.width),
                lerp(this.uvRect.yMax, this.uvRect.y, (-y - this.contentRect.y) / this.contentRect.height));

            if (uv_x instanceof Color4)
                color = <Color4>uv_x;
        }

        if (color == null)
            color = this.vertexColor;
        this.colors.push(color.r, color.g, color.b, color.a);
    }

    public addQuad(vertRect: Rect, uvRect?: Rect | Array<Vector2>, color?: Color4): void {
        uvBuf.length = 0;
        if (uvRect) {
            if (Array.isArray(uvRect)) {
                for (let i = 0; i < 4; i++)
                    uvBuf.push(uvRect[i].x, uvRect[i].y);
            }
            else
                uvBuf.push(uvRect.x, uvRect.y, uvRect.x, uvRect.yMax, uvRect.xMax, uvRect.yMax, uvRect.xMax, uvRect.y);
        }

        this.addVert(vertRect.x, vertRect.yMax, 0, uvBuf[0], uvBuf[1], color);
        this.addVert(vertRect.x, vertRect.y, 0, uvBuf[2], uvBuf[3], color);
        this.addVert(vertRect.xMax, vertRect.y, 0, uvBuf[4], uvBuf[5], color);
        this.addVert(vertRect.xMax, vertRect.yMax, 0, uvBuf[6], uvBuf[7], color);
    }

    public repeatColors(value: Array<number>, startIndex: number, count: number): void {
        let len: number = Math.min(startIndex + count, this.vertices.length / 3);
        let colorCount = value.length;
        let k: number = 0;
        for (let i: number = startIndex; i < len; i++) {
            let c: number = value[(k++) % colorCount];
            this.colors[i] = c;
        }
    }

    public addTriangle(idx0: number, idx1: number, idx2: number): void {
        this.triangles.push(idx0);
        this.triangles.push(idx1);
        this.triangles.push(idx2);
    }

    public addTriangles(startVertexIndex?: number, idxList?: Array<number>): void {
        if (idxList != null) {
            if (startVertexIndex != 0) {
                if (startVertexIndex < 0)
                    startVertexIndex = this.vertices.length / 3 + startVertexIndex;

                let cnt: number = idxList.length;
                for (let i = 0; i < cnt; i++)
                    this.triangles.push(idxList[i] + startVertexIndex);
            }
            else
                this.triangles.push.apply(this.triangles, idxList);
        }
        else {
            let cnt = this.vertices.length / 3;
            if (startVertexIndex == null)
                startVertexIndex = 0;
            else if (startVertexIndex < 0)
                startVertexIndex = cnt + startVertexIndex;

            let idxList = this.triangles;
            for (let i = startVertexIndex; i < cnt; i += 4) {
                idxList.push(i);
                idxList.push(i + 2);
                idxList.push(i + 1);


                idxList.push(i + 3);
                idxList.push(i + 2);
                idxList.push(i);
            }
        }
    }

    public getPosition(index: number, ret: Vector3): Vector3 {
        if (index < 0)
            index = this.vertices.length / 3 + index;

        let vec = ret ? ret : new Vector3();
        vec.x = this.vertices[index * 3];
        vec.y = -this.vertices[index * 3 + 1];
        vec.z = this.vertices[index * 3 + 2];
        return vec;
    }

    public append(vb: VertexBuffer): void {
        this.vertices.push.apply(this.vertices, vb.vertices);
        this.uvs.push.apply(this.uvs, vb.uvs);
        this.colors.push.apply(this.colors, vb.colors);
        this.triangles.push.apply(this.triangles, vb.triangles);
    }
}

var pool: Pool<VertexBuffer> = new Pool<VertexBuffer>(VertexBuffer);
var uvBuf: Array<number> = new Array<number>(8);