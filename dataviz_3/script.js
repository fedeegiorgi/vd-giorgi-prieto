d3.csv('astronautas.csv', d3.autoType).then(data => {
  // Agrupar los datos por género y año de misión
  const dataAgrupadaPorGeneroYAnioDeMision = d3.group(data, d => d.genero, d => d.anio_mision);

  // Calcular el total de horas de misión para cada combinación de género y año de misión
  const dataTotalesPorGeneroYAnioDeMision = Array.from(dataAgrupadaPorGeneroYAnioDeMision, ([genero, anios]) => ({
    genero: genero,
    anios: Array.from(anios, ([anio_mision, misiones]) => ({
      anio_mision: anio_mision,
      mision_hs: d3.sum(misiones, d => d.mision_hs)
    })).sort((a, b) => a.anio_mision - b.anio_mision) // Ordenar por año ascendente
  }));

  // Crear un gráfico de líneas con los datos agrupados
  const chart = Plot.plot({
    marks: [
      Plot.line(dataTotalesPorGeneroYAnioDeMision.flatMap(d => d.anios.map(v => ({
        genero: d.genero,
        anio_mision: v.anio_mision,
        mision_hs: v.mision_hs
      }))), {
        x: 'anio_mision',
        y: 'mision_hs',
        stroke: d => d.genero === 'masculino' ? 'blue' : 'pink',
        curve: d3.curveLinear // Interpolación lineal
      }),
      Plot.circle(dataTotalesPorGeneroYAnioDeMision.flatMap(d => d.anios.map(v => ({
        genero: d.genero,
        anio_mision: v.anio_mision,
        mision_hs: v.mision_hs
      }))), {
        x: 'anio_mision',
        y: 'mision_hs',
        stroke: 'black',
        strokeWidth: 1,
        fill: d => d.genero === 'masculino' ? 'blue' : 'pink',
        r: 4 // radio del círculo
      })
    ],
    x: {
      tickFormat: 'd',
      label: 'Año de la misión'
    },
    y: {
      label: 'Horas totales de la misión'
    },
  });
  
  // Agregar el gráfico al DOM
  d3.select('#chart').append(() => chart);
})
.catch(error => {
  // Manejar cualquier error que pueda ocurrir
  console.error(error);
  d3.select('#chart').text('Error al cargar los datos.');
});





/*
d3.csv('astronautas.csv', d3.autoType).then(data => {
  // Agrupar los datos por género y año de misión
  const dataAgrupadaPorGeneroYAnioDeMision = d3.group(data, d => d.genero, d => d.anio_mision);

  // Calcular el total de horas de misión para cada combinación de género y año de misión
  const dataTotalesPorGeneroYAnioDeMision = Array.from(dataAgrupadaPorGeneroYAnioDeMision, ([genero, anios]) => ({
    genero: genero,
    anios: Array.from(anios, ([anio_mision, misiones]) => ({
      anio_mision: anio_mision,
      mision_hs: d3.sum(misiones, d => d.mision_hs)
    }))
  }));

  // Crear un gráfico de líneas con los datos agrupados
  const chart = Plot.plot({
    marks: [
      Plot.line(dataTotalesPorGeneroYAnioDeMision.flatMap(d => d.anios.map(v => ({
        genero: d.genero,
        anio_mision: v.anio_mision,
        mision_hs: v.mision_hs
      }))), {
        x: 'anio_mision',
        y: 'mision_hs',
        stroke: d => d.genero === 'masculino' ? 'blue' : 'pink'
      })
    ],
    x: {
      tickFormat: 'd'
    },
    y: {
      label: 'Horas de misión'
    }
  });
  
  // Agregar el gráfico al DOM
  d3.select('#chart').append(() => chart);
})
.catch(error => {
  // Manejar cualquier error que pueda ocurrir
  console.error(error);
  d3.select('#chart').text('Error al cargar los datos.');
});
*/


















/*
d3.csv('astronautas.csv', d3.autoType).then(data => {
  let totals = {};

  // Recorremos cada fila de datos y agregamos los valores de mision_hs por genero y anio_mision
  data.forEach(row => {
    let key = row.genero + '_' + row.anio_mision;
    console.log(key, row.mision_hs);
    if (!totals[key]) {
      totals[key] = {genero: row.genero, anio_mision: row.anio_mision, mision_hs: row.mision_hs};
    } else {
      totals[key].mision_hs += row.mision_hs;
    }
  });
  let chart = Plot.plot({
    marks: [
      Plot.line(totals, {
        x: 'anio_mision',
        y: 'mision_hs',
        z: 'genero',
        stroke: 'genero',
      }),
    ],
    x: {
      // https://github.com/observablehq/plot#formats
      tickFormat: 'd',
    },
  })
    // Código para graficar
  d3.select('#chart').append(() => chart)
});
*/










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
/*
  let countByYearGenderHours = {};
  data.forEach(function(d) {
    var year = d.anio_mision;
    var gender = d.genero;
    var hours = d.mision_hs;
    countByYearGenderHours[year] = countByYearGenderHours[year] || {masculino: 0, femenino: 0};
    countByYearGenderHours[year][gender]+= hours;
  });
*/

/*
d3.csv('astronautas.csv', d3.autoType).then(data => {
  let country_data = d3.group(data, d => d.anio_mision)
  let country = []
  country_data.forEach((value, key) => {
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
      Plot.dot(country, {
        x: 'totalmision', 
        y: 'totaleva',
        stroke: dotColor,
        z: 'key'
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