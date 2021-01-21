import { Color } from "./components/color";
import { Path } from "./components/path";
import { Point } from "./components/point";
import { Rect } from "./components/rect";
import { Size } from "./components/size";
import { Sprite } from "./components/sprite";

export class CanvasRender {
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    setFillColor(color: Color) {
        this.ctx.fillStyle = color.toString();
    }

    setStrokeColor(color: Color) {
        this.ctx.strokeStyle = color.toString();
    }

    setGlobalAlpha(val: number) {
        this.ctx.globalAlpha = Color.boundAlpha(val);
    }

    setLineWidth(val: number) {
        this.ctx.lineWidth = val;
    }

    drawFilledRect(x: number | Point | Rect, y?: number | Size, width?: number, height?: number) {
        let rect = getRect(x, y, width, height);
        this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    drawStrokeRect(x: number | Point | Rect, y?: number | Size, width?: number, height?: number) {
        let rect = getRect(x, y, width, height);
        this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }

    drawClearRect(x: number | Point | Rect, y?: number | Size, width?: number, height?: number) {
        let rect = getRect(x, y, width, height);
        this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
    }

    drawFilledPath(x: number | Point, y: number | Path, path: Path) {
        let startX = 0, startY = 0;
        if (typeof x === 'object') {
            startX = x.x;
            startY = x.y;
            path = y as Path;
        } else {
            startX = x;
            startY = y as number;
        }

        this.ctx.beginPath();

        this.ctx.moveTo(startX, startY);
        for (const point of path.points) {
            this.ctx.lineTo(startX + point.x, startY + point.y);
        }

        this.ctx.fill();
    }

    drawStrokePath(x: number | Point, y: number | Path, path: Path) {
        let startX = 0, startY = 0;
        if (typeof x === 'object') {
            startX = x.x;
            startY = x.y;
            path = y as Path;
        } else {
            startX = x;
            startY = y as number;
        }

        this.ctx.beginPath();

        this.ctx.moveTo(startX, startY);
        for (const point of path.points) {
            this.ctx.lineTo(startX + point.x, startY + point.y);
        }

        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawSprite(sprite: Sprite, x: number, y: number, width?: number, height?: number) {
        this.ctx.drawImage(sprite.image, 
            sprite.sx ?? 0, sprite.sy ?? 0, sprite.sWidth ?? 0, sprite.sHeight ?? 0,
            x, y, width ?? sprite.sWidth, height ?? sprite.sHeight);
    }
}

function getRect(x: number | Point | Rect, y: number | Size, width?: number, height?: number): Rect | undefined {
    if (typeof x === 'object') {
        let rect = x as Rect;
        if (!!rect.width && !!rect.height) {
            return rect;
        }

        let p = x as Point;
        if (typeof y === 'object') {
            let size = y as Size;
            return { x: p.x, y: p.y, width: size.width, height: size.height};
        } else {
            return { x: p.x, y: p.y, width: y, height: width };
        }
    } 

    return { x: x, y: y as number, width: width, height: height };
}