

namespace fgui
{
    let win:any = window;
    let hasPointer = !!(win.PointerEvent || win.MSPointerEvent);
    let hasTouch = 'ontouchstart' in window ;

    export class InteractiveEvents {
        public static Down:string = hasPointer ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
        public static Cancel:string = hasPointer ? "pointercancel" : hasTouch ? "touchcancel" : "mousecancel";
        public static Up:string = hasPointer ? "pointerup" : hasTouch ? "touchend" : "mouseup";
        public static Click:string = hasPointer ? "pointertap" : hasTouch ? "tap" : "click";
        public static UpOutside:string = hasPointer ? "pointerupoutside" : hasTouch ? "touchendoutside" : "mouseupoutside";
        public static Move:string = hasPointer ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
        public static Over:string = hasPointer ? "pointerover" : hasTouch ? undefined : "mouseover";
        public static Out:string = hasPointer ? "pointerout" : hasTouch ?  undefined : "mouseout";
        public static OnStay:string = hasPointer ? "pointerstay" : hasTouch ?  undefined : "mousestay";
        public static OnStayOut:string = hasPointer ? "pointerstayout" : hasTouch ?  undefined : "mousestayout";
        //mouse only
        public static RightDown = "rightdown";
        public static RightUp = "rightup";
        public static RightClick = "rightclick";
        public static RightUpOutside = "rightupoutside";
    }
}