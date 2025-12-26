const VFU_THEMES = {
    'light': {
        '--main-color': '#4b2d71',
        '--container-bg': 'rgba(250, 248, 252, 0.98)', 
        '--text-color': '#222'
    },
    'dark': {
        '--main-color': '#b388ff',
        '--container-bg': 'rgba(30, 25, 40, 0.98)',
        '--text-color': '#f5f5f5'
    },
    'car': {
        '--main-color': '#ae2631',
        '--container-bg': 'rgba(45, 15, 15, 0.98)',
        '--text-color': '#ffdada'
    },
    'train': {
        '--main-color': '#0072bc',
        '--container-bg': 'rgba(15, 25, 45, 0.98)',
        '--text-color': '#e1f5fe'
    }
};

let currentMode = 'light';

function applyTheme(mode) {
    const root = document.documentElement;
    const colors = VFU_THEMES[mode];

    Object.keys(colors).forEach(key => {
        root.style.setProperty(key, colors[key]);
    });

    // 白に戻る際に body のクラスを剥がして強制リセット
    if (mode === 'light') {
        document.body.classList.remove("dark-mode");
    } else {
        document.body.classList.add("dark-mode");
    }
    currentMode = mode;
}

document.addEventListener("DOMContentLoaded", () => {
    applyTheme('light');
    
    const ticker = document.getElementById("ticker-text");
    if (ticker) ticker.textContent = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！";

    const modal = document.getElementById("introModal");
    const openBtn = document.getElementById("introBtn");
    const closeBtn = document.getElementById("closeModal");
    if (openBtn) openBtn.onclick = () => modal.style.display = "block";
    if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";

    const modeBtn = document.getElementById("modeBtn");
    if (modeBtn) {
        modeBtn.onclick = () => {
            if (currentMode === 'light') applyTheme('dark');
            else if (currentMode === 'dark') applyTheme('car');
            else if (currentMode === 'car') applyTheme('train');
            else applyTheme('light'); // ここで白へ
        };
    }
});
