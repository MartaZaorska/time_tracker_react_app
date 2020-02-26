import React, { useState, useEffect } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";

import { OPTIONS_CHART } from "../constants/index";
import useFilterData from "../hooks/useFilterData";

function TimerStatistic({ data, filter }) {
  const [chartType, setChartType] = useState("bar");
  const [showChart, setShowChart] = useState(false);
  const chartData = useFilterData(data, filter);

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
  }, [data, filter]);

  if (!showChart || data.length === 0) return null;

  return (
    <section className="timer_statistic">
      {filter === "date" || filter === "" ? (
        <Doughnut data={chartData} options={OPTIONS_CHART} />
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
            <Line data={chartData} options={OPTIONS_CHART} />
          ) : (
            <Bar data={chartData} options={OPTIONS_CHART} />
          )}
        </React.Fragment>
      ) : null}
    </section>
  );
}

export default TimerStatistic;
