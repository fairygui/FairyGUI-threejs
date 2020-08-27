import { OrthographicCamera, Scene, Vector2, Renderer, AudioListener, Object3D, Camera, PerspectiveCamera, Vector3, WebGLRenderer, Matrix4, Matrix } from "three";
import { Timers } from "../utils/Timers";
import { DisplayObject, traverseUpdate, traverseHitTest } from "./DisplayObject";
import { EventPool, lastInput } from "../event/Event";
import { EventDispatcher } from "../event/EventDispatcher";

type ScreenMode = "none" | "horizontal" | "vertical";

export var UILayer: number = 1;

export interface StageInitParameters {
    screenMode?: ScreenMode;
    defaultLayer?: number;
}

export class Stage {
    public static fontRebuilt?: boolean;
    public static audioListener?: AudioListener;
    public static disableMatrixValidation: boolean;
    public static readonly eventDispatcher = new EventDispatcher();

    public static init(renderer: Renderer, parameters?: StageInitParameters) {
        init(renderer, parameters);
    }

    public static set scene(value: Scene) {
        _scene = value;
    }

    public static get scene(): Scene {
        return _scene;
    }

    public static get domElement(): HTMLCanvasElement {
        return _canvas;
    }

    public static get devicePixelRatio(): number {
        return _devicePixelRatio;
    }

    public static get touchScreen(): boolean {
        return _touchscreen;
    }

    public static get camera(): Camera {
        return _camera;
    }

    public static set camera(value: Camera) {
        _camera = value;
    }

    public static get width(): number {
        return _width;
    }

    public static get height(): number {
        return _height;
    }

    public static get touchPos(): Vector2 {
        return _touchPos;
    }

    public static get canvasTransform(): Matrix4 {
        return _canvasTransform;
    }

    public static get touchTarget(): DisplayObject {
        return _touchTarget;
    }

    public static get touchCount(): number {
        return _touchCount;
    }

    public static getTouchPos(touchId?: number, ret?: Vector2): Vector2 {
        if (!ret)
            ret = new Vector2();
        if (touchId == null || touchId == -1)
            ret.copy(_touchPos);
        else {
            let touch = getTouch(touchId);
            if (touch)
                ret.set(touch.x, touch.y);
            else
                ret.copy(_touchPos);
        }
        return ret;
    }

    public static addTouchMonitor(touchId: number, target: EventDispatcher) {
        let touch: TouchInfo = getTouch(touchId);
        if (touch.touchMonitors.indexOf(target) == -1)
            touch.touchMonitors.push(target);
    }

    public static removeTouchMonitor(target: EventDispatcher) {
        for (let j = 0; j < 5; j++) {
            let touch = _touches[j];
            let i = touch.touchMonitors.indexOf(target);
            if (i != -1)
                touch.touchMonitors[i] = null;
        }
    }

    public static cancelClick(touchId: number) {
        for (let j = 0; j < 5; j++) {
            let touch = _touches[j];
            if (touch.touchId == touchId)
                touch.clickCancelled = true;
        }
    }

    public static update() {
        this.disableMatrixValidation = true;

        traverseUpdate(_scene, null, 1);

        if (this.fontRebuilt) {
            _scene.traverseVisible(obj => {
                let dobj = obj["$owner"];
                if (dobj && ('redraw' in dobj))
                    dobj.redraw();
            });
            this.fontRebuilt = false;
        }

        this.disableMatrixValidation = false;
    }

    public static hitTest(x: number, y: number, forTouch?: boolean): DisplayObject {
        return hitTest(x, y, forTouch);
    }

    public static setFocus(obj: DisplayObject) {
        setFocus(obj);
    }
}

type HitTestRay = { origin: Vector3, direction: Vector3 };
var hit_tmp: Vector3 = new Vector3();
var hit_tmp2: Vector2 = new Vector2();

export class HitTestContext {
    public readonly screenPt: Vector3 = new Vector3();
    public forTouch: boolean;

    private _camera: Camera;
    private _ray: HitTestRay;

    public get camera(): Camera {
        return this._camera;
    }

    public set camera(value: Camera) {
        this._camera = value;
        this._ray = this._camera["$hitTestRay"];
        if (!this._ray)
            this._camera["$hitTestRay"] = this._ray = { origin: new Vector3(), direction: new Vector3() };

        screenToWorld(this._camera, this.screenPt.x, this.screenPt.y, this._ray.origin, this._ray.direction);
    }

