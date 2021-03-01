import { Point } from "../../engine";
import { Vector2 } from "../types";
import { Style } from "./style.h";
import { UIElement, UIElementAttributes } from "./ui_element"

enum State {
    default,
    hover,
    pressed,
};

type ButtonAttributes = UIElementAttributes & {
    thickness: number,
    fillStyle: string,
    strokeStyle: string,
    texture: ImageBitmap,
    hover: {
        fillStyle?: string,
        strokeStyle?: string,
    },
    pressed: {
        fillStyle?: string,
        strokeStyle?: string,
    },
    onclick: (ev?: MouseEvent) => void,
};

export class Button extends UIElement {
    state: State;
    thickness: number;
    styles: { [key: number]: Style };
    onclick: (ev?: MouseEvent) => void;

    constructor(attr: Partial<ButtonAttributes>) {
        super(attr);

        this.thickness = attr.thickness ?? 1;

        this.state = State.default;

        this.styles = {
            [State.default]: {
                fill: attr.fillStyle,
                stroke: attr.strokeStyle,
                texture: attr.texture,
            },
            [State.hover]: {
                fill: attr.hover.fillStyle ?? attr.fillStyle,
                stroke: attr.hover.strokeStyle ?? attr.strokeStyle,
            },
            [State.pressed]: {
                fill: attr.pressed.fillStyle ?? attr.fillStyle,
                stroke: attr.pressed.strokeStyle ??  attr.strokeStyle,
            }
        }
        
        this.onclick = attr.onclick ?? ((_) => undefined);
    }

    get style() {
        return this.styles[this.state];
    }

    protected raiseState(target: State) {
        //console.log(`Button::raiseState ${this.state} -> ${target}`)
        if (this.state < target) {
            this.state = target;
        }
    }

    protected lowerState(target: State) {
        //console.log(`Button::lowerState ${this.state} -> ${target}`)
        if (this.state > target) {
            this.state = target;
        }
    }

    hover(cursor: Vector2) {
        this.raiseState(State.hover);
    }

    press() {
        this.raiseState(State.pressed);
    }

    click(cursor: Vector2) {
        this.onclick();
        return false;
    }

    unpress() {
        this.lowerState(State.hover);
    }

    leave() {
        this.lowerState(State.default);
    }

    drawOwn(ctx: CanvasRenderingContext2D, anchor: Point) {
        let btn = this;

        const p: Point = { x: anchor.x + this.x, y: anchor.y + this.y };
        
        if (!!this.style.texture) {
            ctx.drawImage(this.style.texture, p.x, p.y, this.width, this.height);
        } else {
            const fillBuf = ctx.fillStyle;
            const strokeBuf = ctx.strokeStyle;
            
            const strokeCorrect = 0.5;

            ctx.strokeStyle = this.style.stroke;
            ctx.strokeRect(p.x + strokeCorrect, p.y + strokeCorrect, this.width, this.height);

            ctx.fillStyle = btn.style.fill;
            ctx.fillRect(
                p.x + this.thickness + strokeCorrect,
                p.y + this.thickness + strokeCorrect,
                this.width - 2 * this.thickness,
                this.height - 2 * this.thickness
                );

            ctx.fillStyle = fillBuf;
            ctx.strokeStyle = strokeBuf;
        }
    }
}

