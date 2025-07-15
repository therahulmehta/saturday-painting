const canvasSketch = require("canvas-sketch");
const { color } = require("canvas-sketch-util");
// linear interpolation function
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const palette = random.shuffle(random.pick(palettes)).slice(0, 2);
  const createGrid = (rows, cols) => {
    const points = [];
    const count = 90;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // normalize the x and y coordinates
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.04;

        points.push({
          color: random.pick(palette),
          radius,
          position: [u, v],
        });
      }
    }
    return points;
  };

  // deterministic random from random canvas-sketch-util
  // random.setSeed('grid-dots');
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const {
        position: [u, v],
        radius,
        color,
      } = data;
      // convert normalized coordinates to canvas coordinates
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius, 0, Math.PI * 2, false);
      // context.strokeStyle = "black";
      // context.lineWidth = 1;

      context.fillStyle = color;
      context.font= `${radius*width}px Helvetica`;
      context.rotate(1); 
      context.fillText("######################################################", x, y);      
    });
  };
};

// using sketch function and settings to create a canvas boilerplate
canvasSketch(sketch, settings);
