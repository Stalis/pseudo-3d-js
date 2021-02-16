import { Component, Types } from "ecsy";
import { CustomTypes } from "../types/custom_types";
import { Vector2 } from "../types";

export class Moving extends Component<Moving> {
    deltaPos: Vector2;
    deltaDirection: number;

    static schema = {
        deltaPos: { type: CustomTypes.Vector2 },
        deltaDirection: { type: Types.Number, default: 0 },
    };
}