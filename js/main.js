/**
 * VFU System v1.4.0 制御プログラム
 * このファイルは、ボタンの動作や色の切り替えをすべて管理します。
 */

// 【解説】カラーモードごとの「色の組み合わせ」レシピです
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

let currentVfuMode = 'light';

/**
 * 【解説】テーマを適用するメインの関数です
 */
function applyVfuTheme(mode) {
    const root = document.documentElement;
    const themeData = VFU_THEMES[mode];
    if (!themeData) return;

    // 1. 各変数をCSSに流し込む
    Object.keys(themeData).forEach(key => {
        root.style.setProperty(key, themeData[key]);
    });

    // 2. 【重要】白に戻る際、過去のクラスを削除してリセットする
    if (mode === 'light') {
        document.body.classList.remove("dark-mode");
    } else {
        document.body.classList.add("dark-mode");
    }

    currentVfuMode = mode;
    console.log(`v1.4.0: [${mode}] モード適用`);
}

// 【解説】画面の読み込みが終わったら実行する命令
document.addEventListener("DOMContentLoaded", () => {
    
    // 最初は白(light)モードに設定
    applyVfuTheme('light');

    // 1. 電光掲示板のテキスト設定
    const ticker = document.getElementById("ticker-text");
    if (ticker) ticker.textContent = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！残り枠わずかです。";

    // 2. モーダル（代表紹介）の制御
    const modal = document.getElementById("introModal");
    const introBtn = document.getElementById("introBtn");
    const closeBtn = document.getElementById("closeModal");

    if (introBtn) introBtn.onclick = () => modal.style.display = "block";
    if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    // 画面のどこかをクリックしたら閉じる設定
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // 3. 【重要】カラーモードボタンの切り替え（4段階ループ）
    const modeBtn = document.getElementById("modeBtn");
    if (modeBtn) {
        modeBtn.onclick = () => {
            if (currentVfuMode === 'light') applyVfuTheme('dark');
            else if (currentVfuMode === 'dark') applyVfuTheme('car');
            else if (currentVfuMode === 'car') applyVfuTheme('train');
            else applyVfuTheme('light'); // 最後に白に戻る
        };
    }
});
