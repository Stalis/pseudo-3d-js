import { CanvasRender } from "./render/render";

export interface GameOptions {
    width: number;
    height: number;
    fps: number;
}

export class Game {
    private _canvasContext: CanvasRenderingContext2D;
    private _loopInterval: any;
    private _render: CanvasRender;
    private _exit: boolean;
    private _prevLoopStart: number;
    protected options: GameOptions;

    constructor(canvasCtx: CanvasRenderingContext2D, options: GameOptions) {
        this._canvasContext = canvasCtx;
        this._render = new CanvasRender(this._canvasContext);
        this.options = options;
    }

    start() {
        this._canvasContext.canvas.ownerDocument.onkeydown = this.onkeydown.bind(this);

        this.onload()
            .then(() => {
                this._loopInterval = setInterval(() => {
                    let now = Date.now();
                    let dt = now - this._prevLoopStart;
                    this._prevLoopStart = now;
                    
                    this.gameLoop(dt);
                }, 1000 / this.options.fps);
            });
    }

    gameLoop(dt: number) {
        this.update(dt);
        this.draw(dt);
    }

    exit() {
        clearInterval(this._loopInterval);
    }

    update(dt: number) {
        this.onupdate(dt);
    }

    draw(dt: number) {
        this.ondraw(this._render, dt);
    }

    onload() {
        return new Promise(resolve => resolve({}));
    }

    ondraw(render: CanvasRender, dt: number) {
        
    }

    onupdate(dt: number) {

    }

    onkeydown(event: KeyboardEvent) {

    }
}