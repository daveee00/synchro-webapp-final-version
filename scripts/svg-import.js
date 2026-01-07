async function injectSVG(container) {
  const holder = container.querySelector(".svg-holder");
  const url = container.dataset.svg;

  const response = await fetch(url);
  const svgText = await response.text();

  holder.innerHTML = svgText;

  const svg = holder.querySelector("svg");

  // pulizia per animazioni
  svg.removeAttribute("width");
  svg.removeAttribute("height");

  return svg;
}

document.querySelectorAll("[data-svg]").forEach(async (el) => {
  const svg = await injectSVG(el);
  initSVG(svg, el); // hook animazioni
});
