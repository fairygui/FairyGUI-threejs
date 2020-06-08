import { Vector2 } from "three";

export class Rect {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public constructor(x?: number, y?: number, width?: number, height?: number) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    }

    public set(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public setMinMax(xMin: number, yMin: number, xMax: number, yMax: number) {
        this.x = xMin;
        this.y = yMin;
        this.width = xMax - xMin;
        this.height = yMax - yMin;
    }

    public get position(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    public get size(): Vector2 {
        return new Vector2(this.width, this.height);
    }

    public get xMin(): number {
        return this.x;
    }

    public set xMin(value: number) {
        let d = value - this.x;
        this.x = value;
        this.width -= d;
    }

    public get xMax(): number {
        return this.x + this.width;
    }

    public set xMax(value: number) {
        this.width = value - this.x;
    }

    public get yMin(): number {
        return this.y;
    }

    public set yMin(value: number) {
        let d = value - this.y;
        this.y = value;
        this.height -= d;
    }

    public get yMax(): number {
        return this.y + this.height;
    }

    public set yMax(value: number) {
        this.height = value - this.y;
    }

    public intersection(another: Rect): Rect {
        if (this.width == 0 || this.height == 0 || another.width == 0 || another.height == 0)
            return new Rect(0, 0, 0, 0);

        let left = this.x > another.x ? this.x : another.x;
        let right = this.xMax < another.xMax ? this.xMax : another.xMax;
        let top = this.y > another.y ? this.y : another.y;
        let bottom = this.yMax < another.yMax ? this.yMax : another.yMax;

        if (left > right || top > bottom)
            this.set(0, 0, 0, 0);
        else
            this.setMinMax(left, top, right, bottom);

        return this;
    }

    public union(another: Rect): Rect {
        if (another.width == 0 || another.height == 0)
            return this;

        if (this.width == 0 || this.height == 0) {
            this.copy(another);
            return this;
        }

        let x = Math.min(this.x, another.x);
        let y = Math.min(this.y, another.y);
        this.setMinMax(x, y, Math.max(this.xMax, another.xMax), Math.max(this.yMax, another.yMax));

        return this;
    }

    public extend(x: number, y: number): void {
        this.x -= x;
        this.y -= y;
        this.width += x * 2;
        this.height += y * 2;
    }

    public contains(x: number | Vector2, y?: number): boolean {
        if (x instanceof Vector2) {
            y = x.y;
            x = x.x;
        }
        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
    }

    public copy(source: Rect): void {
        this.set(source.x, source.y, source.width, source.height);
    }

    public clone(): Rect {
        return new Rect(this.x, this.y, this.width, this.height);
    }
}
