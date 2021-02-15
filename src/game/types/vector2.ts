import { createType, copyCopyable, cloneClonable } from "ecsy";
import { Point } from "../../engine";

export class Vector2 implements Point {
    x: number = 0;
    y: number = 0;

    set(x: number, y: number) {
        this.x = x ?? this.x;
        this.y = y ?? this.y;
        return this;
    }

    add(other: Point) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    sub(other: Point) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    div(n: number) {
        this.x /= n;
        this.y /= n;
        return this;
    }

    mul(n: number) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    copy(source: Point) {
        return this.set(source.x, source.y);
    }

    clone() {
        return new Vector2().copy(this);
    }
}

export const Vector2Type = createType({
    name: "Vector2",
    default: new Vector2(),
    copy: copyCopyable,
    clone: cloneClonable,
});
