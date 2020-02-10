import React, { useContext } from "react";
import Context from "./context/index";

function App() {
  const context = useContext(Context);

  return (
    <section>
      <p>app</p>
    </section>
  );
}

export default App;
