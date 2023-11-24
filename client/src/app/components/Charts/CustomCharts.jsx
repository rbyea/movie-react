import React from "react";
import Chart from "react-apexcharts";

const CustomCharts = (props) => {
  const options = {
    series: [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }],
    chart: { type: "bar", height: 380 },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: { position: "bottom" }
      }
    },
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7"
    ],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: { colors: ["#fff"] },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ": " + val;
      },
      offsetX: 0,
      dropShadow: { enabled: true }
    },
    stroke: { width: 1, colors: ["#fff"] },
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "India"
      ]
    },
    yaxis: { labels: { show: false } },
    tooltip: {
      theme: "dark",
      x: { show: false },
      y: {
        title: {
          formatter: function () {
            return "";
          }
        }
      }
    }
  };

  return (
    <>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={350}
      />
    </>
  );
};

export default CustomCharts;
