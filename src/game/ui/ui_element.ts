import { Point } from "../../engine";
import { Vector2 } from "../types";

export type UIElementAttributes = {
    x: number;
    y: number;
    width: number;
    height: number;
    children: UIElement[];
}

export enum EventType {
    hover = 'hover',
    press = 'press',
    unpress = 'unpress',
    leave = 'leave',
    click = 'click',
    move = 'move',
}

export abstract class UIElement {
    pos: Vector2 = new Vector2();
    width: number;
    height: number;
    children: UIElement[] = [];

    constructor(attr: Partial<UIElementAttributes>) {
        this.pos.set(attr.x ?? 0, attr.y ?? 0);
        this.width = attr.width ?? 16;
        this.height = attr.height ?? 16;
        if (!!attr.children) {
            for (const item of attr.children) {
                this.addChild(item);
            }
        }
    }

    get x() {
        return this.pos.x;
    }

    set x(v: number) {
        this.pos.x = v;
    }

    get y() {
        return this.pos.y;
    }

    set y(v: number) {
        this.pos.y = v;
    }

    moveTo(p: Point) {
        this.pos.set(p);
    }

    draw(ctx: CanvasRenderingContext2D, anchor: Point) {
        this.drawOwn(ctx, anchor);
        this.children.forEach(child => {
            let newAnchor = { x: anchor.x + this.x, y: anchor.y + this.y };
            child.draw(ctx, newAnchor);
        });
    };

    abstract drawOwn(ctx: CanvasRenderingContext2D, anchor: Point): void;

    addChild<T extends UIElement>(child: T): T {
        this.children.push(child);
        return child;
    }

    invokeEvent(cursor: Vector2, ev: EventType) {
        const handler_name = '' + ev;

        if (!!this[handler_name]) {
            let res = this[handler_name](cursor);
            if (!res) {
                return false;
            }
        }

        const local = cursor.sub(this.pos);
        for (const item of this.children) {
            if (item.x < local.x && item.x + item.width >= local.x &&
                item.y < local.y && item.y + item.height >= local.y) {
                if (!item.invokeEvent(local, ev)) {
                    return false;
                }
            }
        }

        return true;
    }

    getChildByPoint(p: Point): UIElement {
        for (const child of this.children) {
            const newP = new Vector2().set(p).sub(this.pos);
            let res = child.getChildByPoint(newP);
            if (!!res) {
                return res;
            }
        };

        return this;
    }
}