d3.csv('astronautas.csv', d3.autoType).then(data => {

    data = data.filter(d => d.nacionalidad === 'Canada')
    
    let females = data.filter(d => d.genero === 'femenino').length
    let males = data.filter(d => d.genero === 'masculino').length
    let total = females + males
    let female_percentage = females / total * 100
    let male_percentage = males / total * 100
    
    let chart = Plot.plot({
      marks: [
        Plot.barY([{
          gender: 'Femenino',
          percentage: female_percentage
        },{
          gender: 'Masculino',
          percentage: male_percentage
        }], {
          x: 'gender',
          y: 'percentage',
          fill: d => d.gender === 'Femenino' ? '#e59892' : '#4773aa'
        }),
        Plot.text([{
            gender: 'Femenino',
            percentage: female_percentage
          },{
            gender: 'Masculino',
            percentage: male_percentage
          }], {
            x: 'gender',
            y: d => d.percentage + 2,
            dx: -1,
            text: d => `${d.percentage.toFixed(0)}%`,
            fontSize: 14,
          })
        ],
      x: {
        label: null
      },
      y: {
        label: null,
        axis: false,
      },
      height: 500,
      width: 200,
      margin: 30,
    })
  
    d3.select('#chart').append(() => chart)
    document.documentElement.style.setProperty('--female-percentage', `${female_percentage}%`);
    document.documentElement.style.setProperty('--male-percentage', `${male_percentage}%`);
    document.querySelector('#female-percentage').textContent = `${female_percentage.toFixed(0)}%`;
    document.querySelector('#male-percentage').textContent = `${male_percentage.toFixed(0)}%`;
  })