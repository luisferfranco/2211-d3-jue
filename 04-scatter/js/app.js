// Selectores
const graf = d3.select("#graf")
const ancho = +graf.style("width").slice(0, -2)
const alto = (ancho * 9) / 16

// Variables de graficación
const svg = graf
  .append("svg")
  .attr("width", ancho)
  .attr("height", alto)
  .attr("class", "fig")
