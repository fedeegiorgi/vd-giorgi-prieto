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
      countByYearAndGender[year] = countByYearAndGender[year] || {masculino: 0};
      countByYearAndGender[year][gender]++;
    });
  
    let countData = [];
    Object.entries(countByYearAndGender).forEach(([year, genderCounts]) => {
      //let totalCount = countByYear[year];
      let masculinoCount = genderCounts.masculino;
      //countData.push({x: year, y0: 0, y1: femeninoCount, gender: 'Femenino'});
      countData.push({x: year, y0: 0, y1: masculinoCount, gender: 'Masculino'});
    });
  
    let chart = Plot.plot({
      marks: [
        Plot.barY(countData, {
          x: 'x',
          y: d => d.y1 - d.y0,
          y0: 'y0',
          fill: 'gender',
          stroke: 'black',
          title: d => d.gender === 'Masculino' ? d.y1 - d.y0 : '',
          tooltip: d => d.gender === 'Masculino' ? d.y1 - d.y0 : '',
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
        range: ['#03fc62'],
        legend: true,
      },
      legend: {
        fill: ['blue'],
        title: 'Genero',
      },
    });
  
    d3.select('#chart').append(() => chart);
  });