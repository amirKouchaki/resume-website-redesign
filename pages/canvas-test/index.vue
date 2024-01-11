<template>
  <div class="h-[100vh]" :on-mousemove="initParticles()">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { x, y } = useMouse();

const canvasRef = ref();
const canvasCtx: Ref<CanvasRenderingContext2D | undefined> = ref();
const particles: Ref<Array<Particle>> = ref([]);

onMounted(() => {
  canvasCtx.value = canvasRef.value.getContext("2d");
  canvasRef.value.width = innerWidth;
  canvasRef.value.height = innerHeight;
  addEventListener("resize", () => {
    canvasRef.value.width = innerWidth;
    canvasRef.value.height = innerHeight;
    // if (canvasCtx.value) draw(canvasCtx.value);
    if (canvasCtx.value) drawTest(canvasCtx.value, 0, 0, 0, 0, -1000);
  });

  if (canvasCtx.value) drawTest(canvasCtx.value, 0, 0, 0, 0, -1000);
  // let p = new Path2D(
  //   "M1 1V61.5C108.333 135.333 295 197 541.5 128.5C782.949 61.4035 1007.67 12.6667 1132 86.5C1230.5 157 1335 227.5 1628.5 147C1887.97 75.8324 1882 105 1919.5 128.5V1H1Z"
  // );
  // if (canvasCtx.value) {
  //   canvasCtx.value.fillStyle = "#006466";
  //   canvasCtx.value.fill(p);
  // }
  // if (canvasCtx.value) draw(canvasCtx.value);
  // initParticles();
  // animate();
});

