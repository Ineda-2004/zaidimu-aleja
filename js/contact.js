document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const reason = document.getElementById("reason");
  const message = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const v = name.value.trim();
    const eMail = email.value.trim();
    const r = reason.value;
    const m = message.value.trim();

    if (v.length < 2) {
      alert("Įveskite vardą (bent 2 simboliai).");
      return;
    }

    if (!eMail.includes("@") || !eMail.includes(".")) {
      alert("Įveskite teisingą el. pašto adresą.");
      return;
    }

    if (!r) {
      alert("Pasirinkite rašymo priežastį.");
      return;
    }

    if (m.length < 10) {
      alert("Žinutė per trumpa (bent 10 simbolių).");
      return;
    }

    alert("Ačiū! Jūsų žinutė sėkmingai išsiųsta.");
    form.reset();
  });
});
