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
      return '#dd361c'
    } else if (d.country === 'U.S.S.R/Rusia') {
      return '#02bfe7'
    } else {
      return '#ffebd1'
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
      Plot.text(country_ratios, {
        x: 'country', 
        y: 'ratio',
        text: 'ratio',
        fill: d => (d.ratio != 0 ? '#f9e0de': 'transparent'),
        dy: -32
    }),
  ],
    x: {
      label: null,
    },
    y: {
      label: null,
      domain: [-0.005, max_ratio + 0.005],
      axis: false
    },
    height: 500,
    width: 1000,
    margin: 30,
  })

  d3.select('#chart').append(() => chart)
})
