import { CanvasRender } from "./render/render";

export class Game {
    private _canvasContext: CanvasRenderingContext2D;
    private _render: CanvasRender;
    private _exit: boolean;

    constructor(canvasCtx: CanvasRenderingContext2D) {
        this._canvasContext = canvasCtx;
        this._render = new CanvasRender(this._canvasContext);
    }

    start() {
        this.onload()
            .then(this.draw.bind(this));
    }

    gameLoop() {
        while (!this._exit) {
            this.update();
            this.draw();
        }
    }

    exit() {
        this._exit = true;
    }

    update() {
        this.onupdate();
    }

    draw() {
        this.ondraw(this._render);
    }

    onload() {
        return new Promise(resolve => resolve({}));
    }

    ondraw(render: CanvasRender) {
        
    }

    onupdate() {

    }
}