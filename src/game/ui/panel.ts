import { Point } from "../../engine";
import { Style } from "./style.h";
import { UIElement, UIElementAttributes } from "./ui_element";

export type PanelAttributes = UIElementAttributes & {
    fillStyle: string;
    strokeStyle: string;
}

export class Panel extends UIElement {
    style: Style;

    constructor(attr: Partial<PanelAttributes>) {
        super(attr);

        this.style = {
            fill: attr.fillStyle,
            stroke: attr.strokeStyle,
        };
    }

    drawOwn(ctx: CanvasRenderingContext2D, anchor: Point) {
        if (!!this.style.fill) {
            let fillBuf = ctx.fillStyle;
            ctx.fillStyle = this.style.fill;
            ctx.fillRect(this.x + anchor.x, this.y + anchor.y, this.width, this.height);
            ctx.fillStyle = fillBuf;
        }

        if (!!this.style.stroke) {
            let strokeBuf = ctx.strokeStyle;
            ctx.strokeStyle = this.style.stroke;
            ctx.strokeRect(this.x + anchor.x, this.y + anchor.y, this.width, this.height);
            ctx.strokeStyle = strokeBuf;
        }
    }
}