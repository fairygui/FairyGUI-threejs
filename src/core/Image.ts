import { Vector2 } from "three";
import { FillMethod, FlipType } from "../ui/FieldTypes";
import { Rect } from "../utils/Rect";
import { DisplayObject } from "./DisplayObject";
import { FillMesh } from "./mesh/FillMesh";
import { IMeshFactory } from "./mesh/MeshFactory";
import { VertexBuffer } from "./mesh/VertexBuffer";
import { NGraphics } from "./NGraphics";
import { NTexture } from "./NTexture";
import { lerp } from "../utils/ToolSet";

export class Image extends DisplayObject implements IMeshFactory {
    protected _scaleByTile: boolean;
    protected _scale9Grid: Rect;
    protected _textureScale: Vector2;
    protected _tileGridIndice: number = 0;
    protected _fillMesh?: FillMesh;

    constructor() {
        super();

        this._graphics = new NGraphics(this._obj3D);
        this._graphics.meshFactory = this;
        this._textureScale = new Vector2(1, 1);
    }

    public get texture(): NTexture {
        return this._graphics.texture;
    }

    public set texture(value: NTexture) {
        this._graphics.texture = value;
    }

    public get textureScale(): Vector2 {
        return this._textureScale;
    }

    public set textureScale(value: Vector2) {
        if (!this._textureScale.equals(value)) {
            this._textureScale.copy(value);
            this._graphics.setMeshDirty();
        }
    }

    public get scale9Grid(): Rect {
        return this._scale9Grid;
    }

    public set scale9Grid(value: Rect) {
        this._scale9Grid = value;
        this._graphics.setMeshDirty();
    }

    public get scaleByTile(): boolean {
        return this._scaleByTile;
    }

    public set scaleByTile(value: boolean) {
        if (this._scaleByTile != value) {
            this._scaleByTile = value;
            this._graphics.setMeshDirty();
        }
    }

    public get tileGridIndice(): number {
        return this._tileGridIndice;
    }

    public set tileGridIndice(value: number) {
        if (this._tileGridIndice != value) {
            this._tileGridIndice = value;
            this._graphics.setMeshDirty();
        }
    }

    public get fillMethod(): number {
        return this._fillMesh ? this._fillMesh.method : FillMethod.None;
    }

    public set fillMethod(value: number) {
        if (!this._fillMesh) {
            if (value == FillMethod.None)
                return;

            this._fillMesh = new FillMesh();
        }
        if (this._fillMesh.method != value) {
            this._fillMesh.method = value;
            this._graphics.setMeshDirty();
        }
    }

    public get fillOrigin(): number {
        return this._fillMesh ? this._fillMesh.origin : 0;
    }

    public set fillOrigin(value: number) {
        if (!this._fillMesh)
            this._fillMesh = new FillMesh();

        if (this._fillMesh.origin != value) {
            this._fillMesh.origin = value;
            this._graphics.setMeshDirty();
        }
    }

    public get fillClockwise(): boolean {
        return this._fillMesh ? this._fillMesh.clockwise : true;
    }

    public set fillClockwise(value: boolean) {
        if (!this._fillMesh)
            this._fillMesh = new FillMesh();

        if (this._fillMesh.clockwise != value) {
            this._fillMesh.clockwise = value;
            this._graphics.setMeshDirty();
        }
    }

    public get fillAmount(): number {
        return this._fillMesh ? this._fillMesh.amount : 0;
    }

    public set fillAmount(value: number) {
        if (!this._fillMesh)
            this._fillMesh = new FillMesh();

        if (this._fillMesh.amount != value) {
            this._fillMesh.amount = value;
            this._graphics.setMeshDirty();
        }
    }

    public onPopulateMesh(vb: VertexBuffer): void {
        if (this._fillMesh && this._fillMesh.method != FillMethod.None) {
            this._fillMesh.onPopulateMesh(vb);
        }
        else if (this._scaleByTile) {
            contentRect.copy(vb.contentRect);
            contentRect.width *= this._textureScale.x;
            contentRect.height *= this._textureScale.y;

            this.tileFill(vb, contentRect, vb.uvRect, this._graphics.texture.width, this._graphics.texture.height);
            vb.addTriangles();
        }
        else if (this._scale9Grid) {
            this.sliceFill(vb);
        }
        else
            this._graphics.onPopulateMesh(vb);
    }

