import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";

const theme = createMuiTheme({
  typography: {
    fontSize: 12,
  },
});

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 300,
    marginLeft: 10,
    marginBottom: 10,
  },
  typography: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default function List(props) {
  const dispatch = useDispatch();
  function addLevel(levelObj) {
    dispatch({ type: "@level/ADD_LEVEL", level: levelObj });
  }

  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onLabelClick={(event) => {
        //Send Level information to the Dispatcher
        console.log("Clicked!!!");
        addLevel({ id: nodes.id, level: nodes.name, type: nodes.type });

        nodes.type === "floor"
          ? props.callBack({ id: nodes.id, level: nodes.name, type: "floor" })
          : props.callBack({
              id: nodes.id,
              level: nodes.name,
              type: nodes.type,
            });
        event.preventDefault();
        console.log(
          `Node Id:${nodes.id}, Label:${nodes.name}, Type:${nodes.type}`
        );
      }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <>
      <Typography
        className={classes.typography}
        variant="h6"
      >{` Site Hierarchy`}</Typography>

      <MuiThemeProvider theme={theme}>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(props.list)}
        </TreeView>
      </MuiThemeProvider>
    </>
  );
}
