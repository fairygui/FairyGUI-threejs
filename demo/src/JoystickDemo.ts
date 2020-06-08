import JoystickModule, { JoystickMoving, JoystickUp } from "./JoystickModule"
import * as fgui from "../../build/FairyGUI"

export default class JoystickDemo {
    private _view: fgui.GComponent;
    private _joystick: JoystickModule;
    private _text: fgui.GTextField;

    public constructor() {
        fgui.UIPackage.loadPackage("assets/UI/Joystick").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("Joystick", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._text = <fgui.GTextField>this._view.getChild("n9");

        this._joystick = new JoystickModule(this._view);
        this._joystick.on(JoystickMoving, this.onJoystickMoving, this);
        this._joystick.on(JoystickUp, this.onJoystickUp, this);
    }

    private onJoystickMoving(evt: fgui.Event): void {
        this._text.text = "" + evt.data;
    }

    private onJoystickUp(): void {
        this._text.text = "";
    }
}