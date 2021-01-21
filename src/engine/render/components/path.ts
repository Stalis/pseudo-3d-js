import { Point } from "./point";

export class Path {
    points: Point[];

    constructor() {
        this.points = [];
    }

    addPoint(x: number | Point, y?: number) {
        if (typeof x === 'object') {
            this.points.push(x);
        } else {
            this.points.push({ x: x, y: y });
        }
    }
}