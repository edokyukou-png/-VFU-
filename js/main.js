/**
 * VFU System v1.4.0 制御スクリプト
 * 役割：電光掲示板、モーダル、そして4段階のカラーモード切り替え
 */

// 【解説】カラーモードごとの「色のレシピ」です
const VFU_THEMES = {
    'light': {
        '--main-color': '#4b2d71',
        '--container-bg': 'rgba(250, 248, 252, 0.98)',
        '--text-color': '#222',
        '--official-text-color': '#000000',
        '--card-bg': 'rgba(255, 255, 255, 0.95)',
        '--bg-style': 'linear-gradient(-45deg, #2d1933, #4b2d71, #6b4095, #3a243b)' // 紫グラデ
    },
    'dark': {
        '--main-color': '#b388ff',
        '--container-bg': 'rgba(30, 25, 40, 0.98)',
        '--text-color': '#f5f5f5',
        '--official-text-color': '#e0e0e0',
        '--card-bg': 'rgba(50, 45, 60, 0.95)',
        '--bg-style': '#1a1a1a' // 真っ黒
    },
    'car': {
        '--main-color': '#ae2631',
        '--container-bg': 'rgba(45, 15, 15, 0.98)',
        '--text-color': '#ffdada',
        '--official-text-color': '#ffbaba',
        '--card-bg': 'rgba(70, 30, 30, 0.95)',
        '--bg-style': '#2d0f0f' // 深い赤
    },
    'train': {
        '--main-color': '#0072bc',
        '--container-bg': 'rgba(15, 25, 45, 0.98)',
        '--text-color': '#e1f5fe',
        '--official-text-color': '#b3e5fc',
        '--card-bg': 'rgba(30, 40, 60, 0.95)',
        '--bg-style': '#0a1428' // 深い青
    }
};

let currentVfuMode = 'light';

/**
 * 【解説】選ばれたテーマを画面に反映させる関数
 */
function applyVfuTheme(mode) {
    const root = document.documentElement;
    const themeData = VFU_THEMES[mode];

    // CSSの変数を書き換える
    Object.keys(themeData).forEach(key => {
        if (key !== '--bg-style') {
            root.style.setProperty(key, themeData[key]);
        }
    });

    // 背景（body）の色やアニメーションを制御
    if (mode === 'light') {
        document.body.style.background = ""; // CSSのアニメーション背景に戻す
        document.body.classList.remove("dark-mode");
    } else {
        document.body.style.background = themeData['--bg-style'];
        document.body.classList.add("dark-mode");
    }

    currentVfuMode = mode;
    console.log(`v1.4.0: [${mode}] モードを適用しました`);
}

// ページが読み込まれたら開始
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. 最初は白(light)を適用
    applyVfuTheme('light');

    // 2. 電光掲示板の更新
    const el = document.getElementById("ticker-text");
    if (el) el.textContent = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！残り枠わずかです。";

    // 3. モーダルの制御
    const modal = document.getElementById("introModal");
    const btn = document.getElementById("introBtn");
    const close = document.getElementById("closeModal");

    if (btn) btn.onclick = () => modal.style.display = "block";
    if (close) close.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // 4. カラーモードの切り替え（4段階ループ処理）
    const modeBtn = document.getElementById("modeBtn");
    if (modeBtn) {
        modeBtn.onclick = () => {
            if (currentVfuMode === 'light') applyVfuTheme('dark');
            else if (currentVfuMode === 'dark') applyVfuTheme('car');
            else if (currentVfuMode === 'car') applyVfuTheme('train');
            else applyVfuTheme('light'); // 白に戻る
        };
    }
});
