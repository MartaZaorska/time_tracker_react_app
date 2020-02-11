import React, { useContext, useEffect, useState } from "react";

import Context from "../context/index";

function Timers() {
  const [activeTimer, setActiveTimer] = useState({});
  const context = useContext(Context);

  useEffect(() => {
    const timerIndex = context.timers.findIndex(timer => timer.finish === 0);
    if (timerIndex >= 0) setActiveTimer({ ...context.timers[timerIndex] });
  }, [context.timers]);

  if (Object.keys(activeTimer).length > 0) return <p>Jest aktywny timer</p>;

  return (
    <React.Fragment>
      <p>Komponent tworzący i aktywujący nowy timer</p>
      {context.timers.length === 0 ? (
        <p>Brak timerów</p>
      ) : (
        <p>Lista utworzonych i zakończonych timerów</p>
      )}
    </React.Fragment>
  );
}

export default Timers;
