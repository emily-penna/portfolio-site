import { Link, useMatch, useResolvedPath  } from "react-router-dom";


/**
 * Top Navigation Bar. Contains clickable tabs to reroute the user to different links.
 * @returns 
 */
export function Navigation(/*index:number*/){
  return (
  <nav>
    <ul>
      {/* <NavTab to="/">Me</NavTab> */}
      <li><Link to="/">Me</Link></li>
      <li><Link to="/game">Game</Link></li>
      <li><Link to="/projects">Projects</Link></li>
    </ul>
  </nav>);
}

function NavTab(to : string/*, children? : string*/) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>
      </Link>
    </li>
  )
}