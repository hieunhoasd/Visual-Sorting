document.addEventListener('DOMContentLoaded', () => {
    const visualizer = window.visualizer;

    const algoTrack = document.getElementById('algo-track');
    const page0 = document.getElementById('page-0');
    const page1 = document.getElementById('page-1');
    const leftPanelContainer = document.getElementById('left-panel-container');
    const globalStats = document.getElementById('global-stats');

    const boardSingle = document.getElementById('board');
    const compareContainer = document.getElementById('compare-container');
    const board1 = document.getElementById('board-1');
    const board2 = document.getElementById('board-2');

    const selectAlgo1 = document.getElementById('select-algo-1');
    const selectAlgo2 = document.getElementById('select-algo-2');

    const sizeSlider = document.getElementById('size-slider');
    const sizeValue = document.getElementById('size-value');
    const delaySlider = document.getElementById('delay-slider');
    const delayValue = document.getElementById('delay-value');

    const btnStart = document.getElementById('btn-start');
    const btnStop = document.getElementById('btn-stop');
    const btnStep = document.getElementById('btn-step');
    const btnShuffle = document.getElementById('btn-shuffle');
    const btnCompare = document.getElementById('btn-compare');

    let selectedAlgo = 'bubble_sort';
    let isCompareMode = false;

    const algoPages = [
        [
            { id: 'bubble_sort', name: 'Bubble Sort' },
            { id: 'selection_sort', name: 'Selection Sort' },
            { id: 'insertion_sort', name: 'Insertion Sort' },
            { id: 'quick_sort', name: 'Quick Sort' },
            { id: 'merge_sort', name: 'Merge Sort' },
            { id: 'heap_sort', name: 'Heap Sort' },
            { id: 'shell_sort', name: 'Shell Sort' },
            { id: 'radix_msd_sort', name: 'Radix MSD Sort' },
            
           
            { id: 'radix_sort', name: 'Radix LSD Sort' },
           
        ],
        [
            
        ]
    ];

    // Populate danh sách Thuật toán vào Select dropdowns
    function initSelectDropdowns() {
        if (!selectAlgo1 || !selectAlgo2) return;
        selectAlgo1.innerHTML = '';
        selectAlgo2.innerHTML = '';

        algoPages.flat().forEach(item => {
            if (item.id) {
                const opt1 = document.createElement('option');
                opt1.value = item.id;
                opt1.textContent = item.name;
                
                const opt2 = document.createElement('option');
                opt2.value = item.id;
                opt2.textContent = item.name;

                selectAlgo1.appendChild(opt1);
                selectAlgo2.appendChild(opt2);
            }
        });

        selectAlgo1.value = 'bubble_sort';
        selectAlgo2.value = 'quick_sort';
    }

    function renderPage(container, items) {
        if (!container) return;
        container.innerHTML = '';

        items.forEach(item => {
            if (item.type === 'empty') return;

            const btn = document.createElement('button');
            btn.className = 'algo-btn';

            if (item.type === 'next') {
                btn.classList.add('nav-btn');
                btn.textContent = item.icon;
                btn.addEventListener('click', () => {
                    if (algoTrack) algoTrack.style.transform = 'translateX(-50%)';
                });
            } else if (item.type === 'prev') {
                btn.classList.add('nav-btn');
                btn.textContent = item.icon;
                btn.addEventListener('click', () => {
                    if (algoTrack) algoTrack.style.transform = 'translateX(0%)';
                });
            } else {
                if (item.id === selectedAlgo) btn.classList.add('active');

                btn.innerHTML = `${item.name}${item.isNew ? ' <span class="badge-new">new</span>' : ''}`;
                btn.addEventListener('click', () => {
                    if (visualizer.isRunning) resetUIState();
                    selectedAlgo = item.id;
                    renderAllPages();
                });
            }

            container.appendChild(btn);
        });
    }

    function renderAllPages() {
        renderPage(page0, algoPages[0]);
        renderPage(page1, algoPages[1]);
    }

    function resetUIState() {
        visualizer.stop();

        btnStart.textContent = 'Start';
        btnStart.style.backgroundColor = '#818cf8';
        btnShuffle.disabled = false;
        sizeSlider.disabled = false;
    }

    // Hàm tạo mảng và render cho các board
    function generateAndRenderArrays(size) {
        visualizer.generateArray(size);
        if (isCompareMode) {
            renderBoardBars(board1, visualizer.currentArray);
            renderBoardBars(board2, visualizer.currentArray);
        }
    }

    function renderBoardBars(targetBoard, arrayData) {
        if (!targetBoard) return;
        targetBoard.innerHTML = '';
        const size = arrayData.length;

        if (size > 500) targetBoard.style.gap = '0px';
        else if (size > 200) targetBoard.style.gap = '1px';
        else targetBoard.style.gap = '2px';

        arrayData.forEach(val => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${val}%`;
            targetBoard.appendChild(bar);
        });
    }

    // --- BẬT / TẮT COMPARE MODE ---
    btnCompare.addEventListener('click', () => {
        if (visualizer.isRunning) resetUIState();

        isCompareMode = !isCompareMode;

        if (isCompareMode) {
            btnCompare.classList.add('active-mode');
            boardSingle.classList.add('hidden');
            compareContainer.classList.remove('hidden');
            leftPanelContainer.classList.add('hidden');
            globalStats.classList.add('hidden');
            if (btnStep) btnStep.disabled = true;
        } else {
            btnCompare.classList.remove('active-mode');
            boardSingle.classList.remove('hidden');
            compareContainer.classList.add('hidden');
            leftPanelContainer.classList.remove('hidden');
            globalStats.classList.remove('hidden');
            if (btnStep) btnStep.disabled = false;
        }

        generateAndRenderArrays(sizeSlider.value);
    });

    // --- SỰ KIỆN NÚT BẤM START / PAUSE / RESUME ---
    btnStart.addEventListener('click', async () => {
        if (visualizer.isRunning) {
            if (visualizer.isPaused) {
                visualizer.resume();
                btnStart.textContent = 'Pause';
                btnStart.style.backgroundColor = '#ef4444';
            } else {
                visualizer.pause();
                btnStart.textContent = 'Resume';
                btnStart.style.backgroundColor = '#f59e0b';
            }
            return;
        }

        btnStart.textContent = 'Pause';
        btnStart.style.backgroundColor = '#ef4444';
        btnShuffle.disabled = true;
        sizeSlider.disabled = true;

        if (isCompareMode) {
            const algo1 = selectAlgo1.value;
            const algo2 = selectAlgo2.value;

            const arrayCopy1 = [...visualizer.currentArray];
            const arrayCopy2 = [...visualizer.currentArray];

            const startTime1 = performance.now();
            const steps1 = await fetchSortSteps(algo1, arrayCopy1);
            const time1 = (performance.now() - startTime1).toFixed(1);

            const startTime2 = performance.now();
            const steps2 = await fetchSortSteps(algo2, arrayCopy2);
            const time2 = (performance.now() - startTime2).toFixed(1);

            document.getElementById('time-1').textContent = `${time1} ms`;
            document.getElementById('time-2').textContent = `${time2} ms`;

            if (steps1 && steps2) {
                await Promise.all([
                    visualizer.executeStepsOnBoard ? visualizer.executeStepsOnBoard(board1, steps1) : visualizer.executeSteps(steps1),
                    visualizer.executeStepsOnBoard ? visualizer.executeStepsOnBoard(board2, steps2) : visualizer.executeSteps(steps2)
                ]);
            }
        } else {
            const steps = await fetchSortSteps(selectedAlgo, visualizer.currentArray);
            if (steps && steps.length > 0) {
                await visualizer.executeSteps(steps, false);
            }
        }

        resetUIState();
    });

    // --- SỰ KIỆN NÚT BẤM STEP (Từng bước một) ---
    if (btnStep) {
        btnStep.addEventListener('click', async () => {
            if (isCompareMode) return;

            if (!visualizer.isRunning) {
                btnStart.textContent = 'Resume';
                btnStart.style.backgroundColor = '#f59e0b';
                btnShuffle.disabled = true;
                sizeSlider.disabled = true;

                const steps = await fetchSortSteps(selectedAlgo, visualizer.currentArray);
                if (steps && steps.length > 0) {
                    visualizer.executeSteps(steps, true);
                    visualizer.stepNext();
                } else {
                    resetUIState();
                }
            } else {
                btnStart.textContent = 'Resume';
                btnStart.style.backgroundColor = '#f59e0b';
                visualizer.stepNext();
            }
        });
    }

    if (btnStop) {
        btnStop.addEventListener('click', () => {
            resetUIState();
        });
    }
    const btnSound = document.getElementById('btn-sound');
    if (btnSound) {
        btnSound.addEventListener('click', () => {
            const isSoundOn = visualizer.toggleSound();
            btnSound.textContent = isSoundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
            btnSound.style.opacity = isSoundOn ? '1' : '0.6';
        });
    }

    btnShuffle.addEventListener('click', () => {
        generateAndRenderArrays(sizeSlider ? sizeSlider.value : 200);
    });
    btnShuffle.addEventListener('click', () => {
        generateAndRenderArrays(sizeSlider ? sizeSlider.value : 200);
    });

    sizeSlider.addEventListener('input', (e) => {
        if (sizeValue) sizeValue.textContent = `${e.target.value} bars`;
        generateAndRenderArrays(e.target.value);
    });

    delaySlider.addEventListener('input', (e) => {
        if (delayValue) delayValue.textContent = `${e.target.value} ms`;
        visualizer.setDelay(parseInt(e.target.value));
    });

    // KHỞI TẠO BAN ĐẦU
    if (sizeSlider) {
        sizeSlider.max = 1000;
        sizeSlider.value = 200;
        if (sizeValue) sizeValue.textContent = `${sizeSlider.value} bars`;
    }

    if (delaySlider) {
        delaySlider.max = 300;
        delaySlider.value = 50;
        if (delayValue) delayValue.textContent = `${delaySlider.value} ms`;
    }

    initSelectDropdowns();
    renderAllPages();
    visualizer.setDelay(parseInt(delaySlider.value));
    generateAndRenderArrays(sizeSlider.value);
});