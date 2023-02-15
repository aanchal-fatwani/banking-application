import React from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import {
  MenuList,
  MenuItem,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden,
  Popper,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Person from "@material-ui/icons/Person";

import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const history = useHistory();
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const logout = () => {
    setOpenProfile(null);
    localStorage.clear();
    history.push("/signin");
  };
  return (
    <div className={classes.manager}>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-owns={openProfile ? "profile-menu-list-grow" : null}
        aria-haspopup="true"
        onClick={handleClickProfile}
        className={classes.buttonLink}
      >
        <Person className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Profile</p>
        </Hidden>
      </Button>
      <Popper
        open={Boolean(openProfile)}
        anchorEl={openProfile}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !openProfile }) +
          " " +
          classes.popperNav
        }
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="profile-menu-list-grow"
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseProfile}>
                <MenuList role="menu">
                  <MenuItem onClick={logout} className={classes.dropdownItem}>
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
