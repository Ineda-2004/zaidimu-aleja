document.addEventListener("DOMContentLoaded", () => {

  function normalize(t){ return (t||"").trim(); }

  function isEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
  }

  function showError(field, msg){
    field.classList.add("is-invalid");
    let fb = field.parentElement.querySelector(".invalid-feedback");
    if(!fb){
      fb = document.createElement("div");
      fb.className = "invalid-feedback";
      field.parentElement.appendChild(fb);
    }
    fb.textContent = msg;
  }

  function clearError(field){
    field.classList.remove("is-invalid");
    const fb = field.parentElement.querySelector(".invalid-feedback");
    if(fb) fb.remove();
  }

  function bindForm(form, rules, successTitle){
    if(!form) return;

    // gyvas valymas
    form.querySelectorAll("input, textarea, select").forEach(el=>{
      el.addEventListener("input", ()=> clearError(el));
      el.addEventListener("change", ()=> clearError(el));
    });

    form.addEventListener("submit", (e)=>{
      e.preventDefault();

      let ok = true;
      const data = {};

      for(const r of rules){
        const el = form.querySelector(r.selector);
        if(!el) continue;

        const value = normalize(el.value);
        data[r.name] = value;

        const err = r.validate(value);
        if(err){
          ok = false;
          showError(el, err);
        }else{
          clearError(el);
        }
      }

      if(!ok) return;

      const lines = Object.entries(data).map(([k,v]) => `${k}: ${v || "-"}`).join("\n");
      alert(`${successTitle}\n\n${lines}`);

      form.reset();
    });
  }

  bindForm(
    document.querySelector(".contact-form"),
    [
      { name:"Vardas", selector:"#name", validate:(v)=> v.length < 2 ? "Įveskite bent 2 simbolius." : "" },
      { name:"El. paštas", selector:"#email", validate:(v)=> !isEmail(v) ? "Įveskite teisingą el. pašto adresą." : "" },
      { name:"Priežastis", selector:"#reason", validate:(v)=> !v ? "Pasirinkite priežastį." : "" },
      { name:"Žinutė", selector:"#message", validate:(v)=> v.length < 10 ? "Žinutė per trumpa (min. 10 simbolių)." : "" },
    ],
    "✅ Žinutė sėkmingai išsiųsta!"
  );

  bindForm(
    document.querySelector(".comment-form"),
    [
      { name:"Antraštė", selector:"#review-title", validate:(v)=> v.length < 3 ? "Antraštė per trumpa (min. 3 simboliai)." : "" },
      { name:"Vardas", selector:"#user-name", validate:(v)=> v.length < 2 ? "Vardas per trumpas (min. 2 simboliai)." : "" },
      { name:"Komentaras", selector:"#user-comment", validate:(v)=> v.length < 10 ? "Komentaras per trumpas (min. 10 simbolių)." : "" },
    ],
    "✅ Atsiliepimas pateiktas!"
  );

  bindForm(
    document.querySelector(".login-form"),
    [
      { name:"El. paštas", selector:"#email", validate:(v)=> !isEmail(v) ? "Įveskite teisingą el. pašto adresą." : "" },
      { name:"Slaptažodis", selector:"#password", validate:(v)=> v.length < 6 ? "Slaptažodis per trumpas (min. 6 simboliai)." : "" },
    ],
    "✅ Prisijungimas sėkmingas!"
  );

});
/*nebereikalingas galima tirninti laukant*/