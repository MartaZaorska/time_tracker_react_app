import React, { useState } from "react";

import { DEFAULT_CATEGORY } from "../constants/index";

function NewTimerForm({ addTimer, addError }) {
  const [category, setCategory] = useState("");

  const newTimerHandler = e => {
    e.preventDefault();
    if (category.length === 0) {
      addError("Musisz wybrać kategorię");
      return;
    }

    addTimer(category, new Date().getTime());
  };

  return (
    <section className="new_timer">
      <form onSubmit={newTimerHandler} className="new_timer__form">
        <h2 className="new_timer__title">Aktywuj nowy timer</h2>
        <select
          className="new_timer__select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Wybierz kategorię</option>
          {DEFAULT_CATEGORY.map((category, index) => (
            <option value={category} key={`${category}_${index}`}>
              {category}
            </option>
          ))}
        </select>
        <button className="new_timer__btn" type="submit">
          Start
        </button>
      </form>
    </section>
  );
}

export default NewTimerForm;
