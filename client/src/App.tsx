import NavBar from "./components/bar/NavBar";
import {Route, Routes} from "react-router-dom";
import PageRoutes from "./constants/PageRoutes.ts";
import EndBar from "./components/bar/EndBar.tsx";

const App = () => {
  return (
      <div className="h-100">
        <NavBar items={PageRoutes} isFixed={true}/>

        <Routes>
          {PageRoutes.map(route =>
              <Route key={route.path} path={route.path} element={route.element}/>)}
        </Routes>

        <EndBar isFixed={true}/>
      </div>
  );
};

export default App;
