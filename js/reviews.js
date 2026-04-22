document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  const list = document.getElementById("reviewsList");
  if (!form || !list) return;

  const titleEl = document.getElementById("review-title");
  const nameEl = document.getElementById("user-name");
  const commentEl = document.getElementById("user-comment");

  const STORAGE_KEY = form.getAttribute("data-storage") || "reviews_default";

  function escapeHtml(str) {
    return (str || "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m]));
  }

  function loadReviews() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveReviews(reviews) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }

  function renderOne(review, prepend = true) {
    const article = document.createElement("article");
    article.className = "review";
    article.innerHTML = `
      <h4>${escapeHtml(review.title)}</h4>
      <p>${escapeHtml(review.comment)}</p>
      <span>— ${escapeHtml(review.name)}</span>
    `;
    if (prepend) list.prepend(article);
    else list.appendChild(article);
  }

  loadReviews().forEach(r => renderOne(r, false));

  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity(); 
      return;
    }

    e.preventDefault();

    const review = {
      title: titleEl.value.trim(),
      name: nameEl.value.trim(),
      comment: commentEl.value.trim(),
      createdAt: Date.now(),
    };

    const reviews = loadReviews();
    reviews.push(review);
    saveReviews(reviews);

    renderOne(review, true);
    form.reset();
  });
});