    private sliceFill(vb: VertexBuffer) {
        let texture: NTexture = this.texture;
        gridRect.copy(this._scale9Grid);
        contentRect.copy(vb.contentRect);
        contentRect.width *= this._textureScale.x;
        contentRect.height *= this._textureScale.y;
        let uvRect = vb.uvRect;

        let sourceW = texture.width;
        let sourceH = texture.height;
        let flip = this._graphics.flip;

        if (flip != FlipType.None) {
            if (flip == FlipType.Horizontal || flip == FlipType.Both) {
                gridRect.x = sourceW - gridRect.xMax;
                gridRect.xMax = gridRect.x + gridRect.width;
            }

            if (flip == FlipType.Vertical || flip == FlipType.Both) {
                gridRect.y = sourceH - gridRect.yMax;
                gridRect.yMax = gridRect.y + gridRect.height;
            }
        }

        let sx = uvRect.width / sourceW;
        let sy = uvRect.height / sourceH;
        let xMax = uvRect.xMax;
        let yMax = uvRect.yMax;
        let xMax2 = gridRect.xMax;
        let yMax2 = gridRect.yMax;

        gridTexX[0] = uvRect.x;
        gridTexX[1] = uvRect.x + gridRect.x * sx;
        gridTexX[2] = uvRect.x + xMax2 * sx;
        gridTexX[3] = xMax;
        gridTexY[0] = yMax;
        gridTexY[1] = yMax - gridRect.y * sy;
        gridTexY[2] = yMax - yMax2 * sy;
        gridTexY[3] = uvRect.y;

        if (contentRect.width >= (sourceW - gridRect.width)) {
            gridX[1] = gridRect.x;
            gridX[2] = contentRect.width - (sourceW - xMax2);
            gridX[3] = contentRect.width;
        }
        else {
            let tmp = gridRect.x / (sourceW - xMax2);
            tmp = contentRect.width * tmp / (1 + tmp);
            gridX[1] = tmp;
            gridX[2] = tmp;
            gridX[3] = contentRect.width;
        }

        if (contentRect.height >= (sourceH - gridRect.height)) {
            gridY[1] = gridRect.y;
            gridY[2] = contentRect.height - (sourceH - yMax2);
            gridY[3] = contentRect.height;
        }
        else {
            let tmp = gridRect.y / (sourceH - yMax2);
            tmp = contentRect.height * tmp / (1 + tmp);
            gridY[1] = tmp;
            gridY[2] = tmp;
            gridY[3] = contentRect.height;
        }

        if (this._tileGridIndice == 0) {
            for (let cy = 0; cy < 4; cy++) {
                for (let cx = 0; cx < 4; cx++)
                    vb.addVert(gridX[cx] / this._textureScale.x, gridY[cy] / this._textureScale.y, 0, gridTexX[cx], gridTexY[cy], vb.vertexColor);
            }
            vb.addTriangles(0, TRIANGLES_9_GRID);
        }
        else {
            let row: number, col: number;
            let part: number;

            for (let pi = 0; pi < 9; pi++) {
                col = pi % 3;
                row = pi / 3;
                part = gridTileIndice[pi];
                drawRect.setMinMax(gridX[col], gridY[row], gridX[col + 1], gridY[row + 1]);
                texRect.setMinMax(gridTexX[col], gridTexY[row + 1], gridTexX[col + 1], gridTexY[row]);

                if (part != -1 && (this._tileGridIndice & (1 << part)) != 0) {
                    this.tileFill(vb, drawRect, texRect,
                        (part == 0 || part == 1 || part == 4) ? gridRect.width : drawRect.width,
                        (part == 2 || part == 3 || part == 4) ? gridRect.height : drawRect.height);
                }
                else {
                    drawRect.x /= this._textureScale.x;
                    drawRect.y /= this._textureScale.y;
                    drawRect.width /= this._textureScale.x;
                    drawRect.height /= this._textureScale.y;

                    vb.addQuad(drawRect, texRect, vb.vertexColor);
                }
            }

            vb.addTriangles();
        }
    }

    private tileFill(vb: VertexBuffer, contentRect: Rect, uvRect: Rect, sourceW: number, sourceH: number) {
        let hc = Math.ceil(contentRect.width / sourceW);
        let vc = Math.ceil(contentRect.height / sourceH);
        let tailWidth = contentRect.width - (hc - 1) * sourceW;
        let tailHeight = contentRect.height - (vc - 1) * sourceH;
        let xMax = uvRect.xMax;
        let yMax = uvRect.yMax;

        for (let i = 0; i < hc; i++) {
            for (let j = 0; j < vc; j++) {
                texRect2.copy(uvRect);
                if (i == hc - 1)
                    texRect2.xMax = lerp(uvRect.x, xMax, tailWidth / sourceW);
                if (j == vc - 1)
                    texRect2.yMin = lerp(uvRect.y, yMax, 1 - tailHeight / sourceH);

                drawRect2.set(contentRect.x + i * sourceW, contentRect.y + j * sourceH,
                    i == (hc - 1) ? tailWidth : sourceW, j == (vc - 1) ? tailHeight : sourceH);

                drawRect2.x /= this._textureScale.x;
                drawRect2.y /= this._textureScale.y;
                drawRect2.width /= this._textureScale.x;
                drawRect2.height /= this._textureScale.y;

                vb.addQuad(drawRect2, texRect2, vb.vertexColor);
            }
        }
    }
}

const TRIANGLES_9_GRID: Array<number> = [
    4, 1, 0, 1, 4, 5,
    5, 2, 1, 2, 5, 6,
    6, 3, 2, 3, 6, 7,
    8, 5, 4, 5, 8, 9,
    9, 6, 5, 6, 9, 10,
    10, 7, 6, 7, 10, 11,
    12, 9, 8, 9, 12, 13,
    13, 10, 9, 10, 13, 14,
    14, 11, 10,
    11, 14, 15
];

const gridTileIndice: Array<number> = [-1, 0, -1, 2, 4, 3, -1, 1, -1];
var gridX: Array<number> = [0, 0, 0, 0];
var gridY: Array<number> = [0, 0, 0, 0];
var gridTexX: Array<number> = [0, 0, 0, 0];
var gridTexY: Array<number> = [0, 0, 0, 0];

var gridRect = new Rect();
var contentRect = new Rect();

var drawRect = new Rect();
var texRect = new Rect();

var drawRect2 = new Rect();
var texRect2 = new Rect();
