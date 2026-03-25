// 1. 日付を表示する機能
function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
    // iPhoneのChromeでも綺麗に見える形式に変換
    document.getElementById('date-display').textContent = now.toLocaleDateString('ja-JP', options);
}

// 2. ブックマークのデータ（ここを編集するだけでリンクを増やせます！）
const bookmarks = [
    { name: "花粉", url: "https://weathernews.jp/pollen/tokyo/13109/" },
    { name: "マネフォ", url: "https://moneyforward.com/" },
    { name: "民間医局", url: "https://www.doctor-agent.com/" },
    { name: "はてブ", url: "https://hatena.blog/" },
    { name: "株価", url: "https://nikkei225jp.com/" }
    
];

// 3. ブックマークを画面に表示する機能
function displayBookmarks() {
    const list = document.getElementById('bookmark-list');
    
    bookmarks.forEach(item => {
        const anchor = document.createElement('a');
        anchor.href = item.url;
        anchor.className = 'bookmark-item';
        anchor.target = "_blank";

        // --- ここからアイコン作成 ---
        const icon = document.createElement('img');
        // GoogleのAPIを利用してアイコンを取得
        // size=32 または 64 くらいがiPhoneで綺麗に見えます
        icon.src = `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=64`;
        icon.alt = "";
        icon.className = 'site-icon';
        
        // テキスト用の要素
        const span = document.createElement('span');
        span.textContent = item.name;

        // アイコンとテキストをリンクの中に追加
        anchor.appendChild(icon);
        anchor.appendChild(span);
        // --- ここまで ---

        list.appendChild(anchor);
    });
}

// 1. 日付表示（既存のものを少し拡張）
function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
    document.getElementById('date-display').textContent = now.toLocaleDateString('ja-JP', options);
    
    // メッセージを表示する関数を呼び出す
    displayMessage(now);
}

// ★新機能：曜日や日付でメッセージを出す
function displayMessage(now) {
    const month = now.getMonth() + 1; // 月は0から始まるので+1
    const date = now.getDate();
    const day = now.getDay(); // 0:日, 1:月, 2:火, 3:水, 4:木, 5:金, 6:土
    
    let message = "おーい、とろぱぐ"; // デフォルトのメッセージ

    // --- 曜日の条件分岐 ---
    if (day === 5) {
        message = "今日は🍋の日。おがんばりやす～。";
    } else if (day === 6) {
        message = "今日は🚄の日。遅れないでねー。";
    } else if (day === 0) {
        message = "今日は🍋？当直？旅行？";
    }

    // --- 特定の日付の条件分岐（上書きされる） ---
    if (date === 15) {
        message = "今日は15日、給料日ですね！お疲れ様です！";
    } else if (month === 1 && date === 1) {
        message = "あけましておめでとうございます！";
    }

    // HTMLに表示するための要素を（まだなければ）作る
    let msgElement = document.getElementById('special-message');
    if (!msgElement) {
        msgElement = document.createElement('p');
        msgElement.id = 'special-message';
        msgElement.style.color = '#ff6b6b'; // 少し目立つ色に
        msgElement.style.fontWeight = 'bold';
        document.querySelector('header').appendChild(msgElement);
    }
    
    msgElement.textContent = message;
}
// HTMLに <input id="search-input"> と <button id="search-btn"> を追加した想定
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

// 入力欄がフォーカス（タップ）された時の処理
searchInput.addEventListener('focus', () => {
    searchInput.select(); // 中の文字を全選択する
});

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        // Google検索のURLを組み立ててジャンプ
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});
// 入力欄でEnterキーが押されたら検索を実行する
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click(); // ボタンクリックと同じ処理を走らせる
    }
});
// 実行（displayBookmarksはそのまま）


updateDate();
displayBookmarks();