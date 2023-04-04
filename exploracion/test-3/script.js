d3.csv('astronautas.csv', d3.autoType).then(data => {
  let chart = Plot.plot({
    marks: [
      Plot.barY(data, {
        x: 'genero',
        y: 'mision_hs',
        fill: 'genero',
        order: 'fill'
      })
    ],
    width: 600,
    height: 400,
    margin: 80,
    inset: 10,
    x: {
      label: 'Genero'
    },
    y: {
      label: 'Duración total de misiones (horas)'
    },
    color: {
        range: ['#FF69b4', 'blue'],
    }
  })
  d3.select('#chart').append(() => chart)
})
