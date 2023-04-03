d3.csv('astronautas.csv', d3.autoType).then(data => {
  console.log(data);

  let countBynacionalidad = {};
  data.forEach(function(d) {
    var nacionalidad = d.nacionalidad;
    countBynacionalidad[nacionalidad] = countBynacionalidad[nacionalidad] || 0;
    countBynacionalidad[nacionalidad]++;
  });

  let countBynacionalidadAndGender = {};
  data.forEach(function(d) {
    var nacionalidad = d.nacionalidad;
    var gender = d.genero;
    countBynacionalidadAndGender[nacionalidad] = countBynacionalidadAndGender[nacionalidad] || {masculino: 0, femenino: 0};
    countBynacionalidadAndGender[nacionalidad][gender]++;
  });

  let countData = [];
  Object.entries(countBynacionalidadAndGender).forEach(([nacionalidad, genderCounts]) => {
    let totalCount = countBynacionalidad[nacionalidad];
    let femeninoCount = genderCounts.femenino;
    countData.push({y: nacionalidad, x0: 0, x1: femeninoCount, gender: 'Femenino'});
    countData.push({y: nacionalidad, x0: femeninoCount, x1: totalCount, gender: 'Masculino'});
  });

  let chart = Plot.plot({
    marks: [
      Plot.barX(countData, {
        y: 'y',
        x: d => d.x1 - d.x0,
        x0: 'x0',
        fill: 'gender',
        stroke: 'black',
      }),
      Plot.text(countData.filter(d => d.gender === 'Masculino'), {
        x: d => d.x1 + 1,
        y: d => d.y,
        text: d => d.x1,
        textAlign: 'left',
        fill: '#ffffff',
        fontSize: 14,
        fontWeight: 500,
      }),
    ],
    y: {
      label: null,
      domain: ["EE.UU.", "Rusia", "China", "Japon", "Italia", "Reino Unido", "Alemania", "Canada", "Dinamarca", "Francia", "Paises Bajos", "EAU", "Kazajistan"],
    },
    x: {
      label: null,
      axis: false,
    },
    height: 700,
    width: 1000,
    margin: 70,
    color: {
      range: ['#e59892', '#4773aa'],
      legend: false,
    },
  });

  chart.addEventListener('click', function(event) {
    if (event.target.tagName === 'text') {
      let label = event.target.textContent.trim();
      let url = `${label}.html`;
      window.location.href = url;
    }
  });

  d3.select('#chart').append(() => chart);
});
