// ─────────────────────── DATA ───────────────────────
const WHITE_HAT = [
  { name:"Australia",      color:"#d62728",
    v:[{y:2014,v:22.740},{y:2015,v:22.762},{y:2016,v:22.740},{y:2017,v:22.749},
       {y:2018,v:22.447},{y:2019,v:21.869},{y:2020,v:20.912},{y:2021,v:20.402},
       {y:2022,v:19.985},{y:2023,v:19.929}]
  },
  { name:"Canada",         color:"#ff7f0e",
    v:[{y:2014,v:20.977},{y:2015,v:20.634},{y:2016,v:19.941},{y:2017,v:20.039},
       {y:2018,v:20.031},{y:2019,v:19.779},{y:2020,v:17.874},{y:2021,v:18.036},
       {y:2022,v:18.029},{y:2023,v:17.657}]
  },
  { name:"United States",  color:"#9467bd",
    v:[{y:2014,v:21.373},{y:2015,v:20.655},{y:2016,v:19.989},{y:2017,v:19.720},
       {y:2018,v:20.154},{y:2019,v:19.510},{y:2020,v:17.682},{y:2021,v:18.605},
       {y:2022,v:18.573}]
  },
  { name:"Germany",        color:"#1f77b4",
    v:[{y:2014,v:10.980},{y:2015,v:10.987},{y:2016,v:10.842},{y:2017,v:10.616},
       {y:2018,v:10.230},{y:2019,v:9.551},{y:2020,v:8.765},{y:2021,v:9.097},
       {y:2022,v:8.905},{y:2023,v:7.948}]
  },
  { name:"Japan",          color:"#8c564b",
    v:[{y:2014,v:10.528},{y:2015,v:10.239},{y:2016,v:10.101},{y:2017,v:9.992},
       {y:2018,v:9.639},{y:2019,v:9.373},{y:2020,v:8.895},{y:2021,v:9.108},
       {y:2022,v:8.913},{y:2023,v:8.596}]
  },
  { name:"United Kingdom", color:"#2ca02c",
    v:[{y:2014,v:8.215},{y:2015,v:7.838},{y:2016,v:7.367},{y:2017,v:7.135},
       {y:2018,v:6.977},{y:2019,v:6.692},{y:2020,v:6.078},{y:2021,v:6.266},
       {y:2022,v:5.955},{y:2023,v:5.614}]
  },
  { name:"France",         color:"#7f7f7f",
    v:[{y:2014,v:7.047},{y:2015,v:7.075},{y:2016,v:7.094},{y:2017,v:7.110},
       {y:2018,v:6.791},{y:2019,v:6.622},{y:2020,v:5.997},{y:2021,v:6.340},
       {y:2022,v:6.074},{y:2023,v:5.653}]
  },
  { name:"Sweden",         color:"#17becf",
    v:[{y:2014,v:5.516},{y:2015,v:5.437},{y:2016,v:5.361},{y:2017,v:5.199},
       {y:2018,v:5.055},{y:2019,v:4.883},{y:2020,v:4.441},{y:2021,v:4.582},
       {y:2022,v:4.215},{y:2023,v:4.207}]
  }
];

// Cherry-picked European countries, 2019-2023 only (black hat)
const BLACK_HAT = [
  { name:"Luxembourg",  color:"#145a1f",
    v:[{y:2019,v:17.338},{y:2020,v:14.373},{y:2021,v:14.688},{y:2022,v:12.573},{y:2023,v:11.681}]
  },
  { name:"Estonia",     color:"#1e7a31",
    v:[{y:2019,v:10.938},{y:2020,v:8.526},{y:2021,v:9.437},{y:2022,v:10.480},{y:2023,v:7.945}]
  },
  { name:"Netherlands", color:"#2d9e46",
    v:[{y:2019,v:10.327},{y:2020,v:9.330},{y:2021,v:9.402},{y:2022,v:8.551},{y:2023,v:7.860}]
  },
  { name:"Germany",     color:"#44b85f",
    v:[{y:2019,v:9.551},{y:2020,v:8.765},{y:2021,v:9.097},{y:2022,v:8.905},{y:2023,v:7.948}]
  },
  { name:"Austria",     color:"#6dcf84",
    v:[{y:2019,v:9.080},{y:2020,v:8.371},{y:2021,v:8.707},{y:2022,v:8.110},{y:2023,v:7.524}]
  },
  { name:"Denmark",     color:"#98d9aa",
    v:[{y:2019,v:7.871},{y:2020,v:7.401},{y:2021,v:7.524},{y:2022,v:7.199},{y:2023,v:6.558}]
  }
];

