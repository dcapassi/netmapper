import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";
import AddDialog from "./AddDialog";
import AddDialogIntegration from "./addDialogIntegration";

// import { Container } from './styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    textAlign: "center",
  },
}));

const returnLabel = (level) => {
  let label = "Country";
  switch (level) {
    case "Global":
      label = "Country";
      break;
    case "country":
      label = "Region";
      break;
    case "region":
      label = "Venue";
      break;
    case "venue":
      label = "Building";
      break;
    case "building":
      label = "Floor";
      break;
    default:
      break;
  }
  return label;
};

function Settings(props) {
  const [nextLevel, setNextLabel] = useState("");
  useEffect(() => {
    setNextLabel(returnLabel(props.mapLevelType));
  }, [props.mapLevelType]);

  const classes = useStyles();

  return (
    <Grid
      container
      item
      xs={12}
      spacing={1}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={4}>
        <Typography component={"span"} variant="h6" noWrap>
          {nextLevel}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <AddDialog
          mapLevelType={props.mapLevelType}
          nextMapLevelType={nextLevel}
          mapLevelName={props.mapLevelName}
          mapLevelId={props.mapLevelId}
          list={props.list}
          callBack={props.callBack}
        />
      </Grid>

      {console.log(props.mapLevelType)}
      {
        //Settings for the GLobal Menu
        props.mapLevelName === "Global" && (
          <>
            <Grid item xs={4}>
              <Typography component={"span"} variant="h6" noWrap>
                Zabbix Integration
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <AddDialogIntegration />
            </Grid>
          </>
        )
      }
    </Grid>
  );
}

export default Settings;
