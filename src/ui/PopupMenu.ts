import { Event } from "../event/Event";
import { Controller } from "./Controller";
import { PopupDirection, RelationType } from "./FieldTypes";
import { GButton } from "./GButton";
import { GComponent } from "./GComponent";
import { GList } from "./GList";
import { GObject } from "./GObject";
import { GRoot } from "./GRoot";
import { UIConfig } from "./UIConfig";
import { UIPackage } from "./UIPackage";

export class PopupMenu {

    protected _contentPane: GComponent;
    protected _list: GList;

    constructor(resourceURL?: string) {
        if (!resourceURL) {
            resourceURL = UIConfig.popupMenu;
            if (!resourceURL)
                throw "UIConfig.popupMenu not defined";
        }
        this._contentPane = <GComponent>UIPackage.createObjectFromURL(resourceURL);
        this._contentPane.on("added_to_stage", this.__addedToStage, this);
        this._list = <GList>(this._contentPane.getChild("list"));
        this._list.removeChildrenToPool();
        this._list.addRelation(this._contentPane, RelationType.Width);
        this._list.removeRelation(this._contentPane, RelationType.Height);
        this._contentPane.addRelation(this._list, RelationType.Height);
        this._list.on("click_item", this.__clickItem, this);
    }

    public dispose(): void {
        this._contentPane.dispose();
    }

    public addItem(caption: string, handler?: Function): GButton {
        var item: GButton = <GButton>this._list.addItemFromPool();
        item.title = caption;
        item.data = handler;
        item.grayed = false;
        var c: Controller = item.getController("checked");
        if (c)
            c.selectedIndex = 0;
        return item;
    }

    public addItemAt(caption: string, index: number, handler?: Function): GButton {
        var item: GButton = <GButton>this._list.getFromPool();
        this._list.addChildAt(item, index);
        item.title = caption;
        item.data = handler;
        item.grayed = false;
        var c: Controller = item.getController("checked");
        if (c)
            c.selectedIndex = 0;
        return item;
    }

    public addSeperator(): void {
        if (UIConfig.popupMenu_seperator == null)
            throw "UIConfig.popupMenu_seperator not defined";
        this.list.addItemFromPool(UIConfig.popupMenu_seperator);
    }

    public getItemName(index: number): string {
        var item: GObject = this._list.getChildAt(index);
        return item.name;
    }

    public setItemText(name: string, caption: string): void {
        var item: GButton = <GButton>this._list.getChild(name);
        item.title = caption;
    }

    public setItemVisible(name: string, visible: boolean): void {
        var item: GButton = <GButton>this._list.getChild(name);
        if (item.visible != visible) {
            item.visible = visible;
            this._list.setBoundsChangedFlag();
        }
    }

    public setItemGrayed(name: string, grayed: boolean): void {
        var item: GButton = <GButton>this._list.getChild(name);
        item.grayed = grayed;
    }

    public setItemCheckable(name: string, checkable: boolean): void {
        var item: GButton = <GButton>this._list.getChild(name);
        var c: Controller = item.getController("checked");
        if (c) {
            if (checkable) {
                if (c.selectedIndex == 0)
                    c.selectedIndex = 1;
            }
            else
                c.selectedIndex = 0;
        }
    }

    public setItemChecked(name: string, checked: boolean): void {
        var item: GButton = <GButton>this._list.getChild(name);
        var c: Controller = item.getController("checked");
        if (c)
            c.selectedIndex = checked ? 2 : 1;
    }

    public isItemChecked(name: string): boolean {
        var item: GButton = <GButton>this._list.getChild(name);
        var c: Controller = item.getController("checked");
        if (c)
            return c.selectedIndex == 2;
        else
            return false;
    }

    public removeItem(name: string): boolean {
        var item: GButton = <GButton>this._list.getChild(name);
        if (item) {
            var index: number = this._list.getChildIndex(item);
            this._list.removeChildToPoolAt(index);
            return true;
        }
        else
            return false;
    }

    public clearItems(): void {
        this._list.removeChildrenToPool();
    }

    public get itemCount(): number {
        return this._list.numChildren;
    }

    public get contentPane(): GComponent {
        return this._contentPane;
    }

    public get list(): GList {
        return this._list;
    }

    public show(target?: GObject, dir?: PopupDirection): void {
        var r: GRoot = GRoot.findFor(target);
        r.showPopup(this.contentPane, (target instanceof GRoot) ? null : target, dir);
    }

    private __clickItem(evt: Event): void {
        let itemObject = evt.data;
        if (!(itemObject instanceof GButton))
            return;
        if (itemObject.grayed) {
            this._list.selectedIndex = -1;
            return;
        }
        var c: Controller = (<GComponent>itemObject).getController("checked");
        if (c && c.selectedIndex != 0) {
            if (c.selectedIndex == 1)
                c.selectedIndex = 2;
            else
                c.selectedIndex = 1;
        }
        var r: GRoot = <GRoot>(this._contentPane.parent);
        r.hidePopup(this.contentPane);
        if (itemObject.data) {
            (<Function>itemObject.data)();
        }
    }

    private __addedToStage(): void {
        this._list.selectedIndex = -1;
        this._list.resizeToFit(100000, 10);
    }

}
