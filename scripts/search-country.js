/***********************
 * SEARCH-COUNTRY.JS (ROBUST)
 * - funziona anche se overlay viene creato dopo (SPA / injection)
 * - bottone + Enter
 * - chiude la tastiera quando parte la ricerca
 ***********************/

(function () {
  const OVERLAY_SEL = "#world-rank-overlay";
  const INPUT_SEL = 'input[type="search"]';
  const BTN_ID = "id-search"; // <-- il tuo bottone
  const LIST_ID = "complete-list";

  let isBound = false;

  function getEls() {
    const overlay = document.querySelector(OVERLAY_SEL);
    if (!overlay) return null;

    const searchInput = overlay.querySelector(INPUT_SEL);
    const searchBtn = document.getElementById(BTN_ID);
    const completeList = document.getElementById(LIST_ID);

    if (!searchInput || !searchBtn || !completeList) return null;

    return { overlay, searchInput, searchBtn, completeList };
  }

  function clearPreviousFlash(completeList) {
    completeList.querySelectorAll(".name-position.flash").forEach((el) => {
      el.classList.remove("flash");
    });
  }

  function closeKeyboard(searchInput) {
    // chiude tastiera mobile
    searchInput.blur();

    // alcuni browser “ritardano” il blur: micro delay
    setTimeout(() => {
      searchInput.blur();
      // evita che il viewport resti “strano” dopo blur su iOS
      window.scrollTo(window.scrollX, window.scrollY);
    }, 0);
  }

  function performSearch(searchInput, completeList) {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    closeKeyboard(searchInput);
    clearPreviousFlash(completeList);

    const items = completeList.querySelectorAll(".line-ranking");
    if (!items.length) {
      console.warn("No .line-ranking elements in #complete-list");
      return;
    }

    let foundItem = null;

    for (const item of items) {
      const countryNameEl = item.querySelector(".country-name");
      const namePositionEl = item.querySelector(".name-position");

      if (
        countryNameEl &&
        namePositionEl &&
        countryNameEl.textContent.toLowerCase().includes(query)
      ) {
        namePositionEl.classList.add("flash");
        foundItem = item;
        break;
      }
    }

    if (foundItem) {
      foundItem.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      alert("No results found");
    }
  }

  function bindOnce() {
    const els = getEls();
    if (!els) return false;

    const { searchInput, searchBtn, completeList } = els;

    // evita doppio bind se l’init viene chiamato più volte
    if (isBound) return true;
    isBound = true;

    // pulisci flash quando cambi input
    searchInput.addEventListener("input", () =>
      clearPreviousFlash(completeList)
    );

    // click bottone
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      performSearch(searchInput, completeList);
    });

    // Enter sull’input
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch(searchInput, completeList);
      }
    });

    // opzionale: se clicchi fuori, chiude tastiera
    document.addEventListener("click", (e) => {
      const withinOverlay = e.target.closest(OVERLAY_SEL);
      if (!withinOverlay) searchInput.blur();
    });

    return true;
  }

  // 1) prova subito
  if (bindOnce()) return;

  // 2) se non c’è ancora, osserva il DOM finché appare
  const mo = new MutationObserver(() => {
    if (bindOnce()) {
      mo.disconnect();
    }
  });

  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
