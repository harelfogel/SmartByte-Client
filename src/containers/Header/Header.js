import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.scss";
import { getGreeting } from '../../utils/utils';
import Button from "./../../components/UI/Button/Button";
import Navigation from "./../../components/Layout/Navigation/Navigation";
import NavigationItem from "./../../components/Layout/Navigation/NavigationItem/NavigationItem";

const Header = ({ user, onLogout }) => {
  const firstName = user ? user.fullName.split(' ')[0] : '';
  const greeting = getGreeting();

  const handleNavLinkClick = (event, isAuthenticated) => {
    if (!isAuthenticated) {
      event.preventDefault();
      alert("You are not authenticated!");
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header className={classes.Header}>
      <div className={classes.HeaderContainer}>
        <div className={classes.AppName}>
          <NavLink to="/" className={classes.AppNameLink}>
            SmartByte
          </NavLink>
        </div>
        <div className={classes.Navigation}>
          <Navigation>
            <NavigationItem>
              <NavLink to="/rooms-dashboard" onClick={(event) => handleNavLinkClick(event, user)}>
                Rooms
              </NavLink>
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/rules" onClick={(event) => handleNavLinkClick(event, user)}>
                Rules
              </NavLink>
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/location" onClick={(event) => handleNavLinkClick(event, user)}>
                Location
              </NavLink>
            </NavigationItem>
          </Navigation>
        </div>
        {user && (
          <div className={classes.UserGreeting}>
            <span>{greeting}, {firstName}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
};

export default Header;
