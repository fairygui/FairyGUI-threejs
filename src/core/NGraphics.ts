import { BufferAttribute, BufferGeometry, Object3D, TrianglesDrawMode } from "three";
import { FlipType } from "../ui/FieldTypes";
import { Rect } from "../utils/Rect";
import { IMeshFactory } from "./mesh/MeshFactory";
import { VertexBuffer } from "./mesh/VertexBuffer";
import { NMaterial } from "./NMaterial";
import { NTexture } from "./NTexture";
import { Color4 } from "../utils/Color";

export class NGraphics implements IMeshFactory {
    private _texture: NTexture;
    private _geometry: BufferGeometry;
    private _material: NMaterial;
    private _meshFactory: IMeshFactory;
    private _color: number;
    private _meshDirty: boolean;
    private _contentRect: Rect;
    private _flip: FlipType = 0;

    public constructor(owner: Object3D) {
        this._color = 0xFFFFFF;
        this._contentRect = new Rect();
        this._material = new NMaterial();
        this._geometry = new BufferGeometry();

        let o = <any>owner;
        o.geometry = this._geometry;
        o.material = this._material;
        o.isMesh = true;
        o.drawMode = TrianglesDrawMode;
        delete o.isGroup;
    }

    public get texture(): NTexture {
        return this._texture;
    }

    public set texture(value: NTexture) {
        if (this._texture != value) {
            this._texture = value;
            this._meshDirty = true;
        }

        if (this._texture)
            this._material.map = this._texture.nativeTexture;
        else
            this._material.map = null;
    }

    public get material(): NMaterial {
        return this._material;
    }
    public set material(value: NMaterial) {
        this._material = value;
    }

    public get meshFactory(): IMeshFactory {
        return this._meshFactory;
    }

    public set meshFactory(value: IMeshFactory) {
        if (this._meshFactory != value) {
            this._meshFactory = value;
            this._meshDirty = true;
        }
    }

    public getMeshFactory<T extends IMeshFactory>(type: new () => T): T {
        if (!(this._meshFactory instanceof type)) {
            this._meshFactory = new type();
            this._meshDirty = true;
        }
        return <T>this._meshFactory;
    }

    public setDrawRect(rect: Rect): void {
        this._contentRect.copy(rect);
        this._meshDirty = true;
    }

    public get flip(): FlipType {
        return this._flip;
    }

    public set flip(value: FlipType) {
        if (this._flip != value) {
            this._flip = value;
            this._meshDirty = true;
        }
    }

    public get color(): number {
        return this._color;
    }

    public set color(value: number) {
        if (this._color != value) {
            this._color = value;
            if (!this._meshDirty) {
                s_col.setHex(value);
                let attr: BufferAttribute = <BufferAttribute>this._geometry.attributes["color"];
                if (attr) {
                    let arr: Float32Array = <Float32Array>attr.array;
                    let len = arr.length;
                    for (let i = 0; i < len; i += 4) {
                        arr[i] = s_col.r;
                        arr[i + 1] = s_col.g;
                        arr[i + 2] = s_col.b;
                        arr[i + 3] = s_col.a;
                    }
                    attr.needsUpdate = true;
                }
            }
        }
    }

    public get grayed(): boolean {
        return this._material.defines.GRAYED;
    }

    public set grayed(value: boolean) {
        this.setKeyword("GRAYED", value);
    }

    public setKeyword(key: string, value: Boolean): void {
        if (value) {
            this._material.defines[key] = value;
            this._material.needsUpdate = true;
        }
        else
            delete this._material.defines[key];
    }

    public setMeshDirty(): void {
        this._meshDirty = true;
    }

    public updateMesh(): boolean {
        if (this._meshDirty) {
            this.updateMeshNow();
            return true;
        }
        else
            return false;
    }

    public update(clipPlanes: any, alpha: number): void {
        if (this._meshDirty)
            this.updateMeshNow();

        this._material.clippingPlanes = clipPlanes;
        this._material.clipping = clipPlanes != null;
        this._material.opacity = alpha;
    }

    public updateMeshNow(): void {
        this._meshDirty = false;

        if (!this._texture || !this._meshFactory) {
            if (this._geometry.drawRange.count > 0) {
                this._geometry.setDrawRange(0, 0);
                this._geometry.computeBoundingSphere();
            }
            return;
        }

        let vb: VertexBuffer = VertexBuffer.begin();
        vb.contentRect.copy(this._contentRect);
        vb.uvRect.copy(this._texture.uvRect);
        if (this._texture)
            vb.textureSize.set(this._texture.width, this._texture.height);
        else
            vb.textureSize.set(0, 0);
        if (this._flip != FlipType.None) {
            if (this._flip == FlipType.Horizontal || this._flip == FlipType.Both) {
                let tmp = vb.uvRect.xMin;
                vb.uvRect.xMin = vb.uvRect.xMax;
                vb.uvRect.xMax = tmp;
            }
            if (this._flip == FlipType.Vertical || this._flip == FlipType.Both) {
                let tmp = vb.uvRect.yMin;
                vb.uvRect.yMin = vb.uvRect.yMax;
                vb.uvRect.yMax = tmp;
            }
        }
        vb.vertexColor.setHex(this._color);
        this._meshFactory.onPopulateMesh(vb);

        let vertCount: number = vb.currentVertCount;
        if (vertCount == 0) {
            if (this._geometry.drawRange.count > 0) {
                this._geometry.setDrawRange(0, 0);
                this._geometry.computeBoundingSphere();
            }
            vb.end();
            return;
        }

        if (this._texture.rotated) {
            let xMin = this._texture.uvRect.x;
            let yMin = this._texture.uvRect.y;
            let yMax = this._texture.uvRect.yMax;
            let k: number = 0;
            for (let i: number = 0; i < vertCount; i++) {
                let v1: number = vb.uvs[k];
                let v2: number = vb.uvs[k + 1];
                vb.uvs[k + 1] = yMin + v1 - xMin;
                vb.uvs[k] = xMin + yMax - v2;
            }
        }

        let gm = this._geometry;
        this.writeAttribute(gm, "position", vb.vertices, 3);
        this.writeAttribute(gm, "uv", vb.uvs, 2);
        this.writeAttribute(gm, "color", vb.colors, 4);
        this.writeIndexAttribute(gm, vb.triangles);
        gm.setDrawRange(0, vb.triangles.length);
        gm.computeBoundingSphere();

        vb.end();
    }

    private writeAttribute(gm: BufferGeometry, name: string, arr: Array<number>, itemSize: number): void {
        let attr: BufferAttribute = <BufferAttribute>gm.attributes[name];
        if (!attr || !attr.isBufferAttribute || attr.array.length < arr.length) {
            attr = new BufferAttribute(new Float32Array(arr.length), itemSize);
            gm.setAttribute(name, attr);
        }

        attr.copyArray(arr);
        attr.needsUpdate = true;
    }

    private writeIndexAttribute(gm: BufferGeometry, arr: Array<number>): void {
        let attr: BufferAttribute = <BufferAttribute>gm.index;
        if (!attr || !attr.isBufferAttribute || attr.array.length < arr.length) {
            attr = new BufferAttribute(new Uint16Array(arr.length), 1);
            gm.index = attr;
        }

        attr.copyArray(arr);
        attr.needsUpdate = true;
    }

    public onPopulateMesh(vb: VertexBuffer) {
        this._texture.getDrawRect(vb.contentRect);

        vb.addQuad(vb.contentRect, vb.uvRect, vb.vertexColor);
        vb.addTriangles();
    }
}

var s_col: Color4 = new Color4();