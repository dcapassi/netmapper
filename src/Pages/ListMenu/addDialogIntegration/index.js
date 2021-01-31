import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import createZabbixApi from "../../../API/Zabbix/zabbixAPI";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Check from "@material-ui/icons/Check";
import getToken from "../../../API/Zabbix/getToken";
import getTemplates from "../../../API/Zabbix/getTemplates";
import createHost from "../../../API/Zabbix/createHost";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Settings from "@material-ui/icons/Settings";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import TransferList from "./transferList";
import apiBackend from "../../../API/backend/api";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function FormDialog(props) {
  const users = useSelector((state) => state.user);
  const [selectedApsTemplates, setSelectedApsTemplates] = React.useState([]);
  const [selectedSwtTemplates, setSelectedSwtTemplates] = React.useState([]);
  const [apListFromLocalStorage, setApListFromLocalStorage] = React.useState(
    []
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const [zabbixAPI, setZabbixAPI] = React.useState(() => {});
  const [update, setUpdate] = React.useState({ udpate: false });
  const [open, setOpen] = React.useState(false);
  const [showIntegration, setShowIntegration] = React.useState(false);
  const [openCheck, setOpenCheck] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [ipAddress, setIpAddress] = React.useState("");
  const [port, setPort] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [intLoading, setIntLoading] = React.useState(true);
  const [zabbixIntegrationStatus, setZabbixIntegrationStatus] = React.useState(
    false
  );
  const [openTemplatesAps, setOpenTemplatesAps] = React.useState(false);
  const [openTemplatesSwts, setOpenTemplatesSwts] = React.useState(false);

  const [zabbixToken, setZabbixToken] = React.useState("");
  const [templateList, setTemplateList] = React.useState([]);

  const [
    integrationFromLocalStorage,
    setIntegrationFromLocalStorage,
  ] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  function addIntegration(obj) {
    dispatch({ type: "@integration/ADD_INTEGRATION", obj: obj });
  }

  const handleClickCheck = () => {
    setOpenCheck(true);
    const api = createZabbixApi(ipAddress, port);
    setZabbixAPI(() => api);
    getToken(username, password, api)
      .then((response) => {
        const token = response.data.result;

        setIntLoading(false);
        if (token !== undefined) {
          // Send the token and the integration data
          addIntegration({ ipAddress, port, username, password, token });

          console.log(token);
          setZabbixToken(token);
          setZabbixIntegrationStatus(true);

          //Temp
          localStorage.setItem(
            "zabbixInteration",
            JSON.stringify({ integration: true })
          );
        }
      })
      .catch((e) => {
        setIntLoading(false);
        setZabbixToken("");
        console.log(e);
      });
  };

  const transferListCallBack = (data, type) => {
    if (type === "ap") {
      setSelectedApsTemplates(data);
    }
    if (type === "swt") {
      setSelectedSwtTemplates(data);
    }
  };

  const handleGetTemplates = (type) => {
    getTemplates(zabbixToken, zabbixAPI)
      .then((response) => {
        const list = response.data.result;

        if (list !== undefined) {
          setTemplateList(list);
          if (type === "ap") {
            setOpenTemplatesAps(true);
          }
          if (type === "swt") {
            setOpenTemplatesSwts(true);
          }
        }
      })
      .catch((e) => {
        setIntLoading(false);
        setZabbixToken("");
        console.log(e);
      });
  };

  const handleClickSettings = () => {
    setOpenSettings(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearInput = () => {
    console.log("clear!");
    setIntegrationFromLocalStorage("");
    setUsername("");
    setPassword("");
    setPort("");
    setIpAddress("");
  };

  const handleSubmit = () => {
    setOpen(false);
    /*     localStorage.setItem(
      "integration",
      JSON.stringify({ ipAddress, port, username, password })
    ); */

    //Save the JSON integration on the DB
    const data = apiBackend
      .put(
        `/integration/${users.conta}`,
        { dados: { ipAddress, port, username, password } },
        {
          headers: {
            Authorization: `Bearer ${users.token}`,
          },
        }
      )
      .then(function (response) {
        //console.log(response);
        setZabbixIntegrationStatus(false);
        //Temp
        localStorage.setItem(
          "zabbixInteration",
          JSON.stringify({ integration: false })
        );

        setIntLoading(true);
        setUpdate({ ...update, update: true });
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  useEffect(() => {
    //const integrationData = JSON.parse(localStorage.getItem("integration"));

    const data = apiBackend
      .get(`/integration/${users.conta}`, {})
      .then(function (response) {
        console.log(response.data);
        if (response.data !== {}) {
          console.log("got here!");
          setIpAddress(response.data.ipAddress);
          setPort(response.data.port);
          setUsername(response.data.username);
          setPassword(response.data.password);

          setShowIntegration(true);
        } else {
          setShowIntegration(false);
        }
      })
      .catch(function (response) {
        console.log(response);
      });

    /* if (integrationData !== null) {
      //Update the input fields with the integration data
      setIpAddress(integrationData.ipAddress);
      setPort(integrationData.port);
      setUsername(integrationData.username);
      setPassword(integrationData.password);

      setShowIntegration(true);
    } else {
      setShowIntegration(false);
    } */
  }, [update]);

  useEffect(() => {
    const apTemplateListData = JSON.parse(
      localStorage.getItem("apTemplateList")
    );
    if (apTemplateListData !== undefined) {
      setSelectedApsTemplates(apTemplateListData);
    }

    const swtTemplateListData = JSON.parse(
      localStorage.getItem("swtTemplateList")
    );
    if (swtTemplateListData !== undefined) {
      setSelectedSwtTemplates(swtTemplateListData);
    }
  }, []);

  useEffect(() => {
    if (zabbixIntegrationStatus === true) {
      if (apListFromLocalStorage) {
        apListFromLocalStorage.map((entry) => {
          createHost(
            zabbixToken,
            zabbixAPI,
            selectedApsTemplates,
            "15",
            entry.apName,
            entry.ipAddress
          ).then((response) => {
            console.log(response);
          });
        });
      }
    }
  }, [zabbixIntegrationStatus]);

  return (
    <>
      <Button
        startIcon={<Add />}
        color="primary"
        onClick={handleClickOpen}
        size="small"
      >
        Add
      </Button>

      {showIntegration === true && (
        <>
          <Button
            startIcon={<Check />}
            color="primary"
            onClick={handleClickCheck}
            size="small"
          >
            Check
          </Button>
          {zabbixIntegrationStatus ? (
            <Button
              startIcon={<Settings />}
              color="primary"
              onClick={handleClickSettings}
              size="small"
            >
              Settings
            </Button>
          ) : (
            <></>
          )}

          <Button
            startIcon={<Remove />}
            color="secondary"
            size="small"
            onClick={(e) => {
              localStorage.removeItem("integration");
              clearInput();
              setUpdate({ ...update, update: true });
            }}
          >
            Remove
          </Button>
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Zabbix server parameters</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="ip"
            label="IP Address"
            type="text"
            fullWidth
            value={ipAddress}
            autoComplete="off"
            onChange={(e) => {
              setIpAddress(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="port"
            placeholder="Default: 80"
            label="TCP Port"
            type="text"
            fullWidth
            autoComplete="off"
            value={port}
            onChange={(e) => {
              setPort(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            value={username}
            fullWidth
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={password}
            fullWidth
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/*Dialog to check Zabbix Integration*/}

      <Dialog
        open={openCheck}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Check Zabbix Integration</DialogContentText>
          <form className={classes.form} noValidate>
            {intLoading ? (
              <CircularProgress />
            ) : zabbixIntegrationStatus ? (
              <Typography>Success!</Typography>
            ) : (
              <Typography>Failure!</Typography>
            )}
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpenCheck(false);
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/*Dialog for Zabbix Integration Settings*/}
      <Dialog
        fullScreen
        open={openSettings}
        aria-labelledby="form-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpenSettings(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {`Zabbix Integration Settings`}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                setOpenSettings(false);
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Paper>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{`Access Point Templates`}</Typography>
                <Typography variant="body1" color="textSecondary">
                  Choose the Zabbix templates to be applied by default on all of
                  the Access Points Points.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  onClick={() => {
                    handleGetTemplates("ap");
                  }}
                >
                  Configure
                </Button>
              </CardActions>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{`Switch Templates`}</Typography>
                <Typography variant="body1" color="textSecondary">
                  Choose the Zabbix templates to be applied by default on all of
                  the switches
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  onClick={() => {
                    handleGetTemplates("swt");
                  }}
                >
                  Configure
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </DialogContent>
      </Dialog>

      {/*Dialog - Add AP Templates*/}
      <Dialog
        fullScreen
        open={openTemplatesAps}
        aria-labelledby="form-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpenTemplatesAps(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {`Default Templates for the Access Points`}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                localStorage.setItem(
                  "apTemplateList",
                  JSON.stringify(selectedApsTemplates)
                );
                setOpenTemplatesAps(false);
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TransferList
            type={"ap"}
            selectedApsTemplates={selectedApsTemplates}
            transferListCallBack={transferListCallBack}
            templateList={templateList}
          />
        </DialogContent>
      </Dialog>

      {/*Dialog - Add Switch Templates*/}
      <Dialog
        fullScreen
        open={openTemplatesSwts}
        aria-labelledby="form-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setOpenTemplatesSwts(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {`Default Templates for the Switches`}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                localStorage.setItem(
                  "swtTemplateList",
                  JSON.stringify(selectedSwtTemplates)
                );
                setOpenTemplatesSwts(false);
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TransferList
            type={"swt"}
            selectedTemplates={selectedSwtTemplates}
            transferListCallBack={transferListCallBack}
            templateList={templateList}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
