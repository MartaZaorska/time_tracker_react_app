import { useEffect, useState } from "react";

import { BACKGROUND_COLOR } from "../constants/index";

const getPercentageValue = (value, total) => {
  return parseInt((value * 100) / total);
};

const getData = data => {
  const datasets = [{ data: [] }];
  const labels = [];
  const calculatedValues = {};
  let total = 0;

  data.forEach(item => {
    const value = item.finish - item.start;
    total += value;
    calculatedValues[item.category]
      ? (calculatedValues[item.category] += value)
      : (calculatedValues[item.category] = value);
  });

  Object.entries(calculatedValues).forEach(item => {
    labels.push(item[0]);
    const value = getPercentageValue(item[1], total);
    datasets[0].data.push(value);
  });

  return {
    datasets,
    labels
  };
};

const getNamesOfDays = numOfDays => {
  const result = [];
  const now = new Date().getTime();
  for (let i = 0; i < numOfDays; i++) {
    result.unshift(new Date(now - 86400000 * i).toISOString().slice(0, 10));
  }
  return result;
};

const getCategoriesFromData = data => {
  const allCategories = [];
  data.forEach(item => {
    allCategories.push(item.category);
  });

  return [...new Set(allCategories)];
};

const filterDataForDay = (day, data) => {
  const startDay = new Date(`${day} 00:00`).getTime();
  const endDay = startDay + 86400000;

  return data.filter(item => item.start >= startDay && item.start < endDay);
};

const useFilterData = (data, filter) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (filter === "" || filter === "date") {
      const result = getData(data);
      result.datasets[0].backgroundColor = [...BACKGROUND_COLOR];
      setChartData(result);
    } else if (filter.startsWith("days")) {
      const numberOfDays = filter === "days3" ? 3 : filter === "days7" ? 7 : 14;
      const labels = getNamesOfDays(numberOfDays);
      const categories = getCategoriesFromData(data);
      const result = [];
      const datasets = [];

      labels.forEach(label => {
        const filteredData = filterDataForDay(label, data);
        result.push({
          label,
          data: getData(filteredData)
        });
      });

      categories.forEach((category, index) => {
        const categoryData = [];

        labels.forEach(label => {
          const indexLabel = result.findIndex(item => item.label === label);
          const categoryIndex = result[indexLabel].data.labels.indexOf(
            category
          );

          if (categoryIndex < 0) {
            categoryData.push(0);
          } else {
            categoryData.push(
              result[indexLabel].data.datasets[0].data[categoryIndex]
            );
          }
        });

        datasets.push({
          label: category,
          data: categoryData,
          backgroundColor: BACKGROUND_COLOR[index]
        });
      });

      setChartData({ labels, datasets });
    }
  }, [data, filter]);

  return chartData;
};

export default useFilterData;
