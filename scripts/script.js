function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRndIntegerInc(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRndHexColor() {
    // let r = getRndInteger(0, (256));
    // let g = getRndInteger(0, (256));
    // let b = getRndInteger(0, (256));
    return "#" + (getRndInteger(0, (256))).toString(16).padStart(2, '0') + (getRndInteger(0, (256))).toString(16).padStart(2, '0') + (getRndInteger(0, (256))).toString(16).padStart(2, '0');

}





const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


let clientHeight = window.innerHeight;
let clientWidth = window.innerWidth;



ctx.canvas.width = clientWidth;
ctx.canvas.height = clientHeight;

let radius = 20;

let gap = 5;

let circles = [];


let vertSpace = -(2*radius + gap);
let horzSpace = -(2*radius + gap);


let rowchange = -1;

let rowLine = (clientHeight - (2*radius + gap));

let colLine = (clientWidth - (2*radius + gap));


class Circle {
    constructor(x, y, row) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = getRndHexColor();
        this.row = row;
    }
}
let r;

function animationStart() {
    window.onresize = resize;
    for(let i = (2*radius + gap); i < clientWidth - (2*radius + gap); i += (2*radius + gap)) {
        r = 0;
        for(let j = (2*radius + gap); j <= clientHeight - (2*radius + gap); j += (2*radius + gap)) {
            r++;
            if(Math.random() > 0.6) {
                let circ = new Circle(i,j,r);
                circles.push(circ);
            }


        }//vert inner loop

    }//horz outer loop
    animationFrame = window.requestAnimationFrame(animationLoop);
}


let frames = 0;


function animationLoop() {
    if(frames === 0) {

        ctx.clearRect(0,0, clientWidth, clientHeight);
        for(circ of circles) {
            ctx.fillStyle = circ.color;
            ctx.beginPath();
            ctx.arc(circ.x, circ.y, circ.radius, 0, Math.PI * 2);
            ctx.lineWidth = 5;
            ctx.fill();
            if(horzToggle) {
                circ.x += horzSpace;
            }


            if(vertToggle) {
                circ.y += vertSpace;
            }
            circ.row += rowchange;

        }

        circles = circles.filter(circle => circle.y > 0 && circle.y < clientHeight && circle.x > 0 && circle.x < clientWidth);

        if(vertToggle) {
            for(let i = (2*radius + gap); i < clientWidth - (2*radius + gap); i += (2*radius + gap)) {
                if(Math.random() > 0.6) {
                    let circ = new Circle(i, rowLine, r);
                    circles.push(circ);
                }
            }
        }

        if(horzToggle) {
            for(let i = (2*radius + gap); i < clientHeight - 2*(2*radius + gap); i += (2*radius + gap)) {
                if(Math.random() > 0.6) {
                    let circ = new Circle(colLine, i, r);
                    circles.push(circ);
                }
            }
        }

    }
    frames ++;

    if(frames > 4) {
        frames = 0;
    }
    animationFrame = window.requestAnimationFrame(animationLoop);

}

let horzToggle = true;
let vertToggle = true;

let triggerChance = 0;

function clickSwitch() {
    window.cancelAnimationFrame(animationFrame);


    if(Math.random() > (0.5 - triggerChance)) {
        triggerChance = 0;
        colLine = colLine === (clientWidth - (2*radius + gap)) ? (2*radius + gap) : (clientWidth - (2*radius + gap));
        horzSpace = horzSpace === -(2*radius + gap) ? (2*radius + gap) : -(2*radius + gap);
    } else {
        triggerChance += 0.1;
    }

    if(Math.random() > (0.5 - triggerChance)) {
        triggerChance = 0;
        rowLine = rowLine === (clientHeight - (2*radius + gap)) ? (2*radius + gap) : (clientHeight - (2*radius + gap));
        vertSpace = vertSpace === -(2*radius + gap) ? (2*radius + gap) : -(2*radius + gap);
    } else {
        triggerChance += 0.1;
    }

    horzToggle = Math.random() <= 0.5;

    vertToggle = Math.random() <= 0.5;

    if(!vertToggle && !horzToggle) {
        if(Math.random() > 0.5) {
            vertToggle = true;
        } else {
            horzToggle = true;
        }
    }
    //space *= -1;
    //rowchange *= -1;
    animationFrame = window.requestAnimationFrame(animationLoop);

}


function resize() {
    window.cancelAnimationFrame(animationFrame);
    pageHeight = window.innerHeight;
    pageWidth = window.innerWidth;

    ctx.canvas.width  = pageWidth;
    ctx.canvas.height = pageHeight;
    circles = [];
    animationFrame = window.requestAnimationFrame(animationStart);
}



document.addEventListener('click', clickSwitch);


animationFrame = window.requestAnimationFrame(animationStart);









