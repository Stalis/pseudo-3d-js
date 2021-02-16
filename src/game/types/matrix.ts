import { cloneClonable, copyCopyable, createType } from "ecsy";

export class Matrix<T> {
    private _rows: T[][] = [];

    get rows() {
        return this._rows;
    }

    set(vals: T[][]) {
        this._rows = vals;
        return this;
    }

    update(x: number, y: number, val: T) {
        if (y < this._rows.length) {
            if (x < this._rows.length) {
                this._rows[y][x] = val;
            }
        }
        return this;
    }

    get(x: number, y: number) {
        if (x >= 0 && y >= 0) {
            if (y < this._rows.length) {
                if (x < this._rows[y].length) {
                    return this._rows[y][x];
                }
            }
        }
    }

    copy(source: Matrix<T>) {
        this.set(source.rows);
        return this;
    }

    clone() {
        return new Matrix<T>().copy(this);
    }
}

export const MatrixNumType = createType({
    name: "MatrixNum",
    default: new Matrix<number>(),
    copy: copyCopyable,
    clone: cloneClonable,
});