// Navbar.jsx
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useContext } from "react";
import './Navbar.css'
import UserContext from './UserContext';

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

function Navbar() {

  const { userType } = useContext(UserContext);

  function NavBarText(a){
if(a=="admin"){
  return "ADMIN"
}
else if(a=="user"){
  return "USER"
} else{
  return "LOGIN"
}
  }

  return (
    <div className="navbar">
    <nav className="nav">
      <Link to="/" className="site-title">
        VOLONTIRAJ!
      </Link>
      <ul>
        <CustomLink className="a" to="/akcije">Akcije</CustomLink>
        <CustomLink className="a"to="/volonteri">Volonteri</CustomLink>
        <CustomLink to="/udruge">Udruge</CustomLink>
        <CustomLink to="/kontakt">Kontakt</CustomLink>
        <CustomLink to="/login">{NavBarText(userType)}</CustomLink>
      </ul>
    </nav>
    </div>

  );
}

export default Navbar;
