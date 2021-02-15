import { Component, Types } from "ecsy";

export class Camera extends Component<Camera> {
    pov: number;
    drawDistance: number;
    rayDepthStep: number;
    canvas_ctx: CanvasRenderingContext2D;
    screen_w: number;
    screen_h: number;

    get rays_count() {
        return this.screen_w;
    }

    get ray_angle_step() {
        return this.pov / this.rays_count;
    }

    static schema = {
        pov: { type: Types.Number, default: 60 },
        drawDistance: { type: Types.Number, default: 4096 },
        rayDepthStep: { type: Types.Number, default: 1 },
        canvas_ctx: { type: Types.Ref, default: null },
        screen_w: { type: Types.Number, default: 800 },
        screen_h: { type: Types.Number, default: 600 },
    };
}