d3.csv('astronautas.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    width: 1200,
    height: 400,
    margin: 80,
    inset: 10,
    marks: [
      Plot.barY(data, {
        x: 'anio_mision', 
        y: 'edad_mision_promedio_x_anio', // No se calcular esto
      }),
    ],
    color:{
      range : ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E", "#577590", "#277DA1", "#3B3B98", "#5E548E", "#8D5B4C", "#333333"],
    }
  })

  d3.select('#chart').append(() => chart)
})