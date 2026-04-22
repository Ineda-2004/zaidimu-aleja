const miestai = [
  "vilnius", "kaunas", "klaipėda", "šiauliai", "panevėžys",
  "alytus", "marijampolė", "mažeikiai", "jonava", "utena",
  "kėdainiai", "telšiai", "tauragė", "ukmergė",
  "plungė", "šilutė", "nida", "druskininkai",
  "biržai", "radviliškis", "anykščiai",
  "jurbarkas", "šilalė", "lazdijai", "trakai",
  "zarasai", "ignalina", "molėtai", "varėna", "pakruojis"
];

let slaptasZodis = "";
let parodytasZodis = [];
let likoBandymu = 6;
let spetosRaides = [];

const wordDisplay = document.getElementById("wordDisplay");
const letterButtons = document.getElementById("letterButtons");
const attemptsLeft = document.getElementById("attemptsLeft");
const guessedLetters = document.getElementById("guessedLetters");
const resultMessage = document.getElementById("resultMessage");
const restartBtn = document.getElementById("restartBtn");
const karstykleImage = document.getElementById("karstykleImage");

function pradetiZaidima() {
  slaptasZodis = miestai[Math.floor(Math.random() * miestai.length)];
  parodytasZodis = Array(slaptasZodis.length).fill("_");
  likoBandymu = 6;
  spetosRaides = [];
  atnaujintiRodinius();
  sukurtiMygtukus();
  resultMessage.textContent = "";
  karstykleImage.src = `nuotraukos/karstykle0.png`;
}

function sukurtiMygtukus() {
  letterButtons.innerHTML = "";
  const raides = "aąbcčdeęėfghiįjklmnopqrsštuųūvwxyzž";


  raides.split('').forEach(raide => {
    const btn = document.createElement("button");
    btn.textContent = raide;
    btn.classList.add("filter-btn");
    btn.style.flex = "0 0 40px";
    btn.style.textTransform = "uppercase";
    btn.disabled = spetosRaides.includes(raide);
    btn.addEventListener("click", () => spetiRaide(raide));
    letterButtons.appendChild(btn);
  });
}

function spetiRaide(raide) {
  if (spetosRaides.includes(raide)) return;
  spetosRaides.push(raide);

  if (slaptasZodis.includes(raide)) {
    slaptasZodis.split('').forEach((r, i) => {
      if (r === raide) parodytasZodis[i] = raide;
    });
  } else {
    likoBandymu--;
    karstykleImage.src = `nuotraukos/karstykle${6 - likoBandymu}.png`;
  }

  atnaujintiRodinius();
  patikrintiRezultata();
}

function atnaujintiRodinius() {
  wordDisplay.textContent = parodytasZodis.join(" ");
  attemptsLeft.textContent = likoBandymu;
  guessedLetters.textContent = spetosRaides.join(", ");
  sukurtiMygtukus();
}
function showEndModal(message) {
  document.getElementById("modalMessage").textContent = message;
  const modal = new bootstrap.Modal(document.getElementById('resultModal'));
  modal.show();
}

function endGame(success) {
  const word = currentWord.join('');
  const message = success
    ? `🎉 Teisingai! Miestas buvo: ${word}`
    : `😢 Pralaimėjai! Miestas buvo: ${word}`;
  
  showEndModal(message);
}

function patikrintiRezultata() {
  if (!parodytasZodis.includes("_")) {
    resultMessage.textContent = "🎉 Teisingai! Tai – " + slaptasZodis.toUpperCase();
    uzrakintiZaidima();
  } else if (likoBandymu === 0) {
    resultMessage.textContent = `❌ Pralaimėjai! Miestas buvo: ${slaptasZodis.toUpperCase()}`;
    uzrakintiZaidima();
  }
}

function uzrakintiZaidima() {
  const buttons = document.querySelectorAll("#letterButtons button");
  buttons.forEach(btn => btn.disabled = true);
}

restartBtn.addEventListener("click", pradetiZaidima);
pradetiZaidima();
