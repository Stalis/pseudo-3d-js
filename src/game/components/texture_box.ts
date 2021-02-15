import { Component, Types } from "ecsy";

export class TextureBox extends Component<{}> {
    north: string;
    east: string;
    south: string;
    west: string;

    static schema = {
        north: { type: Types.String, default: 'missing' },
        east: { type: Types.String, default: 'missing' },
        south: { type: Types.String, default: 'missing' },
        west: { type: Types.String, default: 'missing' },
    };
}