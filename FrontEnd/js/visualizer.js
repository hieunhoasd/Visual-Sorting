class Visualizer {
    constructor() {
        this.board = document.getElementById('board');
        this.statCmp = document.querySelectorAll('.header-stats .stat strong')[0];
        this.statSwp = document.querySelectorAll('.header-stats .stat strong')[1];
        this.statAcc = document.querySelectorAll('.header-stats .stat strong')[2];

        this.currentArray = [];
        this.isRunning = false;
        this.isPaused = false;
        this.stepResolver = null;

        this.cmpCount = 0;
        this.swapCount = 0;
        this.accCount = 0;
        this.delayMs = 16;
    }

    setDelay(ms) {
        this.delayMs = ms;
    }

    resetStats() {
        this.cmpCount = 0;
        this.swapCount = 0;
        this.accCount = 0;
        this.updateStatsUI();
    }

    updateStatsUI() {
        if (this.statCmp) this.statCmp.textContent = this.cmpCount;
        if (this.statSwp) this.statSwp.textContent = this.swapCount;
        if (this.statAcc) this.statAcc.textContent = this.accCount;
    }

    generateArray(size) {
        this.stop();
        this.currentArray = [];
        if (!this.board) return;
        this.board.innerHTML = '';

        for (let i = 0; i < size; i++) {
            const value = Math.floor(Math.random() * 95) + 5;
            this.currentArray.push(value);

            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${value}%`;
            this.board.appendChild(bar);
        }
        this.resetStats();
    }

    getBars() {
        return this.board ? this.board.children : [];
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async handleStep() {
        if (!this.isRunning) return;
        if (this.isPaused) {
            await new Promise(resolve => { this.stepResolver = resolve; });
        } else {
            await this.sleep(this.delayMs);
        }
    }

    async compare(i, j) {
        if (!this.isRunning) return;
        this.cmpCount++;
        this.accCount += 2;
        this.updateStatsUI();

        const bars = this.getBars();
        if (bars[i]) bars[i].classList.add('comparing');
        if (bars[j]) bars[j].classList.add('comparing');

        await this.handleStep();

        if (bars[i]) bars[i].classList.remove('comparing');
        if (bars[j]) bars[j].classList.remove('comparing');
    }

    async swap(i, j) {
        if (!this.isRunning) return;
        this.swapCount++;
        this.accCount += 2;
        this.updateStatsUI();

        const bars = this.getBars();
        if (bars[i]) bars[i].classList.add('swapping');
        if (bars[j]) bars[j].classList.add('swapping');

        let temp = this.currentArray[i];
        this.currentArray[i] = this.currentArray[j];
        this.currentArray[j] = temp;

        if (bars[i]) bars[i].style.height = `${this.currentArray[i]}%`;
        if (bars[j]) bars[j].style.height = `${this.currentArray[j]}%`;

        await this.handleStep();

        if (bars[i]) bars[i].classList.remove('swapping');
        if (bars[j]) bars[j].classList.remove('swapping');
    }

    async setValue(i, value) {
        if (!this.isRunning) return;
        this.accCount++;
        this.updateStatsUI();

        this.currentArray[i] = value;
        const bars = this.getBars();
        if (bars[i]) {
            bars[i].classList.add('swapping');
            bars[i].style.height = `${value}%`;
        }

        await this.handleStep();

        if (bars[i]) bars[i].classList.remove('swapping');
    }

    async markSortedAnimation() {
        const bars = this.getBars();
        for (let i = 0; i < bars.length; i++) {
            if (!this.isRunning) break;
            bars[i].className = 'bar sorted';
            await this.sleep(Math.max(5, Math.floor(200 / bars.length)));
        }
    }

    clearBarStyles() {
        const bars = this.getBars();
        for (let i = 0; i < bars.length; i++) {
            bars[i].className = 'bar';
        }
    }

    // --- HÀM PHÁT LẠI DANH SÁCH BƯỚC TỪ BACKEND ---
    async executeSteps(steps) {
    this.isRunning = true;
    this.isPaused = false;
    this.clearBarStyles();
    this.resetStats();

    for (const step of steps) {
        if (!this.isRunning) break;

        switch (step.type) {
            case 'compare':
                if (step.indices && step.indices.length >= 2) {
                    await this.compare(step.indices[0], step.indices[1]);
                }
                break;

            case 'swap':
                if (step.indices && step.indices.length >= 2) {
                    await this.swap(step.indices[0], step.indices[1]);
                }
                break;

            case 'overwrite':
                if (step.index !== null && step.index !== undefined && step.value !== undefined) {
                    await this.setValue(step.index, step.value);
                }
                break;

            case 'pivot':
                if (step.index !== null && step.index !== undefined) {
                    const bars = this.getBars();
                    if (bars[step.index]) bars[step.index].classList.add('comparing');
                    await this.handleStep();
                    if (bars[step.index]) bars[step.index].classList.remove('comparing');
                }
                break;

            case 'sorted':
                if (step.index !== null && step.index !== undefined) {
                    const bars = this.getBars();
                    if (bars[step.index]) bars[step.index].classList.add('sorted');
                }
                break;
        }
    }

    if (this.isRunning) {
        await this.markSortedAnimation();
    }
    this.stop();
}
    stop() {
        this.isRunning = false;
        this.isPaused = false;
        if (this.stepResolver) {
            this.stepResolver();
            this.stepResolver = null;
        }
    }
}

window.visualizer = new Visualizer();