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

    drawFilledRect(x, y, size) {
        this.ctx.fillRect(x, y, size.width, size.height);
    }

    drawStrokeRect(x, y, size) {
        this.ctx.strokeRect(x, y, size.width, size.height);
    }

    drawClearRect(x, y, size) {
        this.ctx.clearRect(x, y, size.width, size.height);
    }

    drawFilledPath(x, y, path) {
        this.ctx.beginPath();

        this.ctx.moveTo(x, y);
        for (const point of path.points) {
            this.ctx.lineTo(x + point.x, y + point.y);
        }

        this.ctx.fill();
    }

    drawStrokePath(x, y, path) {
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
            sprite.sx ?? 0, sprite.sy ?? 0, sprite.sWidth ?? 0, sprite.sHeight ?? 0,
            x, y, width ?? sprite.sWidth, height ?? sprite.sHeight);
    }
}