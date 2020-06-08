import * as THREE from "three";

export class Color4 extends THREE.Color {
    public a: number;

    public constructor(rgb?: number, a?: number) {
        super(rgb || 0);
        this.a = a != null ? a : 1;
    }
}