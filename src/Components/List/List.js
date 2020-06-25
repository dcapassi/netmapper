import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontSize: 12,
  },
});

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
});

const data = {
  id: "root",
  name: "Global",
  type: "root",
  children: [
    {
      id: "1",
      name: "Brazil",
      type: "country",
      children: [
        {
          id: "2",
          name: "São Paulo",
          type: "region",
          children: [
            {
              id: "3",
              name: "Aeroporto XYZ",
              type: "venue",
              children: [
                {
                  id: "4",
                  name: "Terminal 1",
                  type: "building",
                  children: [
                    {
                      id: "5",
                      name: "Embarque",
                      type: "floor",
                    },
                    {
                      id: "6",
                      name: "Desembarque",
                      type: "floor",
                    },
                  ],
                },
              ],
            },
            {
              id: "2003",
              name: "Aeroporto XYZ",
              type: "venue",
              children: [
                {
                  id: "2004",
                  name: "Terminal 1",
                  type: "building",
                  children: [
                    {
                      id: "2005",
                      name: "Embarque",
                      type: "floor",
                    },
                    {
                      id: "2006",
                      name: "Desembarque",
                      type: "floor",
                    },
                  ],
                },
              ],
            },
            {
              id: "3003",
              name: "Aeroporto XYZ",
              type: "venue",
              children: [
                {
                  id: "3004",
                  name: "Terminal 1",
                  type: "building",
                  children: [
                    {
                      id: "3005",
                      name: "Embarque",
                      type: "floor",
                    },
                    {
                      id: "3006",
                      name: "Desembarque",
                      type: "floor",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "4001",
          name: "Rio de Janeiro",
          type: "region",
          children: [
            {
              id: "4002",
              name: "Santos Dumond",
              type: "venue",
              children: [
                {
                  id: "4003",
                  name: "Terminal 1",
                  type: "building",
                  children: [
                    {
                      id: "4004",
                      name: "Embarque",
                      type: "floor",
                    },
                    {
                      id: "4005",
                      name: "Desembarque",
                      type: "floor",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default function List(props) {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <>
      <div style={{ display: "flex" }}>
        <TreeItem
          button={false}
          key={nodes.id}
          nodeId={nodes.id}
          label={nodes.name}
          onLabelClick={(event) => {
            nodes.type === "floor"
              ? props.callBack({ type: "floor" })
              : props.callBack({ type: null });
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
      </div>
    </>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </TreeView>
    </MuiThemeProvider>
  );
}
