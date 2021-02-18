import { Component, Types } from "ecsy";
import { CustomTypes } from "../types/custom_types";
import { Vector2 } from "../types/vector2";

export class Position extends Component<Position> {
    value: Vector2;

    static schema = {
        value: { type: CustomTypes.Vector2 },
    };
}