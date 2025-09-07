const users = JSON.parse(getCookie('users') || '[]');
const posts = JSON.parse(getCookie('posts') || '[]');

document.getElementById('addUserBtn').addEventListener('click', registerUser);
document.getElementById('addPostBtn').addEventListener('click', addPost);

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function saveCookies() {
    setCookie('users', JSON.stringify(users), 365);
    setCookie('posts', JSON.stringify(posts), 365);
}

function registerUser() {
    const username = document.getElementById('username').value;
    const icon = document.getElementById('icon').value;

    if (username && icon) {
        users.push({ username, icon });
        saveCookies();
        document.getElementById('username').value = '';
        document.getElementById('icon').value = '';
        alert("Пользователь добавлен!");
    } else {
        alert("Пожалуйста, заполните все поля!");
    }
}

function addPost() {
    const postContent = document.getElementById('postContent').value;

    if (postContent) {
        const user = users.length > 0 ? users[0] : { username: "Гость", icon: "https://via.placeholder.com/30" }; // Иконка по умолчанию
        posts.push({ user, content: postContent, likes: 0 });
        saveCookies();
        document.getElementById('postContent').value = '';
        renderPosts();
    } else {
        alert("Пожалуйста, введите содержание поста!");
    }
}

function likePost(index) {
    posts[index].likes++;
    saveCookies();
    renderPosts();
}

function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="${post.user.icon}" alt="${post.user.username}'s icon">
            <div class="post-content">
                <strong>${post.user.username}</strong>: ${post.content}
                <br>
                <span class="likes">❤️ ${post.likes} лайков</span>
                <button onclick="likePost(${index})">Лайк</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Начальная загрузка постов
renderPosts();