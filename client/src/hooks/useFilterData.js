import { useEffect, useState } from "react";
import { set } from "mongoose";

const getDataForDay = data => {
  const datasets = [{ data: [] }];
  const labels = [];
  const result = [];
  let total = 0;
  data.forEach(item => {
    const index = result.findIndex(
      resultItem => resultItem.category === item.category
    );
    const value = item.finish - item.start;
    if (index < 0) {
      result.push({ category: item.category, value });
    } else {
      result[index].value += value;
    }
    total += value;
  });

  result.forEach(resultItem => {
    labels.push(resultItem.category);
    const value = parseInt((resultItem.value * 100) / total);
    datasets[0].data.push(value);
  });

  return {
    datasets,
    labels
  };
};

const useFilterData = (data, filter) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (filter === "") return;
    if (+filter[0]) {
      const result = getDataForDay(data);
      setChartData(result);
    } else if (filter.startsWith("days")) {
      const days = [];
      const now = new Date().getTime();
      const count = filter === "days7" ? 7 : 14;
      for (let i = 0; i < count; i++) {
        days.unshift(new Date(now - 86400000 * i).toISOString().slice(0, 10));
      }

      const result = [];
      days.forEach(day => {
        const startDay = new Date(`${day} 00:00`).getTime();
        const endDay = startDay + 86400000;
        const resultData = [];
        data.forEach(item => {
          if (item.start >= startDay && item.start < endDay) {
            resultData.push(item);
          }
        });
        result.push({
          day,
          data: getDataForDay(resultData)
        });
      });

      const tmp = [];
      data.forEach(item => {
        tmp.push(item.category);
      });

      const categories = [...new Set(tmp)];

      console.log(result);
      const endData = { labels: days, datasets: [] };
      categories.forEach(category => {
        const categoryData = [];
        days.forEach(dayItem => {
          const indexDay = result.findIndex(el => el.day === dayItem);
          if (result[indexDay].data.labels.length === 0) {
            categoryData.push(0);
          } else {
            const categoryIndex = result[indexDay].data.labels.indexOf(
              category
            );
            if (categoryIndex < 0) {
              categoryData.push(0);
            } else {
              categoryData.push(
                result[indexDay].data.datasets[0].data[categoryIndex]
              );
            }
          }
        });
        endData.datasets.push({
          label: category,
          data: categoryData
        });
      });

      setChartData(endData);
    }
  }, [data, filter]);

  return chartData;
};

export default useFilterData;
