export class Color {
    red: number;
    green: number;
    blue: number;
    alpha: number;

    constructor(red: number, green: number, blue: number, alpha?: number) {
        this.red = Color.boundColor(red);
        this.green = Color.boundColor(green);
        this.blue = Color.boundColor(blue);
        this.alpha = Color.boundAlpha(alpha);
    }

    static boundColor(value: number) {
        return !!value ? Math.max(Math.min(value, 255), 0) : 0;
    }

    static boundAlpha(value: number) {
        return !!value ? Math.max(Math.min(value, 1), 0) : 0;
    }

    toString() {
        if (!!this.alpha) {
            return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        } else {
            return `rgb(${this.red}, ${this.green}, ${this.blue})`;
        }
    }
}