class Curve {
    constructor(h) {
        this.h = h;
        this.points = [];
    }

    add(point) {
        this.points.push(point);
    }

    draw() {
        const os = ctx.strokeStyle;
        ctx.strokeStyle = `hsl(${this.h}, 100%, 65%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for(let point of this.points) {
            ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
        ctx.strokeStyle = os;
    }

    clear() {
        this.points = [];
    }
}