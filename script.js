// 1. 忘れ物リストのデータ
const items = ["ケータイ", "ましゆく", "ぬれてぃ", "いえのかぎ", "🏘️"];

const listContainer = document.getElementById("check-list");
const message = document.getElementById("message");

// 2. リストを画面に表示する
items.forEach((item) => {
    // <li>タグを作る
    const li = document.createElement("li");
    
    // 中身（チェックボックスと文字）を作る
    li.innerHTML = `
        <label>
            <input type="checkbox" class="item-checkbox">
            <span>${item}</span>
        </label>
    `;
    
    listContainer.appendChild(li);
});

// 3. チェックボックスが押された時の動き
listContainer.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll(".item-checkbox");
    let checkedCount = 0;

    checkboxes.forEach((cb) => {
        const text = cb.nextElementSibling; // <span>を選択
        if (cb.checked) {
            text.classList.add("checked"); // 打ち消し線を引く
            checkedCount++;
        } else {
            text.classList.remove("checked"); // 打ち消し線を消す
        }
    });

    // 4. 全部チェックされたらメッセージを出す
    if (checkedCount === items.length) {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
});