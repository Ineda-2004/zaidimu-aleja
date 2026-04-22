document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  const name = document.getElementById("regName");
  const email = document.getElementById("regEmail");
  const pass1 = document.getElementById("regPassword");
  const pass2 = document.getElementById("regPassword2");

  const errName = document.getElementById("errorName");
  const errEmail = document.getElementById("errorEmail");
  const errPass1 = document.getElementById("errorPassword");
  const errPass2 = document.getElementById("errorPassword2");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    errName.textContent = "";
    errEmail.textContent = "";
    errPass1.textContent = "";
    errPass2.textContent = "";

    let valid = true;

    if (name.value.trim() === "") {
      errName.textContent = "Įveskite vardą";
      valid = false;
    }

    if (!email.value.includes("@")) {
      errEmail.textContent = "Įveskite teisingą el. paštą";
      valid = false;
    }

    if (pass1.value.length < 4) {
      errPass1.textContent = "Slaptažodis per trumpas";
      valid = false;
    }

    if (pass1.value !== pass2.value) {
      errPass2.textContent = "Slaptažodžiai nesutampa";
      valid = false;
    }

    if (!valid) return;

    alert("Registracija sėkminga");
    form.reset();
  });
});
