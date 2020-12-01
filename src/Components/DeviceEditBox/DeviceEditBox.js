import React, { useEffect } from "react";
import QRCode from "qrcode.react"
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
//API
import createZabbixApi from "../../API/Zabbix/zabbixAPI";
import getToken from "../../API/Zabbix/getToken";
import getHost from "../../API/Zabbix/getHost";
import getZabbixItems from "../../API/Zabbix/getItems";
import qrcode from "qrcode.react";
import MonitorCard from "../monitorCard"

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
  const [monitoring, setMonitoring] = React.useState(false);

  const handleChange = (event) => {
    setMonitoring(event.target.checked);
  };

  //Push a "" item as the first item
  let deviceArray = [];
  deviceArray.push("");
  deviceList.map((entry) => deviceArray.push(entry.model));

  const [showQrCode, setShowQrCode] = React.useState(false);

  const [zabbixAPI, setZabbixAPI] = React.useState(() => {});
  const [zabbixToken, setZabbixToken] = React.useState(() => {});

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
  const [itemsValue, setItemsValue] = React.useState([]);
  const [zabbixIntegration, setZabbixIntegration] = React.useState("");
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
      monitoring,
    });
    props.closeBox();
  };

  useEffect(() => {
    let zabbixIntegrationFromLocalStorage = JSON.parse(
      localStorage.getItem("integration")
    );
    setZabbixIntegration(zabbixIntegrationFromLocalStorage);

    props.editType === "ap" &&
      props.apList.map((entry) => {
        if (entry.key === props.editElement.elementKey) {
          setChannel24G(entry.channel);
          setChannel5G(entry.channel5Ghz);
          setModel(entry.model);
          setCustomer(entry.customer);
          setAccessSwitch(entry.accessSwitch);
          setIpAddress(entry.ipAddress);
          setMonitoring(entry.monitoring);
        }
      });
    if (zabbixIntegrationFromLocalStorage) {
      const api = createZabbixApi(
        zabbixIntegrationFromLocalStorage.ipAddress,
        zabbixIntegrationFromLocalStorage.port
      );
      setZabbixAPI(() => api);

      getToken(
        zabbixIntegrationFromLocalStorage.username,
        zabbixIntegrationFromLocalStorage.password,
        api
      ).then((response) => {
        try{
        const token = response.data.result;
        if (token !== undefined) {
          console.log(token);
          setZabbixToken(token);
          getItems(token, api, props.editElement.elementName);
        }
      }
      catch(e){
        console.log(e);
      }
      });
    }
  }, []);

  const getItems = (token, api, name) => {
    getHost(token, api, name).then((result) => {
      let hostId = false;
      try {
        hostId = result.data.result[0].hostid;
      } catch (error) {
        console.log(error);
      }
      if (hostId) {
        getZabbixItems(token, api, hostId).then((response) => {
          console.log(response);
          let data = response.data.result;
          let arrayItems = [];
          data.map((entry) => {
            arrayItems.push({
              key: entry.key_,
              lastvalue: entry.lastvalue,
            });
          });
          console.log(arrayItems);
          setItemsValue(arrayItems);
        });
      }
    });
  };

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
                    <InputLabel shrink id="modelLabel">
                      Model
                    </InputLabel>
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
                  <FormGroup className={classes.formControl} row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={monitoring}
                          onChange={handleChange}
                          name="checkedA"
                          color="primary"
                        />
                      }
                      label="Monitoring"
                    />

            <FormGroup className={classes.formControl} row>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={showQrCode}
                                      onChange={(event) => {
                                        setShowQrCode(event.target.checked);
                                      }}
                                      name="checkedA"
                                      color="primary"
                                    />
                                  }
                                  label="QR-Code"
                                />
                

                              </FormGroup>
     

                  </FormGroup>

                                    <FormGroup>
                  {

                  showQrCode?  <QRCode  value={props.editElement.elementName}/> : <></>

                  }
                  </FormGroup>
                  <div style={{display:"flex"}}>
                  {itemsValue.map((entry) => {
                    return (


                      <div style={{flexDirection:"row"}}>
                      <MonitorCard key={entry.key} keyType={entry.key} value={entry.lastvalue}/>
                      </div>

                    );
                  })}
      
                 </div>
              
        
                  <Divider />

                  <Typography
                    className={classes.formControl}
                  >{`WiFi Channel`}</Typography>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink id="ch24Label">
                      2.4GHz
                    </InputLabel>
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
                    <InputLabel shrink id="ch5Label">
                      5GHz
                    </InputLabel>
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

                  <FormControl className={classes.formControl}>
                    <InputLabel shrink id="switchLabel">
                      Access Switch
                    </InputLabel>
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
