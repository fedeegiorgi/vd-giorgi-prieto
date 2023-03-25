d3.csv('astronautas.csv', d3.autoType).then(data => {
  console.log(data);

  let countByYear = {};
  data.forEach(function(d) {
    var year = d.anio_mision;
    countByYear[year] = countByYear[year] || 0;
    countByYear[year]++;
  });

  let countByYearAndGender = {};
  data.forEach(function(d) {
    var year = d.anio_mision;
    var gender = d.genero;
    countByYearAndGender[year] = countByYearAndGender[year] || {masculino: 0, femenino: 0};
    countByYearAndGender[year][gender]++;
  });

  let countData = [];
  Object.entries(countByYearAndGender).forEach(([year, genderCounts]) => {
    let totalCount = countByYear[year];
    let femeninoCount = genderCounts.femenino;
    countData.push({x: year, y0: 0, y1: femeninoCount, gender: 'Femenino'});
    countData.push({x: year, y0: femeninoCount, y1: totalCount, gender: 'Masculino'});
  });

  let chart = Plot.plot({
    marks: [
      Plot.barY(countData, {
        x: 'x',
        y: d => d.y1 - d.y0,
        y0: 'y0',
        fill: 'gender',
        stroke: 'black',
        title: d => d.gender === 'Femenino' ? d.y1 - d.y0 : '',
        tooltip: d => d.gender === 'Femenino' ? d.y1 - d.y0 : '',
      }),
    ],
    x: {
      label: "Año",
    },
    y: {
      label: "Astronautas",
    },
    height: 500,
    width: 800,
    margin: 30,
    color: {
      range: ['#FF69b4', '#03fc62'],
      legend: true,
    },
    legend: {
      fill: ['pink', 'blue'],
      title: 'Genero',
    },
  });

  d3.select('#chart').append(() => chart);
});