import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { v4 } from "uuid";
import PropTypes from "prop-types";
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
  let count = -1;
  let index = -1;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(props.dashboardData);
  }, [props.dashboardData]);

  let formatPieData = (obj) => {
    let data;
    try {
      data = {
        labels: Object.keys(obj),
        datasets: [
          {
            data: Object.values(obj),
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      };
    } catch {}
    return data;
  };

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
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      width: "400px",
                      heigth: "450px",
                    }}
                  >
                    <Pie key={v4()} data={formatPieData(entry.apType)} />
                  </div>
                  <br />
                  <div
                    style={{
                      width: "250px",
                      heigth: "400px",
                    }}
                  >
                    <Bar
                      key={v4()}
                      data={formatPieData(entry.uniqueVendorCounted)}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      width: "250px",
                      heigth: "400px",
                    }}
                  >
                    <Bar
                      key={v4()}
                      data={formatPieData(entry.uniqueApsCounted)}
                    />
                  </div>
                </div>
              </TabPanel>
            );
          })
        ) : (
          <></>
        )}

        {/*    <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </div>

      {/*  {props.dashboardData !== undefined ? (
          props.dashboardData.map((entry) => {
            return (
              <>
                <div key={v4()}>
                  <strong
                    style={{
                      marginLeft: "100px",
                    }}
                  >
                    {entry.name}
                  </strong>
                  <div
                    style={{
                      width: "400px",
                      heigth: "450px",
                    }}
                  >
                    <Pie key={v4()} data={formatPieData(entry.apType)} />
                  </div>
                  <br />
                  <div
                    style={{
                      width: "250px",
                      heigth: "400px",
                    }}
                  >
                    <Bar
                      key={v4()}
                      data={formatPieData(entry.uniqueVendorCounted)}
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      width: "250px",
                      heigth: "400px",
                    }}
                  >
                    <Bar
                      key={v4()}
                      data={formatPieData(entry.uniqueApsCounted)}
                    />
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <></>
        )} */}
    </>
  );
}

export default View;
