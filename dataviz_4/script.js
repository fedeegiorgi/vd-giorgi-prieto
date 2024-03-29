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
      Plot.text(countData, {
        x: d => d.x1 - (d.x1 - d.x0) / 2,
        y: 'y',
        text: d => (d.x1 - d.x0) !== 0 ? `${d.x1 - d.x0}` : null,
        dy: '0.5',
        font: 'sans-serif',
        fontSize: 12,
        fontWeight: "bold",
        applied: {
          align: 'center',
        },
      }),
      Plot.text([{ y: "comandante", x: -10, text: "¡No hay comandantes ni pilotos mujeres!" }], {
        x: 62,
        y: d => d.y,
        dy: 40,
        text: d => d.text,
        font: 'sans-serif',
        fontSize: 15,
        fontWeight: 'bold',
        applied: {
          align: 'right',
        },
      })
    ],
    y: {
      label: null,
      domain: ["ingeniero aeroespacial", "especialista aeroespacial", "comandante", "piloto"]
    },
    x: {
      label: null,
      ticks: 0,
    },
    height: 600,
    width: 1200,
    margin: 150,
    color: {
      range: ['#e59892', '#4773aa'],
      legend: false,
    },
  });
  
  d3.select('#chart').append(() => chart);
  

  d3.select('#chart').append(() => chart);
});

