# Project Title: Drone Sounds and Visuals with Tone.js and p5.js

This project uses Tone.js, a powerful framework for creating interactive music in the browser, and p5.js, a JavaScript library that makes coding accessible for artists, designers, educators, and beginners, to create an interactive audio-visual experience.

## Description

The project creates drone sounds using Tone.js and visualizes them using p5.js. Drones are continuous musical notes or intervals that are sustained or repeated throughout a piece of music. They are often used in ambient music and sound healing.

## How it works

The project creates multiple drones at different frequencies using Tone.js. Each drone is an oscillator connected to a gain node, which controls the volume of the drone. The gain of each drone is modulated by a low-frequency oscillator (LFO), creating a dynamic, evolving sound.

The drones are visualized using p5.js. The volume and frequency of the drones affect the visuals, creating a direct link between the sound and the visuals.

## How to use

1. Start the drones by calling the `startDrones` function. This function starts the Tone.js context, sets the master volume, and initializes the drones.

```javascript
startDrones();
```

2. Modulate the drones by calling the `modulateDrone` function in your draw loop. This function adjusts the volume of the drones based on the `x` and `thickness` parameters.

```javascript
modulateDrone(x, thickness);
```

3. Stop the drones by calling the `stopDrones` function. This function fades out the drones smoothly and then stops them.

```javascript
stopDrones();
```

## Dependencies

- [Tone.js](https://tonejs.github.io/)
- [p5.js](https://p5js.org/)

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Tone.js](https://tonejs.github.io/) for providing the framework for creating interactive music in the browser.
- [p5.js](https://p5js.org/) for making coding accessible for artists, designers, educators, and beginners.

inspiration
https://openprocessing.org/sketch/1481222