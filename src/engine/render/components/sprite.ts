import { Rect } from "./rect";

export class Sprite {
    image: CanvasImageSource;
    sx: number = 0;
    sy: number = 0;
    sWidth?: number;
    sHeight?: number;

    constructor(image: CanvasImageSource, rect: Rect) {
        this.image = image;
        this.sx = rect.x ?? 0;
        this.sy = rect.y ?? 0;
        this.sWidth = rect.width;
        this.sHeight = rect.height;
    }
}