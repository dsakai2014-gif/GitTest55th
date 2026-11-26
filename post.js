// 投稿フォームと投稿一覧を取得
const postForm = document.getElementById("postForm");
const postList = document.getElementById("postList");

// 保存された投稿を表示する関数
function displayPosts() {
  const posts = JSON.parse(localStorage.getItem("favoritePosts")) || [];

  // 投稿一覧を空にする
  postList.innerHTML = "";

  // 投稿がない場合
  if (posts.length === 0) {
    postList.textContent = "まだ投稿はありません。";
    return;
  }

  // 投稿を1つずつ表示
  posts.forEach(function (post) {
    const postCard = document.createElement("div");

    const image = document.createElement("img");
    image.src = post.photo;
    image.alt = post.title;
    image.style.width = "250px";

    const title = document.createElement("h3");
    title.textContent = post.title;

    const description = document.createElement("p");
    description.textContent = post.description;

    const location = document.createElement("p");
    location.textContent = "場所：" + (post.location || "未入力");

    const author = document.createElement("p");
    author.textContent = "投稿者：" + post.author;

    const date = document.createElement("p");
    date.textContent = "投稿日時：" + post.date;

    postCard.appendChild(image);
    postCard.appendChild(title);
    postCard.appendChild(description);
    postCard.appendChild(location);
    postCard.appendChild(author);
    postCard.appendChild(date);

    postCard.style.border = "1px solid #ccc";
    postCard.style.padding = "15px";
    postCard.style.margin = "15px 0";

    postList.appendChild(postCard);
  });
}

// 投稿処理
postForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const photoFile = document.getElementById("photo").files[0];
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;
  const author = document.getElementById("author").value;

  if (!photoFile) {
    alert("写真を選択してください");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const newPost = {
      id: Date.now(),
      photo: reader.result,
      title: title,
      description: description,
      location: location,
      author: author,
      date: new Date().toLocaleString("ja-JP")
    };

    let posts = JSON.parse(localStorage.getItem("favoritePosts")) || [];

    posts.unshift(newPost);

    localStorage.setItem("favoritePosts", JSON.stringify(posts));

    alert("投稿しました！");

    postForm.reset();

    // 投稿後に一覧を更新
    displayPosts();
  };

  reader.readAsDataURL(photoFile);
});

// ページを開いたときにも保存済み投稿を表示
displayPosts();