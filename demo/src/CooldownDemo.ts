import * as fgui from "../../build/FairyGUI"

export default class CooldownDemo {
    private _view: fgui.GComponent;
    private _btn0: fgui.GProgressBar;
    private _btn1: fgui.GProgressBar;

    public constructor() {
        fgui.UIPackage.loadPackage("assets/UI/Cooldown").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("Cooldown", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._btn0 = <fgui.GProgressBar>this._view.getChild("b0");
        this._btn1 = <fgui.GProgressBar>this._view.getChild("b1");
        this._btn0.getChild("icon").icon = "assets/Icons/k0.png";
        this._btn1.getChild("icon").icon = "assets/Icons/k1.png";

        fgui.GTween.to(0, 100, 5).setTarget(this._btn0, "value").setRepeat(-1);
        fgui.GTween.to(10, 0, 10).setTarget(this._btn1, "value").setRepeat(-1);
    }
}
