import React, { useState, useEffect, useContext } from "react";

import TimerList from "./TimerList";
import TimerStatistic from "./TimerStatistic";
import Context from "../context/index";

import { getTimeList } from "../helper/index";

function TimersContent() {
  const context = useContext(Context);
  const [filter, setFilter] = useState("");
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const resultDates = [];
    const resultCategories = [];
    context.timers.forEach(timer => {
      resultDates.push(new Date(timer.start).getTime());
      resultCategories.push(timer.category);
    });

    setDates(getTimeList(resultDates));
    setCategories([...new Set(resultCategories)]);
  }, [context.timers]);

  useEffect(() => {
    if (filter === "") {
      setShowInput(false);
      setData(context.timers);
    } else if (filter === "date") {
      setShowInput(true);
    } else if (filter.startsWith("days")) {
      setShowInput(false);
      const startDay =
        filter === "days3"
          ? new Date().getTime() - 259200000
          : filter === "days7"
          ? new Date().getTime() - 604800000
          : new Date().getTime() - 1209600000;
      setData(context.timers.filter(timer => timer.start >= startDay));
    } else {
      setShowInput(false);
      setData(context.timers.filter(timer => timer.category === filter));
    }
  }, [filter, context.timers]);

  useEffect(() => {
    if (date.length !== 0) {
      const startDay = new Date(`${date} 00:00`).getTime();
      const endDay = startDay + 86400000;
      setData(
        context.timers.filter(
          timer => timer.start >= startDay && timer.start <= endDay
        )
      );
    }
  }, [date, context.timers]);

  return (
    <section className="timers__content">
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">Filtruj</option>
        <optgroup label="według daty">
          <option value="date">wybierz datę</option>
          {dates.map(date => (
            <option key={date.value} value={date.value}>
              {date.text}
            </option>
          ))}
        </optgroup>
        <optgroup label="według kategorii">
          {categories.map(category => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </optgroup>
      </select>
      {showInput ? (
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      ) : null}
      <TimerList data={data} removeTimer={context.removeTimer} />
      <TimerStatistic data={data} filter={filter} />
    </section>
  );
}

export default TimersContent;
