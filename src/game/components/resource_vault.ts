import { Component, Types } from "ecsy";

export class ResourceVault extends Component<ResourceVault> {
    textures: ImageBitmap[];

    static schema = {
        textures: { type: Types.Array, default: [] },
    };
}