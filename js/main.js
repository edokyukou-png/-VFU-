/**
 * VFU System v1.4.0 安定版
 * カラーモード：白 → 紫 → 赤 → 青 → 白 のループ
 */

// 1. 各モードごとのカラーレシピ（設計図）
const VFU_THEMES = {
    'light': {
        '--main-color': '#4b2d71',
        '--container-bg': 'rgba(250, 248, 252, 0.98)', // 白ベース
        '--text-color': '#222',
        '--card-bg': 'rgba(255, 255, 255, 0.95)'
    },
    'dark': {
        '--main-color': '#b388ff',
        '--container-bg': 'rgba(30, 25, 40, 0.98)',   // 濃い紫（ダーク）
        '--text-color': '#f5f5f5',
        '--card-bg': 'rgba(50, 45, 60, 0.95)'
    },
    'car': {
        '--main-color': '#ae2631',
        '--container-bg': 'rgba(45, 15, 15, 0.98)',   // 車部（赤）
        '--text-color': '#ffdada',
        '--card-bg': 'rgba(70, 30, 30, 0.95)'
    },
    'train': {
        '--main-color': '#0072bc',
        '--container-bg': 'rgba(15, 25, 45, 0.98)',   // 鉄道部（青）
        '--text-color': '#e1f5fe',
        '--card-bg': 'rgba(30, 40, 60, 0.95)'
    }
};

let currentMode = 'light';

// 2. テーマを画面に適用する関数
function applyTheme(mode) {
    const root = document.documentElement; // HTMLの最上位を選択
    const colors = VFU_THEMES[mode];       // モードに対応する色データを取得

    // バケツ（CSS変数）の中身を順番に入れ替える
    Object.keys(colors).forEach(key => {
        root.style.setProperty(key, colors[key]);
    });

    // 【重要】CSSクラスの干渉を防ぎ、白(light)に戻るのを助ける
    if (mode === 'light') {
        document.body.classList.remove("dark-mode");
    } else {
        document.body.classList.add("dark-mode");
    }

    currentMode = mode;
    console.log(`v1.4.0: [${mode}] モードを適用しました。`);
}

// 3. ページが準備できたら実行
document.addEventListener("DOMContentLoaded", () => {
    
    // 【はじめに】初期状態をライトモードに設定
    applyTheme('light');

    // 電光掲示板のテキスト設定
    const ticker = document.getElementById("ticker-text");
    if (ticker) ticker.textContent = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！";

    // モーダル（代表紹介）の制御
    const modal = document.getElementById("introModal");
    const openBtn = document.getElementById("introBtn");
    const closeBtn = document.getElementById("closeModal");
    if (openBtn) openBtn.onclick = () => modal.style.display = "block";
    if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    
    // モーダル外クリックで閉じる
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // 【重要】Color Modeボタンのクリック動作を定義（4段階ループ）
    const modeBtn = document.getElementById("modeBtn");
    if (modeBtn) {
        modeBtn.onclick = () => {
            if (currentMode === 'light') applyTheme('dark');
            else if (currentMode === 'dark') applyTheme('car');
            else if (currentMode === 'car') applyTheme('train');
            else applyTheme('light'); // 白(light)へ戻る
        };
    }
});
