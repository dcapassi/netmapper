import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Grid from "@material-ui/core/Grid";

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
  console.log(props);
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
          {returnLabel(props.mapLevelType)}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<Add />}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<Remove />}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
}

export default Settings;
