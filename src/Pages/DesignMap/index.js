import AppMap from "../../Components/AppMap";
import Header from "../../Components/Header";
import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListMenu from "../ListMenu";
import ListTree from "../../Components/List/List";
import { list } from "../../Data/List/initialList";
import GlobalStyle from "../../Styles/global";
import { useSelector, useDispatch } from "react-redux";
import apiBackend from "../../API/backend/api.js";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const dispatch = useDispatch();
  const imgPath = "https://192.168.0.21:3399/files/";
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mapVisible, setMapVisible] = React.useState(false);
  const [mapLevel, setMapLevel] = React.useState("Global");
  const [mapLevelId, setMapLevelId] = React.useState("root");
  const [mapLevelType, setMapLevelType] = React.useState("Global");
  const [listJson, setListJson] = React.useState({});
  const [user, setUser] = React.useState({});
  const users = useSelector((state) => state.user);
  const aps = useSelector((state) => state.aps);
  const [apsFromDb, setApsFromDb] = React.useState(aps);

  function addAPs(arrayAPs) {
    dispatch({ type: "@aps/ADD_APS", aps: arrayAPs });
  }

  const [imgFromDatabase, setImgFromDatabase] = React.useState();

  const getMap = async (mapId) => {
    const data = await apiBackend.get(`/maps/${mapId}`, {});
    return data;
  };

  const getAPs = async (mapId) => {
    const data = await apiBackend.get(`/aps/${mapId}`, {});
    return data;
  };

  //Temp/*
  useEffect(() => {
    const data = apiBackend
      .get(`/sites/${users.conta}`, {
        headers: {
          Authorization: `Bearer ${users.token}`,
        },
      })
      .then(function (response) {
        if (Object.keys(response.data).length !== 0) {
          setListJson(response.data);
        } else {
          setListJson(list);
          updateSite(list);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }, []);

  const updateSite = (listJson) => {
    const data = apiBackend
      .put(
        `/sites/${users.conta}`,
        { dados: listJson },
        {
          headers: {
            Authorization: `Bearer ${users.token}`,
          },
        }
      )
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const getOptionCallBack = (message) => {
    if (message.update === true) {
      console.log("updated");
      setListJson({ ...listJson });
      updateSite(listJson);

      return;
    }

    if (message.type === "floor") {
      setMapVisible(false);

      getMap(message.id)
        .then((reply) => {
          setImgFromDatabase(reply.data.img);

          getAPs(message.id)
            .then((reply) => {
              addAPs(reply.data.obj);
              setApsFromDb([...reply.data.obj]);
              setMapVisible(true);
            })
            .catch((reply) => {
              console.log(reply);
            });
        })
        .catch((reply) => {
          console.log(reply);
        });
    } else {
      setMapVisible(false);
    }

    setMapLevel(message.level);
    setMapLevelType(message.type);
    setMapLevelId(message.id);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <GlobalStyle />
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {mapLevel}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <ListTree list={listJson} callBack={getOptionCallBack} />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {mapVisible && (
            <AppMap apsFromDb={apsFromDb} img={imgPath + imgFromDatabase} />
          )}
          <div style={{ backgroundColor: "`blue`" }}>
            {!mapVisible && (
              <ListMenu
                mapLevelName={mapLevel}
                mapLevelId={mapLevelId}
                mapLevelType={mapLevelType}
                list={listJson}
                callBack={getOptionCallBack}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
