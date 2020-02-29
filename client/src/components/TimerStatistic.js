import React, { useState, useEffect } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";

import useFilterData from "../hooks/useFilterData";

function TimerStatistic({ data, filter }) {
  const [chartType, setChartType] = useState("bar");
  const [showChart, setShowChart] = useState(false);
  const chartData = useFilterData(data, filter);

  const optionsChart = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          if (data.datasets.length === 1) {
            return `${data.labels[tooltipItem.index]}: ${
              data.datasets[0].data[tooltipItem.index]
            }%`;
          } else {
            return `${data.datasets[tooltipItem.datasetIndex].label}: ${
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            }%`;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (
      filter === "" ||
      filter === "date" ||
      (filter.startsWith("days") &&
        document.body.getBoundingClientRect().width >= 576)
    ) {
      setShowChart(true);
    } else {
      setShowChart(false);
    }
  }, [filter]);

  if (!showChart || data.length === 0) return null;

  return (
    <section className="timer_statistic">
      {filter === "date" || filter === "" ? (
        <Doughnut data={chartData} options={optionsChart} />
      ) : filter.startsWith("days") ? (
        <React.Fragment>
          <select
            value={chartType}
            onChange={e => setChartType(e.target.value)}
            className="timer_statistic__select"
          >
            <option value="line">wykres liniowy</option>
            <option value="bar">wykres słupkowy</option>
          </select>
          {chartType === "line" ? (
            <Line data={chartData} options={optionsChart} />
          ) : (
            <Bar data={chartData} options={optionsChart} />
          )}
        </React.Fragment>
      ) : null}
    </section>
  );
}

export default TimerStatistic;
