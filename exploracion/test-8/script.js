const { sum } = require("d3")

d3.csv('astronautas.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    marks: [
      Plot.dot(data, {
        x: 'status', 
        y: 'mision_hs',
        stroke: 'genero'
      }),
    ],
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})


// anio_mision == x_anio && pais = x_pais ? cantidad += 0 : cantidad += 1