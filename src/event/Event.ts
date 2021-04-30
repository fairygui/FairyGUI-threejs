import { Pool } from "../utils/Pool";
import { DisplayObject } from "../core/DisplayObject";
import { EventDispatcher } from "./EventDispatcher";

export type EventType = "touch_begin" | "touch_end" | "touch_move" | "click" | "right_click" | "roll_over" | "roll_out" | "mouse_wheel"
    | "content_scale_factor_changed"
    | "added_to_stage" | "removed_from_stage"
    | "pos_changed" | "size_changed"
    | "status_changed"
    | "focus_in" | "focus_out"
    | "drag_start" | "drag_move" | "drag_end" | "drop"
    | "scroll" | "scroll_end" | "pull_down_release" | "pull_up_release"
    | "click_item" | "click_link"
    | "play_end" | "gear_stop";

export interface InputInfo {
    x: number;
    y: number;
    mouseWheelDelta: number;
    touchId: number;
    button: number;
    clickCount: number;
    holdTime: number;
    shiftKey?: boolean;
    ctrlKey?: boolean;
    commandKey?: boolean;

    isDblClick: boolean;
    isRightButton: boolean;
}

export var lastInput: InputInfo = {
    x: 0,
    y: 0,
    mouseWheelDelta: 0,
    touchId: 0,
    button: 0,
    clickCount: 0,
    holdTime: 0,

    get isDblClick() {
        return this.clickCount == 2;
    },

    get isRightButton() {
        return this.button == 2;
    }
}

export class Event {
    public data: any = null;

    public _defaultPrevented: boolean;
    public _stopsPropagation: boolean;
    public _touchCapture: boolean;
    public _callChain: Array<EventDispatcher> = [];

    public _type: string;
    public _sender: EventDispatcher;
    public _initiator: DisplayObject;

    public constructor() {
    }

    public get type(): string {
        return this._type;
    }

    public get sender(): EventDispatcher {
        return this._sender;
    }

    public get initiator(): DisplayObject {
        return this._initiator;
    }

    public get input(): InputInfo {
        return lastInput;
    }

    public stopPropagation() {
        this._stopsPropagation = true;
    }

    public preventDefault() {
        this._defaultPrevented = true;
    }

    public captureTouch() {
        this._touchCapture = true;
    }

    public get isDefaultPrevented(): boolean {
        return this._defaultPrevented;
    }
}

export var EventPool: Pool<Event> = new Pool<Event>(Event,
    obj => {
        obj._stopsPropagation = false;
        obj._defaultPrevented = false;
        obj._touchCapture = false;
    },
    obj => {
        obj.data = null;
        obj._initiator = null;
        obj._sender = null;
    });