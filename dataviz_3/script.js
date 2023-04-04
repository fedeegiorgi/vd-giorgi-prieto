d3.csv('astronautas.csv', d3.autoType).then(data => {
  const combinaciones = [];
  const generos = ['masculino', 'femenino'];
  const anios = d3.range(d3.min(data, d => d.anio_mision), d3.max(data, d => d.anio_mision) + 1);
  for (const genero of generos) {
    for (const anio of anios) {
      combinaciones.push({
        genero: genero,
        anio_mision: anio,
        mision_hs: 0
      });
    }
  }

  for (const d of data) {
    const index = combinaciones.findIndex(c => c.genero === d.genero && c.anio_mision === d.anio_mision);
    combinaciones[index].mision_hs += d.mision_hs;
  }

  const dataPorGenero = d3.group(combinaciones, d => d.genero);

  for (const [genero, datos] of dataPorGenero) {
    datos.sort((a, b) => a.anio_mision - b.anio_mision);
  }

  const chart = Plot.plot({
    marks: [
      Plot.line(dataPorGenero.get('masculino'), {
        x: 'anio_mision',
        y: 'mision_hs',
        stroke: 'blue',
        curve: d3.curveLinear
      }),
      Plot.line(dataPorGenero.get('femenino'), {
        x: 'anio_mision',
        y: 'mision_hs',
        stroke: 'pink',
        curve: d3.curveLinear
      }),
      Plot.text(dataPorGenero.get('masculino'), {
        x: 'anio_mision',
        y: 'mision_hs',
        text: d => `${d.mision_hs.toLocaleString('es-ES', {maximumFractionDigits: 0, useGrouping: true})}`, // Agregar una
        fill: 'white',
        fontSize: 12,
        dy: -20
      }),
      Plot.text(dataPorGenero.get('femenino'), {
        x: 'anio_mision',
        y: 'mision_hs',
        text: d => `${d.mision_hs.toLocaleString('es-ES', {maximumFractionDigits: 0, useGrouping: true})}`, // Agregar una
        fill: 'white',
        fontSize: 12,
        dy: -20

      })
    ],
    x: {
      tickFormat: 'd',
      label: 'Año de la misión'
    },
    y: {
      label: '',
      axis: false
    },
    height: 630,
    width: 800,
    margin: 30,
  });
  d3.select('#chart').append(() => chart);
})