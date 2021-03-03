import { Attributes, System } from "ecsy";
import { degToRad } from "../../engine/utils";
import { Moving, Player, Position, Rotation } from '../components';
import { Actor } from "../components/actor";
import { Action, ActionKind, Directions, Vector2 } from "../types";

const listening_event = 'keypress';

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
        player: { components: [ Player, Actor ] },
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
                let actor = player.getMutableComponent(Actor);
                this.keyHandler(this._cached, actor);
            }
        }
        this._cached = null;
    }

    keyHandler(event: KeyboardEvent, actor: Actor) {
        if (keys.turn_left.includes(event.code)) {
            actor.nextAction = Action.createNew(ActionKind.rotate, Directions.left);
        } else if (keys.turn_right.includes(event.code)) {
            actor.nextAction = Action.createNew(ActionKind.rotate, Directions.right);
        } else {
            if (keys.walk_forward.includes(event.code)) {
                actor.nextAction = Action.createNew(ActionKind.walk, Directions.forward);
            } else if (keys.walk_backward.includes(event.code)) {
                actor.nextAction = Action.createNew(ActionKind.walk, Directions.backward);
            } else if (keys.walk_left.includes(event.code)) {
                actor.nextAction = Action.createNew(ActionKind.walk, Directions.left);
            } else if (keys.walk_right.includes(event.code)) {
                actor.nextAction = Action.createNew(ActionKind.walk, Directions.right);
            }
        }
    }
}