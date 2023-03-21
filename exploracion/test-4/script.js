d3.csv('astronautas.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart =   Plot.plot({
    marks: [
      Plot.barY(data, {
        x: 'anio_mision',
        y: 'cantidad_astronautas_anio', // No se calcular esto
        fill: 'genero',
      }),
    ],
    marginLeft: 70,
    width: 300,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
