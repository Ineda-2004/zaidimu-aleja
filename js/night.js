document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("nightModeBtn");
  const KEY = "nightMode";

  if (localStorage.getItem(KEY) === "on") {
    document.body.classList.add("dark");
    if (btn) btn.textContent = "☀️";
  }

  if (!btn) return;

  btn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem(KEY, isDark ? "on" : "off");
    btn.textContent = isDark ? "☀️" : "🌙";
  });
});
