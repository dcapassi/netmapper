import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

function ListTemplates(props) {
  const classes = useStyles();

  return (
    <>
      <Dialog
        fullScreen
        open={props.openTemplatesAps}
        aria-labelledby="form-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {props.setOpenTemplatesAps(false)}}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {`Zabbix - Templates`}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => {props.setOpenTemplatesAps(false)}}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Paper>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{`Access Point Templates`}</Typography>
                <Typography variant="body1" color="textSecondary">
                  Choose the Zabbix templates to be applied on all the Access
                  Points.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" onClick={() => {}}>
                  Configure
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ListTemplates;
