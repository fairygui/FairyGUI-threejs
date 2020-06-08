import { IMeshFactory } from "./MeshFactory";
import { VertexBuffer } from "./VertexBuffer";
import { FillMethod, FillOrigin } from "../../ui/FieldTypes";
import { Rect } from "../../utils/Rect";
import { Vector3 } from "three";
import { clamp01 } from "../../utils/ToolSet";

export class FillMesh implements IMeshFactory {
    public method: FillMethod;
    public origin: number;
    public amount: number;
    public clockwise: boolean;

    public constructor() {
        this.origin = 0;
        this.amount = 1;
        this.clockwise = true;
    }

    public onPopulateMesh(vb: VertexBuffer): void {
        let amount: number = clamp01(this.amount);
        switch (this.method) {
            case FillMethod.Horizontal:
                fillHorizontal(vb, vb.contentRect, this.origin, amount);
                break;

            case FillMethod.Vertical:
                fillVertical(vb, vb.contentRect, this.origin, amount);
                break;

            case FillMethod.Radial90:
                fillRadial90(vb, vb.contentRect, this.origin, amount, this.clockwise);
                break;

            case FillMethod.Radial180:
                fillRadial180(vb, vb.contentRect, this.origin, amount, this.clockwise);
                break;

            case FillMethod.Radial360:
                fillRadial360(vb, vb.contentRect, this.origin, amount, this.clockwise);
                break;
        }
    }
}

var s_vec3: Vector3 = new Vector3();
var s_rect: Rect = new Rect();

function fillHorizontal(vb: VertexBuffer, vertRect: Rect, origin: number, amount: number) {
    s_rect.copy(vertRect);
    vertRect = s_rect;
    let a = vertRect.width * amount;
    if (origin == FillOrigin.Right || origin == FillOrigin.Bottom)
        vertRect.x += (vertRect.width - a);
    vertRect.width = a;

    vb.addQuad(vertRect);
    vb.addTriangles();
}

function fillVertical(vb: VertexBuffer, vertRect: Rect, origin: number, amount: number) {
    s_rect.copy(vertRect);
    vertRect = s_rect;
    let a = vertRect.height * amount;
    if (origin == FillOrigin.Right || origin == FillOrigin.Bottom)
        vertRect.y += (vertRect.height - a);
    vertRect.height = a;

    vb.addQuad(vertRect);
    vb.addTriangles();
}

//4 vertex
function fillRadial90(vb: VertexBuffer, vertRect: Rect, origin: number, amount: number, clockwise: boolean) {
    let flipX = origin == FillOrigin.TopRight || origin == FillOrigin.BottomRight;
    let flipY = origin == FillOrigin.BottomLeft || origin == FillOrigin.BottomRight;
    if (flipX != flipY)
        clockwise = !clockwise;

    let ratio = clockwise ? amount : (1 - amount);
    let tan = Math.tan(Math.PI * 0.5 * ratio);
    let thresold = false;
    if (ratio != 1)
        thresold = (vertRect.height / vertRect.width - tan) > 0;
    if (!clockwise)
        thresold = !thresold;
    let x = vertRect.x + (ratio == 0 ? Number.POSITIVE_INFINITY : (vertRect.height / tan));
    let y = vertRect.y + (ratio == 1 ? Number.POSITIVE_INFINITY : (vertRect.width * tan));
    let x2 = x;
    let y2 = y;
    if (flipX)
        x2 = vertRect.width - x;
    if (flipY)
        y2 = vertRect.height - y;
    let xMin = flipX ? (vertRect.width - vertRect.x) : vertRect.xMin;
    let yMin = flipY ? (vertRect.height - vertRect.y) : vertRect.yMin;
    let xMax = flipX ? -vertRect.x : vertRect.xMax;
    let yMax = flipY ? -vertRect.y : vertRect.yMax;

    vb.addVert(xMin, yMin, 0);

    if (clockwise)
        vb.addVert(xMax, yMin, 0);

    if (y > vertRect.yMax) {
        if (thresold)
            vb.addVert(x2, yMax, 0);
        else
            vb.addVert(xMax, yMax, 0);
    }
    else
        vb.addVert(xMax, y2, 0);

    if (x > vertRect.xMax) {
        if (thresold)
            vb.addVert(xMax, y2, 0);
        else
            vb.addVert(xMax, yMax, 0);
    }
    else
        vb.addVert(x2, yMax, 0);

    if (!clockwise)
        vb.addVert(xMin, yMax, 0);

    if (flipX == flipY) {
        vb.addTriangle(0, 2, 1);
        vb.addTriangle(0, 3, 2);
    }
    else {
        vb.addTriangle(2, 0, 1);
        vb.addTriangle(3, 0, 2);
    }
}

