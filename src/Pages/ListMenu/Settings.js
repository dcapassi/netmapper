import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import AddDialog from "./AddDialog";
import country from "./country.png";

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "200px",
    width: "400px",
  },
  details: {
    display: "flex",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 200,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard(props) {
  const [nextLevel, setNextLabel] = useState("");
  useEffect(() => {
    setNextLabel(returnLabel(props.mapLevelType));
  }, [props.mapLevelType]);

  const classes = useStyles();
  const theme = useTheme();

  return (
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {nextLevel}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <AddDialog
              mapLevelType={props.mapLevelType}
              nextMapLevelType={nextLevel}
              mapLevelName={props.mapLevelName}
              mapLevelId={props.mapLevelId}
              list={props.list}
              callBack={props.callBack}
            />
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={country}
          title={nextLevel}
        />
      </Card>
  );
}
