document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  if (!form) return;

  emailInput.addEventListener("input", () => emailInput.setCustomValidity(""));
  passwordInput.addEventListener("input", () => passwordInput.setCustomValidity(""));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    emailInput.setCustomValidity("");
    passwordInput.setCustomValidity("");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!emailInput.value.includes("@")) {
      emailInput.setCustomValidity("El. pašto adresas turi turėti „@“.");
      emailInput.reportValidity();
      return;
    }

    if (passwordInput.value.trim().length < 4) {
      passwordInput.setCustomValidity("Slaptažodis turi būti bent 4 simbolių.");
      passwordInput.reportValidity();
      return;
    }

    alert("Prisijungimas sėkmingas.");
    form.reset();
  });
});
