import { Outlet } from "react-router-dom";

import { AppRouter } from "./providers/router";

function App() {
  return (
    <AppRouter>
      <Outlet />
    </AppRouter>
  );
}

export default App;