    public get ray(): HitTestRay {
        return this._ray;
    }

    public set ray(value: HitTestRay) {
        this._ray = value;
    }

    public getLocal(obj: DisplayObject): Vector2 {
        hit_tmp.copy(this._ray.origin);
        obj.worldToLocal(hit_tmp, this._ray.direction);
        hit_tmp2.set(hit_tmp.x, hit_tmp.y);
        return hit_tmp2;
    }
}

const clickTestThreshold = 10;

var _renderer: Renderer;
var _camera: Camera;
var _scene: Scene;
var _touches: Array<TouchInfo>;
var _touchTarget: DisplayObject;
var _touchPos: Vector2;
var _touchCount: number;
var _rollOverChain: Array<DisplayObject> = [];
var _rollOutChain: Array<DisplayObject> = [];
var _hitTestContext: HitTestContext = new HitTestContext();
var _canvas: HTMLCanvasElement;
var _width: number;
var _height: number;
var _canvasTransform: Matrix4 = new Matrix4();
var _touchscreen: boolean;
var _devicePixelRatio: number = 1;
var _screenMode: ScreenMode = "none";

function init(renderer: Renderer, parameters?: StageInitParameters) {
    _renderer = renderer;
    if (parameters) {
        if (parameters.defaultLayer != null)
            UILayer = parameters.defaultLayer;
        if (parameters.screenMode)
            _screenMode = parameters.screenMode;
    }

    _canvas = renderer.domElement;
    _camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1000);
    _camera.layers.set(UILayer);

    _touchscreen = is_touch_enabled();
    if (renderer instanceof WebGLRenderer)
        _devicePixelRatio = renderer.getPixelRatio();

    _touches = [];
    for (let i = 0; i < 5; i++)
        _touches.push(new TouchInfo());
    if (!_touchscreen)
        _touches[0].touchId = 0;

    _touchCount = 0;
    _touchPos = new Vector2();

    if (_touchscreen) {
        document.addEventListener('touchstart', ev => handleTouch(ev, 0), { passive: false });
        document.addEventListener('touchend', ev => handleTouch(ev, 1), { passive: false });
        document.addEventListener('touchmove', ev => handleTouch(ev, 2), { passive: false });
        document.addEventListener('touchcancel', ev => handleTouch(ev, 3), { passive: false });
    }
    else {
        document.addEventListener('mousedown', ev => handleMouse(ev, 0), { passive: false });
        document.addEventListener('mouseup', ev => handleMouse(ev, 1), { passive: false });
        document.addEventListener('mousemove', ev => handleMouse(ev, 2), { passive: false });
    }
    document.addEventListener('wheel', ev => handleWheel(ev), { passive: false });

    window.addEventListener('resize', onWindowResize, false);

    onWindowResize();
}

function updateCanvasMatrix() {
    let offsetX: number = 0;
    let offsetY: number = 0;
    var element: HTMLElement = _canvas;
    var style = element.style;

    if(style.paddingTop)
        offsetY += parseInt(style.paddingTop,10);

    if(style.paddingLeft)
        offsetX += parseInt(style.paddingTop,10);
        
    do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
        style = element.style;

        if(style.borderLeftWidth)
            offsetX += parseInt(style.borderLeftWidth, 10);

        if(style.borderTopWidth)
            offsetY += parseInt(style.borderTopWidth, 10);
    } while (element = <HTMLElement>element.offsetParent);

    _canvasTransform.identity();

    if (_screenMode == "horizontal") {
        if (_height > _width) {
            let tmp = _width;
            _width = _height;
            _height = tmp;
            _renderer.setSize(_width, _height);
            _canvas.style.transformOrigin = "0 0";
            _canvas.style.transform = "translate(" + _height + "px,0) rotate(90deg)";
            _canvasTransform.multiply(new Matrix4().makeTranslation(0, _height, 0))
                .multiply(new Matrix4().makeRotationZ(-Math.PI / 2));
        }
    }
    else if (_screenMode == "vertical") {
        if (_width > _height) {
            let tmp = _width;
            _width = _height;
            _height = tmp;
            _renderer.setSize(_width, _height);
            _canvas.style.transformOrigin = "0 0";
            _canvas.style.transform = "translate(0," + _width + "px) rotate(-90deg)";
            _canvasTransform.multiply(new Matrix4().makeTranslation(_width, 0, 0))
                .multiply(new Matrix4().makeRotationZ(Math.PI / 2));
        }
    }
    else
        _renderer.setSize(_width, _height);

    _canvasTransform.multiply(new Matrix4().makeTranslation(-offsetX, -offsetY, 0));
}

