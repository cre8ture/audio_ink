console.log("app.js loaded")

let drone_started = false;
let pauseDuration = 0; // Duration of the current pause
let nextPauseIn = 0; // Time until the next pause
let currentTime = 0; // Current time since the last reset
let isPaused = false; // Is the drawing currently paused
let minThickness = 2; // Minimum thickness
let maxThickness = 8; // Maximum thickness
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFluorescentColor(p) {
    // Generate a random, vivid, fluorescent color
    let r = p.random(100, 255); // Random value for the red component
    let g = p.random(100, 255); // Random value for the green component
    let b = p.random(100, 255); // Random value for the blue component
    // Returning the color as an object or directly as a p5 color
    return p.color(r, g, b);
}


window.onload = function() {
    const buttonAudio = document.getElementById('startAudio')
    buttonAudio.addEventListener('click', async function() {
        if (drone_started) {
            stopDrones();
            drone_started = false;
            buttonAudio.textContent = "start audio"

        }
        else {
            await Tone.start();
            console.log('Audio is ready');
            drone_started = true;
            startDrones(); // Start your drones here
            resetPauseTimer(); // Initialize pause timer
            buttonAudio.textContent = "stop audio"
}

    });
};

function resetPauseTimer() {
    nextPauseIn = random(100, 4000); // Next pause in 1-5 seconds
    pauseDuration = random(500, 5000); // Pause duration between 0.5-2 seconds
    currentTime = 0;
    isPaused = false;
}
let sketch = function(p) {
    let lastUpdateTime = p.millis(); // Last time the update loop ran
    
    let cx, cy;
    let num = 6;
    let inkArray = [];
    let prevPos = [];
    let maxSize = [];
    let backgroundImage;
    let tearY = 0;

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      }

    p.setup = function() {
        // p.createCanvas(p.windowWidth, 800);
        p.createCanvas(p.windowWidth, p.windowHeight);
        tearY = p.height / 3;
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

        // Start drones
        startDrones();
    };

    // p.drawTear = function(minThickness, maxThickness) {
    //     let startX = 0;
    //     let endX = p.width;
    //     let numPoints = 100;
    //     let lastY = tearY;

    //     for (let i = 0; i <= numPoints; i++) {
    //         let x = p.map(i, 0, numPoints, startX, endX);
    //         let yVariation = p.random(-10, 10);
    //         let y = lastY + yVariation;
    //         let thickness = p.random(minThickness, maxThickness);

    //         p.fill(0);
    //         p.noStroke();
    //         p.ellipse(x, y, thickness, thickness);

    //         console.log("thickness", thickness)
    //         // Modulate drone sound for each ellipse drawn
    //         modulateDrone(x, thickness-2);

    //         lastY = y;
    //     }
    // };
    p.drawTear = function(minThickness, maxThickness) {
        let startX = 0;
        let endX = p.width;
        let numPoints = 100;
        let lastY = tearY;
    
        for (let i = 0; i <= numPoints; i++) {
            let x = p.map(i, 0, numPoints, startX, endX);
            let yVariation = p.random(-10, 10);
            let y = lastY + yVariation;
            let thickness = p.random(minThickness, maxThickness);
    
            // Use the new function to get a random fluorescent color
            let fluorescentColor = getRandomFluorescentColor(p);
            p.fill(fluorescentColor); // Apply the color
            p.noStroke();
            p.ellipse(x, y, thickness, thickness);
    
            lastY = y;
        }
    };
    
    p.draw = function() {
        if (!drone_started) return;

        let now = p.millis();
        let elapsedTime = now - lastUpdateTime;
        lastUpdateTime = now;

        if (isPaused) {
            if (currentTime >= pauseDuration) {
                // Pause is over
                isPaused = false;
                startDrones()
                resetPauseTimer(); // Reset for the next pause
                // Adjust the thickness range
                minThickness = random(1, 3); // New min thickness
                maxThickness = random(3, 6); // New max thickness
            } else {
                currentTime += elapsedTime;
            }
        } else {
            if (currentTime >= nextPauseIn) {
                // Time to pause
                isPaused = true;
                stopDrones()
                currentTime = 0; // Reset time
            } else {
                currentTime += elapsedTime;
                p.strokeWeight(1);
                p.stroke(0);
                p.drawTear(minThickness, maxThickness);
            }
        }
    };
};

new p5(sketch);
