// Selectores
const graf = d3.select("#graf")
const margins = { top: 90, right: 10, bottom: 100, left: 150 }
const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16
const ancho = anchoTotal - margins.left - margins.right
const alto = altoTotal - margins.top - margins.bottom

// Datos
let data = [
  { tienda: "Cd. Mexico", ventas: 10500, costo: 8500, visitas: 480 },
  { tienda: "Guadalajara", ventas: 9500, costo: 6000, visitas: 500 },
  { tienda: "Monterrey", ventas: 8000, costo: 6750, visitas: 750 },
  { tienda: "Puebla", ventas: 9650, costo: 5740, visitas: 450 },
  { tienda: "Cd. Mexico II", ventas: 2000, costo: 9000, visitas: 520 },
]

// Variables de graficación
const svg = graf
  .append("svg")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "fig")
const g = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

g.append("rect").attr("width", ancho).attr("height", alto).attr("class", "bg")

// Escaladores

// Función Render
const render = () => {}

render()