function onWindowResize(evt?: UIEvent) {
    _width = _canvas.clientWidth;
    _height = _canvas.clientHeight;
    updateCanvasMatrix();

    let aspectRatio = _width / _height;

    if (_camera instanceof OrthographicCamera) {
        let cameraSize = _height / 2;

        _camera.left = -cameraSize * aspectRatio;
        _camera.right = cameraSize * aspectRatio;
        _camera.top = cameraSize;
        _camera.bottom = -cameraSize;

        _camera.position.x = cameraSize * aspectRatio;
        _camera.position.y = -cameraSize;
        _camera.position.z = 0;

        _camera.updateProjectionMatrix();
    }
    else if (_camera instanceof PerspectiveCamera) {
        _camera.aspect = aspectRatio;
        _camera.updateProjectionMatrix();
    }

    if (evt)
        Stage.eventDispatcher.dispatchEvent("size_changed");
}

function is_touch_enabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

function handleMouse(ev: MouseEvent, type: number) {
    if (!activeTextInput || !activeTextInput.stage)
        ev.preventDefault();

    s_v3.set(ev.pageX, ev.pageY, 0);
    s_v3.applyMatrix4(_canvasTransform);
    _touchPos.set(s_v3.x, s_v3.y);

    let touch: TouchInfo = _touches[0];

    touch.shiftKey = ev.shiftKey;
    touch.ctrlKey = ev.ctrlKey;
    touch.target = _touchTarget = hitTest(_touchPos.x, _touchPos.y, true);

    if (_touchPos.x != touch.x || _touchPos.y != touch.y) {
        touch.x = _touchPos.x;
        touch.y = _touchPos.y;
        touch.move();
    }

    if (touch.lastRollOver != touch.target)
        handleRollOver(touch);

    if (type == 0) {
        if (!touch.began) {
            _touchCount = 1;
            touch.begin();
            touch.button = ev.button;
            setFocus(touch.target);
            setLastInput(touch);

            if (touch.target)
                bubbleEvent(touch.target.obj3D, "touch_begin");
        }
    }
    else if (type == 1) {
        if (touch.began) {
            _touchCount = 0;
            touch.end();

            let clickTarget = touch.clickTest();
            if (clickTarget) {
                setLastInput(touch);

                if (ev.button == 1 || ev.button == 2)
                    bubbleEvent(clickTarget.obj3D, "right_click");
                else
                    bubbleEvent(clickTarget.obj3D, "click");
            }

            touch.button = -1;
        }
    }
}

function handleWheel(ev: WheelEvent): void {
    if (!activeTextInput || !activeTextInput.stage)
        ev.preventDefault();

    s_v3.set(ev.pageX, ev.pageY, 0);
    s_v3.applyMatrix4(_canvasTransform);
    _touchPos.set(s_v3.x, s_v3.y);

    let touch = _touches[0];

    if (_touchscreen) {
        touch.shiftKey = ev.shiftKey;
        touch.ctrlKey = ev.ctrlKey;
        touch.target = _touchTarget = hitTest(_touchPos.x, _touchPos.y, true);
    }

    if (_touchTarget != null) {
        touch.mouseWheelDelta = ev.deltaY;
        setLastInput(touch);
        bubbleEvent(_touchTarget.obj3D, "mouse_wheel");
        touch.mouseWheelDelta = 0;
    }
}

function getTouch(touchId: number): TouchInfo {
    for (let j: number = 0; j < 5; j++) {
        let touch: TouchInfo = _touches[j];
        if (touchId == -1 && touch.touchId != -1
            || touchId != -1 && touch.touchId == touchId)
            return touch;
    }

    return null;
}

