d3.csv("astronautas.csv", d3.autoType).then((data) => {
  let chart = Plot.plot({
    marks: [
      Plot.barX(data, {
         x: "eva_mision_hs", 
         y: "nacionalidad", 
         fill: "nacionalidad"
         })
    ],
    width: 600,
    height: 400,
    margin: 80,
    inset: 10,
    nice: true,
    line: true,
    grid: true,
    zero: true,
    color:{
      range : ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D", "#43AA8B", "#4D908E", "#577590", "#277DA1", "#3B3B98", "#5E548E", "#8D5B4C", "#333333"],
    }
  });
  d3.select("#chart").append(() => chart);
});
