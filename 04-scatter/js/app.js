// Selectores
const graf = d3.select("#graf")
const margins = { top: 90, right: 10, bottom: 100, left: 150 }
const anchoTotal = +graf.style("width").slice(0, -2)
const altoTotal = (anchoTotal * 9) / 16
const ancho = anchoTotal - margins.left - margins.right
const alto = altoTotal - margins.top - margins.bottom

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

const x = d3.scaleLinear().range([0, ancho])
const y = d3.scaleLinear().range([alto, 0])

const xAxis = d3.axisBottom(x).ticks(5).tickSize(-alto)
const yAxis = d3.axisLeft(y).tickSize(-ancho)

const load = async () => {
  var data = await d3.csv("data/data.csv", d3.autoType)
  // data.forEach((r) => {
  //   r.educacion = +r.educacion
  //   r.sueldo = +r.sueldo
  // })
  console.log(data)

  x.domain([0, d3.max(data, (d) => d.educacion) * 1.1])
  y.domain([0, d3.max(data, (d) => d.sueldo) * 1.1])

  g.append("g")
    .attr("transform", `translate(0, ${alto})`)
    .attr("class", "axis")
    .call(xAxis)
  g.append("g").attr("class", "axis").call(yAxis)

  g.append("text")
    .attr("x", ancho / 2)
    .attr("y", -10)
    .attr("class", "titulo")
    .attr("text-anchor", "middle")
    .text("Salario vs. Años de Estudio")

  render(data)
}

const render = (data) => {
  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d.educacion))
    .attr("cy", (d) => y(d.sueldo))
    .attr("r", 5)
    .attr("fill", "#00b")
}

load()
