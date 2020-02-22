import React, { useContext, useEffect } from "react";
import Context from "./context/index";

import UserAuthorization from "./components/UserAuthorization";
import UserPanel from "./components/UserPanel";
import Timers from "./components/Timers";

function App() {
  const context = useContext(Context);

  useEffect(() => {
    if (context.error.length > 0) {
      setTimeout(() => context.clearError(), 3000);
    }
  }, [context.error]);

  return (
    <React.Fragment>
      {context.error.length === 0 ? null : (
        <span className="error_message">{context.error}</span>
      )}
      <section className="container">
        {context.user.token.length === 0 ? (
          <UserAuthorization />
        ) : (
          <React.Fragment>
            <UserPanel logout={context.logout} email={context.user.email} />
            <Timers />
          </React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
