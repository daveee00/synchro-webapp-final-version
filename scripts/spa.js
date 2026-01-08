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
}

// delega click a tutti i bottoni con data-view
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-view]");
  if (btn) {
    setActiveView(btn.dataset.view);

    // Aggiorna la classe .active solo per i bottoni nel nav
    const nav = btn.closest("nav");
    if (nav) {
      const navButtons = nav.querySelectorAll("[data-view]");
      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }
  }
});

// allineamento al load
document.addEventListener("DOMContentLoaded", () => {
  const initialView = document.querySelector("main .view.active");
  if (initialView) {
    setActiveView(initialView.id);

    // Aggiunge .active al bottone del nav corrispondente alla view attiva
    const navButton = document.querySelector(
      `nav [data-view="${initialView.id}"]`
    );
    if (navButton) {
      navButton.classList.add("active");
    }
  }
});
