import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Settings from "@material-ui/icons/Settings";
import Dashboard from "@material-ui/icons/Dashboard";
import SettingsMenu from "../ListMenu/Settings";
import DeviceEditBox from "../../Components/DeviceEditBox/DeviceEditBox";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Menu Tabs"
          indicatorColor="primary"
          centered
        >
          <Tab label="Settings" icon={<Settings />} {...a11yProps(0)} />
          <Tab label="Monitoring" icon={<Dashboard />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <DeviceEditBox
          closeBox={props.closeBox}
          setEditField={props.setEditField}
          editElement={{
            elementName: props.editingElement,
            elementKey: props.editingKey,
          }}
          apList={props.apList}
          switchList={props.switchList}
          editType={props.editType}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Monitoring
      </TabPanel>
    </div>
  );
}
