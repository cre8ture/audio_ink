let sketch = function(p) {
    let cx, cy;
    let num = 6;
    let inkArray = [];
    let prevPos = [];
    let maxSize = [];
    let backgroundImage;

    p.setup = function() {
        p.createCanvas(1000, 800);
        p.background(250);
        cx = p.width / 2;
        cy = p.height / 2;
        for (let i = 0; i < num; i++) {
            inkArray[i] = p.createVector(p.random(-100, 100) + cx, 0);
            maxSize[i] = p.random(p.height);
            prevPos[i] = inkArray[i].copy();
        }
        backgroundImage = p.createImage(p.width, p.height);
        backgroundImage.loadPixels();
        for (let i = 0; i < backgroundImage.width; i++) {
            for (let j = 0; j < backgroundImage.height; j++) {
                let index = (i + j * backgroundImage.width) * 4;
                let col = p.lerpColor(p.color(255), p.color(220), p.map(j, 0, backgroundImage.width, 0, 1));
                backgroundImage.pixels[index] = p.red(col);
                backgroundImage.pixels[index + 1] = p.green(col);
                backgroundImage.pixels[index + 2] = p.blue(col);
                backgroundImage.pixels[index + 3] = p.alpha(col);
            }
        }
        backgroundImage.updatePixels();
        p.image(backgroundImage, 0, 0);
    };

    p.draw = function() {
        for (let i = 0; i < num; i++) {
            prevPos[i].x = inkArray[i].x;
            prevPos[i].y = inkArray[i].y;
            inkArray[i].x += p.random(-0.5, 0.5);
            inkArray[i].y += p.random(3);
            let w = p.abs(maxSize[i] / (inkArray[i].y + 25));
            let a = p.map(inkArray[i].y, 0, maxSize[i], 200, 0);
            p.strokeWeight(w);
            p.stroke(0, a);
            if (inkArray[i].y < maxSize[i]) {
                p.line(prevPos[i].x, prevPos[i].y, inkArray[i].x, inkArray[i].y);
            } else {
                inkArray[i] = p.createVector(p.random(-100, 100) + cx, 0); 
                maxSize[i] = p.random(p.height);
                prevPos[i] = inkArray[i].copy();
            }
        }
    };
};
new p5(sketch);