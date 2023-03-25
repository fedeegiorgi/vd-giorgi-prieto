d3.csv('astronautas.csv', d3.autoType).then(data => {
  console.log(data);

  let countByJob = {};
  data.forEach(function(d) {
    var job = d.ocupacion;
    countByJob[job] = countByJob[job] || 0;
    countByJob[job]++;
  });

  let countByJobAndGender = {};
  data.forEach(function(d) {
    var job = d.ocupacion;
    var gender = d.genero;
    countByJobAndGender[job] = countByJobAndGender[job] || {masculino: 0, femenino: 0};
    countByJobAndGender[job][gender]++;
  });

  let countData = [];
  Object.entries(countByJobAndGender).forEach(([job, genderCounts]) => {
    let totalCount = countByJob[job];
    let femeninoCount = genderCounts.femenino;
    countData.push({y: job, x0: 0, x1: femeninoCount, gender: 'Femenino'});
    countData.push({y: job, x0: femeninoCount, x1: totalCount, gender: 'Masculino'});
  });

  let chart = Plot.plot({
    marks: [
      Plot.barX(countData, {
        y: 'y',
        x: d => d.x1 - d.x0,
        x0: 'x0',
        fill: 'gender',
        stroke: 'black',
        title: d => d.gender === 'Femenino' ? d.x1 - d.x0 : '',
        tooltip: d => d.gender === 'Femenino' ? d.x1 - d.x0 : '',
        applied: {
          spacing: 0.2,
        },
      }),
    ],
    y: {
      label: "Trabajo",
    },
    x: {
      label: "Astronautas",
      ticks: 0,
    },
    height: 500,
    width: 800,
    margin: 50,
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