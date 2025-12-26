/**
 * VFU System v1.4.0 制御スクリプト
 * 役割：色の変更、電光掲示板、モーダルの管理
 */

// 【解説】それぞれのモードで「どの色に塗り替えるか」のリスト（レシピ）です
const VFU_THEMES = {
    'light': {
        '--main-color': '#4b2d71',
        '--container-bg': 'rgba(250, 248, 252, 0.98)', 
        '--text-color': '#222',
        '--card-bg': 'rgba(255, 255, 255, 0.95)'
    },
    'dark': {
        '--main-color': '#b388ff',
        '--container-bg': 'rgba(30, 25, 40, 0.98)',
        '--text-color': '#f5f5f5',
        '--card-bg': 'rgba(50, 45, 60, 0.95)'
    },
    'car': {
        '--main-color': '#ae2631',
        '--container-bg': 'rgba(45, 15, 15, 0.98)',
        '--text-color': '#ffdada',
        '--card-bg': 'rgba(70, 30, 30, 0.95)'
    },
    'train': {
        '--main-color': '#0072bc',
        '--container-bg': 'rgba(15, 25, 45, 0.98)',
        '--text-color': '#e1f5fe',
        '--card-bg': 'rgba(30, 40, 60, 0.95)'
    }
};

let currentMode = 'light';

/**
 * 【解説】実際に色を塗り替える関数です
 */
function applyTheme(mode) {
    const root = document.documentElement;
    const colors = VFU_THEMES[mode];

    // CSSの変数を1つずつ上書きします
    Object.keys(colors).forEach(key => {
        root.style.setProperty(key, colors[key]);
    });

    // 白に戻る際に、以前付いていた「ダーク用クラス」を消して確実にリセットします
    if (mode === 'light') {
        document.body.classList.remove("dark-mode");
    } else {
        document.body.classList.add("dark-mode");
    }
    currentMode = mode;
}

// 【解説】ページが読み込まれたら実行する命令
document.addEventListener("DOMContentLoaded", () => {
    // 1. 最初は白モードに設定
    applyTheme('light');

    // 2. 電光掲示板のテキスト
    const ticker = document.getElementById("ticker-text");
    if (ticker) ticker.textContent = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！";

    // 3. モーダル（代表紹介）の制御
    const modal = document.getElementById("introModal");
    const openBtn = document.getElementById("introBtn");
    const closeBtn = document.getElementById("closeModal");
    if (openBtn) openBtn.onclick = () => modal.style.display = "block";
    if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // 4. カラーモードの切り替え（4段階ループ）
    const modeBtn = document.getElementById("modeBtn");
    if (modeBtn) {
        modeBtn.onclick = () => {
            if (currentMode === 'light') applyTheme('dark');
            else if (currentMode === 'dark') applyTheme('car');
            else if (currentMode === 'car') applyTheme('train');
            else applyTheme('light'); // ここで白(light)に戻ります
        };
    }
});
