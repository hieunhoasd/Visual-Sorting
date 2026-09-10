// --- BỘ QUẢN LÝ ÂM THANH (WEB AUDIO API) ---
class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playNote(val, maxVal = 100, delayMs = 16) {
        if (!this.enabled) return;
        this.init();

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const freq = 150 + (val / maxVal) * 850;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const duration = Math.min(Math.max(delayMs / 1000, 0.01), 0.05);
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
}

// --- LỚP VISUALIZER ---
class Visualizer {
    constructor() {
        this.board = document.getElementById('board');
        this.statCmp = document.querySelectorAll('.header-stats .stat strong')[0];
        this.statSwp = document.querySelectorAll('.header-stats .stat strong')[1];
        this.statAcc = document.querySelectorAll('.header-stats .stat strong')[2];

        this.currentArray = [];
        this.isRunning = false;
        this.isPaused = false;
        this.stepRequested = false; // Hàng chờ xử lý nút Step
        this.stepResolver = null;

        this.cmpCount = 0;
        this.swapCount = 0;
        this.accCount = 0;
        this.delayMs = 16;

        this.sound = new SoundManager();
    }

    setDelay(ms) {
        this.delayMs = ms;
    }
    toggleSound() {
        this.sound.enabled = !this.sound.enabled;
        return this.sound.enabled;
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

    adjustBoardGap(boardElement, size) {
        if (!boardElement) return;
        if (size > 500) boardElement.style.gap = '0px';
        else if (size > 200) boardElement.style.gap = '1px';
        else boardElement.style.gap = '2px';
    }

    generateArray(size) {
        this.stop();
        this.currentArray = [];
        if (!this.board) return;
        this.board.innerHTML = '';

        this.adjustBoardGap(this.board, size);

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

    getBars(board = this.board) {
        return board ? board.children : [];
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // --- ĐIỀU KHIỂN PAUSE / RESUME / STEP ---
    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
        if (this.stepResolver) {
            const resolve = this.stepResolver;
            this.stepResolver = null;
            resolve();
        }
    }

    stepNext() {
        if (!this.isRunning) return;
        this.isPaused = true;
        if (this.stepResolver) {
            const resolve = this.stepResolver;
            this.stepResolver = null;
            resolve();
        } else {
            this.stepRequested = true;
        }
    }

    async handleStep() {
        if (!this.isRunning) return;

        if (this.isPaused) {
            if (this.stepRequested) {
                this.stepRequested = false;
                return;
            }
            await new Promise(resolve => { this.stepResolver = resolve; });
        } else {
            await this.sleep(this.delayMs);
        }
    }

    // --- CÁC PHÉP TOÁN XỬ LÝ MẢNG ---
    async compare(i, j, board = this.board, arr = this.currentArray, stats = null) {
        if (!this.isRunning) return;

        if (stats) {
            stats.cmp++;
            stats.acc += 2;
            if (stats.cmpEl) stats.cmpEl.textContent = stats.cmp;
        } else {
            this.cmpCount++;
            this.accCount += 2;
            this.updateStatsUI();
        }

        const bars = this.getBars(board);
        if (bars[i]) bars[i].classList.add('comparing');
        if (bars[j]) bars[j].classList.add('comparing');

        if (arr && arr[i] !== undefined) {
            this.sound.playNote(arr[i], 100, this.delayMs);
        }

        await this.handleStep();

        if (bars[i]) bars[i].classList.remove('comparing');
        if (bars[j]) bars[j].classList.remove('comparing');
    }

    async swap(i, j, board = this.board, arr = this.currentArray, stats = null) {
        if (!this.isRunning) return;

        if (stats) {
            stats.swp++;
            stats.acc += 2;
            if (stats.swpEl) stats.swpEl.textContent = stats.swp;
        } else {
            this.swapCount++;
            this.accCount += 2;
            this.updateStatsUI();
        }

        const bars = this.getBars(board);
        if (bars[i]) bars[i].classList.add('swapping');
        if (bars[j]) bars[j].classList.add('swapping');

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        if (bars[i]) bars[i].style.height = `${arr[i]}%`;
        if (bars[j]) bars[j].style.height = `${arr[j]}%`;

        if (arr && arr[i] !== undefined) {
            this.sound.playNote(arr[i], 100, this.delayMs);
        }

        await this.handleStep();

        if (bars[i]) bars[i].classList.remove('swapping');
        if (bars[j]) bars[j].classList.remove('swapping');
    }

    async setValue(i, value, board = this.board, arr = this.currentArray, stats = null) {
        if (!this.isRunning) return;

        if (stats) {
            stats.acc++;
        } else {
            this.accCount++;
            this.updateStatsUI();
        }

        arr[i] = value;
        const bars = this.getBars(board);
        if (bars[i]) {
            bars[i].classList.add('swapping');
            bars[i].style.height = `${value}%`;
        }

        this.sound.playNote(value, 100, this.delayMs);

        await this.handleStep();

        if (bars[i]) bars[i].classList.remove('swapping');
    }

    async markSortedAnimation(board = this.board) {
        const bars = this.getBars(board);
        const total = bars.length;
        
        for (let i = 0; i < total; i++) {
            if (!this.isRunning) break;
            bars[i].className = 'bar sorted';

            // Lấy chiều cao của thanh hiện tại để phát nốt tăng dần
            const heightVal = parseFloat(bars[i].style.height) || ((i + 1) / total * 100);
            this.sound.playNote(heightVal, 100, Math.max(10, Math.floor(200 / total)));

            await this.sleep(Math.max(2, Math.floor(150 / total)));
        }
    }

    clearBarStyles(board = this.board) {
        const bars = this.getBars(board);
        for (let i = 0; i < bars.length; i++) {
            bars[i].className = 'bar';
        }
    }

    async executeSteps(steps, startPaused = false) {
        this.isRunning = true;
        this.isPaused = startPaused;
        this.stepRequested = false;
        this.clearBarStyles(this.board);
        this.resetStats();

        await this.runStepLoop(steps, this.board, this.currentArray, null);

        if (this.isRunning) {
            await this.markSortedAnimation(this.board);
        }
        this.stop();
    }

    async executeStepsOnBoard(boardElement, steps) {
        this.isRunning = true;
        this.isPaused = false;
        this.stepRequested = false;
        this.clearBarStyles(boardElement);

        const arrCopy = [...this.currentArray];
        const isBoard1 = boardElement.id === 'board-1';

        const stats = {
            cmp: 0,
            swp: 0,
            acc: 0,
            cmpEl: document.getElementById(isBoard1 ? 'cmp-1' : 'cmp-2'),
            swpEl: document.getElementById(isBoard1 ? 'swp-1' : 'swp-2')
        };

        if (stats.cmpEl) stats.cmpEl.textContent = '0';
        if (stats.swpEl) stats.swpEl.textContent = '0';

        await this.runStepLoop(steps, boardElement, arrCopy, stats);

        if (this.isRunning) {
            await this.markSortedAnimation(boardElement);
        }
    }

    async runStepLoop(steps, board, array, stats) {
        for (const step of steps) {
            if (!this.isRunning) break;

            switch (step.type) {
                case 'compare':
                    if (step.indices && step.indices.length >= 2) {
                        await this.compare(step.indices[0], step.indices[1], board, array, stats);
                    }
                    break;

                case 'swap':
                    if (step.indices && step.indices.length >= 2) {
                        await this.swap(step.indices[0], step.indices[1], board, array, stats);
                    }
                    break;

                case 'overwrite':
                    if (step.index !== null && step.index !== undefined && step.value !== undefined) {
                        await this.setValue(step.index, step.value, board, array, stats);
                    }
                    break;

                case 'pivot':
                    if (step.index !== null && step.index !== undefined) {
                        const bars = this.getBars(board);
                        if (bars[step.index]) bars[step.index].classList.add('comparing');
                        
                        // Phát nốt tại vị trí pivot
                        const pivotVal = step.value || array[step.index];
                        if (pivotVal !== undefined) {
                            this.sound.playNote(pivotVal, 100, this.delayMs);
                        }

                        await this.handleStep();
                        if (bars[step.index]) bars[step.index].classList.remove('comparing');
                    }
                    break;

                case 'sorted':
                    if (step.index !== null && step.index !== undefined) {
                        const bars = this.getBars(board);
                        if (bars[step.index]) bars[step.index].classList.add('sorted');
                    }
                    break;
            }
        }
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        this.stepRequested = false;
        if (this.stepResolver) {
            this.stepResolver();
            this.stepResolver = null;
        }
    }
}

window.visualizer = new Visualizer();