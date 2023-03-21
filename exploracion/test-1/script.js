d3.csv('astronautas.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    marks: [
      Plot.dot(data, {
        x: 'edad_mision',
        y: 'mision_hs',
        stroke: 'genero',
      }),
      Plot.frame(),
    ],
    width: 640,
    height: 400,
    margin: 80,
    inset: 10,
    x: {
      label : "Edad al momento de la mision",
      labelOffset : 50,
    },
    y: {
      label : "Horas de mision",
      labelOffset: 10,
    },
    color: {
      range: ['#FF69b4', 'blue'],
    },
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})

