import React from "react";
import { Route, Routes } from "react-router-dom";
import { adminPages, publicPages } from "./routes";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      {publicPages.map(({ route, component }) => {
        return <Route path={route} element={component} />;
      })}
      {adminPages.map(({ route, component }) => {
        return <Route path={route} element={component} />;
      })}
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

export default App;
