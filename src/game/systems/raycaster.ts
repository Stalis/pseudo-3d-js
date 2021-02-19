import { Attributes, System } from "ecsy";
import { Player, Camera, Position, TextureBox, MapCell, GameMap, ResourceVault, CellType, Rotation } from "../components";
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
        player: { components: [ Player, Camera, Position, Rotation ] },
        map: { components: [ GameMap ] },
        mapCells: { components: [ MapCell, TextureBox, Position ] },
        resources: { components: [ ResourceVault ] },    
    }

    canvas: HTMLCanvasElement;
    canvas_ctx: CanvasRenderingContext2D;
    screen_w: number;
    screen_h: number;
    ray_depth_step: number = 1;

    get rays_count() {
        return this.screen_w;
    }

    ray_angle_step(pov: number) {
        return pov / this.rays_count;
    }

    init(attr: Attributes) {
        let canvasId = attr.canvas_id;
        if (!canvasId)
            throw new Error(`${RaycasterSystem.name}: canvasId attribute is not available`);

        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!this.canvas)
            throw new Error(`${RaycasterSystem.name}: can't find canvas '${canvasId}'`)

        this.canvas_ctx = this.canvas.getContext('2d');

        if (!!attr.ray_depth_step) {
            this.ray_depth_step = attr.ray_depth_step
        }

        if (!attr.screen_w) {
            this.canvas.width = attr.screen_w;
        }
        if (!attr.screen_h) {
            this.canvas.height = attr.screen_h
        }

        this.screen_w = this.canvas.width;
        this.screen_h = this.canvas.height;
    }

    execute(delta: number, time: number): void {
        const player = this.queries.player.results[0];
        const camera = player.getComponent(Camera);
        const pos = player.getComponent(Position);
        const rot = player.getComponent(Rotation);
        const map = this.queries.map.results[0].getComponent(GameMap);
        const resourses = this.queries.resources.results[0].getComponent(ResourceVault);
        
        this.clear();
        this.drawFloorAndCeiling();
        this.drawWalls(camera, pos, rot, map, resourses);
    }

    drawWalls(camera: Camera, pos: Position, rot: Rotation, map: GameMap, resources: ResourceVault) {
        let raysRes = [];
        let left_bound = rot.value - camera.pov / 2;
        let right_bound = rot.value + camera.pov / 2;
        let absDrawDistance = camera.drawDistance * map.cell_size;

        for (let angle = left_bound; angle < right_bound; angle += this.ray_angle_step(camera.pov)) {
            let item = this.throwRay(map, pos.value, angle, this.ray_depth_step, camera.drawDistance);
            if (!!item) {
                raysRes.push({
                    ...item,
                    direction: angle - rot.value,
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

    clear() {
        let buf = this.canvas_ctx.fillStyle;
        this.canvas_ctx.fillStyle = `white`;
        this.canvas_ctx.fillRect(0, 0, this.screen_w, this.screen_h);
        this.canvas_ctx.fillStyle = buf;
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
        const ray_angle_step = this.ray_angle_step(camera.pov);
        const pov = camera.pov;
        const ctx = this.canvas_ctx;

        let sw = this.screen_w / this.rays_count;
        let sh = (cellSize * camera.drawDistance / (texture_h_correction * rayRes.distance * Math.cos(utils.degToRad(rayRes.direction))));

        let sx = sw * ((rayRes.direction + (pov / 2)) / ray_angle_step);
        let sy = (this.screen_h / 2) - (sh / 2);

        let f = (rayRes.rayPoint.x / cellSize);
        let tex_x = Math.floor((f - Math.trunc(f)) * cellSize);

        ctx.drawImage(texture,
            tex_x, 0, 1, cellSize,
            sx, sy, sw, sh);
    }

    drawFloorAndCeiling() {
        let buf = this.canvas_ctx.fillStyle;
        this.canvas_ctx.fillStyle = 'gray';
        this.canvas_ctx.fillRect(0, 0, this.screen_w, this.screen_h / 2);
        this.canvas_ctx.fillStyle = 'darkgray';
        this.canvas_ctx.fillRect(0, this.screen_h / 2, this.screen_w, this.screen_h / 2);
        this.canvas_ctx.fillStyle = buf;
    }
}
