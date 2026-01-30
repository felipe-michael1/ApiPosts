<div align="center">
  <h1>User Posts & Comments Viewer</h1>
  <p>📌 JavaScript application that consumes REST APIs to display users, posts, and comments.</p>
</div>

---

## 🧠 About the Project

This project was built using **Vanilla JavaScript (ES6+)** to demonstrate API consumption and dynamic DOM rendering without frameworks.

It fetches users from the public JSONPlaceholder API, allows viewing posts for each user, and displays comments for each post.

The architecture is simple and focused on **clean code organization, good UX with visual feedback, and modern error handling** using `async/await`.

---

## 🚀 Features

- 🔹 List users with name, email, and address
- 🔹 Load posts dynamically by user
- 🔹 Load comments dynamically by post
- 🔹 Skeleton loading for better user experience
- 🔹 HTTP error handling
- 🔹 Simple screen navigation
- 🔹 Modular and maintainable code structure

---

## 🗂️ Code Structure

The project separates responsibilities into clear functions:

| Component | Responsibility |
|-----------|----------------|
| `Api` | Handles API requests |
| `renderUsers()` | Renders users list |
| `renderPosts()` | Renders user posts |
| `renderComments()` | Renders post comments |
| `handleUserPosts()` | Controls post loading/navigation |
| `handlePostComments()` | Controls open/close comments |

---

## 📦 Technologies

- **JavaScript (ES6+)**
- **Fetch API**
- **HTML5**
- **CSS3**
- **JSONPlaceholder API**

---

## ⚙️ Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
