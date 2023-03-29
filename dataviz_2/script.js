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
    countData.push({x: nacionalidad, y0: 0, y1: femeninoCount, gender: 'Femenino'});
    countData.push({x: nacionalidad, y0: femeninoCount, y1: totalCount, gender: 'Masculino'});
  });

  let chart = Plot.plot({
    marks: [
      Plot.barY(countData, {
        x: 'x',
        y: d => d.y1 - d.y0,
        y0: 'y0',
        fill: 'gender',
        stroke: 'black',
      }),
    ],
    x: {
      label: null,
    },
    y: {
      label: "Astronautas",
    },
    height: 500,
    width: 1000,
    margin: 30,
    color: {
      range: ['#e59892', '#4773aa'],
      legend: false,
    },
  });

  d3.select('#chart').append(() => chart);
});