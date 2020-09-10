import React, { useEffect } from "react";
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
  const classes = useStyles();
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

  const [
    integrationFromLocalStorage,
    setIntegrationFromLocalStorage,
  ] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickCheck = () => {
    setOpenCheck(true);
    getToken(ipAddress, port, username, password)
      .then((response) => {
        const token = response.data.result;
        setIntLoading(false);
        if (token !== undefined) {
          console.log(token);
          setZabbixIntegrationStatus(true);
        }
      })
      .catch((e) => {
        setIntLoading(false);
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
    localStorage.setItem(
      "integration",
      JSON.stringify({ ipAddress, port, username, password })
    );
    setZabbixIntegrationStatus(false);
    setIntLoading(true);
    setUpdate({ ...update, update: true });
  };

  useEffect(() => {
    const integrationData = JSON.parse(localStorage.getItem("integration"));
    if (integrationData !== null) {
      //Update the input fields with the integration data
      setIpAddress(integrationData.ipAddress);
      setPort(integrationData.port);
      setUsername(integrationData.username);
      setPassword(integrationData.password);

      setShowIntegration(true);
    } else {
      setShowIntegration(false);
    }
  }, [update]);

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
                  Choose the Zabbix templates to be applied on all the Access
                  Points.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  onClick={() => {
                    setOpenTemplatesAps(true);
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
              {`Zabbix - Templates`}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                setOpenTemplatesAps(false);
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
    </>
  );
}
