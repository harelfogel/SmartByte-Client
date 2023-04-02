import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSideDrawer } from "./../../store/ui/ui.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "./../../components/UI/Button/Button";
import Navigation from "./../../components/Layout/Navigation/Navigation";
import NavigationItem from "./../../components/Layout/Navigation/NavigationItem/NavigationItem";

import classes from "./Header.module.scss";

const Header = ({ toggleSideDrawer }) => {
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
              <NavLink to="/">Rooms</NavLink>
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/rules">Rules</NavLink>
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/location">Location</NavLink>
            </NavigationItem>
          </Navigation>
        </div>
        <div className={classes.MenuBtn}>
          <Button onClick={toggleSideDrawer}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSideDrawer: PropTypes.func,
};

export default connect(null, { toggleSideDrawer })(Header);
