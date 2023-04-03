d3.csv('astronautas.csv', d3.autoType).then(data => {
  /*
  const sortedData = data.sort((a,b) => a.anio_mision > b.anio_mision ? 1 : -1)
  
  var datos_filtrados = data.map(function(d) {
    return {
      genero: d.genero,
      anio: d.anio_mision,
      horas: +d.mision_hs // convertir a número
    };
  });
  
  var datos_agrupados = d3.group(datos_filtrados, d => d.genero, d => d.anio);
  var resultados = [];
  datos_agrupados.forEach(function(valor, clave) {
    var genero = clave[0];
    var anio = clave[1];
    var total_horas = d3.sum(valor, function(d) { return d.mision_hs; });
    resultados.push({genero: genero, anio: anio, horas: total_horas});
  });
  
  console.log(resultados); // mostrar los resultados en la consola
  */

  let countByYearGenderHours = {};
  data.forEach(function(d) {
    var year = d.anio_mision;
    var gender = d.genero;
    var hours = d.mision_hs;
    countByYearGenderHours[year] = countByYearGenderHours[year] || {masculino: 0, femenino: 0};
    countByYearGenderHours[year][gender]+= hours;
  });


 
  let chart = Plot.plot({
    marks: [
      Plot.line(resultados, {
        x: 'year',
        y: 'horas',
        z: 'gender',
        stroke: 'gender',
      }),
    ],
    x: {
      // https://github.com/observablehq/plot#formats
      tickFormat: 'd',
    },
  })
  d3.select('#chart').append(() => chart)
})

/*
  let years = d3.group(data, d => d.anio_mision)
  let datos_totales = []
  years.forEach((value, key) => {
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
      Plot.line(resultados, {
        x: 'anio', 
        y: 'horas',
        //fill: dotColor,
        z: 'genero'
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
*/