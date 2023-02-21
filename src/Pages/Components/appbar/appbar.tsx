import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";
import { Avatar, Badge } from "@material-ui/core";
import Credentials from "../../../models/credentials";
import { deepOrange } from "@material-ui/core/colors";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: green[500],
  },
  customHeight: {
    minHeight: 200,
  },
  offset: theme.mixins.toolbar,
}));

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const [isHideLogout, setIsHideLogout] = useState(false);
  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const classes = useStyles();
  //const [example, setExample] = useState("primary");
  //   const isCustomColor = example === "customColor";
  //   const isCustomHeight = example === "customHeight";

  let avatar;
  console.log(credential.photoUrl);
  console.log(credential.email);
  if (credential.photoUrl !== "") {
    avatar = <Avatar alt="Avatar" src={credential.photoUrl} />;
  } else {
    avatar = (
      <Avatar style={{ backgroundColor: deepOrange[500] }}>
        {credential.email?.substring(0, 1).toUpperCase()}
      </Avatar>
    );
  }

  const changeLogout = () => {
    if (isHideLogout == false) setIsHideLogout(true);
    else setIsHideLogout(false);
  };

  function logout() {
    console.log("Sair");
    localStorage.clear();
    navigate("/");
  }

  return (
    <React.Fragment>
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <AppBar color={"primary"}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            SGAD
          </Typography>

          <IconButton
            color="inherit"
            onClick={changeLogout}
            onBlur={changeLogout}
          >
            <Badge
              overlap="rectangular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                isHideLogout ? (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onMouseDown={logout}
                  >
                    Logout
                  </button>
                ) : (
                  <div></div>
                )
              }
            >
              {avatar}
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Typography>
        This content doesn't appear below the AppBar because we added an
        additional Toolbar component above, this is the recommended approach.{" "}
      </Typography>
      <Typography>
        Change the AppBar example by clicking on one of the numbers above.
      </Typography>
      <Typography>
        <ul>
          <li> 1: color: default </li>
          <li> 2: color: primary </li>
          <li> 3: color: secondary </li>
          <li> 4: color: transparent </li>
          <li> 5: custom color class </li>
          <li> 6: custom height class </li>
        </ul>
      </Typography>
    </React.Fragment>
  );
}