// ─────────────────────── TOOLTIP ───────────────────────
const tip = document.getElementById("tooltip");
function showTip(evt, html) {
  tip.innerHTML = html;
  tip.style.opacity = 1;
  moveTip(evt);
}
function moveTip(evt) {
  tip.style.left = (evt.clientX + 14) + "px";
  tip.style.top  = (evt.clientY - 28) + "px";
}
function hideTip() { tip.style.opacity = 0; }

// ─────────────────────── WHITE HAT — LINE CHART ───────────────────────
(function drawWhiteHatLine() {
  const ml=60, mr=115, mt=60, mb=50;
  const W = 660, H = 420;
  const w = W - ml - mr, h = H - mt - mb;

  const svg = d3.select("#wh-line")
    .attr("width", W).attr("height", H);

  const g = svg.append("g").attr("transform",`translate(${ml},${mt})`);

  const xSc = d3.scaleLinear().domain([2014,2023]).range([0,w]);
  const ySc = d3.scaleLinear().domain([0,25]).range([h,0]);

  // Gridlines
  g.append("g").attr("class","grid")
    .call(d3.axisLeft(ySc).tickSize(-w).tickFormat(""))
    .call(gg => gg.selectAll("line").style("stroke","#eaeaea").style("stroke-dasharray","3,3"))
    .call(gg => gg.select(".domain").remove());

  // X axis
  g.append("g").attr("transform",`translate(0,${h})`)
    .call(d3.axisBottom(xSc).ticks(9).tickFormat(d3.format("d")))
    .call(gg => gg.select(".domain").style("stroke","#ccc"))
    .call(gg => gg.selectAll("text").style("font-size","11px"));

  // Y axis
  g.append("g")
    .call(d3.axisLeft(ySc).ticks(6))
    .call(gg => gg.select(".domain").style("stroke","#ccc"))
    .call(gg => gg.selectAll("text").style("font-size","11px"));

  // Y label
  g.append("text")
    .attr("transform","rotate(-90)")
    .attr("y",-48).attr("x",-h/2)
    .attr("text-anchor","middle")
    .style("font-size","11px").style("fill","#666")
    .text("Tonnes CO₂-equivalent per person");

  // X label
  g.append("text")
    .attr("x",w/2).attr("y",h+38)
    .attr("text-anchor","middle")
    .style("font-size","11px").style("fill","#666")
    .text("Year");

  // COVID annotation band
  g.append("rect")
    .attr("x",xSc(2019.5)).attr("y",0)
    .attr("width",xSc(2020.5)-xSc(2019.5)).attr("height",h)
    .attr("fill","#fef3cd").attr("opacity",0.6);
  g.append("text")
    .attr("x",(xSc(2019.5)+xSc(2020.5))/2).attr("y",10)
    .attr("text-anchor","middle")
    .style("font-size","9px").style("fill","#c8890a")
    .text("COVID-19");

  // Line + dots
  const lineGen = d3.line().x(d=>xSc(d.y)).y(d=>ySc(d.v)).curve(d3.curveMonotoneX);

  WHITE_HAT.forEach(ctry => {
    g.append("path")
      .datum(ctry.v)
      .attr("fill","none")
      .attr("stroke",ctry.color)
      .attr("stroke-width",2.2)
      .attr("d",lineGen);

    // Dots (for hover)
    g.selectAll(null).data(ctry.v).enter()
      .append("circle")
      .attr("cx",d=>xSc(d.y)).attr("cy",d=>ySc(d.v))
      .attr("r",4)
      .attr("fill",ctry.color).attr("stroke","#fff").attr("stroke-width",1.2)
      .style("cursor","pointer")
      .on("mouseover",(evt,d)=>showTip(evt,
        `<strong>${ctry.name}</strong><br>${d.y}: ${d.v.toFixed(2)} t CO₂e/person`))
      .on("mousemove",moveTip)
      .on("mouseout",hideTip);

    // End-of-line label
    const last = ctry.v[ctry.v.length-1];
    g.append("text")
      .attr("x",xSc(last.y)+5).attr("y",ySc(last.v))
      .attr("dy","0.35em")
      .style("font-size","11px").style("fill",ctry.color).style("font-weight","600")
      .text(ctry.name);
  });

  // Chart title
  svg.append("text").attr("x",ml+w/2).attr("y",18)
    .attr("text-anchor","middle")
    .style("font-size","13.5px").style("font-weight","bold").style("fill","#222")
    .text("Annual Per-Capita GHG Emissions, Selected Countries (2014–2023)");
  svg.append("text").attr("x",ml+w/2).attr("y",35)
    .attr("text-anchor","middle")
    .style("font-size","10px").style("fill","#999")
    .text("Total GHG excl. LULUCF · Source: OECD GHG Inventories (2024)");
})();