function handleTouch(ev: TouchEvent, type: number) {
    if (!activeTextInput || !activeTextInput.stage)
        ev.preventDefault();

    let touches = ev.changedTouches;
    for (let i: number = 0; i < touches.length; ++i) {
        let uTouch: Touch = touches[i];

        s_v3.set(uTouch.pageX, uTouch.pageY, 0);
        s_v3.applyMatrix4(_canvasTransform);
        _touchPos.set(s_v3.x, s_v3.y);

        let touch: TouchInfo;
        let free: TouchInfo;
        for (let j: number = 0; j < 5; j++) {
            if (_touches[j].touchId == uTouch.identifier) {
                touch = _touches[j];
                break;
            }

            if (_touches[j].touchId == -1)
                free = _touches[j];
        }
        if (!touch) {
            touch = free;
            if (!touch || type != 0)
                continue;

            touch.touchId = uTouch.identifier;
        }

        touch.shiftKey = ev.shiftKey;
        touch.ctrlKey = ev.ctrlKey;
        touch.target = _touchTarget = hitTest(_touchPos.x, _touchPos.y, true);

        if (touch.x != _touchPos.x || touch.y != _touchPos.y) {
            touch.x = _touchPos.x;
            touch.y = _touchPos.y;
            if (touch.began)
                touch.move();
        }

        if (touch.lastRollOver != touch.target)
            handleRollOver(touch);

        if (type == 0) {
            if (!touch.began) {
                _touchCount++;
                touch.begin();
                touch.button = 0;
                setFocus(touch.target);

                setLastInput(touch);
                if (touch.target)
                    bubbleEvent(touch.target.obj3D, "touch_begin");
            }
        }
        else if (type == 1 || type == 3) {
            if (touch.began) {
                _touchCount--;
                touch.end();

                if (type != 3) {
                    let clickTarget = touch.clickTest();
                    if (clickTarget != null) {
                        setLastInput(touch);
                        bubbleEvent(clickTarget.obj3D, "click");
                    }
                }

                touch.target = null;
                handleRollOver(touch);

                touch.touchId = -1;
            }
        }
    }
}

function handleRollOver(touch: TouchInfo) {
    _rollOverChain.length = 0;
    _rollOutChain.length = 0;

    if (touch.lastRollOver) {
        _rollOutChain.push(touch.lastRollOver);
        touch.lastRollOver.obj3D.traverseAncestors(obj => {
            let dobj = obj["$owner"];
            if (dobj)
                _rollOutChain.push(dobj);
        });
    }
    touch.lastRollOver = touch.target;

    if (touch.target) {
        let obj = touch.target.obj3D;
        while (obj) {
            let dobj = obj["$owner"];
            if (dobj) {
                let i = _rollOutChain.indexOf(dobj);
                if (i != -1) {
                    _rollOutChain.splice(i, _rollOutChain.length - i);
                    break;
                }

                _rollOverChain.push(dobj);
            }
            obj = obj.parent;
        }
    }

    let cnt: number = _rollOutChain.length;
    if (cnt > 0) {
        for (let i = 0; i < cnt; i++) {
            let element = _rollOutChain[i];
            if (element.stage)
                element.dispatchEvent("roll_out", null);
        }
        _rollOutChain.length = 0;
    }

    cnt = _rollOverChain.length;
    if (cnt > 0) {
        for (let i = 0; i < cnt; i++) {
            let element = _rollOverChain[i];
            if (element.stage)
                element.dispatchEvent("roll_over", null);
        }
        _rollOverChain.length = 0;
    };
}

function hitTest(x: number, y: number, forTouch?: boolean) {
    if (!_hitTestContext) _hitTestContext = new HitTestContext();
    Stage.disableMatrixValidation = true;

    _hitTestContext.screenPt.set(x, y, 0);
    _hitTestContext.camera = _camera;
    _hitTestContext.forTouch = forTouch != null ? forTouch : true;

    let ret = traverseHitTest(_scene, _hitTestContext);

    Stage.disableMatrixValidation = false;

    return ret;
}

var activeTextInput: DisplayObject;
function setFocus(obj: DisplayObject): void {
    if (activeTextInput == obj)
        return;

    if (activeTextInput) {
        let t = activeTextInput;
        activeTextInput = null;
        t.dispatchEvent("focus_out");
    }

    if (!obj || !obj["isInput"])
        return;

    activeTextInput = obj;
    activeTextInput.dispatchEvent("focus_in");
}

