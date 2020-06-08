import * as fgui from "../../build/FairyGUI"

export default class BagDemo {
    private _view: fgui.GComponent;
    private _bagWindow: fgui.Window;

    public constructor() {
        fgui.UIPackage.loadPackage("assets/UI/Bag").then(this.onUILoaded.bind(this));
    }

    private onUILoaded() {
        this._view = fgui.UIPackage.createObject("Bag", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._bagWindow = new BagWindow();
        this._view.getChild("bagBtn").onClick(() => { this._bagWindow.show(); }, this);
    }

    public dispose() {
        fgui.UIPackage.removePackage("Bag");
    }
}

class BagWindow extends fgui.Window {
    public constructor() {
        super();
    }

    protected onInit(): void {
        this.contentPane = fgui.UIPackage.createObject("Bag", "BagWin").asCom;
        this.center();
    }

    protected onShown(): void {
        var list: fgui.GList = <fgui.GList>this.contentPane.getChild("list");
        list.on("click_item", this.onClickItem, this);
        list.itemRenderer = this.renderListItem.bind(this);
        list.setVirtual();
        list.numItems = 45;
    }

    private renderListItem(index: number, obj: fgui.GObject): void {
        obj.icon = "assets/Icons/i" + Math.floor(Math.random() * 10) + ".png";
        obj.text = "" + Math.floor(Math.random() * 100);
    }

    private onClickItem(evt: fgui.Event): void {
        let item = evt.data;
        this.contentPane.getChild("n11").icon = item.icon;
        this.contentPane.getChild("n13").text = item.icon;
    }
}