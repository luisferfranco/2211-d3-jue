// Selectores
const graf = d3.select("#graf")
const col = d3.select("#col")

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
  { tienda: "Cd. Mexico II", ventas: 2000, visitas: 520 },
]
let columnas = Object.keys(data[0]).slice(1)
let columna = columnas[0]

col
  .selectAll("option")
  .data(columnas)
  .enter()
  .append("option")
  .attr("value", (d) => d)
  .text((d) => d)

// Variables de graficación
const svg = graf
  .append("svg")
  .attr("width", anchoTotal)
  .attr("height", altoTotal)
  .attr("class", "fig")
svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)
  .append("rect")
  .attr("width", ancho)
  .attr("height", alto)
  .attr("class", "bg")
const g = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`)

// Escaladores
const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d[columna])])
  .range([alto, 0])
const x = d3
  .scaleBand()
  .domain(d3.map(data, (d) => d.tienda))
  .range([0, ancho])
  .paddingInner(0.2)
  .paddingOuter(0.1)
const color = d3.scaleOrdinal().domain(columnas).range(d3.schemeSet2)

// Ejes
xAxis = d3.axisBottom(x)
xAxisGroup = g
  .append("g")
  .attr("transform", `translate(0, ${alto})`)
  .attr("class", "axis")
  .call(xAxis)
yAxis = d3.axisLeft(y)
yAxisGroup = g.append("g").attr("class", "axis").call(yAxis)

// Función Render
const render = () => {
  const rect = g
    .selectAll("rect")
    .data(data)
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", (d) => x(d.tienda))
          .attr("y", (d) => y(0))
          .attr("width", x.bandwidth())
          .attr("height", 0)
          .attr("fill", "green")
          .transition()
          .duration(2000)
          .attr("y", (d) => y(d[columna]))
          .attr("height", (d) => alto - y(d[columna]))
          .attr("fill", color(columna)),
      (update) => {
        y.domain([0, d3.max(data, (d) => d[columna])])
        yAxisGroup.transition().duration(2000).call(d3.axisLeft(y))

        return update
          .transition()
          .duration(2000)
          .attr("y", (d) => y(d[columna]))
          .attr("height", (d) => alto - y(d[columna]))
          .attr("fill", "orange")
          .attr("fill", color(columna))
      },
      (exit) =>
        exit
          .transition()
          .duration(2000)
          .attr("y", (d) => y(0))
          .attr("height", 0)
          .attr("fill", "red")
          .remove()
    )
}

render()

const camcol = () => {
  columna = col.node().value
  render()
}
