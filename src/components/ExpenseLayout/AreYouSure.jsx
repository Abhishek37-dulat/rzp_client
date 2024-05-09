import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  removeExp,
  updateExpenseLoading,
} from "../../redux/reducers/ducks/ExpenseDuck";

export default function AlertDialogSlide({
  handleClickOpen,
  handleClose,
  open,
  setOpen,
  data,
}) {
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    const token = localStorage.getItem("access_token");
    dispatch(removeExp({ id: data?.id, token }));
    dispatch(updateExpenseLoading(true));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you Sure You want To Remove Item: <b>{data?.itemName}</b>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteItem}>Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
