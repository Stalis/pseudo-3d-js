import { System } from "ecsy";
import { Player, Camera, Position, TextureBox, MapCell, GameMap, ResourceVault, CellType } from "../components";
import { Vector2 } from "../types";
import * as utils from '../../engine/utils';

interface RayResult {
    cell: CellType,
    rayPoint: Vector2,
    distance: number,
    direction: number,
};

export class RaycasterSystem extends System {
    static queries = {
        player: { components: [ Player, Camera, Position ] },
        map: { components: [ GameMap ] },
        mapCells: { components: [ MapCell, TextureBox, Position ] },
        resources: { components: [ ResourceVault ] },    
    }

    execute(delta: number, time: number): void {
        const player = this.queries.player.results[0];
        const camera = player.getComponent(Camera);
        const pos = player.getComponent(Position);
        const map = this.queries.map.results[0].getComponent(GameMap);
        const resourses = this.queries.resources.results[0].getComponent(ResourceVault);
        
        this.clear(camera);
        this.drawFloorAndCeiling(camera);
        this.drawWalls(camera, pos, map, resourses);
    }

    drawWalls(camera: Camera, pos: Position, map: GameMap, resources: ResourceVault) {
        let raysRes = [];
        let left_bound = pos.direction - camera.pov / 2;
        let right_bound = pos.direction + camera.pov / 2;
        
        console.log(camera.ray_angle_step, camera.rayDepthStep, camera.drawDistance)

        for (let angle = left_bound; angle < right_bound; angle += camera.ray_angle_step) {
            let item = this.throwRay(map, pos.value, angle, camera.rayDepthStep, camera.drawDistance);
            if (!!item) {
                raysRes.push({
                    ...item,
                    direction: angle - pos.direction,
                });
            } 
        }

        for (const res of raysRes) {
            if (res.distance > 0 && res.distance <= camera.drawDistance * map.cell_size) {
                if (!!res.cell) {
                    this.drawRayRes(camera, res, map.cell_size, resources.textures[res.cell - 1]);
                }
            }
        }
    }

    clear(camera: Camera) {
        let buf = camera.canvas_ctx.fillStyle;
        camera.canvas_ctx.fillStyle = `white`;
        camera.canvas_ctx.fillRect(0, 0, camera.screen_w, camera.screen_h);
        camera.canvas_ctx.fillStyle = buf;
    }

    throwRay(map: GameMap, position: Vector2, direction: number, step: number, distance: number): Partial<RayResult> {
        const x0 = position.x;
        const y0 = position.y;
        const rad = utils.degToRad(direction);
        
        for (let i = 0; i < distance; i += step) {
            let x = x0 - i * Math.cos(rad);
            let y = y0 - i * Math.sin(rad);
            
            let cell = map.cells.get(
                Math.round(x / map.cell_size),
                Math.round(y / map.cell_size)
                );
            if (!!cell) {
                let pos = new Vector2().set(x, y);
                return {
                    cell: cell,
                    rayPoint: pos,
                    distance: utils.getDistance(position, pos),
                };
            }
        }
    }

    drawRayRes(camera: Camera, rayRes: RayResult, cellSize: number, texture: ImageBitmap) {
        const texture_h_correction = camera.pov * 0.1;
        const ray_angle_step = camera.ray_angle_step;
        const pov = camera.pov;
        const ctx = camera.canvas_ctx;

        let sw = camera.screen_w / camera.rays_count;
        let sh = (cellSize * camera.drawDistance / (texture_h_correction * rayRes.distance * Math.cos(utils.degToRad(rayRes.direction))));

        let sx = sw * ((rayRes.direction + (pov / 2)) / ray_angle_step);
        let sy = (camera.screen_h / 2) - (sh / 2);

        let f = (rayRes.rayPoint.x / cellSize);
        let tex_x = Math.floor((f - Math.trunc(f)) * cellSize);

        ctx.drawImage(texture,
            tex_x, 0, 1, cellSize,
            sx, sy, sw, sh);
    }

    drawFloorAndCeiling(camera: Camera) {
        let buf = camera.canvas_ctx.fillStyle;
        camera.canvas_ctx.fillStyle = 'gray';
        camera.canvas_ctx.fillRect(0, 0, camera.screen_w, camera.screen_h / 2);
        camera.canvas_ctx.fillStyle = 'darkgray';
        camera.canvas_ctx.fillRect(0, camera.screen_h / 2, camera.screen_w, camera.screen_h / 2);
        camera.canvas_ctx.fillStyle = buf;
    }
}
