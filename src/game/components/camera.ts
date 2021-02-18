import { Component, Types } from "ecsy";

export class Camera extends Component<Camera> {
    pov: number;
    drawDistance: number;

    static schema = {
        pov: { type: Types.Number, default: 60 },
        drawDistance: { type: Types.Number, default: 4096 },
    };
}