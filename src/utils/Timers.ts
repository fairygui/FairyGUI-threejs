import { Pool } from "./Pool";

export class Timers {
    public static deltaTime: number = 0;
    public static time: number = 0;
    public static frameCount: number = 0;

    public static add(delayInMiniseconds: number, repeat: number, callback: Function, target?: any, callbackParam?: any): void {
        let item: TimerItem;
        let index = _items.findIndex(e => e.target == target && e.callback == callback);
        if (index != -1)
            item = _items[index];
        else {
            item = _pool.borrow();
            item.callback = callback;
            item.target = target;
            _items.push(item);
        }
        item.delay = delayInMiniseconds;
        item.counter = 0;
        item.repeat = repeat;
        item.param = callbackParam;
        item.end = false;
    }

    public static callLater(callback: Function, target?: any, callbackParam?: any): void {
        this.add(0, 1, callback, target, callbackParam);
    }

    public static callDelay(delay: number, callback: Function, target?: any, callbackParam?: any): void {
        this.add(delay, 1, callback, target, callbackParam);
    }

    public static addUpdate(callback: Function, target?: any, callbackParam?: any): void {
        this.add(0, 0, callback, target, callbackParam);
    }

    public static exists(callback: Function, target?: any): boolean {
        return _items.findIndex(e => e.target == target && e.callback == callback) != -1;
    }

    public static remove(callback: Function, target?: any): void {
        let index = _items.findIndex(e => e.target == target && e.callback == callback);
        if (index != -1) {
            let item = _items[index];
            _items.splice(index, 1);
            if (index < _enumI)
                _enumI--;
            _enumCount--;

            _pool.returns(item);
        }
    }
}


class TimerItem {
    public delay: number = 0;
    public counter: number = 0;
    public repeat: number = 0;
    public callback: Function;
    public target: any;
    public param: any;
    public end: boolean;

    public constructor() {
    }

    public advance(elapsed: number): boolean {
        this.counter += elapsed;
        if (this.counter >= this.delay) {
            this.counter -= this.delay;
            if (this.counter > this.delay)
                this.counter = this.delay;

            if (this.repeat > 0) {
                this.repeat--;
                if (this.repeat == 0)
                    this.end = true;
            }

            return true;
        }
        else
            return false;
    }

    public reset(): void {
        this.callback = null;
        this.target = null;
        this.param = null;
    }
}

var _items: Array<TimerItem> = new Array<TimerItem>();
var _pool: Pool<TimerItem> = new Pool<TimerItem>(TimerItem, e => e.reset());

var _enumI: number = 0;
var _enumCount: number = 0;
var _lastTime: number = 0;

requestAnimationFrame(__timer);

function __timer(timeStamp: number): boolean {
    requestAnimationFrame(__timer);

    Timers.frameCount++;
    Timers.time = timeStamp;
    let deltaTime = timeStamp - _lastTime;
    Timers.deltaTime = deltaTime;
    _lastTime = timeStamp;

    _enumI = 0;
    _enumCount = _items.length;

    while (_enumI < _enumCount) {
        var item: TimerItem = _items[_enumI];
        _enumI++;

        if (item.advance(deltaTime)) {
            if (item.end) {
                _enumI--;
                _enumCount--;
                _items.splice(_enumI, 1);
            }

            item.callback.call(item.target, item.param);

            if (item.end)
                _pool.returns(item);
        }
    }

    return false;
}