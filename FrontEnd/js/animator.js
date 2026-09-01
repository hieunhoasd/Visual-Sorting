let isPlaying = false;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function playSteps(steps, array, speedMs) {
  isPlaying = true;
  const bars = getBarElements();
  const currentArray = [...array];

  for (const step of steps) {
    if (!isPlaying) break;

    clearBarStates();

    switch (step.type) {
      case "compare": {
        const [i, j] = step.indices;
        bars[i].classList.add("compare");
        bars[j].classList.add("compare");
        break;
      }
      case "swap": {
        const [i, j] = step.indices;
        bars[i].classList.add("swap");
        bars[j].classList.add("swap");
        [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
        updateBarHeight(bars[i], currentArray[i], array);
        updateBarHeight(bars[j], currentArray[j], array);
        break;
      }
      case "overwrite": {
        const idx = step.index;
        currentArray[idx] = step.value;
        bars[idx].classList.add("swap");
        updateBarHeight(bars[idx], step.value, array);
        break;
      }
      case "bucket_move": {
        bars.forEach((b) => b.classList.add("compare"));
        break;
      }
      case "sorted": {
        bars[step.index].classList.add("sorted");
        break;
      }
    }

    await sleep(speedMs);
  }

  if (isPlaying) {
    bars.forEach((bar) => bar.classList.add("sorted"));
  }
  isPlaying = false;
}

function updateBarHeight(barEl, value, originalArray) {
  const maxValue = Math.max(...originalArray, 1);
  barEl.style.height = `${(value / maxValue) * 100}%`;
  barEl.dataset.value = value;
}

function stopPlaying() {
  isPlaying = false;
}