import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import { v4 } from "uuid";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    getNode(props.list, props.mapLevelId);
    setOpen(false);
  };

  const getNode = (node, key) => {
    let result;

    if (key === "root") {
      result = node;
      console.log(result);
      result.children.push({
        id: v4(),
        name: value,
        children: [],
        type:
          props.nextMapLevelType.charAt(0).toLowerCase() +
          props.nextMapLevelType.slice(1),
      });
      props.callBack({ update: true });
      return true;
    }

    if (Array.isArray(node.children)) {
      node.children.map((node) => getNode(node, key));
    } else {
      return null;
    }

    result = node.children.find((element) => {
      console.log(element.id);
      console.log(key);

      return element.id === key;
    });

    if (result !== undefined) {
      result.children.push({
        id: v4(),
        name: value,
        children: [],
        type:
          props.nextMapLevelType.charAt(0).toLowerCase() +
          props.nextMapLevelType.slice(1),
      });
      props.callBack({ update: true });
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Add />}
        color="primary"
        onClick={handleClickOpen}
      >
        Add
      </Button>
      <Button
        variant="outlined"
        startIcon={<Remove />}
        color="secondary"
        onClick={handleClickOpen}
      >
        Remove
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            {props.mapLevelName !== "Global"
              ? `Create a new ${props.nextMapLevelType.toLowerCase()} under the ${props.mapLevelType.toLowerCase()}: ${
                  props.mapLevelName
                }`
              : `Create a new ${props.nextMapLevelType.toLowerCase()} under global level`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            autoComplete="off"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
