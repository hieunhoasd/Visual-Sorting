document.addEventListener('DOMContentLoaded', () => {
    const visualizer = window.visualizer;

    const algoTrack = document.getElementById('algo-track');
    const page0 = document.getElementById('page-0');
    const page1 = document.getElementById('page-1');
    const sizeSlider = document.getElementById('size-slider');
    const sizeValue = document.getElementById('size-value');
    const delaySlider = document.getElementById('delay-slider');
    const delayValue = document.getElementById('delay-value');

    const btnStart = document.getElementById('btn-start');
    const btnStep = document.getElementById('btn-step');
    const btnShuffle = document.getElementById('btn-shuffle');

    let selectedAlgo = 'bubble_sort';

    const algoPages = [
        [
            { id: 'bubble_sort', name: 'Bubble Sort' },
            { id: 'insertion_sort', name: 'Insertion Sort' },
            { id: 'selection_sort', name: 'Selection Sort' },
            { id: 'quick_sort', name: 'Quick Sort' },
            { id: 'merge_sort', name: 'Merge Sort' },
            { id: 'heap_sort', name: 'Heap Sort' },
            { id: 'cocktail_sort', name: 'Cocktail Sort' },
            { id: 'shell_sort', name: 'Shell Sort' },
            { id: 'gnome_sort', name: 'Gnome Sort' },
            { id: 'odd_even_sort', name: 'Odd Even Sort' },
            { id: 'comb_sort', name: 'Comb Sort', isNew: true },
            { id: 'bogo_sort', name: 'Bogo Sort' },
            { type: 'empty' }, { type: 'empty' }, { type: 'empty' },
            { type: 'next', icon: '→' }
        ],
        [
            { id: 'cycle_sort', name: 'Cycle Sort' },
            { id: 'pancake_sort', name: 'Pancake Sort' },
            { id: 'stooge_sort', name: 'Stooge Sort' },
            { id: 'counting_sort', name: 'Counting Sort', isNew: true },
            { id: 'radix_lsd_sort', name: 'Radix LSD Sort' },
            { id: 'tim_sort', name: 'Tim Sort' },
            { id: 'intro_sort', name: 'Intro Sort', isNew: true },
            { type: 'prev', icon: '←' }
        ]
    ];

    function renderPage(container, items) {
        if (!container) return;
        container.innerHTML = '';

        items.forEach(item => {
            if (item.type === 'empty') {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'empty-slot';
                container.appendChild(emptyDiv);
                return;
            }

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

    // --- SỰ KIỆN NÚT BẤM ---
    btnStart.addEventListener('click', async () => {
        if (visualizer.isRunning) {
            // Xử lý tạm dừng / tiếp tục
            visualizer.isPaused = !visualizer.isPaused;
            btnStart.textContent = visualizer.isPaused ? 'Resume' : 'Pause';
            btnStart.style.backgroundColor = visualizer.isPaused ? '#f59e0b' : '#ef4444';

            if (!visualizer.isPaused && visualizer.stepResolver) {
                visualizer.stepResolver();
                visualizer.stepResolver = null;
            }
            return;
        }

        btnStart.textContent = 'Pause';
        btnStart.style.backgroundColor = '#ef4444';
        btnShuffle.disabled = true;
        sizeSlider.disabled = true;

        // 1. Lấy danh sách bước từ BackEnd
        const steps = await fetchSortSteps(selectedAlgo, visualizer.currentArray);

        // 2. Chạy animation
        if (steps && steps.length > 0) {
            await visualizer.executeSteps(steps);
        }

        resetUIState();
    });

    btnStep.addEventListener('click', () => {
        if (!visualizer.isRunning) {
            btnStart.click();
            visualizer.isPaused = true;
            btnStart.textContent = 'Resume';
            btnStart.style.backgroundColor = '#f59e0b';
        } else if (visualizer.isPaused) {
            if (visualizer.stepResolver) {
                visualizer.stepResolver();
                visualizer.stepResolver = null;
            }
        } else {
            visualizer.isPaused = true;
            btnStart.textContent = 'Resume';
            btnStart.style.backgroundColor = '#f59e0b';
        }
    });

    btnShuffle.addEventListener('click', () => {
        visualizer.generateArray(sizeSlider ? sizeSlider.value : 75);
    });

    sizeSlider.addEventListener('input', (e) => {
        if (sizeValue) sizeValue.textContent = `${e.target.value} bars`;
        visualizer.generateArray(e.target.value);
    });

    delaySlider.addEventListener('input', (e) => {
        if (delayValue) delayValue.textContent = `${e.target.value} ms`;
        visualizer.setDelay(parseInt(e.target.value));
    });

    // KHỞI TẠO
    renderAllPages();
    visualizer.setDelay(parseInt(delaySlider.value));
    visualizer.generateArray(sizeSlider.value);
});