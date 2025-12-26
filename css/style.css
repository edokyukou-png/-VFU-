/**
 * 【設定エリア】電光掲示板の内容をここに変更してください
 */
const TICKER_TEXT_CONTENT = "ゲーム「Car Parking Multiplayer」クランメンバー募集中！残り枠わずかです。";


/**
 * 【プログラム本体】ここから下はいじらなくてOKです
 */

// ページが読み込まれたら実行する
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. 電光掲示板のテキストを反映
    const tickerElement = document.getElementById("ticker-text");
    if (tickerElement) {
        tickerElement.textContent = TICKER_TEXT_CONTENT;
    }

    // 2. 代表紹介モーダルの制御
    const modal = document.getElementById("introModal");
    const introBtn = document.getElementById("introBtn");
    const closeModal = document.getElementById("closeModal");

    if (introBtn && modal && closeModal) {
        introBtn.onclick = () => {
            modal.style.display = "block";
        };
        closeModal.onclick = () => {
            modal.style.display = "none";
        };
        // モーダルの外側をクリックしたら閉じる
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    // 3. カラーモード切り替え（ダークモード）
    const modeBtn = document.getElementById("modeBtn");
    if (modeBtn) {
        modeBtn.onclick = () => {
            document.body.classList.toggle("dark-mode");
        };
    }
});
