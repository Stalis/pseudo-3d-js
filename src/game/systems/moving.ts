import { System } from "ecsy"
import { GameMap, Moving, Position } from "../components"
import { Rotation } from "../components/rotation";

export class MovingSystem extends System {
    static queries = {
        moving: { components: [ Position, Rotation, Moving ] },
        map: { components: [ GameMap ] }
    }

    execute(delta: number, time: number): void {
        const map = this.queries.map.results[0];
        if (!map) return;

        const cell_size = map.getComponent(GameMap).cell_size;

        let moving = this.queries.moving.results;
        for (let entity of moving) {
            let pos = entity.getMutableComponent(Position);
            let rot = entity.getMutableComponent(Rotation);
            let mov = entity.getMutableComponent(Moving);

            pos.value.add(mov.deltaPos.mul(cell_size));
            rot.value += mov.deltaRotation;

            mov.reset();
        }
    }
}