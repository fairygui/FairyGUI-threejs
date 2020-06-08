import * as fgui from "../../build/FairyGUI"

export default class TransitionDemo {
    private _view: fgui.GComponent;

    private _btnGroup: fgui.GGroup;
    private _g1: fgui.GComponent;
    private _g2: fgui.GComponent;
    private _g3: fgui.GComponent;
    private _g4: fgui.GComponent;
    private _g5: fgui.GComponent;
    private _g6: fgui.GComponent;

    private _startValue: number;
    private _endValue: number;

    public constructor() {
        fgui.UIPackage.loadPackage("assets/UI/Transition").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("Transition", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._btnGroup = <fgui.GGroup>this._view.getChild("g0");

        this._g1 = fgui.UIPackage.createObject("Transition", "BOSS").asCom;
        this._g2 = fgui.UIPackage.createObject("Transition", "BOSS_SKILL").asCom;
        this._g3 = fgui.UIPackage.createObject("Transition", "TRAP").asCom;
        this._g4 = fgui.UIPackage.createObject("Transition", "GoodHit").asCom;
        this._g5 = fgui.UIPackage.createObject("Transition", "PowerUp").asCom;
        this._g6 = fgui.UIPackage.createObject("Transition", "PathDemo").asCom;

        this._g5.getTransition("t0").setHook("play_num_now", this.__playNum.bind(this));

        this._view.getChild("btn0").onClick(() => { this.__play(this._g1); }, this);
        this._view.getChild("btn1").onClick(() => { this.__play(this._g2); }, this);
        this._view.getChild("btn2").onClick(() => { this.__play(this._g3); }, this);
        this._view.getChild("btn3").onClick(this.__play4, this);
        this._view.getChild("btn4").onClick(this.__play5, this);
        this._view.getChild("btn5").onClick(() => { this.__play(this._g6); }, this);
    }

    private __play(target: fgui.GComponent): void {
        this._btnGroup.visible = false;
        fgui.GRoot.inst.addChild(target);
        var t: fgui.Transition = target.getTransition("t0");
        t.play(() => {
            this._btnGroup.visible = true;
            fgui.GRoot.inst.removeChild(target);
        });
    }

    private __play4(): void {
        this._btnGroup.visible = false;
        this._g4.x = fgui.GRoot.inst.width - this._g4.width - 20;
        this._g4.y = 100;
        fgui.GRoot.inst.addChild(this._g4);
        var t: fgui.Transition = this._g4.getTransition("t0");
        t.play(() => {
            this._btnGroup.visible = true;
            fgui.GRoot.inst.removeChild(this._g4);
        }, 3);
    }

    private __play5(): void {
        this._btnGroup.visible = false;
        this._g5.x = 20;
        this._g5.y = fgui.GRoot.inst.height - this._g5.height - 100;
        fgui.GRoot.inst.addChild(this._g5);
        var t: fgui.Transition = this._g5.getTransition("t0");
        this._startValue = 10000;
        var add: number = Math.ceil(Math.random() * 2000 + 1000);
        this._endValue = this._startValue + add;
        this._g5.getChild("value").text = "" + this._startValue;
        this._g5.getChild("add_value").text = "+" + add;
        t.play(() => {
            this._btnGroup.visible = true;
            fgui.GRoot.inst.removeChild(this._g5);
        });
    }

    private __playNum(): void {
        fgui.GTween.to(this._startValue, this._endValue, 0.3)
            .setEase(fgui.EaseType.Linear)
            .onUpdate(function (tweener): void {
                this._g5.getChild("value").text = "" + Math.floor(tweener.value.x);
            }, this);
    }
}

