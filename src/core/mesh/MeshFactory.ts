import { VertexBuffer } from "./VertexBuffer";

export interface IMeshFactory {
    onPopulateMesh(vb: VertexBuffer): void;
}