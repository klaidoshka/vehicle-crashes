import HomePage from "../components/pages/HomePage.tsx";
import PageCrash from "../components/pages/crash/CrashPage.tsx";
import PageVehicle from "../components/pages/vehicle/VehiclePage.tsx";
import PagePerson from "../components/pages/person/PersonPage.tsx";
import PageInsurance from "../components/pages/insurance/InsurancePage.tsx";
import {ReactNode} from "react";

export interface IRoute {
  name: string;
  path: string;
  element: ReactNode;
}

export default [
  {name: "Home", path: "/", element: HomePage()},
  {name: "Vehicle", path: "/Vehicle", element: PageVehicle()},
  {name: "Person", path: "/Person", element: PagePerson()},
  {name: "Crash", path: "/Crash", element: PageCrash()},
  {name: "Insurance", path: "/Insurance", element: PageInsurance()},
] as IRoute[];
