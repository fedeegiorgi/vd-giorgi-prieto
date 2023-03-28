d3.csv('astronautas.csv', d3.autoType).then(data => {
  
  let country_data = d3.group(data, d => d.nacionalidad)
  let country = []
  country_data.forEach((value, key) => {
    let total_mision = 0
    let total_eva = 0
    let astronautas = 0
    value.forEach(d => {
      total_mision += d.mision_hs
      total_eva += d.eva_mision_hs
      astronautas ++
    })
    country.push({country: key, totalmision: total_mision, totaleva: total_eva, astronautas: astronautas})
  })

  let dotColor = d => {
    if (d.country === 'EE.UU.') {
      return 'red'
    } else if (d.country === 'U.S.S.R/Rusia') {
      return 'blue'
    } else {
      return 'black'
    }
  }

  let chart = Plot.plot({
    marks: [
      Plot.dot(country, {
        x: 'totalmision', 
        y: 'totaleva',
        fill: dotColor,
        r: 'astronautas'
      }),
    ],
    x: {
      label: 'Horas misión',
    },
    y: {
      label: 'Horas EVA',
    },
    height: 500,
    width: 1000,
    margin: 30,
  })

  d3.select('#chart').append(() => chart)
})