/**
 * VFU System v1.4.0 拡張機能
 * デフォルト：白（light）から始まるループ
 */

// 1. 各モードの色レシピ（バケツの中身）
const VFU_THEMES = {
    'light': {
        '--main-color': '#4b2d71',          // 元々の紫
        '--container-bg': 'rgba(250, 248, 252, 0.98)', // 白背景
        '--text-color': '#222',             // 黒文字
        '--card-bg': 'rgba(255, 255, 255, 0.95)'
    },
    'dark': {
        '--main-color': '#b388ff',          // 明るい紫
        '--container-bg': 'rgba(30, 25, 40, 0.98)',   // 濃い紫背景
        '--text-color': '#f5f5f5',          // 白文字
        '--card-bg': 'rgba(50, 45, 60, 0.95)'
    },
    'car': {
        '--main-color': '#ae2631',          // 車部の赤
        '--container-bg': 'rgba(45, 15, 15, 0.98)',   // 赤黒背景
        '--text-color': '#ffdada',          // 薄い赤文字
        '--card-bg': 'rgba(70, 30, 30, 0.95)'
    },
    'train': {
        '--main-color': '#0072bc',          // 鉄道部の青
        '--container-bg': 'rgba(15, 25, 45, 0.98)',   // 青黒背景
        '--text-color': '#e1f5fe',          // 薄い青文字
        '--card-bg': 'rgba(30, 40, 60, 0.95)'
    }
};

let currentMode = 'light';

// 2. テーマを適用する関数
function applyTheme(mode) {
    const root = document.documentElement;
    const colors = VFU_THEMES[mode];

    // CSS変数を上書き
    Object.keys(colors).forEach(key => {
        root.style.setProperty(key, colors[key]);
    });

    // 【重要】白に戻るためにCSSのクラス干渉を防ぐ
    if (mode === 'light') {
        document.body.classList.remove("dark-mode");
    } else {
        document.body.classList.add("dark-mode");
    }

    currentMode = mode;
}

// 3. ページ読み込み時の処理
document.addEventListener("DOMContentLoaded", () => {
    
    // 初期状態を白に設定
    applyTheme('light');

    // 電光掲示板
    const ticker = document.getElementById("ticker-text");
    if (ticker) ticker.textContent = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！";

    // モーダル
    const modal = document.getElementById("introModal");
    const openBtn = document.getElementById("introBtn");
    const closeBtn = document.getElementById("closeModal");
    if (openBtn) openBtn.onclick = () => modal.style.display = "block";
    if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // 【説明】カラーモードの切り替えボタンの動作
    const modeBtn = document.getElementById("modeBtn");
    if (modeBtn) {
        modeBtn.onclick = () => {
            if (currentMode === 'light') applyTheme('dark');
            else if (currentMode === 'dark') applyTheme('car');
            else if (currentMode === 'car') applyTheme('train');
            else applyTheme('light'); // 白に戻る
        };
    }
});
