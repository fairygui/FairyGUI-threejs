import { Vector2, Vector3, Matrix4, OrthographicCamera, WebGLRenderer, PerspectiveCamera, Object3D, NormalBlending, Plane, Vector4, Quaternion, Color, NoBlending, AdditiveBlending, MultiplyBlending, SubtractiveBlending, ShaderMaterial, UniformsUtils, ShaderLib, Uniform, DoubleSide, BufferGeometry, TrianglesDrawMode, BufferAttribute, Texture, LinearFilter, FileLoader, TextureLoader, AudioLoader, Audio } from 'three';

var ButtonMode;
(function (ButtonMode) {
    ButtonMode[ButtonMode["Common"] = 0] = "Common";
    ButtonMode[ButtonMode["Check"] = 1] = "Check";
    ButtonMode[ButtonMode["Radio"] = 2] = "Radio";
})(ButtonMode || (ButtonMode = {}));
var AutoSizeType;
(function (AutoSizeType) {
    AutoSizeType[AutoSizeType["None"] = 0] = "None";
    AutoSizeType[AutoSizeType["Both"] = 1] = "Both";
    AutoSizeType[AutoSizeType["Height"] = 2] = "Height";
    AutoSizeType[AutoSizeType["Shrink"] = 3] = "Shrink";
})(AutoSizeType || (AutoSizeType = {}));
var LoaderFillType;
(function (LoaderFillType) {
    LoaderFillType[LoaderFillType["None"] = 0] = "None";
    LoaderFillType[LoaderFillType["Scale"] = 1] = "Scale";
    LoaderFillType[LoaderFillType["ScaleMatchHeight"] = 2] = "ScaleMatchHeight";
    LoaderFillType[LoaderFillType["ScaleMatchWidth"] = 3] = "ScaleMatchWidth";
    LoaderFillType[LoaderFillType["ScaleFree"] = 4] = "ScaleFree";
    LoaderFillType[LoaderFillType["ScaleNoBorder"] = 5] = "ScaleNoBorder";
})(LoaderFillType || (LoaderFillType = {}));
var ListLayoutType;
(function (ListLayoutType) {
    ListLayoutType[ListLayoutType["SingleColumn"] = 0] = "SingleColumn";
    ListLayoutType[ListLayoutType["SingleRow"] = 1] = "SingleRow";
    ListLayoutType[ListLayoutType["FlowHorizontal"] = 2] = "FlowHorizontal";
    ListLayoutType[ListLayoutType["FlowVertical"] = 3] = "FlowVertical";
    ListLayoutType[ListLayoutType["Pagination"] = 4] = "Pagination";
})(ListLayoutType || (ListLayoutType = {}));
var ListSelectionMode;
(function (ListSelectionMode) {
    ListSelectionMode[ListSelectionMode["Single"] = 0] = "Single";
    ListSelectionMode[ListSelectionMode["Multiple"] = 1] = "Multiple";
    ListSelectionMode[ListSelectionMode["Multiple_SingleClick"] = 2] = "Multiple_SingleClick";
    ListSelectionMode[ListSelectionMode["None"] = 3] = "None";
})(ListSelectionMode || (ListSelectionMode = {}));
var OverflowType;
(function (OverflowType) {
    OverflowType[OverflowType["Visible"] = 0] = "Visible";
    OverflowType[OverflowType["Hidden"] = 1] = "Hidden";
    OverflowType[OverflowType["Scroll"] = 2] = "Scroll";
})(OverflowType || (OverflowType = {}));
var PackageItemType;
(function (PackageItemType) {
    PackageItemType[PackageItemType["Image"] = 0] = "Image";
    PackageItemType[PackageItemType["MovieClip"] = 1] = "MovieClip";
    PackageItemType[PackageItemType["Sound"] = 2] = "Sound";
    PackageItemType[PackageItemType["Component"] = 3] = "Component";
    PackageItemType[PackageItemType["Atlas"] = 4] = "Atlas";
    PackageItemType[PackageItemType["Font"] = 5] = "Font";
    PackageItemType[PackageItemType["Swf"] = 6] = "Swf";
    PackageItemType[PackageItemType["Misc"] = 7] = "Misc";
    PackageItemType[PackageItemType["Unknown"] = 8] = "Unknown";
})(PackageItemType || (PackageItemType = {}));
var ObjectType;
(function (ObjectType) {
    ObjectType[ObjectType["Image"] = 0] = "Image";
    ObjectType[ObjectType["MovieClip"] = 1] = "MovieClip";
    ObjectType[ObjectType["Swf"] = 2] = "Swf";
    ObjectType[ObjectType["Graph"] = 3] = "Graph";
    ObjectType[ObjectType["Loader"] = 4] = "Loader";
    ObjectType[ObjectType["Group"] = 5] = "Group";
    ObjectType[ObjectType["Text"] = 6] = "Text";
    ObjectType[ObjectType["RichText"] = 7] = "RichText";
    ObjectType[ObjectType["InputText"] = 8] = "InputText";
    ObjectType[ObjectType["Component"] = 9] = "Component";
    ObjectType[ObjectType["List"] = 10] = "List";
    ObjectType[ObjectType["Label"] = 11] = "Label";
    ObjectType[ObjectType["Button"] = 12] = "Button";
    ObjectType[ObjectType["ComboBox"] = 13] = "ComboBox";
    ObjectType[ObjectType["ProgressBar"] = 14] = "ProgressBar";
    ObjectType[ObjectType["Slider"] = 15] = "Slider";
    ObjectType[ObjectType["ScrollBar"] = 16] = "ScrollBar";
    ObjectType[ObjectType["Tree"] = 17] = "Tree";
    ObjectType[ObjectType["Loader3D"] = 18] = "Loader3D";
})(ObjectType || (ObjectType = {}));
var ProgressTitleType;
(function (ProgressTitleType) {
    ProgressTitleType[ProgressTitleType["Percent"] = 0] = "Percent";
    ProgressTitleType[ProgressTitleType["ValueAndMax"] = 1] = "ValueAndMax";
    ProgressTitleType[ProgressTitleType["Value"] = 2] = "Value";
    ProgressTitleType[ProgressTitleType["Max"] = 3] = "Max";
})(ProgressTitleType || (ProgressTitleType = {}));
var ScrollBarDisplayType;
(function (ScrollBarDisplayType) {
    ScrollBarDisplayType[ScrollBarDisplayType["Default"] = 0] = "Default";
    ScrollBarDisplayType[ScrollBarDisplayType["Visible"] = 1] = "Visible";
    ScrollBarDisplayType[ScrollBarDisplayType["Auto"] = 2] = "Auto";
    ScrollBarDisplayType[ScrollBarDisplayType["Hidden"] = 3] = "Hidden";
})(ScrollBarDisplayType || (ScrollBarDisplayType = {}));
var ScrollType;
(function (ScrollType) {
    ScrollType[ScrollType["Horizontal"] = 0] = "Horizontal";
    ScrollType[ScrollType["Vertical"] = 1] = "Vertical";
    ScrollType[ScrollType["Both"] = 2] = "Both";
})(ScrollType || (ScrollType = {}));
var FlipType;
(function (FlipType) {
    FlipType[FlipType["None"] = 0] = "None";
    FlipType[FlipType["Horizontal"] = 1] = "Horizontal";
    FlipType[FlipType["Vertical"] = 2] = "Vertical";
    FlipType[FlipType["Both"] = 3] = "Both";
})(FlipType || (FlipType = {}));
var ChildrenRenderOrder;
(function (ChildrenRenderOrder) {
    ChildrenRenderOrder[ChildrenRenderOrder["Ascent"] = 0] = "Ascent";
    ChildrenRenderOrder[ChildrenRenderOrder["Descent"] = 1] = "Descent";
    ChildrenRenderOrder[ChildrenRenderOrder["Arch"] = 2] = "Arch";
})(ChildrenRenderOrder || (ChildrenRenderOrder = {}));
var GroupLayoutType;
(function (GroupLayoutType) {
    GroupLayoutType[GroupLayoutType["None"] = 0] = "None";
    GroupLayoutType[GroupLayoutType["Horizontal"] = 1] = "Horizontal";
    GroupLayoutType[GroupLayoutType["Vertical"] = 2] = "Vertical";
})(GroupLayoutType || (GroupLayoutType = {}));
var PopupDirection;
(function (PopupDirection) {
    PopupDirection[PopupDirection["Auto"] = 0] = "Auto";
    PopupDirection[PopupDirection["Up"] = 1] = "Up";
    PopupDirection[PopupDirection["Down"] = 2] = "Down";
})(PopupDirection || (PopupDirection = {}));
var RelationType;
(function (RelationType) {
    RelationType[RelationType["Left_Left"] = 0] = "Left_Left";
    RelationType[RelationType["Left_Center"] = 1] = "Left_Center";
    RelationType[RelationType["Left_Right"] = 2] = "Left_Right";
    RelationType[RelationType["Center_Center"] = 3] = "Center_Center";
    RelationType[RelationType["Right_Left"] = 4] = "Right_Left";
    RelationType[RelationType["Right_Center"] = 5] = "Right_Center";
    RelationType[RelationType["Right_Right"] = 6] = "Right_Right";
    RelationType[RelationType["Top_Top"] = 7] = "Top_Top";
    RelationType[RelationType["Top_Middle"] = 8] = "Top_Middle";
    RelationType[RelationType["Top_Bottom"] = 9] = "Top_Bottom";
    RelationType[RelationType["Middle_Middle"] = 10] = "Middle_Middle";
    RelationType[RelationType["Bottom_Top"] = 11] = "Bottom_Top";
    RelationType[RelationType["Bottom_Middle"] = 12] = "Bottom_Middle";
    RelationType[RelationType["Bottom_Bottom"] = 13] = "Bottom_Bottom";
    RelationType[RelationType["Width"] = 14] = "Width";
    RelationType[RelationType["Height"] = 15] = "Height";
    RelationType[RelationType["LeftExt_Left"] = 16] = "LeftExt_Left";
    RelationType[RelationType["LeftExt_Right"] = 17] = "LeftExt_Right";
    RelationType[RelationType["RightExt_Left"] = 18] = "RightExt_Left";
    RelationType[RelationType["RightExt_Right"] = 19] = "RightExt_Right";
    RelationType[RelationType["TopExt_Top"] = 20] = "TopExt_Top";
    RelationType[RelationType["TopExt_Bottom"] = 21] = "TopExt_Bottom";
    RelationType[RelationType["BottomExt_Top"] = 22] = "BottomExt_Top";
    RelationType[RelationType["BottomExt_Bottom"] = 23] = "BottomExt_Bottom";
    RelationType[RelationType["Size"] = 24] = "Size";
})(RelationType || (RelationType = {}));
var FillMethod;
(function (FillMethod) {
    FillMethod[FillMethod["None"] = 0] = "None";
    FillMethod[FillMethod["Horizontal"] = 1] = "Horizontal";
    FillMethod[FillMethod["Vertical"] = 2] = "Vertical";
    FillMethod[FillMethod["Radial90"] = 3] = "Radial90";
    FillMethod[FillMethod["Radial180"] = 4] = "Radial180";
    FillMethod[FillMethod["Radial360"] = 5] = "Radial360";
})(FillMethod || (FillMethod = {}));
var FillOrigin;
(function (FillOrigin) {
    FillOrigin[FillOrigin["Top"] = 0] = "Top";
    FillOrigin[FillOrigin["Bottom"] = 1] = "Bottom";
    FillOrigin[FillOrigin["Left"] = 2] = "Left";
    FillOrigin[FillOrigin["Right"] = 3] = "Right";
    FillOrigin[FillOrigin["TopLeft"] = 0] = "TopLeft";
    FillOrigin[FillOrigin["TopRight"] = 1] = "TopRight";
    FillOrigin[FillOrigin["BottomLeft"] = 2] = "BottomLeft";
    FillOrigin[FillOrigin["BottomRight"] = 3] = "BottomRight";
})(FillOrigin || (FillOrigin = {}));
var FillOrigin90;
(function (FillOrigin90) {
    FillOrigin90[FillOrigin90["TopLeft"] = 0] = "TopLeft";
    FillOrigin90[FillOrigin90["TopRight"] = 1] = "TopRight";
    FillOrigin90[FillOrigin90["BottomLeft"] = 2] = "BottomLeft";
    FillOrigin90[FillOrigin90["BottomRight"] = 3] = "BottomRight";
})(FillOrigin90 || (FillOrigin90 = {}));
var ObjectPropID;
(function (ObjectPropID) {
    ObjectPropID[ObjectPropID["Text"] = 0] = "Text";
    ObjectPropID[ObjectPropID["Icon"] = 1] = "Icon";
    ObjectPropID[ObjectPropID["Color"] = 2] = "Color";
    ObjectPropID[ObjectPropID["OutlineColor"] = 3] = "OutlineColor";
    ObjectPropID[ObjectPropID["Playing"] = 4] = "Playing";
    ObjectPropID[ObjectPropID["Frame"] = 5] = "Frame";
    ObjectPropID[ObjectPropID["DeltaTime"] = 6] = "DeltaTime";
    ObjectPropID[ObjectPropID["TimeScale"] = 7] = "TimeScale";
    ObjectPropID[ObjectPropID["FontSize"] = 8] = "FontSize";
    ObjectPropID[ObjectPropID["Selected"] = 9] = "Selected";
})(ObjectPropID || (ObjectPropID = {}));

class Pool {
    constructor(type, init, reset) {
        this.pool = [];
        this._init = init;
        this._reset = reset;
        this._ct = type;
    }
    borrow(...argArray) {
        let ret;
        if (this.pool.length > 0)
            ret = this.pool.pop();
        else
            ret = new this._ct();
        if (this._init)
            this._init(ret, ...argArray);
        return ret;
    }
    returns(element) {
        if (Array.isArray(element)) {
            let count = element.length;
            for (let i = 0; i < count; i++) {
                let element2 = element[i];
                if (this._reset)
                    this._reset(element2);
                this.pool.push(element2);
            }
            element.length = 0;
        }
        else {
            if (this._reset)
                this._reset(element);
            this.pool.push(element);
        }
    }
}

var lastInput = {
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
};
class Event {
    constructor() {
        this.data = null;
        this._callChain = [];
    }
    get type() {
        return this._type;
    }
    get sender() {
        return this._sender;
    }
    get initiator() {
        return this._initiator;
    }
    get input() {
        return lastInput;
    }
    stopPropagation() {
        this._stopsPropagation = true;
    }
    preventDefault() {
        this._defaultPrevented = true;
    }
    captureTouch() {
        this._touchCapture = true;
    }
    get isDefaultPrevented() {
        return this._defaultPrevented;
    }
}
var EventPool = new Pool(Event, obj => {
    obj._stopsPropagation = false;
    obj._defaultPrevented = false;
    obj._touchCapture = false;
}, obj => {
    obj.data = null;
    obj._initiator = null;
    obj._sender = null;
});

class EventDispatcher {
    constructor() {
        this._listeners = {};
    }
    on(type, callback, target, capture) {
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
    off(type, callback, target, capture) {
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
    offAll(type) {
        if (type) {
            let col = this._listeners[type];
            if (col) {
                if (col.dispatching != 0) {
                    col.callbacks.forEach((value, index, arr) => { if (index % 3 == 2)
                        arr[index] = true; });
                    col.captures.forEach((value, index, arr) => { if (index % 3 == 2)
                        arr[index] = true; });
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
    hasListener(type, callback, target, capture) {
        let col = this._listeners[type];
        if (!col)
            return false;
        let arr = capture ? col.captures : col.callbacks;
        if (!callback)
            return arr.length > 0;
        else
            arr.findIndex((value, index, arr) => value == callback && arr[index + 1] == target) != -1;
    }
    dispatchEvent(type, data) {
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
    _dispatch(col, ev, capture) {
        if (col.dispatching != 0)
            return;
        col.dispatching = 1;
        ev._sender = this;
        let arr = capture ? col.captures : col.callbacks;
        let cnt = arr.length;
        for (let i = 0; i < cnt; i += 3) {
            arr[i].call(arr[i + 1], ev);
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

class Rect {
    constructor(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    }
    set(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    setMinMax(xMin, yMin, xMax, yMax) {
        this.x = xMin;
        this.y = yMin;
        this.width = xMax - xMin;
        this.height = yMax - yMin;
    }
    get position() {
        return new Vector2(this.x, this.y);
    }
    get size() {
        return new Vector2(this.width, this.height);
    }
    get xMin() {
        return this.x;
    }
    set xMin(value) {
        let d = value - this.x;
        this.x = value;
        this.width -= d;
    }
    get xMax() {
        return this.x + this.width;
    }
    set xMax(value) {
        this.width = value - this.x;
    }
    get yMin() {
        return this.y;
    }
    set yMin(value) {
        let d = value - this.y;
        this.y = value;
        this.height -= d;
    }
    get yMax() {
        return this.y + this.height;
    }
    set yMax(value) {
        this.height = value - this.y;
    }
    intersection(another) {
        if (this.width == 0 || this.height == 0 || another.width == 0 || another.height == 0)
            return new Rect(0, 0, 0, 0);
        let left = this.x > another.x ? this.x : another.x;
        let right = this.xMax < another.xMax ? this.xMax : another.xMax;
        let top = this.y > another.y ? this.y : another.y;
        let bottom = this.yMax < another.yMax ? this.yMax : another.yMax;
        if (left > right || top > bottom)
            this.set(0, 0, 0, 0);
        else
            this.setMinMax(left, top, right, bottom);
        return this;
    }
    union(another) {
        if (another.width == 0 || another.height == 0)
            return this;
        if (this.width == 0 || this.height == 0) {
            this.copy(another);
            return this;
        }
        let x = Math.min(this.x, another.x);
        let y = Math.min(this.y, another.y);
        this.setMinMax(x, y, Math.max(this.xMax, another.xMax), Math.max(this.yMax, another.yMax));
        return this;
    }
    extend(x, y) {
        this.x -= x;
        this.y -= y;
        this.width += x * 2;
        this.height += y * 2;
    }
    contains(x, y) {
        if (x instanceof Vector2) {
            y = x.y;
            x = x.x;
        }
        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
    }
    copy(source) {
        this.set(source.x, source.y, source.width, source.height);
    }
    clone() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
}

class Timers {
    static add(delayInMiniseconds, repeat, callback, target, callbackParam) {
        let item;
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
    static callLater(callback, target, callbackParam) {
        this.add(0, 1, callback, target, callbackParam);
    }
    static callDelay(delay, callback, target, callbackParam) {
        this.add(delay, 1, callback, target, callbackParam);
    }
    static addUpdate(callback, target, callbackParam) {
        this.add(0, 0, callback, target, callbackParam);
    }
    static exists(callback, target) {
        return _items.findIndex(e => e.target == target && e.callback == callback) != -1;
    }
    static remove(callback, target) {
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
Timers.deltaTime = 0;
Timers.time = 0;
Timers.frameCount = 0;
class TimerItem {
    constructor() {
        this.delay = 0;
        this.counter = 0;
        this.repeat = 0;
    }
    advance(elapsed) {
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
    reset() {
        this.callback = null;
        this.target = null;
        this.param = null;
    }
}
var _items = new Array();
var _pool = new Pool(TimerItem, e => e.reset());
var _enumI = 0;
var _enumCount = 0;
var _lastTime = 0;
requestAnimationFrame(__timer);
function __timer(timeStamp) {
    requestAnimationFrame(__timer);
    Timers.frameCount++;
    Timers.time = timeStamp;
    let deltaTime = timeStamp - _lastTime;
    Timers.deltaTime = deltaTime;
    _lastTime = timeStamp;
    _enumI = 0;
    _enumCount = _items.length;
    while (_enumI < _enumCount) {
        var item = _items[_enumI];
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

var UILayer = 1;
class Stage {
    static init(renderer, parameters) {
        init(renderer, parameters);
    }
    static set scene(value) {
        _scene = value;
    }
    static get scene() {
        return _scene;
    }
    static get domElement() {
        return _canvas;
    }
    static get devicePixelRatio() {
        return _devicePixelRatio;
    }
    static get touchScreen() {
        return _touchscreen;
    }
    static get camera() {
        return _camera;
    }
    static set camera(value) {
        _camera = value;
    }
    static get width() {
        return _width;
    }
    static get height() {
        return _height;
    }
    static get touchPos() {
        return _touchPos;
    }
    static get canvasTransform() {
        return _canvasTransform;
    }
    static get touchTarget() {
        return _touchTarget;
    }
    static get touchCount() {
        return _touchCount;
    }
    static getTouchPos(touchId, ret) {
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
    static addTouchMonitor(touchId, target) {
        let touch = getTouch(touchId);
        if (touch.touchMonitors.indexOf(target) == -1)
            touch.touchMonitors.push(target);
    }
    static removeTouchMonitor(target) {
        for (let j = 0; j < 5; j++) {
            let touch = _touches[j];
            let i = touch.touchMonitors.indexOf(target);
            if (i != -1)
                touch.touchMonitors[i] = null;
        }
    }
    static cancelClick(touchId) {
        for (let j = 0; j < 5; j++) {
            let touch = _touches[j];
            if (touch.touchId == touchId)
                touch.clickCancelled = true;
        }
    }
    static update() {
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
    static hitTest(x, y, forTouch) {
        return hitTest(x, y, forTouch);
    }
    static setFocus(obj) {
        setFocus(obj);
    }
}
Stage.eventDispatcher = new EventDispatcher();
var hit_tmp = new Vector3();
var hit_tmp2 = new Vector2();
class HitTestContext {
    constructor() {
        this.screenPt = new Vector3();
    }
    get camera() {
        return this._camera;
    }
    set camera(value) {
        this._camera = value;
        this._ray = this._camera["$hitTestRay"];
        if (!this._ray)
            this._camera["$hitTestRay"] = this._ray = { origin: new Vector3(), direction: new Vector3() };
        screenToWorld(this._camera, this.screenPt.x, this.screenPt.y, this._ray.origin, this._ray.direction);
    }
    get ray() {
        return this._ray;
    }
    set ray(value) {
        this._ray = value;
    }
    getLocal(obj) {
        hit_tmp.copy(this._ray.origin);
        obj.worldToLocal(hit_tmp, this._ray.direction);
        hit_tmp2.set(hit_tmp.x, hit_tmp.y);
        return hit_tmp2;
    }
}
const clickTestThreshold = 10;
var _renderer;
var _camera;
var _scene;
var _touches;
var _touchTarget;
var _touchPos;
var _touchCount;
var _rollOverChain = [];
var _rollOutChain = [];
var _hitTestContext = new HitTestContext();
var _canvas;
var _width;
var _height;
var _canvasTransform = new Matrix4();
var _touchscreen;
var _devicePixelRatio = 1;
var _screenMode = "none";
function init(renderer, parameters) {
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
    let offsetX = 0;
    let offsetY = 0;
    var element = _canvas;
    var style = element.style;
    if (style.paddingTop)
        offsetY += parseInt(style.paddingTop, 10);
    if (style.paddingLeft)
        offsetX += parseInt(style.paddingTop, 10);
    do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
        style = element.style;
        if (style.borderLeftWidth)
            offsetX += parseInt(style.borderLeftWidth, 10);
        if (style.borderTopWidth)
            offsetY += parseInt(style.borderTopWidth, 10);
    } while (element = element.offsetParent);
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
function onWindowResize(evt) {
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
function handleMouse(ev, type) {
    if (!activeTextInput || !activeTextInput.stage)
        ev.preventDefault();
    s_v3.set(ev.pageX, ev.pageY, 0);
    s_v3.applyMatrix4(_canvasTransform);
    _touchPos.set(s_v3.x, s_v3.y);
    let touch = _touches[0];
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
function handleWheel(ev) {
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
function getTouch(touchId) {
    for (let j = 0; j < 5; j++) {
        let touch = _touches[j];
        if (touchId == -1 && touch.touchId != -1
            || touchId != -1 && touch.touchId == touchId)
            return touch;
    }
    return null;
}
function handleTouch(ev, type) {
    if (!activeTextInput || !activeTextInput.stage)
        ev.preventDefault();
    let touches = ev.changedTouches;
    for (let i = 0; i < touches.length; ++i) {
        let uTouch = touches[i];
        s_v3.set(uTouch.pageX, uTouch.pageY, 0);
        s_v3.applyMatrix4(_canvasTransform);
        _touchPos.set(s_v3.x, s_v3.y);
        let touch;
        let free;
        for (let j = 0; j < 5; j++) {
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
function handleRollOver(touch) {
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
    let cnt = _rollOutChain.length;
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
    }
}
function hitTest(x, y, forTouch) {
    if (!_hitTestContext)
        _hitTestContext = new HitTestContext();
    Stage.disableMatrixValidation = true;
    _hitTestContext.screenPt.set(x, y, 0);
    _hitTestContext.camera = _camera;
    _hitTestContext.forTouch = forTouch != null ? forTouch : true;
    let ret = traverseHitTest(_scene, _hitTestContext);
    Stage.disableMatrixValidation = false;
    return ret;
}
var activeTextInput;
function setFocus(obj) {
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
var s_v3 = new Vector3();
function screenToWorld(camera, x, y, outPt, outDir) {
    outPt.set((x / _width) * 2 - 1, -(y / _height) * 2 + 1, 0);
    outPt.unproject(camera);
    if (camera["isPerspectiveCamera"]) {
        s_v3.setFromMatrixPosition(camera.matrixWorld);
        outDir.copy(outPt).sub(s_v3).normalize();
        outDir.multiplyScalar(-1);
    }
    else
        outDir.set(0, 0, 1);
}
function worldToScreen(camera, input, output) {
    s_v3.copy(input);
    s_v3.project(camera);
    output.set((s_v3.x + 1) / 2 * _width, (1 - s_v3.y) / 2 * _height);
}
function setLastInput(touch) {
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
    constructor() {
        this.downTargets = new Array();
        this.touchMonitors = new Array();
        this.reset();
    }
    reset() {
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
    begin() {
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
    move() {
        if (this.began)
            this.holdTime = (Timers.frameCount - this.downFrame) == 1 ? (1 / 60) : (performance.now() - this.downTime);
        setLastInput(this);
        if (Math.abs(this.x - this.downX) > 50 || Math.abs(this.y - this.downY) > 50)
            this.clickCancelled = true;
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
    end() {
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
    clickTest() {
        if (this.clickCancelled) {
            this.downTargets.length = 0;
            return null;
        }
        let obj = this.downTargets[0];
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
function broadcastEvent(p, type, data) {
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
function bubbleEvent(p, type, data, addChain) {
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

class DisplayObject extends EventDispatcher {
    constructor() {
        super();
        this._obj3D = new Object3D();
        this._obj3D["isGroup"] = true;
        this._obj3D["$owner"] = this;
        this._obj3D.layers.set(UILayer);
        this._pos = this._obj3D.position;
        this._rot = this._obj3D.rotation;
        this._pivot = new Vector2();
        this._pivotOffset = new Vector3();
        this._contentRect = new Rect();
        this._alpha = 1;
        this._touchable = true;
    }
    get obj3D() {
        return this._obj3D;
    }
    get name() {
        return this._obj3D.name;
    }
    set name(value) {
        this._obj3D.name = value;
    }
    get x() {
        return this._pos.x;
    }
    set x(value) {
        this.setPosition(value, -this._pos.y, this._pos.z);
    }
    get y() {
        return -this._pos.y;
    }
    set y(value) {
        this.setPosition(this._pos.x, value, this._pos.z);
    }
    get z() {
        return this._pos.z;
    }
    set z(value) {
        this.setPosition(this._pos.x, -this._pos.y, value);
    }
    setPosition(x, y, z, isPivot) {
        z = z || 0;
        if (isPivot) {
            x -= this._pivotOffset.x;
            y += this._pivotOffset.y;
            z -= this._pivotOffset.z;
        }
        this._matrixDirty = true;
        this._pos.set(x, -y, z);
    }
    get width() {
        this.ensureSizeCorrect();
        return this._contentRect.width;
    }
    set width(value) {
        if (this._contentRect.width != value) {
            this._contentRect.width = value;
            this.onSizeChanged();
        }
    }
    get height() {
        this.ensureSizeCorrect();
        return this._contentRect.height;
    }
    set height(value) {
        if (this._contentRect.height != value) {
            this._contentRect.height = value;
            this.onSizeChanged();
        }
    }
    setSize(wv, hv) {
        if (wv != this._contentRect.width || hv != this._contentRect.height) {
            this._contentRect.width = wv;
            this._contentRect.height = hv;
            this.onSizeChanged();
        }
    }
    ensureSizeCorrect() {
    }
    onSizeChanged() {
        this.applyPivot();
        if (this._graphics)
            this._graphics.setDrawRect(this._contentRect);
    }
    get pivotX() {
        return this._pivot.x;
    }
    set pivotX(value) {
        this.setPivot(value, this._pivot.y);
    }
    get pivotY() {
        return this._pivot.y;
    }
    set pivotY(value) {
        this.setPosition(this._pivot.x, value);
    }
    setPivot(xv, yv) {
        if (this._pivot.x != xv || this._pivot.y != yv) {
            let dpx = (xv - this._pivot.x) * this._contentRect.width;
            let dpy = (this._pivot.y - yv) * this._contentRect.height;
            s_v3$1.copy(this._pivotOffset);
            this._pivot.set(xv, yv);
            this.updatePivotOffset();
            this._pos.x += s_v3$1.x - this._pivotOffset.x + dpx;
            this._pos.y += s_v3$1.y - this._pivotOffset.y + dpy;
            this._pos.y += s_v3$1.z - this._pivotOffset.z;
            this._matrixDirty = true;
        }
    }
    updatePivotOffset() {
        let px = this._pivot.x * this._contentRect.width;
        let py = this._pivot.y * this._contentRect.height;
        s_quaternion.setFromEuler(this._rot);
        s_mat.compose(s_v3_2, s_quaternion, this._obj3D.scale);
        this._pivotOffset.set(px, -py, 0);
        this._pivotOffset.applyMatrix4(s_mat);
    }
    applyPivot() {
        if (this._pivot.x != 0 || this._pivot.y != 0) {
            s_v3$1.copy(this._pivotOffset);
            this.updatePivotOffset();
            this._pos.x += s_v3$1.x - this._pivotOffset.x;
            this._pos.y += s_v3$1.y - this._pivotOffset.y;
            this._matrixDirty = true;
        }
    }
    get scaleX() {
        return this._obj3D.scale.x;
    }
    set scaleX(value) {
        this.setScale(value, this._obj3D.scale.y);
    }
    get scaleY() {
        return this._obj3D.scale.y;
    }
    set scaleY(value) {
        this.setScale(this._obj3D.scale.x, value);
    }
    setScale(xv, yv) {
        this._obj3D.scale.set(xv, yv, xv);
        this.applyPivot();
        this._matrixDirty = true;
    }
    get rotationX() {
        return this._rot.x * 180 / Math.PI;
    }
    set rotationX(value) {
        this._rot.x = value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
    }
    get rotationY() {
        return this._rot.y * 180 / Math.PI;
    }
    set rotationY(value) {
        this._rot.y = value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
    }
    get rotation() {
        return -this._rot.z * 180 / Math.PI;
    }
    set rotation(value) {
        this._rot.z = -value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
    }
    get parent() {
        return this._obj3D.parent;
    }
    get stage() {
        let t = this._obj3D;
        while (t.parent)
            t = t.parent;
        return t["isScene"];
    }
    get graphics() {
        return this._graphics;
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = value;
    }
    get touchable() {
        return this._touchable;
    }
    set touchable(value) {
        this._touchable = value;
    }
    get visible() {
        return this._obj3D.visible;
    }
    set visible(value) {
        this._obj3D.visible = value;
    }
    get color() {
        return this._graphics ? this._graphics.color : 0;
    }
    set color(value) {
        if (this._graphics)
            this._graphics.color = value;
    }
    get blendMode() {
        return this._graphics ? this._graphics.material.blending : NormalBlending;
    }
    set blendMode(value) {
        if (this._graphics)
            this._graphics.material.blending = value;
    }
    setLayer(layer) {
        this._obj3D.traverse(obj => obj.layers.set(layer));
    }
    validateMatrix() {
        this._obj3D.traverseAncestors(e => {
            let dobj = e["$owner"];
            if (dobj && dobj._matrixDirty) {
                dobj._matrixDirty = false;
                dobj._obj3D.updateMatrixWorld(true);
            }
        });
        if (this._matrixDirty) {
            this._matrixDirty = false;
            this._obj3D.updateMatrixWorld(true);
        }
    }
    _getRenderCamera() {
        let p = this._obj3D;
        while (p) {
            let dobj = p["$owner"];
            if (dobj && dobj.camera)
                return dobj.camera;
            p = p.parent;
        }
        return Stage.camera;
    }
    worldToLocal(pt, direction, validate) {
        if (validate)
            this.validateMatrix();
        pt = this._obj3D.worldToLocal(pt);
        if (pt.z != 0) {
            s_dir.copy(direction || s_forward);
            s_dir.applyQuaternion(this._obj3D.getWorldQuaternion(s_quaternion).inverse()).normalize();
            let distOnLine = -pt.dot(s_forward) / s_dir.dot(s_forward);
            pt.add(s_dir.multiplyScalar(distOnLine));
        }
        pt.y = -pt.y;
        return pt;
    }
    localToWorld(pt, validate) {
        if (validate)
            this.validateMatrix();
        pt.y = -pt.y;
        pt = this._obj3D.localToWorld(pt);
        return pt;
    }
    globalToLocal(x, y, result) {
        if (!Stage.disableMatrixValidation)
            this.validateMatrix();
        screenToWorld(this._getRenderCamera(), x, y, s_v3$1, s_dir);
        this.worldToLocal(s_v3$1, s_dir);
        if (!result)
            result = new Vector2();
        result.set(s_v3$1.x, s_v3$1.y);
        return result;
    }
    localToGlobal(x, y, result) {
        if (!Stage.disableMatrixValidation)
            this.validateMatrix();
        s_v3$1.set(x, -y, 0);
        this._obj3D.localToWorld(s_v3$1);
        if (!result)
            result = new Vector2();
        worldToScreen(this._getRenderCamera(), s_v3$1, result);
        return result;
    }
    getBounds(targetSpace, result) {
        this.ensureSizeCorrect();
        if (!result)
            result = new Rect();
        if (targetSpace == this._obj3D) // optimization
            result.copy(this._contentRect);
        else if (targetSpace == this._obj3D.parent && this._rot.z == 0)
            result.set(this._pos.x, -this._pos.y, this._contentRect.width * this._obj3D.scale.x, this._contentRect.height * this._obj3D.scale.y);
        else
            result = this.transformRect(this._contentRect, targetSpace, result);
        return result;
    }
    transformPoint(x, y, targetSpace, result) {
        if (!result)
            result = new Vector2();
        if (targetSpace == this._obj3D)
            result.set(x, y);
        else {
            if (!Stage.disableMatrixValidation)
                this.validateMatrix();
            s_v3$1.set(x, -y, 0);
            this._obj3D.localToWorld(s_v3$1);
            if (targetSpace)
                targetSpace.worldToLocal(s_v3$1);
            result.set(s_v3$1.x, -s_v3$1.y);
        }
        return result;
    }
    transformRect(rect, targetSpace, result) {
        if (!result)
            result = new Rect();
        if (targetSpace == this._obj3D) {
            result.copy(rect);
            return result;
        }
        if (targetSpace && targetSpace == this._obj3D.parent && this._rot.z == 0) {
            let scale = this._obj3D.scale;
            result.set((this._pos.x + rect.x) * scale.x, (this.y + rect.y) * scale.y, rect.width * scale.x, rect.height * scale.y);
        }
        else {
            s_v4.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
            if (!Stage.disableMatrixValidation)
                this.validateMatrix();
            this.transformRectPoint(rect.x, rect.y, targetSpace);
            this.transformRectPoint(rect.xMax, rect.y, targetSpace);
            this.transformRectPoint(rect.x, rect.yMax, targetSpace);
            this.transformRectPoint(rect.xMax, rect.yMax, targetSpace);
            result.setMinMax(s_v4.x, s_v4.y, s_v4.z, s_v4.w);
        }
        return result;
    }
    transformRectPoint(x, y, targetSpace) {
        s_v3$1.set(x, y, 0);
        this.localToWorld(s_v3$1);
        if (targetSpace)
            targetSpace.worldToLocal(s_v3$1);
        if (s_v4.x > s_v3$1.x)
            s_v4.x = s_v3$1.x;
        if (s_v4.z < s_v3$1.x)
            s_v4.z = s_v3$1.x;
        if (s_v4.y > s_v3$1.y)
            s_v4.y = s_v3$1.y;
        if (s_v4.w < s_v3$1.y)
            s_v4.w = s_v3$1.y;
    }
    addChild(child) {
        this.addChildAt(child, Number.POSITIVE_INFINITY);
    }
    addChildAt(child, index) {
        if (child._obj3D.parent) {
            let i = child._obj3D.parent.children.indexOf(child._obj3D);
            child._obj3D.parent.children.splice(i, 1);
        }
        if (index >= this._obj3D.children.length)
            this._obj3D.children.push(child._obj3D);
        else
            this._obj3D.children.splice(index, 0, child._obj3D);
        child._obj3D.parent = this._obj3D;
        child._obj3D.layers.mask = this._obj3D.layers.mask;
        if (this.stage)
            broadcastEvent(child.obj3D, "added_to_stage");
    }
    removeChild(child) {
        let index = this._obj3D.children.indexOf(child._obj3D);
        if (index == -1)
            throw 'not a child';
        this.removeChildAt(index);
    }
    removeChildAt(index) {
        let child = this._obj3D.children[index];
        if (this.stage)
            broadcastEvent(child, "removed_from_stage");
        this._obj3D.children.splice(index, 1);
        child.parent = null;
    }
    setChildIndex(child, index) {
        let oldIndex = this._obj3D.children.indexOf(child._obj3D);
        if (oldIndex == index)
            return;
        if (oldIndex == -1)
            throw 'Not a child';
        this._obj3D.children.splice(oldIndex, 1);
        if (index >= this._obj3D.children.length)
            this._obj3D.children.push(child._obj3D);
        else
            this._obj3D.children.splice(index, 0, child._obj3D);
    }
    getIndex(child) {
        return this._obj3D.children.indexOf(child._obj3D);
    }
    get numChildren() {
        return this._obj3D.children.length;
    }
    get clipRect() {
        return this._clipRect;
    }
    set clipRect(value) {
        this._clipRect = value;
    }
    update(clipPlanes, alpha) {
        if (this._clipRect) {
            this.transformRect(this._clipRect, null, s_rect);
            if (clipPlanes) {
                s_rect2.setMinMax(-clipPlanes[0].constant, -clipPlanes[3].constant, clipPlanes[1].constant, clipPlanes[2].constant);
                s_rect.intersection(s_rect2);
            }
            if (!this._clipPlanes) {
                this._clipPlanes = [
                    new Plane(new Vector3(1, 0, 0)),
                    new Plane(new Vector3(-1, 0, 0)),
                    new Plane(new Vector3(0, -1, 0)),
                    new Plane(new Vector3(0, 1, 0))
                ];
            }
            clipPlanes = this._clipPlanes;
            clipPlanes[0].constant = -s_rect.x;
            clipPlanes[1].constant = s_rect.xMax;
            clipPlanes[2].constant = s_rect.yMax;
            clipPlanes[3].constant = -s_rect.y;
        }
        if (this._graphics)
            this._graphics.update(clipPlanes, this._alpha * alpha);
    }
    hitTest(context) {
        if (this._obj3D.scale.x == 0 || this._obj3D.scale.y == 0)
            return null;
        let backupRay;
        if (this.camera) {
            backupRay = context.ray;
            context.camera = this.camera;
        }
        let target;
        let pt = context.getLocal(this);
        let lx = pt.x;
        let ly = pt.y;
        if (this.hitArea) {
            if (!this.hitArea.hitTest(this._contentRect, lx, ly))
                return null;
        }
        else {
            if (this._clipRect && !this._clipRect.contains(lx, ly))
                return null;
        }
        if (this.mask) {
            let tmp = this.mask.visible ? this.mask.hitTest(context) : null;
            if (!this.reversedMask && !tmp || this.reversedMask && tmp)
                return null;
        }
        target = traverseHitTest(this._obj3D, context, this.mask);
        if (!target && this.opaque && (this.hitArea || this._contentRect.contains(lx, ly)))
            target = this;
        if (backupRay)
            context.ray = backupRay;
        return target;
    }
    dispose() {
    }
}
var s_v3$1 = new Vector3();
var s_v3_2 = new Vector3();
var s_v4 = new Vector4();
var s_rect = new Rect();
var s_rect2 = new Rect();
var s_mat = new Matrix4();
var s_quaternion = new Quaternion();
var s_dir = new Vector3();
const s_forward = new Vector3(0, 0, 1);
function traverseUpdate(p, clippingPlanes, alpha) {
    let children = p.children;
    let cnt = children.length;
    let dobj = p["$owner"];
    if (dobj) {
        if (dobj._clipRect)
            clippingPlanes = dobj._clipPlanes;
        alpha *= dobj.alpha;
    }
    for (let i = 0; i < cnt; i++) {
        let child = children[i];
        dobj = child["$owner"];
        if (dobj)
            dobj.update(clippingPlanes, alpha);
        if (child.children.length > 0)
            traverseUpdate(child, clippingPlanes, alpha);
    }
}
function traverseHitTest(p, context, mask) {
    let count = p.children.length;
    for (let i = count - 1; i >= 0; --i) // front to back!
     {
        let child = p.children[i];
        if (!child.visible)
            continue;
        let dobj = child["$owner"];
        if (dobj) {
            if (dobj == mask || dobj._touchDisabled)
                continue;
            if (!context.forTouch || dobj._touchable) {
                let target = dobj.hitTest(context);
                if (target)
                    return target;
            }
        }
        if (child.children.length > 0) {
            let target = traverseHitTest(child, context);
            if (target)
                return target;
        }
    }
}

var EaseType;
(function (EaseType) {
    EaseType[EaseType["Linear"] = 0] = "Linear";
    EaseType[EaseType["SineIn"] = 1] = "SineIn";
    EaseType[EaseType["SineOut"] = 2] = "SineOut";
    EaseType[EaseType["SineInOut"] = 3] = "SineInOut";
    EaseType[EaseType["QuadIn"] = 4] = "QuadIn";
    EaseType[EaseType["QuadOut"] = 5] = "QuadOut";
    EaseType[EaseType["QuadInOut"] = 6] = "QuadInOut";
    EaseType[EaseType["CubicIn"] = 7] = "CubicIn";
    EaseType[EaseType["CubicOut"] = 8] = "CubicOut";
    EaseType[EaseType["CubicInOut"] = 9] = "CubicInOut";
    EaseType[EaseType["QuartIn"] = 10] = "QuartIn";
    EaseType[EaseType["QuartOut"] = 11] = "QuartOut";
    EaseType[EaseType["QuartInOut"] = 12] = "QuartInOut";
    EaseType[EaseType["QuintIn"] = 13] = "QuintIn";
    EaseType[EaseType["QuintOut"] = 14] = "QuintOut";
    EaseType[EaseType["QuintInOut"] = 15] = "QuintInOut";
    EaseType[EaseType["ExpoIn"] = 16] = "ExpoIn";
    EaseType[EaseType["ExpoOut"] = 17] = "ExpoOut";
    EaseType[EaseType["ExpoInOut"] = 18] = "ExpoInOut";
    EaseType[EaseType["CircIn"] = 19] = "CircIn";
    EaseType[EaseType["CircOut"] = 20] = "CircOut";
    EaseType[EaseType["CircInOut"] = 21] = "CircInOut";
    EaseType[EaseType["ElasticIn"] = 22] = "ElasticIn";
    EaseType[EaseType["ElasticOut"] = 23] = "ElasticOut";
    EaseType[EaseType["ElasticInOut"] = 24] = "ElasticInOut";
    EaseType[EaseType["BackIn"] = 25] = "BackIn";
    EaseType[EaseType["BackOut"] = 26] = "BackOut";
    EaseType[EaseType["BackInOut"] = 27] = "BackInOut";
    EaseType[EaseType["BounceIn"] = 28] = "BounceIn";
    EaseType[EaseType["BounceOut"] = 29] = "BounceOut";
    EaseType[EaseType["BounceInOut"] = 30] = "BounceInOut";
    EaseType[EaseType["Custom"] = 31] = "Custom";
})(EaseType || (EaseType = {}));

class GearBase {
    dispose() {
        if (this._tweenConfig && this._tweenConfig._tweener) {
            this._tweenConfig._tweener.kill();
            this._tweenConfig._tweener = null;
        }
    }
    get controller() {
        return this._controller;
    }
    set controller(val) {
        if (val != this._controller) {
            this._controller = val;
            if (this._controller)
                this.init();
        }
    }
    get tweenConfig() {
        if (!this._tweenConfig)
            this._tweenConfig = new GearTweenConfig();
        return this._tweenConfig;
    }
    get allowTween() {
        return this._tweenConfig && this._tweenConfig.tween && constructingDepth.n == 0 && !GearBase.disableAllTweenEffect;
    }
    setup(buffer) {
        this._controller = this._owner.parent.getControllerAt(buffer.readShort());
        this.init();
        var i;
        var page;
        var cnt = buffer.readShort();
        if ("pages" in this) {
            this.pages = buffer.readSArray(cnt);
        }
        else {
            for (i = 0; i < cnt; i++) {
                page = buffer.readS();
                if (page == null)
                    continue;
                this.addStatus(page, buffer);
            }
            if (buffer.readBool())
                this.addStatus(null, buffer);
        }
        if (buffer.readBool()) {
            this._tweenConfig = new GearTweenConfig();
            this._tweenConfig.easeType = buffer.readByte();
            this._tweenConfig.duration = buffer.readFloat();
            this._tweenConfig.delay = buffer.readFloat();
        }
        if (buffer.version >= 2) {
            if ("positionsInPercent" in this) {
                if (buffer.readBool()) {
                    this.positionsInPercent = true;
                    for (i = 0; i < cnt; i++) {
                        page = buffer.readS();
                        if (page == null)
                            continue;
                        this.addExtStatus(page, buffer);
                    }
                    if (buffer.readBool())
                        this.addExtStatus(null, buffer);
                }
            }
            else if ("condition" in this)
                this.condition = buffer.readByte();
        }
    }
    updateFromRelations(dx, dy) {
    }
    addStatus(pageId, buffer) {
    }
    init() {
    }
    apply() {
    }
    updateState() {
    }
}
class GearTweenConfig {
    constructor() {
        this.tween = true;
        this.easeType = EaseType.QuadOut;
        this.duration = 0.3;
        this.delay = 0;
    }
}

class GearAnimation extends GearBase {
    init() {
        this._default = {
            playing: this._owner.getProp(ObjectPropID.Playing),
            frame: this._owner.getProp(ObjectPropID.Frame)
        };
        this._storage = {};
    }
    addStatus(pageId, buffer) {
        var gv;
        if (!pageId)
            gv = this._default;
        else {
            gv = {};
            this._storage[pageId] = gv;
        }
        gv.playing = buffer.readBool();
        gv.frame = buffer.readInt();
    }
    apply() {
        this._owner._gearLocked = true;
        var gv = this._storage[this._controller.selectedPageId] || this._default;
        this._owner.setProp(ObjectPropID.Playing, gv.playing);
        this._owner.setProp(ObjectPropID.Frame, gv.frame);
        this._owner._gearLocked = false;
    }
    updateState() {
        var gv = this._storage[this._controller.selectedPageId];
        if (!gv) {
            gv = {};
            this._storage[this._controller.selectedPageId] = gv;
        }
        gv.playing = this._owner.getProp(ObjectPropID.Playing);
        gv.frame = this._owner.getProp(ObjectPropID.Frame);
    }
}

class GearColor extends GearBase {
    init() {
        this._default = {
            color: this._owner.getProp(ObjectPropID.Color),
            strokeColor: this._owner.getProp(ObjectPropID.OutlineColor)
        };
        this._storage = {};
    }
    addStatus(pageId, buffer) {
        var gv;
        if (!pageId)
            gv = this._default;
        else {
            gv = {};
            this._storage[pageId] = gv;
        }
        gv.color = buffer.readColor();
        gv.strokeColor = buffer.readColor();
    }
    apply() {
        this._owner._gearLocked = true;
        var gv = this._storage[this._controller.selectedPageId] || this._default;
        this._owner.setProp(ObjectPropID.Color, gv.color);
        this._owner.setProp(ObjectPropID.OutlineColor, gv.strokeColor);
        this._owner._gearLocked = false;
    }
    updateState() {
        var gv = this._storage[this._controller.selectedPageId];
        if (!gv) {
            gv = {};
            this._storage[this._controller.selectedPageId] = gv;
        }
        gv.color = this._owner.getProp(ObjectPropID.Color);
        gv.strokeColor = this._owner.getProp(ObjectPropID.OutlineColor);
    }
}

class GearDisplay extends GearBase {
    constructor() {
        super(...arguments);
        this.pages = null;
        this._visible = 0;
        this._displayLockToken = 1;
    }
    init() {
        this.pages = null;
    }
    addLock() {
        this._visible++;
        return this._displayLockToken;
    }
    releaseLock(token) {
        if (token == this._displayLockToken)
            this._visible--;
    }
    get connected() {
        return this._controller == null || this._visible > 0;
    }
    apply() {
        this._displayLockToken++;
        if (this._displayLockToken <= 0)
            this._displayLockToken = 1;
        if (this.pages == null || this.pages.length == 0
            || this.pages.indexOf(this._controller.selectedPageId) != -1)
            this._visible = 1;
        else
            this._visible = 0;
    }
}

class GearDisplay2 extends GearBase {
    constructor() {
        super(...arguments);
        this.pages = null;
        this.condition = 0;
        this._visible = 0;
    }
    init() {
        this.pages = null;
    }
    apply() {
        if (this.pages == null || this.pages.length == 0
            || this.pages.indexOf(this._controller.selectedPageId) != -1)
            this._visible = 1;
        else
            this._visible = 0;
    }
    evaluate(connected) {
        var v = this._controller == null || this._visible > 0;
        if (this.condition == 0)
            v = v && connected;
        else
            v = v || connected;
        return v;
    }
}

class GearFontSize extends GearBase {
    constructor() {
        super(...arguments);
        this._default = 0;
    }
    init() {
        this._default = this._owner.getProp(ObjectPropID.FontSize);
        this._storage = {};
    }
    addStatus(pageId, buffer) {
        if (!pageId)
            this._default = buffer.readInt();
        else
            this._storage[pageId] = buffer.readInt();
    }
    apply() {
        this._owner._gearLocked = true;
        var data = this._storage[this._controller.selectedPageId];
        if (data !== undefined)
            this._owner.setProp(ObjectPropID.FontSize, data);
        else
            this._owner.setProp(ObjectPropID.FontSize, this._default);
        this._owner._gearLocked = false;
    }
    updateState() {
        this._storage[this._controller.selectedPageId] = this._owner.getProp(ObjectPropID.FontSize);
    }
}

class GearIcon extends GearBase {
    init() {
        this._default = this._owner.icon;
        this._storage = {};
    }
    addStatus(pageId, buffer) {
        if (!pageId)
            this._default = buffer.readS();
        else
            this._storage[pageId] = buffer.readS();
    }
    apply() {
        this._owner._gearLocked = true;
        var data = this._storage[this._controller.selectedPageId];
        if (data !== undefined)
            this._owner.icon = data;
        else
            this._owner.icon = this._default;
        this._owner._gearLocked = false;
    }
    updateState() {
        this._storage[this._controller.selectedPageId] = this._owner.icon;
    }
}

class TweenValue {
    constructor() {
        this.x = this.y = this.z = this.w = 0;
    }
    get color() {
        return (this.w << 24) + (this.x << 16) + (this.y << 8) + this.z;
    }
    set color(value) {
        this.x = (value & 0xFF0000) >> 16;
        this.y = (value & 0x00FF00) >> 8;
        this.z = (value & 0x0000FF);
        this.w = (value & 0xFF000000) >> 24;
    }
    getField(index) {
        switch (index) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.w;
            default:
                throw new Error("Index out of bounds: " + index);
        }
    }
    setField(index, value) {
        switch (index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            case 3:
                this.w = value;
                break;
            default:
                throw new Error("Index out of bounds: " + index);
        }
    }
    setZero() {
        this.x = this.y = this.z = this.w = 0;
    }
}

// Author: Daniele Giardini - http://www.demigiant.com
const _PiOver2 = Math.PI * 0.5;
const _TwoPi = Math.PI * 2;
function evaluateEase(easeType, time, duration, overshootOrAmplitude, period) {
    switch (easeType) {
        case EaseType.Linear:
            return time / duration;
        case EaseType.SineIn:
            return -Math.cos(time / duration * _PiOver2) + 1;
        case EaseType.SineOut:
            return Math.sin(time / duration * _PiOver2);
        case EaseType.SineInOut:
            return -0.5 * (Math.cos(Math.PI * time / duration) - 1);
        case EaseType.QuadIn:
            return (time /= duration) * time;
        case EaseType.QuadOut:
            return -(time /= duration) * (time - 2);
        case EaseType.QuadInOut:
            if ((time /= duration * 0.5) < 1)
                return 0.5 * time * time;
            return -0.5 * ((--time) * (time - 2) - 1);
        case EaseType.CubicIn:
            return (time /= duration) * time * time;
        case EaseType.CubicOut:
            return ((time = time / duration - 1) * time * time + 1);
        case EaseType.CubicInOut:
            if ((time /= duration * 0.5) < 1)
                return 0.5 * time * time * time;
            return 0.5 * ((time -= 2) * time * time + 2);
        case EaseType.QuartIn:
            return (time /= duration) * time * time * time;
        case EaseType.QuartOut:
            return -((time = time / duration - 1) * time * time * time - 1);
        case EaseType.QuartInOut:
            if ((time /= duration * 0.5) < 1)
                return 0.5 * time * time * time * time;
            return -0.5 * ((time -= 2) * time * time * time - 2);
        case EaseType.QuintIn:
            return (time /= duration) * time * time * time * time;
        case EaseType.QuintOut:
            return ((time = time / duration - 1) * time * time * time * time + 1);
        case EaseType.QuintInOut:
            if ((time /= duration * 0.5) < 1)
                return 0.5 * time * time * time * time * time;
            return 0.5 * ((time -= 2) * time * time * time * time + 2);
        case EaseType.ExpoIn:
            return (time == 0) ? 0 : Math.pow(2, 10 * (time / duration - 1));
        case EaseType.ExpoOut:
            if (time == duration)
                return 1;
            return (-Math.pow(2, -10 * time / duration) + 1);
        case EaseType.ExpoInOut:
            if (time == 0)
                return 0;
            if (time == duration)
                return 1;
            if ((time /= duration * 0.5) < 1)
                return 0.5 * Math.pow(2, 10 * (time - 1));
            return 0.5 * (-Math.pow(2, -10 * --time) + 2);
        case EaseType.CircIn:
            return -(Math.sqrt(1 - (time /= duration) * time) - 1);
        case EaseType.CircOut:
            return Math.sqrt(1 - (time = time / duration - 1) * time);
        case EaseType.CircInOut:
            if ((time /= duration * 0.5) < 1)
                return -0.5 * (Math.sqrt(1 - time * time) - 1);
            return 0.5 * (Math.sqrt(1 - (time -= 2) * time) + 1);
        case EaseType.ElasticIn:
            var s0;
            if (time == 0)
                return 0;
            if ((time /= duration) == 1)
                return 1;
            if (period == 0)
                period = duration * 0.3;
            if (overshootOrAmplitude < 1) {
                overshootOrAmplitude = 1;
                s0 = period / 4;
            }
            else
                s0 = period / _TwoPi * Math.asin(1 / overshootOrAmplitude);
            return -(overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s0) * _TwoPi / period));
        case EaseType.ElasticOut:
            var s1;
            if (time == 0)
                return 0;
            if ((time /= duration) == 1)
                return 1;
            if (period == 0)
                period = duration * 0.3;
            if (overshootOrAmplitude < 1) {
                overshootOrAmplitude = 1;
                s1 = period / 4;
            }
            else
                s1 = period / _TwoPi * Math.asin(1 / overshootOrAmplitude);
            return (overshootOrAmplitude * Math.pow(2, -10 * time) * Math.sin((time * duration - s1) * _TwoPi / period) + 1);
        case EaseType.ElasticInOut:
            var s;
            if (time == 0)
                return 0;
            if ((time /= duration * 0.5) == 2)
                return 1;
            if (period == 0)
                period = duration * (0.3 * 1.5);
            if (overshootOrAmplitude < 1) {
                overshootOrAmplitude = 1;
                s = period / 4;
            }
            else
                s = period / _TwoPi * Math.asin(1 / overshootOrAmplitude);
            if (time < 1)
                return -0.5 * (overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s) * _TwoPi / period));
            return overshootOrAmplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - s) * _TwoPi / period) * 0.5 + 1;
        case EaseType.BackIn:
            return (time /= duration) * time * ((overshootOrAmplitude + 1) * time - overshootOrAmplitude);
        case EaseType.BackOut:
            return ((time = time / duration - 1) * time * ((overshootOrAmplitude + 1) * time + overshootOrAmplitude) + 1);
        case EaseType.BackInOut:
            if ((time /= duration * 0.5) < 1)
                return 0.5 * (time * time * (((overshootOrAmplitude *= (1.525)) + 1) * time - overshootOrAmplitude));
            return 0.5 * ((time -= 2) * time * (((overshootOrAmplitude *= (1.525)) + 1) * time + overshootOrAmplitude) + 2);
        case EaseType.BounceIn:
            return bounce_easeIn(time, duration);
        case EaseType.BounceOut:
            return bounce_easeOut(time, duration);
        case EaseType.BounceInOut:
            return bounce_easeInOut(time, duration);
        default:
            return -(time /= duration) * (time - 2);
    }
}
function bounce_easeIn(time, duration) {
    return 1 - bounce_easeOut(duration - time, duration);
}
function bounce_easeOut(time, duration) {
    if ((time /= duration) < (1 / 2.75)) {
        return (7.5625 * time * time);
    }
    if (time < (2 / 2.75)) {
        return (7.5625 * (time -= (1.5 / 2.75)) * time + 0.75);
    }
    if (time < (2.5 / 2.75)) {
        return (7.5625 * (time -= (2.25 / 2.75)) * time + 0.9375);
    }
    return (7.5625 * (time -= (2.625 / 2.75)) * time + 0.984375);
}
function bounce_easeInOut(time, duration) {
    if (time < duration * 0.5) {
        return bounce_easeIn(time * 2, duration) * 0.5;
    }
    return bounce_easeOut(time * 2 - duration, duration) * 0.5 + 0.5;
}

var s_vec2 = new Vector2();
class GTweener {
    constructor() {
        this._startValue = new TweenValue();
        this._endValue = new TweenValue();
        this._value = new TweenValue();
        this._deltaValue = new TweenValue();
        this._reset();
    }
    setDelay(value) {
        this._delay = value;
        return this;
    }
    get delay() {
        return this._delay;
    }
    setDuration(value) {
        this._duration = value;
        return this;
    }
    get duration() {
        return this._duration;
    }
    setBreakpoint(value) {
        this._breakpoint = value;
        return this;
    }
    setEase(value) {
        this._easeType = value;
        return this;
    }
    setEasePeriod(value) {
        this._easePeriod = value;
        return this;
    }
    setEaseOvershootOrAmplitude(value) {
        this._easeOvershootOrAmplitude = value;
        return this;
    }
    setRepeat(repeat, yoyo) {
        this._repeat = repeat;
        this._yoyo = yoyo;
        return this;
    }
    get repeat() {
        return this._repeat;
    }
    setTimeScale(value) {
        this._timeScale = value;
        return this;
    }
    setSnapping(value) {
        this._snapping = value;
        return this;
    }
    setTarget(value, propType) {
        this._target = value;
        this._propType = propType;
        return this;
    }
    get target() {
        return this._target;
    }
    setPath(value) {
        this._path = value;
        return this;
    }
    setUserData(value) {
        this._userData = value;
        return this;
    }
    get userData() {
        return this._userData;
    }
    onUpdate(callback, target) {
        this._onUpdate = callback;
        this._onUpdateCaller = target;
        return this;
    }
    onStart(callback, target) {
        this._onStart = callback;
        this._onStartCaller = target;
        return this;
    }
    onComplete(callback, target) {
        this._onComplete = callback;
        this._onCompleteCaller = target;
        return this;
    }
    get startValue() {
        return this._startValue;
    }
    get endValue() {
        return this._endValue;
    }
    get value() {
        return this._value;
    }
    get deltaValue() {
        return this._deltaValue;
    }
    get normalizedTime() {
        return this._normalizedTime;
    }
    get completed() {
        return this._ended != 0;
    }
    get allCompleted() {
        return this._ended == 1;
    }
    setPaused(paused) {
        this._paused = paused;
        return this;
    }
    /**
     * seek position of the tween, in seconds.
     */
    seek(time) {
        if (this._killed)
            return;
        this._elapsedTime = time;
        if (this._elapsedTime < this._delay) {
            if (this._started)
                this._elapsedTime = this._delay;
            else
                return;
        }
        this.update();
    }
    kill(complete) {
        if (this._killed)
            return;
        if (complete) {
            if (this._ended == 0) {
                if (this._breakpoint >= 0)
                    this._elapsedTime = this._delay + this._breakpoint;
                else if (this._repeat >= 0)
                    this._elapsedTime = this._delay + this._duration * (this._repeat + 1);
                else
                    this._elapsedTime = this._delay + this._duration * 2;
                this.update();
            }
            this.callCompleteCallback();
        }
        this._killed = true;
    }
    _to(start, end, duration) {
        this._valueSize = 1;
        this._startValue.x = start;
        this._endValue.x = end;
        this._value.x = start;
        this._duration = duration;
        return this;
    }
    _to2(start, start2, end, end2, duration) {
        this._valueSize = 2;
        this._startValue.x = start;
        this._endValue.x = end;
        this._startValue.y = start2;
        this._endValue.y = end2;
        this._value.x = start;
        this._value.y = start2;
        this._duration = duration;
        return this;
    }
    _to3(start, start2, start3, end, end2, end3, duration) {
        this._valueSize = 3;
        this._startValue.x = start;
        this._endValue.x = end;
        this._startValue.y = start2;
        this._endValue.y = end2;
        this._startValue.z = start3;
        this._endValue.z = end3;
        this._value.x = start;
        this._value.y = start2;
        this._value.z = start3;
        this._duration = duration;
        return this;
    }
    _to4(start, start2, start3, start4, end, end2, end3, end4, duration) {
        this._valueSize = 4;
        this._startValue.x = start;
        this._endValue.x = end;
        this._startValue.y = start2;
        this._endValue.y = end2;
        this._startValue.z = start3;
        this._endValue.z = end3;
        this._startValue.w = start4;
        this._endValue.w = end4;
        this._value.x = start;
        this._value.y = start2;
        this._value.z = start3;
        this._value.w = start4;
        this._duration = duration;
        return this;
    }
    _toColor(start, end, duration) {
        this._valueSize = 4;
        this._startValue.color = start;
        this._endValue.color = end;
        this._value.color = start;
        this._duration = duration;
        return this;
    }
    _shake(startX, startY, amplitude, duration) {
        this._valueSize = 5;
        this._startValue.x = startX;
        this._startValue.y = startY;
        this._startValue.w = amplitude;
        this._duration = duration;
        return this;
    }
    _init() {
        this._delay = 0;
        this._duration = 0;
        this._breakpoint = -1;
        this._easeType = EaseType.QuadOut;
        this._timeScale = 1;
        this._easePeriod = 0;
        this._easeOvershootOrAmplitude = 1.70158;
        this._snapping = false;
        this._repeat = 0;
        this._yoyo = false;
        this._valueSize = 0;
        this._started = false;
        this._paused = false;
        this._killed = false;
        this._elapsedTime = 0;
        this._normalizedTime = 0;
        this._ended = 0;
    }
    _reset() {
        this._target = null;
        this._propType = null;
        this._userData = null;
        this._path = null;
        this._onStart = this._onUpdate = this._onComplete = null;
        this._onStartCaller = this._onUpdateCaller = this._onCompleteCaller = null;
    }
    _update(dt) {
        if (this._timeScale != 1)
            dt *= this._timeScale;
        if (dt == 0)
            return;
        if (this._ended != 0) //Maybe completed by seek
         {
            this.callCompleteCallback();
            this._killed = true;
            return;
        }
        this._elapsedTime += dt;
        this.update();
        if (this._ended != 0) {
            if (!this._killed) {
                this.callCompleteCallback();
                this._killed = true;
            }
        }
    }
    update() {
        this._ended = 0;
        if (this._valueSize == 0) //DelayedCall
         {
            if (this._elapsedTime >= this._delay + this._duration)
                this._ended = 1;
            return;
        }
        if (!this._started) {
            if (this._elapsedTime < this._delay)
                return;
            this._started = true;
            this.callStartCallback();
            if (this._killed)
                return;
        }
        var reversed = false;
        var tt = this._elapsedTime - this._delay;
        if (this._breakpoint >= 0 && tt >= this._breakpoint) {
            tt = this._breakpoint;
            this._ended = 2;
        }
        if (this._repeat != 0) {
            var round = Math.floor(tt / this._duration);
            tt -= this._duration * round;
            if (this._yoyo)
                reversed = round % 2 == 1;
            if (this._repeat > 0 && this._repeat - round < 0) {
                if (this._yoyo)
                    reversed = this._repeat % 2 == 1;
                tt = this._duration;
                this._ended = 1;
            }
        }
        else if (tt >= this._duration) {
            tt = this._duration;
            this._ended = 1;
        }
        this._normalizedTime = evaluateEase(this._easeType, reversed ? (this._duration - tt) : tt, this._duration, this._easeOvershootOrAmplitude, this._easePeriod);
        this._value.setZero();
        this._deltaValue.setZero();
        if (this._valueSize == 5) {
            if (this._ended == 0) {
                var r = this._startValue.w * (1 - this._normalizedTime);
                var rx = r * (Math.random() > 0.5 ? 1 : -1);
                var ry = r * (Math.random() > 0.5 ? 1 : -1);
                this._deltaValue.x = rx;
                this._deltaValue.y = ry;
                this._value.x = this._startValue.x + rx;
                this._value.y = this._startValue.y + ry;
            }
            else {
                this._value.x = this._startValue.x;
                this._value.y = this._startValue.y;
            }
        }
        else if (this._path) {
            let pt = this._path.getPointAt(this._normalizedTime, s_vec2);
            if (this._snapping) {
                pt.x = Math.round(pt.x);
                pt.y = Math.round(pt.y);
            }
            this._deltaValue.x = pt.x - this._value.x;
            this._deltaValue.y = pt.y - this._value.y;
            this._value.x = pt.x;
            this._value.y = pt.y;
        }
        else {
            for (var i = 0; i < this._valueSize; i++) {
                var n1 = this._startValue.getField(i);
                var n2 = this._endValue.getField(i);
                var f = n1 + (n2 - n1) * this._normalizedTime;
                if (this._snapping)
                    f = Math.round(f);
                this._deltaValue.setField(i, f - this._value.getField(i));
                this._value.setField(i, f);
            }
        }
        if (this._target && this._propType) {
            if (this._propType instanceof Function) {
                switch (this._valueSize) {
                    case 1:
                        this._propType.call(this._target, this._value.x);
                        break;
                    case 2:
                        this._propType.call(this._target, this._value.x, this._value.y);
                        break;
                    case 3:
                        this._propType.call(this._target, this._value.x, this._value.y, this._value.z);
                        break;
                    case 4:
                        this._propType.call(this._target, this._value.x, this._value.y, this._value.z, this._value.w);
                        break;
                    case 5:
                        this._propType.call(this._target, this._value.color);
                        break;
                    case 6:
                        this._propType.call(this._target, this._value.x, this._value.y);
                        break;
                }
            }
            else {
                if (this._valueSize == 5)
                    this._target[this._propType] = this._value.color;
                else
                    this._target[this._propType] = this._value.x;
            }
        }
        this.callUpdateCallback();
    }
    callStartCallback() {
        if (this._onStart) {
            try {
                this._onStart.call(this._onStartCaller, this);
            }
            catch (err) {
                console.log("error in start callback > " + err);
            }
        }
    }
    callUpdateCallback() {
        if (this._onUpdate) {
            try {
                this._onUpdate.call(this._onUpdateCaller, this);
            }
            catch (err) {
                console.log("error in update callback > " + err);
            }
        }
    }
    callCompleteCallback() {
        if (this._onComplete) {
            try {
                this._onComplete.call(this._onCompleteCaller, this);
            }
            catch (err) {
                console.log("error in complete callback > " + err);
            }
        }
    }
}

class TweenManager {
    static createTween() {
        if (!_inited) {
            Timers.addUpdate(TweenManager.update);
            _inited = true;
        }
        var tweener = _tweenerPool.borrow();
        _activeTweens[_totalActiveTweens++] = tweener;
        return tweener;
    }
    static isTweening(target, propType) {
        if (target == null)
            return false;
        var anyType = !propType;
        for (var i = 0; i < _totalActiveTweens; i++) {
            var tweener = _activeTweens[i];
            if (tweener && tweener.target == target && !tweener._killed
                && (anyType || tweener._propType == propType))
                return true;
        }
        return false;
    }
    static killTweens(target, completed, propType) {
        if (target == null)
            return false;
        var flag = false;
        var cnt = _totalActiveTweens;
        var anyType = !propType;
        for (var i = 0; i < cnt; i++) {
            var tweener = _activeTweens[i];
            if (tweener && tweener.target == target && !tweener._killed
                && (anyType || tweener._propType == propType)) {
                tweener.kill(completed);
                flag = true;
            }
        }
        return flag;
    }
    static getTween(target, propType) {
        if (target == null)
            return null;
        var cnt = _totalActiveTweens;
        var anyType = !propType;
        for (var i = 0; i < cnt; i++) {
            var tweener = _activeTweens[i];
            if (tweener && tweener.target == target && !tweener._killed
                && (anyType || tweener._propType == propType)) {
                return tweener;
            }
        }
        return null;
    }
    static update() {
        var dt = Timers.deltaTime / 1000;
        var cnt = _totalActiveTweens;
        var freePosStart = -1;
        for (var i = 0; i < cnt; i++) {
            var tweener = _activeTweens[i];
            if (tweener == null) {
                if (freePosStart == -1)
                    freePosStart = i;
            }
            else if (tweener._killed) {
                _tweenerPool.returns(tweener);
                _activeTweens[i] = null;
                if (freePosStart == -1)
                    freePosStart = i;
            }
            else {
                if (tweener._target && ('isDisposed' in tweener._target) && tweener._target.isDisposed)
                    tweener._killed = true;
                else if (!tweener._paused)
                    tweener._update(dt);
                if (freePosStart != -1) {
                    _activeTweens[freePosStart] = tweener;
                    _activeTweens[i] = null;
                    freePosStart++;
                }
            }
        }
        if (freePosStart >= 0) {
            if (_totalActiveTweens != cnt) //new tweens added
             {
                var j = cnt;
                cnt = _totalActiveTweens - cnt;
                for (i = 0; i < cnt; i++)
                    _activeTweens[freePosStart++] = _activeTweens[j++];
            }
            _totalActiveTweens = freePosStart;
        }
    }
}
var _activeTweens = new Array();
var _tweenerPool = new Pool(GTweener, e => e._init(), e => e._reset());
var _totalActiveTweens = 0;
var _inited = false;

class GTween {
    static to(start, end, duration) {
        return TweenManager.createTween()._to(start, end, duration);
    }
    static to2(start, start2, end, end2, duration) {
        return TweenManager.createTween()._to2(start, start2, end, end2, duration);
    }
    static to3(start, start2, start3, end, end2, end3, duration) {
        return TweenManager.createTween()._to3(start, start2, start3, end, end2, end3, duration);
    }
    static to4(start, start2, start3, start4, end, end2, end3, end4, duration) {
        return TweenManager.createTween()._to4(start, start2, start3, start4, end, end2, end3, end4, duration);
    }
    static toColor(start, end, duration) {
        return TweenManager.createTween()._toColor(start, end, duration);
    }
    static delayedCall(delay) {
        return TweenManager.createTween().setDelay(delay);
    }
    static shake(startX, startY, amplitude, duration) {
        return TweenManager.createTween()._shake(startX, startY, amplitude, duration);
    }
    static isTweening(target, propType) {
        return TweenManager.isTweening(target, propType);
    }
    static kill(target, complete, propType) {
        TweenManager.killTweens(target, complete, propType);
    }
    static getTween(target, propType) {
        return TweenManager.getTween(target, propType);
    }
}
GTween.catchCallbackExceptions = true;

class GearLook extends GearBase {
    init() {
        this._default = {
            alpha: this._owner.alpha,
            rotation: this._owner.rotation,
            grayed: this._owner.grayed,
            touchable: this._owner.touchable
        };
        this._storage = {};
    }
    addStatus(pageId, buffer) {
        var gv;
        if (!pageId)
            gv = this._default;
        else {
            gv = {};
            this._storage[pageId] = gv;
        }
        gv.alpha = buffer.readFloat();
        gv.rotation = buffer.readFloat();
        gv.grayed = buffer.readBool();
        gv.touchable = buffer.readBool();
    }
    apply() {
        var gv = this._storage[this._controller.selectedPageId] || this._default;
        if (this.allowTween) {
            this._owner._gearLocked = true;
            this._owner.grayed = gv.grayed;
            this._owner.touchable = gv.touchable;
            this._owner._gearLocked = false;
            if (this._tweenConfig._tweener) {
                if (this._tweenConfig._tweener.endValue.x != gv.alpha || this._tweenConfig._tweener.endValue.y != gv.rotation) {
                    this._tweenConfig._tweener.kill(true);
                    this._tweenConfig._tweener = null;
                }
                else
                    return;
            }
            var a = gv.alpha != this._owner.alpha;
            var b = gv.rotation != this._owner.rotation;
            if (a || b) {
                if (this._owner.checkGearController(0, this._controller))
                    this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
                this._tweenConfig._tweener = GTween.to2(this._owner.alpha, this._owner.rotation, gv.alpha, gv.rotation, this._tweenConfig.duration)
                    .setDelay(this._tweenConfig.delay)
                    .setEase(this._tweenConfig.easeType)
                    .setUserData((a ? 1 : 0) + (b ? 2 : 0))
                    .setTarget(this)
                    .onUpdate(this.__tweenUpdate, this)
                    .onComplete(this.__tweenComplete, this);
            }
        }
        else {
            this._owner._gearLocked = true;
            this._owner.grayed = gv.grayed;
            this._owner.alpha = gv.alpha;
            this._owner.rotation = gv.rotation;
            this._owner.touchable = gv.touchable;
            this._owner._gearLocked = false;
        }
    }
    __tweenUpdate(tweener) {
        var flag = tweener.userData;
        this._owner._gearLocked = true;
        if ((flag & 1) != 0)
            this._owner.alpha = tweener.value.x;
        if ((flag & 2) != 0)
            this._owner.rotation = tweener.value.y;
        this._owner._gearLocked = false;
    }
    __tweenComplete() {
        if (this._tweenConfig._displayLockToken != 0) {
            this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
            this._tweenConfig._displayLockToken = 0;
        }
        this._tweenConfig._tweener = null;
    }
    updateState() {
        var gv = this._storage[this._controller.selectedPageId];
        if (!gv) {
            gv = {};
            this._storage[this._controller.selectedPageId] = gv;
        }
        gv.alpha = this._owner.alpha;
        gv.rotation = this._owner.rotation;
        gv.grayed = this._owner.grayed;
        gv.touchable = this._owner.touchable;
    }
}

class GearSize extends GearBase {
    init() {
        this._default = {
            width: this._owner.width,
            height: this._owner.height,
            scaleX: this._owner.scaleX,
            scaleY: this._owner.scaleY
        };
        this._storage = {};
    }
    addStatus(pageId, buffer) {
        var gv;
        if (!pageId)
            gv = this._default;
        else {
            gv = {};
            this._storage[pageId] = gv;
        }
        gv.width = buffer.readInt();
        gv.height = buffer.readInt();
        gv.scaleX = buffer.readFloat();
        gv.scaleY = buffer.readFloat();
    }
    apply() {
        var gv = this._storage[this._controller.selectedPageId] || this._default;
        if (this.allowTween) {
            if (this._tweenConfig._tweener) {
                if (this._tweenConfig._tweener.endValue.x != gv.width || this._tweenConfig._tweener.endValue.y != gv.height
                    || this._tweenConfig._tweener.endValue.z != gv.scaleX || this._tweenConfig._tweener.endValue.w != gv.scaleY) {
                    this._tweenConfig._tweener.kill(true);
                    this._tweenConfig._tweener = null;
                }
                else
                    return;
            }
            var a = gv.width != this._owner.width || gv.height != this._owner.height;
            var b = gv.scaleX != this._owner.scaleX || gv.scaleY != this._owner.scaleY;
            if (a || b) {
                if (this._owner.checkGearController(0, this._controller))
                    this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
                this._tweenConfig._tweener = GTween.to4(this._owner.width, this._owner.height, this._owner.scaleX, this._owner.scaleY, gv.width, gv.height, gv.scaleX, gv.scaleY, this._tweenConfig.duration)
                    .setDelay(this._tweenConfig.delay)
                    .setEase(this._tweenConfig.easeType)
                    .setUserData((a ? 1 : 0) + (b ? 2 : 0))
                    .setTarget(this)
                    .onUpdate(this.__tweenUpdate, this)
                    .onComplete(this.__tweenComplete, this);
            }
        }
        else {
            this._owner._gearLocked = true;
            this._owner.setSize(gv.width, gv.height, this._owner.checkGearController(1, this._controller));
            this._owner.setScale(gv.scaleX, gv.scaleY);
            this._owner._gearLocked = false;
        }
    }
    __tweenUpdate(tweener) {
        var flag = tweener.userData;
        this._owner._gearLocked = true;
        if ((flag & 1) != 0)
            this._owner.setSize(tweener.value.x, tweener.value.y, this._owner.checkGearController(1, this._controller));
        if ((flag & 2) != 0)
            this._owner.setScale(tweener.value.z, tweener.value.w);
        this._owner._gearLocked = false;
    }
    __tweenComplete() {
        if (this._tweenConfig._displayLockToken != 0) {
            this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
            this._tweenConfig._displayLockToken = 0;
        }
        this._tweenConfig._tweener = null;
    }
    updateState() {
        var gv = this._storage[this._controller.selectedPageId];
        if (!gv) {
            gv = {};
            this._storage[this._controller.selectedPageId] = gv;
        }
        gv.width = this._owner.width;
        gv.height = this._owner.height;
        gv.scaleX = this._owner.scaleX;
        gv.scaleY = this._owner.scaleY;
    }
    updateFromRelations(dx, dy) {
        if (this._controller == null || this._storage == null)
            return;
        for (var key in this._storage) {
            var gv = this._storage[key];
            gv.width += dx;
            gv.height += dy;
        }
        this._default.width += dx;
        this._default.height += dy;
        this.updateState();
    }
}

class GearText extends GearBase {
    init() {
        this._default = this._owner.text;
        this._storage = {};
    }
    addStatus(pageId, buffer) {
        if (pageId == null)
            this._default = buffer.readS();
        else
            this._storage[pageId] = buffer.readS();
    }
    apply() {
        this._owner._gearLocked = true;
        var data = this._storage[this._controller.selectedPageId];
        if (data !== undefined)
            this._owner.text = data;
        else
            this._owner.text = this._default;
        this._owner._gearLocked = false;
    }
    updateState() {
        this._storage[this._controller.selectedPageId] = this._owner.text;
    }
}

class GearXY extends GearBase {
    init() {
        this._default = {
            x: this._owner.x,
            y: this._owner.y,
            px: this._owner.x / this._owner.parent.width,
            py: this._owner.y / this._owner.parent.height
        };
        this._storage = {};
    }
    addStatus(pageId, buffer) {
        var gv;
        if (!pageId)
            gv = this._default;
        else {
            gv = {};
            this._storage[pageId] = gv;
        }
        gv.x = buffer.readInt();
        gv.y = buffer.readInt();
    }
    addExtStatus(pageId, buffer) {
        var gv;
        if (!pageId)
            gv = this._default;
        else
            gv = this._storage[pageId];
        gv.px = buffer.readFloat();
        gv.py = buffer.readFloat();
    }
    apply() {
        var pt = this._storage[this._controller.selectedPageId] || this._default;
        var ex;
        var ey;
        if (this.positionsInPercent && this._owner.parent) {
            ex = pt.px * this._owner.parent.width;
            ey = pt.py * this._owner.parent.height;
        }
        else {
            ex = pt.x;
            ey = pt.y;
        }
        if (this.allowTween) {
            if (this._tweenConfig._tweener) {
                if (this._tweenConfig._tweener.endValue.x != ex || this._tweenConfig._tweener.endValue.y != ey) {
                    this._tweenConfig._tweener.kill(true);
                    this._tweenConfig._tweener = null;
                }
                else
                    return;
            }
            var ox = this._owner.x;
            var oy = this._owner.y;
            if (ox != ex || oy != ey) {
                if (this._owner.checkGearController(0, this._controller))
                    this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
                this._tweenConfig._tweener = GTween.to2(ox, oy, ex, ey, this._tweenConfig.duration)
                    .setDelay(this._tweenConfig.delay)
                    .setEase(this._tweenConfig.easeType)
                    .setTarget(this)
                    .onUpdate(this.__tweenUpdate, this)
                    .onComplete(this.__tweenComplete, this);
            }
        }
        else {
            this._owner._gearLocked = true;
            this._owner.setPosition(ex, ey);
            this._owner._gearLocked = false;
        }
    }
    __tweenUpdate(tweener) {
        this._owner._gearLocked = true;
        this._owner.setPosition(tweener.value.x, tweener.value.y);
        this._owner._gearLocked = false;
    }
    __tweenComplete() {
        if (this._tweenConfig._displayLockToken != 0) {
            this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
            this._tweenConfig._displayLockToken = 0;
        }
        this._tweenConfig._tweener = null;
    }
    updateState() {
        var pt = this._storage[this._controller.selectedPageId];
        if (!pt) {
            pt = {};
            this._storage[this._controller.selectedPageId] = pt;
        }
        pt.x = this._owner.x;
        pt.y = this._owner.y;
        pt.px = this._owner.x / this._owner.parent.width;
        pt.py = this._owner.y / this._owner.parent.height;
    }
    updateFromRelations(dx, dy) {
        if (this._controller == null || this._storage == null || this.positionsInPercent)
            return;
        for (var key in this._storage) {
            var pt = this._storage[key];
            pt.x += dx;
            pt.y += dy;
        }
        this._default.x += dx;
        this._default.y += dy;
        this.updateState();
    }
}

class RelationItem {
    constructor(owner) {
        this._owner = owner;
        this._defs = new Array();
    }
    get owner() {
        return this._owner;
    }
    set target(value) {
        if (this._target != value) {
            if (this._target)
                this.releaseRefTarget();
            this._target = value;
            if (this._target)
                this.addRefTarget();
        }
    }
    get target() {
        return this._target;
    }
    add(relationType, usePercent) {
        if (relationType == RelationType.Size) {
            this.add(RelationType.Width, usePercent);
            this.add(RelationType.Height, usePercent);
            return;
        }
        var cnt = this._defs.length;
        for (var i = 0; i < cnt; i++) {
            if (this._defs[i].type == relationType)
                return;
        }
        this.internalAdd(relationType, usePercent);
    }
    internalAdd(relationType, usePercent) {
        if (relationType == RelationType.Size) {
            this.internalAdd(RelationType.Width, usePercent);
            this.internalAdd(RelationType.Height, usePercent);
            return;
        }
        var info = new RelationDef();
        info.percent = usePercent;
        info.type = relationType;
        info.axis = (relationType <= RelationType.Right_Right || relationType == RelationType.Width || relationType >= RelationType.LeftExt_Left && relationType <= RelationType.RightExt_Right) ? 0 : 1;
        this._defs.push(info);
    }
    remove(relationType) {
        if (relationType == RelationType.Size) {
            this.remove(RelationType.Width);
            this.remove(RelationType.Height);
            return;
        }
        var dc = this._defs.length;
        for (var k = 0; k < dc; k++) {
            if (this._defs[k].type == relationType) {
                this._defs.splice(k, 1);
                break;
            }
        }
    }
    copy(source) {
        this.target = source.target;
        this._defs.length = 0;
        var cnt = source._defs.length;
        for (var i = 0; i < cnt; i++) {
            var info = source._defs[i];
            var info2 = new RelationDef();
            info2.copy(info);
            this._defs.push(info2);
        }
    }
    dispose() {
        if (this._target) {
            this.releaseRefTarget();
            this._target = null;
        }
    }
    get isEmpty() {
        return this._defs.length == 0;
    }
    applyOnSelfResized(dWidth, dHeight, applyPivot) {
        var cnt = this._defs.length;
        if (cnt == 0)
            return;
        var ox = this._owner.x;
        var oy = this._owner.y;
        for (var i = 0; i < cnt; i++) {
            var info = this._defs[i];
            switch (info.type) {
                case RelationType.Center_Center:
                    this._owner.x -= (0.5 - (applyPivot ? this._owner.pivotX : 0)) * dWidth;
                    break;
                case RelationType.Right_Center:
                case RelationType.Right_Left:
                case RelationType.Right_Right:
                    this._owner.x -= (1 - (applyPivot ? this._owner.pivotX : 0)) * dWidth;
                    break;
                case RelationType.Middle_Middle:
                    this._owner.y -= (0.5 - (applyPivot ? this._owner.pivotY : 0)) * dHeight;
                    break;
                case RelationType.Bottom_Middle:
                case RelationType.Bottom_Top:
                case RelationType.Bottom_Bottom:
                    this._owner.y -= (1 - (applyPivot ? this._owner.pivotY : 0)) * dHeight;
                    break;
            }
        }
        if (ox != this._owner.x || oy != this._owner.y) {
            ox = this._owner.x - ox;
            oy = this._owner.y - oy;
            this._owner.updateGearFromRelations(1, ox, oy);
            if (this._owner.parent && this._owner.parent._transitions.length > 0) {
                cnt = this._owner.parent._transitions.length;
                for (var j = 0; j < cnt; j++) {
                    var trans = this._owner.parent._transitions[j];
                    trans.updateFromRelations(this._owner.id, ox, oy);
                }
            }
        }
    }
    applyOnXYChanged(info, dx, dy) {
        var tmp;
        switch (info.type) {
            case RelationType.Left_Left:
            case RelationType.Left_Center:
            case RelationType.Left_Right:
            case RelationType.Center_Center:
            case RelationType.Right_Left:
            case RelationType.Right_Center:
            case RelationType.Right_Right:
                this._owner.x += dx;
                break;
            case RelationType.Top_Top:
            case RelationType.Top_Middle:
            case RelationType.Top_Bottom:
            case RelationType.Middle_Middle:
            case RelationType.Bottom_Top:
            case RelationType.Bottom_Middle:
            case RelationType.Bottom_Bottom:
                this._owner.y += dy;
                break;
            case RelationType.Width:
            case RelationType.Height:
                break;
            case RelationType.LeftExt_Left:
            case RelationType.LeftExt_Right:
                if (this._owner != this._target.parent) {
                    tmp = this._owner.xMin;
                    this._owner.width = this._owner._rawWidth - dx;
                    this._owner.xMin = tmp + dx;
                }
                else
                    this._owner.width = this._owner._rawWidth - dx;
                break;
            case RelationType.RightExt_Left:
            case RelationType.RightExt_Right:
                if (this._owner != this._target.parent) {
                    tmp = this._owner.xMin;
                    this._owner.width = this._owner._rawWidth + dx;
                    this._owner.xMin = tmp;
                }
                else
                    this._owner.width = this._owner._rawWidth + dx;
                break;
            case RelationType.TopExt_Top:
            case RelationType.TopExt_Bottom:
                if (this._owner != this._target.parent) {
                    tmp = this._owner.yMin;
                    this._owner.height = this._owner._rawHeight - dy;
                    this._owner.yMin = tmp + dy;
                }
                else
                    this._owner.height = this._owner._rawHeight - dy;
                break;
            case RelationType.BottomExt_Top:
            case RelationType.BottomExt_Bottom:
                if (this._owner != this._target.parent) {
                    tmp = this._owner.yMin;
                    this._owner.height = this._owner._rawHeight + dy;
                    this._owner.yMin = tmp;
                }
                else
                    this._owner.height = this._owner._rawHeight + dy;
                break;
        }
    }
    applyOnSizeChanged(info) {
        var pos = 0, pivot = 0, delta = 0;
        var v, tmp;
        if (info.axis == 0) {
            if (this._target != this._owner.parent) {
                pos = this._target.x;
                if (this._target.pivotAsAnchor)
                    pivot = this._target.pivotX;
            }
            if (info.percent) {
                if (this._targetWidth != 0)
                    delta = this._target._width / this._targetWidth;
            }
            else
                delta = this._target._width - this._targetWidth;
        }
        else {
            if (this._target != this._owner.parent) {
                pos = this._target.y;
                if (this._target.pivotAsAnchor)
                    pivot = this._target.pivotY;
            }
            if (info.percent) {
                if (this._targetHeight != 0)
                    delta = this._target._height / this._targetHeight;
            }
            else
                delta = this._target._height - this._targetHeight;
        }
        switch (info.type) {
            case RelationType.Left_Left:
                if (info.percent)
                    this._owner.xMin = pos + (this._owner.xMin - pos) * delta;
                else if (pivot != 0)
                    this._owner.x += delta * (-pivot);
                break;
            case RelationType.Left_Center:
                if (info.percent)
                    this._owner.xMin = pos + (this._owner.xMin - pos) * delta;
                else
                    this._owner.x += delta * (0.5 - pivot);
                break;
            case RelationType.Left_Right:
                if (info.percent)
                    this._owner.xMin = pos + (this._owner.xMin - pos) * delta;
                else
                    this._owner.x += delta * (1 - pivot);
                break;
            case RelationType.Center_Center:
                if (info.percent)
                    this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth * 0.5 - pos) * delta - this._owner._rawWidth * 0.5;
                else
                    this._owner.x += delta * (0.5 - pivot);
                break;
            case RelationType.Right_Left:
                if (info.percent)
                    this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;
                else if (pivot != 0)
                    this._owner.x += delta * (-pivot);
                break;
            case RelationType.Right_Center:
                if (info.percent)
                    this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;
                else
                    this._owner.x += delta * (0.5 - pivot);
                break;
            case RelationType.Right_Right:
                if (info.percent)
                    this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;
                else
                    this._owner.x += delta * (1 - pivot);
                break;
            case RelationType.Top_Top:
                if (info.percent)
                    this._owner.yMin = pos + (this._owner.yMin - pos) * delta;
                else if (pivot != 0)
                    this._owner.y += delta * (-pivot);
                break;
            case RelationType.Top_Middle:
                if (info.percent)
                    this._owner.yMin = pos + (this._owner.yMin - pos) * delta;
                else
                    this._owner.y += delta * (0.5 - pivot);
                break;
            case RelationType.Top_Bottom:
                if (info.percent)
                    this._owner.yMin = pos + (this._owner.yMin - pos) * delta;
                else
                    this._owner.y += delta * (1 - pivot);
                break;
            case RelationType.Middle_Middle:
                if (info.percent)
                    this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight * 0.5 - pos) * delta - this._owner._rawHeight * 0.5;
                else
                    this._owner.y += delta * (0.5 - pivot);
                break;
            case RelationType.Bottom_Top:
                if (info.percent)
                    this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;
                else if (pivot != 0)
                    this._owner.y += delta * (-pivot);
                break;
            case RelationType.Bottom_Middle:
                if (info.percent)
                    this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;
                else
                    this._owner.y += delta * (0.5 - pivot);
                break;
            case RelationType.Bottom_Bottom:
                if (info.percent)
                    this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;
                else
                    this._owner.y += delta * (1 - pivot);
                break;
            case RelationType.Width:
                if (this._owner._underConstruct && this._owner == this._target.parent)
                    v = this._owner.sourceWidth - this._target.initWidth;
                else
                    v = this._owner._rawWidth - this._targetWidth;
                if (info.percent)
                    v = v * delta;
                if (this._target == this._owner.parent) {
                    if (this._owner.pivotAsAnchor) {
                        tmp = this._owner.xMin;
                        this._owner.setSize(this._target._width + v, this._owner._rawHeight, true);
                        this._owner.xMin = tmp;
                    }
                    else
                        this._owner.setSize(this._target._width + v, this._owner._rawHeight, true);
                }
                else
                    this._owner.width = this._target._width + v;
                break;
            case RelationType.Height:
                if (this._owner._underConstruct && this._owner == this._target.parent)
                    v = this._owner.sourceHeight - this._target.initHeight;
                else
                    v = this._owner._rawHeight - this._targetHeight;
                if (info.percent)
                    v = v * delta;
                if (this._target == this._owner.parent) {
                    if (this._owner.pivotAsAnchor) {
                        tmp = this._owner.yMin;
                        this._owner.setSize(this._owner._rawWidth, this._target._height + v, true);
                        this._owner.yMin = tmp;
                    }
                    else
                        this._owner.setSize(this._owner._rawWidth, this._target._height + v, true);
                }
                else
                    this._owner.height = this._target._height + v;
                break;
            case RelationType.LeftExt_Left:
                tmp = this._owner.xMin;
                if (info.percent)
                    v = pos + (tmp - pos) * delta - tmp;
                else
                    v = delta * (-pivot);
                this._owner.width = this._owner._rawWidth - v;
                this._owner.xMin = tmp + v;
                break;
            case RelationType.LeftExt_Right:
                tmp = this._owner.xMin;
                if (info.percent)
                    v = pos + (tmp - pos) * delta - tmp;
                else
                    v = delta * (1 - pivot);
                this._owner.width = this._owner._rawWidth - v;
                this._owner.xMin = tmp + v;
                break;
            case RelationType.RightExt_Left:
                tmp = this._owner.xMin;
                if (info.percent)
                    v = pos + (tmp + this._owner._rawWidth - pos) * delta - (tmp + this._owner._rawWidth);
                else
                    v = delta * (-pivot);
                this._owner.width = this._owner._rawWidth + v;
                this._owner.xMin = tmp;
                break;
            case RelationType.RightExt_Right:
                tmp = this._owner.xMin;
                if (info.percent) {
                    if (this._owner == this._target.parent) {
                        if (this._owner._underConstruct)
                            this._owner.width = pos + this._target._width - this._target._width * pivot +
                                (this._owner.sourceWidth - pos - this._target.initWidth + this._target.initWidth * pivot) * delta;
                        else
                            this._owner.width = pos + (this._owner._rawWidth - pos) * delta;
                    }
                    else {
                        v = pos + (tmp + this._owner._rawWidth - pos) * delta - (tmp + this._owner._rawWidth);
                        this._owner.width = this._owner._rawWidth + v;
                        this._owner.xMin = tmp;
                    }
                }
                else {
                    if (this._owner == this._target.parent) {
                        if (this._owner._underConstruct)
                            this._owner.width = this._owner.sourceWidth + (this._target._width - this._target.initWidth) * (1 - pivot);
                        else
                            this._owner.width = this._owner._rawWidth + delta * (1 - pivot);
                    }
                    else {
                        v = delta * (1 - pivot);
                        this._owner.width = this._owner._rawWidth + v;
                        this._owner.xMin = tmp;
                    }
                }
                break;
            case RelationType.TopExt_Top:
                tmp = this._owner.yMin;
                if (info.percent)
                    v = pos + (tmp - pos) * delta - tmp;
                else
                    v = delta * (-pivot);
                this._owner.height = this._owner._rawHeight - v;
                this._owner.yMin = tmp + v;
                break;
            case RelationType.TopExt_Bottom:
                tmp = this._owner.yMin;
                if (info.percent)
                    v = pos + (tmp - pos) * delta - tmp;
                else
                    v = delta * (1 - pivot);
                this._owner.height = this._owner._rawHeight - v;
                this._owner.yMin = tmp + v;
                break;
            case RelationType.BottomExt_Top:
                tmp = this._owner.yMin;
                if (info.percent)
                    v = pos + (tmp + this._owner._rawHeight - pos) * delta - (tmp + this._owner._rawHeight);
                else
                    v = delta * (-pivot);
                this._owner.height = this._owner._rawHeight + v;
                this._owner.yMin = tmp;
                break;
            case RelationType.BottomExt_Bottom:
                tmp = this._owner.yMin;
                if (info.percent) {
                    if (this._owner == this._target.parent) {
                        if (this._owner._underConstruct)
                            this._owner.height = pos + this._target._height - this._target._height * pivot +
                                (this._owner.sourceHeight - pos - this._target.initHeight + this._target.initHeight * pivot) * delta;
                        else
                            this._owner.height = pos + (this._owner._rawHeight - pos) * delta;
                    }
                    else {
                        v = pos + (tmp + this._owner._rawHeight - pos) * delta - (tmp + this._owner._rawHeight);
                        this._owner.height = this._owner._rawHeight + v;
                        this._owner.yMin = tmp;
                    }
                }
                else {
                    if (this._owner == this._target.parent) {
                        if (this._owner._underConstruct)
                            this._owner.height = this._owner.sourceHeight + (this._target._height - this._target.initHeight) * (1 - pivot);
                        else
                            this._owner.height = this._owner._rawHeight + delta * (1 - pivot);
                    }
                    else {
                        v = delta * (1 - pivot);
                        this._owner.height = this._owner._rawHeight + v;
                        this._owner.yMin = tmp;
                    }
                }
                break;
        }
    }
    addRefTarget() {
        if (this._target != this._owner.parent)
            this._target.on("pos_changed", this.__targetXYChanged, this);
        this._target.on("size_changed", this.__targetSizeChanged, this);
        this._targetX = this._target.x;
        this._targetY = this._target.y;
        this._targetWidth = this._target._width;
        this._targetHeight = this._target._height;
    }
    releaseRefTarget() {
        if (this._target.displayObject == null)
            return;
        this._target.off("pos_changed", this.__targetXYChanged, this);
        this._target.off("size_changed", this.__targetSizeChanged, this);
    }
    __targetXYChanged() {
        if (this._owner.relations.handling || this._owner.group && this._owner.group._updating) {
            this._targetX = this._target.x;
            this._targetY = this._target.y;
            return;
        }
        this._owner.relations.handling = this._target;
        var ox = this._owner.x;
        var oy = this._owner.y;
        var dx = this._target.x - this._targetX;
        var dy = this._target.y - this._targetY;
        var cnt = this._defs.length;
        for (var i = 0; i < cnt; i++) {
            this.applyOnXYChanged(this._defs[i], dx, dy);
        }
        this._targetX = this._target.x;
        this._targetY = this._target.y;
        if (ox != this._owner.x || oy != this._owner.y) {
            ox = this._owner.x - ox;
            oy = this._owner.y - oy;
            this._owner.updateGearFromRelations(1, ox, oy);
            if (this._owner.parent && this._owner.parent._transitions.length > 0) {
                cnt = this._owner.parent._transitions.length;
                for (var j = 0; j < cnt; j++) {
                    var trans = this._owner.parent._transitions[j];
                    trans.updateFromRelations(this._owner.id, ox, oy);
                }
            }
        }
        this._owner.relations.handling = null;
    }
    __targetSizeChanged() {
        if (this._owner.relations.handling) {
            this._targetWidth = this._target._width;
            this._targetHeight = this._target._height;
            return;
        }
        this._owner.relations.handling = this._target;
        var ox = this._owner.x;
        var oy = this._owner.y;
        var ow = this._owner._rawWidth;
        var oh = this._owner._rawHeight;
        var cnt = this._defs.length;
        for (var i = 0; i < cnt; i++) {
            this.applyOnSizeChanged(this._defs[i]);
        }
        this._targetWidth = this._target._width;
        this._targetHeight = this._target._height;
        if (ox != this._owner.x || oy != this._owner.y) {
            ox = this._owner.x - ox;
            oy = this._owner.y - oy;
            this._owner.updateGearFromRelations(1, ox, oy);
            if (this._owner.parent && this._owner.parent._transitions.length > 0) {
                cnt = this._owner.parent._transitions.length;
                for (var j = 0; j < cnt; j++) {
                    var trans = this._owner.parent._transitions[j];
                    trans.updateFromRelations(this._owner.id, ox, oy);
                }
            }
        }
        if (ow != this._owner._rawWidth || oh != this._owner._rawHeight) {
            ow = this._owner._rawWidth - ow;
            oh = this._owner._rawHeight - oh;
            this._owner.updateGearFromRelations(2, ow, oh);
        }
        this._owner.relations.handling = null;
    }
}
class RelationDef {
    constructor() {
    }
    copy(source) {
        this.percent = source.percent;
        this.type = source.type;
        this.axis = source.axis;
    }
}

class Relations {
    constructor(owner) {
        this._owner = owner;
        this._items = [];
    }
    add(target, relationType, usePercent) {
        var length = this._items.length;
        for (var i = 0; i < length; i++) {
            var item = this._items[i];
            if (item.target == target) {
                item.add(relationType, usePercent);
                return;
            }
        }
        var newItem = new RelationItem(this._owner);
        newItem.target = target;
        newItem.add(relationType, usePercent);
        this._items.push(newItem);
    }
    remove(target, relationType) {
        relationType = relationType || 0;
        var cnt = this._items.length;
        var i = 0;
        while (i < cnt) {
            var item = this._items[i];
            if (item.target == target) {
                item.remove(relationType);
                if (item.isEmpty) {
                    item.dispose();
                    this._items.splice(i, 1);
                    cnt--;
                }
                else
                    i++;
            }
            else
                i++;
        }
    }
    contains(target) {
        var length = this._items.length;
        for (var i = 0; i < length; i++) {
            var item = this._items[i];
            if (item.target == target)
                return true;
        }
        return false;
    }
    clearFor(target) {
        var cnt = this._items.length;
        var i = 0;
        while (i < cnt) {
            var item = this._items[i];
            if (item.target == target) {
                item.dispose();
                this._items.splice(i, 1);
                cnt--;
            }
            else
                i++;
        }
    }
    clearAll() {
        var length = this._items.length;
        for (var i = 0; i < length; i++) {
            var item = this._items[i];
            item.dispose();
        }
        this._items.length = 0;
    }
    copyFrom(source) {
        this.clearAll();
        var arr = source._items;
        var length = arr.length;
        for (var i = 0; i < length; i++) {
            var ri = arr[i];
            var item = new RelationItem(this._owner);
            item.copy(ri);
            this._items.push(item);
        }
    }
    dispose() {
        this.clearAll();
    }
    onOwnerSizeChanged(dWidth, dHeight, applyPivot) {
        if (this._items.length == 0)
            return;
        var length = this._items.length;
        for (var i = 0; i < length; i++) {
            var item = this._items[i];
            item.applyOnSelfResized(dWidth, dHeight, applyPivot);
        }
    }
    get empty() {
        return this._items.length == 0;
    }
    setup(buffer, parentToChild) {
        var cnt = buffer.readByte();
        var target;
        for (var i = 0; i < cnt; i++) {
            var targetIndex = buffer.readShort();
            if (targetIndex == -1)
                target = this._owner.parent;
            else if (parentToChild)
                target = (this._owner).getChildAt(targetIndex);
            else
                target = this._owner.parent.getChildAt(targetIndex);
            var newItem = new RelationItem(this._owner);
            newItem.target = target;
            this._items.push(newItem);
            var cnt2 = buffer.readByte();
            for (var j = 0; j < cnt2; j++) {
                var rt = buffer.readByte();
                var usePercent = buffer.readBool();
                newItem.internalAdd(rt, usePercent);
            }
        }
    }
}

class Color4 extends Color {
    constructor(rgb, a) {
        super(rgb || 0);
        this.a = a != null ? a : 1;
    }
}

class UIConfig {
}
//Default font name
UIConfig.defaultFont = "Arial";
//When a modal window is in front, the background becomes dark.
UIConfig.modalLayerColor = new Color4(0x333333, 0.2);
//Default button click sound
UIConfig.buttonSound = null;
UIConfig.buttonSoundVolumeScale = 1;
//Default button click sound
UIConfig.horizontalScrollBar = null;
UIConfig.verticalScrollBar = null;
//Scrolling step in pixels
UIConfig.defaultScrollStep = 25;
//Deceleration ratio of scrollpane when its in touch dragging.
UIConfig.defaultScrollDecelerationRate = 0.967;
//Default scrollbar display mode. Recommened visible for Desktop and Auto for mobile.
UIConfig.defaultScrollBarDisplay = ScrollBarDisplayType.Visible;
//Allow dragging the content to scroll. Recommeded true for mobile.
UIConfig.defaultScrollTouchEffect = true;
//The "rebound" effect in the scolling container. Recommeded true for mobile.
UIConfig.defaultScrollBounceEffect = true;
/**
* 当滚动容器设置为“贴近ITEM”时，判定贴近到哪一个ITEM的滚动距离阀值。
*/
UIConfig.defaultScrollSnappingThreshold = 0.1;
/**
* 当滚动容器设置为“页面模式”时，判定翻到哪一页的滚动距离阀值。
*/
UIConfig.defaultScrollPagingThreshold = 0.3;
//Resources for PopupMenu.
UIConfig.popupMenu = null;
//Resources for seperator of PopupMenu.
UIConfig.popupMenu_seperator = null;
//In case of failure of loading content for GLoader, use this sign to indicate an error.
UIConfig.loaderErrorSign = null;
//Resources for tooltips.
UIConfig.tooltipsWin = null;
//Max items displayed in combobox without scrolling.
UIConfig.defaultComboBoxVisibleItemCount = 10;
// Pixel offsets of finger to trigger scrolling.
UIConfig.touchScrollSensitivity = 20;
// Pixel offsets of finger to trigger dragging.
UIConfig.touchDragSensitivity = 10;
// Pixel offsets of mouse pointer to trigger dragging.
UIConfig.clickDragSensitivity = 2;
// When click the window, brings to front automatically.
UIConfig.bringWindowToFrontOnClick = true;
UIConfig.frameTimeForAsyncUIConstruction = 2;
UIConfig.packageFileExtension = "fui";

class GObject {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._alpha = 1;
        this._visible = true;
        this._touchable = true;
        this._scaleX = 1;
        this._scaleY = 1;
        this._skewX = 0;
        this._skewY = 0;
        this._pivotX = 0;
        this._pivotY = 0;
        this._sortingOrder = 0;
        this._internalVisible = true;
        this.minWidth = 0;
        this.minHeight = 0;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.sourceWidth = 0;
        this.sourceHeight = 0;
        this.initWidth = 0;
        this.initHeight = 0;
        this._width = 0;
        this._height = 0;
        this._rawWidth = 0;
        this._rawHeight = 0;
        this._sizePercentInGroup = 0;
        //drag support
        //-------------------------------------------------------------------
        this._dragStartPos = new Vector2();
        this._dragTesting = false;
        this._id = "" + gInstanceCounter++;
        this._name = "";
        this.createDisplayObject();
        this._displayObject["$owner"] = this;
        this._relations = new Relations(this);
        this._gears = new Array(10);
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this.setPosition(value, this._y);
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this.setPosition(this._x, value);
    }
    get z() {
        return this._z;
    }
    set z(value) {
        this.setPosition(this._x, this._y, value);
    }
    setPosition(xv, yv, zv) {
        if (this._x != xv || this._y != yv) {
            var dx = xv - this._x;
            var dy = yv - this._y;
            this._x = xv;
            this._y = yv;
            if (zv != null)
                this._z = zv;
            this.handlePositionChanged();
            if (this instanceof GGroup)
                this.moveChildren(dx, dy);
            this.updateGear(1);
            if (this._parent && !("setVirtual" in this._parent) /*not list*/) {
                this._parent.setBoundsChangedFlag();
                if (this._group)
                    this._group.setBoundsChangedFlag(true);
                this.dispatchEvent("pos_changed");
            }
            if (GObject.draggingObject == this && !s_dragging)
                this.localToGlobalRect(0, 0, this.width, this.height, sGlobalRect);
        }
    }
    get xMin() {
        return this._pivotAsAnchor ? (this._x - this._width * this._pivotX) : this._x;
    }
    set xMin(value) {
        if (this._pivotAsAnchor)
            this.setPosition(value + this._width * this._pivotX, this._y);
        else
            this.setPosition(value, this._y);
    }
    get yMin() {
        return this._pivotAsAnchor ? (this._y - this._height * this._pivotY) : this._y;
    }
    set yMin(value) {
        if (this._pivotAsAnchor)
            this.setPosition(this._x, value + this._height * this._pivotY);
        else
            this.setPosition(this._x, value);
    }
    center(restraint) {
        var r;
        if (this._parent)
            r = this.parent;
        else
            r = Decls.GRoot.inst;
        this.setPosition(Math.floor((r.width - this.width) / 2), Math.floor((r.height - this.height) / 2));
        if (restraint) {
            this.addRelation(r, RelationType.Center_Center);
            this.addRelation(r, RelationType.Middle_Middle);
        }
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this.setSize(value, this._rawHeight);
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this.setSize(this._rawWidth, value);
    }
    setSize(wv, hv, ignorePivot) {
        if (this._rawWidth != wv || this._rawHeight != hv) {
            this._rawWidth = wv;
            this._rawHeight = hv;
            if (wv < this.minWidth)
                wv = this.minWidth;
            if (hv < this.minHeight)
                hv = this.minHeight;
            if (this.maxWidth > 0 && wv > this.maxWidth)
                wv = this.maxWidth;
            if (this.maxHeight > 0 && hv > this.maxHeight)
                hv = this.maxHeight;
            var dWidth = wv - this._width;
            var dHeight = hv - this._height;
            this._width = wv;
            this._height = hv;
            this.handleSizeChanged();
            if (this._pivotX != 0 || this._pivotY != 0) {
                if (!this._pivotAsAnchor) {
                    if (!ignorePivot)
                        this.setPosition(this.x - this._pivotX * dWidth, this.y - this._pivotY * dHeight);
                    else
                        this.handlePositionChanged();
                }
                else
                    this.handlePositionChanged();
            }
            if (this instanceof GGroup)
                this.resizeChildren(dWidth, dHeight);
            this.updateGear(2);
            if (this._parent) {
                this._relations.onOwnerSizeChanged(dWidth, dHeight, this._pivotAsAnchor || !ignorePivot);
                this._parent.setBoundsChangedFlag();
                if (this._group)
                    this._group.setBoundsChangedFlag();
            }
            this.dispatchEvent("size_changed");
        }
    }
    setSizeDirectly(wv, hv) {
        this._rawWidth = wv;
        this._rawHeight = hv;
        if (wv < 0)
            wv = 0;
        if (hv < 0)
            hv = 0;
        this._width = wv;
        this._height = hv;
    }
    makeFullScreen() {
        this.setSize(Decls.GRoot.inst.width, Decls.GRoot.inst.height);
    }
    get actualWidth() {
        return this.width * Math.abs(this._scaleX);
    }
    get actualHeight() {
        return this.height * Math.abs(this._scaleY);
    }
    get scaleX() {
        return this._scaleX;
    }
    set scaleX(value) {
        this.setScale(value, this._scaleY);
    }
    get scaleY() {
        return this._scaleY;
    }
    set scaleY(value) {
        this.setScale(this._scaleX, value);
    }
    setScale(sx, sy) {
        if (this._scaleX != sx || this._scaleY != sy) {
            this._scaleX = sx;
            this._scaleY = sy;
            this.handleScaleChanged();
            this.updateGear(2);
        }
    }
    get skewX() {
        return this._skewX;
    }
    set skewX(value) {
        this.setSkew(value, this._skewY);
    }
    get skewY() {
        return this._skewY;
    }
    set skewY(value) {
        this.setSkew(this._skewX, value);
    }
    setSkew(sx, sy) {
        if (this._skewX != sx || this._skewY != sy) {
            this._skewX = sx;
            this._skewY = sy;
            //todo skew
        }
    }
    get pivotX() {
        return this._pivotX;
    }
    set pivotX(value) {
        this.setPivot(value, this._pivotY);
    }
    get pivotY() {
        return this._pivotY;
    }
    set pivotY(value) {
        this.setPivot(this._pivotX, value);
    }
    setPivot(xv, yv, asAnchor) {
        asAnchor = asAnchor || false;
        if (this._pivotX != xv || this._pivotY != yv || this._pivotAsAnchor != asAnchor) {
            this._pivotX = xv;
            this._pivotY = yv;
            this._pivotAsAnchor = asAnchor;
            this._displayObject.setPivot(xv, yv);
            this.handlePositionChanged();
        }
    }
    get pivotAsAnchor() {
        return this._pivotAsAnchor;
    }
    get touchable() {
        return this._touchable;
    }
    set touchable(value) {
        if (this._touchable != value) {
            this._touchable = value;
            this.updateGear(3);
            this._displayObject.touchable = this._touchable;
        }
    }
    get grayed() {
        return this._grayed;
    }
    set grayed(value) {
        if (this._grayed != value) {
            this._grayed = value;
            this.handleGrayedChanged();
            this.updateGear(3);
        }
    }
    get enabled() {
        return !this._grayed && this._touchable;
    }
    set enabled(value) {
        this.grayed = !value;
        this.touchable = value;
    }
    get rotation() {
        return this._displayObject.rotation;
    }
    set rotation(value) {
        if (this._displayObject.rotation != value) {
            this._displayObject.rotation = value;
            this.updateGear(3);
        }
    }
    get rotationX() {
        return this._displayObject.rotationX;
    }
    set rotationX(value) {
        this._displayObject.rotationX = value;
    }
    get rotationY() {
        return this._displayObject.rotationY;
    }
    set rotationY(value) {
        this._displayObject.rotationY = value;
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        if (this._alpha != value) {
            this._alpha = value;
            this.handleAlphaChanged();
            this.updateGear(3);
        }
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        if (this._visible != value) {
            this._visible = value;
            this.handleVisibleChanged();
            if (this._parent)
                this._parent.setBoundsChangedFlag();
            if (this._group && this._group.excludeInvisibles)
                this._group.setBoundsChangedFlag();
        }
    }
    get internalVisible() {
        return this._internalVisible && (!this._group || this._group.internalVisible);
    }
    get internalVisible2() {
        return this._visible && (!this._group || this._group.internalVisible2);
    }
    get internalVisible3() {
        return this._internalVisible && this._visible;
    }
    get sortingOrder() {
        return this._sortingOrder;
    }
    set sortingOrder(value) {
        if (value < 0)
            value = 0;
        if (this._sortingOrder != value) {
            var old = this._sortingOrder;
            this._sortingOrder = value;
            if (this._parent)
                this._parent.childSortingOrderChanged(this, old, this._sortingOrder);
        }
    }
    get tooltips() {
        return this._tooltips;
    }
    set tooltips(value) {
        if (this._tooltips) {
            this.off("roll_over", this.__rollOver, this);
            this.off("roll_out", this.__rollOut, this);
        }
        this._tooltips = value;
        if (this._tooltips) {
            this.on("roll_over", this.__rollOver, this);
            this.on("roll_out", this.__rollOut, this);
        }
    }
    __rollOver() {
        Timers.callDelay(100, this.__doShowTooltips, this);
    }
    __doShowTooltips() {
        Decls.GRoot.findFor(this).showTooltips(this._tooltips);
    }
    __rollOut() {
        Timers.remove(this.__doShowTooltips, this);
        Decls.GRoot.findFor(this).hideTooltips();
    }
    get blendMode() {
        return this._displayObject.blendMode;
    }
    set blendMode(value) {
        this._displayObject.blendMode = value;
    }
    get onStage() {
        return this._displayObject.stage != null;
    }
    get resourceURL() {
        if (this.packageItem)
            return "ui://" + this.packageItem.owner.id + this.packageItem.id;
        else
            return null;
    }
    set group(value) {
        if (this._group != value) {
            if (this._group)
                this._group.setBoundsChangedFlag();
            this._group = value;
            if (this._group)
                this._group.setBoundsChangedFlag();
        }
    }
    get group() {
        return this._group;
    }
    getGear(index) {
        var gear = this._gears[index];
        if (gear == null)
            this._gears[index] = gear = createGear(this, index);
        return gear;
    }
    updateGear(index) {
        if (this._underConstruct || this._gearLocked)
            return;
        var gear = this._gears[index];
        if (gear && gear.controller)
            gear.updateState();
    }
    checkGearController(index, c) {
        return this._gears[index] && this._gears[index].controller == c;
    }
    updateGearFromRelations(index, dx, dy) {
        if (this._gears[index])
            this._gears[index].updateFromRelations(dx, dy);
    }
    addDisplayLock() {
        var gearDisplay = (this._gears[0]);
        if (gearDisplay && gearDisplay.controller) {
            var ret = gearDisplay.addLock();
            this.checkGearDisplay();
            return ret;
        }
        else
            return 0;
    }
    releaseDisplayLock(token) {
        var gearDisplay = (this._gears[0]);
        if (gearDisplay && gearDisplay.controller) {
            gearDisplay.releaseLock(token);
            this.checkGearDisplay();
        }
    }
    checkGearDisplay() {
        if (this._handlingController)
            return;
        var connected = this._gears[0] == null || (this._gears[0]).connected;
        if (this._gears[8])
            connected = this._gears[8].evaluate(connected);
        if (connected != this._internalVisible) {
            this._internalVisible = connected;
            if (this._parent) {
                this._parent.childStateChanged(this);
                if (this._group && this._group.excludeInvisibles)
                    this._group.setBoundsChangedFlag();
            }
        }
    }
    get relations() {
        return this._relations;
    }
    addRelation(target, relationType, usePercent) {
        this._relations.add(target, relationType, usePercent);
    }
    removeRelation(target, relationType) {
        this._relations.remove(target, relationType);
    }
    get displayObject() {
        return this._displayObject;
    }
    get obj3D() {
        return this._displayObject.obj3D;
    }
    get parent() {
        return this._parent;
    }
    set parent(val) {
        this._parent = val;
    }
    removeFromParent() {
        if (this._parent)
            this._parent.removeChild(this);
    }
    get asCom() {
        return this;
    }
    get text() {
        return null;
    }
    set text(value) {
    }
    get icon() {
        return null;
    }
    set icon(value) {
    }
    get treeNode() {
        return this._treeNode;
    }
    get isDisposed() {
        return this._displayObject == null;
    }
    dispose() {
        this.removeFromParent();
        this._relations.dispose();
        this._displayObject.dispose();
        this._displayObject = null;
        for (var i = 0; i < 10; i++) {
            var gear = this._gears[i];
            if (gear)
                gear.dispose();
        }
    }
    on(type, callback, target, capture) {
        this._displayObject.on(type, callback, target, capture);
    }
    off(type, callback, target, capture) {
        this._displayObject.off(type, callback, target, capture);
    }
    offAll(type) {
        this._displayObject.offAll(type);
    }
    hasListener(type, callback, target, capture) {
        return this._displayObject.hasListener(type, callback, target, capture);
    }
    dispatchEvent(type, data) {
        return this._displayObject.dispatchEvent(type, data);
    }
    onClick(listener, target) {
        this.on("click", listener, target);
    }
    offClick(listener, target) {
        this.off("click", listener, target);
    }
    hasClickListener() {
        return this.hasListener("click");
    }
    get draggable() {
        return this._draggable;
    }
    set draggable(value) {
        if (this._draggable != value) {
            this._draggable = value;
            this.initDrag();
        }
    }
    get dragBounds() {
        return this._dragBounds;
    }
    set dragBounds(value) {
        this._dragBounds = value;
    }
    startDrag(touchId) {
        if (this._displayObject.stage == null)
            return;
        if (touchId == null)
            touchId = -1;
        this.dragBegin(touchId);
    }
    stopDrag() {
        this.dragEnd();
    }
    get dragging() {
        return GObject.draggingObject == this;
    }
    localToGlobal(ax, ay, result) {
        ax = ax || 0;
        ay = ay || 0;
        if (this._pivotAsAnchor) {
            ax += this._pivotX * this._width;
            ay += this._pivotY * this._height;
        }
        return this._displayObject.localToGlobal(ax, ay, result);
    }
    globalToLocal(ax, ay, result) {
        ax = ax || 0;
        ay = ay || 0;
        result = this._displayObject.globalToLocal(ax, ay, result);
        if (this._pivotAsAnchor) {
            result.x -= this._pivotX * this._width;
            result.y -= this._pivotY * this._height;
        }
        return result;
    }
    localToRoot(ax, ay, result) {
        let r = Decls.GRoot.findFor(this);
        let pt = this.localToGlobal(ax, ay, result);
        return r.globalToLocal(pt.x, pt.y, pt);
    }
    rootToLocal(ax, ay, result) {
        let r = Decls.GRoot.findFor(this);
        let pt = r.localToGlobal(ax, ay, result);
        return this.globalToLocal(pt.x, pt.y, pt);
    }
    localToGlobalRect(ax, ay, aWidth, aHeight, result) {
        if (!result)
            result = new Rect();
        var pt = this.localToGlobal(ax, ay, s_vec2$1);
        result.x = pt.x;
        result.y = pt.y;
        pt = this.localToGlobal(ax + aWidth, ay + aHeight, s_vec2$1);
        result.width = pt.x - result.x;
        result.height = pt.y - result.y;
        return result;
    }
    globalToLocalRect(ax, ay, aWidth, aHeight, result) {
        if (!result)
            result = new Rect();
        var pt = this.globalToLocal(ax, ay, s_vec2$1);
        result.x = pt.x;
        result.y = pt.y;
        pt = this.globalToLocal(ax + aWidth, ay + aHeight, s_vec2$1);
        result.width = pt.x - result.x;
        result.height = pt.y - result.y;
        return result;
    }
    handleControllerChanged(c) {
        this._handlingController = true;
        for (var i = 0; i < 10; i++) {
            var gear = this._gears[i];
            if (gear && gear.controller == c)
                gear.apply();
        }
        this._handlingController = false;
        this.checkGearDisplay();
    }
    createDisplayObject() {
        this._displayObject = new DisplayObject();
    }
    handlePositionChanged() {
        var xv = this._x;
        var yv = this._y;
        if (!this._pivotAsAnchor) {
            xv += this._pivotX * this._width;
            yv += this._pivotY * this._height;
        }
        this._displayObject.setPosition(xv, yv, this._z, true);
    }
    handleSizeChanged() {
        this._displayObject.setSize(this._width, this._height);
    }
    handleScaleChanged() {
        this._displayObject.setScale(this._scaleX, this._scaleY);
    }
    handleGrayedChanged() {
        if (this._displayObject.graphics)
            this._displayObject.graphics.grayed = this._grayed;
    }
    handleAlphaChanged() {
        this._displayObject.alpha = this._alpha;
    }
    handleVisibleChanged() {
        this._displayObject.visible = this.internalVisible2;
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Text:
                return this.text;
            case ObjectPropID.Icon:
                return this.icon;
            case ObjectPropID.Color:
                return null;
            case ObjectPropID.OutlineColor:
                return null;
            case ObjectPropID.Playing:
                return false;
            case ObjectPropID.Frame:
                return 0;
            case ObjectPropID.DeltaTime:
                return 0;
            case ObjectPropID.TimeScale:
                return 1;
            case ObjectPropID.FontSize:
                return 0;
            case ObjectPropID.Selected:
                return false;
            default:
                return undefined;
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Text:
                this.text = value;
                break;
            case ObjectPropID.Icon:
                this.icon = value;
                break;
        }
    }
    constructFromResource() {
    }
    setup_beforeAdd(buffer, beginPos) {
        buffer.seek(beginPos, 0);
        buffer.skip(5);
        var f1;
        var f2;
        this._id = buffer.readS();
        this._name = buffer.readS();
        f1 = buffer.readInt();
        f2 = buffer.readInt();
        this.setPosition(f1, f2);
        if (buffer.readBool()) {
            this.initWidth = buffer.readInt();
            this.initHeight = buffer.readInt();
            this.setSize(this.initWidth, this.initHeight, true);
        }
        if (buffer.readBool()) {
            this.minWidth = buffer.readInt();
            this.maxWidth = buffer.readInt();
            this.minHeight = buffer.readInt();
            this.maxHeight = buffer.readInt();
        }
        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setScale(f1, f2);
        }
        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setSkew(f1, f2);
        }
        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setPivot(f1, f2, buffer.readBool());
        }
        f1 = buffer.readFloat();
        if (f1 != 1)
            this.alpha = f1;
        f1 = buffer.readFloat();
        if (f1 != 0)
            this.rotation = f1;
        if (!buffer.readBool())
            this.visible = false;
        if (!buffer.readBool())
            this.touchable = false;
        if (buffer.readBool())
            this.grayed = true;
        var bm = buffer.readByte();
        this.blendMode = BlendModeTranslate[bm] || NormalBlending;
        var filter = buffer.readByte();
        var str = buffer.readS();
        if (str != null)
            this.data = str;
    }
    setup_afterAdd(buffer, beginPos) {
        buffer.seek(beginPos, 1);
        var str = buffer.readS();
        if (str)
            this.tooltips = str;
        var groupId = buffer.readShort();
        if (groupId >= 0)
            this.group = this.parent.getChildAt(groupId);
        buffer.seek(beginPos, 2);
        var cnt = buffer.readShort();
        for (var i = 0; i < cnt; i++) {
            var nextPos = buffer.readShort();
            nextPos += buffer.pos;
            var gear = this.getGear(buffer.readByte());
            gear.setup(buffer);
            buffer.pos = nextPos;
        }
    }
    initDrag() {
        if (this._draggable) {
            this.on("touch_begin", this.__touchBegin, this);
            this.on("touch_move", this.__touchMove, this);
            this.on("touch_end", this.__touchEnd, this);
        }
        else {
            this.off("touch_begin", this.__touchBegin, this);
            this.off("touch_move", this.__touchMove, this);
            this.off("touch_end", this.__touchEnd, this);
        }
    }
    dragBegin(touchId) {
        if (GObject.draggingObject) {
            let tmp = GObject.draggingObject;
            GObject.draggingObject.stopDrag();
            GObject.draggingObject = null;
            tmp.dispatchEvent("drag_end");
        }
        this.on("touch_move", this.__touchMove, this);
        this.on("touch_end", this.__touchEnd, this);
        Stage.getTouchPos(touchId, sGlobalDragStart);
        this.localToGlobalRect(0, 0, this.width, this.height, sGlobalRect);
        this._dragTesting = false;
        GObject.draggingObject = this;
        Stage.addTouchMonitor(touchId, this._displayObject);
    }
    dragEnd() {
        if (GObject.draggingObject == this) {
            this._dragTesting = false;
            GObject.draggingObject = null;
        }
    }
    __touchBegin(evt) {
        if (this._dragStartPos == null)
            this._dragStartPos = new Vector2();
        this._dragStartPos.set(evt.input.x, evt.input.y);
        this._dragTesting = true;
        evt.captureTouch();
    }
    __touchMove(evt) {
        if (this._dragTesting && GObject.draggingObject != this) {
            let sensitivity;
            if (Stage.touchScreen)
                sensitivity = UIConfig.touchDragSensitivity;
            else
                sensitivity = UIConfig.clickDragSensitivity;
            if (this._dragStartPos
                && Math.abs(this._dragStartPos.x - evt.input.x) < sensitivity
                && Math.abs(this._dragStartPos.y - evt.input.y) < sensitivity)
                return;
            this._dragTesting = false;
            if (!this.dispatchEvent("drag_start", evt.input.touchId))
                this.dragBegin(evt.input.touchId);
        }
        if (GObject.draggingObject == this) {
            let xx = evt.input.x - sGlobalDragStart.x + sGlobalRect.x;
            let yy = evt.input.y - sGlobalDragStart.y + sGlobalRect.y;
            if (this._dragBounds) {
                let rect = Decls.GRoot.findFor(this).localToGlobalRect(this._dragBounds.x, this._dragBounds.y, this._dragBounds.width, this._dragBounds.height, s_rect$1);
                if (xx < rect.x)
                    xx = rect.x;
                else if (xx + sGlobalRect.width > rect.xMax) {
                    xx = rect.xMax - sGlobalRect.width;
                    if (xx < rect.x)
                        xx = rect.x;
                }
                if (yy < rect.y)
                    yy = rect.y;
                else if (yy + sGlobalRect.height > rect.yMax) {
                    yy = rect.yMax - sGlobalRect.height;
                    if (yy < rect.y)
                        yy = rect.y;
                }
            }
            let pt = this.parent.globalToLocal(xx, yy, s_vec2$1);
            s_dragging = true;
            this.setPosition(Math.round(pt.x), Math.round(pt.y));
            s_dragging = false;
            this.dispatchEvent("drag_move");
        }
    }
    __touchEnd() {
        if (GObject.draggingObject == this) {
            GObject.draggingObject = null;
            this.dispatchEvent("drag_end");
        }
    }
    static cast(obj) {
        let dobj;
        if (obj instanceof Object3D) {
            dobj = obj["$owner"];
            if (!dobj)
                return null;
        }
        else
            dobj = obj;
        return dobj['$owner'];
    }
}
let GearClasses = [
    GearDisplay, GearXY, GearSize, GearLook, GearColor,
    GearAnimation, GearText, GearIcon, GearDisplay2, GearFontSize
];
function createGear(owner, index) {
    let ret = new (GearClasses[index])();
    ret._owner = owner;
    return ret;
}
var s_vec2$1 = new Vector2();
var s_rect$1 = new Rect();
var sGlobalDragStart = new Vector2();
var sGlobalRect = new Rect();
var s_dragging;
const BlendModeTranslate = {
    0: NormalBlending,
    1: NoBlending,
    2: AdditiveBlending,
    3: MultiplyBlending,
    4: SubtractiveBlending,
};
var Decls = {};
var gInstanceCounter = 0;
var constructingDepth = { n: 0 };

class GGroup extends GObject {
    constructor() {
        super();
        this._layout = 0;
        this._lineGap = 0;
        this._columnGap = 0;
        this._mainGridIndex = -1;
        this._mainGridMinSize = 50;
        this._mainChildIndex = -1;
        this._totalSize = 0;
        this._numChildren = 0;
        this._updating = 0;
    }
    dispose() {
        this._boundsChanged = false;
        super.dispose();
    }
    /**
     * @see GroupLayout
     */
    get layout() {
        return this._layout;
    }
    /**
     * @see GroupLayout
     */
    set layout(value) {
        if (this._layout != value) {
            this._layout = value;
            this.setBoundsChangedFlag();
        }
    }
    get lineGap() {
        return this._lineGap;
    }
    set lineGap(value) {
        if (this._lineGap != value) {
            this._lineGap = value;
            this.setBoundsChangedFlag(true);
        }
    }
    get columnGap() {
        return this._columnGap;
    }
    set columnGap(value) {
        if (this._columnGap != value) {
            this._columnGap = value;
            this.setBoundsChangedFlag(true);
        }
    }
    get excludeInvisibles() {
        return this._excludeInvisibles;
    }
    set excludeInvisibles(value) {
        if (this._excludeInvisibles != value) {
            this._excludeInvisibles = value;
            this.setBoundsChangedFlag();
        }
    }
    get autoSizeDisabled() {
        return this._autoSizeDisabled;
    }
    set autoSizeDisabled(value) {
        this._autoSizeDisabled = value;
    }
    get mainGridMinSize() {
        return this._mainGridMinSize;
    }
    set mainGridMinSize(value) {
        if (this._mainGridMinSize != value) {
            this._mainGridMinSize = value;
            this.setBoundsChangedFlag();
        }
    }
    get mainGridIndex() {
        return this._mainGridIndex;
    }
    set mainGridIndex(value) {
        if (this._mainGridIndex != value) {
            this._mainGridIndex = value;
            this.setBoundsChangedFlag();
        }
    }
    setBoundsChangedFlag(positionChangedOnly) {
        if (this._updating == 0 && this._parent) {
            if (!positionChangedOnly)
                this._percentReady = false;
            if (!this._boundsChanged) {
                this._boundsChanged = true;
                if (this._layout != GroupLayoutType.None)
                    Timers.callLater(this.ensureBoundsCorrect, this);
            }
        }
    }
    ensureBoundsCorrect() {
        if (this._parent == null || !this._boundsChanged)
            return;
        this._boundsChanged = false;
        if (this._layout == 0)
            this.updateBounds();
        else {
            if (this._autoSizeDisabled)
                this.resizeChildren(0, 0);
            else {
                this.handleLayout();
                this.updateBounds();
            }
        }
    }
    updateBounds() {
        Timers.remove(this.ensureBoundsCorrect, this);
        var cnt = this._parent.numChildren;
        var i;
        var child;
        var ax = Number.POSITIVE_INFINITY, ay = Number.POSITIVE_INFINITY;
        var ar = Number.NEGATIVE_INFINITY, ab = Number.NEGATIVE_INFINITY;
        var tmp;
        var empty = true;
        for (i = 0; i < cnt; i++) {
            child = this._parent.getChildAt(i);
            if (child.group != this || this._excludeInvisibles && !child.internalVisible3)
                continue;
            tmp = child.xMin;
            if (tmp < ax)
                ax = tmp;
            tmp = child.yMin;
            if (tmp < ay)
                ay = tmp;
            tmp = child.xMin + child.width;
            if (tmp > ar)
                ar = tmp;
            tmp = child.yMin + child.height;
            if (tmp > ab)
                ab = tmp;
            empty = false;
        }
        var w = 0, h = 0;
        if (!empty) {
            this._updating |= 1;
            this.setPosition(ax, ay);
            this._updating &= 2;
            w = ar - ax;
            h = ab - ay;
        }
        if ((this._updating & 2) == 0) {
            this._updating |= 2;
            this.setSize(w, h);
            this._updating &= 1;
        }
        else {
            this._updating &= 1;
            this.resizeChildren(this._width - w, this._height - h);
        }
    }
    handleLayout() {
        this._updating |= 1;
        var child;
        var i;
        var cnt;
        if (this._layout == GroupLayoutType.Horizontal) {
            var curX = this.x;
            cnt = this._parent.numChildren;
            for (i = 0; i < cnt; i++) {
                child = this._parent.getChildAt(i);
                if (child.group != this)
                    continue;
                if (this._excludeInvisibles && !child.internalVisible3)
                    continue;
                child.xMin = curX;
                if (child.width != 0)
                    curX += child.width + this._columnGap;
            }
        }
        else if (this._layout == GroupLayoutType.Vertical) {
            var curY = this.y;
            cnt = this._parent.numChildren;
            for (i = 0; i < cnt; i++) {
                child = this._parent.getChildAt(i);
                if (child.group != this)
                    continue;
                if (this._excludeInvisibles && !child.internalVisible3)
                    continue;
                child.yMin = curY;
                if (child.height != 0)
                    curY += child.height + this._lineGap;
            }
        }
        this._updating &= 2;
    }
    moveChildren(dx, dy) {
        if ((this._updating & 1) != 0 || this._parent == null)
            return;
        this._updating |= 1;
        var cnt = this._parent.numChildren;
        var i;
        var child;
        for (i = 0; i < cnt; i++) {
            child = this._parent.getChildAt(i);
            if (child.group == this) {
                child.setPosition(child.x + dx, child.y + dy);
            }
        }
        this._updating &= 2;
    }
    resizeChildren(dw, dh) {
        if (this._layout == GroupLayoutType.None || (this._updating & 2) != 0 || this._parent == null)
            return;
        this._updating |= 2;
        if (this._boundsChanged) {
            this._boundsChanged = false;
            if (!this._autoSizeDisabled) {
                this.updateBounds();
                return;
            }
        }
        var cnt = this._parent.numChildren;
        var i;
        var child;
        if (!this._percentReady) {
            this._percentReady = true;
            this._numChildren = 0;
            this._totalSize = 0;
            this._mainChildIndex = -1;
            var j = 0;
            for (i = 0; i < cnt; i++) {
                child = this._parent.getChildAt(i);
                if (child.group != this)
                    continue;
                if (!this._excludeInvisibles || child.internalVisible3) {
                    if (j == this._mainGridIndex)
                        this._mainChildIndex = i;
                    this._numChildren++;
                    if (this._layout == 1)
                        this._totalSize += child.width;
                    else
                        this._totalSize += child.height;
                }
                j++;
            }
            if (this._mainChildIndex != -1) {
                if (this._layout == 1) {
                    child = this._parent.getChildAt(this._mainChildIndex);
                    this._totalSize += this._mainGridMinSize - child.width;
                    child._sizePercentInGroup = this._mainGridMinSize / this._totalSize;
                }
                else {
                    child = this._parent.getChildAt(this._mainChildIndex);
                    this._totalSize += this._mainGridMinSize - child.height;
                    child._sizePercentInGroup = this._mainGridMinSize / this._totalSize;
                }
            }
            for (i = 0; i < cnt; i++) {
                child = this._parent.getChildAt(i);
                if (child.group != this)
                    continue;
                if (i == this._mainChildIndex)
                    continue;
                if (this._totalSize > 0)
                    child._sizePercentInGroup = (this._layout == 1 ? child.width : child.height) / this._totalSize;
                else
                    child._sizePercentInGroup = 0;
            }
        }
        var remainSize = 0;
        var remainPercent = 1;
        var priorHandled = false;
        if (this._layout == 1) {
            remainSize = this.width - (this._numChildren - 1) * this._columnGap;
            if (this._mainChildIndex != -1 && remainSize >= this._totalSize) {
                child = this._parent.getChildAt(this._mainChildIndex);
                child.setSize(remainSize - (this._totalSize - this._mainGridMinSize), child._rawHeight + dh, true);
                remainSize -= child.width;
                remainPercent -= child._sizePercentInGroup;
                priorHandled = true;
            }
            var curX = this.x;
            for (i = 0; i < cnt; i++) {
                child = this._parent.getChildAt(i);
                if (child.group != this)
                    continue;
                if (this._excludeInvisibles && !child.internalVisible3) {
                    child.setSize(child._rawWidth, child._rawHeight + dh, true);
                    continue;
                }
                if (!priorHandled || i != this._mainChildIndex) {
                    child.setSize(Math.round(child._sizePercentInGroup / remainPercent * remainSize), child._rawHeight + dh, true);
                    remainPercent -= child._sizePercentInGroup;
                    remainSize -= child.width;
                }
                child.xMin = curX;
                if (child.width != 0)
                    curX += child.width + this._columnGap;
            }
        }
        else {
            remainSize = this.height - (this._numChildren - 1) * this._lineGap;
            if (this._mainChildIndex != -1 && remainSize >= this._totalSize) {
                child = this._parent.getChildAt(this._mainChildIndex);
                child.setSize(child._rawWidth + dw, remainSize - (this._totalSize - this._mainGridMinSize), true);
                remainSize -= child.height;
                remainPercent -= child._sizePercentInGroup;
                priorHandled = true;
            }
            var curY = this.y;
            for (i = 0; i < cnt; i++) {
                child = this._parent.getChildAt(i);
                if (child.group != this)
                    continue;
                if (this._excludeInvisibles && !child.internalVisible3) {
                    child.setSize(child._rawWidth + dw, child._rawHeight, true);
                    continue;
                }
                if (!priorHandled || i != this._mainChildIndex) {
                    child.setSize(child._rawWidth + dw, Math.round(child._sizePercentInGroup / remainPercent * remainSize), true);
                    remainPercent -= child._sizePercentInGroup;
                    remainSize -= child.height;
                }
                child.yMin = curY;
                if (child.height != 0)
                    curY += child.height + this._lineGap;
            }
        }
        this._updating &= 1;
    }
    handleAlphaChanged() {
        if (this._underConstruct)
            return;
        var cnt = this._parent.numChildren;
        for (var i = 0; i < cnt; i++) {
            var child = this._parent.getChildAt(i);
            if (child.group == this)
                child.alpha = this.alpha;
        }
    }
    handleVisibleChanged() {
        if (!this._parent)
            return;
        var cnt = this._parent.numChildren;
        for (var i = 0; i < cnt; i++) {
            var child = this._parent.getChildAt(i);
            if (child.group == this)
                child.handleVisibleChanged();
        }
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        this._layout = buffer.readByte();
        this._lineGap = buffer.readInt();
        this._columnGap = buffer.readInt();
        if (buffer.version >= 2) {
            this._excludeInvisibles = buffer.readBool();
            this._autoSizeDisabled = buffer.readBool();
            this._mainGridIndex = buffer.readShort();
        }
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        if (!this.visible)
            this.handleVisibleChanged();
    }
}

function convertToHtmlColor(argb, hasAlpha) {
    var alpha;
    if (hasAlpha)
        alpha = (argb >> 24 & 0xFF).toString(16);
    else
        alpha = "";
    var red = (argb >> 16 & 0xFF).toString(16);
    var green = (argb >> 8 & 0xFF).toString(16);
    var blue = (argb & 0xFF).toString(16);
    if (alpha.length == 1)
        alpha = "0" + alpha;
    if (red.length == 1)
        red = "0" + red;
    if (green.length == 1)
        green = "0" + green;
    if (blue.length == 1)
        blue = "0" + blue;
    return "#" + alpha + red + green + blue;
}
function convertFromHtmlColor(str, hasAlpha) {
    if (str.length < 1)
        return 0;
    if (str.charAt(0) == "#")
        str = str.substr(1);
    if (str.length == 8)
        return (parseInt(str.substr(0, 2), 16) << 24) + parseInt(str.substr(2), 16);
    else if (hasAlpha)
        return 0xFF000000 + parseInt(str, 16);
    else
        return parseInt(str, 16);
}
function clamp(value, min, max) {
    if (value < min)
        value = min;
    else if (value > max)
        value = max;
    return value;
}
function clamp01(value) {
    if (isNaN(value))
        value = 0;
    else if (value > 1)
        value = 1;
    else if (value < 0)
        value = 0;
    return value;
}
function lerp(start, end, percent) {
    return (start + percent * (end - start));
}
function repeat(t, length) {
    return t - Math.floor(t / length) * length;
}
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * 1---2
 * | / |
 * 0---3
 * threejs anti-clockwise vertex order. ie 0-2-1， 0-3-2
 */
class VertexBuffer {
    constructor() {
        this.vertices = new Array();
        this.uvs = new Array();
        this.colors = new Array();
        this.triangles = new Array();
        this.contentRect = new Rect();
        this.uvRect = new Rect();
        this.textureSize = new Vector2();
        this.vertexColor = new Color4();
    }
    static begin(source) {
        let inst = pool.borrow();
        if (source) {
            inst.contentRect = source.contentRect;
            inst.uvRect = source.uvRect;
            inst.vertexColor = source.vertexColor;
            inst.textureSize = source.textureSize;
        }
        return inst;
    }
    end() {
        this.clear();
        pool.returns(this);
    }
    clear() {
        this.vertices.length = 0;
        this.colors.length = 0;
        this.uvs.length = 0;
        this.triangles.length = 0;
    }
    get currentVertCount() {
        return this.vertices.length / 3;
    }
    addVert(x, y, z, uv_x, uv_y, color) {
        y = -y;
        this.vertices.push(x, y, z ? z : 0);
        if (typeof uv_x === 'number')
            this.uvs.push(uv_x, uv_y);
        else {
            this.uvs.push(lerp(this.uvRect.x, this.uvRect.xMax, (x - this.contentRect.x) / this.contentRect.width), lerp(this.uvRect.yMax, this.uvRect.y, (-y - this.contentRect.y) / this.contentRect.height));
            if (uv_x instanceof Color4)
                color = uv_x;
        }
        if (color == null)
            color = this.vertexColor;
        this.colors.push(color.r, color.g, color.b, color.a);
    }
    addQuad(vertRect, uvRect, color) {
        uvBuf.length = 0;
        if (uvRect) {
            if (Array.isArray(uvRect)) {
                for (let i = 0; i < 4; i++)
                    uvBuf.push(uvRect[i].x, uvRect[i].y);
            }
            else
                uvBuf.push(uvRect.x, uvRect.y, uvRect.x, uvRect.yMax, uvRect.xMax, uvRect.yMax, uvRect.xMax, uvRect.y);
        }
        this.addVert(vertRect.x, vertRect.yMax, 0, uvBuf[0], uvBuf[1], color);
        this.addVert(vertRect.x, vertRect.y, 0, uvBuf[2], uvBuf[3], color);
        this.addVert(vertRect.xMax, vertRect.y, 0, uvBuf[4], uvBuf[5], color);
        this.addVert(vertRect.xMax, vertRect.yMax, 0, uvBuf[6], uvBuf[7], color);
    }
    repeatColors(value, startIndex, count) {
        let len = Math.min(startIndex + count, this.vertices.length / 3);
        let colorCount = value.length;
        let k = 0;
        for (let i = startIndex; i < len; i++) {
            let c = value[(k++) % colorCount];
            this.colors[i] = c;
        }
    }
    addTriangle(idx0, idx1, idx2) {
        this.triangles.push(idx0);
        this.triangles.push(idx1);
        this.triangles.push(idx2);
    }
    addTriangles(startVertexIndex, idxList) {
        if (idxList != null) {
            if (startVertexIndex != 0) {
                if (startVertexIndex < 0)
                    startVertexIndex = this.vertices.length / 3 + startVertexIndex;
                let cnt = idxList.length;
                for (let i = 0; i < cnt; i++)
                    this.triangles.push(idxList[i] + startVertexIndex);
            }
            else
                this.triangles.push.apply(this.triangles, idxList);
        }
        else {
            let cnt = this.vertices.length / 3;
            if (startVertexIndex == null)
                startVertexIndex = 0;
            else if (startVertexIndex < 0)
                startVertexIndex = cnt + startVertexIndex;
            let idxList = this.triangles;
            for (let i = startVertexIndex; i < cnt; i += 4) {
                idxList.push(i);
                idxList.push(i + 2);
                idxList.push(i + 1);
                idxList.push(i + 3);
                idxList.push(i + 2);
                idxList.push(i);
            }
        }
    }
    getPosition(index, ret) {
        if (index < 0)
            index = this.vertices.length / 3 + index;
        let vec = ret ? ret : new Vector3();
        vec.x = this.vertices[index * 3];
        vec.y = -this.vertices[index * 3 + 1];
        vec.z = this.vertices[index * 3 + 2];
        return vec;
    }
    append(vb) {
        this.vertices.push.apply(this.vertices, vb.vertices);
        this.uvs.push.apply(this.uvs, vb.uvs);
        this.colors.push.apply(this.colors, vb.colors);
        this.triangles.push.apply(this.triangles, vb.triangles);
    }
}
var pool = new Pool(VertexBuffer);
var uvBuf = new Array(8);

class NMaterial extends ShaderMaterial {
    constructor() {
        super();
        let customUniforms = UniformsUtils.merge([
            ShaderLib.basic.uniforms,
            { _ColorMatrix: new Uniform(new Matrix4()) },
            { _ColorOffset: new Uniform(new Vector4()) }
        ]);
        this.uniforms = customUniforms;
        this.vertexShader = `
        #include <common>
        #include <uv_pars_vertex>
        #include <uv2_pars_vertex>
        #include <envmap_pars_vertex>
        varying vec4 vColor;
        attribute vec4 color;
        #include <fog_pars_vertex>
        #include <morphtarget_pars_vertex>
        #include <skinning_pars_vertex>
        #include <logdepthbuf_pars_vertex>
        #include <clipping_planes_pars_vertex>
        
        void main() {
        
            #include <uv_vertex>
            #include <uv2_vertex>

            vColor = color;

            #include <skinbase_vertex>
        
            #ifdef USE_ENVMAP
        
            #include <beginnormal_vertex>
            #include <morphnormal_vertex>
            #include <skinnormal_vertex>
            #include <defaultnormal_vertex>
        
            #endif
        
            #include <begin_vertex>
            #include <morphtarget_vertex>
            #include <skinning_vertex>
            #include <project_vertex>
            #include <logdepthbuf_vertex>
        
            #include <worldpos_vertex>
            #include <clipping_planes_vertex>
            #include <envmap_vertex>
            #include <fog_vertex>
        
        }
        `;
        this.fragmentShader = `
        uniform bool grayed;
        uniform bool colorFilter;
        uniform mat4 colorMatrix;
        uniform vec4 colorOffset;

        uniform vec3 diffuse;
        uniform float opacity;
        #ifndef FLAT_SHADED
            varying vec3 vNormal;
        #endif
        #include <common>
        #include <dithering_pars_fragment>

        varying vec4 vColor;

        #include <uv_pars_fragment>
        #include <uv2_pars_fragment>
        #include <map_pars_fragment>
        #include <alphamap_pars_fragment>
        #include <aomap_pars_fragment>
        #include <lightmap_pars_fragment>
        #include <envmap_common_pars_fragment>
        #include <envmap_pars_fragment>
        #include <cube_uv_reflection_fragment>
        #include <fog_pars_fragment>
        #include <specularmap_pars_fragment>
        #include <logdepthbuf_pars_fragment>
        #include <clipping_planes_pars_fragment>
        void main() {
            #include <clipping_planes_fragment>
            vec4 diffuseColor = vec4( diffuse, opacity );
            #include <logdepthbuf_fragment>
            #ifdef USE_MAP
                #ifdef TEXT
                    vec4 sampleColor = texture2D( map, vUv );
                    if(vColor.a<0.1)
                        diffuseColor.a *= sampleColor.r;
                    else if(vColor.a<0.4)
                        diffuseColor.a *= sampleColor.g;
                    else
                        diffuseColor.a *= sampleColor.b;
                #else
                    #include <map_fragment>
                #endif
            #endif

            #ifdef TEXT
            diffuseColor.rgb *= vColor.rgb;
            #else
            diffuseColor *= vColor;
            #endif

            #include <alphamap_fragment>
            #include <alphatest_fragment>
            #include <specularmap_fragment>
            ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
            // accumulation (baked indirect lighting only)
            #ifdef USE_LIGHTMAP
                vec4 lightMapTexel= texture2D( lightMap, vUv2 );
                reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
            #else
                reflectedLight.indirectDiffuse += vec3( 1.0 );
            #endif
            // modulation
            #include <aomap_fragment>
            reflectedLight.indirectDiffuse *= diffuseColor.rgb;
            vec3 outgoingLight = reflectedLight.indirectDiffuse;
            #include <envmap_fragment>
            gl_FragColor = vec4( outgoingLight, diffuseColor.a );
            #include <tonemapping_fragment>
            #include <encodings_fragment>
            #include <fog_fragment>
            #include <premultiplied_alpha_fragment>
            #include <dithering_fragment>

            #ifdef GRAYED
            float grey = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
            gl_FragColor.rgb = vec3(grey, grey, grey);
            #endif

            #ifdef COLOR_FILTER
            vec4 col = gl_FragColor;
            gl_FragColor.r = dot(col, _ColorMatrix[0]) + _ColorOffset.x;
            gl_FragColor.g = dot(col, _ColorMatrix[1]) + _ColorOffset.y;
            gl_FragColor.b = dot(col, _ColorMatrix[2]) + _ColorOffset.z;
            gl_FragColor.a = dot(col, _ColorMatrix[3]) + _ColorOffset.w;
            #endif
        }
        `;
        this.name = "ui-material";
        this.lights = false;
        this.transparent = true;
        this.depthTest = false;
        this.side = DoubleSide;
        //this.wireframe = true;
        this["isMeshBasicMaterial"] = true;
    }
}

class NGraphics {
    constructor(owner) {
        this._flip = 0;
        this._color = 0xFFFFFF;
        this._contentRect = new Rect();
        this._material = new NMaterial();
        this._geometry = new BufferGeometry();
        let o = owner;
        o.geometry = this._geometry;
        o.material = this._material;
        o.isMesh = true;
        o.drawMode = TrianglesDrawMode;
        delete o.isGroup;
    }
    get texture() {
        return this._texture;
    }
    set texture(value) {
        if (this._texture != value) {
            this._texture = value;
            this._meshDirty = true;
        }
        if (this._texture)
            this._material.map = this._texture.nativeTexture;
        else
            this._material.map = null;
    }
    get material() {
        return this._material;
    }
    set material(value) {
        this._material = value;
    }
    get meshFactory() {
        return this._meshFactory;
    }
    set meshFactory(value) {
        if (this._meshFactory != value) {
            this._meshFactory = value;
            this._meshDirty = true;
        }
    }
    getMeshFactory(type) {
        if (!(this._meshFactory instanceof type)) {
            this._meshFactory = new type();
            this._meshDirty = true;
        }
        return this._meshFactory;
    }
    setDrawRect(rect) {
        this._contentRect.copy(rect);
        this._meshDirty = true;
    }
    get flip() {
        return this._flip;
    }
    set flip(value) {
        if (this._flip != value) {
            this._flip = value;
            this._meshDirty = true;
        }
    }
    get color() {
        return this._color;
    }
    set color(value) {
        if (this._color != value) {
            this._color = value;
            if (!this._meshDirty) {
                s_col.setHex(value);
                let attr = this._geometry.attributes["color"];
                if (attr) {
                    let arr = attr.array;
                    let len = arr.length;
                    for (let i = 0; i < len; i += 4) {
                        arr[i] = s_col.r;
                        arr[i + 1] = s_col.g;
                        arr[i + 2] = s_col.b;
                        arr[i + 3] = s_col.a;
                    }
                    attr.needsUpdate = true;
                }
            }
        }
    }
    get grayed() {
        return this._material.defines.GRAYED;
    }
    set grayed(value) {
        this.setKeyword("GRAYED", value);
    }
    setKeyword(key, value) {
        if (value) {
            this._material.defines[key] = value;
            this._material.needsUpdate = true;
        }
        else
            delete this._material.defines[key];
    }
    setMeshDirty() {
        this._meshDirty = true;
    }
    updateMesh() {
        if (this._meshDirty) {
            this.updateMeshNow();
            return true;
        }
        else
            return false;
    }
    update(clipPlanes, alpha) {
        if (this._meshDirty)
            this.updateMeshNow();
        this._material.clippingPlanes = clipPlanes;
        this._material.clipping = clipPlanes != null;
        this._material.opacity = alpha;
    }
    updateMeshNow() {
        this._meshDirty = false;
        if (!this._texture || !this._meshFactory) {
            if (this._geometry.drawRange.count > 0) {
                this._geometry.setDrawRange(0, 0);
                this._geometry.computeBoundingSphere();
            }
            return;
        }
        let vb = VertexBuffer.begin();
        vb.contentRect.copy(this._contentRect);
        vb.uvRect.copy(this._texture.uvRect);
        if (this._texture)
            vb.textureSize.set(this._texture.width, this._texture.height);
        else
            vb.textureSize.set(0, 0);
        if (this._flip != FlipType.None) {
            if (this._flip == FlipType.Horizontal || this._flip == FlipType.Both) {
                let tmp = vb.uvRect.xMin;
                vb.uvRect.xMin = vb.uvRect.xMax;
                vb.uvRect.xMax = tmp;
            }
            if (this._flip == FlipType.Vertical || this._flip == FlipType.Both) {
                let tmp = vb.uvRect.yMin;
                vb.uvRect.yMin = vb.uvRect.yMax;
                vb.uvRect.yMax = tmp;
            }
        }
        vb.vertexColor.setHex(this._color);
        this._meshFactory.onPopulateMesh(vb);
        let vertCount = vb.currentVertCount;
        if (vertCount == 0) {
            if (this._geometry.drawRange.count > 0) {
                this._geometry.setDrawRange(0, 0);
                this._geometry.computeBoundingSphere();
            }
            vb.end();
            return;
        }
        if (this._texture.rotated) {
            let xMin = this._texture.uvRect.x;
            let yMin = this._texture.uvRect.y;
            let yMax = this._texture.uvRect.yMax;
            let k = 0;
            for (let i = 0; i < vertCount; i++) {
                let v1 = vb.uvs[k];
                let v2 = vb.uvs[k + 1];
                vb.uvs[k + 1] = yMin + v1 - xMin;
                vb.uvs[k] = xMin + yMax - v2;
            }
        }
        let gm = this._geometry;
        this.writeAttribute(gm, "position", vb.vertices, 3);
        this.writeAttribute(gm, "uv", vb.uvs, 2);
        this.writeAttribute(gm, "color", vb.colors, 4);
        this.writeIndexAttribute(gm, vb.triangles);
        gm.setDrawRange(0, vb.triangles.length);
        gm.computeBoundingSphere();
        vb.end();
    }
    writeAttribute(gm, name, arr, itemSize) {
        let attr = gm.attributes[name];
        if (!attr || !attr.isBufferAttribute || attr.array.length < arr.length) {
            attr = new BufferAttribute(new Float32Array(arr.length), itemSize);
            gm.setAttribute(name, attr);
        }
        attr.copyArray(arr);
        attr.needsUpdate = true;
    }
    writeIndexAttribute(gm, arr) {
        let attr = gm.index;
        if (!attr || !attr.isBufferAttribute || attr.array.length < arr.length) {
            attr = new BufferAttribute(new Uint16Array(arr.length), 1);
            gm.index = attr;
        }
        attr.copyArray(arr);
        attr.needsUpdate = true;
    }
    onPopulateMesh(vb) {
        this._texture.getDrawRect(vb.contentRect);
        vb.addQuad(vb.contentRect, vb.uvRect, vb.vertexColor);
        vb.addTriangles();
    }
}
var s_col = new Color4();

var s_rect$2 = new Rect();
class RectMesh {
    constructor() {
        this.lineWidth = 1;
    }
    onPopulateMesh(vb) {
        let rect = this.drawRect ? this.drawRect : vb.contentRect;
        let color = this.fillColor ? this.fillColor : vb.vertexColor;
        let lineColor = this.lineColor ? this.lineColor : vb.vertexColor;
        if (this.lineWidth == 0) {
            if (color.a != 0) //optimized
                vb.addQuad(rect, null, color);
        }
        else {
            let part = s_rect$2;
            //left,right
            part.set(rect.x, rect.y, this.lineWidth, rect.height);
            vb.addQuad(part, null, lineColor);
            part.set(rect.xMax - this.lineWidth, rect.y, this.lineWidth, rect.height);
            vb.addQuad(part, null, lineColor);
            //top, bottom
            part.set(rect.x + this.lineWidth, rect.y, rect.width - this.lineWidth * 2, this.lineWidth);
            vb.addQuad(part, null, lineColor);
            part.set(rect.x + this.lineWidth, rect.yMax - this.lineWidth, rect.width - this.lineWidth * 2, this.lineWidth);
            vb.addQuad(part, null, lineColor);
            //middle
            if (color.a != 0) //optimized
             {
                part.setMinMax(rect.x + this.lineWidth, rect.y + this.lineWidth, rect.xMax - this.lineWidth, rect.yMax - this.lineWidth);
                if (part.width > 0 && part.height > 0)
                    vb.addQuad(part, null, color);
            }
        }
        vb.addTriangles();
    }
}

class NTexture {
    constructor(texture, xScale, yScale) {
        xScale = xScale || 1;
        yScale = yScale || 1;
        this._nativeTexture = texture;
        this._root = this;
        this.uvRect = new Rect(0, 0, xScale, yScale);
        if (yScale < 0) {
            this.uvRect.y = -yScale;
            this.uvRect.height = yScale;
        }
        if (xScale < 0) {
            this.uvRect.x = -xScale;
            this.uvRect.width = xScale;
        }
        this.originalSize = texture ? new Vector2(texture.image.width, texture.image.height) : new Vector2(2, 2);
        this.region = new Rect(0, 0, this.originalSize.x, this.originalSize.y);
        this.offset = new Vector2(0, 0);
    }
    createSubTexture(region, rotated, offset, originalSize) {
        let nt = new NTexture();
        nt._root = this;
        nt.rotated = rotated || false;
        nt.region.copy(region);
        nt.region.x += this.region.x;
        nt.region.y += this.region.y;
        nt.uvRect.set(nt.region.x * this.uvRect.width / this.width, 1 - nt.region.yMax * this.uvRect.height / this.height, nt.region.width * this.uvRect.width / this.width, nt.region.height * this.uvRect.height / this.height);
        if (rotated) {
            let tmp = nt.region.width;
            nt.region.width = nt.region.height;
            nt.region.height = tmp;
            tmp = nt.uvRect.width;
            nt.uvRect.width = nt.uvRect.height;
            nt.uvRect.height = tmp;
        }
        if (originalSize)
            nt.originalSize.copy(originalSize);
        else
            nt.originalSize.set(nt.region.width, nt.region.height);
        if (offset)
            nt.offset.copy(offset);
        return nt;
    }
    get width() {
        return this.region.width;
    }
    get height() {
        return this.region.height;
    }
    get nativeTexture() {
        return this._root == this ? this._nativeTexture : this._root.nativeTexture;
    }
    getDrawRect(drawRect) {
        if (this.originalSize.x == this.region.width && this.originalSize.y == this.region.height)
            return drawRect;
        let sx = drawRect.width / this.originalSize.x;
        let sy = drawRect.height / this.originalSize.y;
        drawRect.x = this.offset.x * sx;
        drawRect.y = this.offset.y * sy;
        drawRect.width = this.region.width * sx;
        drawRect.height = this.region.height * sy;
        return drawRect;
    }
    getUV(uv) {
        uv[0] = this.uvRect.position;
        uv[1] = new Vector2(this.uvRect.x, this.uvRect.yMax);
        uv[2] = new Vector2(this.uvRect.xMax, this.uvRect.yMax);
        uv[3] = new Vector2(this.uvRect.xMax, this.uvRect.y);
        if (this.rotated) {
            let xMin = this.uvRect.xMin;
            let yMin = this.uvRect.yMin;
            let yMax = this.uvRect.yMax;
            for (let i = 0; i < 4; i++) {
                let m = uv[i];
                let tmp = m.y;
                m.y = yMin + m.x - xMin;
                m.x = xMin + yMax - tmp;
            }
        }
    }
    get root() {
        return this._root;
    }
    reload(nativeTexture) {
        if (this._root != this)
            throw new Error("Reload is not allow to call on none root NTexture.");
        if (this._nativeTexture && this._nativeTexture != nativeTexture)
            this._nativeTexture.dispose();
        this._nativeTexture = nativeTexture;
        if (this._nativeTexture)
            this.originalSize.set(nativeTexture.image.width, nativeTexture.image.height);
        else
            this.originalSize.set(0, 0);
        this.region.set(0, 0, this.originalSize.x, this.originalSize.y);
    }
    dispose() {
        if (this._root == this)
            this._nativeTexture.dispose();
    }
}
const EmptyTexture = new NTexture();

class RoundedRectMesh {
    constructor() {
        this.topLeftRadius = 0;
        this.topRightRadius = 0;
        this.bottomLeftRadius = 0;
        this.bottomRightRadius = 0;
        this.lineWidth = 1;
        this.lineColor = new Color4();
    }
    onPopulateMesh(vb) {
        let rect = this.drawRect ? this.drawRect : vb.contentRect;
        let color = this.fillColor ? this.fillColor : vb.vertexColor;
        let lineColor = this.lineColor;
        let radiusX = rect.width / 2;
        let radiusY = rect.height / 2;
        let cornerMaxRadius = Math.min(radiusX, radiusY);
        let centerX = radiusX + rect.x;
        let centerY = radiusY + rect.y;
        vb.addVert(centerX, centerY, 0, color);
        let cnt = vb.currentVertCount;
        for (let i = 0; i < 4; i++) {
            let radius = 0;
            switch (i) {
                case 0:
                    radius = this.bottomRightRadius;
                    break;
                case 1:
                    radius = this.bottomLeftRadius;
                    break;
                case 2:
                    radius = this.topLeftRadius;
                    break;
                case 3:
                    radius = this.topRightRadius;
                    break;
            }
            radius = Math.min(cornerMaxRadius, radius);
            let offsetX = rect.x;
            let offsetY = rect.y;
            if (i == 0 || i == 3)
                offsetX = rect.xMax - radius * 2;
            if (i == 0 || i == 1)
                offsetY = rect.yMax - radius * 2;
            if (radius != 0) {
                let partNumSides = Math.max(1, Math.ceil(Math.PI * radius / 8)) + 1;
                let angleDelta = Math.PI / 2 / partNumSides;
                let angle = Math.PI / 2 * i;
                let startAngle = angle;
                for (let j = 1; j <= partNumSides; j++) {
                    if (j == partNumSides) //消除精度误差带来的不对齐
                        angle = startAngle + Math.PI / 2;
                    let vx = offsetX + Math.cos(angle) * (radius - this.lineWidth) + radius;
                    let vy = offsetY + Math.sin(angle) * (radius - this.lineWidth) + radius;
                    vb.addVert(vx, vy, 0, color);
                    if (this.lineWidth != 0) {
                        vb.addVert(vx, vy, 0, lineColor);
                        vb.addVert(offsetX + Math.cos(angle) * radius + radius, offsetY + Math.sin(angle) * radius + radius, 0, lineColor);
                    }
                    angle += angleDelta;
                }
            }
            else {
                let vx = offsetX;
                let vy = offsetY;
                if (this.lineWidth != 0) {
                    if (i == 0 || i == 3)
                        offsetX -= this.lineWidth;
                    else
                        offsetX += this.lineWidth;
                    if (i == 0 || i == 1)
                        offsetY -= this.lineWidth;
                    else
                        offsetY += this.lineWidth;
                    vb.addVert(offsetX, offsetY, 0, color);
                    vb.addVert(offsetX, offsetY, 0, lineColor);
                    vb.addVert(vx, vy, 0, lineColor);
                }
                else
                    vb.addVert(vx, vy, 0, color);
            }
        }
        cnt = vb.currentVertCount - cnt;
        if (this.lineWidth > 0) {
            for (let i = 0; i < cnt; i += 3) {
                if (i != cnt - 3) {
                    vb.addTriangle(0, i + 4, i + 1);
                    vb.addTriangle(i + 5, i + 3, i + 2);
                    vb.addTriangle(i + 3, i + 5, i + 6);
                }
                else {
                    vb.addTriangle(0, 1, i + 1);
                    vb.addTriangle(2, i + 3, i + 2);
                    vb.addTriangle(i + 3, 2, 3);
                }
            }
        }
        else {
            for (let i = 0; i < cnt; i++)
                vb.addTriangle(0, (i == cnt - 1) ? 1 : i + 2, i + 1);
        }
    }
    hitTest(contentRect, x, y) {
        if (this.drawRect)
            return this.drawRect.contains(x, y);
        else
            return contentRect.contains(x, y);
    }
}

const SECTOR_CENTER_TRIANGLES = [
    0, 4, 1,
    0, 3, 4,
    0, 2, 3,
    0, 8, 5,
    0, 7, 8,
    0, 6, 7,
    6, 5, 2,
    2, 1, 6
];
var s_v3$2 = new Vector3();
class EllipseMesh {
    constructor() {
        this.lineColor = new Color4();
        this.lineWidth = 1;
        this.startDegree = 0;
        this.endDegreee = 360;
    }
    onPopulateMesh(vb) {
        let rect = this.drawRect ? this.drawRect : vb.contentRect;
        let color = this.fillColor ? this.fillColor : vb.vertexColor;
        let lineColor = this.lineColor;
        let sectionStart = clamp(this.startDegree, 0, 360);
        let sectionEnd = clamp(this.endDegreee, 0, 360);
        let clipped = sectionStart > 0 || sectionEnd < 360;
        sectionStart = sectionStart * Math.PI / 180;
        sectionEnd = sectionEnd * Math.PI / 180;
        let enterColor = this.centerColor ? this.centerColor : color;
        let radiusX = rect.width / 2;
        let radiusY = rect.height / 2;
        let sides = Math.ceil(Math.PI * (radiusX + radiusY) / 4);
        sides = clamp(sides, 40, 800);
        let angleDelta = 2 * Math.PI / sides;
        let angle = 0;
        let lineAngle = 0;
        if (this.lineWidth > 0 && clipped) {
            lineAngle = this.lineWidth / Math.max(radiusX, radiusY);
            sectionStart += lineAngle;
            sectionEnd -= lineAngle;
        }
        let vpos = vb.currentVertCount;
        let centerX = rect.x + radiusX;
        let centerY = rect.y + radiusY;
        vb.addVert(centerX, centerY, 0, enterColor);
        for (let i = 0; i < sides; i++) {
            if (angle < sectionStart)
                angle = sectionStart;
            else if (angle > sectionEnd)
                angle = sectionEnd;
            let vx = Math.cos(angle) * (radiusX - this.lineWidth) + centerX;
            let vy = Math.sin(angle) * (radiusY - this.lineWidth) + centerY;
            vb.addVert(vx, vy, 0, color);
            if (this.lineWidth > 0) {
                vb.addVert(vx, vy, 0, lineColor);
                vb.addVert(Math.cos(angle) * radiusX + centerX, Math.sin(angle) * radiusY + centerY, 0, lineColor);
            }
            angle += angleDelta;
        }
        if (this.lineWidth > 0) {
            let cnt = sides * 3;
            for (let i = 0; i < cnt; i += 3) {
                if (i != cnt - 3) {
                    vb.addTriangle(0, i + 4, i + 1);
                    vb.addTriangle(i + 5, i + 3, i + 2);
                    vb.addTriangle(i + 3, i + 5, i + 6);
                }
                else if (!clipped) {
                    vb.addTriangle(0, 1, i + 1);
                    vb.addTriangle(2, i + 3, i + 2);
                    vb.addTriangle(i + 3, 2, 3);
                }
                else {
                    vb.addTriangle(0, i + 1, i + 1);
                    vb.addTriangle(i + 2, i + 3, i + 2);
                    vb.addTriangle(i + 3, i + 2, i + 3);
                }
            }
        }
        else {
            for (let i = 0; i < sides; i++) {
                if (i != sides - 1)
                    vb.addTriangle(0, i + 2, i + 1);
                else if (!clipped)
                    vb.addTriangle(0, 1, i + 1);
                else
                    vb.addTriangle(0, i + 1, i + 1);
            }
        }
        if (this.lineWidth > 0 && clipped) {
            //扇形内边缘的线条
            vb.addVert(radiusX, radiusY, 0, lineColor);
            let centerRadius = this.lineWidth * 0.5;
            sectionStart -= lineAngle;
            angle = sectionStart + lineAngle * 0.5 + Math.PI * 0.5;
            vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
            angle -= Math.PI;
            vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
            vb.addVert(Math.cos(sectionStart) * radiusX + radiusX, Math.sin(sectionStart) * radiusY + radiusY, 0, lineColor);
            vb.getPosition(vpos + 3, s_v3$2);
            vb.addVert(s_v3$2.x, s_v3$2.y, s_v3$2.z, lineColor);
            sectionEnd += lineAngle;
            angle = sectionEnd - lineAngle * 0.5 + Math.PI * 0.5;
            vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
            angle -= Math.PI;
            vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
            vb.getPosition(vpos + sides * 3, s_v3$2);
            vb.addVert(s_v3$2.x, s_v3$2.y, s_v3$2.z, lineColor);
            vb.addVert(Math.cos(sectionEnd) * radiusX + radiusX, Math.sin(sectionEnd) * radiusY + radiusY, 0, lineColor);
            vb.addTriangles(sides * 3 + 1, SECTOR_CENTER_TRIANGLES);
        }
    }
    hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y))
            return false;
        let radiusX = contentRect.width * 0.5;
        let raduisY = contentRect.height * 0.5;
        x = x - radiusX - contentRect.x;
        y = y - raduisY - contentRect.y;
        if (Math.pow(x / radiusX, 2) + Math.pow(y / raduisY, 2) < 1) {
            if (this.startDegree != 0 || this.endDegreee != 360) {
                let deg = Math.atan2(y, x) * 180 / Math.PI;
                if (deg < 0)
                    deg += 360;
                return deg >= this.startDegree && deg <= this.endDegreee;
            }
            else
                return true;
        }
        return false;
    }
}

var sRestIndices = [];
var a = new Vector2();
var b = new Vector2();
var c = new Vector2();
var p = new Vector2();
var p0 = new Vector3();
var p1 = new Vector3();
var p3 = new Vector3();
var lineVector = new Vector3();
var widthVector = new Vector3();
class PolygonMesh {
    constructor() {
        this.points = new Array();
        this.texcoords = new Array();
    }
    add(x, y, uv_x, uv_y) {
        this.points.push(x, y);
        if (uv_x != null)
            this.texcoords.push(uv_x, uv_y);
    }
    onPopulateMesh(vb) {
        let numVertices = this.points.length / 2;
        if (numVertices < 3)
            return;
        let restIndexPos, numRestIndices;
        let color = this.fillColor != null ? this.fillColor : vb.vertexColor;
        let w = vb.contentRect.width;
        let h = vb.contentRect.height;
        let useTexcoords = this.texcoords.length >= this.points.length;
        for (let i = 0; i < numVertices; i++) {
            let j = i * 2;
            let vx = this.points[j];
            let vy = this.points[j + 1];
            if (this.usePercentPositions) {
                vx *= w;
                vy *= h;
            }
            if (useTexcoords) {
                let ux = this.texcoords[j];
                let uy = this.texcoords[j + 1];
                ux = lerp(vb.uvRect.x, vb.uvRect.xMax, ux);
                uy = lerp(vb.uvRect.y, vb.uvRect.yMax, uy);
                vb.addVert(vx, vy, 0, ux, uy, color);
            }
            else
                vb.addVert(vx, vy, 0, color);
        }
        // Algorithm "Ear clipping method" described here:
        // -> https://en.wikipedia.org/wiki/Polygon_triangulation
        //
        // Implementation inspired by:
        // -> http://polyk.ivank.net
        // -> Starling
        sRestIndices.length = 0;
        for (let i = 0; i < numVertices; ++i)
            sRestIndices.push(i);
        restIndexPos = 0;
        numRestIndices = numVertices;
        let otherIndex;
        let earFound;
        let i0, i1, i2;
        while (numRestIndices > 3) {
            earFound = false;
            i0 = sRestIndices[restIndexPos % numRestIndices];
            i1 = sRestIndices[(restIndexPos + 1) % numRestIndices];
            i2 = sRestIndices[(restIndexPos + 2) % numRestIndices];
            a.set(this.points[i0 * 2], this.points[i0 * 2 + 1]);
            b.set(this.points[i1 * 2], this.points[i1 * 2 + 1]);
            c.set(this.points[i2 * 2], this.points[i2 * 2 + 1]);
            if ((a.y - b.y) * (c.x - b.x) + (b.x - a.x) * (c.y - b.y) >= 0) {
                earFound = true;
                for (let i = 3; i < numRestIndices; ++i) {
                    otherIndex = sRestIndices[(restIndexPos + i) % numRestIndices];
                    p.set(this.points[otherIndex * 2], this.points[otherIndex * 2 + 1]);
                    if (this.isPointInTriangle(p, a, b, c)) {
                        earFound = false;
                        break;
                    }
                }
            }
            if (earFound) {
                vb.addTriangle(i0, i2, i1);
                sRestIndices.splice((restIndexPos + 1) % numRestIndices, 1);
                numRestIndices--;
                restIndexPos = 0;
            }
            else {
                restIndexPos++;
                if (restIndexPos == numRestIndices)
                    break; // no more ears
            }
        }
        vb.addTriangle(sRestIndices[0], sRestIndices[2], sRestIndices[1]);
        if (this.lineWidth > 0)
            this.drawOutline(vb);
    }
    drawOutline(vb) {
        let numVertices = this.points.length / 2;
        let start = vb.currentVertCount - numVertices;
        let k = vb.currentVertCount;
        for (let i = 0; i < numVertices; i++) {
            vb.getPosition(start + i, p0);
            if (i < numVertices - 1)
                vb.getPosition(start + i + 1, p1);
            else
                vb.getPosition(vb.vertices[start], p1);
            lineVector.copy(p1);
            lineVector.sub(p0);
            widthVector.copy(lineVector);
            widthVector.cross(new Vector3(0, 0, 1));
            widthVector.normalize();
            widthVector.multiplyScalar(this.lineWidth * 0.5);
            p3.copy(p0);
            p3.sub(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);
            p3.copy(p0);
            p3.add(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);
            p3.copy(p1);
            p3.sub(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);
            p3.copy(p1);
            p3.add(widthVector);
            vb.addVert(p3.x, p3.y, p3.z, this.lineColor);
            k += 4;
            vb.addTriangle(k - 4, k - 1, k - 3);
            vb.addTriangle(k - 4, k - 2, k - 1);
            //joint
            if (i != 0) {
                vb.addTriangle(k - 6, k - 3, k - 5);
                vb.addTriangle(k - 6, k - 4, k - 3);
            }
            if (i == numVertices - 1) {
                start += numVertices;
                vb.addTriangle(k - 2, start + 1, k - 1);
                vb.addTriangle(k - 2, start, start + 1);
            }
        }
    }
    isPointInTriangle(p, a, b, c) {
        // From Starling
        // This algorithm is described well in this article:
        // http://www.blackpawn.com/texts/pointinpoly/default.html
        let v0x = c.x - a.x;
        let v0y = c.y - a.y;
        let v1x = b.x - a.x;
        let v1y = b.y - a.y;
        let v2x = p.x - a.x;
        let v2y = p.y - a.y;
        let dot00 = v0x * v0x + v0y * v0y;
        let dot01 = v0x * v1x + v0y * v1y;
        let dot02 = v0x * v2x + v0y * v2y;
        let dot11 = v1x * v1x + v1y * v1y;
        let dot12 = v1x * v2x + v1y * v2y;
        let invDen = 1.0 / (dot00 * dot11 - dot01 * dot01);
        let u = (dot11 * dot02 - dot01 * dot12) * invDen;
        let v = (dot00 * dot12 - dot01 * dot02) * invDen;
        return (u >= 0) && (v >= 0) && (u + v < 1);
    }
    hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y))
            return false;
        // Algorithm & implementation thankfully taken from:
        // -> http://alienryderflex.com/polygon/
        // inspired by Starling
        let len = this.points.length / 2;
        let i;
        let j = len - 1;
        let oddNodes = false;
        let w = contentRect.width;
        let h = contentRect.height;
        for (i = 0; i < len; ++i) {
            let ix = this.points[i * 2];
            let iy = this.points[i * 2 + 1];
            let jx = this.points[j * 2];
            let jy = this.points[j * 2 + 1];
            if (this.usePercentPositions) {
                ix *= w;
                iy *= h;
                ix *= w;
                iy *= h;
            }
            if ((iy < y && jy >= y || jy < y && iy >= y) && (ix <= x || jx <= x)) {
                if (ix + (y - iy) / (jy - iy) * (jx - ix) < x)
                    oddNodes = !oddNodes;
            }
            j = i;
        }
        return oddNodes;
    }
}

class RegularPolygonMesh {
    constructor() {
        this.sides = 3;
        this.lineWidth = 1;
        this.lineColor = new Color4();
    }
    onPopulateMesh(vb) {
        if (this.distances != null && this.distances.length < this.sides) {
            console.error("distances.Length<sides");
            return;
        }
        let rect = this.drawRect != null ? this.drawRect : vb.contentRect;
        let color = this.fillColor != null ? this.fillColor : vb.vertexColor;
        let angleDelta = 2 * Math.PI / this.sides;
        let angle = this.rotation * Math.PI / 180;
        let radius = Math.min(rect.width / 2, rect.height / 2);
        let centerX = radius + rect.x;
        let centerY = radius + rect.y;
        vb.addVert(centerX, centerY, 0, this.centerColor ? this.centerColor : color);
        for (let i = 0; i < this.sides; i++) {
            let r = radius;
            if (this.distances != null)
                r *= this.distances[i];
            let xv = Math.cos(angle) * (r - this.lineWidth);
            let yv = Math.sin(angle) * (r - this.lineWidth);
            vb.addVert(xv + centerX, yv + centerY, 0, color);
            if (this.lineWidth > 0) {
                vb.addVert(xv + centerX, yv + centerY, 0, this.lineColor);
                xv = Math.cos(angle) * r + centerX;
                yv = Math.sin(angle) * r + centerY;
                vb.addVert(xv, yv, 0, this.lineColor);
            }
            angle += angleDelta;
        }
        if (this.lineWidth > 0) {
            let tmp = this.sides * 3;
            for (let i = 0; i < tmp; i += 3) {
                if (i != tmp - 3) {
                    vb.addTriangle(0, i + 4, i + 1);
                    vb.addTriangle(i + 5, i + 3, i + 2);
                    vb.addTriangle(i + 3, i + 5, i + 6);
                }
                else {
                    vb.addTriangle(0, 1, i + 1);
                    vb.addTriangle(2, i + 3, i + 2);
                    vb.addTriangle(i + 3, 2, 3);
                }
            }
        }
        else {
            for (let i = 0; i < this.sides; i++)
                vb.addTriangle(0, (i == this.sides - 1) ? 1 : i + 2, i + 1);
        }
    }
    hitTest(contentRect, x, y) {
        if (this.drawRect)
            return this.drawRect.contains(x, y);
        else
            return contentRect.contains(x, y);
    }
}

class Shape extends DisplayObject {
    constructor() {
        super();
        this._graphics = new NGraphics(this._obj3D);
        this._graphics.texture = EmptyTexture;
    }
    drawRect(lineWidth, lineColor, fillColor) {
        let mesh = this._graphics.getMeshFactory(RectMesh);
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    drawRoundRect(lineWidth, lineColor, fillColor, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius) {
        let mesh = this._graphics.getMeshFactory(RoundedRectMesh);
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        mesh.topLeftRadius = topLeftRadius;
        mesh.topRightRadius = topRightRadius;
        mesh.bottomLeftRadius = bottomLeftRadius;
        mesh.bottomRightRadius = bottomRightRadius;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    drawEllipse(lineWidth, centerColor, lineColor, fillColor, startDegree, endDegree) {
        let mesh = this._graphics.getMeshFactory(EllipseMesh);
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        if (centerColor.equals(fillColor))
            mesh.centerColor = null;
        else
            mesh.centerColor = centerColor;
        mesh.startDegree = startDegree;
        mesh.endDegreee = endDegree;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    drawPolygon(points, fillColor, lineWidth, lineColor) {
        let mesh = this._graphics.getMeshFactory(PolygonMesh);
        mesh.points.length = 0;
        mesh.points.push.apply(mesh.points, points);
        mesh.fillColor = fillColor;
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    drawRegularPolygon(sides, lineWidth, centerColor, lineColor, fillColor, rotation, distances) {
        let mesh = this._graphics.getMeshFactory(RegularPolygonMesh);
        mesh.sides = sides;
        mesh.lineWidth = lineWidth;
        mesh.centerColor = centerColor;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        mesh.rotation = rotation;
        mesh.distances = distances;
        this._graphics.setMeshDirty();
        if (fillColor.a == 1) {
            mesh.fillColor = null;
            this._graphics.color = fillColor.getHex();
        }
        else
            this._graphics.color = 0xFFFFFF;
    }
    clear() {
        this._graphics.meshFactory = null;
        this._graphics.setMeshDirty();
    }
    hitTest(context) {
        if (!this._graphics.meshFactory)
            return null;
        let pt = context.getLocal(this);
        let ht = this._graphics.meshFactory;
        if ('hitTest' in ht)
            return ht.hitTest(this._contentRect, pt.x, pt.y) ? this : null;
        else if (this._contentRect.contains(pt))
            return this;
        else
            return null;
    }
}

class GGraph extends GObject {
    constructor() {
        super();
    }
    get shape() {
        return this._shape;
    }
    get color() {
        return this._shape.graphics.color;
    }
    set color(value) {
        if (this._shape.graphics.color != value) {
            this._shape.graphics.color = value;
            this.updateGear(4);
        }
    }
    createDisplayObject() {
        this._displayObject = this._shape = new Shape();
    }
    getProp(index) {
        if (index == ObjectPropID.Color)
            return this.color;
        else
            return super.getProp(index);
    }
    setProp(index, value) {
        if (index == ObjectPropID.Color)
            this.color = value;
        else
            super.setProp(index, value);
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        let type = buffer.readByte();
        if (type != 0) {
            let i;
            let cnt;
            let lineSize = buffer.readInt();
            let lineColor = buffer.readFullColor();
            let fillColor = buffer.readFullColor();
            let roundedRect = buffer.readBool();
            let cornerRadius;
            if (roundedRect) {
                cornerRadius = [];
                for (i = 0; i < 4; i++)
                    cornerRadius[i] = buffer.readFloat();
            }
            if (type == 1) {
                if (roundedRect)
                    this._shape.drawRoundRect(lineSize, lineColor, fillColor, cornerRadius[0], cornerRadius[1], cornerRadius[2], cornerRadius[3]);
                else
                    this._shape.drawRect(lineSize, lineColor, fillColor);
            }
            else if (type == 2) {
                this._shape.drawEllipse(lineSize, fillColor, lineColor, fillColor, 0, 360);
            }
            else if (type == 3) {
                cnt = buffer.readShort();
                let points = [];
                points.length = cnt;
                for (i = 0; i < cnt; i++)
                    points[i] = buffer.readFloat();
                this._shape.drawPolygon(points, fillColor, lineSize, lineColor);
            }
            else if (type == 4) {
                let sides = buffer.readShort();
                let startAngle = buffer.readFloat();
                cnt = buffer.readShort();
                let distances;
                if (cnt > 0) {
                    distances = [];
                    for (i = 0; i < cnt; i++)
                        distances[i] = buffer.readFloat();
                }
                this._shape.drawRegularPolygon(sides, lineSize, fillColor, lineColor, fillColor, startAngle, distances);
            }
        }
    }
}

class FillMesh {
    constructor() {
        this.origin = 0;
        this.amount = 1;
        this.clockwise = true;
    }
    onPopulateMesh(vb) {
        let amount = clamp01(this.amount);
        switch (this.method) {
            case FillMethod.Horizontal:
                fillHorizontal(vb, vb.contentRect, this.origin, amount);
                break;
            case FillMethod.Vertical:
                fillVertical(vb, vb.contentRect, this.origin, amount);
                break;
            case FillMethod.Radial90:
                fillRadial90(vb, vb.contentRect, this.origin, amount, this.clockwise);
                break;
            case FillMethod.Radial180:
                fillRadial180(vb, vb.contentRect, this.origin, amount, this.clockwise);
                break;
            case FillMethod.Radial360:
                fillRadial360(vb, vb.contentRect, this.origin, amount, this.clockwise);
                break;
        }
    }
}
var s_vec3 = new Vector3();
var s_rect$3 = new Rect();
function fillHorizontal(vb, vertRect, origin, amount) {
    s_rect$3.copy(vertRect);
    vertRect = s_rect$3;
    let a = vertRect.width * amount;
    if (origin == FillOrigin.Right || origin == FillOrigin.Bottom)
        vertRect.x += (vertRect.width - a);
    vertRect.width = a;
    vb.addQuad(vertRect);
    vb.addTriangles();
}
function fillVertical(vb, vertRect, origin, amount) {
    s_rect$3.copy(vertRect);
    vertRect = s_rect$3;
    let a = vertRect.height * amount;
    if (origin == FillOrigin.Right || origin == FillOrigin.Bottom)
        vertRect.y += (vertRect.height - a);
    vertRect.height = a;
    vb.addQuad(vertRect);
    vb.addTriangles();
}
//4 vertex
function fillRadial90(vb, vertRect, origin, amount, clockwise) {
    let flipX = origin == FillOrigin.TopRight || origin == FillOrigin.BottomRight;
    let flipY = origin == FillOrigin.BottomLeft || origin == FillOrigin.BottomRight;
    if (flipX != flipY)
        clockwise = !clockwise;
    let ratio = clockwise ? amount : (1 - amount);
    let tan = Math.tan(Math.PI * 0.5 * ratio);
    let thresold = false;
    if (ratio != 1)
        thresold = (vertRect.height / vertRect.width - tan) > 0;
    if (!clockwise)
        thresold = !thresold;
    let x = vertRect.x + (ratio == 0 ? Number.POSITIVE_INFINITY : (vertRect.height / tan));
    let y = vertRect.y + (ratio == 1 ? Number.POSITIVE_INFINITY : (vertRect.width * tan));
    let x2 = x;
    let y2 = y;
    if (flipX)
        x2 = vertRect.width - x;
    if (flipY)
        y2 = vertRect.height - y;
    let xMin = flipX ? (vertRect.width - vertRect.x) : vertRect.xMin;
    let yMin = flipY ? (vertRect.height - vertRect.y) : vertRect.yMin;
    let xMax = flipX ? -vertRect.x : vertRect.xMax;
    let yMax = flipY ? -vertRect.y : vertRect.yMax;
    vb.addVert(xMin, yMin, 0);
    if (clockwise)
        vb.addVert(xMax, yMin, 0);
    if (y > vertRect.yMax) {
        if (thresold)
            vb.addVert(x2, yMax, 0);
        else
            vb.addVert(xMax, yMax, 0);
    }
    else
        vb.addVert(xMax, y2, 0);
    if (x > vertRect.xMax) {
        if (thresold)
            vb.addVert(xMax, y2, 0);
        else
            vb.addVert(xMax, yMax, 0);
    }
    else
        vb.addVert(x2, yMax, 0);
    if (!clockwise)
        vb.addVert(xMin, yMax, 0);
    if (flipX == flipY) {
        vb.addTriangle(0, 2, 1);
        vb.addTriangle(0, 3, 2);
    }
    else {
        vb.addTriangle(2, 0, 1);
        vb.addTriangle(3, 0, 2);
    }
}
//8 vertex
var s_rect_180 = new Rect();
function fillRadial180(vb, vertRect, origin, amount, clockwise) {
    s_rect_180.copy(vertRect);
    vertRect = s_rect_180;
    switch (origin) {
        case FillOrigin.Top:
            if (amount <= 0.5) {
                vertRect.width /= 2;
                if (clockwise)
                    vertRect.x += vertRect.width;
                fillRadial90(vb, vertRect, clockwise ? FillOrigin.TopLeft : FillOrigin.TopRight, amount / 0.5, clockwise);
                let vec = vb.getPosition(-4, s_vec3);
                s_rect$3.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect$3);
                vb.addTriangles(-4);
            }
            else {
                vertRect.width /= 2;
                if (!clockwise)
                    vertRect.x += vertRect.width;
                fillRadial90(vb, vertRect, clockwise ? FillOrigin.TopRight : FillOrigin.TopLeft, (amount - 0.5) / 0.5, clockwise);
                if (clockwise)
                    vertRect.x += vertRect.width;
                else
                    vertRect.x -= vertRect.width;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
        case FillOrigin.Bottom:
            if (amount <= 0.5) {
                vertRect.width /= 2;
                if (!clockwise)
                    vertRect.x += vertRect.width;
                fillRadial90(vb, vertRect, clockwise ? FillOrigin.BottomRight : FillOrigin.BottomLeft, amount / 0.5, clockwise);
                let vec = vb.getPosition(-4, s_vec3);
                s_rect$3.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect$3);
                vb.addTriangles(-4);
            }
            else {
                vertRect.width /= 2;
                if (clockwise)
                    vertRect.x += vertRect.width;
                fillRadial90(vb, vertRect, clockwise ? FillOrigin.BottomLeft : FillOrigin.BottomRight, (amount - 0.5) / 0.5, clockwise);
                if (clockwise)
                    vertRect.x -= vertRect.width;
                else
                    vertRect.x += vertRect.width;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
        case FillOrigin.Left:
            if (amount <= 0.5) {
                vertRect.height /= 2;
                if (!clockwise)
                    vertRect.y += vertRect.height;
                fillRadial90(vb, vertRect, clockwise ? FillOrigin.BottomLeft : FillOrigin.TopLeft, amount / 0.5, clockwise);
                let vec = vb.getPosition(-4, s_vec3);
                s_rect$3.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect$3);
                vb.addTriangles(-4);
            }
            else {
                vertRect.height /= 2;
                if (clockwise)
                    vertRect.y += vertRect.height;
                fillRadial90(vb, vertRect, clockwise ? FillOrigin.TopLeft : FillOrigin.BottomLeft, (amount - 0.5) / 0.5, clockwise);
                if (clockwise)
                    vertRect.y -= vertRect.height;
                else
                    vertRect.y += vertRect.height;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
        case FillOrigin.Right:
            if (amount <= 0.5) {
                vertRect.height /= 2;
                if (clockwise)
                    vertRect.y += vertRect.height;
                fillRadial90(vb, vertRect, clockwise ? FillOrigin.TopRight : FillOrigin.BottomRight, amount / 0.5, clockwise);
                let vec = vb.getPosition(-4, s_vec3);
                s_rect$3.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect$3);
                vb.addTriangles(-4);
            }
            else {
                vertRect.height /= 2;
                if (!clockwise)
                    vertRect.y += vertRect.height;
                fillRadial90(vb, vertRect, clockwise ? FillOrigin.BottomRight : FillOrigin.TopRight, (amount - 0.5) / 0.5, clockwise);
                if (clockwise)
                    vertRect.y += vertRect.height;
                else
                    vertRect.y -= vertRect.height;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
    }
}
//12 vertex
var s_rect_360 = new Rect();
function fillRadial360(vb, vertRect, origin, amount, clockwise) {
    s_rect_360.copy(vertRect);
    vertRect = s_rect_360;
    switch (origin) {
        case FillOrigin.Top:
            if (amount < 0.5) {
                vertRect.width /= 2;
                if (clockwise)
                    vertRect.x += vertRect.width;
                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Left : FillOrigin.Right, amount / 0.5, clockwise);
                let vec = vb.getPosition(-8, s_vec3);
                s_rect$3.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect$3);
                vb.addTriangles(-4);
            }
            else {
                vertRect.width /= 2;
                if (!clockwise)
                    vertRect.x += vertRect.width;
                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Right : FillOrigin.Left, (amount - 0.5) / 0.5, clockwise);
                if (clockwise)
                    vertRect.x += vertRect.width;
                else
                    vertRect.x -= vertRect.width;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
        case FillOrigin.Bottom:
            if (amount < 0.5) {
                vertRect.width /= 2;
                if (!clockwise)
                    vertRect.x += vertRect.width;
                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Right : FillOrigin.Left, amount / 0.5, clockwise);
                let vec = vb.getPosition(-8, s_vec3);
                s_rect$3.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect$3);
                vb.addTriangles(-4);
            }
            else {
                vertRect.width /= 2;
                if (clockwise)
                    vertRect.x += vertRect.width;
                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Left : FillOrigin.Right, (amount - 0.5) / 0.5, clockwise);
                if (clockwise)
                    vertRect.x -= vertRect.width;
                else
                    vertRect.x += vertRect.width;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
        case FillOrigin.Left:
            if (amount < 0.5) {
                vertRect.height /= 2;
                if (!clockwise)
                    vertRect.y += vertRect.height;
                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Bottom : FillOrigin.Top, amount / 0.5, clockwise);
                let vec = vb.getPosition(-8, s_vec3);
                s_rect$3.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect$3);
                vb.addTriangles(-4);
            }
            else {
                vertRect.height /= 2;
                if (clockwise)
                    vertRect.y += vertRect.height;
                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Top : FillOrigin.Bottom, (amount - 0.5) / 0.5, clockwise);
                if (clockwise)
                    vertRect.y -= vertRect.height;
                else
                    vertRect.y += vertRect.height;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
        case FillOrigin.Right:
            if (amount < 0.5) {
                vertRect.height /= 2;
                if (clockwise)
                    vertRect.y += vertRect.height;
                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Top : FillOrigin.Bottom, amount / 0.5, clockwise);
                let vec = vb.getPosition(-8, s_vec3);
                s_rect$3.set(vec.x, vec.y, 0, 0);
                vb.addQuad(s_rect$3);
                vb.addTriangles(-4);
            }
            else {
                vertRect.height /= 2;
                if (!clockwise)
                    vertRect.y += vertRect.height;
                fillRadial180(vb, vertRect, clockwise ? FillOrigin.Bottom : FillOrigin.Top, (amount - 0.5) / 0.5, clockwise);
                if (clockwise)
                    vertRect.y += vertRect.height;
                else
                    vertRect.y -= vertRect.height;
                vb.addQuad(vertRect);
                vb.addTriangles(-4);
            }
            break;
    }
}

class Image extends DisplayObject {
    constructor() {
        super();
        this._tileGridIndice = 0;
        this._graphics = new NGraphics(this._obj3D);
        this._graphics.meshFactory = this;
        this._textureScale = new Vector2(1, 1);
    }
    get texture() {
        return this._graphics.texture;
    }
    set texture(value) {
        this._graphics.texture = value;
    }
    get textureScale() {
        return this._textureScale;
    }
    set textureScale(value) {
        if (!this._textureScale.equals(value)) {
            this._textureScale.copy(value);
            this._graphics.setMeshDirty();
        }
    }
    get scale9Grid() {
        return this._scale9Grid;
    }
    set scale9Grid(value) {
        this._scale9Grid = value;
        this._graphics.setMeshDirty();
    }
    get scaleByTile() {
        return this._scaleByTile;
    }
    set scaleByTile(value) {
        if (this._scaleByTile != value) {
            this._scaleByTile = value;
            this._graphics.setMeshDirty();
        }
    }
    get tileGridIndice() {
        return this._tileGridIndice;
    }
    set tileGridIndice(value) {
        if (this._tileGridIndice != value) {
            this._tileGridIndice = value;
            this._graphics.setMeshDirty();
        }
    }
    get fillMethod() {
        return this._fillMesh ? this._fillMesh.method : FillMethod.None;
    }
    set fillMethod(value) {
        if (!this._fillMesh) {
            if (value == FillMethod.None)
                return;
            this._fillMesh = new FillMesh();
        }
        if (this._fillMesh.method != value) {
            this._fillMesh.method = value;
            this._graphics.setMeshDirty();
        }
    }
    get fillOrigin() {
        return this._fillMesh ? this._fillMesh.origin : 0;
    }
    set fillOrigin(value) {
        if (!this._fillMesh)
            this._fillMesh = new FillMesh();
        if (this._fillMesh.origin != value) {
            this._fillMesh.origin = value;
            this._graphics.setMeshDirty();
        }
    }
    get fillClockwise() {
        return this._fillMesh ? this._fillMesh.clockwise : true;
    }
    set fillClockwise(value) {
        if (!this._fillMesh)
            this._fillMesh = new FillMesh();
        if (this._fillMesh.clockwise != value) {
            this._fillMesh.clockwise = value;
            this._graphics.setMeshDirty();
        }
    }
    get fillAmount() {
        return this._fillMesh ? this._fillMesh.amount : 0;
    }
    set fillAmount(value) {
        if (!this._fillMesh)
            this._fillMesh = new FillMesh();
        if (this._fillMesh.amount != value) {
            this._fillMesh.amount = value;
            this._graphics.setMeshDirty();
        }
    }
    onPopulateMesh(vb) {
        if (this._fillMesh && this._fillMesh.method != FillMethod.None) {
            this._fillMesh.onPopulateMesh(vb);
        }
        else if (this._scaleByTile) {
            contentRect.copy(vb.contentRect);
            contentRect.width *= this._textureScale.x;
            contentRect.height *= this._textureScale.y;
            this.tileFill(vb, contentRect, vb.uvRect, this._graphics.texture.width, this._graphics.texture.height);
            vb.addTriangles();
        }
        else if (this._scale9Grid) {
            this.sliceFill(vb);
        }
        else
            this._graphics.onPopulateMesh(vb);
    }
    sliceFill(vb) {
        let texture = this.texture;
        gridRect.copy(this._scale9Grid);
        contentRect.copy(vb.contentRect);
        contentRect.width *= this._textureScale.x;
        contentRect.height *= this._textureScale.y;
        let uvRect = vb.uvRect;
        let sourceW = texture.width;
        let sourceH = texture.height;
        let flip = this._graphics.flip;
        if (flip != FlipType.None) {
            if (flip == FlipType.Horizontal || flip == FlipType.Both) {
                gridRect.x = sourceW - gridRect.xMax;
                gridRect.xMax = gridRect.x + gridRect.width;
            }
            if (flip == FlipType.Vertical || flip == FlipType.Both) {
                gridRect.y = sourceH - gridRect.yMax;
                gridRect.yMax = gridRect.y + gridRect.height;
            }
        }
        let sx = uvRect.width / sourceW;
        let sy = uvRect.height / sourceH;
        let xMax = uvRect.xMax;
        let yMax = uvRect.yMax;
        let xMax2 = gridRect.xMax;
        let yMax2 = gridRect.yMax;
        gridTexX[0] = uvRect.x;
        gridTexX[1] = uvRect.x + gridRect.x * sx;
        gridTexX[2] = uvRect.x + xMax2 * sx;
        gridTexX[3] = xMax;
        gridTexY[0] = yMax;
        gridTexY[1] = yMax - gridRect.y * sy;
        gridTexY[2] = yMax - yMax2 * sy;
        gridTexY[3] = uvRect.y;
        if (contentRect.width >= (sourceW - gridRect.width)) {
            gridX[1] = gridRect.x;
            gridX[2] = contentRect.width - (sourceW - xMax2);
            gridX[3] = contentRect.width;
        }
        else {
            let tmp = gridRect.x / (sourceW - xMax2);
            tmp = contentRect.width * tmp / (1 + tmp);
            gridX[1] = tmp;
            gridX[2] = tmp;
            gridX[3] = contentRect.width;
        }
        if (contentRect.height >= (sourceH - gridRect.height)) {
            gridY[1] = gridRect.y;
            gridY[2] = contentRect.height - (sourceH - yMax2);
            gridY[3] = contentRect.height;
        }
        else {
            let tmp = gridRect.y / (sourceH - yMax2);
            tmp = contentRect.height * tmp / (1 + tmp);
            gridY[1] = tmp;
            gridY[2] = tmp;
            gridY[3] = contentRect.height;
        }
        if (this._tileGridIndice == 0) {
            for (let cy = 0; cy < 4; cy++) {
                for (let cx = 0; cx < 4; cx++)
                    vb.addVert(gridX[cx] / this._textureScale.x, gridY[cy] / this._textureScale.y, 0, gridTexX[cx], gridTexY[cy], vb.vertexColor);
            }
            vb.addTriangles(0, TRIANGLES_9_GRID);
        }
        else {
            let row, col;
            let part;
            for (let pi = 0; pi < 9; pi++) {
                col = pi % 3;
                row = pi / 3;
                part = gridTileIndice[pi];
                drawRect.setMinMax(gridX[col], gridY[row], gridX[col + 1], gridY[row + 1]);
                texRect.setMinMax(gridTexX[col], gridTexY[row + 1], gridTexX[col + 1], gridTexY[row]);
                if (part != -1 && (this._tileGridIndice & (1 << part)) != 0) {
                    this.tileFill(vb, drawRect, texRect, (part == 0 || part == 1 || part == 4) ? gridRect.width : drawRect.width, (part == 2 || part == 3 || part == 4) ? gridRect.height : drawRect.height);
                }
                else {
                    drawRect.x /= this._textureScale.x;
                    drawRect.y /= this._textureScale.y;
                    drawRect.width /= this._textureScale.x;
                    drawRect.height /= this._textureScale.y;
                    vb.addQuad(drawRect, texRect, vb.vertexColor);
                }
            }
            vb.addTriangles();
        }
    }
    tileFill(vb, contentRect, uvRect, sourceW, sourceH) {
        let hc = Math.ceil(contentRect.width / sourceW);
        let vc = Math.ceil(contentRect.height / sourceH);
        let tailWidth = contentRect.width - (hc - 1) * sourceW;
        let tailHeight = contentRect.height - (vc - 1) * sourceH;
        let xMax = uvRect.xMax;
        let yMax = uvRect.yMax;
        for (let i = 0; i < hc; i++) {
            for (let j = 0; j < vc; j++) {
                texRect2.copy(uvRect);
                if (i == hc - 1)
                    texRect2.xMax = lerp(uvRect.x, xMax, tailWidth / sourceW);
                if (j == vc - 1)
                    texRect2.yMin = lerp(uvRect.y, yMax, 1 - tailHeight / sourceH);
                drawRect2.set(contentRect.x + i * sourceW, contentRect.y + j * sourceH, i == (hc - 1) ? tailWidth : sourceW, j == (vc - 1) ? tailHeight : sourceH);
                drawRect2.x /= this._textureScale.x;
                drawRect2.y /= this._textureScale.y;
                drawRect2.width /= this._textureScale.x;
                drawRect2.height /= this._textureScale.y;
                vb.addQuad(drawRect2, texRect2, vb.vertexColor);
            }
        }
    }
}
const TRIANGLES_9_GRID = [
    4, 1, 0, 1, 4, 5,
    5, 2, 1, 2, 5, 6,
    6, 3, 2, 3, 6, 7,
    8, 5, 4, 5, 8, 9,
    9, 6, 5, 6, 9, 10,
    10, 7, 6, 7, 10, 11,
    12, 9, 8, 9, 12, 13,
    13, 10, 9, 10, 13, 14,
    14, 11, 10,
    11, 14, 15
];
const gridTileIndice = [-1, 0, -1, 2, 4, 3, -1, 1, -1];
var gridX = [0, 0, 0, 0];
var gridY = [0, 0, 0, 0];
var gridTexX = [0, 0, 0, 0];
var gridTexY = [0, 0, 0, 0];
var gridRect = new Rect();
var contentRect = new Rect();
var drawRect = new Rect();
var texRect = new Rect();
var drawRect2 = new Rect();
var texRect2 = new Rect();

class GImage extends GObject {
    constructor() {
        super();
    }
    get color() {
        return this._image.graphics.color;
    }
    set color(value) {
        if (this._image.graphics.color != value) {
            this._image.graphics.color = value;
            this.updateGear(4);
        }
    }
    get flip() {
        return this._image.graphics.flip;
    }
    set flip(value) {
        this._image.graphics.flip = value;
    }
    get fillMethod() {
        return this._image.fillMethod;
    }
    set fillMethod(value) {
        this._image.fillMethod = value;
    }
    get fillOrigin() {
        return this._image.fillOrigin;
    }
    set fillOrigin(value) {
        this._image.fillOrigin = value;
    }
    get fillClockwise() {
        return this._image.fillClockwise;
    }
    set fillClockwise(value) {
        this._image.fillClockwise = value;
    }
    get fillAmount() {
        return this._image.fillAmount;
    }
    set fillAmount(value) {
        this._image.fillAmount = value;
    }
    createDisplayObject() {
        this._displayObject = this._image = new Image();
    }
    handleSizeChanged() {
        this._image.width = this._width;
        this._image.height = this._height;
    }
    constructFromResource() {
        this._contentItem = this.packageItem.getBranch();
        this.sourceWidth = this._contentItem.width;
        this.sourceHeight = this._contentItem.height;
        this.initWidth = this.sourceWidth;
        this.initHeight = this.sourceHeight;
        this._contentItem = this._contentItem.getHighResolution();
        this._contentItem.load();
        this._image.scale9Grid = this._contentItem.scale9Grid;
        this._image.scaleByTile = this._contentItem.scaleByTile;
        this._image.tileGridIndice = this._contentItem.tileGridIndice;
        this._image.texture = this._contentItem.texture;
        this.setSize(this.sourceWidth, this.sourceHeight);
    }
    getProp(index) {
        if (index == ObjectPropID.Color)
            return this.color;
        else
            return super.getProp(index);
    }
    setProp(index, value) {
        if (index == ObjectPropID.Color)
            this.color = value;
        else
            super.setProp(index, value);
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        if (buffer.readBool())
            this.color = buffer.readColor();
        this.flip = buffer.readByte();
        this._image.fillMethod = buffer.readByte();
        if (this._image.fillMethod != 0) {
            this._image.fillOrigin = buffer.readByte();
            this._image.fillClockwise = buffer.readBool();
            this._image.fillAmount = buffer.readFloat();
        }
    }
}

class MovieClip extends Image {
    constructor() {
        super();
        this.interval = 0;
        this.swing = false;
        this.repeatDelay = 0;
        this.timeScale = 1;
        this._playing = true;
        this._frameCount = 0;
        this._frame = 0;
        this._start = 0;
        this._end = 0;
        this._times = 0;
        this._endAt = 0;
        this._status = 0; //0-none, 1-next loop, 2-ending, 3-ended
        this._frameElapsed = 0; //当前帧延迟
        this._reversed = false;
        this._repeatedCount = 0;
        this.setPlaySettings();
        this.on("added_to_stage", this.__addToStage, this);
        this.on("removed_from_stage", this.__removeFromStage, this);
    }
    get frames() {
        return this._frames;
    }
    set frames(value) {
        this._frames = value;
        this._scaleByTile = false;
        this._scale9Grid = null;
        if (this._frames) {
            this._frameCount = this._frames.length;
            if (this._end == -1 || this._end > this._frameCount - 1)
                this._end = this._frameCount - 1;
            if (this._endAt == -1 || this._endAt > this._frameCount - 1)
                this._endAt = this._frameCount - 1;
            if (this._frame < 0 || this._frame > this._frameCount - 1)
                this._frame = this._frameCount - 1;
            this._frameElapsed = 0;
            this._repeatedCount = 0;
            this._reversed = false;
        }
        else
            this._frameCount = 0;
        this.drawFrame();
        this.checkTimer();
    }
    get frameCount() {
        return this._frameCount;
    }
    get frame() {
        return this._frame;
    }
    set frame(value) {
        if (this._frame != value) {
            if (this._frames && value >= this._frameCount)
                value = this._frameCount - 1;
            this._frame = value;
            this._frameElapsed = 0;
            this.drawFrame();
        }
    }
    get playing() {
        return this._playing;
    }
    set playing(value) {
        if (this._playing != value) {
            this._playing = value;
            this.checkTimer();
        }
    }
    //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
    rewind() {
        this._frame = 0;
        this._frameElapsed = 0;
        this._reversed = false;
        this._repeatedCount = 0;
        this.drawFrame();
    }
    syncStatus(anotherMc) {
        this._frame = anotherMc._frame;
        this._frameElapsed = anotherMc._frameElapsed;
        this._reversed = anotherMc._reversed;
        this._repeatedCount = anotherMc._repeatedCount;
        this.drawFrame();
    }
    advance(timeInMiniseconds) {
        var beginFrame = this._frame;
        var beginReversed = this._reversed;
        var backupTime = timeInMiniseconds;
        while (true) {
            var tt = this.interval + (this._frames[this._frame].addDelay || 0);
            if (this._frame == 0 && this._repeatedCount > 0)
                tt += this.repeatDelay;
            if (timeInMiniseconds < tt) {
                this._frameElapsed = 0;
                break;
            }
            timeInMiniseconds -= tt;
            if (this.swing) {
                if (this._reversed) {
                    this._frame--;
                    if (this._frame <= 0) {
                        this._frame = 0;
                        this._repeatedCount++;
                        this._reversed = !this._reversed;
                    }
                }
                else {
                    this._frame++;
                    if (this._frame > this._frameCount - 1) {
                        this._frame = Math.max(0, this._frameCount - 2);
                        this._repeatedCount++;
                        this._reversed = !this._reversed;
                    }
                }
            }
            else {
                this._frame++;
                if (this._frame > this._frameCount - 1) {
                    this._frame = 0;
                    this._repeatedCount++;
                }
            }
            if (this._frame == beginFrame && this._reversed == beginReversed) //走了一轮了
             {
                var roundTime = backupTime - timeInMiniseconds; //这就是一轮需要的时间
                timeInMiniseconds -= Math.floor(timeInMiniseconds / roundTime) * roundTime; //跳过
            }
        }
        this.drawFrame();
    }
    //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
    setPlaySettings(start, end, times, endAt) {
        this._start = start || 0;
        this._end = end || -1;
        if (this._end == -1 || this._end > this._frameCount - 1)
            this._end = this._frameCount - 1;
        this._times = times || 0;
        this._endAt = endAt || -1;
        if (this._endAt == -1)
            this._endAt = this._end;
        this._status = 0;
        this.frame = this._start;
    }
    onTimer() {
        if (!this._playing || this._frameCount == 0 || this._status == 3)
            return;
        var dt = Timers.deltaTime;
        if (dt > 100)
            dt = 100;
        if (this.timeScale != 1)
            dt *= this.timeScale;
        this._frameElapsed += dt;
        var tt = this.interval + (this._frames[this._frame].addDelay || 0);
        if (this._frame == 0 && this._repeatedCount > 0)
            tt += this.repeatDelay;
        if (this._frameElapsed < tt)
            return;
        this._frameElapsed -= tt;
        if (this._frameElapsed > this.interval)
            this._frameElapsed = this.interval;
        if (this.swing) {
            if (this._reversed) {
                this._frame--;
                if (this._frame <= 0) {
                    this._frame = 0;
                    this._repeatedCount++;
                    this._reversed = !this._reversed;
                }
            }
            else {
                this._frame++;
                if (this._frame > this._frameCount - 1) {
                    this._frame = Math.max(0, this._frameCount - 2);
                    this._repeatedCount++;
                    this._reversed = !this._reversed;
                }
            }
        }
        else {
            this._frame++;
            if (this._frame > this._frameCount - 1) {
                this._frame = 0;
                this._repeatedCount++;
            }
        }
        if (this._status == 1) //new loop
         {
            this._frame = this._start;
            this._frameElapsed = 0;
            this._status = 0;
        }
        else if (this._status == 2) //ending
         {
            this._frame = this._endAt;
            this._frameElapsed = 0;
            this._status = 3; //ended
            this.dispatchEvent("play_end");
        }
        else {
            if (this._frame == this._end) {
                if (this._times > 0) {
                    this._times--;
                    if (this._times == 0)
                        this._status = 2; //ending
                    else
                        this._status = 1; //new loop
                }
                else {
                    this._status = 1; //new loop
                }
            }
        }
        this.drawFrame();
    }
    drawFrame() {
        if (this._frameCount > 0 && this._frame < this._frames.length) {
            var frame = this._frames[this._frame];
            this._graphics.texture = frame.texture;
        }
        else
            this._graphics.texture = null;
    }
    checkTimer() {
        if (this._playing && this._frameCount > 0 && this.stage)
            Timers.addUpdate(this.onTimer, this);
        else
            Timers.remove(this.onTimer, this);
    }
    __addToStage() {
        if (this._playing && this._frameCount > 0)
            Timers.addUpdate(this.onTimer, this);
    }
    __removeFromStage() {
        Timers.remove(this.onTimer, this);
    }
}

class GMovieClip extends GObject {
    constructor() {
        super();
    }
    get color() {
        return this._movieClip.graphics.color;
    }
    set color(value) {
        this._movieClip.graphics.color = value;
    }
    createDisplayObject() {
        this._displayObject = this._movieClip = new MovieClip();
    }
    get playing() {
        return this._movieClip.playing;
    }
    set playing(value) {
        if (this._movieClip.playing != value) {
            this._movieClip.playing = value;
            this.updateGear(5);
        }
    }
    get frame() {
        return this._movieClip.frame;
    }
    set frame(value) {
        if (this._movieClip.frame != value) {
            this._movieClip.frame = value;
            this.updateGear(5);
        }
    }
    get timeScale() {
        return this._movieClip.timeScale;
    }
    set timeScale(value) {
        this._movieClip.timeScale = value;
    }
    rewind() {
        this._movieClip.rewind();
    }
    syncStatus(anotherMc) {
        this._movieClip.syncStatus(anotherMc._movieClip);
    }
    advance(timeInMiniseconds) {
        this._movieClip.advance(timeInMiniseconds);
    }
    //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
    setPlaySettings(start, end, times, endAt) {
        this._movieClip.setPlaySettings(start, end, times, endAt);
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.color;
            case ObjectPropID.Playing:
                return this.playing;
            case ObjectPropID.Frame:
                return this.frame;
            case ObjectPropID.TimeScale:
                return this.timeScale;
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.color = value;
                break;
            case ObjectPropID.Playing:
                this.playing = value;
                break;
            case ObjectPropID.Frame:
                this.frame = value;
                break;
            case ObjectPropID.TimeScale:
                this.timeScale = value;
                break;
            case ObjectPropID.DeltaTime:
                this.advance(value);
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    constructFromResource() {
        var displayItem = this.packageItem.getBranch();
        this.sourceWidth = displayItem.width;
        this.sourceHeight = displayItem.height;
        this.initWidth = this.sourceWidth;
        this.initHeight = this.sourceHeight;
        this.setSize(this.sourceWidth, this.sourceHeight);
        displayItem = displayItem.getHighResolution();
        displayItem.load();
        this._movieClip.interval = displayItem.interval;
        this._movieClip.swing = displayItem.swing;
        this._movieClip.repeatDelay = displayItem.repeatDelay;
        this._movieClip.frames = displayItem.frames;
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        if (buffer.readBool())
            this.color = buffer.readColor();
        this._movieClip.graphics.flip = buffer.readByte(); //flip
        this._movieClip.frame = buffer.readInt();
        this._movieClip.playing = buffer.readBool();
    }
}

class PixelHitTestData {
    load(ba) {
        ba.readInt();
        this.pixelWidth = ba.readInt();
        this.scale = 1.0 / ba.readByte();
        let len = ba.readInt();
        this.pixels = new Uint8Array(ba.data, ba.pos, len);
        ba.skip(len);
    }
}
class PixelHitTest {
    constructor(data, offsetX, offsetY, sourceWidth, sourceHeight) {
        this._data = data;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
    }
    hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y))
            return false;
        let data = this._data;
        x = Math.floor((x * this.sourceWidth / contentRect.width - this.offsetX) * data.scale);
        y = Math.floor((y * this.sourceHeight / contentRect.height - this.offsetY) * data.scale);
        if (x < 0 || y < 0 || x >= data.pixelWidth)
            return false;
        let pos = y * data.pixelWidth + x;
        let pos2 = Math.floor(pos / 8);
        let pos3 = pos % 8;
        if (pos2 >= 0 && pos2 < data.pixels.length)
            return ((data.pixels[pos2] >> pos3) & 0x1) > 0;
        else
            return false;
    }
}

var s_rect$4 = new Rect();
var c_white = new Color4(0xFFFFFF, 1);
class BitmapFont {
    constructor() {
        this.version = 0;
        this.size = 0;
        this.glyphs = {};
        this._color = new Color4();
    }
    setFormat(format, fontSizeScale) {
        if (this.resizable)
            this._scale = format.size / this.size * fontSizeScale;
        else
            this._scale = fontSizeScale;
        this._color.setHex(format.color);
    }
    prepareCharacters(text) {
    }
    getGlyph(ch, ret) {
        if (ch == ' ') {
            ret.width = Math.round(this.size * this._scale / 2);
            ret.height = Math.round(this.size * this._scale);
            ret.baseline = ret.height;
            this._glyph = null;
            return true;
        }
        else if (this._glyph = this.glyphs[ch]) {
            ret.width = Math.round(this._glyph.advance * this._scale);
            ret.height = Math.round(this._glyph.lineHeight * this._scale);
            ret.baseline = ret.height;
            return true;
        }
        else {
            ret.width = 0;
            ret.height = 0;
            ret.baseline = 0;
            return false;
        }
    }
    drawGlyph(x, y, vb) {
        if (!this._glyph)
            return 0;
        let tx = x + this._glyph.x * this._scale;
        let ty = -y - this._glyph.y * this._scale;
        let bx = x + (this._glyph.x + this._glyph.width) * this._scale;
        let by = -y - (this._glyph.y + this._glyph.height) * this._scale;
        s_rect$4.setMinMax(tx, by, bx, ty);
        vb.addQuad(s_rect$4, this._glyph.uv, this.tint ? this._color : c_white);
        vb.addTriangles(-4);
        return 4;
    }
    drawLine(x, y, width, fontSize, type, vb) {
        return 0;
    }
    getLineHeight(size) {
        for (var key in this.glyphs) {
            let glyph = this.glyphs[key];
            if (this.resizable)
                return Math.round(glyph.lineHeight * size / this.size);
            else
                return glyph.lineHeight;
        }
        return 0;
    }
}
class BMGlyph {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.advance = 0;
        this.lineHeight = 0;
        this.channel = 0;
        this.uv = [new Vector2(), new Vector2(), new Vector2(), new Vector2()];
    }
}

class ByteBuffer {
    constructor(buffer, offset, length) {
        this.version = 0;
        offset = offset || 0;
        if (length == null || length == -1)
            length = buffer.byteLength - offset;
        this._buffer = buffer;
        this._view = new DataView(this._buffer, offset, length);
        this._pos = 0;
        this._length = length;
    }
    get data() {
        return this._buffer;
    }
    get pos() {
        return this._pos;
    }
    set pos(value) {
        if (value > this._length)
            throw "Out of bounds";
        this._pos = value;
    }
    get length() {
        return this._length;
    }
    skip(count) {
        this._pos += count;
    }
    validate(forward) {
        if (this._pos + forward > this._length)
            throw "Out of bounds";
    }
    readByte() {
        this.validate(1);
        let ret = this._view.getUint8(this._pos);
        this._pos++;
        return ret;
    }
    readBool() {
        return this.readByte() == 1;
    }
    readShort() {
        this.validate(2);
        let ret = this._view.getInt16(this._pos, this.littleEndian);
        this._pos += 2;
        return ret;
    }
    readUshort() {
        this.validate(2);
        let ret = this._view.getUint16(this._pos, this.littleEndian);
        this._pos += 2;
        return ret;
    }
    readInt() {
        this.validate(4);
        let ret = this._view.getInt32(this._pos, this.littleEndian);
        this._pos += 4;
        return ret;
    }
    readUint() {
        this.validate(4);
        let ret = this._view.getUint32(this._pos, this.littleEndian);
        this._pos += 4;
        return ret;
    }
    readFloat() {
        this.validate(4);
        let ret = this._view.getFloat32(this._pos, this.littleEndian);
        this._pos += 4;
        return ret;
    }
    readString(len) {
        if (len == undefined)
            len = this.readUshort();
        this.validate(len);
        let decoder = new TextDecoder();
        let ret = decoder.decode(new DataView(this._buffer, this._view.byteOffset + this._pos, len));
        this._pos += len;
        return ret;
    }
    readS() {
        var index = this.readUshort();
        if (index == 65534) //null
            return null;
        else if (index == 65533)
            return "";
        else
            return this.stringTable[index];
    }
    readSArray(cnt) {
        var ret = new Array(cnt);
        for (var i = 0; i < cnt; i++)
            ret[i] = this.readS();
        return ret;
    }
    writeS(value) {
        var index = this.readUshort();
        if (index != 65534 && index != 65533)
            this.stringTable[index] = value;
    }
    readColor() {
        var r = this.readByte();
        var g = this.readByte();
        var b = this.readByte();
        this.readByte(); //a
        return (r << 16) + (g << 8) + b;
    }
    readFullColor() {
        var r = this.readByte();
        var g = this.readByte();
        var b = this.readByte();
        var a = this.readByte();
        return new Color4((r << 16) + (g << 8) + b, a / 255);
    }
    readChar() {
        var i = this.readUshort();
        return String.fromCharCode(i);
    }
    readBuffer() {
        var count = this.readUint();
        this.validate(count);
        var ba = new ByteBuffer(this._buffer, this._view.byteOffset + this._pos, count);
        ba.stringTable = this.stringTable;
        ba.version = this.version;
        this._pos += count;
        return ba;
    }
    seek(indexTablePos, blockIndex) {
        var tmp = this._pos;
        this._pos = indexTablePos;
        var segCount = this.readByte();
        if (blockIndex < segCount) {
            var useShort = this.readByte() == 1;
            var newPos;
            if (useShort) {
                this._pos += 2 * blockIndex;
                newPos = this.readUshort();
            }
            else {
                this._pos += 4 * blockIndex;
                newPos = this.readUint();
            }
            if (newPos > 0) {
                this._pos = indexTablePos + newPos;
                return true;
            }
            else {
                this._pos = tmp;
                return false;
            }
        }
        else {
            this._pos = tmp;
            return false;
        }
    }
}

var ScaleMode;
(function (ScaleMode) {
    ScaleMode[ScaleMode["ConstantPixelSize"] = 0] = "ConstantPixelSize";
    ScaleMode[ScaleMode["ScaleWithScreenSize"] = 1] = "ScaleWithScreenSize";
    ScaleMode[ScaleMode["ConstantPhysicalSize"] = 2] = "ConstantPhysicalSize";
})(ScaleMode || (ScaleMode = {}));
var ScreenMatchMode;
(function (ScreenMatchMode) {
    ScreenMatchMode[ScreenMatchMode["MatchWidthOrHeight"] = 0] = "MatchWidthOrHeight";
    ScreenMatchMode[ScreenMatchMode["MatchWidth"] = 1] = "MatchWidth";
    ScreenMatchMode[ScreenMatchMode["MatchHeight"] = 2] = "MatchHeight";
})(ScreenMatchMode || (ScreenMatchMode = {}));
class UIContentScaler {
    static get scaleFactor() { return _scaleFactor; }
    static get scaleLevel() { return _scaleLevel; }
    static scaleWithScreenSize(designResolutionX, designResolutionY, screenMatchMode) {
        _designResolutionX = designResolutionX;
        _designResolutionY = designResolutionY;
        _scaleMode = ScaleMode.ScaleWithScreenSize;
        _screenMatchMode = screenMatchMode || ScreenMatchMode.MatchWidthOrHeight;
        refresh();
    }
    static setConstant(constantScaleFactor) {
        _scaleMode = ScaleMode.ConstantPixelSize;
        _constantScaleFactor = constantScaleFactor || 1;
        refresh();
    }
}
var _scaleMode = ScaleMode.ConstantPixelSize;
var _screenMatchMode;
var _designResolutionX = 1136;
var _designResolutionY = 640;
// var _fallbackScreenDPI: number;
// var _defaultSpriteDPI: number;
var _constantScaleFactor = 1;
var _scaleFactor = 1;
var _scaleLevel = 0;
Stage.eventDispatcher.on("size_changed", refresh);
function refresh() {
    let screenWidth = Stage.width;
    let screenHeight = Stage.height;
    if (_scaleMode == ScaleMode.ScaleWithScreenSize) {
        if (_designResolutionX == 0 || _designResolutionY == 0)
            return;
        let dx = _designResolutionX;
        let dy = _designResolutionY;
        if ( (screenWidth > screenHeight && dx < dy || screenWidth < screenHeight && dx > dy)) {
            //scale should not change when orientation change
            let tmp = dx;
            dx = dy;
            dy = tmp;
        }
        if (_screenMatchMode == ScreenMatchMode.MatchWidthOrHeight) {
            let s1 = screenWidth / dx;
            let s2 = screenHeight / dy;
            _scaleFactor = Math.min(s1, s2);
        }
        else if (_screenMatchMode == ScreenMatchMode.MatchWidth)
            _scaleFactor = screenWidth / dx;
        else
            _scaleFactor = screenHeight / dy;
    }
    else if (_scaleMode == ScaleMode.ConstantPhysicalSize) ;
    else
        _scaleFactor = _constantScaleFactor;
    if (_scaleFactor > 10)
        _scaleFactor = 10;
    if (_scaleFactor > 3)
        _scaleLevel = 3; //x4
    else if (_scaleFactor > 2)
        _scaleLevel = 2; //x3
    else if (_scaleFactor > 1)
        _scaleLevel = 1; //x2
    else
        _scaleLevel = 0;
    broadcastEvent(Stage.scene, "content_scale_factor_changed");
}

class PackageItem {
    constructor() {
        this.width = 0;
        this.height = 0;
    }
    load() {
        return this.owner.getItemAsset(this);
    }
    getBranch() {
        if (this.branches && this.owner._branchIndex != -1) {
            var itemId = this.branches[this.owner._branchIndex];
            if (itemId)
                return this.owner.getItemById(itemId);
        }
        return this;
    }
    getHighResolution() {
        if (this.highResolution && UIContentScaler.scaleLevel > 0) {
            var itemId = this.highResolution[UIContentScaler.scaleLevel - 1];
            if (itemId)
                return this.owner.getItemById(itemId);
        }
        return this;
    }
    toString() {
        return this.name;
    }
}

var s_rect$5 = new Rect();
class DynamicFont {
    constructor() {
        this.version = 0;
        this.isDynamic = true;
        this.keepCrisp = true;
        this._scale = 1;
        this._glyphs = {};
        this._color = new Color4();
        this._outlineColor = new Color4();
        this._packers = [new BinPacker(), new BinPacker(), new BinPacker()];
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
        this._context.globalCompositeOperation = "lighter";
        this.createTexture(512);
        this._scale = Stage.devicePixelRatio;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        this._canvas.id = value;
    }
    createTexture(size) {
        this._canvas.width = this._canvas.height = size;
        if (!this.mainTexture) {
            this._texture = new Texture(this._canvas);
            this._texture.generateMipmaps = false;
            this._texture.magFilter = LinearFilter;
            this._texture.minFilter = LinearFilter;
            this.mainTexture = new NTexture(this._texture);
        }
        else {
            this._texture.needsUpdate = true;
            this.mainTexture.reload(this._texture);
        }
        this.clearTexture();
    }
    clearTexture() {
        this._context.fillStyle = 'black';
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.globalCompositeOperation = "lighter";
        for (let i = 0; i < 3; i++)
            this._packers[i].init(this._canvas.width, this._canvas.height);
    }
    rebuild() {
        if (this._canvas.width < 2048)
            this.createTexture(this._canvas.width * 2);
        else
            this.clearTexture();
        this.version++;
        Stage.fontRebuilt = true;
        console.log("font atlas rebuilt : %s (%d)", this.name, this._canvas.width);
    }
    setFormat(format, fontSizeScale) {
        this._format = format;
        let size = format.size * fontSizeScale;
        this._size = Math.floor(size);
        if (this._size == 0)
            this._size = 1;
        this._color.setHex(format.color);
        this._outlineColor.setHex(format.outlineColor);
    }
    prepareCharacters(text) {
        let len = text.length;
        let i = 0;
        //绘制文本本体
        for (i = 0; i < len; i++) {
            let ch = text[i];
            let glyph = this.getGlyphsOf(ch, this._size);
            if (this._format.outline > 0) {
                this.prepareOutline(ch, glyph, this._size, this._format.outline);
            }
            this.prepareChar(ch, this._size, glyph);
            glyph.ver = this.version;
        }
    }
    getGlyphsOf(ch, size) {
        let key = (size << 16) + ch.charCodeAt(0);
        let glyph = this._glyphs[key];
        if (glyph && glyph.ver == this.version)
            return glyph;
        if (this.keepCrisp)
            size *= this._scale;
        this._context.font = size + "px " + this._name;
        if (!glyph) {
            glyph = this.measureChar(ch, size);
            this._glyphs[key] = glyph;
        }
        return glyph;
    }
    prepareChar(ch, size, glyph) {
        if (this.keepCrisp)
            size *= this._scale;
        let w = glyph.sourceRect.width;
        let h = glyph.sourceRect.height;
        if (w == 0)
            return glyph;
        let node = this.addNode(w + 2, h + 2);
        if (!node) {
            this.rebuild();
            return null;
        }
        this._context.font = size + "px " + this._name;
        this._context.textBaseline = "alphabetic";
        this._context.fillStyle = node.z == 0 ? "#FF0000" : (node.z == 1 ? "#00FF00" : "#0000FF");
        this._context.fillText(ch, node.x + glyph.sourceRect.x, node.y + glyph.baseline);
        this._texture.needsUpdate = true;
        glyph.chl = node.z / 3;
        glyph.uvRect.set(node.x / this.mainTexture.width, 1 - (node.y + h) / this.mainTexture.height, w / this.mainTexture.width, h / this.mainTexture.height);
        return glyph;
    }
    prepareOutline(ch, glyph, size, outline) {
        if (!glyph.outlines)
            glyph.outlines = {};
        let outlineGlyph = glyph.outlines[outline];
        if (outlineGlyph && outlineGlyph.ver == this.version || glyph.sourceRect.width == 0)
            return;
        if (!outlineGlyph) {
            outlineGlyph = { vertRect: new Rect(), uvRect: new Rect(), ver: this.version };
            glyph.outlines[outline] = outlineGlyph;
        }
        else
            outlineGlyph.ver = this.version;
        let outline2 = outline;
        if (this.keepCrisp)
            outline2 *= this._scale;
        let w = glyph.sourceRect.width + outline2 * 2;
        let h = glyph.sourceRect.height + outline2 * 2;
        let node = this.addNode(w + 2, h + 2);
        if (!node) {
            this.rebuild();
            return null;
        }
        if (this.keepCrisp)
            size *= this._scale;
        this._context.font = size + "px " + this._name;
        this._context.textBaseline = "alphabetic";
        this._context.strokeStyle = node.z == 0 ? "#FF0000" : (node.z == 1 ? "#00FF00" : "#0000FF");
        this._context.lineJoin = 'round';
        this._context.lineWidth = outline2;
        this._context.strokeText(ch, node.x + glyph.sourceRect.x + outline2, node.y + glyph.baseline + outline2);
        this._texture.needsUpdate = true;
        outlineGlyph.chl = node.z / 3;
        outlineGlyph.vertRect.copy(glyph.vertRect);
        outlineGlyph.vertRect.extend(outline, outline);
        outlineGlyph.uvRect.set(node.x / this.mainTexture.width, 1 - (node.y + h) / this.mainTexture.height, w / this.mainTexture.width, h / this.mainTexture.height);
    }
    measureChar(ch, size) {
        let left, top, w, h, baseline;
        this._context.textBaseline = "alphabetic";
        let met = this._context.measureText(ch);
        if ('actualBoundingBoxLeft' in met) {
            this._context.textBaseline = "top";
            let met1 = this._context.measureText(ch);
            left = met.actualBoundingBoxLeft > 0 ? Math.ceil(met.actualBoundingBoxLeft) : 0;
            top = Math.ceil(met1.actualBoundingBoxAscent) + 1;
            w = Math.ceil(left + met.actualBoundingBoxRight) + 1;
            h = Math.ceil(met.actualBoundingBoxAscent + met.actualBoundingBoxDescent) + 2;
            baseline = Math.ceil(met.actualBoundingBoxAscent);
        }
        else {
            baseline = this.getBaseline(ch, this._name, size);
            left = 0;
            if (ch == 'j')
                left = Math.ceil(size / 20); //guess
            top = 0;
            w = met["width"];
            h = size * 1.25 + 2;
        }
        let glyph;
        if (w == 0) {
            glyph = { ver: this.version };
        }
        else {
            glyph = {
                uvRect: new Rect(),
                vertRect: new Rect(-left, -baseline, w, h),
                advance: met.width,
                sourceRect: new Rect(left, top, w, h),
                baseline: baseline,
                ver: this.version
            };
            if (this.keepCrisp) {
                glyph.vertRect.x /= this._scale;
                glyph.vertRect.y /= this._scale;
                glyph.vertRect.width /= this._scale;
                glyph.vertRect.height /= this._scale;
                glyph.advance /= this._scale;
            }
        }
        return glyph;
    }
    addNode(w, h) {
        let node;
        for (let i = 0; i < 3; i++) {
            let packer = this._packers[i];
            if (!packer.full && (node = packer.add(w, h))) {
                node.z = i;
                break;
            }
        }
        return node;
    }
    getGlyph(ch, ret) {
        let key = (this._size << 16) + ch.charCodeAt(0);
        this._glyph = this._glyphs[key];
        if (!this._glyph)
            return false;
        ret.width = this._glyph.advance;
        ret.height = Math.round(this._size * 1.25);
        ret.baseline = Math.round(this._size);
        return true;
    }
    drawGlyph(x, y, vb) {
        if (!this._glyph.vertRect)
            return 0;
        if (this._format.outline > 0) {
            if (!this._glyph.outlines)
                return 0;
            let outlineGlyph = this._glyph.outlines[this._format.outline];
            s_rect$5.copy(outlineGlyph.vertRect);
            s_rect$5.x += x;
            s_rect$5.y -= y;
            this._outlineColor.a = outlineGlyph.chl;
            vb.addQuad(s_rect$5, outlineGlyph.uvRect, this._outlineColor);
            vb.addTriangles(-4);
        }
        s_rect$5.copy(this._glyph.vertRect);
        s_rect$5.x += x;
        s_rect$5.y -= y;
        this._color.a = this._glyph.chl;
        vb.addQuad(s_rect$5, this._glyph.uvRect, this._color);
        vb.addTriangles(-4);
        return 4;
    }
    drawLine(x, y, width, fontSize, type, vb) {
        return 0;
    }
    getLineHeight(size) {
        return Math.round(size * 1.25);
    }
    getBaseline(ch, font, size) {
        if (!this.eSpan) {
            this.eSpan = document.createElement('span');
            this.eBlock = document.createElement("div");
            this.eBlock.style.display = 'inline-block';
            this.eBlock.style.width = '1px';
            this.eBlock.style.height = '0px';
            var div = document.createElement('div');
            div.id = 'measureText';
            div.style.position = 'absolute';
            div.style.visibility = 'hidden';
            div.style.left = div.style.top = '0px';
            div.appendChild(this.eSpan);
            div.appendChild(this.eBlock);
            document.body.appendChild(div);
        }
        this.eSpan.innerHTML = ch;
        this.eSpan.style.fontFamily = font;
        this.eSpan.style.fontSize = size + "px";
        let ascent, height;
        let offset = this.eSpan.offsetTop;
        this.eBlock.style.verticalAlign = 'baseline';
        ascent = this.eBlock.offsetTop - offset;
        this.eBlock.style.verticalAlign = 'bottom';
        height = this.eBlock.offsetTop - offset;
        return ascent + Math.floor((size - height));
    }
}
class BinPacker {
    init(w, h) {
        this._root = { x: 0, y: 0, w: w, h: h };
        delete this.full;
    }
    add(w, h) {
        let node;
        if (node = this.findNode(this._root, w, h))
            node = this.splitNode(node, w, h);
        if (!node)
            this.full = true;
        return node;
    }
    findNode(root, w, h) {
        if (root.used)
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        else if ((w <= root.w) && (h <= root.h))
            return root;
        else
            return null;
    }
    splitNode(node, w, h) {
        node.used = true;
        node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
        node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
        return node;
    }
}

class FontManager {
    static registerFont(font) {
        this.fonts[font.name] = font;
    }
    static unregisterFont(font) {
        this.fonts[font.name] = undefined;
    }
    static getFont(name) {
        if (this.packageFontGetter && name.startsWith("ui://")) {
            let font = this.packageFontGetter(name);
            if (font)
                return font;
        }
        let font = this.fonts[name];
        if (!font) {
            font = new DynamicFont();
            font.name = name;
            this.fonts[name] = font;
        }
        return font;
    }
}
FontManager.fonts = {};

class UIPackage {
    // public static _objectFactory: typeof UIObjectFactory = UIObjectFactory;
    constructor() {
        this._items = [];
        this._itemsById = {};
        this._itemsByName = {};
        this._sprites = {};
        this._dependencies = [];
        this._branches = [];
        this._branchIndex = -1;
    }
    static get branch() {
        return _branch;
    }
    static set branch(value) {
        _branch = value;
        for (var pkgId in _instById) {
            var pkg = _instById[pkgId];
            if (pkg._branches) {
                pkg._branchIndex = pkg._branches.indexOf(value);
            }
        }
    }
    static getVar(key) {
        return _vars[key];
    }
    static setVar(key, value) {
        _vars[key] = value;
    }
    static getById(id) {
        return _instById[id];
    }
    static getByName(name) {
        return _instByName[name];
    }
    static loadPackage(resKey, onProgress) {
        return new Promise(resolve => {
            let pkg = _instById[resKey];
            if (pkg) {
                resolve(pkg);
                return;
            }
            let url = resKey;
            if (!resKey.endsWith("." + UIConfig.packageFileExtension)) {
                url += "." + UIConfig.packageFileExtension;
            }
            var loader = new FileLoader();
            loader.setResponseType("arraybuffer");
            loader.load(url, asset => {
                pkg = new UIPackage();
                pkg._resKey = resKey;
                pkg.loadPackage(new ByteBuffer(asset));
                let promises = [];
                let cnt = pkg._items.length;
                for (var i = 0; i < cnt; i++) {
                    var pi = pkg._items[i];
                    if (pi.type == PackageItemType.Atlas) {
                        promises.push(loadTexture(pi, onProgress));
                    }
                    else if (pi.type == PackageItemType.Sound) {
                        promises.push(loadSound(pi, onProgress));
                    }
                }
                let resolve2 = () => {
                    _instById[pkg.id] = pkg;
                    _instByName[pkg.name] = pkg;
                    _instById[pkg._resKey] = pkg;
                    resolve(pkg);
                };
                if (promises.length > 0)
                    Promise.all(promises).then(resolve2);
                else
                    resolve2();
            });
        });
    }
    static removePackage(packageIdOrName) {
        var pkg = _instById[packageIdOrName];
        if (!pkg)
            pkg = _instByName[packageIdOrName];
        if (!pkg)
            throw new Error("unknown package: " + packageIdOrName);
        pkg.dispose();
        delete _instById[pkg.id];
        delete _instByName[pkg.name];
        delete _instById[pkg._resKey];
        if (pkg._customId != null)
            delete _instById[pkg._customId];
    }
    static createObject(pkgName, resName, userClass) {
        var pkg = UIPackage.getByName(pkgName);
        if (pkg)
            return pkg.createObject(resName, userClass);
        else
            return null;
    }
    static createObjectFromURL(url, userClass) {
        var pi = UIPackage.getItemByURL(url);
        if (pi)
            return pi.owner.internalCreateObject(pi, userClass);
        else
            return null;
    }
    static getItemURL(pkgName, resName) {
        var pkg = UIPackage.getByName(pkgName);
        if (!pkg)
            return null;
        var pi = pkg._itemsByName[resName];
        if (!pi)
            return null;
        return "ui://" + pkg.id + pi.id;
    }
    static getItemByURL(url) {
        var pos1 = url.indexOf("//");
        if (pos1 == -1)
            return null;
        var pos2 = url.indexOf("/", pos1 + 2);
        if (pos2 == -1) {
            if (url.length > 13) {
                var pkgId = url.substr(5, 8);
                var pkg = UIPackage.getById(pkgId);
                if (pkg) {
                    var srcId = url.substr(13);
                    return pkg.getItemById(srcId);
                }
            }
        }
        else {
            var pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
            pkg = UIPackage.getByName(pkgName);
            if (pkg) {
                var srcName = url.substr(pos2 + 1);
                return pkg.getItemByName(srcName);
            }
        }
        return null;
    }
    static getItemAssetByURL(url) {
        var item = UIPackage.getItemByURL(url);
        if (item == null)
            return null;
        return item.owner.getItemAsset(item);
    }
    static normalizeURL(url) {
        if (url == null)
            return null;
        var pos1 = url.indexOf("//");
        if (pos1 == -1)
            return null;
        var pos2 = url.indexOf("/", pos1 + 2);
        if (pos2 == -1)
            return url;
        var pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
        var srcName = url.substr(pos2 + 1);
        return UIPackage.getItemURL(pkgName, srcName);
    }
    loadPackage(buffer) {
        if (buffer.readUint() != 0x46475549)
            throw new Error("old package format found in '" + this._resKey + "'");
        buffer.version = buffer.readInt();
        var compressed = buffer.readBool();
        this._id = buffer.readString();
        this._name = buffer.readString();
        buffer.skip(20);
        var ver2 = buffer.version >= 2;
        var indexTablePos = buffer.pos;
        var cnt;
        var i;
        var nextPos;
        var str;
        var branchIncluded;
        buffer.seek(indexTablePos, 4);
        cnt = buffer.readInt();
        var stringTable = [];
        for (i = 0; i < cnt; i++)
            stringTable[i] = buffer.readString();
        buffer.stringTable = stringTable;
        buffer.seek(indexTablePos, 0);
        cnt = buffer.readShort();
        for (i = 0; i < cnt; i++)
            this._dependencies.push({ id: buffer.readS(), name: buffer.readS() });
        if (ver2) {
            cnt = buffer.readShort();
            if (cnt > 0) {
                this._branches = buffer.readSArray(cnt);
                if (_branch)
                    this._branchIndex = this._branches.indexOf(_branch);
            }
            branchIncluded = cnt > 0;
        }
        buffer.seek(indexTablePos, 1);
        var pi;
        var fileNamePrefix = this._resKey + "_";
        cnt = buffer.readUshort();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readInt();
            nextPos += buffer.pos;
            pi = new PackageItem();
            pi.owner = this;
            pi.type = buffer.readByte();
            pi.id = buffer.readS();
            pi.name = buffer.readS();
            buffer.readS(); //path
            str = buffer.readS();
            if (str)
                pi.file = str;
            buffer.readBool(); //exported
            pi.width = buffer.readInt();
            pi.height = buffer.readInt();
            switch (pi.type) {
                case PackageItemType.Image:
                    {
                        pi.objectType = ObjectType.Image;
                        var scaleOption = buffer.readByte();
                        if (scaleOption == 1) {
                            pi.scale9Grid = new Rect();
                            pi.scale9Grid.x = buffer.readInt();
                            pi.scale9Grid.y = buffer.readInt();
                            pi.scale9Grid.width = buffer.readInt();
                            pi.scale9Grid.height = buffer.readInt();
                            pi.tileGridIndice = buffer.readInt();
                        }
                        else if (scaleOption == 2)
                            pi.scaleByTile = true;
                        pi.smoothing = buffer.readBool();
                        break;
                    }
                case PackageItemType.MovieClip:
                    {
                        pi.smoothing = buffer.readBool();
                        pi.objectType = ObjectType.MovieClip;
                        pi.rawData = buffer.readBuffer();
                        break;
                    }
                case PackageItemType.Font:
                    {
                        pi.rawData = buffer.readBuffer();
                        break;
                    }
                case PackageItemType.Component:
                    {
                        var extension = buffer.readByte();
                        if (extension > 0)
                            pi.objectType = extension;
                        else
                            pi.objectType = ObjectType.Component;
                        pi.rawData = buffer.readBuffer();
                        Decls$1.UIObjectFactory.resolveExtension(pi);
                        break;
                    }
                case PackageItemType.Atlas:
                case PackageItemType.Sound:
                case PackageItemType.Misc:
                    {
                        pi.file = fileNamePrefix + pi.file;
                        break;
                    }
            }
            if (ver2) {
                str = buffer.readS(); //branch
                if (str)
                    pi.name = str + "/" + pi.name;
                var branchCnt = buffer.readByte();
                if (branchCnt > 0) {
                    if (branchIncluded)
                        pi.branches = buffer.readSArray(branchCnt);
                    else
                        this._itemsById[buffer.readS()] = pi;
                }
                var highResCnt = buffer.readByte();
                if (highResCnt > 0)
                    pi.highResolution = buffer.readSArray(highResCnt);
            }
            this._items.push(pi);
            this._itemsById[pi.id] = pi;
            if (pi.name != null)
                this._itemsByName[pi.name] = pi;
            buffer.pos = nextPos;
        }
        buffer.seek(indexTablePos, 2);
        cnt = buffer.readUshort();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readUshort();
            nextPos += buffer.pos;
            var itemId = buffer.readS();
            pi = this._itemsById[buffer.readS()];
            let rect = new Rect();
            rect.x = buffer.readInt();
            rect.y = buffer.readInt();
            rect.width = buffer.readInt();
            rect.height = buffer.readInt();
            var sprite = { atlas: pi, rect: rect, offset: new Vector2(), originalSize: new Vector2() };
            sprite.rotated = buffer.readBool();
            if (ver2 && buffer.readBool()) {
                sprite.offset.x = buffer.readInt();
                sprite.offset.y = buffer.readInt();
                sprite.originalSize.x = buffer.readInt();
                sprite.originalSize.y = buffer.readInt();
            }
            else {
                sprite.originalSize.x = sprite.rect.width;
                sprite.originalSize.y = sprite.rect.height;
            }
            this._sprites[itemId] = sprite;
            buffer.pos = nextPos;
        }
        if (buffer.seek(indexTablePos, 3)) {
            cnt = buffer.readUshort();
            for (i = 0; i < cnt; i++) {
                nextPos = buffer.readInt();
                nextPos += buffer.pos;
                pi = this._itemsById[buffer.readS()];
                if (pi && pi.type == PackageItemType.Image) {
                    pi.pixelHitTestData = new PixelHitTestData();
                    pi.pixelHitTestData.load(buffer);
                }
                buffer.pos = nextPos;
            }
        }
    }
    dispose() {
        var cnt = this._items.length;
        for (var i = 0; i < cnt; i++) {
            var pi = this._items[i];
            if (pi.type == PackageItemType.Atlas) {
                if (pi.texture) {
                    pi.texture.dispose();
                    pi.texture = null;
                }
            }
            else if (pi.type == PackageItemType.Sound) ;
        }
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get customId() {
        return this._customId;
    }
    set customId(value) {
        if (this._customId != null)
            delete _instById[this._customId];
        this._customId = value;
        if (this._customId != null)
            _instById[this._customId] = this;
    }
    createObject(resName, userClass) {
        var pi = this._itemsByName[resName];
        if (pi)
            return this.internalCreateObject(pi, userClass);
        else
            return null;
    }
    internalCreateObject(item, userClass) {
        var g = Decls$1.UIObjectFactory.newObject(item, userClass);
        if (g == null)
            return null;
        constructingDepth.n++;
        g.constructFromResource();
        constructingDepth.n--;
        return g;
    }
    getItemById(itemId) {
        return this._itemsById[itemId];
    }
    getItemByName(resName) {
        return this._itemsByName[resName];
    }
    getItemAssetByName(resName) {
        var pi = this._itemsByName[resName];
        if (pi == null) {
            throw "Resource not found -" + resName;
        }
        return this.getItemAsset(pi);
    }
    getItemAsset(item) {
        switch (item.type) {
            case PackageItemType.Image:
                if (!item.decoded) {
                    item.decoded = true;
                    var sprite = this._sprites[item.id];
                    if (sprite) {
                        var atlasTexture = (this.getItemAsset(sprite.atlas));
                        item.texture = atlasTexture.createSubTexture(sprite.rect, sprite.rotated, sprite.offset, sprite.originalSize);
                    }
                    else
                        item.texture = null;
                }
                return item.texture;
            case PackageItemType.Atlas:
                return item.texture;
            case PackageItemType.Font:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadFont(item);
                }
                return item.bitmapFont;
            case PackageItemType.MovieClip:
                if (!item.decoded) {
                    item.decoded = true;
                    this.loadMovieClip(item);
                }
                return item.frames;
            case PackageItemType.Component:
                return item.rawData;
            default:
                return null;
        }
    }
    loadMovieClip(item) {
        var buffer = item.rawData;
        buffer.seek(0, 0);
        item.interval = buffer.readInt();
        item.swing = buffer.readBool();
        item.repeatDelay = buffer.readInt();
        buffer.seek(0, 1);
        var frameCount = buffer.readShort();
        item.frames = [];
        var spriteId;
        var frame;
        var sprite;
        var fx;
        var fy;
        for (var i = 0; i < frameCount; i++) {
            var nextPos = buffer.readShort();
            nextPos += buffer.pos;
            frame = { texture: null };
            fx = buffer.readInt();
            fy = buffer.readInt();
            buffer.readInt(); //width
            buffer.readInt(); //height
            frame.addDelay = buffer.readInt();
            spriteId = buffer.readS();
            if (spriteId != null && (sprite = this._sprites[spriteId]) != null) {
                var atlasTexture = (this.getItemAsset(sprite.atlas));
                frame.texture = atlasTexture.createSubTexture(sprite.rect, sprite.rotated, new Vector2(fx, fy), new Vector2(item.width, item.height));
            }
            item.frames[i] = frame;
            buffer.pos = nextPos;
        }
    }
    loadFont(item) {
        item = item.getBranch();
        var font = new BitmapFont();
        font.name = "ui://" + this._id + item.id;
        item.bitmapFont = font;
        var buffer = item.rawData;
        buffer.seek(0, 0);
        let ttf = buffer.readBool();
        font.tint = buffer.readBool();
        font.resizable = buffer.readBool();
        font.hasChannel = buffer.readBool();
        var fontSize = buffer.readInt();
        var xadvance = buffer.readInt();
        var lineHeight = buffer.readInt();
        var texScaleX = 1;
        var texScaleY = 1;
        var bgX;
        var bgY;
        var bgWidth;
        var bgHeight;
        var mainTexture = null;
        var mainSprite = ttf ? this._sprites[item.id] : null;
        if (mainSprite) {
            mainTexture = (this.getItemAsset(mainSprite.atlas));
            texScaleX = mainTexture.root.uvRect.width / mainTexture.width;
            texScaleY = mainTexture.root.uvRect.height / mainTexture.height;
        }
        buffer.seek(0, 1);
        var bg = null;
        var cnt = buffer.readInt();
        for (var i = 0; i < cnt; i++) {
            var nextPos = buffer.readShort();
            nextPos += buffer.pos;
            bg = new BMGlyph();
            var ch = buffer.readChar();
            font.glyphs[ch] = bg;
            var img = buffer.readS();
            var bx = buffer.readInt();
            var by = buffer.readInt();
            bgX = buffer.readInt();
            bgY = buffer.readInt();
            bgWidth = buffer.readInt();
            bgHeight = buffer.readInt();
            bg.advance = buffer.readInt();
            bg.channel = buffer.readByte();
            if (bg.channel == 1)
                bg.channel = 2;
            else if (bg.channel == 2)
                bg.channel = 1;
            else if (bg.channel == 4)
                bg.channel = 0;
            else if (bg.channel == 8)
                bg.channel = 3;
            if (ttf) {
                if (mainSprite.rotated) {
                    bg.uv[0].set((by + bgHeight + mainSprite.rect.x) * texScaleX, 1 - (mainSprite.rect.yMax - bx) * texScaleY);
                    bg.uv[1].set(bg.uv[0].x - bgHeight * texScaleX, bg.uv[0].y);
                    bg.uv[2].set(bg.uv[1].x, bg.uv[0].y + bgWidth * texScaleY);
                    bg.uv[3].set(bg.uv[0].x, bg.uv[2].y);
                }
                else {
                    bg.uv[0].set((bx + mainSprite.rect.x) * texScaleX, 1 - (by + bgHeight + mainSprite.rect.y) * texScaleY);
                    bg.uv[1].set(bg.uv[0].x, bg.uv[0].y + bgHeight * texScaleY);
                    bg.uv[2].set(bg.uv[0].x + bgWidth * texScaleX, bg.uv[1].y);
                    bg.uv[3].set(bg.uv[2].x, bg.uv[0].y);
                }
                bg.lineHeight = lineHeight;
                bg.x = bgX;
                bg.y = bgY;
                bg.width = bgWidth;
                bg.height = bgHeight;
            }
            else {
                var charImg = this._itemsById[img];
                if (charImg) {
                    charImg = charImg.getBranch();
                    bgWidth = charImg.width;
                    bgHeight = charImg.height;
                    charImg = charImg.getHighResolution();
                    this.getItemAsset(charImg);
                    charImg.texture.getUV(bg.uv);
                    texScaleX = bgWidth / charImg.width;
                    texScaleY = bgHeight / charImg.height;
                    bg.x = bgX + charImg.texture.offset.x * texScaleX;
                    bg.y = bgY + charImg.texture.offset.y * texScaleY;
                    bg.width = charImg.texture.width * texScaleX;
                    bg.height = charImg.texture.height * texScaleY;
                    if (!mainTexture)
                        mainTexture = charImg.texture.root;
                }
                if (fontSize == 0)
                    fontSize = bgHeight;
                if (bg.advance == 0) {
                    if (xadvance == 0)
                        bg.advance = bgX + bgWidth;
                    else
                        bg.advance = xadvance;
                }
                bg.lineHeight = bgY < 0 ? bgHeight : (bgY + bgHeight);
                if (bg.lineHeight < font.size)
                    bg.lineHeight = font.size;
            }
            buffer.pos = nextPos;
        }
        font.size = fontSize;
        font.mainTexture = mainTexture;
    }
}
var _instById = {};
var _instByName = {};
var _branch = "";
var _vars = {};
FontManager.packageFontGetter = name => UIPackage.getItemAssetByURL(name);
function loadTexture(pi, onProgress) {
    return new Promise((resolve, reject) => {
        new TextureLoader().load(pi.file, texture => {
            texture.generateMipmaps = false;
            texture.magFilter = LinearFilter;
            texture.minFilter = LinearFilter;
            pi.texture = new NTexture(texture);
            resolve();
        }, onProgress, ev => {
            reject(ev.message);
        });
    });
}
function loadSound(pi, onProgress) {
    return new Promise((resolve, reject) => {
        new AudioLoader().load(pi.file, buffer => {
            pi.audioBuffer = buffer;
            resolve();
        }, onProgress, ev => {
            reject(ev.message);
        });
    });
}
var Decls$1 = {};

class ControllerAction {
    constructor() {
    }
    run(controller, prevPage, curPage) {
        if ((!this.fromPage || this.fromPage.length == 0 || this.fromPage.indexOf(prevPage) != -1)
            && (!this.toPage || this.toPage.length == 0 || this.toPage.indexOf(curPage) != -1))
            this.enter(controller);
        else
            this.leave(controller);
    }
    enter(controller) {
    }
    leave(controller) {
    }
    setup(buffer) {
        var cnt;
        var i;
        cnt = buffer.readShort();
        this.fromPage = [];
        for (i = 0; i < cnt; i++)
            this.fromPage[i] = buffer.readS();
        cnt = buffer.readShort();
        this.toPage = [];
        for (i = 0; i < cnt; i++)
            this.toPage[i] = buffer.readS();
    }
}

class PlayTransitionAction extends ControllerAction {
    constructor() {
        super();
        this.playTimes = 1;
        this.delay = 0;
    }
    enter(controller) {
        var trans = controller.parent.getTransition(this.transitionName);
        if (trans) {
            if (this._currentTransition && this._currentTransition.playing)
                trans.changePlayTimes(this.playTimes);
            else
                trans.play(null, this.playTimes, this.delay);
            this._currentTransition = trans;
        }
    }
    leave(controller) {
        if (this.stopOnExit && this._currentTransition) {
            this._currentTransition.stop();
            this._currentTransition = null;
        }
    }
    setup(buffer) {
        super.setup(buffer);
        this.transitionName = buffer.readS();
        this.playTimes = buffer.readInt();
        this.delay = buffer.readFloat();
        this.stopOnExit = buffer.readBool();
    }
}

class ChangePageAction extends ControllerAction {
    constructor() {
        super();
    }
    enter(controller) {
        if (!this.controllerName)
            return;
        var gcom;
        if (this.objectId)
            gcom = controller.parent.getChildById(this.objectId);
        else
            gcom = controller.parent;
        if (gcom) {
            var cc = gcom.getController(this.controllerName);
            if (cc && cc != controller && !cc.changing) {
                if (this.targetPage == "~1") {
                    if (controller.selectedIndex < cc.pageCount)
                        cc.selectedIndex = controller.selectedIndex;
                }
                else if (this.targetPage == "~2")
                    cc.selectedPage = controller.selectedPage;
                else
                    cc.selectedPageId = this.targetPage;
            }
        }
    }
    setup(buffer) {
        super.setup(buffer);
        this.objectId = buffer.readS();
        this.controllerName = buffer.readS();
        this.targetPage = buffer.readS();
    }
}

var _nextPageId = 0;
class Controller extends EventDispatcher {
    constructor() {
        super();
        this.changing = false;
        this._pageIds = [];
        this._pageNames = [];
        this._selectedIndex = -1;
        this._previousIndex = -1;
    }
    dispose() {
        this.offAll();
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        if (this._selectedIndex != value) {
            if (value > this._pageIds.length - 1)
                throw "index out of bounds: " + value;
            this.changing = true;
            this._previousIndex = this._selectedIndex;
            this._selectedIndex = value;
            this.parent.applyController(this);
            this.dispatchEvent("status_changed");
            this.changing = false;
        }
    }
    //功能和设置selectedIndex一样，但不会触发事件
    setSelectedIndex(value) {
        if (this._selectedIndex != value) {
            if (value > this._pageIds.length - 1)
                throw "index out of bounds: " + value;
            this.changing = true;
            this._previousIndex = this._selectedIndex;
            this._selectedIndex = value;
            this.parent.applyController(this);
            this.changing = false;
        }
    }
    get previsousIndex() {
        return this._previousIndex;
    }
    get selectedPage() {
        if (this._selectedIndex == -1)
            return null;
        else
            return this._pageNames[this._selectedIndex];
    }
    set selectedPage(val) {
        var i = this._pageNames.indexOf(val);
        if (i == -1)
            i = 0;
        this.selectedIndex = i;
    }
    //功能和设置selectedPage一样，但不会触发事件
    setSelectedPage(value) {
        var i = this._pageNames.indexOf(value);
        if (i == -1)
            i = 0;
        this.setSelectedIndex(i);
    }
    get previousPage() {
        if (this._previousIndex == -1)
            return null;
        else
            return this._pageNames[this._previousIndex];
    }
    get pageCount() {
        return this._pageIds.length;
    }
    getPageName(index) {
        return this._pageNames[index];
    }
    addPage(name) {
        name = name || "";
        this.addPageAt(name, this._pageIds.length);
    }
    addPageAt(name, index) {
        name = name || "";
        var nid = "" + (_nextPageId++);
        if (index == null || index == this._pageIds.length) {
            this._pageIds.push(nid);
            this._pageNames.push(name);
        }
        else {
            this._pageIds.splice(index, 0, nid);
            this._pageNames.splice(index, 0, name);
        }
    }
    removePage(name) {
        var i = this._pageNames.indexOf(name);
        if (i != -1) {
            this._pageIds.splice(i, 1);
            this._pageNames.splice(i, 1);
            if (this._selectedIndex >= this._pageIds.length)
                this.selectedIndex = this._selectedIndex - 1;
            else
                this.parent.applyController(this);
        }
    }
    removePageAt(index) {
        this._pageIds.splice(index, 1);
        this._pageNames.splice(index, 1);
        if (this._selectedIndex >= this._pageIds.length)
            this.selectedIndex = this._selectedIndex - 1;
        else
            this.parent.applyController(this);
    }
    clearPages() {
        this._pageIds.length = 0;
        this._pageNames.length = 0;
        if (this._selectedIndex != -1)
            this.selectedIndex = -1;
        else
            this.parent.applyController(this);
    }
    hasPage(aName) {
        return this._pageNames.indexOf(aName) != -1;
    }
    getPageIndexById(aId) {
        return this._pageIds.indexOf(aId);
    }
    getPageIdByName(aName) {
        var i = this._pageNames.indexOf(aName);
        if (i != -1)
            return this._pageIds[i];
        else
            return null;
    }
    getPageNameById(aId) {
        var i = this._pageIds.indexOf(aId);
        if (i != -1)
            return this._pageNames[i];
        else
            return null;
    }
    getPageId(index) {
        return this._pageIds[index];
    }
    get selectedPageId() {
        if (this._selectedIndex == -1)
            return null;
        else
            return this._pageIds[this._selectedIndex];
    }
    set selectedPageId(val) {
        var i = this._pageIds.indexOf(val);
        this.selectedIndex = i;
    }
    set oppositePageId(val) {
        var i = this._pageIds.indexOf(val);
        if (i > 0)
            this.selectedIndex = 0;
        else if (this._pageIds.length > 1)
            this.selectedIndex = 1;
    }
    get previousPageId() {
        if (this._previousIndex == -1)
            return null;
        else
            return this._pageIds[this._previousIndex];
    }
    runActions() {
        if (this._actions) {
            var cnt = this._actions.length;
            for (var i = 0; i < cnt; i++) {
                this._actions[i].run(this, this.previousPageId, this.selectedPageId);
            }
        }
    }
    setup(buffer) {
        var beginPos = buffer.pos;
        buffer.seek(beginPos, 0);
        this.name = buffer.readS();
        if (buffer.readBool())
            this.autoRadioGroupDepth = true;
        buffer.seek(beginPos, 1);
        var i;
        var nextPos;
        var cnt = buffer.readShort();
        for (i = 0; i < cnt; i++) {
            this._pageIds.push(buffer.readS());
            this._pageNames.push(buffer.readS());
        }
        var homePageIndex = 0;
        if (buffer.version >= 2) {
            var homePageType = buffer.readByte();
            switch (homePageType) {
                case 1:
                    homePageIndex = buffer.readShort();
                    break;
                case 2:
                    homePageIndex = this._pageNames.indexOf(UIPackage.branch);
                    if (homePageIndex == -1)
                        homePageIndex = 0;
                    break;
                case 3:
                    homePageIndex = this._pageNames.indexOf(UIPackage.getVar(buffer.readS()));
                    if (homePageIndex == -1)
                        homePageIndex = 0;
                    break;
            }
        }
        buffer.seek(beginPos, 2);
        cnt = buffer.readShort();
        if (cnt > 0) {
            if (this._actions == null)
                this._actions = [];
            for (i = 0; i < cnt; i++) {
                nextPos = buffer.readShort();
                nextPos += buffer.pos;
                var action = createAction(buffer.readByte());
                action.setup(buffer);
                this._actions.push(action);
                buffer.pos = nextPos;
            }
        }
        if (this.parent && this._pageIds.length > 0)
            this._selectedIndex = homePageIndex;
        else
            this._selectedIndex = -1;
    }
}
function createAction(type) {
    switch (type) {
        case 0:
            return new PlayTransitionAction();
        case 1:
            return new ChangePageAction();
    }
    return null;
}

class Margin {
    constructor() {
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
    }
    copy(source) {
        this.top = source.top;
        this.bottom = source.bottom;
        this.left = source.left;
        this.right = source.right;
    }
}

var s_vec2$2 = new Vector2();
var s_rect$6 = new Rect();
var s_endPos = new Vector2();
var s_oldChange = new Vector2();
var s_gestureFlag = 0;
const TWEEN_TIME_GO = 0.5; //调用SetPos(ani)时使用的缓动时间
const TWEEN_TIME_DEFAULT = 0.3; //惯性滚动的最小缓动时间
const PULL_RATIO = 0.5; //下拉过顶或者上拉过底时允许超过的距离占显示区域的比例
class ScrollPane {
    constructor(owner) {
        this._owner = owner;
        this._maskContainer = new DisplayObject();
        this._owner.displayObject.addChild(this._maskContainer);
        this._container = this._owner._container;
        this._container.setPosition(0, 0);
        this._maskContainer.addChild(this._container);
        this._mouseWheelEnabled = true;
        this._xPos = 0;
        this._yPos = 0;
        this._aniFlag = 0;
        this._tweening = 0;
        this._loop = 0;
        this._footerLockedSize = 0;
        this._headerLockedSize = 0;
        this._scrollBarMargin = new Margin();
        this._viewSize = new Vector2();
        this._contentSize = new Vector2();
        this._pageSize = new Vector2(1, 1);
        this._overlapSize = new Vector2();
        this._tweenTime = new Vector2();
        this._tweenStart = new Vector2();
        this._tweenDuration = new Vector2();
        this._tweenChange = new Vector2();
        this._velocity = new Vector2();
        this._containerPos = new Vector2();
        this._beginTouchPos = new Vector2();
        this._lastTouchPos = new Vector2();
        this._lastTouchGlobalPos = new Vector2();
        this._scrollStep = UIConfig.defaultScrollStep;
        this._decelerationRate = UIConfig.defaultScrollDecelerationRate;
        this._owner.on("touch_begin", this.__touchBegin, this);
        this._owner.on("touch_move", this.__touchMove, this);
        this._owner.on("touch_end", this.__touchEnd, this);
        this._owner.on("mouse_wheel", this.__mouseWheel, this);
    }
    setup(buffer) {
        this._scrollType = buffer.readByte();
        var scrollBarDisplay = buffer.readByte();
        var flags = buffer.readInt();
        if (buffer.readBool()) {
            this._scrollBarMargin.top = buffer.readInt();
            this._scrollBarMargin.bottom = buffer.readInt();
            this._scrollBarMargin.left = buffer.readInt();
            this._scrollBarMargin.right = buffer.readInt();
        }
        var vtScrollBarRes = buffer.readS();
        var hzScrollBarRes = buffer.readS();
        var headerRes = buffer.readS();
        var footerRes = buffer.readS();
        if ((flags & 1) != 0)
            this._displayOnLeft = true;
        if ((flags & 2) != 0)
            this._snapToItem = true;
        if ((flags & 4) != 0)
            this._displayInDemand = true;
        if ((flags & 8) != 0)
            this._pageMode = true;
        if (flags & 16)
            this._touchEffect = true;
        else if (flags & 32)
            this._touchEffect = false;
        else
            this._touchEffect = UIConfig.defaultScrollTouchEffect;
        if (flags & 64)
            this._bouncebackEffect = true;
        else if (flags & 128)
            this._bouncebackEffect = false;
        else
            this._bouncebackEffect = UIConfig.defaultScrollBounceEffect;
        if ((flags & 256) != 0)
            this._inertiaDisabled = true;
        if ((flags & 512) == 0)
            this._maskContainer.clipRect = new Rect();
        if ((flags & 1024) != 0)
            this._floating = true;
        if ((flags & 2048) != 0)
            this._dontClipMargin = true;
        if (scrollBarDisplay == ScrollBarDisplayType.Default)
            scrollBarDisplay = UIConfig.defaultScrollBarDisplay;
        if (scrollBarDisplay != ScrollBarDisplayType.Hidden) {
            if (this._scrollType == ScrollType.Both || this._scrollType == ScrollType.Vertical) {
                var res = vtScrollBarRes ? vtScrollBarRes : UIConfig.verticalScrollBar;
                if (res) {
                    this._vtScrollBar = (UIPackage.createObjectFromURL(res));
                    if (!this._vtScrollBar)
                        throw "cannot create scrollbar} from " + res;
                    this._vtScrollBar.setScrollPane(this, true);
                    this._owner.displayObject.addChild(this._vtScrollBar.displayObject);
                }
            }
            if (this._scrollType == ScrollType.Both || this._scrollType == ScrollType.Horizontal) {
                res = hzScrollBarRes ? hzScrollBarRes : UIConfig.horizontalScrollBar;
                if (res) {
                    this._hzScrollBar = (UIPackage.createObjectFromURL(res));
                    if (!this._hzScrollBar)
                        throw "cannot create scrollbar} from " + res;
                    this._hzScrollBar.setScrollPane(this, false);
                    this._owner.displayObject.addChild(this._hzScrollBar.displayObject);
                }
            }
            if (scrollBarDisplay == ScrollBarDisplayType.Auto)
                this._scrollBarDisplayAuto = true;
            if (this._scrollBarDisplayAuto) {
                if (this._vtScrollBar)
                    this._vtScrollBar.displayObject.visible = false;
                if (this._hzScrollBar)
                    this._hzScrollBar.displayObject.visible = false;
            }
        }
        else
            this._mouseWheelEnabled = false;
        if (headerRes) {
            this._header = UIPackage.createObjectFromURL(headerRes);
            if (!this._header)
                throw new Error("cannot create scrollPane header from " + headerRes);
        }
        if (footerRes) {
            this._footer = UIPackage.createObjectFromURL(footerRes);
            if (!this._footer)
                throw new Error("cannot create scrollPane footer from " + footerRes);
        }
        if (this._header || this._footer)
            this._refreshBarAxis = (this._scrollType == ScrollType.Both || this._scrollType == ScrollType.Vertical) ? "y" : "x";
        this.setSize(this.owner.width, this.owner.height);
    }
    dispose() {
        if (this._tweening != 0)
            Timers.remove(this.tweenUpdate, this);
        delete this._pageController;
        if (this._hzScrollBar)
            this._hzScrollBar.dispose();
        if (this._vtScrollBar)
            this._vtScrollBar.dispose();
        if (this._header)
            this._header.dispose();
        if (this._footer)
            this._footer.dispose();
    }
    get owner() {
        return this._owner;
    }
    get hzScrollBar() {
        return this._hzScrollBar;
    }
    get vtScrollBar() {
        return this._vtScrollBar;
    }
    get header() {
        return this._header;
    }
    get footer() {
        return this._footer;
    }
    get bouncebackEffect() {
        return this._bouncebackEffect;
    }
    set bouncebackEffect(sc) {
        this._bouncebackEffect = sc;
    }
    get touchEffect() {
        return this._touchEffect;
    }
    set touchEffect(sc) {
        this._touchEffect = sc;
    }
    set scrollStep(val) {
        this._scrollStep = val;
        if (this._scrollStep == 0)
            this._scrollStep = UIConfig.defaultScrollStep;
    }
    get scrollStep() {
        return this._scrollStep;
    }
    get snapToItem() {
        return this._snapToItem;
    }
    set snapToItem(value) {
        this._snapToItem = value;
    }
    get mouseWheelEnabled() {
        return this._mouseWheelEnabled;
    }
    set mouseWheelEnabled(value) {
        this._mouseWheelEnabled = value;
    }
    get decelerationRate() {
        return this._decelerationRate;
    }
    set decelerationRate(value) {
        this._decelerationRate = value;
    }
    get isDragged() {
        return this._dragged;
    }
    get percX() {
        return this._overlapSize.x == 0 ? 0 : this._xPos / this._overlapSize.x;
    }
    set percX(value) {
        this.setPercX(value, false);
    }
    setPercX(value, ani) {
        this._owner.ensureBoundsCorrect();
        this.setPosX(this._overlapSize.x * clamp01(value), ani);
    }
    get percY() {
        return this._overlapSize.y == 0 ? 0 : this._yPos / this._overlapSize.y;
    }
    set percY(value) {
        this.setPercY(value, false);
    }
    setPercY(value, ani) {
        this._owner.ensureBoundsCorrect();
        this.setPosY(this._overlapSize.y * clamp01(value), ani);
    }
    get posX() {
        return this._xPos;
    }
    set posX(value) {
        this.setPosX(value, false);
    }
    setPosX(value, ani) {
        this._owner.ensureBoundsCorrect();
        if (this._loop == 1)
            value = this.loopCheckingNewPos(value, "x");
        value = clamp(value, 0, this._overlapSize.x);
        if (value != this._xPos) {
            this._xPos = value;
            this.posChanged(ani);
        }
    }
    get posY() {
        return this._yPos;
    }
    set posY(value) {
        this.setPosY(value, false);
    }
    setPosY(value, ani) {
        this._owner.ensureBoundsCorrect();
        if (this._loop == 1)
            value = this.loopCheckingNewPos(value, "y");
        value = clamp(value, 0, this._overlapSize.y);
        if (value != this._yPos) {
            this._yPos = value;
            this.posChanged(ani);
        }
    }
    get contentWidth() {
        return this._contentSize.x;
    }
    get contentHeight() {
        return this._contentSize.y;
    }
    get viewWidth() {
        return this._viewSize.x;
    }
    set viewWidth(value) {
        value = value + this._owner.margin.left + this._owner.margin.right;
        if (this._vtScrollBar && !this._floating)
            value += this._vtScrollBar.width;
        this._owner.width = value;
    }
    get viewHeight() {
        return this._viewSize.y;
    }
    set viewHeight(value) {
        value = value + this._owner.margin.top + this._owner.margin.bottom;
        if (this._hzScrollBar && !this._floating)
            value += this._hzScrollBar.height;
        this._owner.height = value;
    }
    get currentPageX() {
        if (!this._pageMode)
            return 0;
        var page = Math.floor(this._xPos / this._pageSize.x);
        if (this._xPos - page * this._pageSize.x > this._pageSize.x * 0.5)
            page++;
        return page;
    }
    set currentPageX(value) {
        this.setCurrentPageX(value, false);
    }
    get currentPageY() {
        if (!this._pageMode)
            return 0;
        var page = Math.floor(this._yPos / this._pageSize.y);
        if (this._yPos - page * this._pageSize.y > this._pageSize.y * 0.5)
            page++;
        return page;
    }
    set currentPageY(value) {
        this.setCurrentPageY(value, false);
    }
    setCurrentPageX(value, ani) {
        if (!this._pageMode)
            return;
        this._owner.ensureBoundsCorrect();
        if (this._overlapSize.x > 0)
            this.setPosX(value * this._pageSize.x, ani);
    }
    setCurrentPageY(value, ani) {
        if (!this._pageMode)
            return;
        this._owner.ensureBoundsCorrect();
        if (this._overlapSize.y > 0)
            this.setPosY(value * this._pageSize.y, ani);
    }
    get isBottomMost() {
        return this._yPos == this._overlapSize.y || this._overlapSize.y == 0;
    }
    get isRightMost() {
        return this._xPos == this._overlapSize.x || this._overlapSize.x == 0;
    }
    get pageController() {
        return this._pageController;
    }
    set pageController(value) {
        this._pageController = value;
    }
    get scrollingPosX() {
        return clamp(-this._container.x, 0, this._overlapSize.x);
    }
    get scrollingPosY() {
        return clamp(-this._container.y, 0, this._overlapSize.y);
    }
    scrollTop(ani) {
        this.setPercY(0, ani);
    }
    scrollBottom(ani) {
        this.setPercY(1, ani);
    }
    scrollUp(ratio, ani) {
        ratio = ratio || 1;
        if (this._pageMode)
            this.setPosY(this._yPos - this._pageSize.y * ratio, ani);
        else
            this.setPosY(this._yPos - this._scrollStep * ratio, ani);
    }
    scrollDown(ratio, ani) {
        ratio = ratio || 1;
        if (this._pageMode)
            this.setPosY(this._yPos + this._pageSize.y * ratio, ani);
        else
            this.setPosY(this._yPos + this._scrollStep * ratio, ani);
    }
    scrollLeft(ratio, ani) {
        ratio = ratio || 1;
        if (this._pageMode)
            this.setPosX(this._xPos - this._pageSize.x * ratio, ani);
        else
            this.setPosX(this._xPos - this._scrollStep * ratio, ani);
    }
    scrollRight(ratio, ani) {
        ratio = ratio || 1;
        if (this._pageMode)
            this.setPosX(this._xPos + this._pageSize.x * ratio, ani);
        else
            this.setPosX(this._xPos + this._scrollStep * ratio, ani);
    }
    scrollToView(target, ani, setFirst) {
        this._owner.ensureBoundsCorrect();
        if (this._needRefresh)
            this.refresh();
        var rect;
        if (target instanceof GObject) {
            if (target.parent != this._owner) {
                target.parent.localToGlobalRect(target.x, target.y, target.width, target.height, s_rect$6);
                rect = this._owner.globalToLocalRect(s_rect$6.x, s_rect$6.y, s_rect$6.width, s_rect$6.height, s_rect$6);
            }
            else {
                rect = s_rect$6;
                rect.set(target.x, target.y, target.width, target.height);
            }
        }
        else
            rect = target;
        if (this._overlapSize.y > 0) {
            var bottom = this._yPos + this._viewSize.y;
            if (setFirst || rect.y <= this._yPos || rect.height >= this._viewSize.y) {
                if (this._pageMode)
                    this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);
                else
                    this.setPosY(rect.y, ani);
            }
            else if (rect.y + rect.height > bottom) {
                if (this._pageMode)
                    this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);
                else if (rect.height <= this._viewSize.y / 2)
                    this.setPosY(rect.y + rect.height * 2 - this._viewSize.y, ani);
                else
                    this.setPosY(rect.y + rect.height - this._viewSize.y, ani);
            }
        }
        if (this._overlapSize.x > 0) {
            var right = this._xPos + this._viewSize.x;
            if (setFirst || rect.x <= this._xPos || rect.width >= this._viewSize.x) {
                if (this._pageMode)
                    this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);
                else
                    this.setPosX(rect.x, ani);
            }
            else if (rect.x + rect.width > right) {
                if (this._pageMode)
                    this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);
                else if (rect.width <= this._viewSize.x / 2)
                    this.setPosX(rect.x + rect.width * 2 - this._viewSize.x, ani);
                else
                    this.setPosX(rect.x + rect.width - this._viewSize.x, ani);
            }
        }
        if (!ani && this._needRefresh)
            this.refresh();
    }
    isChildInView(obj) {
        if (this._overlapSize.y > 0) {
            var dist = obj.y + this._container.y;
            if (dist < -obj.height || dist > this._viewSize.y)
                return false;
        }
        if (this._overlapSize.x > 0) {
            dist = obj.x + this._container.x;
            if (dist < -obj.width || dist > this._viewSize.x)
                return false;
        }
        return true;
    }
    cancelDragging() {
        Stage.removeTouchMonitor(this._owner.displayObject);
        if (ScrollPane.draggingPane == this)
            ScrollPane.draggingPane = null;
        s_gestureFlag = 0;
        this._dragged = false;
    }
    lockHeader(size) {
        if (this._headerLockedSize == size)
            return;
        this._headerLockedSize = size;
        if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] >= 0) {
            this._tweenStart.set(this._container.x, this._container.y);
            this._tweenChange.set(0, 0);
            this._tweenChange[this._refreshBarAxis] = this._headerLockedSize - this._tweenStart[this._refreshBarAxis];
            this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);
            this.startTween(2);
        }
    }
    lockFooter(size) {
        if (this._footerLockedSize == size)
            return;
        this._footerLockedSize = size;
        if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] <= -this._overlapSize[this._refreshBarAxis]) {
            this._tweenStart.set(this._container.x, this._container.y);
            this._tweenChange.set(0, 0);
            var max = this._overlapSize[this._refreshBarAxis];
            if (max == 0)
                max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
            else
                max += this._footerLockedSize;
            this._tweenChange[this._refreshBarAxis] = -max - this._tweenStart[this._refreshBarAxis];
            this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);
            this.startTween(2);
        }
    }
    onOwnerSizeChanged() {
        this.setSize(this._owner.width, this._owner.height);
        this.posChanged(false);
    }
    handleControllerChanged(c) {
        if (this._pageController == c) {
            if (this._scrollType == ScrollType.Horizontal)
                this.setCurrentPageX(c.selectedIndex, true);
            else
                this.setCurrentPageY(c.selectedIndex, true);
        }
    }
    updatePageController() {
        if (this._pageController && !this._pageController.changing) {
            var index;
            if (this._scrollType == ScrollType.Horizontal)
                index = this.currentPageX;
            else
                index = this.currentPageY;
            if (index < this._pageController.pageCount) {
                var c = this._pageController;
                this._pageController = null; //防止HandleControllerChanged的调用
                c.selectedIndex = index;
                this._pageController = c;
            }
        }
    }
    adjustMaskContainer() {
        var mx, my;
        if (this._displayOnLeft && this._vtScrollBar && !this._floating)
            mx = Math.floor(this._owner.margin.left + this._vtScrollBar.width);
        else
            mx = Math.floor(this._owner.margin.left);
        my = Math.floor(this._owner.margin.top);
        mx += this._owner._alignOffset.x;
        my += this._owner._alignOffset.y;
        this._maskContainer.setPosition(mx, my);
    }
    setSize(aWidth, aHeight) {
        this.adjustMaskContainer();
        if (this._hzScrollBar) {
            this._hzScrollBar.y = aHeight - this._hzScrollBar.height;
            if (this._vtScrollBar) {
                this._hzScrollBar.width = aWidth - this._vtScrollBar.width - this._scrollBarMargin.left - this._scrollBarMargin.right;
                if (this._displayOnLeft)
                    this._hzScrollBar.x = this._scrollBarMargin.left + this._vtScrollBar.width;
                else
                    this._hzScrollBar.x = this._scrollBarMargin.left;
            }
            else {
                this._hzScrollBar.width = aWidth - this._scrollBarMargin.left - this._scrollBarMargin.right;
                this._hzScrollBar.x = this._scrollBarMargin.left;
            }
        }
        if (this._vtScrollBar) {
            if (!this._displayOnLeft)
                this._vtScrollBar.x = aWidth - this._vtScrollBar.width;
            if (this._hzScrollBar)
                this._vtScrollBar.height = aHeight - this._hzScrollBar.height - this._scrollBarMargin.top - this._scrollBarMargin.bottom;
            else
                this._vtScrollBar.height = aHeight - this._scrollBarMargin.top - this._scrollBarMargin.bottom;
            this._vtScrollBar.y = this._scrollBarMargin.top;
        }
        this._viewSize.x = aWidth;
        this._viewSize.y = aHeight;
        if (this._hzScrollBar && !this._floating)
            this._viewSize.y -= this._hzScrollBar.height;
        if (this._vtScrollBar && !this._floating)
            this._viewSize.x -= this._vtScrollBar.width;
        this._viewSize.x -= (this._owner.margin.left + this._owner.margin.right);
        this._viewSize.y -= (this._owner.margin.top + this._owner.margin.bottom);
        this._viewSize.x = Math.max(1, this._viewSize.x);
        this._viewSize.y = Math.max(1, this._viewSize.y);
        this._pageSize.x = this._viewSize.x;
        this._pageSize.y = this._viewSize.y;
        this.handleSizeChanged();
    }
    setContentSize(aWidth, aHeight) {
        if (this._contentSize.x == aWidth && this._contentSize.y == aHeight)
            return;
        this._contentSize.x = aWidth;
        this._contentSize.y = aHeight;
        this.handleSizeChanged();
    }
    changeContentSizeOnScrolling(deltaWidth, deltaHeight, deltaPosX, deltaPosY) {
        var isRightmost = this._xPos == this._overlapSize.x;
        var isBottom = this._yPos == this._overlapSize.y;
        this._contentSize.x += deltaWidth;
        this._contentSize.y += deltaHeight;
        this.handleSizeChanged();
        if (this._tweening == 1) {
            //如果原来滚动位置是贴边，加入处理继续贴边。
            if (deltaWidth != 0 && isRightmost && this._tweenChange.x < 0) {
                this._xPos = this._overlapSize.x;
                this._tweenChange.x = -this._xPos - this._tweenStart.x;
            }
            if (deltaHeight != 0 && isBottom && this._tweenChange.y < 0) {
                this._yPos = this._overlapSize.y;
                this._tweenChange.y = -this._yPos - this._tweenStart.y;
            }
        }
        else if (this._tweening == 2) {
            //重新调整起始位置，确保能够顺滑滚下去
            if (deltaPosX != 0) {
                this._container.x -= deltaPosX;
                this._tweenStart.x -= deltaPosX;
                this._xPos = -this._container.x;
            }
            if (deltaPosY != 0) {
                this._container.y -= deltaPosY;
                this._tweenStart.y -= deltaPosY;
                this._yPos = -this._container.y;
            }
        }
        else if (this._dragged) {
            if (deltaPosX != 0) {
                this._container.x -= deltaPosX;
                this._containerPos.x -= deltaPosX;
                this._xPos = -this._container.x;
            }
            if (deltaPosY != 0) {
                this._container.y -= deltaPosY;
                this._containerPos.y -= deltaPosY;
                this._yPos = -this._container.y;
            }
        }
        else {
            //如果原来滚动位置是贴边，加入处理继续贴边。
            if (deltaWidth != 0 && isRightmost) {
                this._xPos = this._overlapSize.x;
                this._container.x = -this._xPos;
            }
            if (deltaHeight != 0 && isBottom) {
                this._yPos = this._overlapSize.y;
                this._container.y = -this._yPos;
            }
        }
        if (this._pageMode)
            this.updatePageController();
    }
    handleSizeChanged() {
        if (this._displayInDemand) {
            this._vScrollNone = this._contentSize.y <= this._viewSize.y;
            this._hScrollNone = this._contentSize.x <= this._viewSize.x;
        }
        if (this._vtScrollBar) {
            if (this._contentSize.y == 0)
                this._vtScrollBar.setDisplayPerc(0);
            else
                this._vtScrollBar.setDisplayPerc(Math.min(1, this._viewSize.y / this._contentSize.y));
        }
        if (this._hzScrollBar) {
            if (this._contentSize.x == 0)
                this._hzScrollBar.setDisplayPerc(0);
            else
                this._hzScrollBar.setDisplayPerc(Math.min(1, this._viewSize.x / this._contentSize.x));
        }
        this.updateScrollBarVisible();
        var rect = this._maskContainer.clipRect;
        if (rect) {
            rect.x = -this._owner._alignOffset.x;
            rect.y = -this._owner._alignOffset.y;
            rect.width = this._viewSize.x;
            rect.height = this._viewSize.y;
            if (this._vScrollNone && this._vtScrollBar)
                rect.width += this._vtScrollBar.width;
            if (this._hScrollNone && this._hzScrollBar)
                rect.height += this._hzScrollBar.height;
            if (this._dontClipMargin) {
                rect.x -= this._owner.margin.left;
                rect.width += (this._owner.margin.left + this._owner.margin.right);
                rect.y -= this._owner.margin.top;
                rect.height += (this._owner.margin.top + this._owner.margin.bottom);
            }
            this._maskContainer.clipRect = rect;
        }
        if (this._scrollType == ScrollType.Horizontal || this._scrollType == ScrollType.Both)
            this._overlapSize.x = Math.ceil(Math.max(0, this._contentSize.x - this._viewSize.x));
        else
            this._overlapSize.x = 0;
        if (this._scrollType == ScrollType.Vertical || this._scrollType == ScrollType.Both)
            this._overlapSize.y = Math.ceil(Math.max(0, this._contentSize.y - this._viewSize.y));
        else
            this._overlapSize.y = 0;
        //边界检查
        this._xPos = clamp(this._xPos, 0, this._overlapSize.x);
        this._yPos = clamp(this._yPos, 0, this._overlapSize.y);
        if (this._refreshBarAxis) {
            var max = this._overlapSize[this._refreshBarAxis];
            if (max == 0)
                max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
            else
                max += this._footerLockedSize;
            if (this._refreshBarAxis == "x") {
                this._container.setPosition(clamp(this._container.x, -max, this._headerLockedSize), clamp(this._container.y, -this._overlapSize.y, 0));
            }
            else {
                this._container.setPosition(clamp(this._container.x, -this._overlapSize.x, 0), clamp(this._container.y, -max, this._headerLockedSize));
            }
            if (this._header) {
                if (this._refreshBarAxis == "x")
                    this._header.height = this._viewSize.y;
                else
                    this._header.width = this._viewSize.x;
            }
            if (this._footer) {
                if (this._refreshBarAxis == "y")
                    this._footer.height = this._viewSize.y;
                else
                    this._footer.width = this._viewSize.x;
            }
        }
        else {
            this._container.setPosition(clamp(this._container.x, -this._overlapSize.x, 0), clamp(this._container.y, -this._overlapSize.y, 0));
        }
        this.updateScrollBarPos();
        if (this._pageMode)
            this.updatePageController();
    }
    posChanged(ani) {
        if (this._aniFlag == 0)
            this._aniFlag = ani ? 1 : -1;
        else if (this._aniFlag == 1 && !ani)
            this._aniFlag = -1;
        this._needRefresh = true;
        Timers.callLater(this.refresh, this);
    }
    refresh() {
        if (this._owner.displayObject == null) {
            return;
        }
        this._needRefresh = false;
        Timers.remove(this.refresh, this);
        if (this._pageMode || this._snapToItem) {
            s_endPos.set(-this._xPos, -this._yPos);
            this.alignPosition(s_endPos, false);
            this._xPos = -s_endPos.x;
            this._yPos = -s_endPos.y;
        }
        this.refresh2();
        this._owner.dispatchEvent("scroll");
        if (this._needRefresh) //在onScroll事件里开发者可能修改位置，这里再刷新一次，避免闪烁
         {
            this._needRefresh = false;
            Timers.remove(this.refresh, this);
            this.refresh2();
        }
        this.updateScrollBarPos();
        this._aniFlag = 0;
    }
    refresh2() {
        if (this._aniFlag == 1 && !this._dragged) {
            var posX;
            var posY;
            if (this._overlapSize.x > 0)
                posX = -Math.floor(this._xPos);
            else {
                if (this._container.x != 0)
                    this._container.x = 0;
                posX = 0;
            }
            if (this._overlapSize.y > 0)
                posY = -Math.floor(this._yPos);
            else {
                if (this._container.y != 0)
                    this._container.y = 0;
                posY = 0;
            }
            if (posX != this._container.x || posY != this._container.y) {
                this._tweenDuration.set(TWEEN_TIME_GO, TWEEN_TIME_GO);
                this._tweenStart.set(this._container.x, this._container.y);
                this._tweenChange.set(posX - this._tweenStart.x, posY - this._tweenStart.y);
                this.startTween(1);
            }
            else if (this._tweening != 0)
                this.killTween();
        }
        else {
            if (this._tweening != 0)
                this.killTween();
            this._container.setPosition(Math.floor(-this._xPos), Math.floor(-this._yPos));
            this.loopCheckingCurrent();
        }
        if (this._pageMode)
            this.updatePageController();
    }
    __touchBegin(evt) {
        if (!this._touchEffect)
            return;
        if (evt.input.button != 0)
            return;
        evt.captureTouch();
        if (this._tweening != 0) {
            this.killTween();
            Stage.cancelClick(evt.input.touchId);
            this._dragged = true;
        }
        else
            this._dragged = false;
        var pt = this._owner.globalToLocal(evt.input.x, evt.input.y, s_vec2$2);
        this._containerPos.set(this._container.x, this._container.y);
        this._beginTouchPos.set(pt.x, pt.y);
        this._lastTouchPos.set(pt.x, pt.y);
        this._lastTouchGlobalPos.set(evt.input.x, evt.input.y);
        this._isHoldAreaDone = false;
        this._velocity.set(0, 0);
        this._velocityScale = 1;
        this._lastMoveTime = performance.now() / 1000;
    }
    __touchMove(evt) {
        if (!this._touchEffect || this.owner.isDisposed)
            return;
        if (ScrollPane.draggingPane && ScrollPane.draggingPane != this || GObject.draggingObject) //已经有其他拖动
            return;
        var sensitivity = UIConfig.touchScrollSensitivity;
        var pt = this._owner.globalToLocal(evt.input.x, evt.input.y);
        var diff;
        var sv, sh;
        if (this._scrollType == ScrollType.Vertical) {
            if (!this._isHoldAreaDone) {
                //表示正在监测垂直方向的手势
                s_gestureFlag |= 1;
                diff = Math.abs(this._beginTouchPos.y - pt.y);
                if (diff < sensitivity)
                    return;
                if ((s_gestureFlag & 2) != 0) //已经有水平方向的手势在监测，那么我们用严格的方式检查是不是按垂直方向移动，避免冲突
                 {
                    let diff2 = Math.abs(this._beginTouchPos.x - pt.x);
                    if (diff < diff2) //不通过则不允许滚动了
                        return;
                }
            }
            sv = true;
        }
        else if (this._scrollType == ScrollType.Horizontal) {
            if (!this._isHoldAreaDone) {
                s_gestureFlag |= 2;
                diff = Math.abs(this._beginTouchPos.x - pt.x);
                if (diff < sensitivity)
                    return;
                if ((s_gestureFlag & 1) != 0) {
                    let diff2 = Math.abs(this._beginTouchPos.y - pt.y);
                    if (diff < diff2)
                        return;
                }
            }
            sh = true;
        }
        else {
            s_gestureFlag = 3;
            if (!this._isHoldAreaDone) {
                diff = Math.abs(this._beginTouchPos.y - pt.y);
                if (diff < sensitivity) {
                    diff = Math.abs(this._beginTouchPos.x - pt.x);
                    if (diff < sensitivity)
                        return;
                }
            }
            sv = sh = true;
        }
        var newPosX = Math.floor(this._containerPos.x + pt.x - this._beginTouchPos.x);
        var newPosY = Math.floor(this._containerPos.y + pt.y - this._beginTouchPos.y);
        if (sv) {
            if (newPosY > 0) {
                if (!this._bouncebackEffect)
                    this._container.y = 0;
                else if (this._header && this._header.maxHeight != 0)
                    this._container.y = Math.floor(Math.min(newPosY * 0.5, this._header.maxHeight));
                else
                    this._container.y = Math.floor(Math.min(newPosY * 0.5, this._viewSize.y * PULL_RATIO));
            }
            else if (newPosY < -this._overlapSize.y) {
                if (!this._bouncebackEffect)
                    this._container.y = -this._overlapSize.y;
                else if (this._footer && this._footer.maxHeight > 0)
                    this._container.y = Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._footer.maxHeight) - this._overlapSize.y);
                else
                    this._container.y = Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._viewSize.y * PULL_RATIO) - this._overlapSize.y);
            }
            else
                this._container.y = newPosY;
        }
        if (sh) {
            if (newPosX > 0) {
                if (!this._bouncebackEffect)
                    this._container.x = 0;
                else if (this._header && this._header.maxWidth != 0)
                    this._container.x = Math.floor(Math.min(newPosX * 0.5, this._header.maxWidth));
                else
                    this._container.x = Math.floor(Math.min(newPosX * 0.5, this._viewSize.x * PULL_RATIO));
            }
            else if (newPosX < 0 - this._overlapSize.x) {
                if (!this._bouncebackEffect)
                    this._container.x = -this._overlapSize.x;
                else if (this._footer && this._footer.maxWidth > 0)
                    this._container.x = Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._footer.maxWidth) - this._overlapSize.x);
                else
                    this._container.x = Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._viewSize.x * PULL_RATIO) - this._overlapSize.x);
            }
            else
                this._container.x = newPosX;
        }
        //更新速度
        var frameRate = 60;
        var now = performance.now() / 1000;
        var deltaTime = Math.max(now - this._lastMoveTime, 1 / frameRate);
        var deltaPositionX = pt.x - this._lastTouchPos.x;
        var deltaPositionY = pt.y - this._lastTouchPos.y;
        if (!sh)
            deltaPositionX = 0;
        if (!sv)
            deltaPositionY = 0;
        if (deltaTime != 0) {
            var elapsed = deltaTime * frameRate - 1;
            if (elapsed > 1) //速度衰减
             {
                var factor = Math.pow(0.833, elapsed);
                this._velocity.x = this._velocity.x * factor;
                this._velocity.y = this._velocity.y * factor;
            }
            this._velocity.x = lerp(this._velocity.x, deltaPositionX * 60 / frameRate / deltaTime, deltaTime * 10);
            this._velocity.y = lerp(this._velocity.y, deltaPositionY * 60 / frameRate / deltaTime, deltaTime * 10);
        }
        /*速度计算使用的是本地位移，但在后续的惯性滚动判断中需要用到屏幕位移，所以这里要记录一个位移的比例。
        */
        var deltaGlobalPositionX = this._lastTouchGlobalPos.x - evt.input.x;
        var deltaGlobalPositionY = this._lastTouchGlobalPos.y - evt.input.y;
        if (deltaPositionX != 0)
            this._velocityScale = Math.abs(deltaGlobalPositionX / deltaPositionX);
        else if (deltaPositionY != 0)
            this._velocityScale = Math.abs(deltaGlobalPositionY / deltaPositionY);
        this._lastTouchPos.set(pt.x, pt.y);
        this._lastTouchGlobalPos.set(evt.input.x, evt.input.y);
        this._lastMoveTime = now;
        //同步更新pos值
        if (this._overlapSize.x > 0)
            this._xPos = clamp(-this._container.x, 0, this._overlapSize.x);
        if (this._overlapSize.y > 0)
            this._yPos = clamp(-this._container.y, 0, this._overlapSize.y);
        //循环滚动特别检查
        if (this._loop != 0) {
            newPosX = this._container.x;
            newPosY = this._container.y;
            if (this.loopCheckingCurrent()) {
                this._containerPos.x += this._container.x - newPosX;
                this._containerPos.y += this._container.y - newPosY;
            }
        }
        ScrollPane.draggingPane = this;
        this._isHoldAreaDone = true;
        this._dragged = true;
        this.updateScrollBarPos();
        this.updateScrollBarVisible();
        if (this._pageMode)
            this.updatePageController();
        this._owner.dispatchEvent("scroll");
    }
    __touchEnd() {
        if (ScrollPane.draggingPane == this)
            ScrollPane.draggingPane = null;
        s_gestureFlag = 0;
        if (!this._dragged || !this._touchEffect) {
            this._dragged = false;
            return;
        }
        this._dragged = false;
        this._tweenStart.set(this._container.x, this._container.y);
        s_endPos.set(this._tweenStart.x, this._tweenStart.y);
        var flag = false;
        if (this._container.x > 0) {
            s_endPos.x = 0;
            flag = true;
        }
        else if (this._container.x < -this._overlapSize.x) {
            s_endPos.x = -this._overlapSize.x;
            flag = true;
        }
        if (this._container.y > 0) {
            s_endPos.y = 0;
            flag = true;
        }
        else if (this._container.y < -this._overlapSize.y) {
            s_endPos.y = -this._overlapSize.y;
            flag = true;
        }
        if (flag) {
            this._tweenChange.set(s_endPos.x - this._tweenStart.x, s_endPos.y - this._tweenStart.y);
            if (this._tweenChange.x < -UIConfig.touchDragSensitivity || this._tweenChange.y < -UIConfig.touchDragSensitivity) {
                this._refreshEventDispatching = true;
                this._owner.dispatchEvent("pull_down_release");
                this._refreshEventDispatching = false;
            }
            else if (this._tweenChange.x > UIConfig.touchDragSensitivity || this._tweenChange.y > UIConfig.touchDragSensitivity) {
                this._refreshEventDispatching = true;
                this._owner.dispatchEvent("pull_up_release");
                this._refreshEventDispatching = false;
            }
            if (this._headerLockedSize > 0 && s_endPos[this._refreshBarAxis] == 0) {
                s_endPos[this._refreshBarAxis] = this._headerLockedSize;
                this._tweenChange.x = s_endPos.x - this._tweenStart.x;
                this._tweenChange.y = s_endPos.y - this._tweenStart.y;
            }
            else if (this._footerLockedSize > 0 && s_endPos[this._refreshBarAxis] == -this._overlapSize[this._refreshBarAxis]) {
                var max = this._overlapSize[this._refreshBarAxis];
                if (max == 0)
                    max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
                else
                    max += this._footerLockedSize;
                s_endPos[this._refreshBarAxis] = -max;
                this._tweenChange.x = s_endPos.x - this._tweenStart.x;
                this._tweenChange.y = s_endPos.y - this._tweenStart.y;
            }
            this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);
        }
        else {
            //更新速度
            if (!this._inertiaDisabled) {
                var frameRate = 60;
                var elapsed = (performance.now() / 1000 - this._lastMoveTime) * frameRate - 1;
                if (elapsed > 1) {
                    var factor = Math.pow(0.833, elapsed);
                    this._velocity.x = this._velocity.x * factor;
                    this._velocity.y = this._velocity.y * factor;
                }
                //根据速度计算目标位置和需要时间
                this.updateTargetAndDuration(this._tweenStart, s_endPos);
            }
            else
                this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);
            s_oldChange.set(s_endPos.x - this._tweenStart.x, s_endPos.y - this._tweenStart.y);
            //调整目标位置
            this.loopCheckingTarget(s_endPos);
            if (this._pageMode || this._snapToItem)
                this.alignPosition(s_endPos, true);
            this._tweenChange.x = s_endPos.x - this._tweenStart.x;
            this._tweenChange.y = s_endPos.y - this._tweenStart.y;
            if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
                this.updateScrollBarVisible();
                return;
            }
            //如果目标位置已调整，随之调整需要时间
            if (this._pageMode || this._snapToItem) {
                this.fixDuration("x", s_oldChange.x);
                this.fixDuration("y", s_oldChange.y);
            }
        }
        this.startTween(2);
    }
    __mouseWheel(evt) {
        if (!this._mouseWheelEnabled)
            return;
        var delta = evt.input.mouseWheelDelta / window.devicePixelRatio;
        if (this._snapToItem && Math.abs(delta) < 1)
            delta = Math.sign(delta);
        if (this._overlapSize.x > 0 && this._overlapSize.y == 0) {
            let step = this._pageMode ? this._pageSize.x : this._scrollStep;
            this.setPosX(this._xPos + step * delta, false);
        }
        else {
            let step = this._pageMode ? this._pageSize.y : this._scrollStep;
            this.setPosY(this._yPos + step * delta, false);
        }
    }
    updateScrollBarPos() {
        if (this._vtScrollBar)
            this._vtScrollBar.setScrollPerc(this._overlapSize.y == 0 ? 0 : clamp(-this._container.y, 0, this._overlapSize.y) / this._overlapSize.y);
        if (this._hzScrollBar)
            this._hzScrollBar.setScrollPerc(this._overlapSize.x == 0 ? 0 : clamp(-this._container.x, 0, this._overlapSize.x) / this._overlapSize.x);
        this.checkRefreshBar();
    }
    updateScrollBarVisible() {
        if (this._vtScrollBar) {
            if (this._viewSize.y <= this._vtScrollBar.minSize || this._vScrollNone)
                this._vtScrollBar.displayObject.visible = false;
            else
                this.updateScrollBarVisible2(this._vtScrollBar);
        }
        if (this._hzScrollBar) {
            if (this._viewSize.x <= this._hzScrollBar.minSize || this._hScrollNone)
                this._hzScrollBar.displayObject.visible = false;
            else
                this.updateScrollBarVisible2(this._hzScrollBar);
        }
    }
    updateScrollBarVisible2(bar) {
        if (this._scrollBarDisplayAuto)
            GTween.kill(bar, false, "alpha");
        if (this._scrollBarDisplayAuto && this._tweening == 0 && !this._dragged && !bar.gripDragging) {
            if (bar.displayObject.visible)
                GTween.to(1, 0, 0.5).setDelay(0.5).onComplete(this.__barTweenComplete, this).setTarget(bar, "alpha");
        }
        else {
            bar.alpha = 1;
            bar.displayObject.visible = true;
        }
    }
    __barTweenComplete(tweener) {
        var bar = (tweener.target);
        bar.alpha = 1;
        bar.displayObject.visible = false;
    }
    getLoopPartSize(division, axis) {
        return (this._contentSize[axis] + (axis == "x" ? (this._owner).columnGap : (this._owner).lineGap)) / division;
    }
    loopCheckingCurrent() {
        var changed = false;
        if (this._loop == 1 && this._overlapSize.x > 0) {
            if (this._xPos < 0.001) {
                this._xPos += this.getLoopPartSize(2, "x");
                changed = true;
            }
            else if (this._xPos >= this._overlapSize.x) {
                this._xPos -= this.getLoopPartSize(2, "x");
                changed = true;
            }
        }
        else if (this._loop == 2 && this._overlapSize.y > 0) {
            if (this._yPos < 0.001) {
                this._yPos += this.getLoopPartSize(2, "y");
                changed = true;
            }
            else if (this._yPos >= this._overlapSize.y) {
                this._yPos -= this.getLoopPartSize(2, "y");
                changed = true;
            }
        }
        if (changed)
            this._container.setPosition(Math.floor(-this._xPos), Math.floor(-this._yPos));
        return changed;
    }
    loopCheckingTarget(endPos) {
        if (this._loop == 1)
            this.loopCheckingTarget2(endPos, "x");
        if (this._loop == 2)
            this.loopCheckingTarget2(endPos, "y");
    }
    loopCheckingTarget2(endPos, axis) {
        var halfSize;
        var tmp;
        if (endPos[axis] > 0) {
            halfSize = this.getLoopPartSize(2, axis);
            tmp = this._tweenStart[axis] - halfSize;
            if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
                endPos[axis] -= halfSize;
                this._tweenStart[axis] = tmp;
            }
        }
        else if (endPos[axis] < -this._overlapSize[axis]) {
            halfSize = this.getLoopPartSize(2, axis);
            tmp = this._tweenStart[axis] + halfSize;
            if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
                endPos[axis] += halfSize;
                this._tweenStart[axis] = tmp;
            }
        }
    }
    loopCheckingNewPos(value, axis) {
        if (this._overlapSize[axis] == 0)
            return value;
        var pos = axis == "x" ? this._xPos : this._yPos;
        var changed = false;
        var v;
        if (value < 0.001) {
            value += this.getLoopPartSize(2, axis);
            if (value > pos) {
                v = this.getLoopPartSize(6, axis);
                v = Math.ceil((value - pos) / v) * v;
                pos = clamp(pos + v, 0, this._overlapSize[axis]);
                changed = true;
            }
        }
        else if (value >= this._overlapSize[axis]) {
            value -= this.getLoopPartSize(2, axis);
            if (value < pos) {
                v = this.getLoopPartSize(6, axis);
                v = Math.ceil((pos - value) / v) * v;
                pos = clamp(pos - v, 0, this._overlapSize[axis]);
                changed = true;
            }
        }
        if (changed) {
            if (axis == "x")
                this._container.x = -Math.floor(pos);
            else
                this._container.y = -Math.floor(pos);
        }
        return value;
    }
    alignPosition(pos, inertialScrolling) {
        if (this._pageMode) {
            pos.x = this.alignByPage(pos.x, "x", inertialScrolling);
            pos.y = this.alignByPage(pos.y, "y", inertialScrolling);
        }
        else if (this._snapToItem) {
            var xDir = 0;
            var yDir = 0;
            if (inertialScrolling) {
                xDir = pos.x - this._containerPos.x;
                yDir = pos.y - this._containerPos.y;
            }
            var pt = this._owner.getSnappingPositionWithDir(-pos.x, -pos.y, xDir, yDir, s_vec2$2);
            if (pos.x < 0 && pos.x > -this._overlapSize.x)
                pos.x = -pt.x;
            if (pos.y < 0 && pos.y > -this._overlapSize.y)
                pos.y = -pt.y;
        }
    }
    alignByPage(pos, axis, inertialScrolling) {
        var page;
        if (pos > 0)
            page = 0;
        else if (pos < -this._overlapSize[axis])
            page = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;
        else {
            page = Math.floor(-pos / this._pageSize[axis]);
            var change = inertialScrolling ? (pos - this._containerPos[axis]) : (pos - this._container[axis]);
            var testPageSize = Math.min(this._pageSize[axis], this._contentSize[axis] - (page + 1) * this._pageSize[axis]);
            var delta = -pos - page * this._pageSize[axis];
            //页面吸附策略
            if (Math.abs(change) > this._pageSize[axis]) //如果滚动距离超过1页,则需要超过页面的一半，才能到更下一页
             {
                if (delta > testPageSize * 0.5)
                    page++;
            }
            else //否则只需要页面的1/3，当然，需要考虑到左移和右移的情况
             {
                if (delta > testPageSize * (change < 0 ? UIConfig.defaultScrollPagingThreshold : (1 - UIConfig.defaultScrollPagingThreshold)))
                    page++;
            }
            //重新计算终点
            pos = -page * this._pageSize[axis];
            if (pos < -this._overlapSize[axis]) //最后一页未必有pageSize那么大
                pos = -this._overlapSize[axis];
        }
        //惯性滚动模式下，会增加判断尽量不要滚动超过一页
        if (inertialScrolling) {
            var oldPos = this._tweenStart[axis];
            var oldPage;
            if (oldPos > 0)
                oldPage = 0;
            else if (oldPos < -this._overlapSize[axis])
                oldPage = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;
            else
                oldPage = Math.floor(-oldPos / this._pageSize[axis]);
            var startPage = Math.floor(-this._containerPos[axis] / this._pageSize[axis]);
            if (Math.abs(page - startPage) > 1 && Math.abs(oldPage - startPage) <= 1) {
                if (page > startPage)
                    page = startPage + 1;
                else
                    page = startPage - 1;
                pos = -page * this._pageSize[axis];
            }
        }
        return pos;
    }
    updateTargetAndDuration(orignPos, resultPos) {
        resultPos.x = this.updateTargetAndDuration2(orignPos.x, "x");
        resultPos.y = this.updateTargetAndDuration2(orignPos.y, "y");
    }
    updateTargetAndDuration2(pos, axis) {
        var v = this._velocity[axis];
        var duration = 0;
        if (pos > 0)
            pos = 0;
        else if (pos < -this._overlapSize[axis])
            pos = -this._overlapSize[axis];
        else {
            //以屏幕像素为基准
            var v2 = Math.abs(v) * this._velocityScale;
            //在移动设备上，需要对不同分辨率做一个适配，我们的速度判断以1136分辨率为基准
            if (Stage.touchScreen)
                v2 *= 1136 / Math.max(window.screen.width, window.screen.height);
            //这里有一些阈值的处理，因为在低速内，不希望产生较大的滚动（甚至不滚动）
            var ratio = 0;
            if (this._pageMode || !Stage.touchScreen) {
                if (v2 > 500)
                    ratio = Math.pow((v2 - 500) / 500, 2);
            }
            else {
                if (v2 > 1000)
                    ratio = Math.pow((v2 - 1000) / 1000, 2);
            }
            if (ratio != 0) {
                if (ratio > 1)
                    ratio = 1;
                v2 *= ratio;
                v *= ratio;
                this._velocity[axis] = v;
                //算法：v*（_decelerationRate的n次幂）= 60，即在n帧后速度降为60（假设每秒60帧）。
                duration = Math.log(60 / v2) / Math.log(this._decelerationRate) / 60;
                //计算距离要使用本地速度
                //理论公式貌似滚动的距离不够，改为经验公式
                //var change:number = (v/ 60 - 1) / (1 - this._decelerationRate);
                var change = Math.floor(v * duration * 0.4);
                pos += change;
            }
        }
        if (duration < TWEEN_TIME_DEFAULT)
            duration = TWEEN_TIME_DEFAULT;
        this._tweenDuration[axis] = duration;
        return pos;
    }
    fixDuration(axis, oldChange) {
        if (this._tweenChange[axis] == 0 || Math.abs(this._tweenChange[axis]) >= Math.abs(oldChange))
            return;
        var newDuration = Math.abs(this._tweenChange[axis] / oldChange) * this._tweenDuration[axis];
        if (newDuration < TWEEN_TIME_DEFAULT)
            newDuration = TWEEN_TIME_DEFAULT;
        this._tweenDuration[axis] = newDuration;
    }
    startTween(type) {
        this._tweenTime.set(0, 0);
        this._tweening = type;
        Timers.addUpdate(this.tweenUpdate, this);
        this.updateScrollBarVisible();
    }
    killTween() {
        if (this._tweening == 1) //取消类型为1的tween需立刻设置到终点
         {
            this._container.setPosition(this._tweenStart.x + this._tweenChange.x, this._tweenStart.y + this._tweenChange.y);
            this._owner.dispatchEvent("scroll");
        }
        this._tweening = 0;
        Timers.remove(this.tweenUpdate, this);
        this.updateScrollBarVisible();
        this._owner.dispatchEvent("scroll_end");
    }
    checkRefreshBar() {
        if (this._header == null && this._footer == null)
            return;
        var pos = this._container[this._refreshBarAxis];
        if (this._header) {
            if (pos > 0) {
                if (this._header.displayObject.parent == null)
                    this._maskContainer.addChildAt(this._header.displayObject, 0);
                var pt = s_vec2$2;
                pt.set(this._header.width, this._header.height);
                pt[this._refreshBarAxis] = pos;
                this._header.setSize(pt.x, pt.y);
            }
            else {
                if (this._header.displayObject.parent)
                    this._maskContainer.removeChild(this._header.displayObject);
            }
        }
        if (this._footer) {
            var max = this._overlapSize[this._refreshBarAxis];
            if (pos < -max || max == 0 && this._footerLockedSize > 0) {
                if (this._footer.displayObject.parent == null)
                    this._maskContainer.addChildAt(this._footer.displayObject, 0);
                pt = s_vec2$2;
                pt.set(this._footer.x, this._footer.y);
                if (max > 0)
                    pt[this._refreshBarAxis] = pos + this._contentSize[this._refreshBarAxis];
                else
                    pt[this._refreshBarAxis] = Math.max(Math.min(pos + this._viewSize[this._refreshBarAxis], this._viewSize[this._refreshBarAxis] - this._footerLockedSize), this._viewSize[this._refreshBarAxis] - this._contentSize[this._refreshBarAxis]);
                this._footer.setPosition(pt.x, pt.y);
                pt.set(this._footer.width, this._footer.height);
                if (max > 0)
                    pt[this._refreshBarAxis] = -max - pos;
                else
                    pt[this._refreshBarAxis] = this._viewSize[this._refreshBarAxis] - this._footer[this._refreshBarAxis];
                this._footer.setSize(pt.x, pt.y);
            }
            else {
                if (this._footer.displayObject.parent)
                    this._maskContainer.removeChild(this._footer.displayObject);
            }
        }
    }
    tweenUpdate() {
        var nx = this.runTween("x");
        var ny = this.runTween("y");
        this._container.setPosition(nx, ny);
        if (this._tweening == 2) {
            if (this._overlapSize.x > 0)
                this._xPos = clamp(-nx, 0, this._overlapSize.x);
            if (this._overlapSize.y > 0)
                this._yPos = clamp(-ny, 0, this._overlapSize.y);
            if (this._pageMode)
                this.updatePageController();
        }
        if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
            this._tweening = 0;
            Timers.remove(this.tweenUpdate, this);
            this.loopCheckingCurrent();
            this.updateScrollBarPos();
            this.updateScrollBarVisible();
            this._owner.dispatchEvent("scroll");
            this._owner.dispatchEvent("scroll_end");
        }
        else {
            this.updateScrollBarPos();
            this._owner.dispatchEvent("scroll");
        }
    }
    runTween(axis) {
        var newValue;
        if (this._tweenChange[axis] != 0) {
            this._tweenTime[axis] += Timers.deltaTime / 1000;
            if (this._tweenTime[axis] >= this._tweenDuration[axis]) {
                newValue = this._tweenStart[axis] + this._tweenChange[axis];
                this._tweenChange[axis] = 0;
            }
            else {
                var ratio = easeFunc(this._tweenTime[axis], this._tweenDuration[axis]);
                newValue = this._tweenStart[axis] + Math.floor(this._tweenChange[axis] * ratio);
            }
            var threshold1 = 0;
            var threshold2 = -this._overlapSize[axis];
            if (this._headerLockedSize > 0 && this._refreshBarAxis == axis)
                threshold1 = this._headerLockedSize;
            if (this._footerLockedSize > 0 && this._refreshBarAxis == axis) {
                var max = this._overlapSize[this._refreshBarAxis];
                if (max == 0)
                    max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
                else
                    max += this._footerLockedSize;
                threshold2 = -max;
            }
            if (this._tweening == 2 && this._bouncebackEffect) {
                if (newValue > 20 + threshold1 && this._tweenChange[axis] > 0
                    || newValue > threshold1 && this._tweenChange[axis] == 0) //开始回弹
                 {
                    this._tweenTime[axis] = 0;
                    this._tweenDuration[axis] = TWEEN_TIME_DEFAULT;
                    this._tweenChange[axis] = -newValue + threshold1;
                    this._tweenStart[axis] = newValue;
                }
                else if (newValue < threshold2 - 20 && this._tweenChange[axis] < 0
                    || newValue < threshold2 && this._tweenChange[axis] == 0) //开始回弹
                 {
                    this._tweenTime[axis] = 0;
                    this._tweenDuration[axis] = TWEEN_TIME_DEFAULT;
                    this._tweenChange[axis] = threshold2 - newValue;
                    this._tweenStart[axis] = newValue;
                }
            }
            else {
                if (newValue > threshold1) {
                    newValue = threshold1;
                    this._tweenChange[axis] = 0;
                }
                else if (newValue < threshold2) {
                    newValue = threshold2;
                    this._tweenChange[axis] = 0;
                }
            }
        }
        else
            newValue = this._container[axis];
        return newValue;
    }
}
function easeFunc(t, d) {
    return (t = t / d - 1) * t * t + 1; //cubicOut
}

var CurveType;
(function (CurveType) {
    CurveType[CurveType["CRSpline"] = 0] = "CRSpline";
    CurveType[CurveType["Bezier"] = 1] = "Bezier";
    CurveType[CurveType["CubicBezier"] = 2] = "CubicBezier";
    CurveType[CurveType["Straight"] = 3] = "Straight";
})(CurveType || (CurveType = {}));
class GPathPoint {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.control1_x = 0;
        this.control1_y = 0;
        this.control2_x = 0;
        this.control2_y = 0;
        this.curveType = 0;
    }
    static newPoint(x, y, curveType) {
        var pt = new GPathPoint();
        pt.x = x || 0;
        pt.y = y || 0;
        pt.control1_x = 0;
        pt.control1_y = 0;
        pt.control2_x = 0;
        pt.control2_y = 0;
        pt.curveType = curveType || CurveType.CRSpline;
        return pt;
    }
    static newBezierPoint(x, y, control1_x, control1_y) {
        var pt = new GPathPoint();
        pt.x = x || 0;
        pt.y = y || 0;
        pt.control1_x = control1_x || 0;
        pt.control1_y = control1_y || 0;
        pt.control2_x = 0;
        pt.control2_y = 0;
        pt.curveType = CurveType.Bezier;
        return pt;
    }
    static newCubicBezierPoint(x, y, control1_x, control1_y, control2_x, control2_y) {
        var pt = new GPathPoint();
        pt.x = x || 0;
        pt.y = y || 0;
        pt.control1_x = control1_x || 0;
        pt.control1_y = control1_y || 0;
        pt.control2_x = control2_x || 0;
        pt.control2_y = control2_y || 0;
        pt.curveType = CurveType.CubicBezier;
        return pt;
    }
    clone() {
        var ret = new GPathPoint();
        ret.x = this.x;
        ret.y = this.y;
        ret.control1_x = this.control1_x;
        ret.control1_y = this.control1_y;
        ret.control2_x = this.control2_x;
        ret.control2_y = this.control2_y;
        ret.curveType = this.curveType;
        return ret;
    }
}

class GPath {
    constructor() {
        this._segments = new Array();
        this._points = new Array();
    }
    get length() {
        return this._fullLength;
    }
    create2(pt1, pt2, pt3, pt4) {
        var points = new Array();
        points.push(pt1);
        points.push(pt2);
        if (pt3)
            points.push(pt3);
        if (pt4)
            points.push(pt4);
        this.create(points);
    }
    create(points) {
        this._segments.length = 0;
        this._points.length = 0;
        this._fullLength = 0;
        var cnt = points.length;
        if (cnt == 0)
            return;
        var splinePoints = [];
        var prev = points[0];
        if (prev.curveType == CurveType.CRSpline)
            splinePoints.push(new Vector2(prev.x, prev.y));
        for (var i = 1; i < cnt; i++) {
            var current = points[i];
            if (prev.curveType != CurveType.CRSpline) {
                var seg = {};
                seg.type = prev.curveType;
                seg.ptStart = this._points.length;
                if (prev.curveType == CurveType.Straight) {
                    seg.ptCount = 2;
                    this._points.push(new Vector2(prev.x, prev.y));
                    this._points.push(new Vector2(current.x, current.y));
                }
                else if (prev.curveType == CurveType.Bezier) {
                    seg.ptCount = 3;
                    this._points.push(new Vector2(prev.x, prev.y));
                    this._points.push(new Vector2(current.x, current.y));
                    this._points.push(new Vector2(prev.control1_x, prev.control1_y));
                }
                else if (prev.curveType == CurveType.CubicBezier) {
                    seg.ptCount = 4;
                    this._points.push(new Vector2(prev.x, prev.y));
                    this._points.push(new Vector2(current.x, current.y));
                    this._points.push(new Vector2(prev.control1_x, prev.control1_y));
                    this._points.push(new Vector2(prev.control2_x, prev.control2_y));
                }
                seg.length = distance(prev.x, prev.y, current.x, current.y);
                this._fullLength += seg.length;
                this._segments.push(seg);
            }
            if (current.curveType != CurveType.CRSpline) {
                if (splinePoints.length > 0) {
                    splinePoints.push(new Vector2(current.x, current.y));
                    this.createSplineSegment(splinePoints);
                }
            }
            else
                splinePoints.push(new Vector2(current.x, current.y));
            prev = current;
        }
        if (splinePoints.length > 1)
            this.createSplineSegment(splinePoints);
    }
    createSplineSegment(splinePoints) {
        var cnt = splinePoints.length;
        splinePoints.splice(0, 0, splinePoints[0]);
        splinePoints.push(splinePoints[cnt]);
        splinePoints.push(splinePoints[cnt]);
        cnt += 3;
        var seg = {};
        seg.type = CurveType.CRSpline;
        seg.ptStart = this._points.length;
        seg.ptCount = cnt;
        this._points = this._points.concat(splinePoints);
        seg.length = 0;
        for (var i = 1; i < cnt; i++) {
            seg.length += distance(splinePoints[i - 1].x, splinePoints[i - 1].y, splinePoints[i].x, splinePoints[i].y);
        }
        this._fullLength += seg.length;
        this._segments.push(seg);
        splinePoints.length = 0;
    }
    clear() {
        this._segments.length = 0;
        this._points.length = 0;
    }
    getPointAt(t, result) {
        if (!result)
            result = new Vector2();
        else
            result.set(0, 0);
        t = clamp01(t);
        var cnt = this._segments.length;
        if (cnt == 0) {
            return result;
        }
        var seg;
        if (t == 1) {
            seg = this._segments[cnt - 1];
            if (seg.type == CurveType.Straight) {
                result.x = lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t);
                result.y = lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t);
                return result;
            }
            else if (seg.type == CurveType.Bezier || seg.type == CurveType.CubicBezier)
                return this.onBezierCurve(seg.ptStart, seg.ptCount, t, result);
            else
                return this.onCRSplineCurve(seg.ptStart, seg.ptCount, t, result);
        }
        var len = t * this._fullLength;
        for (var i = 0; i < cnt; i++) {
            seg = this._segments[i];
            len -= seg.length;
            if (len < 0) {
                t = 1 + len / seg.length;
                if (seg.type == CurveType.Straight) {
                    result.x = lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t);
                    result.y = lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t);
                }
                else if (seg.type == CurveType.Bezier || seg.type == CurveType.CubicBezier)
                    result = this.onBezierCurve(seg.ptStart, seg.ptCount, t, result);
                else
                    result = this.onCRSplineCurve(seg.ptStart, seg.ptCount, t, result);
                break;
            }
        }
        return result;
    }
    get segmentCount() {
        return this._segments.length;
    }
    getAnchorsInSegment(segmentIndex, points) {
        if (points == null)
            points = new Array();
        var seg = this._segments[segmentIndex];
        for (var i = 0; i < seg.ptCount; i++)
            points.push(new Vector2(this._points[seg.ptStart + i].x, this._points[seg.ptStart + i].y));
        return points;
    }
    getPointsInSegment(segmentIndex, t0, t1, points, ts, pointDensity) {
        if (points == null)
            points = new Array();
        if (!pointDensity || isNaN(pointDensity))
            pointDensity = 0.1;
        if (ts)
            ts.push(t0);
        var seg = this._segments[segmentIndex];
        if (seg.type == CurveType.Straight) {
            points.push(new Vector2(lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t0), lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t0)));
            points.push(new Vector2(lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t1), lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t1)));
        }
        else {
            var func;
            if (seg.type == CurveType.Bezier || seg.type == CurveType.CubicBezier)
                func = this.onBezierCurve;
            else
                func = this.onCRSplineCurve;
            points.push(func.call(this, seg.ptStart, seg.ptCount, t0, new Vector2()));
            var SmoothAmount = Math.min(seg.length * pointDensity, 50);
            for (var j = 0; j <= SmoothAmount; j++) {
                var t = j / SmoothAmount;
                if (t > t0 && t < t1) {
                    points.push(func.call(this, seg.ptStart, seg.ptCount, t, new Vector2()));
                    if (ts)
                        ts.push(t);
                }
            }
            points.push(func.call(this, seg.ptStart, seg.ptCount, t1, new Vector2()));
        }
        if (ts)
            ts.push(t1);
        return points;
    }
    getAllPoints(points, ts, pointDensity) {
        if (points == null)
            points = new Array();
        if (!pointDensity || isNaN(pointDensity))
            pointDensity = 0.1;
        var cnt = this._segments.length;
        for (var i = 0; i < cnt; i++)
            this.getPointsInSegment(i, 0, 1, points, ts, pointDensity);
        return points;
    }
    onCRSplineCurve(ptStart, ptCount, t, result) {
        var adjustedIndex = Math.floor(t * (ptCount - 4)) + ptStart; //Since the equation works with 4 points, we adjust the starting point depending on t to return a point on the specific segment
        var p0x = this._points[adjustedIndex].x;
        var p0y = this._points[adjustedIndex].y;
        var p1x = this._points[adjustedIndex + 1].x;
        var p1y = this._points[adjustedIndex + 1].y;
        var p2x = this._points[adjustedIndex + 2].x;
        var p2y = this._points[adjustedIndex + 2].y;
        var p3x = this._points[adjustedIndex + 3].x;
        var p3y = this._points[adjustedIndex + 3].y;
        var adjustedT = (t == 1) ? 1 : repeat(t * (ptCount - 4), 1); // Then we adjust t to be that value on that new piece of segment... for t == 1f don't use repeat (that would return 0f);
        var t0 = ((-adjustedT + 2) * adjustedT - 1) * adjustedT * 0.5;
        var t1 = (((3 * adjustedT - 5) * adjustedT) * adjustedT + 2) * 0.5;
        var t2 = ((-3 * adjustedT + 4) * adjustedT + 1) * adjustedT * 0.5;
        var t3 = ((adjustedT - 1) * adjustedT * adjustedT) * 0.5;
        result.x = p0x * t0 + p1x * t1 + p2x * t2 + p3x * t3;
        result.y = p0y * t0 + p1y * t1 + p2y * t2 + p3y * t3;
        return result;
    }
    onBezierCurve(ptStart, ptCount, t, result) {
        var t2 = 1 - t;
        var p0x = this._points[ptStart].x;
        var p0y = this._points[ptStart].y;
        var p1x = this._points[ptStart + 1].x;
        var p1y = this._points[ptStart + 1].y;
        var cp0x = this._points[ptStart + 2].x;
        var cp0y = this._points[ptStart + 2].y;
        if (ptCount == 4) {
            var cp1x = this._points[ptStart + 3].x;
            var cp1y = this._points[ptStart + 3].y;
            result.x = t2 * t2 * t2 * p0x + 3 * t2 * t2 * t * cp0x + 3 * t2 * t * t * cp1x + t * t * t * p1x;
            result.y = t2 * t2 * t2 * p0y + 3 * t2 * t2 * t * cp0y + 3 * t2 * t * t * cp1y + t * t * t * p1y;
        }
        else {
            result.x = t2 * t2 * p0x + 2 * t2 * t * cp0x + t * t * p1x;
            result.y = t2 * t2 * p0y + 2 * t2 * t * cp0y + t * t * p1y;
        }
        return result;
    }
}

const OPTION_IGNORE_DISPLAY_CONTROLLER = 1;
const OPTION_AUTO_STOP_DISABLED = 2;
const OPTION_AUTO_STOP_AT_END = 4;
class Transition {
    constructor(owner) {
        this._owner = owner;
        this._items = new Array();
        this._totalDuration = 0;
        this._autoPlayTimes = 1;
        this._autoPlayDelay = 0;
        this._timeScale = 1;
        this._startTime = 0;
        this._endTime = 0;
    }
    play(onComplete, times, delay, startTime, endTime) {
        this._play(onComplete, times, delay, startTime, endTime, false);
    }
    playReverse(onComplete, times, delay, startTime, endTime) {
        this._play(onComplete, times, delay, startTime, endTime, true);
    }
    changePlayTimes(value) {
        this._totalTimes = value;
    }
    setAutoPlay(value, times, delay) {
        if (this._autoPlay != value) {
            this._autoPlay = value;
            this._autoPlayTimes = times || 1;
            this._autoPlayDelay = delay || 0;
            if (this._autoPlay) {
                if (this._owner.onStage)
                    this.play(null, null, this._autoPlayTimes, this._autoPlayDelay);
            }
            else {
                if (!this._owner.onStage)
                    this.stop(false, true);
            }
        }
    }
    _play(onComplete, times, delay, startTime, endTime, reversed) {
        this.stop(true, true);
        delay = delay || 0;
        this._totalTimes = times || 1;
        this._reversed = reversed;
        this._startTime = startTime || 0;
        this._endTime = endTime || -1;
        this._playing = true;
        this._paused = false;
        this._onComplete = onComplete;
        var cnt = this._items.length;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.target == null) {
                if (item.targetId)
                    item.target = this._owner.getChildById(item.targetId);
                else
                    item.target = this._owner;
            }
            else if (item.target != this._owner && item.target.parent != this._owner)
                item.target = null;
            if (item.target && item.type == ActionType.Transition) {
                var trans = item.target.getTransition(item.value.transName);
                if (trans == this)
                    trans = null;
                if (trans) {
                    if (item.value.playTimes == 0) //this.stop
                     {
                        var j;
                        for (j = i - 1; j >= 0; j--) {
                            var item2 = this._items[j];
                            if (item2.type == ActionType.Transition) {
                                if (item2.value.trans == trans) {
                                    item2.value.stopTime = item.time - item2.time;
                                    break;
                                }
                            }
                        }
                        if (j < 0)
                            item.value.stopTime = 0;
                        else
                            trans = null; //no need to handle this.stop anymore
                    }
                    else
                        item.value.stopTime = -1;
                }
                item.value.trans = trans;
            }
        }
        if (delay == 0)
            this.onDelayedPlay();
        else
            GTween.delayedCall(delay).setTarget(this).onComplete(this.onDelayedPlay, this);
    }
    stop(setToComplete, processCallback) {
        if (!this._playing)
            return;
        if (setToComplete == null)
            setToComplete = true;
        this._playing = false;
        this._totalTasks = 0;
        this._totalTimes = 0;
        var handler = this._onComplete;
        this._onComplete = null;
        GTween.kill(this); //delay start
        var cnt = this._items.length;
        if (this._reversed) {
            for (var i = cnt - 1; i >= 0; i--) {
                var item = this._items[i];
                if (item.target == null)
                    continue;
                this.stopItem(item, setToComplete);
            }
        }
        else {
            for (i = 0; i < cnt; i++) {
                item = this._items[i];
                if (item.target == null)
                    continue;
                this.stopItem(item, setToComplete);
            }
        }
        if (processCallback && handler) {
            handler();
        }
    }
    stopItem(item, setToComplete) {
        if (item.displayLockToken != 0) {
            item.target.releaseDisplayLock(item.displayLockToken);
            item.displayLockToken = 0;
        }
        if (item.tweener) {
            item.tweener.kill(setToComplete);
            item.tweener = null;
            if (item.type == ActionType.Shake && !setToComplete) //震动必须归位，否则下次就越震越远了。
             {
                item.target._gearLocked = true;
                item.target.setPosition(item.target.x - item.value.lastOffsetX, item.target.y - item.value.lastOffsetY);
                item.target._gearLocked = false;
            }
        }
        if (item.type == ActionType.Transition) {
            var trans = item.value.trans;
            if (trans)
                trans.stop(setToComplete, false);
        }
    }
    setPaused(paused) {
        if (!this._playing || this._paused == paused)
            return;
        this._paused = paused;
        var tweener = GTween.getTween(this);
        if (tweener)
            tweener.setPaused(paused);
        var cnt = this._items.length;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.target == null)
                continue;
            if (item.type == ActionType.Transition) {
                if (item.value.trans)
                    item.value.trans.setPaused(paused);
            }
            else if (item.type == ActionType.Animation) {
                if (paused) {
                    item.value.flag = item.target.getProp(ObjectPropID.Playing);
                    item.target.setProp(ObjectPropID.Playing, false);
                }
                else
                    item.target.setProp(ObjectPropID.Playing, item.value.flag);
            }
            if (item.tweener)
                item.tweener.setPaused(paused);
        }
    }
    dispose() {
        if (this._playing)
            GTween.kill(this); //delay start
        var cnt = this._items.length;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.tweener) {
                item.tweener.kill();
                item.tweener = null;
            }
            item.target = null;
            item.hook = null;
            if (item.tweenConfig)
                item.tweenConfig.endHook = null;
        }
        this._items.length = 0;
        this._playing = false;
        this._onComplete = null;
    }
    get playing() {
        return this._playing;
    }
    setValue(label, ...args) {
        var cnt = this._items.length;
        var found = false;
        var value;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.label == label) {
                if (item.tweenConfig)
                    value = item.tweenConfig.startValue;
                else
                    value = item.value;
                found = true;
            }
            else if (item.tweenConfig && item.tweenConfig.endLabel == label) {
                value = item.tweenConfig.endValue;
                found = true;
            }
            else
                continue;
            switch (item.type) {
                case ActionType.XY:
                case ActionType.Size:
                case ActionType.Pivot:
                case ActionType.Scale:
                case ActionType.Skew:
                    value.b1 = true;
                    value.b2 = true;
                    value.f1 = parseFloat(args[0]);
                    value.f2 = parseFloat(args[1]);
                    break;
                case ActionType.Alpha:
                    value.f1 = parseFloat(args[0]);
                    break;
                case ActionType.Rotation:
                    value.f1 = parseFloat(args[0]);
                    break;
                case ActionType.Color:
                    value.f1 = parseFloat(args[0]);
                    break;
                case ActionType.Animation:
                    value.frame = parseInt(args[0]);
                    if (args.length > 1)
                        value.playing = args[1];
                    break;
                case ActionType.Visible:
                    value.visible = args[0];
                    break;
                case ActionType.Sound:
                    value.sound = args[0];
                    if (args.length > 1)
                        value.volume = parseFloat(args[1]);
                    break;
                case ActionType.Transition:
                    value.transName = args[0];
                    if (args.length > 1)
                        value.playTimes = parseInt(args[1]);
                    break;
                case ActionType.Shake:
                    value.amplitude = parseFloat(args[0]);
                    if (args.length > 1)
                        value.duration = parseFloat(args[1]);
                    break;
                case ActionType.ColorFilter:
                    value.f1 = parseFloat(args[0]);
                    value.f2 = parseFloat(args[1]);
                    value.f3 = parseFloat(args[2]);
                    value.f4 = parseFloat(args[3]);
                    break;
                case ActionType.Text:
                case ActionType.Icon:
                    value.text = args[0];
                    break;
            }
        }
        if (!found)
            throw new Error("this.label not exists");
    }
    setHook(label, callback) {
        var cnt = this._items.length;
        var found = false;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.label == label) {
                item.hook = callback;
                found = true;
                break;
            }
            else if (item.tweenConfig && item.tweenConfig.endLabel == label) {
                item.tweenConfig.endHook = callback;
                found = true;
                break;
            }
        }
        if (!found)
            throw new Error("this.label not exists");
    }
    clearHooks() {
        var cnt = this._items.length;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            item.hook = null;
            if (item.tweenConfig)
                item.tweenConfig.endHook = null;
        }
    }
    setTarget(label, newTarget) {
        var cnt = this._items.length;
        var found = false;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.label == label) {
                item.targetId = (newTarget == this._owner || newTarget == null) ? "" : newTarget.id;
                if (this._playing) {
                    if (item.targetId.length > 0)
                        item.target = this._owner.getChildById(item.targetId);
                    else
                        item.target = this._owner;
                }
                else
                    item.target = null;
                found = true;
            }
        }
        if (!found)
            throw new Error("this.label not exists");
    }
    setDuration(label, value) {
        var cnt = this._items.length;
        var found = false;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.tweenConfig && item.label == label) {
                item.tweenConfig.duration = value;
                found = true;
            }
        }
        if (!found)
            throw new Error("this.label not exists");
    }
    getLabelTime(label) {
        var cnt = this._items.length;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.label == label)
                return item.time;
            else if (item.tweenConfig && item.tweenConfig.endLabel == label)
                return item.time + item.tweenConfig.duration;
        }
        return NaN;
    }
    get timeScale() {
        return this._timeScale;
    }
    set timeScale(value) {
        if (this._timeScale != value) {
            this._timeScale = value;
            if (this._playing) {
                var cnt = this._items.length;
                for (var i = 0; i < cnt; i++) {
                    var item = this._items[i];
                    if (item.tweener)
                        item.tweener.setTimeScale(value);
                    else if (item.type == ActionType.Transition) {
                        if (item.value.trans)
                            item.value.trans.timeScale = value;
                    }
                    else if (item.type == ActionType.Animation) {
                        if (item.target)
                            item.target.setProp(ObjectPropID.TimeScale, value);
                    }
                }
            }
        }
    }
    updateFromRelations(targetId, dx, dy) {
        var cnt = this._items.length;
        if (cnt == 0)
            return;
        for (var i = 0; i < cnt; i++) {
            var item = this._items[i];
            if (item.type == ActionType.XY && item.targetId == targetId) {
                if (item.tweenConfig) {
                    if (!item.tweenConfig.startValue.b3) {
                        item.tweenConfig.startValue.f1 += dx;
                        item.tweenConfig.startValue.f2 += dy;
                    }
                    if (!item.tweenConfig.endValue.b3) {
                        item.tweenConfig.endValue.f1 += dx;
                        item.tweenConfig.endValue.f2 += dy;
                    }
                }
                else {
                    if (!item.value.b3) {
                        item.value.f1 += dx;
                        item.value.f2 += dy;
                    }
                }
            }
        }
    }
    onOwnerAddedToStage() {
        if (this._autoPlay && !this._playing)
            this.play(null, this._autoPlayTimes, this._autoPlayDelay);
    }
    onOwnerRemovedFromStage() {
        if ((this._options & OPTION_AUTO_STOP_DISABLED) == 0)
            this.stop((this._options & OPTION_AUTO_STOP_AT_END) != 0 ? true : false, false);
    }
    onDelayedPlay() {
        this.internalPlay();
        this._playing = this._totalTasks > 0;
        if (this._playing) {
            if ((this._options & OPTION_IGNORE_DISPLAY_CONTROLLER) != 0) {
                var cnt = this._items.length;
                for (var i = 0; i < cnt; i++) {
                    var item = this._items[i];
                    if (item.target && item.target != this._owner)
                        item.displayLockToken = item.target.addDisplayLock();
                }
            }
        }
        else if (this._onComplete) {
            var handler = this._onComplete;
            this._onComplete = null;
            handler();
        }
    }
    internalPlay() {
        this._ownerBaseX = this._owner.x;
        this._ownerBaseY = this._owner.y;
        this._totalTasks = 1;
        var cnt = this._items.length;
        var item;
        var needSkipAnimations = false;
        if (!this._reversed) {
            for (var i = 0; i < cnt; i++) {
                item = this._items[i];
                if (item.target == null)
                    continue;
                if (item.type == ActionType.Animation && this._startTime != 0 && item.time <= this._startTime) {
                    needSkipAnimations = true;
                    item.value.flag = false;
                }
                else
                    this.playItem(item);
            }
        }
        else {
            for (i = cnt - 1; i >= 0; i--) {
                item = this._items[i];
                if (item.target == null)
                    continue;
                this.playItem(item);
            }
        }
        if (needSkipAnimations)
            this.skipAnimations();
        this._totalTasks--;
    }
    playItem(item) {
        var time;
        if (item.tweenConfig) {
            if (this._reversed)
                time = (this._totalDuration - item.time - item.tweenConfig.duration);
            else
                time = item.time;
            if (this._endTime == -1 || time <= this._endTime) {
                var startValue;
                var endValue;
                if (this._reversed) {
                    startValue = item.tweenConfig.endValue;
                    endValue = item.tweenConfig.startValue;
                }
                else {
                    startValue = item.tweenConfig.startValue;
                    endValue = item.tweenConfig.endValue;
                }
                item.value.b1 = startValue.b1 || endValue.b1;
                item.value.b2 = startValue.b2 || endValue.b2;
                switch (item.type) {
                    case ActionType.XY:
                    case ActionType.Size:
                    case ActionType.Scale:
                    case ActionType.Skew:
                        item.tweener = GTween.to2(startValue.f1, startValue.f2, endValue.f1, endValue.f2, item.tweenConfig.duration);
                        break;
                    case ActionType.Alpha:
                    case ActionType.Rotation:
                        item.tweener = GTween.to(startValue.f1, endValue.f1, item.tweenConfig.duration);
                        break;
                    case ActionType.Color:
                        item.tweener = GTween.toColor(startValue.f1, endValue.f1, item.tweenConfig.duration);
                        break;
                    case ActionType.ColorFilter:
                        item.tweener = GTween.to4(startValue.f1, startValue.f2, startValue.f3, startValue.f4, endValue.f1, endValue.f2, endValue.f3, endValue.f4, item.tweenConfig.duration);
                        break;
                }
                item.tweener.setDelay(time)
                    .setEase(item.tweenConfig.easeType)
                    .setRepeat(item.tweenConfig.repeat, item.tweenConfig.yoyo)
                    .setTimeScale(this._timeScale)
                    .setTarget(item)
                    .onStart(this.onTweenStart, this)
                    .onUpdate(this.onTweenUpdate, this)
                    .onComplete(this.onTweenComplete, this);
                if (this._endTime >= 0)
                    item.tweener.setBreakpoint(this._endTime - time);
                this._totalTasks++;
            }
        }
        else if (item.type == ActionType.Shake) {
            if (this._reversed)
                time = (this._totalDuration - item.time - item.value.duration);
            else
                time = item.time;
            item.value.offsetX = item.value.offsetY = 0;
            item.value.lastOffsetX = item.value.lastOffsetY = 0;
            item.tweener = GTween.shake(0, 0, item.value.amplitude, item.value.duration)
                .setDelay(time)
                .setTimeScale(this._timeScale)
                .setTarget(item)
                .onUpdate(this.onTweenUpdate, this)
                .onComplete(this.onTweenComplete, this);
            if (this._endTime >= 0)
                item.tweener.setBreakpoint(this._endTime - item.time);
            this._totalTasks++;
        }
        else {
            if (this._reversed)
                time = (this._totalDuration - item.time);
            else
                time = item.time;
            if (time <= this._startTime) {
                this.applyValue(item);
                this.callHook(item, false);
            }
            else if (this._endTime == -1 || time <= this._endTime) {
                this._totalTasks++;
                item.tweener = GTween.delayedCall(time)
                    .setTimeScale(this._timeScale)
                    .setTarget(item)
                    .onComplete(this.onDelayedPlayItem, this);
            }
        }
        if (item.tweener)
            item.tweener.seek(this._startTime);
    }
    skipAnimations() {
        var frame;
        var playStartTime;
        var playTotalTime;
        var value;
        var target;
        var item;
        var cnt = this._items.length;
        for (var i = 0; i < cnt; i++) {
            item = this._items[i];
            if (item.type != ActionType.Animation || item.time > this._startTime)
                continue;
            value = item.value;
            if (value.flag)
                continue;
            target = item.target;
            frame = target.getProp(ObjectPropID.Frame);
            playStartTime = target.getProp(ObjectPropID.Playing) ? 0 : -1;
            playTotalTime = 0;
            for (var j = i; j < cnt; j++) {
                item = this._items[j];
                if (item.type != ActionType.Animation || item.target != target || item.time > this._startTime)
                    continue;
                value = item.value;
                value.flag = true;
                if (value.frame != -1) {
                    frame = value.frame;
                    if (value.playing)
                        playStartTime = item.time;
                    else
                        playStartTime = -1;
                    playTotalTime = 0;
                }
                else {
                    if (value.playing) {
                        if (playStartTime < 0)
                            playStartTime = item.time;
                    }
                    else {
                        if (playStartTime >= 0)
                            playTotalTime += (item.time - playStartTime);
                        playStartTime = -1;
                    }
                }
                this.callHook(item, false);
            }
            if (playStartTime >= 0)
                playTotalTime += (this._startTime - playStartTime);
            target.setProp(ObjectPropID.Playing, playStartTime >= 0);
            target.setProp(ObjectPropID.Frame, frame);
            if (playTotalTime > 0)
                target.setProp(ObjectPropID.DeltaTime, playTotalTime * 1000);
        }
    }
    onDelayedPlayItem(tweener) {
        var item = tweener.target;
        item.tweener = null;
        this._totalTasks--;
        this.applyValue(item);
        this.callHook(item, false);
        this.checkAllComplete();
    }
    onTweenStart(tweener) {
        var item = tweener.target;
        if (item.type == ActionType.XY || item.type == ActionType.Size) //位置和大小要到start才最终确认起始值
         {
            var startValue;
            var endValue;
            if (this._reversed) {
                startValue = item.tweenConfig.endValue;
                endValue = item.tweenConfig.startValue;
            }
            else {
                startValue = item.tweenConfig.startValue;
                endValue = item.tweenConfig.endValue;
            }
            if (item.type == ActionType.XY) {
                if (item.target != this._owner) {
                    if (!startValue.b1)
                        tweener.startValue.x = item.target.x;
                    else if (startValue.b3) //percent
                        tweener.startValue.x = startValue.f1 * this._owner.width;
                    if (!startValue.b2)
                        tweener.startValue.y = item.target.y;
                    else if (startValue.b3) //percent
                        tweener.startValue.y = startValue.f2 * this._owner.height;
                    if (!endValue.b1)
                        tweener.endValue.x = tweener.startValue.x;
                    else if (endValue.b3)
                        tweener.endValue.x = endValue.f1 * this._owner.width;
                    if (!endValue.b2)
                        tweener.endValue.y = tweener.startValue.y;
                    else if (endValue.b3)
                        tweener.endValue.y = endValue.f2 * this._owner.height;
                }
                else {
                    if (!startValue.b1)
                        tweener.startValue.x = item.target.x - this._ownerBaseX;
                    if (!startValue.b2)
                        tweener.startValue.y = item.target.y - this._ownerBaseY;
                    if (!endValue.b1)
                        tweener.endValue.x = tweener.startValue.x;
                    if (!endValue.b2)
                        tweener.endValue.y = tweener.startValue.y;
                }
            }
            else {
                if (!startValue.b1)
                    tweener.startValue.x = item.target.width;
                if (!startValue.b2)
                    tweener.startValue.y = item.target.height;
                if (!endValue.b1)
                    tweener.endValue.x = tweener.startValue.x;
                if (!endValue.b2)
                    tweener.endValue.y = tweener.startValue.y;
            }
            if (item.tweenConfig.path) {
                item.value.b1 = item.value.b2 = true;
                tweener.setPath(item.tweenConfig.path);
            }
        }
        this.callHook(item, false);
    }
    onTweenUpdate(tweener) {
        var item = tweener.target;
        switch (item.type) {
            case ActionType.XY:
            case ActionType.Size:
            case ActionType.Scale:
            case ActionType.Skew:
                item.value.f1 = tweener.value.x;
                item.value.f2 = tweener.value.y;
                if (item.tweenConfig.path) {
                    item.value.f1 += tweener.startValue.x;
                    item.value.f2 += tweener.startValue.y;
                }
                break;
            case ActionType.Alpha:
            case ActionType.Rotation:
                item.value.f1 = tweener.value.x;
                break;
            case ActionType.Color:
                item.value.f1 = tweener.value.color;
                break;
            case ActionType.ColorFilter:
                item.value.f1 = tweener.value.x;
                item.value.f2 = tweener.value.y;
                item.value.f3 = tweener.value.z;
                item.value.f4 = tweener.value.w;
                break;
            case ActionType.Shake:
                item.value.offsetX = tweener.deltaValue.x;
                item.value.offsetY = tweener.deltaValue.y;
                break;
        }
        this.applyValue(item);
    }
    onTweenComplete(tweener) {
        var item = tweener.target;
        item.tweener = null;
        this._totalTasks--;
        if (tweener.allCompleted) //当整体播放结束时间在这个tween的中间时不应该调用结尾钩子
            this.callHook(item, true);
        this.checkAllComplete();
    }
    onPlayTransCompleted(item) {
        this._totalTasks--;
        this.checkAllComplete();
    }
    callHook(item, tweenEnd) {
        if (tweenEnd) {
            if (item.tweenConfig && item.tweenConfig.endHook)
                item.tweenConfig.endHook();
        }
        else {
            if (item.time >= this._startTime && item.hook)
                item.hook();
        }
    }
    checkAllComplete() {
        if (this._playing && this._totalTasks == 0) {
            if (this._totalTimes < 0) {
                this.internalPlay();
                if (this._totalTasks == 0)
                    GTween.delayedCall(0).setTarget(this).onComplete(this.checkAllComplete, this);
            }
            else {
                this._totalTimes--;
                if (this._totalTimes > 0) {
                    this.internalPlay();
                    if (this._totalTasks == 0)
                        GTween.delayedCall(0).setTarget(this).onComplete(this.checkAllComplete, this);
                }
                else {
                    this._playing = false;
                    var cnt = this._items.length;
                    for (var i = 0; i < cnt; i++) {
                        var item = this._items[i];
                        if (item.target && item.displayLockToken != 0) {
                            item.target.releaseDisplayLock(item.displayLockToken);
                            item.displayLockToken = 0;
                        }
                    }
                    if (this._onComplete) {
                        var handler = this._onComplete;
                        this._onComplete = null;
                        handler();
                    }
                }
            }
        }
    }
    applyValue(item) {
        item.target._gearLocked = true;
        var value = item.value;
        switch (item.type) {
            case ActionType.XY:
                if (item.target == this._owner) {
                    if (value.b1 && value.b2)
                        item.target.setPosition(value.f1 + this._ownerBaseX, value.f2 + this._ownerBaseY);
                    else if (value.b1)
                        item.target.x = value.f1 + this._ownerBaseX;
                    else
                        item.target.y = value.f2 + this._ownerBaseY;
                }
                else {
                    if (value.b3) //position in percent
                     {
                        if (value.b1 && value.b2)
                            item.target.setPosition(value.f1 * this._owner.width, value.f2 * this._owner.height);
                        else if (value.b1)
                            item.target.x = value.f1 * this._owner.width;
                        else if (value.b2)
                            item.target.y = value.f2 * this._owner.height;
                    }
                    else {
                        if (value.b1 && value.b2)
                            item.target.setPosition(value.f1, value.f2);
                        else if (value.b1)
                            item.target.x = value.f1;
                        else if (value.b2)
                            item.target.y = value.f2;
                    }
                }
                break;
            case ActionType.Size:
                if (!value.b1)
                    value.f1 = item.target.width;
                if (!value.b2)
                    value.f2 = item.target.height;
                item.target.setSize(value.f1, value.f2);
                break;
            case ActionType.Pivot:
                item.target.setPivot(value.f1, value.f2, item.target.pivotAsAnchor);
                break;
            case ActionType.Alpha:
                item.target.alpha = value.f1;
                break;
            case ActionType.Rotation:
                item.target.rotation = value.f1;
                break;
            case ActionType.Scale:
                item.target.setScale(value.f1, value.f2);
                break;
            case ActionType.Skew:
                item.target.setSkew(value.f1, value.f2);
                break;
            case ActionType.Color:
                item.target.setProp(ObjectPropID.Color, value.f1);
                break;
            case ActionType.Animation:
                if (value.frame >= 0)
                    item.target.setProp(ObjectPropID.Frame, value.frame);
                item.target.setProp(ObjectPropID.Playing, value.playing);
                item.target.setProp(ObjectPropID.TimeScale, this._timeScale);
                break;
            case ActionType.Visible:
                item.target.visible = value.visible;
                break;
            case ActionType.Transition:
                if (this._playing) {
                    var trans = value.trans;
                    if (trans) {
                        this._totalTasks++;
                        var startTime = this._startTime > item.time ? (this._startTime - item.time) : 0;
                        var endTime = this._endTime >= 0 ? (this._endTime - item.time) : -1;
                        if (value.stopTime >= 0 && (endTime < 0 || endTime > value.stopTime))
                            endTime = value.stopTime;
                        trans.timeScale = this._timeScale;
                        trans._play(this.onPlayTransCompleted.bind(this, item), value.playTimes, 0, startTime, endTime, this._reversed);
                    }
                }
                break;
            case ActionType.Sound:
                if (this._playing && item.time >= this._startTime) {
                    if (value.audioClip == null) {
                        var pi = UIPackage.getItemByURL(value.sound);
                        if (pi)
                            value.audioClip = pi.file;
                        else
                            value.audioClip = value.sound;
                    }
                    if (value.audioClip)
                        Decls.GRoot.inst.playOneShotSound(value.audioClip, value.volume);
                }
                break;
            case ActionType.Shake:
                item.target.setPosition(item.target.x - value.lastOffsetX + value.offsetX, item.target.y - value.lastOffsetY + value.offsetY);
                value.lastOffsetX = value.offsetX;
                value.lastOffsetY = value.offsetY;
                break;
            case ActionType.ColorFilter:
                {
                    //todo colorFilter item.target.displayObject, [value.f1, value.f2, value.f3, value.f4]);
                    break;
                }
            case ActionType.Text:
                item.target.text = value.text;
                break;
            case ActionType.Icon:
                item.target.icon = value.text;
                break;
        }
        item.target._gearLocked = false;
    }
    setup(buffer) {
        this.name = buffer.readS();
        this._options = buffer.readInt();
        this._autoPlay = buffer.readBool();
        this._autoPlayTimes = buffer.readInt();
        this._autoPlayDelay = buffer.readFloat();
        var cnt = buffer.readShort();
        for (var i = 0; i < cnt; i++) {
            var dataLen = buffer.readShort();
            var curPos = buffer.pos;
            buffer.seek(curPos, 0);
            var item = new Item(buffer.readByte());
            this._items[i] = item;
            item.time = buffer.readFloat();
            var targetId = buffer.readShort();
            if (targetId < 0)
                item.targetId = "";
            else
                item.targetId = this._owner.getChildAt(targetId).id;
            item.label = buffer.readS();
            if (buffer.readBool()) {
                buffer.seek(curPos, 1);
                item.tweenConfig = new TweenConfig();
                item.tweenConfig.duration = buffer.readFloat();
                if (item.time + item.tweenConfig.duration > this._totalDuration)
                    this._totalDuration = item.time + item.tweenConfig.duration;
                item.tweenConfig.easeType = buffer.readByte();
                item.tweenConfig.repeat = buffer.readInt();
                item.tweenConfig.yoyo = buffer.readBool();
                item.tweenConfig.endLabel = buffer.readS();
                buffer.seek(curPos, 2);
                this.decodeValue(item, buffer, item.tweenConfig.startValue);
                buffer.seek(curPos, 3);
                this.decodeValue(item, buffer, item.tweenConfig.endValue);
                if (buffer.version >= 2) {
                    var pathLen = buffer.readInt();
                    if (pathLen > 0) {
                        item.tweenConfig.path = new GPath();
                        var pts = new Array();
                        for (var j = 0; j < pathLen; j++) {
                            var curveType = buffer.readByte();
                            switch (curveType) {
                                case CurveType.Bezier:
                                    pts.push(GPathPoint.newBezierPoint(buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat()));
                                    break;
                                case CurveType.CubicBezier:
                                    pts.push(GPathPoint.newCubicBezierPoint(buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat()));
                                    break;
                                default:
                                    pts.push(GPathPoint.newPoint(buffer.readFloat(), buffer.readFloat(), curveType));
                                    break;
                            }
                        }
                        item.tweenConfig.path.create(pts);
                    }
                }
            }
            else {
                if (item.time > this._totalDuration)
                    this._totalDuration = item.time;
                buffer.seek(curPos, 2);
                this.decodeValue(item, buffer, item.value);
            }
            buffer.pos = curPos + dataLen;
        }
    }
    decodeValue(item, buffer, value) {
        switch (item.type) {
            case ActionType.XY:
            case ActionType.Size:
            case ActionType.Pivot:
            case ActionType.Skew:
                value.b1 = buffer.readBool();
                value.b2 = buffer.readBool();
                value.f1 = buffer.readFloat();
                value.f2 = buffer.readFloat();
                if (buffer.version >= 2 && item.type == ActionType.XY)
                    value.b3 = buffer.readBool(); //percent
                break;
            case ActionType.Alpha:
            case ActionType.Rotation:
                value.b1 = value.b2 = true;
                value.f1 = buffer.readFloat();
                break;
            case ActionType.Scale:
                value.b1 = value.b2 = true;
                value.f1 = buffer.readFloat();
                value.f2 = buffer.readFloat();
                break;
            case ActionType.Color:
                value.b1 = value.b2 = true;
                value.f1 = buffer.readColor();
                break;
            case ActionType.Animation:
                value.playing = buffer.readBool();
                value.frame = buffer.readInt();
                break;
            case ActionType.Visible:
                value.visible = buffer.readBool();
                break;
            case ActionType.Sound:
                value.sound = buffer.readS();
                value.volume = buffer.readFloat();
                break;
            case ActionType.Transition:
                value.transName = buffer.readS();
                value.playTimes = buffer.readInt();
                break;
            case ActionType.Shake:
                value.amplitude = buffer.readFloat();
                value.duration = buffer.readFloat();
                break;
            case ActionType.ColorFilter:
                value.b1 = value.b2 = true;
                value.f1 = buffer.readFloat();
                value.f2 = buffer.readFloat();
                value.f3 = buffer.readFloat();
                value.f4 = buffer.readFloat();
                break;
            case ActionType.Text:
            case ActionType.Icon:
                value.text = buffer.readS();
                break;
        }
    }
}
var ActionType;
(function (ActionType) {
    ActionType[ActionType["XY"] = 0] = "XY";
    ActionType[ActionType["Size"] = 1] = "Size";
    ActionType[ActionType["Scale"] = 2] = "Scale";
    ActionType[ActionType["Pivot"] = 3] = "Pivot";
    ActionType[ActionType["Alpha"] = 4] = "Alpha";
    ActionType[ActionType["Rotation"] = 5] = "Rotation";
    ActionType[ActionType["Color"] = 6] = "Color";
    ActionType[ActionType["Animation"] = 7] = "Animation";
    ActionType[ActionType["Visible"] = 8] = "Visible";
    ActionType[ActionType["Sound"] = 9] = "Sound";
    ActionType[ActionType["Transition"] = 10] = "Transition";
    ActionType[ActionType["Shake"] = 11] = "Shake";
    ActionType[ActionType["ColorFilter"] = 12] = "ColorFilter";
    ActionType[ActionType["Skew"] = 13] = "Skew";
    ActionType[ActionType["Text"] = 14] = "Text";
    ActionType[ActionType["Icon"] = 15] = "Icon";
    ActionType[ActionType["Unknown"] = 16] = "Unknown";
})(ActionType || (ActionType = {}));
class Item {
    constructor(type) {
        this.type = type;
        this.value = {};
        this.displayLockToken = 0;
    }
}
class TweenConfig {
    constructor() {
        this.easeType = EaseType.QuadOut;
        this.startValue = { b1: true, b2: true };
        this.endValue = { b1: true, b2: true };
    }
}

class TranslationHelper {
    constructor() {
    }
    static loadFromXML(source) {
        let strings = {};
        TranslationHelper.strings = strings;
        let arr = source.elements("string");
        arr.forEach(cxml => {
            let key = cxml.getAttrString("name");
            let text = cxml.text;
            let i = key.indexOf("-");
            if (i == -1)
                return;
            let key2 = key.substr(0, i);
            let key3 = key.substr(i + 1);
            let col = strings[key2];
            if (!col) {
                col = {};
                strings[key2] = col;
            }
            col[key3] = text;
        });
    }
    static translateComponent(item) {
        if (TranslationHelper.strings == null)
            return;
        var compStrings = TranslationHelper.strings[item.owner.id + item.id];
        if (!compStrings)
            return;
        var elementId, value;
        var buffer = item.rawData;
        var nextPos;
        var itemCount;
        var i, j, k;
        var dataLen;
        var curPos;
        var valueCnt;
        var page;
        buffer.seek(0, 2);
        var childCount = buffer.readShort();
        for (i = 0; i < childCount; i++) {
            dataLen = buffer.readShort();
            curPos = buffer.pos;
            buffer.seek(curPos, 0);
            var baseType = buffer.readByte();
            var type = baseType;
            buffer.skip(4);
            elementId = buffer.readS();
            if (type == ObjectType.Component) {
                if (buffer.seek(curPos, 6))
                    type = buffer.readByte();
            }
            buffer.seek(curPos, 1);
            if ((value = compStrings[elementId + "-tips"]) != null)
                buffer.writeS(value);
            buffer.seek(curPos, 2);
            var gearCnt = buffer.readShort();
            for (j = 0; j < gearCnt; j++) {
                nextPos = buffer.readShort();
                nextPos += buffer.pos;
                if (buffer.readByte() == 6) //gearText
                 {
                    buffer.skip(2); //controller
                    valueCnt = buffer.readShort();
                    for (k = 0; k < valueCnt; k++) {
                        page = buffer.readS();
                        if (page != null) {
                            if ((value = compStrings[elementId + "-texts_" + k]) != null)
                                buffer.writeS(value);
                            else
                                buffer.skip(2);
                        }
                    }
                    if (buffer.readBool() && (value = compStrings[elementId + "-texts_def"]) != null)
                        buffer.writeS(value);
                }
                buffer.pos = nextPos;
            }
            if (baseType == ObjectType.Component && buffer.version >= 2) {
                buffer.seek(curPos, 4);
                buffer.skip(2); //pageController
                buffer.skip(4 * buffer.readUshort());
                var cpCount = buffer.readUshort();
                for (var k = 0; k < cpCount; k++) {
                    var target = buffer.readS();
                    var propertyId = buffer.readUshort();
                    if (propertyId == 0 && (value = compStrings[elementId + "-cp-" + target]) != null)
                        buffer.writeS(value);
                    else
                        buffer.skip(2);
                }
            }
            switch (type) {
                case ObjectType.Text:
                case ObjectType.RichText:
                case ObjectType.InputText:
                    {
                        if ((value = compStrings[elementId]) != null) {
                            buffer.seek(curPos, 6);
                            buffer.writeS(value);
                        }
                        if ((value = compStrings[elementId + "-prompt"]) != null) {
                            buffer.seek(curPos, 4);
                            buffer.writeS(value);
                        }
                        break;
                    }
                case ObjectType.List:
                case ObjectType.Tree:
                    {
                        buffer.seek(curPos, 8);
                        buffer.skip(2);
                        itemCount = buffer.readUshort();
                        for (j = 0; j < itemCount; j++) {
                            nextPos = buffer.readUshort();
                            nextPos += buffer.pos;
                            buffer.skip(2); //url
                            if (type == ObjectType.Tree)
                                buffer.skip(2);
                            //title
                            if ((value = compStrings[elementId + "-" + j]) != null)
                                buffer.writeS(value);
                            else
                                buffer.skip(2);
                            //selected title
                            if ((value = compStrings[elementId + "-" + j + "-0"]) != null)
                                buffer.writeS(value);
                            else
                                buffer.skip(2);
                            if (buffer.version >= 2) {
                                buffer.skip(6);
                                buffer.skip(buffer.readUshort() * 4); //controllers
                                var cpCount = buffer.readUshort();
                                for (var k = 0; k < cpCount; k++) {
                                    var target = buffer.readS();
                                    var propertyId = buffer.readUshort();
                                    if (propertyId == 0 && (value = compStrings[elementId + "-" + j + "-" + target]) != null)
                                        buffer.writeS(value);
                                    else
                                        buffer.skip(2);
                                }
                            }
                            buffer.pos = nextPos;
                        }
                        break;
                    }
                case ObjectType.Label:
                    {
                        if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                            if ((value = compStrings[elementId]) != null)
                                buffer.writeS(value);
                            else
                                buffer.skip(2);
                            buffer.skip(2);
                            if (buffer.readBool())
                                buffer.skip(4);
                            buffer.skip(4);
                            if (buffer.readBool() && (value = compStrings[elementId + "-prompt"]) != null)
                                buffer.writeS(value);
                        }
                        break;
                    }
                case ObjectType.Button:
                    {
                        if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                            if ((value = compStrings[elementId]) != null)
                                buffer.writeS(value);
                            else
                                buffer.skip(2);
                            if ((value = compStrings[elementId + "-0"]) != null)
                                buffer.writeS(value);
                        }
                        break;
                    }
                case ObjectType.ComboBox:
                    {
                        if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                            itemCount = buffer.readShort();
                            for (j = 0; j < itemCount; j++) {
                                nextPos = buffer.readShort();
                                nextPos += buffer.pos;
                                if ((value = compStrings[elementId + "-" + j]) != null)
                                    buffer.writeS(value);
                                buffer.pos = nextPos;
                            }
                            if ((value = compStrings[elementId]) != null)
                                buffer.writeS(value);
                        }
                        break;
                    }
            }
            buffer.pos = curPos + dataLen;
        }
    }
}

var s_vec2$3 = new Vector2();
class ShapeHitTest {
    constructor(obj) {
        this.shape = obj;
    }
    hitTest(contentRect, x, y) {
        if (!this.shape.graphics)
            return false;
        if (this.shape.parent) {
            let p = this.shape.parent["$owner"];
            if (p) {
                p.transformPoint(x, y, this.shape.obj3D, s_vec2$3);
                x = s_vec2$3.x;
                y = s_vec2$3.y;
            }
        }
        let ht = this.shape.graphics.meshFactory;
        if (!('hitTest' in ht))
            return false;
        return ht.hitTest(contentRect, x, y);
    }
}

class GComponent extends GObject {
    constructor() {
        super();
        this._sortingChildCount = 0;
        this._children = [];
        this._controllers = [];
        this._transitions = [];
        this._margin = new Margin();
        this._alignOffset = new Vector2();
        this._childrenRenderOrder = 0;
        this._apexIndex = 0;
    }
    createDisplayObject() {
        this._container = new DisplayObject();
        this._displayObject = this._container;
    }
    dispose() {
        var i;
        var cnt;
        cnt = this._transitions.length;
        for (i = 0; i < cnt; ++i) {
            var trans = this._transitions[i];
            trans.dispose();
        }
        cnt = this._controllers.length;
        for (i = 0; i < cnt; ++i) {
            var cc = this._controllers[i];
            cc.dispose();
        }
        if (this.scrollPane)
            this.scrollPane.dispose();
        cnt = this._children.length;
        for (i = cnt - 1; i >= 0; --i) {
            var obj = this._children[i];
            obj.parent = null; //avoid removeFromParent call
            obj.dispose();
        }
        this._boundsChanged = false;
        super.dispose();
    }
    get displayListContainer() {
        return this._container;
    }
    addChild(child) {
        this.addChildAt(child, this._children.length);
        return child;
    }
    addChildAt(child, index) {
        if (!child)
            throw "child is null";
        if (index >= 0 && index <= this._children.length) {
            if (child.parent == this) {
                this.setChildIndex(child, index);
            }
            else {
                child.removeFromParent();
                child.parent = this;
                var cnt = this._children.length;
                if (child.sortingOrder != 0) {
                    this._sortingChildCount++;
                    index = this.getInsertPosForSortingChild(child);
                }
                else if (this._sortingChildCount > 0) {
                    if (index > (cnt - this._sortingChildCount))
                        index = cnt - this._sortingChildCount;
                }
                if (index == cnt)
                    this._children.push(child);
                else
                    this._children.splice(index, 0, child);
                this.childStateChanged(child);
                this.setBoundsChangedFlag();
            }
            return child;
        }
        else {
            throw "Invalid child index";
        }
    }
    getInsertPosForSortingChild(target) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; i++) {
            var child = this._children[i];
            if (child == target)
                continue;
            if (target.sortingOrder < child.sortingOrder)
                break;
        }
        return i;
    }
    removeChild(child, dispose) {
        var childIndex = this._children.indexOf(child);
        if (childIndex != -1) {
            this.removeChildAt(childIndex, dispose);
        }
        return child;
    }
    removeChildAt(index, dispose) {
        if (index >= 0 && index < this._children.length) {
            var child = this._children[index];
            child.parent = null;
            if (child.sortingOrder != 0)
                this._sortingChildCount--;
            this._children.splice(index, 1);
            child.group = null;
            if (child.displayObject.parent) {
                this._container.removeChild(child.displayObject);
                if (this._childrenRenderOrder == ChildrenRenderOrder.Arch)
                    Timers.callLater(this.buildNativeDisplayList, this);
            }
            if (dispose)
                child.dispose();
            this.setBoundsChangedFlag();
            return child;
        }
        else {
            throw "Invalid child index";
        }
    }
    removeChildren(beginIndex, endIndex, dispose) {
        beginIndex = beginIndex || 0;
        if (endIndex == null)
            endIndex = -1;
        if (endIndex < 0 || endIndex >= this._children.length)
            endIndex = this._children.length - 1;
        for (var i = beginIndex; i <= endIndex; ++i)
            this.removeChildAt(beginIndex, dispose);
    }
    getChildAt(index) {
        if (index >= 0 && index < this._children.length)
            return this._children[index];
        else
            throw "Invalid child index";
    }
    getChild(name) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            if (this._children[i].name == name)
                return this._children[i];
        }
        return null;
    }
    getChildByPath(path) {
        var arr = path.split(".");
        var cnt = arr.length;
        var gcom = this;
        var obj;
        for (var i = 0; i < cnt; ++i) {
            obj = gcom.getChild(arr[i]);
            if (!obj)
                break;
            if (i != cnt - 1) {
                if (!(obj instanceof GComponent)) {
                    obj = null;
                    break;
                }
                else
                    gcom = obj;
            }
        }
        return obj;
    }
    getVisibleChild(name) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            var child = this._children[i];
            if (child.internalVisible && child.internalVisible2 && child.name == name)
                return child;
        }
        return null;
    }
    getChildInGroup(name, group) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            var child = this._children[i];
            if (child.group == group && child.name == name)
                return child;
        }
        return null;
    }
    getChildById(id) {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            if (this._children[i]._id == id)
                return this._children[i];
        }
        return null;
    }
    getChildIndex(child) {
        return this._children.indexOf(child);
    }
    setChildIndex(child, index) {
        var oldIndex = this._children.indexOf(child);
        if (oldIndex == -1)
            throw "Not a child of this container";
        if (child.sortingOrder != 0) //no effect
            return;
        var cnt = this._children.length;
        if (this._sortingChildCount > 0) {
            if (index > (cnt - this._sortingChildCount - 1))
                index = cnt - this._sortingChildCount - 1;
        }
        this._setChildIndex(child, oldIndex, index);
    }
    setChildIndexBefore(child, index) {
        var oldIndex = this._children.indexOf(child);
        if (oldIndex == -1)
            throw "Not a child of this container";
        if (child.sortingOrder != 0) //no effect
            return oldIndex;
        var cnt = this._children.length;
        if (this._sortingChildCount > 0) {
            if (index > (cnt - this._sortingChildCount - 1))
                index = cnt - this._sortingChildCount - 1;
        }
        if (oldIndex < index)
            return this._setChildIndex(child, oldIndex, index - 1);
        else
            return this._setChildIndex(child, oldIndex, index);
    }
    _setChildIndex(child, oldIndex, index) {
        var cnt = this._children.length;
        if (index > cnt)
            index = cnt;
        if (oldIndex == index)
            return oldIndex;
        this._children.splice(oldIndex, 1);
        this._children.splice(index, 0, child);
        if (child.displayObject.parent) {
            var displayIndex = 0;
            var g;
            var i;
            if (this._childrenRenderOrder == ChildrenRenderOrder.Ascent) {
                for (i = 0; i < index; i++) {
                    g = this._children[i];
                    if (g.displayObject.parent)
                        displayIndex++;
                }
                if (displayIndex == this._container.numChildren)
                    displayIndex--;
                this._container.setChildIndex(child.displayObject, displayIndex);
            }
            else if (this._childrenRenderOrder == ChildrenRenderOrder.Descent) {
                for (i = cnt - 1; i > index; i--) {
                    g = this._children[i];
                    if (g.displayObject.parent)
                        displayIndex++;
                }
                if (displayIndex == this._container.numChildren)
                    displayIndex--;
                this._container.setChildIndex(child.displayObject, displayIndex);
            }
            else {
                Timers.callLater(this.buildNativeDisplayList, this);
            }
            this.setBoundsChangedFlag();
        }
        return index;
    }
    swapChildren(child1, child2) {
        var index1 = this._children.indexOf(child1);
        var index2 = this._children.indexOf(child2);
        if (index1 == -1 || index2 == -1)
            throw "Not a child of this container";
        this.swapChildrenAt(index1, index2);
    }
    swapChildrenAt(index1, index2) {
        var child1 = this._children[index1];
        var child2 = this._children[index2];
        this.setChildIndex(child1, index2);
        this.setChildIndex(child2, index1);
    }
    get numChildren() {
        return this._children.length;
    }
    isAncestorOf(child) {
        if (child == null)
            return false;
        var p = child.parent;
        while (p) {
            if (p == this)
                return true;
            p = p.parent;
        }
        return false;
    }
    addController(controller) {
        this._controllers.push(controller);
        controller.parent = this;
        this.applyController(controller);
    }
    getControllerAt(index) {
        return this._controllers[index];
    }
    getController(name) {
        var cnt = this._controllers.length;
        for (var i = 0; i < cnt; ++i) {
            var c = this._controllers[i];
            if (c.name == name)
                return c;
        }
        return null;
    }
    removeController(c) {
        var index = this._controllers.indexOf(c);
        if (index == -1)
            throw new Error("controller not exists");
        c.parent = null;
        this._controllers.splice(index, 1);
        var length = this._children.length;
        for (var i = 0; i < length; i++) {
            var child = this._children[i];
            child.handleControllerChanged(c);
        }
    }
    get controllers() {
        return this._controllers;
    }
    childStateChanged(child) {
        if (this._buildingDisplayList)
            return;
        var cnt = this._children.length;
        if (child instanceof GGroup) {
            for (let i = 0; i < cnt; i++) {
                let g = this._children[i];
                if (g.group == child)
                    this.childStateChanged(g);
            }
            return;
        }
        if (child.internalVisible /*&& child.displayObject != this._displayObject.mask*/) {
            if (!child.displayObject.parent) {
                var index = 0;
                if (this._childrenRenderOrder == ChildrenRenderOrder.Ascent) {
                    for (let i = 0; i < cnt; i++) {
                        let g = this._children[i];
                        if (g == child)
                            break;
                        if (g.displayObject.parent)
                            index++;
                    }
                    this._container.addChildAt(child.displayObject, index);
                }
                else if (this._childrenRenderOrder == ChildrenRenderOrder.Descent) {
                    for (let i = cnt - 1; i >= 0; i--) {
                        let g = this._children[i];
                        if (g == child)
                            break;
                        if (g.displayObject.parent)
                            index++;
                    }
                    this._container.addChildAt(child.displayObject, index);
                }
                else {
                    this._container.addChild(child.displayObject);
                    Timers.callLater(this.buildNativeDisplayList, this);
                }
            }
        }
        else {
            if (child.displayObject.parent) {
                this._container.removeChild(child.displayObject);
                if (this._childrenRenderOrder == ChildrenRenderOrder.Arch)
                    Timers.callLater(this.buildNativeDisplayList, this);
            }
        }
    }
    buildNativeDisplayList() {
        if (!this._displayObject)
            return;
        var cnt = this._children.length;
        if (cnt == 0)
            return;
        switch (this._childrenRenderOrder) {
            case ChildrenRenderOrder.Ascent:
                {
                    for (let i = 0; i < cnt; i++) {
                        let g = this._children[i];
                        if (g.internalVisible)
                            this._container.addChild(g.displayObject);
                    }
                }
                break;
            case ChildrenRenderOrder.Descent:
                {
                    for (let i = cnt - 1; i >= 0; i--) {
                        let g = this._children[i];
                        if (g.internalVisible)
                            this._container.addChild(g.displayObject);
                    }
                }
                break;
            case ChildrenRenderOrder.Arch:
                {
                    var apex = clamp(this._apexIndex, 0, cnt);
                    for (let i = 0; i < apex; i++) {
                        let g = this._children[i];
                        if (g.internalVisible)
                            this._container.addChild(g.displayObject);
                    }
                    for (let i = cnt - 1; i >= apex; i--) {
                        let g = this._children[i];
                        if (g.internalVisible)
                            this._container.addChild(g.displayObject);
                    }
                }
                break;
        }
    }
    applyController(c) {
        this._applyingController = c;
        var child;
        var length = this._children.length;
        for (var i = 0; i < length; i++) {
            child = this._children[i];
            child.handleControllerChanged(c);
        }
        this._applyingController = null;
        c.runActions();
    }
    applyAllControllers() {
        var cnt = this._controllers.length;
        for (var i = 0; i < cnt; ++i) {
            this.applyController(this._controllers[i]);
        }
    }
    adjustRadioGroupDepth(obj, c) {
        var cnt = this._children.length;
        var myIndex = -1, maxIndex = -1;
        for (let i = 0; i < cnt; i++) {
            let child = this._children[i];
            if (child == obj) {
                myIndex = i;
            }
            else if (("relatedController" in child) /*is button*/ && child.relatedController == c) {
                if (i > maxIndex)
                    maxIndex = i;
            }
        }
        if (myIndex < maxIndex) {
            //如果正在applyingController，此时修改显示列表是危险的，但真正排除危险只能用显示列表的副本去做，这样性能可能损耗较大，
            //这里取个巧，让可能漏过的child补一下handleControllerChanged，反正重复执行是无害的。
            if (this._applyingController)
                this._children[maxIndex].handleControllerChanged(this._applyingController);
            this.swapChildrenAt(myIndex, maxIndex);
        }
    }
    getTransitionAt(index) {
        return this._transitions[index];
    }
    getTransition(transName) {
        var cnt = this._transitions.length;
        for (var i = 0; i < cnt; ++i) {
            var trans = this._transitions[i];
            if (trans.name == transName)
                return trans;
        }
        return null;
    }
    isChildInView(child) {
        if (this._displayObject.clipRect) {
            return child.x + child.width >= 0 && child.x <= this.width
                && child.y + child.height >= 0 && child.y <= this.height;
        }
        else if (this._scrollPane) {
            return this._scrollPane.isChildInView(child);
        }
        else
            return true;
    }
    getFirstChildInView() {
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            var child = this._children[i];
            if (this.isChildInView(child))
                return i;
        }
        return -1;
    }
    get scrollPane() {
        return this._scrollPane;
    }
    get opaque() {
        return this._displayObject.opaque;
    }
    set opaque(value) {
        this._displayObject.opaque = value;
    }
    get margin() {
        return this._margin;
    }
    set margin(value) {
        this._margin.copy(value);
        if (this._displayObject.clipRect) {
            this._container.setPosition(this._margin.left + this._alignOffset.x, this._margin.top + this._alignOffset.y);
        }
        this.handleSizeChanged();
    }
    get childrenRenderOrder() {
        return this._childrenRenderOrder;
    }
    set childrenRenderOrder(value) {
        if (this._childrenRenderOrder != value) {
            this._childrenRenderOrder = value;
            this.buildNativeDisplayList();
        }
    }
    get apexIndex() {
        return this._apexIndex;
    }
    set apexIndex(value) {
        if (this._apexIndex != value) {
            this._apexIndex = value;
            if (this._childrenRenderOrder == ChildrenRenderOrder.Arch)
                this.buildNativeDisplayList();
        }
    }
    get baseUserData() {
        var buffer = this.packageItem.rawData;
        buffer.seek(0, 4);
        return buffer.readS();
    }
    updateMask() {
        var rect = this._displayObject.clipRect;
        if (rect == null)
            rect = new Rect();
        rect.x = this._margin.left;
        rect.y = this._margin.top;
        rect.width = this._width - this._margin.right;
        rect.height = this._height - this._margin.bottom;
        this._displayObject.clipRect = rect;
    }
    setupScroll(buffer) {
        if (this._displayObject == this._container) {
            this._container = new DisplayObject();
            this._displayObject.addChild(this._container);
        }
        this._scrollPane = new ScrollPane(this);
        this._scrollPane.setup(buffer);
    }
    setupOverflow(overflow) {
        if (overflow == OverflowType.Hidden) {
            if (this._displayObject == this._container) {
                this._container = new DisplayObject();
                this._displayObject.addChild(this._container);
            }
            this.updateMask();
            this._container.setPosition(this._margin.left, this._margin.top);
        }
        else if (this._margin.left != 0 || this._margin.top != 0) {
            if (this._displayObject == this._container) {
                this._container = new DisplayObject();
                this._displayObject.addChild(this._container);
            }
            this._container.setPosition(this._margin.left, this._margin.top);
        }
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        if (this._scrollPane)
            this._scrollPane.onOwnerSizeChanged();
        else if (this._displayObject.clipRect)
            this.updateMask();
    }
    handleGrayedChanged() {
        var c = this.getController("grayed");
        if (c) {
            c.selectedIndex = this.grayed ? 1 : 0;
            return;
        }
        var v = this.grayed;
        var cnt = this._children.length;
        for (var i = 0; i < cnt; ++i) {
            this._children[i].grayed = v;
        }
    }
    handleControllerChanged(c) {
        super.handleControllerChanged(c);
        if (this._scrollPane)
            this._scrollPane.handleControllerChanged(c);
    }
    setBoundsChangedFlag() {
        if (!this._scrollPane && !this._trackBounds)
            return;
        if (!this._boundsChanged) {
            this._boundsChanged = true;
            Timers.callLater(this.__render, this);
        }
    }
    __render() {
        if (this._boundsChanged) {
            this.updateBounds();
        }
    }
    ensureBoundsCorrect() {
        if (this._boundsChanged)
            this.updateBounds();
    }
    updateBounds() {
        var ax = 0, ay = 0, aw = 0, ah = 0;
        var len = this._children.length;
        if (len > 0) {
            ax = Number.POSITIVE_INFINITY, ay = Number.POSITIVE_INFINITY;
            var ar = Number.NEGATIVE_INFINITY, ab = Number.NEGATIVE_INFINITY;
            var tmp = 0;
            var i1 = 0;
            for (i1 = 0; i1 < len; i1++) {
                var child = this._children[i1];
                tmp = child.x;
                if (tmp < ax)
                    ax = tmp;
                tmp = child.y;
                if (tmp < ay)
                    ay = tmp;
                tmp = child.x + child.actualWidth;
                if (tmp > ar)
                    ar = tmp;
                tmp = child.y + child.actualHeight;
                if (tmp > ab)
                    ab = tmp;
            }
            aw = ar - ax;
            ah = ab - ay;
        }
        this.setBounds(ax, ay, aw, ah);
    }
    setBounds(ax, ay, aw, ah) {
        this._boundsChanged = false;
        if (this._scrollPane)
            this._scrollPane.setContentSize(Math.round(ax + aw), Math.round(ay + ah));
    }
    get viewWidth() {
        if (this._scrollPane)
            return this._scrollPane.viewWidth;
        else
            return this.width - this._margin.left - this._margin.right;
    }
    set viewWidth(value) {
        if (this._scrollPane)
            this._scrollPane.viewWidth = value;
        else
            this.width = value + this._margin.left + this._margin.right;
    }
    get viewHeight() {
        if (this._scrollPane)
            return this._scrollPane.viewHeight;
        else
            return this.height - this._margin.top - this._margin.bottom;
    }
    set viewHeight(value) {
        if (this._scrollPane)
            this._scrollPane.viewHeight = value;
        else
            this.height = value + this._margin.top + this._margin.bottom;
    }
    getSnappingPosition(xValue, yValue, resultPoint) {
        return this.getSnappingPositionWithDir(xValue, yValue, 0, 0, resultPoint);
    }
    shouldSnapToNext(dir, delta, size) {
        return dir < 0 && delta > UIConfig.defaultScrollSnappingThreshold * size
            || dir > 0 && delta > (1 - UIConfig.defaultScrollSnappingThreshold) * size
            || dir == 0 && delta > size / 2;
    }
    /**
     * dir正数表示右移或者下移，负数表示左移或者上移
     */
    getSnappingPositionWithDir(xValue, yValue, xDir, yDir, resultPoint) {
        if (!resultPoint)
            resultPoint = new Vector2();
        var cnt = this._children.length;
        if (cnt == 0) {
            resultPoint.x = 0;
            resultPoint.y = 0;
            return resultPoint;
        }
        this.ensureBoundsCorrect();
        var obj = null;
        var prev = null;
        var i = 0;
        if (yValue != 0) {
            for (; i < cnt; i++) {
                obj = this._children[i];
                if (yValue < obj.y) {
                    if (i == 0) {
                        yValue = 0;
                        break;
                    }
                    else {
                        prev = this._children[i - 1];
                        if (this.shouldSnapToNext(yDir, yValue - prev.y, prev.height))
                            yValue = obj.y;
                        else
                            yValue = prev.y;
                        break;
                    }
                }
            }
            if (i == cnt)
                yValue = obj.y;
        }
        if (xValue != 0) {
            if (i > 0)
                i--;
            for (; i < cnt; i++) {
                obj = this._children[i];
                if (xValue < obj.x) {
                    if (i == 0) {
                        xValue = 0;
                        break;
                    }
                    else {
                        prev = this._children[i - 1];
                        if (this.shouldSnapToNext(xDir, xValue - prev.x, prev.width))
                            xValue = obj.x;
                        else
                            xValue = prev.x;
                        break;
                    }
                }
            }
            if (i == cnt)
                xValue = obj.x;
        }
        resultPoint.x = xValue;
        resultPoint.y = yValue;
        return resultPoint;
    }
    childSortingOrderChanged(child, oldValue, newValue) {
        if (newValue == 0) {
            this._sortingChildCount--;
            this.setChildIndex(child, this._children.length);
        }
        else {
            if (oldValue == 0)
                this._sortingChildCount++;
            var oldIndex = this._children.indexOf(child);
            var index = this.getInsertPosForSortingChild(child);
            if (oldIndex < index)
                this._setChildIndex(child, oldIndex, index - 1);
            else
                this._setChildIndex(child, oldIndex, index);
        }
    }
    constructFromResource() {
        this.constructFromResource2(null, 0);
    }
    constructFromResource2(objectPool, poolIndex) {
        var contentItem = this.packageItem.getBranch();
        if (!contentItem.decoded) {
            contentItem.decoded = true;
            TranslationHelper.translateComponent(contentItem);
        }
        var i;
        var dataLen;
        var curPos;
        var nextPos;
        var f1;
        var f2;
        var i1;
        var i2;
        var buffer = contentItem.rawData;
        buffer.seek(0, 0);
        this._underConstruct = true;
        this.sourceWidth = buffer.readInt();
        this.sourceHeight = buffer.readInt();
        this.initWidth = this.sourceWidth;
        this.initHeight = this.sourceHeight;
        this.setSize(this.sourceWidth, this.sourceHeight);
        if (buffer.readBool()) {
            this.minWidth = buffer.readInt();
            this.maxWidth = buffer.readInt();
            this.minHeight = buffer.readInt();
            this.maxHeight = buffer.readInt();
        }
        if (buffer.readBool()) {
            f1 = buffer.readFloat();
            f2 = buffer.readFloat();
            this.setPivot(f1, f2, buffer.readBool());
        }
        if (buffer.readBool()) {
            this._margin.top = buffer.readInt();
            this._margin.bottom = buffer.readInt();
            this._margin.left = buffer.readInt();
            this._margin.right = buffer.readInt();
        }
        var overflow = buffer.readByte();
        if (overflow == OverflowType.Scroll) {
            var savedPos = buffer.pos;
            buffer.seek(0, 7);
            this.setupScroll(buffer);
            buffer.pos = savedPos;
        }
        else
            this.setupOverflow(overflow);
        if (buffer.readBool())
            buffer.skip(8);
        this._buildingDisplayList = true;
        buffer.seek(0, 1);
        var controllerCount = buffer.readShort();
        for (i = 0; i < controllerCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            var controller = new Controller();
            this._controllers.push(controller);
            controller.parent = this;
            controller.setup(buffer);
            buffer.pos = nextPos;
        }
        buffer.seek(0, 2);
        var child;
        var childCount = buffer.readShort();
        for (i = 0; i < childCount; i++) {
            dataLen = buffer.readShort();
            curPos = buffer.pos;
            if (objectPool)
                child = objectPool[poolIndex + i];
            else {
                buffer.seek(curPos, 0);
                var type = buffer.readByte();
                var src = buffer.readS();
                var pkgId = buffer.readS();
                var pi;
                if (src) {
                    var pkg;
                    if (pkgId)
                        pkg = UIPackage.getById(pkgId);
                    else
                        pkg = contentItem.owner;
                    pi = pkg ? pkg.getItemById(src) : null;
                }
                else
                    pi = null;
                if (pi) {
                    child = Decls$1.UIObjectFactory.newObject(pi);
                    child.constructFromResource();
                }
                else
                    child = Decls$1.UIObjectFactory.newObject(type);
            }
            child._underConstruct = true;
            child.setup_beforeAdd(buffer, curPos);
            child.parent = this;
            this._children.push(child);
            buffer.pos = curPos + dataLen;
        }
        buffer.seek(0, 3);
        this.relations.setup(buffer, true);
        buffer.seek(0, 2);
        buffer.skip(2);
        for (i = 0; i < childCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            buffer.seek(buffer.pos, 3);
            this._children[i].relations.setup(buffer, false);
            buffer.pos = nextPos;
        }
        buffer.seek(0, 2);
        buffer.skip(2);
        for (i = 0; i < childCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            child = this._children[i];
            child.setup_afterAdd(buffer, buffer.pos);
            child._underConstruct = false;
            buffer.pos = nextPos;
        }
        buffer.seek(0, 4);
        buffer.skip(2); //customData
        this.opaque = buffer.readBool();
        var maskId = buffer.readShort();
        if (maskId != -1) {
            buffer.readBool();
            //todo setMask(this.getChildAt(maskId).displayObject, buffer.readBool())
        }
        var hitTestId = buffer.readS();
        i1 = buffer.readInt();
        i2 = buffer.readInt();
        if (hitTestId) {
            pi = contentItem.owner.getItemById(hitTestId);
            if (pi && pi.pixelHitTestData)
                this._displayObject.hitArea = new PixelHitTest(pi.pixelHitTestData, i1, i2, this.sourceWidth, this.sourceHeight);
        }
        else if (i1 != 0 && i2 != -1) {
            this._displayObject.hitArea = new ShapeHitTest(this.getChildAt(i2).displayObject);
        }
        buffer.seek(0, 5);
        var transitionCount = buffer.readShort();
        for (i = 0; i < transitionCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            var trans = new Transition(this);
            trans.setup(buffer);
            this._transitions.push(trans);
            buffer.pos = nextPos;
        }
        if (this._transitions.length > 0) {
            this.on("added_to_stage", () => { this._transitions.forEach(e => e.onOwnerAddedToStage()); });
            this.on("removed_from_stage", () => { this._transitions.forEach(e => e.onOwnerRemovedFromStage()); });
        }
        this.applyAllControllers();
        this._buildingDisplayList = false;
        this._underConstruct = false;
        this.buildNativeDisplayList();
        this.setBoundsChangedFlag();
        if (contentItem.objectType != ObjectType.Component)
            this.constructExtension(buffer);
        this.onConstruct();
    }
    constructExtension(buffer) {
    }
    onConstruct() {
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        buffer.seek(beginPos, 4);
        var pageController = buffer.readShort();
        if (pageController != -1 && this._scrollPane)
            this._scrollPane.pageController = this._parent.getControllerAt(pageController);
        var cnt;
        var i;
        cnt = buffer.readShort();
        for (i = 0; i < cnt; i++) {
            var cc = this.getController(buffer.readS());
            var pageId = buffer.readS();
            if (cc)
                cc.selectedPageId = pageId;
        }
        if (buffer.version >= 2) {
            cnt = buffer.readShort();
            for (i = 0; i < cnt; i++) {
                var target = buffer.readS();
                var propertyId = buffer.readShort();
                var value = buffer.readS();
                var obj = this.getChildByPath(target);
                if (obj)
                    obj.setProp(propertyId, value);
            }
        }
    }
}

class Window extends GComponent {
    constructor() {
        super();
        this._requestingCmd = 0;
        this._uiSources = [];
        this.bringToFontOnClick = UIConfig.bringWindowToFrontOnClick;
        this.on("added_to_stage", this.__onShown, this);
        this.on("removed_from_stage", this.__onHidden, this);
        this.on("touch_begin", this.__winTouchBegin, this);
    }
    addUISource(source) {
        this._uiSources.push(source);
    }
    set contentPane(val) {
        if (this._contentPane != val) {
            if (this._contentPane)
                this.removeChild(this._contentPane);
            this._contentPane = val;
            if (this._contentPane) {
                this.addChild(this._contentPane);
                this.setSize(this._contentPane.width, this._contentPane.height);
                this._contentPane.addRelation(this, RelationType.Size);
                this._frame = (this._contentPane.getChild("frame"));
                if (this._frame) {
                    this.closeButton = this._frame.getChild("closeButton");
                    this.dragArea = this._frame.getChild("dragArea");
                    this.contentArea = this._frame.getChild("contentArea");
                }
            }
        }
    }
    get contentPane() {
        return this._contentPane;
    }
    get frame() {
        return this._frame;
    }
    get closeButton() {
        return this._closeButton;
    }
    set closeButton(value) {
        if (this._closeButton)
            this._closeButton.offClick(this.closeEventHandler, this);
        this._closeButton = value;
        if (this._closeButton)
            this._closeButton.onClick(this.closeEventHandler, this);
    }
    get dragArea() {
        return this._dragArea;
    }
    set dragArea(value) {
        if (this._dragArea != value) {
            if (this._dragArea) {
                this._dragArea.draggable = false;
                this._dragArea.off("drag_start", this.__dragStart, this);
            }
            this._dragArea = value;
            if (this._dragArea) {
                if (this._dragArea instanceof GGraph)
                    this._dragArea.shape.drawRect(0, new Color4(0, 0), new Color4(0, 0));
                this._dragArea.draggable = true;
                this._dragArea.on("drag_start", this.__dragStart, this);
            }
        }
    }
    get contentArea() {
        return this._contentArea;
    }
    set contentArea(value) {
        this._contentArea = value;
    }
    show() {
        GRoot.inst.showWindow(this);
    }
    showOn(root) {
        root.showWindow(this);
    }
    hide() {
        if (this.isShowing)
            this.doHideAnimation();
    }
    hideImmediately() {
        var r = GRoot.findFor(this.parent);
        r.hideWindowImmediately(this);
    }
    centerOn(r, restraint) {
        this.setPosition(Math.round((r.width - this.width) / 2), Math.round((r.height - this.height) / 2));
        if (restraint) {
            this.addRelation(r, RelationType.Center_Center);
            this.addRelation(r, RelationType.Middle_Middle);
        }
    }
    toggleStatus() {
        if (this.isTop)
            this.hide();
        else
            this.show();
    }
    get isShowing() {
        return this.parent != null;
    }
    get isTop() {
        return this.parent && this.parent.getChildIndex(this) == this.parent.numChildren - 1;
    }
    get modal() {
        return this._modal;
    }
    set modal(val) {
        this._modal = val;
    }
    bringToFront() {
        GRoot.findFor(this).bringToFront(this);
    }
    showModalWait(requestingCmd) {
        if (requestingCmd != null)
            this._requestingCmd = requestingCmd;
        if (UIConfig.windowModalWaiting) {
            if (!this._modalWaitPane)
                this._modalWaitPane = UIPackage.createObjectFromURL(UIConfig.windowModalWaiting);
            this.layoutModalWaitPane();
            this.addChild(this._modalWaitPane);
        }
    }
    layoutModalWaitPane() {
        if (this._contentArea) {
            var pt = this._frame.localToGlobal();
            pt = this.globalToLocal(pt.x, pt.y, pt);
            this._modalWaitPane.setPosition(pt.x + this._contentArea.x, pt.y + this._contentArea.y);
            this._modalWaitPane.setSize(this._contentArea.width, this._contentArea.height);
        }
        else
            this._modalWaitPane.setSize(this.width, this.height);
    }
    closeModalWait(requestingCmd) {
        if (requestingCmd != null) {
            if (this._requestingCmd != requestingCmd)
                return false;
        }
        this._requestingCmd = 0;
        if (this.modalWaiting)
            this.removeChild(this._modalWaitPane);
        return true;
    }
    get modalWaiting() {
        return this._modalWaitPane != null && this._modalWaitPane.parent != null;
    }
    init() {
        if (this._inited || this._loading)
            return;
        if (this._uiSources.length > 0) {
            this._loading = false;
            var cnt = this._uiSources.length;
            for (var i = 0; i < cnt; i++) {
                var lib = this._uiSources[i];
                if (!lib.loaded) {
                    lib.load(this.__uiLoadComplete, this);
                    this._loading = true;
                }
            }
            if (!this._loading)
                this._init();
        }
        else
            this._init();
    }
    onInit() {
    }
    onShown() {
    }
    onHide() {
    }
    doShowAnimation() {
        this.onShown();
    }
    doHideAnimation() {
        this.hideImmediately();
    }
    __uiLoadComplete() {
        var cnt = this._uiSources.length;
        for (var i = 0; i < cnt; i++) {
            var lib = this._uiSources[i];
            if (!lib.loaded)
                return;
        }
        this._loading = false;
        this._init();
    }
    _init() {
        this._inited = true;
        this.onInit();
        if (this.isShowing)
            this.doShowAnimation();
    }
    dispose() {
        if (this.parent)
            this.hideImmediately();
        super.dispose();
    }
    closeEventHandler() {
        this.hide();
    }
    __onShown() {
        if (!this._inited)
            this.init();
        else
            this.doShowAnimation();
    }
    __onHidden() {
        this.closeModalWait();
        this.onHide();
    }
    __winTouchBegin() {
        if (this.isShowing && this.bringToFontOnClick)
            this.bringToFront();
    }
    __dragStart(evt) {
        evt.preventDefault();
        this.startDrag();
    }
}

var _inst;
class GRoot extends GComponent {
    constructor() {
        super();
        if (!_inst)
            _inst = this;
        this.opaque = false;
        this._popupStack = [];
        this._justClosedPopups = [];
        this.on("touch_begin", this.__stageTouchBegin, this, true);
        this._modalLayer = new GGraph();
        this._modalLayer.setSize(this.width, this.height);
        this._modalLayer.shape.drawRect(0, new Color4(0, 0), UIConfig.modalLayerColor);
        this._modalLayer.addRelation(this, RelationType.Size);
        this.applyScaleFactor();
        this.on("content_scale_factor_changed", this.applyScaleFactor, this);
    }
    static get inst() {
        if (!_inst) {
            _inst = new GRoot();
            Stage.scene.add(_inst.displayObject.obj3D);
        }
        return _inst;
    }
    static findFor(obj) {
        if (obj instanceof GRoot)
            return obj;
        if (!obj)
            return _inst;
        var p = obj._parent;
        while (p) {
            if (p instanceof GRoot)
                return p;
            p = p.parent;
        }
        return _inst;
    }
    applyScaleFactor() {
        this.setSize(Math.ceil(Stage.width / UIContentScaler.scaleFactor), Math.ceil(Stage.height / UIContentScaler.scaleFactor));
        this.setScale(UIContentScaler.scaleFactor, UIContentScaler.scaleFactor);
    }
    showWindow(win) {
        this.addChild(win);
        if (win.x > this.width)
            win.x = this.width - win.width;
        else if (win.x + win.width < 0)
            win.x = 0;
        if (win.y > this.height)
            win.y = this.height - win.height;
        else if (win.y + win.height < 0)
            win.y = 0;
        this.adjustModalLayer();
    }
    hideWindow(win) {
        win.hide();
    }
    hideWindowImmediately(win) {
        if (win.parent == this)
            this.removeChild(win);
        this.adjustModalLayer();
    }
    bringToFront(win) {
        var cnt = this.numChildren;
        var i;
        if (this._modalLayer.parent && !win.modal)
            i = this.getChildIndex(this._modalLayer) - 1;
        else
            i = cnt - 1;
        for (; i >= 0; i--) {
            var g = this.getChildAt(i);
            if (g == win)
                return;
            if (g instanceof Window)
                break;
        }
        if (i >= 0)
            this.setChildIndex(win, i);
    }
    showModalWait(msg) {
        if (UIConfig.globalModalWaiting) {
            if (this._modalWaitPane == null)
                this._modalWaitPane = UIPackage.createObjectFromURL(UIConfig.globalModalWaiting);
            this._modalWaitPane.setSize(this.width, this.height);
            this._modalWaitPane.addRelation(this, RelationType.Size);
            this.addChild(this._modalWaitPane);
            this._modalWaitPane.text = msg || "";
        }
    }
    closeModalWait() {
        if (this._modalWaitPane && this._modalWaitPane.parent)
            this.removeChild(this._modalWaitPane);
    }
    closeAllExceptModals() {
        var arr = this._children.slice();
        var cnt = arr.length;
        for (var i = 0; i < cnt; i++) {
            var g = arr[i];
            if ((g instanceof Window) && !g.modal)
                g.hide();
        }
    }
    closeAllWindows() {
        var arr = this._children.slice();
        var cnt = arr.length;
        for (var i = 0; i < cnt; i++) {
            var g = arr[i];
            if (g instanceof Window)
                g.hide();
        }
    }
    getTopWindow() {
        var cnt = this.numChildren;
        for (var i = cnt - 1; i >= 0; i--) {
            var g = this.getChildAt(i);
            if (g instanceof Window) {
                return g;
            }
        }
        return null;
    }
    get modalLayer() {
        return this._modalLayer;
    }
    get hasModalWindow() {
        return this._modalLayer.parent != null;
    }
    get modalWaiting() {
        return this._modalWaitPane && this._modalWaitPane.onStage;
    }
    showPopup(popup, target, dir) {
        if (this._popupStack.length > 0) {
            var k = this._popupStack.indexOf(popup);
            if (k != -1) {
                for (var i = this._popupStack.length - 1; i >= k; i--)
                    this.removeChild(this._popupStack.pop());
            }
        }
        this._popupStack.push(popup);
        if (target) {
            var p = target;
            while (p) {
                if (p.parent == this) {
                    if (popup.sortingOrder < p.sortingOrder) {
                        popup.sortingOrder = p.sortingOrder;
                    }
                    break;
                }
                p = p.parent;
            }
        }
        this.addChild(popup);
        this.adjustModalLayer();
        var pos;
        var sizeW = 0, sizeH = 0;
        if (target) {
            pos = target.localToRoot(0, 0);
            let size = target.localToRoot(target.width, target.height);
            sizeW = size.x - pos.x;
            sizeH = size.y - pos.y;
        }
        else {
            pos = Stage.getTouchPos();
            pos = this.globalToLocal(pos.x, pos.y);
        }
        var xx, yy;
        xx = pos.x;
        if (xx + popup.width > this.width)
            xx = xx + sizeW - popup.width;
        yy = pos.y + sizeH;
        if (((dir === undefined || dir === PopupDirection.Auto) && yy + popup.height > this.height)
            || dir === PopupDirection.Up) {
            yy = pos.y - popup.height - 1;
            if (yy < 0) {
                yy = 0;
                xx += sizeW / 2;
            }
        }
        popup.setPosition(xx, yy);
    }
    togglePopup(popup, target, dir) {
        if (this._justClosedPopups.indexOf(popup) != -1)
            return;
        this.showPopup(popup, target, dir);
    }
    hidePopup(popup) {
        if (popup) {
            var k = this._popupStack.indexOf(popup);
            if (k != -1) {
                for (var i = this._popupStack.length - 1; i >= k; i--)
                    this.closePopup(this._popupStack.pop());
            }
        }
        else {
            var cnt = this._popupStack.length;
            for (i = cnt - 1; i >= 0; i--)
                this.closePopup(this._popupStack[i]);
            this._popupStack.length = 0;
        }
    }
    get hasAnyPopup() {
        return this._popupStack.length != 0;
    }
    closePopup(target) {
        if (target.parent) {
            if (target instanceof Window)
                target.hide();
            else
                this.removeChild(target);
        }
    }
    showTooltips(msg) {
        if (this._defaultTooltipWin == null) {
            var resourceURL = UIConfig.tooltipsWin;
            if (!resourceURL) {
                console.warn("UIConfig.tooltipsWin not defined");
                return;
            }
            this._defaultTooltipWin = UIPackage.createObjectFromURL(resourceURL);
        }
        this._defaultTooltipWin.text = msg;
        this.showTooltipsWin(this._defaultTooltipWin);
    }
    showTooltipsWin(tooltipWin, xx, yy) {
        this.hideTooltips();
        this._tooltipWin = tooltipWin;
        if (xx == null || yy == null) {
            xx = Stage.touchPos.x + 10;
            yy = Stage.touchPos.y + 20;
        }
        var pt = this.globalToLocal(xx, yy);
        xx = pt.x;
        yy = pt.y;
        if (xx + this._tooltipWin.width > this.width) {
            xx = xx - this._tooltipWin.width - 1;
            if (xx < 0)
                xx = 10;
        }
        if (yy + this._tooltipWin.height > this.height) {
            yy = yy - this._tooltipWin.height - 1;
            if (xx - this._tooltipWin.width - 1 > 0)
                xx = xx - this._tooltipWin.width - 1;
            if (yy < 0)
                yy = 10;
        }
        this._tooltipWin.x = xx;
        this._tooltipWin.y = yy;
        this.addChild(this._tooltipWin);
    }
    hideTooltips() {
        if (this._tooltipWin) {
            if (this._tooltipWin.parent)
                this.removeChild(this._tooltipWin);
            this._tooltipWin = null;
        }
    }
    playOneShotSound(url, volumeScale) {
        if (!Stage.audioListener)
            return;
        if (volumeScale == null)
            volumeScale = 1;
        let pi = UIPackage.getItemByURL(url);
        if (pi && pi.audioBuffer) {
            if (!pi.sound) {
                pi.sound = new Audio(Stage.audioListener);
                pi.sound.setBuffer(pi.audioBuffer);
                pi.sound.setLoop(false);
            }
            pi.sound.setVolume(volumeScale);
            pi.sound.play();
        }
    }
    adjustModalLayer() {
        var cnt = this.numChildren;
        if (this._modalWaitPane && this._modalWaitPane.parent)
            this.setChildIndex(this._modalWaitPane, cnt - 1);
        for (var i = cnt - 1; i >= 0; i--) {
            var g = this.getChildAt(i);
            if ((g instanceof Window) && g.modal) {
                if (this._modalLayer.parent == null)
                    this.addChildAt(this._modalLayer, i);
                else
                    this.setChildIndexBefore(this._modalLayer, i);
                return;
            }
        }
        if (this._modalLayer.parent)
            this.removeChild(this._modalLayer);
    }
    checkPopups() {
        this._justClosedPopups.length = 0;
        if (this._popupStack.length > 0) {
            let mc = Stage.touchTarget;
            let handled = false;
            while (mc) {
                let gobj = GObject.cast(mc);
                if (gobj) {
                    let k = this._popupStack.indexOf(gobj);
                    if (k != -1) {
                        for (let i = this._popupStack.length - 1; i > k; i--) {
                            let last = this._popupStack.length - 1;
                            let popup = this._popupStack[last];
                            this.closePopup(popup);
                            this._justClosedPopups.push(popup);
                            this._popupStack.splice(last, 1);
                        }
                        handled = true;
                        break;
                    }
                }
                mc = mc.parent;
            }
            if (!handled) {
                for (let i = this._popupStack.length - 1; i >= 0; i--) {
                    let popup = this._popupStack[i];
                    this.closePopup(popup);
                    this._justClosedPopups.push(popup);
                    this._popupStack.splice(i, 1);
                }
            }
        }
    }
    __stageTouchBegin() {
        if (this._tooltipWin)
            this.hideTooltips();
        this.checkPopups();
    }
}
Decls.GRoot = GRoot;

class TextFormat {
    constructor() {
        this.size = 0;
        this.color = 0;
        this.lineSpacing = 0;
        this.letterSpacing = 0;
        this.outline = 0;
        this.outlineColor = 0;
        this.shadowOffset = new Vector2();
        this.shadowColor = 0;
    }
    copy(source) {
        this.size = source.size;
        this.font = source.font;
        this.color = source.color;
        this.lineSpacing = source.lineSpacing;
        this.letterSpacing = source.letterSpacing;
        this.bold = source.bold;
        this.underline = source.underline;
        this.italic = source.italic;
        this.strikethrough = source.strikethrough;
        this.align = source.align;
        this.outline = source.outline;
        this.outlineColor = source.outlineColor;
        this.shadowOffset.copy(source.shadowOffset);
        this.shadowColor = source.shadowColor;
    }
    equalStyle(aFormat) {
        return this.size == aFormat.size && this.color == aFormat.color
            && this.bold == aFormat.bold && this.underline == aFormat.underline
            && this.italic == aFormat.italic
            && this.strikethrough == aFormat.strikethrough
            && this.align == aFormat.align;
    }
}

class XMLUtils {
    static decodeString(aSource) {
        let len = aSource.length;
        let sb = "";
        let pos1 = 0, pos2 = 0;
        while (true) {
            pos2 = aSource.indexOf('&', pos1);
            if (pos2 == -1) {
                sb += aSource.substr(pos1);
                break;
            }
            sb += aSource.substr(pos1, pos2 - pos1);
            pos1 = pos2 + 1;
            pos2 = pos1;
            let end = Math.min(len, pos2 + 10);
            for (; pos2 < end; pos2++) {
                if (aSource[pos2] == ';')
                    break;
            }
            if (pos2 < end && pos2 > pos1) {
                let entity = aSource.substr(pos1, pos2 - pos1);
                let u = 0;
                if (entity[0] == '#') {
                    if (entity.length > 1) {
                        if (entity[1] == 'x')
                            u = parseInt(entity.substr(2), 16);
                        else
                            u = parseInt(entity.substr(1));
                        sb += String.fromCharCode(u);
                        pos1 = pos2 + 1;
                    }
                    else
                        sb += '&';
                }
                else {
                    switch (entity) {
                        case "amp":
                            u = 38;
                            break;
                        case "apos":
                            u = 39;
                            break;
                        case "gt":
                            u = 62;
                            break;
                        case "lt":
                            u = 60;
                            break;
                        case "nbsp":
                            u = 32;
                            break;
                        case "quot":
                            u = 34;
                            break;
                    }
                    if (u > 0) {
                        sb += String.fromCharCode(u);
                        pos1 = pos2 + 1;
                    }
                    else
                        sb += '&';
                }
            }
            else {
                sb += '&';
            }
        }
        return sb;
    }
    static encodeString(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    }
    static getString(attrs, attrName, defValue) {
        if (attrs == null)
            return defValue == null ? null : defValue;
        let ret = attrs[attrName];
        if (ret != null)
            return "" + ret;
        else
            return defValue == null ? null : defValue;
    }
    static getInt(attrs, attrName, defValue) {
        let value = this.getString(attrs, attrName);
        if (value == null || value.length == 0)
            return defValue == null ? 0 : defValue;
        if (value[value.length - 1] == '%') {
            let ret = parseInt(value.substring(0, value.length - 1));
            return Math.ceil(ret / 100.0 * defValue);
        }
        else
            return parseInt(value);
    }
    static getFloat(attrs, attrName, defValue) {
        let value = this.getString(attrs, attrName);
        if (value == null || value.length == 0)
            return defValue == null ? 0 : defValue;
        let ret = parseFloat(value);
        if (isNaN(ret))
            return defValue == null ? 0 : defValue;
        else
            return ret;
    }
    static getBool(attrs, attrName, defValue) {
        let value = this.getString(attrs, attrName);
        if (value == null || value.length == 0)
            return defValue == null ? false : defValue;
        if (value == "true" || value == "1")
            return true;
        else if (value == "false" || value == "0")
            return false;
        else
            return defValue == null ? false : defValue;
    }
    static getColor(attrs, attrName, defValue) {
        let value = this.getString(attrs, attrName);
        if (value == null || value.length == 0)
            return defValue == null ? 0 : defValue;
        return convertFromHtmlColor(value);
    }
}

var XMLTagType;
(function (XMLTagType) {
    XMLTagType[XMLTagType["Start"] = 0] = "Start";
    XMLTagType[XMLTagType["End"] = 1] = "End";
    XMLTagType[XMLTagType["Void"] = 2] = "Void";
    XMLTagType[XMLTagType["CDATA"] = 3] = "CDATA";
    XMLTagType[XMLTagType["Comment"] = 4] = "Comment";
    XMLTagType[XMLTagType["Instruction"] = 5] = "Instruction";
})(XMLTagType || (XMLTagType = {}));
const CDATA_START = "<![CDATA[";
const CDATA_END = "]]>";
const COMMENT_START = "<!--";
const COMMENT_END = "-->";
class XMLIterator {
    static begin(source, lowerCaseName) {
        XMLIterator.source = source;
        XMLIterator.lowerCaseName = lowerCaseName;
        this.sourceLen = source.length;
        this.parsePos = 0;
        this.lastTagEnd = 0;
        this.tagPos = 0;
        this.tagLength = 0;
        this.tagName = null;
    }
    static nextTag() {
        let pos;
        let c;
        let buffer = "";
        this.tagType = XMLTagType.Start;
        this.lastTagEnd = this.parsePos;
        this.attrParsed = false;
        this.lastTagName = this.tagName;
        while ((pos = this.source.indexOf('<', this.parsePos)) != -1) {
            this.parsePos = pos;
            pos++;
            if (pos == this.sourceLen)
                break;
            c = this.source[pos];
            if (c == '!') {
                if (this.sourceLen > pos + 7 && this.source.substr(pos - 1, 9) == CDATA_START) {
                    pos = this.source.indexOf(CDATA_END, pos);
                    this.tagType = XMLTagType.CDATA;
                    this.tagName = "";
                    this.tagPos = this.parsePos;
                    if (pos == -1)
                        this.tagLength = this.sourceLen - this.parsePos;
                    else
                        this.tagLength = pos + 3 - this.parsePos;
                    this.parsePos += this.tagLength;
                    return true;
                }
                else if (this.sourceLen > pos + 2 && this.source.substr(pos - 1, 4) == COMMENT_START) {
                    pos = this.source.indexOf(COMMENT_END, pos);
                    this.tagType = XMLTagType.Comment;
                    this.tagName = "";
                    this.tagPos = this.parsePos;
                    if (pos == -1)
                        this.tagLength = this.sourceLen - this.parsePos;
                    else
                        this.tagLength = pos + 3 - this.parsePos;
                    this.parsePos += this.tagLength;
                    return true;
                }
                else {
                    pos++;
                    this.tagType = XMLTagType.Instruction;
                }
            }
            else if (c == '/') {
                pos++;
                this.tagType = XMLTagType.End;
            }
            else if (c == '?') {
                pos++;
                this.tagType = XMLTagType.Instruction;
            }
            for (; pos < this.sourceLen; pos++) {
                c = this.source[pos];
                if (' \t\n\r\v'.indexOf(c) != -1 || c == '>' || c == '/')
                    break;
            }
            if (pos == this.sourceLen)
                break;
            buffer += this.source.substr(this.parsePos + 1, pos - this.parsePos - 1);
            if (buffer.length > 0 && buffer[0] == '/')
                buffer = buffer.substr(1);
            let singleQuoted = false, doubleQuoted = false;
            let possibleEnd = -1;
            for (; pos < this.sourceLen; pos++) {
                c = this.source[pos];
                if (c == '"') {
                    if (!singleQuoted)
                        doubleQuoted = !doubleQuoted;
                }
                else if (c == '\'') {
                    if (!doubleQuoted)
                        singleQuoted = !singleQuoted;
                }
                if (c == '>') {
                    if (!(singleQuoted || doubleQuoted)) {
                        possibleEnd = -1;
                        break;
                    }
                    possibleEnd = pos;
                }
                else if (c == '<')
                    break;
            }
            if (possibleEnd != -1)
                pos = possibleEnd;
            if (pos == this.sourceLen)
                break;
            if (this.source[pos - 1] == '/')
                this.tagType = XMLTagType.Void;
            this.tagName = buffer;
            if (this.lowerCaseName)
                this.tagName = this.tagName.toLowerCase();
            this.tagPos = this.parsePos;
            this.tagLength = pos + 1 - this.parsePos;
            this.parsePos += this.tagLength;
            return true;
        }
        this.tagPos = this.sourceLen;
        this.tagLength = 0;
        this.tagName = null;
        return false;
    }
    static getTagSource() {
        return this.source.substr(this.tagPos, this.tagLength);
    }
    static getRawText(trim) {
        if (this.lastTagEnd == this.tagPos)
            return "";
        else if (trim) {
            let i = this.lastTagEnd;
            for (; i < this.tagPos; i++) {
                let c = this.source[i];
                if (' \t\n\r\v'.indexOf(c) == -1)
                    break;
            }
            if (i == this.tagPos)
                return "";
            else
                return this.source.substr(i, this.tagPos - i).trim();
        }
        else
            return this.source.substr(this.lastTagEnd, this.tagPos - this.lastTagEnd);
    }
    static getText(trim) {
        if (this.lastTagEnd == this.tagPos)
            return "";
        else if (trim) {
            let i = this.lastTagEnd;
            for (; i < this.tagPos; i++) {
                let c = this.source[i];
                if (' \t\n\r\v'.indexOf(c) == -1)
                    break;
            }
            if (i == this.tagPos)
                return "";
            else
                return XMLUtils.decodeString(this.source.substr(i, this.tagPos - i)).trimRight();
        }
        else
            return XMLUtils.decodeString(this.source.substr(this.lastTagEnd, this.tagPos - this.lastTagEnd));
    }
    static getAttribute(attrName) {
        if (!this.attrParsed) {
            for (var key in this.attributes) {
                delete this.attributes[key];
            }
            this.parseAttributes(this.attributes);
            this.attrParsed = true;
        }
        return this.attributes[attrName];
    }
    static getAttributes(result) {
        if (result == null)
            result = {};
        if (this.attrParsed) {
            for (let k in this.attributes)
                result[k] = this.attributes[k];
        }
        else //这里没有先ParseAttributes再赋值给result是为了节省复制的操作
            this.parseAttributes(result);
        return result;
    }
    static parseAttributes(attrs) {
        let attrName;
        let valueStart = 0;
        let valueEnd = 0;
        let waitValue = false;
        let quoted = 0;
        let buffer = "";
        let i = this.tagPos;
        let attrEnd = this.tagPos + this.tagLength;
        if (i < attrEnd && this.source[i] == '<') {
            for (; i < attrEnd; i++) {
                let c = this.source[i];
                if (' \t\n\r\v'.indexOf(c) != -1 || c == '>' || c == '/')
                    break;
            }
        }
        for (; i < attrEnd; i++) {
            let c = this.source[i];
            if (c == '=') {
                valueStart = -1;
                valueEnd = -1;
                quoted = 0;
                for (let j = i + 1; j < attrEnd; j++) {
                    let c2 = this.source[j];
                    if (' \t\n\r\v'.indexOf(c2) != -1) {
                        if (valueStart != -1 && quoted == 0) {
                            valueEnd = j - 1;
                            break;
                        }
                    }
                    else if (c2 == '>') {
                        if (quoted == 0) {
                            valueEnd = j - 1;
                            break;
                        }
                    }
                    else if (c2 == '"') {
                        if (valueStart != -1) {
                            if (quoted != 1) {
                                valueEnd = j - 1;
                                break;
                            }
                        }
                        else {
                            quoted = 2;
                            valueStart = j + 1;
                        }
                    }
                    else if (c2 == '\'') {
                        if (valueStart != -1) {
                            if (quoted != 2) {
                                valueEnd = j - 1;
                                break;
                            }
                        }
                        else {
                            quoted = 1;
                            valueStart = j + 1;
                        }
                    }
                    else if (valueStart == -1) {
                        valueStart = j;
                    }
                }
                if (valueStart != -1 && valueEnd != -1) {
                    attrName = buffer;
                    if (this.lowerCaseName)
                        attrName = attrName.toLowerCase();
                    buffer = "";
                    attrs[attrName] = XMLUtils.decodeString(this.source.substr(valueStart, valueEnd - valueStart + 1));
                    i = valueEnd + 1;
                }
                else
                    break;
            }
            else if (' \t\n\r\v'.indexOf(c) == -1) {
                if (waitValue || c == '/' || c == '>') {
                    if (buffer.length > 0) {
                        attrName = buffer;
                        if (this.lowerCaseName)
                            attrName = attrName.toLowerCase();
                        attrs[attrName] = "";
                        buffer = "";
                    }
                    waitValue = false;
                }
                if (c != '/' && c != '>')
                    buffer += c;
            }
            else {
                if (buffer.length > 0)
                    waitValue = true;
            }
        }
    }
}
XMLIterator.attributes = {};

var HtmlElementType;
(function (HtmlElementType) {
    HtmlElementType[HtmlElementType["Text"] = 0] = "Text";
    HtmlElementType[HtmlElementType["Link"] = 1] = "Link";
    HtmlElementType[HtmlElementType["Image"] = 2] = "Image";
    HtmlElementType[HtmlElementType["Input"] = 3] = "Input";
    HtmlElementType[HtmlElementType["Select"] = 4] = "Select";
    HtmlElementType[HtmlElementType["Object"] = 5] = "Object";
    //internal
    HtmlElementType[HtmlElementType["LinkEnd"] = 6] = "LinkEnd";
})(HtmlElementType || (HtmlElementType = {}));
class HtmlElement {
    constructor() {
        this.format = new TextFormat();
        this.position = new Vector2();
    }
    getAttr(attrName) {
        if (this._attributes == null)
            return null;
        return this._attributes[attrName];
    }
    setAttr(attrName, attrValue) {
        if (this._attributes == null)
            this._attributes = {};
        this._attributes[attrName] = attrValue;
    }
    getAttrString(attrName, defValue) {
        return XMLUtils.getString(this._attributes, attrName, defValue);
    }
    getAttrInt(attrName, defValue) {
        return XMLUtils.getInt(this._attributes, attrName, defValue);
    }
    getAttrFloat(attrName, defValue) {
        return XMLUtils.getFloat(this._attributes, attrName, defValue);
    }
    getAttrBool(attrName, defValue) {
        return XMLUtils.getBool(this._attributes, attrName, defValue);
    }
    getAttrColor(attrName, defValue) {
        return XMLUtils.getColor(this._attributes, attrName, defValue);
    }
    fetchAttributes() {
        this._attributes = XMLIterator.getAttributes(this._attributes);
    }
    get isEntity() {
        return this.type == HtmlElementType.Image || this.type == HtmlElementType.Select
            || this.type == HtmlElementType.Input || this.type == HtmlElementType.Object;
    }
    reset() {
        this.name = null;
        this.text = null;
        this.htmlObject = null;
        this.status = 0;
        this._attributes = null;
    }
}
var elementPool = new Pool(HtmlElement, (element, ...argArray) => {
    element.type = argArray[0];
    if (element.type != HtmlElementType.Text && element._attributes == null)
        element._attributes = {};
}, element => element.reset());

class HtmlParseOptions {
    constructor() {
        this.linkUnderline = HtmlParseOptions.defaultLinkUnderline;
        this.linkColor = HtmlParseOptions.defaultLinkColor;
    }
}
HtmlParseOptions.defaultLinkUnderline = true;
HtmlParseOptions.defaultLinkColor = 0x3A67CC;

var s_list1 = new Array();
var s_list2 = new Array();
class HtmlParser {
    constructor() {
        this._textFormatStack = new Array();
        this._format = new TextFormat();
        this._defaultOptions = new HtmlParseOptions();
    }
    parse(aSource, defaultFormat, elements, parseOptions) {
        if (parseOptions == null)
            parseOptions = this._defaultOptions;
        this._elements = elements;
        this._textFormatStackTop = 0;
        this._format.copy(defaultFormat);
        this._format["colorChanged"] = false;
        let skipText = 0;
        let ignoreWhiteSpace = parseOptions.ignoreWhiteSpace;
        let skipNextCR = false;
        let text;
        XMLIterator.begin(aSource, true);
        while (XMLIterator.nextTag()) {
            if (skipText == 0) {
                text = XMLIterator.getText(ignoreWhiteSpace);
                if (text.length > 0) {
                    if (skipNextCR && text[0] == '\n')
                        text = text.substr(1);
                    this.appendText(text);
                }
            }
            skipNextCR = false;
            switch (XMLIterator.tagName) {
                case "b":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.bold = true;
                    }
                    else
                        this.popTextFormat();
                    break;
                case "i":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.italic = true;
                    }
                    else
                        this.popTextFormat();
                    break;
                case "u":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.underline = true;
                    }
                    else
                        this.popTextFormat();
                    break;
                case "strike":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.strikethrough = true;
                    }
                    else
                        this.popTextFormat();
                    break;
                // case "sub":
                //     {
                //         if (XMLIterator.tagType == XMLTagType.Start) {
                //             this.pushTextFormat();
                //             this._format.specialStyle = TextFormat.SpecialStyle.Subscript;
                //         }
                //         else
                //             this.popTextFormat();
                //     }
                //     break;
                // case "sup":
                //     {
                //         if (XMLIterator.tagType == XMLTagType.Start) {
                //             this.pushTextFormat();
                //             this._format.specialStyle = TextFormat.SpecialStyle.Superscript;
                //         }
                //         else
                //             this.popTextFormat();
                //     }
                //     break;
                case "font":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.size = XMLUtils.getInt(XMLIterator.attributes, "size", this._format.size);
                        let color = XMLIterator.getAttribute("color");
                        if (color != null)
                            this._format.color = convertFromHtmlColor(color);
                    }
                    else if (XMLIterator.tagType == XMLTagType.End)
                        this.popTextFormat();
                    break;
                case "br":
                    this.appendText("\n");
                    break;
                case "img":
                    if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void) {
                        let element = elementPool.borrow(HtmlElementType.Image);
                        element.fetchAttributes();
                        element.name = element.getAttrString("name");
                        element.format.align = this._format.align;
                        this._elements.push(element);
                    }
                    break;
                case "a":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.underline = this._format.underline || parseOptions.linkUnderline;
                        if (!this._format["colorChanged"])
                            this._format.color = parseOptions.linkColor;
                        let element = elementPool.borrow(HtmlElementType.Link);
                        element.fetchAttributes();
                        element.name = element.getAttrString("name");
                        element.format.align = this._format.align;
                        this._elements.push(element);
                    }
                    else if (XMLIterator.tagType == XMLTagType.End) {
                        this.popTextFormat();
                        let element = elementPool.borrow(HtmlElementType.LinkEnd);
                        this._elements.push(element);
                    }
                    break;
                case "input":
                    {
                        let element = elementPool.borrow(HtmlElementType.Input);
                        element.fetchAttributes();
                        element.name = element.getAttrString("name");
                        element.format.copy(this._format);
                        this._elements.push(element);
                    }
                    break;
                case "select":
                    {
                        if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void) {
                            let element = elementPool.borrow(HtmlElementType.Select);
                            element.fetchAttributes();
                            if (XMLIterator.tagType == XMLTagType.Start) {
                                s_list1.length = 0;
                                s_list2.length = 0;
                                while (XMLIterator.nextTag()) {
                                    if (XMLIterator.tagName == "select")
                                        break;
                                    if (XMLIterator.tagName == "option") {
                                        if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void)
                                            s_list2.push(XMLUtils.getString(XMLIterator.attributes, "value", ""));
                                        else
                                            s_list1.push(XMLIterator.getText());
                                    }
                                }
                                element.setAttr("items", s_list1.slice());
                                element.setAttr("values", s_list2.slice());
                            }
                            element.name = element.getAttrString("name");
                            element.format.copy(this._format);
                            this._elements.push(element);
                        }
                    }
                    break;
                case "p":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushTextFormat();
                        this._format.align = XMLIterator.getAttribute("align");
                        if (!this.isNewLine())
                            this.appendText("\n");
                    }
                    else if (XMLIterator.tagType == XMLTagType.End) {
                        this.appendText("\n");
                        skipNextCR = true;
                        this.popTextFormat();
                    }
                    break;
                case "ui":
                case "div":
                case "li":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        if (!this.isNewLine())
                            this.appendText("\n");
                    }
                    else {
                        this.appendText("\n");
                        skipNextCR = true;
                    }
                    break;
                case "html":
                case "body":
                    //full html
                    ignoreWhiteSpace = true;
                    break;
                case "head":
                case "style":
                case "script":
                case "form":
                    if (XMLIterator.tagType == XMLTagType.Start)
                        skipText++;
                    else if (XMLIterator.tagType == XMLTagType.End)
                        skipText--;
                    break;
            }
        }
        if (skipText == 0) {
            text = XMLIterator.getText(ignoreWhiteSpace);
            if (text.length > 0) {
                if (skipNextCR && text[0] == '\n')
                    text = text.substr(1);
                this.appendText(text);
            }
        }
        this._elements = null;
    }
    pushTextFormat() {
        let tf;
        if (this._textFormatStack.length <= this._textFormatStackTop) {
            tf = new TextFormat();
            this._textFormatStack.push(tf);
        }
        else
            tf = this._textFormatStack[this._textFormatStackTop];
        tf.copy(this._format);
        tf["colorChanged"] = this._format["colorChanged"];
        this._textFormatStackTop++;
    }
    popTextFormat() {
        if (this._textFormatStackTop > 0) {
            let tf = this._textFormatStack[this._textFormatStackTop - 1];
            this._format.copy(tf);
            this._format["colorChanged"] = tf["colorChanged"];
            this._textFormatStackTop--;
        }
    }
    isNewLine() {
        if (this._elements.length > 0) {
            let element = this._elements[this._elements.length - 1];
            if (element && element.type == HtmlElementType.Text)
                return element.text.endsWith("\n");
            else
                return false;
        }
        return true;
    }
    appendText(text) {
        let element;
        if (this._elements.length > 0) {
            element = this._elements[this._elements.length - 1];
            if (element.type == HtmlElementType.Text && element.format.equalStyle(this._format)) {
                element.text += text;
                return;
            }
        }
        element = elementPool.borrow(HtmlElementType.Text);
        element.text = text;
        element.format.copy(this._format);
        this._elements.push(element);
    }
}
var defaultParser = new HtmlParser();

class TextField extends DisplayObject {
    constructor() {
        super();
        this._touchDisabled = true;
        this._graphics = new NGraphics(this.obj3D);
        this._graphics.meshFactory = this;
        this._textFormat = new TextFormat();
        this._fontSizeScale = 1;
        this._wordWrap = false;
        this._text = "";
        this._parsedText = "";
        this._elements = new Array();
        this._lines = new Array();
    }
    get textFormat() {
        return this._textFormat;
    }
    applyFormat() {
        let fontName = this._textFormat.font;
        if (!fontName)
            fontName = UIConfig.defaultFont;
        let newFont = FontManager.getFont(fontName);
        if (this._font != newFont) {
            this._font = newFont;
            this._fontVersion = this._font.version;
            this._graphics.texture = this._font.mainTexture;
            this._graphics.setKeyword("TEXT", this._font.isDynamic);
        }
        if (this._text)
            this._textChanged = true;
    }
    get align() {
        return this._textFormat.align;
    }
    set align(value) {
        if (this._textFormat.align != value) {
            this._textFormat.align = value;
            if (this._text)
                this._textChanged = true;
        }
    }
    get verticalAlign() {
        return this._verticalAlign;
    }
    set verticalAlign(value) {
        if (this._verticalAlign != value) {
            this._verticalAlign = value;
            if (!this._textChanged)
                this.applyVertAlign();
        }
    }
    get text() {
        return this._text;
    }
    set text(value) {
        if (this._text == value && !this._html)
            return;
        this._text = value;
        this._textChanged = true;
        this._html = false;
    }
    get htmlText() {
        return this._text;
    }
    set htmlText(value) {
        if (this._text == value && this._html)
            return;
        this._text = value;
        this._textChanged = true;
        this._html = true;
    }
    get parsedText() {
        return this._parsedText;
    }
    get autoSize() {
        return this._autoSize;
    }
    set autoSize(value) {
        if (this._autoSize != value) {
            this._autoSize = value;
            this._textChanged = true;
        }
    }
    get wordWrap() {
        return this._wordWrap;
    }
    set wordWrap(value) {
        if (this._wordWrap != value) {
            this._wordWrap = value;
            this._textChanged = true;
        }
    }
    get singleLine() {
        return this._singleLine;
    }
    set singleLine(value) {
        if (this._singleLine != value) {
            this._singleLine = value;
            this._textChanged = true;
        }
    }
    get textWidth() {
        if (this._textChanged)
            this.buildLines();
        return this._textWidth;
    }
    get textHeight() {
        if (this._textChanged)
            this.buildLines();
        return this._textHeight;
    }
    get maxWidth() {
        return this._maxWidth;
    }
    set maxWidth(value) {
        if (this._maxWidth != value) {
            this._maxWidth = value;
            this._textChanged = true;
        }
    }
    get htmlElements() {
        if (this._textChanged)
            this.buildLines();
        return this._elements;
    }
    get lines() {
        if (this._textChanged)
            this.buildLines();
        return this._lines;
    }
    get charPositions() {
        if (this._textChanged)
            this.buildLines();
        this._graphics.updateMesh();
        return this._charPositions;
    }
    redraw() {
        if (!this._font)
            this.applyFormat();
        if (this._font.version != this._fontVersion) {
            this._fontVersion = this._font.version;
            this._graphics.texture = this._font.mainTexture;
            this._textChanged = true;
        }
        if (this._textChanged)
            this.buildLines();
        return this._graphics.updateMesh();
    }
    getLinesShape(startLine, startCharX, endLine, endCharX, clipped, result) {
        let line1 = this._lines[startLine];
        let line2 = this._lines[endLine];
        if (startLine == endLine) {
            let r = new Rect();
            r.setMinMax(startCharX, line1.y, endCharX, line1.y + line1.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
        }
        else if (startLine == endLine - 1) {
            let r = new Rect();
            r.setMinMax(startCharX, line1.y, GUTTER_X + line1.width, line1.y + line1.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
            r = new Rect();
            r.setMinMax(GUTTER_X, line1.y + line1.height, endCharX, line2.y + line2.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
        }
        else {
            let r = new Rect();
            r.setMinMax(startCharX, line1.y, GUTTER_X + line1.width, line1.y + line1.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
            for (let i = startLine + 1; i < endLine; i++) {
                let line = this._lines[i];
                r = new Rect();
                r.setMinMax(GUTTER_X, r.yMax, GUTTER_X + line.width, line.y + line.height);
                if (clipped)
                    result.push(r.intersection(this._contentRect));
                else
                    result.push(r);
            }
            r = new Rect();
            r.setMinMax(GUTTER_X, r.yMax, endCharX, line2.y + line2.height);
            if (clipped)
                result.push(r.intersection(this._contentRect));
            else
                result.push(r);
        }
    }
    onSizeChanged() {
        if (!this._updatingSize) {
            if (this._autoSize == AutoSizeType.Shrink || this._wordWrap)
                this._textChanged = true;
            else if (this._autoSize != AutoSizeType.None)
                this._graphics.setMeshDirty();
            if (this._verticalAlign != "top")
                this.applyVertAlign();
        }
        super.onSizeChanged();
    }
    ensureSizeCorrect() {
        if (this._textChanged && this._autoSize != AutoSizeType.None)
            this.buildLines();
    }
    update(clippingPlanes, alpha) {
        this.redraw();
        super.update(clippingPlanes, alpha);
    }
    requestText() {
        if (!this._html) {
            this._font.setFormat(this._textFormat, this._fontSizeScale);
            this._font.prepareCharacters(this._parsedText);
        }
        else {
            let count = this._elements.length;
            for (let i = 0; i < count; i++) {
                let element = this._elements[i];
                if (element.type == HtmlElementType.Text) {
                    this._font.setFormat(element.format, this._fontSizeScale);
                    this._font.prepareCharacters(element.text);
                }
            }
        }
    }
    buildLines() {
        if (!this._font)
            this.applyFormat();
        this._textChanged = false;
        this._graphics.setMeshDirty();
        this._fontSizeScale = 1;
        this.cleanup();
        if (this._text.length == 0) {
            let emptyLine = lineInfoPool.borrow();
            emptyLine.width = 0;
            emptyLine.height = this._font.getLineHeight(this._textFormat.size);
            emptyLine.charIndex = emptyLine.charCount = 0;
            emptyLine.y = emptyLine.y2 = GUTTER_Y;
            this._lines.push(emptyLine);
            this._textWidth = this._textHeight = 0;
        }
        else {
            this.parseText();
            this.buildLines2();
            if (this._autoSize == AutoSizeType.Shrink)
                this.doShrink();
        }
        if (this._autoSize == AutoSizeType.Both) {
            this._updatingSize = true;
            if (this.isInput) {
                let w = Math.max(this._textFormat.size, this._textWidth);
                let h = Math.max(this._font.getLineHeight(this._textFormat.size) + GUTTER_Y * 2, this._textHeight);
                this.setSize(w, h);
            }
            else
                this.setSize(this._textWidth, this._textHeight);
            this._updatingSize = false;
        }
        else if (this._autoSize == AutoSizeType.Height) {
            this._updatingSize = true;
            if (this.isInput)
                this.height = Math.max(this._font.getLineHeight(this._textFormat.size) + GUTTER_Y * 2, this._textHeight);
            else
                this.height = this._textHeight;
            this._updatingSize = false;
        }
        this._yOffset = 0;
        this.applyVertAlign();
    }
    parseText() {
        if (this._html) {
            defaultParser.parse(this._text, this._textFormat, this._elements, this.isRich ? this.htmlParseOptions : null);
            this._parsedText = "";
        }
        else
            this._parsedText = this._text;
        let elementCount = this._elements.length;
        if (elementCount == 0) {
            if (this.isInput)
                this._parsedText = this._parsedText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        }
        else {
            let i = 0;
            while (i < elementCount) {
                let element = this._elements[i];
                element.charIndex = this._parsedText.length;
                if (element.type == HtmlElementType.Text) {
                    if (this.isInput)
                        this._parsedText += element.text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
                    else
                        this._parsedText += element.text;
                }
                else if (element.isEntity)
                    this._parsedText += ' ';
                i++;
            }
        }
    }
    buildLines2() {
        let letterSpacing = this._textFormat.letterSpacing * this._fontSizeScale;
        let lineSpacing = (this._textFormat.lineSpacing - 1) * this._fontSizeScale;
        let rectWidth = this._contentRect.width - GUTTER_X * 2;
        let wordLen = 0;
        let wordPossible = false;
        let posx = 0;
        let format = this._textFormat;
        this._font.setFormat(format, this._fontSizeScale);
        let wrap = this._wordWrap && !this._singleLine;
        if (this._maxWidth > 0) {
            wrap = true;
            rectWidth = this._maxWidth - GUTTER_X * 2;
        }
        this._textWidth = this._textHeight = 0;
        this.requestText();
        let elementCount = this._elements.length;
        let elementIndex = 0;
        let element = null;
        if (elementCount > 0)
            element = this._elements[elementIndex];
        let textLength = this._parsedText.length;
        let line = lineInfoPool.borrow();
        this._lines.push(line);
        line.y = line.y2 = GUTTER_Y;
        let lineChars = sLineCharInfo;
        lineChars.length = 0;
        let glyph = { width: 0, height: 0, baseline: 0 };
        for (let charIndex = 0; charIndex < textLength; charIndex++) {
            let ch = this._parsedText[charIndex];
            glyph.width = glyph.height = glyph.baseline = 0;
            while (element && element.charIndex == charIndex) {
                if (element.type == HtmlElementType.Text) {
                    format = element.format;
                    this._font.setFormat(format, this._fontSizeScale);
                }
                else {
                    let htmlObject = element.htmlObject;
                    if (this.isRich && !htmlObject) {
                        element.space = rectWidth - line.width - 4;
                        htmlObject = this.htmlPageContext.createObject(this, element);
                        element.htmlObject = htmlObject;
                    }
                    if (htmlObject) {
                        glyph.width = htmlObject.width + 2;
                        glyph.height = htmlObject.height;
                        glyph.baseline = glyph.height * IMAGE_BASELINE;
                    }
                    if (element.isEntity)
                        ch = ""; //indicate it is a place holder
                }
                elementIndex++;
                if (elementIndex < elementCount)
                    element = this._elements[elementIndex];
                else
                    element = null;
            }
            if (ch.length == 0 || ch == '\n') {
                wordPossible = false;
            }
            else if (this._font.getGlyph(ch == '\t' ? ' ' : ch, glyph)) {
                if (ch == '\t')
                    glyph.width *= 4;
                if (wordPossible) {
                    if (' \t\n\r\v'.indexOf(ch) != -1) {
                        wordLen = 0;
                    }
                    else if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z'
                        || ch >= '0' && ch <= '9'
                        || ch == '.' || ch == '"' || ch == '\'') {
                        wordLen++;
                    }
                    else
                        wordPossible = false;
                }
                else if (' \t\n\r\v'.indexOf(ch) != -1) {
                    wordLen = 0;
                    wordPossible = true;
                }
                else
                    wordPossible = false;
            }
            else
                wordPossible = false;
            lineChars.push(glyph.width, glyph.height, glyph.baseline);
            if (glyph.width != 0) {
                if (posx != 0)
                    posx += letterSpacing;
                posx += glyph.width;
            }
            if (ch == '\n' && !this._singleLine) {
                this.updateLineInfo(line, letterSpacing, lineChars.length / 3);
                let newLine = lineInfoPool.borrow();
                this._lines.push(newLine);
                newLine.y = line.y + (line.height + lineSpacing);
                if (newLine.y < GUTTER_Y) //lineSpacing maybe negative
                    newLine.y = GUTTER_Y;
                newLine.y2 = newLine.y;
                newLine.charIndex = line.charIndex + line.charCount;
                lineChars.length = 0;
                wordPossible = false;
                posx = 0;
                line = newLine;
            }
            else if (wrap && posx > rectWidth) {
                let lineCharCount = lineChars.length / 3;
                let toMoveChars;
                if (wordPossible && wordLen < 20 && lineCharCount > 2) //if word had broken, move word to new line
                    toMoveChars = wordLen;
                else if (lineCharCount != 1) //only one char here, we cant move it to new line
                    toMoveChars = 1;
                else
                    toMoveChars = 0;
                this.updateLineInfo(line, letterSpacing, lineCharCount - toMoveChars);
                let newLine = lineInfoPool.borrow();
                this._lines.push(newLine);
                newLine.y = line.y + (line.height + lineSpacing);
                if (newLine.y < GUTTER_Y)
                    newLine.y = GUTTER_Y;
                newLine.y2 = newLine.y;
                newLine.charIndex = line.charIndex + line.charCount;
                posx = 0;
                if (toMoveChars != 0) {
                    for (let i = line.charCount; i < lineCharCount; i++) {
                        if (posx != 0)
                            posx += letterSpacing;
                        posx += lineChars[i * 3];
                    }
                    for (let i = 0; i < line.charCount * 3; i++)
                        lineChars.shift();
                }
                else
                    lineChars.length = 0;
                wordPossible = false;
                line = newLine;
            }
        }
        this.updateLineInfo(line, letterSpacing, lineChars.length / 3);
        if (this._textWidth > 0)
            this._textWidth += GUTTER_X * 2;
        this._textHeight = line.y + line.height + GUTTER_Y;
        this._textWidth = Math.round(this._textWidth);
        this._textHeight = Math.round(this._textHeight);
    }
    updateLineInfo(line, letterSpacing, cnt) {
        let lineChars = sLineCharInfo;
        for (let i = 0; i < cnt * 3; i += 3) {
            let width = lineChars[i];
            let height = lineChars[i + 1];
            let baseline = lineChars[i + 2];
            if (baseline > line.baseline) {
                line.height += (baseline - line.baseline);
                line.baseline = baseline;
            }
            if (height - baseline > line.height - line.baseline)
                line.height += (height - baseline - (line.height - line.baseline));
            if (width > 0) {
                if (line.width != 0)
                    line.width += letterSpacing;
                line.width += width;
            }
        }
        if (line.height == 0) {
            if (this._lines.length == 1)
                line.height = this._textFormat.size;
            else
                line.height = this._lines[this._lines.length - 2].height;
        }
        if (line.width > this._textWidth)
            this._textWidth = line.width;
        line.charCount = cnt;
    }
    doShrink() {
        if (this._lines.length > 1 && this._textHeight > this._contentRect.height) {
            //多行的情况，涉及到自动换行，得用二分法查找最合适的比例，会消耗多一点计算资源
            let low = 0;
            let high = this._textFormat.size;
            //先尝试猜测一个比例
            this._fontSizeScale = Math.sqrt(this._contentRect.height / this._textHeight);
            let cur = Math.floor(this._fontSizeScale * this._textFormat.size);
            while (true) {
                lineInfoPool.returns(this._lines);
                this.buildLines2();
                if (this._textWidth > this._contentRect.width || this._textHeight > this._contentRect.height)
                    high = cur;
                else
                    low = cur;
                if (high - low > 1 || high != low && cur == high) {
                    cur = low + (high - low) / 2;
                    this._fontSizeScale = cur / this._textFormat.size;
                }
                else
                    break;
            }
        }
        else if (this._textWidth > this._contentRect.width) {
            this._fontSizeScale = this._contentRect.width / this._textWidth;
            lineInfoPool.returns(this._lines);
            this.buildLines2();
            if (this._textWidth > this._contentRect.width) //如果还超出，缩小一点再来一次
             {
                let size = Math.floor(this._textFormat.size * this._fontSizeScale);
                size--;
                this._fontSizeScale = size / this._textFormat.size;
                lineInfoPool.returns(this._lines);
                this.buildLines2();
            }
        }
    }
    onPopulateMesh(vb) {
        if (this._textWidth == 0 && this._lines.length == 1) {
            if (this._charPositions) {
                charPosPool.returns(this._charPositions);
                this._charPositions.push(charPosPool.borrow());
            }
            this.refreshObjects();
            return;
        }
        let letterSpacing = this._textFormat.letterSpacing * this._fontSizeScale;
        let format = this._textFormat;
        this._font.setFormat(format, this._fontSizeScale);
        let rectWidth = this._contentRect.width > 0 ? (this._contentRect.width - GUTTER_X * 2) : 0;
        let rectHeight = this._contentRect.height > 0 ? Math.max(this._contentRect.height, this._font.getLineHeight(format.size)) : 0;
        if (this._charPositions)
            charPosPool.returns(this._charPositions);
        let currentLink = null;
        let linkStartX = 0;
        let linkStartLine = 0;
        let posx = 0;
        let indent_x;
        let clipping = !this.isInput && this._autoSize == AutoSizeType.None;
        let lineClipped;
        let lineAlign;
        let vertCount;
        let underlineStart;
        let strikethroughStart;
        let minFontSize;
        let maxFontSize;
        let elementIndex = 0;
        let elementCount = this._elements.length;
        let element = null;
        if (elementCount > 0)
            element = this._elements[elementIndex];
        let glyph = { width: 0, height: 0, baseline: 0 };
        let lineCount = this._lines.length;
        for (let i = 0; i < lineCount; ++i) {
            let line = this._lines[i];
            if (line.charCount == 0)
                continue;
            lineClipped = clipping && i != 0 && line.y + line.height > rectHeight;
            lineAlign = format.align;
            if (element && element.charIndex == line.charIndex)
                lineAlign = element.format.align;
            else
                lineAlign = format.align;
            if (lineAlign == "center")
                indent_x = Math.floor((rectWidth - line.width) / 2);
            else if (lineAlign == "right")
                indent_x = rectWidth - line.width;
            else
                indent_x = 0;
            if (indent_x < 0)
                indent_x = 0;
            posx = GUTTER_X + indent_x;
            let lineCharCount = line.charCount;
            underlineStart = posx;
            strikethroughStart = posx;
            minFontSize = maxFontSize = format.size;
            for (let j = 0; j < lineCharCount; j++) {
                let charIndex = line.charIndex + j;
                let ch = this._parsedText[charIndex];
                while (element && charIndex == element.charIndex) {
                    if (element.type == HtmlElementType.Text) {
                        vertCount = 0;
                        if (format.underline != element.format.underline) {
                            if (format.underline) {
                                if (!lineClipped) {
                                    let lineWidth = underlineStart - (clipping ? clamp(posx, GUTTER_X, GUTTER_X + rectWidth) : posx);
                                    if (lineWidth > 0)
                                        vertCount += this._font.drawLine(underlineStart < posx ? underlineStart : posx, -(line.y + line.baseline), lineWidth, maxFontSize, 0, vb);
                                }
                                maxFontSize = 0;
                            }
                            else
                                underlineStart = posx;
                        }
                        if (format.strikethrough != element.format.strikethrough) {
                            if (format.strikethrough) {
                                if (!lineClipped) {
                                    let lineWidth = strikethroughStart - (clipping ? clamp(posx, GUTTER_X, GUTTER_X + rectWidth) : posx);
                                    if (lineWidth > 0)
                                        vertCount += this._font.drawLine(strikethroughStart < posx ? strikethroughStart : posx, -(line.y + line.baseline), lineWidth, minFontSize, 1, vb);
                                }
                                minFontSize = Number.POSITIVE_INFINITY;
                            }
                            else
                                strikethroughStart = posx;
                        }
                        if (vertCount > 0 && this._charPositions) {
                            let cp = this._charPositions[this._charPositions.length - 1];
                            cp.vertCount += vertCount;
                            this._charPositions[this._charPositions.length - 1] = cp;
                        }
                        format = element.format;
                        minFontSize = Math.min(minFontSize, format.size);
                        maxFontSize = Math.max(maxFontSize, format.size);
                        this._font.setFormat(format, this._fontSizeScale);
                    }
                    else if (element.type == HtmlElementType.Link) {
                        currentLink = element.htmlObject;
                        if (currentLink) {
                            element.position.set(0, 0);
                            currentLink.setPosition(0, 0);
                            linkStartX = posx;
                            linkStartLine = i;
                        }
                    }
                    else if (element.type == HtmlElementType.LinkEnd) {
                        if (currentLink) {
                            currentLink.setArea(linkStartLine, linkStartX, i, posx);
                            currentLink = null;
                        }
                    }
                    else {
                        let htmlObj = element.htmlObject;
                        if (htmlObj) {
                            if (this._charPositions) {
                                let cp = charPosPool.borrow();
                                cp.lineIndex = i;
                                cp.charIndex = this._charPositions.length;
                                cp.imgIndex = elementIndex + 1;
                                cp.offsetX = posx;
                                cp.width = htmlObj.width;
                                this._charPositions.push(cp);
                            }
                            if (lineClipped || clipping && (posx < GUTTER_X || posx > GUTTER_X && posx + htmlObj.width > this._contentRect.width - GUTTER_X))
                                element.status |= 1;
                            else
                                element.status &= 254;
                            element.position = new Vector2(posx + 1, line.y + line.baseline - htmlObj.height * IMAGE_BASELINE);
                            htmlObj.setPosition(element.position.x, element.position.y);
                            posx += htmlObj.width + letterSpacing + 2;
                        }
                    }
                    if (element.isEntity)
                        ch = '\0';
                    elementIndex++;
                    if (elementIndex < elementCount)
                        element = this._elements[elementIndex];
                    else
                        element = null;
                }
                if (ch == '\0')
                    continue;
                if (this._font.getGlyph(ch == '\t' ? ' ' : ch, glyph)) {
                    if (ch == '\t')
                        glyph.width *= 4;
                    if (lineClipped || clipping && (rectWidth < 7 || posx != (GUTTER_X + indent_x)) && posx + glyph.width > this._contentRect.width - GUTTER_X + 0.5) //超出区域，剪裁
                     {
                        posx += letterSpacing + glyph.width;
                        continue;
                    }
                    vertCount = this._font.drawGlyph(posx, -(line.y + line.baseline), vb);
                    if (this._charPositions) {
                        let cp = charPosPool.borrow();
                        cp.lineIndex = i;
                        cp.charIndex = this._charPositions.length;
                        cp.vertCount = vertCount;
                        cp.offsetX = posx;
                        cp.width = glyph.width;
                        this._charPositions.push(cp);
                    }
                    posx += letterSpacing + glyph.width;
                }
                else //if GetGlyph failed
                 {
                    if (this._charPositions) {
                        let cp = charPosPool.borrow();
                        cp.lineIndex = i;
                        cp.charIndex = this._charPositions.length;
                        cp.offsetX = posx;
                        this._charPositions.push(cp);
                    }
                    posx += letterSpacing;
                }
            } //text loop
            if (!lineClipped) {
                vertCount = 0;
                if (format.underline) {
                    let lineWidth = underlineStart - (clipping ? clamp(posx, GUTTER_X, GUTTER_X + rectWidth) : posx);
                    if (lineWidth > 0)
                        vertCount += this._font.drawLine(underlineStart < posx ? underlineStart : posx, -(line.y + line.baseline), lineWidth, maxFontSize, 0, vb);
                }
                if (format.strikethrough) {
                    let lineWidth = strikethroughStart - (clipping ? clamp(posx, GUTTER_X, GUTTER_X + rectWidth) : posx);
                    if (lineWidth > 0)
                        vertCount += this._font.drawLine(strikethroughStart < posx ? strikethroughStart : posx, -(line.y + line.baseline), lineWidth, minFontSize, 1, vb);
                }
                if (vertCount > 0 && this._charPositions) {
                    let cp = this._charPositions[this._charPositions.length - 1];
                    cp.vertCount += vertCount;
                }
            }
        } //line loop
        if (element && element.type == HtmlElementType.LinkEnd && currentLink)
            currentLink.setArea(linkStartLine, linkStartX, lineCount - 1, posx);
        if (this._charPositions) {
            let cp = charPosPool.borrow();
            cp.lineIndex = lineCount - 1;
            cp.charIndex = this._charPositions.length;
            cp.offsetX = posx;
            this._charPositions.push(cp);
        }
        this.refreshObjects();
    }
    cleanup() {
        this.cleanupObjects();
        elementPool.returns(this._elements);
        lineInfoPool.returns(this._lines);
        this._textWidth = 0;
        this._textHeight = 0;
        this._parsedText = "";
        if (this._charPositions)
            charPosPool.returns(this._charPositions);
    }
    applyVertAlign() {
        let oldOffset = this._yOffset;
        if (this._autoSize == AutoSizeType.Both || this._autoSize == AutoSizeType.Height
            || this._verticalAlign == "top")
            this._yOffset = 0;
        else {
            let dh;
            if (this._textHeight == 0 && this._lines.length > 0)
                dh = this._contentRect.height - this._lines[0].height;
            else
                dh = this._contentRect.height - this._textHeight;
            if (dh < 0)
                dh = 0;
            if (this._verticalAlign == "middle")
                this._yOffset = Math.floor(dh / 2);
            else
                this._yOffset = dh;
        }
        if (oldOffset != this._yOffset) {
            let cnt = this._lines.length;
            for (let i = 0; i < cnt; i++)
                this._lines[i].y = this._lines[i].y2 + this._yOffset;
            this._graphics.setMeshDirty();
        }
    }
    refreshObjects() {
    }
    cleanupObjects() {
    }
}
const GUTTER_X = 2;
const GUTTER_Y = 2;
const IMAGE_BASELINE = 0.8;
var sLineCharInfo = new Array();
class LineInfo {
}
var lineInfoPool = new Pool(LineInfo, ele => {
    ele.width = ele.height = ele.baseline = ele.y = ele.y2 = ele.charIndex = ele.charCount = 0;
});
class CharPosition {
}
var charPosPool = new Pool(CharPosition);

class UBBParser {
    constructor() {
        this._readPos = 0;
        this.defaultImgWidth = 0;
        this.defaultImgHeight = 0;
        this._handlers = {};
        this._handlers["url"] = this.onTag_URL;
        this._handlers["img"] = this.onTag_IMG;
        this._handlers["b"] = this.onTag_B;
        this._handlers["i"] = this.onTag_I;
        this._handlers["u"] = this.onTag_U;
        this._handlers["sup"] = this.onTag_Simple;
        this._handlers["sub"] = this.onTag_Simple;
        this._handlers["color"] = this.onTag_COLOR;
        this._handlers["font"] = this.onTag_FONT;
        this._handlers["size"] = this.onTag_SIZE;
    }
    onTag_URL(tagName, end, attr) {
        if (!end) {
            if (attr != null)
                return "<a href=\"" + attr + "\">";
            else {
                var href = this.getTagText();
                return "<a href=\"" + href + "\">";
            }
        }
        else
            return "</a>";
    }
    onTag_IMG(tagName, end, attr) {
        if (!end) {
            var src = this.getTagText(true);
            if (!src)
                return null;
            if (this.defaultImgWidth)
                return "<img src=\"" + src + "\" width=\"" + this.defaultImgWidth + "\" height=\"" + this.defaultImgHeight + "\"/>";
            else
                return "<img src=\"" + src + "\"/>";
        }
        else
            return null;
    }
    onTag_B(tagName, end, attr) {
        return end ? ("</b>") : ("<b>");
    }
    onTag_I(tagName, end, attr) {
        return end ? ("</i>") : ("<i>");
    }
    onTag_U(tagName, end, attr) {
        return end ? ("</u>") : ("<u>");
    }
    onTag_Simple(tagName, end, attr) {
        return end ? ("</" + tagName + ">") : ("<" + tagName + ">");
    }
    onTag_COLOR(tagName, end, attr) {
        if (!end) {
            this.lastColor = attr;
            return "<font color=\"" + attr + "\">";
        }
        else
            return "</font>";
    }
    onTag_FONT(tagName, end, attr) {
        if (!end)
            return "<font face=\"" + attr + "\">";
        else
            return "</font>";
    }
    onTag_SIZE(tagName, end, attr) {
        if (!end) {
            this.lastSize = attr;
            return "<font size=\"" + attr + "\">";
        }
        else
            return "</font>";
    }
    getTagText(remove) {
        var pos1 = this._readPos;
        var pos2;
        var result = "";
        while ((pos2 = this._text.indexOf("[", pos1)) != -1) {
            if (this._text.charCodeAt(pos2 - 1) == 92) //\
             {
                result += this._text.substring(pos1, pos2 - 1);
                result += "[";
                pos1 = pos2 + 1;
            }
            else {
                result += this._text.substring(pos1, pos2);
                break;
            }
        }
        if (pos2 == -1)
            return null;
        if (remove)
            this._readPos = pos2;
        return result;
    }
    parse(text, remove) {
        this._text = text;
        this.lastColor = null;
        this.lastSize = null;
        var pos1 = 0, pos2, pos3;
        var end;
        var tag, attr;
        var repl;
        var func;
        var result = "";
        while ((pos2 = this._text.indexOf("[", pos1)) != -1) {
            if (pos2 > 0 && this._text.charCodeAt(pos2 - 1) == 92) //\
             {
                result += this._text.substring(pos1, pos2 - 1);
                result += "[";
                pos1 = pos2 + 1;
                continue;
            }
            result += this._text.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = this._text.indexOf("]", pos1);
            if (pos2 == -1)
                break;
            end = this._text.charAt(pos1 + 1) == '/';
            tag = this._text.substring(end ? pos1 + 2 : pos1 + 1, pos2);
            this._readPos = pos2 + 1;
            attr = null;
            repl = null;
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
                attr = tag.substring(pos3 + 1);
                tag = tag.substring(0, pos3);
            }
            tag = tag.toLowerCase();
            func = this._handlers[tag];
            if (func != null) {
                if (!remove) {
                    repl = func.call(this, tag, end, attr);
                    if (repl != null)
                        result += repl;
                }
            }
            else
                result += this._text.substring(pos1, this._readPos);
            pos1 = this._readPos;
        }
        if (pos1 < this._text.length)
            result += this._text.substr(pos1);
        this._text = null;
        return result;
    }
}
var defaultParser$1 = new UBBParser();

class InputTextField extends TextField {
    constructor() {
        super();
        this._touchDisabled = false;
        this.opaque = true;
        this.isInput = true;
        this._text2 = '';
        this.maxLength = 0;
        this.editable = true;
        this._borderColor = new Color4();
        this._backgroundColor = new Color4(0xFFFFFF, 0);
        this.on("focus_in", this.__focusIn, this, true);
        this.on("focus_out", this.__focusOut, this, true);
        this.on("removed_from_stage", this.__removed, this);
    }
    get text() {
        if (this._editing)
            this._text2 = this._element.value;
        return this._text2;
    }
    set text(value) {
        this._text2 = value;
        this.updateText();
    }
    get promptText() {
        return this._promptText;
    }
    set promptText(value) {
        this._promptText = value;
        this._decodedPromptText = defaultParser$1.parse(value);
        this.updateText();
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    updateText() {
        if (this._editing)
            this._element.value = this._text2;
        else if (this._text2.length == 0 && this._promptText)
            super.htmlText = this._decodedPromptText;
        else if (this._password)
            super.text = "*".repeat(this._text2.length);
        else
            super.text = this._text2;
    }
    onSizeChanged() {
        super.onSizeChanged();
        if (!this._clipRect)
            this._clipRect = new Rect();
        this._clipRect.copy(this._contentRect);
        this._clipRect.x += GUTTER_X;
        this._clipRect.y += GUTTER_Y;
        this._clipRect.width -= GUTTER_X * 2;
        this._clipRect.height -= GUTTER_Y * 2;
    }
    applyFormat() {
        super.applyFormat();
        if (this._element)
            this.setFormat();
    }
    createElement() {
        let e;
        if (this.singleLine) {
            e = this._element = document.createElement("input");
        }
        else {
            e = this._element = document.createElement("textarea");
            e.style.resize = "none";
            e.style.overflow = "scroll";
        }
        e.id = 'InputText';
        e.style.outline = "none";
        e.style.borderWidth = "0px";
        e.style.padding = "0px";
        e.style.margin = "0px";
        e.style.position = "absolute";
        e.style.display = "none";
        e.style.background = 'transparent';
        e.style.transformOrigin = e.style["WebkitTransformOrigin"] = "0 0 0";
        Stage.domElement.parentNode.appendChild(e);
        e.onblur = () => { Stage.setFocus(null); };
        this.setFormat();
    }
    setFormat() {
        let e = this._element;
        e.style.font = this._textFormat.size + "px " + this._font.name;
        e.style.color = convertToHtmlColor(this._textFormat.color);
        e.style.webkitTextStroke = this._textFormat.outline + "px " + convertToHtmlColor(this._textFormat.outlineColor);
        e.style.textAlign = this._textFormat.align;
    }
    dispose() {
        super.dispose();
        if (this._element) {
            this._element.style.display = 'none';
            if (this._element.parentNode)
                this._element.parentNode.removeChild(this._element);
            this._element = null;
        }
    }
    __focusIn() {
        if (!this.editable || this._editing)
            return;
        if (!this._font)
            this.applyFormat();
        if (!this._element)
            this.createElement();
        let e = this._element;
        e.style.display = "inline-block";
        this.locateInputElement();
        e.value = this._text2;
        //e.maxLength = this.maxLength;
        e.focus();
        this._editing = true;
        this._graphics.material.visible = false;
        this.dispatchEvent("focus_in");
    }
    locateInputElement() {
        this.localToGlobal(0, 0, s_pos);
        this.localToGlobal(1, 1, s_scale);
        s_scale.sub(s_pos);
        s_mat$1.getInverse(Stage.canvasTransform);
        s_tmp.set(s_pos.x, s_pos.y, 0);
        s_tmp.applyMatrix4(s_mat$1);
        s_pos.set(s_tmp.x, s_tmp.y);
        let rot = 0;
        if (s_mat$1.elements[1] > 0)
            rot = 90;
        else if (s_mat$1.elements[1] < 0)
            rot = -90;
        let style = this._element.style;
        style.width = this.width.toFixed(2) + "px";
        style.height = this.height.toFixed(2) + "px";
        style.left = (s_pos.x + 2) + "px";
        style.top = s_pos.y + "px";
        style.transform = style.webkitTransform = "scale(" + s_scale.x.toFixed(3) + "," + s_scale.y.toFixed(3) + ") rotate(" + rot + "deg)";
    }
    __focusOut() {
        if (!this._editing)
            return;
        this._element.style.display = "none";
        this._element.blur();
        this._text2 = this._element.value;
        this._editing = false;
        this.updateText();
        this._graphics.material.visible = true;
        if (this.stage)
            this.dispatchEvent("focus_out");
    }
    __removed() {
        if (this._editing)
            Stage.setFocus(null);
    }
}
var s_pos = new Vector2();
var s_scale = new Vector2();
var s_mat$1 = new Matrix4();
var s_tmp = new Vector3();

class GTextField extends GObject {
    constructor() {
        super();
        let tf = this._textField.textFormat;
        tf.font = UIConfig.defaultFont;
        tf.size = 12;
        tf.lineSpacing = 3;
        this._textField.applyFormat();
        this._text = "";
        this._textField.autoSize = AutoSizeType.Both;
        this._textField.wordWrap = false;
    }
    createDisplayObject() {
        this._displayObject = this._textField = new TextField();
    }
    get text() {
        if (this._displayObject instanceof InputTextField)
            this._text = this._textField.text;
        return this._text;
    }
    set text(value) {
        if (value == null)
            value = "";
        this._text = value;
        this.setText();
        this.updateSize();
        this.updateGear(6);
    }
    setText() {
        let str = this._text;
        if (this._template)
            str = this.parseTemplate(str);
        this._textField.maxWidth = this.maxWidth;
        if (this._ubbEnabled)
            this._textField.htmlText = defaultParser$1.parse(XMLUtils.encodeString(str));
        else
            this._textField.text = str;
    }
    get textTemplate() {
        return this._template;
    }
    set textTemplate(value) {
        if (!this._template && !value)
            return;
        this._template = value;
        this.flushVars();
    }
    setVar(name, value) {
        if (!this._template)
            this._template = {};
        this._template[name] = value;
        return this;
    }
    flushVars() {
        this.setText();
        this.updateSize();
    }
    get textFormat() {
        return this._textField.textFormat;
    }
    applyFormat() {
        this._textField.applyFormat();
        if (!this._underConstruct)
            this.updateSize();
    }
    get align() {
        return this._textField.align;
    }
    set align(value) {
        this._textField.align = value;
    }
    get verticalAlign() {
        return this._textField.verticalAlign;
    }
    set verticalAlign(value) {
        this._textField.verticalAlign = value;
    }
    get singleLine() {
        return this._textField.singleLine;
    }
    set singleLine(value) {
        this._textField.singleLine = value;
    }
    set ubbEnabled(value) {
        this._ubbEnabled = value;
    }
    get ubbEnabled() {
        return this._ubbEnabled;
    }
    get autoSize() {
        return this._textField.autoSize;
    }
    set autoSize(value) {
        this._textField.autoSize = value;
        if (value == AutoSizeType.Both) {
            this._textField.wordWrap = false;
            if (!this._underConstruct)
                this.setSize(this._textField.textWidth, this._textField.textHeight);
        }
        else {
            this._textField.wordWrap = true;
            if (value == AutoSizeType.Height) {
                if (!this._underConstruct) {
                    this._textField.width = this.width;
                    this.height = this._textField.textHeight;
                }
            }
            else
                this._textField.setSize(this.width, this.height);
        }
    }
    get textWidth() {
        return this._textField.textWidth;
    }
    get textHeight() {
        return this._textField.textHeight;
    }
    get color() {
        return this._textField.textFormat.color;
    }
    set color(value) {
        if (this._textField.textFormat.color != value) {
            // if (this.grayed)
            //     this._textField.color = "#AAAAAA";
            // else
            //     this._textField.color = this._color;
            this._textField.textFormat.color = value;
            this._textField.applyFormat();
            this.updateGear(4);
        }
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.color;
            case ObjectPropID.OutlineColor:
                return this._textField.textFormat.outlineColor;
            case ObjectPropID.FontSize:
                return this._textField.textFormat.size;
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.color = value;
                break;
            case ObjectPropID.OutlineColor:
                this._textField.textFormat.outlineColor = value;
                this._textField.applyFormat();
                break;
            case ObjectPropID.FontSize:
                this._textField.textFormat.size = value;
                this._textField.applyFormat();
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    updateSize() {
        if (this._updatingSize)
            return;
        this._updatingSize = true;
        if (this._textField.autoSize == AutoSizeType.Both) {
            this.setSize(this._textField.width, this._textField.height);
        }
        else if (this._textField.autoSize == AutoSizeType.Height) {
            this.height = this._textField.height;
        }
        this._updatingSize = false;
    }
    handleSizeChanged() {
        if (this._updatingSize)
            return;
        if (this._underConstruct)
            this._textField.setSize(this.width, this.height);
        else if (this._textField.autoSize != AutoSizeType.Both) {
            if (this._textField.autoSize == AutoSizeType.Height) {
                this._textField.width = this.width; //先调整宽度，让文本重排
                if (this._text != "") //文本为空时，1是本来就不需要调整， 2是为了防止改掉文本为空时的默认高度，造成关联错误
                    this.setSizeDirectly(this.width, this._textField.height);
            }
            else
                this._textField.setSize(this.width, this.height);
        }
    }
    // protected handleGrayedChanged(): void {
    //     super.handleGrayedChanged();
    //     if (this.grayed)
    //         this._textField.color = "#AAAAAA";
    //     else
    //         this._textField.color = this._color;
    // }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        let tf = this._textField.textFormat;
        tf.font = buffer.readS();
        tf.size = buffer.readShort();
        tf.color = buffer.readColor();
        let c = buffer.readByte();
        this.align = c == 0 ? "left" : (c == 1 ? "center" : "right");
        c = buffer.readByte();
        this.verticalAlign = c == 0 ? "top" : (c == 1 ? "middle" : "bottom");
        tf.lineSpacing = buffer.readShort();
        tf.letterSpacing = buffer.readShort();
        this.ubbEnabled = buffer.readBool();
        this.autoSize = buffer.readByte();
        tf.underline = buffer.readBool();
        tf.italic = buffer.readBool();
        tf.bold = buffer.readBool();
        this.singleLine = buffer.readBool();
        if (buffer.readBool()) {
            tf.outlineColor = buffer.readColor();
            tf.outline = buffer.readFloat() + 1;
        }
        if (buffer.readBool()) //shadow
         {
            tf.shadowColor = buffer.readColor();
            let f1 = buffer.readFloat();
            let f2 = buffer.readFloat();
            tf.shadowOffset.set(f1, f2);
        }
        if (buffer.readBool())
            this._template = {};
        if (buffer.version >= 3)
            tf.strikethrough = buffer.readBool();
        this._textField.applyFormat();
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        buffer.seek(beginPos, 6);
        var str = buffer.readS();
        if (str != null)
            this.text = str;
    }
    parseTemplate(template) {
        var pos1 = 0, pos2, pos3;
        var tag;
        var value;
        var result = "";
        while ((pos2 = template.indexOf("{", pos1)) != -1) {
            if (pos2 > 0 && template.charCodeAt(pos2 - 1) == 92) //\
             {
                result += template.substring(pos1, pos2 - 1);
                result += "{";
                pos1 = pos2 + 1;
                continue;
            }
            result += template.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = template.indexOf("}", pos1);
            if (pos2 == -1)
                break;
            if (pos2 == pos1 + 1) {
                result += template.substr(pos1, 2);
                pos1 = pos2 + 1;
                continue;
            }
            tag = template.substring(pos1 + 1, pos2);
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
                value = this._template[tag.substring(0, pos3)];
                if (value == null)
                    result += tag.substring(pos3 + 1);
                else
                    result += value;
            }
            else {
                value = this._template[tag];
                if (value != null)
                    result += value;
            }
            pos1 = pos2 + 1;
        }
        if (pos1 < template.length)
            result += template.substr(pos1);
        return result;
    }
}

class HtmlImage {
    constructor() {
        this.loader = Decls$1.UIObjectFactory.newObject(ObjectType.Loader);
        this.loader.fill = LoaderFillType.ScaleFree;
        this.loader.touchable = false;
    }
    get displayObject() {
        return this.loader.displayObject;
    }
    get element() {
        return this._element;
    }
    get width() {
        return this.loader.width;
    }
    get height() {
        return this.loader.height;
    }
    create(owner, element) {
        this._owner = owner;
        this._element = element;
        let sourceWidth = 0;
        let sourceHeight = 0;
        let src = element.getAttrString("src");
        if (src != null) {
            let pi = UIPackage.getItemByURL(src);
            if (pi) {
                sourceWidth = pi.width;
                sourceHeight = pi.height;
            }
        }
        this.loader.url = src;
        let width = element.getAttrInt("width", sourceWidth);
        let height = element.getAttrInt("height", sourceHeight);
        if (width == 0)
            width = 5;
        if (height == 0)
            height = 10;
        this.loader.setSize(width, height);
    }
    setPosition(x, y) {
        this.loader.setPosition(x, y);
    }
    add() {
        this._owner.addChild(this.loader.displayObject);
    }
    remove() {
        if (this.loader.displayObject.parent)
            this._owner.removeChild(this.loader.displayObject);
    }
    release() {
        this.loader.offAll();
        this.loader.url = null;
        this._owner = null;
        this._element = null;
    }
    dispose() {
        this.loader.dispose();
    }
}

var s_rect$7 = new Rect();
class SelectionShape extends DisplayObject {
    constructor() {
        super();
        this.rects = new Array();
        this._graphics = new NGraphics(this._obj3D);
        this._graphics.texture = EmptyTexture;
    }
    refresh() {
        let count = this.rects.length;
        if (count > 0) {
            s_rect$7.copy(this.rects[0]);
            for (let i = 1; i < count; i++)
                s_rect$7.union(this.rects[i]);
            this.setSize(s_rect$7.xMax, s_rect$7.yMax);
        }
        else
            this.setSize(0, 0);
        this.graphics.setMeshDirty();
    }
    clear() {
        this.rects.length = 0;
        this.graphics.setMeshDirty();
    }
    onPopulateMesh(vb) {
        let count = this.rects.length;
        if (count == 0)
            return;
        for (let i = 0; i < count; i++)
            vb.addQuad(this.rects[i]);
        vb.addTriangles();
    }
    hitTest(context) {
        let pt = context.getLocal(this);
        if (this._contentRect.contains(pt)) {
            let count = this.rects.length;
            for (let i = 0; i < count; i++) {
                if (this.rects[i].contains(pt))
                    return this;
            }
        }
        return null;
    }
}

class HtmlLink {
    constructor() {
        this._shape = new SelectionShape();
        this._shape.on("click", () => {
            bubbleEvent(this._owner.obj3D, "click_link", this._element.getAttrString("href"));
        });
    }
    get displayObject() {
        return this._shape;
    }
    get element() {
        return this._element;
    }
    get width() {
        return 0;
    }
    get height() {
        return 0;
    }
    create(owner, element) {
        this._owner = owner;
        this._element = element;
    }
    setArea(startLine, startCharX, endLine, endCharX) {
        if (startLine == endLine && startCharX > endCharX) {
            let tmp = startCharX;
            startCharX = endCharX;
            endCharX = tmp;
        }
        this._shape.rects.length = 0;
        this._owner.getLinesShape(startLine, startCharX, endLine, endCharX, true, this._shape.rects);
        this._shape.refresh();
    }
    setPosition(x, y) {
        this._shape.setPosition(x, y);
    }
    add() {
        this._owner.addChild(this._shape);
    }
    remove() {
        if (this._shape.parent)
            this._owner.removeChild(this._shape);
    }
    release() {
        this._shape.offAll();
        this._owner = null;
        this._element = null;
    }
    dispose() {
        this._shape.dispose();
    }
}

class HtmlPageContext {
    constructor() {
        this._imagePool = new Pool(HtmlImage);
        this._linkPool = new Pool(HtmlLink);
    }
    createObject(owner, element) {
        let ret = null;
        if (element.type == HtmlElementType.Image)
            ret = this._imagePool.borrow();
        else if (element.type == HtmlElementType.Link)
            ret = this._linkPool.borrow();
        if (ret)
            ret.create(owner, element);
        return ret;
    }
    freeObject(obj) {
        obj.release();
        if (obj instanceof HtmlImage)
            this._imagePool.returns(obj);
        else if (obj instanceof HtmlLink)
            this._linkPool.returns(obj);
    }
}
var defaultContext = new HtmlPageContext();

class RichTextField extends TextField {
    constructor() {
        super();
        this._touchDisabled = false;
        this.opaque = true;
        this.isRich = true;
        this.htmlPageContext = defaultContext;
        this.htmlParseOptions = new HtmlParseOptions();
    }
    getHtmlElement(name) {
        let elements = this.htmlElements;
        let count = elements.length;
        for (let i = 0; i < count; i++) {
            let element = elements[i];
            if (name == element.name)
                return element;
        }
        return null;
    }
    showHtmlObject(index, show) {
        let element = this.htmlElements[index];
        if (element.htmlObject && element.type != HtmlElementType.Link) {
            //set hidden flag
            if (show)
                element.status &= 253; //~(1<<1)
            else
                element.status |= 2;
            if ((element.status & 3) == 0) //not (hidden and clipped)
             {
                if ((element.status & 4) == 0) //not added
                 {
                    element.status |= 4;
                    element.htmlObject.add();
                }
            }
            else {
                if ((element.status & 4) != 0) //added
                 {
                    element.status &= 251;
                    element.htmlObject.remove();
                }
            }
        }
    }
    dispose() {
        this.cleanupObjects();
        super.dispose();
    }
    cleanupObjects() {
        let elements = this.htmlElements;
        let count = elements.length;
        for (let i = 0; i < count; i++) {
            let element = elements[i];
            if (element.htmlObject) {
                element.htmlObject.remove();
                this.htmlPageContext.freeObject(element.htmlObject);
            }
        }
    }
    refreshObjects() {
        let elements = this.htmlElements;
        let count = elements.length;
        for (let i = 0; i < count; i++) {
            let element = elements[i];
            if (element.htmlObject) {
                if ((element.status & 3) == 0) //not (hidden and clipped)
                 {
                    if ((element.status & 4) == 0) //not added
                     {
                        element.status |= 4;
                        element.htmlObject.add();
                    }
                }
                else {
                    if ((element.status & 4) != 0) //added
                     {
                        element.status &= 251;
                        element.htmlObject.remove();
                    }
                }
            }
        }
    }
}

class GRichTextField extends GTextField {
    constructor() {
        super();
    }
    createDisplayObject() {
        this._displayObject = this._textField = new RichTextField();
    }
    setText() {
        let str = this._text;
        if (this._template)
            str = this.parseTemplate(str);
        this._textField.maxWidth = this.maxWidth;
        if (this._ubbEnabled)
            this._textField.htmlText = defaultParser$1.parse(str);
        else
            this._textField.htmlText = str;
    }
}

class GTextInput extends GTextField {
    constructor() {
        super();
    }
    createDisplayObject() {
        this._displayObject = this._textField = new InputTextField();
    }
    get password() {
        return this._textField.password;
    }
    set password(value) {
        this._textField.password = value;
    }
    get keyboardType() {
        return this._textField.keyboardType;
    }
    set keyboardType(value) {
        this._textField.keyboardType = value;
    }
    set editable(value) {
        this._textField.editable = value;
    }
    get editable() {
        return this._textField.editable;
    }
    set maxLength(value) {
        this._textField.maxLength = value;
    }
    get maxLength() {
        return this._textField.maxLength;
    }
    set promptText(value) {
        this._textField.promptText = value;
    }
    get promptText() {
        return this._textField.promptText;
    }
    set restrict(value) {
        this._textField.restrict = value;
    }
    get restrict() {
        return this._textField.restrict;
    }
    requestFocus() {
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 4);
        var str = buffer.readS();
        if (str != null)
            this.promptText = str;
        str = buffer.readS();
        if (str != null)
            this.restrict = str;
        var iv = buffer.readInt();
        if (iv != 0)
            this.maxLength = iv;
        iv = buffer.readInt();
        if (iv != 0) {
            if (iv == 4)
                this.keyboardType = "number";
            else if (iv == 3)
                this.keyboardType = "url";
        }
        if (buffer.readBool())
            this.password = true;
    }
}

class GLoader extends GObject {
    constructor() {
        super();
        this._url = "";
        this._fill = LoaderFillType.None;
        this._align = "left";
        this._valign = "top";
    }
    createDisplayObject() {
        this._displayObject = new DisplayObject();
        this._content = new MovieClip();
        this._displayObject.addChild(this._content);
    }
    dispose() {
        if (this._contentItem && this._content.texture) {
            this.freeExternal(this._content.texture);
        }
        if (this._content2)
            this._content2.dispose();
        super.dispose();
    }
    get url() {
        return this._url;
    }
    set url(value) {
        if (this._url == value)
            return;
        this._url = value;
        this.loadContent();
        this.updateGear(7);
    }
    get icon() {
        return this._url;
    }
    set icon(value) {
        this.url = value;
    }
    get align() {
        return this._align;
    }
    set align(value) {
        if (this._align != value) {
            this._align = value;
            this.updateLayout();
        }
    }
    get verticalAlign() {
        return this._valign;
    }
    set verticalAlign(value) {
        if (this._valign != value) {
            this._valign = value;
            this.updateLayout();
        }
    }
    get fill() {
        return this._fill;
    }
    set fill(value) {
        if (this._fill != value) {
            this._fill = value;
            this.updateLayout();
        }
    }
    get shrinkOnly() {
        return this._shrinkOnly;
    }
    set shrinkOnly(value) {
        if (this._shrinkOnly != value) {
            this._shrinkOnly = value;
            this.updateLayout();
        }
    }
    get autoSize() {
        return this._autoSize;
    }
    set autoSize(value) {
        if (this._autoSize != value) {
            this._autoSize = value;
            this.updateLayout();
        }
    }
    get playing() {
        return this._content.playing;
    }
    set playing(value) {
        if (this._content.playing != value) {
            this._content.playing = value;
            this.updateGear(5);
        }
    }
    get frame() {
        return this._content.frame;
    }
    set frame(value) {
        if (this._content.frame != value) {
            this._content.frame = value;
            this.updateGear(5);
        }
    }
    get color() {
        return this._content.graphics.color;
    }
    set color(value) {
        if (this._content.graphics.color != value) {
            this._content.graphics.color = value;
            this.updateGear(4);
        }
    }
    get fillMethod() {
        return this._content.fillMethod;
    }
    set fillMethod(value) {
        this._content.fillMethod = value;
    }
    get fillOrigin() {
        return this._content.fillOrigin;
    }
    set fillOrigin(value) {
        this._content.fillOrigin = value;
    }
    get fillClockwise() {
        return this._content.fillClockwise;
    }
    set fillClockwise(value) {
        this._content.fillClockwise = value;
    }
    get fillAmount() {
        return this._content.fillAmount;
    }
    set fillAmount(value) {
        this._content.fillAmount = value;
    }
    get content() {
        return this._content;
    }
    get component() {
        return this._content2;
    }
    loadContent() {
        this.clearContent();
        if (!this._url)
            return;
        if (this._url.startsWith("ui://"))
            this.loadFromPackage(this._url);
        else
            this.loadExternal();
    }
    loadFromPackage(itemURL) {
        this._contentItem = UIPackage.getItemByURL(itemURL);
        if (this._contentItem) {
            this._contentItem = this._contentItem.getBranch();
            this.sourceWidth = this._contentItem.width;
            this.sourceHeight = this._contentItem.height;
            this._contentItem = this._contentItem.getHighResolution();
            this._contentItem.load();
            if (this._autoSize)
                this.setSize(this.sourceWidth, this.sourceHeight);
            if (this._contentItem.type == PackageItemType.Image) {
                if (this._contentItem.texture == null) {
                    this.setErrorState();
                }
                else {
                    this._content.texture = this._contentItem.texture;
                    this._content.scale9Grid = this._contentItem.scale9Grid;
                    this._content.scaleByTile = this._contentItem.scaleByTile;
                    this._content.tileGridIndice = this._contentItem.tileGridIndice;
                    this.updateLayout();
                }
            }
            else if (this._contentItem.type == PackageItemType.MovieClip) {
                this._content.interval = this._contentItem.interval;
                this._content.swing = this._contentItem.swing;
                this._content.repeatDelay = this._contentItem.repeatDelay;
                this._content.frames = this._contentItem.frames;
                this.updateLayout();
            }
            else if (this._contentItem.type == PackageItemType.Component) {
                var obj = UIPackage.createObjectFromURL(itemURL);
                if (!obj)
                    this.setErrorState();
                else if (!(obj instanceof GComponent)) {
                    obj.dispose();
                    this.setErrorState();
                }
                else {
                    this._content2 = obj;
                    this._displayObject.addChild(this._content2.displayObject);
                    this.updateLayout();
                }
            }
            else
                this.setErrorState();
        }
        else
            this.setErrorState();
    }
    loadExternal() {
        let url = this._url;
        new TextureLoader().load(this._url, tex => {
            if (url == this._url)
                this.onExternalLoadSuccess(new NTexture(tex));
        });
    }
    freeExternal(texture) {
    }
    onExternalLoadSuccess(texture) {
        this._content.texture = texture;
        this._content.scale9Grid = null;
        this._content.scaleByTile = false;
        this.sourceWidth = texture.width;
        this.sourceHeight = texture.height;
        this.updateLayout();
    }
    onExternalLoadFailed() {
        this.setErrorState();
    }
    setErrorState() {
    }
    clearErrorState() {
    }
    updateLayout() {
        if (!this._content2 && !this._content.texture && !this._content.frames) {
            if (this._autoSize) {
                this._updatingLayout = true;
                this.setSize(50, 30);
                this._updatingLayout = false;
            }
            return;
        }
        let cw = this.sourceWidth;
        let ch = this.sourceHeight;
        if (this._autoSize) {
            this._updatingLayout = true;
            if (cw == 0)
                cw = 50;
            if (ch == 0)
                ch = 30;
            this.setSize(cw, ch);
            this._updatingLayout = false;
            if (cw == this._width && ch == this._height) {
                if (this._content2) {
                    this._content2.setPosition(0, 0);
                    this._content2.setScale(1, 1);
                }
                else {
                    this._content.setSize(cw, ch);
                    this._content.setPosition(0, 0);
                }
                return;
            }
        }
        var sx = 1, sy = 1;
        if (this._fill != LoaderFillType.None) {
            sx = this.width / this.sourceWidth;
            sy = this.height / this.sourceHeight;
            if (sx != 1 || sy != 1) {
                if (this._fill == LoaderFillType.ScaleMatchHeight)
                    sx = sy;
                else if (this._fill == LoaderFillType.ScaleMatchWidth)
                    sy = sx;
                else if (this._fill == LoaderFillType.Scale) {
                    if (sx > sy)
                        sx = sy;
                    else
                        sy = sx;
                }
                else if (this._fill == LoaderFillType.ScaleNoBorder) {
                    if (sx > sy)
                        sy = sx;
                    else
                        sx = sy;
                }
                if (this._shrinkOnly) {
                    if (sx > 1)
                        sx = 1;
                    if (sy > 1)
                        sy = 1;
                }
                cw = this.sourceWidth * sx;
                ch = this.sourceHeight * sy;
            }
        }
        if (this._content2)
            this._content2.setScale(sx, sy);
        else
            this._content.setSize(cw, ch);
        var nx, ny;
        if (this._align == "center")
            nx = Math.floor((this.width - cw) / 2);
        else if (this._align == "right")
            nx = this.width - cw;
        else
            nx = 0;
        if (this._valign == "middle")
            ny = Math.floor((this.height - ch) / 2);
        else if (this._valign == "bottom")
            ny = this.height - ch;
        else
            ny = 0;
        if (this._content2)
            this._content2.setPosition(nx, ny);
        else
            this._content.setPosition(nx, ny);
    }
    clearContent() {
        this.clearErrorState();
        if (!this._contentItem && this._content.texture) {
            this.freeExternal(this._content.texture);
        }
        this._content.texture = null;
        this._content.frames = null;
        if (this._content2) {
            this._content2.dispose();
            this._content2 = null;
        }
        this._contentItem = null;
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        if (!this._updatingLayout)
            this.updateLayout();
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.color;
            case ObjectPropID.Playing:
                return this.playing;
            case ObjectPropID.Frame:
                return this.frame;
            case ObjectPropID.TimeScale:
                return this._content.timeScale;
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.color = value;
                break;
            case ObjectPropID.Playing:
                this.playing = value;
                break;
            case ObjectPropID.Frame:
                this.frame = value;
                break;
            case ObjectPropID.TimeScale:
                this._content.timeScale = value;
                break;
            case ObjectPropID.DeltaTime:
                this._content.advance(value);
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        var iv;
        this._url = buffer.readS();
        iv = buffer.readByte();
        this._align = iv == 0 ? "left" : (iv == 1 ? "center" : "right");
        iv = buffer.readByte();
        this._valign = iv == 0 ? "top" : (iv == 1 ? "middle" : "bottom");
        this._fill = buffer.readByte();
        this._shrinkOnly = buffer.readBool();
        this._autoSize = buffer.readBool();
        buffer.readBool(); //_showErrorSign
        this._content.playing = buffer.readBool();
        this._content.frame = buffer.readInt();
        if (buffer.readBool())
            this.color = buffer.readColor();
        this._content.fillMethod = buffer.readByte();
        if (this._content.fillMethod != 0) {
            this._content.fillOrigin = buffer.readByte();
            this._content.fillClockwise = buffer.readBool();
            this._content.fillAmount = buffer.readFloat();
        }
        if (this._url)
            this.loadContent();
    }
}

class GLoader3D extends GObject {
}

class GLabel extends GComponent {
    constructor() {
        super();
    }
    get icon() {
        if (this._iconObject)
            return this._iconObject.icon;
        else
            return null;
    }
    set icon(value) {
        if (this._iconObject)
            this._iconObject.icon = value;
        this.updateGear(7);
    }
    get title() {
        if (this._titleObject)
            return this._titleObject.text;
        else
            return null;
    }
    set title(value) {
        if (this._titleObject)
            this._titleObject.text = value;
        this.updateGear(6);
    }
    get text() {
        return this.title;
    }
    set text(value) {
        this.title = value;
    }
    get titleColor() {
        var tf = this.getTextField();
        if (tf)
            return tf.color;
        else
            return 0;
    }
    set titleColor(value) {
        var tf = this.getTextField();
        if (tf)
            tf.color = value;
        this.updateGear(4);
    }
    get titleFontSize() {
        var tf = this.getTextField();
        if (tf)
            return tf.textFormat.size;
        else
            return 0;
    }
    set titleFontSize(value) {
        var tf = this.getTextField();
        if (tf) {
            tf.textFormat.size = value;
            tf.applyFormat();
        }
    }
    get color() {
        return this.titleColor;
    }
    set color(value) {
        this.titleColor = value;
    }
    set editable(val) {
        if (this._titleObject instanceof GTextInput)
            this._titleObject.editable = val;
    }
    get editable() {
        if (this._titleObject instanceof GTextInput)
            return this._titleObject.editable;
        else
            return false;
    }
    getTextField() {
        if (this._titleObject instanceof GTextField)
            return this._titleObject;
        else if ('getTextField' in this._titleObject)
            return this._titleObject.getTextField();
        else
            return null;
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.titleColor;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf)
                        return tf.textFormat.outlineColor;
                    else
                        return 0;
                }
            case ObjectPropID.FontSize:
                return this.titleFontSize;
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.titleColor = value;
                break;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf) {
                        tf.textFormat.outlineColor = value;
                        tf.applyFormat();
                    }
                }
                break;
            case ObjectPropID.FontSize:
                this.titleFontSize = value;
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    constructExtension(buffer) {
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        if (!buffer.seek(beginPos, 6))
            return;
        if (buffer.readByte() != this.packageItem.objectType)
            return;
        var str;
        str = buffer.readS();
        if (str != null)
            this.title = str;
        str = buffer.readS();
        if (str != null)
            this.icon = str;
        if (buffer.readBool())
            this.titleColor = buffer.readColor();
        var iv = buffer.readInt();
        if (iv != 0)
            this.titleFontSize = iv;
        if (buffer.readBool()) {
            var input = this.getTextField();
            if (input instanceof GTextInput) {
                str = buffer.readS();
                if (str != null)
                    input.promptText = str;
                str = buffer.readS();
                if (str != null)
                    input.restrict = str;
                iv = buffer.readInt();
                if (iv != 0)
                    input.maxLength = iv;
                iv = buffer.readInt();
                if (iv != 0) {
                    if (iv == 4)
                        input.keyboardType = 'number';
                    else if (iv == 3)
                        input.keyboardType = 'url';
                }
                if (buffer.readBool())
                    input.password = true;
            }
            else
                buffer.skip(13);
        }
    }
}

class GButton extends GComponent {
    constructor() {
        super();
        this._soundVolumeScale = 0;
        this._downEffect = 0;
        this._downEffectValue = 0;
        this._downScaled = false;
        this._mode = ButtonMode.Common;
        this._title = "";
        this._icon = "";
        this._sound = UIConfig.buttonSound;
        this._soundVolumeScale = UIConfig.buttonSoundVolumeScale;
        this._changeStateOnClick = true;
        this._downEffectValue = 0.8;
    }
    get icon() {
        return this._icon;
    }
    set icon(value) {
        this._icon = value;
        value = (this._selected && this._selectedIcon) ? this._selectedIcon : this._icon;
        if (this._iconObject)
            this._iconObject.icon = value;
        this.updateGear(7);
    }
    get selectedIcon() {
        return this._selectedIcon;
    }
    set selectedIcon(value) {
        this._selectedIcon = value;
        value = (this._selected && this._selectedIcon) ? this._selectedIcon : this._icon;
        if (this._iconObject)
            this._iconObject.icon = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
        if (this._titleObject)
            this._titleObject.text = (this._selected && this._selectedTitle) ? this._selectedTitle : this._title;
        this.updateGear(6);
    }
    get text() {
        return this.title;
    }
    set text(value) {
        this.title = value;
    }
    get selectedTitle() {
        return this._selectedTitle;
    }
    set selectedTitle(value) {
        this._selectedTitle = value;
        if (this._titleObject)
            this._titleObject.text = (this._selected && this._selectedTitle) ? this._selectedTitle : this._title;
    }
    get titleColor() {
        var tf = this.getTextField();
        if (tf)
            return tf.color;
        else
            return 0;
    }
    set titleColor(value) {
        var tf = this.getTextField();
        if (tf)
            tf.color = value;
        this.updateGear(4);
    }
    get titleFontSize() {
        var tf = this.getTextField();
        if (tf)
            return tf.textFormat.size;
        else
            return 0;
    }
    set titleFontSize(value) {
        var tf = this.getTextField();
        if (tf) {
            tf.textFormat.size = value;
            tf.applyFormat();
        }
    }
    get sound() {
        return this._sound;
    }
    set sound(val) {
        this._sound = val;
    }
    get soundVolumeScale() {
        return this._soundVolumeScale;
    }
    set soundVolumeScale(value) {
        this._soundVolumeScale = value;
    }
    set selected(val) {
        if (this._mode == ButtonMode.Common)
            return;
        if (this._selected != val) {
            this._selected = val;
            this.setCurrentState();
            if (this._selectedTitle && this._titleObject)
                this._titleObject.text = this._selected ? this._selectedTitle : this._title;
            if (this._selectedIcon) {
                var str = this._selected ? this._selectedIcon : this._icon;
                if (this._iconObject)
                    this._iconObject.icon = str;
            }
            if (this._relatedController
                && this._parent
                && !this._parent._buildingDisplayList) {
                if (this._selected) {
                    this._relatedController.selectedPageId = this._relatedPageId;
                    if (this._relatedController.autoRadioGroupDepth)
                        this._parent.adjustRadioGroupDepth(this, this._relatedController);
                }
                else if (this._mode == ButtonMode.Check && this._relatedController.selectedPageId == this._relatedPageId)
                    this._relatedController.oppositePageId = this._relatedPageId;
            }
        }
    }
    get selected() {
        return this._selected;
    }
    get mode() {
        return this._mode;
    }
    set mode(value) {
        if (this._mode != value) {
            if (value == ButtonMode.Common)
                this.selected = false;
            this._mode = value;
        }
    }
    get relatedController() {
        return this._relatedController;
    }
    set relatedController(val) {
        if (val != this._relatedController) {
            this._relatedController = val;
            this._relatedPageId = null;
        }
    }
    get relatedPageId() {
        return this._relatedPageId;
    }
    set relatedPageId(val) {
        this._relatedPageId = val;
    }
    get changeStateOnClick() {
        return this._changeStateOnClick;
    }
    set changeStateOnClick(value) {
        this._changeStateOnClick = value;
    }
    get linkedPopup() {
        return this._linkedPopup;
    }
    set linkedPopup(value) {
        this._linkedPopup = value;
    }
    getTextField() {
        if (this._titleObject instanceof GTextField)
            return this._titleObject;
        else if ('getTextField' in this._titleObject)
            return this._titleObject.getTextField();
        else
            return null;
    }
    fireClick(downEffect, clickCall) {
        downEffect = downEffect || false;
        if (downEffect && this._mode == ButtonMode.Common) {
            this.setState("over");
            Timers.add(100, 1, this.setState, this, "down");
            Timers.add(200, 1, this.setState, this, () => {
                this.setState("up");
                if (clickCall)
                    this.dispatchEvent("click");
            });
        }
    }
    setState(val) {
        if (this._buttonController)
            this._buttonController.selectedPage = val;
        if (this._downEffect == 1) {
            var cnt = this.numChildren;
            if (val == "down" || val == "selectedOver" || val == "selectedDisabled") {
                var p = this._downEffectValue * 255;
                var r = (p << 16) + (p << 8) + p;
                for (var i = 0; i < cnt; i++) {
                    var obj = this.getChildAt(i);
                    if (!(obj instanceof GTextField))
                        obj.setProp(ObjectPropID.Color, r);
                }
            }
            else {
                for (i = 0; i < cnt; i++) {
                    obj = this.getChildAt(i);
                    if (!(obj instanceof GTextField))
                        obj.setProp(ObjectPropID.Color, 0xFFFFFF);
                }
            }
        }
        else if (this._downEffect == 2) {
            if (val == "down" || val == "selectedOver" || val == "selectedDisabled") {
                if (!this._downScaled) {
                    this.setScale(this.scaleX * this._downEffectValue, this.scaleY * this._downEffectValue);
                    this._downScaled = true;
                }
            }
            else {
                if (this._downScaled) {
                    this.setScale(this.scaleX / this._downEffectValue, this.scaleY / this._downEffectValue);
                    this._downScaled = false;
                }
            }
        }
    }
    setCurrentState() {
        if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled")) {
            if (this._selected)
                this.setState("selectedDisabled");
            else
                this.setState("disabled");
        }
        else {
            if (this._selected)
                this.setState(this._over ? "selectedOver" : "down");
            else
                this.setState(this._over ? "over" : "up");
        }
    }
    handleControllerChanged(c) {
        super.handleControllerChanged(c);
        if (this._relatedController == c)
            this.selected = this._relatedPageId == c.selectedPageId;
    }
    handleGrayedChanged() {
        if (this._buttonController && this._buttonController.hasPage("disabled")) {
            if (this.grayed) {
                if (this._selected && this._buttonController.hasPage("selectedDisabled"))
                    this.setState("selectedDisabled");
                else
                    this.setState("disabled");
            }
            else if (this._selected)
                this.setState("down");
            else
                this.setState("up");
        }
        else
            super.handleGrayedChanged();
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.titleColor;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf)
                        return tf.textFormat.outlineColor;
                    else
                        return 0;
                }
            case ObjectPropID.FontSize:
                return this.titleFontSize;
            case ObjectPropID.Selected:
                return this.selected;
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.titleColor = value;
                break;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf) {
                        tf.textFormat.outlineColor = value;
                        tf.applyFormat();
                    }
                }
                break;
            case ObjectPropID.FontSize:
                this.titleFontSize = value;
                break;
            case ObjectPropID.Selected:
                this.selected = value;
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    constructExtension(buffer) {
        buffer.seek(0, 6);
        this._mode = buffer.readByte();
        var str = buffer.readS();
        if (str)
            this._sound = str;
        this._soundVolumeScale = buffer.readFloat();
        this._downEffect = buffer.readByte();
        this._downEffectValue = buffer.readFloat();
        if (this._downEffect == 2)
            this.setPivot(0.5, 0.5, this.pivotAsAnchor);
        this._buttonController = this.getController("button");
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
        if (this._titleObject)
            this._title = this._titleObject.text;
        if (this._iconObject)
            this._icon = this._iconObject.icon;
        if (this._mode == ButtonMode.Common)
            this.setState("up");
        this.on("roll_over", this.__rollover, this);
        this.on("roll_out", this.__rollout, this);
        this.on("touch_begin", this.__btnTouchBegin, this);
        this.on("touch_end", this.__btnTouchEnd, this);
        this.on("click", this.__click, this);
        this.on("removed_from_stage", this.__removeFromStage, this);
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        if (!buffer.seek(beginPos, 6))
            return;
        if (buffer.readByte() != this.packageItem.objectType)
            return;
        var str;
        var iv;
        str = buffer.readS();
        if (str != null)
            this.title = str;
        str = buffer.readS();
        if (str != null)
            this.selectedTitle = str;
        str = buffer.readS();
        if (str != null)
            this.icon = str;
        str = buffer.readS();
        if (str != null)
            this.selectedIcon = str;
        if (buffer.readBool())
            this.titleColor = buffer.readColor();
        iv = buffer.readInt();
        if (iv != 0)
            this.titleFontSize = iv;
        iv = buffer.readShort();
        if (iv >= 0)
            this._relatedController = this.parent.getControllerAt(iv);
        this._relatedPageId = buffer.readS();
        str = buffer.readS();
        if (str != null)
            this._sound = str;
        if (buffer.readBool())
            this._soundVolumeScale = buffer.readFloat();
        this.selected = buffer.readBool();
    }
    __rollover() {
        if (!this._buttonController || !this._buttonController.hasPage("over"))
            return;
        this._over = true;
        if (this._down)
            return;
        if (this.grayed && this._buttonController.hasPage("disabled"))
            return;
        this.setState(this._selected ? "selectedOver" : "over");
    }
    __rollout() {
        if (!this._buttonController || !this._buttonController.hasPage("over"))
            return;
        this._over = false;
        if (this._down)
            return;
        if (this.grayed && this._buttonController.hasPage("disabled"))
            return;
        this.setState(this._selected ? "down" : "up");
    }
    __btnTouchBegin(evt) {
        if (evt.input.button != 0)
            return;
        this._down = true;
        evt.captureTouch();
        if (this._mode == ButtonMode.Common) {
            if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled"))
                this.setState("selectedDisabled");
            else
                this.setState("down");
        }
        if (this._linkedPopup) {
            if (this._linkedPopup instanceof Window)
                this._linkedPopup.toggleStatus();
            else
                GRoot.findFor(this).togglePopup(this._linkedPopup, this);
        }
    }
    __btnTouchEnd(evt) {
        if (this._down) {
            this._down = false;
            if (this._mode == ButtonMode.Common) {
                if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled"))
                    this.setState("disabled");
                else if (this._over)
                    this.setState("over");
                else
                    this.setState("up");
            }
            else {
                if (!this._over
                    && this._buttonController
                    && (this._buttonController.selectedPage == "over" || this._buttonController.selectedPage == "selectedOver")) {
                    this.setCurrentState();
                }
            }
        }
    }
    __removeFromStage() {
        if (this._over)
            this.__rollout();
    }
    __click(evt) {
        if (this._sound) {
            var pi = UIPackage.getItemByURL(this._sound);
            if (pi)
                GRoot.inst.playOneShotSound(pi.file);
            else
                GRoot.inst.playOneShotSound(this._sound);
        }
        if (this._mode == ButtonMode.Check) {
            if (this._changeStateOnClick) {
                this.selected = !this._selected;
                this.dispatchEvent("status_changed");
            }
        }
        else if (this._mode == ButtonMode.Radio) {
            if (this._changeStateOnClick && !this._selected) {
                this.selected = true;
                this.dispatchEvent("status_changed");
            }
        }
        else {
            if (this._relatedController)
                this._relatedController.selectedPageId = this._relatedPageId;
        }
    }
}

class GComboBox extends GComponent {
    constructor() {
        super();
        this.visibleItemCount = UIConfig.defaultComboBoxVisibleItemCount;
        this.popupDirection = PopupDirection.Auto;
        this._itemsUpdated = true;
        this._selectedIndex = -1;
        this._items = [];
        this._values = [];
    }
    get text() {
        if (this._titleObject)
            return this._titleObject.text;
        else
            return null;
    }
    set text(value) {
        if (this._titleObject)
            this._titleObject.text = value;
        this.updateGear(6);
    }
    get titleColor() {
        var tf = this.getTextField();
        if (tf)
            return tf.color;
        else
            return 0;
    }
    set titleColor(value) {
        var tf = this.getTextField();
        if (tf)
            tf.color = value;
        this.updateGear(4);
    }
    get titleFontSize() {
        var tf = this.getTextField();
        if (tf)
            return tf.textFormat.size;
        else
            return 0;
    }
    set titleFontSize(value) {
        var tf = this.getTextField();
        if (tf) {
            tf.textFormat.size = value;
            tf.applyFormat();
        }
    }
    get icon() {
        if (this._iconObject)
            return this._iconObject.icon;
        else
            return null;
    }
    set icon(value) {
        if (this._iconObject)
            this._iconObject.icon = value;
        this.updateGear(7);
    }
    get items() {
        return this._items;
    }
    set items(value) {
        if (!value)
            this._items.length = 0;
        else
            this._items = value.concat();
        if (this._items.length > 0) {
            if (this._selectedIndex >= this._items.length)
                this._selectedIndex = this._items.length - 1;
            else if (this._selectedIndex == -1)
                this._selectedIndex = 0;
            this.text = this._items[this._selectedIndex];
            if (this._icons && this._selectedIndex < this._icons.length)
                this.icon = this._icons[this._selectedIndex];
        }
        else {
            this.text = "";
            if (this._icons)
                this.icon = null;
            this._selectedIndex = -1;
        }
        this._itemsUpdated = true;
    }
    get icons() {
        return this._icons;
    }
    set icons(value) {
        this._icons = value;
        if (this._icons && this._selectedIndex != -1 && this._selectedIndex < this._icons.length)
            this.icon = this._icons[this._selectedIndex];
    }
    get values() {
        return this._values;
    }
    set values(value) {
        if (!value)
            this._values.length = 0;
        else
            this._values = value.concat();
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(val) {
        if (this._selectedIndex == val)
            return;
        this._selectedIndex = val;
        if (this._selectedIndex >= 0 && this._selectedIndex < this._items.length) {
            this.text = this._items[this._selectedIndex];
            if (this._icons && this._selectedIndex < this._icons.length)
                this.icon = this._icons[this._selectedIndex];
        }
        else {
            this.text = "";
            if (this._icons)
                this.icon = null;
        }
        this.updateSelectionController();
    }
    get value() {
        return this._values[this._selectedIndex];
    }
    set value(val) {
        var index = this._values.indexOf(val);
        if (index == -1 && val == null)
            index = this._values.indexOf("");
        this.selectedIndex = index;
    }
    getTextField() {
        if (this._titleObject instanceof GTextField)
            return this._titleObject;
        else if ('getTextField' in this._titleObject)
            return this._titleObject.getTextField();
        else
            return null;
    }
    setState(val) {
        if (this._buttonController)
            this._buttonController.selectedPage = val;
    }
    setCurrentState() {
        if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled"))
            this.setState("disabled");
        else if (this.dropdown && this.dropdown.parent)
            this.setState("down");
        else
            this.setState(this._over ? "over" : "up");
    }
    get selectionController() {
        return this._selectionController;
    }
    set selectionController(value) {
        this._selectionController = value;
    }
    handleControllerChanged(c) {
        super.handleControllerChanged(c);
        if (this._selectionController == c)
            this.selectedIndex = c.selectedIndex;
    }
    updateSelectionController() {
        if (this._selectionController && !this._selectionController.changing
            && this._selectedIndex < this._selectionController.pageCount) {
            var c = this._selectionController;
            this._selectionController = null;
            c.selectedIndex = this._selectedIndex;
            this._selectionController = c;
        }
    }
    dispose() {
        if (this.dropdown) {
            this.dropdown.dispose();
            this.dropdown = null;
        }
        this._selectionController = null;
        super.dispose();
    }
    getProp(index) {
        switch (index) {
            case ObjectPropID.Color:
                return this.titleColor;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf)
                        return tf.textFormat.outlineColor;
                    else
                        return 0;
                }
            case ObjectPropID.FontSize:
                {
                    tf = this.getTextField();
                    if (tf)
                        return tf.textFormat.size;
                    else
                        return 0;
                }
            default:
                return super.getProp(index);
        }
    }
    setProp(index, value) {
        switch (index) {
            case ObjectPropID.Color:
                this.titleColor = value;
                break;
            case ObjectPropID.OutlineColor:
                {
                    var tf = this.getTextField();
                    if (tf) {
                        tf.textFormat.outlineColor = value;
                        tf.applyFormat();
                    }
                }
                break;
            case ObjectPropID.FontSize:
                {
                    tf = this.getTextField();
                    if (tf) {
                        tf.textFormat.size = value;
                        tf.applyFormat();
                    }
                }
                break;
            default:
                super.setProp(index, value);
                break;
        }
    }
    constructExtension(buffer) {
        this._buttonController = this.getController("button");
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
        let str = buffer.readS();
        if (str) {
            let obj = UIPackage.createObjectFromURL(str);
            if (!(obj instanceof GComponent)) {
                console.warn(this.resourceURL + " should be a component.");
                return;
            }
            this.dropdown = obj;
            this._list = this.dropdown.getChild("list");
            if (this._list == null) {
                console.warn(this.resourceURL + ": should container a list component named list.");
                return;
            }
            this._list.on("click_item", this.__clickItem, this);
            this._list.addRelation(this.dropdown, RelationType.Width);
            this._list.removeRelation(this.dropdown, RelationType.Height);
            this.dropdown.addRelation(this._list, RelationType.Height);
            this.dropdown.removeRelation(this._list, RelationType.Width);
            this.dropdown.on("removed_from_stage", this.__popupWinClosed, this);
        }
        this.on("roll_over", this.__rollover, this);
        this.on("roll_out", this.__rollout, this);
        this.on("touch_begin", this.__mousedown, this);
        this.on("touch_end", this.__mouseup, this);
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        if (!buffer.seek(beginPos, 6))
            return;
        if (buffer.readByte() != this.packageItem.objectType)
            return;
        var i;
        var iv;
        var nextPos;
        var str;
        var itemCount = buffer.readShort();
        for (i = 0; i < itemCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            this._items[i] = buffer.readS();
            this._values[i] = buffer.readS();
            str = buffer.readS();
            if (str != null) {
                if (this._icons == null)
                    this._icons = [];
                this._icons[i] = str;
            }
            buffer.pos = nextPos;
        }
        str = buffer.readS();
        if (str != null) {
            this.text = str;
            this._selectedIndex = this._items.indexOf(str);
        }
        else if (this._items.length > 0) {
            this._selectedIndex = 0;
            this.text = this._items[0];
        }
        else
            this._selectedIndex = -1;
        str = buffer.readS();
        if (str != null)
            this.icon = str;
        if (buffer.readBool())
            this.titleColor = buffer.readColor();
        iv = buffer.readInt();
        if (iv > 0)
            this.visibleItemCount = iv;
        this.popupDirection = buffer.readByte();
        iv = buffer.readShort();
        if (iv >= 0)
            this._selectionController = this.parent.getControllerAt(iv);
    }
    showDropdown() {
        if (this._itemsUpdated) {
            this._itemsUpdated = false;
            this._list.removeChildrenToPool();
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._list.addItemFromPool();
                item.name = i < this._values.length ? this._values[i] : "";
                item.text = this._items[i];
                item.icon = (this._icons && i < this._icons.length) ? this._icons[i] : null;
            }
            this._list.resizeToFit(this.visibleItemCount);
        }
        this._list.selectedIndex = -1;
        this.dropdown.width = this.width;
        this._list.ensureBoundsCorrect();
        GRoot.findFor(this).togglePopup(this.dropdown, this, this.popupDirection);
        if (this.dropdown.parent)
            this.setState("down");
    }
    __popupWinClosed() {
        this.setCurrentState();
    }
    __clickItem(evt) {
        if (this.dropdown.parent instanceof GRoot)
            this.dropdown.parent.hidePopup();
        this._selectedIndex = -1;
        this.selectedIndex = this._list.getChildIndex(evt.data);
        this.dispatchEvent("status_changed");
    }
    __rollover() {
        this._over = true;
        if (this._down || this.dropdown && this.dropdown.parent)
            return;
        this.setCurrentState();
    }
    __rollout() {
        this._over = false;
        if (this._down || this.dropdown && this.dropdown.parent)
            return;
        this.setCurrentState();
    }
    __mousedown(evt) {
        if (evt.initiator instanceof InputTextField)
            return;
        this._down = true;
        if (this.dropdown)
            this.showDropdown();
        evt.captureTouch();
    }
    __mouseup() {
        if (this._down) {
            this._down = false;
            this.setCurrentState();
        }
    }
}

let s_vec2$4 = new Vector2();
class GSlider extends GComponent {
    constructor() {
        super();
        this.changeOnClick = true;
        this.canDrag = true;
        this._min = 0;
        this._max = 0;
        this._value = 0;
        this._barMaxWidth = 0;
        this._barMaxHeight = 0;
        this._barMaxWidthDelta = 0;
        this._barMaxHeightDelta = 0;
        this._clickPercent = 0;
        this._barStartX = 0;
        this._barStartY = 0;
        this._titleType = ProgressTitleType.Percent;
        this._value = 50;
        this._max = 100;
        this._clickPos = new Vector2();
    }
    get titleType() {
        return this._titleType;
    }
    set titleType(value) {
        this._titleType = value;
    }
    get wholeNumbers() {
        return this._wholeNumbers;
    }
    set wholeNumbers(value) {
        if (this._wholeNumbers != value) {
            this._wholeNumbers = value;
            this.update();
        }
    }
    get min() {
        return this._min;
    }
    set min(value) {
        if (this._min != value) {
            this._min = value;
            this.update();
        }
    }
    get max() {
        return this._max;
    }
    set max(value) {
        if (this._max != value) {
            this._max = value;
            this.update();
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this._value != value) {
            this._value = value;
            this.update();
        }
    }
    update() {
        this.updateWithPercent((this._value - this._min) / (this._max - this._min), false);
    }
    updateWithPercent(percent, manual) {
        percent = clamp01(percent);
        if (manual) {
            var newValue = clamp(this._min + (this._max - this._min) * percent, this._min, this._max);
            if (this._wholeNumbers) {
                newValue = Math.round(newValue);
                percent = clamp01((newValue - this._min) / (this._max - this._min));
            }
            if (newValue != this._value) {
                this._value = newValue;
                if (this.dispatchEvent("status_changed"))
                    return;
            }
        }
        if (this._titleObject) {
            switch (this._titleType) {
                case ProgressTitleType.Percent:
                    this._titleObject.text = Math.floor(percent * 100) + "%";
                    break;
                case ProgressTitleType.ValueAndMax:
                    this._titleObject.text = this._value + "/" + this._max;
                    break;
                case ProgressTitleType.Value:
                    this._titleObject.text = "" + this._value;
                    break;
                case ProgressTitleType.Max:
                    this._titleObject.text = "" + this._max;
                    break;
            }
        }
        var fullWidth = this.width - this._barMaxWidthDelta;
        var fullHeight = this.height - this._barMaxHeightDelta;
        if (!this._reverse) {
            if (this._barObjectH)
                this._barObjectH.width = Math.round(fullWidth * percent);
            if (this._barObjectV)
                this._barObjectV.height = Math.round(fullHeight * percent);
        }
        else {
            if (this._barObjectH) {
                this._barObjectH.width = Math.round(fullWidth * percent);
                this._barObjectH.x = this._barStartX + (fullWidth - this._barObjectH.width);
            }
            if (this._barObjectV) {
                this._barObjectV.height = Math.round(fullHeight * percent);
                this._barObjectV.y = this._barStartY + (fullHeight - this._barObjectV.height);
            }
        }
    }
    constructExtension(buffer) {
        buffer.seek(0, 6);
        this._titleType = buffer.readByte();
        this._reverse = buffer.readBool();
        if (buffer.version >= 2) {
            this._wholeNumbers = buffer.readBool();
            this.changeOnClick = buffer.readBool();
        }
        this._titleObject = this.getChild("title");
        this._barObjectH = this.getChild("bar");
        this._barObjectV = this.getChild("bar_v");
        this._gripObject = this.getChild("grip");
        if (this._barObjectH) {
            this._barMaxWidth = this._barObjectH.width;
            this._barMaxWidthDelta = this.width - this._barMaxWidth;
            this._barStartX = this._barObjectH.x;
        }
        if (this._barObjectV) {
            this._barMaxHeight = this._barObjectV.height;
            this._barMaxHeightDelta = this.height - this._barMaxHeight;
            this._barStartY = this._barObjectV.y;
        }
        if (this._gripObject) {
            this._gripObject.on("touch_begin", this.__gripTouchBegin, this);
            this._gripObject.on("touch_move", this.__gripTouchMove, this);
        }
        this.on("touch_begin", this.__barTouchBegin, this);
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        if (this._barObjectH)
            this._barMaxWidth = this.width - this._barMaxWidthDelta;
        if (this._barObjectV)
            this._barMaxHeight = this.height - this._barMaxHeightDelta;
        if (!this._underConstruct)
            this.update();
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        if (!buffer.seek(beginPos, 6)) {
            this.update();
            return;
        }
        if (buffer.readByte() != this.packageItem.objectType) {
            this.update();
            return;
        }
        this._value = buffer.readInt();
        this._max = buffer.readInt();
        if (buffer.version >= 2)
            this._min = buffer.readInt();
        this.update();
    }
    __gripTouchBegin(evt) {
        if (evt.input.button != 0)
            return;
        this.canDrag = true;
        evt.stopPropagation();
        evt.captureTouch();
        this.globalToLocal(evt.input.x, evt.input.y, this._clickPos);
        this._clickPercent = clamp01((this._value - this._min) / (this._max - this._min));
    }
    __gripTouchMove(evt) {
        if (!this.canDrag)
            return;
        var pt = this.globalToLocal(evt.input.x, evt.input.y, s_vec2$4);
        var deltaX = pt.x - this._clickPos.x;
        var deltaY = pt.y - this._clickPos.y;
        if (this._reverse) {
            deltaX = -deltaX;
            deltaY = -deltaY;
        }
        var percent;
        if (this._barObjectH)
            percent = this._clickPercent + deltaX / this._barMaxWidth;
        else
            percent = this._clickPercent + deltaY / this._barMaxHeight;
        this.updateWithPercent(percent, true);
    }
    __barTouchBegin(evt) {
        if (!this.changeOnClick)
            return;
        var pt = this._gripObject.globalToLocal(evt.input.x, evt.input.y, s_vec2$4);
        var percent = clamp01((this._value - this._min) / (this._max - this._min));
        var delta = 0;
        if (this._barObjectH)
            delta = (pt.x - this._gripObject.width / 2) / this._barMaxWidth;
        if (this._barObjectV)
            delta = (pt.y - this._gripObject.height / 2) / this._barMaxHeight;
        if (this._reverse)
            percent -= delta;
        else
            percent += delta;
        this.updateWithPercent(percent, true);
    }
}

class GProgressBar extends GComponent {
    constructor() {
        super();
        this._min = 0;
        this._max = 0;
        this._value = 0;
        this._barMaxWidth = 0;
        this._barMaxHeight = 0;
        this._barMaxWidthDelta = 0;
        this._barMaxHeightDelta = 0;
        this._barStartX = 0;
        this._barStartY = 0;
        this._titleType = ProgressTitleType.Percent;
        this._value = 50;
        this._max = 100;
    }
    get titleType() {
        return this._titleType;
    }
    set titleType(value) {
        if (this._titleType != value) {
            this._titleType = value;
            this.update(value);
        }
    }
    get min() {
        return this._min;
    }
    set min(value) {
        if (this._min != value) {
            this._min = value;
            this.update(this._value);
        }
    }
    get max() {
        return this._max;
    }
    set max(value) {
        if (this._max != value) {
            this._max = value;
            this.update(this._value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (this._value != value) {
            GTween.kill(this, false, this.update);
            this._value = value;
            this.update(value);
        }
    }
    tweenValue(value, duration) {
        var oldValule;
        var tweener = GTween.getTween(this, this.update);
        if (tweener) {
            oldValule = tweener.value.x;
            tweener.kill();
        }
        else
            oldValule = this._value;
        this._value = value;
        return GTween.to(oldValule, this._value, duration).setTarget(this, this.update).setEase(EaseType.Linear);
    }
    update(newValue) {
        var percent = clamp01((newValue - this._min) / (this._max - this._min));
        if (this._titleObject) {
            switch (this._titleType) {
                case ProgressTitleType.Percent:
                    this._titleObject.text = Math.floor(percent * 100) + "%";
                    break;
                case ProgressTitleType.ValueAndMax:
                    this._titleObject.text = Math.floor(newValue) + "/" + Math.floor(this._max);
                    break;
                case ProgressTitleType.Value:
                    this._titleObject.text = "" + Math.floor(newValue);
                    break;
                case ProgressTitleType.Max:
                    this._titleObject.text = "" + Math.floor(this._max);
                    break;
            }
        }
        var fullWidth = this.width - this._barMaxWidthDelta;
        var fullHeight = this.height - this._barMaxHeightDelta;
        if (!this._reverse) {
            if (this._barObjectH) {
                if (!this.setFillAmount(this._barObjectH, percent))
                    this._barObjectH.width = Math.round(fullWidth * percent);
            }
            if (this._barObjectV) {
                if (!this.setFillAmount(this._barObjectV, percent))
                    this._barObjectV.height = Math.round(fullHeight * percent);
            }
        }
        else {
            if (this._barObjectH) {
                if (!this.setFillAmount(this._barObjectH, 1 - percent)) {
                    this._barObjectH.width = Math.round(fullWidth * percent);
                    this._barObjectH.x = this._barStartX + (fullWidth - this._barObjectH.width);
                }
            }
            if (this._barObjectV) {
                if (!this.setFillAmount(this._barObjectV, 1 - percent)) {
                    this._barObjectV.height = Math.round(fullHeight * percent);
                    this._barObjectV.y = this._barStartY + (fullHeight - this._barObjectV.height);
                }
            }
        }
        if (this._aniObject)
            this._aniObject.setProp(ObjectPropID.Frame, Math.floor(percent * 100));
    }
    setFillAmount(bar, amount) {
        if (((bar instanceof GImage) || (bar instanceof GLoader)) && bar.fillMethod != FillMethod.None) {
            bar.fillAmount = amount;
            return true;
        }
        else
            return false;
    }
    constructExtension(buffer) {
        buffer.seek(0, 6);
        this._titleType = buffer.readByte();
        this._reverse = buffer.readBool();
        this._titleObject = this.getChild("title");
        this._barObjectH = this.getChild("bar");
        this._barObjectV = this.getChild("bar_v");
        this._aniObject = this.getChild("ani");
        if (this._barObjectH) {
            this._barMaxWidth = this._barObjectH.width;
            this._barMaxWidthDelta = this.width - this._barMaxWidth;
            this._barStartX = this._barObjectH.x;
        }
        if (this._barObjectV) {
            this._barMaxHeight = this._barObjectV.height;
            this._barMaxHeightDelta = this.height - this._barMaxHeight;
            this._barStartY = this._barObjectV.y;
        }
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        if (this._barObjectH)
            this._barMaxWidth = this.width - this._barMaxWidthDelta;
        if (this._barObjectV)
            this._barMaxHeight = this.height - this._barMaxHeightDelta;
        if (!this._underConstruct)
            this.update(this._value);
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        if (!buffer.seek(beginPos, 6)) {
            this.update(this._value);
            return;
        }
        if (buffer.readByte() != this.packageItem.objectType) {
            this.update(this._value);
            return;
        }
        this._value = buffer.readInt();
        this._max = buffer.readInt();
        if (buffer.version >= 2)
            this._min = buffer.readInt();
        this.update(this._value);
    }
}

var s_vec2$5 = new Vector2();
class GScrollBar extends GComponent {
    constructor() {
        super();
        this._dragOffset = new Vector2();
        this._scrollPerc = 0;
    }
    setScrollPane(target, vertical) {
        this._target = target;
        this._vertical = vertical;
    }
    setDisplayPerc(value) {
        if (this._vertical) {
            if (!this._fixedGripSize)
                this._grip.height = Math.floor(value * this._bar.height);
            this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;
        }
        else {
            if (!this._fixedGripSize)
                this._grip.width = Math.floor(value * this._bar.width);
            this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
        }
        this._grip.visible = value != 0 && value != 1;
    }
    setScrollPerc(val) {
        this._scrollPerc = val;
        if (this._vertical)
            this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;
        else
            this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
    }
    get minSize() {
        if (this._vertical)
            return (this._arrowButton1 ? this._arrowButton1.height : 0) + (this._arrowButton2 ? this._arrowButton2.height : 0);
        else
            return (this._arrowButton1 ? this._arrowButton1.width : 0) + (this._arrowButton2 ? this._arrowButton2.width : 0);
    }
    get gripDragging() {
        return this._gripDragging;
    }
    constructExtension(buffer) {
        buffer.seek(0, 6);
        this._fixedGripSize = buffer.readBool();
        this._grip = this.getChild("grip");
        if (!this._grip) {
            console.warn("需要定义grip");
            return;
        }
        this._bar = this.getChild("bar");
        if (!this._bar) {
            console.warn("需要定义bar");
            return;
        }
        this._arrowButton1 = this.getChild("arrow1");
        this._arrowButton2 = this.getChild("arrow2");
        this._grip.on("touch_begin", this.__gripTouchBegin, this);
        this._grip.on("touch_move", this.__gripTouchMove, this);
        this._grip.on("touch_end", this.__gripTouchEnd, this);
        this.on("touch_begin", this.__barTouchBegin, this);
        if (this._arrowButton1)
            this._arrowButton1.on("touch_begin", this.__arrowButton1Click, this);
        if (this._arrowButton2)
            this._arrowButton2.on("touch_begin", this.__arrowButton2Click, this);
    }
    __gripTouchBegin(evt) {
        if (this._bar == null)
            return;
        evt.stopPropagation();
        this._gripDragging = true;
        this._target.updateScrollBarVisible();
        this.globalToLocal(evt.input.x, evt.input.y, this._dragOffset);
        this._dragOffset.x -= this._grip.x;
        this._dragOffset.y -= this._grip.y;
    }
    __gripTouchMove(evt) {
        if (!this.onStage)
            return;
        var pt = this.globalToLocal(evt.input.x, evt.input.y, s_vec2$5);
        if (this._vertical) {
            let curY = pt.y - this._dragOffset.y;
            let diff = this._bar.height - this._grip.height;
            if (diff == 0)
                this._target.percY = 0;
            else
                this._target.percY = (curY - this._bar.y) / diff;
        }
        else {
            let curX = pt.x - this._dragOffset.x;
            let diff = this._bar.width - this._grip.width;
            if (diff == 0)
                this._target.percX = 0;
            else
                this._target.percX = (curX - this._bar.x) / (this._bar.width - this._grip.width);
        }
    }
    __gripTouchEnd(evt) {
        this._gripDragging = false;
        this._target.updateScrollBarVisible();
    }
    __arrowButton1Click(evt) {
        evt.stopPropagation();
        if (this._vertical)
            this._target.scrollUp();
        else
            this._target.scrollLeft();
    }
    __arrowButton2Click(evt) {
        evt.stopPropagation();
        if (this._vertical)
            this._target.scrollDown();
        else
            this._target.scrollRight();
    }
    __barTouchBegin(evt) {
        evt.stopPropagation();
        var pt = this._grip.globalToLocal(evt.input.x, evt.input.y, s_vec2$5);
        if (this._vertical) {
            if (pt.y < 0)
                this._target.scrollUp(4);
            else
                this._target.scrollDown(4);
        }
        else {
            if (pt.x < 0)
                this._target.scrollLeft(4);
            else
                this._target.scrollRight(4);
        }
    }
}

class GObjectPool {
    constructor() {
        this._count = 0;
        this._pool = {};
    }
    clear() {
        for (var i1 in this._pool) {
            var arr = this._pool[i1];
            arr.forEach(obj => obj.dispose());
        }
        this._pool = {};
        this._count = 0;
    }
    get count() {
        return this._count;
    }
    getObject(url) {
        url = UIPackage.normalizeURL(url);
        if (url == null)
            return null;
        var arr = this._pool[url];
        if (arr && arr.length > 0) {
            this._count--;
            return arr.shift();
        }
        return UIPackage.createObjectFromURL(url);
    }
    returnObject(obj) {
        var url = obj.resourceURL;
        if (!url)
            return;
        var arr = this._pool[url];
        if (!arr) {
            arr = [];
            this._pool[url] = arr;
        }
        this._count++;
        arr.push(obj);
    }
}

class GList extends GComponent {
    constructor() {
        super();
        this._lineCount = 0;
        this._columnCount = 0;
        this._lineGap = 0;
        this._columnGap = 0;
        this._lastSelectedIndex = 0;
        this._numItems = 0;
        this._firstIndex = 0; //the top left index
        this._curLineItemCount = 0; //item count in one line
        this._virtualListChanged = 0; //1-content changed, 2-size changed
        this.itemInfoVer = 0; //用来标志item是否在本次处理中已经被重用了
        this._trackBounds = true;
        this._pool = new GObjectPool();
        this._layout = ListLayoutType.SingleColumn;
        this._autoResizeItem = true;
        this._lastSelectedIndex = -1;
        this._selectionMode = ListSelectionMode.Single;
        this.opaque = true;
        this.scrollItemToViewOnClick = true;
        this._align = "left";
        this._valign = "top";
        this._container = new DisplayObject();
        this._displayObject.addChild(this._container);
    }
    dispose() {
        this._pool.clear();
        super.dispose();
    }
    get layout() {
        return this._layout;
    }
    set layout(value) {
        if (this._layout != value) {
            this._layout = value;
            this.setBoundsChangedFlag();
            if (this._virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get lineCount() {
        return this._lineCount;
    }
    set lineCount(value) {
        if (this._lineCount != value) {
            this._lineCount = value;
            if (this._layout == ListLayoutType.FlowVertical || this._layout == ListLayoutType.Pagination) {
                this.setBoundsChangedFlag();
                if (this._virtual)
                    this.setVirtualListChangedFlag(true);
            }
        }
    }
    get columnCount() {
        return this._columnCount;
    }
    set columnCount(value) {
        if (this._columnCount != value) {
            this._columnCount = value;
            if (this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.Pagination) {
                this.setBoundsChangedFlag();
                if (this._virtual)
                    this.setVirtualListChangedFlag(true);
            }
        }
    }
    get lineGap() {
        return this._lineGap;
    }
    set lineGap(value) {
        if (this._lineGap != value) {
            this._lineGap = value;
            this.setBoundsChangedFlag();
            if (this._virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get columnGap() {
        return this._columnGap;
    }
    set columnGap(value) {
        if (this._columnGap != value) {
            this._columnGap = value;
            this.setBoundsChangedFlag();
            if (this._virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get align() {
        return this._align;
    }
    set align(value) {
        if (this._align != value) {
            this._align = value;
            this.setBoundsChangedFlag();
            if (this._virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get verticalAlign() {
        return this._valign;
    }
    set verticalAlign(value) {
        if (this._valign != value) {
            this._valign = value;
            this.setBoundsChangedFlag();
            if (this._virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get virtualItemSize() {
        return this._itemSize;
    }
    set virtualItemSize(value) {
        if (this._virtual) {
            if (this._itemSize == null)
                this._itemSize = new Vector2();
            this._itemSize.set(value.x, value.y);
            this.setVirtualListChangedFlag(true);
        }
    }
    get defaultItem() {
        return this._defaultItem;
    }
    set defaultItem(val) {
        this._defaultItem = val;
    }
    get autoResizeItem() {
        return this._autoResizeItem;
    }
    set autoResizeItem(value) {
        if (this._autoResizeItem != value) {
            this._autoResizeItem = value;
            this.setBoundsChangedFlag();
            if (this._virtual)
                this.setVirtualListChangedFlag(true);
        }
    }
    get selectionMode() {
        return this._selectionMode;
    }
    set selectionMode(value) {
        this._selectionMode = value;
    }
    get selectionController() {
        return this._selectionController;
    }
    set selectionController(value) {
        this._selectionController = value;
    }
    get itemPool() {
        return this._pool;
    }
    getFromPool(url) {
        if (!url)
            url = this._defaultItem;
        var obj = this._pool.getObject(url);
        if (obj)
            obj.visible = true;
        return obj;
    }
    returnToPool(obj) {
        this._pool.returnObject(obj);
    }
    addChildAt(child, index) {
        super.addChildAt(child, index);
        if (child instanceof GButton) {
            child.selected = false;
            child.changeStateOnClick = false;
        }
        child.on("click", this.__clickItem, this);
        return child;
    }
    addItem(url) {
        if (!url)
            url = this._defaultItem;
        return this.addChild(UIPackage.createObjectFromURL(url));
    }
    addItemFromPool(url) {
        return this.addChild(this.getFromPool(url));
    }
    removeChildAt(index, dispose) {
        var child = super.removeChildAt(index);
        if (dispose)
            child.dispose();
        else
            child.off("click", this.__clickItem, this);
        return child;
    }
    removeChildToPoolAt(index) {
        var child = super.removeChildAt(index);
        this.returnToPool(child);
    }
    removeChildToPool(child) {
        super.removeChild(child);
        this.returnToPool(child);
    }
    removeChildrenToPool(beginIndex, endIndex) {
        beginIndex = beginIndex || 0;
        if (endIndex == null)
            endIndex = -1;
        if (endIndex < 0 || endIndex >= this._children.length)
            endIndex = this._children.length - 1;
        for (var i = beginIndex; i <= endIndex; ++i)
            this.removeChildToPoolAt(beginIndex);
    }
    get selectedIndex() {
        var i;
        if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
                var ii = this._virtualItems[i];
                if ((ii.obj instanceof GButton) && ii.obj.selected || ii.obj == null && ii.selected) {
                    if (this._loop)
                        return i % this._numItems;
                    else
                        return i;
                }
            }
        }
        else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
                var obj = this._children[i];
                if ((obj instanceof GButton) && obj.selected)
                    return i;
            }
        }
        return -1;
    }
    set selectedIndex(value) {
        if (value >= 0 && value < this.numItems) {
            if (this._selectionMode != ListSelectionMode.Single)
                this.clearSelection();
            this.addSelection(value);
        }
        else
            this.clearSelection();
    }
    getSelection(result) {
        if (!result)
            result = new Array();
        var i;
        if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
                var ii = this._virtualItems[i];
                if ((ii.obj instanceof GButton) && ii.obj.selected
                    || ii.obj == null && ii.selected) {
                    var j = i;
                    if (this._loop) {
                        j = i % this._numItems;
                        if (result.indexOf(j) != -1)
                            continue;
                    }
                    result.push(j);
                }
            }
        }
        else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
                var obj = this._children[i];
                if ((obj instanceof GButton) && obj.selected)
                    result.push(i);
            }
        }
        return result;
    }
    addSelection(index, scrollItToView) {
        if (this._selectionMode == ListSelectionMode.None)
            return;
        this.checkVirtualList();
        if (this._selectionMode == ListSelectionMode.Single)
            this.clearSelection();
        if (scrollItToView)
            this.scrollToView(index);
        this._lastSelectedIndex = index;
        var obj;
        if (this._virtual) {
            var ii = this._virtualItems[index];
            if (ii.obj)
                obj = ii.obj;
            ii.selected = true;
        }
        else
            obj = this.getChildAt(index);
        if ((obj instanceof GButton) && !obj.selected) {
            obj.selected = true;
            this.updateSelectionController(index);
        }
    }
    removeSelection(index) {
        if (this._selectionMode == ListSelectionMode.None)
            return;
        var obj;
        if (this._virtual) {
            var ii = this._virtualItems[index];
            if (ii.obj)
                obj = ii.obj;
            ii.selected = false;
        }
        else
            obj = this.getChildAt(index);
        if (obj instanceof GButton)
            obj.selected = false;
    }
    clearSelection() {
        var i;
        if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
                var ii = this._virtualItems[i];
                if (ii.obj instanceof GButton)
                    ii.obj.selected = false;
                ii.selected = false;
            }
        }
        else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
                var obj = this._children[i];
                if (obj instanceof GButton)
                    obj.selected = false;
            }
        }
    }
    clearSelectionExcept(g) {
        var i;
        if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
                var ii = this._virtualItems[i];
                if (ii.obj != g) {
                    if ((ii.obj instanceof GButton))
                        ii.obj.selected = false;
                    ii.selected = false;
                }
            }
        }
        else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
                var obj = this._children[i];
                if ((obj instanceof GButton) && obj != g)
                    obj.selected = false;
            }
        }
    }
    selectAll() {
        this.checkVirtualList();
        var last = -1;
        var i;
        if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
                var ii = this._virtualItems[i];
                if ((ii.obj instanceof GButton) && !ii.obj.selected) {
                    ii.obj.selected = true;
                    last = i;
                }
                ii.selected = true;
            }
        }
        else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
                var obj = this._children[i];
                if ((obj instanceof GButton) && !obj.selected) {
                    obj.selected = true;
                    last = i;
                }
            }
        }
        if (last != -1)
            this.updateSelectionController(last);
    }
    selectNone() {
        this.clearSelection();
    }
    selectReverse() {
        this.checkVirtualList();
        var last = -1;
        var i;
        if (this._virtual) {
            for (i = 0; i < this._realNumItems; i++) {
                var ii = this._virtualItems[i];
                if (ii.obj instanceof GButton) {
                    ii.obj.selected = !ii.obj.selected;
                    if (ii.obj.selected)
                        last = i;
                }
                ii.selected = !ii.selected;
            }
        }
        else {
            var cnt = this._children.length;
            for (i = 0; i < cnt; i++) {
                var obj = this._children[i];
                if (obj instanceof GButton) {
                    obj.selected = !obj.selected;
                    if (obj.selected)
                        last = i;
                }
            }
        }
        if (last != -1)
            this.updateSelectionController(last);
    }
    handleArrowKey(dir) {
        var index = this.selectedIndex;
        if (index == -1)
            return;
        switch (dir) {
            case 1: //up
                if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowVertical) {
                    index--;
                    if (index >= 0) {
                        this.clearSelection();
                        this.addSelection(index, true);
                    }
                }
                else if (this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.Pagination) {
                    var current = this._children[index];
                    var k = 0;
                    for (var i = index - 1; i >= 0; i--) {
                        var obj = this._children[i];
                        if (obj.y != current.y) {
                            current = obj;
                            break;
                        }
                        k++;
                    }
                    for (; i >= 0; i--) {
                        obj = this._children[i];
                        if (obj.y != current.y) {
                            this.clearSelection();
                            this.addSelection(i + k + 1, true);
                            break;
                        }
                    }
                }
                break;
            case 3: //right
                if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.Pagination) {
                    index++;
                    if (index < this.numItems) {
                        this.clearSelection();
                        this.addSelection(index, true);
                    }
                }
                else if (this._layout == ListLayoutType.FlowVertical) {
                    current = this._children[index];
                    k = 0;
                    var cnt = this._children.length;
                    for (i = index + 1; i < cnt; i++) {
                        obj = this._children[i];
                        if (obj.x != current.x) {
                            current = obj;
                            break;
                        }
                        k++;
                    }
                    for (; i < cnt; i++) {
                        obj = this._children[i];
                        if (obj.x != current.x) {
                            this.clearSelection();
                            this.addSelection(i - k - 1, true);
                            break;
                        }
                    }
                }
                break;
            case 5: //down
                if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowVertical) {
                    index++;
                    if (index < this.numItems) {
                        this.clearSelection();
                        this.addSelection(index, true);
                    }
                }
                else if (this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.Pagination) {
                    current = this._children[index];
                    k = 0;
                    cnt = this._children.length;
                    for (i = index + 1; i < cnt; i++) {
                        obj = this._children[i];
                        if (obj.y != current.y) {
                            current = obj;
                            break;
                        }
                        k++;
                    }
                    for (; i < cnt; i++) {
                        obj = this._children[i];
                        if (obj.y != current.y) {
                            this.clearSelection();
                            this.addSelection(i - k - 1, true);
                            break;
                        }
                    }
                }
                break;
            case 7: //left
                if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.Pagination) {
                    index--;
                    if (index >= 0) {
                        this.clearSelection();
                        this.addSelection(index, true);
                    }
                }
                else if (this._layout == ListLayoutType.FlowVertical) {
                    current = this._children[index];
                    k = 0;
                    for (i = index - 1; i >= 0; i--) {
                        obj = this._children[i];
                        if (obj.x != current.x) {
                            current = obj;
                            break;
                        }
                        k++;
                    }
                    for (; i >= 0; i--) {
                        obj = this._children[i];
                        if (obj.x != current.x) {
                            this.clearSelection();
                            this.addSelection(i + k + 1, true);
                            break;
                        }
                    }
                }
                break;
        }
    }
    __clickItem(evt) {
        if (this._scrollPane && this._scrollPane.isDragged)
            return;
        var item = GObject.cast(evt.sender);
        this.setSelectionOnEvent(item, evt);
        if (this._scrollPane && this.scrollItemToViewOnClick)
            this._scrollPane.scrollToView(item, true);
        this.dispatchItemEvent(item, evt);
    }
    dispatchItemEvent(item, evt) {
        this.dispatchEvent("click_item", item);
    }
    setSelectionOnEvent(item, evt) {
        if (!(item instanceof GButton) || this._selectionMode == ListSelectionMode.None)
            return;
        var dontChangeLastIndex = false;
        var index = this.childIndexToItemIndex(this.getChildIndex(item));
        if (this._selectionMode == ListSelectionMode.Single) {
            if (!item.selected) {
                this.clearSelectionExcept(item);
                item.selected = true;
            }
        }
        else {
            if (evt.input.shiftKey) {
                if (!item.selected) {
                    if (this._lastSelectedIndex != -1) {
                        var min = Math.min(this._lastSelectedIndex, index);
                        var max = Math.max(this._lastSelectedIndex, index);
                        max = Math.min(max, this.numItems - 1);
                        var i;
                        if (this._virtual) {
                            for (i = min; i <= max; i++) {
                                var ii = this._virtualItems[i];
                                if (ii.obj instanceof GButton)
                                    ii.obj.selected = true;
                                ii.selected = true;
                            }
                        }
                        else {
                            for (i = min; i <= max; i++) {
                                var obj = this.getChildAt(i);
                                if (obj instanceof GButton)
                                    obj.selected = true;
                            }
                        }
                        dontChangeLastIndex = true;
                    }
                    else {
                        item.selected = true;
                    }
                }
            }
            else if ((evt.input.ctrlKey || evt.input.commandKey) || this._selectionMode == ListSelectionMode.Multiple_SingleClick) {
                item.selected = !item.selected;
            }
            else {
                if (!item.selected) {
                    this.clearSelectionExcept(item);
                    item.selected = true;
                }
                else
                    this.clearSelectionExcept(item);
            }
        }
        if (!dontChangeLastIndex)
            this._lastSelectedIndex = index;
        if (item.selected)
            this.updateSelectionController(index);
    }
    resizeToFit(itemCount, minSize) {
        this.ensureBoundsCorrect();
        var curCount = this.numItems;
        if (itemCount == null || itemCount > curCount)
            itemCount = curCount;
        minSize = minSize || 0;
        if (this._virtual) {
            var lineCount = Math.ceil(itemCount / this._curLineItemCount);
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal)
                this.viewHeight = lineCount * this._itemSize.y + Math.max(0, lineCount - 1) * this._lineGap;
            else
                this.viewWidth = lineCount * this._itemSize.x + Math.max(0, lineCount - 1) * this._columnGap;
        }
        else if (itemCount == 0) {
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal)
                this.viewHeight = minSize;
            else
                this.viewWidth = minSize;
        }
        else {
            var i = itemCount - 1;
            var obj = null;
            while (i >= 0) {
                obj = this.getChildAt(i);
                if (!this.foldInvisibleItems || obj.visible)
                    break;
                i--;
            }
            if (i < 0) {
                if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal)
                    this.viewHeight = minSize;
                else
                    this.viewWidth = minSize;
            }
            else {
                var size = 0;
                if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
                    size = obj.y + obj.height;
                    if (size < minSize)
                        size = minSize;
                    this.viewHeight = size;
                }
                else {
                    size = obj.x + obj.width;
                    if (size < minSize)
                        size = minSize;
                    this.viewWidth = size;
                }
            }
        }
    }
    getMaxItemWidth() {
        var cnt = this._children.length;
        var max = 0;
        for (var i = 0; i < cnt; i++) {
            var child = this.getChildAt(i);
            if (child.width > max)
                max = child.width;
        }
        return max;
    }
    handleSizeChanged() {
        super.handleSizeChanged();
        this.setBoundsChangedFlag();
        if (this._virtual)
            this.setVirtualListChangedFlag(true);
    }
    handleControllerChanged(c) {
        super.handleControllerChanged(c);
        if (this._selectionController == c)
            this.selectedIndex = c.selectedIndex;
    }
    updateSelectionController(index) {
        if (this._selectionController && !this._selectionController.changing
            && index < this._selectionController.pageCount) {
            var c = this._selectionController;
            this._selectionController = null;
            c.selectedIndex = index;
            this._selectionController = c;
        }
    }
    getSnappingPositionWithDir(xValue, yValue, xDir, yDir, resultPoint) {
        if (this._virtual) {
            if (!resultPoint)
                resultPoint = new Vector2();
            var saved;
            var index;
            var size;
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
                saved = yValue;
                s_n = yValue;
                index = this.getIndexOnPos1(false);
                yValue = s_n;
                if (index < this._virtualItems.length && index < this._realNumItems) {
                    size = this._virtualItems[index].height;
                    if (this.shouldSnapToNext(yDir, saved - yValue, size))
                        yValue += size + this._lineGap;
                }
            }
            else if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowVertical) {
                saved = xValue;
                s_n = xValue;
                index = this.getIndexOnPos2(false);
                xValue = s_n;
                if (index < this._virtualItems.length && index < this._realNumItems) {
                    size = this._virtualItems[index].width;
                    if (this.shouldSnapToNext(xDir, saved - xValue, size))
                        xValue += size + this._columnGap;
                }
            }
            else {
                saved = xValue;
                s_n = xValue;
                index = this.getIndexOnPos3(false);
                xValue = s_n;
                if (index < this._virtualItems.length && index < this._realNumItems) {
                    size = this._virtualItems[index].width;
                    if (this.shouldSnapToNext(xDir, saved - xValue, size))
                        xValue += size + this._columnGap;
                }
            }
            resultPoint.x = xValue;
            resultPoint.y = yValue;
            return resultPoint;
        }
        else
            return super.getSnappingPositionWithDir(xValue, yValue, xDir, yDir, resultPoint);
    }
    scrollToView(index, ani, setFirst) {
        if (this._virtual) {
            if (this._numItems == 0)
                return;
            this.checkVirtualList();
            if (index >= this._virtualItems.length)
                throw new Error("Invalid child index: " + index + ">" + this._virtualItems.length);
            if (this._loop)
                index = Math.floor(this._firstIndex / this._numItems) * this._numItems + index;
            var rect;
            var ii = this._virtualItems[index];
            var pos = 0;
            var i;
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
                for (i = this._curLineItemCount - 1; i < index; i += this._curLineItemCount)
                    pos += this._virtualItems[i].height + this._lineGap;
                rect = new Rect(0, pos, this._itemSize.x, ii.height);
            }
            else if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowVertical) {
                for (i = this._curLineItemCount - 1; i < index; i += this._curLineItemCount)
                    pos += this._virtualItems[i].width + this._columnGap;
                rect = new Rect(pos, 0, ii.width, this._itemSize.y);
            }
            else {
                var page = index / (this._curLineItemCount * this._curLineItemCount2);
                rect = new Rect(page * this.viewWidth + (index % this._curLineItemCount) * (ii.width + this._columnGap), (index / this._curLineItemCount) % this._curLineItemCount2 * (ii.height + this._lineGap), ii.width, ii.height);
            }
            setFirst = true; //因为在可变item大小的情况下，只有设置在最顶端，位置才不会因为高度变化而改变，所以只能支持setFirst=true
            if (this._scrollPane)
                this._scrollPane.scrollToView(rect, ani, setFirst);
        }
        else {
            var obj = this.getChildAt(index);
            if (this._scrollPane)
                this._scrollPane.scrollToView(obj, ani, setFirst);
            else if (this._parent && this._parent.scrollPane)
                this._parent.scrollPane.scrollToView(obj, ani, setFirst);
        }
    }
    getFirstChildInView() {
        return this.childIndexToItemIndex(super.getFirstChildInView());
    }
    childIndexToItemIndex(index) {
        if (!this._virtual)
            return index;
        if (this._layout == ListLayoutType.Pagination) {
            for (var i = this._firstIndex; i < this._realNumItems; i++) {
                if (this._virtualItems[i].obj) {
                    index--;
                    if (index < 0)
                        return i;
                }
            }
            return index;
        }
        else {
            index += this._firstIndex;
            if (this._loop && this._numItems > 0)
                index = index % this._numItems;
            return index;
        }
    }
    itemIndexToChildIndex(index) {
        if (!this._virtual)
            return index;
        if (this._layout == ListLayoutType.Pagination) {
            return this.getChildIndex(this._virtualItems[index].obj);
        }
        else {
            if (this._loop && this._numItems > 0) {
                var j = this._firstIndex % this._numItems;
                if (index >= j)
                    index = index - j;
                else
                    index = this._numItems - j + index;
            }
            else
                index -= this._firstIndex;
            return index;
        }
    }
    setVirtual() {
        this._setVirtual(false);
    }
    /**
     * Set the list to be virtual list, and has loop behavior.
     */
    setVirtualAndLoop() {
        this._setVirtual(true);
    }
    _setVirtual(loop) {
        if (!this._virtual) {
            if (this._scrollPane == null)
                throw new Error("Virtual list must be scrollable!");
            if (loop) {
                if (this._layout == ListLayoutType.FlowHorizontal || this._layout == ListLayoutType.FlowVertical)
                    throw new Error("Loop list instanceof not supported for FlowHorizontal or FlowVertical this.layout!");
                this._scrollPane.bouncebackEffect = false;
            }
            this._virtual = true;
            this._loop = loop;
            this._virtualItems = new Array();
            this.removeChildrenToPool();
            if (this._itemSize == null) {
                this._itemSize = new Vector2();
                var obj = this.getFromPool(null);
                if (obj == null) {
                    throw new Error("Virtual List must have a default list item resource.");
                }
                else {
                    this._itemSize.x = obj.width;
                    this._itemSize.y = obj.height;
                }
                this.returnToPool(obj);
            }
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
                this._scrollPane.scrollStep = this._itemSize.y;
                if (this._loop)
                    this._scrollPane._loop = 2;
            }
            else {
                this._scrollPane.scrollStep = this._itemSize.x;
                if (this._loop)
                    this._scrollPane._loop = 1;
            }
            this.on("scroll", this.__scrolled, this);
            this.setVirtualListChangedFlag(true);
        }
    }
    get numItems() {
        if (this._virtual)
            return this._numItems;
        else
            return this._children.length;
    }
    set numItems(value) {
        var i;
        if (this._virtual) {
            if (this.itemRenderer == null)
                throw new Error("set itemRenderer first!");
            this._numItems = value;
            if (this._loop)
                this._realNumItems = this._numItems * 6; //设置6倍数量，用于循环滚动
            else
                this._realNumItems = this._numItems;
            //_virtualItems的设计是只增不减的
            var oldCount = this._virtualItems.length;
            if (this._realNumItems > oldCount) {
                for (i = oldCount; i < this._realNumItems; i++) {
                    var ii = { width: 0, height: 0, flag: 0 };
                    ii.width = this._itemSize.x;
                    ii.height = this._itemSize.y;
                    this._virtualItems.push(ii);
                }
            }
            else {
                for (i = this._realNumItems; i < oldCount; i++)
                    this._virtualItems[i].selected = false;
            }
            if (this._virtualListChanged != 0)
                Timers.remove(this._refreshVirtualList, this);
            //立即刷新
            this._refreshVirtualList();
        }
        else {
            var cnt = this._children.length;
            if (value > cnt) {
                for (i = cnt; i < value; i++) {
                    if (this.itemProvider == null)
                        this.addItemFromPool();
                    else
                        this.addItemFromPool(this.itemProvider(i));
                }
            }
            else {
                this.removeChildrenToPool(value, cnt);
            }
            if (this.itemRenderer) {
                for (i = 0; i < value; i++)
                    this.itemRenderer(i, this.getChildAt(i));
            }
        }
    }
    refreshVirtualList() {
        this.setVirtualListChangedFlag(false);
    }
    checkVirtualList() {
        if (this._virtualListChanged != 0) {
            this._refreshVirtualList();
            Timers.remove(this._refreshVirtualList, this);
        }
    }
    setVirtualListChangedFlag(layoutChanged) {
        if (layoutChanged)
            this._virtualListChanged = 2;
        else if (this._virtualListChanged == 0)
            this._virtualListChanged = 1;
        Timers.callLater(this._refreshVirtualList, this);
    }
    _refreshVirtualList() {
        if (!this._displayObject)
            return;
        var layoutChanged = this._virtualListChanged == 2;
        this._virtualListChanged = 0;
        this._eventLocked = true;
        if (layoutChanged) {
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.SingleRow)
                this._curLineItemCount = 1;
            else if (this._layout == ListLayoutType.FlowHorizontal) {
                if (this._columnCount > 0)
                    this._curLineItemCount = this._columnCount;
                else {
                    this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.x + this._columnGap));
                    if (this._curLineItemCount <= 0)
                        this._curLineItemCount = 1;
                }
            }
            else if (this._layout == ListLayoutType.FlowVertical) {
                if (this._lineCount > 0)
                    this._curLineItemCount = this._lineCount;
                else {
                    this._curLineItemCount = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.y + this._lineGap));
                    if (this._curLineItemCount <= 0)
                        this._curLineItemCount = 1;
                }
            }
            else //pagination
             {
                if (this._columnCount > 0)
                    this._curLineItemCount = this._columnCount;
                else {
                    this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.x + this._columnGap));
                    if (this._curLineItemCount <= 0)
                        this._curLineItemCount = 1;
                }
                if (this._lineCount > 0)
                    this._curLineItemCount2 = this._lineCount;
                else {
                    this._curLineItemCount2 = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.y + this._lineGap));
                    if (this._curLineItemCount2 <= 0)
                        this._curLineItemCount2 = 1;
                }
            }
        }
        var ch = 0, cw = 0;
        if (this._realNumItems > 0) {
            var i;
            var len = Math.ceil(this._realNumItems / this._curLineItemCount) * this._curLineItemCount;
            var len2 = Math.min(this._curLineItemCount, this._realNumItems);
            if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
                for (i = 0; i < len; i += this._curLineItemCount)
                    ch += this._virtualItems[i].height + this._lineGap;
                if (ch > 0)
                    ch -= this._lineGap;
                if (this._autoResizeItem)
                    cw = this._scrollPane.viewWidth;
                else {
                    for (i = 0; i < len2; i++)
                        cw += this._virtualItems[i].width + this._columnGap;
                    if (cw > 0)
                        cw -= this._columnGap;
                }
            }
            else if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowVertical) {
                for (i = 0; i < len; i += this._curLineItemCount)
                    cw += this._virtualItems[i].width + this._columnGap;
                if (cw > 0)
                    cw -= this._columnGap;
                if (this._autoResizeItem)
                    ch = this._scrollPane.viewHeight;
                else {
                    for (i = 0; i < len2; i++)
                        ch += this._virtualItems[i].height + this._lineGap;
                    if (ch > 0)
                        ch -= this._lineGap;
                }
            }
            else {
                var pageCount = Math.ceil(len / (this._curLineItemCount * this._curLineItemCount2));
                cw = pageCount * this.viewWidth;
                ch = this.viewHeight;
            }
        }
        this.handleAlign(cw, ch);
        this._scrollPane.setContentSize(cw, ch);
        this._eventLocked = false;
        this.handleScroll(true);
    }
    __scrolled() {
        this.handleScroll(false);
    }
    getIndexOnPos1(forceUpdate) {
        if (this._realNumItems < this._curLineItemCount) {
            s_n = 0;
            return 0;
        }
        var i;
        var pos2;
        var pos3;
        if (this.numChildren > 0 && !forceUpdate) {
            pos2 = this.getChildAt(0).y;
            if (pos2 > s_n) {
                for (i = this._firstIndex - this._curLineItemCount; i >= 0; i -= this._curLineItemCount) {
                    pos2 -= (this._virtualItems[i].height + this._lineGap);
                    if (pos2 <= s_n) {
                        s_n = pos2;
                        return i;
                    }
                }
                s_n = 0;
                return 0;
            }
            else {
                for (i = this._firstIndex; i < this._realNumItems; i += this._curLineItemCount) {
                    pos3 = pos2 + this._virtualItems[i].height + this._lineGap;
                    if (pos3 > s_n) {
                        s_n = pos2;
                        return i;
                    }
                    pos2 = pos3;
                }
                s_n = pos2;
                return this._realNumItems - this._curLineItemCount;
            }
        }
        else {
            pos2 = 0;
            for (i = 0; i < this._realNumItems; i += this._curLineItemCount) {
                pos3 = pos2 + this._virtualItems[i].height + this._lineGap;
                if (pos3 > s_n) {
                    s_n = pos2;
                    return i;
                }
                pos2 = pos3;
            }
            s_n = pos2;
            return this._realNumItems - this._curLineItemCount;
        }
    }
    getIndexOnPos2(forceUpdate) {
        if (this._realNumItems < this._curLineItemCount) {
            s_n = 0;
            return 0;
        }
        var i;
        var pos2;
        var pos3;
        if (this.numChildren > 0 && !forceUpdate) {
            pos2 = this.getChildAt(0).x;
            if (pos2 > s_n) {
                for (i = this._firstIndex - this._curLineItemCount; i >= 0; i -= this._curLineItemCount) {
                    pos2 -= (this._virtualItems[i].width + this._columnGap);
                    if (pos2 <= s_n) {
                        s_n = pos2;
                        return i;
                    }
                }
                s_n = 0;
                return 0;
            }
            else {
                for (i = this._firstIndex; i < this._realNumItems; i += this._curLineItemCount) {
                    pos3 = pos2 + this._virtualItems[i].width + this._columnGap;
                    if (pos3 > s_n) {
                        s_n = pos2;
                        return i;
                    }
                    pos2 = pos3;
                }
                s_n = pos2;
                return this._realNumItems - this._curLineItemCount;
            }
        }
        else {
            pos2 = 0;
            for (i = 0; i < this._realNumItems; i += this._curLineItemCount) {
                pos3 = pos2 + this._virtualItems[i].width + this._columnGap;
                if (pos3 > s_n) {
                    s_n = pos2;
                    return i;
                }
                pos2 = pos3;
            }
            s_n = pos2;
            return this._realNumItems - this._curLineItemCount;
        }
    }
    getIndexOnPos3(forceUpdate) {
        if (this._realNumItems < this._curLineItemCount) {
            s_n = 0;
            return 0;
        }
        var viewWidth = this.viewWidth;
        var page = Math.floor(s_n / viewWidth);
        var startIndex = page * (this._curLineItemCount * this._curLineItemCount2);
        var pos2 = page * viewWidth;
        var i;
        var pos3;
        for (i = 0; i < this._curLineItemCount; i++) {
            pos3 = pos2 + this._virtualItems[startIndex + i].width + this._columnGap;
            if (pos3 > s_n) {
                s_n = pos2;
                return startIndex + i;
            }
            pos2 = pos3;
        }
        s_n = pos2;
        return startIndex + this._curLineItemCount - 1;
    }
    handleScroll(forceUpdate) {
        if (this._eventLocked)
            return;
        if (this._layout == ListLayoutType.SingleColumn || this._layout == ListLayoutType.FlowHorizontal) {
            var enterCounter = 0;
            while (this.handleScroll1(forceUpdate)) {
                enterCounter++;
                forceUpdate = false;
                if (enterCounter > 20) {
                    console.log("list will never be <the> filled item renderer function always returns a different size.");
                    break;
                }
            }
            this.handleArchOrder1();
        }
        else if (this._layout == ListLayoutType.SingleRow || this._layout == ListLayoutType.FlowVertical) {
            enterCounter = 0;
            while (this.handleScroll2(forceUpdate)) {
                enterCounter++;
                forceUpdate = false;
                if (enterCounter > 20) {
                    console.log("list will never be <the> filled item renderer function always returns a different size.");
                    break;
                }
            }
            this.handleArchOrder2();
        }
        else {
            this.handleScroll3(forceUpdate);
        }
        this._boundsChanged = false;
    }
    handleScroll1(forceUpdate) {
        var pos = this._scrollPane.scrollingPosY;
        var max = pos + this._scrollPane.viewHeight;
        var end = max == this._scrollPane.contentHeight; //这个标志表示当前需要滚动到最末，无论内容变化大小
        //寻找当前位置的第一条项目
        s_n = pos;
        var newFirstIndex = this.getIndexOnPos1(forceUpdate);
        pos = s_n;
        if (newFirstIndex == this._firstIndex && !forceUpdate)
            return false;
        var oldFirstIndex = this._firstIndex;
        this._firstIndex = newFirstIndex;
        var curIndex = newFirstIndex;
        var forward = oldFirstIndex > newFirstIndex;
        var childCount = this.numChildren;
        var lastIndex = oldFirstIndex + childCount - 1;
        var reuseIndex = forward ? lastIndex : oldFirstIndex;
        var curX = 0, curY = pos;
        var needRender;
        var deltaSize = 0;
        var firstItemDeltaSize = 0;
        var url = this.defaultItem;
        var ii, ii2;
        var i, j;
        var partSize = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
        this.itemInfoVer++;
        while (curIndex < this._realNumItems && (end || curY < max)) {
            ii = this._virtualItems[curIndex];
            if (ii.obj == null || forceUpdate) {
                if (this.itemProvider) {
                    url = this.itemProvider(curIndex % this._numItems);
                    if (url == null)
                        url = this._defaultItem;
                    url = UIPackage.normalizeURL(url);
                }
                if (ii.obj && ii.obj.resourceURL != url) {
                    if (ii.obj instanceof GButton)
                        ii.selected = ii.obj.selected;
                    this.removeChildToPool(ii.obj);
                    ii.obj = null;
                }
            }
            if (ii.obj == null) {
                //搜索最适合的重用item，保证每次刷新需要新建或者重新render的item最少
                if (forward) {
                    for (j = reuseIndex; j >= oldFirstIndex; j--) {
                        ii2 = this._virtualItems[j];
                        if (ii2.obj && ii2.flag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                            if (ii2.obj instanceof GButton)
                                ii2.selected = ii2.obj.selected;
                            ii.obj = ii2.obj;
                            ii2.obj = null;
                            if (j == reuseIndex)
                                reuseIndex--;
                            break;
                        }
                    }
                }
                else {
                    for (j = reuseIndex; j <= lastIndex; j++) {
                        ii2 = this._virtualItems[j];
                        if (ii2.obj && ii2.flag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                            if (ii2.obj instanceof GButton)
                                ii2.selected = ii2.obj.selected;
                            ii.obj = ii2.obj;
                            ii2.obj = null;
                            if (j == reuseIndex)
                                reuseIndex++;
                            break;
                        }
                    }
                }
                if (ii.obj) {
                    this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
                }
                else {
                    ii.obj = this._pool.getObject(url);
                    if (forward)
                        this.addChildAt(ii.obj, curIndex - newFirstIndex);
                    else
                        this.addChild(ii.obj);
                }
                if (ii.obj instanceof GButton)
                    ii.obj.selected = ii.selected;
                needRender = true;
            }
            else
                needRender = forceUpdate;
            if (needRender) {
                if (this._autoResizeItem && (this._layout == ListLayoutType.SingleColumn || this._columnCount > 0))
                    ii.obj.setSize(partSize, ii.obj.height, true);
                this.itemRenderer(curIndex % this._numItems, ii.obj);
                if (curIndex % this._curLineItemCount == 0) {
                    deltaSize += Math.ceil(ii.obj.height) - ii.height;
                    if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex) {
                        //当内容向下滚动时，如果新出现的项目大小发生变化，需要做一个位置补偿，才不会导致滚动跳动
                        firstItemDeltaSize = Math.ceil(ii.obj.height) - ii.height;
                    }
                }
                ii.width = Math.ceil(ii.obj.width);
                ii.height = Math.ceil(ii.obj.height);
            }
            ii.flag = this.itemInfoVer;
            ii.obj.setPosition(curX, curY);
            if (curIndex == newFirstIndex) //要显示多一条才不会穿帮
                max += ii.height;
            curX += ii.width + this._columnGap;
            if (curIndex % this._curLineItemCount == this._curLineItemCount - 1) {
                curX = 0;
                curY += ii.height + this._lineGap;
            }
            curIndex++;
        }
        for (i = 0; i < childCount; i++) {
            ii = this._virtualItems[oldFirstIndex + i];
            if (ii.flag != this.itemInfoVer && ii.obj) {
                if (ii.obj instanceof GButton)
                    ii.selected = ii.obj.selected;
                this.removeChildToPool(ii.obj);
                ii.obj = null;
            }
        }
        childCount = this._children.length;
        for (i = 0; i < childCount; i++) {
            var obj = this._virtualItems[newFirstIndex + i].obj;
            if (this._children[i] != obj)
                this.setChildIndex(obj, i);
        }
        if (deltaSize != 0 || firstItemDeltaSize != 0)
            this._scrollPane.changeContentSizeOnScrolling(0, deltaSize, 0, firstItemDeltaSize);
        if (curIndex > 0 && this.numChildren > 0 && this._container.y <= 0 && this.getChildAt(0).y > -this._container.y) //最后一页没填满！
            return true;
        else
            return false;
    }
    handleScroll2(forceUpdate) {
        var pos = this._scrollPane.scrollingPosX;
        var max = pos + this._scrollPane.viewWidth;
        var end = pos == this._scrollPane.contentWidth; //这个标志表示当前需要滚动到最末，无论内容变化大小
        //寻找当前位置的第一条项目
        s_n = pos;
        var newFirstIndex = this.getIndexOnPos2(forceUpdate);
        pos = s_n;
        if (newFirstIndex == this._firstIndex && !forceUpdate)
            return false;
        var oldFirstIndex = this._firstIndex;
        this._firstIndex = newFirstIndex;
        var curIndex = newFirstIndex;
        var forward = oldFirstIndex > newFirstIndex;
        var childCount = this.numChildren;
        var lastIndex = oldFirstIndex + childCount - 1;
        var reuseIndex = forward ? lastIndex : oldFirstIndex;
        var curX = pos, curY = 0;
        var needRender;
        var deltaSize = 0;
        var firstItemDeltaSize = 0;
        var url = this.defaultItem;
        var ii, ii2;
        var i, j;
        var partSize = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
        this.itemInfoVer++;
        while (curIndex < this._realNumItems && (end || curX < max)) {
            ii = this._virtualItems[curIndex];
            if (ii.obj == null || forceUpdate) {
                if (this.itemProvider) {
                    url = this.itemProvider(curIndex % this._numItems);
                    if (url == null)
                        url = this._defaultItem;
                    url = UIPackage.normalizeURL(url);
                }
                if (ii.obj && ii.obj.resourceURL != url) {
                    if (ii.obj instanceof GButton)
                        ii.selected = ii.obj.selected;
                    this.removeChildToPool(ii.obj);
                    ii.obj = null;
                }
            }
            if (ii.obj == null) {
                if (forward) {
                    for (j = reuseIndex; j >= oldFirstIndex; j--) {
                        ii2 = this._virtualItems[j];
                        if (ii2.obj && ii2.flag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                            if (ii2.obj instanceof GButton)
                                ii2.selected = ii2.obj.selected;
                            ii.obj = ii2.obj;
                            ii2.obj = null;
                            if (j == reuseIndex)
                                reuseIndex--;
                            break;
                        }
                    }
                }
                else {
                    for (j = reuseIndex; j <= lastIndex; j++) {
                        ii2 = this._virtualItems[j];
                        if (ii2.obj && ii2.flag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                            if (ii2.obj instanceof GButton)
                                ii2.selected = ii2.obj.selected;
                            ii.obj = ii2.obj;
                            ii2.obj = null;
                            if (j == reuseIndex)
                                reuseIndex++;
                            break;
                        }
                    }
                }
                if (ii.obj) {
                    this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
                }
                else {
                    ii.obj = this._pool.getObject(url);
                    if (forward)
                        this.addChildAt(ii.obj, curIndex - newFirstIndex);
                    else
                        this.addChild(ii.obj);
                }
                if (ii.obj instanceof GButton)
                    ii.obj.selected = ii.selected;
                needRender = true;
            }
            else
                needRender = forceUpdate;
            if (needRender) {
                if (this._autoResizeItem && (this._layout == ListLayoutType.SingleRow || this._lineCount > 0))
                    ii.obj.setSize(ii.obj.width, partSize, true);
                this.itemRenderer(curIndex % this._numItems, ii.obj);
                if (curIndex % this._curLineItemCount == 0) {
                    deltaSize += Math.ceil(ii.obj.width) - ii.width;
                    if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex) {
                        //当内容向下滚动时，如果新出现的一个项目大小发生变化，需要做一个位置补偿，才不会导致滚动跳动
                        firstItemDeltaSize = Math.ceil(ii.obj.width) - ii.width;
                    }
                }
                ii.width = Math.ceil(ii.obj.width);
                ii.height = Math.ceil(ii.obj.height);
            }
            ii.flag = this.itemInfoVer;
            ii.obj.setPosition(curX, curY);
            if (curIndex == newFirstIndex) //要显示多一条才不会穿帮
                max += ii.width;
            curY += ii.height + this._lineGap;
            if (curIndex % this._curLineItemCount == this._curLineItemCount - 1) {
                curY = 0;
                curX += ii.width + this._columnGap;
            }
            curIndex++;
        }
        for (i = 0; i < childCount; i++) {
            ii = this._virtualItems[oldFirstIndex + i];
            if (ii.flag != this.itemInfoVer && ii.obj) {
                if (ii.obj instanceof GButton)
                    ii.selected = ii.obj.selected;
                this.removeChildToPool(ii.obj);
                ii.obj = null;
            }
        }
        childCount = this._children.length;
        for (i = 0; i < childCount; i++) {
            var obj = this._virtualItems[newFirstIndex + i].obj;
            if (this._children[i] != obj)
                this.setChildIndex(obj, i);
        }
        if (deltaSize != 0 || firstItemDeltaSize != 0)
            this._scrollPane.changeContentSizeOnScrolling(deltaSize, 0, firstItemDeltaSize, 0);
        if (curIndex > 0 && this.numChildren > 0 && this._container.x <= 0 && this.getChildAt(0).x > -this._container.x) //最后一页没填满！
            return true;
        else
            return false;
    }
    handleScroll3(forceUpdate) {
        var pos = this._scrollPane.scrollingPosX;
        //寻找当前位置的第一条项目
        s_n = pos;
        var newFirstIndex = this.getIndexOnPos3(forceUpdate);
        pos = s_n;
        if (newFirstIndex == this._firstIndex && !forceUpdate)
            return;
        var oldFirstIndex = this._firstIndex;
        this._firstIndex = newFirstIndex;
        //分页模式不支持不等高，所以渲染满一页就好了
        var reuseIndex = oldFirstIndex;
        var virtualItemCount = this._virtualItems.length;
        var pageSize = this._curLineItemCount * this._curLineItemCount2;
        var startCol = newFirstIndex % this._curLineItemCount;
        var viewWidth = this.viewWidth;
        var page = Math.floor(newFirstIndex / pageSize);
        var startIndex = page * pageSize;
        var lastIndex = startIndex + pageSize * 2; //测试两页
        var needRender;
        var i;
        var ii, ii2;
        var col;
        var url = this._defaultItem;
        var partWidth = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
        var partHeight = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount2 - 1)) / this._curLineItemCount2;
        this.itemInfoVer++;
        //先标记这次要用到的项目
        for (i = startIndex; i < lastIndex; i++) {
            if (i >= this._realNumItems)
                continue;
            col = i % this._curLineItemCount;
            if (i - startIndex < pageSize) {
                if (col < startCol)
                    continue;
            }
            else {
                if (col > startCol)
                    continue;
            }
            ii = this._virtualItems[i];
            ii.flag = this.itemInfoVer;
        }
        var lastObj = null;
        var insertIndex = 0;
        for (i = startIndex; i < lastIndex; i++) {
            if (i >= this._realNumItems)
                continue;
            ii = this._virtualItems[i];
            if (ii.flag != this.itemInfoVer)
                continue;
            if (ii.obj == null) {
                //寻找看有没有可重用的
                while (reuseIndex < virtualItemCount) {
                    ii2 = this._virtualItems[reuseIndex];
                    if (ii2.obj && ii2.flag != this.itemInfoVer) {
                        if (ii2.obj instanceof GButton)
                            ii2.selected = ii2.obj.selected;
                        ii.obj = ii2.obj;
                        ii2.obj = null;
                        break;
                    }
                    reuseIndex++;
                }
                if (insertIndex == -1)
                    insertIndex = this.getChildIndex(lastObj) + 1;
                if (ii.obj == null) {
                    if (this.itemProvider) {
                        url = this.itemProvider(i % this._numItems);
                        if (url == null)
                            url = this._defaultItem;
                        url = UIPackage.normalizeURL(url);
                    }
                    ii.obj = this._pool.getObject(url);
                    this.addChildAt(ii.obj, insertIndex);
                }
                else {
                    insertIndex = this.setChildIndexBefore(ii.obj, insertIndex);
                }
                insertIndex++;
                if (ii.obj instanceof GButton)
                    ii.obj.selected = ii.selected;
                needRender = true;
            }
            else {
                needRender = forceUpdate;
                insertIndex = -1;
                lastObj = ii.obj;
            }
            if (needRender) {
                if (this._autoResizeItem) {
                    if (this._curLineItemCount == this._columnCount && this._curLineItemCount2 == this._lineCount)
                        ii.obj.setSize(partWidth, partHeight, true);
                    else if (this._curLineItemCount == this._columnCount)
                        ii.obj.setSize(partWidth, ii.obj.height, true);
                    else if (this._curLineItemCount2 == this._lineCount)
                        ii.obj.setSize(ii.obj.width, partHeight, true);
                }
                this.itemRenderer(i % this._numItems, ii.obj);
                ii.width = Math.ceil(ii.obj.width);
                ii.height = Math.ceil(ii.obj.height);
            }
        }
        //排列item
        var borderX = (startIndex / pageSize) * viewWidth;
        var xx = borderX;
        var yy = 0;
        var lineHeight = 0;
        for (i = startIndex; i < lastIndex; i++) {
            if (i >= this._realNumItems)
                continue;
            ii = this._virtualItems[i];
            if (ii.flag == this.itemInfoVer)
                ii.obj.setPosition(xx, yy);
            if (ii.height > lineHeight)
                lineHeight = ii.height;
            if (i % this._curLineItemCount == this._curLineItemCount - 1) {
                xx = borderX;
                yy += lineHeight + this._lineGap;
                lineHeight = 0;
                if (i == startIndex + pageSize - 1) {
                    borderX += viewWidth;
                    xx = borderX;
                    yy = 0;
                }
            }
            else
                xx += ii.width + this._columnGap;
        }
        //释放未使用的
        for (i = reuseIndex; i < virtualItemCount; i++) {
            ii = this._virtualItems[i];
            if (ii.flag != this.itemInfoVer && ii.obj) {
                if (ii.obj instanceof GButton)
                    ii.selected = ii.obj.selected;
                this.removeChildToPool(ii.obj);
                ii.obj = null;
            }
        }
    }
    handleArchOrder1() {
        if (this.childrenRenderOrder == ChildrenRenderOrder.Arch) {
            var mid = this._scrollPane.posY + this.viewHeight / 2;
            var minDist = Number.POSITIVE_INFINITY;
            var dist = 0;
            var apexIndex = 0;
            var cnt = this.numChildren;
            for (var i = 0; i < cnt; i++) {
                var obj = this.getChildAt(i);
                if (!this.foldInvisibleItems || obj.visible) {
                    dist = Math.abs(mid - obj.y - obj.height / 2);
                    if (dist < minDist) {
                        minDist = dist;
                        apexIndex = i;
                    }
                }
            }
            this.apexIndex = apexIndex;
        }
    }
    handleArchOrder2() {
        if (this.childrenRenderOrder == ChildrenRenderOrder.Arch) {
            var mid = this._scrollPane.posX + this.viewWidth / 2;
            var minDist = Number.POSITIVE_INFINITY;
            var dist = 0;
            var apexIndex = 0;
            var cnt = this.numChildren;
            for (var i = 0; i < cnt; i++) {
                var obj = this.getChildAt(i);
                if (!this.foldInvisibleItems || obj.visible) {
                    dist = Math.abs(mid - obj.x - obj.width / 2);
                    if (dist < minDist) {
                        minDist = dist;
                        apexIndex = i;
                    }
                }
            }
            this.apexIndex = apexIndex;
        }
    }
    handleAlign(contentWidth, contentHeight) {
        var newOffsetX = 0;
        var newOffsetY = 0;
        if (contentHeight < this.viewHeight) {
            if (this._valign == "middle")
                newOffsetY = Math.floor((this.viewHeight - contentHeight) / 2);
            else if (this._valign == "bottom")
                newOffsetY = this.viewHeight - contentHeight;
        }
        if (contentWidth < this.viewWidth) {
            if (this._align == "center")
                newOffsetX = Math.floor((this.viewWidth - contentWidth) / 2);
            else if (this._align == "right")
                newOffsetX = this.viewWidth - contentWidth;
        }
        if (newOffsetX != this._alignOffset.x || newOffsetY != this._alignOffset.y) {
            this._alignOffset.set(newOffsetX, newOffsetY);
            if (this._scrollPane)
                this._scrollPane.adjustMaskContainer();
            else
                this._container.setPosition(this._margin.left + this._alignOffset.x, this._margin.top + this._alignOffset.y);
        }
    }
    updateBounds() {
        if (this._virtual)
            return;
        var i;
        var child;
        var curX = 0;
        var curY = 0;
        var maxWidth = 0;
        var maxHeight = 0;
        var cw, ch;
        var j = 0;
        var page = 0;
        var k = 0;
        var cnt = this._children.length;
        var viewWidth = this.viewWidth;
        var viewHeight = this.viewHeight;
        var lineSize = 0;
        var lineStart = 0;
        var ratio;
        if (this._layout == ListLayoutType.SingleColumn) {
            for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible)
                    continue;
                if (curY != 0)
                    curY += this._lineGap;
                child.y = curY;
                if (this._autoResizeItem)
                    child.setSize(viewWidth, child.height, true);
                curY += Math.ceil(child.height);
                if (child.width > maxWidth)
                    maxWidth = child.width;
            }
            ch = curY;
            if (ch <= viewHeight && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.vtScrollBar) {
                viewWidth += this._scrollPane.vtScrollBar.width;
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    child.setSize(viewWidth, child.height, true);
                    if (child.width > maxWidth)
                        maxWidth = child.width;
                }
            }
            cw = Math.ceil(maxWidth);
        }
        else if (this._layout == ListLayoutType.SingleRow) {
            for (i = 0; i < cnt; i++) {
                child = this.getChildAt(i);
                if (this.foldInvisibleItems && !child.visible)
                    continue;
                if (curX != 0)
                    curX += this._columnGap;
                child.x = curX;
                if (this._autoResizeItem)
                    child.setSize(child.width, viewHeight, true);
                curX += Math.ceil(child.width);
                if (child.height > maxHeight)
                    maxHeight = child.height;
            }
            cw = curX;
            if (cw <= viewWidth && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.hzScrollBar) {
                viewHeight += this._scrollPane.hzScrollBar.height;
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    child.setSize(child.width, viewHeight, true);
                    if (child.height > maxHeight)
                        maxHeight = child.height;
                }
            }
            ch = Math.ceil(maxHeight);
        }
        else if (this._layout == ListLayoutType.FlowHorizontal) {
            if (this._autoResizeItem && this._columnCount > 0) {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    lineSize += child.sourceWidth;
                    j++;
                    if (j == this._columnCount || i == cnt - 1) {
                        ratio = (viewWidth - lineSize - (j - 1) * this._columnGap) / lineSize;
                        curX = 0;
                        for (j = lineStart; j <= i; j++) {
                            child = this.getChildAt(j);
                            if (this.foldInvisibleItems && !child.visible)
                                continue;
                            child.setPosition(curX, curY);
                            if (j < i) {
                                child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), child.height, true);
                                curX += Math.ceil(child.width) + this._columnGap;
                            }
                            else {
                                child.setSize(viewWidth - curX, child.height, true);
                            }
                            if (child.height > maxHeight)
                                maxHeight = child.height;
                        }
                        //new line
                        curY += Math.ceil(maxHeight) + this._lineGap;
                        maxHeight = 0;
                        j = 0;
                        lineStart = i + 1;
                        lineSize = 0;
                    }
                }
                ch = curY + Math.ceil(maxHeight);
                cw = viewWidth;
            }
            else {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    if (curX != 0)
                        curX += this._columnGap;
                    if (this._columnCount != 0 && j >= this._columnCount
                        || this._columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0) {
                        //new line
                        curX = 0;
                        curY += Math.ceil(maxHeight) + this._lineGap;
                        maxHeight = 0;
                        j = 0;
                    }
                    child.setPosition(curX, curY);
                    curX += Math.ceil(child.width);
                    if (curX > maxWidth)
                        maxWidth = curX;
                    if (child.height > maxHeight)
                        maxHeight = child.height;
                    j++;
                }
                ch = curY + Math.ceil(maxHeight);
                cw = Math.ceil(maxWidth);
            }
        }
        else if (this._layout == ListLayoutType.FlowVertical) {
            if (this._autoResizeItem && this._lineCount > 0) {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    lineSize += child.sourceHeight;
                    j++;
                    if (j == this._lineCount || i == cnt - 1) {
                        ratio = (viewHeight - lineSize - (j - 1) * this._lineGap) / lineSize;
                        curY = 0;
                        for (j = lineStart; j <= i; j++) {
                            child = this.getChildAt(j);
                            if (this.foldInvisibleItems && !child.visible)
                                continue;
                            child.setPosition(curX, curY);
                            if (j < i) {
                                child.setSize(child.width, child.sourceHeight + Math.round(child.sourceHeight * ratio), true);
                                curY += Math.ceil(child.height) + this._lineGap;
                            }
                            else {
                                child.setSize(child.width, viewHeight - curY, true);
                            }
                            if (child.width > maxWidth)
                                maxWidth = child.width;
                        }
                        //new line
                        curX += Math.ceil(maxWidth) + this._columnGap;
                        maxWidth = 0;
                        j = 0;
                        lineStart = i + 1;
                        lineSize = 0;
                    }
                }
                cw = curX + Math.ceil(maxWidth);
                ch = viewHeight;
            }
            else {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    if (curY != 0)
                        curY += this._lineGap;
                    if (this._lineCount != 0 && j >= this._lineCount
                        || this._lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0) {
                        curY = 0;
                        curX += Math.ceil(maxWidth) + this._columnGap;
                        maxWidth = 0;
                        j = 0;
                    }
                    child.setPosition(curX, curY);
                    curY += Math.ceil(child.height);
                    if (curY > maxHeight)
                        maxHeight = curY;
                    if (child.width > maxWidth)
                        maxWidth = child.width;
                    j++;
                }
                cw = curX + Math.ceil(maxWidth);
                ch = Math.ceil(maxHeight);
            }
        }
        else //pagination
         {
            var eachHeight;
            if (this._autoResizeItem && this._lineCount > 0)
                eachHeight = Math.floor((viewHeight - (this._lineCount - 1) * this._lineGap) / this._lineCount);
            if (this._autoResizeItem && this._columnCount > 0) {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    if (j == 0 && (this._lineCount != 0 && k >= this._lineCount
                        || this._lineCount == 0 && curY + child.height > viewHeight)) {
                        //new page
                        page++;
                        curY = 0;
                        k = 0;
                    }
                    lineSize += child.sourceWidth;
                    j++;
                    if (j == this._columnCount || i == cnt - 1) {
                        ratio = (viewWidth - lineSize - (j - 1) * this._columnGap) / lineSize;
                        curX = 0;
                        for (j = lineStart; j <= i; j++) {
                            child = this.getChildAt(j);
                            if (this.foldInvisibleItems && !child.visible)
                                continue;
                            child.setPosition(page * viewWidth + curX, curY);
                            if (j < i) {
                                child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), this._lineCount > 0 ? eachHeight : child.height, true);
                                curX += Math.ceil(child.width) + this._columnGap;
                            }
                            else {
                                child.setSize(viewWidth - curX, this._lineCount > 0 ? eachHeight : child.height, true);
                            }
                            if (child.height > maxHeight)
                                maxHeight = child.height;
                        }
                        //new line
                        curY += Math.ceil(maxHeight) + this._lineGap;
                        maxHeight = 0;
                        j = 0;
                        lineStart = i + 1;
                        lineSize = 0;
                        k++;
                    }
                }
            }
            else {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    if (curX != 0)
                        curX += this._columnGap;
                    if (this._autoResizeItem && this._lineCount > 0)
                        child.setSize(child.width, eachHeight, true);
                    if (this._columnCount != 0 && j >= this._columnCount
                        || this._columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0) {
                        //new line
                        curX = 0;
                        curY += Math.ceil(maxHeight) + this._lineGap;
                        maxHeight = 0;
                        j = 0;
                        k++;
                        if (this._lineCount != 0 && k >= this._lineCount
                            || this._lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0) //new page
                         {
                            page++;
                            curY = 0;
                            k = 0;
                        }
                    }
                    child.setPosition(page * viewWidth + curX, curY);
                    curX += Math.ceil(child.width);
                    if (curX > maxWidth)
                        maxWidth = curX;
                    if (child.height > maxHeight)
                        maxHeight = child.height;
                    j++;
                }
            }
            ch = page > 0 ? viewHeight : curY + Math.ceil(maxHeight);
            cw = (page + 1) * viewWidth;
        }
        this.handleAlign(cw, ch);
        this.setBounds(0, 0, cw, ch);
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 5);
        var i1;
        this._layout = buffer.readByte();
        this._selectionMode = buffer.readByte();
        i1 = buffer.readByte();
        this._align = i1 == 0 ? "left" : (i1 == 1 ? "center" : "right");
        i1 = buffer.readByte();
        this._valign = i1 == 0 ? "top" : (i1 == 1 ? "middle" : "bottom");
        this._lineGap = buffer.readShort();
        this._columnGap = buffer.readShort();
        this._lineCount = buffer.readShort();
        this._columnCount = buffer.readShort();
        this._autoResizeItem = buffer.readBool();
        this._childrenRenderOrder = buffer.readByte();
        this._apexIndex = buffer.readShort();
        if (buffer.readBool()) {
            this._margin.top = buffer.readInt();
            this._margin.bottom = buffer.readInt();
            this._margin.left = buffer.readInt();
            this._margin.right = buffer.readInt();
        }
        var overflow = buffer.readByte();
        if (overflow == OverflowType.Scroll) {
            var savedPos = buffer.pos;
            buffer.seek(beginPos, 7);
            this.setupScroll(buffer);
            buffer.pos = savedPos;
        }
        else
            this.setupOverflow(overflow);
        if (buffer.readBool()) //clipSoftness
            buffer.skip(8);
        if (buffer.version >= 2) {
            this.scrollItemToViewOnClick = buffer.readBool();
            this.foldInvisibleItems = buffer.readBool();
        }
        buffer.seek(beginPos, 8);
        this._defaultItem = buffer.readS();
        this.readItems(buffer);
    }
    readItems(buffer) {
        var cnt;
        var i;
        var nextPos;
        var str;
        cnt = buffer.readShort();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            str = buffer.readS();
            if (str == null) {
                str = this.defaultItem;
                if (!str) {
                    buffer.pos = nextPos;
                    continue;
                }
            }
            var obj = this.getFromPool(str);
            if (obj) {
                this.addChild(obj);
                this.setupItem(buffer, obj);
            }
            buffer.pos = nextPos;
        }
    }
    setupItem(buffer, obj) {
        var str;
        str = buffer.readS();
        if (str != null)
            obj.text = str;
        str = buffer.readS();
        if (str != null && (obj instanceof GButton))
            obj.selectedTitle = str;
        str = buffer.readS();
        if (str != null)
            obj.icon = str;
        str = buffer.readS();
        if (str != null && (obj instanceof GButton))
            obj.selectedIcon = str;
        str = buffer.readS();
        if (str != null)
            obj.name = str;
        var cnt;
        var i;
        if (obj instanceof GComponent) {
            cnt = buffer.readShort();
            for (i = 0; i < cnt; i++) {
                var cc = obj.getController(buffer.readS());
                str = buffer.readS();
                if (cc)
                    cc.selectedPageId = str;
            }
            if (buffer.version >= 2) {
                cnt = buffer.readShort();
                for (i = 0; i < cnt; i++) {
                    var target = buffer.readS();
                    var propertyId = buffer.readShort();
                    var value = buffer.readS();
                    var obj2 = obj.getChildByPath(target);
                    if (obj2)
                        obj2.setProp(propertyId, value);
                }
            }
        }
    }
    setup_afterAdd(buffer, beginPos) {
        super.setup_afterAdd(buffer, beginPos);
        buffer.seek(beginPos, 6);
        var i = buffer.readShort();
        if (i != -1)
            this._selectionController = this._parent.getControllerAt(i);
    }
}
var s_n = 0;

class GTreeNode {
    constructor(hasChild, resURL) {
        this._expanded = false;
        this._level = 0;
        this._resURL = resURL;
        if (hasChild)
            this._children = new Array();
    }
    set expanded(value) {
        if (this._children == null)
            return;
        if (this._expanded != value) {
            this._expanded = value;
            if (this._tree) {
                if (this._expanded)
                    this._tree._afterExpanded(this);
                else
                    this._tree._afterCollapsed(this);
            }
        }
    }
    get expanded() {
        return this._expanded;
    }
    get isFolder() {
        return this._children != null;
    }
    get parent() {
        return this._parent;
    }
    get text() {
        if (this._cell)
            return this._cell.text;
        else
            return null;
    }
    set text(value) {
        if (this._cell)
            this._cell.text = value;
    }
    get icon() {
        if (this._cell)
            return this._cell.icon;
        else
            return null;
    }
    set icon(value) {
        if (this._cell)
            this._cell.icon = value;
    }
    get cell() {
        return this._cell;
    }
    get level() {
        return this._level;
    }
    _setLevel(value) {
        this._level = value;
    }
    addChild(child) {
        this.addChildAt(child, this._children.length);
        return child;
    }
    addChildAt(child, index) {
        if (!child)
            throw new Error("child is null");
        var numChildren = this._children.length;
        if (index >= 0 && index <= numChildren) {
            if (child._parent == this) {
                this.setChildIndex(child, index);
            }
            else {
                if (child._parent)
                    child._parent.removeChild(child);
                var cnt = this._children.length;
                if (index == cnt)
                    this._children.push(child);
                else
                    this._children.splice(index, 0, child);
                child._parent = this;
                child._level = this._level + 1;
                child._setTree(this._tree);
                if (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded)
                    this._tree._afterInserted(child);
            }
            return child;
        }
        else {
            throw new RangeError("Invalid child index");
        }
    }
    removeChild(child) {
        var childIndex = this._children.indexOf(child);
        if (childIndex != -1) {
            this.removeChildAt(childIndex);
        }
        return child;
    }
    removeChildAt(index) {
        if (index >= 0 && index < this.numChildren) {
            var child = this._children[index];
            this._children.splice(index, 1);
            child._parent = null;
            if (this._tree) {
                child._setTree(null);
                this._tree._afterRemoved(child);
            }
            return child;
        }
        else {
            throw "Invalid child index";
        }
    }
    removeChildren(beginIndex, endIndex) {
        beginIndex = beginIndex || 0;
        if (endIndex == null)
            endIndex = -1;
        if (endIndex < 0 || endIndex >= this.numChildren)
            endIndex = this.numChildren - 1;
        for (var i = beginIndex; i <= endIndex; ++i)
            this.removeChildAt(beginIndex);
    }
    getChildAt(index) {
        if (index >= 0 && index < this.numChildren)
            return this._children[index];
        else
            throw "Invalid child index";
    }
    getChildIndex(child) {
        return this._children.indexOf(child);
    }
    getPrevSibling() {
        if (this._parent == null)
            return null;
        var i = this._parent._children.indexOf(this);
        if (i <= 0)
            return null;
        return this._parent._children[i - 1];
    }
    getNextSibling() {
        if (this._parent == null)
            return null;
        var i = this._parent._children.indexOf(this);
        if (i < 0 || i >= this._parent._children.length - 1)
            return null;
        return this._parent._children[i + 1];
    }
    setChildIndex(child, index) {
        var oldIndex = this._children.indexOf(child);
        if (oldIndex == -1)
            throw "Not a child of this container";
        var cnt = this._children.length;
        if (index < 0)
            index = 0;
        else if (index > cnt)
            index = cnt;
        if (oldIndex == index)
            return;
        this._children.splice(oldIndex, 1);
        this._children.splice(index, 0, child);
        if (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded)
            this._tree._afterMoved(child);
    }
    swapChildren(child1, child2) {
        var index1 = this._children.indexOf(child1);
        var index2 = this._children.indexOf(child2);
        if (index1 == -1 || index2 == -1)
            throw "Not a child of this container";
        this.swapChildrenAt(index1, index2);
    }
    swapChildrenAt(index1, index2) {
        var child1 = this._children[index1];
        var child2 = this._children[index2];
        this.setChildIndex(child1, index2);
        this.setChildIndex(child2, index1);
    }
    get numChildren() {
        return this._children.length;
    }
    expandToRoot() {
        var p = this;
        while (p) {
            p.expanded = true;
            p = p.parent;
        }
    }
    get tree() {
        return this._tree;
    }
    _setTree(value) {
        this._tree = value;
        if (this._tree && this._tree.treeNodeWillExpand && this._expanded)
            this._tree.treeNodeWillExpand(this, true);
        if (this._children) {
            var cnt = this._children.length;
            for (var i = 0; i < cnt; i++) {
                var node = this._children[i];
                node._level = this._level + 1;
                node._setTree(value);
            }
        }
    }
}

var s_list = new Array();
class GTree extends GList {
    constructor() {
        super();
        this._indent = 15;
        this._rootNode = new GTreeNode(true);
        this._rootNode._setTree(this);
        this._rootNode.expanded = true;
    }
    get rootNode() {
        return this._rootNode;
    }
    get indent() {
        return this._indent;
    }
    set indent(value) {
        this._indent = value;
    }
    get clickToExpand() {
        return this._clickToExpand;
    }
    set clickToExpand(value) {
        this._clickToExpand = value;
    }
    getSelectedNode() {
        if (this.selectedIndex != -1)
            return this.getChildAt(this.selectedIndex)._treeNode;
        else
            return null;
    }
    getSelectedNodes(result) {
        if (!result)
            result = new Array();
        s_list.length = 0;
        super.getSelection(s_list);
        var cnt = s_list.length;
        var ret = new Array();
        for (var i = 0; i < cnt; i++) {
            var node = this.getChildAt(s_list[i])._treeNode;
            ret.push(node);
        }
        return ret;
    }
    selectNode(node, scrollItToView) {
        var parentNode = node.parent;
        while (parentNode && parentNode != this._rootNode) {
            parentNode.expanded = true;
            parentNode = parentNode.parent;
        }
        if (!node._cell)
            return;
        this.addSelection(this.getChildIndex(node._cell), scrollItToView);
    }
    unselectNode(node) {
        if (!node._cell)
            return;
        this.removeSelection(this.getChildIndex(node._cell));
    }
    expandAll(folderNode) {
        if (!folderNode)
            folderNode = this._rootNode;
        folderNode.expanded = true;
        var cnt = folderNode.numChildren;
        for (var i = 0; i < cnt; i++) {
            var node = folderNode.getChildAt(i);
            if (node.isFolder)
                this.expandAll(node);
        }
    }
    collapseAll(folderNode) {
        if (!folderNode)
            folderNode = this._rootNode;
        if (folderNode != this._rootNode)
            folderNode.expanded = false;
        var cnt = folderNode.numChildren;
        for (var i = 0; i < cnt; i++) {
            var node = folderNode.getChildAt(i);
            if (node.isFolder)
                this.collapseAll(node);
        }
    }
    createCell(node) {
        var child = this.getFromPool(node._resURL ? node._resURL : this.defaultItem);
        if (!child)
            throw new Error("cannot create tree node object.");
        child._treeNode = node;
        node._cell = child;
        var indentObj = child.getChild("indent");
        if (indentObj)
            indentObj.width = (node.level - 1) * this._indent;
        var cc;
        cc = child.getController("expanded");
        if (cc) {
            cc.on("status_changed", this.__expandedStateChanged, this);
            cc.selectedIndex = node.expanded ? 1 : 0;
        }
        cc = child.getController("leaf");
        if (cc)
            cc.selectedIndex = node.isFolder ? 0 : 1;
        if (node.isFolder)
            child.on("touch_begin", this.__cellMouseDown, this);
        if (this.treeNodeRender)
            this.treeNodeRender(node, child);
    }
    _afterInserted(node) {
        if (!node._cell)
            this.createCell(node);
        var index = this.getInsertIndexForNode(node);
        this.addChildAt(node._cell, index);
        if (this.treeNodeRender)
            this.treeNodeRender(node, node._cell);
        if (node.isFolder && node.expanded)
            this.checkChildren(node, index);
    }
    getInsertIndexForNode(node) {
        var prevNode = node.getPrevSibling();
        if (prevNode == null)
            prevNode = node.parent;
        var insertIndex = this.getChildIndex(prevNode._cell) + 1;
        var myLevel = node.level;
        var cnt = this.numChildren;
        for (var i = insertIndex; i < cnt; i++) {
            var testNode = this.getChildAt(i)._treeNode;
            if (testNode.level <= myLevel)
                break;
            insertIndex++;
        }
        return insertIndex;
    }
    _afterRemoved(node) {
        this.removeNode(node);
    }
    _afterExpanded(node) {
        if (node == this._rootNode) {
            this.checkChildren(this._rootNode, 0);
            return;
        }
        if (this.treeNodeWillExpand)
            this.treeNodeWillExpand(node, true);
        if (node._cell == null)
            return;
        if (this.treeNodeRender)
            this.treeNodeRender(node, node._cell);
        var cc = node._cell.getController("expanded");
        if (cc)
            cc.selectedIndex = 1;
        if (node._cell.parent)
            this.checkChildren(node, this.getChildIndex(node._cell));
    }
    _afterCollapsed(node) {
        if (node == this._rootNode) {
            this.checkChildren(this._rootNode, 0);
            return;
        }
        if (this.treeNodeWillExpand)
            this.treeNodeWillExpand(node, false);
        if (node._cell == null)
            return;
        if (this.treeNodeRender)
            this.treeNodeRender(node, node._cell);
        var cc = node._cell.getController("expanded");
        if (cc)
            cc.selectedIndex = 0;
        if (node._cell.parent)
            this.hideFolderNode(node);
    }
    _afterMoved(node) {
        var startIndex = this.getChildIndex(node._cell);
        var endIndex;
        if (node.isFolder)
            endIndex = this.getFolderEndIndex(startIndex, node.level);
        else
            endIndex = startIndex + 1;
        var insertIndex = this.getInsertIndexForNode(node);
        var i;
        var cnt = endIndex - startIndex;
        var obj;
        if (insertIndex < startIndex) {
            for (i = 0; i < cnt; i++) {
                obj = this.getChildAt(startIndex + i);
                this.setChildIndex(obj, insertIndex + i);
            }
        }
        else {
            for (i = 0; i < cnt; i++) {
                obj = this.getChildAt(startIndex);
                this.setChildIndex(obj, insertIndex);
            }
        }
    }
    getFolderEndIndex(startIndex, level) {
        var cnt = this.numChildren;
        for (var i = startIndex + 1; i < cnt; i++) {
            var node = this.getChildAt(i)._treeNode;
            if (node.level <= level)
                return i;
        }
        return cnt;
    }
    checkChildren(folderNode, index) {
        var cnt = folderNode.numChildren;
        for (var i = 0; i < cnt; i++) {
            index++;
            var node = folderNode.getChildAt(i);
            if (node._cell == null)
                this.createCell(node);
            if (!node._cell.parent)
                this.addChildAt(node._cell, index);
            if (node.isFolder && node.expanded)
                index = this.checkChildren(node, index);
        }
        return index;
    }
    hideFolderNode(folderNode) {
        var cnt = folderNode.numChildren;
        for (var i = 0; i < cnt; i++) {
            var node = folderNode.getChildAt(i);
            if (node._cell)
                this.removeChild(node._cell);
            if (node.isFolder && node.expanded)
                this.hideFolderNode(node);
        }
    }
    removeNode(node) {
        if (node._cell) {
            if (node._cell.parent)
                this.removeChild(node._cell);
            this.returnToPool(node._cell);
            node._cell._treeNode = null;
            node._cell = null;
        }
        if (node.isFolder) {
            var cnt = node.numChildren;
            for (var i = 0; i < cnt; i++) {
                var node2 = node.getChildAt(i);
                this.removeNode(node2);
            }
        }
    }
    __cellMouseDown(evt) {
        var node = GObject.cast(evt.sender)._treeNode;
        this._expandedStatusInEvt = node.expanded;
    }
    __expandedStateChanged(evt) {
        let cc = evt.sender;
        var node = cc.parent._treeNode;
        node.expanded = cc.selectedIndex == 1;
    }
    dispatchItemEvent(item, evt) {
        if (this._clickToExpand != 0) {
            var node = item._treeNode;
            if (node && node.isFolder && this._expandedStatusInEvt == node.expanded) {
                if (this._clickToExpand == 2) {
                    if (evt.input.clickCount == 2)
                        node.expanded = !node.expanded;
                }
                else
                    node.expanded = !node.expanded;
            }
        }
        super.dispatchItemEvent(item, evt);
    }
    setup_beforeAdd(buffer, beginPos) {
        super.setup_beforeAdd(buffer, beginPos);
        buffer.seek(beginPos, 9);
        this._indent = buffer.readInt();
        this._clickToExpand = buffer.readByte();
    }
    readItems(buffer) {
        var cnt;
        var i;
        var nextPos;
        var str;
        var isFolder;
        var lastNode;
        var level;
        var prevLevel = 0;
        cnt = buffer.readShort();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            str = buffer.readS();
            if (str == null) {
                str = this.defaultItem;
                if (!str) {
                    buffer.pos = nextPos;
                    continue;
                }
            }
            isFolder = buffer.readBool();
            level = buffer.readByte();
            var node = new GTreeNode(isFolder, str);
            node.expanded = true;
            if (i == 0)
                this._rootNode.addChild(node);
            else {
                if (level > prevLevel)
                    lastNode.addChild(node);
                else if (level < prevLevel) {
                    for (var j = level; j <= prevLevel; j++)
                        lastNode = lastNode.parent;
                    lastNode.addChild(node);
                }
                else
                    lastNode.parent.addChild(node);
            }
            lastNode = node;
            prevLevel = level;
            this.setupItem(buffer, node.cell);
            buffer.pos = nextPos;
        }
    }
}

class PopupMenu {
    constructor(resourceURL) {
        if (!resourceURL) {
            resourceURL = UIConfig.popupMenu;
            if (!resourceURL)
                throw "UIConfig.popupMenu not defined";
        }
        this._contentPane = UIPackage.createObjectFromURL(resourceURL);
        this._contentPane.on("added_to_stage", this.__addedToStage, this);
        this._list = (this._contentPane.getChild("list"));
        this._list.removeChildrenToPool();
        this._list.addRelation(this._contentPane, RelationType.Width);
        this._list.removeRelation(this._contentPane, RelationType.Height);
        this._contentPane.addRelation(this._list, RelationType.Height);
        this._list.on("click_item", this.__clickItem, this);
    }
    dispose() {
        this._contentPane.dispose();
    }
    addItem(caption, handler) {
        var item = this._list.addItemFromPool();
        item.title = caption;
        item.data = handler;
        item.grayed = false;
        var c = item.getController("checked");
        if (c)
            c.selectedIndex = 0;
        return item;
    }
    addItemAt(caption, index, handler) {
        var item = this._list.getFromPool();
        this._list.addChildAt(item, index);
        item.title = caption;
        item.data = handler;
        item.grayed = false;
        var c = item.getController("checked");
        if (c)
            c.selectedIndex = 0;
        return item;
    }
    addSeperator() {
        if (UIConfig.popupMenu_seperator == null)
            throw "UIConfig.popupMenu_seperator not defined";
        this.list.addItemFromPool(UIConfig.popupMenu_seperator);
    }
    getItemName(index) {
        var item = this._list.getChildAt(index);
        return item.name;
    }
    setItemText(name, caption) {
        var item = this._list.getChild(name);
        item.title = caption;
    }
    setItemVisible(name, visible) {
        var item = this._list.getChild(name);
        if (item.visible != visible) {
            item.visible = visible;
            this._list.setBoundsChangedFlag();
        }
    }
    setItemGrayed(name, grayed) {
        var item = this._list.getChild(name);
        item.grayed = grayed;
    }
    setItemCheckable(name, checkable) {
        var item = this._list.getChild(name);
        var c = item.getController("checked");
        if (c) {
            if (checkable) {
                if (c.selectedIndex == 0)
                    c.selectedIndex = 1;
            }
            else
                c.selectedIndex = 0;
        }
    }
    setItemChecked(name, checked) {
        var item = this._list.getChild(name);
        var c = item.getController("checked");
        if (c)
            c.selectedIndex = checked ? 2 : 1;
    }
    isItemChecked(name) {
        var item = this._list.getChild(name);
        var c = item.getController("checked");
        if (c)
            return c.selectedIndex == 2;
        else
            return false;
    }
    removeItem(name) {
        var item = this._list.getChild(name);
        if (item) {
            var index = this._list.getChildIndex(item);
            this._list.removeChildToPoolAt(index);
            return true;
        }
        else
            return false;
    }
    clearItems() {
        this._list.removeChildrenToPool();
    }
    get itemCount() {
        return this._list.numChildren;
    }
    get contentPane() {
        return this._contentPane;
    }
    get list() {
        return this._list;
    }
    show(target, dir) {
        var r = GRoot.findFor(target);
        r.showPopup(this.contentPane, (target instanceof GRoot) ? null : target, dir);
    }
    __clickItem(evt) {
        let itemObject = evt.data;
        if (!(itemObject instanceof GButton))
            return;
        if (itemObject.grayed) {
            this._list.selectedIndex = -1;
            return;
        }
        var c = itemObject.getController("checked");
        if (c && c.selectedIndex != 0) {
            if (c.selectedIndex == 1)
                c.selectedIndex = 2;
            else
                c.selectedIndex = 1;
        }
        var r = (this._contentPane.parent);
        r.hidePopup(this.contentPane);
        if (itemObject.data) {
            itemObject.data();
        }
    }
    __addedToStage() {
        this._list.selectedIndex = -1;
        this._list.resizeToFit(100000, 10);
    }
}

class UIObjectFactory {
    static setExtension(url, type) {
        if (url == null)
            throw new Error("Invaild url: " + url);
        var pi = UIPackage.getItemByURL(url);
        if (pi)
            pi.extensionType = type;
        UIObjectFactory.extensions[url] = type;
    }
    static setLoaderExtension(type) {
        UIObjectFactory.loaderType = type;
    }
    static resolveExtension(pi) {
        var extensionType = UIObjectFactory.extensions["ui://" + pi.owner.id + pi.id];
        if (!extensionType)
            extensionType = UIObjectFactory.extensions["ui://" + pi.owner.name + "/" + pi.name];
        if (extensionType)
            pi.extensionType = extensionType;
    }
    static newObject(type, userClass) {
        var obj;
        if (typeof type === 'number') {
            switch (type) {
                case ObjectType.Image:
                    return new GImage();
                case ObjectType.MovieClip:
                    return new GMovieClip();
                case ObjectType.Component:
                    return new GComponent();
                case ObjectType.Text:
                    return new GTextField();
                case ObjectType.RichText:
                    return new GRichTextField();
                case ObjectType.InputText:
                    return new GTextInput();
                case ObjectType.Group:
                    return new GGroup();
                case ObjectType.List:
                    return new GList();
                case ObjectType.Graph:
                    return new GGraph();
                case ObjectType.Loader:
                    if (UIObjectFactory.loaderType)
                        return new UIObjectFactory.loaderType();
                    else
                        return new GLoader();
                case ObjectType.Button:
                    return new GButton();
                case ObjectType.Label:
                    return new GLabel();
                case ObjectType.ProgressBar:
                    return new GProgressBar();
                case ObjectType.Slider:
                    return new GSlider();
                case ObjectType.ScrollBar:
                    return new GScrollBar();
                case ObjectType.ComboBox:
                    return new GComboBox();
                case ObjectType.Tree:
                    return new GTree();
                case ObjectType.Loader3D:
                    return new GLoader3D();
                default:
                    return null;
            }
        }
        else {
            if (type.type == PackageItemType.Component) {
                if (userClass)
                    obj = new userClass();
                else if (type.extensionType)
                    obj = new type.extensionType();
                else
                    obj = UIObjectFactory.newObject(type.objectType);
            }
            else
                obj = UIObjectFactory.newObject(type.objectType);
            if (obj)
                obj.packageItem = type;
        }
        return obj;
    }
}
UIObjectFactory.extensions = {};
Decls$1.UIObjectFactory = UIObjectFactory;

var _inst$1;
class DragDropManager {
    constructor() {
        let a = this._agent = new GLoader();
        a.draggable = true;
        a.touchable = false; ////important
        a.setSize(100, 100);
        a.setPivot(0.5, 0.5, true);
        a.align = "center";
        a.verticalAlign = "middle";
        a.sortingOrder = 1000000;
        a.on("drag_end", this.__dragEnd, this);
    }
    static get inst() {
        if (!_inst$1)
            _inst$1 = new DragDropManager();
        return _inst$1;
    }
    get dragAgent() {
        return this._agent;
    }
    get dragging() {
        return this._agent.parent != null;
    }
    startDrag(icon, sourceData, touchPointID) {
        if (this._agent.parent)
            return;
        this._sourceData = sourceData;
        this._agent.url = icon;
        GRoot.inst.addChild(this._agent);
        var pt = GRoot.inst.globalToLocal(Stage.touchPos.x, Stage.touchPos.y);
        this._agent.setPosition(pt.x, pt.y);
        this._agent.startDrag(touchPointID != null ? touchPointID : -1);
    }
    cancel() {
        if (this._agent.parent) {
            this._agent.stopDrag();
            GRoot.inst.removeChild(this._agent);
            this._sourceData = null;
        }
    }
    __dragEnd(evt) {
        if (this._agent.parent == null) //cancelled
            return;
        GRoot.inst.removeChild(this._agent);
        var sourceData = this._sourceData;
        this._sourceData = null;
        var obj = GObject.cast(Stage.touchTarget);
        while (obj) {
            if (obj.hasListener("drop")) {
                obj.dispatchEvent("drop", sourceData);
                return;
            }
            obj = obj.parent;
        }
    }
}

class AsyncOperation {
    constructor() {
        this._itemList = new Array();
        this._objectPool = [];
    }
    createObject(pkgName, resName) {
        var pkg = UIPackage.getByName(pkgName);
        if (pkg) {
            var pi = pkg.getItemByName(resName);
            if (!pi)
                throw new Error("resource not found: " + resName);
            this.internalCreateObject(pi);
        }
        else
            throw new Error("package not found: " + pkgName);
    }
    createObjectFromURL(url) {
        var pi = UIPackage.getItemByURL(url);
        if (pi)
            this.internalCreateObject(pi);
        else
            throw new Error("resource not found: " + url);
    }
    cancel() {
        Timers.remove(this.run, this);
        this._itemList.length = 0;
        if (this._objectPool.length > 0) {
            var cnt = this._objectPool.length;
            for (var i = 0; i < cnt; i++) {
                this._objectPool[i].dispose();
            }
            this._objectPool.length = 0;
        }
    }
    internalCreateObject(item) {
        this._itemList.length = 0;
        this._objectPool.length = 0;
        var di = new DisplayListItem(item, ObjectType.Component);
        di.childCount = this.collectComponentChildren(item);
        this._itemList.push(di);
        this._index = 0;
        Timers.addUpdate(this.run, this);
    }
    collectComponentChildren(item) {
        var buffer = item.rawData;
        buffer.seek(0, 2);
        var di;
        var pi;
        var i;
        var dataLen;
        var curPos;
        var pkg;
        var dcnt = buffer.readShort();
        for (i = 0; i < dcnt; i++) {
            dataLen = buffer.readShort();
            curPos = buffer.pos;
            buffer.seek(curPos, 0);
            var type = buffer.readByte();
            var src = buffer.readS();
            var pkgId = buffer.readS();
            buffer.pos = curPos;
            if (src != null) {
                if (pkgId != null)
                    pkg = UIPackage.getById(pkgId);
                else
                    pkg = item.owner;
                pi = pkg != null ? pkg.getItemById(src) : null;
                di = new DisplayListItem(pi, type);
                if (pi != null && pi.type == PackageItemType.Component)
                    di.childCount = this.collectComponentChildren(pi);
            }
            else {
                di = new DisplayListItem(null, type);
                if (type == ObjectType.List) //list
                    di.listItemCount = this.collectListChildren(buffer);
            }
            this._itemList.push(di);
            buffer.pos = curPos + dataLen;
        }
        return dcnt;
    }
    collectListChildren(buffer) {
        buffer.seek(buffer.pos, 8);
        var listItemCount = 0;
        var i;
        var nextPos;
        var url;
        var pi;
        var di;
        var defaultItem = buffer.readS();
        var itemCount = buffer.readShort();
        for (i = 0; i < itemCount; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            url = buffer.readS();
            if (url == null)
                url = defaultItem;
            if (url) {
                pi = UIPackage.getItemByURL(url);
                if (pi != null) {
                    di = new DisplayListItem(pi, pi.objectType);
                    if (pi.type == PackageItemType.Component)
                        di.childCount = this.collectComponentChildren(pi);
                    this._itemList.push(di);
                    listItemCount++;
                }
            }
            buffer.pos = nextPos;
        }
        return listItemCount;
    }
    run() {
        var obj;
        var di;
        var poolStart;
        var k;
        var t = performance.now();
        var frameTime = UIConfig.frameTimeForAsyncUIConstruction;
        var totalItems = this._itemList.length;
        while (this._index < totalItems) {
            di = this._itemList[this._index];
            if (di.packageItem != null) {
                obj = UIObjectFactory.newObject(di.packageItem);
                this._objectPool.push(obj);
                constructingDepth.n++;
                if (di.packageItem.type == PackageItemType.Component) {
                    poolStart = this._objectPool.length - di.childCount - 1;
                    obj.constructFromResource2(this._objectPool, poolStart);
                    this._objectPool.splice(poolStart, di.childCount);
                }
                else {
                    obj.constructFromResource();
                }
                constructingDepth.n--;
            }
            else {
                obj = UIObjectFactory.newObject(di.type);
                this._objectPool.push(obj);
                if (di.type == ObjectType.List && di.listItemCount > 0) {
                    poolStart = this._objectPool.length - di.listItemCount - 1;
                    for (k = 0; k < di.listItemCount; k++) //把他们都放到pool里，这样GList在创建时就不需要创建对象了
                        obj.itemPool.returnObject(this._objectPool[k + poolStart]);
                    this._objectPool.splice(poolStart, di.listItemCount);
                }
            }
            this._index++;
            if ((this._index % 5 == 0) && performance.now() - t >= frameTime)
                return;
        }
        Timers.remove(this.run, this);
        var result = this._objectPool[0];
        this._itemList.length = 0;
        this._objectPool.length = 0;
        if (this.callback != null)
            this.callback(result);
    }
}
class DisplayListItem {
    constructor(packageItem, type) {
        this.packageItem = packageItem;
        this.type = type;
    }
}

export { AsyncOperation, AutoSizeType, ButtonMode, ByteBuffer, ChildrenRenderOrder, Color4, Controller, DisplayObject, DragDropManager, DynamicFont, EaseType, Event, EventDispatcher, FillMethod, FillOrigin, FillOrigin90, FlipType, FontManager, GButton, GComboBox, GComponent, GGraph, GGroup, GImage, GLabel, GList, GLoader, GLoader3D, GMovieClip, GObject, GObjectPool, GProgressBar, GRichTextField, GRoot, GScrollBar, GSlider, GTextField, GTextInput, GTree, GTreeNode, GTween, GTweener, GroupLayoutType, Image, InputTextField, ListLayoutType, ListSelectionMode, LoaderFillType, MovieClip, NGraphics, NMaterial, NTexture, ObjectPropID, ObjectType, OverflowType, PackageItem, PackageItemType, PopupDirection, PopupMenu, ProgressTitleType, Rect, RelationType, RichTextField, ScaleMode, ScreenMatchMode, ScrollBarDisplayType, ScrollPane, ScrollType, Shape, Stage, TextField, TextFormat, Timers, Transition, TranslationHelper, UBBParser, UIConfig, UIContentScaler, UIObjectFactory, UIPackage, Window, clamp, clamp01, convertFromHtmlColor, convertToHtmlColor, distance, lerp, repeat };
//# sourceMappingURL=fairygui.module.js.map
