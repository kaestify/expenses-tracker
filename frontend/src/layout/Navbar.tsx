import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { LoadingSpinner } from "./LoadingSpinner";
export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const handleLogout = async () => oktaAuth.signOut();

  if (!authState) {
    return <LoadingSpinner />;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Finance Tracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {authState.isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
            )}
            {authState.isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link active" to={"/expenses"}>
                  Expenses Summary
                </NavLink>
              </li>
            )}
            {authState.isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link active" to={"/setgoal"}>
                  Set Goal
                </NavLink>
              </li>
            )}
            {!authState.isAuthenticated ? (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  type="button"
                  className="btn btn-outline-light"
                >
                  Sign in
                </NavLink>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-outline-light nav-link active"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
