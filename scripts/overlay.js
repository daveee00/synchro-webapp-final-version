function setupOverlay(overlayId, openBtnId) {
  const overlay = document.getElementById(overlayId);
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = overlay.querySelector(".overlay-close");
  const content = overlay.querySelector(".overlay-content");

  // APERTURA
  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    overlay.classList.add("active");
  });

  // CHIUSURA con ✕
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    overlay.classList.remove("active");
  });

  // CLICK FUORI (overlay)
  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  // BLOCCA click interno
  content.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// Overlay "more about"
setupOverlay("align-about-overlay", "overlay-align-btn");
