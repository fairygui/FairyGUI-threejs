import * as fgui from "../../build/FairyGUI"

export default class HitTestDemo {
    private _view: fgui.GComponent;

    public constructor() {
        fgui.UIPackage.loadPackage("assets/UI/HitTest").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("HitTest", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
    }
}
