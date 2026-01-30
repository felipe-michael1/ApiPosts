const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

async function apiFetch(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }
    return response.json();
}

const Api = {
    getUsers: () => apiFetch(USERS_URL),

    getPostsByUser: (userId) =>
        apiFetch(`php/api.php?codigo_usuario=${userId}&route=posts_user`),

    getCommentsByPost: (postId) =>
        apiFetch(`php/api.php?postId=${postId}&route=posts_comments`)
};

function renderUsers(users) {
    const ul = document.getElementById('usuarios');

    ul.innerHTML = users.map(user => `
        <li>
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Address: ${user.address.street}</p>
            <p>City: ${user.address.city}</p>

            <button 
                class="verifica-posts" 
                data-user-id="${user.id}">
                Look Posts
            </button>
        </li>
    `).join('');
}

function renderPosts(posts) {
    const container = document.getElementById('post_usuarios');

    container.innerHTML = posts.map(post => `
        <li>
            <h3>${post.title}</h3>
            <p>${post.body}</p>

            <button 
                class="verifica-comment" 
                data-post-id="${post.id}">
                Comments
            </button>

            <div class="box-comentarios" hidden>
                <ul class="lista-comentarios"></ul>
            </div>
        </li>
    `).join('');
}

function renderComments(comments, ul) {
    ul.innerHTML = comments.map(comment => `
        <li>
            <strong>${comment.name}</strong>
            <p>${comment.body}</p>
        </li>
    `).join('');
}

function renderSkeleton(container) {
    container.innerHTML = `
        <li class="skeleton-post"></li>
        <li class="skeleton-post"></li>
        <li class="skeleton-post"></li>
    `;
}

function renderError(container, message) {
    container.innerHTML = `<li class="error">${message}</li>`;
}

async function handleUserPosts(userId) {
    const postsContainer = document.getElementById('post_usuarios');
    const usersList = document.getElementById('usuarios');

    usersList.style.display = 'none';
    renderSkeleton(postsContainer);

    try {
        const posts = await Api.getPostsByUser(userId);
        renderPosts(posts);
    } catch (error) {
        renderError(postsContainer, 'Error to load the posts...');
        console.error(error);
    }
}

async function handlePostComments(button) {
    const box = button.closest('li').querySelector('.box-comentarios');
    const ul = box.querySelector('.lista-comentarios');

    const isOpen = !box.hasAttribute('hidden');

    document.querySelectorAll('.box-comentarios')
        .forEach(b => b.setAttribute('hidden', ''));

    if (isOpen) return;

    box.removeAttribute('hidden');
    ul.innerHTML = '<li>Loading...</li>';

    try {
        const postId = button.dataset.postId;
        const comments = await Api.getCommentsByPost(postId);
        renderComments(comments, ul);
    } catch (error) {
        renderError(ul, 'Error to load the comments...');
        console.error(error);
    }
}

document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('verifica-posts')) {
        event.preventDefault();
        handleUserPosts(target.dataset.userId);
    }

    if (target.classList.contains('verifica-comment')) {
        event.preventDefault();
        handlePostComments(target);
    }
});

async function init() {
    try {
        const users = await Api.getUsers();
        renderUsers(users);
    } catch (error) {
        renderError(
            document.getElementById('usuarios'),
            'Error to load the Users...'
        );
        console.error(error);
    }
}

init();
