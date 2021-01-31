import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { v4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// import { Container } from './styles';

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

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function View(props) {
  const [typeData, setTypeData] = useState([]);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let width = "33%";
  let height = "90%";
  let count = -1;
  let index = -1;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(props.dashboardData);
  }, [props.dashboardData]);

  let formatPieData = (obj, label = "Data") => {
    let colorArray = [];
    let count = 0;
    while (count < Object.keys(obj).length) {
      colorArray.push(getRandomColor());
      count++;
    }

    let data;
    try {
      data = {
        labels: Object.keys(obj),
        datasets: [
          {
            label: label,
            data: Object.values(obj),
            backgroundColor: colorArray,
            hoverBackgroundColor: colorArray,
          },
        ],
      };
    } catch {}
    return data;
  };

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 3; i++) {
      let value = letters[Math.floor(Math.random() * 16)];
      color = color + value + value;
    }
    return color;
  }

  let data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {props.dashboardData !== undefined ? (
              props.dashboardData.map((entry) => {
                count = count + 1;
                return <Tab label={entry.name} {...a11yProps({ count })} />;
              })
            ) : (
              <></>
            )}
          </Tabs>
        </AppBar>
        {props.dashboardData !== undefined ? (
          props.dashboardData.map((entry) => {
            index = index + 1;
            return (
              <TabPanel value={value} index={index}>
                <h3>
                  APs on this Floor:{" "}
                  {entry.apType["indoor"] + entry.apType["outdoor"]}
                </h3>
                <br />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: width, height: height }}>
                    <Pie
                      key={v4()}
                      data={formatPieData(entry.apType)}
                      options={{
                        maintainAspectRatio: false,
                        title: {
                          display: true,
                          text: "Type",
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: "bottom",
                        },
                      }}
                    />
                  </div>
                  <br />
                  <div style={{ width: width, height: height }}>
                    <Bar
                      key={v4()}
                      data={formatPieData(entry.uniqueVendorCounted, "Count")}
                      options={{
                        maintainAspectRatio: false,
                        title: {
                          display: true,
                          text: "Vendor",
                          fontSize: 20,
                        },
                        legend: {
                          display: false,
                          position: "bottom",
                        },
                      }}
                    />
                  </div>
                  <br />
                  <div style={{ width: width, height: height }}>
                    <Bar
                      key={v4()}
                      data={formatPieData(entry.uniqueApsCounted, "Count")}
                      options={{
                        maintainAspectRatio: false,
                        title: {
                          display: true,
                          text: "Model",
                          fontSize: 20,
                        },
                        legend: {
                          display: false,
                          position: "bottom",
                        },
                      }}
                    />
                  </div>
                </div>
              </TabPanel>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default View;
