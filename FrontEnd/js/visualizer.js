const barsContainer = document.getElementById("bars-container");

function renderBars(array) {
    barsContainer.innerHTML = "";
    const maxValue = Math.max(...array, 1);

    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${(value / maxValue) * 100}%`;
        bar.dataset.value = value;
        barsContainer.appendChild(bar);
    });
}

function getBarElements(){
    return Array.from(barsContainer.children);
}

function clearBarStates(){
    getBarElements().forEach((bar) => {
        bar.classList.remove("compare", "swap", "sorted");
    });
}