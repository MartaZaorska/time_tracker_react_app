import React, { useContext, useEffect } from "react";
import Context from "./context/index";

import UserAuthorization from "./components/UserAuthorization";
import UserPanel from "./components/UserPanel";
import Timers from "./components/Timers";

function App() {
  const context = useContext(Context);

  useEffect(() => {
    if (context.error.length > 0) {
      const messageElement = document.querySelector(".message");
      messageElement.textContent = context.error;
      setTimeout(() => {
        messageElement.textContent = "";
        context.clearError();
      }, 3000);
    }
  }, [context.error]);

  return (
    <section className="container">
      {context.user.token.length === 0 ? (
        <UserAuthorization />
      ) : (
        <React.Fragment>
          <UserPanel logout={context.logout} email={context.user.email} />
          <Timers />
        </React.Fragment>
      )}
      <span className="message"></span>
    </section>
  );
}

export default App;
