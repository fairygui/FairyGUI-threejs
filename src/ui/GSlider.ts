import { Vector2 } from "three";
import { Event } from "../event/Event";
import { ByteBuffer } from "../utils/ByteBuffer";
import { clamp, clamp01 } from "../utils/ToolSet";
import { ProgressTitleType } from "./FieldTypes";
import { GComponent } from "./GComponent";
import { GObject } from "./GObject";

let s_vec2: Vector2 = new Vector2();

export class GSlider extends GComponent {
    public changeOnClick: boolean = true;
    public canDrag: boolean = true;

    private _min: number = 0;
    private _max: number = 0;
    private _value: number = 0;
    private _titleType: number;
    private _reverse: boolean;
    private _wholeNumbers: boolean;

    private _titleObject: GObject;
    private _barObjectH: GObject;
    private _barObjectV: GObject;
    private _barMaxWidth: number = 0;
    private _barMaxHeight: number = 0;
    private _barMaxWidthDelta: number = 0;
    private _barMaxHeightDelta: number = 0;
    private _gripObject: GObject;
    private _clickPos: Vector2;
    private _clickPercent: number = 0;
    private _barStartX: number = 0;
    private _barStartY: number = 0;

    constructor() {
        super();

        this._titleType = ProgressTitleType.Percent;
        this._value = 50;
        this._max = 100;
        this._clickPos = new Vector2();
    }

    public get titleType(): number {
        return this._titleType;
    }

    public set titleType(value: number) {
        this._titleType = value;
    }

    public get wholeNumbers(): boolean {
        return this._wholeNumbers;
    }

    public set wholeNumbers(value: boolean) {
        if (this._wholeNumbers != value) {
            this._wholeNumbers = value;
            this.update();
        }
    }

    public get min(): number {
        return this._min;
    }

    public set min(value: number) {
        if (this._min != value) {
            this._min = value;
            this.update();
        }
    }

    public get max(): number {
        return this._max;
    }

    public set max(value: number) {
        if (this._max != value) {
            this._max = value;
            this.update();
        }
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        if (this._value != value) {
            this._value = value;
            this.update();
        }
    }

    public update(): void {
        this.updateWithPercent((this._value - this._min) / (this._max - this._min), false);
    }

    private updateWithPercent(percent: number, manual?: boolean): void {
        percent = clamp01(percent);
        if (manual) {
            var newValue: number = clamp(this._min + (this._max - this._min) * percent, this._min, this._max);
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

        var fullWidth: number = this.width - this._barMaxWidthDelta;
        var fullHeight: number = this.height - this._barMaxHeightDelta;
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

    protected constructExtension(buffer: ByteBuffer): void {
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

    protected handleSizeChanged(): void {
        super.handleSizeChanged();

        if (this._barObjectH)
            this._barMaxWidth = this.width - this._barMaxWidthDelta;
        if (this._barObjectV)
            this._barMaxHeight = this.height - this._barMaxHeightDelta;
        if (!this._underConstruct)
            this.update();
    }

    public setup_afterAdd(buffer: ByteBuffer, beginPos: number): void {
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

    private __gripTouchBegin(evt: Event): void {
        if (evt.input.button != 0)
            return;

        this.canDrag = true;
        evt.stopPropagation();
        evt.captureTouch();

        this.globalToLocal(evt.input.x, evt.input.y, this._clickPos);
        this._clickPercent = clamp01((this._value - this._min) / (this._max - this._min));
    }

    private __gripTouchMove(evt: Event): void {
        if (!this.canDrag)
            return;

        var pt: Vector2 = this.globalToLocal(evt.input.x, evt.input.y, s_vec2);
        var deltaX: number = pt.x - this._clickPos.x;
        var deltaY: number = pt.y - this._clickPos.y;
        if (this._reverse) {
            deltaX = -deltaX;
            deltaY = -deltaY;
        }
        var percent: number;
        if (this._barObjectH)
            percent = this._clickPercent + deltaX / this._barMaxWidth;
        else
            percent = this._clickPercent + deltaY / this._barMaxHeight;
        this.updateWithPercent(percent, true);
    }

    private __barTouchBegin(evt: Event): void {
        if (!this.changeOnClick)
            return;

        var pt: Vector2 = this._gripObject.globalToLocal(evt.input.x, evt.input.y, s_vec2);
        var percent: number = clamp01((this._value - this._min) / (this._max - this._min));
        var delta: number = 0;
        if (this._barObjectH != null)
            delta = (pt.x - this._gripObject.width / 2) / this._barMaxWidth;
        if (this._barObjectV != null)
            delta = (pt.y - this._gripObject.height / 2) / this._barMaxHeight;
        if (this._reverse)
            percent -= delta;
        else
            percent += delta;
        this.updateWithPercent(percent, true);
    }
}
