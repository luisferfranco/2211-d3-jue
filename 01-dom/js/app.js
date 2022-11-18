const body = d3.select("body")
const btnMinus = d3.select("#btnMinus")
const btnPlus = d3.select("#btnPlus")
const cuenta = d3.select("#cuenta")

var contador = 0

const cambiaColor = (color) => {
  body.style("background-color", color)
}

const cambiaNumero = (d) => {
  contador += d
  cuenta.html(contador)

  if (contador > 5) {
    btnPlus.classed("text-success", true)
  }
  if (contador < -5) {
    btnMinus.classed("text-danger", true)
  }
  if (contador == 0) {
    btnPlus.classed("text-success", false)
    btnMinus.classed("text-danger", false)
  }
}

btnMinus.on("click", () => {
  cambiaNumero(-1)
})

btnPlus.on("click", () => {
  cambiaNumero(+1)
})
