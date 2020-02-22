import React, { useState } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";

import useFilterData from "../hooks/useFilterData";

function TimerStatistic({ data, filter }) {
  const chartData = useFilterData(data, filter);
  const [chartType, setChartType] = useState("line");

  if (filter === "") return null;

  return (
    <section className="timer_statistic">
      {filter === "date" ? (
        <Doughnut data={chartData} />
      ) : filter.startsWith("days") ? (
        <React.Fragment>
          <select
            value={chartType}
            onChange={e => setChartType(e.target.value)}
          >
            <option value="line">wykres liniowy</option>
            <option value="bar">wykres słupkowy</option>
          </select>
          {chartType === "line" ? (
            <Line data={chartData} />
          ) : (
            <Bar data={chartData} />
          )}
        </React.Fragment>
      ) : null}
    </section>
  );
}

export default TimerStatistic;