// ─────────────────────── WHITE HAT — CUMULATIVE BAR ───────────────────────
(function drawWhiteHatBar() {
  const data = WHITE_HAT.map(c => ({
    name: c.name,
    color: c.color,
    cum: d3.sum(c.v, d=>d.v),
    yrs: c.v.length
  })).sort((a,b)=>b.cum-a.cum);

  const ml=108, mr=50, mt=52, mb=28;
  const W = 340, H = 370;
  const w = W-ml-mr, h = H-mt-mb;

  const svg = d3.select("#wh-bar").attr("width",W).attr("height",H);
  const g = svg.append("g").attr("transform",`translate(${ml},${mt})`);

  const xSc = d3.scaleLinear().domain([0,230]).range([0,w]);
  const ySc = d3.scaleBand().domain(data.map(d=>d.name)).range([0,h]).padding(0.28);

  // Grid
  g.append("g")
    .call(d3.axisTop(xSc).ticks(4).tickSize(-h).tickFormat(""))
    .call(gg=>gg.selectAll("line").style("stroke","#eaeaea").style("stroke-dasharray","3,3"))
    .call(gg=>gg.select(".domain").remove());

  // Top x-axis
  g.append("g").call(d3.axisTop(xSc).ticks(4))
    .call(gg=>gg.select(".domain").style("stroke","#ccc"))
    .call(gg=>gg.selectAll("text").style("font-size","10px"));

  // Left y-axis
  g.append("g").call(d3.axisLeft(ySc))
    .call(gg=>gg.select(".domain").style("stroke","#ccc"))
    .call(gg=>gg.selectAll("text").style("font-size","11px").style("fill",(_,i)=>data[i].color));

  // Bars
  g.selectAll(".bar").data(data).enter()
    .append("rect")
    .attr("y",d=>ySc(d.name))
    .attr("width",d=>xSc(d.cum))
    .attr("height",ySc.bandwidth())
    .attr("fill",d=>d.color).attr("opacity",0.82)
    .style("cursor","pointer")
    .on("mouseover",(evt,d)=>showTip(evt,
      `<strong>${d.name}</strong><br>Cumulative: ${d.cum.toFixed(1)} t CO₂e/person<br>(${d.yrs} years)` +
      (d.yrs<10 ? "<br><em>*data through 2022</em>":"")))
    .on("mousemove",moveTip)
    .on("mouseout",hideTip);

  // Value labels
  g.selectAll(".vlbl").data(data).enter()
    .append("text")
    .attr("x",d=>xSc(d.cum)+3).attr("y",d=>ySc(d.name)+ySc.bandwidth()/2)
    .attr("dy","0.35em")
    .style("font-size","10px").style("fill","#444")
    .text(d=>d.cum.toFixed(0)+(d.yrs<10?"*":""));

  // Titles
  svg.append("text").attr("x",ml+w/2).attr("y",14)
    .attr("text-anchor","middle")
    .style("font-size","12.5px").style("font-weight","bold").style("fill","#222")
    .text("Cumulative Per-Capita Emissions");
  svg.append("text").attr("x",ml+w/2).attr("y",28)
    .attr("text-anchor","middle")
    .style("font-size","9.5px").style("fill","#999")
    .text("Sum 2014–2023 (t CO₂e/person) · *US thru 2022");
  // X label
  svg.append("text").attr("x",ml+w/2).attr("y",H-6)
    .attr("text-anchor","middle")
    .style("font-size","9.5px").style("fill","#999")
    .text("Tonnes CO₂e per person (cumulative)");
})();

