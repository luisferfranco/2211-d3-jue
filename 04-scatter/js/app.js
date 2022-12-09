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

var cx = ancho / 2
var cy = alto / 2
var r = alto / 4

const circle = svg
  .append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", r)
  .attr("fill", "#003566")

const mover = (dx, dy) => {
  cx += dx
  cy += dy
  circle.transition().duration(500).attr("cx", cx).attr("cy", cy)
}

const color = (dc) => {
  circle.transition().duration(2000).attr("fill", dc)
}
