import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
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
  children: [
    {
      id: "1",
      name: "Brazil",
      children: [
        {
          id: "2",
          name: "São Paulo",
          children: [
            {
              id: "3",
              name: "Aeroporto XYZ",
              children: [
                {
                  id: "4",
                  name: "Terminal 1",
                  children: [
                    {
                      id: "5",
                      name: "Embarque",
                    },
                    {
                      id: "6",
                      name: "Desembarque",
                    },
                  ],
                },
              ],
            },
            {
              id: "2003",
              name: "Aeroporto XYZ",
              children: [
                {
                  id: "2004",
                  name: "Terminal 1",
                  children: [
                    {
                      id: "2005",
                      name: "Embarque",
                    },
                    {
                      id: "2006",
                      name: "Desembarque",
                    },
                  ],
                },
              ],
            },
            {
              id: "3003",
              name: "Aeroporto XYZ",
              children: [
                {
                  id: "3004",
                  name: "Terminal 1",
                  children: [
                    {
                      id: "3005",
                      name: "Embarque",
                    },
                    {
                      id: "3006",
                      name: "Desembarque",
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
          children: [
            {
              id: "4002",
              name: "Santos Dumond",
              children: [
                {
                  id: "4003",
                  name: "Terminal 1",
                  children: [
                    {
                      id: "4004",
                      name: "Embarque",
                    },
                    {
                      id: "4005",
                      name: "Desembarque",
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

export default function List() {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
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