var s_v3: Vector3 = new Vector3();
export function screenToWorld(camera: Camera, x: number, y: number, outPt: Vector3, outDir: Vector3) {
    outPt.set((x / _width) * 2 - 1, - (y / _height) * 2 + 1, 0);
    outPt.unproject(camera);

    if (camera["isPerspectiveCamera"]) {
        s_v3.setFromMatrixPosition(camera.matrixWorld);
        outDir.copy(outPt).sub(s_v3).normalize();
        outDir.multiplyScalar(-1);
    }
    else
        outDir.set(0, 0, 1);
}

export function worldToScreen(camera: Camera, input: Vector3, output: Vector2) {
    s_v3.copy(input);
    s_v3.project(camera);
    output.set((s_v3.x + 1) / 2 * _width, (1 - s_v3.y) / 2 * _height);
}

function setLastInput(touch: TouchInfo) {
    lastInput.touchId = touch.touchId;
    lastInput.x = touch.x;
    lastInput.y = touch.y;
    lastInput.clickCount = touch.clickCount;
    lastInput.mouseWheelDelta = touch.mouseWheelDelta;
    lastInput.button = touch.button;
    lastInput.holdTime = touch.holdTime;
    lastInput.ctrlKey = touch.ctrlKey;
    lastInput.shiftKey = touch.shiftKey;
    lastInput.commandKey = touch.commandKey;
}

class TouchInfo {
    public x: number;
    public y: number;
    public touchId: number;
    public clickCount: number;
    public mouseWheelDelta: number;
    public button: number;
    public shiftKey: boolean;
    public ctrlKey: boolean;
    public commandKey: boolean;

    public downX: number;
    public downY: number;
    public downTime: number;
    public downFrame: number;
    public began: boolean;
    public clickCancelled: boolean;
    public lastClickTime: number;
    public lastClickX: number;
    public lastClickY: number;
    public lastClickButton: number;
    public holdTime: number;
    public target: DisplayObject;
    public downTargets: DisplayObject[];
    public lastRollOver: DisplayObject;
    public touchMonitors: Array<EventDispatcher>;

    public constructor() {
        this.downTargets = new Array<DisplayObject>();
        this.touchMonitors = new Array<EventDispatcher>();
        this.reset();
    }

    public reset() {
        this.touchId = -1;
        this.x = 0;
        this.y = 0;
        this.clickCount = 0;
        this.button = -1;
        this.mouseWheelDelta = 0;
        this.lastClickTime = 0;
        this.began = false;
        this.target = null;
        this.downTargets.length = 0;
        this.lastRollOver = null;
        this.clickCancelled = false;
        this.touchMonitors.length = 0;
    }

    public begin() {
        this.began = true;
        this.clickCancelled = false;
        this.downX = this.x;
        this.downY = this.y;
        this.downTime = performance.now();
        this.downFrame = Timers.frameCount;
        this.holdTime = 0;

        this.downTargets.length = 0;
        if (this.target) {
            this.downTargets.push(this.target);
            this.target.obj3D.traverseAncestors(obj => {
                let dobj = obj["$owner"];
                if (dobj)
                    this.downTargets.push(dobj);
            });
        }
    }

    public move() {
        if (this.began)
            this.holdTime = (Timers.frameCount - this.downFrame) == 1 ? (1 / 60) : (performance.now() - this.downTime);

        setLastInput(this);

        if (Math.abs(this.x - this.downX) > 50 || Math.abs(this.y - this.downY) > 50) this.clickCancelled = true;

        if (this.touchMonitors.length > 0) {
            let len = this.touchMonitors.length;
            for (let i = 0; i < len; i++) {
                let e = this.touchMonitors[i];
                if ((e instanceof DisplayObject) && !e.stage)
                    this.touchMonitors[i] = null;
            }

            bubbleEvent(null, "touch_move", null, this.touchMonitors);
        }
        else
            Stage.eventDispatcher.dispatchEvent("touch_move");
    }

