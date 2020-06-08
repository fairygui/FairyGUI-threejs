import ScrollPaneHeader from "./ScrollPaneHeader"
import * as fgui from "../../build/FairyGUI"

export default class PullToRefreshDemo {
    private _view: fgui.GComponent;
    private _list1: fgui.GList;
    private _list2: fgui.GList;

    public constructor() {
        fgui.UIObjectFactory.setExtension("ui://PullToRefresh/Header", ScrollPaneHeader);

        fgui.UIPackage.loadPackage("assets/UI/PullToRefresh").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("PullToRefresh", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._list1 = <fgui.GList>this._view.getChild("list1");
        this._list1.itemRenderer = this.renderListItem1.bind(this);
        this._list1.setVirtual();
        this._list1.numItems = 1;
        this._list1.on("pull_down_release", this.onPullDownToRefresh, this);

        this._list2 = <fgui.GList>this._view.getChild("list2");
        this._list2.itemRenderer = this.renderListItem2.bind(this);
        this._list2.setVirtual();
        this._list2.numItems = 1;
        this._list2.on("pull_up_release", this.onPullUpToRefresh, this);
    }

    private renderListItem1(index: number, item: fgui.GObject): void {
        item.text = "Item " + (this._list1.numItems - index - 1);
    }

    private renderListItem2(index: number, item: fgui.GObject): void {
        item.text = "Item " + index;
    }

    private onPullDownToRefresh(): void {
        let header: ScrollPaneHeader = <ScrollPaneHeader>(this._list1.scrollPane.header);
        if (header.readyToRefresh) {
            header.setRefreshStatus(2);
            this._list1.scrollPane.lockHeader(header.sourceHeight);

            //Simulate a async resquest
            fgui.Timers.add(2000, 1, () => { this.simulateAsynWorkFinished(); });
        }
    }

    private onPullUpToRefresh(): void {
        let footer: fgui.GComponent = this._list2.scrollPane.footer.asCom;

        footer.getController("c1").selectedIndex = 1;
        this._list2.scrollPane.lockFooter(footer.sourceHeight);

        //Simulate a async resquest
        fgui.Timers.add(2000, 1, () => { this.simulateAsynWorkFinished2(); });
    }

    private simulateAsynWorkFinished() {
        this._list1.numItems += 5;

        //Refresh completed
        let header: ScrollPaneHeader = <ScrollPaneHeader>(this._list1.scrollPane.header);
        header.setRefreshStatus(3);
        this._list1.scrollPane.lockHeader(35);

        fgui.Timers.add(2000, 1, () => { this.simulateHintFinished(); });
    }

    private simulateHintFinished() {
        if (this._view.isDisposed)
            return;
        let header: ScrollPaneHeader = <ScrollPaneHeader>(this._list1.scrollPane.header);
        header.setRefreshStatus(0);
        this._list1.scrollPane.lockHeader(0);
    }

    private simulateAsynWorkFinished2() {
        if (this._view.isDisposed)
            return;
        this._list2.numItems += 5;

        //Refresh completed
        let footer: fgui.GComponent = this._list2.scrollPane.footer.asCom;
        footer.getController("c1").selectedIndex = 0;
        this._list2.scrollPane.lockFooter(0);
    }
}

