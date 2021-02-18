import { Component, Types } from "ecsy";

export class Rotation extends Component<Rotation> {
    static schema = {
        value: { type: Types.Number },
    };

    value: number;
}