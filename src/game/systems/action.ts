import { Entity, System } from "ecsy";
import { degToRad } from "../../engine/utils";
import { Moving, Position, Rotation } from "../components";
import { Actor } from "../components/actor";
import { Action, ActionKind, Directions, Vector2 } from "../types";

export class ActionSystem extends System {
    static queries = {
        actors: { components: [ Actor ] }
    }

    execute(delta: number, time: number): void {
        let actors = this.queries.actors.results;
        for (const actor of actors) {
            let actorComponent = actor.getMutableComponent(Actor);

            if (!!actorComponent.nextAction) {
                let action = actorComponent.nextAction;
                actorComponent.nextAction = null;

                if (action.cost <= actorComponent.actionPoints) {
                    if (!this.canExecuteAction(actor, action)) {
                        continue;
                    }

                    if (this.executeAction(actor, action)) {
                        actorComponent.actionPoints -= action.cost;
                    }
                }
            }
        }
    }

    canExecuteAction(entity: Entity, action: Action) {
        switch (action.type) {
            case ActionKind.nop:
                return true;
            case ActionKind.walk:
                return action.params.length === 1 && entity.hasAllComponents([Rotation, Moving]);
            case ActionKind.rotate:
                return action.params.length === 1 && entity.hasAllComponents([Moving]);
            default:
                return false;
        }
    }

    executeAction(entity: Entity, action: Action) {
        switch (action.type) {
            case ActionKind.nop:
                return true;
            case ActionKind.walk: {
                let moving = entity.getMutableComponent(Moving);
                let rot = entity.getComponent(Rotation);

                let cos = Math.round(Math.cos(degToRad(rot.value)));
                let sin = Math.round(Math.sin(degToRad(rot.value)));
    
                let direction = action.params[0];

                let pos_delta = new Vector2();
                if (direction === Directions.forward) {
                    pos_delta.x -= cos;
                    pos_delta.y -= sin;
                } else if (direction === Directions.backward) {
                    pos_delta.x += cos;
                    pos_delta.y += sin;
                } else if (direction === Directions.left) {
                    pos_delta.x -= sin;
                    pos_delta.y += cos;
                } else if (direction === Directions.right) {
                    pos_delta.x += sin;
                    pos_delta.y -= cos;
                }
    
                moving.deltaPos.set(pos_delta.x, pos_delta.y);
                return true;
            }
            case ActionKind.rotate: {
                let moving = entity.getMutableComponent(Moving);
                if (action.params[0] === Directions.right) {
                    moving.deltaRotation += 90;
                } else if (action.params[0] === Directions.left) {
                    moving.deltaRotation -= 90;
                } else {
                    return false;
                }
            }
            default:
                return false;
        }
    }
}