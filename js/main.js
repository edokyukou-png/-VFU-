const VFU_THEMES = {
    'light': {
        '--main-color': '#4b2d71',
        '--container-bg': 'rgba(250, 248, 252, 0.98)', // 白
        '--text-color': '#222',
        '--official-text-color': '#000000',
        '--card-bg': 'rgba(255, 255, 255, 0.95)'
    },
    'dark': {
        '--main-color': '#b388ff',
        '--container-bg': 'rgba(30, 25, 40, 0.98)', // 紫黒
        '--text-color': '#f5f5f5',
        '--official-text-color': '#e0e0e0',
        '--card-bg': 'rgba(50, 45, 60, 0.95)'
    },
    'car': {
        '--main-color': '#ae2631',
        '--container-bg': 'rgba(45, 15, 15, 0.98)', // 赤
        '--text-color': '#ffdada',
        '--official-text-color': '#ffbaba',
        '--card-bg': 'rgba(70, 30, 30, 0.95)'
    },
    'train': {
        '--main-color': '#0072bc',
        '--container-bg': 'rgba(15, 25, 45, 0.98)', // 青
        '--text-color': '#e1f5fe',
        '--official-text-color': '#b3e5fc',
        '--card-bg': 'rgba(30, 40, 60, 0.95)'
    }
};

let currentVfuMode = 'light';

function applyVfuTheme(mode) {
    const root = document.documentElement;
    const themeData = VFU_THEMES[mode];

    // 全ての変数を書き換え
    Object.keys(themeData).forEach(key => {
        root.style.setProperty(key, themeData[key]);
    });

    // 白(light)に戻る時は、bodyの背景も強制的に上書き
    if (mode === 'light') {
        document.body.style.background = themeData['--container-bg'];
        document.body.classList.remove("dark-mode");
    } else {
        document.body.style.background = "none"; // アニメーション等を有効にする場合
        document.body.classList.add("dark-mode");
    }

    currentVfuMode = mode;
}

document.addEventListener("DOMContentLoaded", () => {
    applyVfuTheme('light'); // 初期化

    const modeBtn = document.getElementById("modeBtn");
    if (modeBtn) {
        modeBtn.onclick = () => {
            if (currentVfuMode === 'light') applyVfuTheme('dark');
            else if (currentVfuMode === 'dark') applyVfuTheme('car');
            else if (currentVfuMode === 'car') applyVfuTheme('train');
            else applyVfuTheme('light'); // ここで白へ
        };
    }

    // 掲示板やモーダルの既存処理
    const el = document.getElementById("ticker-text");
    if (el) el.textContent = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！残り枠わずかです。";
    const modal = document.getElementById("introModal");
    const introBtn = document.getElementById("introBtn");
    if (introBtn) introBtn.onclick = () => modal.style.display = "block";
});