//8 vertex
var s_rect_180: Rect = new Rect();
function fillRadial180(vb: VertexBuffer, vertRect: Rect, origin: number, amount: number, clockwise: boolean) {
    s_rect_180.copy(vertRect);
    vertRect = s_rect_180;
    switch (origin) {
        case FillOrigin.Top:
            if (amount <= 0.5) {
                vertRect.width /= 2;
                if (clockwise)
                    vertRect.x += vertRect.width;

                fillRadial90(vb, vertRect, clockwise ? FillOrigin.TopLeft : FillOrigin.TopRight, amount / 0.5, clockwise);
                let vec: Vector3 = vb.getPosition(-4, s_vec3);
                s_rect.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect);
                vb.addTriangles(-4);
            }
            else {
                vertRect.width /= 2;
                if (!clockwise)
                    vertRect.x += vertRect.width;

                fillRadial90(vb, vertRect, clockwise ? FillOrigin.TopRight : FillOrigin.TopLeft, (amount - 0.5) / 0.5, clockwise);

                if (clockwise)
                    vertRect.x += vertRect.width;
                else
                    vertRect.x -= vertRect.width;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;

        case FillOrigin.Bottom:
            if (amount <= 0.5) {
                vertRect.width /= 2;
                if (!clockwise)
                    vertRect.x += vertRect.width;

                fillRadial90(vb, vertRect, clockwise ? FillOrigin.BottomRight : FillOrigin.BottomLeft, amount / 0.5, clockwise);
                let vec: Vector3 = vb.getPosition(-4, s_vec3);
                s_rect.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect);
                vb.addTriangles(-4);
            }
            else {
                vertRect.width /= 2;
                if (clockwise)
                    vertRect.x += vertRect.width;

                fillRadial90(vb, vertRect, clockwise ? FillOrigin.BottomLeft : FillOrigin.BottomRight, (amount - 0.5) / 0.5, clockwise);

                if (clockwise)
                    vertRect.x -= vertRect.width;
                else
                    vertRect.x += vertRect.width;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;

        case FillOrigin.Left:
            if (amount <= 0.5) {
                vertRect.height /= 2;
                if (!clockwise)
                    vertRect.y += vertRect.height;

                fillRadial90(vb, vertRect, clockwise ? FillOrigin.BottomLeft : FillOrigin.TopLeft, amount / 0.5, clockwise);
                let vec: Vector3 = vb.getPosition(-4, s_vec3);
                s_rect.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect);
                vb.addTriangles(-4);
            }
            else {
                vertRect.height /= 2;
                if (clockwise)
                    vertRect.y += vertRect.height;

                fillRadial90(vb, vertRect, clockwise ? FillOrigin.TopLeft : FillOrigin.BottomLeft, (amount - 0.5) / 0.5, clockwise);

                if (clockwise)
                    vertRect.y -= vertRect.height;
                else
                    vertRect.y += vertRect.height;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;

        case FillOrigin.Right:
            if (amount <= 0.5) {
                vertRect.height /= 2;
                if (clockwise)
                    vertRect.y += vertRect.height;

                fillRadial90(vb, vertRect, clockwise ? FillOrigin.TopRight : FillOrigin.BottomRight, amount / 0.5, clockwise);
                let vec: Vector3 = vb.getPosition(-4, s_vec3);
                s_rect.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect);
                vb.addTriangles(-4);
            }
            else {
                vertRect.height /= 2;
                if (!clockwise)
                    vertRect.y += vertRect.height;

                fillRadial90(vb, vertRect, clockwise ? FillOrigin.BottomRight : FillOrigin.TopRight, (amount - 0.5) / 0.5, clockwise);

                if (clockwise)
                    vertRect.y += vertRect.height;
                else
                    vertRect.y -= vertRect.height;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
    }
}

