import {NavLink, Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage.tsx";
import VehiclesPage from "./components/pages/vehicle/VehiclePage.tsx";
import PeoplePage from "./components/pages/person/PersonPage.tsx";
import CrashesPage from "./components/pages/crash/CrashPage.tsx";

const routes = [
  {name: "Home", path: "/", element: HomePage(), requiresAuth: false},
  {name: "Crash", path: "/Crashes/*", element: CrashesPage(), requiresAuth: true},
  {name: "Person", path: "/People/*", element: PeoplePage(), requiresAuth: true},
  {name: "Vehicle", path: "/Vehicles/*", element: VehiclesPage(), requiresAuth: true}
];

const App = () => {
  const isUserAuthenticated: boolean = true;

  return (
      <div className="h-100 overflow-hidden">
        <nav
            className="navbar navbar-expand-sm bg-warning-subtle w-100"
            style={{height: "4%"}}>
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {routes.map((item) => {
                  return (
                      (!item.requiresAuth || isUserAuthenticated) &&
                      <li key={item.path} className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to={item.path.substring(0, item.path.length - 2)}>
                          {item.name}
                        </NavLink>
                      </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </nav>

        <main style={{
          height: "96%",
          maxHeight: "96%"
        }}>
          <Routes>
            {routes.map((item) => {
              return <Route
                  key={item.path}
                  path={item.path}
                  element={item.element}/>
            })}
          </Routes>
        </main>
      </div>
  );
};

export default App;
