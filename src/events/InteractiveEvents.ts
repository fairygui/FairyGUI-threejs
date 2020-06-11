

namespace fgui
{
    // let win:any = window;
    // let hasPointer = !!(win.PointerEvent || win.MSPointerEvent);
    // let hasTouch = 'ontouchstart' in window ;

    export class InteractiveEvents {
        public static Down:string = "touch_begin";
        public static Up:string ="touch_end";
        public static Click:string = "click";
        public static Move:string =  "touch_move";
        //mouse only
        public static RightDown = "rightdown";
        public static RightUp = "rightup";
        public static RightClick = "right_click";
    }
}