import {IRoute} from "../../constants/PageRoutes.ts";
import {NavLink} from "react-router-dom";

interface Properties {
  items: IRoute[]
  isFixed: boolean
}

const NavBar = ({items, isFixed}: Properties) => {
  return (
      <nav className={"navbar navbar-expand-sm bg-warning-subtle w-100" + (isFixed && " fixed-top")}
           style={{"height": "40px"}}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {items.map((item, index) => {
                return (
                    <li key={index} className="nav-item">
                      <NavLink
                          className="nav-link"
                          aria-current="page"
                          to={item.path}>
                        {item.name}
                      </NavLink>
                    </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default NavBar;