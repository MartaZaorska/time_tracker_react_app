import React, { useState, useEffect, useContext } from "react";

import TimerList from "./TimerList";
import TimerStatistic from "./TimerStatistic";
import Context from "../context/index";

import { getTimeSelectList } from "../helper/index";

function TimersContent() {
  const [filter, setFilter] = useState("");
  const [times, setTimes] = useState([]);
  const [date, setDate] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);

  const context = useContext(Context);

  useEffect(() => {
    const resultTimes = [];
    const resultCategories = [];
    context.timers.forEach(timer => {
      resultTimes.push(new Date(timer.start).getTime());
      resultCategories.push(timer.category);
    });

    setTimes(getTimeSelectList(resultTimes));
    setCategories([...new Set(resultCategories)]);
  }, [context.timers]);

  useEffect(() => {
    if (filter === "") {
      resetValue();
      setData(context.timers);
    } else if (filter === "date") {
      setData([]);
      setShowInput(true);
    } else if (filter.startsWith("days")) {
      resetValue();
      const startDay =
        filter === "days3"
          ? new Date().getTime() - 259200000
          : filter === "days7"
          ? new Date().getTime() - 604800000
          : new Date().getTime() - 1209600000;
      setData(context.timers.filter(timer => timer.start >= startDay));
    } else {
      resetValue();
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

  const resetValue = () => {
    setShowInput(false);
    setDate("");
  };

  return (
    <React.Fragment>
      <section className="timers__content">
        <select
          className="timers__select"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="">Filtruj</option>
          <optgroup label="według daty">
            <option value="date">wybierz datę</option>
            {times.map(time => (
              <option key={time.value} value={time.value}>
                {time.text}
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
            className="timers__input--date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        ) : null}
      </section>
      <TimerStatistic data={data} filter={filter} />
      <TimerList data={data} removeTimer={context.removeTimer} />
    </React.Fragment>
  );
}

export default TimersContent;
