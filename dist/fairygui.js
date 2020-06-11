"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.fgui = {};
window.THREE = require("three");

(function (fgui) {
  var ControllerAction = /*#__PURE__*/function () {
    function ControllerAction() {
      _classCallCheck(this, ControllerAction);
    }

    _createClass(ControllerAction, [{
      key: "run",
      value: function run(controller, prevPage, curPage) {
        if ((!this.fromPage || this.fromPage.length == 0 || this.fromPage.indexOf(prevPage) != -1) && (!this.toPage || this.toPage.length == 0 || this.toPage.indexOf(curPage) != -1)) this.enter(controller);else this.leave(controller);
      }
    }, {
      key: "enter",
      value: function enter(controller) {}
    }, {
      key: "leave",
      value: function leave(controller) {}
    }, {
      key: "setup",
      value: function setup(buffer) {
        var cnt;
        var i;
        cnt = buffer.readShort();
        this.fromPage = [];

        for (i = 0; i < cnt; i++) {
          this.fromPage[i] = buffer.readS();
        }

        cnt = buffer.readShort();
        this.toPage = [];

        for (i = 0; i < cnt; i++) {
          this.toPage[i] = buffer.readS();
        }
      }
    }]);

    return ControllerAction;
  }();

  fgui.ControllerAction = ControllerAction;
})(fgui || (fgui = {}));

(function (fgui) {
  var ChangePageAction = /*#__PURE__*/function (_fgui$ControllerActio) {
    _inherits(ChangePageAction, _fgui$ControllerActio);

    var _super = _createSuper(ChangePageAction);

    function ChangePageAction() {
      _classCallCheck(this, ChangePageAction);

      return _super.call(this);
    }

    _createClass(ChangePageAction, [{
      key: "enter",
      value: function enter(controller) {
        if (!this.controllerName) return;
        var gcom;
        if (this.objectId) gcom = controller.parent.getChildById(this.objectId);else gcom = controller.parent;

        if (gcom) {
          var cc = gcom.getController(this.controllerName);

          if (cc && cc != controller && !cc.changing) {
            if (this.targetPage == "~1") {
              if (controller.selectedIndex < cc.pageCount) cc.selectedIndex = controller.selectedIndex;
            } else if (this.targetPage == "~2") cc.selectedPage = controller.selectedPage;else cc.selectedPageId = this.targetPage;
          }
        }
      }
    }, {
      key: "setup",
      value: function setup(buffer) {
        _get(_getPrototypeOf(ChangePageAction.prototype), "setup", this).call(this, buffer);

        this.objectId = buffer.readS();
        this.controllerName = buffer.readS();
        this.targetPage = buffer.readS();
      }
    }]);

    return ChangePageAction;
  }(fgui.ControllerAction);

  fgui.ChangePageAction = ChangePageAction;
})(fgui || (fgui = {}));

(function (fgui) {
  var PlayTransitionAction = /*#__PURE__*/function (_fgui$ControllerActio2) {
    _inherits(PlayTransitionAction, _fgui$ControllerActio2);

    var _super2 = _createSuper(PlayTransitionAction);

    function PlayTransitionAction() {
      var _this;

      _classCallCheck(this, PlayTransitionAction);

      _this = _super2.call(this);
      _this.playTimes = 1;
      _this.delay = 0;
      return _this;
    }

    _createClass(PlayTransitionAction, [{
      key: "enter",
      value: function enter(controller) {
        var trans = controller.parent.getTransition(this.transitionName);

        if (trans) {
          if (this._currentTransition && this._currentTransition.playing) trans.changePlayTimes(this.playTimes);else trans.play(null, this.playTimes, this.delay);
          this._currentTransition = trans;
        }
      }
    }, {
      key: "leave",
      value: function leave(controller) {
        if (this.stopOnExit && this._currentTransition) {
          this._currentTransition.stop();

          this._currentTransition = null;
        }
      }
    }, {
      key: "setup",
      value: function setup(buffer) {
        _get(_getPrototypeOf(PlayTransitionAction.prototype), "setup", this).call(this, buffer);

        this.transitionName = buffer.readS();
        this.playTimes = buffer.readInt();
        this.delay = buffer.readFloat();
        this.stopOnExit = buffer.readBool();
      }
    }]);

    return PlayTransitionAction;
  }(fgui.ControllerAction);

  fgui.PlayTransitionAction = PlayTransitionAction;
})(fgui || (fgui = {}));

(function (fgui) {
  fgui.Decls = {};
})(fgui || (fgui = {}));

(function (fgui) {
  var EventDispatcher = /*#__PURE__*/function () {
    function EventDispatcher() {
      _classCallCheck(this, EventDispatcher);

      this._listeners = {};
    }

    _createClass(EventDispatcher, [{
      key: "on",
      value: function on(type, callback, target, capture) {
        var col = this._listeners[type];

        if (!col) {
          col = {
            dispatching: 0,
            callbacks: [],
            captures: []
          };
          this._listeners[type] = col;
        }

        var arr = capture ? col.captures : col.callbacks;
        var index = arr.findIndex(function (value, index, arr) {
          return value == callback && arr[index + 1] == target;
        });
        if (index != -1) arr[index + 2] = false;else arr.push(callback, target, false);
      }
    }, {
      key: "off",
      value: function off(type, callback, target, capture) {
        var col = this._listeners[type];
        if (!col) return;
        var arr = capture ? col.captures : col.callbacks;
        var index = arr.findIndex(function (value, index, arr) {
          return value == callback && arr[index + 1] == target;
        });

        if (index != -1) {
          if (col.dispatching != 0) {
            arr[index + 2] = true;
            col.dispatching = 2;
          } else arr.splice(index, 3);
        }
      }
    }, {
      key: "offAll",
      value: function offAll(type) {
        if (type) {
          var col = this._listeners[type];

          if (col) {
            if (col.dispatching != 0) {
              col.callbacks.forEach(function (value, index, arr) {
                return arr[index + 2] = true;
              });
              col.captures.forEach(function (value, index, arr) {
                return arr[index + 2] = true;
              });
              col.dispatching = 2;
            } else {
              col.callbacks.length = 0;
              col.captures.length = 0;
            }
          }
        } else {
          for (var key in this._listeners) {
            delete this._listeners[key];
          }
        }
      }
    }, {
      key: "hasListener",
      value: function hasListener(type, callback, target, capture) {
        var col = this._listeners[type];
        if (!col) return false;
        var arr = capture ? col.captures : col.callbacks;
        if (!callback) return arr.length > 0;else arr.findIndex(function (value, index, arr) {
          return value == callback && arr[index + 1] == target;
        }) != -1;
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(type, data) {
        var col = this._listeners[type];
        if (!col || col.callbacks.length == 0 && col.captures.length == 0) return;
        var ev = fgui.EventPool.borrow(type);
        ev._type = type;
        ev.data = data;

        this._dispatch(col, ev, true);

        this._dispatch(col, ev, false);

        fgui.EventPool.returns(ev);
        return ev._defaultPrevented;
      }
    }, {
      key: "_dispatch",
      value: function _dispatch(col, ev, capture) {
        if (col.dispatching != 0) return;
        col.dispatching = 1;
        ev._sender = this;
        var arr = capture ? col.captures : col.callbacks;
        var cnt = arr.length;

        for (var i = 0; i < cnt; i += 3) {
          arr[i].call(arr[i + 1], ev);
        }

        if (col.dispatching == 2) {
          var _cnt = arr.length;
          var _i = 0;

          while (_i < _cnt) {
            if (arr[_i + 2]) {
              arr.splice(_i, 3);
              _cnt -= 3;
              continue;
            } else _i += 3;
          }
        }

        col.dispatching = 0;
      }
    }]);

    return EventDispatcher;
  }();

  fgui.EventDispatcher = EventDispatcher;
})(fgui || (fgui = {}));

(function (fgui) {
  var Rect = /*#__PURE__*/function () {
    function Rect(x, y, width, height) {
      _classCallCheck(this, Rect);

      this.x = x || 0;
      this.y = y || 0;
      this.width = width || 0;
      this.height = height || 0;
    }

    _createClass(Rect, [{
      key: "set",
      value: function set(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
      }
    }, {
      key: "setMinMax",
      value: function setMinMax(xMin, yMin, xMax, yMax) {
        this.x = xMin;
        this.y = yMin;
        this.width = xMax - xMin;
        this.height = yMax - yMin;
      }
    }, {
      key: "intersection",
      value: function intersection(another) {
        if (this.width == 0 || this.height == 0 || another.width == 0 || another.height == 0) return new Rect(0, 0, 0, 0);
        var left = this.x > another.x ? this.x : another.x;
        var right = this.xMax < another.xMax ? this.xMax : another.xMax;
        var top = this.y > another.y ? this.y : another.y;
        var bottom = this.yMax < another.yMax ? this.yMax : another.yMax;
        if (left > right || top > bottom) this.set(0, 0, 0, 0);else this.setMinMax(left, top, right, bottom);
        return this;
      }
    }, {
      key: "union",
      value: function union(another) {
        if (another.width == 0 || another.height == 0) return this;

        if (this.width == 0 || this.height == 0) {
          this.copy(another);
          return this;
        }

        var x = Math.min(this.x, another.x);
        var y = Math.min(this.y, another.y);
        this.setMinMax(x, y, Math.max(this.xMax, another.xMax), Math.max(this.yMax, another.yMax));
        return this;
      }
    }, {
      key: "extend",
      value: function extend(x, y) {
        this.x -= x;
        this.y -= y;
        this.width += x * 2;
        this.height += y * 2;
      }
    }, {
      key: "contains",
      value: function contains(x, y) {
        if (x && x.isVector2) {
          y = x.y;
          x = x.x;
        }

        return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height;
      }
    }, {
      key: "copy",
      value: function copy(source) {
        this.set(source.x, source.y, source.width, source.height);
      }
    }, {
      key: "clone",
      value: function clone() {
        return new Rect(this.x, this.y, this.width, this.height);
      }
    }, {
      key: "position",
      get: function get() {
        return new THREE.Vector2(this.x, this.y);
      }
    }, {
      key: "size",
      get: function get() {
        return new THREE.Vector2(this.width, this.height);
      }
    }, {
      key: "xMin",
      get: function get() {
        return this.x;
      },
      set: function set(value) {
        var d = value - this.x;
        this.x = value;
        this.width -= d;
      }
    }, {
      key: "xMax",
      get: function get() {
        return this.x + this.width;
      },
      set: function set(value) {
        this.width = value - this.x;
      }
    }, {
      key: "yMin",
      get: function get() {
        return this.y;
      },
      set: function set(value) {
        var d = value - this.y;
        this.y = value;
        this.height -= d;
      }
    }, {
      key: "yMax",
      get: function get() {
        return this.y + this.height;
      },
      set: function set(value) {
        this.height = value - this.y;
      }
    }]);

    return Rect;
  }();

  fgui.Rect = Rect;
})(fgui || (fgui = {}));

(function (fgui) {
  var DisplayObject = /*#__PURE__*/function (_fgui$EventDispatcher) {
    _inherits(DisplayObject, _fgui$EventDispatcher);

    var _super3 = _createSuper(DisplayObject);

    function DisplayObject() {
      var _this2;

      _classCallCheck(this, DisplayObject);

      _this2 = _super3.call(this);
      _this2._obj3D = new THREE.Object3D();
      _this2._obj3D["isGroup"] = true;
      _this2._obj3D["$owner"] = _assertThisInitialized(_this2);

      _this2._obj3D.layers.set(fgui.UILayer);

      _this2._pos = _this2._obj3D.position;
      _this2._rot = _this2._obj3D.rotation;
      _this2._pivot = new THREE.Vector2();
      _this2._pivotOffset = new THREE.Vector3();
      _this2._contentRect = new fgui.Rect();
      _this2._alpha = 1;
      _this2._touchable = true;
      return _this2;
    }

    _createClass(DisplayObject, [{
      key: "setPosition",
      value: function setPosition(x, y, z, isPivot) {
        z = z || 0;

        if (isPivot) {
          x -= this._pivotOffset.x;
          y += this._pivotOffset.y;
          z -= this._pivotOffset.z;
        }

        this._matrixDirty = true;

        this._pos.set(x, -y, z);
      }
    }, {
      key: "setSize",
      value: function setSize(wv, hv) {
        if (wv != this._contentRect.width || hv != this._contentRect.height) {
          this._contentRect.width = wv;
          this._contentRect.height = hv;
          this.onSizeChanged();
        }
      }
    }, {
      key: "ensureSizeCorrect",
      value: function ensureSizeCorrect() {}
    }, {
      key: "onSizeChanged",
      value: function onSizeChanged() {
        this.applyPivot();
        if (this._graphics) this._graphics.setDrawRect(this._contentRect);
      }
    }, {
      key: "setPivot",
      value: function setPivot(xv, yv) {
        if (this._pivot.x != xv || this._pivot.y != yv) {
          var dpx = (xv - this._pivot.x) * this._contentRect.width;
          var dpy = (this._pivot.y - yv) * this._contentRect.height;
          s_v3.copy(this._pivotOffset);

          this._pivot.set(xv, yv);

          this.updatePivotOffset();
          this._pos.x += s_v3.x - this._pivotOffset.x + dpx;
          this._pos.y += s_v3.y - this._pivotOffset.y + dpy;
          this._pos.y += s_v3.z - this._pivotOffset.z;
          this._matrixDirty = true;
        }
      }
    }, {
      key: "updatePivotOffset",
      value: function updatePivotOffset() {
        var px = this._pivot.x * this._contentRect.width;
        var py = this._pivot.y * this._contentRect.height;
        s_quaternion.setFromEuler(this._rot);
        s_mat.compose(s_v3_2, s_quaternion, this._obj3D.scale);

        this._pivotOffset.set(px, -py, 0);

        this._pivotOffset.applyMatrix4(s_mat);
      }
    }, {
      key: "applyPivot",
      value: function applyPivot() {
        if (this._pivot.x != 0 || this._pivot.y != 0) {
          s_v3.copy(this._pivotOffset);
          this.updatePivotOffset();
          this._pos.x += s_v3.x - this._pivotOffset.x;
          this._pos.y += s_v3.y - this._pivotOffset.y;
          this._matrixDirty = true;
        }
      }
    }, {
      key: "setScale",
      value: function setScale(xv, yv) {
        this._obj3D.scale.set(xv, yv, xv);

        this.applyPivot();
        this._matrixDirty = true;
      }
    }, {
      key: "setLayer",
      value: function setLayer(layer) {
        this._obj3D.traverse(function (obj) {
          return obj.layers.set(layer);
        });
      }
    }, {
      key: "validateMatrix",
      value: function validateMatrix() {
        this._obj3D.traverseAncestors(function (e) {
          var dobj = e["$owner"];

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
    }, {
      key: "_getRenderCamera",
      value: function _getRenderCamera() {
        var p = this._obj3D;

        while (p) {
          var dobj = p["$owner"];
          if (dobj && dobj.camera) return dobj.camera;
          p = p.parent;
        }

        return fgui.Stage.camera;
      }
    }, {
      key: "worldToLocal",
      value: function worldToLocal(pt, direction, validate) {
        if (validate) this.validateMatrix();
        pt = this._obj3D.worldToLocal(pt);

        if (pt.z != 0) {
          s_dir.copy(direction || s_forward);
          s_dir.applyQuaternion(this._obj3D.getWorldQuaternion(s_quaternion).inverse()).normalize();
          var distOnLine = -pt.dot(s_forward) / s_dir.dot(s_forward);
          pt.add(s_dir.multiplyScalar(distOnLine));
        }

        pt.y = -pt.y;
        return pt;
      }
    }, {
      key: "localToWorld",
      value: function localToWorld(pt, validate) {
        if (validate) this.validateMatrix();
        pt.y = -pt.y;
        pt = this._obj3D.localToWorld(pt);
        return pt;
      }
    }, {
      key: "globalToLocal",
      value: function globalToLocal(x, y, result) {
        if (!fgui.Stage.disableMatrixValidation) this.validateMatrix();
        fgui.screenToWorld(this._getRenderCamera(), x, y, s_v3, s_dir);
        this.worldToLocal(s_v3, s_dir);
        if (!result) result = new THREE.Vector2();
        result.set(s_v3.x, s_v3.y);
        return result;
      }
    }, {
      key: "localToGlobal",
      value: function localToGlobal(x, y, result) {
        if (!fgui.Stage.disableMatrixValidation) this.validateMatrix();
        s_v3.set(x, -y, 0);

        this._obj3D.localToWorld(s_v3);

        if (!result) result = new THREE.Vector2();
        fgui.worldToScreen(this._getRenderCamera(), s_v3, result);
        return result;
      }
    }, {
      key: "getBounds",
      value: function getBounds(targetSpace, result) {
        this.ensureSizeCorrect();
        if (!result) result = new fgui.Rect();
        if (targetSpace == this._obj3D) result.copy(this._contentRect);else if (targetSpace == this._obj3D.parent && this._rot.z == 0) result.set(this._pos.x, -this._pos.y, this._contentRect.width * this._obj3D.scale.x, this._contentRect.height * this._obj3D.scale.y);else result = this.transformRect(this._contentRect, targetSpace, result);
        return result;
      }
    }, {
      key: "transformPoint",
      value: function transformPoint(x, y, targetSpace, result) {
        if (!result) result = new THREE.Vector2();
        if (targetSpace == this._obj3D) result.set(x, y);else {
          if (!fgui.Stage.disableMatrixValidation) this.validateMatrix();
          s_v3.set(x, -y, 0);

          this._obj3D.localToWorld(s_v3);

          if (targetSpace) targetSpace.worldToLocal(s_v3);
          result.set(s_v3.x, -s_v3.y);
        }
        return result;
      }
    }, {
      key: "transformRect",
      value: function transformRect(rect, targetSpace, result) {
        if (!result) result = new fgui.Rect();

        if (targetSpace == this._obj3D) {
          result.copy(rect);
          return result;
        }

        if (targetSpace && targetSpace == this._obj3D.parent && this._rot.z == 0) {
          var scale = this._obj3D.scale;
          result.set((this._pos.x + rect.x) * scale.x, (this.y + rect.y) * scale.y, rect.width * scale.x, rect.height * scale.y);
        } else {
          s_v4.set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
          if (!fgui.Stage.disableMatrixValidation) this.validateMatrix();
          this.transformRectPoint(rect.x, rect.y, targetSpace);
          this.transformRectPoint(rect.xMax, rect.y, targetSpace);
          this.transformRectPoint(rect.x, rect.yMax, targetSpace);
          this.transformRectPoint(rect.xMax, rect.yMax, targetSpace);
          result.setMinMax(s_v4.x, s_v4.y, s_v4.z, s_v4.w);
        }

        return result;
      }
    }, {
      key: "transformRectPoint",
      value: function transformRectPoint(x, y, targetSpace) {
        s_v3.set(x, y, 0);
        this.localToWorld(s_v3);
        if (targetSpace) targetSpace.worldToLocal(s_v3);
        if (s_v4.x > s_v3.x) s_v4.x = s_v3.x;
        if (s_v4.z < s_v3.x) s_v4.z = s_v3.x;
        if (s_v4.y > s_v3.y) s_v4.y = s_v3.y;
        if (s_v4.w < s_v3.y) s_v4.w = s_v3.y;
      }
    }, {
      key: "addChild",
      value: function addChild(child) {
        this.addChildAt(child, Number.POSITIVE_INFINITY);
      }
    }, {
      key: "addChildAt",
      value: function addChildAt(child, index) {
        if (child._obj3D.parent) {
          var i = child._obj3D.parent.children.indexOf(child._obj3D);

          child._obj3D.parent.children.splice(i, 1);
        }

        if (index >= this._obj3D.children.length) this._obj3D.children.push(child._obj3D);else this._obj3D.children.splice(index, 0, child._obj3D);
        child._obj3D.parent = this._obj3D;
        child._obj3D.layers.mask = this._obj3D.layers.mask;
        if (this.stage) fgui.broadcastEvent(child.obj3D, fgui.StageEvent.AddtoStage);
      }
    }, {
      key: "removeChild",
      value: function removeChild(child) {
        var index = this._obj3D.children.indexOf(child._obj3D);

        if (index == -1) throw 'not a child';
        this.removeChildAt(index);
      }
    }, {
      key: "removeChildAt",
      value: function removeChildAt(index) {
        var child = this._obj3D.children[index];
        if (this.stage) fgui.broadcastEvent(child, fgui.StageEvent.RemoveFromStage);

        this._obj3D.children.splice(index, 1);

        child.parent = null;
      }
    }, {
      key: "setChildIndex",
      value: function setChildIndex(child, index) {
        var oldIndex = this._obj3D.children.indexOf(child._obj3D);

        if (oldIndex == index) return;
        if (oldIndex == -1) throw 'Not a child';

        this._obj3D.children.splice(oldIndex, 1);

        if (index >= this._obj3D.children.length) this._obj3D.children.push(child._obj3D);else this._obj3D.children.splice(index, 0, child._obj3D);
      }
    }, {
      key: "getIndex",
      value: function getIndex(child) {
        return this._obj3D.children.indexOf(child._obj3D);
      }
    }, {
      key: "update",
      value: function update(clipPlanes, alpha) {
        if (this._clipRect) {
          this.transformRect(this._clipRect, null, s_rect);

          if (clipPlanes) {
            s_rect2.setMinMax(-clipPlanes[0].constant, -clipPlanes[3].constant, clipPlanes[1].constant, clipPlanes[2].constant);
            s_rect.intersection(s_rect2);
          }

          if (!this._clipPlanes) {
            this._clipPlanes = [new THREE.Plane(new THREE.Vector3(1, 0, 0)), new THREE.Plane(new THREE.Vector3(-1, 0, 0)), new THREE.Plane(new THREE.Vector3(0, -1, 0)), new THREE.Plane(new THREE.Vector3(0, 1, 0))];
          }

          clipPlanes = this._clipPlanes;
          clipPlanes[0].constant = -s_rect.x;
          clipPlanes[1].constant = s_rect.xMax;
          clipPlanes[2].constant = s_rect.yMax;
          clipPlanes[3].constant = -s_rect.y;
        }

        if (this._graphics) this._graphics.update(clipPlanes, this._alpha * alpha);
      }
    }, {
      key: "hitTest",
      value: function hitTest(context) {
        if (this._obj3D.scale.x == 0 || this._obj3D.scale.y == 0) return null;
        var backupRay;

        if (this.camera) {
          backupRay = context.ray;
          context.camera = this.camera;
        }

        var target;
        var pt = context.getLocal(this);
        var lx = pt.x;
        var ly = pt.y;

        if (this.hitArea) {
          if (!this.hitArea.hitTest(this._contentRect, lx, ly)) return null;
        } else {
          if (this._clipRect && !this._clipRect.contains(lx, ly)) return null;
        }

        if (this.mask) {
          var tmp = this.mask.visible ? this.mask.hitTest(context) : null;
          if (!this.reversedMask && !tmp || this.reversedMask && tmp) return null;
        }

        target = traverseHitTest(this._obj3D, context, this.mask);
        if (!target && this.opaque && (this.hitArea || this._contentRect.contains(lx, ly))) target = this;
        if (backupRay) context.ray = backupRay;
        return target;
      }
    }, {
      key: "dispose",
      value: function dispose() {}
    }, {
      key: "obj3D",
      get: function get() {
        return this._obj3D;
      }
    }, {
      key: "name",
      get: function get() {
        return this._obj3D.name;
      },
      set: function set(value) {
        this._obj3D.name = value;
      }
    }, {
      key: "x",
      get: function get() {
        return this._pos.x;
      },
      set: function set(value) {
        this.setPosition(value, -this._pos.y, this._pos.z);
      }
    }, {
      key: "y",
      get: function get() {
        return -this._pos.y;
      },
      set: function set(value) {
        this.setPosition(this._pos.x, value, this._pos.z);
      }
    }, {
      key: "z",
      get: function get() {
        return this._pos.z;
      },
      set: function set(value) {
        this.setPosition(this._pos.x, -this._pos.y, value);
      }
    }, {
      key: "width",
      get: function get() {
        this.ensureSizeCorrect();
        return this._contentRect.width;
      },
      set: function set(value) {
        if (this._contentRect.width != value) {
          this._contentRect.width = value;
          this.onSizeChanged();
        }
      }
    }, {
      key: "height",
      get: function get() {
        this.ensureSizeCorrect();
        return this._contentRect.height;
      },
      set: function set(value) {
        if (this._contentRect.height != value) {
          this._contentRect.height = value;
          this.onSizeChanged();
        }
      }
    }, {
      key: "pivotX",
      get: function get() {
        return this._pivot.x;
      },
      set: function set(value) {
        this.setPivot(value, this._pivot.y);
      }
    }, {
      key: "pivotY",
      get: function get() {
        return this._pivot.y;
      },
      set: function set(value) {
        this.setPosition(this._pivot.x, value);
      }
    }, {
      key: "scaleX",
      get: function get() {
        return this._obj3D.scale.x;
      },
      set: function set(value) {
        this.setScale(value, this._obj3D.scale.y);
      }
    }, {
      key: "scaleY",
      get: function get() {
        return this._obj3D.scale.y;
      },
      set: function set(value) {
        this.setScale(this._obj3D.scale.x, value);
      }
    }, {
      key: "rotationX",
      get: function get() {
        return this._rot.x * 180 / Math.PI;
      },
      set: function set(value) {
        this._rot.x = value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
      }
    }, {
      key: "rotationY",
      get: function get() {
        return this._rot.y * 180 / Math.PI;
      },
      set: function set(value) {
        this._rot.y = value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
      }
    }, {
      key: "rotation",
      get: function get() {
        return -this._rot.z * 180 / Math.PI;
      },
      set: function set(value) {
        this._rot.z = -value * Math.PI / 180;
        this.applyPivot();
        this._matrixDirty = true;
      }
    }, {
      key: "parent",
      get: function get() {
        return this._obj3D.parent;
      }
    }, {
      key: "stage",
      get: function get() {
        var t = this._obj3D;

        while (t.parent) {
          t = t.parent;
        }

        return t["isScene"];
      }
    }, {
      key: "graphics",
      get: function get() {
        return this._graphics;
      }
    }, {
      key: "alpha",
      get: function get() {
        return this._alpha;
      },
      set: function set(value) {
        this._alpha = value;
      }
    }, {
      key: "touchable",
      get: function get() {
        return this._touchable;
      },
      set: function set(value) {
        this._touchable = value;
      }
    }, {
      key: "visible",
      get: function get() {
        return this._obj3D.visible;
      },
      set: function set(value) {
        this._obj3D.visible = value;
      }
    }, {
      key: "color",
      get: function get() {
        return this._graphics ? this._graphics.color : 0;
      },
      set: function set(value) {
        if (this._graphics) this._graphics.color = value;
      }
    }, {
      key: "blendMode",
      get: function get() {
        return this._graphics ? this._graphics.material.blending : THREE.NormalBlending;
      },
      set: function set(value) {
        if (this._graphics) this._graphics.material.blending = value;
      }
    }, {
      key: "numChildren",
      get: function get() {
        return this._obj3D.children.length;
      }
    }, {
      key: "clipRect",
      get: function get() {
        return this._clipRect;
      },
      set: function set(value) {
        this._clipRect = value;
      }
    }]);

    return DisplayObject;
  }(fgui.EventDispatcher);

  fgui.DisplayObject = DisplayObject;
  var s_v3 = new THREE.Vector3();
  var s_v3_2 = new THREE.Vector3();
  var s_v4 = new THREE.Vector4();
  var s_rect = new fgui.Rect();
  var s_rect2 = new fgui.Rect();
  var s_mat = new THREE.Matrix4();
  var s_quaternion = new THREE.Quaternion();
  var s_dir = new THREE.Vector3();
  var s_forward = new THREE.Vector3(0, 0, 1);

  function traverseUpdate(p, clippingPlanes, alpha) {
    var children = p.children;
    var cnt = children.length;
    var dobj = p["$owner"];

    if (dobj) {
      if (dobj._clipRect) clippingPlanes = dobj._clipPlanes;
      alpha *= dobj.alpha;
    }

    for (var i = 0; i < cnt; i++) {
      var child = children[i];
      dobj = child["$owner"];
      if (dobj) dobj.update(clippingPlanes, alpha);
      if (child.children.length > 0) traverseUpdate(child, clippingPlanes, alpha);
    }
  }

  fgui.traverseUpdate = traverseUpdate;

  function traverseHitTest(p, context, mask) {
    var count = p.children.length;

    for (var i = count - 1; i >= 0; --i) {
      var child = p.children[i];
      if (!child.visible) continue;
      var dobj = child["$owner"];

      if (dobj) {
        if (dobj == mask || dobj._touchDisabled) continue;

        if (!context.forTouch || dobj._touchable) {
          var target = dobj.hitTest(context);
          if (target) return target;
        }
      }

      if (child.children.length > 0) {
        var _target = traverseHitTest(child, context);

        if (_target) return _target;
      }
    }
  }

  fgui.traverseHitTest = traverseHitTest;
})(fgui || (fgui = {}));

(function (fgui) {
  var Image = /*#__PURE__*/function (_fgui$DisplayObject) {
    _inherits(Image, _fgui$DisplayObject);

    var _super4 = _createSuper(Image);

    function Image() {
      var _this3;

      _classCallCheck(this, Image);

      _this3 = _super4.call(this);
      _this3._tileGridIndice = 0;
      _this3._graphics = new fgui.NGraphics(_this3._obj3D);
      _this3._graphics.meshFactory = _assertThisInitialized(_this3);
      _this3._textureScale = new THREE.Vector2(1, 1);
      return _this3;
    }

    _createClass(Image, [{
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        if (this._fillMesh && this._fillMesh.method != fgui.FillMethod.None) {
          this._fillMesh.onPopulateMesh(vb);
        } else if (this._scaleByTile) {
          contentRect.copy(vb.contentRect);
          contentRect.width *= this._textureScale.x;
          contentRect.height *= this._textureScale.y;
          this.tileFill(vb, contentRect, vb.uvRect, this._graphics.texture.width, this._graphics.texture.height);
          vb.addTriangles();
        } else if (this._scale9Grid) {
          this.sliceFill(vb);
        } else this._graphics.onPopulateMesh(vb);
      }
    }, {
      key: "sliceFill",
      value: function sliceFill(vb) {
        var texture = this.texture;
        gridRect.copy(this._scale9Grid);
        contentRect.copy(vb.contentRect);
        contentRect.width *= this._textureScale.x;
        contentRect.height *= this._textureScale.y;
        var uvRect = vb.uvRect;
        var sourceW = texture.width;
        var sourceH = texture.height;
        var flip = this._graphics.flip;

        if (flip != fgui.FlipType.None) {
          if (flip == fgui.FlipType.Horizontal || flip == fgui.FlipType.Both) {
            gridRect.x = sourceW - gridRect.xMax;
            gridRect.xMax = gridRect.x + gridRect.width;
          }

          if (flip == fgui.FlipType.Vertical || flip == fgui.FlipType.Both) {
            gridRect.y = sourceH - gridRect.yMax;
            gridRect.yMax = gridRect.y + gridRect.height;
          }
        }

        var sx = uvRect.width / sourceW;
        var sy = uvRect.height / sourceH;
        var xMax = uvRect.xMax;
        var yMax = uvRect.yMax;
        var xMax2 = gridRect.xMax;
        var yMax2 = gridRect.yMax;
        gridTexX[0] = uvRect.x;
        gridTexX[1] = uvRect.x + gridRect.x * sx;
        gridTexX[2] = uvRect.x + xMax2 * sx;
        gridTexX[3] = xMax;
        gridTexY[0] = yMax;
        gridTexY[1] = yMax - gridRect.y * sy;
        gridTexY[2] = yMax - yMax2 * sy;
        gridTexY[3] = uvRect.y;

        if (contentRect.width >= sourceW - gridRect.width) {
          gridX[1] = gridRect.x;
          gridX[2] = contentRect.width - (sourceW - xMax2);
          gridX[3] = contentRect.width;
        } else {
          var tmp = gridRect.x / (sourceW - xMax2);
          tmp = contentRect.width * tmp / (1 + tmp);
          gridX[1] = tmp;
          gridX[2] = tmp;
          gridX[3] = contentRect.width;
        }

        if (contentRect.height >= sourceH - gridRect.height) {
          gridY[1] = gridRect.y;
          gridY[2] = contentRect.height - (sourceH - yMax2);
          gridY[3] = contentRect.height;
        } else {
          var _tmp = gridRect.y / (sourceH - yMax2);

          _tmp = contentRect.height * _tmp / (1 + _tmp);
          gridY[1] = _tmp;
          gridY[2] = _tmp;
          gridY[3] = contentRect.height;
        }

        if (this._tileGridIndice == 0) {
          for (var cy = 0; cy < 4; cy++) {
            for (var cx = 0; cx < 4; cx++) {
              vb.addVert(gridX[cx] / this._textureScale.x, gridY[cy] / this._textureScale.y, 0, gridTexX[cx], gridTexY[cy], vb.vertexColor);
            }
          }

          vb.addTriangles(0, TRIANGLES_9_GRID);
        } else {
          var row, col;
          var part;

          for (var pi = 0; pi < 9; pi++) {
            col = pi % 3;
            row = pi / 3;
            part = gridTileIndice[pi];
            drawRect.setMinMax(gridX[col], gridY[row], gridX[col + 1], gridY[row + 1]);
            texRect.setMinMax(gridTexX[col], gridTexY[row + 1], gridTexX[col + 1], gridTexY[row]);

            if (part != -1 && (this._tileGridIndice & 1 << part) != 0) {
              this.tileFill(vb, drawRect, texRect, part == 0 || part == 1 || part == 4 ? gridRect.width : drawRect.width, part == 2 || part == 3 || part == 4 ? gridRect.height : drawRect.height);
            } else {
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
    }, {
      key: "tileFill",
      value: function tileFill(vb, contentRect, uvRect, sourceW, sourceH) {
        var hc = Math.ceil(contentRect.width / sourceW);
        var vc = Math.ceil(contentRect.height / sourceH);
        var tailWidth = contentRect.width - (hc - 1) * sourceW;
        var tailHeight = contentRect.height - (vc - 1) * sourceH;
        var xMax = uvRect.xMax;
        var yMax = uvRect.yMax;

        for (var i = 0; i < hc; i++) {
          for (var j = 0; j < vc; j++) {
            texRect2.copy(uvRect);
            if (i == hc - 1) texRect2.xMax = fgui.lerp(uvRect.x, xMax, tailWidth / sourceW);
            if (j == vc - 1) texRect2.yMin = fgui.lerp(uvRect.y, yMax, 1 - tailHeight / sourceH);
            drawRect2.set(contentRect.x + i * sourceW, contentRect.y + j * sourceH, i == hc - 1 ? tailWidth : sourceW, j == vc - 1 ? tailHeight : sourceH);
            drawRect2.x /= this._textureScale.x;
            drawRect2.y /= this._textureScale.y;
            drawRect2.width /= this._textureScale.x;
            drawRect2.height /= this._textureScale.y;
            vb.addQuad(drawRect2, texRect2, vb.vertexColor);
          }
        }
      }
    }, {
      key: "texture",
      get: function get() {
        return this._graphics.texture;
      },
      set: function set(value) {
        this._graphics.texture = value;
      }
    }, {
      key: "textureScale",
      get: function get() {
        return this._textureScale;
      },
      set: function set(value) {
        if (!this._textureScale.equals(value)) {
          this._textureScale.copy(value);

          this._graphics.setMeshDirty();
        }
      }
    }, {
      key: "scale9Grid",
      get: function get() {
        return this._scale9Grid;
      },
      set: function set(value) {
        this._scale9Grid = value;

        this._graphics.setMeshDirty();
      }
    }, {
      key: "scaleByTile",
      get: function get() {
        return this._scaleByTile;
      },
      set: function set(value) {
        if (this._scaleByTile != value) {
          this._scaleByTile = value;

          this._graphics.setMeshDirty();
        }
      }
    }, {
      key: "tileGridIndice",
      get: function get() {
        return this._tileGridIndice;
      },
      set: function set(value) {
        if (this._tileGridIndice != value) {
          this._tileGridIndice = value;

          this._graphics.setMeshDirty();
        }
      }
    }, {
      key: "fillMethod",
      get: function get() {
        return this._fillMesh ? this._fillMesh.method : fgui.FillMethod.None;
      },
      set: function set(value) {
        if (!this._fillMesh) {
          if (value == fgui.FillMethod.None) return;
          this._fillMesh = new fgui.FillMesh();
        }

        if (this._fillMesh.method != value) {
          this._fillMesh.method = value;

          this._graphics.setMeshDirty();
        }
      }
    }, {
      key: "fillOrigin",
      get: function get() {
        return this._fillMesh ? this._fillMesh.origin : 0;
      },
      set: function set(value) {
        if (!this._fillMesh) this._fillMesh = new fgui.FillMesh();

        if (this._fillMesh.origin != value) {
          this._fillMesh.origin = value;

          this._graphics.setMeshDirty();
        }
      }
    }, {
      key: "fillClockwise",
      get: function get() {
        return this._fillMesh ? this._fillMesh.clockwise : true;
      },
      set: function set(value) {
        if (!this._fillMesh) this._fillMesh = new fgui.FillMesh();

        if (this._fillMesh.clockwise != value) {
          this._fillMesh.clockwise = value;

          this._graphics.setMeshDirty();
        }
      }
    }, {
      key: "fillAmount",
      get: function get() {
        return this._fillMesh ? this._fillMesh.amount : 0;
      },
      set: function set(value) {
        if (!this._fillMesh) this._fillMesh = new fgui.FillMesh();

        if (this._fillMesh.amount != value) {
          this._fillMesh.amount = value;

          this._graphics.setMeshDirty();
        }
      }
    }]);

    return Image;
  }(fgui.DisplayObject);

  fgui.Image = Image;
  var TRIANGLES_9_GRID = [4, 1, 0, 1, 4, 5, 5, 2, 1, 2, 5, 6, 6, 3, 2, 3, 6, 7, 8, 5, 4, 5, 8, 9, 9, 6, 5, 6, 9, 10, 10, 7, 6, 7, 10, 11, 12, 9, 8, 9, 12, 13, 13, 10, 9, 10, 13, 14, 14, 11, 10, 11, 14, 15];
  var gridTileIndice = [-1, 0, -1, 2, 4, 3, -1, 1, -1];
  var gridX = [0, 0, 0, 0];
  var gridY = [0, 0, 0, 0];
  var gridTexX = [0, 0, 0, 0];
  var gridTexY = [0, 0, 0, 0];
  var gridRect = new fgui.Rect();
  var contentRect = new fgui.Rect();
  var drawRect = new fgui.Rect();
  var texRect = new fgui.Rect();
  var drawRect2 = new fgui.Rect();
  var texRect2 = new fgui.Rect();
})(fgui || (fgui = {}));

(function (fgui) {
  var MovieClip = /*#__PURE__*/function (_fgui$Image) {
    _inherits(MovieClip, _fgui$Image);

    var _super5 = _createSuper(MovieClip);

    function MovieClip() {
      var _this4;

      _classCallCheck(this, MovieClip);

      _this4 = _super5.call(this);
      _this4.interval = 0;
      _this4.swing = false;
      _this4.repeatDelay = 0;
      _this4.timeScale = 1;
      _this4._playing = true;
      _this4._frameCount = 0;
      _this4._frame = 0;
      _this4._start = 0;
      _this4._end = 0;
      _this4._times = 0;
      _this4._endAt = 0;
      _this4._status = 0;
      _this4._frameElapsed = 0;
      _this4._reversed = false;
      _this4._repeatedCount = 0;

      _this4.setPlaySettings();

      _this4.on(fgui.StageEvent.AddtoStage, _this4.__addToStage, _assertThisInitialized(_this4));

      _this4.on(fgui.StageEvent.RemoveFromStage, _this4.__removeFromStage, _assertThisInitialized(_this4));

      return _this4;
    }

    _createClass(MovieClip, [{
      key: "rewind",
      value: function rewind() {
        this._frame = 0;
        this._frameElapsed = 0;
        this._reversed = false;
        this._repeatedCount = 0;
        this.drawFrame();
      }
    }, {
      key: "syncStatus",
      value: function syncStatus(anotherMc) {
        this._frame = anotherMc._frame;
        this._frameElapsed = anotherMc._frameElapsed;
        this._reversed = anotherMc._reversed;
        this._repeatedCount = anotherMc._repeatedCount;
        this.drawFrame();
      }
    }, {
      key: "advance",
      value: function advance(timeInMiniseconds) {
        var beginFrame = this._frame;
        var beginReversed = this._reversed;
        var backupTime = timeInMiniseconds;

        while (true) {
          var tt = this.interval + (this._frames[this._frame].addDelay || 0);
          if (this._frame == 0 && this._repeatedCount > 0) tt += this.repeatDelay;

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
            } else {
              this._frame++;

              if (this._frame > this._frameCount - 1) {
                this._frame = Math.max(0, this._frameCount - 2);
                this._repeatedCount++;
                this._reversed = !this._reversed;
              }
            }
          } else {
            this._frame++;

            if (this._frame > this._frameCount - 1) {
              this._frame = 0;
              this._repeatedCount++;
            }
          }

          if (this._frame == beginFrame && this._reversed == beginReversed) {
            var roundTime = backupTime - timeInMiniseconds;
            timeInMiniseconds -= Math.floor(timeInMiniseconds / roundTime) * roundTime;
          }
        }

        this.drawFrame();
      }
    }, {
      key: "setPlaySettings",
      value: function setPlaySettings(start, end, times, endAt) {
        this._start = start || 0;
        this._end = end || -1;
        if (this._end == -1 || this._end > this._frameCount - 1) this._end = this._frameCount - 1;
        this._times = times || 0;
        this._endAt = endAt || -1;
        if (this._endAt == -1) this._endAt = this._end;
        this._status = 0;
        this.frame = this._start;
      }
    }, {
      key: "onTimer",
      value: function onTimer() {
        if (!this._playing || this._frameCount == 0 || this._status == 3) return;
        var dt = fgui.Timers.deltaTime;
        if (dt > 100) dt = 100;
        if (this.timeScale != 1) dt *= this.timeScale;
        this._frameElapsed += dt;
        var tt = this.interval + (this._frames[this._frame].addDelay || 0);
        if (this._frame == 0 && this._repeatedCount > 0) tt += this.repeatDelay;
        if (this._frameElapsed < tt) return;
        this._frameElapsed -= tt;
        if (this._frameElapsed > this.interval) this._frameElapsed = this.interval;

        if (this.swing) {
          if (this._reversed) {
            this._frame--;

            if (this._frame <= 0) {
              this._frame = 0;
              this._repeatedCount++;
              this._reversed = !this._reversed;
            }
          } else {
            this._frame++;

            if (this._frame > this._frameCount - 1) {
              this._frame = Math.max(0, this._frameCount - 2);
              this._repeatedCount++;
              this._reversed = !this._reversed;
            }
          }
        } else {
          this._frame++;

          if (this._frame > this._frameCount - 1) {
            this._frame = 0;
            this._repeatedCount++;
          }
        }

        if (this._status == 1) {
          this._frame = this._start;
          this._frameElapsed = 0;
          this._status = 0;
        } else if (this._status == 2) {
          this._frame = this._endAt;
          this._frameElapsed = 0;
          this._status = 3;
          this.dispatchEvent(fgui.PlayEvent.PlayEnd);
        } else {
          if (this._frame == this._end) {
            if (this._times > 0) {
              this._times--;
              if (this._times == 0) this._status = 2;else this._status = 1;
            } else {
              this._status = 1;
            }
          }
        }

        this.drawFrame();
      }
    }, {
      key: "drawFrame",
      value: function drawFrame() {
        if (this._frameCount > 0 && this._frame < this._frames.length) {
          var frame = this._frames[this._frame];
          this._graphics.texture = frame.texture;
        } else this._graphics.texture = null;
      }
    }, {
      key: "checkTimer",
      value: function checkTimer() {
        if (this._playing && this._frameCount > 0 && this.stage) fgui.Timers.addUpdate(this.onTimer, this);else fgui.Timers.remove(this.onTimer, this);
      }
    }, {
      key: "__addToStage",
      value: function __addToStage() {
        if (this._playing && this._frameCount > 0) fgui.Timers.addUpdate(this.onTimer, this);
      }
    }, {
      key: "__removeFromStage",
      value: function __removeFromStage() {
        fgui.Timers.remove(this.onTimer, this);
      }
    }, {
      key: "frames",
      get: function get() {
        return this._frames;
      },
      set: function set(value) {
        this._frames = value;
        this._scaleByTile = false;
        this._scale9Grid = null;

        if (this._frames) {
          this._frameCount = this._frames.length;
          if (this._end == -1 || this._end > this._frameCount - 1) this._end = this._frameCount - 1;
          if (this._endAt == -1 || this._endAt > this._frameCount - 1) this._endAt = this._frameCount - 1;
          if (this._frame < 0 || this._frame > this._frameCount - 1) this._frame = this._frameCount - 1;
          this._frameElapsed = 0;
          this._repeatedCount = 0;
          this._reversed = false;
        } else this._frameCount = 0;

        this.drawFrame();
        this.checkTimer();
      }
    }, {
      key: "frameCount",
      get: function get() {
        return this._frameCount;
      }
    }, {
      key: "frame",
      get: function get() {
        return this._frame;
      },
      set: function set(value) {
        if (this._frame != value) {
          if (this._frames && value >= this._frameCount) value = this._frameCount - 1;
          this._frame = value;
          this._frameElapsed = 0;
          this.drawFrame();
        }
      }
    }, {
      key: "playing",
      get: function get() {
        return this._playing;
      },
      set: function set(value) {
        if (this._playing != value) {
          this._playing = value;
          this.checkTimer();
        }
      }
    }]);

    return MovieClip;
  }(fgui.Image);

  fgui.MovieClip = MovieClip;
})(fgui || (fgui = {}));

(function (fgui) {
  var Color4 = /*#__PURE__*/function (_THREE$Color) {
    _inherits(Color4, _THREE$Color);

    var _super6 = _createSuper(Color4);

    function Color4(rgb, a) {
      var _this5;

      _classCallCheck(this, Color4);

      _this5 = _super6.call(this, rgb || 0);
      _this5.a = a != null ? a : 1;
      return _this5;
    }

    return Color4;
  }(THREE.Color);

  fgui.Color4 = Color4;
})(fgui || (fgui = {}));

(function (fgui) {
  var NGraphics = /*#__PURE__*/function () {
    function NGraphics(owner) {
      _classCallCheck(this, NGraphics);

      this._flip = 0;
      this._color = 0xFFFFFF;
      this._contentRect = new fgui.Rect();
      this._material = new fgui.NMaterial();
      this._geometry = new THREE.BufferGeometry();
      var o = owner;
      o.geometry = this._geometry;
      o.material = this._material;
      o.isMesh = true;
      o.drawMode = THREE.TrianglesDrawMode;
      delete o.isGroup;
    }

    _createClass(NGraphics, [{
      key: "getMeshFactory",
      value: function getMeshFactory(type) {
        if (!(this._meshFactory instanceof type)) {
          this._meshFactory = new type();
          this._meshDirty = true;
        }

        return this._meshFactory;
      }
    }, {
      key: "setDrawRect",
      value: function setDrawRect(rect) {
        this._contentRect.copy(rect);

        this._meshDirty = true;
      }
    }, {
      key: "setKeyword",
      value: function setKeyword(key, value) {
        if (value) {
          this._material.defines[key] = value;
          this._material.needsUpdate = true;
        } else delete this._material.defines[key];
      }
    }, {
      key: "setMeshDirty",
      value: function setMeshDirty() {
        this._meshDirty = true;
      }
    }, {
      key: "updateMesh",
      value: function updateMesh() {
        if (this._meshDirty) {
          this.updateMeshNow();
          return true;
        } else return false;
      }
    }, {
      key: "update",
      value: function update(clipPlanes, alpha) {
        if (this._meshDirty) this.updateMeshNow();
        this._material.clippingPlanes = clipPlanes;
        this._material.clipping = clipPlanes != null;
        this._material.opacity = alpha;
      }
    }, {
      key: "updateMeshNow",
      value: function updateMeshNow() {
        this._meshDirty = false;

        if (!this._texture || !this._meshFactory) {
          if (this._geometry.drawRange.count > 0) {
            this._geometry.setDrawRange(0, 0);

            this._geometry.computeBoundingSphere();
          }

          return;
        }

        var vb = fgui.VertexBuffer.begin();
        vb.contentRect.copy(this._contentRect);
        vb.uvRect.copy(this._texture.uvRect);
        if (this._texture) vb.textureSize.set(this._texture.width, this._texture.height);else vb.textureSize.set(0, 0);

        if (this._flip != fgui.FlipType.None) {
          if (this._flip == fgui.FlipType.Horizontal || this._flip == fgui.FlipType.Both) {
            var tmp = vb.uvRect.xMin;
            vb.uvRect.xMin = vb.uvRect.xMax;
            vb.uvRect.xMax = tmp;
          }

          if (this._flip == fgui.FlipType.Vertical || this._flip == fgui.FlipType.Both) {
            var _tmp2 = vb.uvRect.yMin;
            vb.uvRect.yMin = vb.uvRect.yMax;
            vb.uvRect.yMax = _tmp2;
          }
        }

        vb.vertexColor.setHex(this._color);

        this._meshFactory.onPopulateMesh(vb);

        var vertCount = vb.currentVertCount;

        if (vertCount == 0) {
          if (this._geometry.drawRange.count > 0) {
            this._geometry.setDrawRange(0, 0);

            this._geometry.computeBoundingSphere();
          }

          vb.end();
          return;
        }

        if (this._texture.rotated) {
          var xMin = this._texture.uvRect.x;
          var yMin = this._texture.uvRect.y;
          var yMax = this._texture.uvRect.yMax;
          var k = 0;

          for (var i = 0; i < vertCount; i++) {
            var v1 = vb.uvs[k];
            var v2 = vb.uvs[k + 1];
            vb.uvs[k + 1] = yMin + v1 - xMin;
            vb.uvs[k] = xMin + yMax - v2;
          }
        }

        var gm = this._geometry;
        this.writeAttribute(gm, "position", vb.vertices, 3);
        this.writeAttribute(gm, "uv", vb.uvs, 2);
        this.writeAttribute(gm, "color", vb.colors, 4);
        this.writeIndexAttribute(gm, vb.triangles);
        gm.setDrawRange(0, vb.triangles.length);
        gm.computeBoundingSphere();
        vb.end();
      }
    }, {
      key: "writeAttribute",
      value: function writeAttribute(gm, name, arr, itemSize) {
        var attr = gm.attributes[name];

        if (!attr || !attr.isBufferAttribute || attr.array.length < arr.length) {
          attr = new THREE.BufferAttribute(new Float32Array(arr.length), itemSize);
          gm.setAttribute(name, attr);
        }

        attr.copyArray(arr);
        attr.needsUpdate = true;
      }
    }, {
      key: "writeIndexAttribute",
      value: function writeIndexAttribute(gm, arr) {
        var attr = gm.index;

        if (!attr || !attr.isBufferAttribute || attr.array.length < arr.length) {
          attr = new THREE.BufferAttribute(new Uint16Array(arr.length), 1);
          gm.index = attr;
        }

        attr.copyArray(arr);
        attr.needsUpdate = true;
      }
    }, {
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        this._texture.getDrawRect(vb.contentRect);

        vb.addQuad(vb.contentRect, vb.uvRect, vb.vertexColor);
        vb.addTriangles();
      }
    }, {
      key: "texture",
      get: function get() {
        return this._texture;
      },
      set: function set(value) {
        if (this._texture != value) {
          this._texture = value;
          this._meshDirty = true;
        }

        if (this._texture) this._material.map = this._texture.nativeTexture;else this._material.map = null;
      }
    }, {
      key: "material",
      get: function get() {
        return this._material;
      },
      set: function set(value) {
        this._material = value;
      }
    }, {
      key: "meshFactory",
      get: function get() {
        return this._meshFactory;
      },
      set: function set(value) {
        if (this._meshFactory != value) {
          this._meshFactory = value;
          this._meshDirty = true;
        }
      }
    }, {
      key: "flip",
      get: function get() {
        return this._flip;
      },
      set: function set(value) {
        if (this._flip != value) {
          this._flip = value;
          this._meshDirty = true;
        }
      }
    }, {
      key: "color",
      get: function get() {
        return this._color;
      },
      set: function set(value) {
        if (this._color != value) {
          this._color = value;

          if (!this._meshDirty) {
            s_col.setHex(value);
            var attr = this._geometry.attributes["color"];

            if (attr) {
              var arr = attr.array;
              var len = arr.length;

              for (var i = 0; i < len; i += 4) {
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
    }, {
      key: "grayed",
      get: function get() {
        return this._material.defines.GRAYED;
      },
      set: function set(value) {
        this.setKeyword("GRAYED", value);
      }
    }]);

    return NGraphics;
  }();

  fgui.NGraphics = NGraphics;
  var s_col = new fgui.Color4();
})(fgui || (fgui = {}));

(function (fgui) {
  var NMaterial = /*#__PURE__*/function (_THREE$ShaderMaterial) {
    _inherits(NMaterial, _THREE$ShaderMaterial);

    var _super7 = _createSuper(NMaterial);

    function NMaterial() {
      var _this6;

      _classCallCheck(this, NMaterial);

      _this6 = _super7.call(this);
      var customUniforms = THREE.UniformsUtils.merge([THREE.ShaderLib.basic.uniforms, {
        _ColorMatrix: new THREE.Uniform(new THREE.Matrix4())
      }, {
        _ColorOffset: new THREE.Uniform(new THREE.Vector4())
      }]);
      _this6.uniforms = customUniforms;
      _this6.vertexShader = "\n            #include <common>\n            #include <uv_pars_vertex>\n            #include <uv2_pars_vertex>\n            #include <envmap_pars_vertex>\n            varying vec4 vColor;\n            attribute vec4 color;\n            #include <fog_pars_vertex>\n            #include <morphtarget_pars_vertex>\n            #include <skinning_pars_vertex>\n            #include <logdepthbuf_pars_vertex>\n            #include <clipping_planes_pars_vertex>\n            \n            void main() {\n            \n                #include <uv_vertex>\n                #include <uv2_vertex>\n    \n                vColor = color;\n    \n                #include <skinbase_vertex>\n            \n                #ifdef USE_ENVMAP\n            \n                #include <beginnormal_vertex>\n                #include <morphnormal_vertex>\n                #include <skinnormal_vertex>\n                #include <defaultnormal_vertex>\n            \n                #endif\n            \n                #include <begin_vertex>\n                #include <morphtarget_vertex>\n                #include <skinning_vertex>\n                #include <project_vertex>\n                #include <logdepthbuf_vertex>\n            \n                #include <worldpos_vertex>\n                #include <clipping_planes_vertex>\n                #include <envmap_vertex>\n                #include <fog_vertex>\n            \n            }\n            ";
      _this6.fragmentShader = "\n            uniform bool grayed;\n            uniform bool filter;\n            uniform mat4 colorMatrix;\n            uniform vec4 colorOffset;\n    \n            uniform vec3 diffuse;\n            uniform float opacity;\n            #ifndef FLAT_SHADED\n                varying vec3 vNormal;\n            #endif\n            #include <common>\n            #include <dithering_pars_fragment>\n    \n            varying vec4 vColor;\n    \n            #include <uv_pars_fragment>\n            #include <uv2_pars_fragment>\n            #include <map_pars_fragment>\n            #include <alphamap_pars_fragment>\n            #include <aomap_pars_fragment>\n            #include <lightmap_pars_fragment>\n            #include <envmap_common_pars_fragment>\n            #include <envmap_pars_fragment>\n            #include <cube_uv_reflection_fragment>\n            #include <fog_pars_fragment>\n            #include <specularmap_pars_fragment>\n            #include <logdepthbuf_pars_fragment>\n            #include <clipping_planes_pars_fragment>\n            void main() {\n                #include <clipping_planes_fragment>\n                vec4 diffuseColor = vec4( diffuse, opacity );\n                #include <logdepthbuf_fragment>\n                #ifdef USE_MAP\n                    #ifdef TEXT\n                        vec4 sampleColor = texture2D( map, vUv );\n                        if(vColor.a<0.1)\n                            diffuseColor.a *= sampleColor.r;\n                        else if(vColor.a<0.4)\n                            diffuseColor.a *= sampleColor.g;\n                        else\n                            diffuseColor.a *= sampleColor.b;\n                    #else\n                        #include <map_fragment>\n                    #endif\n                #endif\n    \n                #ifdef TEXT\n                diffuseColor.rgb *= vColor.rgb;\n                #else\n                diffuseColor *= vColor;\n                #endif\n    \n                #include <alphamap_fragment>\n                #include <alphatest_fragment>\n                #include <specularmap_fragment>\n                ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n                // accumulation (baked indirect lighting only)\n                #ifdef USE_LIGHTMAP\n                    vec4 lightMapTexel= texture2D( lightMap, vUv2 );\n                    reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n                #else\n                    reflectedLight.indirectDiffuse += vec3( 1.0 );\n                #endif\n                // modulation\n                #include <aomap_fragment>\n                reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n                vec3 outgoingLight = reflectedLight.indirectDiffuse;\n                #include <envmap_fragment>\n                gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n                #include <tonemapping_fragment>\n                #include <encodings_fragment>\n                #include <fog_fragment>\n                #include <premultiplied_alpha_fragment>\n                #include <dithering_fragment>\n    \n                #ifdef GRAYED\n                float grey = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));\n                gl_FragColor.rgb = vec3(grey, grey, grey);\n                #endif\n    \n                #ifdef COLOR_FILTER\n                vec4 col = gl_FragColor;\n                gl_FragColor.r = dot(col, _ColorMatrix[0]) + _ColorOffset.x;\n                gl_FragColor.g = dot(col, _ColorMatrix[1]) + _ColorOffset.y;\n                gl_FragColor.b = dot(col, _ColorMatrix[2]) + _ColorOffset.z;\n                gl_FragColor.a = dot(col, _ColorMatrix[3]) + _ColorOffset.w;\n                #endif\n            }\n            ";
      _this6.name = "ui-material";
      _this6.lights = false;
      _this6.transparent = true;
      _this6.depthTest = false;
      _this6.side = THREE.DoubleSide;
      _this6["isMeshBasicMaterial"] = true;
      return _this6;
    }

    return NMaterial;
  }(THREE.ShaderMaterial);

  fgui.NMaterial = NMaterial;
})(fgui || (fgui = {}));

(function (fgui) {
  var NTexture = /*#__PURE__*/function () {
    function NTexture(texture, xScale, yScale) {
      _classCallCheck(this, NTexture);

      xScale = xScale || 1;
      yScale = yScale || 1;
      this._nativeTexture = texture;
      this._root = this;
      this.uvRect = new fgui.Rect(0, 0, xScale, yScale);

      if (yScale < 0) {
        this.uvRect.y = -yScale;
        this.uvRect.height = yScale;
      }

      if (xScale < 0) {
        this.uvRect.x = -xScale;
        this.uvRect.width = xScale;
      }

      this.originalSize = texture ? new THREE.Vector2(texture.image.width, texture.image.height) : new THREE.Vector2(2, 2);
      this.region = new fgui.Rect(0, 0, this.originalSize.x, this.originalSize.y);
      this.offset = new THREE.Vector2(0, 0);
    }

    _createClass(NTexture, [{
      key: "createSubTexture",
      value: function createSubTexture(region, rotated, offset, originalSize) {
        var nt = new NTexture();
        nt._root = this;
        nt.rotated = rotated || false;
        nt.region.copy(region);
        nt.region.x += this.region.x;
        nt.region.y += this.region.y;
        nt.uvRect.set(nt.region.x * this.uvRect.width / this.width, 1 - nt.region.yMax * this.uvRect.height / this.height, nt.region.width * this.uvRect.width / this.width, nt.region.height * this.uvRect.height / this.height);

        if (rotated) {
          var tmp = nt.region.width;
          nt.region.width = nt.region.height;
          nt.region.height = tmp;
          tmp = nt.uvRect.width;
          nt.uvRect.width = nt.uvRect.height;
          nt.uvRect.height = tmp;
        }

        if (originalSize) nt.originalSize.copy(originalSize);else nt.originalSize.set(nt.region.width, nt.region.height);
        if (offset) nt.offset.copy(offset);
        return nt;
      }
    }, {
      key: "getDrawRect",
      value: function getDrawRect(drawRect) {
        if (this.originalSize.x == this.region.width && this.originalSize.y == this.region.height) return drawRect;
        var sx = drawRect.width / this.originalSize.x;
        var sy = drawRect.height / this.originalSize.y;
        drawRect.x = this.offset.x * sx;
        drawRect.y = this.offset.y * sy;
        drawRect.width = this.region.width * sx;
        drawRect.height = this.region.height * sy;
        return drawRect;
      }
    }, {
      key: "getUV",
      value: function getUV(uv) {
        uv[0] = this.uvRect.position;
        uv[1] = new THREE.Vector2(this.uvRect.x, this.uvRect.yMax);
        uv[2] = new THREE.Vector2(this.uvRect.xMax, this.uvRect.yMax);
        uv[3] = new THREE.Vector2(this.uvRect.xMax, this.uvRect.y);

        if (this.rotated) {
          var xMin = this.uvRect.xMin;
          var yMin = this.uvRect.yMin;
          var yMax = this.uvRect.yMax;

          for (var i = 0; i < 4; i++) {
            var m = uv[i];
            var tmp = m.y;
            m.y = yMin + m.x - xMin;
            m.x = xMin + yMax - tmp;
          }
        }
      }
    }, {
      key: "reload",
      value: function reload(nativeTexture) {
        if (this._root != this) throw new Error("Reload is not allow to call on none root NTexture.");
        if (this._nativeTexture && this._nativeTexture != nativeTexture) this._nativeTexture.dispose();
        this._nativeTexture = nativeTexture;
        if (this._nativeTexture) this.originalSize.set(nativeTexture.image.width, nativeTexture.image.height);else this.originalSize.set(0, 0);
        this.region.set(0, 0, this.originalSize.x, this.originalSize.y);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (this._root == this) this._nativeTexture.dispose();
      }
    }, {
      key: "width",
      get: function get() {
        return this.region.width;
      }
    }, {
      key: "height",
      get: function get() {
        return this.region.height;
      }
    }, {
      key: "nativeTexture",
      get: function get() {
        return this._root == this ? this._nativeTexture : this._root.nativeTexture;
      }
    }, {
      key: "root",
      get: function get() {
        return this._root;
      }
    }]);

    return NTexture;
  }();

  fgui.NTexture = NTexture;
  fgui.EmptyTexture = new NTexture();
})(fgui || (fgui = {}));

(function (fgui) {
  var Shape = /*#__PURE__*/function (_fgui$DisplayObject2) {
    _inherits(Shape, _fgui$DisplayObject2);

    var _super8 = _createSuper(Shape);

    function Shape() {
      var _this7;

      _classCallCheck(this, Shape);

      _this7 = _super8.call(this);
      _this7._graphics = new fgui.NGraphics(_this7._obj3D);
      _this7._graphics.texture = fgui.EmptyTexture;
      return _this7;
    }

    _createClass(Shape, [{
      key: "drawRect",
      value: function drawRect(lineWidth, lineColor, fillColor) {
        var mesh = this._graphics.getMeshFactory(fgui.RectMesh);

        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;

        this._graphics.setMeshDirty();

        if (fillColor.a == 1) {
          mesh.fillColor = null;
          this._graphics.color = fillColor.getHex();
        } else this._graphics.color = 0xFFFFFF;
      }
    }, {
      key: "drawRoundRect",
      value: function drawRoundRect(lineWidth, lineColor, fillColor, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius) {
        var mesh = this._graphics.getMeshFactory(fgui.RoundedRectMesh);

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
        } else this._graphics.color = 0xFFFFFF;
      }
    }, {
      key: "drawEllipse",
      value: function drawEllipse(lineWidth, centerColor, lineColor, fillColor, startDegree, endDegree) {
        var mesh = this._graphics.getMeshFactory(fgui.EllipseMesh);

        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;
        mesh.fillColor = fillColor;
        if (centerColor.equals(fillColor)) mesh.centerColor = null;else mesh.centerColor = centerColor;
        mesh.startDegree = startDegree;
        mesh.endDegreee = endDegree;

        this._graphics.setMeshDirty();

        if (fillColor.a == 1) {
          mesh.fillColor = null;
          this._graphics.color = fillColor.getHex();
        } else this._graphics.color = 0xFFFFFF;
      }
    }, {
      key: "drawPolygon",
      value: function drawPolygon(points, fillColor, lineWidth, lineColor) {
        var mesh = this._graphics.getMeshFactory(fgui.PolygonMesh);

        mesh.points.length = 0;
        mesh.points.push.apply(mesh.points, points);
        mesh.fillColor = fillColor;
        mesh.lineWidth = lineWidth;
        mesh.lineColor = lineColor;

        this._graphics.setMeshDirty();

        if (fillColor.a == 1) {
          mesh.fillColor = null;
          this._graphics.color = fillColor.getHex();
        } else this._graphics.color = 0xFFFFFF;
      }
    }, {
      key: "drawRegularPolygon",
      value: function drawRegularPolygon(sides, lineWidth, centerColor, lineColor, fillColor, rotation, distances) {
        var mesh = this._graphics.getMeshFactory(fgui.RegularPolygonMesh);

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
        } else this._graphics.color = 0xFFFFFF;
      }
    }, {
      key: "clear",
      value: function clear() {
        this._graphics.meshFactory = null;

        this._graphics.setMeshDirty();
      }
    }, {
      key: "hitTest",
      value: function hitTest(context) {
        if (!this._graphics.meshFactory) return null;
        var pt = context.getLocal(this);
        var ht = this._graphics.meshFactory;
        if ('hitTest' in ht) return ht.hitTest(this._contentRect, pt.x, pt.y) ? this : null;else if (this._contentRect.contains(pt)) return this;else return null;
      }
    }]);

    return Shape;
  }(fgui.DisplayObject);

  fgui.Shape = Shape;
})(fgui || (fgui = {}));

(function (fgui) {
  fgui.UILayer = 1;

  var Stage = /*#__PURE__*/function () {
    function Stage() {
      _classCallCheck(this, Stage);
    }

    _createClass(Stage, null, [{
      key: "init",
      value: function init(renderer) {
        _init(renderer);
      }
    }, {
      key: "getTouchPos",
      value: function getTouchPos(touchId, ret) {
        if (!ret) ret = new THREE.Vector2();
        if (touchId == null || touchId == -1) ret.copy(_touchPos);else {
          var touch = getTouch(touchId);
          if (touch) ret.set(touch.x, touch.y);else ret.copy(_touchPos);
        }
        return ret;
      }
    }, {
      key: "addTouchMonitor",
      value: function addTouchMonitor(touchId, target) {
        var touch = getTouch(touchId);
        if (touch.touchMonitors.indexOf(target) == -1) touch.touchMonitors.push(target);
      }
    }, {
      key: "removeTouchMonitor",
      value: function removeTouchMonitor(target) {
        for (var j = 0; j < 5; j++) {
          var touch = _touches[j];
          var i = touch.touchMonitors.indexOf(target);
          if (i != -1) touch.touchMonitors[i] = null;
        }
      }
    }, {
      key: "cancelClick",
      value: function cancelClick(touchId) {
        for (var j = 0; j < 5; j++) {
          var touch = _touches[j];
          if (touch.touchId == touchId) touch.clickCancelled = true;
        }
      }
    }, {
      key: "update",
      value: function update() {
        this.disableMatrixValidation = true;
        fgui.traverseUpdate(_scene, null, 1);

        if (this.fontRebuilt) {
          _scene.traverseVisible(function (obj) {
            var dobj = obj["$owner"];
            if (dobj && 'redraw' in dobj) dobj.redraw();
          });

          this.fontRebuilt = false;
        }

        this.disableMatrixValidation = false;
      }
    }, {
      key: "hitTest",
      value: function hitTest(x, y, forTouch) {
        return _hitTest(x, y, forTouch);
      }
    }, {
      key: "setFocus",
      value: function setFocus(obj) {
        _setFocus(obj);
      }
    }, {
      key: "scene",
      set: function set(value) {
        _scene = value;
      },
      get: function get() {
        return _scene;
      }
    }, {
      key: "domElement",
      get: function get() {
        return _canvas;
      }
    }, {
      key: "devicePixelRatio",
      get: function get() {
        return _devicePixelRatio;
      }
    }, {
      key: "camera",
      get: function get() {
        return _camera;
      },
      set: function set(value) {
        _camera = value;
      }
    }, {
      key: "width",
      get: function get() {
        return _width;
      }
    }, {
      key: "height",
      get: function get() {
        return _height;
      }
    }, {
      key: "touchPos",
      get: function get() {
        return _touchPos;
      }
    }, {
      key: "touchTarget",
      get: function get() {
        return _touchTarget;
      }
    }, {
      key: "touchCount",
      get: function get() {
        return _touchCount;
      }
    }]);

    return Stage;
  }();

  Stage.eventDispatcher = new fgui.EventDispatcher();
  fgui.Stage = Stage;

  var HitTestContext = /*#__PURE__*/function () {
    function HitTestContext() {
      _classCallCheck(this, HitTestContext);

      this.screenPt = new THREE.Vector3();
    }

    _createClass(HitTestContext, [{
      key: "getLocal",
      value: function getLocal(obj) {
        hit_tmp.copy(this._ray.origin);
        obj.worldToLocal(hit_tmp, this._ray.direction);
        hit_tmp2.set(hit_tmp.x, hit_tmp.y);
        return hit_tmp2;
      }
    }, {
      key: "camera",
      get: function get() {
        return this._camera;
      },
      set: function set(value) {
        this._camera = value;
        this._ray = this._camera["$hitTestRay"];
        if (!this._ray) this._camera["$hitTestRay"] = this._ray = {
          origin: new THREE.Vector3(),
          direction: new THREE.Vector3()
        };
        screenToWorld(this._camera, this.screenPt.x, this.screenPt.y, this._ray.origin, this._ray.direction);
      }
    }, {
      key: "ray",
      get: function get() {
        return this._ray;
      },
      set: function set(value) {
        this._ray = value;
      }
    }]);

    return HitTestContext;
  }();

  fgui.HitTestContext = HitTestContext;
  var clickTestThreshold = 10;

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

  var _offsetX;

  var _offsetY;

  var _touchscreen;

  var _devicePixelRatio = 1;
  var hit_tmp = new THREE.Vector3();
  var hit_tmp2 = new THREE.Vector2();

  function _init(renderer) {
    _canvas = renderer.domElement;
    _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1000);

    _camera.layers.set(fgui.UILayer);

    _touchscreen = is_touch_enabled();
    if (renderer instanceof THREE.WebGLRenderer) _devicePixelRatio = renderer.getPixelRatio();
    _touches = [];

    for (var i = 0; i < 5; i++) {
      _touches.push(new TouchInfo());
    }

    if (!_touchscreen) _touches[0].touchId = 0;
    _touchCount = 0;
    _touchPos = new THREE.Vector2();

    if (_touchscreen) {
      document.addEventListener('touchstart', function (ev) {
        return handleTouch(ev, 0);
      }, {
        passive: false
      });
      document.addEventListener('touchend', function (ev) {
        return handleTouch(ev, 1);
      }, {
        passive: false
      });
      document.addEventListener('touchmove', function (ev) {
        return handleTouch(ev, 2);
      }, {
        passive: false
      });
      document.addEventListener('touchcancel', function (ev) {
        return handleTouch(ev, 3);
      }, {
        passive: false
      });
    } else {
      document.addEventListener('mousedown', function (ev) {
        return handleMouse(ev, 0);
      }, {
        passive: false
      });
      document.addEventListener('mouseup', function (ev) {
        return handleMouse(ev, 1);
      }, {
        passive: false
      });
      document.addEventListener('mousemove', function (ev) {
        return handleMouse(ev, 2);
      }, {
        passive: false
      });
    }

    document.addEventListener('wheel', function (ev) {
      return handleWheel(ev);
    }, {
      passive: false
    });
    window.addEventListener('resize', onWindowResize, false);
    _offsetX = _offsetY = 0;
    var element = _canvas;
    var style = getComputedStyle(element, null);
    _offsetY += parseInt(style.getPropertyValue("padding-top"), 10);
    _offsetX += parseInt(style.getPropertyValue("padding-left"), 10);

    do {
      _offsetX += element.offsetLeft;
      _offsetY += element.offsetTop;
      style = getComputedStyle(element, null);
      _offsetX += parseInt(style.getPropertyValue("border-left-width"), 10);
      _offsetY += parseInt(style.getPropertyValue("border-top-width"), 10);
    } while (element = element.offsetParent);

    onWindowResize();
  }

  function onWindowResize(evt) {
    _width = _canvas.clientWidth;
    _height = _canvas.clientHeight;
    var aspectRatio = _width / _height;

    if (_camera instanceof THREE.OrthographicCamera) {
      var cameraSize = _height / 2;
      _camera.left = -cameraSize * aspectRatio;
      _camera.right = cameraSize * aspectRatio;
      _camera.top = cameraSize;
      _camera.bottom = -cameraSize;
      _camera.position.x = cameraSize * aspectRatio;
      _camera.position.y = -cameraSize;
      _camera.position.z = 0;

      _camera.updateProjectionMatrix();
    } else if (_camera instanceof THREE.PerspectiveCamera) {
      _camera.aspect = window.innerWidth / window.innerHeight;

      _camera.updateProjectionMatrix();
    }

    if (activeTextInput) _setFocus(null);
    if (evt) Stage.eventDispatcher.dispatchEvent(fgui.DisplayObjectEvent.XY_CHANGED);
  }

  function is_touch_enabled() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  function handleMouse(ev, type) {
    if (!activeTextInput || !activeTextInput.stage) ev.preventDefault();

    _touchPos.set(ev.pageX - _offsetX, ev.pageY - _offsetY);

    var touch = _touches[0];
    touch.shiftKey = ev.shiftKey;
    touch.ctrlKey = ev.ctrlKey;
    touch.target = _touchTarget = _hitTest(_touchPos.x, _touchPos.y, true);

    if (_touchPos.x != touch.x || _touchPos.y != touch.y) {
      touch.x = _touchPos.x;
      touch.y = _touchPos.y;
      touch.move();
    }

    if (touch.lastRollOver != touch.target) handleRollOver(touch);

    if (type == 0) {
      if (!touch.began) {
        _touchCount = 1;
        touch.begin();
        touch.button = ev.button;

        _setFocus(touch.target);

        setLastInput(touch);
        if (touch.target) bubbleEvent(touch.target.obj3D, fgui.InteractiveEvents.Down);
      }
    } else if (type == 1) {
      if (touch.began) {
        _touchCount = 0;
        touch.end();
        var clickTarget = touch.clickTest();

        if (clickTarget) {
          setLastInput(touch);
          if (ev.button == 1 || ev.button == 2) bubbleEvent(clickTarget.obj3D, fgui.InteractiveEvents.RightClick);else bubbleEvent(clickTarget.obj3D, fgui.InteractiveEvents.Click);
        }

        touch.button = -1;
      }
    }
  }

  function handleWheel(ev) {
    if (!activeTextInput || !activeTextInput.stage) ev.preventDefault();

    _touchPos.set(ev.pageX - _offsetX, ev.pageY - _offsetY);

    var touch = _touches[0];

    if (_touchscreen) {
      touch.shiftKey = ev.shiftKey;
      touch.ctrlKey = ev.ctrlKey;
      touch.target = _touchTarget = _hitTest(_touchPos.x, _touchPos.y, true);
    }

    if (_touchTarget != null) {
      touch.mouseWheelDelta = ev.deltaY;
      setLastInput(touch);
      bubbleEvent(_touchTarget.obj3D, fgui.DisplayObjectEvent.MOUSE_WHEEL);
      touch.mouseWheelDelta = 0;
    }
  }

  function getTouch(touchId) {
    for (var j = 0; j < 5; j++) {
      var touch = _touches[j];
      if (touchId == -1 && touch.touchId != -1 || touchId != -1 && touch.touchId == touchId) return touch;
    }

    return null;
  }

  function handleTouch(ev, type) {
    if (!activeTextInput || !activeTextInput.stage) ev.preventDefault();
    var touches = ev.changedTouches;

    for (var i = 0; i < touches.length; ++i) {
      var uTouch = touches[i];

      _touchPos.set(uTouch.pageX - _offsetX, uTouch.pageY - _offsetY);

      var touch = void 0;
      var free = void 0;

      for (var j = 0; j < 5; j++) {
        if (_touches[j].touchId == uTouch.identifier) {
          touch = _touches[j];
          break;
        }

        if (_touches[j].touchId == -1) free = _touches[j];
      }

      if (!touch) {
        touch = free;
        if (!touch || type != 0) continue;
        touch.touchId = uTouch.identifier;
      }

      touch.shiftKey = ev.shiftKey;
      touch.ctrlKey = ev.ctrlKey;
      touch.target = _touchTarget = _hitTest(_touchPos.x, _touchPos.y, true);

      if (touch.x != _touchPos.x || touch.y != _touchPos.y) {
        touch.x = _touchPos.x;
        touch.y = _touchPos.y;
        if (touch.began) touch.move();
      }

      if (touch.lastRollOver != touch.target) handleRollOver(touch);

      if (type == 0) {
        if (!touch.began) {
          _touchCount++;
          touch.begin();
          touch.button = 0;

          _setFocus(touch.target);

          setLastInput(touch);
          if (touch.target) bubbleEvent(touch.target.obj3D, fgui.InteractiveEvents.Down);
        }
      } else if (type == 1 || type == 3) {
        if (touch.began) {
          _touchCount--;
          touch.end();

          if (type != 3) {
            var clickTarget = touch.clickTest();

            if (clickTarget != null) {
              setLastInput(touch);
              bubbleEvent(clickTarget.obj3D, fgui.InteractiveEvents.Click);
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

      touch.lastRollOver.obj3D.traverseAncestors(function (obj) {
        var dobj = obj["$owner"];
        if (dobj) _rollOutChain.push(dobj);
      });
    }

    touch.lastRollOver = touch.target;

    if (touch.target) {
      var obj = touch.target.obj3D;

      while (obj) {
        var dobj = obj["$owner"];

        if (dobj) {
          var i = _rollOutChain.indexOf(dobj);

          if (i != -1) {
            _rollOutChain.splice(i, _rollOutChain.length - i);

            break;
          }

          _rollOverChain.push(dobj);
        }

        obj = obj.parent;
      }
    }

    var cnt = _rollOutChain.length;

    if (cnt > 0) {
      for (var _i2 = 0; _i2 < cnt; _i2++) {
        var element = _rollOutChain[_i2];
        if (element.stage) element.dispatchEvent(fgui.RollEvent.RollOut, null);
      }

      _rollOutChain.length = 0;
    }

    cnt = _rollOverChain.length;

    if (cnt > 0) {
      for (var _i3 = 0; _i3 < cnt; _i3++) {
        var _element = _rollOverChain[_i3];
        if (_element.stage) _element.dispatchEvent(fgui.RollEvent.RollOver, null);
      }

      _rollOverChain.length = 0;
    }

    ;
  }

  function _hitTest(x, y, forTouch) {
    if (!_hitTestContext) _hitTestContext = new HitTestContext();
    Stage.disableMatrixValidation = true;

    _hitTestContext.screenPt.set(x, y, 0);

    _hitTestContext.camera = _camera;
    _hitTestContext.forTouch = forTouch != null ? forTouch : true;
    var ret = fgui.traverseHitTest(_scene, _hitTestContext);
    Stage.disableMatrixValidation = false;
    return ret;
  }

  var activeTextInput;

  function _setFocus(obj) {
    if (activeTextInput == obj) return;

    if (activeTextInput) {
      var t = activeTextInput;
      activeTextInput = null;
      t.dispatchEvent("focus_out");
    }

    if (!obj || !obj["isInput"]) return;
    activeTextInput = obj;
    activeTextInput.dispatchEvent(fgui.TextEvent.FocusIn);
  }

  var s_v3 = new THREE.Vector3();

  function screenToWorld(camera, x, y, outPt, outDir) {
    outPt.set(x / _width * 2 - 1, -(y / _height) * 2 + 1, 0);
    outPt.unproject(camera);

    if (camera["isPerspectiveCamera"]) {
      s_v3.setFromMatrixPosition(camera.matrixWorld);
      outDir.copy(outPt).sub(s_v3).normalize();
      outDir.multiplyScalar(-1);
    } else outDir.set(0, 0, 1);
  }

  fgui.screenToWorld = screenToWorld;

  function worldToScreen(camera, input, output) {
    s_v3.copy(input);
    s_v3.project(camera);
    output.set((s_v3.x + 1) / 2 * _width, (1 - s_v3.y) / 2 * _height);
  }

  fgui.worldToScreen = worldToScreen;

  function setLastInput(touch) {
    fgui.lastInput.touchId = touch.touchId;
    fgui.lastInput.x = touch.x;
    fgui.lastInput.y = touch.y;
    fgui.lastInput.clickCount = touch.clickCount;
    fgui.lastInput.mouseWheelDelta = touch.mouseWheelDelta;
    fgui.lastInput.button = touch.button;
    fgui.lastInput.holdTime = touch.holdTime;
    fgui.lastInput.ctrlKey = touch.ctrlKey;
    fgui.lastInput.shiftKey = touch.shiftKey;
    fgui.lastInput.commandKey = touch.commandKey;
  }

  var TouchInfo = /*#__PURE__*/function () {
    function TouchInfo() {
      _classCallCheck(this, TouchInfo);

      this.downTargets = new Array();
      this.touchMonitors = new Array();
      this.reset();
    }

    _createClass(TouchInfo, [{
      key: "reset",
      value: function reset() {
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
    }, {
      key: "begin",
      value: function begin() {
        var _this8 = this;

        this.began = true;
        this.clickCancelled = false;
        this.downX = this.x;
        this.downY = this.y;
        this.downTime = performance.now();
        this.downFrame = fgui.Timers.frameCount;
        this.holdTime = 0;
        this.downTargets.length = 0;

        if (this.target) {
          this.downTargets.push(this.target);
          this.target.obj3D.traverseAncestors(function (obj) {
            var dobj = obj["$owner"];
            if (dobj) _this8.downTargets.push(dobj);
          });
        }
      }
    }, {
      key: "move",
      value: function move() {
        if (this.began) this.holdTime = fgui.Timers.frameCount - this.downFrame == 1 ? 1 / 60 : performance.now() - this.downTime;
        setLastInput(this);
        if (Math.abs(this.x - this.downX) > 50 || Math.abs(this.y - this.downY) > 50) this.clickCancelled = true;

        if (this.touchMonitors.length > 0) {
          var len = this.touchMonitors.length;

          for (var i = 0; i < len; i++) {
            var e = this.touchMonitors[i];
            if (e instanceof fgui.DisplayObject && !e.stage) this.touchMonitors[i] = null;
          }

          bubbleEvent(null, fgui.InteractiveEvents.Move, null, this.touchMonitors);
        }
      }
    }, {
      key: "end",
      value: function end() {
        this.began = false;
        var now = performance.now();

        if (this.downTargets.length == 0 || this.clickCancelled || Math.abs(this.x - this.downX) > clickTestThreshold || Math.abs(this.y - this.downY) > clickTestThreshold) {
          this.clickCancelled = true;
          this.lastClickTime = 0;
          this.clickCount = 1;
        } else {
          if (now - this.lastClickTime < 0.35 && Math.abs(this.x - this.lastClickX) < clickTestThreshold && Math.abs(this.y - this.lastClickY) < clickTestThreshold && this.lastClickButton == this.button) {
            if (this.clickCount == 2) this.clickCount = 1;else this.clickCount++;
          } else this.clickCount = 1;

          this.lastClickTime = now;
          this.lastClickX = this.x;
          this.lastClickY = this.y;
          this.lastClickButton = this.button;
        }

        this.holdTime = fgui.Timers.frameCount - this.downFrame == 1 ? 1 / 60 : now - this.downTime;
        setLastInput(this);
        var bubbleFrom = this.target ? this.target.obj3D : Stage.scene;

        if (this.touchMonitors.length > 0) {
          var len = this.touchMonitors.length;

          for (var i = 0; i < len; i++) {
            var e = this.touchMonitors[i];
            if (e instanceof fgui.DisplayObject && !e.stage) this.touchMonitors[i] = null;
          }

          bubbleEvent(bubbleFrom, fgui.InteractiveEvents.Up, null, this.touchMonitors);
          this.touchMonitors.length = 0;
        } else bubbleEvent(bubbleFrom, fgui.InteractiveEvents.Up);
      }
    }, {
      key: "clickTest",
      value: function clickTest() {
        if (this.clickCancelled) {
          this.downTargets.length = 0;
          return null;
        }

        var obj = this.downTargets[0];

        if (obj.stage) {
          this.downTargets.length = 0;
          return obj;
        }

        obj = this.target;

        while (obj) {
          var i = this.downTargets.indexOf(obj);
          if (i != -1 && obj.stage) break;
          obj = obj.parent ? obj.parent["$owner"] : null;
        }

        this.downTargets.length = 0;
        return obj;
      }
    }]);

    return TouchInfo;
  }();

  function broadcastEvent(p, type, data) {
    p = p || Stage.scene;
    var ev = fgui.EventPool.borrow();
    ev._type = type;
    ev.data = data;
    var arr = ev._callChain;
    p.traverseVisible(function (obj) {
      var dobj = obj["$owner"];
      if (dobj) arr.push(dobj);
    });
    arr.forEach(function (obj) {
      var col = obj._listeners[type];

      if (col) {
        if (col.captures.length > 0) obj._dispatch(col, ev, true);
        if (col.callbacks.length > 0) obj._dispatch(col, ev, false);
      }
    });
    arr.length = 0;
    fgui.EventPool.returns(ev);
  }

  fgui.broadcastEvent = broadcastEvent;

  function bubbleEvent(p, type, data, addChain) {
    p = p || Stage.scene;
    var ev = fgui.EventPool.borrow();
    ev._type = type;
    ev.data = data;
    ev._initiator = p["$owner"];
    var arr = ev._callChain;
    if (ev.initiator) arr.push(ev.initiator);
    p.traverseAncestors(function (obj) {
      var dobj = obj["$owner"];
      if (dobj) arr.push(dobj);
    });

    for (var i = arr.length - 1; i >= 0; i--) {
      var obj = arr[i];
      var col = obj._listeners[type];

      if (col && col.captures.length > 0) {
        obj._dispatch(col, ev, true);

        if (ev._touchCapture) {
          ev._touchCapture = false;
          if (type == fgui.InteractiveEvents.Down) Stage.addTouchMonitor(ev.input.touchId, obj);
        }
      }
    }

    if (!ev._stopsPropagation) {
      for (var _i4 = 0; _i4 < arr.length; _i4++) {
        var _obj = arr[_i4];
        var _col = _obj._listeners[type];

        if (_col && _col.callbacks.length > 0) {
          _obj._dispatch(_col, ev, false);

          if (ev._touchCapture) {
            ev._touchCapture = false;
            if (type == fgui.InteractiveEvents.Down) Stage.addTouchMonitor(ev.input.touchId, _obj);
          }

          if (ev._stopsPropagation) break;
        }
      }

      if (addChain) {
        for (var _i5 = 0; _i5 < addChain.length; _i5++) {
          var _obj2 = addChain[_i5];

          if (_obj2 && arr.indexOf(_obj2) == -1) {
            var _col2 = _obj2._listeners[type];

            if (_col2) {
              if (_col2.captures.length > 0) _obj2._dispatch(_col2, ev, true);
              if (_col2.callbacks.length > 0) _obj2._dispatch(_col2, ev, false);
            }
          }
        }
      }
    }

    arr.length = 0;
    fgui.EventPool.returns(ev);
  }

  fgui.bubbleEvent = bubbleEvent;
})(fgui || (fgui = {}));

(function (fgui) {
  var PixelHitTestData = /*#__PURE__*/function () {
    function PixelHitTestData() {
      _classCallCheck(this, PixelHitTestData);
    }

    _createClass(PixelHitTestData, [{
      key: "load",
      value: function load(ba) {
        ba.readInt();
        this.pixelWidth = ba.readInt();
        this.scale = 1.0 / ba.readByte();
        var len = ba.readInt();
        this.pixels = new Uint8Array(ba.data, ba.pos, len);
        ba.skip(len);
      }
    }]);

    return PixelHitTestData;
  }();

  fgui.PixelHitTestData = PixelHitTestData;

  var PixelHitTest = /*#__PURE__*/function () {
    function PixelHitTest(data, offsetX, offsetY, sourceWidth, sourceHeight) {
      _classCallCheck(this, PixelHitTest);

      this._data = data;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.sourceWidth = sourceWidth;
      this.sourceHeight = sourceHeight;
    }

    _createClass(PixelHitTest, [{
      key: "hitTest",
      value: function hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y)) return false;
        var data = this._data;
        x = Math.floor((x * this.sourceWidth / contentRect.width - this.offsetX) * data.scale);
        y = Math.floor((y * this.sourceHeight / contentRect.height - this.offsetY) * data.scale);
        if (x < 0 || y < 0 || x >= data.pixelWidth) return false;
        var pos = y * data.pixelWidth + x;
        var pos2 = Math.floor(pos / 8);
        var pos3 = pos % 8;
        if (pos2 >= 0 && pos2 < data.pixels.length) return (data.pixels[pos2] >> pos3 & 0x1) > 0;else return false;
      }
    }]);

    return PixelHitTest;
  }();

  fgui.PixelHitTest = PixelHitTest;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_vec2 = new THREE.Vector2();

  var ShapeHitTest = /*#__PURE__*/function () {
    function ShapeHitTest(obj) {
      _classCallCheck(this, ShapeHitTest);

      this.shape = obj;
    }

    _createClass(ShapeHitTest, [{
      key: "hitTest",
      value: function hitTest(contentRect, x, y) {
        if (!this.shape.graphics) return false;

        if (this.shape.parent) {
          var p = this.shape.parent["$owner"];

          if (p) {
            p.transformPoint(x, y, this.shape.obj3D, s_vec2);
            x = s_vec2.x;
            y = s_vec2.y;
          }
        }

        var ht = this.shape.graphics.meshFactory;
        if (!('hitTest' in ht)) return false;
        return ht.hitTest(contentRect, x, y);
      }
    }]);

    return ShapeHitTest;
  }();

  fgui.ShapeHitTest = ShapeHitTest;
})(fgui || (fgui = {}));

(function (fgui) {
  var CompositeMesh = /*#__PURE__*/function () {
    function CompositeMesh() {
      _classCallCheck(this, CompositeMesh);

      this.elements = [];
      this.activeIndex = -1;
    }

    _createClass(CompositeMesh, [{
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        var cnt = this.elements.length;
        if (cnt == 1) this.elements[0].onPopulateMesh(vb);else {
          var vb2 = fgui.VertexBuffer.begin(vb);

          for (var i = 0; i < cnt; i++) {
            if (this.activeIndex == -1 || i == this.activeIndex) {
              vb2.clear();
              this.elements[i].onPopulateMesh(vb2);
              vb.append(vb2);
            }
          }

          vb2.end();
        }
      }
    }, {
      key: "hitTest",
      value: function hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y)) return false;
        var flag = false;
        var cnt = this.elements.length;

        for (var i = 0; i < cnt; i++) {
          if (this.activeIndex == -1 || i == this.activeIndex) {
            var ht = this.elements[i];

            if ('hitTest' in ht) {
              if (ht.hitTest(contentRect, x, y)) return true;
            } else flag = true;
          }
        }

        return flag;
      }
    }]);

    return CompositeMesh;
  }();

  fgui.CompositeMesh = CompositeMesh;
})(fgui || (fgui = {}));

(function (fgui) {
  var SECTOR_CENTER_TRIANGLES = [0, 4, 1, 0, 3, 4, 0, 2, 3, 0, 8, 5, 0, 7, 8, 0, 6, 7, 6, 5, 2, 2, 1, 6];
  var s_v3 = new THREE.Vector3();

  var EllipseMesh = /*#__PURE__*/function () {
    function EllipseMesh() {
      _classCallCheck(this, EllipseMesh);

      this.lineColor = new fgui.Color4();
      this.lineWidth = 1;
      this.startDegree = 0;
      this.endDegreee = 360;
    }

    _createClass(EllipseMesh, [{
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        var rect = this.drawRect ? this.drawRect : vb.contentRect;
        var color = this.fillColor ? this.fillColor : vb.vertexColor;
        var lineColor = this.lineColor;
        var sectionStart = fgui.clamp(this.startDegree, 0, 360);
        var sectionEnd = fgui.clamp(this.endDegreee, 0, 360);
        var clipped = sectionStart > 0 || sectionEnd < 360;
        sectionStart = sectionStart * Math.PI / 180;
        sectionEnd = sectionEnd * Math.PI / 180;
        var enterColor = this.centerColor ? this.centerColor : color;
        var radiusX = rect.width / 2;
        var radiusY = rect.height / 2;
        var sides = Math.ceil(Math.PI * (radiusX + radiusY) / 4);
        sides = fgui.clamp(sides, 40, 800);
        var angleDelta = 2 * Math.PI / sides;
        var angle = 0;
        var lineAngle = 0;

        if (this.lineWidth > 0 && clipped) {
          lineAngle = this.lineWidth / Math.max(radiusX, radiusY);
          sectionStart += lineAngle;
          sectionEnd -= lineAngle;
        }

        var vpos = vb.currentVertCount;
        var centerX = rect.x + radiusX;
        var centerY = rect.y + radiusY;
        vb.addVert(centerX, centerY, 0, enterColor);

        for (var i = 0; i < sides; i++) {
          if (angle < sectionStart) angle = sectionStart;else if (angle > sectionEnd) angle = sectionEnd;
          var vx = Math.cos(angle) * (radiusX - this.lineWidth) + centerX;
          var vy = Math.sin(angle) * (radiusY - this.lineWidth) + centerY;
          vb.addVert(vx, vy, 0, color);

          if (this.lineWidth > 0) {
            vb.addVert(vx, vy, 0, lineColor);
            vb.addVert(Math.cos(angle) * radiusX + centerX, Math.sin(angle) * radiusY + centerY, 0, lineColor);
          }

          angle += angleDelta;
        }

        if (this.lineWidth > 0) {
          var cnt = sides * 3;

          for (var _i6 = 0; _i6 < cnt; _i6 += 3) {
            if (_i6 != cnt - 3) {
              vb.addTriangle(0, _i6 + 4, _i6 + 1);
              vb.addTriangle(_i6 + 5, _i6 + 3, _i6 + 2);
              vb.addTriangle(_i6 + 3, _i6 + 5, _i6 + 6);
            } else if (!clipped) {
              vb.addTriangle(0, 1, _i6 + 1);
              vb.addTriangle(2, _i6 + 3, _i6 + 2);
              vb.addTriangle(_i6 + 3, 2, 3);
            } else {
              vb.addTriangle(0, _i6 + 1, _i6 + 1);
              vb.addTriangle(_i6 + 2, _i6 + 3, _i6 + 2);
              vb.addTriangle(_i6 + 3, _i6 + 2, _i6 + 3);
            }
          }
        } else {
          for (var _i7 = 0; _i7 < sides; _i7++) {
            if (_i7 != sides - 1) vb.addTriangle(0, _i7 + 2, _i7 + 1);else if (!clipped) vb.addTriangle(0, 1, _i7 + 1);else vb.addTriangle(0, _i7 + 1, _i7 + 1);
          }
        }

        if (this.lineWidth > 0 && clipped) {
          vb.addVert(radiusX, radiusY, 0, lineColor);
          var centerRadius = this.lineWidth * 0.5;
          sectionStart -= lineAngle;
          angle = sectionStart + lineAngle * 0.5 + Math.PI * 0.5;
          vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
          angle -= Math.PI;
          vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
          vb.addVert(Math.cos(sectionStart) * radiusX + radiusX, Math.sin(sectionStart) * radiusY + radiusY, 0, lineColor);
          vb.getPosition(vpos + 3, s_v3);
          vb.addVert(s_v3.x, s_v3.y, s_v3.z, lineColor);
          sectionEnd += lineAngle;
          angle = sectionEnd - lineAngle * 0.5 + Math.PI * 0.5;
          vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
          angle -= Math.PI;
          vb.addVert(Math.cos(angle) * centerRadius + radiusX, Math.sin(angle) * centerRadius + radiusY, 0, lineColor);
          vb.getPosition(vpos + sides * 3, s_v3);
          vb.addVert(s_v3.x, s_v3.y, s_v3.z, lineColor);
          vb.addVert(Math.cos(sectionEnd) * radiusX + radiusX, Math.sin(sectionEnd) * radiusY + radiusY, 0, lineColor);
          vb.addTriangles(sides * 3 + 1, SECTOR_CENTER_TRIANGLES);
        }
      }
    }, {
      key: "hitTest",
      value: function hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y)) return false;
        var radiusX = contentRect.width * 0.5;
        var raduisY = contentRect.height * 0.5;
        x = x - radiusX - contentRect.x;
        y = y - raduisY - contentRect.y;

        if (Math.pow(x / radiusX, 2) + Math.pow(y / raduisY, 2) < 1) {
          if (this.startDegree != 0 || this.endDegreee != 360) {
            var deg = Math.atan2(y, x) * 180 / Math.PI;
            if (deg < 0) deg += 360;
            return deg >= this.startDegree && deg <= this.endDegreee;
          } else return true;
        }

        return false;
      }
    }]);

    return EllipseMesh;
  }();

  fgui.EllipseMesh = EllipseMesh;
})(fgui || (fgui = {}));

(function (fgui) {
  var FillMesh = /*#__PURE__*/function () {
    function FillMesh() {
      _classCallCheck(this, FillMesh);

      this.origin = 0;
      this.amount = 1;
      this.clockwise = true;
    }

    _createClass(FillMesh, [{
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        var amount = fgui.clamp01(this.amount);

        switch (this.method) {
          case fgui.FillMethod.Horizontal:
            fillHorizontal(vb, vb.contentRect, this.origin, amount);
            break;

          case fgui.FillMethod.Vertical:
            fillVertical(vb, vb.contentRect, this.origin, amount);
            break;

          case fgui.FillMethod.Radial90:
            fillRadial90(vb, vb.contentRect, this.origin, amount, this.clockwise);
            break;

          case fgui.FillMethod.Radial180:
            fillRadial180(vb, vb.contentRect, this.origin, amount, this.clockwise);
            break;

          case fgui.FillMethod.Radial360:
            fillRadial360(vb, vb.contentRect, this.origin, amount, this.clockwise);
            break;
        }
      }
    }]);

    return FillMesh;
  }();

  fgui.FillMesh = FillMesh;
  var s_vec3 = new THREE.Vector3();
  var s_rect = new fgui.Rect();

  function fillHorizontal(vb, vertRect, origin, amount) {
    s_rect.copy(vertRect);
    vertRect = s_rect;
    var a = vertRect.width * amount;
    if (origin == fgui.FillOrigin.Right || origin == fgui.FillOrigin.Bottom) vertRect.x += vertRect.width - a;
    vertRect.width = a;
    vb.addQuad(vertRect);
    vb.addTriangles();
  }

  function fillVertical(vb, vertRect, origin, amount) {
    s_rect.copy(vertRect);
    vertRect = s_rect;
    var a = vertRect.height * amount;
    if (origin == fgui.FillOrigin.Right || origin == fgui.FillOrigin.Bottom) vertRect.y += vertRect.height - a;
    vertRect.height = a;
    vb.addQuad(vertRect);
    vb.addTriangles();
  }

  function fillRadial90(vb, vertRect, origin, amount, clockwise) {
    var flipX = origin == fgui.FillOrigin.TopRight || origin == fgui.FillOrigin.BottomRight;
    var flipY = origin == fgui.FillOrigin.BottomLeft || origin == fgui.FillOrigin.BottomRight;
    if (flipX != flipY) clockwise = !clockwise;
    var ratio = clockwise ? amount : 1 - amount;
    var tan = Math.tan(Math.PI * 0.5 * ratio);
    var thresold = false;
    if (ratio != 1) thresold = vertRect.height / vertRect.width - tan > 0;
    if (!clockwise) thresold = !thresold;
    var x = vertRect.x + (ratio == 0 ? Number.POSITIVE_INFINITY : vertRect.height / tan);
    var y = vertRect.y + (ratio == 1 ? Number.POSITIVE_INFINITY : vertRect.width * tan);
    var x2 = x;
    var y2 = y;
    if (flipX) x2 = vertRect.width - x;
    if (flipY) y2 = vertRect.height - y;
    var xMin = flipX ? vertRect.width - vertRect.x : vertRect.xMin;
    var yMin = flipY ? vertRect.height - vertRect.y : vertRect.yMin;
    var xMax = flipX ? -vertRect.x : vertRect.xMax;
    var yMax = flipY ? -vertRect.y : vertRect.yMax;
    vb.addVert(xMin, yMin, 0);
    if (clockwise) vb.addVert(xMax, yMin, 0);

    if (y > vertRect.yMax) {
      if (thresold) vb.addVert(x2, yMax, 0);else vb.addVert(xMax, yMax, 0);
    } else vb.addVert(xMax, y2, 0);

    if (x > vertRect.xMax) {
      if (thresold) vb.addVert(xMax, y2, 0);else vb.addVert(xMax, yMax, 0);
    } else vb.addVert(x2, yMax, 0);

    if (!clockwise) vb.addVert(xMin, yMax, 0);

    if (flipX == flipY) {
      vb.addTriangle(0, 2, 1);
      vb.addTriangle(0, 3, 2);
    } else {
      vb.addTriangle(2, 0, 1);
      vb.addTriangle(3, 0, 2);
    }
  }

  var s_rect_180 = new fgui.Rect();

  function fillRadial180(vb, vertRect, origin, amount, clockwise) {
    s_rect_180.copy(vertRect);
    vertRect = s_rect_180;

    switch (origin) {
      case fgui.FillOrigin.Top:
        if (amount <= 0.5) {
          vertRect.width /= 2;
          if (clockwise) vertRect.x += vertRect.width;
          fillRadial90(vb, vertRect, clockwise ? fgui.FillOrigin.TopLeft : fgui.FillOrigin.TopRight, amount / 0.5, clockwise);
          var vec = vb.getPosition(-4, s_vec3);
          s_rect.set(vec.x, vec.y, 0, 0);
          vb.addQuad(s_rect);
          vb.addTriangles(-4);
        } else {
          vertRect.width /= 2;
          if (!clockwise) vertRect.x += vertRect.width;
          fillRadial90(vb, vertRect, clockwise ? fgui.FillOrigin.TopRight : fgui.FillOrigin.TopLeft, (amount - 0.5) / 0.5, clockwise);
          if (clockwise) vertRect.x += vertRect.width;else vertRect.x -= vertRect.width;
          vb.addQuad(vertRect);
          vb.addTriangles(-4);
        }

        break;

      case fgui.FillOrigin.Bottom:
        if (amount <= 0.5) {
          vertRect.width /= 2;
          if (!clockwise) vertRect.x += vertRect.width;
          fillRadial90(vb, vertRect, clockwise ? fgui.FillOrigin.BottomRight : fgui.FillOrigin.BottomLeft, amount / 0.5, clockwise);

          var _vec = vb.getPosition(-4, s_vec3);

          s_rect.set(_vec.x, _vec.y, 0, 0);
          vb.addQuad(s_rect);
          vb.addTriangles(-4);
        } else {
          vertRect.width /= 2;
          if (clockwise) vertRect.x += vertRect.width;
          fillRadial90(vb, vertRect, clockwise ? fgui.FillOrigin.BottomLeft : fgui.FillOrigin.BottomRight, (amount - 0.5) / 0.5, clockwise);
          if (clockwise) vertRect.x -= vertRect.width;else vertRect.x += vertRect.width;
          vb.addQuad(vertRect);
          vb.addTriangles(-4);
        }

        break;

      case fgui.FillOrigin.Left:
        if (amount <= 0.5) {
          vertRect.height /= 2;
          if (!clockwise) vertRect.y += vertRect.height;
          fillRadial90(vb, vertRect, clockwise ? fgui.FillOrigin.BottomLeft : fgui.FillOrigin.TopLeft, amount / 0.5, clockwise);

          var _vec2 = vb.getPosition(-4, s_vec3);

          s_rect.set(_vec2.x, _vec2.y, 0, 0);
          vb.addQuad(s_rect);
          vb.addTriangles(-4);
        } else {
          vertRect.height /= 2;
          if (clockwise) vertRect.y += vertRect.height;
          fillRadial90(vb, vertRect, clockwise ? fgui.FillOrigin.TopLeft : fgui.FillOrigin.BottomLeft, (amount - 0.5) / 0.5, clockwise);
          if (clockwise) vertRect.y -= vertRect.height;else vertRect.y += vertRect.height;
          vb.addQuad(vertRect);
          vb.addTriangles(-4);
        }

        break;

      case fgui.FillOrigin.Right:
        if (amount <= 0.5) {
          vertRect.height /= 2;
          if (clockwise) vertRect.y += vertRect.height;
          fillRadial90(vb, vertRect, clockwise ? fgui.FillOrigin.TopRight : fgui.FillOrigin.BottomRight, amount / 0.5, clockwise);

          var _vec3 = vb.getPosition(-4, s_vec3);

          s_rect.set(_vec3.x, _vec3.y, 0, 0);
          vb.addQuad(s_rect);
          vb.addTriangles(-4);
        } else {
          vertRect.height /= 2;
          if (!clockwise) vertRect.y += vertRect.height;
          fillRadial90(vb, vertRect, clockwise ? fgui.FillOrigin.BottomRight : fgui.FillOrigin.TopRight, (amount - 0.5) / 0.5, clockwise);
          if (clockwise) vertRect.y += vertRect.height;else vertRect.y -= vertRect.height;
          vb.addQuad(vertRect);
          vb.addTriangles(-4);
        }

        break;
    }
  }

  var s_rect_360 = new fgui.Rect();

  function fillRadial360(vb, vertRect, origin, amount, clockwise) {
    s_rect_360.copy(vertRect);
    vertRect = s_rect_360;

    switch (origin) {
      case fgui.FillOrigin.Top:
        if (amount < 0.5) {
          vertRect.width /= 2;
          if (clockwise) vertRect.x += vertRect.width;
          fillRadial180(vb, vertRect, clockwise ? fgui.FillOrigin.Left : fgui.FillOrigin.Right, amount / 0.5, clockwise);
          var vec = vb.getPosition(-8, s_vec3);
          s_rect.set(vec.x, vec.y, 0, 0);
          vb.addQuad(s_rect);
          vb.addTriangles(-4);
        } else {
          vertRect.width /= 2;
          if (!clockwise) vertRect.x += vertRect.width;
          fillRadial180(vb, vertRect, clockwise ? fgui.FillOrigin.Right : fgui.FillOrigin.Left, (amount - 0.5) / 0.5, clockwise);
          if (clockwise) vertRect.x += vertRect.width;else vertRect.x -= vertRect.width;
          vb.addQuad(vertRect);
          vb.addTriangles(-4);
        }

        break;

      case fgui.FillOrigin.Bottom:
        if (amount < 0.5) {
          vertRect.width /= 2;
          if (!clockwise) vertRect.x += vertRect.width;
          fillRadial180(vb, vertRect, clockwise ? fgui.FillOrigin.Right : fgui.FillOrigin.Left, amount / 0.5, clockwise);

          var _vec4 = vb.getPosition(-8, s_vec3);

          s_rect.set(_vec4.x, _vec4.y, 0, 0);
          vb.addQuad(s_rect);
          vb.addTriangles(-4);
        } else {
          vertRect.width /= 2;
          if (clockwise) vertRect.x += vertRect.width;
          fillRadial180(vb, vertRect, clockwise ? fgui.FillOrigin.Left : fgui.FillOrigin.Right, (amount - 0.5) / 0.5, clockwise);
          if (clockwise) vertRect.x -= vertRect.width;else vertRect.x += vertRect.width;
          vb.addQuad(vertRect);
          vb.addTriangles(-4);
        }

        break;

      case fgui.FillOrigin.Left:
        if (amount < 0.5) {
          vertRect.height /= 2;
          if (!clockwise) vertRect.y += vertRect.height;
          fillRadial180(vb, vertRect, clockwise ? fgui.FillOrigin.Bottom : fgui.FillOrigin.Top, amount / 0.5, clockwise);

          var _vec5 = vb.getPosition(-8, s_vec3);

          s_rect.set(_vec5.x, _vec5.y, 0, 0);
          vb.addQuad(s_rect);
          vb.addTriangles(-4);
        } else {
          vertRect.height /= 2;
          if (clockwise) vertRect.y += vertRect.height;
          fillRadial180(vb, vertRect, clockwise ? fgui.FillOrigin.Top : fgui.FillOrigin.Bottom, (amount - 0.5) / 0.5, clockwise);
          if (clockwise) vertRect.y -= vertRect.height;else vertRect.y += vertRect.height;
          vb.addQuad(vertRect);
          vb.addTriangles(-4);
        }

        break;

      case fgui.FillOrigin.Right:
        if (amount < 0.5) {
          vertRect.height /= 2;
          if (clockwise) vertRect.y += vertRect.height;
          fillRadial180(vb, vertRect, clockwise ? fgui.FillOrigin.Top : fgui.FillOrigin.Bottom, amount / 0.5, clockwise);

          var _vec6 = vb.getPosition(-8, s_vec3);

          s_rect.set(_vec6.x, _vec6.y, 0, 0);
          vb.addQuad(s_rect);
          vb.addTriangles(-4);
        } else {
          vertRect.height /= 2;
          if (!clockwise) vertRect.y += vertRect.height;
          fillRadial180(vb, vertRect, clockwise ? fgui.FillOrigin.Bottom : fgui.FillOrigin.Top, (amount - 0.5) / 0.5, clockwise);
          if (clockwise) vertRect.y += vertRect.height;else vertRect.y -= vertRect.height;
          vb.addQuad(vertRect);
          vb.addTriangles(-4);
        }

        break;
    }
  }
})(fgui || (fgui = {}));

(function (fgui) {
  var sRestIndices = [];
  var a = new THREE.Vector2();
  var b = new THREE.Vector2();
  var c = new THREE.Vector2();
  var p = new THREE.Vector2();
  var p0 = new THREE.Vector3();
  var p1 = new THREE.Vector3();
  var p3 = new THREE.Vector3();
  var lineVector = new THREE.Vector3();
  var widthVector = new THREE.Vector3();

  var PolygonMesh = /*#__PURE__*/function () {
    function PolygonMesh() {
      _classCallCheck(this, PolygonMesh);

      this.points = new Array();
      this.texcoords = new Array();
    }

    _createClass(PolygonMesh, [{
      key: "add",
      value: function add(x, y, uv_x, uv_y) {
        this.points.push(x, y);
        if (uv_x != null) this.texcoords.push(uv_x, uv_y);
      }
    }, {
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        var numVertices = this.points.length / 2;
        if (numVertices < 3) return;
        var restIndexPos, numRestIndices;
        var color = this.fillColor != null ? this.fillColor : vb.vertexColor;
        var w = vb.contentRect.width;
        var h = vb.contentRect.height;
        var useTexcoords = this.texcoords.length >= this.points.length;

        for (var i = 0; i < numVertices; i++) {
          var j = i * 2;
          var vx = this.points[j];
          var vy = this.points[j + 1];

          if (this.usePercentPositions) {
            vx *= w;
            vy *= h;
          }

          if (useTexcoords) {
            var ux = this.texcoords[j];
            var uy = this.texcoords[j + 1];
            ux = fgui.lerp(vb.uvRect.x, vb.uvRect.xMax, ux);
            uy = fgui.lerp(vb.uvRect.y, vb.uvRect.yMax, uy);
            vb.addVert(vx, vy, 0, ux, uy, color);
          } else vb.addVert(vx, vy, 0, color);
        }

        sRestIndices.length = 0;

        for (var _i8 = 0; _i8 < numVertices; ++_i8) {
          sRestIndices.push(_i8);
        }

        restIndexPos = 0;
        numRestIndices = numVertices;
        var otherIndex;
        var earFound;
        var i0, i1, i2;

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

            for (var _i9 = 3; _i9 < numRestIndices; ++_i9) {
              otherIndex = sRestIndices[(restIndexPos + _i9) % numRestIndices];
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
          } else {
            restIndexPos++;
            if (restIndexPos == numRestIndices) break;
          }
        }

        vb.addTriangle(sRestIndices[0], sRestIndices[2], sRestIndices[1]);
        if (this.lineWidth > 0) this.drawOutline(vb);
      }
    }, {
      key: "drawOutline",
      value: function drawOutline(vb) {
        var numVertices = this.points.length / 2;
        var start = vb.currentVertCount - numVertices;
        var k = vb.currentVertCount;

        for (var i = 0; i < numVertices; i++) {
          vb.getPosition(start + i, p0);
          if (i < numVertices - 1) vb.getPosition(start + i + 1, p1);else vb.getPosition(vb.vertices[start], p1);
          lineVector.copy(p1);
          lineVector.sub(p0);
          widthVector.copy(lineVector);
          widthVector.cross(new THREE.Vector3(0, 0, 1));
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
    }, {
      key: "isPointInTriangle",
      value: function isPointInTriangle(p, a, b, c) {
        var v0x = c.x - a.x;
        var v0y = c.y - a.y;
        var v1x = b.x - a.x;
        var v1y = b.y - a.y;
        var v2x = p.x - a.x;
        var v2y = p.y - a.y;
        var dot00 = v0x * v0x + v0y * v0y;
        var dot01 = v0x * v1x + v0y * v1y;
        var dot02 = v0x * v2x + v0y * v2y;
        var dot11 = v1x * v1x + v1y * v1y;
        var dot12 = v1x * v2x + v1y * v2y;
        var invDen = 1.0 / (dot00 * dot11 - dot01 * dot01);
        var u = (dot11 * dot02 - dot01 * dot12) * invDen;
        var v = (dot00 * dot12 - dot01 * dot02) * invDen;
        return u >= 0 && v >= 0 && u + v < 1;
      }
    }, {
      key: "hitTest",
      value: function hitTest(contentRect, x, y) {
        if (!contentRect.contains(x, y)) return false;
        var len = this.points.length / 2;
        var i;
        var j = len - 1;
        var oddNodes = false;
        var w = contentRect.width;
        var h = contentRect.height;

        for (i = 0; i < len; ++i) {
          var ix = this.points[i * 2];
          var iy = this.points[i * 2 + 1];
          var jx = this.points[j * 2];
          var jy = this.points[j * 2 + 1];

          if (this.usePercentPositions) {
            ix *= w;
            iy *= h;
            ix *= w;
            iy *= h;
          }

          if ((iy < y && jy >= y || jy < y && iy >= y) && (ix <= x || jx <= x)) {
            if (ix + (y - iy) / (jy - iy) * (jx - ix) < x) oddNodes = !oddNodes;
          }

          j = i;
        }

        return oddNodes;
      }
    }]);

    return PolygonMesh;
  }();

  fgui.PolygonMesh = PolygonMesh;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_rect = new fgui.Rect();

  var RectMesh = /*#__PURE__*/function () {
    function RectMesh() {
      _classCallCheck(this, RectMesh);

      this.lineWidth = 1;
    }

    _createClass(RectMesh, [{
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        var rect = this.drawRect ? this.drawRect : vb.contentRect;
        var color = this.fillColor ? this.fillColor : vb.vertexColor;
        var lineColor = this.lineColor ? this.lineColor : vb.vertexColor;

        if (this.lineWidth == 0) {
          if (color.a != 0) vb.addQuad(rect, null, color);
        } else {
          var part = s_rect;
          part.set(rect.x, rect.y, this.lineWidth, rect.height);
          vb.addQuad(part, null, lineColor);
          part.set(rect.xMax - this.lineWidth, rect.y, this.lineWidth, rect.height);
          vb.addQuad(part, null, lineColor);
          part.set(rect.x + this.lineWidth, rect.y, rect.width - this.lineWidth * 2, this.lineWidth);
          vb.addQuad(part, null, lineColor);
          part.set(rect.x + this.lineWidth, rect.yMax - this.lineWidth, rect.width - this.lineWidth * 2, this.lineWidth);
          vb.addQuad(part, null, lineColor);

          if (color.a != 0) {
            part.setMinMax(rect.x + this.lineWidth, rect.y + this.lineWidth, rect.xMax - this.lineWidth, rect.yMax - this.lineWidth);
            if (part.width > 0 && part.height > 0) vb.addQuad(part, null, color);
          }
        }

        vb.addTriangles();
      }
    }]);

    return RectMesh;
  }();

  fgui.RectMesh = RectMesh;
})(fgui || (fgui = {}));

(function (fgui) {
  var RegularPolygonMesh = /*#__PURE__*/function () {
    function RegularPolygonMesh() {
      _classCallCheck(this, RegularPolygonMesh);

      this.sides = 3;
      this.lineWidth = 1;
      this.lineColor = new fgui.Color4();
    }

    _createClass(RegularPolygonMesh, [{
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        if (this.distances != null && this.distances.length < this.sides) {
          console.error("distances.Length<sides");
          return;
        }

        var rect = this.drawRect != null ? this.drawRect : vb.contentRect;
        var color = this.fillColor != null ? this.fillColor : vb.vertexColor;
        var angleDelta = 2 * Math.PI / this.sides;
        var angle = this.rotation * Math.PI / 180;
        var radius = Math.min(rect.width / 2, rect.height / 2);
        var centerX = radius + rect.x;
        var centerY = radius + rect.y;
        vb.addVert(centerX, centerY, 0, this.centerColor ? this.centerColor : color);

        for (var i = 0; i < this.sides; i++) {
          var r = radius;
          if (this.distances != null) r *= this.distances[i];
          var xv = Math.cos(angle) * (r - this.lineWidth);
          var yv = Math.sin(angle) * (r - this.lineWidth);
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
          var tmp = this.sides * 3;

          for (var _i10 = 0; _i10 < tmp; _i10 += 3) {
            if (_i10 != tmp - 3) {
              vb.addTriangle(0, _i10 + 4, _i10 + 1);
              vb.addTriangle(_i10 + 5, _i10 + 3, _i10 + 2);
              vb.addTriangle(_i10 + 3, _i10 + 5, _i10 + 6);
            } else {
              vb.addTriangle(0, 1, _i10 + 1);
              vb.addTriangle(2, _i10 + 3, _i10 + 2);
              vb.addTriangle(_i10 + 3, 2, 3);
            }
          }
        } else {
          for (var _i11 = 0; _i11 < this.sides; _i11++) {
            vb.addTriangle(0, _i11 == this.sides - 1 ? 1 : _i11 + 2, _i11 + 1);
          }
        }
      }
    }, {
      key: "hitTest",
      value: function hitTest(contentRect, x, y) {
        if (this.drawRect) return this.drawRect.contains(x, y);else return contentRect.contains(x, y);
      }
    }]);

    return RegularPolygonMesh;
  }();

  fgui.RegularPolygonMesh = RegularPolygonMesh;
})(fgui || (fgui = {}));

(function (fgui) {
  var RoundedRectMesh = /*#__PURE__*/function () {
    function RoundedRectMesh() {
      _classCallCheck(this, RoundedRectMesh);

      this.topLeftRadius = 0;
      this.topRightRadius = 0;
      this.bottomLeftRadius = 0;
      this.bottomRightRadius = 0;
      this.lineWidth = 1;
      this.lineColor = new fgui.Color4();
    }

    _createClass(RoundedRectMesh, [{
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        var rect = this.drawRect ? this.drawRect : vb.contentRect;
        var color = this.fillColor ? this.fillColor : vb.vertexColor;
        var lineColor = this.lineColor;
        var radiusX = rect.width / 2;
        var radiusY = rect.height / 2;
        var cornerMaxRadius = Math.min(radiusX, radiusY);
        var centerX = radiusX + rect.x;
        var centerY = radiusY + rect.y;
        vb.addVert(centerX, centerY, 0, color);
        var cnt = vb.currentVertCount;

        for (var i = 0; i < 4; i++) {
          var radius = 0;

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
          var offsetX = rect.x;
          var offsetY = rect.y;
          if (i == 0 || i == 3) offsetX = rect.xMax - radius * 2;
          if (i == 0 || i == 1) offsetY = rect.yMax - radius * 2;

          if (radius != 0) {
            var partNumSides = Math.max(1, Math.ceil(Math.PI * radius / 8)) + 1;
            var angleDelta = Math.PI / 2 / partNumSides;
            var angle = Math.PI / 2 * i;
            var startAngle = angle;

            for (var j = 1; j <= partNumSides; j++) {
              if (j == partNumSides) angle = startAngle + Math.PI / 2;
              var vx = offsetX + Math.cos(angle) * (radius - this.lineWidth) + radius;
              var vy = offsetY + Math.sin(angle) * (radius - this.lineWidth) + radius;
              vb.addVert(vx, vy, 0, color);

              if (this.lineWidth != 0) {
                vb.addVert(vx, vy, 0, lineColor);
                vb.addVert(offsetX + Math.cos(angle) * radius + radius, offsetY + Math.sin(angle) * radius + radius, 0, lineColor);
              }

              angle += angleDelta;
            }
          } else {
            var _vx = offsetX;
            var _vy = offsetY;

            if (this.lineWidth != 0) {
              if (i == 0 || i == 3) offsetX -= this.lineWidth;else offsetX += this.lineWidth;
              if (i == 0 || i == 1) offsetY -= this.lineWidth;else offsetY += this.lineWidth;
              vb.addVert(offsetX, offsetY, 0, color);
              vb.addVert(offsetX, offsetY, 0, lineColor);
              vb.addVert(_vx, _vy, 0, lineColor);
            } else vb.addVert(_vx, _vy, 0, color);
          }
        }

        cnt = vb.currentVertCount - cnt;

        if (this.lineWidth > 0) {
          for (var _i12 = 0; _i12 < cnt; _i12 += 3) {
            if (_i12 != cnt - 3) {
              vb.addTriangle(0, _i12 + 4, _i12 + 1);
              vb.addTriangle(_i12 + 5, _i12 + 3, _i12 + 2);
              vb.addTriangle(_i12 + 3, _i12 + 5, _i12 + 6);
            } else {
              vb.addTriangle(0, 1, _i12 + 1);
              vb.addTriangle(2, _i12 + 3, _i12 + 2);
              vb.addTriangle(_i12 + 3, 2, 3);
            }
          }
        } else {
          for (var _i13 = 0; _i13 < cnt; _i13++) {
            vb.addTriangle(0, _i13 == cnt - 1 ? 1 : _i13 + 2, _i13 + 1);
          }
        }
      }
    }, {
      key: "hitTest",
      value: function hitTest(contentRect, x, y) {
        if (this.drawRect) return this.drawRect.contains(x, y);else return contentRect.contains(x, y);
      }
    }]);

    return RoundedRectMesh;
  }();

  fgui.RoundedRectMesh = RoundedRectMesh;
})(fgui || (fgui = {}));

(function (fgui) {
  var Pool = /*#__PURE__*/function () {
    function Pool(type, init, reset) {
      _classCallCheck(this, Pool);

      this.pool = [];
      this._init = init;
      this._reset = reset;
      this._ct = type;
    }

    _createClass(Pool, [{
      key: "borrow",
      value: function borrow() {
        var ret;
        if (this.pool.length > 0) ret = this.pool.pop();else ret = new this._ct();

        for (var _len = arguments.length, argArray = new Array(_len), _key = 0; _key < _len; _key++) {
          argArray[_key] = arguments[_key];
        }

        if (this._init) this._init.apply(this, [ret].concat(argArray));
        return ret;
      }
    }, {
      key: "returns",
      value: function returns(element) {
        if (Array.isArray(element)) {
          var count = element.length;

          for (var i = 0; i < count; i++) {
            var element2 = element[i];
            if (this._reset) this._reset(element2);
            this.pool.push(element2);
          }

          element.length = 0;
        } else {
          if (this._reset) this._reset(element);
          this.pool.push(element);
        }
      }
    }]);

    return Pool;
  }();

  fgui.Pool = Pool;
})(fgui || (fgui = {}));

(function (fgui) {
  var VertexBuffer = /*#__PURE__*/function () {
    function VertexBuffer() {
      _classCallCheck(this, VertexBuffer);

      this.vertices = new Array();
      this.uvs = new Array();
      this.colors = new Array();
      this.triangles = new Array();
      this.contentRect = new fgui.Rect();
      this.uvRect = new fgui.Rect();
      this.textureSize = new THREE.Vector2();
      this.vertexColor = new fgui.Color4();
    }

    _createClass(VertexBuffer, [{
      key: "end",
      value: function end() {
        this.clear();
        pool.returns(this);
      }
    }, {
      key: "clear",
      value: function clear() {
        this.vertices.length = 0;
        this.colors.length = 0;
        this.uvs.length = 0;
        this.triangles.length = 0;
      }
    }, {
      key: "addVert",
      value: function addVert(x, y, z, uv_x, uv_y, color) {
        y = -y;
        this.vertices.push(x, y, z ? z : 0);
        if (typeof uv_x === 'number') this.uvs.push(uv_x, uv_y);else {
          this.uvs.push(fgui.lerp(this.uvRect.x, this.uvRect.xMax, (x - this.contentRect.x) / this.contentRect.width), fgui.lerp(this.uvRect.yMax, this.uvRect.y, (-y - this.contentRect.y) / this.contentRect.height));
          if (uv_x instanceof fgui.Color4) color = uv_x;
        }
        if (color == null) color = this.vertexColor;
        this.colors.push(color.r, color.g, color.b, color.a);
      }
    }, {
      key: "addQuad",
      value: function addQuad(vertRect, uvRect, color) {
        uvBuf.length = 0;

        if (uvRect) {
          if (Array.isArray(uvRect)) {
            for (var i = 0; i < 4; i++) {
              uvBuf.push(uvRect[i].x, uvRect[i].y);
            }
          } else uvBuf.push(uvRect.x, uvRect.y, uvRect.x, uvRect.yMax, uvRect.xMax, uvRect.yMax, uvRect.xMax, uvRect.y);
        }

        this.addVert(vertRect.x, vertRect.yMax, 0, uvBuf[0], uvBuf[1], color);
        this.addVert(vertRect.x, vertRect.y, 0, uvBuf[2], uvBuf[3], color);
        this.addVert(vertRect.xMax, vertRect.y, 0, uvBuf[4], uvBuf[5], color);
        this.addVert(vertRect.xMax, vertRect.yMax, 0, uvBuf[6], uvBuf[7], color);
      }
    }, {
      key: "repeatColors",
      value: function repeatColors(value, startIndex, count) {
        var len = Math.min(startIndex + count, this.vertices.length / 3);
        var colorCount = value.length;
        var k = 0;

        for (var i = startIndex; i < len; i++) {
          var c = value[k++ % colorCount];
          this.colors[i] = c;
        }
      }
    }, {
      key: "addTriangle",
      value: function addTriangle(idx0, idx1, idx2) {
        this.triangles.push(idx0);
        this.triangles.push(idx1);
        this.triangles.push(idx2);
      }
    }, {
      key: "addTriangles",
      value: function addTriangles(startVertexIndex, idxList) {
        if (idxList != null) {
          if (startVertexIndex != 0) {
            if (startVertexIndex < 0) startVertexIndex = this.vertices.length / 3 + startVertexIndex;
            var cnt = idxList.length;

            for (var i = 0; i < cnt; i++) {
              this.triangles.push(idxList[i] + startVertexIndex);
            }
          } else this.triangles.push.apply(this.triangles, idxList);
        } else {
          var _cnt2 = this.vertices.length / 3;

          if (startVertexIndex == null) startVertexIndex = 0;else if (startVertexIndex < 0) startVertexIndex = _cnt2 + startVertexIndex;
          var _idxList = this.triangles;

          for (var _i14 = startVertexIndex; _i14 < _cnt2; _i14 += 4) {
            _idxList.push(_i14);

            _idxList.push(_i14 + 2);

            _idxList.push(_i14 + 1);

            _idxList.push(_i14 + 3);

            _idxList.push(_i14 + 2);

            _idxList.push(_i14);
          }
        }
      }
    }, {
      key: "getPosition",
      value: function getPosition(index, ret) {
        if (index < 0) index = this.vertices.length / 3 + index;
        var vec = ret ? ret : new THREE.Vector3();
        vec.x = this.vertices[index * 3];
        vec.y = -this.vertices[index * 3 + 1];
        vec.z = this.vertices[index * 3 + 2];
        return vec;
      }
    }, {
      key: "append",
      value: function append(vb) {
        this.vertices.push.apply(this.vertices, vb.vertices);
        this.uvs.push.apply(this.uvs, vb.uvs);
        this.colors.push.apply(this.colors, vb.colors);
        this.triangles.push.apply(this.triangles, vb.triangles);
      }
    }, {
      key: "currentVertCount",
      get: function get() {
        return this.vertices.length / 3;
      }
    }], [{
      key: "begin",
      value: function begin(source) {
        var inst = pool.borrow();

        if (source) {
          inst.contentRect = source.contentRect;
          inst.uvRect = source.uvRect;
          inst.vertexColor = source.vertexColor;
          inst.textureSize = source.textureSize;
        }

        return inst;
      }
    }]);

    return VertexBuffer;
  }();

  fgui.VertexBuffer = VertexBuffer;
  var pool = new fgui.Pool(VertexBuffer);
  var uvBuf = new Array(8);
})(fgui || (fgui = {}));

(function (fgui) {
  var s_rect = new fgui.Rect();
  var c_white = new fgui.Color4(0xFFFFFF, 1);

  var BitmapFont = /*#__PURE__*/function () {
    function BitmapFont() {
      _classCallCheck(this, BitmapFont);

      this.version = 0;
      this.size = 0;
      this.glyphs = {};
      this._color = new fgui.Color4();
    }

    _createClass(BitmapFont, [{
      key: "setFormat",
      value: function setFormat(format, fontSizeScale) {
        if (this.resizable) this._scale = format.size / this.size * fontSizeScale;else this._scale = fontSizeScale;

        this._color.setHex(format.color);
      }
    }, {
      key: "prepareCharacters",
      value: function prepareCharacters(text) {}
    }, {
      key: "getGlyph",
      value: function getGlyph(ch, ret) {
        if (ch == ' ') {
          ret.width = Math.round(this.size * this._scale / 2);
          ret.height = Math.round(this.size * this._scale);
          ret.baseline = ret.height;
          this._glyph = null;
          return true;
        } else if (this._glyph = this.glyphs[ch]) {
          ret.width = Math.round(this._glyph.advance * this._scale);
          ret.height = Math.round(this._glyph.lineHeight * this._scale);
          ret.baseline = ret.height;
          return true;
        } else {
          ret.width = 0;
          ret.height = 0;
          ret.baseline = 0;
          return false;
        }
      }
    }, {
      key: "drawGlyph",
      value: function drawGlyph(x, y, vb) {
        if (!this._glyph) return 0;
        var tx = x + this._glyph.x * this._scale;
        var ty = -y - this._glyph.y * this._scale;
        var bx = x + (this._glyph.x + this._glyph.width) * this._scale;
        var by = -y - (this._glyph.y + this._glyph.height) * this._scale;
        s_rect.setMinMax(tx, by, bx, ty);
        vb.addQuad(s_rect, this._glyph.uv, this.tint ? this._color : c_white);
        vb.addTriangles(-4);
        return 4;
      }
    }, {
      key: "drawLine",
      value: function drawLine(x, y, width, fontSize, type, vb) {
        return 0;
      }
    }, {
      key: "getLineHeight",
      value: function getLineHeight(size) {
        for (var key in this.glyphs) {
          var glyph = this.glyphs[key];
          if (this.resizable) return Math.round(glyph.lineHeight * size / this.size);else return glyph.lineHeight;
        }

        return 0;
      }
    }]);

    return BitmapFont;
  }();

  fgui.BitmapFont = BitmapFont;

  var BMGlyph = function BMGlyph() {
    _classCallCheck(this, BMGlyph);

    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.advance = 0;
    this.lineHeight = 0;
    this.channel = 0;
    this.uv = [new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()];
  };

  fgui.BMGlyph = BMGlyph;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_rect = new fgui.Rect();
  var s_scale = 1;

  var DynamicFont = /*#__PURE__*/function () {
    function DynamicFont() {
      _classCallCheck(this, DynamicFont);

      this.version = 0;
      this.isDynamic = true;
      this.keepCrisp = true;
      this._glyphs = {};
      this._color = new fgui.Color4();
      this._outlineColor = new fgui.Color4();
      this._packers = [new BinPacker(), new BinPacker(), new BinPacker()];
      this._canvas = document.createElement("canvas");
      this._context = this._canvas.getContext("2d");
      this._context.globalCompositeOperation = "lighter";
      this.createTexture(512);
      s_scale = fgui.Stage.devicePixelRatio;
    }

    _createClass(DynamicFont, [{
      key: "createTexture",
      value: function createTexture(size) {
        this._canvas.width = this._canvas.height = size;

        if (!this.mainTexture) {
          this._texture = new THREE.Texture(this._canvas);
          this._texture.generateMipmaps = false;
          this._texture.magFilter = THREE.LinearFilter;
          this._texture.minFilter = THREE.LinearFilter;
          this.mainTexture = new fgui.NTexture(this._texture);
        } else {
          this._texture.needsUpdate = true;
          this.mainTexture.reload(this._texture);
        }

        this.clearTexture();
      }
    }, {
      key: "clearTexture",
      value: function clearTexture() {
        this._context.fillStyle = 'black';

        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this._context.globalCompositeOperation = "lighter";

        for (var i = 0; i < 3; i++) {
          this._packers[i].init(this._canvas.width, this._canvas.height);
        }
      }
    }, {
      key: "rebuild",
      value: function rebuild() {
        if (this._canvas.width < 2048) this.createTexture(this._canvas.width * 2);else this.clearTexture();
        this.version++;
        fgui.Stage.fontRebuilt = true;
        console.log("font atlas rebuilt : %s (%d)", this.name, this._canvas.width);
      }
    }, {
      key: "setFormat",
      value: function setFormat(format, fontSizeScale) {
        this._format = format;
        var size = format.size * fontSizeScale;
        this._size = Math.floor(size);
        if (this._size == 0) this._size = 1;

        this._color.setHex(format.color);

        this._outlineColor.setHex(format.outlineColor);
      }
    }, {
      key: "prepareCharacters",
      value: function prepareCharacters(text) {
        var len = text.length;

        for (var i = 0; i < len; i++) {
          var ch = text[i];
          var glyph = this.prepareChar(ch, this._size);
          if (!glyph) break;
          if (this._format.outline > 0) this.prepareOutline(ch, glyph, this._size, this._format.outline);
        }
      }
    }, {
      key: "prepareChar",
      value: function prepareChar(ch, size) {
        var key = (size << 16) + ch.charCodeAt(0);
        var glyph = this._glyphs[key];
        if (glyph && glyph.ver == this.version) return glyph;
        if (this.keepCrisp) size *= s_scale;
        this._context.font = size + "px " + this._name;

        if (!glyph) {
          glyph = this.measureChar(ch, size);
          this._glyphs[key] = glyph;
        }

        glyph.ver = this.version;
        var w = glyph.sourceRect.width;
        var h = glyph.sourceRect.height;
        if (w == 0) return glyph;
        var node = this.addNode(w + 2, h + 2);

        if (!node) {
          this.rebuild();
          return null;
        }

        this._context.textBaseline = "alphabetic";
        this._context.fillStyle = node.z == 0 ? "#FF0000" : node.z == 1 ? "#00FF00" : "#0000FF";

        this._context.fillText(ch, node.x + glyph.sourceRect.x, node.y + glyph.baseline);

        this._texture.needsUpdate = true;
        glyph.chl = node.z / 3;
        glyph.uvRect.set(node.x / this.mainTexture.width, 1 - (node.y + h) / this.mainTexture.height, w / this.mainTexture.width, h / this.mainTexture.height);
        return glyph;
      }
    }, {
      key: "prepareOutline",
      value: function prepareOutline(ch, glyph, size, outline) {
        if (!glyph.outlines) glyph.outlines = {};
        var outlineGlyph = glyph.outlines[outline];
        if (outlineGlyph && outlineGlyph.ver == this.version || glyph.sourceRect.width == 0) return;

        if (!outlineGlyph) {
          outlineGlyph = {
            vertRect: new fgui.Rect(),
            uvRect: new fgui.Rect(),
            ver: this.version
          };
          glyph.outlines[outline] = outlineGlyph;
        } else outlineGlyph.ver = this.version;

        var outline2 = outline;
        if (this.keepCrisp) outline2 *= s_scale;
        var w = glyph.sourceRect.width + outline2 * 2;
        var h = glyph.sourceRect.height + outline2 * 2;
        var node = this.addNode(w + 2, h + 2);

        if (!node) {
          this.rebuild();
          return null;
        }

        if (this.keepCrisp) size *= s_scale;
        this._context.font = size + "px " + this._name;
        this._context.textBaseline = "alphabetic";
        this._context.strokeStyle = node.z == 0 ? "#FF0000" : node.z == 1 ? "#00FF00" : "#0000FF";
        this._context.lineWidth = outline2;

        this._context.strokeText(ch, node.x + glyph.sourceRect.x + outline2, node.y + glyph.baseline + outline2);

        this._texture.needsUpdate = true;
        outlineGlyph.chl = node.z / 3;
        outlineGlyph.vertRect.copy(glyph.vertRect);
        outlineGlyph.vertRect.extend(outline, outline);
        outlineGlyph.uvRect.set(node.x / this.mainTexture.width, 1 - (node.y + h) / this.mainTexture.height, w / this.mainTexture.width, h / this.mainTexture.height);
      }
    }, {
      key: "measureChar",
      value: function measureChar(ch, size) {
        var left, top, w, h, baseline;
        this._context.textBaseline = "alphabetic";

        var met = this._context.measureText(ch);

        if ('actualBoundingBoxLeft' in met) {
          this._context.textBaseline = "top";

          var met1 = this._context.measureText(ch);

          left = met.actualBoundingBoxLeft > 0 ? Math.ceil(met.actualBoundingBoxLeft) : 0;
          top = Math.ceil(met1.actualBoundingBoxAscent) + 1;
          w = Math.ceil(left + met.actualBoundingBoxRight) + 1;
          h = Math.ceil(met.actualBoundingBoxAscent + met.actualBoundingBoxDescent) + 2;
          baseline = Math.ceil(met.actualBoundingBoxAscent);
        } else {
          baseline = getBaseline(ch, this._name, size);
          left = 0;
          if (ch == 'j') left = Math.ceil(size / 20);
          top = 0;
          w = met["width"];
          h = size * 1.25 + 2;
        }

        var glyph;

        if (w == 0) {
          glyph = {
            ver: this.version
          };
        } else {
          glyph = {
            uvRect: new fgui.Rect(),
            vertRect: new fgui.Rect(-left, -baseline, w, h),
            advance: met.width,
            sourceRect: new fgui.Rect(left, top, w, h),
            baseline: baseline,
            ver: this.version
          };

          if (this.keepCrisp) {
            glyph.vertRect.x /= s_scale;
            glyph.vertRect.y /= s_scale;
            glyph.vertRect.width /= s_scale;
            glyph.vertRect.height /= s_scale;
            glyph.advance /= s_scale;
          }
        }

        return glyph;
      }
    }, {
      key: "addNode",
      value: function addNode(w, h) {
        var node;

        for (var i = 0; i < 3; i++) {
          var packer = this._packers[i];

          if (!packer.full && (node = packer.add(w, h))) {
            node.z = i;
            break;
          }
        }

        return node;
      }
    }, {
      key: "getGlyph",
      value: function getGlyph(ch, ret) {
        var key = (this._size << 16) + ch.charCodeAt(0);
        this._glyph = this._glyphs[key];
        if (!this._glyph) return false;
        ret.width = this._glyph.advance;
        ret.height = Math.round(this._size * 1.25);
        ret.baseline = Math.round(this._size);
        return true;
      }
    }, {
      key: "drawGlyph",
      value: function drawGlyph(x, y, vb) {
        if (!this._glyph.vertRect) return 0;

        if (this._format.outline > 0) {
          var outlineGlyph = this._glyph.outlines[this._format.outline];
          s_rect.copy(outlineGlyph.vertRect);
          s_rect.x += x;
          s_rect.y -= y;
          this._outlineColor.a = outlineGlyph.chl;
          vb.addQuad(s_rect, outlineGlyph.uvRect, this._outlineColor);
          vb.addTriangles(-4);
        }

        s_rect.copy(this._glyph.vertRect);
        s_rect.x += x;
        s_rect.y -= y;
        this._color.a = this._glyph.chl;
        vb.addQuad(s_rect, this._glyph.uvRect, this._color);
        vb.addTriangles(-4);
        return 4;
      }
    }, {
      key: "drawLine",
      value: function drawLine(x, y, width, fontSize, type, vb) {
        return 0;
      }
    }, {
      key: "getLineHeight",
      value: function getLineHeight(size) {
        return Math.round(size * 1.25);
      }
    }, {
      key: "name",
      get: function get() {
        return this._name;
      },
      set: function set(value) {
        this._name = value;
        this._canvas.id = value;
      }
    }]);

    return DynamicFont;
  }();

  fgui.DynamicFont = DynamicFont;

  var BinPacker = /*#__PURE__*/function () {
    function BinPacker() {
      _classCallCheck(this, BinPacker);
    }

    _createClass(BinPacker, [{
      key: "init",
      value: function init(w, h) {
        this._root = {
          x: 0,
          y: 0,
          w: w,
          h: h
        };
        delete this.full;
      }
    }, {
      key: "add",
      value: function add(w, h) {
        var node;
        if (node = this.findNode(this._root, w, h)) node = this.splitNode(node, w, h);
        if (!node) this.full = true;
        return node;
      }
    }, {
      key: "findNode",
      value: function findNode(root, w, h) {
        if (root.used) return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);else if (w <= root.w && h <= root.h) return root;else return null;
      }
    }, {
      key: "splitNode",
      value: function splitNode(node, w, h) {
        node.used = true;
        node.down = {
          x: node.x,
          y: node.y + h,
          w: node.w,
          h: node.h - h
        };
        node.right = {
          x: node.x + w,
          y: node.y,
          w: node.w - w,
          h: h
        };
        return node;
      }
    }]);

    return BinPacker;
  }();

  var eSpan;
  var eBlock;

  function getBaseline(ch, font, size) {
    if (!eSpan) {
      eSpan = document.createElement('span');
      eBlock = document.createElement("div");
      eBlock.style.display = 'inline-block';
      eBlock.style.width = '1px';
      eBlock.style.height = '0px';
      var div = document.createElement('div');
      div.id = 'measureText';
      div.style.position = 'absolute';
      div.style.visibility = 'hidden';
      div.style.left = div.style.top = '0px';
      div.appendChild(eSpan);
      div.appendChild(eBlock);
      document.body.appendChild(div);
    }

    eSpan.innerHTML = ch;
    eSpan.style.fontFamily = font;
    eSpan.style.fontSize = size + "px";
    var ascent, height;
    var offset = eSpan.offsetTop;
    eBlock.style['vertical-align'] = 'baseline';
    ascent = eBlock.offsetTop - offset;
    eBlock.style['vertical-align'] = 'bottom';
    height = eBlock.offsetTop - offset;
    return ascent + Math.floor((size * 1.25 - height) / 2);
  }
})(fgui || (fgui = {}));

(function (fgui) {
  var FontManager = /*#__PURE__*/function () {
    function FontManager() {
      _classCallCheck(this, FontManager);
    }

    _createClass(FontManager, null, [{
      key: "registerFont",
      value: function registerFont(font) {
        this.fonts[font.name] = font;
      }
    }, {
      key: "unregisterFont",
      value: function unregisterFont(font) {
        this.fonts[font.name] = undefined;
      }
    }, {
      key: "getFont",
      value: function getFont(name) {
        if (this.packageFontGetter && name.startsWith("ui://")) {
          var _font = this.packageFontGetter(name);

          if (_font) return _font;
        }

        var font = this.fonts[name];

        if (!font) {
          font = new fgui.DynamicFont();
          font.name = name;
          this.fonts[name] = font;
        }

        return font;
      }
    }]);

    return FontManager;
  }();

  FontManager.fonts = {};
  fgui.FontManager = FontManager;
})(fgui || (fgui = {}));

(function (fgui) {
  var TextField = /*#__PURE__*/function (_fgui$DisplayObject3) {
    _inherits(TextField, _fgui$DisplayObject3);

    var _super9 = _createSuper(TextField);

    function TextField() {
      var _this9;

      _classCallCheck(this, TextField);

      _this9 = _super9.call(this);
      _this9._touchDisabled = true;
      _this9._graphics = new fgui.NGraphics(_this9.obj3D);
      _this9._graphics.meshFactory = _assertThisInitialized(_this9);
      _this9._textFormat = new fgui.TextFormat();
      _this9._fontSizeScale = 1;
      _this9._wordWrap = false;
      _this9._text = "";
      _this9._parsedText = "";
      _this9._elements = new Array();
      _this9._lines = new Array();
      return _this9;
    }

    _createClass(TextField, [{
      key: "applyFormat",
      value: function applyFormat() {
        var fontName = this._textFormat.font;
        if (!fontName) fontName = fgui.UIConfig.defaultFont;
        var newFont = fgui.FontManager.getFont(fontName);

        if (this._font != newFont) {
          this._font = newFont;
          this._fontVersion = this._font.version;
          this._graphics.texture = this._font.mainTexture;

          this._graphics.setKeyword("TEXT", this._font.isDynamic);
        }

        if (this._text) this._textChanged = true;
      }
    }, {
      key: "redraw",
      value: function redraw() {
        if (!this._font) this.applyFormat();

        if (this._font.version != this._fontVersion) {
          this._fontVersion = this._font.version;
          this._graphics.texture = this._font.mainTexture;
          this._textChanged = true;
        }

        if (this._textChanged) this.buildLines();
        return this._graphics.updateMesh();
      }
    }, {
      key: "getLinesShape",
      value: function getLinesShape(startLine, startCharX, endLine, endCharX, clipped, result) {
        var line1 = this._lines[startLine];
        var line2 = this._lines[endLine];

        if (startLine == endLine) {
          var r = new fgui.Rect();
          r.setMinMax(startCharX, line1.y, endCharX, line1.y + line1.height);
          if (clipped) result.push(r.intersection(this._contentRect));else result.push(r);
        } else if (startLine == endLine - 1) {
          var _r = new fgui.Rect();

          _r.setMinMax(startCharX, line1.y, fgui.GUTTER_X + line1.width, line1.y + line1.height);

          if (clipped) result.push(_r.intersection(this._contentRect));else result.push(_r);
          _r = new fgui.Rect();

          _r.setMinMax(fgui.GUTTER_X, line1.y + line1.height, endCharX, line2.y + line2.height);

          if (clipped) result.push(_r.intersection(this._contentRect));else result.push(_r);
        } else {
          var _r2 = new fgui.Rect();

          _r2.setMinMax(startCharX, line1.y, fgui.GUTTER_X + line1.width, line1.y + line1.height);

          if (clipped) result.push(_r2.intersection(this._contentRect));else result.push(_r2);

          for (var i = startLine + 1; i < endLine; i++) {
            var line = this._lines[i];
            _r2 = new fgui.Rect();

            _r2.setMinMax(fgui.GUTTER_X, _r2.yMax, fgui.GUTTER_X + line.width, line.y + line.height);

            if (clipped) result.push(_r2.intersection(this._contentRect));else result.push(_r2);
          }

          _r2 = new fgui.Rect();

          _r2.setMinMax(fgui.GUTTER_X, _r2.yMax, endCharX, line2.y + line2.height);

          if (clipped) result.push(_r2.intersection(this._contentRect));else result.push(_r2);
        }
      }
    }, {
      key: "onSizeChanged",
      value: function onSizeChanged() {
        if (!this._updatingSize) {
          if (this._autoSize == fgui.AutoSizeType.Shrink || this._wordWrap) this._textChanged = true;else if (this._autoSize != fgui.AutoSizeType.None) this._graphics.setMeshDirty();
          if (this._verticalAlign != "top") this.applyVertAlign();
        }

        _get(_getPrototypeOf(TextField.prototype), "onSizeChanged", this).call(this);
      }
    }, {
      key: "ensureSizeCorrect",
      value: function ensureSizeCorrect() {
        if (this._textChanged && this._autoSize != fgui.AutoSizeType.None) this.buildLines();
      }
    }, {
      key: "update",
      value: function update(clippingPlanes, alpha) {
        this.redraw();

        _get(_getPrototypeOf(TextField.prototype), "update", this).call(this, clippingPlanes, alpha);
      }
    }, {
      key: "requestText",
      value: function requestText() {
        if (!this._html) {
          this._font.setFormat(this._textFormat, this._fontSizeScale);

          this._font.prepareCharacters(this._parsedText);
        } else {
          var count = this._elements.length;

          for (var i = 0; i < count; i++) {
            var element = this._elements[i];

            if (element.type == fgui.HtmlElementType.Text) {
              this._font.setFormat(element.format, this._fontSizeScale);

              this._font.prepareCharacters(element.text);
            }
          }
        }
      }
    }, {
      key: "buildLines",
      value: function buildLines() {
        if (!this._font) this.applyFormat();
        this._textChanged = false;

        this._graphics.setMeshDirty();

        this._fontSizeScale = 1;
        this.cleanup();

        if (this._text.length == 0) {
          var emptyLine = lineInfoPool.borrow();
          emptyLine.width = 0;
          emptyLine.height = this._font.getLineHeight(this._textFormat.size);
          emptyLine.charIndex = emptyLine.charCount = 0;
          emptyLine.y = emptyLine.y2 = fgui.GUTTER_Y;

          this._lines.push(emptyLine);

          this._textWidth = this._textHeight = 0;
        } else {
          this.parseText();
          this.buildLines2();
          if (this._autoSize == fgui.AutoSizeType.Shrink) this.doShrink();
        }

        if (this._autoSize == fgui.AutoSizeType.Both) {
          this._updatingSize = true;

          if (this.isInput) {
            var w = Math.max(this._textFormat.size, this._textWidth);
            var h = Math.max(this._font.getLineHeight(this._textFormat.size) + fgui.GUTTER_Y * 2, this._textHeight);
            this.setSize(w, h);
          } else this.setSize(this._textWidth, this._textHeight);

          this._updatingSize = false;
        } else if (this._autoSize == fgui.AutoSizeType.Height) {
          this._updatingSize = true;
          if (this.isInput) this.height = Math.max(this._font.getLineHeight(this._textFormat.size) + fgui.GUTTER_Y * 2, this._textHeight);else this.height = this._textHeight;
          this._updatingSize = false;
        }

        this._yOffset = 0;
        this.applyVertAlign();
      }
    }, {
      key: "parseText",
      value: function parseText() {
        if (this._html) {
          fgui.htmldefaultParser.parse(this._text, this._textFormat, this._elements, this.isRich ? this.htmlParseOptions : null);
          this._parsedText = "";
        } else this._parsedText = this._text;

        var elementCount = this._elements.length;

        if (elementCount == 0) {
          if (this.isInput) this._parsedText = this._parsedText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        } else {
          var i = 0;

          while (i < elementCount) {
            var element = this._elements[i];
            element.charIndex = this._parsedText.length;

            if (element.type == fgui.HtmlElementType.Text) {
              if (this.isInput) this._parsedText += element.text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");else this._parsedText += element.text;
            } else if (element.isEntity) this._parsedText += ' ';

            i++;
          }
        }
      }
    }, {
      key: "buildLines2",
      value: function buildLines2() {
        var letterSpacing = this._textFormat.letterSpacing * this._fontSizeScale;
        var lineSpacing = (this._textFormat.lineSpacing - 1) * this._fontSizeScale;
        var rectWidth = this._contentRect.width - fgui.GUTTER_X * 2;
        var wordLen = 0;
        var wordPossible = false;
        var posx = 0;
        var format = this._textFormat;

        this._font.setFormat(format, this._fontSizeScale);

        var wrap = this._wordWrap && !this._singleLine;

        if (this._maxWidth > 0) {
          wrap = true;
          rectWidth = this._maxWidth - fgui.GUTTER_X * 2;
        }

        this._textWidth = this._textHeight = 0;
        this.requestText();
        var elementCount = this._elements.length;
        var elementIndex = 0;
        var element = null;
        if (elementCount > 0) element = this._elements[elementIndex];
        var textLength = this._parsedText.length;
        var line = lineInfoPool.borrow();

        this._lines.push(line);

        line.y = line.y2 = fgui.GUTTER_Y;
        var lineChars = sLineCharInfo;
        lineChars.length = 0;
        var glyph = {
          width: 0,
          height: 0,
          baseline: 0
        };

        for (var charIndex = 0; charIndex < textLength; charIndex++) {
          var ch = this._parsedText[charIndex];
          glyph.width = glyph.height = glyph.baseline = 0;

          while (element && element.charIndex == charIndex) {
            if (element.type == fgui.HtmlElementType.Text) {
              format = element.format;

              this._font.setFormat(format, this._fontSizeScale);
            } else {
              var htmlObject = element.htmlObject;

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

              if (element.isEntity) ch = "";
            }

            elementIndex++;
            if (elementIndex < elementCount) element = this._elements[elementIndex];else element = null;
          }

          if (ch.length == 0 || ch == '\n') {
            wordPossible = false;
          } else if (this._font.getGlyph(ch == '\t' ? ' ' : ch, glyph)) {
            if (ch == '\t') glyph.width *= 4;

            if (wordPossible) {
              if (' \t\n\r\v'.indexOf(ch) != -1) {
                wordLen = 0;
              } else if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9' || ch == '.' || ch == '"' || ch == '\'') {
                wordLen++;
              } else wordPossible = false;
            } else if (' \t\n\r\v'.indexOf(ch) != -1) {
              wordLen = 0;
              wordPossible = true;
            } else wordPossible = false;
          } else wordPossible = false;

          lineChars.push(glyph.width, glyph.height, glyph.baseline);

          if (glyph.width != 0) {
            if (posx != 0) posx += letterSpacing;
            posx += glyph.width;
          }

          if (ch == '\n' && !this._singleLine) {
            this.updateLineInfo(line, letterSpacing, lineChars.length / 3);
            var newLine = lineInfoPool.borrow();

            this._lines.push(newLine);

            newLine.y = line.y + (line.height + lineSpacing);
            if (newLine.y < fgui.GUTTER_Y) newLine.y = fgui.GUTTER_Y;
            newLine.y2 = newLine.y;
            newLine.charIndex = line.charIndex + line.charCount;
            lineChars.length = 0;
            wordPossible = false;
            posx = 0;
            line = newLine;
          } else if (wrap && posx > rectWidth) {
            var lineCharCount = lineChars.length / 3;
            var toMoveChars = void 0;
            if (wordPossible && wordLen < 20 && lineCharCount > 2) toMoveChars = wordLen;else if (lineCharCount != 1) toMoveChars = 1;else toMoveChars = 0;
            this.updateLineInfo(line, letterSpacing, lineCharCount - toMoveChars);

            var _newLine = lineInfoPool.borrow();

            this._lines.push(_newLine);

            _newLine.y = line.y + (line.height + lineSpacing);
            if (_newLine.y < fgui.GUTTER_Y) _newLine.y = fgui.GUTTER_Y;
            _newLine.y2 = _newLine.y;
            _newLine.charIndex = line.charIndex + line.charCount;
            posx = 0;

            if (toMoveChars != 0) {
              for (var i = line.charCount; i < lineCharCount; i++) {
                if (posx != 0) posx += letterSpacing;
                posx += lineChars[i * 3];
              }

              for (var _i15 = 0; _i15 < line.charCount * 3; _i15++) {
                lineChars.shift();
              }
            } else lineChars.length = 0;

            wordPossible = false;
            line = _newLine;
          }
        }

        this.updateLineInfo(line, letterSpacing, lineChars.length / 3);
        if (this._textWidth > 0) this._textWidth += fgui.GUTTER_X * 2;
        this._textHeight = line.y + line.height + fgui.GUTTER_Y;
        this._textWidth = Math.round(this._textWidth);
        this._textHeight = Math.round(this._textHeight);
      }
    }, {
      key: "updateLineInfo",
      value: function updateLineInfo(line, letterSpacing, cnt) {
        var lineChars = sLineCharInfo;

        for (var i = 0; i < cnt * 3; i += 3) {
          var width = lineChars[i];
          var height = lineChars[i + 1];
          var baseline = lineChars[i + 2];

          if (baseline > line.baseline) {
            line.height += baseline - line.baseline;
            line.baseline = baseline;
          }

          if (height - baseline > line.height - line.baseline) line.height += height - baseline - (line.height - line.baseline);

          if (width > 0) {
            if (line.width != 0) line.width += letterSpacing;
            line.width += width;
          }
        }

        if (line.height == 0) {
          if (this._lines.length == 1) line.height = this._textFormat.size;else line.height = this._lines[this._lines.length - 2].height;
        }

        if (line.width > this._textWidth) this._textWidth = line.width;
        line.charCount = cnt;
      }
    }, {
      key: "doShrink",
      value: function doShrink() {
        if (this._lines.length > 1 && this._textHeight > this._contentRect.height) {
          var low = 0;
          var high = this._textFormat.size;
          this._fontSizeScale = Math.sqrt(this._contentRect.height / this._textHeight);
          var cur = Math.floor(this._fontSizeScale * this._textFormat.size);

          while (true) {
            lineInfoPool.returns(this._lines);
            this.buildLines2();
            if (this._textWidth > this._contentRect.width || this._textHeight > this._contentRect.height) high = cur;else low = cur;

            if (high - low > 1 || high != low && cur == high) {
              cur = low + (high - low) / 2;
              this._fontSizeScale = cur / this._textFormat.size;
            } else break;
          }
        } else if (this._textWidth > this._contentRect.width) {
          this._fontSizeScale = this._contentRect.width / this._textWidth;
          lineInfoPool.returns(this._lines);
          this.buildLines2();

          if (this._textWidth > this._contentRect.width) {
            var size = Math.floor(this._textFormat.size * this._fontSizeScale);
            size--;
            this._fontSizeScale = size / this._textFormat.size;
            lineInfoPool.returns(this._lines);
            this.buildLines2();
          }
        }
      }
    }, {
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        if (this._textWidth == 0 && this._lines.length == 1) {
          if (this._charPositions) {
            charPosPool.returns(this._charPositions);

            this._charPositions.push(charPosPool.borrow());
          }

          this.refreshObjects();
          return;
        }

        var letterSpacing = this._textFormat.letterSpacing * this._fontSizeScale;
        var format = this._textFormat;

        this._font.setFormat(format, this._fontSizeScale);

        var rectWidth = this._contentRect.width > 0 ? this._contentRect.width - fgui.GUTTER_X * 2 : 0;
        var rectHeight = this._contentRect.height > 0 ? Math.max(this._contentRect.height, this._font.getLineHeight(format.size)) : 0;
        if (this._charPositions) charPosPool.returns(this._charPositions);
        var currentLink = null;
        var linkStartX = 0;
        var linkStartLine = 0;
        var posx = 0;
        var indent_x;
        var clipping = !this.isInput && this._autoSize == fgui.AutoSizeType.None;
        var lineClipped;
        var lineAlign;
        var vertCount;
        var underlineStart;
        var strikethroughStart;
        var minFontSize;
        var maxFontSize;
        var elementIndex = 0;
        var elementCount = this._elements.length;
        var element = null;
        if (elementCount > 0) element = this._elements[elementIndex];
        var glyph = {
          width: 0,
          height: 0,
          baseline: 0
        };
        var lineCount = this._lines.length;

        for (var i = 0; i < lineCount; ++i) {
          var line = this._lines[i];
          if (line.charCount == 0) continue;
          lineClipped = clipping && i != 0 && line.y + line.height > rectHeight;
          lineAlign = format.align;
          if (element && element.charIndex == line.charIndex) lineAlign = element.format.align;else lineAlign = format.align;
          if (lineAlign == "center") indent_x = Math.floor((rectWidth - line.width) / 2);else if (lineAlign == "right") indent_x = rectWidth - line.width;else indent_x = 0;
          if (indent_x < 0) indent_x = 0;
          posx = fgui.GUTTER_X + indent_x;
          var lineCharCount = line.charCount;
          underlineStart = posx;
          strikethroughStart = posx;
          minFontSize = maxFontSize = format.size;

          for (var j = 0; j < lineCharCount; j++) {
            var charIndex = line.charIndex + j;
            var ch = this._parsedText[charIndex];

            while (element && charIndex == element.charIndex) {
              if (element.type == fgui.HtmlElementType.Text) {
                vertCount = 0;

                if (format.underline != element.format.underline) {
                  if (format.underline) {
                    if (!lineClipped) {
                      var lineWidth = underlineStart - (clipping ? fgui.clamp(posx, fgui.GUTTER_X, fgui.GUTTER_X + rectWidth) : posx);
                      if (lineWidth > 0) vertCount += this._font.drawLine(underlineStart < posx ? underlineStart : posx, -(line.y + line.baseline), lineWidth, maxFontSize, 0, vb);
                    }

                    maxFontSize = 0;
                  } else underlineStart = posx;
                }

                if (format.strikethrough != element.format.strikethrough) {
                  if (format.strikethrough) {
                    if (!lineClipped) {
                      var _lineWidth = strikethroughStart - (clipping ? fgui.clamp(posx, fgui.GUTTER_X, fgui.GUTTER_X + rectWidth) : posx);

                      if (_lineWidth > 0) vertCount += this._font.drawLine(strikethroughStart < posx ? strikethroughStart : posx, -(line.y + line.baseline), _lineWidth, minFontSize, 1, vb);
                    }

                    minFontSize = Number.POSITIVE_INFINITY;
                  } else strikethroughStart = posx;
                }

                if (vertCount > 0 && this._charPositions) {
                  var cp = this._charPositions[this._charPositions.length - 1];
                  cp.vertCount += vertCount;
                  this._charPositions[this._charPositions.length - 1] = cp;
                }

                format = element.format;
                minFontSize = Math.min(minFontSize, format.size);
                maxFontSize = Math.max(maxFontSize, format.size);

                this._font.setFormat(format, this._fontSizeScale);
              } else if (element.type == fgui.HtmlElementType.Link) {
                currentLink = element.htmlObject;

                if (currentLink) {
                  element.position.set(0, 0);
                  currentLink.setPosition(0, 0);
                  linkStartX = posx;
                  linkStartLine = i;
                }
              } else if (element.type == fgui.HtmlElementType.LinkEnd) {
                if (currentLink) {
                  currentLink.setArea(linkStartLine, linkStartX, i, posx);
                  currentLink = null;
                }
              } else {
                var htmlObj = element.htmlObject;

                if (htmlObj) {
                  if (this._charPositions) {
                    var _cp = charPosPool.borrow();

                    _cp.lineIndex = i;
                    _cp.charIndex = this._charPositions.length;
                    _cp.imgIndex = elementIndex + 1;
                    _cp.offsetX = posx;
                    _cp.width = htmlObj.width;

                    this._charPositions.push(_cp);
                  }

                  if (lineClipped || clipping && (posx < fgui.GUTTER_X || posx > fgui.GUTTER_X && posx + htmlObj.width > this._contentRect.width - fgui.GUTTER_X)) element.status |= 1;else element.status &= 254;
                  element.position = new THREE.Vector2(posx + 1, line.y + line.baseline - htmlObj.height * IMAGE_BASELINE);
                  htmlObj.setPosition(element.position.x, element.position.y);
                  posx += htmlObj.width + letterSpacing + 2;
                }
              }

              if (element.isEntity) ch = '\0';
              elementIndex++;
              if (elementIndex < elementCount) element = this._elements[elementIndex];else element = null;
            }

            if (ch == '\0') continue;

            if (this._font.getGlyph(ch == '\t' ? ' ' : ch, glyph)) {
              if (ch == '\t') glyph.width *= 4;

              if (lineClipped || clipping && (rectWidth < 7 || posx != fgui.GUTTER_X + indent_x) && posx + glyph.width > this._contentRect.width - fgui.GUTTER_X + 0.5) {
                posx += letterSpacing + glyph.width;
                continue;
              }

              vertCount = this._font.drawGlyph(posx, -(line.y + line.baseline), vb);

              if (this._charPositions) {
                var _cp2 = charPosPool.borrow();

                _cp2.lineIndex = i;
                _cp2.charIndex = this._charPositions.length;
                _cp2.vertCount = vertCount;
                _cp2.offsetX = posx;
                _cp2.width = glyph.width;

                this._charPositions.push(_cp2);
              }

              posx += letterSpacing + glyph.width;
            } else {
              if (this._charPositions) {
                var _cp3 = charPosPool.borrow();

                _cp3.lineIndex = i;
                _cp3.charIndex = this._charPositions.length;
                _cp3.offsetX = posx;

                this._charPositions.push(_cp3);
              }

              posx += letterSpacing;
            }
          }

          if (!lineClipped) {
            vertCount = 0;

            if (format.underline) {
              var _lineWidth2 = underlineStart - (clipping ? fgui.clamp(posx, fgui.GUTTER_X, fgui.GUTTER_X + rectWidth) : posx);

              if (_lineWidth2 > 0) vertCount += this._font.drawLine(underlineStart < posx ? underlineStart : posx, -(line.y + line.baseline), _lineWidth2, maxFontSize, 0, vb);
            }

            if (format.strikethrough) {
              var _lineWidth3 = strikethroughStart - (clipping ? fgui.clamp(posx, fgui.GUTTER_X, fgui.GUTTER_X + rectWidth) : posx);

              if (_lineWidth3 > 0) vertCount += this._font.drawLine(strikethroughStart < posx ? strikethroughStart : posx, -(line.y + line.baseline), _lineWidth3, minFontSize, 1, vb);
            }

            if (vertCount > 0 && this._charPositions) {
              var _cp4 = this._charPositions[this._charPositions.length - 1];
              _cp4.vertCount += vertCount;
            }
          }
        }

        if (element && element.type == fgui.HtmlElementType.LinkEnd && currentLink) currentLink.setArea(linkStartLine, linkStartX, lineCount - 1, posx);

        if (this._charPositions) {
          var _cp5 = charPosPool.borrow();

          _cp5.lineIndex = lineCount - 1;
          _cp5.charIndex = this._charPositions.length;
          _cp5.offsetX = posx;

          this._charPositions.push(_cp5);
        }

        this.refreshObjects();
      }
    }, {
      key: "cleanup",
      value: function cleanup() {
        this.cleanupObjects();
        fgui.elementPool.returns(this._elements);
        lineInfoPool.returns(this._lines);
        this._textWidth = 0;
        this._textHeight = 0;
        this._parsedText = "";
        if (this._charPositions) charPosPool.returns(this._charPositions);
      }
    }, {
      key: "applyVertAlign",
      value: function applyVertAlign() {
        var oldOffset = this._yOffset;
        if (this._autoSize == fgui.AutoSizeType.Both || this._autoSize == fgui.AutoSizeType.Height || this._verticalAlign == "top") this._yOffset = 0;else {
          var dh;
          if (this._textHeight == 0 && this._lines.length > 0) dh = this._contentRect.height - this._lines[0].height;else dh = this._contentRect.height - this._textHeight;
          if (dh < 0) dh = 0;
          if (this._verticalAlign == "middle") this._yOffset = Math.floor(dh / 2);else this._yOffset = dh;
        }

        if (oldOffset != this._yOffset) {
          var cnt = this._lines.length;

          for (var i = 0; i < cnt; i++) {
            this._lines[i].y = this._lines[i].y2 + this._yOffset;
          }

          this._graphics.setMeshDirty();
        }
      }
    }, {
      key: "refreshObjects",
      value: function refreshObjects() {}
    }, {
      key: "cleanupObjects",
      value: function cleanupObjects() {}
    }, {
      key: "textFormat",
      get: function get() {
        return this._textFormat;
      }
    }, {
      key: "align",
      get: function get() {
        return this._textFormat.align;
      },
      set: function set(value) {
        if (this._textFormat.align != value) {
          this._textFormat.align = value;
          if (this._text) this._textChanged = true;
        }
      }
    }, {
      key: "verticalAlign",
      get: function get() {
        return this._verticalAlign;
      },
      set: function set(value) {
        if (this._verticalAlign != value) {
          this._verticalAlign = value;
          if (!this._textChanged) this.applyVertAlign();
        }
      }
    }, {
      key: "text",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        if (this._text == value && !this._html) return;
        this._text = value;
        this._textChanged = true;
        this._html = false;
      }
    }, {
      key: "htmlText",
      get: function get() {
        return this._text;
      },
      set: function set(value) {
        if (this._text == value && this._html) return;
        this._text = value;
        this._textChanged = true;
        this._html = true;
      }
    }, {
      key: "parsedText",
      get: function get() {
        return this._parsedText;
      }
    }, {
      key: "autoSize",
      get: function get() {
        return this._autoSize;
      },
      set: function set(value) {
        if (this._autoSize != value) {
          this._autoSize = value;
          this._textChanged = true;
        }
      }
    }, {
      key: "wordWrap",
      get: function get() {
        return this._wordWrap;
      },
      set: function set(value) {
        if (this._wordWrap != value) {
          this._wordWrap = value;
          this._textChanged = true;
        }
      }
    }, {
      key: "singleLine",
      get: function get() {
        return this._singleLine;
      },
      set: function set(value) {
        if (this._singleLine != value) {
          this._singleLine = value;
          this._textChanged = true;
        }
      }
    }, {
      key: "textWidth",
      get: function get() {
        if (this._textChanged) this.buildLines();
        return this._textWidth;
      }
    }, {
      key: "textHeight",
      get: function get() {
        if (this._textChanged) this.buildLines();
        return this._textHeight;
      }
    }, {
      key: "maxWidth",
      get: function get() {
        return this._maxWidth;
      },
      set: function set(value) {
        if (this._maxWidth != value) {
          this._maxWidth = value;
          this._textChanged = true;
        }
      }
    }, {
      key: "htmlElements",
      get: function get() {
        if (this._textChanged) this.buildLines();
        return this._elements;
      }
    }, {
      key: "lines",
      get: function get() {
        if (this._textChanged) this.buildLines();
        return this._lines;
      }
    }, {
      key: "charPositions",
      get: function get() {
        if (this._textChanged) this.buildLines();

        this._graphics.updateMesh();

        return this._charPositions;
      }
    }]);

    return TextField;
  }(fgui.DisplayObject);

  fgui.TextField = TextField;
  fgui.GUTTER_X = 2;
  fgui.GUTTER_Y = 2;
  var IMAGE_BASELINE = 0.8;
  var sLineCharInfo = new Array();

  var LineInfo = function LineInfo() {
    _classCallCheck(this, LineInfo);
  };

  fgui.LineInfo = LineInfo;
  var lineInfoPool = new fgui.Pool(LineInfo, function (ele) {
    ele.width = ele.height = ele.baseline = ele.y = ele.y2 = ele.charIndex = ele.charCount = 0;
  });

  var CharPosition = function CharPosition() {
    _classCallCheck(this, CharPosition);
  };

  fgui.CharPosition = CharPosition;
  var charPosPool = new fgui.Pool(CharPosition);
})(fgui || (fgui = {}));

(function (fgui) {
  var InputTextField = /*#__PURE__*/function (_fgui$TextField) {
    _inherits(InputTextField, _fgui$TextField);

    var _super10 = _createSuper(InputTextField);

    function InputTextField() {
      var _this10;

      _classCallCheck(this, InputTextField);

      _this10 = _super10.call(this);
      _this10._touchDisabled = false;
      _this10.opaque = true;
      _this10.isInput = true;
      _this10._text2 = '';
      _this10.maxLength = 0;
      _this10.editable = true;
      _this10._borderColor = new fgui.Color4();
      _this10._backgroundColor = new fgui.Color4(0xFFFFFF, 0);

      _this10.on(fgui.TextEvent.FocusIn, _this10.__focusIn, _assertThisInitialized(_this10), true);

      _this10.on(fgui.TextEvent.FocusOut, _this10.__focusOut, _assertThisInitialized(_this10), true);

      _this10.on(fgui.StageEvent.RemoveFromStage, _this10.__removed, _assertThisInitialized(_this10));

      return _this10;
    }

    _createClass(InputTextField, [{
      key: "updateText",
      value: function updateText() {
        if (this._editing) this._element.value = this._text2;else if (this._text2.length == 0 && this._promptText) _set(_getPrototypeOf(InputTextField.prototype), "htmlText", this._decodedPromptText, this, true);else if (this._password) _set(_getPrototypeOf(InputTextField.prototype), "text", "*".repeat(this._text2.length), this, true);else _set(_getPrototypeOf(InputTextField.prototype), "text", this._text2, this, true);
      }
    }, {
      key: "onSizeChanged",
      value: function onSizeChanged() {
        _get(_getPrototypeOf(InputTextField.prototype), "onSizeChanged", this).call(this);

        if (!this._clipRect) this._clipRect = new fgui.Rect();

        this._clipRect.copy(this._contentRect);

        this._clipRect.x += fgui.GUTTER_X;
        this._clipRect.y += fgui.GUTTER_Y;
        this._clipRect.width -= fgui.GUTTER_X * 2;
        this._clipRect.height -= fgui.GUTTER_Y * 2;
      }
    }, {
      key: "applyFormat",
      value: function applyFormat() {
        _get(_getPrototypeOf(InputTextField.prototype), "applyFormat", this).call(this);

        if (this._element) this.setFormat();
      }
    }, {
      key: "createElement",
      value: function createElement() {
        var e;

        if (this.singleLine) {
          e = this._element = document.createElement("input");
        } else {
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
        fgui.Stage.domElement.parentNode.appendChild(e);
        this.setFormat();
      }
    }, {
      key: "setFormat",
      value: function setFormat() {
        var e = this._element;
        e.style.font = this._textFormat.size + "px " + this._font.name;
        e.style.color = fgui.convertToHtmlColor(this._textFormat.color);
        e.style.webkitTextStroke = this._textFormat.outline + "px " + fgui.convertToHtmlColor(this._textFormat.outlineColor);
        e.style.textAlign = this._textFormat.align;
      }
    }, {
      key: "dispose",
      value: function dispose() {
        _get(_getPrototypeOf(InputTextField.prototype), "dispose", this).call(this);

        if (this._element) {
          this._element.style.display = 'none';
          if (this._element.parentNode) this._element.parentNode.removeChild(this._element);
          this._element = null;
        }
      }
    }, {
      key: "__focusIn",
      value: function __focusIn() {
        if (!this.editable || this._editing) return;
        if (!this._font) this.applyFormat();
        if (!this._element) this.createElement();
        this.localToGlobal(0, 0, s_v2);
        this.localToGlobal(1, 1, s_v2_2);
        s_v2_2.sub(s_v2);
        var e = this._element;
        e.style.width = this.width.toFixed(2) + "px";
        e.style.height = this.height.toFixed(2) + "px";
        e.style.display = "inline-block";
        e.style.left = s_v2.x + 2 + "px";
        e.style.top = s_v2.y + "px";
        e.style.transform = "scale(" + s_v2_2.x.toFixed(3) + "," + s_v2_2.y.toFixed(3) + ")";
        e.value = this._text2;
        e.focus();
        this._editing = true;
        this._graphics.material.visible = false;
        this.dispatchEvent(fgui.TextEvent.FocusIn);
      }
    }, {
      key: "__focusOut",
      value: function __focusOut() {
        if (!this._editing) return;
        this._element.style.display = "none";

        this._element.blur();

        this._text2 = this._element.value;
        this._editing = false;
        this.updateText();
        this._graphics.material.visible = true;
        if (this.stage) this.dispatchEvent("focus_out");
      }
    }, {
      key: "__removed",
      value: function __removed() {
        if (this._editing) fgui.Stage.setFocus(null);
      }
    }, {
      key: "text",
      get: function get() {
        if (this._editing) this._text2 = this._element.value;
        return this._text2;
      },
      set: function set(value) {
        this._text2 = value;
        this.updateText();
      }
    }, {
      key: "promptText",
      get: function get() {
        return this._promptText;
      },
      set: function set(value) {
        this._promptText = value;
        this._decodedPromptText = fgui.defaultParser.parse(value);
        this.updateText();
      }
    }, {
      key: "password",
      get: function get() {
        return this._password;
      },
      set: function set(value) {
        this._password = value;
      }
    }]);

    return InputTextField;
  }(fgui.TextField);

  fgui.InputTextField = InputTextField;
  var s_v2 = new THREE.Vector2();
  var s_v2_2 = new THREE.Vector2();
})(fgui || (fgui = {}));

(function (fgui) {
  var RichTextField = /*#__PURE__*/function (_fgui$TextField2) {
    _inherits(RichTextField, _fgui$TextField2);

    var _super11 = _createSuper(RichTextField);

    function RichTextField() {
      var _this11;

      _classCallCheck(this, RichTextField);

      _this11 = _super11.call(this);
      _this11._touchDisabled = false;
      _this11.opaque = true;
      _this11.isRich = true;
      _this11.htmlPageContext = fgui.defaultContext;
      _this11.htmlParseOptions = new fgui.HtmlParseOptions();
      return _this11;
    }

    _createClass(RichTextField, [{
      key: "getHtmlElement",
      value: function getHtmlElement(name) {
        var elements = this.htmlElements;
        var count = elements.length;

        for (var i = 0; i < count; i++) {
          var element = elements[i];
          if (name == element.name) return element;
        }

        return null;
      }
    }, {
      key: "showHtmlObject",
      value: function showHtmlObject(index, show) {
        var element = this.htmlElements[index];

        if (element.htmlObject && element.type != fgui.HtmlElementType.Link) {
          if (show) element.status &= 253;else element.status |= 2;

          if ((element.status & 3) == 0) {
            if ((element.status & 4) == 0) {
              element.status |= 4;
              element.htmlObject.add();
            }
          } else {
            if ((element.status & 4) != 0) {
              element.status &= 251;
              element.htmlObject.remove();
            }
          }
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this.cleanupObjects();

        _get(_getPrototypeOf(RichTextField.prototype), "dispose", this).call(this);
      }
    }, {
      key: "cleanupObjects",
      value: function cleanupObjects() {
        var elements = this.htmlElements;
        var count = elements.length;

        for (var i = 0; i < count; i++) {
          var element = elements[i];

          if (element.htmlObject) {
            element.htmlObject.remove();
            this.htmlPageContext.freeObject(element.htmlObject);
          }
        }
      }
    }, {
      key: "refreshObjects",
      value: function refreshObjects() {
        var elements = this.htmlElements;
        var count = elements.length;

        for (var i = 0; i < count; i++) {
          var element = elements[i];

          if (element.htmlObject) {
            if ((element.status & 3) == 0) {
              if ((element.status & 4) == 0) {
                element.status |= 4;
                element.htmlObject.add();
              }
            } else {
              if ((element.status & 4) != 0) {
                element.status &= 251;
                element.htmlObject.remove();
              }
            }
          }
        }
      }
    }]);

    return RichTextField;
  }(fgui.TextField);

  fgui.RichTextField = RichTextField;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_rect = new fgui.Rect();

  var SelectionShape = /*#__PURE__*/function (_fgui$DisplayObject4) {
    _inherits(SelectionShape, _fgui$DisplayObject4);

    var _super12 = _createSuper(SelectionShape);

    function SelectionShape() {
      var _this12;

      _classCallCheck(this, SelectionShape);

      _this12 = _super12.call(this);
      _this12.rects = new Array();
      _this12._graphics = new fgui.NGraphics(_this12._obj3D);
      _this12._graphics.texture = fgui.EmptyTexture;
      return _this12;
    }

    _createClass(SelectionShape, [{
      key: "refresh",
      value: function refresh() {
        var count = this.rects.length;

        if (count > 0) {
          s_rect.copy(this.rects[0]);

          for (var i = 1; i < count; i++) {
            s_rect.union(this.rects[i]);
          }

          this.setSize(s_rect.xMax, s_rect.yMax);
        } else this.setSize(0, 0);

        this.graphics.setMeshDirty();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.rects.length = 0;
        this.graphics.setMeshDirty();
      }
    }, {
      key: "onPopulateMesh",
      value: function onPopulateMesh(vb) {
        var count = this.rects.length;
        if (count == 0) return;

        for (var i = 0; i < count; i++) {
          vb.addQuad(this.rects[i]);
        }

        vb.addTriangles();
      }
    }, {
      key: "hitTest",
      value: function hitTest(context) {
        var pt = context.getLocal(this);

        if (this._contentRect.contains(pt)) {
          var count = this.rects.length;

          for (var i = 0; i < count; i++) {
            if (this.rects[i].contains(pt)) return this;
          }
        }

        return null;
      }
    }]);

    return SelectionShape;
  }(fgui.DisplayObject);

  fgui.SelectionShape = SelectionShape;
})(fgui || (fgui = {}));

(function (fgui) {
  var TextFormat = /*#__PURE__*/function () {
    function TextFormat() {
      _classCallCheck(this, TextFormat);

      this.size = 0;
      this.color = 0;
      this.lineSpacing = 0;
      this.letterSpacing = 0;
      this.outline = 0;
      this.outlineColor = 0;
      this.shadowOffset = new THREE.Vector2();
      this.shadowColor = 0;
    }

    _createClass(TextFormat, [{
      key: "copy",
      value: function copy(source) {
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
      }
    }, {
      key: "equalStyle",
      value: function equalStyle(aFormat) {
        return this.size == aFormat.size && this.color == aFormat.color && this.bold == aFormat.bold && this.underline == aFormat.underline && this.italic == aFormat.italic && this.strikethrough == aFormat.strikethrough && this.align == aFormat.align;
      }
    }]);

    return TextFormat;
  }();

  fgui.TextFormat = TextFormat;
})(fgui || (fgui = {}));

(function (fgui) {
  fgui.lastInput = {
    x: 0,
    y: 0,
    mouseWheelDelta: 0,
    touchId: 0,
    button: 0,
    clickCount: 0,
    holdTime: 0
  };

  var Event = /*#__PURE__*/function () {
    function Event() {
      _classCallCheck(this, Event);

      this.data = null;
      this._callChain = [];
    }

    _createClass(Event, [{
      key: "stopPropagation",
      value: function stopPropagation() {
        this._stopsPropagation = true;
      }
    }, {
      key: "preventDefault",
      value: function preventDefault() {
        this._defaultPrevented = true;
      }
    }, {
      key: "captureTouch",
      value: function captureTouch() {
        this._touchCapture = true;
      }
    }, {
      key: "type",
      get: function get() {
        return this._type;
      }
    }, {
      key: "sender",
      get: function get() {
        return this._sender;
      }
    }, {
      key: "initiator",
      get: function get() {
        return this._initiator;
      }
    }, {
      key: "input",
      get: function get() {
        return fgui.lastInput;
      }
    }, {
      key: "isDefaultPrevented",
      get: function get() {
        return this._defaultPrevented;
      }
    }]);

    return Event;
  }();

  fgui.Event = Event;
  fgui.EventPool = new fgui.Pool(Event, function (obj) {
    obj._stopsPropagation = false;
    obj._defaultPrevented = false;
    obj._touchCapture = false;
  }, function (obj) {
    obj.data = null;
  });
})(fgui || (fgui = {}));

(function (fgui) {
  var DisplayObjectEvent;

  (function (DisplayObjectEvent) {
    DisplayObjectEvent["XY_CHANGED"] = "pos_changed";
    DisplayObjectEvent["SIZE_CHANGED"] = "size_changed";
    DisplayObjectEvent["MOUSE_WHEEL"] = "mouse_wheel";
  })(DisplayObjectEvent = fgui.DisplayObjectEvent || (fgui.DisplayObjectEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var DragEvent;

  (function (DragEvent) {
    DragEvent["START"] = "drag_start";
    DragEvent["END"] = "drag_end";
    DragEvent["MOVING"] = "drag_move";
    DragEvent["DROP"] = "drop";
    DragEvent["CANCEL"] = "drag_cancel";
  })(DragEvent = fgui.DragEvent || (fgui.DragEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var FocusEvent;

  (function (FocusEvent) {
    FocusEvent["CHANGED"] = "focus_changed";
  })(FocusEvent = fgui.FocusEvent || (fgui.FocusEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var GearEvent;

  (function (GearEvent) {
    GearEvent["GEAR_STOP"] = "gear_stop";
  })(GearEvent = fgui.GearEvent || (fgui.GearEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var InteractiveEvents = function InteractiveEvents() {
    _classCallCheck(this, InteractiveEvents);
  };

  InteractiveEvents.Down = "touch_begin";
  InteractiveEvents.Up = "touch_end";
  InteractiveEvents.Click = "click";
  InteractiveEvents.Move = "touch_move";
  InteractiveEvents.RightDown = "rightdown";
  InteractiveEvents.RightUp = "rightup";
  InteractiveEvents.RightClick = "right_click";
  fgui.InteractiveEvents = InteractiveEvents;
})(fgui || (fgui = {}));

(function (fgui) {
  var ListEvent;

  (function (ListEvent) {
    ListEvent["ItemClick"] = "click_item";
  })(ListEvent = fgui.ListEvent || (fgui.ListEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var PlayEvent;

  (function (PlayEvent) {
    PlayEvent["PlayEnd"] = "play_end";
  })(PlayEvent = fgui.PlayEvent || (fgui.PlayEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var RollEvent;

  (function (RollEvent) {
    RollEvent["RollOut"] = "roll_out";
    RollEvent["RollOver"] = "roll_over";
  })(RollEvent = fgui.RollEvent || (fgui.RollEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var ScrollEvent;

  (function (ScrollEvent) {
    ScrollEvent["SCROLL"] = "scroll";
    ScrollEvent["SCROLL_END"] = "scroll_end";
    ScrollEvent["PULL_DOWN_RELEASE"] = "pull_down_release";
    ScrollEvent["PULL_UP_RELEASE"] = "pull_up_release";
  })(ScrollEvent = fgui.ScrollEvent || (fgui.ScrollEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var StageEvent;

  (function (StageEvent) {
    StageEvent["AddtoStage"] = "added_to_stage";
    StageEvent["RemoveFromStage"] = "removed_from_stage";
    StageEvent["ContentScaleChanged"] = "content_scale_factor_changed";
  })(StageEvent = fgui.StageEvent || (fgui.StageEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var StateChangeEvent;

  (function (StateChangeEvent) {
    StateChangeEvent["CHANGED"] = "status_changed";
  })(StateChangeEvent = fgui.StateChangeEvent || (fgui.StateChangeEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var TextEvent;

  (function (TextEvent) {
    TextEvent["LinkClick"] = "click_link";
    TextEvent["Change"] = "textChange";
    TextEvent["FocusIn"] = "FocusIn";
    TextEvent["FocusOut"] = "FocusOut";
  })(TextEvent = fgui.TextEvent || (fgui.TextEvent = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var GearBase = /*#__PURE__*/function () {
    function GearBase() {
      _classCallCheck(this, GearBase);
    }

    _createClass(GearBase, [{
      key: "dispose",
      value: function dispose() {
        if (this._tweenConfig && this._tweenConfig._tweener) {
          this._tweenConfig._tweener.kill();

          this._tweenConfig._tweener = null;
        }
      }
    }, {
      key: "setup",
      value: function setup(buffer) {
        this._controller = this._owner.parent.getControllerAt(buffer.readShort());
        this.init();
        var i;
        var page;
        var cnt = buffer.readShort();

        if ("pages" in this) {
          this.pages = buffer.readSArray(cnt);
        } else {
          for (i = 0; i < cnt; i++) {
            page = buffer.readS();
            if (page == null) continue;
            this.addStatus(page, buffer);
          }

          if (buffer.readBool()) this.addStatus(null, buffer);
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
                if (page == null) continue;
                this.addExtStatus(page, buffer);
              }

              if (buffer.readBool()) this.addExtStatus(null, buffer);
            }
          } else if ("condition" in this) this.condition = buffer.readByte();
        }
      }
    }, {
      key: "updateFromRelations",
      value: function updateFromRelations(dx, dy) {}
    }, {
      key: "addStatus",
      value: function addStatus(pageId, buffer) {}
    }, {
      key: "init",
      value: function init() {}
    }, {
      key: "apply",
      value: function apply() {}
    }, {
      key: "updateState",
      value: function updateState() {}
    }, {
      key: "controller",
      get: function get() {
        return this._controller;
      },
      set: function set(val) {
        if (val != this._controller) {
          this._controller = val;
          if (this._controller) this.init();
        }
      }
    }, {
      key: "tweenConfig",
      get: function get() {
        if (!this._tweenConfig) this._tweenConfig = new GearTweenConfig();
        return this._tweenConfig;
      }
    }, {
      key: "allowTween",
      get: function get() {
        return this._tweenConfig && this._tweenConfig.tween && fgui.constructingDepth.n == 0 && !GearBase.disableAllTweenEffect;
      }
    }]);

    return GearBase;
  }();

  fgui.GearBase = GearBase;

  var GearTweenConfig = function GearTweenConfig() {
    _classCallCheck(this, GearTweenConfig);

    this.tween = true;
    this.easeType = fgui.EaseType.QuadOut;
    this.duration = 0.3;
    this.delay = 0;
  };

  fgui.GearTweenConfig = GearTweenConfig;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearAnimation = /*#__PURE__*/function (_fgui$GearBase) {
    _inherits(GearAnimation, _fgui$GearBase);

    var _super13 = _createSuper(GearAnimation);

    function GearAnimation() {
      _classCallCheck(this, GearAnimation);

      return _super13.apply(this, arguments);
    }

    _createClass(GearAnimation, [{
      key: "init",
      value: function init() {
        this._default = {
          playing: this._owner.getProp(fgui.ObjectPropID.Playing),
          frame: this._owner.getProp(fgui.ObjectPropID.Frame)
        };
        this._storage = {};
      }
    }, {
      key: "addStatus",
      value: function addStatus(pageId, buffer) {
        var gv;
        if (!pageId) gv = this._default;else {
          gv = {};
          this._storage[pageId] = gv;
        }
        gv.playing = buffer.readBool();
        gv.frame = buffer.readInt();
      }
    }, {
      key: "apply",
      value: function apply() {
        this._owner._gearLocked = true;
        var gv = this._storage[this._controller.selectedPageId] || this._default;

        this._owner.setProp(fgui.ObjectPropID.Playing, gv.playing);

        this._owner.setProp(fgui.ObjectPropID.Frame, gv.frame);

        this._owner._gearLocked = false;
      }
    }, {
      key: "updateState",
      value: function updateState() {
        var gv = this._storage[this._controller.selectedPageId];

        if (!gv) {
          gv = {};
          this._storage[this._controller.selectedPageId] = gv;
        }

        gv.playing = this._owner.getProp(fgui.ObjectPropID.Playing);
        gv.frame = this._owner.getProp(fgui.ObjectPropID.Frame);
      }
    }]);

    return GearAnimation;
  }(fgui.GearBase);

  fgui.GearAnimation = GearAnimation;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearColor = /*#__PURE__*/function (_fgui$GearBase2) {
    _inherits(GearColor, _fgui$GearBase2);

    var _super14 = _createSuper(GearColor);

    function GearColor() {
      _classCallCheck(this, GearColor);

      return _super14.apply(this, arguments);
    }

    _createClass(GearColor, [{
      key: "init",
      value: function init() {
        this._default = {
          color: this._owner.getProp(fgui.ObjectPropID.Color),
          strokeColor: this._owner.getProp(fgui.ObjectPropID.OutlineColor)
        };
        this._storage = {};
      }
    }, {
      key: "addStatus",
      value: function addStatus(pageId, buffer) {
        var gv;
        if (!pageId) gv = this._default;else {
          gv = {};
          this._storage[pageId] = gv;
        }
        gv.color = buffer.readColor();
        gv.strokeColor = buffer.readColor();
      }
    }, {
      key: "apply",
      value: function apply() {
        this._owner._gearLocked = true;
        var gv = this._storage[this._controller.selectedPageId] || this._default;

        this._owner.setProp(fgui.ObjectPropID.Color, gv.color);

        this._owner.setProp(fgui.ObjectPropID.OutlineColor, gv.strokeColor);

        this._owner._gearLocked = false;
      }
    }, {
      key: "updateState",
      value: function updateState() {
        var gv = this._storage[this._controller.selectedPageId];

        if (!gv) {
          gv = {};
          this._storage[this._controller.selectedPageId] = gv;
        }

        gv.color = this._owner.getProp(fgui.ObjectPropID.Color);
        gv.strokeColor = this._owner.getProp(fgui.ObjectPropID.OutlineColor);
      }
    }]);

    return GearColor;
  }(fgui.GearBase);

  fgui.GearColor = GearColor;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearDisplay = /*#__PURE__*/function (_fgui$GearBase3) {
    _inherits(GearDisplay, _fgui$GearBase3);

    var _super15 = _createSuper(GearDisplay);

    function GearDisplay() {
      var _this13;

      _classCallCheck(this, GearDisplay);

      _this13 = _super15.apply(this, arguments);
      _this13._visible = 0;
      _this13._displayLockToken = 1;
      return _this13;
    }

    _createClass(GearDisplay, [{
      key: "init",
      value: function init() {
        this.pages = null;
      }
    }, {
      key: "addLock",
      value: function addLock() {
        this._visible++;
        return this._displayLockToken;
      }
    }, {
      key: "releaseLock",
      value: function releaseLock(token) {
        if (token == this._displayLockToken) this._visible--;
      }
    }, {
      key: "apply",
      value: function apply() {
        this._displayLockToken++;
        if (this._displayLockToken <= 0) this._displayLockToken = 1;
        if (this.pages == null || this.pages.length == 0 || this.pages.indexOf(this._controller.selectedPageId) != -1) this._visible = 1;else this._visible = 0;
      }
    }, {
      key: "connected",
      get: function get() {
        return this._controller == null || this._visible > 0;
      }
    }]);

    return GearDisplay;
  }(fgui.GearBase);

  fgui.GearDisplay = GearDisplay;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearDisplay2 = /*#__PURE__*/function (_fgui$GearBase4) {
    _inherits(GearDisplay2, _fgui$GearBase4);

    var _super16 = _createSuper(GearDisplay2);

    function GearDisplay2() {
      var _this14;

      _classCallCheck(this, GearDisplay2);

      _this14 = _super16.apply(this, arguments);
      _this14._visible = 0;
      return _this14;
    }

    _createClass(GearDisplay2, [{
      key: "init",
      value: function init() {
        this.pages = null;
      }
    }, {
      key: "apply",
      value: function apply() {
        if (this.pages == null || this.pages.length == 0 || this.pages.indexOf(this._controller.selectedPageId) != -1) this._visible = 1;else this._visible = 0;
      }
    }, {
      key: "evaluate",
      value: function evaluate(connected) {
        var v = this._controller == null || this._visible > 0;
        if (this.condition == 0) v = v && connected;else v = v || connected;
        return v;
      }
    }]);

    return GearDisplay2;
  }(fgui.GearBase);

  fgui.GearDisplay2 = GearDisplay2;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearFontSize = /*#__PURE__*/function (_fgui$GearBase5) {
    _inherits(GearFontSize, _fgui$GearBase5);

    var _super17 = _createSuper(GearFontSize);

    function GearFontSize() {
      var _this15;

      _classCallCheck(this, GearFontSize);

      _this15 = _super17.apply(this, arguments);
      _this15._default = 0;
      return _this15;
    }

    _createClass(GearFontSize, [{
      key: "init",
      value: function init() {
        this._default = this._owner.getProp(fgui.ObjectPropID.FontSize);
        this._storage = {};
      }
    }, {
      key: "addStatus",
      value: function addStatus(pageId, buffer) {
        if (!pageId) this._default = buffer.readInt();else this._storage[pageId] = buffer.readInt();
      }
    }, {
      key: "apply",
      value: function apply() {
        this._owner._gearLocked = true;
        var data = this._storage[this._controller.selectedPageId];
        if (data !== undefined) this._owner.setProp(fgui.ObjectPropID.FontSize, data);else this._owner.setProp(fgui.ObjectPropID.FontSize, this._default);
        this._owner._gearLocked = false;
      }
    }, {
      key: "updateState",
      value: function updateState() {
        this._storage[this._controller.selectedPageId] = this._owner.getProp(fgui.ObjectPropID.FontSize);
      }
    }]);

    return GearFontSize;
  }(fgui.GearBase);

  fgui.GearFontSize = GearFontSize;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearIcon = /*#__PURE__*/function (_fgui$GearBase6) {
    _inherits(GearIcon, _fgui$GearBase6);

    var _super18 = _createSuper(GearIcon);

    function GearIcon() {
      _classCallCheck(this, GearIcon);

      return _super18.apply(this, arguments);
    }

    _createClass(GearIcon, [{
      key: "init",
      value: function init() {
        this._default = this._owner.icon;
        this._storage = {};
      }
    }, {
      key: "addStatus",
      value: function addStatus(pageId, buffer) {
        if (!pageId) this._default = buffer.readS();else this._storage[pageId] = buffer.readS();
      }
    }, {
      key: "apply",
      value: function apply() {
        this._owner._gearLocked = true;
        var data = this._storage[this._controller.selectedPageId];
        if (data !== undefined) this._owner.icon = data;else this._owner.icon = this._default;
        this._owner._gearLocked = false;
      }
    }, {
      key: "updateState",
      value: function updateState() {
        this._storage[this._controller.selectedPageId] = this._owner.icon;
      }
    }]);

    return GearIcon;
  }(fgui.GearBase);

  fgui.GearIcon = GearIcon;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearLook = /*#__PURE__*/function (_fgui$GearBase7) {
    _inherits(GearLook, _fgui$GearBase7);

    var _super19 = _createSuper(GearLook);

    function GearLook() {
      _classCallCheck(this, GearLook);

      return _super19.apply(this, arguments);
    }

    _createClass(GearLook, [{
      key: "init",
      value: function init() {
        this._default = {
          alpha: this._owner.alpha,
          rotation: this._owner.rotation,
          grayed: this._owner.grayed,
          touchable: this._owner.touchable
        };
        this._storage = {};
      }
    }, {
      key: "addStatus",
      value: function addStatus(pageId, buffer) {
        var gv;
        if (!pageId) gv = this._default;else {
          gv = {};
          this._storage[pageId] = gv;
        }
        gv.alpha = buffer.readFloat();
        gv.rotation = buffer.readFloat();
        gv.grayed = buffer.readBool();
        gv.touchable = buffer.readBool();
      }
    }, {
      key: "apply",
      value: function apply() {
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
            } else return;
          }

          var a = gv.alpha != this._owner.alpha;
          var b = gv.rotation != this._owner.rotation;

          if (a || b) {
            if (this._owner.checkGearController(0, this._controller)) this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
            this._tweenConfig._tweener = fgui.GTween.to2(this._owner.alpha, this._owner.rotation, gv.alpha, gv.rotation, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setUserData((a ? 1 : 0) + (b ? 2 : 0)).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this);
          }
        } else {
          this._owner._gearLocked = true;
          this._owner.grayed = gv.grayed;
          this._owner.alpha = gv.alpha;
          this._owner.rotation = gv.rotation;
          this._owner.touchable = gv.touchable;
          this._owner._gearLocked = false;
        }
      }
    }, {
      key: "__tweenUpdate",
      value: function __tweenUpdate(tweener) {
        var flag = tweener.userData;
        this._owner._gearLocked = true;
        if ((flag & 1) != 0) this._owner.alpha = tweener.value.x;
        if ((flag & 2) != 0) this._owner.rotation = tweener.value.y;
        this._owner._gearLocked = false;
      }
    }, {
      key: "__tweenComplete",
      value: function __tweenComplete() {
        if (this._tweenConfig._displayLockToken != 0) {
          this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);

          this._tweenConfig._displayLockToken = 0;
        }

        this._tweenConfig._tweener = null;
      }
    }, {
      key: "updateState",
      value: function updateState() {
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
    }]);

    return GearLook;
  }(fgui.GearBase);

  fgui.GearLook = GearLook;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearSize = /*#__PURE__*/function (_fgui$GearBase8) {
    _inherits(GearSize, _fgui$GearBase8);

    var _super20 = _createSuper(GearSize);

    function GearSize() {
      _classCallCheck(this, GearSize);

      return _super20.apply(this, arguments);
    }

    _createClass(GearSize, [{
      key: "init",
      value: function init() {
        this._default = {
          width: this._owner.width,
          height: this._owner.height,
          scaleX: this._owner.scaleX,
          scaleY: this._owner.scaleY
        };
        this._storage = {};
      }
    }, {
      key: "addStatus",
      value: function addStatus(pageId, buffer) {
        var gv;
        if (!pageId) gv = this._default;else {
          gv = {};
          this._storage[pageId] = gv;
        }
        gv.width = buffer.readInt();
        gv.height = buffer.readInt();
        gv.scaleX = buffer.readFloat();
        gv.scaleY = buffer.readFloat();
      }
    }, {
      key: "apply",
      value: function apply() {
        var gv = this._storage[this._controller.selectedPageId] || this._default;

        if (this.allowTween) {
          if (this._tweenConfig._tweener) {
            if (this._tweenConfig._tweener.endValue.x != gv.width || this._tweenConfig._tweener.endValue.y != gv.height || this._tweenConfig._tweener.endValue.z != gv.scaleX || this._tweenConfig._tweener.endValue.w != gv.scaleY) {
              this._tweenConfig._tweener.kill(true);

              this._tweenConfig._tweener = null;
            } else return;
          }

          var a = gv.width != this._owner.width || gv.height != this._owner.height;
          var b = gv.scaleX != this._owner.scaleX || gv.scaleY != this._owner.scaleY;

          if (a || b) {
            if (this._owner.checkGearController(0, this._controller)) this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
            this._tweenConfig._tweener = fgui.GTween.to4(this._owner.width, this._owner.height, this._owner.scaleX, this._owner.scaleY, gv.width, gv.height, gv.scaleX, gv.scaleY, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setUserData((a ? 1 : 0) + (b ? 2 : 0)).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this);
          }
        } else {
          this._owner._gearLocked = true;

          this._owner.setSize(gv.width, gv.height, this._owner.checkGearController(1, this._controller));

          this._owner.setScale(gv.scaleX, gv.scaleY);

          this._owner._gearLocked = false;
        }
      }
    }, {
      key: "__tweenUpdate",
      value: function __tweenUpdate(tweener) {
        var flag = tweener.userData;
        this._owner._gearLocked = true;
        if ((flag & 1) != 0) this._owner.setSize(tweener.value.x, tweener.value.y, this._owner.checkGearController(1, this._controller));
        if ((flag & 2) != 0) this._owner.setScale(tweener.value.z, tweener.value.w);
        this._owner._gearLocked = false;
      }
    }, {
      key: "__tweenComplete",
      value: function __tweenComplete() {
        if (this._tweenConfig._displayLockToken != 0) {
          this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);

          this._tweenConfig._displayLockToken = 0;
        }

        this._tweenConfig._tweener = null;
      }
    }, {
      key: "updateState",
      value: function updateState() {
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
    }, {
      key: "updateFromRelations",
      value: function updateFromRelations(dx, dy) {
        if (this._controller == null || this._storage == null) return;

        for (var key in this._storage) {
          var gv = this._storage[key];
          gv.width += dx;
          gv.height += dy;
        }

        this._default.width += dx;
        this._default.height += dy;
        this.updateState();
      }
    }]);

    return GearSize;
  }(fgui.GearBase);

  fgui.GearSize = GearSize;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearText = /*#__PURE__*/function (_fgui$GearBase9) {
    _inherits(GearText, _fgui$GearBase9);

    var _super21 = _createSuper(GearText);

    function GearText() {
      _classCallCheck(this, GearText);

      return _super21.apply(this, arguments);
    }

    _createClass(GearText, [{
      key: "init",
      value: function init() {
        this._default = this._owner.text;
        this._storage = {};
      }
    }, {
      key: "addStatus",
      value: function addStatus(pageId, buffer) {
        if (pageId == null) this._default = buffer.readS();else this._storage[pageId] = buffer.readS();
      }
    }, {
      key: "apply",
      value: function apply() {
        this._owner._gearLocked = true;
        var data = this._storage[this._controller.selectedPageId];
        if (data !== undefined) this._owner.text = data;else this._owner.text = this._default;
        this._owner._gearLocked = false;
      }
    }, {
      key: "updateState",
      value: function updateState() {
        this._storage[this._controller.selectedPageId] = this._owner.text;
      }
    }]);

    return GearText;
  }(fgui.GearBase);

  fgui.GearText = GearText;
})(fgui || (fgui = {}));

(function (fgui) {
  var GearXY = /*#__PURE__*/function (_fgui$GearBase10) {
    _inherits(GearXY, _fgui$GearBase10);

    var _super22 = _createSuper(GearXY);

    function GearXY() {
      _classCallCheck(this, GearXY);

      return _super22.apply(this, arguments);
    }

    _createClass(GearXY, [{
      key: "init",
      value: function init() {
        this._default = {
          x: this._owner.x,
          y: this._owner.y,
          px: this._owner.x / this._owner.parent.width,
          py: this._owner.y / this._owner.parent.height
        };
        this._storage = {};
      }
    }, {
      key: "addStatus",
      value: function addStatus(pageId, buffer) {
        var gv;
        if (!pageId) gv = this._default;else {
          gv = {};
          this._storage[pageId] = gv;
        }
        gv.x = buffer.readInt();
        gv.y = buffer.readInt();
      }
    }, {
      key: "addExtStatus",
      value: function addExtStatus(pageId, buffer) {
        var gv;
        if (!pageId) gv = this._default;else gv = this._storage[pageId];
        gv.px = buffer.readFloat();
        gv.py = buffer.readFloat();
      }
    }, {
      key: "apply",
      value: function apply() {
        var pt = this._storage[this._controller.selectedPageId] || this._default;
        var ex;
        var ey;

        if (this.positionsInPercent && this._owner.parent) {
          ex = pt.px * this._owner.parent.width;
          ey = pt.py * this._owner.parent.height;
        } else {
          ex = pt.x;
          ey = pt.y;
        }

        if (this.allowTween) {
          if (this._tweenConfig._tweener) {
            if (this._tweenConfig._tweener.endValue.x != ex || this._tweenConfig._tweener.endValue.y != ey) {
              this._tweenConfig._tweener.kill(true);

              this._tweenConfig._tweener = null;
            } else return;
          }

          var ox = this._owner.x;
          var oy = this._owner.y;

          if (ox != ex || oy != ey) {
            if (this._owner.checkGearController(0, this._controller)) this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
            this._tweenConfig._tweener = fgui.GTween.to2(ox, oy, ex, ey, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this);
          }
        } else {
          this._owner._gearLocked = true;

          this._owner.setPosition(ex, ey);

          this._owner._gearLocked = false;
        }
      }
    }, {
      key: "__tweenUpdate",
      value: function __tweenUpdate(tweener) {
        this._owner._gearLocked = true;

        this._owner.setPosition(tweener.value.x, tweener.value.y);

        this._owner._gearLocked = false;
      }
    }, {
      key: "__tweenComplete",
      value: function __tweenComplete() {
        if (this._tweenConfig._displayLockToken != 0) {
          this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);

          this._tweenConfig._displayLockToken = 0;
        }

        this._tweenConfig._tweener = null;
      }
    }, {
      key: "updateState",
      value: function updateState() {
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
    }, {
      key: "updateFromRelations",
      value: function updateFromRelations(dx, dy) {
        if (this._controller == null || this._storage == null || this.positionsInPercent) return;

        for (var key in this._storage) {
          var pt = this._storage[key];
          pt.x += dx;
          pt.y += dy;
        }

        this._default.x += dx;
        this._default.y += dy;
        this.updateState();
      }
    }]);

    return GearXY;
  }(fgui.GearBase);

  fgui.GearXY = GearXY;
})(fgui || (fgui = {}));

(function (fgui) {
  var _PiOver2 = Math.PI * 0.5;

  var _TwoPi = Math.PI * 2;

  function evaluateEase(easeType, time, duration, overshootOrAmplitude, period) {
    switch (easeType) {
      case fgui.EaseType.Linear:
        return time / duration;

      case fgui.EaseType.SineIn:
        return -Math.cos(time / duration * _PiOver2) + 1;

      case fgui.EaseType.SineOut:
        return Math.sin(time / duration * _PiOver2);

      case fgui.EaseType.SineInOut:
        return -0.5 * (Math.cos(Math.PI * time / duration) - 1);

      case fgui.EaseType.QuadIn:
        return (time /= duration) * time;

      case fgui.EaseType.QuadOut:
        return -(time /= duration) * (time - 2);

      case fgui.EaseType.QuadInOut:
        if ((time /= duration * 0.5) < 1) return 0.5 * time * time;
        return -0.5 * (--time * (time - 2) - 1);

      case fgui.EaseType.CubicIn:
        return (time /= duration) * time * time;

      case fgui.EaseType.CubicOut:
        return (time = time / duration - 1) * time * time + 1;

      case fgui.EaseType.CubicInOut:
        if ((time /= duration * 0.5) < 1) return 0.5 * time * time * time;
        return 0.5 * ((time -= 2) * time * time + 2);

      case fgui.EaseType.QuartIn:
        return (time /= duration) * time * time * time;

      case fgui.EaseType.QuartOut:
        return -((time = time / duration - 1) * time * time * time - 1);

      case fgui.EaseType.QuartInOut:
        if ((time /= duration * 0.5) < 1) return 0.5 * time * time * time * time;
        return -0.5 * ((time -= 2) * time * time * time - 2);

      case fgui.EaseType.QuintIn:
        return (time /= duration) * time * time * time * time;

      case fgui.EaseType.QuintOut:
        return (time = time / duration - 1) * time * time * time * time + 1;

      case fgui.EaseType.QuintInOut:
        if ((time /= duration * 0.5) < 1) return 0.5 * time * time * time * time * time;
        return 0.5 * ((time -= 2) * time * time * time * time + 2);

      case fgui.EaseType.ExpoIn:
        return time == 0 ? 0 : Math.pow(2, 10 * (time / duration - 1));

      case fgui.EaseType.ExpoOut:
        if (time == duration) return 1;
        return -Math.pow(2, -10 * time / duration) + 1;

      case fgui.EaseType.ExpoInOut:
        if (time == 0) return 0;
        if (time == duration) return 1;
        if ((time /= duration * 0.5) < 1) return 0.5 * Math.pow(2, 10 * (time - 1));
        return 0.5 * (-Math.pow(2, -10 * --time) + 2);

      case fgui.EaseType.CircIn:
        return -(Math.sqrt(1 - (time /= duration) * time) - 1);

      case fgui.EaseType.CircOut:
        return Math.sqrt(1 - (time = time / duration - 1) * time);

      case fgui.EaseType.CircInOut:
        if ((time /= duration * 0.5) < 1) return -0.5 * (Math.sqrt(1 - time * time) - 1);
        return 0.5 * (Math.sqrt(1 - (time -= 2) * time) + 1);

      case fgui.EaseType.ElasticIn:
        var s0;
        if (time == 0) return 0;
        if ((time /= duration) == 1) return 1;
        if (period == 0) period = duration * 0.3;

        if (overshootOrAmplitude < 1) {
          overshootOrAmplitude = 1;
          s0 = period / 4;
        } else s0 = period / _TwoPi * Math.asin(1 / overshootOrAmplitude);

        return -(overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s0) * _TwoPi / period));

      case fgui.EaseType.ElasticOut:
        var s1;
        if (time == 0) return 0;
        if ((time /= duration) == 1) return 1;
        if (period == 0) period = duration * 0.3;

        if (overshootOrAmplitude < 1) {
          overshootOrAmplitude = 1;
          s1 = period / 4;
        } else s1 = period / _TwoPi * Math.asin(1 / overshootOrAmplitude);

        return overshootOrAmplitude * Math.pow(2, -10 * time) * Math.sin((time * duration - s1) * _TwoPi / period) + 1;

      case fgui.EaseType.ElasticInOut:
        var s;
        if (time == 0) return 0;
        if ((time /= duration * 0.5) == 2) return 1;
        if (period == 0) period = duration * (0.3 * 1.5);

        if (overshootOrAmplitude < 1) {
          overshootOrAmplitude = 1;
          s = period / 4;
        } else s = period / _TwoPi * Math.asin(1 / overshootOrAmplitude);

        if (time < 1) return -0.5 * (overshootOrAmplitude * Math.pow(2, 10 * (time -= 1)) * Math.sin((time * duration - s) * _TwoPi / period));
        return overshootOrAmplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - s) * _TwoPi / period) * 0.5 + 1;

      case fgui.EaseType.BackIn:
        return (time /= duration) * time * ((overshootOrAmplitude + 1) * time - overshootOrAmplitude);

      case fgui.EaseType.BackOut:
        return (time = time / duration - 1) * time * ((overshootOrAmplitude + 1) * time + overshootOrAmplitude) + 1;

      case fgui.EaseType.BackInOut:
        if ((time /= duration * 0.5) < 1) return 0.5 * (time * time * (((overshootOrAmplitude *= 1.525) + 1) * time - overshootOrAmplitude));
        return 0.5 * ((time -= 2) * time * (((overshootOrAmplitude *= 1.525) + 1) * time + overshootOrAmplitude) + 2);

      case fgui.EaseType.BounceIn:
        return bounce_easeIn(time, duration);

      case fgui.EaseType.BounceOut:
        return bounce_easeOut(time, duration);

      case fgui.EaseType.BounceInOut:
        return bounce_easeInOut(time, duration);

      default:
        return -(time /= duration) * (time - 2);
    }
  }

  fgui.evaluateEase = evaluateEase;

  function bounce_easeIn(time, duration) {
    return 1 - bounce_easeOut(duration - time, duration);
  }

  function bounce_easeOut(time, duration) {
    if ((time /= duration) < 1 / 2.75) {
      return 7.5625 * time * time;
    }

    if (time < 2 / 2.75) {
      return 7.5625 * (time -= 1.5 / 2.75) * time + 0.75;
    }

    if (time < 2.5 / 2.75) {
      return 7.5625 * (time -= 2.25 / 2.75) * time + 0.9375;
    }

    return 7.5625 * (time -= 2.625 / 2.75) * time + 0.984375;
  }

  function bounce_easeInOut(time, duration) {
    if (time < duration * 0.5) {
      return bounce_easeIn(time * 2, duration) * 0.5;
    }

    return bounce_easeOut(time * 2 - duration, duration) * 0.5 + 0.5;
  }
})(fgui || (fgui = {}));

(function (fgui) {
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
  })(EaseType = fgui.EaseType || (fgui.EaseType = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var GPath = /*#__PURE__*/function () {
    function GPath() {
      _classCallCheck(this, GPath);

      this._segments = new Array();
      this._points = new Array();
    }

    _createClass(GPath, [{
      key: "create2",
      value: function create2(pt1, pt2, pt3, pt4) {
        var points = new Array();
        points.push(pt1);
        points.push(pt2);
        if (pt3) points.push(pt3);
        if (pt4) points.push(pt4);
        this.create(points);
      }
    }, {
      key: "create",
      value: function create(points) {
        this._segments.length = 0;
        this._points.length = 0;
        this._fullLength = 0;
        var cnt = points.length;
        if (cnt == 0) return;
        var splinePoints = [];
        var prev = points[0];
        if (prev.curveType == fgui.CurveType.CRSpline) splinePoints.push(new THREE.Vector2(prev.x, prev.y));

        for (var i = 1; i < cnt; i++) {
          var current = points[i];

          if (prev.curveType != fgui.CurveType.CRSpline) {
            var seg = new Segment();
            seg.type = prev.curveType;
            seg.ptStart = this._points.length;

            if (prev.curveType == fgui.CurveType.Straight) {
              seg.ptCount = 2;

              this._points.push(new THREE.Vector2(prev.x, prev.y));

              this._points.push(new THREE.Vector2(current.x, current.y));
            } else if (prev.curveType == fgui.CurveType.Bezier) {
              seg.ptCount = 3;

              this._points.push(new THREE.Vector2(prev.x, prev.y));

              this._points.push(new THREE.Vector2(current.x, current.y));

              this._points.push(new THREE.Vector2(prev.control1_x, prev.control1_y));
            } else if (prev.curveType == fgui.CurveType.CubicBezier) {
              seg.ptCount = 4;

              this._points.push(new THREE.Vector2(prev.x, prev.y));

              this._points.push(new THREE.Vector2(current.x, current.y));

              this._points.push(new THREE.Vector2(prev.control1_x, prev.control1_y));

              this._points.push(new THREE.Vector2(prev.control2_x, prev.control2_y));
            }

            seg.length = fgui.distance(prev.x, prev.y, current.x, current.y);
            this._fullLength += seg.length;

            this._segments.push(seg);
          }

          if (current.curveType != fgui.CurveType.CRSpline) {
            if (splinePoints.length > 0) {
              splinePoints.push(new THREE.Vector2(current.x, current.y));
              this.createSplineSegment(splinePoints);
            }
          } else splinePoints.push(new THREE.Vector2(current.x, current.y));

          prev = current;
        }

        if (splinePoints.length > 1) this.createSplineSegment(splinePoints);
      }
    }, {
      key: "createSplineSegment",
      value: function createSplineSegment(splinePoints) {
        var cnt = splinePoints.length;
        splinePoints.splice(0, 0, splinePoints[0]);
        splinePoints.push(splinePoints[cnt]);
        splinePoints.push(splinePoints[cnt]);
        cnt += 3;
        var seg = new Segment();
        seg.type = fgui.CurveType.CRSpline;
        seg.ptStart = this._points.length;
        seg.ptCount = cnt;
        this._points = this._points.concat(splinePoints);
        seg.length = 0;

        for (var i = 1; i < cnt; i++) {
          seg.length += fgui.distance(splinePoints[i - 1].x, splinePoints[i - 1].y, splinePoints[i].x, splinePoints[i].y);
        }

        this._fullLength += seg.length;

        this._segments.push(seg);

        splinePoints.length = 0;
      }
    }, {
      key: "clear",
      value: function clear() {
        this._segments.length = 0;
        this._points.length = 0;
      }
    }, {
      key: "getPointAt",
      value: function getPointAt(t, result) {
        if (!result) result = new THREE.Vector2();else result.set(0, 0);
        t = fgui.clamp01(t);
        var cnt = this._segments.length;

        if (cnt == 0) {
          return result;
        }

        var seg;

        if (t == 1) {
          seg = this._segments[cnt - 1];

          if (seg.type == fgui.CurveType.Straight) {
            result.x = fgui.lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t);
            result.y = fgui.lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t);
            return result;
          } else if (seg.type == fgui.CurveType.Bezier || seg.type == fgui.CurveType.CubicBezier) return this.onBezierCurve(seg.ptStart, seg.ptCount, t, result);else return this.onCRSplineCurve(seg.ptStart, seg.ptCount, t, result);
        }

        var len = t * this._fullLength;

        for (var i = 0; i < cnt; i++) {
          seg = this._segments[i];
          len -= seg.length;

          if (len < 0) {
            t = 1 + len / seg.length;

            if (seg.type == fgui.CurveType.Straight) {
              result.x = fgui.lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t);
              result.y = fgui.lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t);
            } else if (seg.type == fgui.CurveType.Bezier || seg.type == fgui.CurveType.CubicBezier) result = this.onBezierCurve(seg.ptStart, seg.ptCount, t, result);else result = this.onCRSplineCurve(seg.ptStart, seg.ptCount, t, result);

            break;
          }
        }

        return result;
      }
    }, {
      key: "getAnchorsInSegment",
      value: function getAnchorsInSegment(segmentIndex, points) {
        if (points == null) points = new Array();
        var seg = this._segments[segmentIndex];

        for (var i = 0; i < seg.ptCount; i++) {
          points.push(new THREE.Vector2(this._points[seg.ptStart + i].x, this._points[seg.ptStart + i].y));
        }

        return points;
      }
    }, {
      key: "getPointsInSegment",
      value: function getPointsInSegment(segmentIndex, t0, t1, points, ts, pointDensity) {
        if (points == null) points = new Array();
        if (!pointDensity || isNaN(pointDensity)) pointDensity = 0.1;
        if (ts) ts.push(t0);
        var seg = this._segments[segmentIndex];

        if (seg.type == fgui.CurveType.Straight) {
          points.push(new THREE.Vector2(fgui.lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t0), fgui.lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t0)));
          points.push(new THREE.Vector2(fgui.lerp(this._points[seg.ptStart].x, this._points[seg.ptStart + 1].x, t1), fgui.lerp(this._points[seg.ptStart].y, this._points[seg.ptStart + 1].y, t1)));
        } else {
          var func;
          if (seg.type == fgui.CurveType.Bezier || seg.type == fgui.CurveType.CubicBezier) func = this.onBezierCurve;else func = this.onCRSplineCurve;
          points.push(func.call(this, seg.ptStart, seg.ptCount, t0, new THREE.Vector2()));
          var SmoothAmount = Math.min(seg.length * pointDensity, 50);

          for (var j = 0; j <= SmoothAmount; j++) {
            var t = j / SmoothAmount;

            if (t > t0 && t < t1) {
              points.push(func.call(this, seg.ptStart, seg.ptCount, t, new THREE.Vector2()));
              if (ts) ts.push(t);
            }
          }

          points.push(func.call(this, seg.ptStart, seg.ptCount, t1, new THREE.Vector2()));
        }

        if (ts) ts.push(t1);
        return points;
      }
    }, {
      key: "getAllPoints",
      value: function getAllPoints(points, ts, pointDensity) {
        if (points == null) points = new Array();
        if (!pointDensity || isNaN(pointDensity)) pointDensity = 0.1;
        var cnt = this._segments.length;

        for (var i = 0; i < cnt; i++) {
          this.getPointsInSegment(i, 0, 1, points, ts, pointDensity);
        }

        return points;
      }
    }, {
      key: "onCRSplineCurve",
      value: function onCRSplineCurve(ptStart, ptCount, t, result) {
        var adjustedIndex = Math.floor(t * (ptCount - 4)) + ptStart;
        var p0x = this._points[adjustedIndex].x;
        var p0y = this._points[adjustedIndex].y;
        var p1x = this._points[adjustedIndex + 1].x;
        var p1y = this._points[adjustedIndex + 1].y;
        var p2x = this._points[adjustedIndex + 2].x;
        var p2y = this._points[adjustedIndex + 2].y;
        var p3x = this._points[adjustedIndex + 3].x;
        var p3y = this._points[adjustedIndex + 3].y;
        var adjustedT = t == 1 ? 1 : fgui.repeat(t * (ptCount - 4), 1);
        var t0 = ((-adjustedT + 2) * adjustedT - 1) * adjustedT * 0.5;
        var t1 = ((3 * adjustedT - 5) * adjustedT * adjustedT + 2) * 0.5;
        var t2 = ((-3 * adjustedT + 4) * adjustedT + 1) * adjustedT * 0.5;
        var t3 = (adjustedT - 1) * adjustedT * adjustedT * 0.5;
        result.x = p0x * t0 + p1x * t1 + p2x * t2 + p3x * t3;
        result.y = p0y * t0 + p1y * t1 + p2y * t2 + p3y * t3;
        return result;
      }
    }, {
      key: "onBezierCurve",
      value: function onBezierCurve(ptStart, ptCount, t, result) {
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
        } else {
          result.x = t2 * t2 * p0x + 2 * t2 * t * cp0x + t * t * p1x;
          result.y = t2 * t2 * p0y + 2 * t2 * t * cp0y + t * t * p1y;
        }

        return result;
      }
    }, {
      key: "length",
      get: function get() {
        return this._fullLength;
      }
    }, {
      key: "segmentCount",
      get: function get() {
        return this._segments.length;
      }
    }]);

    return GPath;
  }();

  fgui.GPath = GPath;

  var Segment = function Segment() {
    _classCallCheck(this, Segment);
  };
})(fgui || (fgui = {}));

(function (fgui) {
  var CurveType;

  (function (CurveType) {
    CurveType[CurveType["CRSpline"] = 0] = "CRSpline";
    CurveType[CurveType["Bezier"] = 1] = "Bezier";
    CurveType[CurveType["CubicBezier"] = 2] = "CubicBezier";
    CurveType[CurveType["Straight"] = 3] = "Straight";
  })(CurveType = fgui.CurveType || (fgui.CurveType = {}));

  var GPathPoint = /*#__PURE__*/function () {
    function GPathPoint() {
      _classCallCheck(this, GPathPoint);

      this.x = 0;
      this.y = 0;
      this.control1_x = 0;
      this.control1_y = 0;
      this.control2_x = 0;
      this.control2_y = 0;
      this.curveType = 0;
    }

    _createClass(GPathPoint, [{
      key: "clone",
      value: function clone() {
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
    }], [{
      key: "newPoint",
      value: function newPoint(x, y, curveType) {
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
    }, {
      key: "newBezierPoint",
      value: function newBezierPoint(x, y, control1_x, control1_y) {
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
    }, {
      key: "newCubicBezierPoint",
      value: function newCubicBezierPoint(x, y, control1_x, control1_y, control2_x, control2_y) {
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
    }]);

    return GPathPoint;
  }();

  fgui.GPathPoint = GPathPoint;
})(fgui || (fgui = {}));

(function (fgui) {
  var GTween = /*#__PURE__*/function () {
    function GTween() {
      _classCallCheck(this, GTween);
    }

    _createClass(GTween, null, [{
      key: "to",
      value: function to(start, end, duration) {
        return fgui.TweenManager.createTween()._to(start, end, duration);
      }
    }, {
      key: "to2",
      value: function to2(start, start2, end, end2, duration) {
        return fgui.TweenManager.createTween()._to2(start, start2, end, end2, duration);
      }
    }, {
      key: "to3",
      value: function to3(start, start2, start3, end, end2, end3, duration) {
        return fgui.TweenManager.createTween()._to3(start, start2, start3, end, end2, end3, duration);
      }
    }, {
      key: "to4",
      value: function to4(start, start2, start3, start4, end, end2, end3, end4, duration) {
        return fgui.TweenManager.createTween()._to4(start, start2, start3, start4, end, end2, end3, end4, duration);
      }
    }, {
      key: "toColor",
      value: function toColor(start, end, duration) {
        return fgui.TweenManager.createTween()._toColor(start, end, duration);
      }
    }, {
      key: "delayedCall",
      value: function delayedCall(delay) {
        return fgui.TweenManager.createTween().setDelay(delay);
      }
    }, {
      key: "shake",
      value: function shake(startX, startY, amplitude, duration) {
        return fgui.TweenManager.createTween()._shake(startX, startY, amplitude, duration);
      }
    }, {
      key: "isTweening",
      value: function isTweening(target, propType) {
        return fgui.TweenManager.isTweening(target, propType);
      }
    }, {
      key: "kill",
      value: function kill(target, complete, propType) {
        fgui.TweenManager.killTweens(target, complete, propType);
      }
    }, {
      key: "getTween",
      value: function getTween(target, propType) {
        return fgui.TweenManager.getTween(target, propType);
      }
    }]);

    return GTween;
  }();

  GTween.catchCallbackExceptions = true;
  fgui.GTween = GTween;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_vec2 = new THREE.Vector2();

  var GTweener = /*#__PURE__*/function () {
    function GTweener() {
      _classCallCheck(this, GTweener);

      this._startValue = new fgui.TweenValue();
      this._endValue = new fgui.TweenValue();
      this._value = new fgui.TweenValue();
      this._deltaValue = new fgui.TweenValue();

      this._reset();
    }

    _createClass(GTweener, [{
      key: "setDelay",
      value: function setDelay(value) {
        this._delay = value;
        return this;
      }
    }, {
      key: "setDuration",
      value: function setDuration(value) {
        this._duration = value;
        return this;
      }
    }, {
      key: "setBreakpoint",
      value: function setBreakpoint(value) {
        this._breakpoint = value;
        return this;
      }
    }, {
      key: "setEase",
      value: function setEase(value) {
        this._easeType = value;
        return this;
      }
    }, {
      key: "setEasePeriod",
      value: function setEasePeriod(value) {
        this._easePeriod = value;
        return this;
      }
    }, {
      key: "setEaseOvershootOrAmplitude",
      value: function setEaseOvershootOrAmplitude(value) {
        this._easeOvershootOrAmplitude = value;
        return this;
      }
    }, {
      key: "setRepeat",
      value: function setRepeat(repeat, yoyo) {
        this._repeat = repeat;
        this._yoyo = yoyo;
        return this;
      }
    }, {
      key: "setTimeScale",
      value: function setTimeScale(value) {
        this._timeScale = value;
        return this;
      }
    }, {
      key: "setSnapping",
      value: function setSnapping(value) {
        this._snapping = value;
        return this;
      }
    }, {
      key: "setTarget",
      value: function setTarget(value, propType) {
        this._target = value;
        this._propType = propType;
        return this;
      }
    }, {
      key: "setPath",
      value: function setPath(value) {
        this._path = value;
        return this;
      }
    }, {
      key: "setUserData",
      value: function setUserData(value) {
        this._userData = value;
        return this;
      }
    }, {
      key: "onUpdate",
      value: function onUpdate(callback, caller) {
        this._onUpdate = callback;
        this._onUpdateCaller = caller;
        return this;
      }
    }, {
      key: "onStart",
      value: function onStart(callback, caller) {
        this._onStart = callback;
        this._onStartCaller = caller;
        return this;
      }
    }, {
      key: "onComplete",
      value: function onComplete(callback, caller) {
        this._onComplete = callback;
        this._onCompleteCaller = caller;
        return this;
      }
    }, {
      key: "setPaused",
      value: function setPaused(paused) {
        this._paused = paused;
        return this;
      }
    }, {
      key: "seek",
      value: function seek(time) {
        if (this._killed) return;
        this._elapsedTime = time;

        if (this._elapsedTime < this._delay) {
          if (this._started) this._elapsedTime = this._delay;else return;
        }

        this.update();
      }
    }, {
      key: "kill",
      value: function kill(complete) {
        if (this._killed) return;

        if (complete) {
          if (this._ended == 0) {
            if (this._breakpoint >= 0) this._elapsedTime = this._delay + this._breakpoint;else if (this._repeat >= 0) this._elapsedTime = this._delay + this._duration * (this._repeat + 1);else this._elapsedTime = this._delay + this._duration * 2;
            this.update();
          }

          this.callCompleteCallback();
        }

        this._killed = true;
      }
    }, {
      key: "_to",
      value: function _to(start, end, duration) {
        this._valueSize = 1;
        this._startValue.x = start;
        this._endValue.x = end;
        this._value.x = start;
        this._duration = duration;
        return this;
      }
    }, {
      key: "_to2",
      value: function _to2(start, start2, end, end2, duration) {
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
    }, {
      key: "_to3",
      value: function _to3(start, start2, start3, end, end2, end3, duration) {
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
    }, {
      key: "_to4",
      value: function _to4(start, start2, start3, start4, end, end2, end3, end4, duration) {
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
    }, {
      key: "_toColor",
      value: function _toColor(start, end, duration) {
        this._valueSize = 4;
        this._startValue.color = start;
        this._endValue.color = end;
        this._value.color = start;
        this._duration = duration;
        return this;
      }
    }, {
      key: "_shake",
      value: function _shake(startX, startY, amplitude, duration) {
        this._valueSize = 5;
        this._startValue.x = startX;
        this._startValue.y = startY;
        this._startValue.w = amplitude;
        this._duration = duration;
        return this;
      }
    }, {
      key: "_init",
      value: function _init() {
        this._delay = 0;
        this._duration = 0;
        this._breakpoint = -1;
        this._easeType = fgui.EaseType.QuadOut;
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
    }, {
      key: "_reset",
      value: function _reset() {
        this._target = null;
        this._propType = null;
        this._userData = null;
        this._path = null;
        this._onStart = this._onUpdate = this._onComplete = null;
        this._onStartCaller = this._onUpdateCaller = this._onCompleteCaller = null;
      }
    }, {
      key: "_update",
      value: function _update(dt) {
        if (this._timeScale != 1) dt *= this._timeScale;
        if (dt == 0) return;

        if (this._ended != 0) {
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
    }, {
      key: "update",
      value: function update() {
        this._ended = 0;

        if (this._valueSize == 0) {
          if (this._elapsedTime >= this._delay + this._duration) this._ended = 1;
          return;
        }

        if (!this._started) {
          if (this._elapsedTime < this._delay) return;
          this._started = true;
          this.callStartCallback();
          if (this._killed) return;
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
          if (this._yoyo) reversed = round % 2 == 1;

          if (this._repeat > 0 && this._repeat - round < 0) {
            if (this._yoyo) reversed = this._repeat % 2 == 1;
            tt = this._duration;
            this._ended = 1;
          }
        } else if (tt >= this._duration) {
          tt = this._duration;
          this._ended = 1;
        }

        this._normalizedTime = fgui.evaluateEase(this._easeType, reversed ? this._duration - tt : tt, this._duration, this._easeOvershootOrAmplitude, this._easePeriod);

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
          } else {
            this._value.x = this._startValue.x;
            this._value.y = this._startValue.y;
          }
        } else if (this._path) {
          var pt = this._path.getPointAt(this._normalizedTime, s_vec2);

          if (this._snapping) {
            pt.x = Math.round(pt.x);
            pt.y = Math.round(pt.y);
          }

          this._deltaValue.x = pt.x - this._value.x;
          this._deltaValue.y = pt.y - this._value.y;
          this._value.x = pt.x;
          this._value.y = pt.y;
        } else {
          for (var i = 0; i < this._valueSize; i++) {
            var n1 = this._startValue.getField(i);

            var n2 = this._endValue.getField(i);

            var f = n1 + (n2 - n1) * this._normalizedTime;
            if (this._snapping) f = Math.round(f);

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
          } else {
            if (this._valueSize == 5) this._target[this._propType] = this._value.color;else this._target[this._propType] = this._value.x;
          }
        }

        this.callUpdateCallback();
      }
    }, {
      key: "callStartCallback",
      value: function callStartCallback() {
        if (this._onStart) {
          try {
            this._onStart.call(this._onStartCaller, this);
          } catch (err) {
            console.log("error in start callback > " + err);
          }
        }
      }
    }, {
      key: "callUpdateCallback",
      value: function callUpdateCallback() {
        if (this._onUpdate) {
          try {
            this._onUpdate.call(this._onUpdateCaller, this);
          } catch (err) {
            console.log("error in update callback > " + err);
          }
        }
      }
    }, {
      key: "callCompleteCallback",
      value: function callCompleteCallback() {
        if (this._onComplete) {
          try {
            this._onComplete.call(this._onCompleteCaller, this);
          } catch (err) {
            console.log("error in complete callback > " + err);
          }
        }
      }
    }, {
      key: "delay",
      get: function get() {
        return this._delay;
      }
    }, {
      key: "duration",
      get: function get() {
        return this._duration;
      }
    }, {
      key: "repeat",
      get: function get() {
        return this._repeat;
      }
    }, {
      key: "target",
      get: function get() {
        return this._target;
      }
    }, {
      key: "userData",
      get: function get() {
        return this._userData;
      }
    }, {
      key: "startValue",
      get: function get() {
        return this._startValue;
      }
    }, {
      key: "endValue",
      get: function get() {
        return this._endValue;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      }
    }, {
      key: "deltaValue",
      get: function get() {
        return this._deltaValue;
      }
    }, {
      key: "normalizedTime",
      get: function get() {
        return this._normalizedTime;
      }
    }, {
      key: "completed",
      get: function get() {
        return this._ended != 0;
      }
    }, {
      key: "allCompleted",
      get: function get() {
        return this._ended == 1;
      }
    }]);

    return GTweener;
  }();

  fgui.GTweener = GTweener;
})(fgui || (fgui = {}));

(function (fgui) {
  var TweenManager = /*#__PURE__*/function () {
    function TweenManager() {
      _classCallCheck(this, TweenManager);
    }

    _createClass(TweenManager, null, [{
      key: "createTween",
      value: function createTween() {
        if (!_inited) {
          fgui.Timers.addUpdate(TweenManager.update);
          _inited = true;
        }

        var tweener = _tweenerPool.borrow();

        _activeTweens[_totalActiveTweens++] = tweener;
        return tweener;
      }
    }, {
      key: "isTweening",
      value: function isTweening(target, propType) {
        if (target == null) return false;
        var anyType = !propType;

        for (var i = 0; i < _totalActiveTweens; i++) {
          var tweener = _activeTweens[i];
          if (tweener && tweener.target == target && !tweener._killed && (anyType || tweener._propType == propType)) return true;
        }

        return false;
      }
    }, {
      key: "killTweens",
      value: function killTweens(target, completed, propType) {
        if (target == null) return false;
        var flag = false;
        var cnt = _totalActiveTweens;
        var anyType = !propType;

        for (var i = 0; i < cnt; i++) {
          var tweener = _activeTweens[i];

          if (tweener && tweener.target == target && !tweener._killed && (anyType || tweener._propType == propType)) {
            tweener.kill(completed);
            flag = true;
          }
        }

        return flag;
      }
    }, {
      key: "getTween",
      value: function getTween(target, propType) {
        if (target == null) return null;
        var cnt = _totalActiveTweens;
        var anyType = !propType;

        for (var i = 0; i < cnt; i++) {
          var tweener = _activeTweens[i];

          if (tweener && tweener.target == target && !tweener._killed && (anyType || tweener._propType == propType)) {
            return tweener;
          }
        }

        return null;
      }
    }, {
      key: "update",
      value: function update() {
        var dt = fgui.Timers.deltaTime / 1000;
        var cnt = _totalActiveTweens;
        var freePosStart = -1;

        for (var i = 0; i < cnt; i++) {
          var tweener = _activeTweens[i];

          if (tweener == null) {
            if (freePosStart == -1) freePosStart = i;
          } else if (tweener._killed) {
            _tweenerPool.returns(tweener);

            _activeTweens[i] = null;
            if (freePosStart == -1) freePosStart = i;
          } else {
            if ('isDisposed' in tweener._target && tweener._target.isDisposed) tweener._killed = true;else if (!tweener._paused) tweener._update(dt);

            if (freePosStart != -1) {
              _activeTweens[freePosStart] = tweener;
              _activeTweens[i] = null;
              freePosStart++;
            }
          }
        }

        if (freePosStart >= 0) {
          if (_totalActiveTweens != cnt) {
            var j = cnt;
            cnt = _totalActiveTweens - cnt;

            for (i = 0; i < cnt; i++) {
              _activeTweens[freePosStart++] = _activeTweens[j++];
            }
          }

          _totalActiveTweens = freePosStart;
        }
      }
    }]);

    return TweenManager;
  }();

  fgui.TweenManager = TweenManager;

  var _activeTweens = new Array();

  var _tweenerPool = new fgui.Pool(fgui.GTweener, function (e) {
    return e._init();
  }, function (e) {
    return e._reset();
  });

  var _totalActiveTweens = 0;
  var _inited = false;
})(fgui || (fgui = {}));

(function (fgui) {
  var TweenValue = /*#__PURE__*/function () {
    function TweenValue() {
      _classCallCheck(this, TweenValue);

      this.x = this.y = this.z = this.w = 0;
    }

    _createClass(TweenValue, [{
      key: "getField",
      value: function getField(index) {
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
    }, {
      key: "setField",
      value: function setField(index, value) {
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
    }, {
      key: "setZero",
      value: function setZero() {
        this.x = this.y = this.z = this.w = 0;
      }
    }, {
      key: "color",
      get: function get() {
        return (this.w << 24) + (this.x << 16) + (this.y << 8) + this.z;
      },
      set: function set(value) {
        this.x = (value & 0xFF0000) >> 16;
        this.y = (value & 0x00FF00) >> 8;
        this.z = value & 0x0000FF;
        this.w = (value & 0xFF000000) >> 24;
      }
    }]);

    return TweenValue;
  }();

  fgui.TweenValue = TweenValue;
})(fgui || (fgui = {}));

(function (fgui) {
  var AsyncOperation = /*#__PURE__*/function () {
    function AsyncOperation() {
      _classCallCheck(this, AsyncOperation);

      this._itemList = new Array();
      this._objectPool = [];
    }

    _createClass(AsyncOperation, [{
      key: "createObject",
      value: function createObject(pkgName, resName) {
        var pkg = fgui.UIPackage.getByName(pkgName);

        if (pkg) {
          var pi = pkg.getItemByName(resName);
          if (!pi) throw new Error("resource not found: " + resName);
          this.internalCreateObject(pi);
        } else throw new Error("package not found: " + pkgName);
      }
    }, {
      key: "createObjectFromURL",
      value: function createObjectFromURL(url) {
        var pi = fgui.UIPackage.getItemByURL(url);
        if (pi) this.internalCreateObject(pi);else throw new Error("resource not found: " + url);
      }
    }, {
      key: "cancel",
      value: function cancel() {
        fgui.Timers.remove(this.run, this);
        this._itemList.length = 0;

        if (this._objectPool.length > 0) {
          var cnt = this._objectPool.length;

          for (var i = 0; i < cnt; i++) {
            this._objectPool[i].dispose();
          }

          this._objectPool.length = 0;
        }
      }
    }, {
      key: "internalCreateObject",
      value: function internalCreateObject(item) {
        this._itemList.length = 0;
        this._objectPool.length = 0;
        var di = new DisplayListItem(item, fgui.ObjectType.Component);
        di.childCount = this.collectComponentChildren(item);

        this._itemList.push(di);

        this._index = 0;
        fgui.Timers.addUpdate(this.run, this);
      }
    }, {
      key: "collectComponentChildren",
      value: function collectComponentChildren(item) {
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
            if (pkgId != null) pkg = fgui.UIPackage.getById(pkgId);else pkg = item.owner;
            pi = pkg != null ? pkg.getItemById(src) : null;
            di = new DisplayListItem(pi, type);
            if (pi != null && pi.type == fgui.PackageItemType.Component) di.childCount = this.collectComponentChildren(pi);
          } else {
            di = new DisplayListItem(null, type);
            if (type == fgui.ObjectType.List) di.listItemCount = this.collectListChildren(buffer);
          }

          this._itemList.push(di);

          buffer.pos = curPos + dataLen;
        }

        return dcnt;
      }
    }, {
      key: "collectListChildren",
      value: function collectListChildren(buffer) {
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
          if (url == null) url = defaultItem;

          if (url) {
            pi = fgui.UIPackage.getItemByURL(url);

            if (pi != null) {
              di = new DisplayListItem(pi, pi.objectType);
              if (pi.type == fgui.PackageItemType.Component) di.childCount = this.collectComponentChildren(pi);

              this._itemList.push(di);

              listItemCount++;
            }
          }

          buffer.pos = nextPos;
        }

        return listItemCount;
      }
    }, {
      key: "run",
      value: function run() {
        var obj;
        var di;
        var poolStart;
        var k;
        var t = performance.now();
        var frameTime = fgui.UIConfig.frameTimeForAsyncUIConstruction;
        var totalItems = this._itemList.length;

        while (this._index < totalItems) {
          di = this._itemList[this._index];

          if (di.packageItem != null) {
            obj = fgui.UIObjectFactory.newObject(di.packageItem);

            this._objectPool.push(obj);

            fgui.constructingDepth.n++;

            if (di.packageItem.type == fgui.PackageItemType.Component) {
              poolStart = this._objectPool.length - di.childCount - 1;
              obj.constructFromResource2(this._objectPool, poolStart);

              this._objectPool.splice(poolStart, di.childCount);
            } else {
              obj.constructFromResource();
            }

            fgui.constructingDepth.n--;
          } else {
            obj = fgui.UIObjectFactory.newObject(di.type);

            this._objectPool.push(obj);

            if (di.type == fgui.ObjectType.List && di.listItemCount > 0) {
              poolStart = this._objectPool.length - di.listItemCount - 1;

              for (k = 0; k < di.listItemCount; k++) {
                obj.itemPool.returnObject(this._objectPool[k + poolStart]);
              }

              this._objectPool.splice(poolStart, di.listItemCount);
            }
          }

          this._index++;
          if (this._index % 5 == 0 && performance.now() - t >= frameTime) return;
        }

        fgui.Timers.remove(this.run, this);
        var result = this._objectPool[0];
        this._itemList.length = 0;
        this._objectPool.length = 0;
        if (this.callback != null) this.callback(result);
      }
    }]);

    return AsyncOperation;
  }();

  fgui.AsyncOperation = AsyncOperation;

  var DisplayListItem = function DisplayListItem(packageItem, type) {
    _classCallCheck(this, DisplayListItem);

    this.packageItem = packageItem;
    this.type = type;
  };
})(fgui || (fgui = {}));

(function (fgui) {
  var _nextPageId = 0;

  var Controller = /*#__PURE__*/function (_fgui$EventDispatcher2) {
    _inherits(Controller, _fgui$EventDispatcher2);

    var _super23 = _createSuper(Controller);

    function Controller() {
      var _this16;

      _classCallCheck(this, Controller);

      _this16 = _super23.call(this);
      _this16._selectedIndex = 0;
      _this16._previousIndex = 0;
      _this16.changing = false;
      _this16._pageIds = [];
      _this16._pageNames = [];
      _this16._selectedIndex = -1;
      _this16._previousIndex = -1;
      return _this16;
    }

    _createClass(Controller, [{
      key: "dispose",
      value: function dispose() {
        this.offAll();
      }
    }, {
      key: "setSelectedIndex",
      value: function setSelectedIndex(value) {
        if (this._selectedIndex != value) {
          if (value > this._pageIds.length - 1) throw "index out of bounds: " + value;
          this.changing = true;
          this._previousIndex = this._selectedIndex;
          this._selectedIndex = value;
          this.parent.applyController(this);
          this.changing = false;
        }
      }
    }, {
      key: "setSelectedPage",
      value: function setSelectedPage(value) {
        var i = this._pageNames.indexOf(value);

        if (i == -1) i = 0;
        this.setSelectedIndex(i);
      }
    }, {
      key: "getPageName",
      value: function getPageName(index) {
        return this._pageNames[index];
      }
    }, {
      key: "addPage",
      value: function addPage(name) {
        name = name || "";
        this.addPageAt(name, this._pageIds.length);
      }
    }, {
      key: "addPageAt",
      value: function addPageAt(name, index) {
        name = name || "";
        var nid = "" + _nextPageId++;

        if (index == null || index == this._pageIds.length) {
          this._pageIds.push(nid);

          this._pageNames.push(this.name);
        } else {
          this._pageIds.splice(index, 0, nid);

          this._pageNames.splice(index, 0, this.name);
        }
      }
    }, {
      key: "removePage",
      value: function removePage(name) {
        var i = this._pageNames.indexOf(name);

        if (i != -1) {
          this._pageIds.splice(i, 1);

          this._pageNames.splice(i, 1);

          if (this._selectedIndex >= this._pageIds.length) this.selectedIndex = this._selectedIndex - 1;else this.parent.applyController(this);
        }
      }
    }, {
      key: "removePageAt",
      value: function removePageAt(index) {
        this._pageIds.splice(index, 1);

        this._pageNames.splice(index, 1);

        if (this._selectedIndex >= this._pageIds.length) this.selectedIndex = this._selectedIndex - 1;else this.parent.applyController(this);
      }
    }, {
      key: "clearPages",
      value: function clearPages() {
        this._pageIds.length = 0;
        this._pageNames.length = 0;
        if (this._selectedIndex != -1) this.selectedIndex = -1;else this.parent.applyController(this);
      }
    }, {
      key: "hasPage",
      value: function hasPage(aName) {
        return this._pageNames.indexOf(aName) != -1;
      }
    }, {
      key: "getPageIndexById",
      value: function getPageIndexById(aId) {
        return this._pageIds.indexOf(aId);
      }
    }, {
      key: "getPageIdByName",
      value: function getPageIdByName(aName) {
        var i = this._pageNames.indexOf(aName);

        if (i != -1) return this._pageIds[i];else return null;
      }
    }, {
      key: "getPageNameById",
      value: function getPageNameById(aId) {
        var i = this._pageIds.indexOf(aId);

        if (i != -1) return this._pageNames[i];else return null;
      }
    }, {
      key: "getPageId",
      value: function getPageId(index) {
        return this._pageIds[index];
      }
    }, {
      key: "runActions",
      value: function runActions() {
        if (this._actions) {
          var cnt = this._actions.length;

          for (var i = 0; i < cnt; i++) {
            this._actions[i].run(this, this.previousPageId, this.selectedPageId);
          }
        }
      }
    }, {
      key: "setup",
      value: function setup(buffer) {
        var beginPos = buffer.pos;
        buffer.seek(beginPos, 0);
        this.name = buffer.readS();
        this.autoRadioGroupDepth = buffer.readBool();
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
              homePageIndex = this._pageNames.indexOf(fgui.UIPackage.branch);
              if (homePageIndex == -1) homePageIndex = 0;
              break;

            case 3:
              homePageIndex = this._pageNames.indexOf(fgui.UIPackage.getVar(buffer.readS()));
              if (homePageIndex == -1) homePageIndex = 0;
              break;
          }
        }

        buffer.seek(beginPos, 2);
        cnt = buffer.readShort();

        if (cnt > 0) {
          if (this._actions == null) this._actions = [];

          for (i = 0; i < cnt; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;
            var action = createAction(buffer.readByte());
            action.setup(buffer);

            this._actions.push(action);

            buffer.pos = nextPos;
          }
        }

        if (this.parent && this._pageIds.length > 0) this._selectedIndex = homePageIndex;else this._selectedIndex = -1;
      }
    }, {
      key: "selectedIndex",
      get: function get() {
        return this._selectedIndex;
      },
      set: function set(value) {
        if (this._selectedIndex != value) {
          if (value > this._pageIds.length - 1) throw "index out of bounds: " + value;
          this.changing = true;
          this._previousIndex = this._selectedIndex;
          this._selectedIndex = value;
          this.parent.applyController(this);
          this.dispatchEvent(fgui.StateChangeEvent.CHANGED);
          this.changing = false;
        }
      }
    }, {
      key: "previsousIndex",
      get: function get() {
        return this._previousIndex;
      }
    }, {
      key: "selectedPage",
      get: function get() {
        if (this._selectedIndex == -1) return null;else return this._pageNames[this._selectedIndex];
      },
      set: function set(val) {
        var i = this._pageNames.indexOf(val);

        if (i == -1) i = 0;
        this.selectedIndex = i;
      }
    }, {
      key: "previousPage",
      get: function get() {
        if (this._previousIndex == -1) return null;else return this._pageNames[this._previousIndex];
      }
    }, {
      key: "pageCount",
      get: function get() {
        return this._pageIds.length;
      }
    }, {
      key: "selectedPageId",
      get: function get() {
        if (this._selectedIndex == -1) return null;else return this._pageIds[this._selectedIndex];
      },
      set: function set(val) {
        var i = this._pageIds.indexOf(val);

        this.selectedIndex = i;
      }
    }, {
      key: "oppositePageId",
      set: function set(val) {
        var i = this._pageIds.indexOf(val);

        if (i > 0) this.selectedIndex = 0;else if (this._pageIds.length > 1) this.selectedIndex = 1;
      }
    }, {
      key: "previousPageId",
      get: function get() {
        if (this._previousIndex == -1) return null;else return this._pageIds[this._previousIndex];
      }
    }]);

    return Controller;
  }(fgui.EventDispatcher);

  fgui.Controller = Controller;

  function createAction(type) {
    switch (type) {
      case 0:
        return new fgui.PlayTransitionAction();

      case 1:
        return new fgui.ChangePageAction();
    }

    return null;
  }
})(fgui || (fgui = {}));

(function (fgui) {
  var _inst;

  var DragDropManager = /*#__PURE__*/function () {
    function DragDropManager() {
      _classCallCheck(this, DragDropManager);

      var a = this._agent = new fgui.GLoader();
      a.draggable = true;
      a.touchable = false;
      a.setSize(100, 100);
      a.setPivot(0.5, 0.5, true);
      a.align = "center";
      a.verticalAlign = "middle";
      a.sortingOrder = 1000000;
      a.on(fgui.DragEvent.END, this.__dragEnd, this);
    }

    _createClass(DragDropManager, [{
      key: "startDrag",
      value: function startDrag(icon, sourceData, touchPointID) {
        if (this._agent.parent) return;
        this._sourceData = sourceData;
        this._agent.url = icon;
        fgui.GRoot.inst.addChild(this._agent);
        var pt = fgui.GRoot.inst.globalToLocal(fgui.Stage.touchPos.x, fgui.Stage.touchPos.y);

        this._agent.setPosition(pt.x, pt.y);

        this._agent.startDrag(touchPointID != null ? touchPointID : -1);
      }
    }, {
      key: "cancel",
      value: function cancel() {
        if (this._agent.parent) {
          this._agent.stopDrag();

          fgui.GRoot.inst.removeChild(this._agent);
          this._sourceData = null;
        }
      }
    }, {
      key: "__dragEnd",
      value: function __dragEnd(evt) {
        if (this._agent.parent == null) return;
        fgui.GRoot.inst.removeChild(this._agent);
        var sourceData = this._sourceData;
        this._sourceData = null;
        var obj = fgui.GObject.cast(fgui.Stage.touchTarget);

        while (obj) {
          if (obj.hasListener(fgui.DragEvent.DROP)) {
            obj.dispatchEvent(fgui.DragEvent.DROP, sourceData);
            return;
          }

          obj = obj.parent;
        }
      }
    }, {
      key: "dragAgent",
      get: function get() {
        return this._agent;
      }
    }, {
      key: "dragging",
      get: function get() {
        return this._agent.parent != null;
      }
    }], [{
      key: "inst",
      get: function get() {
        if (!_inst) _inst = new DragDropManager();
        return _inst;
      }
    }]);

    return DragDropManager;
  }();

  fgui.DragDropManager = DragDropManager;
})(fgui || (fgui = {}));

(function (fgui) {
  var ButtonMode;

  (function (ButtonMode) {
    ButtonMode[ButtonMode["Common"] = 0] = "Common";
    ButtonMode[ButtonMode["Check"] = 1] = "Check";
    ButtonMode[ButtonMode["Radio"] = 2] = "Radio";
  })(ButtonMode = fgui.ButtonMode || (fgui.ButtonMode = {}));

  var AutoSizeType;

  (function (AutoSizeType) {
    AutoSizeType[AutoSizeType["None"] = 0] = "None";
    AutoSizeType[AutoSizeType["Both"] = 1] = "Both";
    AutoSizeType[AutoSizeType["Height"] = 2] = "Height";
    AutoSizeType[AutoSizeType["Shrink"] = 3] = "Shrink";
  })(AutoSizeType = fgui.AutoSizeType || (fgui.AutoSizeType = {}));

  var LoaderFillType;

  (function (LoaderFillType) {
    LoaderFillType[LoaderFillType["None"] = 0] = "None";
    LoaderFillType[LoaderFillType["Scale"] = 1] = "Scale";
    LoaderFillType[LoaderFillType["ScaleMatchHeight"] = 2] = "ScaleMatchHeight";
    LoaderFillType[LoaderFillType["ScaleMatchWidth"] = 3] = "ScaleMatchWidth";
    LoaderFillType[LoaderFillType["ScaleFree"] = 4] = "ScaleFree";
    LoaderFillType[LoaderFillType["ScaleNoBorder"] = 5] = "ScaleNoBorder";
  })(LoaderFillType = fgui.LoaderFillType || (fgui.LoaderFillType = {}));

  var ListLayoutType;

  (function (ListLayoutType) {
    ListLayoutType[ListLayoutType["SingleColumn"] = 0] = "SingleColumn";
    ListLayoutType[ListLayoutType["SingleRow"] = 1] = "SingleRow";
    ListLayoutType[ListLayoutType["FlowHorizontal"] = 2] = "FlowHorizontal";
    ListLayoutType[ListLayoutType["FlowVertical"] = 3] = "FlowVertical";
    ListLayoutType[ListLayoutType["Pagination"] = 4] = "Pagination";
  })(ListLayoutType = fgui.ListLayoutType || (fgui.ListLayoutType = {}));

  var ListSelectionMode;

  (function (ListSelectionMode) {
    ListSelectionMode[ListSelectionMode["Single"] = 0] = "Single";
    ListSelectionMode[ListSelectionMode["Multiple"] = 1] = "Multiple";
    ListSelectionMode[ListSelectionMode["Multiple_SingleClick"] = 2] = "Multiple_SingleClick";
    ListSelectionMode[ListSelectionMode["None"] = 3] = "None";
  })(ListSelectionMode = fgui.ListSelectionMode || (fgui.ListSelectionMode = {}));

  var OverflowType;

  (function (OverflowType) {
    OverflowType[OverflowType["Visible"] = 0] = "Visible";
    OverflowType[OverflowType["Hidden"] = 1] = "Hidden";
    OverflowType[OverflowType["Scroll"] = 2] = "Scroll";
  })(OverflowType = fgui.OverflowType || (fgui.OverflowType = {}));

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
  })(PackageItemType = fgui.PackageItemType || (fgui.PackageItemType = {}));

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
  })(ObjectType = fgui.ObjectType || (fgui.ObjectType = {}));

  var ProgressTitleType;

  (function (ProgressTitleType) {
    ProgressTitleType[ProgressTitleType["Percent"] = 0] = "Percent";
    ProgressTitleType[ProgressTitleType["ValueAndMax"] = 1] = "ValueAndMax";
    ProgressTitleType[ProgressTitleType["Value"] = 2] = "Value";
    ProgressTitleType[ProgressTitleType["Max"] = 3] = "Max";
  })(ProgressTitleType = fgui.ProgressTitleType || (fgui.ProgressTitleType = {}));

  var ScrollBarDisplayType;

  (function (ScrollBarDisplayType) {
    ScrollBarDisplayType[ScrollBarDisplayType["Default"] = 0] = "Default";
    ScrollBarDisplayType[ScrollBarDisplayType["Visible"] = 1] = "Visible";
    ScrollBarDisplayType[ScrollBarDisplayType["Auto"] = 2] = "Auto";
    ScrollBarDisplayType[ScrollBarDisplayType["Hidden"] = 3] = "Hidden";
  })(ScrollBarDisplayType = fgui.ScrollBarDisplayType || (fgui.ScrollBarDisplayType = {}));

  var ScrollType;

  (function (ScrollType) {
    ScrollType[ScrollType["Horizontal"] = 0] = "Horizontal";
    ScrollType[ScrollType["Vertical"] = 1] = "Vertical";
    ScrollType[ScrollType["Both"] = 2] = "Both";
  })(ScrollType = fgui.ScrollType || (fgui.ScrollType = {}));

  var FlipType;

  (function (FlipType) {
    FlipType[FlipType["None"] = 0] = "None";
    FlipType[FlipType["Horizontal"] = 1] = "Horizontal";
    FlipType[FlipType["Vertical"] = 2] = "Vertical";
    FlipType[FlipType["Both"] = 3] = "Both";
  })(FlipType = fgui.FlipType || (fgui.FlipType = {}));

  var ChildrenRenderOrder;

  (function (ChildrenRenderOrder) {
    ChildrenRenderOrder[ChildrenRenderOrder["Ascent"] = 0] = "Ascent";
    ChildrenRenderOrder[ChildrenRenderOrder["Descent"] = 1] = "Descent";
    ChildrenRenderOrder[ChildrenRenderOrder["Arch"] = 2] = "Arch";
  })(ChildrenRenderOrder = fgui.ChildrenRenderOrder || (fgui.ChildrenRenderOrder = {}));

  var GroupLayoutType;

  (function (GroupLayoutType) {
    GroupLayoutType[GroupLayoutType["None"] = 0] = "None";
    GroupLayoutType[GroupLayoutType["Horizontal"] = 1] = "Horizontal";
    GroupLayoutType[GroupLayoutType["Vertical"] = 2] = "Vertical";
  })(GroupLayoutType = fgui.GroupLayoutType || (fgui.GroupLayoutType = {}));

  var PopupDirection;

  (function (PopupDirection) {
    PopupDirection[PopupDirection["Auto"] = 0] = "Auto";
    PopupDirection[PopupDirection["Up"] = 1] = "Up";
    PopupDirection[PopupDirection["Down"] = 2] = "Down";
  })(PopupDirection = fgui.PopupDirection || (fgui.PopupDirection = {}));

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
  })(RelationType = fgui.RelationType || (fgui.RelationType = {}));

  var FillMethod;

  (function (FillMethod) {
    FillMethod[FillMethod["None"] = 0] = "None";
    FillMethod[FillMethod["Horizontal"] = 1] = "Horizontal";
    FillMethod[FillMethod["Vertical"] = 2] = "Vertical";
    FillMethod[FillMethod["Radial90"] = 3] = "Radial90";
    FillMethod[FillMethod["Radial180"] = 4] = "Radial180";
    FillMethod[FillMethod["Radial360"] = 5] = "Radial360";
  })(FillMethod = fgui.FillMethod || (fgui.FillMethod = {}));

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
  })(FillOrigin = fgui.FillOrigin || (fgui.FillOrigin = {}));

  var FillOrigin90;

  (function (FillOrigin90) {
    FillOrigin90[FillOrigin90["TopLeft"] = 0] = "TopLeft";
    FillOrigin90[FillOrigin90["TopRight"] = 1] = "TopRight";
    FillOrigin90[FillOrigin90["BottomLeft"] = 2] = "BottomLeft";
    FillOrigin90[FillOrigin90["BottomRight"] = 3] = "BottomRight";
  })(FillOrigin90 = fgui.FillOrigin90 || (fgui.FillOrigin90 = {}));

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
  })(ObjectPropID = fgui.ObjectPropID || (fgui.ObjectPropID = {}));
})(fgui || (fgui = {}));

(function (fgui) {
  var GObject = /*#__PURE__*/function () {
    function GObject() {
      _classCallCheck(this, GObject);

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
      this._dragTouchStartPos = new THREE.Vector2();
      this._dragTesting = false;
      this._id = "" + fgui.gInstanceCounter++;
      this._name = "";
      this.createDisplayObject();
      this._displayObject["$owner"] = this;
      this._relations = new fgui.Relations(this);
      this._gears = new Array(10);
    }

    _createClass(GObject, [{
      key: "setPosition",
      value: function setPosition(xv, yv, zv) {
        if (this._x != xv || this._y != yv) {
          var dx = xv - this._x;
          var dy = yv - this._y;
          this._x = xv;
          this._y = yv;
          if (zv != null) this._z = zv;
          this.handlePositionChanged();
          if (this instanceof fgui.GGroup) this.moveChildren(dx, dy);
          this.updateGear(1);

          if (this._parent && !("itemRenderer" in this._parent)) {
            this._parent.setBoundsChangedFlag();

            if (this._group) this._group.setBoundsChangedFlag(true);
            this.dispatchEvent(fgui.DisplayObjectEvent.XY_CHANGED);
          }

          if (GObject.draggingObject == this && !s_dragging) this.localToGlobalRect(0, 0, this.width, this.height, sGlobalRect);
        }
      }
    }, {
      key: "center",
      value: function center(restraint) {
        var r;
        if (this._parent) r = this.parent;else r = fgui.Decls.GRoot.inst;
        this.setPosition(Math.floor((r.width - this.width) / 2), Math.floor((r.height - this.height) / 2));

        if (restraint) {
          this.addRelation(r, fgui.RelationType.Center_Center);
          this.addRelation(r, fgui.RelationType.Middle_Middle);
        }
      }
    }, {
      key: "MakeFullScreen",
      value: function MakeFullScreen() {
        if (fgui.GRoot.inst) {
          this.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        }
      }
    }, {
      key: "setSize",
      value: function setSize(wv, hv, ignorePivot) {
        if (this._rawWidth != wv || this._rawHeight != hv) {
          this._rawWidth = wv;
          this._rawHeight = hv;
          if (wv < this.minWidth) wv = this.minWidth;
          if (hv < this.minHeight) hv = this.minHeight;
          if (this.maxWidth > 0 && wv > this.maxWidth) wv = this.maxWidth;
          if (this.maxHeight > 0 && hv > this.maxHeight) hv = this.maxHeight;
          var dWidth = wv - this._width;
          var dHeight = hv - this._height;
          this._width = wv;
          this._height = hv;
          this.handleSizeChanged();

          if (this._pivotX != 0 || this._pivotY != 0) {
            if (!this._pivotAsAnchor) {
              if (!ignorePivot) this.setPosition(this.x - this._pivotX * dWidth, this.y - this._pivotY * dHeight);else this.handlePositionChanged();
            } else this.handlePositionChanged();
          }

          if (this instanceof fgui.GGroup) this.resizeChildren(dWidth, dHeight);
          this.updateGear(2);

          if (this._parent) {
            this._relations.onOwnerSizeChanged(dWidth, dHeight, this._pivotAsAnchor || !ignorePivot);

            this._parent.setBoundsChangedFlag();

            if (this._group) this._group.setBoundsChangedFlag();
          }

          this.dispatchEvent(fgui.DisplayObjectEvent.SIZE_CHANGED);
        }
      }
    }, {
      key: "setSizeDirectly",
      value: function setSizeDirectly(wv, hv) {
        this._rawWidth = wv;
        this._rawHeight = hv;
        if (wv < 0) wv = 0;
        if (hv < 0) hv = 0;
        this._width = wv;
        this._height = hv;
      }
    }, {
      key: "makeFullScreen",
      value: function makeFullScreen() {
        this.setSize(fgui.Decls.GRoot.inst.width, fgui.Decls.GRoot.inst.height);
      }
    }, {
      key: "setScale",
      value: function setScale(sx, sy) {
        if (this._scaleX != sx || this._scaleY != sy) {
          this._scaleX = sx;
          this._scaleY = sy;
          this.handleScaleChanged();
          this.updateGear(2);
        }
      }
    }, {
      key: "setSkew",
      value: function setSkew(sx, sy) {
        if (this._skewX != sx || this._skewY != sy) {
          this._skewX = sx;
          this._skewY = sy;
        }
      }
    }, {
      key: "setPivot",
      value: function setPivot(xv, yv, asAnchor) {
        asAnchor = asAnchor || false;

        if (this._pivotX != xv || this._pivotY != yv || this._pivotAsAnchor != asAnchor) {
          this._pivotX = xv;
          this._pivotY = yv;
          this._pivotAsAnchor = asAnchor;

          this._displayObject.setPivot(xv, yv);

          this.handlePositionChanged();
        }
      }
    }, {
      key: "__rollOver",
      value: function __rollOver() {
        fgui.Timers.callDelay(100, this.__doShowTooltips, this);
      }
    }, {
      key: "__doShowTooltips",
      value: function __doShowTooltips() {
        fgui.Decls.GRoot.findFor(this).showTooltips(this._tooltips);
      }
    }, {
      key: "__rollOut",
      value: function __rollOut() {
        fgui.Timers.remove(this.__doShowTooltips, this);
        fgui.Decls.GRoot.findFor(this).hideTooltips();
      }
    }, {
      key: "getGear",
      value: function getGear(index) {
        var gear = this._gears[index];
        if (gear == null) this._gears[index] = gear = createGear(this, index);
        return gear;
      }
    }, {
      key: "updateGear",
      value: function updateGear(index) {
        if (this._underConstruct || this._gearLocked) return;
        var gear = this._gears[index];
        if (gear && gear.controller) gear.updateState();
      }
    }, {
      key: "checkGearController",
      value: function checkGearController(index, c) {
        return this._gears[index] && this._gears[index].controller == c;
      }
    }, {
      key: "updateGearFromRelations",
      value: function updateGearFromRelations(index, dx, dy) {
        if (this._gears[index]) this._gears[index].updateFromRelations(dx, dy);
      }
    }, {
      key: "addDisplayLock",
      value: function addDisplayLock() {
        var gearDisplay = this._gears[0];

        if (gearDisplay && gearDisplay.controller) {
          var ret = gearDisplay.addLock();
          this.checkGearDisplay();
          return ret;
        } else return 0;
      }
    }, {
      key: "releaseDisplayLock",
      value: function releaseDisplayLock(token) {
        var gearDisplay = this._gears[0];

        if (gearDisplay && gearDisplay.controller) {
          gearDisplay.releaseLock(token);
          this.checkGearDisplay();
        }
      }
    }, {
      key: "checkGearDisplay",
      value: function checkGearDisplay() {
        if (this._handlingController) return;
        var connected = this._gears[0] == null || this._gears[0].connected;
        if (this._gears[8]) connected = this._gears[8].evaluate(connected);

        if (connected != this._internalVisible) {
          this._internalVisible = connected;

          if (this._parent) {
            this._parent.childStateChanged(this);

            if (this._group && this._group.excludeInvisibles) this._group.setBoundsChangedFlag();
          }
        }
      }
    }, {
      key: "addRelation",
      value: function addRelation(target, relationType, usePercent) {
        this._relations.add(target, relationType, usePercent);
      }
    }, {
      key: "removeRelation",
      value: function removeRelation(target, relationType) {
        this._relations.remove(target, relationType);
      }
    }, {
      key: "removeFromParent",
      value: function removeFromParent() {
        if (this._parent) this._parent.removeChild(this);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this.removeFromParent();

        this._relations.dispose();

        this._displayObject.dispose();

        this._displayObject = null;

        for (var i = 0; i < 10; i++) {
          var gear = this._gears[i];
          if (gear) gear.dispose();
        }
      }
    }, {
      key: "on",
      value: function on(type, callback, target, capture) {
        this._displayObject.on(type, callback, target, capture);
      }
    }, {
      key: "off",
      value: function off(type, callback, target, capture) {
        this._displayObject.off(type, callback, target, capture);
      }
    }, {
      key: "offAll",
      value: function offAll(type) {
        this._displayObject.offAll(type);
      }
    }, {
      key: "hasListener",
      value: function hasListener(type, callback, target, capture) {
        return this._displayObject.hasListener(type, callback, target, capture);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(type, data) {
        return this._displayObject.dispatchEvent(type, data);
      }
    }, {
      key: "onClick",
      value: function onClick(listener, target) {
        this.on(fgui.InteractiveEvents.Click, listener, target);
      }
    }, {
      key: "offClick",
      value: function offClick(listener, target) {
        this.off(fgui.InteractiveEvents.Click, listener, target);
      }
    }, {
      key: "hasClickListener",
      value: function hasClickListener() {
        return this.hasListener(fgui.InteractiveEvents.Click);
      }
    }, {
      key: "startDrag",
      value: function startDrag(touchId) {
        if (this._displayObject.stage == null) return;
        if (touchId == null) touchId = -1;
        this.dragBegin(touchId);
      }
    }, {
      key: "stopDrag",
      value: function stopDrag() {
        this.dragEnd();
      }
    }, {
      key: "localToGlobal",
      value: function localToGlobal(ax, ay, result) {
        ax = ax || 0;
        ay = ay || 0;

        if (this._pivotAsAnchor) {
          ax += this._pivotX * this._width;
          ay += this._pivotY * this._height;
        }

        return this._displayObject.localToGlobal(ax, ay, result);
      }
    }, {
      key: "globalToLocal",
      value: function globalToLocal(ax, ay, result) {
        ax = ax || 0;
        ay = ay || 0;
        result = this._displayObject.globalToLocal(ax, ay, result);

        if (this._pivotAsAnchor) {
          result.x -= this._pivotX * this._width;
          result.y -= this._pivotY * this._height;
        }

        return result;
      }
    }, {
      key: "localToRoot",
      value: function localToRoot(ax, ay, result) {
        var r = fgui.Decls.GRoot.findFor(this);
        var pt = this.localToGlobal(ax, ay, result);
        return r.globalToLocal(pt.x, pt.y, pt);
      }
    }, {
      key: "rootToLocal",
      value: function rootToLocal(ax, ay, result) {
        var r = fgui.Decls.GRoot.findFor(this);
        var pt = r.localToGlobal(ax, ay, result);
        return this.globalToLocal(pt.x, pt.y, pt);
      }
    }, {
      key: "localToGlobalRect",
      value: function localToGlobalRect(ax, ay, aWidth, aHeight, result) {
        if (!result) result = new fgui.Rect();
        var pt = this.localToGlobal(ax, ay, s_vec2);
        result.x = pt.x;
        result.y = pt.y;
        pt = this.localToGlobal(ax + aWidth, ay + aHeight, s_vec2);
        result.width = pt.x - result.x;
        result.height = pt.y - result.y;
        return result;
      }
    }, {
      key: "globalToLocalRect",
      value: function globalToLocalRect(ax, ay, aWidth, aHeight, result) {
        if (!result) result = new fgui.Rect();
        var pt = this.globalToLocal(ax, ay, s_vec2);
        result.x = pt.x;
        result.y = pt.y;
        pt = this.globalToLocal(ax + aWidth, ay + aHeight, s_vec2);
        result.width = pt.x - result.x;
        result.height = pt.y - result.y;
        return result;
      }
    }, {
      key: "handleControllerChanged",
      value: function handleControllerChanged(c) {
        this._handlingController = true;

        for (var i = 0; i < 10; i++) {
          var gear = this._gears[i];
          if (gear && gear.controller == c) gear.apply();
        }

        this._handlingController = false;
        this.checkGearDisplay();
      }
    }, {
      key: "createDisplayObject",
      value: function createDisplayObject() {
        this._displayObject = new fgui.DisplayObject();
      }
    }, {
      key: "handlePositionChanged",
      value: function handlePositionChanged() {
        var xv = this._x;
        var yv = this._y;

        if (!this._pivotAsAnchor) {
          xv += this._pivotX * this._width;
          yv += this._pivotY * this._height;
        }

        this._displayObject.setPosition(xv, yv, this._z, true);
      }
    }, {
      key: "handleSizeChanged",
      value: function handleSizeChanged() {
        this._displayObject.setSize(this._width, this._height);
      }
    }, {
      key: "handleScaleChanged",
      value: function handleScaleChanged() {
        this._displayObject.setScale(this._scaleX, this._scaleY);
      }
    }, {
      key: "handleGrayedChanged",
      value: function handleGrayedChanged() {
        if (this._displayObject.graphics) this._displayObject.graphics.grayed = this._grayed;
      }
    }, {
      key: "handleAlphaChanged",
      value: function handleAlphaChanged() {
        this._displayObject.alpha = this._alpha;
      }
    }, {
      key: "handleVisibleChanged",
      value: function handleVisibleChanged() {
        this._displayObject.visible = this.internalVisible2;
      }
    }, {
      key: "getProp",
      value: function getProp(index) {
        switch (index) {
          case fgui.ObjectPropID.Text:
            return this.text;

          case fgui.ObjectPropID.Icon:
            return this.icon;

          case fgui.ObjectPropID.Color:
            return null;

          case fgui.ObjectPropID.OutlineColor:
            return null;

          case fgui.ObjectPropID.Playing:
            return false;

          case fgui.ObjectPropID.Frame:
            return 0;

          case fgui.ObjectPropID.DeltaTime:
            return 0;

          case fgui.ObjectPropID.TimeScale:
            return 1;

          case fgui.ObjectPropID.FontSize:
            return 0;

          case fgui.ObjectPropID.Selected:
            return false;

          default:
            return undefined;
        }
      }
    }, {
      key: "setProp",
      value: function setProp(index, value) {
        switch (index) {
          case fgui.ObjectPropID.Text:
            this.text = value;
            break;

          case fgui.ObjectPropID.Icon:
            this.icon = value;
            break;
        }
      }
    }, {
      key: "constructFromResource",
      value: function constructFromResource() {}
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
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
        if (f1 != 1) this.alpha = f1;
        f1 = buffer.readFloat();
        if (f1 != 0) this.rotation = f1;
        if (!buffer.readBool()) this.visible = false;
        if (!buffer.readBool()) this.touchable = false;
        if (buffer.readBool()) this.grayed = true;
        var bm = buffer.readByte();
        this.blendMode = BlendModeTranslate[bm] || THREE.NormalBlending;
        var filter = buffer.readByte();

        if (filter == 1) {}

        var str = buffer.readS();
        if (str != null) this.data = str;
      }
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        buffer.seek(beginPos, 1);
        var str = buffer.readS();
        if (str) this.tooltips = str;
        var groupId = buffer.readShort();
        if (groupId >= 0) this.group = this.parent.getChildAt(groupId);
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
    }, {
      key: "initDrag",
      value: function initDrag() {
        if (this._draggable) {
          this.on(fgui.InteractiveEvents.Down, this.__touchBegin, this);
          this.on(fgui.InteractiveEvents.Move, this.__touchMove, this);
          this.on(fgui.InteractiveEvents.Up, this.__touchEnd, this);
        } else {
          this.off(fgui.InteractiveEvents.Down, this.__touchBegin, this);
          this.off(fgui.InteractiveEvents.Move, this.__touchMove, this);
          this.off(fgui.InteractiveEvents.Up, this.__touchEnd, this);
        }
      }
    }, {
      key: "dragBegin",
      value: function dragBegin(touchId) {
        if (GObject.draggingObject) {
          var tmp = GObject.draggingObject;
          GObject.draggingObject.stopDrag();
          GObject.draggingObject = null;
          tmp.dispatchEvent(fgui.DragEvent.END);
        }

        this.on(fgui.InteractiveEvents.Move, this.__touchMove, this);
        this.on(fgui.InteractiveEvents.Up, this.__touchEnd, this);
        fgui.Stage.getTouchPos(touchId, sGlobalDragStart);
        this.localToGlobalRect(0, 0, this.width, this.height, sGlobalRect);
        this._dragTesting = false;
        GObject.draggingObject = this;
        fgui.Stage.addTouchMonitor(touchId, this._displayObject);
      }
    }, {
      key: "dragEnd",
      value: function dragEnd() {
        if (GObject.draggingObject == this) {
          this._dragTesting = false;
          GObject.draggingObject = null;
        }
      }
    }, {
      key: "__touchBegin",
      value: function __touchBegin(evt) {
        if (this._dragTouchStartPos == null) this._dragTouchStartPos = new THREE.Vector2();

        this._dragTouchStartPos.set(evt.input.x, evt.input.y);

        this._dragTesting = true;
        evt.captureTouch();
      }
    }, {
      key: "__touchMove",
      value: function __touchMove(evt) {
        if (this._dragTesting && GObject.draggingObject != this) {
          var sensitivity;
          if (fgui.Stage.touchScreen) sensitivity = fgui.UIConfig.touchDragSensitivity;else sensitivity = fgui.UIConfig.clickDragSensitivity;
          if (Math.abs(this._dragTouchStartPos.x - evt.input.x) < sensitivity && Math.abs(this._dragTouchStartPos.y - evt.input.y) < sensitivity) return;
          this._dragTesting = false;
          if (!this.dispatchEvent(fgui.DragEvent.START, evt.input.touchId)) this.dragBegin(evt.input.touchId);
        }

        if (GObject.draggingObject == this) {
          var xx = evt.input.x - sGlobalDragStart.x + sGlobalRect.x;
          var yy = evt.input.y - sGlobalDragStart.y + sGlobalRect.y;

          if (this._dragBounds) {
            var rect = fgui.Decls.GRoot.findFor(this).localToGlobalRect(this._dragBounds.x, this._dragBounds.y, this._dragBounds.width, this._dragBounds.height, s_rect);
            if (xx < rect.x) xx = rect.x;else if (xx + sGlobalRect.width > rect.xMax) {
              xx = rect.xMax - sGlobalRect.width;
              if (xx < rect.x) xx = rect.x;
            }
            if (yy < rect.y) yy = rect.y;else if (yy + sGlobalRect.height > rect.yMax) {
              yy = rect.yMax - sGlobalRect.height;
              if (yy < rect.y) yy = rect.y;
            }
          }

          var pt = this.parent.globalToLocal(xx, yy, s_vec2);
          s_dragging = true;
          this.setPosition(Math.round(pt.x), Math.round(pt.y));
          s_dragging = false;
          this.dispatchEvent(fgui.DragEvent.MOVING);
        }
      }
    }, {
      key: "__touchEnd",
      value: function __touchEnd() {
        if (GObject.draggingObject == this) {
          GObject.draggingObject = null;
          this.dispatchEvent(fgui.DragEvent.END);
        }
      }
    }, {
      key: "id",
      get: function get() {
        return this._id;
      }
    }, {
      key: "name",
      get: function get() {
        return this._name;
      },
      set: function set(value) {
        this._name = value;
      }
    }, {
      key: "x",
      get: function get() {
        return this._x;
      },
      set: function set(value) {
        this.setPosition(value, this._y);
      }
    }, {
      key: "y",
      get: function get() {
        return this._y;
      },
      set: function set(value) {
        this.setPosition(this._x, value);
      }
    }, {
      key: "z",
      get: function get() {
        return this._z;
      },
      set: function set(value) {
        this.setPosition(this._x, this._y, value);
      }
    }, {
      key: "xMin",
      get: function get() {
        return this._pivotAsAnchor ? this._x - this._width * this._pivotX : this._x;
      },
      set: function set(value) {
        if (this._pivotAsAnchor) this.setPosition(value + this._width * this._pivotX, this._y);else this.setPosition(value, this._y);
      }
    }, {
      key: "yMin",
      get: function get() {
        return this._pivotAsAnchor ? this._y - this._height * this._pivotY : this._y;
      },
      set: function set(value) {
        if (this._pivotAsAnchor) this.setPosition(this._x, value + this._height * this._pivotY);else this.setPosition(this._x, value);
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        this.setSize(value, this._rawHeight);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(value) {
        this.setSize(this._rawWidth, value);
      }
    }, {
      key: "actualWidth",
      get: function get() {
        return this.width * Math.abs(this._scaleX);
      }
    }, {
      key: "actualHeight",
      get: function get() {
        return this.height * Math.abs(this._scaleY);
      }
    }, {
      key: "scaleX",
      get: function get() {
        return this._scaleX;
      },
      set: function set(value) {
        this.setScale(value, this._scaleY);
      }
    }, {
      key: "scaleY",
      get: function get() {
        return this._scaleY;
      },
      set: function set(value) {
        this.setScale(this._scaleX, value);
      }
    }, {
      key: "skewX",
      get: function get() {
        return this._skewX;
      },
      set: function set(value) {
        this.setSkew(value, this._skewY);
      }
    }, {
      key: "skewY",
      get: function get() {
        return this._skewY;
      },
      set: function set(value) {
        this.setSkew(this._skewX, value);
      }
    }, {
      key: "pivotX",
      get: function get() {
        return this._pivotX;
      },
      set: function set(value) {
        this.setPivot(value, this._pivotY);
      }
    }, {
      key: "pivotY",
      get: function get() {
        return this._pivotY;
      },
      set: function set(value) {
        this.setPivot(this._pivotX, value);
      }
    }, {
      key: "pivotAsAnchor",
      get: function get() {
        return this._pivotAsAnchor;
      }
    }, {
      key: "touchable",
      get: function get() {
        return this._touchable;
      },
      set: function set(value) {
        if (this._touchable != value) {
          this._touchable = value;
          this.updateGear(3);
          this._displayObject.touchable = this._touchable;
        }
      }
    }, {
      key: "grayed",
      get: function get() {
        return this._grayed;
      },
      set: function set(value) {
        if (this._grayed != value) {
          this._grayed = value;
          this.handleGrayedChanged();
          this.updateGear(3);
        }
      }
    }, {
      key: "enabled",
      get: function get() {
        return !this._grayed && this._touchable;
      },
      set: function set(value) {
        this.grayed = !value;
        this.touchable = value;
      }
    }, {
      key: "rotation",
      get: function get() {
        return this._displayObject.rotation;
      },
      set: function set(value) {
        if (this._displayObject.rotation != value) {
          this._displayObject.rotation = value;
          this.updateGear(3);
        }
      }
    }, {
      key: "rotationX",
      get: function get() {
        return this._displayObject.rotationX;
      },
      set: function set(value) {
        this._displayObject.rotationX = value;
      }
    }, {
      key: "rotationY",
      get: function get() {
        return this._displayObject.rotationY;
      },
      set: function set(value) {
        this._displayObject.rotationY = value;
      }
    }, {
      key: "alpha",
      get: function get() {
        return this._alpha;
      },
      set: function set(value) {
        if (this._alpha != value) {
          this._alpha = value;
          this.handleAlphaChanged();
          this.updateGear(3);
        }
      }
    }, {
      key: "visible",
      get: function get() {
        return this._visible;
      },
      set: function set(value) {
        if (this._visible != value) {
          this._visible = value;
          this.handleVisibleChanged();
          if (this._parent) this._parent.setBoundsChangedFlag();
          if (this._group && this._group.excludeInvisibles) this._group.setBoundsChangedFlag();
        }
      }
    }, {
      key: "internalVisible",
      get: function get() {
        return this._internalVisible && (!this._group || this._group.internalVisible);
      }
    }, {
      key: "internalVisible2",
      get: function get() {
        return this._visible && (!this._group || this._group.internalVisible2);
      }
    }, {
      key: "internalVisible3",
      get: function get() {
        return this._internalVisible && this._visible;
      }
    }, {
      key: "sortingOrder",
      get: function get() {
        return this._sortingOrder;
      },
      set: function set(value) {
        if (value < 0) value = 0;

        if (this._sortingOrder != value) {
          var old = this._sortingOrder;
          this._sortingOrder = value;
          if (this._parent) this._parent.childSortingOrderChanged(this, old, this._sortingOrder);
        }
      }
    }, {
      key: "tooltips",
      get: function get() {
        return this._tooltips;
      },
      set: function set(value) {
        if (this._tooltips) {
          this.off(fgui.RollEvent.RollOver, this.__rollOver, this);
          this.off(fgui.RollEvent.RollOut, this.__rollOut, this);
        }

        this._tooltips = value;

        if (this._tooltips) {
          this.on(fgui.RollEvent.RollOver, this.__rollOver, this);
          this.on(fgui.RollEvent.RollOut, this.__rollOut, this);
        }
      }
    }, {
      key: "blendMode",
      get: function get() {
        return this._displayObject.blendMode;
      },
      set: function set(value) {
        this._displayObject.blendMode = value;
      }
    }, {
      key: "onStage",
      get: function get() {
        return this._displayObject.stage != null;
      }
    }, {
      key: "resourceURL",
      get: function get() {
        if (this.packageItem) return "ui://" + this.packageItem.owner.id + this.packageItem.id;else return null;
      }
    }, {
      key: "group",
      set: function set(value) {
        if (this._group != value) {
          if (this._group) this._group.setBoundsChangedFlag();
          this._group = value;
          if (this._group) this._group.setBoundsChangedFlag();
        }
      },
      get: function get() {
        return this._group;
      }
    }, {
      key: "relations",
      get: function get() {
        return this._relations;
      }
    }, {
      key: "displayObject",
      get: function get() {
        return this._displayObject;
      }
    }, {
      key: "obj3D",
      get: function get() {
        return this._displayObject.obj3D;
      }
    }, {
      key: "parent",
      get: function get() {
        return this._parent;
      },
      set: function set(val) {
        this._parent = val;
      }
    }, {
      key: "asCom",
      get: function get() {
        return this;
      }
    }, {
      key: "text",
      get: function get() {
        return null;
      },
      set: function set(value) {}
    }, {
      key: "icon",
      get: function get() {
        return null;
      },
      set: function set(value) {}
    }, {
      key: "treeNode",
      get: function get() {
        return this._treeNode;
      }
    }, {
      key: "isDisposed",
      get: function get() {
        return this._displayObject == null;
      }
    }, {
      key: "draggable",
      get: function get() {
        return this._draggable;
      },
      set: function set(value) {
        if (this._draggable != value) {
          this._draggable = value;
          this.initDrag();
        }
      }
    }, {
      key: "dragBounds",
      get: function get() {
        return this._dragBounds;
      },
      set: function set(value) {
        this._dragBounds = value;
      }
    }, {
      key: "dragging",
      get: function get() {
        return GObject.draggingObject == this;
      }
    }], [{
      key: "cast",
      value: function cast(obj) {
        var dobj;

        if (obj instanceof THREE.Object3D) {
          dobj = obj["$owner"];
          if (!dobj) return null;
        } else dobj = obj;

        return dobj['$owner'];
      }
    }]);

    return GObject;
  }();

  fgui.GObject = GObject;
  var GearClasses = [fgui.GearDisplay, fgui.GearXY, fgui.GearSize, fgui.GearLook, fgui.GearColor, fgui.GearAnimation, fgui.GearText, fgui.GearIcon, fgui.GearDisplay2, fgui.GearFontSize];

  function createGear(owner, index) {
    var ret = new GearClasses[index]();
    ret._owner = owner;
    return ret;
  }

  var s_vec2 = new THREE.Vector2();
  var s_rect = new fgui.Rect();
  var sGlobalDragStart = new THREE.Vector2();
  var sGlobalRect = new fgui.Rect();
  var s_dragging;
  var BlendModeTranslate = {
    0: THREE.NormalBlending,
    1: THREE.NoBlending,
    2: THREE.AdditiveBlending,
    3: THREE.MultiplyBlending,
    4: THREE.SubtractiveBlending
  };
  fgui.gInstanceCounter = 0;
  fgui.constructingDepth = {
    n: 0
  };
})(fgui || (fgui = {}));

(function (fgui) {
  var GComponent = /*#__PURE__*/function (_fgui$GObject) {
    _inherits(GComponent, _fgui$GObject);

    var _super24 = _createSuper(GComponent);

    function GComponent() {
      var _this17;

      _classCallCheck(this, GComponent);

      _this17 = _super24.call(this);
      _this17._sortingChildCount = 0;
      _this17._children = [];
      _this17._controllers = [];
      _this17._transitions = [];
      _this17._margin = new fgui.Margin();
      _this17._alignOffset = new THREE.Vector2();
      _this17._childrenRenderOrder = 0;
      _this17._apexIndex = 0;
      return _this17;
    }

    _createClass(GComponent, [{
      key: "createDisplayObject",
      value: function createDisplayObject() {
        _get(_getPrototypeOf(GComponent.prototype), "createDisplayObject", this).call(this);

        this._container = new fgui.DisplayObject();
        this._displayObject = this._container;
      }
    }, {
      key: "dispose",
      value: function dispose() {
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

        if (this.scrollPane) this.scrollPane.dispose();
        cnt = this._children.length;

        for (i = cnt - 1; i >= 0; --i) {
          var obj = this._children[i];
          obj.parent = null;
          obj.dispose();
        }

        this._boundsChanged = false;

        _get(_getPrototypeOf(GComponent.prototype), "dispose", this).call(this);
      }
    }, {
      key: "addChild",
      value: function addChild(child) {
        this.addChildAt(child, this._children.length);
        return child;
      }
    }, {
      key: "addChildAt",
      value: function addChildAt(child, index) {
        if (!child) throw "child is null";

        if (index >= 0 && index <= this._children.length) {
          if (child.parent == this) {
            this.setChildIndex(child, index);
          } else {
            child.removeFromParent();
            child.parent = this;
            var cnt = this._children.length;

            if (child.sortingOrder != 0) {
              this._sortingChildCount++;
              index = this.getInsertPosForSortingChild(child);
            } else if (this._sortingChildCount > 0) {
              if (index > cnt - this._sortingChildCount) index = cnt - this._sortingChildCount;
            }

            if (index == cnt) this._children.push(child);else this._children.splice(index, 0, child);
            this.childStateChanged(child);
            this.setBoundsChangedFlag();
          }

          return child;
        } else {
          throw "Invalid child index";
        }
      }
    }, {
      key: "getInsertPosForSortingChild",
      value: function getInsertPosForSortingChild(target) {
        var cnt = this._children.length;

        for (var i = 0; i < cnt; i++) {
          var child = this._children[i];
          if (child == target) continue;
          if (target.sortingOrder < child.sortingOrder) break;
        }

        return i;
      }
    }, {
      key: "removeChild",
      value: function removeChild(child, dispose) {
        var childIndex = this._children.indexOf(child);

        if (childIndex != -1) {
          this.removeChildAt(childIndex, dispose);
        }

        return child;
      }
    }, {
      key: "removeChildAt",
      value: function removeChildAt(index, dispose) {
        if (index >= 0 && index < this._children.length) {
          var child = this._children[index];
          child.parent = null;
          if (child.sortingOrder != 0) this._sortingChildCount--;

          this._children.splice(index, 1);

          child.group = null;

          if (child.displayObject.parent) {
            this._container.removeChild(child.displayObject);

            if (this._childrenRenderOrder == fgui.ChildrenRenderOrder.Arch) fgui.Timers.callLater(this.buildNativeDisplayList, this);
          }

          if (dispose) child.dispose();
          this.setBoundsChangedFlag();
          return child;
        } else {
          throw "Invalid child index";
        }
      }
    }, {
      key: "removeChildren",
      value: function removeChildren(beginIndex, endIndex, dispose) {
        beginIndex = beginIndex || 0;
        if (endIndex == null) endIndex = -1;
        if (endIndex < 0 || endIndex >= this._children.length) endIndex = this._children.length - 1;

        for (var i = beginIndex; i <= endIndex; ++i) {
          this.removeChildAt(beginIndex, dispose);
        }
      }
    }, {
      key: "getChildAt",
      value: function getChildAt(index) {
        if (index >= 0 && index < this._children.length) return this._children[index];else throw "Invalid child index";
      }
    }, {
      key: "getChild",
      value: function getChild(name) {
        var cnt = this._children.length;

        for (var i = 0; i < cnt; ++i) {
          if (this._children[i].name == name) return this._children[i];
        }

        return null;
      }
    }, {
      key: "getChildByPath",
      value: function getChildByPath(path) {
        var arr = path.split(".");
        var cnt = arr.length;
        var gcom = this;
        var obj;

        for (var i = 0; i < cnt; ++i) {
          obj = gcom.getChild(arr[i]);
          if (!obj) break;

          if (i != cnt - 1) {
            if (!(gcom instanceof GComponent)) {
              obj = null;
              break;
            } else gcom = obj;
          }
        }

        return obj;
      }
    }, {
      key: "getVisibleChild",
      value: function getVisibleChild(name) {
        var cnt = this._children.length;

        for (var i = 0; i < cnt; ++i) {
          var child = this._children[i];
          if (child.internalVisible && child.internalVisible2 && child.name == name) return child;
        }

        return null;
      }
    }, {
      key: "getChildInGroup",
      value: function getChildInGroup(name, group) {
        var cnt = this._children.length;

        for (var i = 0; i < cnt; ++i) {
          var child = this._children[i];
          if (child.group == group && child.name == name) return child;
        }

        return null;
      }
    }, {
      key: "getChildById",
      value: function getChildById(id) {
        var cnt = this._children.length;

        for (var i = 0; i < cnt; ++i) {
          if (this._children[i]._id == id) return this._children[i];
        }

        return null;
      }
    }, {
      key: "getChildIndex",
      value: function getChildIndex(child) {
        return this._children.indexOf(child);
      }
    }, {
      key: "setChildIndex",
      value: function setChildIndex(child, index) {
        var oldIndex = this._children.indexOf(child);

        if (oldIndex == -1) throw "Not a child of this container";
        if (child.sortingOrder != 0) return;
        var cnt = this._children.length;

        if (this._sortingChildCount > 0) {
          if (index > cnt - this._sortingChildCount - 1) index = cnt - this._sortingChildCount - 1;
        }

        this._setChildIndex(child, oldIndex, index);
      }
    }, {
      key: "setChildIndexBefore",
      value: function setChildIndexBefore(child, index) {
        var oldIndex = this._children.indexOf(child);

        if (oldIndex == -1) throw "Not a child of this container";
        if (child.sortingOrder != 0) return oldIndex;
        var cnt = this._children.length;

        if (this._sortingChildCount > 0) {
          if (index > cnt - this._sortingChildCount - 1) index = cnt - this._sortingChildCount - 1;
        }

        if (oldIndex < index) return this._setChildIndex(child, oldIndex, index - 1);else return this._setChildIndex(child, oldIndex, index);
      }
    }, {
      key: "_setChildIndex",
      value: function _setChildIndex(child, oldIndex, index) {
        var cnt = this._children.length;
        if (index > cnt) index = cnt;
        if (oldIndex == index) return oldIndex;

        this._children.splice(oldIndex, 1);

        this._children.splice(index, 0, child);

        if (child.displayObject.parent) {
          var displayIndex = 0;
          var g;
          var i;

          if (this._childrenRenderOrder == fgui.ChildrenRenderOrder.Ascent) {
            for (i = 0; i < index; i++) {
              g = this._children[i];
              if (g.displayObject.parent) displayIndex++;
            }

            if (displayIndex == this._container.numChildren) displayIndex--;

            this._container.setChildIndex(child.displayObject, displayIndex);
          } else if (this._childrenRenderOrder == fgui.ChildrenRenderOrder.Descent) {
            for (i = cnt - 1; i > index; i--) {
              g = this._children[i];
              if (g.displayObject.parent) displayIndex++;
            }

            if (displayIndex == this._container.numChildren) displayIndex--;

            this._container.setChildIndex(child.displayObject, displayIndex);
          } else {
            fgui.Timers.callLater(this.buildNativeDisplayList, this);
          }

          this.setBoundsChangedFlag();
        }

        return index;
      }
    }, {
      key: "swapChildren",
      value: function swapChildren(child1, child2) {
        var index1 = this._children.indexOf(child1);

        var index2 = this._children.indexOf(child2);

        if (index1 == -1 || index2 == -1) throw "Not a child of this container";
        this.swapChildrenAt(index1, index2);
      }
    }, {
      key: "swapChildrenAt",
      value: function swapChildrenAt(index1, index2) {
        var child1 = this._children[index1];
        var child2 = this._children[index2];
        this.setChildIndex(child1, index2);
        this.setChildIndex(child2, index1);
      }
    }, {
      key: "isAncestorOf",
      value: function isAncestorOf(child) {
        if (child == null) return false;
        var p = child.parent;

        while (p) {
          if (p == this) return true;
          p = p.parent;
        }

        return false;
      }
    }, {
      key: "addController",
      value: function addController(controller) {
        this._controllers.push(controller);

        controller.parent = this;
        this.applyController(controller);
      }
    }, {
      key: "getControllerAt",
      value: function getControllerAt(index) {
        return this._controllers[index];
      }
    }, {
      key: "getController",
      value: function getController(name) {
        var cnt = this._controllers.length;

        for (var i = 0; i < cnt; ++i) {
          var c = this._controllers[i];
          if (c.name == name) return c;
        }

        return null;
      }
    }, {
      key: "removeController",
      value: function removeController(c) {
        var index = this._controllers.indexOf(c);

        if (index == -1) throw new Error("controller not exists");
        c.parent = null;

        this._controllers.splice(index, 1);

        var length = this._children.length;

        for (var i = 0; i < length; i++) {
          var child = this._children[i];
          child.handleControllerChanged(c);
        }
      }
    }, {
      key: "childStateChanged",
      value: function childStateChanged(child) {
        if (this._buildingDisplayList) return;
        var cnt = this._children.length;

        if (child instanceof fgui.GGroup) {
          for (var i = 0; i < cnt; i++) {
            var g = this._children[i];
            if (g.group == child) this.childStateChanged(g);
          }

          return;
        }

        if (child.internalVisible) {
          if (!child.displayObject.parent) {
            var index = 0;

            if (this._childrenRenderOrder == fgui.ChildrenRenderOrder.Ascent) {
              for (var _i16 = 0; _i16 < cnt; _i16++) {
                var _g = this._children[_i16];
                if (_g == child) break;
                if (_g.displayObject.parent) index++;
              }

              this._container.addChildAt(child.displayObject, index);
            } else if (this._childrenRenderOrder == fgui.ChildrenRenderOrder.Descent) {
              for (var _i17 = cnt - 1; _i17 >= 0; _i17--) {
                var _g2 = this._children[_i17];
                if (_g2 == child) break;
                if (_g2.displayObject.parent) index++;
              }

              this._container.addChildAt(child.displayObject, index);
            } else {
              this._container.addChild(child.displayObject);

              fgui.Timers.callLater(this.buildNativeDisplayList, this);
            }
          }
        } else {
          if (child.displayObject.parent) {
            this._container.removeChild(child.displayObject);

            if (this._childrenRenderOrder == fgui.ChildrenRenderOrder.Arch) fgui.Timers.callLater(this.buildNativeDisplayList, this);
          }
        }
      }
    }, {
      key: "buildNativeDisplayList",
      value: function buildNativeDisplayList() {
        if (!this._displayObject) return;
        var cnt = this._children.length;
        if (cnt == 0) return;

        switch (this._childrenRenderOrder) {
          case fgui.ChildrenRenderOrder.Ascent:
            {
              for (var i = 0; i < cnt; i++) {
                var g = this._children[i];
                if (g.internalVisible) this._container.addChild(g.displayObject);
              }
            }
            break;

          case fgui.ChildrenRenderOrder.Descent:
            {
              for (var _i18 = cnt - 1; _i18 >= 0; _i18--) {
                var _g3 = this._children[_i18];
                if (_g3.internalVisible) this._container.addChild(_g3.displayObject);
              }
            }
            break;

          case fgui.ChildrenRenderOrder.Arch:
            {
              var apex = fgui.clamp(this._apexIndex, 0, cnt);

              for (var _i19 = 0; _i19 < apex; _i19++) {
                var _g4 = this._children[_i19];
                if (_g4.internalVisible) this._container.addChild(_g4.displayObject);
              }

              for (var _i20 = cnt - 1; _i20 >= apex; _i20--) {
                var _g5 = this._children[_i20];
                if (_g5.internalVisible) this._container.addChild(_g5.displayObject);
              }
            }
            break;
        }
      }
    }, {
      key: "applyController",
      value: function applyController(c) {
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
    }, {
      key: "applyAllControllers",
      value: function applyAllControllers() {
        var cnt = this._controllers.length;

        for (var i = 0; i < cnt; ++i) {
          this.applyController(this._controllers[i]);
        }
      }
    }, {
      key: "adjustRadioGroupDepth",
      value: function adjustRadioGroupDepth(obj, c) {
        var cnt = this._children.length;
        var myIndex = -1,
            maxIndex = -1;

        for (var i = 0; i < cnt; i++) {
          var child = this._children[i];

          if (child == obj) {
            myIndex = i;
          } else if ("relatedController" in child && child.relatedController == c) {
            if (i > maxIndex) maxIndex = i;
          }
        }

        if (myIndex < maxIndex) {
          if (this._applyingController) this._children[maxIndex].handleControllerChanged(this._applyingController);
          this.swapChildrenAt(myIndex, maxIndex);
        }
      }
    }, {
      key: "getTransitionAt",
      value: function getTransitionAt(index) {
        return this._transitions[index];
      }
    }, {
      key: "getTransition",
      value: function getTransition(transName) {
        var cnt = this._transitions.length;

        for (var i = 0; i < cnt; ++i) {
          var trans = this._transitions[i];
          if (trans.name == transName) return trans;
        }

        return null;
      }
    }, {
      key: "isChildInView",
      value: function isChildInView(child) {
        if (this._displayObject.clipRect) {
          return child.x + child.width >= 0 && child.x <= this.width && child.y + child.height >= 0 && child.y <= this.height;
        } else if (this._scrollPane) {
          return this._scrollPane.isChildInView(child);
        } else return true;
      }
    }, {
      key: "getFirstChildInView",
      value: function getFirstChildInView() {
        var cnt = this._children.length;

        for (var i = 0; i < cnt; ++i) {
          var child = this._children[i];
          if (this.isChildInView(child)) return i;
        }

        return -1;
      }
    }, {
      key: "updateMask",
      value: function updateMask() {
        var rect = this._displayObject.clipRect;
        if (rect == null) rect = new fgui.Rect();
        rect.x = this._margin.left;
        rect.y = this._margin.top;
        rect.width = this._width - this._margin.right;
        rect.height = this._height - this._margin.bottom;
        this._displayObject.clipRect = rect;
      }
    }, {
      key: "setupScroll",
      value: function setupScroll(buffer) {
        if (this._displayObject == this._container) {
          this._container = new fgui.DisplayObject();

          this._displayObject.addChild(this._container);
        }

        this._scrollPane = new fgui.ScrollPane(this);

        this._scrollPane.setup(buffer);
      }
    }, {
      key: "setupOverflow",
      value: function setupOverflow(overflow) {
        if (overflow == fgui.OverflowType.Hidden) {
          if (this._displayObject == this._container) {
            this._container = new fgui.DisplayObject();

            this._displayObject.addChild(this._container);
          }

          this.updateMask();

          this._container.setPosition(this._margin.left, this._margin.top);
        } else if (this._margin.left != 0 || this._margin.top != 0) {
          if (this._displayObject == this._container) {
            this._container = new fgui.DisplayObject();

            this._displayObject.addChild(this._container);
          }

          this._container.setPosition(this._margin.left, this._margin.top);
        }
      }
    }, {
      key: "handleSizeChanged",
      value: function handleSizeChanged() {
        _get(_getPrototypeOf(GComponent.prototype), "handleSizeChanged", this).call(this);

        if (this._scrollPane) this._scrollPane.onOwnerSizeChanged();else if (this._displayObject.clipRect) this.updateMask();
      }
    }, {
      key: "handleGrayedChanged",
      value: function handleGrayedChanged() {
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
    }, {
      key: "handleControllerChanged",
      value: function handleControllerChanged(c) {
        _get(_getPrototypeOf(GComponent.prototype), "handleControllerChanged", this).call(this, c);

        if (this._scrollPane) this._scrollPane.handleControllerChanged(c);
      }
    }, {
      key: "setBoundsChangedFlag",
      value: function setBoundsChangedFlag() {
        if (!this._scrollPane && !this._trackBounds) return;

        if (!this._boundsChanged) {
          this._boundsChanged = true;
          fgui.Timers.callLater(this.__render, this);
        }
      }
    }, {
      key: "__render",
      value: function __render() {
        if (this._boundsChanged) {
          this.updateBounds();
        }
      }
    }, {
      key: "ensureBoundsCorrect",
      value: function ensureBoundsCorrect() {
        if (this._boundsChanged) this.updateBounds();
      }
    }, {
      key: "updateBounds",
      value: function updateBounds() {
        var ax = 0,
            ay = 0,
            aw = 0,
            ah = 0;
        var len = this._children.length;

        if (len > 0) {
          ax = Number.POSITIVE_INFINITY, ay = Number.POSITIVE_INFINITY;
          var ar = Number.NEGATIVE_INFINITY,
              ab = Number.NEGATIVE_INFINITY;
          var tmp = 0;
          var i1 = 0;

          for (i1 = 0; i1 < len; i1++) {
            var child = this._children[i1];
            tmp = child.x;
            if (tmp < ax) ax = tmp;
            tmp = child.y;
            if (tmp < ay) ay = tmp;
            tmp = child.x + child.actualWidth;
            if (tmp > ar) ar = tmp;
            tmp = child.y + child.actualHeight;
            if (tmp > ab) ab = tmp;
          }

          aw = ar - ax;
          ah = ab - ay;
        }

        this.setBounds(ax, ay, aw, ah);
      }
    }, {
      key: "setBounds",
      value: function setBounds(ax, ay, aw, ah) {
        this._boundsChanged = false;
        if (this._scrollPane) this._scrollPane.setContentSize(Math.round(ax + aw), Math.round(ay + ah));
      }
    }, {
      key: "getSnappingPosition",
      value: function getSnappingPosition(xValue, yValue, resultPoint) {
        return this.getSnappingPositionWithDir(xValue, yValue, 0, 0, resultPoint);
      }
    }, {
      key: "getSnappingPositionWithDir",
      value: function getSnappingPositionWithDir(xValue, yValue, xDir, yDir, resultPoint) {
        if (!resultPoint) resultPoint = new THREE.Vector2();
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
              } else {
                prev = this._children[i - 1];
                if (yValue < prev.y + prev.actualHeight / 2) yValue = prev.y;else yValue = obj.y;
                break;
              }
            }
          }

          if (i == cnt) yValue = obj.y;
        }

        if (xValue != 0) {
          if (i > 0) i--;

          for (; i < cnt; i++) {
            obj = this._children[i];

            if (xValue < obj.x) {
              if (i == 0) {
                xValue = 0;
                break;
              } else {
                prev = this._children[i - 1];
                if (xValue < prev.x + prev.actualWidth / 2) xValue = prev.x;else xValue = obj.x;
                break;
              }
            }
          }

          if (i == cnt) xValue = obj.x;
        }

        resultPoint.x = xValue;
        resultPoint.y = yValue;
        return resultPoint;
      }
    }, {
      key: "childSortingOrderChanged",
      value: function childSortingOrderChanged(child, oldValue, newValue) {
        if (newValue == 0) {
          this._sortingChildCount--;
          this.setChildIndex(child, this._children.length);
        } else {
          if (oldValue == 0) this._sortingChildCount++;

          var oldIndex = this._children.indexOf(child);

          var index = this.getInsertPosForSortingChild(child);
          if (oldIndex < index) this._setChildIndex(child, oldIndex, index - 1);else this._setChildIndex(child, oldIndex, index);
        }
      }
    }, {
      key: "constructFromResource",
      value: function constructFromResource() {
        this.constructFromResource2(null, 0);
      }
    }, {
      key: "constructFromResource2",
      value: function constructFromResource2(objectPool, poolIndex) {
        var _this18 = this;

        var contentItem = this.packageItem.getBranch();

        if (!contentItem.decoded) {
          contentItem.decoded = true;
          fgui.TranslationHelper.translateComponent(contentItem);
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

        if (overflow == fgui.OverflowType.Scroll) {
          var savedPos = buffer.pos;
          buffer.seek(0, 7);
          this.setupScroll(buffer);
          buffer.pos = savedPos;
        } else this.setupOverflow(overflow);

        if (buffer.readBool()) buffer.skip(8);
        this._buildingDisplayList = true;
        buffer.seek(0, 1);
        var controllerCount = buffer.readShort();

        for (i = 0; i < controllerCount; i++) {
          nextPos = buffer.readShort();
          nextPos += buffer.pos;
          var controller = new fgui.Controller();

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
          if (objectPool) child = objectPool[poolIndex + i];else {
            buffer.seek(curPos, 0);
            var type = buffer.readByte();
            var src = buffer.readS();
            var pkgId = buffer.readS();
            var pi;

            if (src) {
              var pkg;
              if (pkgId) pkg = fgui.UIPackage.getById(pkgId);else pkg = contentItem.owner;
              pi = pkg ? pkg.getItemById(src) : null;
            } else pi = null;

            if (pi) {
              child = fgui.Decls.UIObjectFactory.newObject(pi);
              child.constructFromResource();
            } else child = fgui.Decls.UIObjectFactory.newObject(type);
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
        buffer.skip(2);
        this.opaque = buffer.readBool();
        var maskId = buffer.readShort();

        if (maskId != -1) {
          buffer.readBool();
        }

        var hitTestId = buffer.readS();
        i1 = buffer.readInt();
        i2 = buffer.readInt();

        if (hitTestId) {
          pi = contentItem.owner.getItemById(hitTestId);
          if (pi && pi.pixelHitTestData) this._displayObject.hitArea = new fgui.PixelHitTest(pi.pixelHitTestData, i1, i2, this.sourceWidth, this.sourceHeight);
        } else if (i1 != 0 && i2 != -1) {
          this._displayObject.hitArea = new fgui.ShapeHitTest(this.getChildAt(i2).displayObject);
        }

        buffer.seek(0, 5);
        var transitionCount = buffer.readShort();

        for (i = 0; i < transitionCount; i++) {
          nextPos = buffer.readShort();
          nextPos += buffer.pos;
          var trans = new fgui.Transition(this);
          trans.setup(buffer);

          this._transitions.push(trans);

          buffer.pos = nextPos;
        }

        if (this._transitions.length > 0) {
          this.on(fgui.StageEvent.AddtoStage, function () {
            _this18._transitions.forEach(function (e) {
              return e.onOwnerAddedToStage();
            });
          });
          this.on(fgui.StageEvent.RemoveFromStage, function () {
            _this18._transitions.forEach(function (e) {
              return e.onOwnerRemovedFromStage();
            });
          });
        }

        this.applyAllControllers();
        this._buildingDisplayList = false;
        this._underConstruct = false;
        this.buildNativeDisplayList();
        this.setBoundsChangedFlag();
        if (contentItem.objectType != fgui.ObjectType.Component) this.constructExtension(buffer);
        this.onConstruct();
      }
    }, {
      key: "constructExtension",
      value: function constructExtension(buffer) {}
    }, {
      key: "onConstruct",
      value: function onConstruct() {}
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GComponent.prototype), "setup_afterAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 4);
        var pageController = buffer.readShort();
        if (pageController != -1 && this._scrollPane) this._scrollPane.pageController = this._parent.getControllerAt(pageController);
        var cnt;
        var i;
        cnt = buffer.readShort();

        for (i = 0; i < cnt; i++) {
          var cc = this.getController(buffer.readS());
          var pageId = buffer.readS();
          if (cc) cc.selectedPageId = pageId;
        }

        if (buffer.version >= 2) {
          cnt = buffer.readShort();

          for (i = 0; i < cnt; i++) {
            var target = buffer.readS();
            var propertyId = buffer.readShort();
            var value = buffer.readS();
            var obj = this.getChildByPath(target);
            if (obj) obj.setProp(propertyId, value);
          }
        }
      }
    }, {
      key: "displayListContainer",
      get: function get() {
        return this._container;
      }
    }, {
      key: "numChildren",
      get: function get() {
        return this._children.length;
      }
    }, {
      key: "controllers",
      get: function get() {
        return this._controllers;
      }
    }, {
      key: "scrollPane",
      get: function get() {
        return this._scrollPane;
      }
    }, {
      key: "opaque",
      get: function get() {
        return this._displayObject.opaque;
      },
      set: function set(value) {
        this._displayObject.opaque = value;
      }
    }, {
      key: "margin",
      get: function get() {
        return this._margin;
      },
      set: function set(value) {
        this._margin.copy(value);

        if (this._displayObject.clipRect) {
          this._container.setPosition(this._margin.left + this._alignOffset.x, this._margin.top + this._alignOffset.y);
        }

        this.handleSizeChanged();
      }
    }, {
      key: "childrenRenderOrder",
      get: function get() {
        return this._childrenRenderOrder;
      },
      set: function set(value) {
        if (this._childrenRenderOrder != value) {
          this._childrenRenderOrder = value;
          this.buildNativeDisplayList();
        }
      }
    }, {
      key: "apexIndex",
      get: function get() {
        return this._apexIndex;
      },
      set: function set(value) {
        if (this._apexIndex != value) {
          this._apexIndex = value;
          if (this._childrenRenderOrder == fgui.ChildrenRenderOrder.Arch) this.buildNativeDisplayList();
        }
      }
    }, {
      key: "baseUserData",
      get: function get() {
        var buffer = this.packageItem.rawData;
        buffer.seek(0, 4);
        return buffer.readS();
      }
    }, {
      key: "viewWidth",
      get: function get() {
        if (this._scrollPane) return this._scrollPane.viewWidth;else return this.width - this._margin.left - this._margin.right;
      },
      set: function set(value) {
        if (this._scrollPane) this._scrollPane.viewWidth = value;else this.width = value + this._margin.left + this._margin.right;
      }
    }, {
      key: "viewHeight",
      get: function get() {
        if (this._scrollPane) return this._scrollPane.viewHeight;else return this.height - this._margin.top - this._margin.bottom;
      },
      set: function set(value) {
        if (this._scrollPane) this._scrollPane.viewHeight = value;else this.height = value + this._margin.top + this._margin.bottom;
      }
    }]);

    return GComponent;
  }(fgui.GObject);

  fgui.GComponent = GComponent;
})(fgui || (fgui = {}));

(function (fgui) {
  var GButton = /*#__PURE__*/function (_fgui$GComponent) {
    _inherits(GButton, _fgui$GComponent);

    var _super25 = _createSuper(GButton);

    function GButton() {
      var _this19;

      _classCallCheck(this, GButton);

      _this19 = _super25.call(this);
      _this19._soundVolumeScale = 0;
      _this19._downEffect = 0;
      _this19._downEffectValue = 0;
      _this19._downScaled = false;
      _this19._mode = fgui.ButtonMode.Common;
      _this19._title = "";
      _this19._icon = "";
      _this19._sound = fgui.UIConfig.buttonSound;
      _this19._soundVolumeScale = fgui.UIConfig.buttonSoundVolumeScale;
      _this19._changeStateOnClick = true;
      _this19._downEffectValue = 0.8;
      return _this19;
    }

    _createClass(GButton, [{
      key: "getTextField",
      value: function getTextField() {
        if (this._titleObject instanceof fgui.GTextField) return this._titleObject;else if ('getTextField' in this._titleObject) return this._titleObject.getTextField();else return null;
      }
    }, {
      key: "fireClick",
      value: function fireClick(downEffect, clickCall) {
        var _this20 = this;

        downEffect = downEffect || false;

        if (downEffect && this._mode == fgui.ButtonMode.Common) {
          this.setState("over");
          fgui.Timers.add(100, 1, this.setState, this, "down");
          fgui.Timers.add(200, 1, this.setState, this, function () {
            _this20.setState("up");

            if (clickCall) _this20.dispatchEvent(fgui.InteractiveEvents.Click);
          });
        }
      }
    }, {
      key: "setState",
      value: function setState(val) {
        if (this._buttonController) this._buttonController.selectedPage = val;

        if (this._downEffect == 1) {
          var cnt = this.numChildren;

          if (val == "down" || val == "selectedOver" || val == "selectedDisabled") {
            var p = this._downEffectValue * 255;
            var r = (p << 16) + (p << 8) + p;

            for (var i = 0; i < cnt; i++) {
              var obj = this.getChildAt(i);
              if (!(obj instanceof fgui.GTextField)) obj.setProp(fgui.ObjectPropID.Color, r);
            }
          } else {
            for (i = 0; i < cnt; i++) {
              obj = this.getChildAt(i);
              if (!(obj instanceof fgui.GTextField)) obj.setProp(fgui.ObjectPropID.Color, 0xFFFFFF);
            }
          }
        } else if (this._downEffect == 2) {
          if (val == "down" || val == "selectedOver" || val == "selectedDisabled") {
            if (!this._downScaled) {
              this.setScale(this.scaleX * this._downEffectValue, this.scaleY * this._downEffectValue);
              this._downScaled = true;
            }
          } else {
            if (this._downScaled) {
              this.setScale(this.scaleX / this._downEffectValue, this.scaleY / this._downEffectValue);
              this._downScaled = false;
            }
          }
        }
      }
    }, {
      key: "setCurrentState",
      value: function setCurrentState() {
        if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled")) {
          if (this._selected) this.setState("selectedDisabled");else this.setState("disabled");
        } else {
          if (this._selected) this.setState(this._over ? "selectedOver" : "down");else this.setState(this._over ? "over" : "up");
        }
      }
    }, {
      key: "handleControllerChanged",
      value: function handleControllerChanged(c) {
        _get(_getPrototypeOf(GButton.prototype), "handleControllerChanged", this).call(this, c);

        if (this._relatedController == c) this.selected = this._relatedPageId == c.selectedPageId;
      }
    }, {
      key: "handleGrayedChanged",
      value: function handleGrayedChanged() {
        if (this._buttonController && this._buttonController.hasPage("disabled")) {
          if (this.grayed) {
            if (this._selected && this._buttonController.hasPage("selectedDisabled")) this.setState("selectedDisabled");else this.setState("disabled");
          } else if (this._selected) this.setState("down");else this.setState("up");
        } else _get(_getPrototypeOf(GButton.prototype), "handleGrayedChanged", this).call(this);
      }
    }, {
      key: "getProp",
      value: function getProp(index) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            return this.titleColor;

          case fgui.ObjectPropID.OutlineColor:
            {
              var tf = this.getTextField();
              if (tf) return tf.textFormat.outlineColor;else return 0;
            }

          case fgui.ObjectPropID.FontSize:
            return this.titleFontSize;

          case fgui.ObjectPropID.Selected:
            return this.selected;

          default:
            return _get(_getPrototypeOf(GButton.prototype), "getProp", this).call(this, index);
        }
      }
    }, {
      key: "setProp",
      value: function setProp(index, value) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            this.titleColor = value;
            break;

          case fgui.ObjectPropID.OutlineColor:
            {
              var tf = this.getTextField();

              if (tf) {
                tf.textFormat.outlineColor = value;
                tf.applyFormat();
              }
            }
            break;

          case fgui.ObjectPropID.FontSize:
            this.titleFontSize = value;
            break;

          case fgui.ObjectPropID.Selected:
            this.selected = value;
            break;

          default:
            _get(_getPrototypeOf(GButton.prototype), "setProp", this).call(this, index, value);

            break;
        }
      }
    }, {
      key: "constructExtension",
      value: function constructExtension(buffer) {
        buffer.seek(0, 6);
        this._mode = buffer.readByte();
        var str = buffer.readS();
        if (str) this._sound = str;
        this._soundVolumeScale = buffer.readFloat();
        this._downEffect = buffer.readByte();
        this._downEffectValue = buffer.readFloat();
        if (this._downEffect == 2) this.setPivot(0.5, 0.5, this.pivotAsAnchor);
        this._buttonController = this.getController("button");
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
        if (this._titleObject) this._title = this._titleObject.text;
        if (this._iconObject) this._icon = this._iconObject.icon;
        if (this._mode == fgui.ButtonMode.Common) this.setState("up");
        this.on(fgui.RollEvent.RollOver, this.__rollover, this);
        this.on(fgui.RollEvent.RollOut, this.__rollout, this);
        this.on(fgui.InteractiveEvents.Down, this.__btnTouchBegin, this);
        this.on(fgui.InteractiveEvents.Up, this.__btnTouchEnd, this);
        this.on(fgui.InteractiveEvents.Click, this.__click, this);
        this.on(fgui.StageEvent.RemoveFromStage, this.__removeFromStage, this);
      }
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GButton.prototype), "setup_afterAdd", this).call(this, buffer, beginPos);

        if (!buffer.seek(beginPos, 6)) return;
        if (buffer.readByte() != this.packageItem.objectType) return;
        var str;
        var iv;
        str = buffer.readS();
        if (str != null) this.title = str;
        str = buffer.readS();
        if (str != null) this.selectedTitle = str;
        str = buffer.readS();
        if (str != null) this.icon = str;
        str = buffer.readS();
        if (str != null) this.selectedIcon = str;
        if (buffer.readBool()) this.titleColor = buffer.readColor();
        iv = buffer.readInt();
        if (iv != 0) this.titleFontSize = iv;
        iv = buffer.readShort();
        if (iv >= 0) this._relatedController = this.parent.getControllerAt(iv);
        this._relatedPageId = buffer.readS();
        str = buffer.readS();
        if (str != null) this._sound = str;
        if (buffer.readBool()) this._soundVolumeScale = buffer.readFloat();
        this.selected = buffer.readBool();
      }
    }, {
      key: "__rollover",
      value: function __rollover() {
        if (!this._buttonController || !this._buttonController.hasPage("over")) return;
        this._over = true;
        if (this._down) return;
        if (this.grayed && this._buttonController.hasPage("disabled")) return;
        this.setState(this._selected ? "selectedOver" : "over");
      }
    }, {
      key: "__rollout",
      value: function __rollout() {
        if (!this._buttonController || !this._buttonController.hasPage("over")) return;
        this._over = false;
        if (this._down) return;
        if (this.grayed && this._buttonController.hasPage("disabled")) return;
        this.setState(this._selected ? "down" : "up");
      }
    }, {
      key: "__btnTouchBegin",
      value: function __btnTouchBegin(evt) {
        if (evt.input.button != 0) return;
        this._down = true;
        evt.captureTouch();

        if (this._mode == fgui.ButtonMode.Common) {
          if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled")) this.setState("selectedDisabled");else this.setState("down");
        }

        if (this._linkedPopup) {
          if (this._linkedPopup instanceof fgui.Window) this._linkedPopup.toggleStatus();else fgui.GRoot.findFor(this).togglePopup(this._linkedPopup, this);
        }
      }
    }, {
      key: "__btnTouchEnd",
      value: function __btnTouchEnd(evt) {
        if (this._down) {
          this._down = false;

          if (this._mode == fgui.ButtonMode.Common) {
            if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled")) this.setState("disabled");else if (this._over) this.setState("over");else this.setState("up");
          } else {
            if (!this._over && this._buttonController && (this._buttonController.selectedPage == "over" || this._buttonController.selectedPage == "selectedOver")) {
              this.setCurrentState();
            }
          }
        }
      }
    }, {
      key: "__removeFromStage",
      value: function __removeFromStage() {
        if (this._over) this.__rollout();
      }
    }, {
      key: "__click",
      value: function __click(evt) {
        if (this._sound) {
          var pi = fgui.UIPackage.getItemByURL(this._sound);
          if (pi) fgui.GRoot.inst.playOneShotSound(pi.file);else fgui.GRoot.inst.playOneShotSound(this._sound);
        }

        if (this._mode == fgui.ButtonMode.Check) {
          if (this._changeStateOnClick) {
            this.selected = !this._selected;
            this.dispatchEvent(fgui.StateChangeEvent.CHANGED);
          }
        } else if (this._mode == fgui.ButtonMode.Radio) {
          if (this._changeStateOnClick && !this._selected) {
            this.selected = true;
            this.dispatchEvent(fgui.StateChangeEvent.CHANGED);
          }
        } else {
          if (this._relatedController) this._relatedController.selectedPageId = this._relatedPageId;
        }
      }
    }, {
      key: "icon",
      get: function get() {
        return this._icon;
      },
      set: function set(value) {
        this._icon = value;
        value = this._selected && this._selectedIcon ? this._selectedIcon : this._icon;
        if (this._iconObject) this._iconObject.icon = value;
        this.updateGear(7);
      }
    }, {
      key: "selectedIcon",
      get: function get() {
        return this._selectedIcon;
      },
      set: function set(value) {
        this._selectedIcon = value;
        value = this._selected && this._selectedIcon ? this._selectedIcon : this._icon;
        if (this._iconObject) this._iconObject.icon = value;
      }
    }, {
      key: "title",
      get: function get() {
        return this._title;
      },
      set: function set(value) {
        this._title = value;
        if (this._titleObject) this._titleObject.text = this._selected && this._selectedTitle ? this._selectedTitle : this._title;
        this.updateGear(6);
      }
    }, {
      key: "text",
      get: function get() {
        return this.title;
      },
      set: function set(value) {
        this.title = value;
      }
    }, {
      key: "selectedTitle",
      get: function get() {
        return this._selectedTitle;
      },
      set: function set(value) {
        this._selectedTitle = value;
        if (this._titleObject) this._titleObject.text = this._selected && this._selectedTitle ? this._selectedTitle : this._title;
      }
    }, {
      key: "titleColor",
      get: function get() {
        var tf = this.getTextField();
        if (tf) return tf.color;else return 0;
      },
      set: function set(value) {
        var tf = this.getTextField();
        if (tf) tf.color = value;
        this.updateGear(4);
      }
    }, {
      key: "titleFontSize",
      get: function get() {
        var tf = this.getTextField();
        if (tf) return tf.textFormat.size;else return 0;
      },
      set: function set(value) {
        var tf = this.getTextField();

        if (tf) {
          tf.textFormat.size = value;
          tf.applyFormat();
        }
      }
    }, {
      key: "sound",
      get: function get() {
        return this._sound;
      },
      set: function set(val) {
        this._sound = val;
      }
    }, {
      key: "soundVolumeScale",
      get: function get() {
        return this._soundVolumeScale;
      },
      set: function set(value) {
        this._soundVolumeScale = value;
      }
    }, {
      key: "selected",
      set: function set(val) {
        if (this._mode == fgui.ButtonMode.Common) return;

        if (this._selected != val) {
          this._selected = val;
          this.setCurrentState();
          if (this._selectedTitle && this._titleObject) this._titleObject.text = this._selected ? this._selectedTitle : this._title;

          if (this._selectedIcon) {
            var str = this._selected ? this._selectedIcon : this._icon;
            if (this._iconObject) this._iconObject.icon = str;
          }

          if (this._relatedController && this._parent && !this._parent._buildingDisplayList) {
            if (this._selected) {
              this._relatedController.selectedPageId = this._relatedPageId;
              if (this._relatedController.autoRadioGroupDepth) this._parent.adjustRadioGroupDepth(this, this._relatedController);
            } else if (this._mode == fgui.ButtonMode.Check && this._relatedController.selectedPageId == this._relatedPageId) this._relatedController.oppositePageId = this._relatedPageId;
          }
        }
      },
      get: function get() {
        return this._selected;
      }
    }, {
      key: "mode",
      get: function get() {
        return this._mode;
      },
      set: function set(value) {
        if (this._mode != value) {
          if (value == fgui.ButtonMode.Common) this.selected = false;
          this._mode = value;
        }
      }
    }, {
      key: "relatedController",
      get: function get() {
        return this._relatedController;
      },
      set: function set(val) {
        if (val != this._relatedController) {
          this._relatedController = val;
          this._relatedPageId = null;
        }
      }
    }, {
      key: "relatedPageId",
      get: function get() {
        return this._relatedPageId;
      },
      set: function set(val) {
        this._relatedPageId = val;
      }
    }, {
      key: "changeStateOnClick",
      get: function get() {
        return this._changeStateOnClick;
      },
      set: function set(value) {
        this._changeStateOnClick = value;
      }
    }, {
      key: "linkedPopup",
      get: function get() {
        return this._linkedPopup;
      },
      set: function set(value) {
        this._linkedPopup = value;
      }
    }]);

    return GButton;
  }(fgui.GComponent);

  fgui.GButton = GButton;
})(fgui || (fgui = {}));

(function (fgui) {
  var GComboBox = /*#__PURE__*/function (_fgui$GComponent2) {
    _inherits(GComboBox, _fgui$GComponent2);

    var _super26 = _createSuper(GComboBox);

    function GComboBox() {
      var _this21;

      _classCallCheck(this, GComboBox);

      _this21 = _super26.call(this);
      _this21.visibleItemCount = fgui.UIConfig.defaultComboBoxVisibleItemCount;
      _this21.popupDirection = fgui.PopupDirection.Auto;
      _this21._itemsUpdated = true;
      _this21._selectedIndex = -1;
      _this21._items = [];
      _this21._values = [];
      return _this21;
    }

    _createClass(GComboBox, [{
      key: "getTextField",
      value: function getTextField() {
        if (this._titleObject instanceof fgui.GTextField) return this._titleObject;else if ('getTextField' in this._titleObject) return this._titleObject.getTextField();else return null;
      }
    }, {
      key: "setState",
      value: function setState(val) {
        if (this._buttonController) this._buttonController.selectedPage = val;
      }
    }, {
      key: "setCurrentState",
      value: function setCurrentState() {
        if (this.grayed && this._buttonController && this._buttonController.hasPage("disabled")) this.setState("disabled");else if (this.dropdown && this.dropdown.parent) this.setState("down");else this.setState(this._over ? "over" : "up");
      }
    }, {
      key: "handleControllerChanged",
      value: function handleControllerChanged(c) {
        _get(_getPrototypeOf(GComboBox.prototype), "handleControllerChanged", this).call(this, c);

        if (this._selectionController == c) this.selectedIndex = c.selectedIndex;
      }
    }, {
      key: "updateSelectionController",
      value: function updateSelectionController() {
        if (this._selectionController && !this._selectionController.changing && this._selectedIndex < this._selectionController.pageCount) {
          var c = this._selectionController;
          this._selectionController = null;
          c.selectedIndex = this._selectedIndex;
          this._selectionController = c;
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (this.dropdown) {
          this.dropdown.dispose();
          this.dropdown = null;
        }

        this._selectionController = null;

        _get(_getPrototypeOf(GComboBox.prototype), "dispose", this).call(this);
      }
    }, {
      key: "getProp",
      value: function getProp(index) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            return this.titleColor;

          case fgui.ObjectPropID.OutlineColor:
            {
              var tf = this.getTextField();
              if (tf) return tf.textFormat.outlineColor;else return 0;
            }

          case fgui.ObjectPropID.FontSize:
            {
              tf = this.getTextField();
              if (tf) return tf.textFormat.size;else return 0;
            }

          default:
            return _get(_getPrototypeOf(GComboBox.prototype), "getProp", this).call(this, index);
        }
      }
    }, {
      key: "setProp",
      value: function setProp(index, value) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            this.titleColor = value;
            break;

          case fgui.ObjectPropID.OutlineColor:
            {
              var tf = this.getTextField();

              if (tf) {
                tf.textFormat.outlineColor = value;
                tf.applyFormat();
              }
            }
            break;

          case fgui.ObjectPropID.FontSize:
            {
              tf = this.getTextField();

              if (tf) {
                tf.textFormat.size = value;
                tf.applyFormat();
              }
            }
            break;

          default:
            _get(_getPrototypeOf(GComboBox.prototype), "setProp", this).call(this, index, value);

            break;
        }
      }
    }, {
      key: "constructExtension",
      value: function constructExtension(buffer) {
        this._buttonController = this.getController("button");
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
        var str = buffer.readS();

        if (str) {
          this.dropdown = fgui.UIPackage.createObjectFromURL(str);

          if (!this.dropdown) {
            console.warn(this.resourceURL + " should be a component.");
            return;
          }

          this._list = this.dropdown.getChild("list");

          if (this._list == null) {
            console.warn(this.resourceURL + ": should container a list component named list.");
            return;
          }

          this._list.on(fgui.ListEvent.ItemClick, this.__clickItem, this);

          this._list.addRelation(this.dropdown, fgui.RelationType.Width);

          this._list.removeRelation(this.dropdown, fgui.RelationType.Height);

          this.dropdown.addRelation(this._list, fgui.RelationType.Height);
          this.dropdown.removeRelation(this._list, fgui.RelationType.Width);
          this.dropdown.on(fgui.StageEvent.RemoveFromStage, this.__popupWinClosed, this);
        }

        this.on(fgui.RollEvent.RollOver, this.__rollover, this);
        this.on(fgui.RollEvent.RollOut, this.__rollout, this);
        this.on(fgui.InteractiveEvents.Down, this.__mousedown, this);
        this.on(fgui.InteractiveEvents.Up, this.__mouseup, this);
      }
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GComboBox.prototype), "setup_afterAdd", this).call(this, buffer, beginPos);

        if (!buffer.seek(beginPos, 6)) return;
        if (buffer.readByte() != this.packageItem.objectType) return;
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
            if (this._icons == null) this._icons = [];
            this._icons[i] = str;
          }

          buffer.pos = nextPos;
        }

        str = buffer.readS();

        if (str != null) {
          this.text = str;
          this._selectedIndex = this._items.indexOf(str);
        } else if (this._items.length > 0) {
          this._selectedIndex = 0;
          this.text = this._items[0];
        } else this._selectedIndex = -1;

        str = buffer.readS();
        if (str != null) this.icon = str;
        if (buffer.readBool()) this.titleColor = buffer.readColor();
        iv = buffer.readInt();
        if (iv > 0) this.visibleItemCount = iv;
        this.popupDirection = buffer.readByte();
        iv = buffer.readShort();
        if (iv >= 0) this._selectionController = this.parent.getControllerAt(iv);
      }
    }, {
      key: "showDropdown",
      value: function showDropdown() {
        if (this._itemsUpdated) {
          this._itemsUpdated = false;

          this._list.removeChildrenToPool();

          var cnt = this._items.length;

          for (var i = 0; i < cnt; i++) {
            var item = this._list.addItemFromPool();

            item.name = i < this._values.length ? this._values[i] : "";
            item.text = this._items[i];
            item.icon = this._icons && i < this._icons.length ? this._icons[i] : null;
          }

          this._list.resizeToFit(this.visibleItemCount);
        }

        this._list.selectedIndex = -1;
        this.dropdown.width = this.width;

        this._list.ensureBoundsCorrect();

        fgui.GRoot.findFor(this).togglePopup(this.dropdown, this, this.popupDirection);
        if (this.dropdown.parent) this.setState("down");
      }
    }, {
      key: "__popupWinClosed",
      value: function __popupWinClosed() {
        this.setCurrentState();
      }
    }, {
      key: "__clickItem",
      value: function __clickItem(evt) {
        if (this.dropdown.parent instanceof fgui.GRoot) this.dropdown.parent.hidePopup();
        this._selectedIndex = -1;
        this.selectedIndex = this._list.getChildIndex(evt.data);
        this.dispatchEvent(fgui.StateChangeEvent.CHANGED);
      }
    }, {
      key: "__rollover",
      value: function __rollover() {
        this._over = true;
        if (this._down || this.dropdown && this.dropdown.parent) return;
        this.setCurrentState();
      }
    }, {
      key: "__rollout",
      value: function __rollout() {
        this._over = false;
        if (this._down || this.dropdown && this.dropdown.parent) return;
        this.setCurrentState();
      }
    }, {
      key: "__mousedown",
      value: function __mousedown(evt) {
        if (evt.initiator instanceof fgui.InputTextField) return;
        this._down = true;
        if (this.dropdown) this.showDropdown();
        evt.captureTouch();
      }
    }, {
      key: "__mouseup",
      value: function __mouseup() {
        if (this._down) {
          this._down = false;
          this.setCurrentState();
        }
      }
    }, {
      key: "text",
      get: function get() {
        if (this._titleObject) return this._titleObject.text;else return null;
      },
      set: function set(value) {
        if (this._titleObject) this._titleObject.text = value;
        this.updateGear(6);
      }
    }, {
      key: "titleColor",
      get: function get() {
        var tf = this.getTextField();
        if (tf) return tf.color;else return 0;
      },
      set: function set(value) {
        var tf = this.getTextField();
        if (tf) tf.color = value;
        this.updateGear(4);
      }
    }, {
      key: "titleFontSize",
      get: function get() {
        var tf = this.getTextField();
        if (tf) return tf.textFormat.size;else return 0;
      },
      set: function set(value) {
        var tf = this.getTextField();

        if (tf) {
          tf.textFormat.size = value;
          tf.applyFormat();
        }
      }
    }, {
      key: "icon",
      get: function get() {
        if (this._iconObject) return this._iconObject.icon;else return null;
      },
      set: function set(value) {
        if (this._iconObject) this._iconObject.icon = value;
        this.updateGear(7);
      }
    }, {
      key: "items",
      get: function get() {
        return this._items;
      },
      set: function set(value) {
        if (!value) this._items.length = 0;else this._items = value.concat();

        if (this._items.length > 0) {
          if (this._selectedIndex >= this._items.length) this._selectedIndex = this._items.length - 1;else if (this._selectedIndex == -1) this._selectedIndex = 0;
          this.text = this._items[this._selectedIndex];
          if (this._icons && this._selectedIndex < this._icons.length) this.icon = this._icons[this._selectedIndex];
        } else {
          this.text = "";
          if (this._icons) this.icon = null;
          this._selectedIndex = -1;
        }

        this._itemsUpdated = true;
      }
    }, {
      key: "icons",
      get: function get() {
        return this._icons;
      },
      set: function set(value) {
        this._icons = value;
        if (this._icons && this._selectedIndex != -1 && this._selectedIndex < this._icons.length) this.icon = this._icons[this._selectedIndex];
      }
    }, {
      key: "values",
      get: function get() {
        return this._values;
      },
      set: function set(value) {
        if (!value) this._values.length = 0;else this._values = value.concat();
      }
    }, {
      key: "selectedIndex",
      get: function get() {
        return this._selectedIndex;
      },
      set: function set(val) {
        if (this._selectedIndex == val) return;
        this._selectedIndex = val;

        if (this._selectedIndex >= 0 && this._selectedIndex < this._items.length) {
          this.text = this._items[this._selectedIndex];
          if (this._icons && this._selectedIndex < this._icons.length) this.icon = this._icons[this._selectedIndex];
        } else {
          this.text = "";
          if (this._icons) this.icon = null;
        }

        this.updateSelectionController();
      }
    }, {
      key: "value",
      get: function get() {
        return this._values[this._selectedIndex];
      },
      set: function set(val) {
        var index = this._values.indexOf(val);

        if (index == -1 && val == null) index = this._values.indexOf("");
        this.selectedIndex = index;
      }
    }, {
      key: "selectionController",
      get: function get() {
        return this._selectionController;
      },
      set: function set(value) {
        this._selectionController = value;
      }
    }]);

    return GComboBox;
  }(fgui.GComponent);

  fgui.GComboBox = GComboBox;
})(fgui || (fgui = {}));

(function (fgui) {
  var GGraph = /*#__PURE__*/function (_fgui$GObject2) {
    _inherits(GGraph, _fgui$GObject2);

    var _super27 = _createSuper(GGraph);

    function GGraph() {
      _classCallCheck(this, GGraph);

      return _super27.call(this);
    }

    _createClass(GGraph, [{
      key: "createDisplayObject",
      value: function createDisplayObject() {
        this._displayObject = this._shape = new fgui.Shape();
      }
    }, {
      key: "getProp",
      value: function getProp(index) {
        if (index == fgui.ObjectPropID.Color) return this.color;else return _get(_getPrototypeOf(GGraph.prototype), "getProp", this).call(this, index);
      }
    }, {
      key: "setProp",
      value: function setProp(index, value) {
        if (index == fgui.ObjectPropID.Color) this.color = value;else _get(_getPrototypeOf(GGraph.prototype), "setProp", this).call(this, index, value);
      }
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GGraph.prototype), "setup_beforeAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 5);
        var type = buffer.readByte();

        if (type != 0) {
          var i;
          var cnt;
          var lineSize = buffer.readInt();
          var lineColor = buffer.readFullColor();
          var fillColor = buffer.readFullColor();
          var roundedRect = buffer.readBool();
          var cornerRadius;

          if (roundedRect) {
            cornerRadius = [];

            for (i = 0; i < 4; i++) {
              cornerRadius[i] = buffer.readFloat();
            }
          }

          if (type == 1) {
            if (roundedRect) this._shape.drawRoundRect(lineSize, lineColor, fillColor, cornerRadius[0], cornerRadius[1], cornerRadius[2], cornerRadius[3]);else this._shape.drawRect(lineSize, lineColor, fillColor);
          } else if (type == 2) {
            this._shape.drawEllipse(lineSize, fillColor, lineColor, fillColor, 0, 360);
          } else if (type == 3) {
            cnt = buffer.readShort();
            var points = [];
            points.length = cnt;

            for (i = 0; i < cnt; i++) {
              points[i] = buffer.readFloat();
            }

            this._shape.drawPolygon(points, fillColor, lineSize, lineColor);
          } else if (type == 4) {
            var sides = buffer.readShort();
            var startAngle = buffer.readFloat();
            cnt = buffer.readShort();
            var distances;

            if (cnt > 0) {
              distances = [];

              for (i = 0; i < cnt; i++) {
                distances[i] = buffer.readFloat();
              }
            }

            this._shape.drawRegularPolygon(sides, lineSize, fillColor, lineColor, fillColor, startAngle, distances);
          }
        }
      }
    }, {
      key: "shape",
      get: function get() {
        return this._shape;
      }
    }, {
      key: "color",
      get: function get() {
        return this._shape.graphics.color;
      },
      set: function set(value) {
        if (this._shape.graphics.color != value) {
          this._shape.graphics.color = value;
          this.updateGear(4);
        }
      }
    }]);

    return GGraph;
  }(fgui.GObject);

  fgui.GGraph = GGraph;
})(fgui || (fgui = {}));

(function (fgui) {
  var GGroup = /*#__PURE__*/function (_fgui$GObject3) {
    _inherits(GGroup, _fgui$GObject3);

    var _super28 = _createSuper(GGroup);

    function GGroup() {
      var _this22;

      _classCallCheck(this, GGroup);

      _this22 = _super28.call(this);
      _this22._layout = 0;
      _this22._lineGap = 0;
      _this22._columnGap = 0;
      _this22._mainGridIndex = -1;
      _this22._mainGridMinSize = 50;
      _this22._mainChildIndex = -1;
      _this22._totalSize = 0;
      _this22._numChildren = 0;
      _this22._updating = 0;
      return _this22;
    }

    _createClass(GGroup, [{
      key: "dispose",
      value: function dispose() {
        this._boundsChanged = false;

        _get(_getPrototypeOf(GGroup.prototype), "dispose", this).call(this);
      }
    }, {
      key: "setBoundsChangedFlag",
      value: function setBoundsChangedFlag(positionChangedOnly) {
        if (this._updating == 0 && this._parent) {
          if (!positionChangedOnly) this._percentReady = false;

          if (!this._boundsChanged) {
            this._boundsChanged = true;
            if (this._layout != fgui.GroupLayoutType.None) fgui.Timers.callLater(this.ensureBoundsCorrect, this);
          }
        }
      }
    }, {
      key: "ensureBoundsCorrect",
      value: function ensureBoundsCorrect() {
        if (this._parent == null || !this._boundsChanged) return;
        this._boundsChanged = false;
        if (this._layout == 0) this.updateBounds();else {
          if (this._autoSizeDisabled) this.resizeChildren(0, 0);else {
            this.handleLayout();
            this.updateBounds();
          }
        }
      }
    }, {
      key: "updateBounds",
      value: function updateBounds() {
        fgui.Timers.remove(this.ensureBoundsCorrect, this);
        var cnt = this._parent.numChildren;
        var i;
        var child;
        var ax = Number.POSITIVE_INFINITY,
            ay = Number.POSITIVE_INFINITY;
        var ar = Number.NEGATIVE_INFINITY,
            ab = Number.NEGATIVE_INFINITY;
        var tmp;
        var empty = true;

        for (i = 0; i < cnt; i++) {
          child = this._parent.getChildAt(i);
          if (child.group != this || this._excludeInvisibles && !child.internalVisible3) continue;
          tmp = child.xMin;
          if (tmp < ax) ax = tmp;
          tmp = child.yMin;
          if (tmp < ay) ay = tmp;
          tmp = child.xMin + child.width;
          if (tmp > ar) ar = tmp;
          tmp = child.yMin + child.height;
          if (tmp > ab) ab = tmp;
          empty = false;
        }

        var w = 0,
            h = 0;

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
        } else {
          this._updating &= 1;
          this.resizeChildren(this._width - w, this._height - h);
        }
      }
    }, {
      key: "handleLayout",
      value: function handleLayout() {
        this._updating |= 1;
        var child;
        var i;
        var cnt;

        if (this._layout == fgui.GroupLayoutType.Horizontal) {
          var curX = this.x;
          cnt = this._parent.numChildren;

          for (i = 0; i < cnt; i++) {
            child = this._parent.getChildAt(i);
            if (child.group != this) continue;
            if (this._excludeInvisibles && !child.internalVisible3) continue;
            child.xMin = curX;
            if (child.width != 0) curX += child.width + this._columnGap;
          }
        } else if (this._layout == fgui.GroupLayoutType.Vertical) {
          var curY = this.y;
          cnt = this._parent.numChildren;

          for (i = 0; i < cnt; i++) {
            child = this._parent.getChildAt(i);
            if (child.group != this) continue;
            if (this._excludeInvisibles && !child.internalVisible3) continue;
            child.yMin = curY;
            if (child.height != 0) curY += child.height + this._lineGap;
          }
        }

        this._updating &= 2;
      }
    }, {
      key: "moveChildren",
      value: function moveChildren(dx, dy) {
        if ((this._updating & 1) != 0 || this._parent == null) return;
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
    }, {
      key: "resizeChildren",
      value: function resizeChildren(dw, dh) {
        if (this._layout == fgui.GroupLayoutType.None || (this._updating & 2) != 0 || this._parent == null) return;
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
            if (child.group != this) continue;

            if (!this._excludeInvisibles || child.internalVisible3) {
              if (j == this._mainGridIndex) this._mainChildIndex = i;
              this._numChildren++;
              if (this._layout == 1) this._totalSize += child.width;else this._totalSize += child.height;
            }

            j++;
          }

          if (this._mainChildIndex != -1) {
            if (this._layout == 1) {
              child = this._parent.getChildAt(this._mainChildIndex);
              this._totalSize += this._mainGridMinSize - child.width;
              child._sizePercentInGroup = this._mainGridMinSize / this._totalSize;
            } else {
              child = this._parent.getChildAt(this._mainChildIndex);
              this._totalSize += this._mainGridMinSize - child.height;
              child._sizePercentInGroup = this._mainGridMinSize / this._totalSize;
            }
          }

          for (i = 0; i < cnt; i++) {
            child = this._parent.getChildAt(i);
            if (child.group != this) continue;
            if (i == this._mainChildIndex) continue;
            if (this._totalSize > 0) child._sizePercentInGroup = (this._layout == 1 ? child.width : child.height) / this._totalSize;else child._sizePercentInGroup = 0;
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
            if (child.group != this) continue;

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
            if (child.width != 0) curX += child.width + this._columnGap;
          }
        } else {
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
            if (child.group != this) continue;

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
            if (child.height != 0) curY += child.height + this._lineGap;
          }
        }

        this._updating &= 1;
      }
    }, {
      key: "handleAlphaChanged",
      value: function handleAlphaChanged() {
        if (this._underConstruct) return;
        var cnt = this._parent.numChildren;

        for (var i = 0; i < cnt; i++) {
          var child = this._parent.getChildAt(i);

          if (child.group == this) child.alpha = this.alpha;
        }
      }
    }, {
      key: "handleVisibleChanged",
      value: function handleVisibleChanged() {
        if (!this._parent) return;
        var cnt = this._parent.numChildren;

        for (var i = 0; i < cnt; i++) {
          var child = this._parent.getChildAt(i);

          if (child.group == this) child.handleVisibleChanged();
        }
      }
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GGroup.prototype), "setup_beforeAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 5);
        this._layout = buffer.readByte();
        this._lineGap = buffer.readInt();
        this._columnGap = buffer.readInt();

        if (buffer.version >= 2) {
          this._excludeInvisibles = buffer.readBool();
          this._autoSizeDisabled = buffer.readBool();
          this._mainChildIndex = buffer.readShort();
        }
      }
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GGroup.prototype), "setup_afterAdd", this).call(this, buffer, beginPos);

        if (!this.visible) this.handleVisibleChanged();
      }
    }, {
      key: "layout",
      get: function get() {
        return this._layout;
      },
      set: function set(value) {
        if (this._layout != value) {
          this._layout = value;
          this.setBoundsChangedFlag();
        }
      }
    }, {
      key: "lineGap",
      get: function get() {
        return this._lineGap;
      },
      set: function set(value) {
        if (this._lineGap != value) {
          this._lineGap = value;
          this.setBoundsChangedFlag(true);
        }
      }
    }, {
      key: "columnGap",
      get: function get() {
        return this._columnGap;
      },
      set: function set(value) {
        if (this._columnGap != value) {
          this._columnGap = value;
          this.setBoundsChangedFlag(true);
        }
      }
    }, {
      key: "excludeInvisibles",
      get: function get() {
        return this._excludeInvisibles;
      },
      set: function set(value) {
        if (this._excludeInvisibles != value) {
          this._excludeInvisibles = value;
          this.setBoundsChangedFlag();
        }
      }
    }, {
      key: "autoSizeDisabled",
      get: function get() {
        return this._autoSizeDisabled;
      },
      set: function set(value) {
        this._autoSizeDisabled = value;
      }
    }, {
      key: "mainGridMinSize",
      get: function get() {
        return this._mainGridMinSize;
      },
      set: function set(value) {
        if (this._mainGridMinSize != value) {
          this._mainGridMinSize = value;
          this.setBoundsChangedFlag();
        }
      }
    }, {
      key: "mainGridIndex",
      get: function get() {
        return this._mainGridIndex;
      },
      set: function set(value) {
        if (this._mainGridIndex != value) {
          this._mainGridIndex = value;
          this.setBoundsChangedFlag();
        }
      }
    }]);

    return GGroup;
  }(fgui.GObject);

  fgui.GGroup = GGroup;
})(fgui || (fgui = {}));

(function (fgui) {
  var GImage = /*#__PURE__*/function (_fgui$GObject4) {
    _inherits(GImage, _fgui$GObject4);

    var _super29 = _createSuper(GImage);

    function GImage() {
      _classCallCheck(this, GImage);

      return _super29.call(this);
    }

    _createClass(GImage, [{
      key: "createDisplayObject",
      value: function createDisplayObject() {
        this._displayObject = this._image = new fgui.Image();
      }
    }, {
      key: "handleSizeChanged",
      value: function handleSizeChanged() {
        this._image.width = this._width;
        this._image.height = this._height;
      }
    }, {
      key: "constructFromResource",
      value: function constructFromResource() {
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
    }, {
      key: "getProp",
      value: function getProp(index) {
        if (index == fgui.ObjectPropID.Color) return this.color;else return _get(_getPrototypeOf(GImage.prototype), "getProp", this).call(this, index);
      }
    }, {
      key: "setProp",
      value: function setProp(index, value) {
        if (index == fgui.ObjectPropID.Color) this.color = value;else _get(_getPrototypeOf(GImage.prototype), "setProp", this).call(this, index, value);
      }
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GImage.prototype), "setup_beforeAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 5);
        if (buffer.readBool()) this.color = buffer.readColor();
        this.flip = buffer.readByte();
        this._image.fillMethod = buffer.readByte();

        if (this._image.fillMethod != 0) {
          this._image.fillOrigin = buffer.readByte();
          this._image.fillClockwise = buffer.readBool();
          this._image.fillAmount = buffer.readFloat();
        }
      }
    }, {
      key: "color",
      get: function get() {
        return this._image.graphics.color;
      },
      set: function set(value) {
        if (this._image.graphics.color != value) {
          this._image.graphics.color = value;
          this.updateGear(4);
        }
      }
    }, {
      key: "flip",
      get: function get() {
        return this._image.graphics.flip;
      },
      set: function set(value) {
        this._image.graphics.flip = value;
      }
    }, {
      key: "fillMethod",
      get: function get() {
        return this._image.fillMethod;
      },
      set: function set(value) {
        this._image.fillMethod = value;
      }
    }, {
      key: "fillOrigin",
      get: function get() {
        return this._image.fillOrigin;
      },
      set: function set(value) {
        this._image.fillOrigin = value;
      }
    }, {
      key: "fillClockwise",
      get: function get() {
        return this._image.fillClockwise;
      },
      set: function set(value) {
        this._image.fillClockwise = value;
      }
    }, {
      key: "fillAmount",
      get: function get() {
        return this._image.fillAmount;
      },
      set: function set(value) {
        this._image.fillAmount = value;
      }
    }]);

    return GImage;
  }(fgui.GObject);

  fgui.GImage = GImage;
})(fgui || (fgui = {}));

(function (fgui) {
  var GLabel = /*#__PURE__*/function (_fgui$GComponent3) {
    _inherits(GLabel, _fgui$GComponent3);

    var _super30 = _createSuper(GLabel);

    function GLabel() {
      _classCallCheck(this, GLabel);

      return _super30.call(this);
    }

    _createClass(GLabel, [{
      key: "getTextField",
      value: function getTextField() {
        if (this._titleObject instanceof fgui.GTextField) return this._titleObject;else if ('getTextField' in this._titleObject) return this._titleObject.getTextField();else return null;
      }
    }, {
      key: "getProp",
      value: function getProp(index) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            return this.titleColor;

          case fgui.ObjectPropID.OutlineColor:
            {
              var tf = this.getTextField();
              if (tf) return tf.textFormat.outlineColor;else return 0;
            }

          case fgui.ObjectPropID.FontSize:
            return this.titleFontSize;

          default:
            return _get(_getPrototypeOf(GLabel.prototype), "getProp", this).call(this, index);
        }
      }
    }, {
      key: "setProp",
      value: function setProp(index, value) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            this.titleColor = value;
            break;

          case fgui.ObjectPropID.OutlineColor:
            {
              var tf = this.getTextField();

              if (tf) {
                tf.textFormat.outlineColor = value;
                tf.applyFormat();
              }
            }
            break;

          case fgui.ObjectPropID.FontSize:
            this.titleFontSize = value;
            break;

          default:
            _get(_getPrototypeOf(GLabel.prototype), "setProp", this).call(this, index, value);

            break;
        }
      }
    }, {
      key: "constructExtension",
      value: function constructExtension(buffer) {
        this._titleObject = this.getChild("title");
        this._iconObject = this.getChild("icon");
      }
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GLabel.prototype), "setup_afterAdd", this).call(this, buffer, beginPos);

        if (!buffer.seek(beginPos, 6)) return;
        if (buffer.readByte() != this.packageItem.objectType) return;
        var str;
        str = buffer.readS();
        if (str != null) this.title = str;
        str = buffer.readS();
        if (str != null) this.icon = str;
        if (buffer.readBool()) this.titleColor = buffer.readColor();
        var iv = buffer.readInt();
        if (iv != 0) this.titleFontSize = iv;

        if (buffer.readBool()) {
          var input = this.getTextField();

          if (input) {
            str = buffer.readS();
            if (str != null) input.promptText = str;
            str = buffer.readS();
            if (str != null) input.restrict = str;
            iv = buffer.readInt();
            if (iv != 0) input.maxLength = iv;
            iv = buffer.readInt();

            if (iv != 0) {
              if (iv == 4) input.keyboardType = 'number';else if (iv == 3) input.keyboardType = 'url';
            }

            if (buffer.readBool()) input.password = true;
          } else buffer.skip(13);
        }
      }
    }, {
      key: "icon",
      get: function get() {
        if (this._iconObject) return this._iconObject.icon;else return null;
      },
      set: function set(value) {
        if (this._iconObject) this._iconObject.icon = value;
        this.updateGear(7);
      }
    }, {
      key: "title",
      get: function get() {
        if (this._titleObject) return this._titleObject.text;else return null;
      },
      set: function set(value) {
        if (this._titleObject) this._titleObject.text = value;
        this.updateGear(6);
      }
    }, {
      key: "text",
      get: function get() {
        return this.title;
      },
      set: function set(value) {
        this.title = value;
      }
    }, {
      key: "titleColor",
      get: function get() {
        var tf = this.getTextField();
        if (tf) return tf.color;else return 0;
      },
      set: function set(value) {
        var tf = this.getTextField();
        if (tf) tf.color = value;
        this.updateGear(4);
      }
    }, {
      key: "titleFontSize",
      get: function get() {
        var tf = this.getTextField();
        if (tf) return tf.textFormat.size;else return 0;
      },
      set: function set(value) {
        var tf = this.getTextField();

        if (tf) {
          tf.textFormat.size = value;
          tf.applyFormat();
        }
      }
    }, {
      key: "color",
      get: function get() {
        return this.titleColor;
      },
      set: function set(value) {
        this.titleColor = value;
      }
    }, {
      key: "editable",
      set: function set(val) {
        if (this._titleObject) this._titleObject.editable = val;
      },
      get: function get() {
        if (this._titleObject && this._titleObject instanceof fgui.GTextInput) return this._titleObject.editable;else return false;
      }
    }]);

    return GLabel;
  }(fgui.GComponent);

  fgui.GLabel = GLabel;
})(fgui || (fgui = {}));

(function (fgui) {
  var GList = /*#__PURE__*/function (_fgui$GComponent4) {
    _inherits(GList, _fgui$GComponent4);

    var _super31 = _createSuper(GList);

    function GList() {
      var _this23;

      _classCallCheck(this, GList);

      _this23 = _super31.call(this);
      _this23._lineCount = 0;
      _this23._columnCount = 0;
      _this23._lineGap = 0;
      _this23._columnGap = 0;
      _this23._lastSelectedIndex = 0;
      _this23._numItems = 0;
      _this23._firstIndex = 0;
      _this23._curLineItemCount = 0;
      _this23._virtualListChanged = 0;
      _this23.itemInfoVer = 0;
      _this23._trackBounds = true;
      _this23._pool = new fgui.GObjectPool();
      _this23._layout = fgui.ListLayoutType.SingleColumn;
      _this23._autoResizeItem = true;
      _this23._lastSelectedIndex = -1;
      _this23._selectionMode = fgui.ListSelectionMode.Single;
      _this23.opaque = true;
      _this23.scrollItemToViewOnClick = true;
      _this23._align = "left";
      _this23._verticalAlign = "top";
      _this23._container = new fgui.DisplayObject();

      _this23._displayObject.addChild(_this23._container);

      return _this23;
    }

    _createClass(GList, [{
      key: "dispose",
      value: function dispose() {
        this._pool.clear();

        _get(_getPrototypeOf(GList.prototype), "dispose", this).call(this);
      }
    }, {
      key: "getFromPool",
      value: function getFromPool(url) {
        if (!url) url = this._defaultItem;

        var obj = this._pool.getObject(url);

        if (obj) obj.visible = true;
        return obj;
      }
    }, {
      key: "returnToPool",
      value: function returnToPool(obj) {
        this._pool.returnObject(obj);
      }
    }, {
      key: "addChildAt",
      value: function addChildAt(child, index) {
        _get(_getPrototypeOf(GList.prototype), "addChildAt", this).call(this, child, index);

        if (child instanceof fgui.GButton) {
          var button = child;
          button.selected = false;
          button.changeStateOnClick = false;
        }

        child.on(fgui.InteractiveEvents.Click, this.__clickItem, this);
        return child;
      }
    }, {
      key: "addItem",
      value: function addItem(url) {
        if (!url) url = this._defaultItem;
        return this.addChild(fgui.UIPackage.createObjectFromURL(url));
      }
    }, {
      key: "addItemFromPool",
      value: function addItemFromPool(url) {
        return this.addChild(this.getFromPool(url));
      }
    }, {
      key: "removeChildAt",
      value: function removeChildAt(index, dispose) {
        var child = _get(_getPrototypeOf(GList.prototype), "removeChildAt", this).call(this, index);

        if (dispose) child.dispose();else child.off(fgui.InteractiveEvents.Click, this.__clickItem, this);
        return child;
      }
    }, {
      key: "removeChildToPoolAt",
      value: function removeChildToPoolAt(index) {
        var child = _get(_getPrototypeOf(GList.prototype), "removeChildAt", this).call(this, index);

        this.returnToPool(child);
      }
    }, {
      key: "removeChildToPool",
      value: function removeChildToPool(child) {
        _get(_getPrototypeOf(GList.prototype), "removeChild", this).call(this, child);

        this.returnToPool(child);
      }
    }, {
      key: "removeChildrenToPool",
      value: function removeChildrenToPool(beginIndex, endIndex) {
        beginIndex = beginIndex || 0;
        if (endIndex == null) endIndex = -1;
        if (endIndex < 0 || endIndex >= this._children.length) endIndex = this._children.length - 1;

        for (var i = beginIndex; i <= endIndex; ++i) {
          this.removeChildToPoolAt(beginIndex);
        }
      }
    }, {
      key: "getSelection",
      value: function getSelection(result) {
        if (!result) result = new Array();
        var i;

        if (this._virtual) {
          for (i = 0; i < this._realNumItems; i++) {
            var ii = this._virtualItems[i];

            if (ii.obj instanceof fgui.GButton && ii.obj.selected || ii.obj == null && ii.selected) {
              var j = i;

              if (this._loop) {
                j = i % this._numItems;
                if (result.indexOf(j) != -1) continue;
              }

              result.push(j);
            }
          }
        } else {
          var cnt = this._children.length;

          for (i = 0; i < cnt; i++) {
            var obj = this._children[i];
            if (obj && obj.selected) result.push(i);
          }
        }

        return result;
      }
    }, {
      key: "addSelection",
      value: function addSelection(index, scrollItToView) {
        if (this._selectionMode == fgui.ListSelectionMode.None) return;
        this.checkVirtualList();
        if (this._selectionMode == fgui.ListSelectionMode.Single) this.clearSelection();
        if (scrollItToView) this.scrollToView(index);
        this._lastSelectedIndex = index;
        var obj = null;

        if (this._virtual) {
          var ii = this._virtualItems[index];
          if (ii.obj) obj = ii.obj;
          ii.selected = true;
        } else obj = this.getChildAt(index);

        if (obj && !obj.selected) {
          obj.selected = true;
          this.updateSelectionController(index);
        }
      }
    }, {
      key: "removeSelection",
      value: function removeSelection(index) {
        if (this._selectionMode == fgui.ListSelectionMode.None) return;
        var obj = null;

        if (this._virtual) {
          var ii = this._virtualItems[index];
          if (ii.obj) obj = ii.obj;
          ii.selected = false;
        } else obj = this.getChildAt(index);

        if (obj) obj.selected = false;
      }
    }, {
      key: "clearSelection",
      value: function clearSelection() {
        var i;

        if (this._virtual) {
          for (i = 0; i < this._realNumItems; i++) {
            var ii = this._virtualItems[i];
            if (ii.obj instanceof fgui.GButton) ii.obj.selected = false;
            ii.selected = false;
          }
        } else {
          var cnt = this._children.length;

          for (i = 0; i < cnt; i++) {
            var obj = this._children[i];
            if (obj) obj.selected = false;
          }
        }
      }
    }, {
      key: "clearSelectionExcept",
      value: function clearSelectionExcept(g) {
        var i;

        if (this._virtual) {
          for (i = 0; i < this._realNumItems; i++) {
            var ii = this._virtualItems[i];

            if (ii.obj != g) {
              if (ii.obj instanceof fgui.GButton) ii.obj.selected = false;
              ii.selected = false;
            }
          }
        } else {
          var cnt = this._children.length;

          for (i = 0; i < cnt; i++) {
            var obj = this._children[i];
            if (obj && obj != g) obj.selected = false;
          }
        }
      }
    }, {
      key: "selectAll",
      value: function selectAll() {
        this.checkVirtualList();
        var last = -1;
        var i;

        if (this._virtual) {
          for (i = 0; i < this._realNumItems; i++) {
            var ii = this._virtualItems[i];

            if (ii.obj instanceof fgui.GButton && !ii.obj.selected) {
              ii.obj.selected = true;
              last = i;
            }

            ii.selected = true;
          }
        } else {
          var cnt = this._children.length;

          for (i = 0; i < cnt; i++) {
            var obj = this._children[i];

            if (obj && !obj.selected) {
              obj.selected = true;
              last = i;
            }
          }
        }

        if (last != -1) this.updateSelectionController(last);
      }
    }, {
      key: "selectNone",
      value: function selectNone() {
        this.clearSelection();
      }
    }, {
      key: "selectReverse",
      value: function selectReverse() {
        this.checkVirtualList();
        var last = -1;
        var i;

        if (this._virtual) {
          for (i = 0; i < this._realNumItems; i++) {
            var ii = this._virtualItems[i];

            if (ii.obj instanceof fgui.GButton) {
              ii.obj.selected = !ii.obj.selected;
              if (ii.obj.selected) last = i;
            }

            ii.selected = !ii.selected;
          }
        } else {
          var cnt = this._children.length;

          for (i = 0; i < cnt; i++) {
            var obj = this._children[i];

            if (obj) {
              obj.selected = !obj.selected;
              if (obj.selected) last = i;
            }
          }
        }

        if (last != -1) this.updateSelectionController(last);
      }
    }, {
      key: "handleArrowKey",
      value: function handleArrowKey(dir) {
        var index = this.selectedIndex;
        if (index == -1) return;

        switch (dir) {
          case 1:
            if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowVertical) {
              index--;

              if (index >= 0) {
                this.clearSelection();
                this.addSelection(index, true);
              }
            } else if (this._layout == fgui.ListLayoutType.FlowHorizontal || this._layout == fgui.ListLayoutType.Pagination) {
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

          case 3:
            if (this._layout == fgui.ListLayoutType.SingleRow || this._layout == fgui.ListLayoutType.FlowHorizontal || this._layout == fgui.ListLayoutType.Pagination) {
              index++;

              if (index < this.numItems) {
                this.clearSelection();
                this.addSelection(index, true);
              }
            } else if (this._layout == fgui.ListLayoutType.FlowVertical) {
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

          case 5:
            if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowVertical) {
              index++;

              if (index < this.numItems) {
                this.clearSelection();
                this.addSelection(index, true);
              }
            } else if (this._layout == fgui.ListLayoutType.FlowHorizontal || this._layout == fgui.ListLayoutType.Pagination) {
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

          case 7:
            if (this._layout == fgui.ListLayoutType.SingleRow || this._layout == fgui.ListLayoutType.FlowHorizontal || this._layout == fgui.ListLayoutType.Pagination) {
              index--;

              if (index >= 0) {
                this.clearSelection();
                this.addSelection(index, true);
              }
            } else if (this._layout == fgui.ListLayoutType.FlowVertical) {
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
    }, {
      key: "__clickItem",
      value: function __clickItem(evt) {
        if (this._scrollPane && this._scrollPane.isDragged) return;
        var item = fgui.GObject.cast(evt.sender);
        this.setSelectionOnEvent(item, evt);
        if (this._scrollPane && this.scrollItemToViewOnClick) this._scrollPane.scrollToView(item, true);
        this.dispatchItemEvent(item, evt);
      }
    }, {
      key: "dispatchItemEvent",
      value: function dispatchItemEvent(item, evt) {
        this.dispatchEvent(fgui.ListEvent.ItemClick, item);
      }
    }, {
      key: "setSelectionOnEvent",
      value: function setSelectionOnEvent(item, evt) {
        if (!(item instanceof fgui.GButton) || this._selectionMode == fgui.ListSelectionMode.None) return;
        var dontChangeLastIndex = false;
        var button = item;
        var index = this.childIndexToItemIndex(this.getChildIndex(item));

        if (this._selectionMode == fgui.ListSelectionMode.Single) {
          if (!button.selected) {
            this.clearSelectionExcept(button);
            button.selected = true;
          }
        } else {
          if (evt.input.shiftKey) {
            if (!button.selected) {
              if (this._lastSelectedIndex != -1) {
                var min = Math.min(this._lastSelectedIndex, index);
                var max = Math.max(this._lastSelectedIndex, index);
                max = Math.min(max, this.numItems - 1);
                var i;

                if (this._virtual) {
                  for (i = min; i <= max; i++) {
                    var ii = this._virtualItems[i];
                    if (ii.obj instanceof fgui.GButton) ii.obj.selected = true;
                    ii.selected = true;
                  }
                } else {
                  for (i = min; i <= max; i++) {
                    var obj = this.getChildAt(i);
                    if (obj) obj.selected = true;
                  }
                }

                dontChangeLastIndex = true;
              } else {
                button.selected = true;
              }
            }
          } else if (evt.input.ctrlKey || evt.input.commandKey || this._selectionMode == fgui.ListSelectionMode.Multiple_SingleClick) {
            button.selected = !button.selected;
          } else {
            if (!button.selected) {
              this.clearSelectionExcept(button);
              button.selected = true;
            } else this.clearSelectionExcept(button);
          }
        }

        if (!dontChangeLastIndex) this._lastSelectedIndex = index;
        if (button.selected) this.updateSelectionController(index);
      }
    }, {
      key: "resizeToFit",
      value: function resizeToFit(itemCount, minSize) {
        this.ensureBoundsCorrect();
        var curCount = this.numItems;
        if (itemCount == null || itemCount > curCount) itemCount = curCount;
        minSize = minSize || 0;

        if (this._virtual) {
          var lineCount = Math.ceil(itemCount / this._curLineItemCount);
          if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowHorizontal) this.viewHeight = lineCount * this._itemSize.y + Math.max(0, lineCount - 1) * this._lineGap;else this.viewWidth = lineCount * this._itemSize.x + Math.max(0, lineCount - 1) * this._columnGap;
        } else if (itemCount == 0) {
          if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowHorizontal) this.viewHeight = minSize;else this.viewWidth = minSize;
        } else {
          var i = itemCount - 1;
          var obj = null;

          while (i >= 0) {
            obj = this.getChildAt(i);
            if (!this.foldInvisibleItems || obj.visible) break;
            i--;
          }

          if (i < 0) {
            if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowHorizontal) this.viewHeight = minSize;else this.viewWidth = minSize;
          } else {
            var size = 0;

            if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowHorizontal) {
              size = obj.y + obj.height;
              if (size < minSize) size = minSize;
              this.viewHeight = size;
            } else {
              size = obj.x + obj.width;
              if (size < minSize) size = minSize;
              this.viewWidth = size;
            }
          }
        }
      }
    }, {
      key: "getMaxItemWidth",
      value: function getMaxItemWidth() {
        var cnt = this._children.length;
        var max = 0;

        for (var i = 0; i < cnt; i++) {
          var child = this.getChildAt(i);
          if (child.width > max) max = child.width;
        }

        return max;
      }
    }, {
      key: "handleSizeChanged",
      value: function handleSizeChanged() {
        _get(_getPrototypeOf(GList.prototype), "handleSizeChanged", this).call(this);

        this.setBoundsChangedFlag();
        if (this._virtual) this.setVirtualListChangedFlag(true);
      }
    }, {
      key: "handleControllerChanged",
      value: function handleControllerChanged(c) {
        _get(_getPrototypeOf(GList.prototype), "handleControllerChanged", this).call(this, c);

        if (this._selectionController == c) this.selectedIndex = c.selectedIndex;
      }
    }, {
      key: "updateSelectionController",
      value: function updateSelectionController(index) {
        if (this._selectionController && !this._selectionController.changing && index < this._selectionController.pageCount) {
          var c = this._selectionController;
          this._selectionController = null;
          c.selectedIndex = index;
          this._selectionController = c;
        }
      }
    }, {
      key: "shouldSnapToNext",
      value: function shouldSnapToNext(dir, delta, size) {
        return dir < 0 && delta > fgui.UIConfig.defaultScrollSnappingThreshold * size || dir > 0 && delta > (1 - fgui.UIConfig.defaultScrollSnappingThreshold) * size || dir == 0 && delta > size / 2;
      }
    }, {
      key: "getSnappingPositionWithDir",
      value: function getSnappingPositionWithDir(xValue, yValue, xDir, yDir, resultPoint) {
        if (this._virtual) {
          if (!resultPoint) resultPoint = new THREE.Vector2();
          var saved;
          var index;
          var size;

          if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowHorizontal) {
            saved = yValue;
            s_n = yValue;
            index = this.getIndexOnPos1(false);
            yValue = s_n;

            if (index < this._virtualItems.length && index < this._realNumItems) {
              size = this._virtualItems[index].height;
              if (this.shouldSnapToNext(yDir, saved - yValue, size)) yValue += size + this._lineGap;
            }
          } else if (this._layout == fgui.ListLayoutType.SingleRow || this._layout == fgui.ListLayoutType.FlowVertical) {
            saved = xValue;
            s_n = xValue;
            index = this.getIndexOnPos2(false);
            xValue = s_n;

            if (index < this._virtualItems.length && index < this._realNumItems) {
              size = this._virtualItems[index].width;
              if (this.shouldSnapToNext(xDir, saved - xValue, size)) xValue += size + this._columnGap;
            }
          } else {
            saved = xValue;
            s_n = xValue;
            index = this.getIndexOnPos3(false);
            xValue = s_n;

            if (index < this._virtualItems.length && index < this._realNumItems) {
              size = this._virtualItems[index].width;
              if (this.shouldSnapToNext(xDir, saved - xValue, size)) xValue += size + this._columnGap;
            }
          }

          resultPoint.x = xValue;
          resultPoint.y = yValue;
          return resultPoint;
        } else return _get(_getPrototypeOf(GList.prototype), "getSnappingPositionWithDir", this).call(this, xValue, yValue, xDir, yDir, resultPoint);
      }
    }, {
      key: "scrollToView",
      value: function scrollToView(index, ani, setFirst) {
        if (this._virtual) {
          if (this._numItems == 0) return;
          this.checkVirtualList();
          if (index >= this._virtualItems.length) throw new Error("Invalid child index: " + index + ">" + this._virtualItems.length);
          if (this._loop) index = Math.floor(this._firstIndex / this._numItems) * this._numItems + index;
          var rect;
          var ii = this._virtualItems[index];
          var pos = 0;
          var i;

          if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowHorizontal) {
            for (i = this._curLineItemCount - 1; i < index; i += this._curLineItemCount) {
              pos += this._virtualItems[i].height + this._lineGap;
            }

            rect = new fgui.Rect(0, pos, this._itemSize.x, ii.height);
          } else if (this._layout == fgui.ListLayoutType.SingleRow || this._layout == fgui.ListLayoutType.FlowVertical) {
            for (i = this._curLineItemCount - 1; i < index; i += this._curLineItemCount) {
              pos += this._virtualItems[i].width + this._columnGap;
            }

            rect = new fgui.Rect(pos, 0, ii.width, this._itemSize.y);
          } else {
            var page = index / (this._curLineItemCount * this._curLineItemCount2);
            rect = new fgui.Rect(page * this.viewWidth + index % this._curLineItemCount * (ii.width + this._columnGap), index / this._curLineItemCount % this._curLineItemCount2 * (ii.height + this._lineGap), ii.width, ii.height);
          }

          setFirst = true;
          if (this._scrollPane) this._scrollPane.scrollToView(rect, ani, setFirst);
        } else {
          var obj = this.getChildAt(index);
          if (this._scrollPane) this._scrollPane.scrollToView(obj, ani, setFirst);else if (this._parent && this._parent.scrollPane) this._parent.scrollPane.scrollToView(obj, ani, setFirst);
        }
      }
    }, {
      key: "getFirstChildInView",
      value: function getFirstChildInView() {
        return this.childIndexToItemIndex(_get(_getPrototypeOf(GList.prototype), "getFirstChildInView", this).call(this));
      }
    }, {
      key: "childIndexToItemIndex",
      value: function childIndexToItemIndex(index) {
        if (!this._virtual) return index;

        if (this._layout == fgui.ListLayoutType.Pagination) {
          for (var i = this._firstIndex; i < this._realNumItems; i++) {
            if (this._virtualItems[i].obj) {
              index--;
              if (index < 0) return i;
            }
          }

          return index;
        } else {
          index += this._firstIndex;
          if (this._loop && this._numItems > 0) index = index % this._numItems;
          return index;
        }
      }
    }, {
      key: "itemIndexToChildIndex",
      value: function itemIndexToChildIndex(index) {
        if (!this._virtual) return index;

        if (this._layout == fgui.ListLayoutType.Pagination) {
          return this.getChildIndex(this._virtualItems[index].obj);
        } else {
          if (this._loop && this._numItems > 0) {
            var j = this._firstIndex % this._numItems;
            if (index >= j) index = index - j;else index = this._numItems - j + index;
          } else index -= this._firstIndex;

          return index;
        }
      }
    }, {
      key: "setVirtual",
      value: function setVirtual() {
        this._setVirtual(false);
      }
    }, {
      key: "setVirtualAndLoop",
      value: function setVirtualAndLoop() {
        this._setVirtual(true);
      }
    }, {
      key: "_setVirtual",
      value: function _setVirtual(loop) {
        if (!this._virtual) {
          if (this._scrollPane == null) throw new Error("Virtual list must be scrollable!");

          if (loop) {
            if (this._layout == fgui.ListLayoutType.FlowHorizontal || this._layout == fgui.ListLayoutType.FlowVertical) throw new Error("Loop list instanceof not supported for FlowHorizontal or FlowVertical this.layout!");
            this._scrollPane.bouncebackEffect = false;
          }

          this._virtual = true;
          this._loop = loop;
          this._virtualItems = new Array();
          this.removeChildrenToPool();

          if (this._itemSize == null) {
            this._itemSize = new THREE.Vector2();
            var obj = this.getFromPool(null);

            if (obj == null) {
              throw new Error("Virtual List must have a default list item resource.");
            } else {
              this._itemSize.x = obj.width;
              this._itemSize.y = obj.height;
            }

            this.returnToPool(obj);
          }

          if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowHorizontal) {
            this._scrollPane.scrollStep = this._itemSize.y;
            if (this._loop) this._scrollPane._loop = 2;
          } else {
            this._scrollPane.scrollStep = this._itemSize.x;
            if (this._loop) this._scrollPane._loop = 1;
          }

          this.on(fgui.ScrollEvent.SCROLL, this.__scrolled, this);
          this.setVirtualListChangedFlag(true);
        }
      }
    }, {
      key: "refreshVirtualList",
      value: function refreshVirtualList() {
        this.setVirtualListChangedFlag(false);
      }
    }, {
      key: "checkVirtualList",
      value: function checkVirtualList() {
        if (this._virtualListChanged != 0) {
          this._refreshVirtualList();

          fgui.Timers.remove(this._refreshVirtualList, this);
        }
      }
    }, {
      key: "setVirtualListChangedFlag",
      value: function setVirtualListChangedFlag(layoutChanged) {
        if (layoutChanged) this._virtualListChanged = 2;else if (this._virtualListChanged == 0) this._virtualListChanged = 1;
        fgui.Timers.callLater(this._refreshVirtualList, this);
      }
    }, {
      key: "_refreshVirtualList",
      value: function _refreshVirtualList() {
        if (!this._displayObject) return;
        var layoutChanged = this._virtualListChanged == 2;
        this._virtualListChanged = 0;
        this._eventLocked = true;

        if (layoutChanged) {
          if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.SingleRow) this._curLineItemCount = 1;else if (this._layout == fgui.ListLayoutType.FlowHorizontal) {
            if (this._columnCount > 0) this._curLineItemCount = this._columnCount;else {
              this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.x + this._columnGap));
              if (this._curLineItemCount <= 0) this._curLineItemCount = 1;
            }
          } else if (this._layout == fgui.ListLayoutType.FlowVertical) {
            if (this._lineCount > 0) this._curLineItemCount = this._lineCount;else {
              this._curLineItemCount = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.y + this._lineGap));
              if (this._curLineItemCount <= 0) this._curLineItemCount = 1;
            }
          } else {
            if (this._columnCount > 0) this._curLineItemCount = this._columnCount;else {
              this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.x + this._columnGap));
              if (this._curLineItemCount <= 0) this._curLineItemCount = 1;
            }
            if (this._lineCount > 0) this._curLineItemCount2 = this._lineCount;else {
              this._curLineItemCount2 = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.y + this._lineGap));
              if (this._curLineItemCount2 <= 0) this._curLineItemCount2 = 1;
            }
          }
        }

        var ch = 0,
            cw = 0;

        if (this._realNumItems > 0) {
          var i;

          var len = Math.ceil(this._realNumItems / this._curLineItemCount) * this._curLineItemCount;

          var len2 = Math.min(this._curLineItemCount, this._realNumItems);

          if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowHorizontal) {
            for (i = 0; i < len; i += this._curLineItemCount) {
              ch += this._virtualItems[i].height + this._lineGap;
            }

            if (ch > 0) ch -= this._lineGap;
            if (this._autoResizeItem) cw = this._scrollPane.viewWidth;else {
              for (i = 0; i < len2; i++) {
                cw += this._virtualItems[i].width + this._columnGap;
              }

              if (cw > 0) cw -= this._columnGap;
            }
          } else if (this._layout == fgui.ListLayoutType.SingleRow || this._layout == fgui.ListLayoutType.FlowVertical) {
            for (i = 0; i < len; i += this._curLineItemCount) {
              cw += this._virtualItems[i].width + this._columnGap;
            }

            if (cw > 0) cw -= this._columnGap;
            if (this._autoResizeItem) ch = this._scrollPane.viewHeight;else {
              for (i = 0; i < len2; i++) {
                ch += this._virtualItems[i].height + this._lineGap;
              }

              if (ch > 0) ch -= this._lineGap;
            }
          } else {
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
    }, {
      key: "__scrolled",
      value: function __scrolled() {
        this.handleScroll(false);
      }
    }, {
      key: "getIndexOnPos1",
      value: function getIndexOnPos1(forceUpdate) {
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
              pos2 -= this._virtualItems[i].height + this._lineGap;

              if (pos2 <= s_n) {
                s_n = pos2;
                return i;
              }
            }

            s_n = 0;
            return 0;
          } else {
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
        } else {
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
    }, {
      key: "getIndexOnPos2",
      value: function getIndexOnPos2(forceUpdate) {
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
              pos2 -= this._virtualItems[i].width + this._columnGap;

              if (pos2 <= s_n) {
                s_n = pos2;
                return i;
              }
            }

            s_n = 0;
            return 0;
          } else {
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
        } else {
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
    }, {
      key: "getIndexOnPos3",
      value: function getIndexOnPos3(forceUpdate) {
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
    }, {
      key: "handleScroll",
      value: function handleScroll(forceUpdate) {
        if (this._eventLocked) return;

        if (this._layout == fgui.ListLayoutType.SingleColumn || this._layout == fgui.ListLayoutType.FlowHorizontal) {
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
        } else if (this._layout == fgui.ListLayoutType.SingleRow || this._layout == fgui.ListLayoutType.FlowVertical) {
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
        } else {
          this.handleScroll3(forceUpdate);
        }

        this._boundsChanged = false;
      }
    }, {
      key: "handleScroll1",
      value: function handleScroll1(forceUpdate) {
        var pos = this._scrollPane.scrollingPosY;
        var max = pos + this._scrollPane.viewHeight;
        var end = max == this._scrollPane.contentHeight;
        s_n = pos;
        var newFirstIndex = this.getIndexOnPos1(forceUpdate);
        pos = s_n;
        if (newFirstIndex == this._firstIndex && !forceUpdate) return false;
        var oldFirstIndex = this._firstIndex;
        this._firstIndex = newFirstIndex;
        var curIndex = newFirstIndex;
        var forward = oldFirstIndex > newFirstIndex;
        var childCount = this.numChildren;
        var lastIndex = oldFirstIndex + childCount - 1;
        var reuseIndex = forward ? lastIndex : oldFirstIndex;
        var curX = 0,
            curY = pos;
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
              if (url == null) url = this._defaultItem;
              url = fgui.UIPackage.normalizeURL(url);
            }

            if (ii.obj && ii.obj.resourceURL != url) {
              if (ii.obj instanceof fgui.GButton) ii.selected = ii.obj.selected;
              this.removeChildToPool(ii.obj);
              ii.obj = null;
            }
          }

          if (ii.obj == null) {
            if (forward) {
              for (j = reuseIndex; j >= oldFirstIndex; j--) {
                ii2 = this._virtualItems[j];

                if (ii2.obj && ii2.flag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                  if (ii2.obj instanceof fgui.GButton) ii2.selected = ii2.obj.selected;
                  ii.obj = ii2.obj;
                  ii2.obj = null;
                  if (j == reuseIndex) reuseIndex--;
                  break;
                }
              }
            } else {
              for (j = reuseIndex; j <= lastIndex; j++) {
                ii2 = this._virtualItems[j];

                if (ii2.obj && ii2.flag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                  if (ii2.obj instanceof fgui.GButton) ii2.selected = ii2.obj.selected;
                  ii.obj = ii2.obj;
                  ii2.obj = null;
                  if (j == reuseIndex) reuseIndex++;
                  break;
                }
              }
            }

            if (ii.obj) {
              this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
            } else {
              ii.obj = this._pool.getObject(url);
              if (forward) this.addChildAt(ii.obj, curIndex - newFirstIndex);else this.addChild(ii.obj);
            }

            if (ii.obj instanceof fgui.GButton) ii.obj.selected = ii.selected;
            needRender = true;
          } else needRender = forceUpdate;

          if (needRender) {
            if (this._autoResizeItem && (this._layout == fgui.ListLayoutType.SingleColumn || this._columnCount > 0)) ii.obj.setSize(partSize, ii.obj.height, true);
            this.itemRenderer(curIndex % this._numItems, ii.obj);

            if (curIndex % this._curLineItemCount == 0) {
              deltaSize += Math.ceil(ii.obj.height) - ii.height;

              if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex) {
                firstItemDeltaSize = Math.ceil(ii.obj.height) - ii.height;
              }
            }

            ii.width = Math.ceil(ii.obj.width);
            ii.height = Math.ceil(ii.obj.height);
          }

          ii.flag = this.itemInfoVer;
          ii.obj.setPosition(curX, curY);
          if (curIndex == newFirstIndex) max += ii.height;
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
            if (ii.obj instanceof fgui.GButton) ii.selected = ii.obj.selected;
            this.removeChildToPool(ii.obj);
            ii.obj = null;
          }
        }

        childCount = this._children.length;

        for (i = 0; i < childCount; i++) {
          var obj = this._virtualItems[newFirstIndex + i].obj;
          if (this._children[i] != obj) this.setChildIndex(obj, i);
        }

        if (deltaSize != 0 || firstItemDeltaSize != 0) this._scrollPane.changeContentSizeOnScrolling(0, deltaSize, 0, firstItemDeltaSize);
        if (curIndex > 0 && this.numChildren > 0 && this._container.y <= 0 && this.getChildAt(0).y > -this._container.y) return true;else return false;
      }
    }, {
      key: "handleScroll2",
      value: function handleScroll2(forceUpdate) {
        var pos = this._scrollPane.scrollingPosX;
        var max = pos + this._scrollPane.viewWidth;
        var end = pos == this._scrollPane.contentWidth;
        s_n = pos;
        var newFirstIndex = this.getIndexOnPos2(forceUpdate);
        pos = s_n;
        if (newFirstIndex == this._firstIndex && !forceUpdate) return false;
        var oldFirstIndex = this._firstIndex;
        this._firstIndex = newFirstIndex;
        var curIndex = newFirstIndex;
        var forward = oldFirstIndex > newFirstIndex;
        var childCount = this.numChildren;
        var lastIndex = oldFirstIndex + childCount - 1;
        var reuseIndex = forward ? lastIndex : oldFirstIndex;
        var curX = pos,
            curY = 0;
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
              if (url == null) url = this._defaultItem;
              url = fgui.UIPackage.normalizeURL(url);
            }

            if (ii.obj && ii.obj.resourceURL != url) {
              if (ii.obj instanceof fgui.GButton) ii.selected = ii.obj.selected;
              this.removeChildToPool(ii.obj);
              ii.obj = null;
            }
          }

          if (ii.obj == null) {
            if (forward) {
              for (j = reuseIndex; j >= oldFirstIndex; j--) {
                ii2 = this._virtualItems[j];

                if (ii2.obj && ii2.flag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                  if (ii2.obj instanceof fgui.GButton) ii2.selected = ii2.obj.selected;
                  ii.obj = ii2.obj;
                  ii2.obj = null;
                  if (j == reuseIndex) reuseIndex--;
                  break;
                }
              }
            } else {
              for (j = reuseIndex; j <= lastIndex; j++) {
                ii2 = this._virtualItems[j];

                if (ii2.obj && ii2.flag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                  if (ii2.obj instanceof fgui.GButton) ii2.selected = ii2.obj.selected;
                  ii.obj = ii2.obj;
                  ii2.obj = null;
                  if (j == reuseIndex) reuseIndex++;
                  break;
                }
              }
            }

            if (ii.obj) {
              this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
            } else {
              ii.obj = this._pool.getObject(url);
              if (forward) this.addChildAt(ii.obj, curIndex - newFirstIndex);else this.addChild(ii.obj);
            }

            if (ii.obj instanceof fgui.GButton) ii.obj.selected = ii.selected;
            needRender = true;
          } else needRender = forceUpdate;

          if (needRender) {
            if (this._autoResizeItem && (this._layout == fgui.ListLayoutType.SingleRow || this._lineCount > 0)) ii.obj.setSize(ii.obj.width, partSize, true);
            this.itemRenderer(curIndex % this._numItems, ii.obj);

            if (curIndex % this._curLineItemCount == 0) {
              deltaSize += Math.ceil(ii.obj.width) - ii.width;

              if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex) {
                firstItemDeltaSize = Math.ceil(ii.obj.width) - ii.width;
              }
            }

            ii.width = Math.ceil(ii.obj.width);
            ii.height = Math.ceil(ii.obj.height);
          }

          ii.flag = this.itemInfoVer;
          ii.obj.setPosition(curX, curY);
          if (curIndex == newFirstIndex) max += ii.width;
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
            if (ii.obj instanceof fgui.GButton) ii.selected = ii.obj.selected;
            this.removeChildToPool(ii.obj);
            ii.obj = null;
          }
        }

        childCount = this._children.length;

        for (i = 0; i < childCount; i++) {
          var obj = this._virtualItems[newFirstIndex + i].obj;
          if (this._children[i] != obj) this.setChildIndex(obj, i);
        }

        if (deltaSize != 0 || firstItemDeltaSize != 0) this._scrollPane.changeContentSizeOnScrolling(deltaSize, 0, firstItemDeltaSize, 0);
        if (curIndex > 0 && this.numChildren > 0 && this._container.x <= 0 && this.getChildAt(0).x > -this._container.x) return true;else return false;
      }
    }, {
      key: "handleScroll3",
      value: function handleScroll3(forceUpdate) {
        var pos = this._scrollPane.scrollingPosX;
        s_n = pos;
        var newFirstIndex = this.getIndexOnPos3(forceUpdate);
        pos = s_n;
        if (newFirstIndex == this._firstIndex && !forceUpdate) return;
        var oldFirstIndex = this._firstIndex;
        this._firstIndex = newFirstIndex;
        var reuseIndex = oldFirstIndex;
        var virtualItemCount = this._virtualItems.length;
        var pageSize = this._curLineItemCount * this._curLineItemCount2;
        var startCol = newFirstIndex % this._curLineItemCount;
        var viewWidth = this.viewWidth;
        var page = Math.floor(newFirstIndex / pageSize);
        var startIndex = page * pageSize;
        var lastIndex = startIndex + pageSize * 2;
        var needRender;
        var i;
        var ii, ii2;
        var col;
        var url = this._defaultItem;
        var partWidth = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
        var partHeight = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount2 - 1)) / this._curLineItemCount2;
        this.itemInfoVer++;

        for (i = startIndex; i < lastIndex; i++) {
          if (i >= this._realNumItems) continue;
          col = i % this._curLineItemCount;

          if (i - startIndex < pageSize) {
            if (col < startCol) continue;
          } else {
            if (col > startCol) continue;
          }

          ii = this._virtualItems[i];
          ii.flag = this.itemInfoVer;
        }

        var lastObj = null;
        var insertIndex = 0;

        for (i = startIndex; i < lastIndex; i++) {
          if (i >= this._realNumItems) continue;
          ii = this._virtualItems[i];
          if (ii.flag != this.itemInfoVer) continue;

          if (ii.obj == null) {
            while (reuseIndex < virtualItemCount) {
              ii2 = this._virtualItems[reuseIndex];

              if (ii2.obj && ii2.flag != this.itemInfoVer) {
                if (ii2.obj instanceof fgui.GButton) ii2.selected = ii2.obj.selected;
                ii.obj = ii2.obj;
                ii2.obj = null;
                break;
              }

              reuseIndex++;
            }

            if (insertIndex == -1) insertIndex = this.getChildIndex(lastObj) + 1;

            if (ii.obj == null) {
              if (this.itemProvider) {
                url = this.itemProvider(i % this._numItems);
                if (url == null) url = this._defaultItem;
                url = fgui.UIPackage.normalizeURL(url);
              }

              ii.obj = this._pool.getObject(url);
              this.addChildAt(ii.obj, insertIndex);
            } else {
              insertIndex = this.setChildIndexBefore(ii.obj, insertIndex);
            }

            insertIndex++;
            if (ii.obj instanceof fgui.GButton) ii.obj.selected = ii.selected;
            needRender = true;
          } else {
            needRender = forceUpdate;
            insertIndex = -1;
            lastObj = ii.obj;
          }

          if (needRender) {
            if (this._autoResizeItem) {
              if (this._curLineItemCount == this._columnCount && this._curLineItemCount2 == this._lineCount) ii.obj.setSize(partWidth, partHeight, true);else if (this._curLineItemCount == this._columnCount) ii.obj.setSize(partWidth, ii.obj.height, true);else if (this._curLineItemCount2 == this._lineCount) ii.obj.setSize(ii.obj.width, partHeight, true);
            }

            this.itemRenderer(i % this._numItems, ii.obj);
            ii.width = Math.ceil(ii.obj.width);
            ii.height = Math.ceil(ii.obj.height);
          }
        }

        var borderX = startIndex / pageSize * viewWidth;
        var xx = borderX;
        var yy = 0;
        var lineHeight = 0;

        for (i = startIndex; i < lastIndex; i++) {
          if (i >= this._realNumItems) continue;
          ii = this._virtualItems[i];
          if (ii.flag == this.itemInfoVer) ii.obj.setPosition(xx, yy);
          if (ii.height > lineHeight) lineHeight = ii.height;

          if (i % this._curLineItemCount == this._curLineItemCount - 1) {
            xx = borderX;
            yy += lineHeight + this._lineGap;
            lineHeight = 0;

            if (i == startIndex + pageSize - 1) {
              borderX += viewWidth;
              xx = borderX;
              yy = 0;
            }
          } else xx += ii.width + this._columnGap;
        }

        for (i = reuseIndex; i < virtualItemCount; i++) {
          ii = this._virtualItems[i];

          if (ii.flag != this.itemInfoVer && ii.obj) {
            if (ii.obj instanceof fgui.GButton) ii.selected = ii.obj.selected;
            this.removeChildToPool(ii.obj);
            ii.obj = null;
          }
        }
      }
    }, {
      key: "handleArchOrder1",
      value: function handleArchOrder1() {
        if (this.childrenRenderOrder == fgui.ChildrenRenderOrder.Arch) {
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
    }, {
      key: "handleArchOrder2",
      value: function handleArchOrder2() {
        if (this.childrenRenderOrder == fgui.ChildrenRenderOrder.Arch) {
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
    }, {
      key: "handleAlign",
      value: function handleAlign(contentWidth, contentHeight) {
        var newOffsetX = 0;
        var newOffsetY = 0;

        if (contentHeight < this.viewHeight) {
          if (this._verticalAlign == "middle") newOffsetY = Math.floor((this.viewHeight - contentHeight) / 2);else if (this._verticalAlign == "bottom") newOffsetY = this.viewHeight - contentHeight;
        }

        if (contentWidth < this.viewWidth) {
          if (this._align == "center") newOffsetX = Math.floor((this.viewWidth - contentWidth) / 2);else if (this._align == "right") newOffsetX = this.viewWidth - contentWidth;
        }

        if (newOffsetX != this._alignOffset.x || newOffsetY != this._alignOffset.y) {
          this._alignOffset.set(newOffsetX, newOffsetY);

          if (this._scrollPane) this._scrollPane.adjustMaskContainer();else this._container.setPosition(this._margin.left + this._alignOffset.x, this._margin.top + this._alignOffset.y);
        }
      }
    }, {
      key: "updateBounds",
      value: function updateBounds() {
        if (this._virtual) return;
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

        if (this._layout == fgui.ListLayoutType.SingleColumn) {
          for (i = 0; i < cnt; i++) {
            child = this.getChildAt(i);
            if (this.foldInvisibleItems && !child.visible) continue;
            if (curY != 0) curY += this._lineGap;
            child.y = curY;
            if (this._autoResizeItem) child.setSize(viewWidth, child.height, true);
            curY += Math.ceil(child.height);
            if (child.width > maxWidth) maxWidth = child.width;
          }

          ch = curY;

          if (ch <= viewHeight && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.vtScrollBar) {
            viewWidth += this._scrollPane.vtScrollBar.width;

            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;
              child.setSize(viewWidth, child.height, true);
              if (child.width > maxWidth) maxWidth = child.width;
            }
          }

          cw = Math.ceil(maxWidth);
        } else if (this._layout == fgui.ListLayoutType.SingleRow) {
          for (i = 0; i < cnt; i++) {
            child = this.getChildAt(i);
            if (this.foldInvisibleItems && !child.visible) continue;
            if (curX != 0) curX += this._columnGap;
            child.x = curX;
            if (this._autoResizeItem) child.setSize(child.width, viewHeight, true);
            curX += Math.ceil(child.width);
            if (child.height > maxHeight) maxHeight = child.height;
          }

          cw = curX;

          if (cw <= viewWidth && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.hzScrollBar) {
            viewHeight += this._scrollPane.hzScrollBar.height;

            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;
              child.setSize(child.width, viewHeight, true);
              if (child.height > maxHeight) maxHeight = child.height;
            }
          }

          ch = Math.ceil(maxHeight);
        } else if (this._layout == fgui.ListLayoutType.FlowHorizontal) {
          if (this._autoResizeItem && this._columnCount > 0) {
            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;
              lineSize += child.sourceWidth;
              j++;

              if (j == this._columnCount || i == cnt - 1) {
                ratio = (viewWidth - lineSize - (j - 1) * this._columnGap) / lineSize;
                curX = 0;

                for (j = lineStart; j <= i; j++) {
                  child = this.getChildAt(j);
                  if (this.foldInvisibleItems && !child.visible) continue;
                  child.setPosition(curX, curY);

                  if (j < i) {
                    child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), child.height, true);
                    curX += Math.ceil(child.width) + this._columnGap;
                  } else {
                    child.setSize(viewWidth - curX, child.height, true);
                  }

                  if (child.height > maxHeight) maxHeight = child.height;
                }

                curY += Math.ceil(maxHeight) + this._lineGap;
                maxHeight = 0;
                j = 0;
                lineStart = i + 1;
                lineSize = 0;
              }
            }

            ch = curY + Math.ceil(maxHeight);
            cw = viewWidth;
          } else {
            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;
              if (curX != 0) curX += this._columnGap;

              if (this._columnCount != 0 && j >= this._columnCount || this._columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0) {
                curX = 0;
                curY += Math.ceil(maxHeight) + this._lineGap;
                maxHeight = 0;
                j = 0;
              }

              child.setPosition(curX, curY);
              curX += Math.ceil(child.width);
              if (curX > maxWidth) maxWidth = curX;
              if (child.height > maxHeight) maxHeight = child.height;
              j++;
            }

            ch = curY + Math.ceil(maxHeight);
            cw = Math.ceil(maxWidth);
          }
        } else if (this._layout == fgui.ListLayoutType.FlowVertical) {
          if (this._autoResizeItem && this._lineCount > 0) {
            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;
              lineSize += child.sourceHeight;
              j++;

              if (j == this._lineCount || i == cnt - 1) {
                ratio = (viewHeight - lineSize - (j - 1) * this._lineGap) / lineSize;
                curY = 0;

                for (j = lineStart; j <= i; j++) {
                  child = this.getChildAt(j);
                  if (this.foldInvisibleItems && !child.visible) continue;
                  child.setPosition(curX, curY);

                  if (j < i) {
                    child.setSize(child.width, child.sourceHeight + Math.round(child.sourceHeight * ratio), true);
                    curY += Math.ceil(child.height) + this._lineGap;
                  } else {
                    child.setSize(child.width, viewHeight - curY, true);
                  }

                  if (child.width > maxWidth) maxWidth = child.width;
                }

                curX += Math.ceil(maxWidth) + this._columnGap;
                maxWidth = 0;
                j = 0;
                lineStart = i + 1;
                lineSize = 0;
              }
            }

            cw = curX + Math.ceil(maxWidth);
            ch = viewHeight;
          } else {
            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;
              if (curY != 0) curY += this._lineGap;

              if (this._lineCount != 0 && j >= this._lineCount || this._lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0) {
                curY = 0;
                curX += Math.ceil(maxWidth) + this._columnGap;
                maxWidth = 0;
                j = 0;
              }

              child.setPosition(curX, curY);
              curY += Math.ceil(child.height);
              if (curY > maxHeight) maxHeight = curY;
              if (child.width > maxWidth) maxWidth = child.width;
              j++;
            }

            cw = curX + Math.ceil(maxWidth);
            ch = Math.ceil(maxHeight);
          }
        } else {
          var eachHeight;
          if (this._autoResizeItem && this._lineCount > 0) eachHeight = Math.floor((viewHeight - (this._lineCount - 1) * this._lineGap) / this._lineCount);

          if (this._autoResizeItem && this._columnCount > 0) {
            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;

              if (j == 0 && (this._lineCount != 0 && k >= this._lineCount || this._lineCount == 0 && curY + child.height > viewHeight)) {
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
                  if (this.foldInvisibleItems && !child.visible) continue;
                  child.setPosition(page * viewWidth + curX, curY);

                  if (j < i) {
                    child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), this._lineCount > 0 ? eachHeight : child.height, true);
                    curX += Math.ceil(child.width) + this._columnGap;
                  } else {
                    child.setSize(viewWidth - curX, this._lineCount > 0 ? eachHeight : child.height, true);
                  }

                  if (child.height > maxHeight) maxHeight = child.height;
                }

                curY += Math.ceil(maxHeight) + this._lineGap;
                maxHeight = 0;
                j = 0;
                lineStart = i + 1;
                lineSize = 0;
                k++;
              }
            }
          } else {
            for (i = 0; i < cnt; i++) {
              child = this.getChildAt(i);
              if (this.foldInvisibleItems && !child.visible) continue;
              if (curX != 0) curX += this._columnGap;
              if (this._autoResizeItem && this._lineCount > 0) child.setSize(child.width, eachHeight, true);

              if (this._columnCount != 0 && j >= this._columnCount || this._columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0) {
                curX = 0;
                curY += Math.ceil(maxHeight) + this._lineGap;
                maxHeight = 0;
                j = 0;
                k++;

                if (this._lineCount != 0 && k >= this._lineCount || this._lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0) {
                  page++;
                  curY = 0;
                  k = 0;
                }
              }

              child.setPosition(page * viewWidth + curX, curY);
              curX += Math.ceil(child.width);
              if (curX > maxWidth) maxWidth = curX;
              if (child.height > maxHeight) maxHeight = child.height;
              j++;
            }
          }

          ch = page > 0 ? viewHeight : curY + Math.ceil(maxHeight);
          cw = (page + 1) * viewWidth;
        }

        this.handleAlign(cw, ch);
        this.setBounds(0, 0, cw, ch);
      }
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GList.prototype), "setup_beforeAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 5);
        var i1;
        this._layout = buffer.readByte();
        this._selectionMode = buffer.readByte();
        i1 = buffer.readByte();
        this._align = i1 == 0 ? "left" : i1 == 1 ? "center" : "right";
        i1 = buffer.readByte();
        this._verticalAlign = i1 == 0 ? "top" : i1 == 1 ? "middle" : "bottom";
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

        if (overflow == fgui.OverflowType.Scroll) {
          var savedPos = buffer.pos;
          buffer.seek(beginPos, 7);
          this.setupScroll(buffer);
          buffer.pos = savedPos;
        } else this.setupOverflow(overflow);

        if (buffer.readBool()) buffer.skip(8);

        if (buffer.version >= 2) {
          this.scrollItemToViewOnClick = buffer.readBool();
          this.foldInvisibleItems = buffer.readBool();
        }

        buffer.seek(beginPos, 8);
        this._defaultItem = buffer.readS();
        this.readItems(buffer);
      }
    }, {
      key: "readItems",
      value: function readItems(buffer) {
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
    }, {
      key: "setupItem",
      value: function setupItem(buffer, obj) {
        var str;
        str = buffer.readS();
        if (str != null) obj.text = str;
        str = buffer.readS();
        if (str != null && obj instanceof fgui.GButton) obj.selectedTitle = str;
        str = buffer.readS();
        if (str != null) obj.icon = str;
        str = buffer.readS();
        if (str != null && obj instanceof fgui.GButton) obj.selectedIcon = str;
        str = buffer.readS();
        if (str != null) obj.name = str;
        var cnt;
        var i;

        if (obj instanceof fgui.GComponent) {
          cnt = buffer.readShort();

          for (i = 0; i < cnt; i++) {
            var cc = obj.getController(buffer.readS());
            str = buffer.readS();
            if (cc) cc.selectedPageId = str;
          }

          if (buffer.version >= 2) {
            cnt = buffer.readShort();

            for (i = 0; i < cnt; i++) {
              var target = buffer.readS();
              var propertyId = buffer.readShort();
              var value = buffer.readS();
              var obj2 = obj.getChildByPath(target);
              if (obj2) obj2.setProp(propertyId, value);
            }
          }
        }
      }
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GList.prototype), "setup_afterAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 6);
        var i = buffer.readShort();
        if (i != -1) this._selectionController = this._parent.getControllerAt(i);
      }
    }, {
      key: "layout",
      get: function get() {
        return this._layout;
      },
      set: function set(value) {
        if (this._layout != value) {
          this._layout = value;
          this.setBoundsChangedFlag();
          if (this._virtual) this.setVirtualListChangedFlag(true);
        }
      }
    }, {
      key: "lineCount",
      get: function get() {
        return this._lineCount;
      },
      set: function set(value) {
        if (this._lineCount != value) {
          this._lineCount = value;

          if (this._layout == fgui.ListLayoutType.FlowVertical || this._layout == fgui.ListLayoutType.Pagination) {
            this.setBoundsChangedFlag();
            if (this._virtual) this.setVirtualListChangedFlag(true);
          }
        }
      }
    }, {
      key: "columnCount",
      get: function get() {
        return this._columnCount;
      },
      set: function set(value) {
        if (this._columnCount != value) {
          this._columnCount = value;

          if (this._layout == fgui.ListLayoutType.FlowHorizontal || this._layout == fgui.ListLayoutType.Pagination) {
            this.setBoundsChangedFlag();
            if (this._virtual) this.setVirtualListChangedFlag(true);
          }
        }
      }
    }, {
      key: "lineGap",
      get: function get() {
        return this._lineGap;
      },
      set: function set(value) {
        if (this._lineGap != value) {
          this._lineGap = value;
          this.setBoundsChangedFlag();
          if (this._virtual) this.setVirtualListChangedFlag(true);
        }
      }
    }, {
      key: "columnGap",
      get: function get() {
        return this._columnGap;
      },
      set: function set(value) {
        if (this._columnGap != value) {
          this._columnGap = value;
          this.setBoundsChangedFlag();
          if (this._virtual) this.setVirtualListChangedFlag(true);
        }
      }
    }, {
      key: "align",
      get: function get() {
        return this._align;
      },
      set: function set(value) {
        if (this._align != value) {
          this._align = value;
          this.setBoundsChangedFlag();
          if (this._virtual) this.setVirtualListChangedFlag(true);
        }
      }
    }, {
      key: "verticalAlign",
      get: function get() {
        return this._verticalAlign;
      },
      set: function set(value) {
        if (this._verticalAlign != value) {
          this._verticalAlign = value;
          this.setBoundsChangedFlag();
          if (this._virtual) this.setVirtualListChangedFlag(true);
        }
      }
    }, {
      key: "virtualItemSize",
      get: function get() {
        return this._itemSize;
      },
      set: function set(value) {
        if (this._virtual) {
          if (this._itemSize == null) this._itemSize = new THREE.Vector2();

          this._itemSize.set(value.x, value.y);

          this.setVirtualListChangedFlag(true);
        }
      }
    }, {
      key: "defaultItem",
      get: function get() {
        return this._defaultItem;
      },
      set: function set(val) {
        this._defaultItem = val;
      }
    }, {
      key: "autoResizeItem",
      get: function get() {
        return this._autoResizeItem;
      },
      set: function set(value) {
        if (this._autoResizeItem != value) {
          this._autoResizeItem = value;
          this.setBoundsChangedFlag();
          if (this._virtual) this.setVirtualListChangedFlag(true);
        }
      }
    }, {
      key: "selectionMode",
      get: function get() {
        return this._selectionMode;
      },
      set: function set(value) {
        this._selectionMode = value;
      }
    }, {
      key: "selectionController",
      get: function get() {
        return this._selectionController;
      },
      set: function set(value) {
        this._selectionController = value;
      }
    }, {
      key: "itemPool",
      get: function get() {
        return this._pool;
      }
    }, {
      key: "selectedIndex",
      get: function get() {
        var i;

        if (this._virtual) {
          for (i = 0; i < this._realNumItems; i++) {
            var ii = this._virtualItems[i];

            if (ii.obj instanceof fgui.GButton && ii.obj.selected || ii.obj == null && ii.selected) {
              if (this._loop) return i % this._numItems;else return i;
            }
          }
        } else {
          var cnt = this._children.length;

          for (i = 0; i < cnt; i++) {
            var obj = this._children[i];
            if (obj && obj.selected) return i;
          }
        }

        return -1;
      },
      set: function set(value) {
        if (value >= 0 && value < this.numItems) {
          if (this._selectionMode != fgui.ListSelectionMode.Single) this.clearSelection();
          this.addSelection(value);
        } else this.clearSelection();
      }
    }, {
      key: "numItems",
      get: function get() {
        if (this._virtual) return this._numItems;else return this._children.length;
      },
      set: function set(value) {
        var i;

        if (this._virtual) {
          if (this.itemRenderer == null) throw new Error("set itemRenderer first!");
          this._numItems = value;
          if (this._loop) this._realNumItems = this._numItems * 6;else this._realNumItems = this._numItems;
          var oldCount = this._virtualItems.length;

          if (this._realNumItems > oldCount) {
            for (i = oldCount; i < this._realNumItems; i++) {
              var ii = {
                width: 0,
                height: 0,
                flag: 0
              };
              ii.width = this._itemSize.x;
              ii.height = this._itemSize.y;

              this._virtualItems.push(ii);
            }
          } else {
            for (i = this._realNumItems; i < oldCount; i++) {
              this._virtualItems[i].selected = false;
            }
          }

          if (this._virtualListChanged != 0) fgui.Timers.remove(this._refreshVirtualList, this);

          this._refreshVirtualList();
        } else {
          var cnt = this._children.length;

          if (value > cnt) {
            for (i = cnt; i < value; i++) {
              if (this.itemProvider == null) this.addItemFromPool();else this.addItemFromPool(this.itemProvider(i));
            }
          } else {
            this.removeChildrenToPool(value, cnt);
          }

          if (this.itemRenderer) {
            for (i = 0; i < value; i++) {
              this.itemRenderer(i, this.getChildAt(i));
            }
          }
        }
      }
    }]);

    return GList;
  }(fgui.GComponent);

  fgui.GList = GList;
  var s_n = 0;
})(fgui || (fgui = {}));

(function (fgui) {
  var GLoader = /*#__PURE__*/function (_fgui$GObject5) {
    _inherits(GLoader, _fgui$GObject5);

    var _super32 = _createSuper(GLoader);

    function GLoader() {
      var _this24;

      _classCallCheck(this, GLoader);

      _this24 = _super32.call(this);
      _this24._contentSourceWidth = 0;
      _this24._contentSourceHeight = 0;
      _this24._contentWidth = 0;
      _this24._contentHeight = 0;
      _this24._url = "";
      _this24._fill = fgui.LoaderFillType.None;
      _this24._align = "left";
      _this24._valign = "top";
      return _this24;
    }

    _createClass(GLoader, [{
      key: "createDisplayObject",
      value: function createDisplayObject() {
        this._displayObject = new fgui.DisplayObject();
        this._content = new fgui.MovieClip();

        this._displayObject.addChild(this._content);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (this._contentItem && this._content.texture) {
          this.freeExternal(this._content.texture);
        }

        if (this._content2) this._content2.dispose();

        _get(_getPrototypeOf(GLoader.prototype), "dispose", this).call(this);
      }
    }, {
      key: "loadContent",
      value: function loadContent() {
        this.clearContent();
        if (!this._url) return;
        if (this._url.startsWith("ui://")) this.loadFromPackage(this._url);else this.loadExternal();
      }
    }, {
      key: "loadFromPackage",
      value: function loadFromPackage(itemURL) {
        this._contentItem = fgui.UIPackage.getItemByURL(itemURL);

        if (this._contentItem) {
          this._contentItem = this._contentItem.getBranch();
          this._contentSourceWidth = this._contentItem.width;
          this._contentSourceHeight = this._contentItem.height;
          this._contentItem = this._contentItem.getHighResolution();

          this._contentItem.load();

          if (this._autoSize) this.setSize(this._contentSourceWidth, this._contentSourceHeight);

          if (this._contentItem.type == fgui.PackageItemType.Image) {
            if (this._contentItem.texture == null) {
              this.setErrorState();
            } else {
              this._content.texture = this._contentItem.texture;
              this._content.scale9Grid = this._contentItem.scale9Grid;
              this._content.scaleByTile = this._contentItem.scaleByTile;
              this._content.tileGridIndice = this._contentItem.tileGridIndice;
              this._contentSourceWidth = this._contentItem.width;
              this._contentSourceHeight = this._contentItem.height;
              this.updateLayout();
            }
          } else if (this._contentItem.type == fgui.PackageItemType.MovieClip) {
            this._contentSourceWidth = this._contentItem.width;
            this._contentSourceHeight = this._contentItem.height;
            this._content.interval = this._contentItem.interval;
            this._content.swing = this._contentItem.swing;
            this._content.repeatDelay = this._contentItem.repeatDelay;
            this._content.frames = this._contentItem.frames;
            this.updateLayout();
          } else if (this._contentItem.type == fgui.PackageItemType.Component) {
            var obj = fgui.UIPackage.createObjectFromURL(itemURL);
            if (!obj) this.setErrorState();else if (!(obj instanceof fgui.GComponent)) {
              obj.dispose();
              this.setErrorState();
            } else {
              this._content2 = obj;

              this._displayObject.addChild(this._content2.displayObject);

              this.updateLayout();
            }
          } else this.setErrorState();
        } else this.setErrorState();
      }
    }, {
      key: "loadExternal",
      value: function loadExternal() {
        var _this25 = this;

        var url = this._url;
        new THREE.TextureLoader().load(this._url, function (tex) {
          if (url == _this25._url) _this25.onExternalLoadSuccess(new fgui.NTexture(tex));
        });
      }
    }, {
      key: "freeExternal",
      value: function freeExternal(texture) {}
    }, {
      key: "onExternalLoadSuccess",
      value: function onExternalLoadSuccess(texture) {
        this._content.texture = texture;
        this._content.scale9Grid = null;
        this._content.scaleByTile = false;
        this._contentSourceWidth = texture.width;
        this._contentSourceHeight = texture.height;
        this.updateLayout();
      }
    }, {
      key: "onExternalLoadFailed",
      value: function onExternalLoadFailed() {
        this.setErrorState();
      }
    }, {
      key: "setErrorState",
      value: function setErrorState() {}
    }, {
      key: "clearErrorState",
      value: function clearErrorState() {}
    }, {
      key: "updateLayout",
      value: function updateLayout() {
        if (!this._content2 && !this._content.texture && !this._content.frames) {
          if (this._autoSize) {
            this._updatingLayout = true;
            this.setSize(50, 30);
            this._updatingLayout = false;
          }

          return;
        }

        this._contentWidth = this._contentSourceWidth;
        this._contentHeight = this._contentSourceHeight;

        if (this._autoSize) {
          this._updatingLayout = true;
          if (this._contentWidth == 0) this._contentWidth = 50;
          if (this._contentHeight == 0) this._contentHeight = 30;
          this.setSize(this._contentWidth, this._contentHeight);
          this._updatingLayout = false;

          if (this._contentWidth == this._width && this._contentHeight == this._height) {
            if (this._content2) {
              this._content2.setPosition(0, 0);

              this._content2.setScale(1, 1);
            } else {
              this._content.setSize(this._contentWidth, this._contentHeight);

              this._content.setPosition(0, 0);
            }

            return;
          }
        }

        var sx = 1,
            sy = 1;

        if (this._fill != fgui.LoaderFillType.None) {
          sx = this.width / this._contentSourceWidth;
          sy = this.height / this._contentSourceHeight;

          if (sx != 1 || sy != 1) {
            if (this._fill == fgui.LoaderFillType.ScaleMatchHeight) sx = sy;else if (this._fill == fgui.LoaderFillType.ScaleMatchWidth) sy = sx;else if (this._fill == fgui.LoaderFillType.Scale) {
              if (sx > sy) sx = sy;else sy = sx;
            } else if (this._fill == fgui.LoaderFillType.ScaleNoBorder) {
              if (sx > sy) sy = sx;else sx = sy;
            }

            if (this._shrinkOnly) {
              if (sx > 1) sx = 1;
              if (sy > 1) sy = 1;
            }

            this._contentWidth = this._contentSourceWidth * sx;
            this._contentHeight = this._contentSourceHeight * sy;
          }
        }

        if (this._content2) this._content2.setScale(sx, sy);else this._content.setSize(this._contentWidth, this._contentHeight);
        var nx, ny;
        if (this._align == "center") nx = Math.floor((this.width - this._contentWidth) / 2);else if (this._align == "right") nx = this.width - this._contentWidth;else nx = 0;
        if (this._valign == "middle") ny = Math.floor((this.height - this._contentHeight) / 2);else if (this._valign == "bottom") ny = this.height - this._contentHeight;else ny = 0;
        if (this._content2) this._content2.setPosition(nx, ny);else this._content.setPosition(nx, ny);
      }
    }, {
      key: "clearContent",
      value: function clearContent() {
        this.clearErrorState();

        if (this._contentItem == null && this._content.texture) {
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
    }, {
      key: "handleSizeChanged",
      value: function handleSizeChanged() {
        _get(_getPrototypeOf(GLoader.prototype), "handleSizeChanged", this).call(this);

        if (!this._updatingLayout) this.updateLayout();
      }
    }, {
      key: "getProp",
      value: function getProp(index) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            return this.color;

          case fgui.ObjectPropID.Playing:
            return this.playing;

          case fgui.ObjectPropID.Frame:
            return this.frame;

          case fgui.ObjectPropID.TimeScale:
            return this._content.timeScale;

          default:
            return _get(_getPrototypeOf(GLoader.prototype), "getProp", this).call(this, index);
        }
      }
    }, {
      key: "setProp",
      value: function setProp(index, value) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            this.color = value;
            break;

          case fgui.ObjectPropID.Playing:
            this.playing = value;
            break;

          case fgui.ObjectPropID.Frame:
            this.frame = value;
            break;

          case fgui.ObjectPropID.TimeScale:
            this._content.timeScale = value;
            break;

          case fgui.ObjectPropID.DeltaTime:
            this._content.advance(value);

            break;

          default:
            _get(_getPrototypeOf(GLoader.prototype), "setProp", this).call(this, index, value);

            break;
        }
      }
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GLoader.prototype), "setup_beforeAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 5);
        var iv;
        this._url = buffer.readS();
        iv = buffer.readByte();
        this._align = iv == 0 ? "left" : iv == 1 ? "center" : "right";
        iv = buffer.readByte();
        this._valign = iv == 0 ? "top" : iv == 1 ? "middle" : "bottom";
        this._fill = buffer.readByte();
        this._shrinkOnly = buffer.readBool();
        this._autoSize = buffer.readBool();
        buffer.readBool();
        this._content.playing = buffer.readBool();
        this._content.frame = buffer.readInt();
        if (buffer.readBool()) this.color = buffer.readColor();
        this._content.fillMethod = buffer.readByte();

        if (this._content.fillMethod != 0) {
          this._content.fillOrigin = buffer.readByte();
          this._content.fillClockwise = buffer.readBool();
          this._content.fillAmount = buffer.readFloat();
        }

        if (this._url) this.loadContent();
      }
    }, {
      key: "url",
      get: function get() {
        return this._url;
      },
      set: function set(value) {
        if (this._url == value) return;
        this._url = value;
        this.loadContent();
        this.updateGear(7);
      }
    }, {
      key: "icon",
      get: function get() {
        return this._url;
      },
      set: function set(value) {
        this.url = value;
      }
    }, {
      key: "align",
      get: function get() {
        return this._align;
      },
      set: function set(value) {
        if (this._align != value) {
          this._align = value;
          this.updateLayout();
        }
      }
    }, {
      key: "verticalAlign",
      get: function get() {
        return this._valign;
      },
      set: function set(value) {
        if (this._valign != value) {
          this._valign = value;
          this.updateLayout();
        }
      }
    }, {
      key: "fill",
      get: function get() {
        return this._fill;
      },
      set: function set(value) {
        if (this._fill != value) {
          this._fill = value;
          this.updateLayout();
        }
      }
    }, {
      key: "shrinkOnly",
      get: function get() {
        return this._shrinkOnly;
      },
      set: function set(value) {
        if (this._shrinkOnly != value) {
          this._shrinkOnly = value;
          this.updateLayout();
        }
      }
    }, {
      key: "autoSize",
      get: function get() {
        return this._autoSize;
      },
      set: function set(value) {
        if (this._autoSize != value) {
          this._autoSize = value;
          this.updateLayout();
        }
      }
    }, {
      key: "playing",
      get: function get() {
        return this._content.playing;
      },
      set: function set(value) {
        if (this._content.playing != value) {
          this._content.playing = value;
          this.updateGear(5);
        }
      }
    }, {
      key: "frame",
      get: function get() {
        return this._content.frame;
      },
      set: function set(value) {
        if (this._content.frame != value) {
          this._content.frame = value;
          this.updateGear(5);
        }
      }
    }, {
      key: "color",
      get: function get() {
        return this._content.graphics.color;
      },
      set: function set(value) {
        if (this._content.graphics.color != value) {
          this._content.graphics.color = value;
          this.updateGear(4);
        }
      }
    }, {
      key: "content",
      get: function get() {
        return this._content;
      }
    }, {
      key: "component",
      get: function get() {
        return this._content2;
      }
    }]);

    return GLoader;
  }(fgui.GObject);

  fgui.GLoader = GLoader;
})(fgui || (fgui = {}));

(function (fgui) {
  var GLoader3D = /*#__PURE__*/function (_fgui$GObject6) {
    _inherits(GLoader3D, _fgui$GObject6);

    var _super33 = _createSuper(GLoader3D);

    function GLoader3D() {
      _classCallCheck(this, GLoader3D);

      return _super33.apply(this, arguments);
    }

    return GLoader3D;
  }(fgui.GObject);

  fgui.GLoader3D = GLoader3D;
})(fgui || (fgui = {}));

(function (fgui) {
  var GMovieClip = /*#__PURE__*/function (_fgui$GObject7) {
    _inherits(GMovieClip, _fgui$GObject7);

    var _super34 = _createSuper(GMovieClip);

    function GMovieClip() {
      _classCallCheck(this, GMovieClip);

      return _super34.call(this);
    }

    _createClass(GMovieClip, [{
      key: "createDisplayObject",
      value: function createDisplayObject() {
        this._displayObject = this._movieClip = new fgui.MovieClip();
      }
    }, {
      key: "rewind",
      value: function rewind() {
        this._movieClip.rewind();
      }
    }, {
      key: "syncStatus",
      value: function syncStatus(anotherMc) {
        this._movieClip.syncStatus(anotherMc._movieClip);
      }
    }, {
      key: "advance",
      value: function advance(timeInMiniseconds) {
        this._movieClip.advance(timeInMiniseconds);
      }
    }, {
      key: "setPlaySettings",
      value: function setPlaySettings(start, end, times, endAt) {
        this._movieClip.setPlaySettings(start, end, times, endAt);
      }
    }, {
      key: "getProp",
      value: function getProp(index) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            return this.color;

          case fgui.ObjectPropID.Playing:
            return this.playing;

          case fgui.ObjectPropID.Frame:
            return this.frame;

          case fgui.ObjectPropID.TimeScale:
            return this.timeScale;

          default:
            return _get(_getPrototypeOf(GMovieClip.prototype), "getProp", this).call(this, index);
        }
      }
    }, {
      key: "setProp",
      value: function setProp(index, value) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            this.color = value;
            break;

          case fgui.ObjectPropID.Playing:
            this.playing = value;
            break;

          case fgui.ObjectPropID.Frame:
            this.frame = value;
            break;

          case fgui.ObjectPropID.TimeScale:
            this.timeScale = value;
            break;

          case fgui.ObjectPropID.DeltaTime:
            this.advance(value);
            break;

          default:
            _get(_getPrototypeOf(GMovieClip.prototype), "setProp", this).call(this, index, value);

            break;
        }
      }
    }, {
      key: "constructFromResource",
      value: function constructFromResource() {
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
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GMovieClip.prototype), "setup_beforeAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 5);
        if (buffer.readBool()) this.color = buffer.readColor();
        this._movieClip.graphics.flip = buffer.readByte();
        this._movieClip.frame = buffer.readInt();
        this._movieClip.playing = buffer.readBool();
      }
    }, {
      key: "color",
      get: function get() {
        return this._movieClip.graphics.color;
      },
      set: function set(value) {
        this._movieClip.graphics.color = value;
      }
    }, {
      key: "playing",
      get: function get() {
        return this._movieClip.playing;
      },
      set: function set(value) {
        if (this._movieClip.playing != value) {
          this._movieClip.playing = value;
          this.updateGear(5);
        }
      }
    }, {
      key: "frame",
      get: function get() {
        return this._movieClip.frame;
      },
      set: function set(value) {
        if (this._movieClip.frame != value) {
          this._movieClip.frame = value;
          this.updateGear(5);
        }
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this._movieClip.timeScale;
      },
      set: function set(value) {
        this._movieClip.timeScale = value;
      }
    }]);

    return GMovieClip;
  }(fgui.GObject);

  fgui.GMovieClip = GMovieClip;
})(fgui || (fgui = {}));

(function (fgui) {
  var GObjectPool = /*#__PURE__*/function () {
    function GObjectPool() {
      _classCallCheck(this, GObjectPool);

      this._count = 0;
      this._pool = {};
    }

    _createClass(GObjectPool, [{
      key: "clear",
      value: function clear() {
        for (var i1 in this._pool) {
          var arr = this._pool[i1];
          arr.forEach(function (obj) {
            return obj.dispose();
          });
        }

        this._pool = {};
        this._count = 0;
      }
    }, {
      key: "getObject",
      value: function getObject(url) {
        url = fgui.UIPackage.normalizeURL(url);
        if (url == null) return null;
        var arr = this._pool[url];

        if (arr && arr.length > 0) {
          this._count--;
          return arr.shift();
        }

        return fgui.UIPackage.createObjectFromURL(url);
      }
    }, {
      key: "returnObject",
      value: function returnObject(obj) {
        var url = obj.resourceURL;
        if (!url) return;
        var arr = this._pool[url];

        if (!arr) {
          arr = [];
          this._pool[url] = arr;
        }

        this._count++;
        arr.push(obj);
      }
    }, {
      key: "count",
      get: function get() {
        return this._count;
      }
    }]);

    return GObjectPool;
  }();

  fgui.GObjectPool = GObjectPool;
})(fgui || (fgui = {}));

(function (fgui) {
  var GProgressBar = /*#__PURE__*/function (_fgui$GComponent5) {
    _inherits(GProgressBar, _fgui$GComponent5);

    var _super35 = _createSuper(GProgressBar);

    function GProgressBar() {
      var _this26;

      _classCallCheck(this, GProgressBar);

      _this26 = _super35.call(this);
      _this26._min = 0;
      _this26._max = 0;
      _this26._value = 0;
      _this26._barMaxWidth = 0;
      _this26._barMaxHeight = 0;
      _this26._barMaxWidthDelta = 0;
      _this26._barMaxHeightDelta = 0;
      _this26._barStartX = 0;
      _this26._barStartY = 0;
      _this26._titleType = fgui.ProgressTitleType.Percent;
      _this26._value = 50;
      _this26._max = 100;
      return _this26;
    }

    _createClass(GProgressBar, [{
      key: "tweenValue",
      value: function tweenValue(value, duration) {
        var oldValule;
        var tweener = fgui.GTween.getTween(this, this.update);

        if (tweener) {
          oldValule = tweener.value.x;
          tweener.kill();
        } else oldValule = this._value;

        this._value = value;
        return fgui.GTween.to(oldValule, this._value, duration).setTarget(this, this.update).setEase(fgui.EaseType.Linear);
      }
    }, {
      key: "update",
      value: function update(newValue) {
        var percent = fgui.clamp01((newValue - this._min) / (this._max - this._min));

        if (this._titleObject) {
          switch (this._titleType) {
            case fgui.ProgressTitleType.Percent:
              this._titleObject.text = Math.floor(percent * 100) + "%";
              break;

            case fgui.ProgressTitleType.ValueAndMax:
              this._titleObject.text = Math.floor(newValue) + "/" + Math.floor(this._max);
              break;

            case fgui.ProgressTitleType.Value:
              this._titleObject.text = "" + Math.floor(newValue);
              break;

            case fgui.ProgressTitleType.Max:
              this._titleObject.text = "" + Math.floor(this._max);
              break;
          }
        }

        var fullWidth = this.width - this._barMaxWidthDelta;
        var fullHeight = this.height - this._barMaxHeightDelta;

        if (!this._reverse) {
          if (this._barObjectH) {
            if (this._barObjectH instanceof fgui.GImage && this._barObjectH.fillMethod != fgui.FillMethod.None) this._barObjectH.fillAmount = percent;else this._barObjectH.width = Math.floor(fullWidth * percent);
          }

          if (this._barObjectV) {
            if (this._barObjectV instanceof fgui.GImage && this._barObjectV.fillMethod != fgui.FillMethod.None) this._barObjectV.fillAmount = percent;else this._barObjectV.height = Math.floor(fullHeight * percent);
          }
        } else {
          if (this._barObjectH) {
            if (this._barObjectH instanceof fgui.GImage && this._barObjectH.fillMethod != fgui.FillMethod.None) this._barObjectH.fillAmount = 1 - percent;else {
              this._barObjectH.width = Math.floor(fullWidth * percent);
              this._barObjectH.x = this._barStartX + (fullWidth - this._barObjectH.width);
            }
          }

          if (this._barObjectV) {
            if (this._barObjectV instanceof fgui.GImage && this._barObjectV.fillMethod != fgui.FillMethod.None) this._barObjectV.fillAmount = 1 - percent;else {
              this._barObjectV.height = Math.floor(fullHeight * percent);
              this._barObjectV.y = this._barStartY + (fullHeight - this._barObjectV.height);
            }
          }
        }

        if (this._aniObject) this._aniObject.setProp(fgui.ObjectPropID.Frame, Math.floor(percent * 100));
      }
    }, {
      key: "constructExtension",
      value: function constructExtension(buffer) {
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
    }, {
      key: "handleSizeChanged",
      value: function handleSizeChanged() {
        _get(_getPrototypeOf(GProgressBar.prototype), "handleSizeChanged", this).call(this);

        if (this._barObjectH) this._barMaxWidth = this.width - this._barMaxWidthDelta;
        if (this._barObjectV) this._barMaxHeight = this.height - this._barMaxHeightDelta;
        if (!this._underConstruct) this.update(this._value);
      }
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GProgressBar.prototype), "setup_afterAdd", this).call(this, buffer, beginPos);

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
        if (buffer.version >= 2) this._min = buffer.readInt();
        this.update(this._value);
      }
    }, {
      key: "titleType",
      get: function get() {
        return this._titleType;
      },
      set: function set(value) {
        if (this._titleType != value) {
          this._titleType = value;
          this.update(value);
        }
      }
    }, {
      key: "min",
      get: function get() {
        return this._min;
      },
      set: function set(value) {
        if (this._min != value) {
          this._min = value;
          this.update(this._value);
        }
      }
    }, {
      key: "max",
      get: function get() {
        return this._max;
      },
      set: function set(value) {
        if (this._max != value) {
          this._max = value;
          this.update(this._value);
        }
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value != value) {
          fgui.GTween.kill(this, false, this.update);
          this._value = value;
          this.update(value);
        }
      }
    }]);

    return GProgressBar;
  }(fgui.GComponent);

  fgui.GProgressBar = GProgressBar;
})(fgui || (fgui = {}));

(function (fgui) {
  var GTextField = /*#__PURE__*/function (_fgui$GObject8) {
    _inherits(GTextField, _fgui$GObject8);

    var _super36 = _createSuper(GTextField);

    function GTextField() {
      var _this27;

      _classCallCheck(this, GTextField);

      _this27 = _super36.call(this);
      var tf = _this27._textField.textFormat;
      tf.font = fgui.UIConfig.defaultFont;
      tf.size = 12;
      tf.lineSpacing = 3;

      _this27._textField.applyFormat();

      _this27._text = "";
      _this27._textField.autoSize = fgui.AutoSizeType.Both;
      _this27._textField.wordWrap = false;
      return _this27;
    }

    _createClass(GTextField, [{
      key: "createDisplayObject",
      value: function createDisplayObject() {
        this._displayObject = this._textField = new fgui.TextField();
      }
    }, {
      key: "setText",
      value: function setText() {
        var str = this._text;
        if (this._template) str = this.parseTemplate(str);
        this._textField.maxWidth = this.maxWidth;
        if (this._ubbEnabled) this._textField.htmlText = fgui.defaultParser.parse(fgui.XMLUtils.encodeString(str));else this._textField.text = str;
      }
    }, {
      key: "setVar",
      value: function setVar(name, value) {
        if (!this._template) this._template = {};
        this._template[name] = value;
        return this;
      }
    }, {
      key: "flushVars",
      value: function flushVars() {
        this.setText();
        this.updateSize();
      }
    }, {
      key: "applyFormat",
      value: function applyFormat() {
        this._textField.applyFormat();

        if (!this._underConstruct) this.updateSize();
      }
    }, {
      key: "getProp",
      value: function getProp(index) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            return this.color;

          case fgui.ObjectPropID.OutlineColor:
            return this._textField.textFormat.outlineColor;

          case fgui.ObjectPropID.FontSize:
            return this._textField.textFormat.size;

          default:
            return _get(_getPrototypeOf(GTextField.prototype), "getProp", this).call(this, index);
        }
      }
    }, {
      key: "setProp",
      value: function setProp(index, value) {
        switch (index) {
          case fgui.ObjectPropID.Color:
            this.color = value;
            break;

          case fgui.ObjectPropID.OutlineColor:
            this._textField.textFormat.outlineColor = value;

            this._textField.applyFormat();

            break;

          case fgui.ObjectPropID.FontSize:
            this._textField.textFormat.size = value;

            this._textField.applyFormat();

            break;

          default:
            _get(_getPrototypeOf(GTextField.prototype), "setProp", this).call(this, index, value);

            break;
        }
      }
    }, {
      key: "updateSize",
      value: function updateSize() {
        if (this._updatingSize) return;
        this._updatingSize = true;

        if (this._textField.autoSize == fgui.AutoSizeType.Both) {
          this.setSize(this._textField.width, this._textField.height);
        } else if (this._textField.autoSize == fgui.AutoSizeType.Height) {
          this.height = this._textField.height;
        }

        this._updatingSize = false;
      }
    }, {
      key: "handleSizeChanged",
      value: function handleSizeChanged() {
        if (this._updatingSize) return;
        if (this._underConstruct) this._textField.setSize(this.width, this.height);else if (this._textField.autoSize != fgui.AutoSizeType.Both) {
          if (this._textField.autoSize == fgui.AutoSizeType.Height) {
            this._textField.width = this.width;
            if (this._text != "") this.setSizeDirectly(this.width, this._textField.height);
          } else this._textField.setSize(this.width, this.height);
        }
      }
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GTextField.prototype), "setup_beforeAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 5);
        var tf = this._textField.textFormat;
        tf.font = buffer.readS();
        tf.size = buffer.readShort();
        tf.color = buffer.readColor();
        var c = buffer.readByte();
        this.align = c == 0 ? "left" : c == 1 ? "center" : "right";
        c = buffer.readByte();
        this.verticalAlign = c == 0 ? "top" : c == 1 ? "middle" : "bottom";
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

        if (buffer.readBool()) {
          tf.shadowColor = buffer.readColor();
          var f1 = buffer.readFloat();
          var f2 = buffer.readFloat();
          tf.shadowOffset.set(f1, f2);
        }

        if (buffer.readBool()) this._template = {};
        if (buffer.version >= 3) tf.strikethrough = buffer.readBool();

        this._textField.applyFormat();
      }
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GTextField.prototype), "setup_afterAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 6);
        var str = buffer.readS();
        if (str != null) this.text = str;
      }
    }, {
      key: "parseTemplate",
      value: function parseTemplate(template) {
        var pos1 = 0,
            pos2,
            pos3;
        var tag;
        var value;
        var result = "";

        while ((pos2 = template.indexOf("{", pos1)) != -1) {
          if (pos2 > 0 && template.charCodeAt(pos2 - 1) == 92) {
            result += template.substring(pos1, pos2 - 1);
            result += "{";
            pos1 = pos2 + 1;
            continue;
          }

          result += template.substring(pos1, pos2);
          pos1 = pos2;
          pos2 = template.indexOf("}", pos1);
          if (pos2 == -1) break;

          if (pos2 == pos1 + 1) {
            result += template.substr(pos1, 2);
            pos1 = pos2 + 1;
            continue;
          }

          tag = template.substring(pos1 + 1, pos2);
          pos3 = tag.indexOf("=");

          if (pos3 != -1) {
            value = this._template[tag.substring(0, pos3)];
            if (value == null) result += tag.substring(pos3 + 1);else result += value;
          } else {
            value = this._template[tag];
            if (value != null) result += value;
          }

          pos1 = pos2 + 1;
        }

        if (pos1 < template.length) result += template.substr(pos1);
        return result;
      }
    }, {
      key: "text",
      get: function get() {
        if (this._displayObject instanceof fgui.InputTextField) this._text = this._textField.text;
        return this._text;
      },
      set: function set(value) {
        if (value == null) value = "";
        this._text = value;
        this.setText();
        this.updateSize();
        this.updateGear(6);
      }
    }, {
      key: "textTemplate",
      get: function get() {
        return this._template;
      },
      set: function set(value) {
        if (!this._template && !value) return;
        this._template = value;
        this.flushVars();
      }
    }, {
      key: "textFormat",
      get: function get() {
        return this._textField.textFormat;
      }
    }, {
      key: "align",
      get: function get() {
        return this._textField.align;
      },
      set: function set(value) {
        this._textField.align = value;
      }
    }, {
      key: "verticalAlign",
      get: function get() {
        return this._textField.verticalAlign;
      },
      set: function set(value) {
        this._textField.verticalAlign = value;
      }
    }, {
      key: "singleLine",
      get: function get() {
        return this._textField.singleLine;
      },
      set: function set(value) {
        this._textField.singleLine = value;
      }
    }, {
      key: "ubbEnabled",
      set: function set(value) {
        this._ubbEnabled = value;
      },
      get: function get() {
        return this._ubbEnabled;
      }
    }, {
      key: "autoSize",
      get: function get() {
        return this._textField.autoSize;
      },
      set: function set(value) {
        this._textField.autoSize = value;

        if (value == fgui.AutoSizeType.Both) {
          this._textField.wordWrap = false;
          if (!this._underConstruct) this.setSize(this._textField.textWidth, this._textField.textHeight);
        } else {
          this._textField.wordWrap = true;

          if (value == fgui.AutoSizeType.Height) {
            if (!this._underConstruct) {
              this._textField.width = this.width;
              this.height = this._textField.textHeight;
            }
          } else this._textField.setSize(this.width, this.height);
        }
      }
    }, {
      key: "textWidth",
      get: function get() {
        return this._textField.textWidth;
      }
    }, {
      key: "textHeight",
      get: function get() {
        return this._textField.textHeight;
      }
    }, {
      key: "color",
      get: function get() {
        return this._textField.textFormat.color;
      },
      set: function set(value) {
        if (this._textField.textFormat.color != value) {
          this._textField.textFormat.color = value;

          this._textField.applyFormat();

          this.updateGear(4);
        }
      }
    }]);

    return GTextField;
  }(fgui.GObject);

  fgui.GTextField = GTextField;
})(fgui || (fgui = {}));

(function (fgui) {
  var GRichTextField = /*#__PURE__*/function (_fgui$GTextField) {
    _inherits(GRichTextField, _fgui$GTextField);

    var _super37 = _createSuper(GRichTextField);

    function GRichTextField() {
      _classCallCheck(this, GRichTextField);

      return _super37.call(this);
    }

    _createClass(GRichTextField, [{
      key: "createDisplayObject",
      value: function createDisplayObject() {
        this._displayObject = this._textField = new fgui.RichTextField();
      }
    }, {
      key: "setText",
      value: function setText() {
        var str = this._text;
        if (this._template) str = this.parseTemplate(str);
        this._textField.maxWidth = this.maxWidth;
        if (this._ubbEnabled) this._textField.htmlText = fgui.defaultParser.parse(str);else this._textField.htmlText = str;
      }
    }]);

    return GRichTextField;
  }(fgui.GTextField);

  fgui.GRichTextField = GRichTextField;
})(fgui || (fgui = {}));

(function (fgui) {
  var _inst;

  var GRoot = /*#__PURE__*/function (_fgui$GComponent6) {
    _inherits(GRoot, _fgui$GComponent6);

    var _super38 = _createSuper(GRoot);

    function GRoot() {
      var _this28;

      _classCallCheck(this, GRoot);

      _this28 = _super38.call(this);
      if (!_inst) _inst = _assertThisInitialized(_this28);
      _this28.opaque = false;
      _this28._popupStack = [];
      _this28._justClosedPopups = [];

      _this28.on(fgui.InteractiveEvents.Down, _this28.__stageTouchBegin, _assertThisInitialized(_this28), true);

      _this28._modalLayer = new fgui.GGraph();

      _this28._modalLayer.setSize(_this28.width, _this28.height);

      _this28._modalLayer.shape.drawRect(0, new fgui.Color4(0, 0), fgui.UIConfig.modalLayerColor);

      _this28._modalLayer.addRelation(_assertThisInitialized(_this28), fgui.RelationType.Size);

      _this28.applyScaleFactor();

      _this28.on(fgui.StageEvent.ContentScaleChanged, _this28.applyScaleFactor, _assertThisInitialized(_this28));

      return _this28;
    }

    _createClass(GRoot, [{
      key: "applyScaleFactor",
      value: function applyScaleFactor() {
        this.setSize(Math.ceil(fgui.Stage.width / fgui.UIContentScaler.scaleFactor), Math.ceil(fgui.Stage.height / fgui.UIContentScaler.scaleFactor));
        this.setScale(fgui.UIContentScaler.scaleFactor, fgui.UIContentScaler.scaleFactor);
      }
    }, {
      key: "showWindow",
      value: function showWindow(win) {
        this.addChild(win);
        if (win.x > this.width) win.x = this.width - win.width;else if (win.x + win.width < 0) win.x = 0;
        if (win.y > this.height) win.y = this.height - win.height;else if (win.y + win.height < 0) win.y = 0;
        this.adjustModalLayer();
      }
    }, {
      key: "hideWindow",
      value: function hideWindow(win) {
        win.hide();
      }
    }, {
      key: "hideWindowImmediately",
      value: function hideWindowImmediately(win) {
        if (win.parent == this) this.removeChild(win);
        this.adjustModalLayer();
      }
    }, {
      key: "bringToFront",
      value: function bringToFront(win) {
        var cnt = this.numChildren;
        var i;
        if (this._modalLayer.parent && !win.modal) i = this.getChildIndex(this._modalLayer) - 1;else i = cnt - 1;

        for (; i >= 0; i--) {
          var g = this.getChildAt(i);
          if (g == win) return;
          if (g instanceof fgui.Window) break;
        }

        if (i >= 0) this.setChildIndex(win, i);
      }
    }, {
      key: "showModalWait",
      value: function showModalWait(msg) {
        if (fgui.UIConfig.globalModalWaiting) {
          if (this._modalWaitPane == null) this._modalWaitPane = fgui.UIPackage.createObjectFromURL(fgui.UIConfig.globalModalWaiting);

          this._modalWaitPane.setSize(this.width, this.height);

          this._modalWaitPane.addRelation(this, fgui.RelationType.Size);

          this.addChild(this._modalWaitPane);
          this._modalWaitPane.text = msg || "";
        }
      }
    }, {
      key: "closeModalWait",
      value: function closeModalWait() {
        if (this._modalWaitPane && this._modalWaitPane.parent) this.removeChild(this._modalWaitPane);
      }
    }, {
      key: "closeAllExceptModals",
      value: function closeAllExceptModals() {
        var arr = this._children.slice();

        var cnt = arr.length;

        for (var i = 0; i < cnt; i++) {
          var g = arr[i];
          if (g instanceof fgui.Window && !g.modal) g.hide();
        }
      }
    }, {
      key: "closeAllWindows",
      value: function closeAllWindows() {
        var arr = this._children.slice();

        var cnt = arr.length;

        for (var i = 0; i < cnt; i++) {
          var g = arr[i];
          if (g instanceof fgui.Window) g.hide();
        }
      }
    }, {
      key: "getTopWindow",
      value: function getTopWindow() {
        var cnt = this.numChildren;

        for (var i = cnt - 1; i >= 0; i--) {
          var g = this.getChildAt(i);

          if (g instanceof fgui.Window) {
            return g;
          }
        }

        return null;
      }
    }, {
      key: "showPopup",
      value: function showPopup(popup, target, dir) {
        if (this._popupStack.length > 0) {
          var k = this._popupStack.indexOf(popup);

          if (k != -1) {
            for (var i = this._popupStack.length - 1; i >= k; i--) {
              this.removeChild(this._popupStack.pop());
            }
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
        var sizeW = 0,
            sizeH = 0;

        if (target) {
          pos = target.localToRoot(0, 0);
          var size = target.localToRoot(target.width, target.height);
          sizeW = size.x - pos.x;
          sizeH = size.y - pos.y;
        } else {
          pos = fgui.Stage.getTouchPos();
          pos = this.globalToLocal(pos.x, pos.y);
        }

        var xx, yy;
        xx = pos.x;
        if (xx + popup.width > this.width) xx = xx + sizeW - popup.width;
        yy = pos.y + sizeH;

        if ((dir == null || dir == fgui.PopupDirection.Auto) && yy + popup.height > this.height || dir == fgui.PopupDirection.Up) {
          yy = pos.y - popup.height - 1;

          if (yy < 0) {
            yy = 0;
            xx += sizeW / 2;
          }
        }

        popup.setPosition(xx, yy);
      }
    }, {
      key: "togglePopup",
      value: function togglePopup(popup, target, dir) {
        if (this._justClosedPopups.indexOf(popup) != -1) return;
        this.showPopup(popup, target, dir);
      }
    }, {
      key: "hidePopup",
      value: function hidePopup(popup) {
        if (popup) {
          var k = this._popupStack.indexOf(popup);

          if (k != -1) {
            for (var i = this._popupStack.length - 1; i >= k; i--) {
              this.closePopup(this._popupStack.pop());
            }
          }
        } else {
          var cnt = this._popupStack.length;

          for (i = cnt - 1; i >= 0; i--) {
            this.closePopup(this._popupStack[i]);
          }

          this._popupStack.length = 0;
        }
      }
    }, {
      key: "closePopup",
      value: function closePopup(target) {
        if (target.parent) {
          if (target instanceof fgui.Window) target.hide();else this.removeChild(target);
        }
      }
    }, {
      key: "showTooltips",
      value: function showTooltips(msg) {
        if (this._defaultTooltipWin == null) {
          var resourceURL = fgui.UIConfig.tooltipsWin;

          if (!resourceURL) {
            console.warn("UIConfig.tooltipsWin not defined");
            return;
          }

          this._defaultTooltipWin = fgui.UIPackage.createObjectFromURL(resourceURL);
        }

        this._defaultTooltipWin.text = msg;
        this.showTooltipsWin(this._defaultTooltipWin);
      }
    }, {
      key: "showTooltipsWin",
      value: function showTooltipsWin(tooltipWin, xx, yy) {
        this.hideTooltips();
        this._tooltipWin = tooltipWin;

        if (xx == null || yy == null) {
          xx = fgui.Stage.touchPos.x + 10;
          yy = fgui.Stage.touchPos.y + 20;
        }

        var pt = this.globalToLocal(xx, yy);
        xx = pt.x;
        yy = pt.y;

        if (xx + this._tooltipWin.width > this.width) {
          xx = xx - this._tooltipWin.width - 1;
          if (xx < 0) xx = 10;
        }

        if (yy + this._tooltipWin.height > this.height) {
          yy = yy - this._tooltipWin.height - 1;
          if (xx - this._tooltipWin.width - 1 > 0) xx = xx - this._tooltipWin.width - 1;
          if (yy < 0) yy = 10;
        }

        this._tooltipWin.x = xx;
        this._tooltipWin.y = yy;
        this.addChild(this._tooltipWin);
      }
    }, {
      key: "hideTooltips",
      value: function hideTooltips() {
        if (this._tooltipWin) {
          if (this._tooltipWin.parent) this.removeChild(this._tooltipWin);
          this._tooltipWin = null;
        }
      }
    }, {
      key: "playOneShotSound",
      value: function playOneShotSound(url, volumeScale) {
        if (!fgui.Stage.audioListener) return;
        if (volumeScale == null) volumeScale = 1;
        var pi = fgui.UIPackage.getItemByURL(url);

        if (pi && pi.audioBuffer) {
          if (!pi.sound) {
            pi.sound = new THREE.Audio(fgui.Stage.audioListener);
            pi.sound.setBuffer(pi.audioBuffer);
            pi.sound.setLoop(false);
          }

          pi.sound.setVolume(volumeScale);
          pi.sound.play();
        }
      }
    }, {
      key: "adjustModalLayer",
      value: function adjustModalLayer() {
        var cnt = this.numChildren;
        if (this._modalWaitPane && this._modalWaitPane.parent) this.setChildIndex(this._modalWaitPane, cnt - 1);

        for (var i = cnt - 1; i >= 0; i--) {
          var g = this.getChildAt(i);

          if (g instanceof fgui.Window && g.modal) {
            if (this._modalLayer.parent == null) this.addChildAt(this._modalLayer, i);else this.setChildIndexBefore(this._modalLayer, i);
            return;
          }
        }

        if (this._modalLayer.parent) this.removeChild(this._modalLayer);
      }
    }, {
      key: "checkPopups",
      value: function checkPopups() {
        this._justClosedPopups.length = 0;

        if (this._popupStack.length > 0) {
          var mc = fgui.Stage.touchTarget;
          var handled = false;

          while (mc) {
            var gobj = fgui.GObject.cast(mc);

            if (gobj) {
              var k = this._popupStack.indexOf(gobj);

              if (k != -1) {
                for (var i = this._popupStack.length - 1; i > k; i--) {
                  var last = this._popupStack.length - 1;
                  var popup = this._popupStack[last];
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
            for (var _i21 = this._popupStack.length - 1; _i21 >= 0; _i21--) {
              var _popup = this._popupStack[_i21];
              this.closePopup(_popup);

              this._justClosedPopups.push(_popup);

              this._popupStack.splice(_i21, 1);
            }
          }
        }
      }
    }, {
      key: "__stageTouchBegin",
      value: function __stageTouchBegin() {
        if (this._tooltipWin) this.hideTooltips();
        this.checkPopups();
      }
    }, {
      key: "modalLayer",
      get: function get() {
        return this._modalLayer;
      }
    }, {
      key: "hasModalWindow",
      get: function get() {
        return this._modalLayer.parent != null;
      }
    }, {
      key: "modalWaiting",
      get: function get() {
        return this._modalWaitPane && this._modalWaitPane.onStage;
      }
    }, {
      key: "hasAnyPopup",
      get: function get() {
        return this._popupStack.length != 0;
      }
    }], [{
      key: "findFor",
      value: function findFor(obj) {
        if (obj instanceof GRoot) return obj;
        if (!obj) return _inst;
        var p = obj._parent;

        while (p) {
          if (p instanceof GRoot) return p;
          p = p.parent;
        }

        return _inst;
      }
    }, {
      key: "inst",
      get: function get() {
        if (!_inst) {
          _inst = new GRoot();
          fgui.Stage.scene.add(_inst.displayObject.obj3D);
        }

        return _inst;
      }
    }]);

    return GRoot;
  }(fgui.GComponent);

  fgui.GRoot = GRoot;
  fgui.Decls.GRoot = GRoot;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_vec2 = new THREE.Vector2();

  var GScrollBar = /*#__PURE__*/function (_fgui$GComponent7) {
    _inherits(GScrollBar, _fgui$GComponent7);

    var _super39 = _createSuper(GScrollBar);

    function GScrollBar() {
      var _this29;

      _classCallCheck(this, GScrollBar);

      _this29 = _super39.call(this);
      _this29._dragOffset = new THREE.Vector2();
      _this29._scrollPerc = 0;
      return _this29;
    }

    _createClass(GScrollBar, [{
      key: "setScrollPane",
      value: function setScrollPane(target, vertical) {
        this._target = target;
        this._vertical = vertical;
      }
    }, {
      key: "setDisplayPerc",
      value: function setDisplayPerc(value) {
        if (this._vertical) {
          if (!this._fixedGripSize) this._grip.height = Math.floor(value * this._bar.height);
          this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;
        } else {
          if (!this._fixedGripSize) this._grip.width = Math.floor(value * this._bar.width);
          this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
        }

        this._grip.visible = value != 0 && value != 1;
      }
    }, {
      key: "setScrollPerc",
      value: function setScrollPerc(val) {
        this._scrollPerc = val;
        if (this._vertical) this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;else this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
      }
    }, {
      key: "constructExtension",
      value: function constructExtension(buffer) {
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

        this._grip.on(fgui.InteractiveEvents.Down, this.__gripTouchBegin, this);

        this._grip.on(fgui.InteractiveEvents.Move, this.__gripTouchMove, this);

        this._grip.on(fgui.InteractiveEvents.Up, this.__gripTouchEnd, this);

        this.on(fgui.InteractiveEvents.Down, this.__barTouchBegin, this);
        if (this._arrowButton1) this._arrowButton1.on(fgui.InteractiveEvents.Down, this.__arrowButton1Click, this);
        if (this._arrowButton2) this._arrowButton2.on(fgui.InteractiveEvents.Down, this.__arrowButton2Click, this);
      }
    }, {
      key: "__gripTouchBegin",
      value: function __gripTouchBegin(evt) {
        if (this._bar == null) return;
        evt.stopPropagation();
        this._gripDragging = true;

        this._target.updateScrollBarVisible();

        this.globalToLocal(evt.input.x, evt.input.y, this._dragOffset);
        this._dragOffset.x -= this._grip.x;
        this._dragOffset.y -= this._grip.y;
      }
    }, {
      key: "__gripTouchMove",
      value: function __gripTouchMove(evt) {
        if (!this.onStage) return;
        var pt = this.globalToLocal(evt.input.x, evt.input.y, s_vec2);

        if (this._vertical) {
          var curY = pt.y - this._dragOffset.y;
          var diff = this._bar.height - this._grip.height;
          if (diff == 0) this._target.percY = 0;else this._target.percY = (curY - this._bar.y) / diff;
        } else {
          var curX = pt.x - this._dragOffset.x;

          var _diff = this._bar.width - this._grip.width;

          if (_diff == 0) this._target.percX = 0;else this._target.percX = (curX - this._bar.x) / (this._bar.width - this._grip.width);
        }
      }
    }, {
      key: "__gripTouchEnd",
      value: function __gripTouchEnd(evt) {
        this._gripDragging = false;

        this._target.updateScrollBarVisible();
      }
    }, {
      key: "__arrowButton1Click",
      value: function __arrowButton1Click(evt) {
        evt.stopPropagation();
        if (this._vertical) this._target.scrollUp();else this._target.scrollLeft();
      }
    }, {
      key: "__arrowButton2Click",
      value: function __arrowButton2Click(evt) {
        evt.stopPropagation();
        if (this._vertical) this._target.scrollDown();else this._target.scrollRight();
      }
    }, {
      key: "__barTouchBegin",
      value: function __barTouchBegin(evt) {
        evt.stopPropagation();
        var pt = this.globalToLocal(evt.input.x, evt.input.y, s_vec2);

        var pt = this._grip.globalToLocal(evt.input.x, evt.input.y, s_vec2);

        if (this._vertical) {
          if (pt.y < 0) this._target.scrollUp(4);else this._target.scrollDown(4);
        } else {
          if (pt.x < 0) this._target.scrollLeft(4);else this._target.scrollRight(4);
        }
      }
    }, {
      key: "minSize",
      get: function get() {
        if (this._vertical) return (this._arrowButton1 ? this._arrowButton1.height : 0) + (this._arrowButton2 ? this._arrowButton2.height : 0);else return (this._arrowButton1 ? this._arrowButton1.width : 0) + (this._arrowButton2 ? this._arrowButton2.width : 0);
      }
    }, {
      key: "gripDragging",
      get: function get() {
        return this._gripDragging;
      }
    }]);

    return GScrollBar;
  }(fgui.GComponent);

  fgui.GScrollBar = GScrollBar;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_vec2 = new THREE.Vector2();

  var GSlider = /*#__PURE__*/function (_fgui$GComponent8) {
    _inherits(GSlider, _fgui$GComponent8);

    var _super40 = _createSuper(GSlider);

    function GSlider() {
      var _this30;

      _classCallCheck(this, GSlider);

      _this30 = _super40.call(this);
      _this30.changeOnClick = true;
      _this30.canDrag = true;
      _this30._min = 0;
      _this30._max = 0;
      _this30._value = 0;
      _this30._barMaxWidth = 0;
      _this30._barMaxHeight = 0;
      _this30._barMaxWidthDelta = 0;
      _this30._barMaxHeightDelta = 0;
      _this30._clickPercent = 0;
      _this30._barStartX = 0;
      _this30._barStartY = 0;
      _this30._titleType = fgui.ProgressTitleType.Percent;
      _this30._value = 50;
      _this30._max = 100;
      _this30._clickPos = new THREE.Vector2();
      return _this30;
    }

    _createClass(GSlider, [{
      key: "update",
      value: function update() {
        this.updateWithPercent((this._value - this._min) / (this._max - this._min), false);
      }
    }, {
      key: "updateWithPercent",
      value: function updateWithPercent(percent, manual) {
        percent = fgui.clamp01(percent);

        if (manual) {
          var newValue = fgui.clamp(this._min + (this._max - this._min) * percent, this._min, this._max);

          if (this._wholeNumbers) {
            newValue = Math.round(newValue);
            percent = fgui.clamp01((newValue - this._min) / (this._max - this._min));
          }

          if (newValue != this._value) {
            this._value = newValue;
            if (this.dispatchEvent(fgui.StateChangeEvent.CHANGED)) return;
          }
        }

        if (this._titleObject) {
          switch (this._titleType) {
            case fgui.ProgressTitleType.Percent:
              this._titleObject.text = Math.floor(percent * 100) + "%";
              break;

            case fgui.ProgressTitleType.ValueAndMax:
              this._titleObject.text = this._value + "/" + this._max;
              break;

            case fgui.ProgressTitleType.Value:
              this._titleObject.text = "" + this._value;
              break;

            case fgui.ProgressTitleType.Max:
              this._titleObject.text = "" + this._max;
              break;
          }
        }

        var fullWidth = this.width - this._barMaxWidthDelta;
        var fullHeight = this.height - this._barMaxHeightDelta;

        if (!this._reverse) {
          if (this._barObjectH) this._barObjectH.width = Math.round(fullWidth * percent);
          if (this._barObjectV) this._barObjectV.height = Math.round(fullHeight * percent);
        } else {
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
    }, {
      key: "constructExtension",
      value: function constructExtension(buffer) {
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
          this._gripObject.on(fgui.InteractiveEvents.Down, this.__gripTouchBegin, this);

          this._gripObject.on(fgui.InteractiveEvents.Move, this.__gripTouchMove, this);
        }

        this.on(fgui.InteractiveEvents.Down, this.__barTouchBegin, this);
      }
    }, {
      key: "handleSizeChanged",
      value: function handleSizeChanged() {
        _get(_getPrototypeOf(GSlider.prototype), "handleSizeChanged", this).call(this);

        if (this._barObjectH) this._barMaxWidth = this.width - this._barMaxWidthDelta;
        if (this._barObjectV) this._barMaxHeight = this.height - this._barMaxHeightDelta;
        if (!this._underConstruct) this.update();
      }
    }, {
      key: "setup_afterAdd",
      value: function setup_afterAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GSlider.prototype), "setup_afterAdd", this).call(this, buffer, beginPos);

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
        if (buffer.version >= 2) this._min = buffer.readInt();
        this.update();
      }
    }, {
      key: "__gripTouchBegin",
      value: function __gripTouchBegin(evt) {
        if (evt.input.button != 0) return;
        this.canDrag = true;
        evt.stopPropagation();
        evt.captureTouch();
        this.globalToLocal(evt.input.x, evt.input.y, this._clickPos);
        this._clickPercent = fgui.clamp01((this._value - this._min) / (this._max - this._min));
      }
    }, {
      key: "__gripTouchMove",
      value: function __gripTouchMove(evt) {
        if (!this.canDrag) return;
        var pt = this.globalToLocal(evt.input.x, evt.input.y, s_vec2);
        var deltaX = pt.x - this._clickPos.x;
        var deltaY = pt.y - this._clickPos.y;

        if (this._reverse) {
          deltaX = -deltaX;
          deltaY = -deltaY;
        }

        var percent;
        if (this._barObjectH) percent = this._clickPercent + deltaX / this._barMaxWidth;else percent = this._clickPercent + deltaY / this._barMaxHeight;
        this.updateWithPercent(percent, true);
      }
    }, {
      key: "__barTouchBegin",
      value: function __barTouchBegin(evt) {
        if (!this.changeOnClick) return;

        var pt = this._gripObject.globalToLocal(evt.input.x, evt.input.y, s_vec2);

        var percent = fgui.clamp01((this._value - this._min) / (this._max - this._min));
        var delta = 0;
        if (this._barObjectH != null) delta = (pt.x - this._gripObject.width / 2) / this._barMaxWidth;
        if (this._barObjectV != null) delta = (pt.y - this._gripObject.height / 2) / this._barMaxHeight;
        if (this._reverse) percent -= delta;else percent += delta;
        this.updateWithPercent(percent, true);
      }
    }, {
      key: "titleType",
      get: function get() {
        return this._titleType;
      },
      set: function set(value) {
        this._titleType = value;
      }
    }, {
      key: "wholeNumbers",
      get: function get() {
        return this._wholeNumbers;
      },
      set: function set(value) {
        if (this._wholeNumbers != value) {
          this._wholeNumbers = value;
          this.update();
        }
      }
    }, {
      key: "min",
      get: function get() {
        return this._min;
      },
      set: function set(value) {
        if (this._min != value) {
          this._min = value;
          this.update();
        }
      }
    }, {
      key: "max",
      get: function get() {
        return this._max;
      },
      set: function set(value) {
        if (this._max != value) {
          this._max = value;
          this.update();
        }
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        if (this._value != value) {
          this._value = value;
          this.update();
        }
      }
    }]);

    return GSlider;
  }(fgui.GComponent);

  fgui.GSlider = GSlider;
})(fgui || (fgui = {}));

(function (fgui) {
  var GTextInput = /*#__PURE__*/function (_fgui$GTextField2) {
    _inherits(GTextInput, _fgui$GTextField2);

    var _super41 = _createSuper(GTextInput);

    function GTextInput() {
      _classCallCheck(this, GTextInput);

      return _super41.call(this);
    }

    _createClass(GTextInput, [{
      key: "createDisplayObject",
      value: function createDisplayObject() {
        this._displayObject = this._textField = new fgui.InputTextField();
      }
    }, {
      key: "requestFocus",
      value: function requestFocus() {}
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GTextInput.prototype), "setup_beforeAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 4);
        var str = buffer.readS();
        if (str != null) this.promptText = str;
        str = buffer.readS();
        if (str != null) this.restrict = str;
        var iv = buffer.readInt();
        if (iv != 0) this.maxLength = iv;
        iv = buffer.readInt();

        if (iv != 0) {
          if (iv == 4) this.keyboardType = "number";else if (iv == 3) this.keyboardType = "url";
        }

        if (buffer.readBool()) this.password = true;
      }
    }, {
      key: "password",
      get: function get() {
        return this._textField.password;
      },
      set: function set(value) {
        this._textField.password = value;
      }
    }, {
      key: "keyboardType",
      get: function get() {
        return this._textField.keyboardType;
      },
      set: function set(value) {
        this._textField.keyboardType = value;
      }
    }, {
      key: "editable",
      set: function set(value) {
        this._textField.editable = value;
      },
      get: function get() {
        return this._textField.editable;
      }
    }, {
      key: "maxLength",
      set: function set(value) {
        this._textField.maxLength = value;
      },
      get: function get() {
        return this._textField.maxLength;
      }
    }, {
      key: "promptText",
      set: function set(value) {
        this._textField.promptText = value;
      },
      get: function get() {
        return this._textField.promptText;
      }
    }, {
      key: "restrict",
      set: function set(value) {
        this._textField.restrict = value;
      },
      get: function get() {
        return this._textField.restrict;
      }
    }]);

    return GTextInput;
  }(fgui.GTextField);

  fgui.GTextInput = GTextInput;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_list = new Array();

  var GTree = /*#__PURE__*/function (_fgui$GList) {
    _inherits(GTree, _fgui$GList);

    var _super42 = _createSuper(GTree);

    function GTree() {
      var _this31;

      _classCallCheck(this, GTree);

      _this31 = _super42.call(this);
      _this31._indent = 15;
      _this31._rootNode = new fgui.GTreeNode(true);

      _this31._rootNode._setTree(_assertThisInitialized(_this31));

      _this31._rootNode.expanded = true;
      return _this31;
    }

    _createClass(GTree, [{
      key: "getSelectedNode",
      value: function getSelectedNode() {
        if (this.selectedIndex != -1) return this.getChildAt(this.selectedIndex)._treeNode;else return null;
      }
    }, {
      key: "getSelectedNodes",
      value: function getSelectedNodes(result) {
        if (!result) result = new Array();
        s_list.length = 0;

        _get(_getPrototypeOf(GTree.prototype), "getSelection", this).call(this, s_list);

        var cnt = s_list.length;
        var ret = new Array();

        for (var i = 0; i < cnt; i++) {
          var node = this.getChildAt(s_list[i])._treeNode;

          ret.push(node);
        }

        return ret;
      }
    }, {
      key: "selectNode",
      value: function selectNode(node, scrollItToView) {
        var parentNode = node.parent;

        while (parentNode && parentNode != this._rootNode) {
          parentNode.expanded = true;
          parentNode = parentNode.parent;
        }

        if (!node._cell) return;
        this.addSelection(this.getChildIndex(node._cell), scrollItToView);
      }
    }, {
      key: "unselectNode",
      value: function unselectNode(node) {
        if (!node._cell) return;
        this.removeSelection(this.getChildIndex(node._cell));
      }
    }, {
      key: "expandAll",
      value: function expandAll(folderNode) {
        if (!folderNode) folderNode = this._rootNode;
        folderNode.expanded = true;
        var cnt = folderNode.numChildren;

        for (var i = 0; i < cnt; i++) {
          var node = folderNode.getChildAt(i);
          if (node.isFolder) this.expandAll(node);
        }
      }
    }, {
      key: "collapseAll",
      value: function collapseAll(folderNode) {
        if (!folderNode) folderNode = this._rootNode;
        if (folderNode != this._rootNode) folderNode.expanded = false;
        var cnt = folderNode.numChildren;

        for (var i = 0; i < cnt; i++) {
          var node = folderNode.getChildAt(i);
          if (node.isFolder) this.collapseAll(node);
        }
      }
    }, {
      key: "createCell",
      value: function createCell(node) {
        var child = this.getFromPool(node._resURL ? node._resURL : this.defaultItem);
        if (!child) throw new Error("cannot create tree node object.");
        child._treeNode = node;
        node._cell = child;
        var indentObj = child.getChild("indent");
        if (indentObj) indentObj.width = (node.level - 1) * this._indent;
        var cc;
        cc = child.getController("expanded");

        if (cc) {
          cc.on(fgui.StateChangeEvent.CHANGED, this.__expandedStateChanged, this);
          cc.selectedIndex = node.expanded ? 1 : 0;
        }

        cc = child.getController("leaf");
        if (cc) cc.selectedIndex = node.isFolder ? 0 : 1;
        if (node.isFolder) child.on(fgui.InteractiveEvents.Down, this.__cellMouseDown, this);
        if (this.treeNodeRender) this.treeNodeRender(node, child);
      }
    }, {
      key: "_afterInserted",
      value: function _afterInserted(node) {
        if (!node._cell) this.createCell(node);
        var index = this.getInsertIndexForNode(node);
        this.addChildAt(node._cell, index);
        if (this.treeNodeRender) this.treeNodeRender(node, node._cell);
        if (node.isFolder && node.expanded) this.checkChildren(node, index);
      }
    }, {
      key: "getInsertIndexForNode",
      value: function getInsertIndexForNode(node) {
        var prevNode = node.getPrevSibling();
        if (prevNode == null) prevNode = node.parent;
        var insertIndex = this.getChildIndex(prevNode._cell) + 1;
        var myLevel = node.level;
        var cnt = this.numChildren;

        for (var i = insertIndex; i < cnt; i++) {
          var testNode = this.getChildAt(i)._treeNode;

          if (testNode.level <= myLevel) break;
          insertIndex++;
        }

        return insertIndex;
      }
    }, {
      key: "_afterRemoved",
      value: function _afterRemoved(node) {
        this.removeNode(node);
      }
    }, {
      key: "_afterExpanded",
      value: function _afterExpanded(node) {
        if (node == this._rootNode) {
          this.checkChildren(this._rootNode, 0);
          return;
        }

        if (this.treeNodeWillExpand) this.treeNodeWillExpand(node, true);
        if (node._cell == null) return;
        if (this.treeNodeRender) this.treeNodeRender(node, node._cell);

        var cc = node._cell.getController("expanded");

        if (cc) cc.selectedIndex = 1;
        if (node._cell.parent) this.checkChildren(node, this.getChildIndex(node._cell));
      }
    }, {
      key: "_afterCollapsed",
      value: function _afterCollapsed(node) {
        if (node == this._rootNode) {
          this.checkChildren(this._rootNode, 0);
          return;
        }

        if (this.treeNodeWillExpand) this.treeNodeWillExpand(node, false);
        if (node._cell == null) return;
        if (this.treeNodeRender) this.treeNodeRender(node, node._cell);

        var cc = node._cell.getController("expanded");

        if (cc) cc.selectedIndex = 0;
        if (node._cell.parent) this.hideFolderNode(node);
      }
    }, {
      key: "_afterMoved",
      value: function _afterMoved(node) {
        var startIndex = this.getChildIndex(node._cell);
        var endIndex;
        if (node.isFolder) endIndex = this.getFolderEndIndex(startIndex, node.level);else endIndex = startIndex + 1;
        var insertIndex = this.getInsertIndexForNode(node);
        var i;
        var cnt = endIndex - startIndex;
        var obj;

        if (insertIndex < startIndex) {
          for (i = 0; i < cnt; i++) {
            obj = this.getChildAt(startIndex + i);
            this.setChildIndex(obj, insertIndex + i);
          }
        } else {
          for (i = 0; i < cnt; i++) {
            obj = this.getChildAt(startIndex);
            this.setChildIndex(obj, insertIndex);
          }
        }
      }
    }, {
      key: "getFolderEndIndex",
      value: function getFolderEndIndex(startIndex, level) {
        var cnt = this.numChildren;

        for (var i = startIndex + 1; i < cnt; i++) {
          var node = this.getChildAt(i)._treeNode;

          if (node.level <= level) return i;
        }

        return cnt;
      }
    }, {
      key: "checkChildren",
      value: function checkChildren(folderNode, index) {
        var cnt = folderNode.numChildren;

        for (var i = 0; i < cnt; i++) {
          index++;
          var node = folderNode.getChildAt(i);
          if (node._cell == null) this.createCell(node);
          if (!node._cell.parent) this.addChildAt(node._cell, index);
          if (node.isFolder && node.expanded) index = this.checkChildren(node, index);
        }

        return index;
      }
    }, {
      key: "hideFolderNode",
      value: function hideFolderNode(folderNode) {
        var cnt = folderNode.numChildren;

        for (var i = 0; i < cnt; i++) {
          var node = folderNode.getChildAt(i);
          if (node._cell) this.removeChild(node._cell);
          if (node.isFolder && node.expanded) this.hideFolderNode(node);
        }
      }
    }, {
      key: "removeNode",
      value: function removeNode(node) {
        if (node._cell) {
          if (node._cell.parent) this.removeChild(node._cell);
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
    }, {
      key: "__cellMouseDown",
      value: function __cellMouseDown(evt) {
        var node = fgui.GObject.cast(evt.sender)._treeNode;

        this._expandedStatusInEvt = node.expanded;
      }
    }, {
      key: "__expandedStateChanged",
      value: function __expandedStateChanged(evt) {
        var cc = evt.sender;
        var node = cc.parent._treeNode;
        node.expanded = cc.selectedIndex == 1;
      }
    }, {
      key: "dispatchItemEvent",
      value: function dispatchItemEvent(item, evt) {
        if (this._clickToExpand != 0) {
          var node = item._treeNode;

          if (node && node.isFolder && this._expandedStatusInEvt == node.expanded) {
            if (this._clickToExpand == 2) {
              if (evt.input.clickCount == 2) node.expanded = !node.expanded;
            } else node.expanded = !node.expanded;
          }
        }

        _get(_getPrototypeOf(GTree.prototype), "dispatchItemEvent", this).call(this, item, evt);
      }
    }, {
      key: "setup_beforeAdd",
      value: function setup_beforeAdd(buffer, beginPos) {
        _get(_getPrototypeOf(GTree.prototype), "setup_beforeAdd", this).call(this, buffer, beginPos);

        buffer.seek(beginPos, 9);
        this._indent = buffer.readInt();
        this._clickToExpand = buffer.readByte();
      }
    }, {
      key: "readItems",
      value: function readItems(buffer) {
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
          var node = new fgui.GTreeNode(isFolder, str);
          node.expanded = true;
          if (i == 0) this._rootNode.addChild(node);else {
            if (level > prevLevel) lastNode.addChild(node);else if (level < prevLevel) {
              for (var j = level; j <= prevLevel; j++) {
                lastNode = lastNode.parent;
              }

              lastNode.addChild(node);
            } else lastNode.parent.addChild(node);
          }
          lastNode = node;
          prevLevel = level;
          this.setupItem(buffer, node.cell);
          buffer.pos = nextPos;
        }
      }
    }, {
      key: "rootNode",
      get: function get() {
        return this._rootNode;
      }
    }, {
      key: "indent",
      get: function get() {
        return this._indent;
      },
      set: function set(value) {
        this._indent = value;
      }
    }, {
      key: "clickToExpand",
      get: function get() {
        return this._clickToExpand;
      },
      set: function set(value) {
        this._clickToExpand = value;
      }
    }]);

    return GTree;
  }(fgui.GList);

  fgui.GTree = GTree;
})(fgui || (fgui = {}));

(function (fgui) {
  var GTreeNode = /*#__PURE__*/function () {
    function GTreeNode(hasChild, resURL) {
      _classCallCheck(this, GTreeNode);

      this._expanded = false;
      this._level = 0;
      this._resURL = resURL;
      if (hasChild) this._children = new Array();
    }

    _createClass(GTreeNode, [{
      key: "_setLevel",
      value: function _setLevel(value) {
        this._level = value;
      }
    }, {
      key: "addChild",
      value: function addChild(child) {
        this.addChildAt(child, this._children.length);
        return child;
      }
    }, {
      key: "addChildAt",
      value: function addChildAt(child, index) {
        if (!child) throw new Error("child is null");
        var numChildren = this._children.length;

        if (index >= 0 && index <= numChildren) {
          if (child._parent == this) {
            this.setChildIndex(child, index);
          } else {
            if (child._parent) child._parent.removeChild(child);
            var cnt = this._children.length;
            if (index == cnt) this._children.push(child);else this._children.splice(index, 0, child);
            child._parent = this;
            child._level = this._level + 1;

            child._setTree(this._tree);

            if (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded) this._tree._afterInserted(child);
          }

          return child;
        } else {
          throw new RangeError("Invalid child index");
        }
      }
    }, {
      key: "removeChild",
      value: function removeChild(child) {
        var childIndex = this._children.indexOf(child);

        if (childIndex != -1) {
          this.removeChildAt(childIndex);
        }

        return child;
      }
    }, {
      key: "removeChildAt",
      value: function removeChildAt(index) {
        if (index >= 0 && index < this.numChildren) {
          var child = this._children[index];

          this._children.splice(index, 1);

          child._parent = null;

          if (this._tree) {
            child._setTree(null);

            this._tree._afterRemoved(child);
          }

          return child;
        } else {
          throw "Invalid child index";
        }
      }
    }, {
      key: "removeChildren",
      value: function removeChildren(beginIndex, endIndex) {
        beginIndex = beginIndex || 0;
        if (endIndex == null) endIndex = -1;
        if (endIndex < 0 || endIndex >= this.numChildren) endIndex = this.numChildren - 1;

        for (var i = beginIndex; i <= endIndex; ++i) {
          this.removeChildAt(beginIndex);
        }
      }
    }, {
      key: "getChildAt",
      value: function getChildAt(index) {
        if (index >= 0 && index < this.numChildren) return this._children[index];else throw "Invalid child index";
      }
    }, {
      key: "getChildIndex",
      value: function getChildIndex(child) {
        return this._children.indexOf(child);
      }
    }, {
      key: "getPrevSibling",
      value: function getPrevSibling() {
        if (this._parent == null) return null;

        var i = this._parent._children.indexOf(this);

        if (i <= 0) return null;
        return this._parent._children[i - 1];
      }
    }, {
      key: "getNextSibling",
      value: function getNextSibling() {
        if (this._parent == null) return null;

        var i = this._parent._children.indexOf(this);

        if (i < 0 || i >= this._parent._children.length - 1) return null;
        return this._parent._children[i + 1];
      }
    }, {
      key: "setChildIndex",
      value: function setChildIndex(child, index) {
        var oldIndex = this._children.indexOf(child);

        if (oldIndex == -1) throw "Not a child of this container";
        var cnt = this._children.length;
        if (index < 0) index = 0;else if (index > cnt) index = cnt;
        if (oldIndex == index) return;

        this._children.splice(oldIndex, 1);

        this._children.splice(index, 0, child);

        if (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded) this._tree._afterMoved(child);
      }
    }, {
      key: "swapChildren",
      value: function swapChildren(child1, child2) {
        var index1 = this._children.indexOf(child1);

        var index2 = this._children.indexOf(child2);

        if (index1 == -1 || index2 == -1) throw "Not a child of this container";
        this.swapChildrenAt(index1, index2);
      }
    }, {
      key: "swapChildrenAt",
      value: function swapChildrenAt(index1, index2) {
        var child1 = this._children[index1];
        var child2 = this._children[index2];
        this.setChildIndex(child1, index2);
        this.setChildIndex(child2, index1);
      }
    }, {
      key: "expandToRoot",
      value: function expandToRoot() {
        var p = this;

        while (p) {
          p.expanded = true;
          p = p.parent;
        }
      }
    }, {
      key: "_setTree",
      value: function _setTree(value) {
        this._tree = value;
        if (this._tree && this._tree.treeNodeWillExpand && this._expanded) this._tree.treeNodeWillExpand(this, true);

        if (this._children) {
          var cnt = this._children.length;

          for (var i = 0; i < cnt; i++) {
            var node = this._children[i];
            node._level = this._level + 1;

            node._setTree(value);
          }
        }
      }
    }, {
      key: "expanded",
      set: function set(value) {
        if (this._children == null) return;

        if (this._expanded != value) {
          this._expanded = value;

          if (this._tree) {
            if (this._expanded) this._tree._afterExpanded(this);else this._tree._afterCollapsed(this);
          }
        }
      },
      get: function get() {
        return this._expanded;
      }
    }, {
      key: "isFolder",
      get: function get() {
        return this._children != null;
      }
    }, {
      key: "parent",
      get: function get() {
        return this._parent;
      }
    }, {
      key: "text",
      get: function get() {
        if (this._cell) return this._cell.text;else return null;
      },
      set: function set(value) {
        if (this._cell) this._cell.text = value;
      }
    }, {
      key: "icon",
      get: function get() {
        if (this._cell) return this._cell.icon;else return null;
      },
      set: function set(value) {
        if (this._cell) this._cell.icon = value;
      }
    }, {
      key: "cell",
      get: function get() {
        return this._cell;
      }
    }, {
      key: "level",
      get: function get() {
        return this._level;
      }
    }, {
      key: "numChildren",
      get: function get() {
        return this._children.length;
      }
    }, {
      key: "tree",
      get: function get() {
        return this._tree;
      }
    }]);

    return GTreeNode;
  }();

  fgui.GTreeNode = GTreeNode;
})(fgui || (fgui = {}));

(function (fgui) {
  var Margin = /*#__PURE__*/function () {
    function Margin() {
      _classCallCheck(this, Margin);

      this.left = 0;
      this.right = 0;
      this.top = 0;
      this.bottom = 0;
    }

    _createClass(Margin, [{
      key: "copy",
      value: function copy(source) {
        this.top = source.top;
        this.bottom = source.bottom;
        this.left = source.left;
        this.right = source.right;
      }
    }]);

    return Margin;
  }();

  fgui.Margin = Margin;
})(fgui || (fgui = {}));

(function (fgui) {
  var PackageItem = /*#__PURE__*/function () {
    function PackageItem() {
      _classCallCheck(this, PackageItem);

      this.width = 0;
      this.height = 0;
    }

    _createClass(PackageItem, [{
      key: "load",
      value: function load() {
        return this.owner.getItemAsset(this);
      }
    }, {
      key: "getBranch",
      value: function getBranch() {
        if (this.branches && this.owner._branchIndex != -1) {
          var itemId = this.branches[this.owner._branchIndex];
          if (itemId) return this.owner.getItemById(itemId);
        }

        return this;
      }
    }, {
      key: "getHighResolution",
      value: function getHighResolution() {
        if (this.highResolution && fgui.UIContentScaler.scaleLevel > 0) {
          var itemId = this.highResolution[fgui.UIContentScaler.scaleLevel - 1];
          if (itemId) return this.owner.getItemById(itemId);
        }

        return this;
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.name;
      }
    }]);

    return PackageItem;
  }();

  fgui.PackageItem = PackageItem;
})(fgui || (fgui = {}));

(function (fgui) {
  var PopupMenu = /*#__PURE__*/function () {
    function PopupMenu(resourceURL) {
      _classCallCheck(this, PopupMenu);

      if (!resourceURL) {
        resourceURL = fgui.UIConfig.popupMenu;
        if (!resourceURL) throw "UIConfig.popupMenu not defined";
      }

      this._contentPane = fgui.UIPackage.createObjectFromURL(resourceURL);

      this._contentPane.on(fgui.StageEvent.AddtoStage, this.__addedToStage, this);

      this._list = this._contentPane.getChild("list");

      this._list.removeChildrenToPool();

      this._list.addRelation(this._contentPane, fgui.RelationType.Width);

      this._list.removeRelation(this._contentPane, fgui.RelationType.Height);

      this._contentPane.addRelation(this._list, fgui.RelationType.Height);

      this._list.on(fgui.ListEvent.ItemClick, this.__clickItem, this);
    }

    _createClass(PopupMenu, [{
      key: "dispose",
      value: function dispose() {
        this._contentPane.dispose();
      }
    }, {
      key: "addItem",
      value: function addItem(caption, handler) {
        var item = this._list.addItemFromPool();

        item.title = caption;
        item.data = handler;
        item.grayed = false;
        var c = item.getController("checked");
        if (c) c.selectedIndex = 0;
        return item;
      }
    }, {
      key: "addItemAt",
      value: function addItemAt(caption, index, handler) {
        var item = this._list.getFromPool();

        this._list.addChildAt(item, index);

        item.title = caption;
        item.data = handler;
        item.grayed = false;
        var c = item.getController("checked");
        if (c) c.selectedIndex = 0;
        return item;
      }
    }, {
      key: "addSeperator",
      value: function addSeperator() {
        if (fgui.UIConfig.popupMenu_seperator == null) throw "UIConfig.popupMenu_seperator not defined";
        this.list.addItemFromPool(fgui.UIConfig.popupMenu_seperator);
      }
    }, {
      key: "getItemName",
      value: function getItemName(index) {
        var item = this._list.getChildAt(index);

        return item.name;
      }
    }, {
      key: "setItemText",
      value: function setItemText(name, caption) {
        var item = this._list.getChild(name);

        item.title = caption;
      }
    }, {
      key: "setItemVisible",
      value: function setItemVisible(name, visible) {
        var item = this._list.getChild(name);

        if (item.visible != visible) {
          item.visible = visible;

          this._list.setBoundsChangedFlag();
        }
      }
    }, {
      key: "setItemGrayed",
      value: function setItemGrayed(name, grayed) {
        var item = this._list.getChild(name);

        item.grayed = grayed;
      }
    }, {
      key: "setItemCheckable",
      value: function setItemCheckable(name, checkable) {
        var item = this._list.getChild(name);

        var c = item.getController("checked");

        if (c) {
          if (checkable) {
            if (c.selectedIndex == 0) c.selectedIndex = 1;
          } else c.selectedIndex = 0;
        }
      }
    }, {
      key: "setItemChecked",
      value: function setItemChecked(name, checked) {
        var item = this._list.getChild(name);

        var c = item.getController("checked");
        if (c) c.selectedIndex = checked ? 2 : 1;
      }
    }, {
      key: "isItemChecked",
      value: function isItemChecked(name) {
        var item = this._list.getChild(name);

        var c = item.getController("checked");
        if (c) return c.selectedIndex == 2;else return false;
      }
    }, {
      key: "removeItem",
      value: function removeItem(name) {
        var item = this._list.getChild(name);

        if (item) {
          var index = this._list.getChildIndex(item);

          this._list.removeChildToPoolAt(index);

          return true;
        } else return false;
      }
    }, {
      key: "clearItems",
      value: function clearItems() {
        this._list.removeChildrenToPool();
      }
    }, {
      key: "show",
      value: function show(target, dir) {
        var r = fgui.GRoot.findFor(target);
        r.showPopup(this.contentPane, target instanceof fgui.GRoot ? null : target, dir);
      }
    }, {
      key: "__clickItem",
      value: function __clickItem(evt) {
        var itemObject = evt.data;
        if (!(itemObject instanceof fgui.GButton)) return;

        if (itemObject.grayed) {
          this._list.selectedIndex = -1;
          return;
        }

        var c = itemObject.getController("checked");

        if (c && c.selectedIndex != 0) {
          if (c.selectedIndex == 1) c.selectedIndex = 2;else c.selectedIndex = 1;
        }

        var r = this._contentPane.parent;
        r.hidePopup(this.contentPane);

        if (itemObject.data) {
          itemObject.data();
        }
      }
    }, {
      key: "__addedToStage",
      value: function __addedToStage() {
        this._list.selectedIndex = -1;

        this._list.resizeToFit(100000, 10);
      }
    }, {
      key: "itemCount",
      get: function get() {
        return this._list.numChildren;
      }
    }, {
      key: "contentPane",
      get: function get() {
        return this._contentPane;
      }
    }, {
      key: "list",
      get: function get() {
        return this._list;
      }
    }]);

    return PopupMenu;
  }();

  fgui.PopupMenu = PopupMenu;
})(fgui || (fgui = {}));

(function (fgui) {
  var RelationItem = /*#__PURE__*/function () {
    function RelationItem(owner) {
      _classCallCheck(this, RelationItem);

      this._owner = owner;
      this._defs = new Array();
    }

    _createClass(RelationItem, [{
      key: "add",
      value: function add(relationType, usePercent) {
        if (relationType == fgui.RelationType.Size) {
          this.add(fgui.RelationType.Width, usePercent);
          this.add(fgui.RelationType.Height, usePercent);
          return;
        }

        var cnt = this._defs.length;

        for (var i = 0; i < cnt; i++) {
          if (this._defs[i].type == relationType) return;
        }

        this.internalAdd(relationType, usePercent);
      }
    }, {
      key: "internalAdd",
      value: function internalAdd(relationType, usePercent) {
        if (relationType == fgui.RelationType.Size) {
          this.internalAdd(fgui.RelationType.Width, usePercent);
          this.internalAdd(fgui.RelationType.Height, usePercent);
          return;
        }

        var info = new RelationDef();
        info.percent = usePercent;
        info.type = relationType;
        info.axis = relationType <= fgui.RelationType.Right_Right || relationType == fgui.RelationType.Width || relationType >= fgui.RelationType.LeftExt_Left && relationType <= fgui.RelationType.RightExt_Right ? 0 : 1;

        this._defs.push(info);
      }
    }, {
      key: "remove",
      value: function remove(relationType) {
        if (relationType == fgui.RelationType.Size) {
          this.remove(fgui.RelationType.Width);
          this.remove(fgui.RelationType.Height);
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
    }, {
      key: "copy",
      value: function copy(source) {
        this._target = source.target;
        this._defs.length = 0;
        var cnt = source._defs.length;

        for (var i = 0; i < cnt; i++) {
          var info = source._defs[i];
          var info2 = new RelationDef();
          info2.copy(info);

          this._defs.push(info2);
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (this._target) {
          this.releaseRefTarget();
          this._target = null;
        }
      }
    }, {
      key: "applyOnSelfResized",
      value: function applyOnSelfResized(dWidth, dHeight, applyPivot) {
        var cnt = this._defs.length;
        if (cnt == 0) return;
        var ox = this._owner.x;
        var oy = this._owner.y;

        for (var i = 0; i < cnt; i++) {
          var info = this._defs[i];

          switch (info.type) {
            case fgui.RelationType.Center_Center:
              this._owner.x -= (0.5 - (applyPivot ? this._owner.pivotX : 0)) * dWidth;
              break;

            case fgui.RelationType.Right_Center:
            case fgui.RelationType.Right_Left:
            case fgui.RelationType.Right_Right:
              this._owner.x -= (1 - (applyPivot ? this._owner.pivotX : 0)) * dWidth;
              break;

            case fgui.RelationType.Middle_Middle:
              this._owner.y -= (0.5 - (applyPivot ? this._owner.pivotY : 0)) * dHeight;
              break;

            case fgui.RelationType.Bottom_Middle:
            case fgui.RelationType.Bottom_Top:
            case fgui.RelationType.Bottom_Bottom:
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
    }, {
      key: "applyOnXYChanged",
      value: function applyOnXYChanged(info, dx, dy) {
        var tmp;

        switch (info.type) {
          case fgui.RelationType.Left_Left:
          case fgui.RelationType.Left_Center:
          case fgui.RelationType.Left_Right:
          case fgui.RelationType.Center_Center:
          case fgui.RelationType.Right_Left:
          case fgui.RelationType.Right_Center:
          case fgui.RelationType.Right_Right:
            this._owner.x += dx;
            break;

          case fgui.RelationType.Top_Top:
          case fgui.RelationType.Top_Middle:
          case fgui.RelationType.Top_Bottom:
          case fgui.RelationType.Middle_Middle:
          case fgui.RelationType.Bottom_Top:
          case fgui.RelationType.Bottom_Middle:
          case fgui.RelationType.Bottom_Bottom:
            this._owner.y += dy;
            break;

          case fgui.RelationType.Width:
          case fgui.RelationType.Height:
            break;

          case fgui.RelationType.LeftExt_Left:
          case fgui.RelationType.LeftExt_Right:
            if (this._owner != this._target.parent) {
              tmp = this._owner.xMin;
              this._owner.width = this._owner._rawWidth - dx;
              this._owner.xMin = tmp + dx;
            } else this._owner.width = this._owner._rawWidth - dx;

            break;

          case fgui.RelationType.RightExt_Left:
          case fgui.RelationType.RightExt_Right:
            if (this._owner != this._target.parent) {
              tmp = this._owner.xMin;
              this._owner.width = this._owner._rawWidth + dx;
              this._owner.xMin = tmp;
            } else this._owner.width = this._owner._rawWidth + dx;

            break;

          case fgui.RelationType.TopExt_Top:
          case fgui.RelationType.TopExt_Bottom:
            if (this._owner != this._target.parent) {
              tmp = this._owner.yMin;
              this._owner.height = this._owner._rawHeight - dy;
              this._owner.yMin = tmp + dy;
            } else this._owner.height = this._owner._rawHeight - dy;

            break;

          case fgui.RelationType.BottomExt_Top:
          case fgui.RelationType.BottomExt_Bottom:
            if (this._owner != this._target.parent) {
              tmp = this._owner.yMin;
              this._owner.height = this._owner._rawHeight + dy;
              this._owner.yMin = tmp;
            } else this._owner.height = this._owner._rawHeight + dy;

            break;
        }
      }
    }, {
      key: "applyOnSizeChanged",
      value: function applyOnSizeChanged(info) {
        var pos = 0,
            pivot = 0,
            delta = 0;
        var v, tmp;

        if (info.axis == 0) {
          if (this._target != this._owner.parent) {
            pos = this._target.x;
            if (this._target.pivotAsAnchor) pivot = this._target.pivotX;
          }

          if (info.percent) {
            if (this._targetWidth != 0) delta = this._target._width / this._targetWidth;
          } else delta = this._target._width - this._targetWidth;
        } else {
          if (this._target != this._owner.parent) {
            pos = this._target.y;
            if (this._target.pivotAsAnchor) pivot = this._target.pivotY;
          }

          if (info.percent) {
            if (this._targetHeight != 0) delta = this._target._height / this._targetHeight;
          } else delta = this._target._height - this._targetHeight;
        }

        switch (info.type) {
          case fgui.RelationType.Left_Left:
            if (info.percent) this._owner.xMin = pos + (this._owner.xMin - pos) * delta;else if (pivot != 0) this._owner.x += delta * -pivot;
            break;

          case fgui.RelationType.Left_Center:
            if (info.percent) this._owner.xMin = pos + (this._owner.xMin - pos) * delta;else this._owner.x += delta * (0.5 - pivot);
            break;

          case fgui.RelationType.Left_Right:
            if (info.percent) this._owner.xMin = pos + (this._owner.xMin - pos) * delta;else this._owner.x += delta * (1 - pivot);
            break;

          case fgui.RelationType.Center_Center:
            if (info.percent) this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth * 0.5 - pos) * delta - this._owner._rawWidth * 0.5;else this._owner.x += delta * (0.5 - pivot);
            break;

          case fgui.RelationType.Right_Left:
            if (info.percent) this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;else if (pivot != 0) this._owner.x += delta * -pivot;
            break;

          case fgui.RelationType.Right_Center:
            if (info.percent) this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;else this._owner.x += delta * (0.5 - pivot);
            break;

          case fgui.RelationType.Right_Right:
            if (info.percent) this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;else this._owner.x += delta * (1 - pivot);
            break;

          case fgui.RelationType.Top_Top:
            if (info.percent) this._owner.yMin = pos + (this._owner.yMin - pos) * delta;else if (pivot != 0) this._owner.y += delta * -pivot;
            break;

          case fgui.RelationType.Top_Middle:
            if (info.percent) this._owner.yMin = pos + (this._owner.yMin - pos) * delta;else this._owner.y += delta * (0.5 - pivot);
            break;

          case fgui.RelationType.Top_Bottom:
            if (info.percent) this._owner.yMin = pos + (this._owner.yMin - pos) * delta;else this._owner.y += delta * (1 - pivot);
            break;

          case fgui.RelationType.Middle_Middle:
            if (info.percent) this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight * 0.5 - pos) * delta - this._owner._rawHeight * 0.5;else this._owner.y += delta * (0.5 - pivot);
            break;

          case fgui.RelationType.Bottom_Top:
            if (info.percent) this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;else if (pivot != 0) this._owner.y += delta * -pivot;
            break;

          case fgui.RelationType.Bottom_Middle:
            if (info.percent) this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;else this._owner.y += delta * (0.5 - pivot);
            break;

          case fgui.RelationType.Bottom_Bottom:
            if (info.percent) this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;else this._owner.y += delta * (1 - pivot);
            break;

          case fgui.RelationType.Width:
            if (this._owner._underConstruct && this._owner == this._target.parent) v = this._owner.sourceWidth - this._target.initWidth;else v = this._owner._rawWidth - this._targetWidth;
            if (info.percent) v = v * delta;

            if (this._target == this._owner.parent) {
              if (this._owner.pivotAsAnchor) {
                tmp = this._owner.xMin;

                this._owner.setSize(this._target._width + v, this._owner._rawHeight, true);

                this._owner.xMin = tmp;
              } else this._owner.setSize(this._target._width + v, this._owner._rawHeight, true);
            } else this._owner.width = this._target._width + v;

            break;

          case fgui.RelationType.Height:
            if (this._owner._underConstruct && this._owner == this._target.parent) v = this._owner.sourceHeight - this._target.initHeight;else v = this._owner._rawHeight - this._targetHeight;
            if (info.percent) v = v * delta;

            if (this._target == this._owner.parent) {
              if (this._owner.pivotAsAnchor) {
                tmp = this._owner.yMin;

                this._owner.setSize(this._owner._rawWidth, this._target._height + v, true);

                this._owner.yMin = tmp;
              } else this._owner.setSize(this._owner._rawWidth, this._target._height + v, true);
            } else this._owner.height = this._target._height + v;

            break;

          case fgui.RelationType.LeftExt_Left:
            tmp = this._owner.xMin;
            if (info.percent) v = pos + (tmp - pos) * delta - tmp;else v = delta * -pivot;
            this._owner.width = this._owner._rawWidth - v;
            this._owner.xMin = tmp + v;
            break;

          case fgui.RelationType.LeftExt_Right:
            tmp = this._owner.xMin;
            if (info.percent) v = pos + (tmp - pos) * delta - tmp;else v = delta * (1 - pivot);
            this._owner.width = this._owner._rawWidth - v;
            this._owner.xMin = tmp + v;
            break;

          case fgui.RelationType.RightExt_Left:
            tmp = this._owner.xMin;
            if (info.percent) v = pos + (tmp + this._owner._rawWidth - pos) * delta - (tmp + this._owner._rawWidth);else v = delta * -pivot;
            this._owner.width = this._owner._rawWidth + v;
            this._owner.xMin = tmp;
            break;

          case fgui.RelationType.RightExt_Right:
            tmp = this._owner.xMin;

            if (info.percent) {
              if (this._owner == this._target.parent) {
                if (this._owner._underConstruct) this._owner.width = pos + this._target._width - this._target._width * pivot + (this._owner.sourceWidth - pos - this._target.initWidth + this._target.initWidth * pivot) * delta;else this._owner.width = pos + (this._owner._rawWidth - pos) * delta;
              } else {
                v = pos + (tmp + this._owner._rawWidth - pos) * delta - (tmp + this._owner._rawWidth);
                this._owner.width = this._owner._rawWidth + v;
                this._owner.xMin = tmp;
              }
            } else {
              if (this._owner == this._target.parent) {
                if (this._owner._underConstruct) this._owner.width = this._owner.sourceWidth + (this._target._width - this._target.initWidth) * (1 - pivot);else this._owner.width = this._owner._rawWidth + delta * (1 - pivot);
              } else {
                v = delta * (1 - pivot);
                this._owner.width = this._owner._rawWidth + v;
                this._owner.xMin = tmp;
              }
            }

            break;

          case fgui.RelationType.TopExt_Top:
            tmp = this._owner.yMin;
            if (info.percent) v = pos + (tmp - pos) * delta - tmp;else v = delta * -pivot;
            this._owner.height = this._owner._rawHeight - v;
            this._owner.yMin = tmp + v;
            break;

          case fgui.RelationType.TopExt_Bottom:
            tmp = this._owner.yMin;
            if (info.percent) v = pos + (tmp - pos) * delta - tmp;else v = delta * (1 - pivot);
            this._owner.height = this._owner._rawHeight - v;
            this._owner.yMin = tmp + v;
            break;

          case fgui.RelationType.BottomExt_Top:
            tmp = this._owner.yMin;
            if (info.percent) v = pos + (tmp + this._owner._rawHeight - pos) * delta - (tmp + this._owner._rawHeight);else v = delta * -pivot;
            this._owner.height = this._owner._rawHeight + v;
            this._owner.yMin = tmp;
            break;

          case fgui.RelationType.BottomExt_Bottom:
            tmp = this._owner.yMin;

            if (info.percent) {
              if (this._owner == this._target.parent) {
                if (this._owner._underConstruct) this._owner.height = pos + this._target._height - this._target._height * pivot + (this._owner.sourceHeight - pos - this._target.initHeight + this._target.initHeight * pivot) * delta;else this._owner.height = pos + (this._owner._rawHeight - pos) * delta;
              } else {
                v = pos + (tmp + this._owner._rawHeight - pos) * delta - (tmp + this._owner._rawHeight);
                this._owner.height = this._owner._rawHeight + v;
                this._owner.yMin = tmp;
              }
            } else {
              if (this._owner == this._target.parent) {
                if (this._owner._underConstruct) this._owner.height = this._owner.sourceHeight + (this._target._height - this._target.initHeight) * (1 - pivot);else this._owner.height = this._owner._rawHeight + delta * (1 - pivot);
              } else {
                v = delta * (1 - pivot);
                this._owner.height = this._owner._rawHeight + v;
                this._owner.yMin = tmp;
              }
            }

            break;
        }
      }
    }, {
      key: "addRefTarget",
      value: function addRefTarget() {
        if (this._target != this._owner.parent) this._target.on(fgui.DisplayObjectEvent.XY_CHANGED, this.__targetXYChanged, this);

        this._target.on(fgui.DisplayObjectEvent.SIZE_CHANGED, this.__targetSizeChanged, this);

        this._targetX = this._target.x;
        this._targetY = this._target.y;
        this._targetWidth = this._target._width;
        this._targetHeight = this._target._height;
      }
    }, {
      key: "releaseRefTarget",
      value: function releaseRefTarget() {
        if (this._target.displayObject == null) return;

        this._target.off(fgui.DisplayObjectEvent.XY_CHANGED, this.__targetXYChanged, this);

        this._target.off(fgui.DisplayObjectEvent.SIZE_CHANGED, this.__targetSizeChanged, this);
      }
    }, {
      key: "__targetXYChanged",
      value: function __targetXYChanged() {
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
    }, {
      key: "__targetSizeChanged",
      value: function __targetSizeChanged() {
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
    }, {
      key: "owner",
      get: function get() {
        return this._owner;
      }
    }, {
      key: "target",
      set: function set(value) {
        if (this._target != value) {
          if (this._target) this.releaseRefTarget();
          this._target = value;
          if (this._target) this.addRefTarget();
        }
      },
      get: function get() {
        return this._target;
      }
    }, {
      key: "isEmpty",
      get: function get() {
        return this._defs.length == 0;
      }
    }]);

    return RelationItem;
  }();

  fgui.RelationItem = RelationItem;

  var RelationDef = /*#__PURE__*/function () {
    function RelationDef() {
      _classCallCheck(this, RelationDef);
    }

    _createClass(RelationDef, [{
      key: "copy",
      value: function copy(source) {
        this.percent = source.percent;
        this.type = source.type;
        this.axis = source.axis;
      }
    }]);

    return RelationDef;
  }();
})(fgui || (fgui = {}));

(function (fgui) {
  var Relations = /*#__PURE__*/function () {
    function Relations(owner) {
      _classCallCheck(this, Relations);

      this._owner = owner;
      this._items = [];
    }

    _createClass(Relations, [{
      key: "add",
      value: function add(target, relationType, usePercent) {
        var length = this._items.length;

        for (var i = 0; i < length; i++) {
          var item = this._items[i];

          if (item.target == target) {
            item.add(relationType, usePercent);
            return;
          }
        }

        var newItem = new fgui.RelationItem(this._owner);
        newItem.target = target;
        newItem.add(relationType, usePercent);

        this._items.push(newItem);
      }
    }, {
      key: "remove",
      value: function remove(target, relationType) {
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
            } else i++;
          } else i++;
        }
      }
    }, {
      key: "contains",
      value: function contains(target) {
        var length = this._items.length;

        for (var i = 0; i < length; i++) {
          var item = this._items[i];
          if (item.target == target) return true;
        }

        return false;
      }
    }, {
      key: "clearFor",
      value: function clearFor(target) {
        var cnt = this._items.length;
        var i = 0;

        while (i < cnt) {
          var item = this._items[i];

          if (item.target == target) {
            item.dispose();

            this._items.splice(i, 1);

            cnt--;
          } else i++;
        }
      }
    }, {
      key: "clearAll",
      value: function clearAll() {
        var length = this._items.length;

        for (var i = 0; i < length; i++) {
          var item = this._items[i];
          item.dispose();
        }

        this._items.length = 0;
      }
    }, {
      key: "copyFrom",
      value: function copyFrom(source) {
        this.clearAll();
        var arr = source._items;
        var length = arr.length;

        for (var i = 0; i < length; i++) {
          var ri = arr[i];
          var item = new fgui.RelationItem(this._owner);
          item.copy(ri);

          this._items.push(item);
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this.clearAll();
      }
    }, {
      key: "onOwnerSizeChanged",
      value: function onOwnerSizeChanged(dWidth, dHeight, applyPivot) {
        if (this._items.length == 0) return;
        var length = this._items.length;

        for (var i = 0; i < length; i++) {
          var item = this._items[i];
          item.applyOnSelfResized(dWidth, dHeight, applyPivot);
        }
      }
    }, {
      key: "setup",
      value: function setup(buffer, parentToChild) {
        var cnt = buffer.readByte();
        var target;

        for (var i = 0; i < cnt; i++) {
          var targetIndex = buffer.readShort();
          if (targetIndex == -1) target = this._owner.parent;else if (parentToChild) target = this._owner.getChildAt(targetIndex);else target = this._owner.parent.getChildAt(targetIndex);
          var newItem = new fgui.RelationItem(this._owner);
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
    }, {
      key: "empty",
      get: function get() {
        return this._items.length == 0;
      }
    }]);

    return Relations;
  }();

  fgui.Relations = Relations;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_vec2 = new THREE.Vector2();
  var s_rect = new fgui.Rect();
  var s_endPos = new THREE.Vector2();
  var s_oldChange = new THREE.Vector2();
  var s_gestureFlag = 0;
  var TWEEN_TIME_GO = 0.5;
  var TWEEN_TIME_DEFAULT = 0.3;
  var PULL_RATIO = 0.5;

  var ScrollPane = /*#__PURE__*/function () {
    function ScrollPane(owner) {
      _classCallCheck(this, ScrollPane);

      this._owner = owner;
      this._maskContainer = new fgui.DisplayObject();

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
      this._scrollBarMargin = new fgui.Margin();
      this._viewSize = new THREE.Vector2();
      this._contentSize = new THREE.Vector2();
      this._pageSize = new THREE.Vector2(1, 1);
      this._overlapSize = new THREE.Vector2();
      this._tweenTime = new THREE.Vector2();
      this._tweenStart = new THREE.Vector2();
      this._tweenDuration = new THREE.Vector2();
      this._tweenChange = new THREE.Vector2();
      this._velocity = new THREE.Vector2();
      this._containerPos = new THREE.Vector2();
      this._beginTouchPos = new THREE.Vector2();
      this._lastTouchPos = new THREE.Vector2();
      this._lastTouchGlobalPos = new THREE.Vector2();
      this._scrollStep = fgui.UIConfig.defaultScrollStep;
      this._decelerationRate = fgui.UIConfig.defaultScrollDecelerationRate;

      this._owner.on(fgui.InteractiveEvents.Down, this.__touchBegin, this);

      this._owner.on(fgui.InteractiveEvents.Move, this.__touchMove, this);

      this._owner.on(fgui.InteractiveEvents.Up, this.__touchEnd, this);

      this._owner.on(fgui.DisplayObjectEvent.MOUSE_WHEEL, this.__mouseWheel, this);
    }

    _createClass(ScrollPane, [{
      key: "setup",
      value: function setup(buffer) {
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
        this._displayOnLeft = (flags & 1) != 0;
        this._snapToItem = (flags & 2) != 0;
        this._displayInDemand = (flags & 4) != 0;
        this._pageMode = (flags & 8) != 0;
        if (flags & 16) this._touchEffect = true;else if (flags & 32) this._touchEffect = false;else this._touchEffect = fgui.UIConfig.defaultScrollTouchEffect;
        if (flags & 64) this._bouncebackEffect = true;else if (flags & 128) this._bouncebackEffect = false;else this._bouncebackEffect = fgui.UIConfig.defaultScrollBounceEffect;
        this._inertiaDisabled = (flags & 256) != 0;
        if ((flags & 512) == 0) this._maskContainer.clipRect = new fgui.Rect();
        this._floating = (flags & 1024) != 0;
        if (scrollBarDisplay == fgui.ScrollBarDisplayType.Default) scrollBarDisplay = fgui.UIConfig.defaultScrollBarDisplay;

        if (scrollBarDisplay != fgui.ScrollBarDisplayType.Hidden) {
          if (this._scrollType == fgui.ScrollType.Both || this._scrollType == fgui.ScrollType.Vertical) {
            var res = vtScrollBarRes ? vtScrollBarRes : fgui.UIConfig.verticalScrollBar;

            if (res) {
              this._vtScrollBar = fgui.UIPackage.createObjectFromURL(res);
              if (!this._vtScrollBar) throw "cannot create scrollbar} from " + res;

              this._vtScrollBar.setScrollPane(this, true);

              this._owner.displayObject.addChild(this._vtScrollBar.displayObject);
            }
          }

          if (this._scrollType == fgui.ScrollType.Both || this._scrollType == fgui.ScrollType.Horizontal) {
            res = hzScrollBarRes ? hzScrollBarRes : fgui.UIConfig.horizontalScrollBar;

            if (res) {
              this._hzScrollBar = fgui.UIPackage.createObjectFromURL(res);
              if (!this._hzScrollBar) throw "cannot create scrollbar} from " + res;

              this._hzScrollBar.setScrollPane(this, false);

              this._owner.displayObject.addChild(this._hzScrollBar.displayObject);
            }
          }

          this._scrollBarDisplayAuto = scrollBarDisplay == fgui.ScrollBarDisplayType.Auto;

          if (this._scrollBarDisplayAuto) {
            if (this._vtScrollBar) this._vtScrollBar.displayObject.visible = false;
            if (this._hzScrollBar) this._hzScrollBar.displayObject.visible = false;
          }
        } else this._mouseWheelEnabled = false;

        if (headerRes) {
          this._header = fgui.UIPackage.createObjectFromURL(headerRes);
          if (!this._header) throw new Error("cannot create scrollPane header from " + headerRes);
        }

        if (footerRes) {
          this._footer = fgui.UIPackage.createObjectFromURL(footerRes);
          if (!this._footer) throw new Error("cannot create scrollPane footer from " + footerRes);
        }

        if (this._header || this._footer) this._refreshBarAxis = this._scrollType == fgui.ScrollType.Both || this._scrollType == fgui.ScrollType.Vertical ? "y" : "x";
        this.setSize(this.owner.width, this.owner.height);
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (this._tweening != 0) fgui.Timers.remove(this.tweenUpdate, this);
        this._pageController = null;
        if (this._hzScrollBar) this._hzScrollBar.dispose();
        if (this._vtScrollBar) this._vtScrollBar.dispose();
        if (this._header) this._header.dispose();
        if (this._footer) this._footer.dispose();
      }
    }, {
      key: "setPercX",
      value: function setPercX(value, ani) {
        this._owner.ensureBoundsCorrect();

        this.setPosX(this._overlapSize.x * fgui.clamp01(value), ani);
      }
    }, {
      key: "setPercY",
      value: function setPercY(value, ani) {
        this._owner.ensureBoundsCorrect();

        this.setPosY(this._overlapSize.y * fgui.clamp01(value), ani);
      }
    }, {
      key: "setPosX",
      value: function setPosX(value, ani) {
        this._owner.ensureBoundsCorrect();

        if (this._loop == 1) value = this.loopCheckingNewPos(value, "x");
        value = fgui.clamp(value, 0, this._overlapSize.x);

        if (value != this._xPos) {
          this._xPos = value;
          this.posChanged(ani);
        }
      }
    }, {
      key: "setPosY",
      value: function setPosY(value, ani) {
        this._owner.ensureBoundsCorrect();

        if (this._loop == 1) value = this.loopCheckingNewPos(value, "y");
        value = fgui.clamp(value, 0, this._overlapSize.y);

        if (value != this._yPos) {
          this._yPos = value;
          this.posChanged(ani);
        }
      }
    }, {
      key: "setCurrentPageX",
      value: function setCurrentPageX(value, ani) {
        if (!this._pageMode) return;

        this._owner.ensureBoundsCorrect();

        if (this._overlapSize.x > 0) this.setPosX(value * this._pageSize.x, ani);
      }
    }, {
      key: "setCurrentPageY",
      value: function setCurrentPageY(value, ani) {
        if (!this._pageMode) return;

        this._owner.ensureBoundsCorrect();

        if (this._overlapSize.y > 0) this.setPosY(value * this._pageSize.y, ani);
      }
    }, {
      key: "scrollTop",
      value: function scrollTop(ani) {
        this.setPercY(0, ani);
      }
    }, {
      key: "scrollBottom",
      value: function scrollBottom(ani) {
        this.setPercY(1, ani);
      }
    }, {
      key: "scrollUp",
      value: function scrollUp() {
        var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var ani = arguments.length > 1 ? arguments[1] : undefined;
        if (this._pageMode) this.setPosY(this._yPos - this._pageSize.y * ratio, ani);else this.setPosY(this._yPos - this._scrollStep * ratio, ani);
        ;
      }
    }, {
      key: "scrollDown",
      value: function scrollDown() {
        var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var ani = arguments.length > 1 ? arguments[1] : undefined;
        if (this._pageMode) this.setPosY(this._yPos + this._pageSize.y * ratio, ani);else this.setPosY(this._yPos + this._scrollStep * ratio, ani);
      }
    }, {
      key: "scrollLeft",
      value: function scrollLeft() {
        var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var ani = arguments.length > 1 ? arguments[1] : undefined;
        if (this._pageMode) this.setPosX(this._xPos - this._pageSize.x * ratio, ani);else this.setPosX(this._xPos - this._scrollStep * ratio, ani);
      }
    }, {
      key: "scrollRight",
      value: function scrollRight() {
        var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var ani = arguments.length > 1 ? arguments[1] : undefined;
        if (this._pageMode) this.setPosX(this._xPos + this._pageSize.x * ratio, ani);else this.setPosX(this._xPos + this._scrollStep * ratio, ani);
      }
    }, {
      key: "scrollToView",
      value: function scrollToView(target, ani, setFirst) {
        this._owner.ensureBoundsCorrect();

        if (this._needRefresh) this.refresh();
        var rect;

        if (target instanceof fgui.GObject) {
          if (target.parent != this._owner) {
            target.parent.localToGlobalRect(target.x, target.y, target.width, target.height, s_rect);
            rect = this._owner.globalToLocalRect(s_rect.x, s_rect.y, s_rect.width, s_rect.height, s_rect);
          } else {
            rect = s_rect;
            rect.set(target.x, target.y, target.width, target.height);
          }
        } else rect = target;

        if (this._overlapSize.y > 0) {
          var bottom = this._yPos + this._viewSize.y;

          if (setFirst || rect.y <= this._yPos || rect.height >= this._viewSize.y) {
            if (this._pageMode) this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);else this.setPosY(rect.y, ani);
          } else if (rect.y + rect.height > bottom) {
            if (this._pageMode) this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);else if (rect.height <= this._viewSize.y / 2) this.setPosY(rect.y + rect.height * 2 - this._viewSize.y, ani);else this.setPosY(rect.y + rect.height - this._viewSize.y, ani);
          }
        }

        if (this._overlapSize.x > 0) {
          var right = this._xPos + this._viewSize.x;

          if (setFirst || rect.x <= this._xPos || rect.width >= this._viewSize.x) {
            if (this._pageMode) this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);else this.setPosX(rect.x, ani);
          } else if (rect.x + rect.width > right) {
            if (this._pageMode) this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);else if (rect.width <= this._viewSize.x / 2) this.setPosX(rect.x + rect.width * 2 - this._viewSize.x, ani);else this.setPosX(rect.x + rect.width - this._viewSize.x, ani);
          }
        }

        if (!ani && this._needRefresh) this.refresh();
      }
    }, {
      key: "isChildInView",
      value: function isChildInView(obj) {
        if (this._overlapSize.y > 0) {
          var dist = obj.y + this._container.y;
          if (dist < -obj.height || dist > this._viewSize.y) return false;
        }

        if (this._overlapSize.x > 0) {
          dist = obj.x + this._container.x;
          if (dist < -obj.width || dist > this._viewSize.x) return false;
        }

        return true;
      }
    }, {
      key: "cancelDragging",
      value: function cancelDragging() {
        fgui.Stage.removeTouchMonitor(this._owner.displayObject);
        if (ScrollPane.draggingPane == this) ScrollPane.draggingPane = null;
        s_gestureFlag = 0;
        this._dragged = false;
      }
    }, {
      key: "lockHeader",
      value: function lockHeader(size) {
        if (this._headerLockedSize == size) return;
        this._headerLockedSize = size;

        if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] >= 0) {
          this._tweenStart.set(this._container.x, this._container.y);

          this._tweenChange.set(0, 0);

          this._tweenChange[this._refreshBarAxis] = this._headerLockedSize - this._tweenStart[this._refreshBarAxis];

          this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);

          this.startTween(2);
        }
      }
    }, {
      key: "lockFooter",
      value: function lockFooter(size) {
        if (this._footerLockedSize == size) return;
        this._footerLockedSize = size;

        if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] <= -this._overlapSize[this._refreshBarAxis]) {
          this._tweenStart.set(this._container.x, this._container.y);

          this._tweenChange.set(0, 0);

          var max = this._overlapSize[this._refreshBarAxis];
          if (max == 0) max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);else max += this._footerLockedSize;
          this._tweenChange[this._refreshBarAxis] = -max - this._tweenStart[this._refreshBarAxis];

          this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);

          this.startTween(2);
        }
      }
    }, {
      key: "onOwnerSizeChanged",
      value: function onOwnerSizeChanged() {
        this.setSize(this._owner.width, this._owner.height);
        this.posChanged(false);
      }
    }, {
      key: "handleControllerChanged",
      value: function handleControllerChanged(c) {
        if (this._pageController == c) {
          if (this._scrollType == fgui.ScrollType.Horizontal) this.setCurrentPageX(c.selectedIndex, true);else this.setCurrentPageY(c.selectedIndex, true);
        }
      }
    }, {
      key: "updatePageController",
      value: function updatePageController() {
        if (this._pageController && !this._pageController.changing) {
          var index;
          if (this._scrollType == fgui.ScrollType.Horizontal) index = this.currentPageX;else index = this.currentPageY;

          if (index < this._pageController.pageCount) {
            var c = this._pageController;
            this._pageController = null;
            c.selectedIndex = index;
            this._pageController = c;
          }
        }
      }
    }, {
      key: "adjustMaskContainer",
      value: function adjustMaskContainer() {
        var mx, my;
        if (this._displayOnLeft && this._vtScrollBar && !this._floating) mx = Math.floor(this._owner.margin.left + this._vtScrollBar.width);else mx = Math.floor(this._owner.margin.left);
        my = Math.floor(this._owner.margin.top);

        this._maskContainer.setPosition(mx, my);

        if (this._owner._alignOffset.x != 0 || this._owner._alignOffset.y != 0) {
          if (this._alignContainer == null) {
            this._alignContainer = new fgui.DisplayObject();

            this._maskContainer.addChild(this._alignContainer);

            this._alignContainer.addChild(this._container);
          }

          this._alignContainer.setPosition(this._owner._alignOffset.x, this._owner._alignOffset.y);
        } else if (this._alignContainer) {
          this._alignContainer.setPosition(0, 0);
        }
      }
    }, {
      key: "setSize",
      value: function setSize(aWidth, aHeight) {
        this.adjustMaskContainer();

        if (this._hzScrollBar) {
          this._hzScrollBar.y = aHeight - this._hzScrollBar.height;

          if (this._vtScrollBar) {
            this._hzScrollBar.width = aWidth - this._vtScrollBar.width - this._scrollBarMargin.left - this._scrollBarMargin.right;
            if (this._displayOnLeft) this._hzScrollBar.x = this._scrollBarMargin.left + this._vtScrollBar.width;else this._hzScrollBar.x = this._scrollBarMargin.left;
          } else {
            this._hzScrollBar.width = aWidth - this._scrollBarMargin.left - this._scrollBarMargin.right;
            this._hzScrollBar.x = this._scrollBarMargin.left;
          }
        }

        if (this._vtScrollBar) {
          if (!this._displayOnLeft) this._vtScrollBar.x = aWidth - this._vtScrollBar.width;
          if (this._hzScrollBar) this._vtScrollBar.height = aHeight - this._hzScrollBar.height - this._scrollBarMargin.top - this._scrollBarMargin.bottom;else this._vtScrollBar.height = aHeight - this._scrollBarMargin.top - this._scrollBarMargin.bottom;
          this._vtScrollBar.y = this._scrollBarMargin.top;
        }

        this._viewSize.x = aWidth;
        this._viewSize.y = aHeight;
        if (this._hzScrollBar && !this._floating) this._viewSize.y -= this._hzScrollBar.height;
        if (this._vtScrollBar && !this._floating) this._viewSize.x -= this._vtScrollBar.width;
        this._viewSize.x -= this._owner.margin.left + this._owner.margin.right;
        this._viewSize.y -= this._owner.margin.top + this._owner.margin.bottom;
        this._viewSize.x = Math.max(1, this._viewSize.x);
        this._viewSize.y = Math.max(1, this._viewSize.y);
        this._pageSize.x = this._viewSize.x;
        this._pageSize.y = this._viewSize.y;
        this.handleSizeChanged();
      }
    }, {
      key: "setContentSize",
      value: function setContentSize(aWidth, aHeight) {
        if (this._contentSize.x == aWidth && this._contentSize.y == aHeight) return;
        this._contentSize.x = aWidth;
        this._contentSize.y = aHeight;
        this.handleSizeChanged();
      }
    }, {
      key: "changeContentSizeOnScrolling",
      value: function changeContentSizeOnScrolling(deltaWidth, deltaHeight, deltaPosX, deltaPosY) {
        var isRightmost = this._xPos == this._overlapSize.x;
        var isBottom = this._yPos == this._overlapSize.y;
        this._contentSize.x += deltaWidth;
        this._contentSize.y += deltaHeight;
        this.handleSizeChanged();

        if (this._tweening == 1) {
          if (deltaWidth != 0 && isRightmost && this._tweenChange.x < 0) {
            this._xPos = this._overlapSize.x;
            this._tweenChange.x = -this._xPos - this._tweenStart.x;
          }

          if (deltaHeight != 0 && isBottom && this._tweenChange.y < 0) {
            this._yPos = this._overlapSize.y;
            this._tweenChange.y = -this._yPos - this._tweenStart.y;
          }
        } else if (this._tweening == 2) {
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
        } else if (this._dragged) {
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
        } else {
          if (deltaWidth != 0 && isRightmost) {
            this._xPos = this._overlapSize.x;
            this._container.x = -this._xPos;
          }

          if (deltaHeight != 0 && isBottom) {
            this._yPos = this._overlapSize.y;
            this._container.y = -this._yPos;
          }
        }

        if (this._pageMode) this.updatePageController();
      }
    }, {
      key: "handleSizeChanged",
      value: function handleSizeChanged() {
        if (this._displayInDemand) {
          this._vScrollNone = this._contentSize.y <= this._viewSize.y;
          this._hScrollNone = this._contentSize.x <= this._viewSize.x;
        }

        if (this._vtScrollBar) {
          if (this._contentSize.y == 0) this._vtScrollBar.setDisplayPerc(0);else this._vtScrollBar.setDisplayPerc(Math.min(1, this._viewSize.y / this._contentSize.y));
        }

        if (this._hzScrollBar) {
          if (this._contentSize.x == 0) this._hzScrollBar.setDisplayPerc(0);else this._hzScrollBar.setDisplayPerc(Math.min(1, this._viewSize.x / this._contentSize.x));
        }

        this.updateScrollBarVisible();
        var rect = this._maskContainer.clipRect;

        if (rect) {
          rect.width = this._viewSize.x;
          rect.height = this._viewSize.y;
          if (this._vScrollNone && this._vtScrollBar) rect.width += this._vtScrollBar.width;
          if (this._hScrollNone && this._hzScrollBar) rect.height += this._hzScrollBar.height;
          this._maskContainer.clipRect = rect;
        }

        if (this._scrollType == fgui.ScrollType.Horizontal || this._scrollType == fgui.ScrollType.Both) this._overlapSize.x = Math.ceil(Math.max(0, this._contentSize.x - this._viewSize.x));else this._overlapSize.x = 0;
        if (this._scrollType == fgui.ScrollType.Vertical || this._scrollType == fgui.ScrollType.Both) this._overlapSize.y = Math.ceil(Math.max(0, this._contentSize.y - this._viewSize.y));else this._overlapSize.y = 0;
        this._xPos = fgui.clamp(this._xPos, 0, this._overlapSize.x);
        this._yPos = fgui.clamp(this._yPos, 0, this._overlapSize.y);

        if (this._refreshBarAxis) {
          var max = this._overlapSize[this._refreshBarAxis];
          if (max == 0) max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);else max += this._footerLockedSize;

          if (this._refreshBarAxis == "x") {
            this._container.setPosition(fgui.clamp(this._container.x, -max, this._headerLockedSize), fgui.clamp(this._container.y, -this._overlapSize.y, 0));
          } else {
            this._container.setPosition(fgui.clamp(this._container.x, -this._overlapSize.x, 0), fgui.clamp(this._container.y, -max, this._headerLockedSize));
          }

          if (this._header) {
            if (this._refreshBarAxis == "x") this._header.height = this._viewSize.y;else this._header.width = this._viewSize.x;
          }

          if (this._footer) {
            if (this._refreshBarAxis == "y") this._footer.height = this._viewSize.y;else this._footer.width = this._viewSize.x;
          }
        } else {
          this._container.setPosition(fgui.clamp(this._container.x, -this._overlapSize.x, 0), fgui.clamp(this._container.y, -this._overlapSize.y, 0));
        }

        this.updateScrollBarPos();
        if (this._pageMode) this.updatePageController();
      }
    }, {
      key: "posChanged",
      value: function posChanged(ani) {
        if (this._aniFlag == 0) this._aniFlag = ani ? 1 : -1;else if (this._aniFlag == 1 && !ani) this._aniFlag = -1;
        this._needRefresh = true;
        fgui.Timers.callLater(this.refresh, this);
      }
    }, {
      key: "refresh",
      value: function refresh() {
        if (this._owner.displayObject == null) {
          return;
        }

        this._needRefresh = false;
        fgui.Timers.remove(this.refresh, this);

        if (this._pageMode || this._snapToItem) {
          s_endPos.set(-this._xPos, -this._yPos);
          this.alignPosition(s_endPos, false);
          this._xPos = -s_endPos.x;
          this._yPos = -s_endPos.y;
        }

        this.refresh2();

        this._owner.dispatchEvent(fgui.ScrollEvent.SCROLL);

        if (this._needRefresh) {
          this._needRefresh = false;
          fgui.Timers.remove(this.refresh, this);
          this.refresh2();
        }

        this.updateScrollBarPos();
        this._aniFlag = 0;
      }
    }, {
      key: "refresh2",
      value: function refresh2() {
        if (this._aniFlag == 1 && !this._dragged) {
          var posX;
          var posY;
          if (this._overlapSize.x > 0) posX = -Math.floor(this._xPos);else {
            if (this._container.x != 0) this._container.x = 0;
            posX = 0;
          }
          if (this._overlapSize.y > 0) posY = -Math.floor(this._yPos);else {
            if (this._container.y != 0) this._container.y = 0;
            posY = 0;
          }

          if (posX != this._container.x || posY != this._container.y) {
            this._tweenDuration.set(TWEEN_TIME_GO, TWEEN_TIME_GO);

            this._tweenStart.set(this._container.x, this._container.y);

            this._tweenChange.set(posX - this._tweenStart.x, posY - this._tweenStart.y);

            this.startTween(1);
          } else if (this._tweening != 0) this.killTween();
        } else {
          if (this._tweening != 0) this.killTween();

          this._container.setPosition(Math.floor(-this._xPos), Math.floor(-this._yPos));

          this.loopCheckingCurrent();
        }

        if (this._pageMode) this.updatePageController();
      }
    }, {
      key: "__touchBegin",
      value: function __touchBegin(evt) {
        if (!this._touchEffect) return;
        if (evt.input.button != 0) return;
        evt.captureTouch();

        if (this._tweening != 0) {
          this.killTween();
          fgui.Stage.cancelClick(evt.input.touchId);
          this._dragged = true;
        } else this._dragged = false;

        var pt = this._owner.globalToLocal(evt.input.x, evt.input.y, s_vec2);

        this._containerPos.set(this._container.x, this._container.y);

        this._beginTouchPos.set(pt.x, pt.y);

        this._lastTouchPos.set(pt.x, pt.y);

        this._lastTouchGlobalPos.set(evt.input.x, evt.input.y);

        this._isHoldAreaDone = false;

        this._velocity.set(0, 0);

        this._velocityScale = 1;
        this._lastMoveTime = performance.now() / 1000;
      }
    }, {
      key: "__touchMove",
      value: function __touchMove(evt) {
        if (!this._touchEffect || this.owner.isDisposed) return;
        if (ScrollPane.draggingPane && ScrollPane.draggingPane != this || fgui.GObject.draggingObject) return;
        var sensitivity = fgui.UIConfig.touchScrollSensitivity;

        var pt = this._owner.globalToLocal(evt.input.x, evt.input.y);

        var diff;
        var sv, sh;

        if (this._scrollType == fgui.ScrollType.Vertical) {
          if (!this._isHoldAreaDone) {
            s_gestureFlag |= 1;
            diff = Math.abs(this._beginTouchPos.y - pt.y);
            if (diff < sensitivity) return;

            if ((s_gestureFlag & 2) != 0) {
              var diff2 = Math.abs(this._beginTouchPos.x - pt.x);
              if (diff < diff2) return;
            }
          }

          sv = true;
        } else if (this._scrollType == fgui.ScrollType.Horizontal) {
          if (!this._isHoldAreaDone) {
            s_gestureFlag |= 2;
            diff = Math.abs(this._beginTouchPos.x - pt.x);
            if (diff < sensitivity) return;

            if ((s_gestureFlag & 1) != 0) {
              var _diff2 = Math.abs(this._beginTouchPos.y - pt.y);

              if (diff < _diff2) return;
            }
          }

          sh = true;
        } else {
          s_gestureFlag = 3;

          if (!this._isHoldAreaDone) {
            diff = Math.abs(this._beginTouchPos.y - pt.y);

            if (diff < sensitivity) {
              diff = Math.abs(this._beginTouchPos.x - pt.x);
              if (diff < sensitivity) return;
            }
          }

          sv = sh = true;
        }

        var newPosX = Math.floor(this._containerPos.x + pt.x - this._beginTouchPos.x);
        var newPosY = Math.floor(this._containerPos.y + pt.y - this._beginTouchPos.y);

        if (sv) {
          if (newPosY > 0) {
            if (!this._bouncebackEffect) this._container.y = 0;else if (this._header && this._header.maxHeight != 0) this._container.y = Math.floor(Math.min(newPosY * 0.5, this._header.maxHeight));else this._container.y = Math.floor(Math.min(newPosY * 0.5, this._viewSize.y * PULL_RATIO));
          } else if (newPosY < -this._overlapSize.y) {
            if (!this._bouncebackEffect) this._container.y = -this._overlapSize.y;else if (this._footer && this._footer.maxHeight > 0) this._container.y = Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._footer.maxHeight) - this._overlapSize.y);else this._container.y = Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._viewSize.y * PULL_RATIO) - this._overlapSize.y);
          } else this._container.y = newPosY;
        }

        if (sh) {
          if (newPosX > 0) {
            if (!this._bouncebackEffect) this._container.x = 0;else if (this._header && this._header.maxWidth != 0) this._container.x = Math.floor(Math.min(newPosX * 0.5, this._header.maxWidth));else this._container.x = Math.floor(Math.min(newPosX * 0.5, this._viewSize.x * PULL_RATIO));
          } else if (newPosX < 0 - this._overlapSize.x) {
            if (!this._bouncebackEffect) this._container.x = -this._overlapSize.x;else if (this._footer && this._footer.maxWidth > 0) this._container.x = Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._footer.maxWidth) - this._overlapSize.x);else this._container.x = Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._viewSize.x * PULL_RATIO) - this._overlapSize.x);
          } else this._container.x = newPosX;
        }

        var frameRate = 60;
        var now = performance.now() / 1000;
        var deltaTime = Math.max(now - this._lastMoveTime, 1 / frameRate);
        var deltaPositionX = pt.x - this._lastTouchPos.x;
        var deltaPositionY = pt.y - this._lastTouchPos.y;
        if (!sh) deltaPositionX = 0;
        if (!sv) deltaPositionY = 0;

        if (deltaTime != 0) {
          var elapsed = deltaTime * frameRate - 1;

          if (elapsed > 1) {
            var factor = Math.pow(0.833, elapsed);
            this._velocity.x = this._velocity.x * factor;
            this._velocity.y = this._velocity.y * factor;
          }

          this._velocity.x = fgui.lerp(this._velocity.x, deltaPositionX * 60 / frameRate / deltaTime, deltaTime * 10);
          this._velocity.y = fgui.lerp(this._velocity.y, deltaPositionY * 60 / frameRate / deltaTime, deltaTime * 10);
        }

        var deltaGlobalPositionX = this._lastTouchGlobalPos.x - evt.input.x;
        var deltaGlobalPositionY = this._lastTouchGlobalPos.y - evt.input.y;
        if (deltaPositionX != 0) this._velocityScale = Math.abs(deltaGlobalPositionX / deltaPositionX);else if (deltaPositionY != 0) this._velocityScale = Math.abs(deltaGlobalPositionY / deltaPositionY);

        this._lastTouchPos.set(pt.x, pt.y);

        this._lastTouchGlobalPos.set(evt.input.x, evt.input.y);

        this._lastMoveTime = now;
        if (this._overlapSize.x > 0) this._xPos = fgui.clamp(-this._container.x, 0, this._overlapSize.x);
        if (this._overlapSize.y > 0) this._yPos = fgui.clamp(-this._container.y, 0, this._overlapSize.y);

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
        if (this._pageMode) this.updatePageController();

        this._owner.dispatchEvent(fgui.ScrollEvent.SCROLL);
      }
    }, {
      key: "__touchEnd",
      value: function __touchEnd() {
        if (ScrollPane.draggingPane == this) ScrollPane.draggingPane = null;
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
        } else if (this._container.x < -this._overlapSize.x) {
          s_endPos.x = -this._overlapSize.x;
          flag = true;
        }

        if (this._container.y > 0) {
          s_endPos.y = 0;
          flag = true;
        } else if (this._container.y < -this._overlapSize.y) {
          s_endPos.y = -this._overlapSize.y;
          flag = true;
        }

        if (flag) {
          this._tweenChange.set(s_endPos.x - this._tweenStart.x, s_endPos.y - this._tweenStart.y);

          if (this._tweenChange.x < -fgui.UIConfig.touchDragSensitivity || this._tweenChange.y < -fgui.UIConfig.touchDragSensitivity) {
            this._refreshEventDispatching = true;

            this._owner.dispatchEvent(fgui.ScrollEvent.PULL_DOWN_RELEASE);

            this._refreshEventDispatching = false;
          } else if (this._tweenChange.x > fgui.UIConfig.touchDragSensitivity || this._tweenChange.y > fgui.UIConfig.touchDragSensitivity) {
            this._refreshEventDispatching = true;

            this._owner.dispatchEvent(fgui.ScrollEvent.PULL_UP_RELEASE);

            this._refreshEventDispatching = false;
          }

          if (this._headerLockedSize > 0 && s_endPos[this._refreshBarAxis] == 0) {
            s_endPos[this._refreshBarAxis] = this._headerLockedSize;
            this._tweenChange.x = s_endPos.x - this._tweenStart.x;
            this._tweenChange.y = s_endPos.y - this._tweenStart.y;
          } else if (this._footerLockedSize > 0 && s_endPos[this._refreshBarAxis] == -this._overlapSize[this._refreshBarAxis]) {
            var max = this._overlapSize[this._refreshBarAxis];
            if (max == 0) max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);else max += this._footerLockedSize;
            s_endPos[this._refreshBarAxis] = -max;
            this._tweenChange.x = s_endPos.x - this._tweenStart.x;
            this._tweenChange.y = s_endPos.y - this._tweenStart.y;
          }

          this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);
        } else {
          if (!this._inertiaDisabled) {
            var frameRate = 60;
            var elapsed = (performance.now() / 1000 - this._lastMoveTime) * frameRate - 1;

            if (elapsed > 1) {
              var factor = Math.pow(0.833, elapsed);
              this._velocity.x = this._velocity.x * factor;
              this._velocity.y = this._velocity.y * factor;
            }

            this.updateTargetAndDuration(this._tweenStart, s_endPos);
          } else this._tweenDuration.set(TWEEN_TIME_DEFAULT, TWEEN_TIME_DEFAULT);

          s_oldChange.set(s_endPos.x - this._tweenStart.x, s_endPos.y - this._tweenStart.y);
          this.loopCheckingTarget(s_endPos);
          if (this._pageMode || this._snapToItem) this.alignPosition(s_endPos, true);
          this._tweenChange.x = s_endPos.x - this._tweenStart.x;
          this._tweenChange.y = s_endPos.y - this._tweenStart.y;

          if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
            this.updateScrollBarVisible();
            return;
          }

          if (this._pageMode || this._snapToItem) {
            this.fixDuration("x", s_oldChange.x);
            this.fixDuration("y", s_oldChange.y);
          }
        }

        this.startTween(2);
      }
    }, {
      key: "__mouseWheel",
      value: function __mouseWheel(evt) {
        if (!this._mouseWheelEnabled) return;
        var delta = evt.input.mouseWheelDelta / window.devicePixelRatio;
        if (this._snapToItem && Math.abs(delta) < 1) delta = Math.sign(delta);

        if (this._overlapSize.x > 0 && this._overlapSize.y == 0) {
          var step = this._pageMode ? this._pageSize.x : this._scrollStep;
          this.setPosX(this._xPos + step * delta, false);
        } else {
          var _step = this._pageMode ? this._pageSize.y : this._scrollStep;

          this.setPosY(this._yPos + _step * delta, false);
        }
      }
    }, {
      key: "updateScrollBarPos",
      value: function updateScrollBarPos() {
        if (this._vtScrollBar) this._vtScrollBar.setScrollPerc(this._overlapSize.y == 0 ? 0 : fgui.clamp(-this._container.y, 0, this._overlapSize.y) / this._overlapSize.y);
        if (this._hzScrollBar) this._hzScrollBar.setScrollPerc(this._overlapSize.x == 0 ? 0 : fgui.clamp(-this._container.x, 0, this._overlapSize.x) / this._overlapSize.x);
        this.checkRefreshBar();
      }
    }, {
      key: "updateScrollBarVisible",
      value: function updateScrollBarVisible() {
        if (this._vtScrollBar) {
          if (this._viewSize.y <= this._vtScrollBar.minSize || this._vScrollNone) this._vtScrollBar.displayObject.visible = false;else this.updateScrollBarVisible2(this._vtScrollBar);
        }

        if (this._hzScrollBar) {
          if (this._viewSize.x <= this._hzScrollBar.minSize || this._hScrollNone) this._hzScrollBar.displayObject.visible = false;else this.updateScrollBarVisible2(this._hzScrollBar);
        }
      }
    }, {
      key: "updateScrollBarVisible2",
      value: function updateScrollBarVisible2(bar) {
        if (this._scrollBarDisplayAuto) fgui.GTween.kill(bar, false, "alpha");

        if (this._scrollBarDisplayAuto && this._tweening == 0 && !this._dragged && !bar.gripDragging) {
          if (bar.displayObject.visible) fgui.GTween.to(1, 0, 0.5).setDelay(0.5).onComplete(this.__barTweenComplete, this).setTarget(bar, "alpha");
        } else {
          bar.alpha = 1;
          bar.displayObject.visible = true;
        }
      }
    }, {
      key: "__barTweenComplete",
      value: function __barTweenComplete(tweener) {
        var bar = tweener.target;
        bar.alpha = 1;
        bar.displayObject.visible = false;
      }
    }, {
      key: "getLoopPartSize",
      value: function getLoopPartSize(division, axis) {
        return (this._contentSize[axis] + (axis == "x" ? this._owner.columnGap : this._owner.lineGap)) / division;
      }
    }, {
      key: "loopCheckingCurrent",
      value: function loopCheckingCurrent() {
        var changed = false;

        if (this._loop == 1 && this._overlapSize.x > 0) {
          if (this._xPos < 0.001) {
            this._xPos += this.getLoopPartSize(2, "x");
            changed = true;
          } else if (this._xPos >= this._overlapSize.x) {
            this._xPos -= this.getLoopPartSize(2, "x");
            changed = true;
          }
        } else if (this._loop == 2 && this._overlapSize.y > 0) {
          if (this._yPos < 0.001) {
            this._yPos += this.getLoopPartSize(2, "y");
            changed = true;
          } else if (this._yPos >= this._overlapSize.y) {
            this._yPos -= this.getLoopPartSize(2, "y");
            changed = true;
          }
        }

        if (changed) this._container.setPosition(Math.floor(-this._xPos), Math.floor(-this._yPos));
        return changed;
      }
    }, {
      key: "loopCheckingTarget",
      value: function loopCheckingTarget(endPos) {
        if (this._loop == 1) this.loopCheckingTarget2(endPos, "x");
        if (this._loop == 2) this.loopCheckingTarget2(endPos, "y");
      }
    }, {
      key: "loopCheckingTarget2",
      value: function loopCheckingTarget2(endPos, axis) {
        var halfSize;
        var tmp;

        if (endPos[axis] > 0) {
          halfSize = this.getLoopPartSize(2, axis);
          tmp = this._tweenStart[axis] - halfSize;

          if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
            endPos[axis] -= halfSize;
            this._tweenStart[axis] = tmp;
          }
        } else if (endPos[axis] < -this._overlapSize[axis]) {
          halfSize = this.getLoopPartSize(2, axis);
          tmp = this._tweenStart[axis] + halfSize;

          if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
            endPos[axis] += halfSize;
            this._tweenStart[axis] = tmp;
          }
        }
      }
    }, {
      key: "loopCheckingNewPos",
      value: function loopCheckingNewPos(value, axis) {
        if (this._overlapSize[axis] == 0) return value;
        var pos = axis == "x" ? this._xPos : this._yPos;
        var changed = false;
        var v;

        if (value < 0.001) {
          value += this.getLoopPartSize(2, axis);

          if (value > pos) {
            v = this.getLoopPartSize(6, axis);
            v = Math.ceil((value - pos) / v) * v;
            pos = fgui.clamp(pos + v, 0, this._overlapSize[axis]);
            changed = true;
          }
        } else if (value >= this._overlapSize[axis]) {
          value -= this.getLoopPartSize(2, axis);

          if (value < pos) {
            v = this.getLoopPartSize(6, axis);
            v = Math.ceil((pos - value) / v) * v;
            pos = fgui.clamp(pos - v, 0, this._overlapSize[axis]);
            changed = true;
          }
        }

        if (changed) {
          if (axis == "x") this._container.x = -Math.floor(pos);else this._container.y = -Math.floor(pos);
        }

        return value;
      }
    }, {
      key: "alignPosition",
      value: function alignPosition(pos, inertialScrolling) {
        if (this._pageMode) {
          pos.x = this.alignByPage(pos.x, "x", inertialScrolling);
          pos.y = this.alignByPage(pos.y, "y", inertialScrolling);
        } else if (this._snapToItem) {
          var xDir = 0;
          var yDir = 0;

          if (inertialScrolling) {
            xDir = pos.x - this._containerPos.x;
            yDir = pos.y - this._containerPos.y;
          }

          var pt = this._owner.getSnappingPositionWithDir(-pos.x, -pos.y, xDir, yDir, s_vec2);

          if (pos.x < 0 && pos.x > -this._overlapSize.x) pos.x = -pt.x;
          if (pos.y < 0 && pos.y > -this._overlapSize.y) pos.y = -pt.y;
        }
      }
    }, {
      key: "alignByPage",
      value: function alignByPage(pos, axis, inertialScrolling) {
        var page;
        if (pos > 0) page = 0;else if (pos < -this._overlapSize[axis]) page = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;else {
          page = Math.floor(-pos / this._pageSize[axis]);
          var change = inertialScrolling ? pos - this._containerPos[axis] : pos - this._container[axis];
          var testPageSize = Math.min(this._pageSize[axis], this._contentSize[axis] - (page + 1) * this._pageSize[axis]);
          var delta = -pos - page * this._pageSize[axis];

          if (Math.abs(change) > this._pageSize[axis]) {
            if (delta > testPageSize * 0.5) page++;
          } else {
            if (delta > testPageSize * (change < 0 ? fgui.UIConfig.defaultScrollPagingThreshold : 1 - fgui.UIConfig.defaultScrollPagingThreshold)) page++;
          }

          pos = -page * this._pageSize[axis];
          if (pos < -this._overlapSize[axis]) pos = -this._overlapSize[axis];
        }

        if (inertialScrolling) {
          var oldPos = this._tweenStart[axis];
          var oldPage;
          if (oldPos > 0) oldPage = 0;else if (oldPos < -this._overlapSize[axis]) oldPage = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;else oldPage = Math.floor(-oldPos / this._pageSize[axis]);
          var startPage = Math.floor(-this._containerPos[axis] / this._pageSize[axis]);

          if (Math.abs(page - startPage) > 1 && Math.abs(oldPage - startPage) <= 1) {
            if (page > startPage) page = startPage + 1;else page = startPage - 1;
            pos = -page * this._pageSize[axis];
          }
        }

        return pos;
      }
    }, {
      key: "updateTargetAndDuration",
      value: function updateTargetAndDuration(orignPos, resultPos) {
        resultPos.x = this.updateTargetAndDuration2(orignPos.x, "x");
        resultPos.y = this.updateTargetAndDuration2(orignPos.y, "y");
      }
    }, {
      key: "updateTargetAndDuration2",
      value: function updateTargetAndDuration2(pos, axis) {
        var v = this._velocity[axis];
        var duration = 0;
        if (pos > 0) pos = 0;else if (pos < -this._overlapSize[axis]) pos = -this._overlapSize[axis];else {
          var v2 = Math.abs(v) * this._velocityScale;

          if (fgui.Stage.touchScreen) v2 *= 1136 / Math.max(window.screen.width, window.screen.height);
          var ratio = 0;

          if (this._pageMode || !fgui.Stage.touchScreen) {
            if (v2 > 500) ratio = Math.pow((v2 - 500) / 500, 2);
          } else {
            if (v2 > 1000) ratio = Math.pow((v2 - 1000) / 1000, 2);
          }

          if (ratio != 0) {
            if (ratio > 1) ratio = 1;
            v2 *= ratio;
            v *= ratio;
            this._velocity[axis] = v;
            duration = Math.log(60 / v2) / Math.log(this._decelerationRate) / 60;
            var change = Math.floor(v * duration * 0.4);
            pos += change;
          }
        }
        if (duration < TWEEN_TIME_DEFAULT) duration = TWEEN_TIME_DEFAULT;
        this._tweenDuration[axis] = duration;
        return pos;
      }
    }, {
      key: "fixDuration",
      value: function fixDuration(axis, oldChange) {
        if (this._tweenChange[axis] == 0 || Math.abs(this._tweenChange[axis]) >= Math.abs(oldChange)) return;

        var newDuration = Math.abs(this._tweenChange[axis] / oldChange) * this._tweenDuration[axis];

        if (newDuration < TWEEN_TIME_DEFAULT) newDuration = TWEEN_TIME_DEFAULT;
        this._tweenDuration[axis] = newDuration;
      }
    }, {
      key: "startTween",
      value: function startTween(type) {
        this._tweenTime.set(0, 0);

        this._tweening = type;
        fgui.Timers.addUpdate(this.tweenUpdate, this);
        this.updateScrollBarVisible();
      }
    }, {
      key: "killTween",
      value: function killTween() {
        if (this._tweening == 1) {
          this._container.setPosition(this._tweenStart.x + this._tweenChange.x, this._tweenStart.y + this._tweenChange.y);

          this._owner.dispatchEvent(fgui.ScrollEvent.SCROLL);
        }

        this._tweening = 0;
        fgui.Timers.remove(this.tweenUpdate, this);
        this.updateScrollBarVisible();

        this._owner.dispatchEvent(fgui.ScrollEvent.SCROLL_END);
      }
    }, {
      key: "checkRefreshBar",
      value: function checkRefreshBar() {
        if (this._header == null && this._footer == null) return;
        var pos = this._container[this._refreshBarAxis];

        if (this._header) {
          if (pos > 0) {
            if (this._header.displayObject.parent == null) this._maskContainer.addChildAt(this._header.displayObject, 0);
            var pt = s_vec2;
            pt.set(this._header.width, this._header.height);
            pt[this._refreshBarAxis] = pos;

            this._header.setSize(pt.x, pt.y);
          } else {
            if (this._header.displayObject.parent) this._maskContainer.removeChild(this._header.displayObject);
          }
        }

        if (this._footer) {
          var max = this._overlapSize[this._refreshBarAxis];

          if (pos < -max || max == 0 && this._footerLockedSize > 0) {
            if (this._footer.displayObject.parent == null) this._maskContainer.addChildAt(this._footer.displayObject, 0);
            pt = s_vec2;
            pt.set(this._footer.x, this._footer.y);
            if (max > 0) pt[this._refreshBarAxis] = pos + this._contentSize[this._refreshBarAxis];else pt[this._refreshBarAxis] = Math.max(Math.min(pos + this._viewSize[this._refreshBarAxis], this._viewSize[this._refreshBarAxis] - this._footerLockedSize), this._viewSize[this._refreshBarAxis] - this._contentSize[this._refreshBarAxis]);

            this._footer.setPosition(pt.x, pt.y);

            pt.set(this._footer.width, this._footer.height);
            if (max > 0) pt[this._refreshBarAxis] = -max - pos;else pt[this._refreshBarAxis] = this._viewSize[this._refreshBarAxis] - this._footer[this._refreshBarAxis];

            this._footer.setSize(pt.x, pt.y);
          } else {
            if (this._footer.displayObject.parent) this._maskContainer.removeChild(this._footer.displayObject);
          }
        }
      }
    }, {
      key: "tweenUpdate",
      value: function tweenUpdate() {
        var nx = this.runTween("x");
        var ny = this.runTween("y");

        this._container.setPosition(nx, ny);

        if (this._tweening == 2) {
          if (this._overlapSize.x > 0) this._xPos = fgui.clamp(-nx, 0, this._overlapSize.x);
          if (this._overlapSize.y > 0) this._yPos = fgui.clamp(-ny, 0, this._overlapSize.y);
          if (this._pageMode) this.updatePageController();
        }

        if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
          this._tweening = 0;
          fgui.Timers.remove(this.tweenUpdate, this);
          this.loopCheckingCurrent();
          this.updateScrollBarPos();
          this.updateScrollBarVisible();

          this._owner.dispatchEvent(fgui.ScrollEvent.SCROLL);

          this._owner.dispatchEvent(fgui.ScrollEvent.SCROLL_END);
        } else {
          this.updateScrollBarPos();

          this._owner.dispatchEvent(fgui.ScrollEvent.SCROLL);
        }
      }
    }, {
      key: "runTween",
      value: function runTween(axis) {
        var newValue;

        if (this._tweenChange[axis] != 0) {
          this._tweenTime[axis] += fgui.Timers.deltaTime / 1000;

          if (this._tweenTime[axis] >= this._tweenDuration[axis]) {
            newValue = this._tweenStart[axis] + this._tweenChange[axis];
            this._tweenChange[axis] = 0;
          } else {
            var ratio = easeFunc(this._tweenTime[axis], this._tweenDuration[axis]);
            newValue = this._tweenStart[axis] + Math.floor(this._tweenChange[axis] * ratio);
          }

          var threshold1 = 0;
          var threshold2 = -this._overlapSize[axis];
          if (this._headerLockedSize > 0 && this._refreshBarAxis == axis) threshold1 = this._headerLockedSize;

          if (this._footerLockedSize > 0 && this._refreshBarAxis == axis) {
            var max = this._overlapSize[this._refreshBarAxis];
            if (max == 0) max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);else max += this._footerLockedSize;
            threshold2 = -max;
          }

          if (this._tweening == 2 && this._bouncebackEffect) {
            if (newValue > 20 + threshold1 && this._tweenChange[axis] > 0 || newValue > threshold1 && this._tweenChange[axis] == 0) {
              this._tweenTime[axis] = 0;
              this._tweenDuration[axis] = TWEEN_TIME_DEFAULT;
              this._tweenChange[axis] = -newValue + threshold1;
              this._tweenStart[axis] = newValue;
            } else if (newValue < threshold2 - 20 && this._tweenChange[axis] < 0 || newValue < threshold2 && this._tweenChange[axis] == 0) {
              this._tweenTime[axis] = 0;
              this._tweenDuration[axis] = TWEEN_TIME_DEFAULT;
              this._tweenChange[axis] = threshold2 - newValue;
              this._tweenStart[axis] = newValue;
            }
          } else {
            if (newValue > threshold1) {
              newValue = threshold1;
              this._tweenChange[axis] = 0;
            } else if (newValue < threshold2) {
              newValue = threshold2;
              this._tweenChange[axis] = 0;
            }
          }
        } else newValue = this._container[axis];

        return newValue;
      }
    }, {
      key: "owner",
      get: function get() {
        return this._owner;
      }
    }, {
      key: "hzScrollBar",
      get: function get() {
        return this._hzScrollBar;
      }
    }, {
      key: "vtScrollBar",
      get: function get() {
        return this._vtScrollBar;
      }
    }, {
      key: "header",
      get: function get() {
        return this._header;
      }
    }, {
      key: "footer",
      get: function get() {
        return this._footer;
      }
    }, {
      key: "bouncebackEffect",
      get: function get() {
        return this._bouncebackEffect;
      },
      set: function set(sc) {
        this._bouncebackEffect = sc;
      }
    }, {
      key: "touchEffect",
      get: function get() {
        return this._touchEffect;
      },
      set: function set(sc) {
        this._touchEffect = sc;
      }
    }, {
      key: "scrollStep",
      set: function set(val) {
        this._scrollStep = val;
        if (this._scrollStep == 0) this._scrollStep = fgui.UIConfig.defaultScrollStep;
      },
      get: function get() {
        return this._scrollStep;
      }
    }, {
      key: "snapToItem",
      get: function get() {
        return this._snapToItem;
      },
      set: function set(value) {
        this._snapToItem = value;
      }
    }, {
      key: "mouseWheelEnabled",
      get: function get() {
        return this._mouseWheelEnabled;
      },
      set: function set(value) {
        this._mouseWheelEnabled = value;
      }
    }, {
      key: "decelerationRate",
      get: function get() {
        return this._decelerationRate;
      },
      set: function set(value) {
        this._decelerationRate = value;
      }
    }, {
      key: "isDragged",
      get: function get() {
        return this._dragged;
      }
    }, {
      key: "percX",
      get: function get() {
        return this._overlapSize.x == 0 ? 0 : this._xPos / this._overlapSize.x;
      },
      set: function set(value) {
        this.setPercX(value, false);
      }
    }, {
      key: "percY",
      get: function get() {
        return this._overlapSize.y == 0 ? 0 : this._yPos / this._overlapSize.y;
      },
      set: function set(value) {
        this.setPercY(value, false);
      }
    }, {
      key: "posX",
      get: function get() {
        return this._xPos;
      },
      set: function set(value) {
        this.setPosX(value, false);
      }
    }, {
      key: "posY",
      get: function get() {
        return this._yPos;
      },
      set: function set(value) {
        this.setPosY(value, false);
      }
    }, {
      key: "contentWidth",
      get: function get() {
        return this._contentSize.x;
      }
    }, {
      key: "contentHeight",
      get: function get() {
        return this._contentSize.y;
      }
    }, {
      key: "viewWidth",
      get: function get() {
        return this._viewSize.x;
      },
      set: function set(value) {
        value = value + this._owner.margin.left + this._owner.margin.right;
        if (this._vtScrollBar && !this._floating) value += this._vtScrollBar.width;
        this._owner.width = value;
      }
    }, {
      key: "viewHeight",
      get: function get() {
        return this._viewSize.y;
      },
      set: function set(value) {
        value = value + this._owner.margin.top + this._owner.margin.bottom;
        if (this._hzScrollBar && !this._floating) value += this._hzScrollBar.height;
        this._owner.height = value;
      }
    }, {
      key: "currentPageX",
      get: function get() {
        if (!this._pageMode) return 0;
        var page = Math.floor(this._xPos / this._pageSize.x);
        if (this._xPos - page * this._pageSize.x > this._pageSize.x * 0.5) page++;
        return page;
      },
      set: function set(value) {
        this.setCurrentPageX(value, false);
      }
    }, {
      key: "currentPageY",
      get: function get() {
        if (!this._pageMode) return 0;
        var page = Math.floor(this._yPos / this._pageSize.y);
        if (this._yPos - page * this._pageSize.y > this._pageSize.y * 0.5) page++;
        return page;
      },
      set: function set(value) {
        this.setCurrentPageY(value, false);
      }
    }, {
      key: "isBottomMost",
      get: function get() {
        return this._yPos == this._overlapSize.y || this._overlapSize.y == 0;
      }
    }, {
      key: "isRightMost",
      get: function get() {
        return this._xPos == this._overlapSize.x || this._overlapSize.x == 0;
      }
    }, {
      key: "pageController",
      get: function get() {
        return this._pageController;
      },
      set: function set(value) {
        this._pageController = value;
      }
    }, {
      key: "scrollingPosX",
      get: function get() {
        return fgui.clamp(-this._container.x, 0, this._overlapSize.x);
      }
    }, {
      key: "scrollingPosY",
      get: function get() {
        return fgui.clamp(-this._container.y, 0, this._overlapSize.y);
      }
    }]);

    return ScrollPane;
  }();

  fgui.ScrollPane = ScrollPane;

  function easeFunc(t, d) {
    return (t = t / d - 1) * t * t + 1;
  }
})(fgui || (fgui = {}));

(function (fgui) {
  var OPTION_IGNORE_DISPLAY_CONTROLLER = 1;
  var OPTION_AUTO_STOP_DISABLED = 2;
  var OPTION_AUTO_STOP_AT_END = 4;

  var Transition = /*#__PURE__*/function () {
    function Transition(owner) {
      _classCallCheck(this, Transition);

      this._owner = owner;
      this._items = new Array();
      this._totalDuration = 0;
      this._autoPlayTimes = 1;
      this._autoPlayDelay = 0;
      this._timeScale = 1;
      this._startTime = 0;
      this._endTime = 0;
    }

    _createClass(Transition, [{
      key: "play",
      value: function play(onComplete, times, delay, startTime, endTime) {
        this._play(onComplete, times, delay, startTime, endTime, false);
      }
    }, {
      key: "playReverse",
      value: function playReverse(onComplete, times, delay, startTime, endTime) {
        this._play(onComplete, times, delay, startTime, endTime, true);
      }
    }, {
      key: "changePlayTimes",
      value: function changePlayTimes(value) {
        this._totalTimes = value;
      }
    }, {
      key: "setAutoPlay",
      value: function setAutoPlay(value, times, delay) {
        if (this._autoPlay != value) {
          this._autoPlay = value;
          this._autoPlayTimes = times || 1;
          this._autoPlayDelay = delay || 0;

          if (this._autoPlay) {
            if (this._owner.onStage) this.play(null, null, this._autoPlayTimes, this._autoPlayDelay);
          } else {
            if (!this._owner.onStage) this.stop(false, true);
          }
        }
      }
    }, {
      key: "_play",
      value: function _play(onComplete, times, delay, startTime, endTime, reversed) {
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
            if (item.targetId) item.target = this._owner.getChildById(item.targetId);else item.target = this._owner;
          } else if (item.target != this._owner && item.target.parent != this._owner) item.target = null;

          if (item.target && item.type == ActionType.Transition) {
            var trans = item.target.getTransition(item.value.transName);
            if (trans == this) trans = null;

            if (trans) {
              if (item.value.playTimes == 0) {
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

                if (j < 0) item.value.stopTime = 0;else trans = null;
              } else item.value.stopTime = -1;
            }

            item.value.trans = trans;
          }
        }

        if (delay == 0) this.onDelayedPlay();else fgui.GTween.delayedCall(delay).onComplete(this.onDelayedPlay, this);
      }
    }, {
      key: "stop",
      value: function stop(setToComplete, processCallback) {
        if (!this._playing) return;
        if (setToComplete == null) setToComplete = true;
        this._playing = false;
        this._totalTasks = 0;
        this._totalTimes = 0;
        var handler = this._onComplete;
        this._onComplete = null;
        fgui.GTween.kill(this);
        var cnt = this._items.length;

        if (this._reversed) {
          for (var i = cnt - 1; i >= 0; i--) {
            var item = this._items[i];
            if (item.target == null) continue;
            this.stopItem(item, setToComplete);
          }
        } else {
          for (i = 0; i < cnt; i++) {
            item = this._items[i];
            if (item.target == null) continue;
            this.stopItem(item, setToComplete);
          }
        }

        if (processCallback && handler) {
          handler();
        }
      }
    }, {
      key: "stopItem",
      value: function stopItem(item, setToComplete) {
        if (item.displayLockToken != 0) {
          item.target.releaseDisplayLock(item.displayLockToken);
          item.displayLockToken = 0;
        }

        if (item.tweener) {
          item.tweener.kill(setToComplete);
          item.tweener = null;

          if (item.type == ActionType.Shake && !setToComplete) {
            item.target._gearLocked = true;
            item.target.setPosition(item.target.x - item.value.lastOffsetX, item.target.y - item.value.lastOffsetY);
            item.target._gearLocked = false;
          }
        }

        if (item.type == ActionType.Transition) {
          var trans = item.value.trans;
          if (trans) trans.stop(setToComplete, false);
        }
      }
    }, {
      key: "setPaused",
      value: function setPaused(paused) {
        if (!this._playing || this._paused == paused) return;
        this._paused = paused;
        var tweener = fgui.GTween.getTween(this);
        if (tweener) tweener.setPaused(paused);
        var cnt = this._items.length;

        for (var i = 0; i < cnt; i++) {
          var item = this._items[i];
          if (item.target == null) continue;

          if (item.type == ActionType.Transition) {
            if (item.value.trans) item.value.trans.setPaused(paused);
          } else if (item.type == ActionType.Animation) {
            if (paused) {
              item.value.flag = item.target.getProp(fgui.ObjectPropID.Playing);
              item.target.setProp(fgui.ObjectPropID.Playing, false);
            } else item.target.setProp(fgui.ObjectPropID.Playing, item.value.flag);
          }

          if (item.tweener) item.tweener.setPaused(paused);
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (this._playing) fgui.GTween.kill(this);
        var cnt = this._items.length;

        for (var i = 0; i < cnt; i++) {
          var item = this._items[i];

          if (item.tweener) {
            item.tweener.kill();
            item.tweener = null;
          }

          item.target = null;
          item.hook = null;
          if (item.tweenConfig) item.tweenConfig.endHook = null;
        }

        this._items.length = 0;
        this._playing = false;
        this._onComplete = null;
      }
    }, {
      key: "setValue",
      value: function setValue(label) {
        var cnt = this._items.length;
        var found = false;
        var value;

        for (var i = 0; i < cnt; i++) {
          var item = this._items[i];

          if (item.label == label) {
            if (item.tweenConfig) value = item.tweenConfig.startValue;else value = item.value;
            found = true;
          } else if (item.tweenConfig && item.tweenConfig.endLabel == label) {
            value = item.tweenConfig.endValue;
            found = true;
          } else continue;

          switch (item.type) {
            case ActionType.XY:
            case ActionType.Size:
            case ActionType.Pivot:
            case ActionType.Scale:
            case ActionType.Skew:
              value.b1 = true;
              value.b2 = true;
              value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
              value.f2 = parseFloat(arguments.length <= 2 ? undefined : arguments[2]);
              break;

            case ActionType.Alpha:
              value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
              break;

            case ActionType.Rotation:
              value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
              break;

            case ActionType.Color:
              value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
              break;

            case ActionType.Animation:
              value.frame = parseInt(arguments.length <= 1 ? undefined : arguments[1]);
              if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) value.playing = arguments.length <= 2 ? undefined : arguments[2];
              break;

            case ActionType.Visible:
              value.visible = arguments.length <= 1 ? undefined : arguments[1];
              break;

            case ActionType.Sound:
              value.sound = arguments.length <= 1 ? undefined : arguments[1];
              if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) value.volume = parseFloat(arguments.length <= 2 ? undefined : arguments[2]);
              break;

            case ActionType.Transition:
              value.transName = arguments.length <= 1 ? undefined : arguments[1];
              if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) value.playTimes = parseInt(arguments.length <= 2 ? undefined : arguments[2]);
              break;

            case ActionType.Shake:
              value.amplitude = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
              if ((arguments.length <= 1 ? 0 : arguments.length - 1) > 1) value.duration = parseFloat(arguments.length <= 2 ? undefined : arguments[2]);
              break;

            case ActionType.ColorFilter:
              value.f1 = parseFloat(arguments.length <= 1 ? undefined : arguments[1]);
              value.f2 = parseFloat(arguments.length <= 2 ? undefined : arguments[2]);
              value.f3 = parseFloat(arguments.length <= 3 ? undefined : arguments[3]);
              value.f4 = parseFloat(arguments.length <= 4 ? undefined : arguments[4]);
              break;

            case ActionType.Text:
            case ActionType.Icon:
              value.text = arguments.length <= 1 ? undefined : arguments[1];
              break;
          }
        }

        if (!found) throw new Error("this.label not exists");
      }
    }, {
      key: "setHook",
      value: function setHook(label, callback) {
        var cnt = this._items.length;
        var found = false;

        for (var i = 0; i < cnt; i++) {
          var item = this._items[i];

          if (item.label == label) {
            item.hook = callback;
            found = true;
            break;
          } else if (item.tweenConfig && item.tweenConfig.endLabel == label) {
            item.tweenConfig.endHook = callback;
            found = true;
            break;
          }
        }

        if (!found) throw new Error("this.label not exists");
      }
    }, {
      key: "clearHooks",
      value: function clearHooks() {
        var cnt = this._items.length;

        for (var i = 0; i < cnt; i++) {
          var item = this._items[i];
          item.hook = null;
          if (item.tweenConfig) item.tweenConfig.endHook = null;
        }
      }
    }, {
      key: "setTarget",
      value: function setTarget(label, newTarget) {
        var cnt = this._items.length;
        var found = false;

        for (var i = 0; i < cnt; i++) {
          var item = this._items[i];

          if (item.label == label) {
            item.targetId = newTarget == this._owner || newTarget == null ? "" : newTarget.id;

            if (this._playing) {
              if (item.targetId.length > 0) item.target = this._owner.getChildById(item.targetId);else item.target = this._owner;
            } else item.target = null;

            found = true;
          }
        }

        if (!found) throw new Error("this.label not exists");
      }
    }, {
      key: "setDuration",
      value: function setDuration(label, value) {
        var cnt = this._items.length;
        var found = false;

        for (var i = 0; i < cnt; i++) {
          var item = this._items[i];

          if (item.tweenConfig && item.label == label) {
            item.tweenConfig.duration = value;
            found = true;
          }
        }

        if (!found) throw new Error("this.label not exists");
      }
    }, {
      key: "getLabelTime",
      value: function getLabelTime(label) {
        var cnt = this._items.length;

        for (var i = 0; i < cnt; i++) {
          var item = this._items[i];
          if (item.label == label) return item.time;else if (item.tweenConfig && item.tweenConfig.endLabel == label) return item.time + item.tweenConfig.duration;
        }

        return NaN;
      }
    }, {
      key: "updateFromRelations",
      value: function updateFromRelations(targetId, dx, dy) {
        var cnt = this._items.length;
        if (cnt == 0) return;

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
            } else {
              if (!item.value.b3) {
                item.value.f1 += dx;
                item.value.f2 += dy;
              }
            }
          }
        }
      }
    }, {
      key: "onOwnerAddedToStage",
      value: function onOwnerAddedToStage() {
        if (this._autoPlay && !this._playing) this.play(null, this._autoPlayTimes, this._autoPlayDelay);
      }
    }, {
      key: "onOwnerRemovedFromStage",
      value: function onOwnerRemovedFromStage() {
        if ((this._options & OPTION_AUTO_STOP_DISABLED) == 0) this.stop((this._options & OPTION_AUTO_STOP_AT_END) != 0 ? true : false, false);
      }
    }, {
      key: "onDelayedPlay",
      value: function onDelayedPlay() {
        this.internalPlay();
        this._playing = this._totalTasks > 0;

        if (this._playing) {
          if ((this._options & OPTION_IGNORE_DISPLAY_CONTROLLER) != 0) {
            var cnt = this._items.length;

            for (var i = 0; i < cnt; i++) {
              var item = this._items[i];
              if (item.target && item.target != this._owner) item.displayLockToken = item.target.addDisplayLock();
            }
          }
        } else if (this._onComplete) {
          var handler = this._onComplete;
          this._onComplete = null;
          handler();
        }
      }
    }, {
      key: "internalPlay",
      value: function internalPlay() {
        this._ownerBaseX = this._owner.x;
        this._ownerBaseY = this._owner.y;
        this._totalTasks = 0;
        var cnt = this._items.length;
        var item;
        var needSkipAnimations = false;

        if (!this._reversed) {
          for (var i = 0; i < cnt; i++) {
            item = this._items[i];
            if (item.target == null) continue;

            if (item.type == ActionType.Animation && this._startTime != 0 && item.time <= this._startTime) {
              needSkipAnimations = true;
              item.value.flag = false;
            } else this.playItem(item);
          }
        } else {
          for (i = cnt - 1; i >= 0; i--) {
            item = this._items[i];
            if (item.target == null) continue;
            this.playItem(item);
          }
        }

        if (needSkipAnimations) this.skipAnimations();
      }
    }, {
      key: "playItem",
      value: function playItem(item) {
        var time;

        if (item.tweenConfig) {
          if (this._reversed) time = this._totalDuration - item.time - item.tweenConfig.duration;else time = item.time;

          if (this._endTime == -1 || time <= this._endTime) {
            var startValue;
            var endValue;

            if (this._reversed) {
              startValue = item.tweenConfig.endValue;
              endValue = item.tweenConfig.startValue;
            } else {
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
                item.tweener = fgui.GTween.to2(startValue.f1, startValue.f2, endValue.f1, endValue.f2, item.tweenConfig.duration);
                break;

              case ActionType.Alpha:
              case ActionType.Rotation:
                item.tweener = fgui.GTween.to(startValue.f1, endValue.f1, item.tweenConfig.duration);
                break;

              case ActionType.Color:
                item.tweener = fgui.GTween.toColor(startValue.f1, endValue.f1, item.tweenConfig.duration);
                break;

              case ActionType.ColorFilter:
                item.tweener = fgui.GTween.to4(startValue.f1, startValue.f2, startValue.f3, startValue.f4, endValue.f1, endValue.f2, endValue.f3, endValue.f4, item.tweenConfig.duration);
                break;
            }

            item.tweener.setDelay(time).setEase(item.tweenConfig.easeType).setRepeat(item.tweenConfig.repeat, item.tweenConfig.yoyo).setTimeScale(this._timeScale).setTarget(item).onStart(this.onTweenStart, this).onUpdate(this.onTweenUpdate, this).onComplete(this.onTweenComplete, this);
            if (this._endTime >= 0) item.tweener.setBreakpoint(this._endTime - time);
            this._totalTasks++;
          }
        } else if (item.type == ActionType.Shake) {
          if (this._reversed) time = this._totalDuration - item.time - item.value.duration;else time = item.time;
          item.value.offsetX = item.value.offsetY = 0;
          item.value.lastOffsetX = item.value.lastOffsetY = 0;
          item.tweener = fgui.GTween.shake(0, 0, item.value.amplitude, item.value.duration).setDelay(time).setTimeScale(this._timeScale).setTarget(item).onUpdate(this.onTweenUpdate, this).onComplete(this.onTweenComplete, this);
          if (this._endTime >= 0) item.tweener.setBreakpoint(this._endTime - item.time);
          this._totalTasks++;
        } else {
          if (this._reversed) time = this._totalDuration - item.time;else time = item.time;

          if (time <= this._startTime) {
            this.applyValue(item);
            this.callHook(item, false);
          } else if (this._endTime == -1 || time <= this._endTime) {
            this._totalTasks++;
            item.tweener = fgui.GTween.delayedCall(time).setTimeScale(this._timeScale).setTarget(item).onComplete(this.onDelayedPlayItem, this);
          }
        }

        if (item.tweener) item.tweener.seek(this._startTime);
      }
    }, {
      key: "skipAnimations",
      value: function skipAnimations() {
        var frame;
        var playStartTime;
        var playTotalTime;
        var value;
        var target;
        var item;
        var cnt = this._items.length;

        for (var i = 0; i < cnt; i++) {
          item = this._items[i];
          if (item.type != ActionType.Animation || item.time > this._startTime) continue;
          value = item.value;
          if (value.flag) continue;
          target = item.target;
          frame = target.getProp(fgui.ObjectPropID.Frame);
          playStartTime = target.getProp(fgui.ObjectPropID.Playing) ? 0 : -1;
          playTotalTime = 0;

          for (var j = i; j < cnt; j++) {
            item = this._items[j];
            if (item.type != ActionType.Animation || item.target != target || item.time > this._startTime) continue;
            value = item.value;
            value.flag = true;

            if (value.frame != -1) {
              frame = value.frame;
              if (value.playing) playStartTime = item.time;else playStartTime = -1;
              playTotalTime = 0;
            } else {
              if (value.playing) {
                if (playStartTime < 0) playStartTime = item.time;
              } else {
                if (playStartTime >= 0) playTotalTime += item.time - playStartTime;
                playStartTime = -1;
              }
            }

            this.callHook(item, false);
          }

          if (playStartTime >= 0) playTotalTime += this._startTime - playStartTime;
          target.setProp(fgui.ObjectPropID.Playing, playStartTime >= 0);
          target.setProp(fgui.ObjectPropID.Frame, frame);
          if (playTotalTime > 0) target.setProp(fgui.ObjectPropID.DeltaTime, playTotalTime * 1000);
        }
      }
    }, {
      key: "onDelayedPlayItem",
      value: function onDelayedPlayItem(tweener) {
        var item = tweener.target;
        item.tweener = null;
        this._totalTasks--;
        this.applyValue(item);
        this.callHook(item, false);
        this.checkAllComplete();
      }
    }, {
      key: "onTweenStart",
      value: function onTweenStart(tweener) {
        var item = tweener.target;

        if (item.type == ActionType.XY || item.type == ActionType.Size) {
          var startValue;
          var endValue;

          if (this._reversed) {
            startValue = item.tweenConfig.endValue;
            endValue = item.tweenConfig.startValue;
          } else {
            startValue = item.tweenConfig.startValue;
            endValue = item.tweenConfig.endValue;
          }

          if (item.type == ActionType.XY) {
            if (item.target != this._owner) {
              if (!startValue.b1) tweener.startValue.x = item.target.x;else if (startValue.b3) tweener.startValue.x = startValue.f1 * this._owner.width;
              if (!startValue.b2) tweener.startValue.y = item.target.y;else if (startValue.b3) tweener.startValue.y = startValue.f2 * this._owner.height;
              if (!endValue.b1) tweener.endValue.x = tweener.startValue.x;else if (endValue.b3) tweener.endValue.x = endValue.f1 * this._owner.width;
              if (!endValue.b2) tweener.endValue.y = tweener.startValue.y;else if (endValue.b3) tweener.endValue.y = endValue.f2 * this._owner.height;
            } else {
              if (!startValue.b1) tweener.startValue.x = item.target.x - this._ownerBaseX;
              if (!startValue.b2) tweener.startValue.y = item.target.y - this._ownerBaseY;
              if (!endValue.b1) tweener.endValue.x = tweener.startValue.x;
              if (!endValue.b2) tweener.endValue.y = tweener.startValue.y;
            }
          } else {
            if (!startValue.b1) tweener.startValue.x = item.target.width;
            if (!startValue.b2) tweener.startValue.y = item.target.height;
            if (!endValue.b1) tweener.endValue.x = tweener.startValue.x;
            if (!endValue.b2) tweener.endValue.y = tweener.startValue.y;
          }

          if (item.tweenConfig.path) {
            item.value.b1 = item.value.b2 = true;
            tweener.setPath(item.tweenConfig.path);
          }
        }

        this.callHook(item, false);
      }
    }, {
      key: "onTweenUpdate",
      value: function onTweenUpdate(tweener) {
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
    }, {
      key: "onTweenComplete",
      value: function onTweenComplete(tweener) {
        var item = tweener.target;
        item.tweener = null;
        this._totalTasks--;
        if (tweener.allCompleted) this.callHook(item, true);
        this.checkAllComplete();
      }
    }, {
      key: "onPlayTransCompleted",
      value: function onPlayTransCompleted(item) {
        this._totalTasks--;
        this.checkAllComplete();
      }
    }, {
      key: "callHook",
      value: function callHook(item, tweenEnd) {
        if (tweenEnd) {
          if (item.tweenConfig && item.tweenConfig.endHook) item.tweenConfig.endHook();
        } else {
          if (item.time >= this._startTime && item.hook) item.hook();
        }
      }
    }, {
      key: "checkAllComplete",
      value: function checkAllComplete() {
        if (this._playing && this._totalTasks == 0) {
          if (this._totalTimes < 0) {
            this.internalPlay();
          } else {
            this._totalTimes--;
            if (this._totalTimes > 0) this.internalPlay();else {
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
    }, {
      key: "applyValue",
      value: function applyValue(item) {
        item.target._gearLocked = true;
        var value = item.value;

        switch (item.type) {
          case ActionType.XY:
            if (item.target == this._owner) {
              if (value.b1 && value.b2) item.target.setPosition(value.f1 + this._ownerBaseX, value.f2 + this._ownerBaseY);else if (value.b1) item.target.x = value.f1 + this._ownerBaseX;else item.target.y = value.f2 + this._ownerBaseY;
            } else {
              if (value.b3) {
                if (value.b1 && value.b2) item.target.setPosition(value.f1 * this._owner.width, value.f2 * this._owner.height);else if (value.b1) item.target.x = value.f1 * this._owner.width;else if (value.b2) item.target.y = value.f2 * this._owner.height;
              } else {
                if (value.b1 && value.b2) item.target.setPosition(value.f1, value.f2);else if (value.b1) item.target.x = value.f1;else if (value.b2) item.target.y = value.f2;
              }
            }

            break;

          case ActionType.Size:
            if (!value.b1) value.f1 = item.target.width;
            if (!value.b2) value.f2 = item.target.height;
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
            item.target.setProp(fgui.ObjectPropID.Color, value.f1);
            break;

          case ActionType.Animation:
            if (value.frame >= 0) item.target.setProp(fgui.ObjectPropID.Frame, value.frame);
            item.target.setProp(fgui.ObjectPropID.Playing, value.playing);
            item.target.setProp(fgui.ObjectPropID.TimeScale, this._timeScale);
            break;

          case ActionType.Visible:
            item.target.visible = value.visible;
            break;

          case ActionType.Transition:
            if (this._playing) {
              var trans = value.trans;

              if (trans) {
                this._totalTasks++;
                var startTime = this._startTime > item.time ? this._startTime - item.time : 0;
                var endTime = this._endTime >= 0 ? this._endTime - item.time : -1;
                if (value.stopTime >= 0 && (endTime < 0 || endTime > value.stopTime)) endTime = value.stopTime;
                trans.timeScale = this._timeScale;

                trans._play(this.onPlayTransCompleted.bind(this, item), value.playTimes, 0, startTime, endTime, this._reversed);
              }
            }

            break;

          case ActionType.Sound:
            if (this._playing && item.time >= this._startTime) {
              if (value.audioClip == null) {
                var pi = fgui.UIPackage.getItemByURL(value.sound);
                if (pi) value.audioClip = pi.file;else value.audioClip = value.sound;
              }

              if (value.audioClip) fgui.Decls.GRoot.inst.playOneShotSound(value.audioClip, value.volume);
            }

            break;

          case ActionType.Shake:
            item.target.setPosition(item.target.x - value.lastOffsetX + value.offsetX, item.target.y - value.lastOffsetY + value.offsetY);
            value.lastOffsetX = value.offsetX;
            value.lastOffsetY = value.offsetY;
            break;

          case ActionType.ColorFilter:
            {
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
    }, {
      key: "setup",
      value: function setup(buffer) {
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
          if (targetId < 0) item.targetId = "";else item.targetId = this._owner.getChildAt(targetId).id;
          item.label = buffer.readS();

          if (buffer.readBool()) {
            buffer.seek(curPos, 1);
            item.tweenConfig = new TweenConfig();
            item.tweenConfig.duration = buffer.readFloat();
            if (item.time + item.tweenConfig.duration > this._totalDuration) this._totalDuration = item.time + item.tweenConfig.duration;
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
                item.tweenConfig.path = new fgui.GPath();
                var pts = new Array();

                for (var j = 0; j < pathLen; j++) {
                  var curveType = buffer.readByte();

                  switch (curveType) {
                    case fgui.CurveType.Bezier:
                      pts.push(fgui.GPathPoint.newBezierPoint(buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat()));
                      break;

                    case fgui.CurveType.CubicBezier:
                      pts.push(fgui.GPathPoint.newCubicBezierPoint(buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat(), buffer.readFloat()));
                      break;

                    default:
                      pts.push(fgui.GPathPoint.newPoint(buffer.readFloat(), buffer.readFloat(), curveType));
                      break;
                  }
                }

                item.tweenConfig.path.create(pts);
              }
            }
          } else {
            if (item.time > this._totalDuration) this._totalDuration = item.time;
            buffer.seek(curPos, 2);
            this.decodeValue(item, buffer, item.value);
          }

          buffer.pos = curPos + dataLen;
        }
      }
    }, {
      key: "decodeValue",
      value: function decodeValue(item, buffer, value) {
        switch (item.type) {
          case ActionType.XY:
          case ActionType.Size:
          case ActionType.Pivot:
          case ActionType.Skew:
            value.b1 = buffer.readBool();
            value.b2 = buffer.readBool();
            value.f1 = buffer.readFloat();
            value.f2 = buffer.readFloat();
            if (buffer.version >= 2 && item.type == ActionType.XY) value.b3 = buffer.readBool();
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
    }, {
      key: "playing",
      get: function get() {
        return this._playing;
      }
    }, {
      key: "timeScale",
      get: function get() {
        return this._timeScale;
      },
      set: function set(value) {
        if (this._timeScale != value) {
          this._timeScale = value;

          if (this._playing) {
            var cnt = this._items.length;

            for (var i = 0; i < cnt; i++) {
              var item = this._items[i];
              if (item.tweener) item.tweener.setTimeScale(value);else if (item.type == ActionType.Transition) {
                if (item.value.trans) item.value.trans.timeScale = value;
              } else if (item.type == ActionType.Animation) {
                if (item.target) item.target.setProp(fgui.ObjectPropID.TimeScale, value);
              }
            }
          }
        }
      }
    }]);

    return Transition;
  }();

  fgui.Transition = Transition;
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

  var Item = function Item(type) {
    _classCallCheck(this, Item);

    this.type = type;
    this.value = {};
    this.displayLockToken = 0;
  };

  var TweenConfig = function TweenConfig() {
    _classCallCheck(this, TweenConfig);

    this.easeType = fgui.EaseType.QuadOut;
    this.startValue = {
      b1: true,
      b2: true
    };
    this.endValue = {
      b1: true,
      b2: true
    };
  };
})(fgui || (fgui = {}));

(function (fgui) {
  var TranslationHelper = /*#__PURE__*/function () {
    function TranslationHelper() {
      _classCallCheck(this, TranslationHelper);
    }

    _createClass(TranslationHelper, null, [{
      key: "loadFromXML",
      value: function loadFromXML(source) {
        var strings = {};
        TranslationHelper.strings = strings;
        var arr = source.elements("string");
        arr.forEach(function (cxml) {
          var key = cxml.getAttrString("name");
          var text = cxml.text;
          var i = key.indexOf("-");
          if (i == -1) return;
          var key2 = key.substr(0, i);
          var key3 = key.substr(i + 1);
          var col = strings[key2];

          if (!col) {
            col = {};
            strings[key2] = col;
          }

          col[key3] = text;
        });
      }
    }, {
      key: "translateComponent",
      value: function translateComponent(item) {
        if (TranslationHelper.strings == null) return;
        var compStrings = TranslationHelper.strings[item.owner.id + item.id];
        if (compStrings == null) return;
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

          if (type == fgui.ObjectType.Component) {
            if (buffer.seek(curPos, 6)) type = buffer.readByte();
          }

          buffer.seek(curPos, 1);
          if ((value = compStrings[elementId + "-tips"]) != null) buffer.writeS(value);
          buffer.seek(curPos, 2);
          var gearCnt = buffer.readShort();

          for (j = 0; j < gearCnt; j++) {
            nextPos = buffer.readShort();
            nextPos += buffer.pos;

            if (buffer.readByte() == 6) {
              buffer.skip(2);
              valueCnt = buffer.readShort();

              for (k = 0; k < valueCnt; k++) {
                page = buffer.readS();

                if (page != null) {
                  if ((value = compStrings[elementId + "-texts_" + k]) != null) buffer.writeS(value);else buffer.skip(2);
                }
              }

              if (buffer.readBool() && (value = compStrings[elementId + "-texts_def"]) != null) buffer.writeS(value);
            }

            buffer.pos = nextPos;
          }

          if (baseType == fgui.ObjectType.Component && buffer.version >= 2) {
            buffer.seek(curPos, 4);
            buffer.skip(2);
            buffer.skip(4 * buffer.readUshort());
            var cpCount = buffer.readUshort();

            for (var k = 0; k < cpCount; k++) {
              var target = buffer.readS();
              var propertyId = buffer.readUshort();
              if (propertyId == 0 && (value = compStrings[elementId + "-cp-" + target]) != null) buffer.writeS(value);else buffer.skip(2);
            }
          }

          switch (type) {
            case fgui.ObjectType.Text:
            case fgui.ObjectType.RichText:
            case fgui.ObjectType.InputText:
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

            case fgui.ObjectType.List:
            case fgui.ObjectType.Tree:
              {
                buffer.seek(curPos, 8);
                buffer.skip(2);
                itemCount = buffer.readUshort();

                for (j = 0; j < itemCount; j++) {
                  nextPos = buffer.readUshort();
                  nextPos += buffer.pos;
                  buffer.skip(2);
                  if (type == fgui.ObjectType.Tree) buffer.skip(2);
                  if ((value = compStrings[elementId + "-" + j]) != null) buffer.writeS(value);else buffer.skip(2);
                  if ((value = compStrings[elementId + "-" + j + "-0"]) != null) buffer.writeS(value);else buffer.skip(2);

                  if (buffer.version >= 2) {
                    buffer.skip(6);
                    buffer.skip(buffer.readUshort() * 4);
                    var cpCount = buffer.readUshort();

                    for (var k = 0; k < cpCount; k++) {
                      var target = buffer.readS();
                      var propertyId = buffer.readUshort();
                      if (propertyId == 0 && (value = compStrings[elementId + "-" + j + "-" + target]) != null) buffer.writeS(value);else buffer.skip(2);
                    }
                  }

                  buffer.pos = nextPos;
                }

                break;
              }

            case fgui.ObjectType.Label:
              {
                if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                  if ((value = compStrings[elementId]) != null) buffer.writeS(value);else buffer.skip(2);
                  buffer.skip(2);
                  if (buffer.readBool()) buffer.skip(4);
                  buffer.skip(4);
                  if (buffer.readBool() && (value = compStrings[elementId + "-prompt"]) != null) buffer.writeS(value);
                }

                break;
              }

            case fgui.ObjectType.Button:
              {
                if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                  if ((value = compStrings[elementId]) != null) buffer.writeS(value);else buffer.skip(2);
                  if ((value = compStrings[elementId + "-0"]) != null) buffer.writeS(value);
                }

                break;
              }

            case fgui.ObjectType.ComboBox:
              {
                if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                  itemCount = buffer.readShort();

                  for (j = 0; j < itemCount; j++) {
                    nextPos = buffer.readShort();
                    nextPos += buffer.pos;
                    if ((value = compStrings[elementId + "-" + j]) != null) buffer.writeS(value);
                    buffer.pos = nextPos;
                  }

                  if ((value = compStrings[elementId]) != null) buffer.writeS(value);
                }

                break;
              }
          }

          buffer.pos = curPos + dataLen;
        }
      }
    }]);

    return TranslationHelper;
  }();

  fgui.TranslationHelper = TranslationHelper;
})(fgui || (fgui = {}));

(function (fgui) {
  var UIConfig = function UIConfig() {
    _classCallCheck(this, UIConfig);
  };

  UIConfig.defaultFont = "Arial";
  UIConfig.modalLayerColor = new fgui.Color4(0x333333, 0.2);
  UIConfig.buttonSound = null;
  UIConfig.buttonSoundVolumeScale = 1;
  UIConfig.horizontalScrollBar = null;
  UIConfig.verticalScrollBar = null;
  UIConfig.defaultScrollStep = 25;
  UIConfig.defaultScrollDecelerationRate = 0.967;
  UIConfig.defaultScrollBarDisplay = fgui.ScrollBarDisplayType.Visible;
  UIConfig.defaultScrollTouchEffect = true;
  UIConfig.defaultScrollBounceEffect = true;
  UIConfig.defaultScrollSnappingThreshold = 0.1;
  UIConfig.defaultScrollPagingThreshold = 0.3;
  UIConfig.popupMenu = null;
  UIConfig.popupMenu_seperator = null;
  UIConfig.loaderErrorSign = null;
  UIConfig.tooltipsWin = null;
  UIConfig.defaultComboBoxVisibleItemCount = 10;
  UIConfig.touchScrollSensitivity = 20;
  UIConfig.touchDragSensitivity = 10;
  UIConfig.clickDragSensitivity = 2;
  UIConfig.bringWindowToFrontOnClick = true;
  UIConfig.frameTimeForAsyncUIConstruction = 2;
  UIConfig.packageFileExtension = "fui";
  fgui.UIConfig = UIConfig;
})(fgui || (fgui = {}));

(function (fgui) {
  var ScaleMode;

  (function (ScaleMode) {
    ScaleMode[ScaleMode["ConstantPixelSize"] = 0] = "ConstantPixelSize";
    ScaleMode[ScaleMode["ScaleWithScreenSize"] = 1] = "ScaleWithScreenSize";
    ScaleMode[ScaleMode["ConstantPhysicalSize"] = 2] = "ConstantPhysicalSize";
  })(ScaleMode = fgui.ScaleMode || (fgui.ScaleMode = {}));

  var ScreenMatchMode;

  (function (ScreenMatchMode) {
    ScreenMatchMode[ScreenMatchMode["MatchWidthOrHeight"] = 0] = "MatchWidthOrHeight";
    ScreenMatchMode[ScreenMatchMode["MatchWidth"] = 1] = "MatchWidth";
    ScreenMatchMode[ScreenMatchMode["MatchHeight"] = 2] = "MatchHeight";
  })(ScreenMatchMode = fgui.ScreenMatchMode || (fgui.ScreenMatchMode = {}));

  var UIContentScaler = /*#__PURE__*/function () {
    function UIContentScaler() {
      _classCallCheck(this, UIContentScaler);
    }

    _createClass(UIContentScaler, null, [{
      key: "scaleWithScreenSize",
      value: function scaleWithScreenSize(designResolutionX, designResolutionY, screenMatchMode) {
        _designResolutionX = designResolutionX;
        _designResolutionY = designResolutionY;
        _scaleMode = ScaleMode.ScaleWithScreenSize;
        _screenMatchMode = screenMatchMode || ScreenMatchMode.MatchWidthOrHeight;
        refresh();
      }
    }, {
      key: "setConstant",
      value: function setConstant(constantScaleFactor) {
        _scaleMode = ScaleMode.ConstantPixelSize;
        _constantScaleFactor = constantScaleFactor || 1;
        refresh();
      }
    }, {
      key: "scaleFactor",
      get: function get() {
        return _scaleFactor;
      }
    }, {
      key: "scaleLevel",
      get: function get() {
        return _scaleLevel;
      }
    }]);

    return UIContentScaler;
  }();

  fgui.UIContentScaler = UIContentScaler;
  var _scaleMode = ScaleMode.ConstantPixelSize;

  var _screenMatchMode;

  var _designResolutionX = 1136;
  var _designResolutionY = 640;
  var _constantScaleFactor = 1;

  var _ignoreOrientation;

  var _scaleFactor = 1;
  var _scaleLevel = 0;
  fgui.Stage.eventDispatcher.on(fgui.DisplayObjectEvent.SIZE_CHANGED, refresh);

  function refresh() {
    var screenWidth = fgui.Stage.width;
    var screenHeight = fgui.Stage.height;

    if (_scaleMode == ScaleMode.ScaleWithScreenSize) {
      if (_designResolutionX == 0 || _designResolutionY == 0) return;
      var dx = _designResolutionX;
      var dy = _designResolutionY;

      if (!_ignoreOrientation && (screenWidth > screenHeight && dx < dy || screenWidth < screenHeight && dx > dy)) {
        var tmp = dx;
        dx = dy;
        dy = tmp;
      }

      if (_screenMatchMode == ScreenMatchMode.MatchWidthOrHeight) {
        var s1 = screenWidth / dx;
        var s2 = screenHeight / dy;
        _scaleFactor = Math.min(s1, s2);
      } else if (_screenMatchMode == ScreenMatchMode.MatchWidth) _scaleFactor = screenWidth / dx;else _scaleFactor = screenHeight / dy;
    } else if (_scaleMode == ScaleMode.ConstantPhysicalSize) {} else _scaleFactor = _constantScaleFactor;

    if (_scaleFactor > 10) _scaleFactor = 10;
    if (_scaleFactor > 3) _scaleLevel = 3;else if (_scaleFactor > 2) _scaleLevel = 2;else if (_scaleFactor > 1) _scaleLevel = 1;else _scaleLevel = 0;
    fgui.broadcastEvent(fgui.Stage.scene, fgui.StageEvent.ContentScaleChanged);
  }
})(fgui || (fgui = {}));

(function (fgui) {
  var UIObjectFactory = /*#__PURE__*/function () {
    function UIObjectFactory() {
      _classCallCheck(this, UIObjectFactory);
    }

    _createClass(UIObjectFactory, null, [{
      key: "setExtension",
      value: function setExtension(url, type) {
        if (url == null) throw new Error("Invaild url: " + url);
        var pi = fgui.UIPackage.getItemByURL(url);
        if (pi) pi.extensionType = type;
        UIObjectFactory.extensions[url] = type;
      }
    }, {
      key: "setLoaderExtension",
      value: function setLoaderExtension(type) {
        UIObjectFactory.loaderType = type;
      }
    }, {
      key: "resolvePackageItemExtension",
      value: function resolvePackageItemExtension(pi) {
        var extensionType = UIObjectFactory.extensions["ui://" + pi.owner.id + pi.id];
        if (!extensionType) extensionType = UIObjectFactory.extensions["ui://" + pi.owner.name + "/" + pi.name];
        if (extensionType) pi.extensionType = extensionType;
      }
    }, {
      key: "newObject",
      value: function newObject(type, userClass) {
        var obj;

        if (typeof type === 'number') {
          switch (type) {
            case fgui.ObjectType.Image:
              return new fgui.GImage();

            case fgui.ObjectType.MovieClip:
              return new fgui.GMovieClip();

            case fgui.ObjectType.Component:
              return new fgui.GComponent();

            case fgui.ObjectType.Text:
              return new fgui.GTextField();

            case fgui.ObjectType.RichText:
              return new fgui.GRichTextField();

            case fgui.ObjectType.InputText:
              return new fgui.GTextInput();

            case fgui.ObjectType.Group:
              return new fgui.GGroup();

            case fgui.ObjectType.List:
              return new fgui.GList();

            case fgui.ObjectType.Graph:
              return new fgui.GGraph();

            case fgui.ObjectType.Loader:
              if (UIObjectFactory.loaderType) return new UIObjectFactory.loaderType();else return new fgui.GLoader();

            case fgui.ObjectType.Button:
              return new fgui.GButton();

            case fgui.ObjectType.Label:
              return new fgui.GLabel();

            case fgui.ObjectType.ProgressBar:
              return new fgui.GProgressBar();

            case fgui.ObjectType.Slider:
              return new fgui.GSlider();

            case fgui.ObjectType.ScrollBar:
              return new fgui.GScrollBar();

            case fgui.ObjectType.ComboBox:
              return new fgui.GComboBox();

            case fgui.ObjectType.Tree:
              return new fgui.GTree();

            case fgui.ObjectType.Loader3D:
              return new fgui.GLoader3D();

            default:
              return null;
          }
        } else {
          if (type.type == fgui.PackageItemType.Component) {
            if (userClass) obj = new userClass();else if (type.extensionType) obj = new type.extensionType();else obj = UIObjectFactory.newObject(type.objectType);
          } else obj = UIObjectFactory.newObject(type.objectType);

          if (obj) obj.packageItem = type;
        }

        return obj;
      }
    }]);

    return UIObjectFactory;
  }();

  UIObjectFactory.extensions = {};
  fgui.UIObjectFactory = UIObjectFactory;
  fgui.Decls.UIObjectFactory = UIObjectFactory;
})(fgui || (fgui = {}));

(function (fgui) {
  var UIPackage = /*#__PURE__*/function () {
    function UIPackage() {
      _classCallCheck(this, UIPackage);

      this._items = [];
      this._itemsById = {};
      this._itemsByName = {};
      this._sprites = {};
      this._dependencies = Array();
      this._branches = Array();
      this._branchIndex = -1;
    }

    _createClass(UIPackage, [{
      key: "loadPackage",
      value: function loadPackage(buffer) {
        if (buffer.readUint() != 0x46475549) throw new Error("old package format found in '" + this._resKey + "'");
        buffer.version = buffer.readInt();
        var compressed = buffer.readBool();
        this._id = buffer.readString();
        this._name = buffer.readString();
        buffer.skip(20);

        if (compressed) {}

        var ver2 = buffer.version >= 2;
        var indexTablePos = buffer.pos;
        var cnt;
        var i;
        var j;
        var nextPos;
        var str;
        var branchIncluded;
        buffer.seek(indexTablePos, 4);
        cnt = buffer.readInt();
        var stringTable = [];

        for (i = 0; i < cnt; i++) {
          stringTable[i] = buffer.readString();
        }

        buffer.stringTable = stringTable;
        buffer.seek(indexTablePos, 0);
        cnt = buffer.readShort();

        for (i = 0; i < cnt; i++) {
          this._dependencies.push({
            id: buffer.readS(),
            name: buffer.readS()
          });
        }

        if (ver2) {
          cnt = buffer.readShort();

          if (cnt > 0) {
            this._branches = buffer.readSArray(cnt);
            if (_branch) this._branchIndex = this._branches.indexOf(_branch);
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
          pi = new fgui.PackageItem();
          pi.owner = this;
          pi.type = buffer.readByte();
          pi.id = buffer.readS();
          pi.name = buffer.readS();
          buffer.readS();
          str = buffer.readS();
          if (str) pi.file = str;
          buffer.readBool();
          pi.width = buffer.readInt();
          pi.height = buffer.readInt();

          switch (pi.type) {
            case fgui.PackageItemType.Image:
              {
                pi.objectType = fgui.ObjectType.Image;
                var scaleOption = buffer.readByte();

                if (scaleOption == 1) {
                  pi.scale9Grid = new fgui.Rect();
                  pi.scale9Grid.x = buffer.readInt();
                  pi.scale9Grid.y = buffer.readInt();
                  pi.scale9Grid.width = buffer.readInt();
                  pi.scale9Grid.height = buffer.readInt();
                  pi.tileGridIndice = buffer.readInt();
                } else if (scaleOption == 2) pi.scaleByTile = true;

                pi.smoothing = buffer.readBool();
                break;
              }

            case fgui.PackageItemType.MovieClip:
              {
                pi.smoothing = buffer.readBool();
                pi.objectType = fgui.ObjectType.MovieClip;
                pi.rawData = buffer.readBuffer();
                break;
              }

            case fgui.PackageItemType.Font:
              {
                pi.rawData = buffer.readBuffer();
                break;
              }

            case fgui.PackageItemType.Component:
              {
                var extension = buffer.readByte();
                if (extension > 0) pi.objectType = extension;else pi.objectType = fgui.ObjectType.Component;
                pi.rawData = buffer.readBuffer();
                fgui.Decls.UIObjectFactory.resolvePackageItemExtension(pi);
                break;
              }

            case fgui.PackageItemType.Atlas:
            case fgui.PackageItemType.Sound:
            case fgui.PackageItemType.Misc:
              {
                pi.file = fileNamePrefix + pi.file;
                break;
              }
          }

          if (ver2) {
            str = buffer.readS();
            if (str) pi.name = str + "/" + pi.name;
            var branchCnt = buffer.readByte();

            if (branchCnt > 0) {
              if (branchIncluded) pi.branches = buffer.readSArray(branchCnt);else this._itemsById[buffer.readS()] = pi;
            }

            var highResCnt = buffer.readByte();
            if (highResCnt > 0) pi.highResolution = buffer.readSArray(highResCnt);
          }

          this._items.push(pi);

          this._itemsById[pi.id] = pi;
          if (pi.name != null) this._itemsByName[pi.name] = pi;
          buffer.pos = nextPos;
        }

        buffer.seek(indexTablePos, 2);
        cnt = buffer.readUshort();

        for (i = 0; i < cnt; i++) {
          nextPos = buffer.readUshort();
          nextPos += buffer.pos;
          var itemId = buffer.readS();
          pi = this._itemsById[buffer.readS()];
          var sprite = new AtlasSprite();
          sprite.atlas = pi;
          sprite.rect.x = buffer.readInt();
          sprite.rect.y = buffer.readInt();
          sprite.rect.width = buffer.readInt();
          sprite.rect.height = buffer.readInt();
          sprite.rotated = buffer.readBool();

          if (ver2 && buffer.readBool()) {
            sprite.offset.x = buffer.readInt();
            sprite.offset.y = buffer.readInt();
            sprite.originalSize.x = buffer.readInt();
            sprite.originalSize.y = buffer.readInt();
          } else {
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

            if (pi && pi.type == fgui.PackageItemType.Image) {
              pi.pixelHitTestData = new fgui.PixelHitTestData();
              pi.pixelHitTestData.load(buffer);
            }

            buffer.pos = nextPos;
          }
        }
      }
    }, {
      key: "dispose",
      value: function dispose() {
        var cnt = this._items.length;

        for (var i = 0; i < cnt; i++) {
          var pi = this._items[i];

          if (pi.type == fgui.PackageItemType.Atlas) {
            if (pi.texture) {
              pi.texture.dispose();
              pi.texture = null;
            }
          } else if (pi.type == fgui.PackageItemType.Sound) {}
        }
      }
    }, {
      key: "createObject",
      value: function createObject(resName, userClass) {
        var pi = this._itemsByName[resName];
        if (pi) return this.internalCreateObject(pi, userClass);else return null;
      }
    }, {
      key: "internalCreateObject",
      value: function internalCreateObject(item, userClass) {
        var g = fgui.Decls.UIObjectFactory.newObject(item, userClass);
        if (g == null) return null;
        fgui.constructingDepth.n++;
        g.constructFromResource();
        fgui.constructingDepth.n--;
        return g;
      }
    }, {
      key: "getItemById",
      value: function getItemById(itemId) {
        return this._itemsById[itemId];
      }
    }, {
      key: "getItemByName",
      value: function getItemByName(resName) {
        return this._itemsByName[resName];
      }
    }, {
      key: "getItemAssetByName",
      value: function getItemAssetByName(resName) {
        var pi = this._itemsByName[resName];

        if (pi == null) {
          throw "Resource not found -" + resName;
        }

        return this.getItemAsset(pi);
      }
    }, {
      key: "getItemAsset",
      value: function getItemAsset(item) {
        switch (item.type) {
          case fgui.PackageItemType.Image:
            if (!item.decoded) {
              item.decoded = true;
              var sprite = this._sprites[item.id];

              if (sprite) {
                var atlasTexture = this.getItemAsset(sprite.atlas);
                item.texture = atlasTexture.createSubTexture(sprite.rect, sprite.rotated, sprite.offset, sprite.originalSize);
              } else item.texture = null;
            }

            return item.texture;

          case fgui.PackageItemType.Atlas:
            return item.texture;

          case fgui.PackageItemType.Font:
            if (!item.decoded) {
              item.decoded = true;
              this.loadFont(item);
            }

            return item.bitmapFont;

          case fgui.PackageItemType.MovieClip:
            if (!item.decoded) {
              item.decoded = true;
              this.loadMovieClip(item);
            }

            return item.frames;

          case fgui.PackageItemType.Component:
            return item.rawData;

          default:
            return null;
        }
      }
    }, {
      key: "loadMovieClip",
      value: function loadMovieClip(item) {
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
          frame = {
            texture: null
          };
          fx = buffer.readInt();
          fy = buffer.readInt();
          buffer.readInt();
          buffer.readInt();
          frame.addDelay = buffer.readInt();
          spriteId = buffer.readS();

          if (spriteId != null && (sprite = this._sprites[spriteId]) != null) {
            var atlasTexture = this.getItemAsset(sprite.atlas);
            frame.texture = atlasTexture.createSubTexture(sprite.rect, sprite.rotated, new THREE.Vector2(fx, fy), new THREE.Vector2(item.width, item.height));
          }

          item.frames[i] = frame;
          buffer.pos = nextPos;
        }
      }
    }, {
      key: "loadFont",
      value: function loadFont(item) {
        item = item.getBranch();
        var font = new fgui.BitmapFont();
        font.name = "ui://" + this._id + item.id;
        item.bitmapFont = font;
        var buffer = item.rawData;
        buffer.seek(0, 0);
        var ttf = buffer.readBool();
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
          mainTexture = this.getItemAsset(mainSprite.atlas);
          texScaleX = mainTexture.root.uvRect.width / mainTexture.width;
          texScaleY = mainTexture.root.uvRect.height / mainTexture.height;
        }

        buffer.seek(0, 1);
        var bg = null;
        var cnt = buffer.readInt();

        for (var i = 0; i < cnt; i++) {
          var nextPos = buffer.readShort();
          nextPos += buffer.pos;
          bg = new fgui.BMGlyph();
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
          if (bg.channel == 1) bg.channel = 2;else if (bg.channel == 2) bg.channel = 1;else if (bg.channel == 4) bg.channel = 0;else if (bg.channel == 8) bg.channel = 3;

          if (ttf) {
            if (mainSprite.rotated) {
              bg.uv[0].set((by + bgHeight + mainSprite.rect.x) * texScaleX, 1 - (mainSprite.rect.yMax - bx) * texScaleY);
              bg.uv[1].set(bg.uv[0].x - bgHeight * texScaleX, bg.uv[0].y);
              bg.uv[2].set(bg.uv[1].x, bg.uv[0].y + bgWidth * texScaleY);
              bg.uv[3].set(bg.uv[0].x, bg.uv[2].y);
            } else {
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
          } else {
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
              if (!mainTexture) mainTexture = charImg.texture.root;
            }

            if (fontSize == 0) fontSize = bgHeight;

            if (bg.advance == 0) {
              if (xadvance == 0) bg.advance = bgX + bgWidth;else bg.advance = xadvance;
            }

            bg.lineHeight = bgY < 0 ? bgHeight : bgY + bgHeight;
            if (bg.lineHeight < font.size) bg.lineHeight = font.size;
          }

          buffer.pos = nextPos;
        }

        font.size = fontSize;
        font.mainTexture = mainTexture;
      }
    }, {
      key: "id",
      get: function get() {
        return this._id;
      }
    }, {
      key: "name",
      get: function get() {
        return this._name;
      }
    }, {
      key: "customId",
      get: function get() {
        return this._customId;
      },
      set: function set(value) {
        if (this._customId != null) delete _instById[this._customId];
        this._customId = value;
        if (this._customId != null) _instById[this._customId] = this;
      }
    }], [{
      key: "getVar",
      value: function getVar(key) {
        return _vars[key];
      }
    }, {
      key: "setVar",
      value: function setVar(key, value) {
        _vars[key] = value;
      }
    }, {
      key: "getById",
      value: function getById(id) {
        return _instById[id];
      }
    }, {
      key: "getByName",
      value: function getByName(name) {
        return _instByName[name];
      }
    }, {
      key: "loadPackage",
      value: function loadPackage(resKey, onProgress) {
        return new Promise(function (resolve) {
          var pkg = _instById[resKey];

          if (pkg) {
            resolve(pkg);
            return;
          }

          var url = resKey + "." + fgui.UIConfig.packageFileExtension;
          var loader = new THREE.FileLoader();
          loader.setResponseType("arraybuffer");
          loader.load(url, function (asset) {
            pkg = new UIPackage();
            pkg._resKey = resKey;
            pkg.loadPackage(new fgui.ByteBuffer(asset));
            var promises = [];
            var cnt = pkg._items.length;

            for (var i = 0; i < cnt; i++) {
              var pi = pkg._items[i];

              if (pi.type == fgui.PackageItemType.Atlas) {
                promises.push(loadTexture(pi, onProgress));
              } else if (pi.type == fgui.PackageItemType.Sound) {
                promises.push(loadSound(pi, onProgress));
              }
            }

            var resolve2 = function resolve2() {
              _instById[pkg.id] = pkg;
              _instByName[pkg.name] = pkg;
              _instByName[pkg._resKey] = pkg;
              resolve(pkg);
            };

            if (promises.length > 0) Promise.all(promises).then(resolve2);else resolve2();
          });
        });
      }
    }, {
      key: "removePackage",
      value: function removePackage(packageIdOrName) {
        var pkg = _instById[packageIdOrName];
        if (!pkg) pkg = _instByName[packageIdOrName];
        if (!pkg) throw new Error("unknown package: " + packageIdOrName);
        pkg.dispose();
        delete _instById[pkg.id];
        delete _instByName[pkg.name];
        delete _instById[pkg._resKey];
        if (pkg._customId != null) delete _instById[pkg._customId];
      }
    }, {
      key: "createObject",
      value: function createObject(pkgName, resName, userClass) {
        var pkg = UIPackage.getByName(pkgName);
        if (pkg) return pkg.createObject(resName, userClass);else return null;
      }
    }, {
      key: "createObjectFromURL",
      value: function createObjectFromURL(url, userClass) {
        var pi = UIPackage.getItemByURL(url);
        if (pi) return pi.owner.internalCreateObject(pi, userClass);else return null;
      }
    }, {
      key: "getItemURL",
      value: function getItemURL(pkgName, resName) {
        var pkg = UIPackage.getByName(pkgName);
        if (!pkg) return null;
        var pi = pkg._itemsByName[resName];
        if (!pi) return null;
        return "ui://" + pkg.id + pi.id;
      }
    }, {
      key: "getItemByURL",
      value: function getItemByURL(url) {
        var pos1 = url.indexOf("//");
        if (pos1 == -1) return null;
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
        } else {
          var pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
          pkg = UIPackage.getByName(pkgName);

          if (pkg) {
            var srcName = url.substr(pos2 + 1);
            return pkg.getItemByName(srcName);
          }
        }

        return null;
      }
    }, {
      key: "getItemAssetByURL",
      value: function getItemAssetByURL(url) {
        var item = UIPackage.getItemByURL(url);
        if (item == null) return null;
        return item.owner.getItemAsset(item);
      }
    }, {
      key: "normalizeURL",
      value: function normalizeURL(url) {
        if (url == null) return null;
        var pos1 = url.indexOf("//");
        if (pos1 == -1) return null;
        var pos2 = url.indexOf("/", pos1 + 2);
        if (pos2 == -1) return url;
        var pkgName = url.substr(pos1 + 2, pos2 - pos1 - 2);
        var srcName = url.substr(pos2 + 1);
        return UIPackage.getItemURL(pkgName, srcName);
      }
    }, {
      key: "branch",
      get: function get() {
        return _branch;
      },
      set: function set(value) {
        _branch = value;

        for (var pkgId in _instById) {
          var pkg = _instById[pkgId];

          if (pkg._branches) {
            pkg._branchIndex = pkg._branches.indexOf(value);
          }
        }
      }
    }]);

    return UIPackage;
  }();

  fgui.UIPackage = UIPackage;

  var AtlasSprite = function AtlasSprite() {
    _classCallCheck(this, AtlasSprite);

    this.rect = new fgui.Rect();
    this.offset = new THREE.Vector2();
    this.originalSize = new THREE.Vector2();
  };

  var _instById = {};
  var _instByName = {};
  var _branch = "";
  var _vars = {};

  fgui.FontManager.packageFontGetter = function (name) {
    return UIPackage.getItemAssetByURL(name);
  };

  function loadTexture(pi, onProgress) {
    return new Promise(function (resolve, reject) {
      new THREE.TextureLoader().load(pi.file, function (texture) {
        texture.generateMipmaps = false;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        pi.texture = new fgui.NTexture(texture);
        resolve();
      }, onProgress, function (ev) {
        reject(ev.message);
      });
    });
  }

  function loadSound(pi, onProgress) {
    return new Promise(function (resolve, reject) {
      new THREE.AudioLoader().load(pi.file, function (buffer) {
        pi.audioBuffer = buffer;
        resolve();
      }, onProgress, function (ev) {
        reject(ev.message);
      });
    });
  }
})(fgui || (fgui = {}));

(function (fgui) {
  var Window = /*#__PURE__*/function (_fgui$GComponent9) {
    _inherits(Window, _fgui$GComponent9);

    var _super43 = _createSuper(Window);

    function Window() {
      var _this32;

      _classCallCheck(this, Window);

      _this32 = _super43.call(this);
      _this32._requestingCmd = 0;
      _this32._uiSources = [];
      _this32.bringToFontOnClick = fgui.UIConfig.bringWindowToFrontOnClick;

      _this32.on(fgui.StageEvent.AddtoStage, _this32.__onShown, _assertThisInitialized(_this32));

      _this32.on(fgui.StageEvent.RemoveFromStage, _this32.__onHidden, _assertThisInitialized(_this32));

      _this32.on(fgui.InteractiveEvents.Down, _this32.__winTouchBegin, _assertThisInitialized(_this32));

      return _this32;
    }

    _createClass(Window, [{
      key: "addUISource",
      value: function addUISource(source) {
        this._uiSources.push(source);
      }
    }, {
      key: "show",
      value: function show() {
        fgui.GRoot.inst.showWindow(this);
      }
    }, {
      key: "showOn",
      value: function showOn(root) {
        root.showWindow(this);
      }
    }, {
      key: "hide",
      value: function hide() {
        if (this.isShowing) this.doHideAnimation();
      }
    }, {
      key: "hideImmediately",
      value: function hideImmediately() {
        var r = fgui.GRoot.findFor(this.parent);
        r.hideWindowImmediately(this);
      }
    }, {
      key: "centerOn",
      value: function centerOn(r, restraint) {
        this.setPosition(Math.round((r.width - this.width) / 2), Math.round((r.height - this.height) / 2));

        if (restraint) {
          this.addRelation(r, fgui.RelationType.Center_Center);
          this.addRelation(r, fgui.RelationType.Middle_Middle);
        }
      }
    }, {
      key: "toggleStatus",
      value: function toggleStatus() {
        if (this.isTop) this.hide();else this.show();
      }
    }, {
      key: "bringToFront",
      value: function bringToFront() {
        fgui.GRoot.findFor(this).bringToFront(this);
      }
    }, {
      key: "showModalWait",
      value: function showModalWait(requestingCmd) {
        if (requestingCmd && requestingCmd != 0) this._requestingCmd = requestingCmd;

        if (fgui.UIConfig.windowModalWaiting) {
          if (!this._modalWaitPane) this._modalWaitPane = fgui.UIPackage.createObjectFromURL(fgui.UIConfig.windowModalWaiting);
          this.layoutModalWaitPane();
          this.addChild(this._modalWaitPane);
        }
      }
    }, {
      key: "layoutModalWaitPane",
      value: function layoutModalWaitPane() {
        if (this._contentArea) {
          var pt = this._frame.localToGlobal();

          pt = this.globalToLocal(pt.x, pt.y, pt);

          this._modalWaitPane.setPosition(pt.x + this._contentArea.x, pt.y + this._contentArea.y);

          this._modalWaitPane.setSize(this._contentArea.width, this._contentArea.height);
        } else this._modalWaitPane.setSize(this.width, this.height);
      }
    }, {
      key: "closeModalWait",
      value: function closeModalWait(requestingCmd) {
        if (requestingCmd && requestingCmd != 0) {
          if (this._requestingCmd != requestingCmd) return false;
        }

        this._requestingCmd = 0;
        if (this.modalWaiting) this.removeChild(this._modalWaitPane);
        return true;
      }
    }, {
      key: "init",
      value: function init() {
        if (this._inited || this._loading) return;

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

          if (!this._loading) this._init();
        } else this._init();
      }
    }, {
      key: "onInit",
      value: function onInit() {}
    }, {
      key: "onShown",
      value: function onShown() {}
    }, {
      key: "onHide",
      value: function onHide() {}
    }, {
      key: "doShowAnimation",
      value: function doShowAnimation() {
        this.onShown();
      }
    }, {
      key: "doHideAnimation",
      value: function doHideAnimation() {
        this.hideImmediately();
      }
    }, {
      key: "__uiLoadComplete",
      value: function __uiLoadComplete() {
        var cnt = this._uiSources.length;

        for (var i = 0; i < cnt; i++) {
          var lib = this._uiSources[i];
          if (!lib.loaded) return;
        }

        this._loading = false;

        this._init();
      }
    }, {
      key: "_init",
      value: function _init() {
        this._inited = true;
        this.onInit();
        if (this.isShowing) this.doShowAnimation();
      }
    }, {
      key: "dispose",
      value: function dispose() {
        if (this.parent) this.hideImmediately();

        _get(_getPrototypeOf(Window.prototype), "dispose", this).call(this);
      }
    }, {
      key: "closeEventHandler",
      value: function closeEventHandler() {
        this.hide();
      }
    }, {
      key: "__onShown",
      value: function __onShown() {
        if (!this._inited) this.init();else this.doShowAnimation();
      }
    }, {
      key: "__onHidden",
      value: function __onHidden() {
        this.closeModalWait();
        this.onHide();
      }
    }, {
      key: "__winTouchBegin",
      value: function __winTouchBegin() {
        if (this.isShowing && this.bringToFontOnClick) this.bringToFront();
      }
    }, {
      key: "__dragStart",
      value: function __dragStart(evt) {
        evt.preventDefault();
        this.startDrag();
      }
    }, {
      key: "contentPane",
      set: function set(val) {
        if (this._contentPane != val) {
          if (this._contentPane) this.removeChild(this._contentPane);
          this._contentPane = val;

          if (this._contentPane) {
            this.addChild(this._contentPane);
            this.setSize(this._contentPane.width, this._contentPane.height);

            this._contentPane.addRelation(this, fgui.RelationType.Size);

            this._frame = this._contentPane.getChild("frame");

            if (this._frame) {
              this.closeButton = this._frame.getChild("closeButton");
              this.dragArea = this._frame.getChild("dragArea");
              this.contentArea = this._frame.getChild("contentArea");
            }
          }
        }
      },
      get: function get() {
        return this._contentPane;
      }
    }, {
      key: "frame",
      get: function get() {
        return this._frame;
      }
    }, {
      key: "closeButton",
      get: function get() {
        return this._closeButton;
      },
      set: function set(value) {
        if (this._closeButton) this._closeButton.offClick(this.closeEventHandler, this);
        this._closeButton = value;
        if (this._closeButton) this._closeButton.onClick(this.closeEventHandler, this);
      }
    }, {
      key: "dragArea",
      get: function get() {
        return this._dragArea;
      },
      set: function set(value) {
        if (this._dragArea != value) {
          if (this._dragArea) {
            this._dragArea.draggable = false;

            this._dragArea.off(fgui.DragEvent.START, this.__dragStart, this);
          }

          this._dragArea = value;

          if (this._dragArea) {
            if (this._dragArea instanceof fgui.GGraph) this._dragArea.shape.drawRect(0, new fgui.Color4(0, 0), new fgui.Color4(0, 0));
            this._dragArea.draggable = true;

            this._dragArea.on(fgui.DragEvent.START, this.__dragStart, this);
          }
        }
      }
    }, {
      key: "contentArea",
      get: function get() {
        return this._contentArea;
      },
      set: function set(value) {
        this._contentArea = value;
      }
    }, {
      key: "isShowing",
      get: function get() {
        return this.parent != null;
      }
    }, {
      key: "isTop",
      get: function get() {
        return this.parent && this.parent.getChildIndex(this) == this.parent.numChildren - 1;
      }
    }, {
      key: "modal",
      get: function get() {
        return this._modal;
      },
      set: function set(val) {
        this._modal = val;
      }
    }, {
      key: "modalWaiting",
      get: function get() {
        return this._modalWaitPane != null && this._modalWaitPane.parent != null;
      }
    }]);

    return Window;
  }(fgui.GComponent);

  fgui.Window = Window;
})(fgui || (fgui = {}));

(function (fgui) {
  var ByteBuffer = /*#__PURE__*/function () {
    function ByteBuffer(buffer, offset, length) {
      _classCallCheck(this, ByteBuffer);

      this.version = 0;
      offset = offset || 0;
      if (length == null || length == -1) length = buffer.byteLength - offset;
      this._buffer = buffer;
      this._view = new DataView(this._buffer, offset, length);
      this._pos = 0;
      this._length = length;
    }

    _createClass(ByteBuffer, [{
      key: "skip",
      value: function skip(count) {
        this._pos += count;
      }
    }, {
      key: "validate",
      value: function validate(forward) {
        if (this._pos + forward > this._length) throw "Out of bounds";
      }
    }, {
      key: "readByte",
      value: function readByte() {
        this.validate(1);

        var ret = this._view.getUint8(this._pos);

        this._pos++;
        return ret;
      }
    }, {
      key: "readBool",
      value: function readBool() {
        return this.readByte() == 1;
      }
    }, {
      key: "readShort",
      value: function readShort() {
        this.validate(2);

        var ret = this._view.getInt16(this._pos, this.littleEndian);

        this._pos += 2;
        return ret;
      }
    }, {
      key: "readUshort",
      value: function readUshort() {
        this.validate(2);

        var ret = this._view.getUint16(this._pos, this.littleEndian);

        this._pos += 2;
        return ret;
      }
    }, {
      key: "readInt",
      value: function readInt() {
        this.validate(4);

        var ret = this._view.getInt32(this._pos, this.littleEndian);

        this._pos += 4;
        return ret;
      }
    }, {
      key: "readUint",
      value: function readUint() {
        this.validate(4);

        var ret = this._view.getUint32(this._pos, this.littleEndian);

        this._pos += 4;
        return ret;
      }
    }, {
      key: "readFloat",
      value: function readFloat() {
        this.validate(4);

        var ret = this._view.getFloat32(this._pos, this.littleEndian);

        this._pos += 4;
        return ret;
      }
    }, {
      key: "readString",
      value: function readString(len) {
        if (len == undefined) len = this.readUshort();
        this.validate(len);
        var decoder = new TextDecoder();
        var ret = decoder.decode(new DataView(this._buffer, this._view.byteOffset + this._pos, len));
        this._pos += len;
        return ret;
      }
    }, {
      key: "readS",
      value: function readS() {
        var index = this.readUshort();
        if (index == 65534) return null;else if (index == 65533) return "";else return this.stringTable[index];
      }
    }, {
      key: "readSArray",
      value: function readSArray(cnt) {
        var ret = new Array(cnt);

        for (var i = 0; i < cnt; i++) {
          ret[i] = this.readS();
        }

        return ret;
      }
    }, {
      key: "writeS",
      value: function writeS(value) {
        var index = this.readUshort();
        if (index != 65534 && index != 65533) this.stringTable[index] = value;
      }
    }, {
      key: "readColor",
      value: function readColor() {
        var r = this.readByte();
        var g = this.readByte();
        var b = this.readByte();
        this.readByte();
        return (r << 16) + (g << 8) + b;
      }
    }, {
      key: "readFullColor",
      value: function readFullColor() {
        var r = this.readByte();
        var g = this.readByte();
        var b = this.readByte();
        var a = this.readByte();
        return new fgui.Color4((r << 16) + (g << 8) + b, a / 255);
      }
    }, {
      key: "readChar",
      value: function readChar() {
        var i = this.readUshort();
        return String.fromCharCode(i);
      }
    }, {
      key: "readBuffer",
      value: function readBuffer() {
        var count = this.readUint();
        this.validate(count);
        var ba = new ByteBuffer(this._buffer, this._view.byteOffset + this._pos, count);
        ba.stringTable = this.stringTable;
        ba.version = this.version;
        this._pos += count;
        return ba;
      }
    }, {
      key: "seek",
      value: function seek(indexTablePos, blockIndex) {
        var tmp = this._pos;
        this._pos = indexTablePos;
        var segCount = this.readByte();

        if (blockIndex < segCount) {
          var useShort = this.readByte() == 1;
          var newPos;

          if (useShort) {
            this._pos += 2 * blockIndex;
            newPos = this.readUshort();
          } else {
            this._pos += 4 * blockIndex;
            newPos = this.readUint();
          }

          if (newPos > 0) {
            this._pos = indexTablePos + newPos;
            return true;
          } else {
            this._pos = tmp;
            return false;
          }
        } else {
          this._pos = tmp;
          return false;
        }
      }
    }, {
      key: "data",
      get: function get() {
        return this._buffer;
      }
    }, {
      key: "pos",
      get: function get() {
        return this._pos;
      },
      set: function set(value) {
        if (value > this._length) throw "Out of bounds";
        this._pos = value;
      }
    }, {
      key: "length",
      get: function get() {
        return this._length;
      }
    }]);

    return ByteBuffer;
  }();

  fgui.ByteBuffer = ByteBuffer;
})(fgui || (fgui = {}));

(function (fgui) {
  var LUMA_R = 0.299;
  var LUMA_G = 0.587;
  var LUMA_B = 0.114;
  var IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
  var LENGTH = IDENTITY_MATRIX.length;

  var ColorMatrix = /*#__PURE__*/function () {
    function ColorMatrix() {
      _classCallCheck(this, ColorMatrix);

      this.matrix = new Array(LENGTH);
      this.reset();
    }

    _createClass(ColorMatrix, [{
      key: "reset",
      value: function reset() {
        for (var i = 0; i < LENGTH; i++) {
          this.matrix[i] = IDENTITY_MATRIX[i];
        }
      }
    }, {
      key: "invert",
      value: function invert() {
        this.multiplyMatrix([-1, 0, 0, 0, 255, 0, -1, 0, 0, 255, 0, 0, -1, 0, 255, 0, 0, 0, 1, 0]);
      }
    }, {
      key: "adjustColor",
      value: function adjustColor(p_brightness, p_contrast, p_saturation, p_hue) {
        this.adjustBrightness(p_brightness);
        this.adjustContrast(p_contrast);
        this.adjustSaturation(p_saturation);
        this.adjustHue(p_hue);
      }
    }, {
      key: "adjustBrightness",
      value: function adjustBrightness(p_val) {
        p_val = this.cleanValue(p_val, 1) * 255;
        this.multiplyMatrix([1, 0, 0, 0, p_val, 0, 1, 0, 0, p_val, 0, 0, 1, 0, p_val, 0, 0, 0, 1, 0]);
      }
    }, {
      key: "adjustContrast",
      value: function adjustContrast(p_val) {
        p_val = this.cleanValue(p_val, 1);
        var s = p_val + 1;
        var o = 128 * (1 - s);
        this.multiplyMatrix([s, 0, 0, 0, o, 0, s, 0, 0, o, 0, 0, s, 0, o, 0, 0, 0, 1, 0]);
      }
    }, {
      key: "adjustSaturation",
      value: function adjustSaturation(p_val) {
        p_val = this.cleanValue(p_val, 1);
        p_val += 1;
        var invSat = 1 - p_val;
        var invLumR = invSat * LUMA_R;
        var invLumG = invSat * LUMA_G;
        var invLumB = invSat * LUMA_B;
        this.multiplyMatrix([invLumR + p_val, invLumG, invLumB, 0, 0, invLumR, invLumG + p_val, invLumB, 0, 0, invLumR, invLumG, invLumB + p_val, 0, 0, 0, 0, 0, 1, 0]);
      }
    }, {
      key: "adjustHue",
      value: function adjustHue(p_val) {
        p_val = this.cleanValue(p_val, 1);
        p_val *= Math.PI;
        var cos = Math.cos(p_val);
        var sin = Math.sin(p_val);
        this.multiplyMatrix([LUMA_R + cos * (1 - LUMA_R) + sin * -LUMA_R, LUMA_G + cos * -LUMA_G + sin * -LUMA_G, LUMA_B + cos * -LUMA_B + sin * (1 - LUMA_B), 0, 0, LUMA_R + cos * -LUMA_R + sin * 0.143, LUMA_G + cos * (1 - LUMA_G) + sin * 0.14, LUMA_B + cos * -LUMA_B + sin * -0.283, 0, 0, LUMA_R + cos * -LUMA_R + sin * -(1 - LUMA_R), LUMA_G + cos * -LUMA_G + sin * LUMA_G, LUMA_B + cos * (1 - LUMA_B) + sin * LUMA_B, 0, 0, 0, 0, 0, 1, 0]);
      }
    }, {
      key: "concat",
      value: function concat(p_matrix) {
        if (p_matrix.length != LENGTH) {
          return;
        }

        this.multiplyMatrix(p_matrix);
      }
    }, {
      key: "clone",
      value: function clone() {
        var result = new ColorMatrix();
        result.copyMatrix(this.matrix);
        return result;
      }
    }, {
      key: "copyMatrix",
      value: function copyMatrix(p_matrix) {
        var l = LENGTH;

        for (var i = 0; i < l; i++) {
          this.matrix[i] = p_matrix[i];
        }
      }
    }, {
      key: "multiplyMatrix",
      value: function multiplyMatrix(p_matrix) {
        var col = [];
        var i = 0;

        for (var y = 0; y < 4; ++y) {
          for (var x = 0; x < 5; ++x) {
            col[i + x] = p_matrix[i] * this.matrix[x] + p_matrix[i + 1] * this.matrix[x + 5] + p_matrix[i + 2] * this.matrix[x + 10] + p_matrix[i + 3] * this.matrix[x + 15] + (x == 4 ? p_matrix[i + 4] : 0);
          }

          i += 5;
        }

        this.copyMatrix(col);
      }
    }, {
      key: "cleanValue",
      value: function cleanValue(p_val, p_limit) {
        return Math.min(p_limit, Math.max(-p_limit, p_val));
      }
    }], [{
      key: "create",
      value: function create(p_brightness, p_contrast, p_saturation, p_hue) {
        var ret = new ColorMatrix();
        ret.adjustColor(p_brightness, p_contrast, p_saturation, p_hue);
        return ret;
      }
    }, {
      key: "getMatrix",
      value: function getMatrix(p_brightness, p_contrast, p_saturation, p_hue, result) {
        if (!result) result = new Array(ColorMatrix.length);
        var mat = helper;
        mat.reset();
        mat.adjustColor(p_brightness, p_contrast, p_saturation, p_hue);
        var l = LENGTH;

        for (var i = 0; i < l; i++) {
          result[i] = mat.matrix[i];
        }

        return result;
      }
    }]);

    return ColorMatrix;
  }();

  fgui.ColorMatrix = ColorMatrix;
  var helper = new ColorMatrix();
})(fgui || (fgui = {}));

(function (fgui) {
  var Timers = /*#__PURE__*/function () {
    function Timers() {
      _classCallCheck(this, Timers);
    }

    _createClass(Timers, null, [{
      key: "add",
      value: function add(delayInMiniseconds, repeat, callback, target, callbackParam) {
        var item;

        var index = _items.findIndex(function (e) {
          return e.target == target && e.callback == callback;
        });

        if (index != -1) item = _items[index];else {
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
    }, {
      key: "callLater",
      value: function callLater(callback, target, callbackParam) {
        this.add(0, 1, callback, target, callbackParam);
      }
    }, {
      key: "callDelay",
      value: function callDelay(delay, callback, target, callbackParam) {
        this.add(delay, 1, callback, target, callbackParam);
      }
    }, {
      key: "addUpdate",
      value: function addUpdate(callback, target, callbackParam) {
        this.add(0, 0, callback, target, callbackParam);
      }
    }, {
      key: "exists",
      value: function exists(callback, target) {
        return _items.findIndex(function (e) {
          return e.target == target && e.callback == callback;
        }) != -1;
      }
    }, {
      key: "remove",
      value: function remove(callback, target) {
        var index = _items.findIndex(function (e) {
          return e.target == target && e.callback == callback;
        });

        if (index != -1) {
          var item = _items[index];

          _items.splice(index, 1);

          if (index < _enumI) _enumI--;
          _enumCount--;

          _pool.returns(item);
        }
      }
    }]);

    return Timers;
  }();

  Timers.deltaTime = 0;
  Timers.time = 0;
  Timers.frameCount = 0;
  fgui.Timers = Timers;

  var TimerItem = /*#__PURE__*/function () {
    function TimerItem() {
      _classCallCheck(this, TimerItem);

      this.delay = 0;
      this.counter = 0;
      this.repeat = 0;
    }

    _createClass(TimerItem, [{
      key: "advance",
      value: function advance(elapsed) {
        this.counter += elapsed;

        if (this.counter >= this.delay) {
          this.counter -= this.delay;
          if (this.counter > this.delay) this.counter = this.delay;

          if (this.repeat > 0) {
            this.repeat--;
            if (this.repeat == 0) this.end = true;
          }

          return true;
        } else return false;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.callback = null;
        this.target = null;
        this.param = null;
      }
    }]);

    return TimerItem;
  }();

  var _items = new Array();

  var _pool = new fgui.Pool(TimerItem, function (e) {
    return e.reset();
  });

  var _enumI = 0;
  var _enumCount = 0;
  var _lastTime = 0;
  requestAnimationFrame(__timer);

  function __timer(timeStamp) {
    requestAnimationFrame(__timer);
    Timers.frameCount++;
    Timers.time = timeStamp;
    var deltaTime = timeStamp - _lastTime;
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
        if (item.end) _pool.returns(item);
      }
    }

    return false;
  }
})(fgui || (fgui = {}));

(function (fgui) {
  function convertToHtmlColor(argb, hasAlpha) {
    var alpha;
    if (hasAlpha) alpha = (argb >> 24 & 0xFF).toString(16);else alpha = "";
    var red = (argb >> 16 & 0xFF).toString(16);
    var green = (argb >> 8 & 0xFF).toString(16);
    var blue = (argb & 0xFF).toString(16);
    if (alpha.length == 1) alpha = "0" + alpha;
    if (red.length == 1) red = "0" + red;
    if (green.length == 1) green = "0" + green;
    if (blue.length == 1) blue = "0" + blue;
    return "#" + alpha + red + green + blue;
  }

  fgui.convertToHtmlColor = convertToHtmlColor;

  function convertFromHtmlColor(str, hasAlpha) {
    if (str.length < 1) return 0;
    if (str.charAt(0) == "#") str = str.substr(1);
    if (str.length == 8) return (parseInt(str.substr(0, 2), 16) << 24) + parseInt(str.substr(2), 16);else if (hasAlpha) return 0xFF000000 + parseInt(str, 16);else return parseInt(str, 16);
  }

  fgui.convertFromHtmlColor = convertFromHtmlColor;

  function clamp(value, min, max) {
    if (value < min) value = min;else if (value > max) value = max;
    return value;
  }

  fgui.clamp = clamp;

  function clamp01(value) {
    if (isNaN(value)) value = 0;else if (value > 1) value = 1;else if (value < 0) value = 0;
    return value;
  }

  fgui.clamp01 = clamp01;

  function lerp(start, end, percent) {
    return start + percent * (end - start);
  }

  fgui.lerp = lerp;

  function repeat(t, length) {
    return t - Math.floor(t / length) * length;
  }

  fgui.repeat = repeat;

  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  fgui.distance = distance;
})(fgui || (fgui = {}));

(function (fgui) {
  var UBBParser = /*#__PURE__*/function () {
    function UBBParser() {
      _classCallCheck(this, UBBParser);

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

    _createClass(UBBParser, [{
      key: "onTag_URL",
      value: function onTag_URL(tagName, end, attr) {
        if (!end) {
          if (attr != null) return "<a href=\"" + attr + "\">";else {
            var href = this.getTagText();
            return "<a href=\"" + href + "\">";
          }
        } else return "</a>";
      }
    }, {
      key: "onTag_IMG",
      value: function onTag_IMG(tagName, end, attr) {
        if (!end) {
          var src = this.getTagText(true);
          if (!src) return null;
          if (this.defaultImgWidth) return "<img src=\"" + src + "\" width=\"" + this.defaultImgWidth + "\" height=\"" + this.defaultImgHeight + "\"/>";else return "<img src=\"" + src + "\"/>";
        } else return null;
      }
    }, {
      key: "onTag_B",
      value: function onTag_B(tagName, end, attr) {
        return end ? "</b>" : "<b>";
      }
    }, {
      key: "onTag_I",
      value: function onTag_I(tagName, end, attr) {
        return end ? "</i>" : "<i>";
      }
    }, {
      key: "onTag_U",
      value: function onTag_U(tagName, end, attr) {
        return end ? "</u>" : "<u>";
      }
    }, {
      key: "onTag_Simple",
      value: function onTag_Simple(tagName, end, attr) {
        return end ? "</" + tagName + ">" : "<" + tagName + ">";
      }
    }, {
      key: "onTag_COLOR",
      value: function onTag_COLOR(tagName, end, attr) {
        if (!end) {
          this.lastColor = attr;
          return "<font color=\"" + attr + "\">";
        } else return "</font>";
      }
    }, {
      key: "onTag_FONT",
      value: function onTag_FONT(tagName, end, attr) {
        if (!end) return "<font face=\"" + attr + "\">";else return "</font>";
      }
    }, {
      key: "onTag_SIZE",
      value: function onTag_SIZE(tagName, end, attr) {
        if (!end) {
          this.lastSize = attr;
          return "<font size=\"" + attr + "\">";
        } else return "</font>";
      }
    }, {
      key: "getTagText",
      value: function getTagText(remove) {
        var pos1 = this._readPos;
        var pos2;
        var result = "";

        while ((pos2 = this._text.indexOf("[", pos1)) != -1) {
          if (this._text.charCodeAt(pos2 - 1) == 92) {
            result += this._text.substring(pos1, pos2 - 1);
            result += "[";
            pos1 = pos2 + 1;
          } else {
            result += this._text.substring(pos1, pos2);
            break;
          }
        }

        if (pos2 == -1) return null;
        if (remove) this._readPos = pos2;
        return result;
      }
    }, {
      key: "parse",
      value: function parse(text, remove) {
        this._text = text;
        this.lastColor = null;
        this.lastSize = null;
        var pos1 = 0,
            pos2,
            pos3;
        var end;
        var tag, attr;
        var repl;
        var func;
        var result = "";

        while ((pos2 = this._text.indexOf("[", pos1)) != -1) {
          if (pos2 > 0 && this._text.charCodeAt(pos2 - 1) == 92) {
            result += this._text.substring(pos1, pos2 - 1);
            result += "[";
            pos1 = pos2 + 1;
            continue;
          }

          result += this._text.substring(pos1, pos2);
          pos1 = pos2;
          pos2 = this._text.indexOf("]", pos1);
          if (pos2 == -1) break;
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
              if (repl != null) result += repl;
            }
          } else result += this._text.substring(pos1, this._readPos);

          pos1 = this._readPos;
        }

        if (pos1 < this._text.length) result += this._text.substr(pos1);
        this._text = null;
        return result;
      }
    }]);

    return UBBParser;
  }();

  fgui.UBBParser = UBBParser;
  fgui.defaultParser = new UBBParser();
})(fgui || (fgui = {}));

(function (fgui) {
  var HtmlElementType;

  (function (HtmlElementType) {
    HtmlElementType[HtmlElementType["Text"] = 0] = "Text";
    HtmlElementType[HtmlElementType["Link"] = 1] = "Link";
    HtmlElementType[HtmlElementType["Image"] = 2] = "Image";
    HtmlElementType[HtmlElementType["Input"] = 3] = "Input";
    HtmlElementType[HtmlElementType["Select"] = 4] = "Select";
    HtmlElementType[HtmlElementType["Object"] = 5] = "Object";
    HtmlElementType[HtmlElementType["LinkEnd"] = 6] = "LinkEnd";
  })(HtmlElementType = fgui.HtmlElementType || (fgui.HtmlElementType = {}));

  var HtmlElement = /*#__PURE__*/function () {
    function HtmlElement() {
      _classCallCheck(this, HtmlElement);

      this.format = new fgui.TextFormat();
      this.position = new THREE.Vector2();
    }

    _createClass(HtmlElement, [{
      key: "getAttr",
      value: function getAttr(attrName) {
        if (this._attributes == null) return null;
        return this._attributes[attrName];
      }
    }, {
      key: "setAttr",
      value: function setAttr(attrName, attrValue) {
        if (this._attributes == null) this._attributes = {};
        this._attributes[attrName] = attrValue;
      }
    }, {
      key: "getAttrString",
      value: function getAttrString(attrName, defValue) {
        return fgui.XMLUtils.getString(this._attributes, attrName, defValue);
      }
    }, {
      key: "getAttrInt",
      value: function getAttrInt(attrName, defValue) {
        return fgui.XMLUtils.getInt(this._attributes, attrName, defValue);
      }
    }, {
      key: "getAttrFloat",
      value: function getAttrFloat(attrName, defValue) {
        return fgui.XMLUtils.getFloat(this._attributes, attrName, defValue);
      }
    }, {
      key: "getAttrBool",
      value: function getAttrBool(attrName, defValue) {
        return fgui.XMLUtils.getBool(this._attributes, attrName, defValue);
      }
    }, {
      key: "getAttrColor",
      value: function getAttrColor(attrName, defValue) {
        return fgui.XMLUtils.getColor(this._attributes, attrName, defValue);
      }
    }, {
      key: "fetchAttributes",
      value: function fetchAttributes() {
        this._attributes = fgui.XMLIterator.getAttributes(this._attributes);
      }
    }, {
      key: "reset",
      value: function reset() {
        this.name = null;
        this.text = null;
        this.htmlObject = null;
        this.status = 0;
        this._attributes = null;
      }
    }, {
      key: "isEntity",
      get: function get() {
        return this.type == HtmlElementType.Image || this.type == HtmlElementType.Select || this.type == HtmlElementType.Input || this.type == HtmlElementType.Object;
      }
    }]);

    return HtmlElement;
  }();

  fgui.HtmlElement = HtmlElement;
  fgui.elementPool = new fgui.Pool(HtmlElement, function (element) {
    element.type = arguments.length <= 1 ? undefined : arguments[1];
    if (element.type != HtmlElementType.Text && element._attributes == null) element._attributes = {};
  }, function (element) {
    return element.reset();
  });
})(fgui || (fgui = {}));

(function (fgui) {
  var HtmlImage = /*#__PURE__*/function () {
    function HtmlImage() {
      _classCallCheck(this, HtmlImage);

      this.loader = fgui.Decls.UIObjectFactory.newObject(fgui.ObjectType.Loader);
      this.loader.fill = fgui.LoaderFillType.ScaleFree;
      this.loader.touchable = false;
    }

    _createClass(HtmlImage, [{
      key: "create",
      value: function create(owner, element) {
        this._owner = owner;
        this._element = element;
        var sourceWidth = 0;
        var sourceHeight = 0;
        var src = element.getAttrString("src");

        if (src != null) {
          var pi = fgui.UIPackage.getItemByURL(src);

          if (pi) {
            sourceWidth = pi.width;
            sourceHeight = pi.height;
          }
        }

        this.loader.url = src;
        var width = element.getAttrInt("width", sourceWidth);
        var height = element.getAttrInt("height", sourceHeight);
        if (width == 0) width = 5;
        if (height == 0) height = 10;
        this.loader.setSize(width, height);
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        this.loader.setPosition(x, y);
      }
    }, {
      key: "add",
      value: function add() {
        this._owner.addChild(this.loader.displayObject);
      }
    }, {
      key: "remove",
      value: function remove() {
        if (this.loader.displayObject.parent) this._owner.removeChild(this.loader.displayObject);
      }
    }, {
      key: "release",
      value: function release() {
        this.loader.offAll();
        this.loader.url = null;
        this._owner = null;
        this._element = null;
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this.loader.dispose();
      }
    }, {
      key: "displayObject",
      get: function get() {
        return this.loader.displayObject;
      }
    }, {
      key: "element",
      get: function get() {
        return this._element;
      }
    }, {
      key: "width",
      get: function get() {
        return this.loader.width;
      }
    }, {
      key: "height",
      get: function get() {
        return this.loader.height;
      }
    }]);

    return HtmlImage;
  }();

  fgui.HtmlImage = HtmlImage;
})(fgui || (fgui = {}));

(function (fgui) {
  var HtmlLink = /*#__PURE__*/function () {
    function HtmlLink() {
      var _this33 = this;

      _classCallCheck(this, HtmlLink);

      this._shape = new fgui.SelectionShape();

      this._shape.on(fgui.InteractiveEvents.Click, function () {
        fgui.bubbleEvent(_this33._owner.obj3D, fgui.TextEvent.LinkClick, _this33._element.getAttrString("href"));
      });
    }

    _createClass(HtmlLink, [{
      key: "create",
      value: function create(owner, element) {
        this._owner = owner;
        this._element = element;
      }
    }, {
      key: "setArea",
      value: function setArea(startLine, startCharX, endLine, endCharX) {
        if (startLine == endLine && startCharX > endCharX) {
          var tmp = startCharX;
          startCharX = endCharX;
          endCharX = tmp;
        }

        this._shape.rects.length = 0;

        this._owner.getLinesShape(startLine, startCharX, endLine, endCharX, true, this._shape.rects);

        this._shape.refresh();
      }
    }, {
      key: "setPosition",
      value: function setPosition(x, y) {
        this._shape.setPosition(x, y);
      }
    }, {
      key: "add",
      value: function add() {
        this._owner.addChild(this._shape);
      }
    }, {
      key: "remove",
      value: function remove() {
        if (this._shape.parent) this._owner.removeChild(this._shape);
      }
    }, {
      key: "release",
      value: function release() {
        this._shape.offAll();

        this._owner = null;
        this._element = null;
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this._shape.dispose();
      }
    }, {
      key: "displayObject",
      get: function get() {
        return this._shape;
      }
    }, {
      key: "element",
      get: function get() {
        return this._element;
      }
    }, {
      key: "width",
      get: function get() {
        return 0;
      }
    }, {
      key: "height",
      get: function get() {
        return 0;
      }
    }]);

    return HtmlLink;
  }();

  fgui.HtmlLink = HtmlLink;
})(fgui || (fgui = {}));

(function (fgui) {
  var HtmlPageContext = /*#__PURE__*/function () {
    function HtmlPageContext() {
      _classCallCheck(this, HtmlPageContext);

      this._imagePool = new fgui.Pool(fgui.HtmlImage);
      this._linkPool = new fgui.Pool(fgui.HtmlLink);
    }

    _createClass(HtmlPageContext, [{
      key: "createObject",
      value: function createObject(owner, element) {
        var ret = null;
        if (element.type == fgui.HtmlElementType.Image) ret = this._imagePool.borrow();else if (element.type == fgui.HtmlElementType.Link) ret = this._linkPool.borrow();
        if (ret) ret.create(owner, element);
        return ret;
      }
    }, {
      key: "freeObject",
      value: function freeObject(obj) {
        obj.release();
        if (obj instanceof fgui.HtmlImage) this._imagePool.returns(obj);else if (obj instanceof fgui.HtmlLink) this._linkPool.returns(obj);
      }
    }]);

    return HtmlPageContext;
  }();

  fgui.HtmlPageContext = HtmlPageContext;
  fgui.defaultContext = new HtmlPageContext();
})(fgui || (fgui = {}));

(function (fgui) {
  var HtmlParseOptions = function HtmlParseOptions() {
    _classCallCheck(this, HtmlParseOptions);

    this.linkUnderline = HtmlParseOptions.defaultLinkUnderline;
    this.linkColor = HtmlParseOptions.defaultLinkColor;
  };

  HtmlParseOptions.defaultLinkUnderline = true;
  HtmlParseOptions.defaultLinkColor = 0x3A67CC;
  fgui.HtmlParseOptions = HtmlParseOptions;
})(fgui || (fgui = {}));

(function (fgui) {
  var s_list1 = new Array();
  var s_list2 = new Array();

  var HtmlParser = /*#__PURE__*/function () {
    function HtmlParser() {
      _classCallCheck(this, HtmlParser);

      this._textFormatStack = new Array();
      this._format = new fgui.TextFormat();
      this._defaultOptions = new fgui.HtmlParseOptions();
    }

    _createClass(HtmlParser, [{
      key: "parse",
      value: function parse(aSource, defaultFormat, elements, parseOptions) {
        if (parseOptions == null) parseOptions = this._defaultOptions;
        this._elements = elements;
        this._textFormatStackTop = 0;

        this._format.copy(defaultFormat);

        this._format["colorChanged"] = false;
        var skipText = 0;
        var ignoreWhiteSpace = parseOptions.ignoreWhiteSpace;
        var skipNextCR = false;
        var text;
        fgui.XMLIterator.begin(aSource, true);

        while (fgui.XMLIterator.nextTag()) {
          if (skipText == 0) {
            text = fgui.XMLIterator.getText(ignoreWhiteSpace);

            if (text.length > 0) {
              if (skipNextCR && text[0] == '\n') text = text.substr(1);
              this.appendText(text);
            }
          }

          skipNextCR = false;

          switch (fgui.XMLIterator.tagName) {
            case "b":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) {
                this.pushTextFormat();
                this._format.bold = true;
              } else this.popTextFormat();

              break;

            case "i":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) {
                this.pushTextFormat();
                this._format.italic = true;
              } else this.popTextFormat();

              break;

            case "u":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) {
                this.pushTextFormat();
                this._format.underline = true;
              } else this.popTextFormat();

              break;

            case "strike":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) {
                this.pushTextFormat();
                this._format.strikethrough = true;
              } else this.popTextFormat();

              break;

            case "font":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) {
                this.pushTextFormat();
                this._format.size = fgui.XMLUtils.getInt(fgui.XMLIterator.attributes, "size", this._format.size);
                var color = fgui.XMLIterator.getAttribute("color");
                if (color != null) this._format.color = fgui.convertFromHtmlColor(color);
              } else if (fgui.XMLIterator.tagType == fgui.XMLTagType.End) this.popTextFormat();

              break;

            case "br":
              this.appendText("\n");
              break;

            case "img":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start || fgui.XMLIterator.tagType == fgui.XMLTagType.Void) {
                var element = fgui.elementPool.borrow(fgui.HtmlElementType.Image);
                element.fetchAttributes();
                element.name = element.getAttrString("name");
                element.format.align = this._format.align;

                this._elements.push(element);
              }

              break;

            case "a":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) {
                this.pushTextFormat();
                this._format.underline = this._format.underline || parseOptions.linkUnderline;
                if (!this._format["colorChanged"]) this._format.color = parseOptions.linkColor;

                var _element2 = fgui.elementPool.borrow(fgui.HtmlElementType.Link);

                _element2.fetchAttributes();

                _element2.name = _element2.getAttrString("name");
                _element2.format.align = this._format.align;

                this._elements.push(_element2);
              } else if (fgui.XMLIterator.tagType == fgui.XMLTagType.End) {
                this.popTextFormat();

                var _element3 = fgui.elementPool.borrow(fgui.HtmlElementType.LinkEnd);

                this._elements.push(_element3);
              }

              break;

            case "input":
              {
                var _element4 = fgui.elementPool.borrow(fgui.HtmlElementType.Input);

                _element4.fetchAttributes();

                _element4.name = _element4.getAttrString("name");

                _element4.format.copy(this._format);

                this._elements.push(_element4);
              }
              break;

            case "select":
              {
                if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start || fgui.XMLIterator.tagType == fgui.XMLTagType.Void) {
                  var _element5 = fgui.elementPool.borrow(fgui.HtmlElementType.Select);

                  _element5.fetchAttributes();

                  if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) {
                    s_list1.length = 0;
                    s_list2.length = 0;

                    while (fgui.XMLIterator.nextTag()) {
                      if (fgui.XMLIterator.tagName == "select") break;

                      if (fgui.XMLIterator.tagName == "option") {
                        if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start || fgui.XMLIterator.tagType == fgui.XMLTagType.Void) s_list2.push(fgui.XMLUtils.getString(fgui.XMLIterator.attributes, "value", ""));else s_list1.push(fgui.XMLIterator.getText());
                      }
                    }

                    _element5.setAttr("items", s_list1.slice());

                    _element5.setAttr("values", s_list2.slice());
                  }

                  _element5.name = _element5.getAttrString("name");

                  _element5.format.copy(this._format);

                  this._elements.push(_element5);
                }
              }
              break;

            case "p":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) {
                this.pushTextFormat();
                this._format.align = fgui.XMLIterator.getAttribute("align");
                if (!this.isNewLine()) this.appendText("\n");
              } else if (fgui.XMLIterator.tagType == fgui.XMLTagType.End) {
                this.appendText("\n");
                skipNextCR = true;
                this.popTextFormat();
              }

              break;

            case "ui":
            case "div":
            case "li":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) {
                if (!this.isNewLine()) this.appendText("\n");
              } else {
                this.appendText("\n");
                skipNextCR = true;
              }

              break;

            case "html":
            case "body":
              ignoreWhiteSpace = true;
              break;

            case "head":
            case "style":
            case "script":
            case "form":
              if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start) skipText++;else if (fgui.XMLIterator.tagType == fgui.XMLTagType.End) skipText--;
              break;
          }
        }

        if (skipText == 0) {
          text = fgui.XMLIterator.getText(ignoreWhiteSpace);

          if (text.length > 0) {
            if (skipNextCR && text[0] == '\n') text = text.substr(1);
            this.appendText(text);
          }
        }

        this._elements = null;
      }
    }, {
      key: "pushTextFormat",
      value: function pushTextFormat() {
        var tf;

        if (this._textFormatStack.length <= this._textFormatStackTop) {
          tf = new fgui.TextFormat();

          this._textFormatStack.push(tf);
        } else tf = this._textFormatStack[this._textFormatStackTop];

        tf.copy(this._format);
        tf["colorChanged"] = this._format["colorChanged"];
        this._textFormatStackTop++;
      }
    }, {
      key: "popTextFormat",
      value: function popTextFormat() {
        if (this._textFormatStackTop > 0) {
          var tf = this._textFormatStack[this._textFormatStackTop - 1];

          this._format.copy(tf);

          this._format["colorChanged"] = tf["colorChanged"];
          this._textFormatStackTop--;
        }
      }
    }, {
      key: "isNewLine",
      value: function isNewLine() {
        if (this._elements.length > 0) {
          var element = this._elements[this._elements.length - 1];
          if (element && element.type == fgui.HtmlElementType.Text) return element.text.endsWith("\n");else return false;
        }

        return true;
      }
    }, {
      key: "appendText",
      value: function appendText(text) {
        var element;

        if (this._elements.length > 0) {
          element = this._elements[this._elements.length - 1];

          if (element.type == fgui.HtmlElementType.Text && element.format.equalStyle(this._format)) {
            element.text += text;
            return;
          }
        }

        element = fgui.elementPool.borrow(fgui.HtmlElementType.Text);
        element.text = text;
        element.format.copy(this._format);

        this._elements.push(element);
      }
    }]);

    return HtmlParser;
  }();

  fgui.HtmlParser = HtmlParser;
  fgui.htmldefaultParser = new HtmlParser();
})(fgui || (fgui = {}));

(function (fgui) {
  var XML = /*#__PURE__*/function () {
    function XML(XmlString) {
      _classCallCheck(this, XML);

      if (XmlString) this.parse(XmlString);
    }

    _createClass(XML, [{
      key: "getAttrString",
      value: function getAttrString(attrName, defValue) {
        return fgui.XMLUtils.getString(this._attributes, attrName, defValue);
      }
    }, {
      key: "getAttrInt",
      value: function getAttrInt(attrName, defValue) {
        return fgui.XMLUtils.getInt(this._attributes, attrName, defValue);
      }
    }, {
      key: "getAttrFloat",
      value: function getAttrFloat(attrName, defValue) {
        return fgui.XMLUtils.getFloat(this._attributes, attrName, defValue);
      }
    }, {
      key: "getAttrBool",
      value: function getAttrBool(attrName, defValue) {
        return fgui.XMLUtils.getBool(this._attributes, attrName, defValue);
      }
    }, {
      key: "getAttrColor",
      value: function getAttrColor(attrName, defValue) {
        return fgui.XMLUtils.getColor(this._attributes, attrName, defValue);
      }
    }, {
      key: "setAttribute",
      value: function setAttribute(attrName, attrValue) {
        if (!this._attributes) this._attributes = {};
        this._attributes[attrName] = attrValue;
      }
    }, {
      key: "getNode",
      value: function getNode(selector) {
        if (!this._children) return null;else this._children.find(function (value) {
          return value.name == selector;
        });
      }
    }, {
      key: "elements",
      value: function elements(selector) {
        if (!this._children) this._children = new Array();
        if (selector) return this._children.filter(function (value) {
          return value.name == selector;
        });else return this._children;
      }
    }, {
      key: "parse",
      value: function parse(aSource) {
        this.reset();
        var lastOpenNode;
        var nodeStack = new Array();
        fgui.XMLIterator.begin(aSource);

        while (fgui.XMLIterator.nextTag()) {
          if (fgui.XMLIterator.tagType == fgui.XMLTagType.Start || fgui.XMLIterator.tagType == fgui.XMLTagType.Void) {
            var childNode = void 0;
            if (lastOpenNode) childNode = new XML();else {
              if (this.name != null) {
                this.reset();
                throw new Error("Invalid xml format - no root node.");
              }

              childNode = this;
            }
            childNode.name = fgui.XMLIterator.tagName;
            childNode._attributes = fgui.XMLIterator.getAttributes(childNode._attributes);

            if (lastOpenNode) {
              if (fgui.XMLIterator.tagType != fgui.XMLTagType.Void) nodeStack.push(lastOpenNode);
              if (lastOpenNode._children == null) lastOpenNode._children = new Array();

              lastOpenNode._children.push(childNode);
            }

            if (fgui.XMLIterator.tagType != fgui.XMLTagType.Void) lastOpenNode = childNode;
          } else if (fgui.XMLIterator.tagType == fgui.XMLTagType.End) {
            if (lastOpenNode == null || lastOpenNode.name != fgui.XMLIterator.tagName) {
              this.reset();
              throw new Error("Invalid xml format - <" + fgui.XMLIterator.tagName + "> dismatched.");
            }

            if (lastOpenNode._children == null || lastOpenNode._children.length == 0) {
              lastOpenNode.text = fgui.XMLIterator.getText();
            }

            if (nodeStack.length > 0) lastOpenNode = nodeStack.pop();else lastOpenNode = null;
          }
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this._attributes = null;
        if (this._children != null) this._children.length == 0;
        this.text = null;
      }
    }, {
      key: "attributes",
      get: function get() {
        if (!this._attributes) this._attributes = {};
        return this._attributes;
      }
    }]);

    return XML;
  }();

  fgui.XML = XML;
})(fgui || (fgui = {}));

(function (fgui) {
  var XMLTagType;

  (function (XMLTagType) {
    XMLTagType[XMLTagType["Start"] = 0] = "Start";
    XMLTagType[XMLTagType["End"] = 1] = "End";
    XMLTagType[XMLTagType["Void"] = 2] = "Void";
    XMLTagType[XMLTagType["CDATA"] = 3] = "CDATA";
    XMLTagType[XMLTagType["Comment"] = 4] = "Comment";
    XMLTagType[XMLTagType["Instruction"] = 5] = "Instruction";
  })(XMLTagType = fgui.XMLTagType || (fgui.XMLTagType = {}));

  ;
  var CDATA_START = "<![CDATA[";
  var CDATA_END = "]]>";
  var COMMENT_START = "<!--";
  var COMMENT_END = "-->";

  var XMLIterator = /*#__PURE__*/function () {
    function XMLIterator() {
      _classCallCheck(this, XMLIterator);
    }

    _createClass(XMLIterator, null, [{
      key: "begin",
      value: function begin(source, lowerCaseName) {
        XMLIterator.source = source;
        XMLIterator.lowerCaseName = lowerCaseName;
        this.sourceLen = source.length;
        this.parsePos = 0;
        this.lastTagEnd = 0;
        this.tagPos = 0;
        this.tagLength = 0;
        this.tagName = null;
      }
    }, {
      key: "nextTag",
      value: function nextTag() {
        var pos;
        var c;
        var buffer = "";
        this.tagType = XMLTagType.Start;
        this.lastTagEnd = this.parsePos;
        this.attrParsed = false;
        this.lastTagName = this.tagName;

        while ((pos = this.source.indexOf('<', this.parsePos)) != -1) {
          this.parsePos = pos;
          pos++;
          if (pos == this.sourceLen) break;
          c = this.source[pos];

          if (c == '!') {
            if (this.sourceLen > pos + 7 && this.source.substr(pos - 1, 9) == CDATA_START) {
              pos = this.source.indexOf(CDATA_END, pos);
              this.tagType = XMLTagType.CDATA;
              this.tagName = "";
              this.tagPos = this.parsePos;
              if (pos == -1) this.tagLength = this.sourceLen - this.parsePos;else this.tagLength = pos + 3 - this.parsePos;
              this.parsePos += this.tagLength;
              return true;
            } else if (this.sourceLen > pos + 2 && this.source.substr(pos - 1, 4) == COMMENT_START) {
              pos = this.source.indexOf(COMMENT_END, pos);
              this.tagType = XMLTagType.Comment;
              this.tagName = "";
              this.tagPos = this.parsePos;
              if (pos == -1) this.tagLength = this.sourceLen - this.parsePos;else this.tagLength = pos + 3 - this.parsePos;
              this.parsePos += this.tagLength;
              return true;
            } else {
              pos++;
              this.tagType = XMLTagType.Instruction;
            }
          } else if (c == '/') {
            pos++;
            this.tagType = XMLTagType.End;
          } else if (c == '?') {
            pos++;
            this.tagType = XMLTagType.Instruction;
          }

          for (; pos < this.sourceLen; pos++) {
            c = this.source[pos];
            if (' \t\n\r\v'.indexOf(c) != -1 || c == '>' || c == '/') break;
          }

          if (pos == this.sourceLen) break;
          buffer += this.source.substr(this.parsePos + 1, pos - this.parsePos - 1);
          if (buffer.length > 0 && buffer[0] == '/') buffer = buffer.substr(1);
          var singleQuoted = false,
              doubleQuoted = false;
          var possibleEnd = -1;

          for (; pos < this.sourceLen; pos++) {
            c = this.source[pos];

            if (c == '"') {
              if (!singleQuoted) doubleQuoted = !doubleQuoted;
            } else if (c == '\'') {
              if (!doubleQuoted) singleQuoted = !singleQuoted;
            }

            if (c == '>') {
              if (!(singleQuoted || doubleQuoted)) {
                possibleEnd = -1;
                break;
              }

              possibleEnd = pos;
            } else if (c == '<') break;
          }

          if (possibleEnd != -1) pos = possibleEnd;
          if (pos == this.sourceLen) break;
          if (this.source[pos - 1] == '/') this.tagType = XMLTagType.Void;
          this.tagName = buffer;
          if (this.lowerCaseName) this.tagName = this.tagName.toLowerCase();
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
    }, {
      key: "getTagSource",
      value: function getTagSource() {
        return this.source.substr(this.tagPos, this.tagLength);
      }
    }, {
      key: "getRawText",
      value: function getRawText(trim) {
        if (this.lastTagEnd == this.tagPos) return "";else if (trim) {
          var i = this.lastTagEnd;

          for (; i < this.tagPos; i++) {
            var c = this.source[i];
            if (' \t\n\r\v'.indexOf(c) == -1) break;
          }

          if (i == this.tagPos) return "";else return this.source.substr(i, this.tagPos - i).trim();
        } else return this.source.substr(this.lastTagEnd, this.tagPos - this.lastTagEnd);
      }
    }, {
      key: "getText",
      value: function getText(trim) {
        if (this.lastTagEnd == this.tagPos) return "";else if (trim) {
          var i = this.lastTagEnd;

          for (; i < this.tagPos; i++) {
            var c = this.source[i];
            if (' \t\n\r\v'.indexOf(c) == -1) break;
          }

          if (i == this.tagPos) return "";else return fgui.XMLUtils.decodeString(this.source.substr(i, this.tagPos - i)).trimRight();
        } else return fgui.XMLUtils.decodeString(this.source.substr(this.lastTagEnd, this.tagPos - this.lastTagEnd));
      }
    }, {
      key: "getAttribute",
      value: function getAttribute(attrName) {
        if (!this.attrParsed) {
          for (var key in this.attributes) {
            delete this.attributes[key];
          }

          this.parseAttributes(this.attributes);
          this.attrParsed = true;
        }

        return this.attributes[attrName];
      }
    }, {
      key: "getAttributes",
      value: function getAttributes(result) {
        if (result == null) result = {};

        if (this.attrParsed) {
          for (var k in this.attributes) {
            result[k] = this.attributes[k];
          }
        } else this.parseAttributes(result);

        return result;
      }
    }, {
      key: "parseAttributes",
      value: function parseAttributes(attrs) {
        var attrName;
        var valueStart = 0;
        var valueEnd = 0;
        var waitValue = false;
        var quoted = 0;
        var buffer = "";
        var i = this.tagPos;
        var attrEnd = this.tagPos + this.tagLength;

        if (i < attrEnd && this.source[i] == '<') {
          for (; i < attrEnd; i++) {
            var c = this.source[i];
            if (' \t\n\r\v'.indexOf(c) != -1 || c == '>' || c == '/') break;
          }
        }

        for (; i < attrEnd; i++) {
          var _c = this.source[i];

          if (_c == '=') {
            valueStart = -1;
            valueEnd = -1;
            quoted = 0;

            for (var j = i + 1; j < attrEnd; j++) {
              var c2 = this.source[j];

              if (' \t\n\r\v'.indexOf(c2) != -1) {
                if (valueStart != -1 && quoted == 0) {
                  valueEnd = j - 1;
                  break;
                }
              } else if (c2 == '>') {
                if (quoted == 0) {
                  valueEnd = j - 1;
                  break;
                }
              } else if (c2 == '"') {
                if (valueStart != -1) {
                  if (quoted != 1) {
                    valueEnd = j - 1;
                    break;
                  }
                } else {
                  quoted = 2;
                  valueStart = j + 1;
                }
              } else if (c2 == '\'') {
                if (valueStart != -1) {
                  if (quoted != 2) {
                    valueEnd = j - 1;
                    break;
                  }
                } else {
                  quoted = 1;
                  valueStart = j + 1;
                }
              } else if (valueStart == -1) {
                valueStart = j;
              }
            }

            if (valueStart != -1 && valueEnd != -1) {
              attrName = buffer;
              if (this.lowerCaseName) attrName = attrName.toLowerCase();
              buffer = "";
              attrs[attrName] = fgui.XMLUtils.decodeString(this.source.substr(valueStart, valueEnd - valueStart + 1));
              i = valueEnd + 1;
            } else break;
          } else if (' \t\n\r\v'.indexOf(_c) == -1) {
            if (waitValue || _c == '/' || _c == '>') {
              if (buffer.length > 0) {
                attrName = buffer;
                if (this.lowerCaseName) attrName = attrName.toLowerCase();
                attrs[attrName] = "";
                buffer = "";
              }

              waitValue = false;
            }

            if (_c != '/' && _c != '>') buffer += _c;
          } else {
            if (buffer.length > 0) waitValue = true;
          }
        }
      }
    }]);

    return XMLIterator;
  }();

  XMLIterator.attributes = {};
  fgui.XMLIterator = XMLIterator;
})(fgui || (fgui = {}));

(function (fgui) {
  var XMLUtils = /*#__PURE__*/function () {
    function XMLUtils() {
      _classCallCheck(this, XMLUtils);
    }

    _createClass(XMLUtils, null, [{
      key: "decodeString",
      value: function decodeString(aSource) {
        var len = aSource.length;
        var sb = "";
        var pos1 = 0,
            pos2 = 0;

        while (true) {
          pos2 = aSource.indexOf('&', pos1);

          if (pos2 == -1) {
            sb += aSource.substr(pos1);
            break;
          }

          sb += aSource.substr(pos1, pos2 - pos1);
          pos1 = pos2 + 1;
          pos2 = pos1;
          var end = Math.min(len, pos2 + 10);

          for (; pos2 < end; pos2++) {
            if (aSource[pos2] == ';') break;
          }

          if (pos2 < end && pos2 > pos1) {
            var entity = aSource.substr(pos1, pos2 - pos1);
            var u = 0;

            if (entity[0] == '#') {
              if (entity.length > 1) {
                if (entity[1] == 'x') u = parseInt(entity.substr(2), 16);else u = parseInt(entity.substr(1));
                sb += String.fromCharCode(u);
                pos1 = pos2 + 1;
              } else sb += '&';
            } else {
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
              } else sb += '&';
            }
          } else {
            sb += '&';
          }
        }

        return sb;
      }
    }, {
      key: "encodeString",
      value: function encodeString(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
      }
    }, {
      key: "getString",
      value: function getString(attrs, attrName, defValue) {
        if (attrs == null) return defValue == null ? null : defValue;
        var ret = attrs[attrName];
        if (ret != null) return "" + ret;else return defValue == null ? null : defValue;
      }
    }, {
      key: "getInt",
      value: function getInt(attrs, attrName, defValue) {
        var value = this.getString(attrs, attrName);
        if (value == null || value.length == 0) return defValue == null ? 0 : defValue;

        if (value[value.length - 1] == '%') {
          var ret = parseInt(value.substring(0, value.length - 1));
          return Math.ceil(ret / 100.0 * defValue);
        } else return parseInt(value);
      }
    }, {
      key: "getFloat",
      value: function getFloat(attrs, attrName, defValue) {
        var value = this.getString(attrs, attrName);
        if (value == null || value.length == 0) return defValue == null ? 0 : defValue;
        var ret = parseFloat(value);
        if (isNaN(ret)) return defValue == null ? 0 : defValue;else return ret;
      }
    }, {
      key: "getBool",
      value: function getBool(attrs, attrName, defValue) {
        var value = this.getString(attrs, attrName);
        if (value == null || value.length == 0) return defValue == null ? false : defValue;
        if (value == "true" || value == "1") return true;else if (value == "false" || value == "0") return false;else return defValue == null ? false : defValue;
      }
    }, {
      key: "getColor",
      value: function getColor(attrs, attrName, defValue) {
        var value = this.getString(attrs, attrName);
        if (value == null || value.length == 0) return defValue == null ? 0 : defValue;
        return fgui.convertFromHtmlColor(value);
      }
    }]);

    return XMLUtils;
  }();

  fgui.XMLUtils = XMLUtils;
  var ESCAPES = ["&", "&amp;", "<", "&lt;", ">", "&gt;", "'", "&apos;", "\"", "&quot;"];
})(fgui || (fgui = {}));

module.exports = window.fgui;