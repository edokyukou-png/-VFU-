/**
 * VFU System v1.4.0 安定版
 */

// 1. 各モードの色のレシピ（lightを追加しました）
const VFU_THEMES = {
    'light': {
        '--main-color': '#4b2d71',
        '--container-bg': 'rgba(250, 248, 252, 0.98)',
        '--text-color': '#222',
        '--official-text-color': '#000000',
        '--card-bg': 'rgba(255, 255, 255, 0.95)'
    },
    'dark': {
        '--main-color': '#b388ff',
        '--container-bg': 'rgba(30, 25, 40, 0.98)',
        '--text-color': '#f5f5f5',
        '--official-text-color': '#e0e0e0',
        '--card-bg': 'rgba(50, 45, 60, 0.95)'
    },
    'car': {
        '--main-color': '#ae2631',
        '--container-bg': 'rgba(45, 15, 15, 0.98)',
        '--text-color': '#ffdada',
        '--official-text-color': '#ffbaba',
        '--card-bg': 'rgba(70, 30, 30, 0.95)'
    },
    'train': {
        '--main-color': '#0072bc',
        '--container-bg': 'rgba(15, 25, 45, 0.98)',
        '--text-color': '#e1f5fe',
        '--official-text-color': '#b3e5fc',
        '--card-bg': 'rgba(30, 40, 60, 0.95)'
    }
};

let currentVfuMode = 'light';

// テーマを切り替える関数
function applyVfuTheme(mode) {
    const root = document.documentElement;
    const themeData = VFU_THEMES[mode];
    if (!themeData) return;

    Object.keys(themeData).forEach(key => {
        root.style.setProperty(key, themeData[key]);
    });

    currentVfuMode = mode;
    console.log(`v1.4.0: [${mode}] モード適用`);
}

// ページ読み込み後の処理を一つにまとめます
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. 電光掲示板
    const TICKER_TEXT = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！残り枠わずかです。";
    const el = document.getElementById("ticker-text");
    if (el) el.textContent = TICKER_TEXT;

    // 2. モーダル
    const modal = document.getElementById("introModal");
    const btn = document.getElementById("introBtn");
    const close = document.getElementById("closeModal");
    if (btn) btn.onclick = () => modal.style.display = "block";
    if (close) close.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // 3. カラーモード切り替え（ここをスッキリ整理しました）
    const modeBtn = document.getElementById("modeBtn");
    if (modeBtn) {
        modeBtn.onclick = () => {
            if (currentVfuMode === 'light') applyVfuTheme('dark');
            else if (currentVfuMode === 'dark') applyVfuTheme('car');
            else if (currentVfuMode === 'car') applyVfuTheme('train');
            else applyVfuTheme('light'); // ここで白に戻る
        };
    }
});
