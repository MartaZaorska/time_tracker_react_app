import React, { useState, useEffect } from "react";

import { getTimeString } from "../helper/index";

function TimerList({ timers, removeTimer }) {
  const [filter, setFilter] = useState("");
  const [dateList, setDateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleTimer, setVisibleTimer] = useState([]);

  useEffect(() => {
    let resultDate = [];
    let resultCategories = [];
    timers.forEach(timer => {
      resultDate.push(new Date(timer.start).toISOString().slice(0, 10));
      resultCategories.push(timer.category);
    });
    setDateList([...new Set(resultDate)]);
    setCategories([...new Set(resultCategories)]);
  }, [timers]);

  useEffect(() => {
    if (filter === "") {
      setVisibleTimer(timers);
    } else if (+filter[0]) {
      const startDay = new Date(`${filter} 00:00`).getTime();
      const endDay = new Date(`${filter} 23:59`).getTime();
      setVisibleTimer(
        timers.filter(timer => timer.start >= startDay && timer.start <= endDay)
      );
    } else {
      setVisibleTimer(timers.filter(timer => timer.category === filter));
    }
  }, [filter, timers]);

  return (
    <section className="timer_list">
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">Filtruj</option>
        <optgroup label="według daty">
          {dateList.map(dateItem => (
            <option value={dateItem} key={dateItem}>
              {dateItem}
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
      {visibleTimer.map(timer => (
        <section className="timer__item" key={timer._id}>
          <p>
            {timer.category}, start:{" "}
            {new Date(timer.start)
              .toISOString()
              .slice(0, 16)
              .replace("T", " ")}
            , czas trwania: {getTimeString(timer.finish - timer.start)}
          </p>
          {timer.description.length === 0 ? null : <p>{timer.description}</p>}
          <button onClick={() => removeTimer(timer._id)}>Usuń timer</button>
        </section>
      ))}
    </section>
  );
}

export default TimerList;
