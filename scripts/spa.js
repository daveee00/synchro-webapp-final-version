// funzione che resetta lo scroll di tutti gli elementi dentro un container
function resetScroll(container) {
  container.scrollTop = 0;
  const scrollables = container.querySelectorAll("div");
  scrollables.forEach((el) => (el.scrollTop = 0));
}

// funzione che attiva una vista
function setActiveView(targetView) {
  // seleziona dinamicamente tutte le viste
  const views = document.querySelectorAll("main .view");
  views.forEach((view) => view.classList.remove("active"));

  const activeSection = document.getElementById(targetView);
  if (activeSection) {
    activeSection.classList.add("active");
    resetScroll(activeSection);
  }

  // seleziona dinamicamente tutti i bottoni con data-view
  const buttons = document.querySelectorAll("[data-view]");
  buttons.forEach((btn) => btn.classList.remove("active"));

  const activeButton = document.querySelector(`[data-view="${targetView}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

// delega click a tutti i bottoni con data-view
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-view]");
  if (btn) {
    setActiveView(btn.dataset.view);
  }
});

// allineamento al load
document.addEventListener("DOMContentLoaded", () => {
  const initialView = document.querySelector("main .view.active");
  if (initialView) {
    setActiveView(initialView.id);
  }
});
