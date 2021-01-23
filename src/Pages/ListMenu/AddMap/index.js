import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import apiBackend from "../../../API/backend/api";
import { useSelector } from "react-redux";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import { v4 } from "uuid";

export default function FormDialog(props) {
  const users = useSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [file, setFile] = React.useState("");

  const onChangeHandler = (event) => {
    //console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const onFileSubmit = () => {
    const data = new FormData();
    data.append("map", file);

    const response = apiBackend
      .post(`/maps/${props.mapLevelId}`, data, {
        headers: {
          Authorization: `Bearer ${users.token}`,
        },
      })
      .then(function (response) {
        //Criar lista de Aps vazia
        const responseNewAPs = apiBackend
          .post(
            `/aps`,
            { mapId: props.mapLevelId, dados: {obj:[]} },
            {
              headers: {
                Authorization: `Bearer ${users.token}`,
              },
            }
          )
          .then(function (response) {
            //console.log(response.data);
          })
          .catch(function (response) {
            console.log(response);
          });
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    /*     getNode(props.list, props.mapLevelId);
    
     */
    onFileSubmit();
    setOpen(false);
  };

  /* const getNode = (node, key) => {
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
 */
  return (
    <>
      <Button
        startIcon={<Add />}
        color="primary"
        onClick={handleClickOpen}
        size="small"
      >
        Add
      </Button>
      <Button
        startIcon={<Remove />}
        color="secondary"
        onClick={handleClickOpen}
        size="small"
      >
        Remove
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        size="small"
      >
        <DialogContent>
          <DialogContentText>
            {`Create a new ${props.nextMapLevelType.toLowerCase()} under the ${props.mapLevelType.toLowerCase()}: ${
              props.mapLevelName
            }`}
            <br />
            <input type="file" name="file" onChange={onChangeHandler} />
          </DialogContentText>
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
