import { Stage, broadcastEvent } from "../core/Stage";

export enum ScaleMode {
    ConstantPixelSize,
    ScaleWithScreenSize,
    ConstantPhysicalSize
}

export enum ScreenMatchMode {
    MatchWidthOrHeight,
    MatchWidth,
    MatchHeight
}

export class UIContentScaler {
    public static get scaleFactor() { return _scaleFactor; }
    public static get scaleLevel() { return _scaleLevel; }

    public static scaleWithScreenSize(designResolutionX: number, designResolutionY: number, screenMatchMode?: ScreenMatchMode) {
        _designResolutionX = designResolutionX;
        _designResolutionY = designResolutionY;
        _scaleMode = ScaleMode.ScaleWithScreenSize;
        _screenMatchMode = screenMatchMode || ScreenMatchMode.MatchWidthOrHeight;
        refresh();
    }

    public static setConstant(constantScaleFactor?: number) {
        _scaleMode = ScaleMode.ConstantPixelSize;
        _constantScaleFactor = constantScaleFactor || 1;
        refresh();
    }

    public static _refresh(): void {
        refresh();
    }
}

var _scaleMode: ScaleMode = ScaleMode.ConstantPixelSize;
var _screenMatchMode: ScreenMatchMode;
var _designResolutionX: number = 1136;
var _designResolutionY: number = 640;
// var _fallbackScreenDPI: number;
// var _defaultSpriteDPI: number;
var _constantScaleFactor: number = 1;
var _ignoreOrientation: boolean;

var _scaleFactor: number = 1;
var _scaleLevel: number = 0;

function refresh() {
    let screenWidth: number = Stage.width;
    let screenHeight: number = Stage.height;

    if (_scaleMode == ScaleMode.ScaleWithScreenSize) {
        if (_designResolutionX == 0 || _designResolutionY == 0)
            return;

        let dx = _designResolutionX;
        let dy = _designResolutionY;
        if (!_ignoreOrientation && (screenWidth > screenHeight && dx < dy || screenWidth < screenHeight && dx > dy)) {
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
    else if (_scaleMode == ScaleMode.ConstantPhysicalSize) {
        // let dpi = Screen.dpi;
        // if (dpi == 0)
        //     dpi = _fallbackScreenDPI;
        // if (dpi == 0)
        //     dpi = 96;
        // _scaleFactor = dpi / (defaultSpriteDPI == 0 ? 96 : defaultSpriteDPI);
    }
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