const drawTest = (
  ctx: CanvasRenderingContext2D,
  curveInc: number,
  edgeInc: number,
  prevCurveInc: number,
  prevEdgeInc: number,
  offset: number
) => {
  const cInc = prevCurveInc + curveInc;
  const eInc = prevEdgeInc + edgeInc;

  // ctx.fillStyle = "#006466";
  // ctx.strokeStyle = "#006466";
  // ctx.beginPath();
  // ctx.moveTo(0, 0);
  // ctx.lineTo(0, innerHeight / 10 + eInc);
  //   ctx.bezierCurveTo(
  //     innerWidth / 10,
  //     innerHeight / 2 + cInc,
  //     (innerWidth / 10) * 3,
  //     innerHeight / 10 + cInc * 0.2,
  //     innerWidth / 2,
  //     innerHeight / 10 + cInc * 0.2
  //   );

  // // ctx.bezierCurveTo(
  // //   (innerWidth / 10) * 3,
  // //   (innerHeight / 4) * 3,
  // //   (innerWidth / 5) * 3,
  // //   innerHeight / 10,
  // //   innerWidth / 2,
  // //   innerHeight / 10
  // // );
  // // ctx.moveTo(innerWidth / 3, innerHeight / 10 + eInc);
  // // ctx.bezierCurveTo(
  // //   (innerWidth / 5) * 3,
  // //   (innerHeight / 10) * 9,
  // //   innerWidth / 2,
  // //   (innerHeight / 5) * 3,

  // //   (innerWidth / 4) * 3,
  // //   innerHeight / 10 + eInc
  // // );

  // ctx.lineTo(innerWidth, innerHeight / 10);
  // ctx.lineTo(innerWidth, 0);
  // ctx.lineTo(0, 0);
  // ctx.fill();
  // requestAnimationFrame(() =>
  //   drawTest(
  //     ctx,
  //     1,
  //     innerHeight / 2 + cInc > innerHeight * 1.5 ? 2 : 0,
  //     cInc,
  //     eInc
  //   )
  // );
  if (offset < -700) offset = offset + 20;
  else offset = offset + 10;

  ctx.save();
  ctx.strokeStyle = "rgba(0,0,0,0)";
  ctx.miterLimit = 4;
  ctx.font = "15px ''";
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.font = "   15px ''";
  ctx.scale(innerWidth / 1920, innerHeight / 1080);
  ctx.save();
  ctx.fillStyle = "#006466";
  ctx.strokeStyle = "#006466";
  ctx.font = "   15px ''";
  ctx.beginPath();
  ctx.moveTo(1920, 0);
  ctx.lineTo(1920, 1080);
  ctx.bezierCurveTo(
    1921.001 - offset * 0.95,
    1080,
    1004.49946 - offset * 0.95,
    1084,
    1007.49973 - offset,
    1080
  );
  ctx.bezierCurveTo(
    1010.5 - offset * 0.95,
    1076,
    1005.48377 - offset * 0.95,
    1074,
    1004.00019 - offset,
    1067
  );
  ctx.bezierCurveTo(
    982.7856 - offset * 0.95,
    959.49,
    1108.295 - offset * 0.95,
    863.717,
    1136.5 - offset,
    757.5
  );
  ctx.bezierCurveTo(
    1160 - offset * 0.95,
    669,
    1145 - offset * 0.95,
    593.5,
    1160 - offset,
    533.5
  );
  ctx.bezierCurveTo(
    1175 - offset * 0.95,
    473.5,
    1362.5 - offset * 0.95,
    383.5,
    1355 - offset,
    320.5
  );
  ctx.bezierCurveTo(
    1347.143 - offset * 0.95,
    254.5,
    1016.4999 - offset * 0.95,
    35.5,
    1048.4999 - offset,
    0
  );
  ctx.bezierCurveTo(
    1179.5 - offset * 0.95,
    0.000427246,
    1921.001 - offset * 0.95,
    0,
    1921.001 - offset,
    0
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.restore();

  requestAnimationFrame(() =>
    drawTest(
      ctx,
      1,
      innerHeight / 2 + cInc > innerHeight * 1.5 ? 2 : 0,
      cInc,
      eInc,
      offset
    )
  );
};

const draw = function (ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = "transparent";
  ctx.miterLimit = 4;
  ctx.font = "15px ''";
  ctx.fillStyle = "transparent";
  ctx.font = "   15px ''";
  ctx.scale(1, 1);
  ctx.save();
  ctx.fillStyle = "#006466";
  ctx.strokeStyle = "transparent";
  ctx.font = "   15px ''";
  ctx.beginPath();
  ctx.moveTo(0.5, 1.29004);
  ctx.lineTo(0.5, 700.79);
  ctx.bezierCurveTo(107.833, 575.623, 290.8, 1002.49, 468, 825.29);
  ctx.bezierCurveTo(645.2, 700.09, 1014.17, 427.957, 1138.5, 501.79);
  ctx.bezierCurveTo(1237, 572.29, 1406.3, 1054.49, 1635.5, 825.29);
  ctx.bezierCurveTo(1825.75, 635.038, 1909.97, 589.835, 1919, 649.29);
  ctx.lineTo(1919, 1.29004);
  ctx.lineTo(0.5, 1.29004);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.restore();
};

const drawCircle = () => {
  if (canvasCtx.value) {
    canvasCtx.value.fillStyle = "white";
    canvasCtx.value.beginPath();
    canvasCtx.value.arc(x.value, y.value, 30, 0, Math.PI * 2);
    canvasCtx.value.fill();
  }
};

const handleParticles = () => {
  particles.value = particles.value.filter((particle) => {
    return particle.size > 0.3;
  });
  particles.value.forEach((particle) => {
    particle.update();
    particle.draw();
  });
};

const animate = () => {
  if (canvasCtx.value) canvasCtx.value.clearRect(0, 0, innerWidth, innerWidth);
  // if (canvasCtx.value) {
  //   canvasCtx.value.fillStyle = "rgba(0,0,0,0.1)";
  //   canvasCtx.value?.fillRect(0, 0, innerWidth, innerHeight);
  // }
  handleParticles();
  // drawCircle();
  requestAnimationFrame(animate);
};

const initParticles = () => {
  for (let i = 0; i < 2; i++) {
    particles.value.push(new Particle());
  }
};

class Particle {
  public x: number;
  public y: number;
  public size: number;
  public speedX: number;
  public speedY: number;
  constructor() {
    this.x = x.value;
    this.y = y.value;
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  public update = (): void => {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  };

  public draw = (): void => {
    if (canvasCtx.value) {
      canvasCtx.value.fillStyle = "white";
      canvasCtx.value.beginPath();
      canvasCtx.value.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      canvasCtx.value.fill();
    }
  };
}
</script>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
