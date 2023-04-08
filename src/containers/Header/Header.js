import React, { useEffect } from "react";
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
import { useNavigate } from 'react-router-dom';
import { getGreeting } from '../../utils/utils';


const Header = ({ user, toggleSideDrawer, onLogout }) => {
  const navigate = useNavigate();

  const firstName= user.fullName.split(' ')[0];
  const greeting = getGreeting();


  const handleLogout = () => {
    onLogout();
    navigate('/');
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
              <NavLink to="/rooms-dashboard">Rooms</NavLink>
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/rules">Rules</NavLink>
            </NavigationItem>
            <NavigationItem>
              <NavLink to="/location">Location</NavLink>
            </NavigationItem>
          </Navigation>
        </div>
        {user && (
          <div className={classes.UserGreeting}>
            <span>{greeting}, {firstName}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
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
  user: PropTypes.object,
  toggleSideDrawer: PropTypes.func,
};

export default connect(null, { toggleSideDrawer })(Header);