// ─────────────────────── BLACK HAT CHART (paired grouped horizontal bar) ───────────────────────
(function drawBlackHat() {
  // Only 2019 and 2023 endpoints — hides the volatile COVID middle years
  const rows = [
    { name:"Luxembourg",  v19:17.338, v23:11.681 },
    { name:"Estonia",     v19:10.938, v23:7.945  },
    { name:"Netherlands", v19:10.327, v23:7.860  },
    { name:"Germany",     v19:9.551,  v23:7.948  },
    { name:"Austria",     v19:9.080,  v23:7.524  },
    { name:"Denmark",     v19:7.871,  v23:6.558  },
  ];
  // Precompute true % reductions (used in badges — accurate numbers, exaggerated visuals)
  rows.forEach(d => { d.pct = Math.round((d.v19 - d.v23) / d.v19 * 100); });

  const ml=115, mr=84, mt=80, mb=78;
  const W = 760, H = 498;
  const w = W-ml-mr, h = H-mt-mb;

  const svg = d3.select("#bh-chart").attr("width",W).attr("height",H);
  const g = svg.append("g").attr("transform",`translate(${ml},${mt})`);

  // *** BLACK HAT TECHNIQUE #1: x-axis starts at 5, NOT 0
  // For bar charts this is especially deceptive — bars must start from 0 by convention
  const xMin = 5;
  const xSc = d3.scaleLinear().domain([xMin, 18.5]).range([0, w]);

  const ySc = d3.scaleBand()
    .domain(rows.map(d => d.name))
    .range([0, h]).padding(0.32);

  const yInner = d3.scaleBand()
    .domain(["2019","2023"])
    .range([0, ySc.bandwidth()]).padding(0.1);

  // Light green grid (environmental authority feel)
  g.append("g")
    .call(d3.axisBottom(xSc).tickSize(-h).tickFormat(""))
    .attr("transform",`translate(0,${h})`)
    .call(gg=>gg.selectAll("line").style("stroke","#e0f2e3").style("stroke-dasharray","3,3"))
    .call(gg=>gg.select(".domain").remove());

  // X axis at bottom (extra tick padding keeps numeric labels clear of the legend row)
  g.append("g").attr("transform",`translate(0,${h})`)
    .call(d3.axisBottom(xSc).ticks(6).tickPadding(10))
    .call(gg=>gg.select(".domain").style("stroke","#bbb"))
    .call(gg=>gg.selectAll("text").style("font-size","11px"));

  // Y axis (country names)
  g.append("g")
    .call(d3.axisLeft(ySc))
    .call(gg=>gg.select(".domain").style("stroke","#bbb"))
    .call(gg=>gg.selectAll("text").style("font-size","12px").style("font-weight","500"));

  // X axis title — below tick labels, with legend row between ticks and title
  g.append("text").attr("x",w/2).attr("y",h+68)
    .attr("text-anchor","middle")
    .style("font-size","11px").style("fill","#555")
    .text("Tonnes CO₂-equivalent per person");

  // Draw paired bars for each country
  rows.forEach(d => {
    const yBase = ySc(d.name);

    // 2019 bar (muted steel blue)
    g.append("rect")
      .attr("y", yBase + yInner("2019"))
      .attr("x", 0)
      .attr("width", xSc(d.v19))   // xSc(v) already encodes offset from xMin
      .attr("height", yInner.bandwidth())
      .attr("fill","#5a82a6").attr("opacity",0.72)
      .style("cursor","pointer")
      .on("mouseover",(evt)=>showTip(evt,
        `<strong>${d.name} (2019)</strong><br>${d.v19.toFixed(2)} t CO₂e/person<br><em>(pre-pandemic)</em>`))
      .on("mousemove",moveTip).on("mouseout",hideTip);

    // 2023 bar (forest green)
    g.append("rect")
      .attr("y", yBase + yInner("2023"))
      .attr("x", 0)
      .attr("width", xSc(d.v23))
      .attr("height", yInner.bandwidth())
      .attr("fill","#1e7a31").attr("opacity",0.88)
      .style("cursor","pointer")
      .on("mouseover",(evt)=>showTip(evt,
        `<strong>${d.name} (2023)</strong><br>${d.v23.toFixed(2)} t CO₂e/person`))
      .on("mousemove",moveTip).on("mouseout",hideTip);

    // Value labels at bar ends
    g.append("text")
      .attr("x", xSc(d.v19)+3).attr("y", yBase+yInner("2019")+yInner.bandwidth()/2)
      .attr("dy","0.35em").style("font-size","10px").style("fill","#4a6a88")
      .text(d.v19.toFixed(1));
    g.append("text")
      .attr("x", xSc(d.v23)+3).attr("y", yBase+yInner("2023")+yInner.bandwidth()/2)
      .attr("dy","0.35em").style("font-size","10px").style("fill","#155225")
      .text(d.v23.toFixed(1));

    // *** BLACK HAT TECHNIQUE #3: reduction "badges" — accurate % but visual bars exaggerate them
    // Serves as a false authority anchor; readers trust the number but perceive the bar as even bigger
    g.append("text")
      .attr("x", w+6).attr("y", yBase+ySc.bandwidth()/2)
      .attr("dy","0.35em")
      .style("font-size","13px").style("fill","#1a5c24").style("font-weight","700")
      .text(`↓ ${d.pct}%`);
  });

  // Legend (single row, side-by-side under tick labels — avoids center clash with axis title)
  const legY = h + 30;
  const legLeft = 0;
  const legGap = 24;
  g.append("rect").attr("x",legLeft).attr("y",legY).attr("width",12).attr("height",12)
    .attr("fill","#5a82a6").attr("opacity",0.72);
  g.append("text").attr("x",legLeft+18).attr("y",legY+10)
    .attr("text-anchor","start")
    .style("font-size","10.5px").style("fill","#444").text("2019 (pre-pandemic baseline)");
  const leg2019W = 168;
  g.append("rect").attr("x",legLeft+leg2019W+legGap).attr("y",legY).attr("width",12).attr("height",12)
    .attr("fill","#1e7a31").attr("opacity",0.88);
  g.append("text").attr("x",legLeft+leg2019W+legGap+18).attr("y",legY+10)
    .attr("text-anchor","start")
    .style("font-size","10.5px").style("fill","#444").text("2023");

  // *** BLACK HAT: misleading title + "pre-pandemic baseline" framing
  svg.append("text").attr("x",ml+w/2).attr("y",22)
    .attr("text-anchor","middle")
    .style("font-size","14.5px").style("font-weight","bold").style("fill","#1a3d1f")
    .text("European Climate Leaders: Before & After (2019 vs. 2023)");
  svg.append("text").attr("x",ml+w/2).attr("y",41)
    .attr("text-anchor","middle")
    .style("font-size","10.5px").style("fill","#3a6e41")
    .text("All nations met or exceeded the 15% pre-pandemic reduction target, a historic milestone");
  svg.append("text").attr("x",ml+w/2).attr("y",57)
    .attr("text-anchor","middle")
    .style("font-size","9.5px").style("fill","#999")
    .text("Source: OECD GHG Emissions Inventories (2024)");

  // Right-side column header for badges
  svg.append("text").attr("x",ml+w+6).attr("y",mt-12)
    .style("font-size","10px").style("fill","#888").style("font-style","italic")
    .text("Reduction");
})();
