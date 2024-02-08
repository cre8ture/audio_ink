// Create an array to hold oscillators
let drones = [];

// function createDrone(frequency) {
//     let osc = new Tone.Oscillator(frequency, "sine").toDestination();
//     osc.volume.value = -20; // Lower the volume for a softer sound
//     osc.start();
//     return osc;
// }

function createDrone(frequency) {
    let gain = new Tone.Gain(0.05).toDestination(); // Lower initial volume
    // In your createDrone function, start with a lower gain and ramp up
gain.gain.setValueAtTime(0, Tone.now());
gain.gain.linearRampToValueAtTime(0.1, Tone.now() + 2); // 2-second fade-in

    let osc = new Tone.Oscillator(frequency, "triangle").connect(gain);
    let lfo = new Tone.LFO("0.1hz", 0.05, 0.15); // Slow LFO to modulate gain
    lfo.connect(gain.gain);
    lfo.start();
    osc.start();
    return {osc, gain, lfo}; // Include LFO in the returned object
}



// Initialize a couple of drones at different frequencies
function initDrones() {
    drones.push(createDrone(220)); // A3
    drones.push(createDrone(277.18)); // C#4, for a slight dissonance and richness
}

// Call this function when you're ready to start the sound, maybe in setup()
function startDrones() {
    Tone.start(); // Important to interact with the user first to start audio
    Tone.Destination.volume.value = -24; // Set the master volume
    initDrones();
}

function modulateDrone(x, thickness) {
    let volume = Tone.gainToDb(thickness / 20); // Example modulation
    drones.forEach(({osc, gain}) => { // Ensure this destructure matches your createDrone return
        if(!volume){
            volume = 0
        }
        gain.gain.rampTo(volume, 0.1); // Adjust volume dynamically
    });
}


// Adjust the stopDrones function to fade out more smoothly
function stopDrones() {
    drones.forEach(({osc, gain, lfo}) => {
        gain.gain.linearRampToValueAtTime(0, Tone.now() + 2); // 2-second fade-out
        setTimeout(() => {
            osc.stop();
            lfo.stop(); // Stop LFO as well
        }, 2000); // Ensure this matches the fade-out duration
    });
}


console.log("drones.js loaded")