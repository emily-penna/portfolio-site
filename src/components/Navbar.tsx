import { Link, useMatch, useResolvedPath  } from "react-router-dom";


/**
 * Top Navigation Bar. Contains clickable tabs to reroute the user to different links.
 */
export function Navigation(){
  return (
  <nav>
    <ul>
      <li><Link to="/">About</Link></li>
      <li><Link to="/game">Game</Link></li>
      <li><Link to="/projects">Projects</Link></li>
      <li><Link to="/blog">Blog</Link></li>
    </ul>
  </nav>);
}