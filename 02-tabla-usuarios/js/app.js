const resultados = d3.select("#resultados")

const load = async () => {
  const data = await d3.json("https://randomuser.me/api?results=10")
  console.log(data.results)

  let regs = resultados.selectAll("tr").data(data.results)

  // enter - update - exit

  regs
    .enter()
    .append("tr")
    .html(
      (d) => `
    <tr>
      <td>
        <img
          src="${d.picture.medium}"
          class="rounded-circle"
          width="80px"
          height="80px"
        />
      </td>
      <td>
        <h3>${d.name.first + " " + d.name.last}</h3>
        <div class="text-muted fs-6">${d.email}</div>
        <div>${d.location.street.name} ${d.location.street.number}</div>
      </td>
    </tr>
`
    )
}

load()
