import { Sprite } from "./engine/render/components";

export class AnimatedSprite {
    private _sprites: Array<Sprite>;
    private _index: number = 0;

    constructor(sprites: Array<Sprite>) {
        this._sprites = sprites;
    }

    get current() {
        return this._sprites[this._index];
    }

    get next() {
        this._index += 1;
        if (this._index >= this._sprites.length) {
            this._index = 0;
        }

        return this.current;
    }
}