document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("eventModal");
  const title = document.getElementById("eventTitle");
  const form = document.getElementById("eventForm");
  const closeBtn = document.getElementById("closeModal");

  const nameInput = document.getElementById("eventName");
  const emailInput = document.getElementById("eventEmail");

  document.querySelectorAll(".register-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      title.textContent = btn.dataset.event;
      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    form.reset();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name.length < 2) {
      alert("Įveskite vardą.");
      return;
    }

    if (!email.includes("@")) {
      alert("Įveskite teisingą el. paštą.");
      return;
    }

    alert("Registracija į renginį sėkminga!");
    modal.classList.remove("active");
    form.reset();
  });
});
