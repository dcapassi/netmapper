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

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [update, setUpdate] = React.useState({ udpate: false });
  const [open, setOpen] = React.useState(false);
  const [showIntegration, setShowIntegration] = React.useState(false);
  const [openCheck, setOpenCheck] = React.useState(false);
  const [ipAddress, setIpAddress] = React.useState("");
  const [port, setPort] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [intLoading, setIntLoading] = React.useState(true);
  const [zabbixIntegrationStatus, setZabbixIntegrationStatus] = React.useState(
    false
  );

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
        if (token !== null) {
          setZabbixIntegrationStatus(true);
        }
      })
      .catch((e) => {
        setIntLoading(false);
        console.log(e);
      });
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
      <Button startIcon={<Add />} color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      {showIntegration === true && (
        <>
          <Button
            startIcon={<Check />}
            color="primary"
            onClick={handleClickCheck}
          >
            Check
          </Button>

          <Button
            startIcon={<Remove />}
            color="secondary"
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

      <Dialog
        open={openCheck}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Check Zabbix Integration</DialogContentText>
          <form className={classes.form} noValidate>
            {intLoading ? (
              <CircularProgress disableShrink />
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
    </>
  );
}
