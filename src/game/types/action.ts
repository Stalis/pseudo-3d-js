import { cloneClonable, copyCopyable, createType } from "ecsy";

export enum ActionKind {
    nop = 'nop',
    walk = 'walk',
    rotate = 'rotate',
};

export enum Directions {
    forward = 'forward',
    backward = 'backward',
    left = 'left',
    right = 'right',
}

export const CommandCosts: Record<ActionKind, number> = {
    'nop': 0,
    'walk': 4,
    'rotate': 0,
};

export class Action {
    type: ActionKind;
    cost: number;
    params: any[];

    constructor() {
        throw new Error("Action can be created only with Action.createNew(<type>)");
    }

    copy(source: Action) {
        this.type = source.type;
        this.cost = source.cost;
        this.params = Array.from(source.params);
    }

    clone() {
        return Action.createNew(this.type, this.params).copy(this);
    }

    static createNew(type: ActionKind, ...params: any[]) {
        let res: Action = Object.create(Action.prototype);
        res.type = type;
        res.cost = CommandCosts[res.type];
        res.params = Array.from(params);
        return res;
    }
}

export const ActionType = createType({
    name: "Action",
    default: Action.createNew(ActionKind.nop),
    copy: copyCopyable,
    clone: cloneClonable,
});