    public end() {
        this.began = false;
        let now = performance.now();

        if (this.downTargets.length == 0
            || this.clickCancelled
            || Math.abs(this.x - this.downX) > clickTestThreshold
            || Math.abs(this.y - this.downY) > clickTestThreshold) {
            this.clickCancelled = true;
            this.lastClickTime = 0;
            this.clickCount = 1;
        }
        else {
            if (now - this.lastClickTime < 0.35
                && Math.abs(this.x - this.lastClickX) < clickTestThreshold
                && Math.abs(this.y - this.lastClickY) < clickTestThreshold
                && this.lastClickButton == this.button) {
                if (this.clickCount == 2)
                    this.clickCount = 1;
                else
                    this.clickCount++;
            }
            else
                this.clickCount = 1;
            this.lastClickTime = now;
            this.lastClickX = this.x;
            this.lastClickY = this.y;
            this.lastClickButton = this.button;
        }

        //当间隔一帧时，使用帧率计算时间，避免掉帧因素
        this.holdTime = (Timers.frameCount - this.downFrame) == 1 ? (1 / 60) : (now - this.downTime);
        setLastInput(this);

        let bubbleFrom = this.target ? this.target.obj3D : Stage.scene;

        if (this.touchMonitors.length > 0) {
            let len = this.touchMonitors.length;
            for (let i = 0; i < len; i++) {
                let e = this.touchMonitors[i];
                if ((e instanceof DisplayObject) && !e.stage)
                    this.touchMonitors[i] = null;
            }
            bubbleEvent(bubbleFrom, "touch_end", null, this.touchMonitors);

            this.touchMonitors.length = 0;
        }
        else
            bubbleEvent(bubbleFrom, "touch_end");
    }

    public clickTest(): DisplayObject {
        if (this.clickCancelled) {
            this.downTargets.length = 0;
            return null;
        }

        let obj: DisplayObject = this.downTargets[0];
        if (obj.stage) {
            this.downTargets.length = 0;
            return obj;
        }

        obj = this.target;
        while (obj) {
            let i = this.downTargets.indexOf(obj);
            if (i != -1 && obj.stage)
                break;

            obj = obj.parent ? obj.parent["$owner"] : null;
        }

        this.downTargets.length = 0;

        return obj;
    }
}

export function broadcastEvent(p: Object3D, type: string, data?: any): void {
    p = p || Stage.scene;

    let ev = EventPool.borrow();
    ev._type = type;
    ev.data = data;
    let arr = ev._callChain;

    p.traverseVisible(obj => {
        let dobj = obj["$owner"];
        if (dobj)
            arr.push(dobj);
    });

    arr.forEach(obj => {
        let col = obj._listeners[type];
        if (col) {
            if (col.captures.length > 0)
                obj._dispatch(col, ev, true);

            if (col.callbacks.length > 0)
                obj._dispatch(col, ev, false);
        }
    });

    arr.length = 0;
    EventPool.returns(ev);
}

export function bubbleEvent(p: Object3D, type: string, data?: any, addChain?: Array<EventDispatcher>): void {
    p = p || Stage.scene;

    let ev = EventPool.borrow();
    ev._type = type;
    ev.data = data;
    ev._initiator = p["$owner"];
    let arr = ev._callChain;

    if (ev.initiator)
        arr.push(ev.initiator);
    p.traverseAncestors(obj => {
        let dobj = obj["$owner"];
        if (dobj)
            arr.push(dobj);
    });

    for (let i = arr.length - 1; i >= 0; i--) {
        let obj = arr[i];
        let col = obj._listeners[type];
        if (col && col.captures.length > 0) {
            obj._dispatch(col, ev, true);
            if (ev._touchCapture) {
                ev._touchCapture = false;
                if (type == "touch_begin")
                    Stage.addTouchMonitor(ev.input.touchId, obj);
            }
        }
    }

    if (!ev._stopsPropagation) {
        for (let i = 0; i < arr.length; i++) {
            let obj = arr[i];
            let col = obj._listeners[type];
            if (col && col.callbacks.length > 0) {
                obj._dispatch(col, ev, false);
                if (ev._touchCapture) {
                    ev._touchCapture = false;
                    if (type == "touch_begin")
                        Stage.addTouchMonitor(ev.input.touchId, obj);
                }

                if (ev._stopsPropagation)
                    break;
            }
        }

        if (addChain) {
            for (let i = 0; i < addChain.length; i++) {
                let obj = addChain[i];
                if (obj && arr.indexOf(obj) == -1) {
                    let col = obj._listeners[type];
                    if (col) {
                        if (col.captures.length > 0)
                            obj._dispatch(col, ev, true);

                        if (col.callbacks.length > 0)
                            obj._dispatch(col, ev, false);
                    }
                }
            }
        }
    }

    arr.length = 0;
    EventPool.returns(ev);
}