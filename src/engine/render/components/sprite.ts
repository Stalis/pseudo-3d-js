export class Sprite {
    image: CanvasImageSource;
    sx?: number;
    sy?: number;
    sWidth?: number;
    sHeight?: number;

    constructor(image: CanvasImageSource, sx?: number, sy?: number, sWidth?: number, sHeight?: number) {
        this.image = image;
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
    }
}