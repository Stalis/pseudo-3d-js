import { Component, Types } from "ecsy";
import { Action, ActionType, CustomTypes } from "../types";

export class Actor extends Component<Actor> {
    static schema = {
        nextAction: { type: CustomTypes.Action },
        actionPoints: { type: Types.Number },
    };

    nextAction: Action;
    actionPoints: number = 1;
}