class Path {
    constructor() {
        this.points = [];
    }

    addPoint(x, y) {
        this.points.push({ x: x, y: y });
    }
}

module.exports = Path;