d3.csv('astronautas.csv', d3.autoType).then(data => {
  
  let country_data = d3.group(data, d => d.nacionalidad)
  let country_ratios = []
  country_data.forEach((value, key) => {
    let females = 0
    let males = 0
    value.forEach(d => {
      if (d.genero === 'femenino') {
        females++
      } else if (d.genero === 'masculino') {
        males++
      }
    })
    let ratio = females / males
    let size = value.length
    country_ratios.push({country: key, ratio: ratio, size: size})
  })
  
  let max_ratio = d3.max(country_ratios, d => d.ratio)

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
      Plot.dot(country_ratios, {
        x: 'country', 
        y: 'ratio',
        fill: dotColor,
        r: 'size'
      }),
    ],
    x: {
      label: 'Pais',
    },
    y: {
      label: 'Ratio mujeres/hombres',
      domain: [-0.005, max_ratio + 0.005],
    },
    height: 500,
    width: 1000,
    margin: 30,
  })

  d3.select('#chart').append(() => chart)
})
