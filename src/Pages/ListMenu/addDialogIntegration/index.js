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
import { v4 } from "uuid";

export default function FormDialog(props) {
  const [update, setUpdate] = React.useState({ update: true });
  const [open, setOpen] = React.useState(false);
  const [openCheck, setOpenCheck] = React.useState(false);
  const [ipAddress, setIpAddress] = React.useState("");
  const [port, setPort] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [
    integrationFromLocalStorage,
    setIntegrationFromLocalStorage,
  ] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickCheck = () => {
    setOpenCheck(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearInput = () => {
    console.log("clear!");
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
    setUpdate({ ...update, update: true });
  };

  useEffect(() => {
    setIntegrationFromLocalStorage(
      JSON.parse(localStorage.getItem("integration"))
    );

    if (integrationFromLocalStorage !== null) {
      setUsername(integrationFromLocalStorage.username);
      setPassword(integrationFromLocalStorage.password);
      setPort(integrationFromLocalStorage.port);
      setIpAddress(integrationFromLocalStorage.ipAddress);
    }
  }, [update]);

  return (
    <>
      <Button startIcon={<Add />} color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      {integrationFromLocalStorage !== null && (
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
