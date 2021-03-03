import { Component, Types } from "ecsy";

export class Character extends Component<Character> {
    static schema = {
        portrait: { type: Types.String, default: '0' },
        hp: { type: Types.Number, default: 75 },
        maxHp: { type: Types.Number, default: 100 },
        mp: { type: Types.Number, default: 25 },
        maxMp: { type: Types.Number, default: 50 },
    };

    portrait: string = '2';
    hp: number = 75;
    maxHp: number = 100;
    mp: number = 25;
    maxMp: number = 50;
}