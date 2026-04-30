// 1. 日付を表示する機能
function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
    // iPhoneのChromeでも綺麗に見える形式に変換
    document.getElementById('date-display').textContent = now.toLocaleDateString('ja-JP', options);
}

// 2. ブックマークのデータ（ここを編集するだけでリンクを増やせます！）
const bookmarks = [
    { name: "amazon", url: "https://www.amazon.co.jp/" },
    { name: "株価", url: "https://nikkei225jp.com/" },
    { name: "マネフォ", url: "https://moneyforward.com/" },
    { name: "インスタ", url: "https://www.instagram.com/" },
    { name: "スマートEx", url: "https://shinkansen2.jr-central.co.jp/RSV_P/smart_index.htm?_gl=1*vvt2wq*_gcl_au*MTE0NDA2MzM5OC4xNzc0NDQ4NjAz*_ga*ODkzNTUyMzIuMTc3NDQ0ODYwMw..*_ga_41P1T5QHNY*czE3NzQ0NDg2MDIkbzEkZzAkdDE3NzQ0NDg2MTgkajQ0JGwwJGgw" },
    { name: "民間医局", url: "https://www.doctor-agent.com/" },
    { name: "はてな", url: "https://xjgsu5n.hatenablog.com/" },
    { name: "note", url: "https://note.com/" },    

    
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
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=64&default=404`;
        const icon = document.createElement('img');
        // GoogleのAPIを利用してアイコンを取得
        // size=32 または 64 くらいがiPhoneで綺麗に見えます
        icon.src = faviconUrl;
        
        icon.className = 'site-icon';
        // 画像の読み込みに失敗した時の処理
        icon.onload = () => {
    // もし読み込まれた画像が「16px以下」などの極小サイズ（＝アイコン取得失敗時の挙動）なら差し替える
    if (icon.naturalWidth <= 16) {
        icon.src = 'favicon.png';
    }
};
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

function displayMessage(now) {
    const date = now.getDate();
    const day = now.getDay();
    const nextDay = new Date(now); 
    nextDay.setDate(date + 1);
    
    let messages = [];

    // --- 条件判定 ---
    if (day === 5) messages.push("🍋の日。おがんばりやす～。");
    if (day === 6) messages.push("🍵の日。おがんばりやす～。");
    if (day === 0 && ((date >= 8 && date <= 14) || (date >= 22 && date <= 28))) {
        messages.push("今日は🍋の日。お頑張りやす～。")
    }
    if (date === 15) messages.push("🍵🏥給料日です。確認してください");
    if (date === 20) messages.push("🍋給料日です。確認してください。");
    if (nextDay.getDate() === 1) messages.push("🍵給料日です。確認してください。");

    if (messages.length === 0) messages.push("今日も一日頑張りましょう！");

    // --- 表示処理 ---
    // headerの中に直接表示エリアを確保する
    const header = document.querySelector('header');
    let msgElement = document.getElementById('special-message');

    if (!msgElement) {
        msgElement = document.createElement('div'); // 複数行になるのでdivがおすすめ
        msgElement.id = 'special-message';
        header.appendChild(msgElement);
    }

    // スタイル設定
    msgElement.style.color = '#ff6b6b';
    msgElement.style.fontWeight = 'bold';
    msgElement.style.marginTop = '10px';
    
    // 内容を反映
    msgElement.innerHTML = messages.join('<br>');
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
displayMessage(new Date());
