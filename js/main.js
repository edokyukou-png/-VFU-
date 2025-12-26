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
