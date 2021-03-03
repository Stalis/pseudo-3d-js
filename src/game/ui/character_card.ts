import { Point } from "../../engine";
import { Character } from "../components";
import { Vector2 } from "../types";
import { Style } from "./style.h";
import { UIElement, UIElementAttributes } from "./ui_element";

export type CharacterCardAttributes = UIElementAttributes & {
    model: Character,
    portraits: Record<string, ImageBitmap>,
}

export class CharacterCard extends UIElement {
    portraits: Record<string, ImageBitmap>;
    portrait_key: string;
    health: number;
    mana: number;

    default: Style;
    health_bar: Style;
    mana_bar: Style;

    constructor(attr: Partial<CharacterCardAttributes>) {
        super(attr);
        this.portraits = attr.portraits ?? {};
        this.update(attr.model);
        
        this.health_bar = {
            stroke: 'black',
            fill: 'red',
        };

        this.mana_bar = {
            stroke: 'black',
            fill: 'blue',
        };
    }

    update(model: Character) {
        this.portrait_key = model?.portrait;
        this.health = !!model ? (model.hp / model.maxHp) : 0;
        this.mana = !!model ? (model.mp / model.maxMp) : 0;
    }

    drawOwn(ctx: CanvasRenderingContext2D, anchor: Point): void {
        const p: Point = { x: anchor.x + this.x, y: anchor.y + this.y };

        const bar_height = this.height / 10;

        if (!!this.portraits[this.portrait_key]) {
            let portrait = this.portraits[this.portrait_key];
            ctx.drawImage(portrait, p.x, p.y, this.width, this.height - bar_height * 2);
        } else {
            const fillBuf = ctx.fillStyle;

            ctx.fillStyle = 'gray';
            ctx.fillRect(p.x, p.y, this.width, this.height);

            ctx.fillStyle = fillBuf;
        }


        this.drawBar(ctx, this.health_bar, this.health, { x: p.x, y: p.y + this.height - 2 * bar_height - 1 }, this.width, bar_height);
        this.drawBar(ctx, this.mana_bar, this.mana, { x: p.x, y: p.y + this.height - bar_height - 1 }, this.width, bar_height);

        const strokeBuf = ctx.strokeStyle;

        ctx.strokeStyle = 'black';
        ctx.strokeRect(p.x + 1, p.y + 1, this.width, this.height - 2);

        ctx.strokeStyle = strokeBuf;
    }

    private drawBar(ctx: CanvasRenderingContext2D, style: Style, value: number, p: Point, width: number, height: number) {
        const fillBuf = ctx.fillStyle;
        const strokeBuf = ctx.strokeStyle;
        
        const strokeCorrect = 0.5;

        const thickness = 1;

        ctx.strokeStyle = style.stroke;
        ctx.strokeRect(p.x + strokeCorrect, p.y + strokeCorrect, width, height);

        ctx.fillStyle = style.fill;
        ctx.fillRect(
            p.x + thickness + strokeCorrect,
            p.y + thickness + strokeCorrect,
            (width - 2 * thickness) * value,
            height - 2 * thickness
            );

        ctx.fillStyle = fillBuf;
        ctx.strokeStyle = strokeBuf;  
    }
}