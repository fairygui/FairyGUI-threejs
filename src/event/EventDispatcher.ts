import { Event, EventPool, EventType } from "./Event";

type Listeners = { dispatching?: number, callbacks: Array<any>, captures: Array<any> };

export class EventDispatcher {
    public _listeners: { [index: string]: Listeners };

    constructor() {
        this._listeners = {};
    }

    public on(type: EventType, callback: Function, target?: any, capture?: boolean): void;
    public on(type: string, callback: Function, target?: any, capture?: boolean): void;
    public on(type: EventType | string, callback: Function, target?: any, capture?: boolean): void {
        let col = this._listeners[type];
        if (!col) {
            col = { dispatching: 0, callbacks: [], captures: [] };
            this._listeners[type] = col;
        }
        let arr = capture ? col.captures : col.callbacks;
        let index = arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target);
        if (index != -1)
            arr[index + 2] = false;
        else
            arr.push(callback, target, false);
    }

    public off(type: EventType, callback: Function, target?: any, capture?: boolean): void;
    public off(type: string, callback: Function, target?: any, capture?: boolean): void;
    public off(type: EventType | string, callback: Function, target?: any, capture?: boolean): void {
        let col = this._listeners[type];
        if (!col)
            return;

        let arr = capture ? col.captures : col.callbacks;
        let index = arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target);
        if (index != -1) {
            if (col.dispatching != 0) {
                arr[index + 2] = true;
                col.dispatching = 2;
            }
            else
                arr.splice(index, 3);
        }
    }

    public offAll(type?: EventType): void;
    public offAll(type?: string): void;
    public offAll(type?: EventType | string): void {
        if (type) {
            let col = this._listeners[type];
            if (col) {
                if (col.dispatching != 0) {
                    col.callbacks.forEach((value, index, arr) => { if (index % 3 == 2) arr[index] = true; });
                    col.captures.forEach((value, index, arr) => { if (index % 3 == 2) arr[index] = true; });
                    col.dispatching = 2;
                }
                else {
                    col.callbacks.length = 0;
                    col.captures.length = 0;
                }
            }
        }
        else {
            for (var key in this._listeners) {
                delete this._listeners[key];
            }
        }
    }

    public hasListener(type: EventType, callback?: Function, target?: any, capture?: boolean): boolean;
    public hasListener(type: string, callback?: Function, target?: any, capture?: boolean): boolean;
    public hasListener(type: EventType | string, callback?: Function, target?: any, capture?: boolean): boolean {
        let col = this._listeners[type];
        if (!col)
            return false;

        let arr = capture ? col.captures : col.callbacks;
        if (!callback)
            return arr.length > 0;
        else
            arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target) != -1;
    }

    public dispatchEvent(type: EventType, data?: any): boolean;
    public dispatchEvent(type: string, data?: any): boolean;
    public dispatchEvent(type: EventType | string, data?: any): boolean {
        let col = this._listeners[type];
        if (!col || col.callbacks.length == 0 && col.captures.length == 0)
            return;

        let ev = EventPool.borrow(type);
        ev._type = type;
        ev.data = data;

        this._dispatch(col, ev, true);
        this._dispatch(col, ev, false);

        EventPool.returns(ev);

        return ev._defaultPrevented;
    }

    public _dispatch(col: Listeners, ev: Event, capture?: boolean): void {
        if (col.dispatching != 0)
            return;

        col.dispatching = 1;
        ev._sender = this;
        let arr = capture ? col.captures : col.callbacks;

        let cnt = arr.length;
        for (let i = 0; i < cnt; i += 3) {
            (<Function>arr[i]).call(arr[i + 1], ev);
        }

        if (col.dispatching == 2) {
            let cnt = arr.length;
            let i = 0;
            while (i < cnt) {
                if (arr[i + 2]) {
                    arr.splice(i, 3);
                    cnt -= 3;
                    continue;
                }
                else
                    i += 3;
            }
        }
        col.dispatching = 0;
    }
}
