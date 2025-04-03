// Active Leads Chart
const activeLeadsOptions = {
  chart: {
    height: "auto",  // Make height dynamic
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#e8f5e9",
      gradientToColors: ["#e8f5e9"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,  // Decreased thickness
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0,
    },
  },
  series: [
    {
      name: "Active Leads",
      data: [6500, 6418, 6456, 6526, 6356, 6456],
      color: "#4caf50",
    },
  ],
  xaxis: {
    categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
}

if (document.getElementById("area-chart-active-leads") && typeof ApexCharts !== 'undefined') {
  const activeLeadsChart = new ApexCharts(document.getElementById("area-chart-active-leads"), activeLeadsOptions);
  activeLeadsChart.render();
}

// Total Leads Chart
const totalLeadsOptions = {
  chart: {
    height: "auto",  // Make height dynamic
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#ffebee",
      gradientToColors: ["#ffebee"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,  // Decreased thickness
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0,
    },
  },
  series: [
    {
      name: "Total Leads",
      data: [6500, 6418, 6456, 6526, 6356, 6456],
      color: "#f44336",
    },
  ],
  xaxis: {
    categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
}

if (document.getElementById("area-chart-total-leads") && typeof ApexCharts !== 'undefined') {
  const totalLeadsChart = new ApexCharts(document.getElementById("area-chart-total-leads"), totalLeadsOptions);
  totalLeadsChart.render();
}

// Callback Chart
const callbacksOptions = {
  chart: {
    height: "auto",  // Make height dynamic
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#fff3e0",
      gradientToColors: ["#fff3e0"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,  // Decreased thickness
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0,
    },
  },
  series: [
    {
      name: "Callbacks",
      data: [500, 418, 456, 526, 356, 456],
      color: "#ff9800",
    },
  ],
  xaxis: {
    categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
}

if (document.getElementById("area-chart-callbacks") && typeof ApexCharts !== 'undefined') {
  const callbacksChart = new ApexCharts(document.getElementById("area-chart-callbacks"), callbacksOptions);
  callbacksChart.render();
}

// New Web Leads Chart
const webleadsOptions = {
  chart: {
    height: "auto",  // Make height dynamic
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#e3f2fd",
      gradientToColors: ["#e3f2fd"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,  // Decreased thickness
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0,
    },
  },
  series: [
    {
      name: "New Web Leads",
      data: [6500, 6418, 6456, 6526, 6356, 6456],
      color: "#2196f3",
    },
  ],
  xaxis: {
    categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
}

if (document.getElementById("area-chart-web-leads") && typeof ApexCharts !== 'undefined') {
  const webleadsChart = new ApexCharts(document.getElementById("area-chart-web-leads"), webleadsOptions);
  webleadsChart.render();
}