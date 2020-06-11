namespace fgui {
    export interface IMeshFactory {
        onPopulateMesh(vb: VertexBuffer): void;
    }
}