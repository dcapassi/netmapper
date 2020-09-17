import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { deviceList } from "../../Data/DeviceList";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();

  const [update, setUpdate] = React.useState({ udpate: false });
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState(props.editElement.elementName);
  const [customer, setCustomer] = React.useState("");
  const [ipAddress, setIpAddress] = React.useState("");
  const [model, setModel] = React.useState("");
  const [accessSwitch, setAccessSwitch] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //Push a "" item as the first item
  let deviceArray = [];
  deviceArray.push("");
  deviceList.map((entry) => deviceArray.push(entry.model));

  const [modelList, setModelList] = React.useState(deviceArray);
  const [ch24GhzList, setCh24GhzList] = React.useState(["", "1", "6", "11"]);
  const [ch5GhzList, setCh5GhzList] = React.useState([
    "",
    34,
    36,
    38,
    40,
    42,
    44,
    46,
    48,
    52,
    56,
    60,
    64,
    100,
    104,
    108,
    112,
    116,
    120,
    124,
    128,
    132,
    136,
    140,
  ]);
  const [channel24G, setChannel24G] = React.useState("");
  const [channel5G, setChannel5G] = React.useState("");
  const handleClose = () => {
    setOpen(false);
    props.closeBox();
  };

  const handleSubmit = () => {
    setOpen(false);
    setUpdate({ ...update, update: true });

    props.setEditField({
      targetElement: props.editElement.elementKey,
      apName: name,
      model,
      accessSwitch,
      customer,
      channel24G,
      channel5G,
      ipAddress,
    });
    props.closeBox();
  };

  useEffect(() => {
    props.editType === "ap" &&
      props.apList.map((entry) => {
        if (entry.key === props.editElement.elementKey) {
          setChannel24G(entry.channel);
          setChannel5G(entry.channel5Ghz);
          setModel(entry.model);
          setCustomer(entry.customer);
          setAccessSwitch(entry.accessSwitch);
          setIpAddress(entry.ipAddress);
        }
      });
  }, []);

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {`Edit  - ${props.editElement.elementName}`}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Card>
            <form noValidate autoComplete="off">
              <FormControl className={classes.formControl}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  fullWidth
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  value={name}
                  autoComplete="off"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>

              {props.editType === "ap" && (
                <>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="modelLabel">Model</InputLabel>
                    <Select
                      labelId="modelLabel"
                      id="model"
                      label="Model"
                      type="text"
                      value={model}
                      autoComplete="on"
                      onChange={(e) => {
                        setModel(e.target.value);
                      }}
                    >
                      {modelList.map((entry) => (
                        <MenuItem key={entry} value={entry}>
                          <ListItemText primary={entry} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      autoFocus
                      fullWidth
                      margin="dense"
                      id="ip"
                      label="IP Address"
                      type="text"
                      placeholder="Format: x.x.x.x"
                      value={ipAddress}
                      autoComplete="off"
                      onChange={(e) => {
                        setIpAddress(e.target.value);
                      }}
                    />
                  </FormControl>
                  {/* */}
                  <FormGroup className={classes.formControl} row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.checkedA}
                          onChange={handleChange}
                          name="checkedA"
                          color="primary"
                        />
                      }
                      label="Monitoring"
                    />
                  </FormGroup>

                  <Divider />
                  <Typography
                    className={classes.formControl}
                  >{`Wireless`}</Typography>

                  <FormControl className={classes.formControl}>
                    <InputLabel id="ch24Label">Channel 2.4GHz</InputLabel>
                    <Select
                      labelId="ch24Label"
                      id="24ch"
                      label="ch24Label"
                      type="text"
                      value={channel24G}
                      autoComplete="off"
                      onChange={(e) => {
                        setChannel24G(e.target.value);
                      }}
                    >
                      {ch24GhzList.map((entry) => (
                        <MenuItem key={entry} value={entry}>
                          <ListItemText primary={entry} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="ch5Label">Channel 5GHz</InputLabel>
                    <Select
                      labelId="ch5Label"
                      id="5ch"
                      type="text"
                      value={channel5G}
                      autoComplete="off"
                      onChange={(e) => {
                        setChannel5G(e.target.value);
                      }}
                    >
                      {ch5GhzList.map((entry) => (
                        <MenuItem key={entry} value={entry}>
                          <ListItemText primary={entry} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Divider />
                  <Typography
                    className={classes.formControl}
                  >{`LAN`}</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="switchLabel">Access Switch</InputLabel>
                    <Select
                      labelId="switchLabel"
                      id="accessSwitch"
                      type="text"
                      value={accessSwitch}
                      autoComplete="off"
                      onChange={(e) => {
                        setAccessSwitch(e.target.value);
                      }}
                    >
                      {props.switchList.map((entry) => (
                        <MenuItem
                          key={entry.switchName}
                          value={entry.switchName}
                        >
                          <ListItemText primary={entry.switchName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
            </form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
