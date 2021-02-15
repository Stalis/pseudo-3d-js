import { Point } from "../render/components/point";

export function getDistance(p1: Point, p2: Point) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function roundEven(n: number) {
    let f = Math.floor(n);
    if (f % 2 === 0) {
        return f;
    } else {
        return Math.ceil(n);
    }
}

export function degToRad(degrees: number) {
    return degrees * (Math.PI / 180);
}