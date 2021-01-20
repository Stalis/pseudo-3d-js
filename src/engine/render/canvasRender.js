export class CanvasRender {
    constructor(ctx) {
        this.ctx = ctx;
    }

    setFillColor(color) {
        this.ctx.fillStyle = color.toString();
    }

    setStrokeColor(color) {
        this.ctx.strokeStyle = color.toString();
    }

    setGlobalAlpha(val) {
        this.ctx.globalAlpha = Color.boundAlpha(val);
    }

    setLineWidth(val) {
        this.ctx.lineWidth = val;
    }

    drawFilledRect(size, x, y) {
        this.ctx.fillRect(x, y, size.width, size.height);
    }

    drawStrokeRect(size, x, y) {
        this.ctx.strokeRect(x, y, size.width, size.height);
    }

    drawClearRect(size, x, y) {
        this.ctx.clearRect(x, y, size.width, size.height);
    }

    drawFilledPath(path, x, y) {
        this.ctx.beginPath();

        this.ctx.moveTo(x, y);
        for (const point of path.points) {
            this.ctx.lineTo(x + point.x, y + point.y);
        }

        this.ctx.fill();
    }

    drawStrokePath(path, x, y) {
        this.ctx.beginPath();

        this.ctx.moveTo(x, y);
        for (const point of path.points) {
            this.ctx.lineTo(x + point.x, y + point.y);
        }

        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawSprite(sprite, x, y, width, height) {
        this.ctx.drawImage(sprite.image, 
            sprite.sx, sprite.sy, sprite.sWidth, sprite.sHeight,
            x, y, width ?? sprite.sWidth, height ?? sprite.sHeight);
    }
}