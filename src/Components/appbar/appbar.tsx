import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";
import { Avatar, Badge, Box, Button, Menu, MenuItem } from "@material-ui/core";
import Credentials from "../../models/credentials";
import { deepOrange } from "@material-ui/core/colors";
import { useNavigate } from "react-router-dom";
import LogoSgad from "../../assets/logo-sgad.png";
import "./appbar.css";

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
  // Declare a new state variable with the "useState" Hook
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1100;

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const navigate = useNavigate();
  const [isHideLogout, setIsHideLogout] = useState(false);
  const cred = localStorage.getItem("credentials");
  const credential = JSON.parse(cred ?? "") as Credentials;

  const classes = useStyles();
  //const [example, setExample] = useState("primary");
  //   const isCustomColor = example === "customColor";
  //   const isCustomHeight = example === "customHeight";

  let avatar;
  // console.log(credential.photoUrl);
  // console.log(credential.email);
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
    if (isHideLogout === false) setIsHideLogout(true);
    else setIsHideLogout(false);
  };

  function logout() {
    console.log("Sair");
    localStorage.clear();
    navigate("/");
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigation = (address: string) => {
    handleClose();
    navigate(address);
  };

  return (
    <React.Fragment>
      <meta name="referrer" content="no-referrer" />
      <AppBar className={classes.customColor}>
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            {width < breakpoint && (
              <div>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={() => navigation("/home")}>Home</MenuItem>
                  <MenuItem onClick={() => navigation("/stakeholders")}>
                    Stakeholders
                  </MenuItem>
                  <MenuItem onClick={() => navigation("/politica")}>
                    Política Ambiental
                  </MenuItem>
                  <MenuItem onClick={() => navigation("/atividades")}>
                    Atividades de Risco
                  </MenuItem>
                  <MenuItem onClick={() => navigation("/metas")}>
                    Metas Ambientais
                  </MenuItem>
                  <MenuItem onClick={() => navigation("/score")}>
                    Score de Risco
                  </MenuItem>
                </Menu>
              </div>
            )}
            <img src={LogoSgad} className="logo" alt="logo"></img>

            {/* <Typography variant="h6" className={classes.title}>
            SGAD
          </Typography> */}
            {width > breakpoint && (
              <div>
                <IconButton
                  className="iconButton"
                  onClick={() => navigation("/home")}
                >
                  Home
                </IconButton>
                <IconButton
                  className="iconButton"
                  onClick={() => navigation("/stakeholders")}
                >
                  Stakeholders
                </IconButton>
                <IconButton
                  className="iconButton"
                  onClick={() => navigation("/politica")}
                >
                  Política Ambiental
                </IconButton>
                <IconButton
                  className="iconButton"
                  onClick={() => navigation("/atividades")}
                >
                  Atividades de Risco
                </IconButton>
                <IconButton
                  className="iconButton"
                  onClick={() => navigation("/metas")}
                >
                  Metas Ambientais
                </IconButton>
                <IconButton
                  className="iconButton"
                  onClick={() => navigation("/score")}
                >
                  Score de Risco
                </IconButton>
              </div>
            )}
          </Box>
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
    </React.Fragment>
  );
}
