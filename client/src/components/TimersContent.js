import React, { useState, useEffect, useContext } from "react";

import TimerList from "./TimerList";
import TimerStatistic from "./TimerStatistic";
import Context from "../context/index";

function TimersContent() {
  const context = useContext(Context);
  const [filter, setFilter] = useState("");
  const [dates, setDates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const resultDates = [];
    const resultCategories = [];
    context.timers.forEach(timer => {
      resultDates.push(new Date(timer.start).toISOString().slice(0, 10));
      resultCategories.push(timer.category);
    });
    setDates([...new Set(resultDates)]);
    setCategories([...new Set(resultCategories)]);
  }, [context.timers]);

  useEffect(() => {
    if (filter === "") {
      setData(context.timers);
    } else if (+filter[0] || filter.startsWith("days")) {
      const startDay =
        filter === "days7"
          ? new Date().getTime() - 604800000
          : filter === "days14"
          ? new Date().getTime() - 1209600000
          : new Date(`${filter} 00:00`).getTime();
      const endDay = filter.startsWith("days")
        ? new Date().getTime()
        : new Date(`${filter} 23:59`).getTime();
      setData(
        context.timers.filter(
          timer => timer.start >= startDay && timer.start <= endDay
        )
      );
    } else {
      setData(context.timers.filter(timer => timer.category === filter));
    }
  }, [filter, context.timers]);

  return (
    <section className="timers__content">
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">Filtruj</option>
        <optgroup label="według daty">
          {dates.map(dateItem => (
            <option value={dateItem} key={dateItem}>
              {dateItem}
            </option>
          ))}
          <option value="days7">ostatnie 7 dni</option>
          <option value="days14">ostatnie 14 dni</option>
        </optgroup>
        <optgroup label="według kategorii">
          {categories.map(category => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </optgroup>
      </select>
      <TimerList data={data} removeTimer={context.removeTimer} />
      <TimerStatistic data={data} filter={filter} />
    </section>
  );
}

export default TimersContent;
