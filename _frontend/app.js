const $ = document;

registerEvents();

function registerEvents() {
  $.addEventListener('DOMContentLoaded', displayPosts)
}

function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      let html = '';
      posts.forEach(
        post => {
          html += `<li>${post.title}</li>`
        }
      );
      $.getElementById('container').innerHTML = `<ul>${html}</ul>`
    }

    )
}