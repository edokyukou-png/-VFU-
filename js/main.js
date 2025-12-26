/**
 * VFU System v1.4.0 拡張機能
 * すでにあるCSS変数をJSで上書きしてテーマを変える
 */

// 1. 各モードで「どのバケツの色を何に変えるか」の設計図
const VFU_THEMES = {
    // 標準（今はダークモードの内容をセット）
    'dark': {
        '--main-color': '#b388ff',
        '--container-bg': 'rgba(30, 25, 40, 0.98)',
        '--text-color': '#f5f5f5',
        '--official-text-color': '#e0e0e0',
        '--card-bg': 'rgba(50, 45, 60, 0.95)'
    },
    // 車部モード（赤ベース）
    'car': {
        '--main-color': '#ae2631',
        '--container-bg': 'rgba(45, 15, 15, 0.98)',
        '--text-color': '#ffdada',
        '--official-text-color': '#ffbaba',
        '--card-bg': 'rgba(70, 30, 30, 0.95)'
    },
    // 鉄道部モード（青ベース）
    'train': {
        '--main-color': '#0072bc',
        '--container-bg': 'rgba(15, 25, 45, 0.98)',
        '--text-color': '#e1f5fe',
        '--official-text-color': '#b3e5fc',
        '--card-bg': 'rgba(30, 40, 60, 0.95)'
    }
};

let currentVfuMode = 'dark';

/**
 * テーマを適用する関数
 * CSSの :root にあるバケツの中身を、一気に詰め替えます
 */
function applyVfuTheme(mode) {
    const root = document.documentElement; // HTMLの根っこを取得
    const themeData = VFU_THEMES[mode];    // 指定されたモードの色データを取得

    // 設計図にある全ての変数（キー）をループして、CSSにセットしていく
    Object.keys(themeData).forEach(variableName => {
        // 例: --main-color を #ae2631 に書き換える
        root.style.setProperty(variableName, themeData[variableName]);
    });

    currentVfuMode = mode;
    console.log(`v1.4.0: [${mode}] モードを適用しました。`);
}

// ボタン（id="modeBtn"）がクリックされた時の動き
const modeBtn = document.getElementById('modeBtn');
if (modeBtn) {
    modeBtn.addEventListener('click', () => {
        if (currentVfuMode === 'dark') {
            applyVfuTheme('car');
        } else if (currentVfuMode === 'car') {
            applyVfuTheme('train');
        } else {
            applyVfuTheme('dark');
        }
    });
}
// 1. 電光掲示板の更新
const TICKER_TEXT = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！残り枠わずかです。";

document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("ticker-text");
    if (el) el.textContent = TICKER_TEXT;

    // 2. モーダル
    const modal = document.getElementById("introModal");
    const btn = document.getElementById("introBtn");
    const close = document.getElementById("closeModal");

    if (btn) btn.onclick = () => modal.style.display = "block";
    if (close) close.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // 3. ダークモード
    const mode = document.getElementById("modeBtn");
    if (mode) mode.onclick = () => document.body.classList.toggle("dark-mode");
});
