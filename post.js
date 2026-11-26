// 投稿フォームと投稿一覧
const postForm = document.getElementById("postForm");
const postList = document.getElementById("postList");

function displayPosts() {
  const posts = JSON.parse(localStorage.getItem("favoritePosts")) || [];
  postList.replaceChildren();

  if (posts.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-posts";
    emptyMessage.textContent = "まだ投稿はありません。あなたのおすすめを最初にシェアしてみませんか？";
    postList.appendChild(emptyMessage);
    return;
  }

  posts.forEach(function (post) {
    const postCard = document.createElement("article");
    postCard.className = "post-card";

    const image = document.createElement("img");
    image.className = "post-card-image";
    image.src = post.photo;
    image.alt = post.title || "投稿されたスポットの写真";

    const content = document.createElement("div");
    content.className = "post-card-content";

    const title = document.createElement("h3");
    title.textContent = post.title;

    const description = document.createElement("p");
    description.className = "post-card-description";
    description.textContent = post.description || "お気に入りのスポットです。";

    const meta = document.createElement("div");
    meta.className = "post-card-meta";

    const location = document.createElement("span");
    location.textContent = "⌖ " + (post.location || "場所未入力");

    const author = document.createElement("span");
    author.textContent = "by " + post.author;

    const date = document.createElement("span");
    date.textContent = post.date;

    meta.appendChild(location);
    meta.appendChild(author);
    meta.appendChild(date);
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(meta);
    postCard.appendChild(image);
    postCard.appendChild(content);
    postList.appendChild(postCard);
  });
}

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

    const posts = JSON.parse(localStorage.getItem("favoritePosts")) || [];
    posts.unshift(newPost);
    localStorage.setItem("favoritePosts", JSON.stringify(posts));

    alert("投稿しました！");
    postForm.reset();
    displayPosts();
  };

  reader.readAsDataURL(photoFile);
});

displayPosts();
