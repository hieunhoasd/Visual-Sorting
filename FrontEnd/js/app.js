const algorithmSelect = document.getElementById("algorithm-select");
const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");
const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");
const generateBtn = document.getElementById("generate-btn");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

let currentArray = [];

function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

function generateAndRender() {
  const size = parseInt(sizeSlider.value, 10);
  currentArray = generateRandomArray(size);
  renderBars(currentArray);
}

sizeSlider.addEventListener("input", () => {
  sizeValue.textContent = sizeSlider.value;
});

speedSlider.addEventListener("input", () => {
  speedValue.textContent = speedSlider.value;
});

generateBtn.addEventListener("click", () => {
  stopPlaying();
  generateAndRender();
});

resetBtn.addEventListener("click", () => {
  stopPlaying();
  renderBars(currentArray);
});

startBtn.addEventListener("click", async () => {
  const algorithm = algorithmSelect.value;
  const speedMs = parseInt(speedSlider.value, 10);

  startBtn.disabled = true;
  generateBtn.disabled = true;

  try {
    const result = await fetchSortSteps(algorithm, currentArray);
    await playSteps(result.steps, currentArray, speedMs);
  } catch (err) {
    alert(`Không thể sắp xếp: ${err.message}`);
  } finally {
    startBtn.disabled = false;
    generateBtn.disabled = false;
  }
});

generateAndRender();