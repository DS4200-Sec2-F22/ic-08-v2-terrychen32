const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// Let's do another example, with a scale 
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.left - MARGINS.right;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.top - MARGINS.bottom; 

const FRAME2 = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// read data and create plot
d3.csv("data/data.csv").then((data) => {

  // find max Y
  const MAX_Y2 = d3.max(data, (d) => { return parseInt(d.value); });
          // Note: data read from csv is a string, so you need to
          // cast it to a number if needed 
  
  // Define scale functions that maps our data values 
  // (domain) to pixel values (range)
  const Y_SCALE2 = d3.scaleLinear() 
                    .domain([0, (MAX_X2 + 10000)]) // add some padding  
                    .range([VIS_HEIGHT,0]);

  // Use X_SCALE to plot our points
  FRAME2.selectAll(".bar")  
      .data(data) // passed from .then  
      .enter()       
      .append("rect")  
        .attr("x", (d) => { return (d.category); }) 
        .attr("width", 20) 
        .attr("y", (d) => {return(Y_SCALE2(d.value));})
        .attr("height", (d) => {return }); 

  // Add an axis to the vis  
  FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE2).ticks(4)) 
          .attr("font-size", '20px'); 

}); 