import { Attributes, System } from "ecsy";
import { degToRad } from "../../engine/utils";
import { Moving, Player, Position } from '../components';
import { Vector2 } from "../types";

const listening_event = 'keyup';

const keys = {
    walk_forward: [ 'ArrowUp', 'KeyW' ],
    walk_backward: [ 'ArrowDown', 'KeyS' ],
    walk_left: [ 'ArrowLeft', 'KeyA' ],
    walk_right: [ 'ArrowDown', 'KeyD' ],

    turn_left: [ 'KeyQ' ],
    turn_right: [ 'KeyE' ],
}

export class KeyboardSystem extends System {
    static queries = {
        player: { components: [ Player, Position, Moving ] },
    };

    private _cached: KeyboardEvent;

    cacheEvent(event: KeyboardEvent) {
        this._cached = event;
    }

    init(attributes?: Attributes) {
        window.addEventListener(listening_event, this.cacheEvent.bind(this));
        if (!!super.init) {
            super.init(attributes);
        }
    }

    play() {
        window.addEventListener(listening_event, this.cacheEvent.bind(this));
        super.play();
    }

    stop() {
        window.removeEventListener(listening_event, this.cacheEvent.bind(this));
        super.stop();
    }

    execute(delta: number, time: number): void {
        if (!!this._cached) {
            const player = this.queries.player.results[0];
            if (!!player) {       
                const pos = player.getComponent(Position);
                let moving = player.getMutableComponent(Moving);
                this.keyHandler(this._cached, pos, moving);
            }
        }
        this._cached = null;
    }

    keyHandler(event: KeyboardEvent, pos: Position, moving: Moving) {
        if (event.code === 'KeyQ') {
            moving.deltaDirection -= 90;
        } else if (event.code === 'KeyE') {
            moving.deltaDirection += 90;
        } else {
            let cos = Math.round(Math.cos(degToRad(pos.direction)));
            let sin = Math.round(Math.sin(degToRad(pos.direction)));

            let pos_delta = new Vector2().set(0, 0);
            if (keys.walk_forward.includes(event.code)) {
                pos_delta.x -= cos;
                pos_delta.y -= sin;
            } else if (keys.walk_backward.includes(event.code)) {
                pos_delta.x += cos;
                pos_delta.y += sin;
            } else if (keys.walk_left.includes(event.code)) {
                pos_delta.x -= sin;
                pos_delta.y += cos;
            } else if (keys.walk_right.includes(event.code)) {
                pos_delta.x += sin;
                pos_delta.y -= cos;
            }

            moving.deltaPos.set(pos_delta.x, pos_delta.y);
        }
    }
}