//12 vertex
var s_rect_360: Rect = new Rect();
function fillRadial360(vb: VertexBuffer, vertRect: Rect, origin: number, amount: number, clockwise: boolean) {
    s_rect_360.copy(vertRect);
    vertRect = s_rect_360;
    switch (origin) {
        case FillOrigin.Top:
            if (amount < 0.5) {
                vertRect.width /= 2;
                if (clockwise)
                    vertRect.x += vertRect.width;

                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Left : FillOrigin.Right, amount / 0.5, clockwise);
                let vec: Vector3 = vb.getPosition(-8, s_vec3);
                s_rect.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect);
                vb.addTriangles(-4);
            }
            else {
                vertRect.width /= 2;
                if (!clockwise)
                    vertRect.x += vertRect.width;

                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Right : FillOrigin.Left, (amount - 0.5) / 0.5, clockwise);

                if (clockwise)
                    vertRect.x += vertRect.width;
                else
                    vertRect.x -= vertRect.width;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }

            break;

        case FillOrigin.Bottom:
            if (amount < 0.5) {
                vertRect.width /= 2;
                if (!clockwise)
                    vertRect.x += vertRect.width;

                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Right : FillOrigin.Left, amount / 0.5, clockwise);
                let vec: Vector3 = vb.getPosition(-8, s_vec3);
                s_rect.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect);
                vb.addTriangles(-4);
            }
            else {
                vertRect.width /= 2;
                if (clockwise)
                    vertRect.x += vertRect.width;

                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Left : FillOrigin.Right, (amount - 0.5) / 0.5, clockwise);

                if (clockwise)
                    vertRect.x -= vertRect.width;
                else
                    vertRect.x += vertRect.width;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;

        case FillOrigin.Left:
            if (amount < 0.5) {
                vertRect.height /= 2;
                if (!clockwise)
                    vertRect.y += vertRect.height;

                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Bottom : FillOrigin.Top, amount / 0.5, clockwise);
                let vec: Vector3 = vb.getPosition(-8, s_vec3);
                s_rect.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect);
                vb.addTriangles(-4);
            }
            else {
                vertRect.height /= 2;
                if (clockwise)
                    vertRect.y += vertRect.height;

                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Top : FillOrigin.Bottom, (amount - 0.5) / 0.5, clockwise);

                if (clockwise)
                    vertRect.y -= vertRect.height;
                else
                    vertRect.y += vertRect.height;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;

        case FillOrigin.Right:
            if (amount < 0.5) {
                vertRect.height /= 2;
                if (clockwise)
                    vertRect.y += vertRect.height;

                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Top : FillOrigin.Bottom, amount / 0.5, clockwise);
                let vec: Vector3 = vb.getPosition(-8, s_vec3);
                s_rect.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect);
                vb.addTriangles(-4);
            }
            else {
                vertRect.height /= 2;
                if (!clockwise)
                    vertRect.y += vertRect.height;

                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Bottom : FillOrigin.Top, (amount - 0.5) / 0.5, clockwise);

                if (clockwise)
                    vertRect.y += vertRect.height;
                else
                    vertRect.y -= vertRect.height;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
    }
}