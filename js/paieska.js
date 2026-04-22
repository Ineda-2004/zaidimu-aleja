document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".search-input");
  const iconBtn = document.querySelector(".search-icon");
  const noResults = document.getElementById("noResults");
  const cards = Array.from(document.querySelectorAll(".main-content .game-card"));
  const sortSelect = document.getElementById("sortSelect");

  const applyBtnDesktop = document.getElementById("applyFiltersDesktop");
  const applyBtnMobile = document.getElementById("applyFiltersMobile");

  if (!input || cards.length === 0) return;

  function normalize(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function getSelected(group) {
    return Array.from(
      document.querySelectorAll(`input[type="checkbox"][data-group="${group}"]:checked`)
    ).map(cb => cb.value);
  }

  function cardMatchesGroup(cardValueCsv, selectedValues) {
    if (selectedValues.length === 0) return true;

    const cardValues = (cardValueCsv || "")
      .split(",")
      .map(v => normalize(v))
      .filter(Boolean);

    return selectedValues.some(v => cardValues.includes(normalize(v)));
  }

  function syncCheckboxes(changedCb) {
    const group = changedCb.getAttribute("data-group");
    const value = changedCb.value;
    const checked = changedCb.checked;

    document
      .querySelectorAll(`input[type="checkbox"][data-group="${group}"][value="${CSS.escape(value)}"]`)
      .forEach(cb => {
        if (cb !== changedCb) cb.checked = checked;
      });
  }

  function getPrice(card) {
    const priceText = card.querySelector(".price")?.textContent || "€0";
    return parseFloat(priceText.replace("€", "").replace(",", ".").trim()) || 0;
  }

  function sortCards(type) {
    const container = document.querySelector(".main-content");
    if (!container) return;

    const cardsArr = Array.from(container.children);

    cardsArr.sort((a, b) => {
      const nameA = a.querySelector("h3")?.textContent || "";
      const nameB = b.querySelector("h3")?.textContent || "";

      if (type === "name-asc") return nameA.localeCompare(nameB, "lt");
      if (type === "name-desc") return nameB.localeCompare(nameA, "lt");
      if (type === "price-asc") return getPrice(a) - getPrice(b);
      if (type === "price-desc") return getPrice(b) - getPrice(a);
      return 0;
    });

    cardsArr.forEach(card => container.appendChild(card));
  }

  function applyAll() {
    const selectedGenre = getSelected("genre");
    const selectedPlayers = getSelected("players");
    const selectedAge = getSelected("age");
    const selectedDuration = getSelected("duration");

    const q = normalize(input.value);
    let visibleCount = 0;

    cards.forEach(card => {
      const title = normalize(card.querySelector("h3")?.textContent || "");
      const matchSearch = title.includes(q);

      const matchGenre = cardMatchesGroup(card.dataset.genre, selectedGenre);
      const matchPlayers = cardMatchesGroup(card.dataset.players, selectedPlayers);
      const matchAge = cardMatchesGroup(card.dataset.age, selectedAge);
      const matchDuration = cardMatchesGroup(card.dataset.duration, selectedDuration);

      const matchAll = matchSearch && matchGenre && matchPlayers && matchAge && matchDuration;

      card.style.display = matchAll ? "flex" : "none";
      if (matchAll) visibleCount++;
    });

    if (noResults) noResults.style.display = visibleCount === 0 ? "block" : "none";

    if (sortSelect) sortCards(sortSelect.value);
  }

  input.addEventListener("input", applyAll);
  if (iconBtn) iconBtn.addEventListener("click", applyAll);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") e.preventDefault();
  });

  document.querySelectorAll('input[type="checkbox"][data-group]').forEach(cb => {
    cb.addEventListener("change", () => {
      syncCheckboxes(cb);
      applyAll();
    });
  });

  applyBtnDesktop?.addEventListener("click", applyAll);
  applyBtnMobile?.addEventListener("click", applyAll);

  // rūšiavimas
  sortSelect?.addEventListener("change", applyAll);

  applyAll();
});
