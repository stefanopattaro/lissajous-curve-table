// Main constant
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
const TWO_PI = 2 * Math.PI;
const HALF_PI = 0.5 * Math.PI;

// App main variables/constants
const dim = 100;
const cols = Math.floor(canvas.width / dim) - 1;
const rows = Math.floor(canvas.height / dim) - 1;
const d = dim - 15;
const r = d / 2;
const x_vet = [];
const y_vet = [];
const max_hue = 360;
let angle = 0;

// Setup
/** @type {Curve} */
const curves = [];
for(let row = 0; row < rows; row++) {
    curves[row] = [];
    for(let col = 0; col < cols; col++) {
        const hcol = col * max_hue / cols;
        const hrow = row * max_hue / rows;
        const h = (hcol + hrow) / 2;
        curves[row][col] = new Curve(h);
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Top row of circles
    for(let col = 0; col < cols; col++) {
        const color = col * max_hue / cols;
        const px = drawCircle(col, true, color);
        x_vet[col] = px.x;
    }
    // Left column of circles
    for(let row = 0; row < rows; row++) {
        const color = row * max_hue / rows;
        const py = drawCircle(row, false, color);
        y_vet[row] = py.y;
    }

    ctx.strokeStyle = 'rgb(255,255,255,1)';
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            curves[row][col].add({x: x_vet[col], y: y_vet[row]});
            curves[row][col].draw()
            ctx.lineWidth = 4;
            circle(x_vet[col], y_vet[row], 1);
        }
    }

    angle += 0.01;
    if(angle > TWO_PI) {
        angle = 0;
        for(let row = 0; row < rows; row++) {
            for(let col = 0; col < cols; col++) {
                curves[row][col].clear()
            }
        }
    }

    window.requestAnimationFrame(draw);
}
draw();


// Utils
function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TWO_PI);
    ctx.stroke(); 
}

function drawCircle(num, top, h) {
    ctx.strokeStyle = `hsl(${h}, 100%, 65%)`;
    let cx, cy;
    if(top) {
        cx = (num + 1.5) * dim;
        cy = 0.5 * dim;
    } else {
        cy = (num + 1.5) * dim;
        cx = 0.5 * dim;
    }
    ctx.lineWidth = 2;
    circle(cx, cy, r);
    const x = (cx + r * Math.cos(angle * (num + 1) - HALF_PI));
    const y = (cy + r * Math.sin(angle * (num + 1) - HALF_PI));
    ctx.strokeStyle = 'rgb(255,255,255,1)';
    ctx.lineWidth = 4;
    circle(x, y, 1);
    ctx.strokeStyle = 'rgb(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.moveTo(x,y);
    if(top) {
        ctx.lineTo(x, canvas.height);
    } else {
        ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
    return {x, y};
}





