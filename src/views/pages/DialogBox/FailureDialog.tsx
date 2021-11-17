import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  failure: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "100px",
  },
  failureButton: {
    marginTop: "25px",
  },
});
const FailureDialog = (props) => {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ border: "2px solid black" }}>
          <Typography variant="h4">Failure</Typography>
        </DialogTitle>
        <DialogContent style={{ border: "2px solid black" }}>
          <DialogContentText className={classes.failure}>
            <Typography variant="h5">
              {props.user[0].profile.displayName.split(" ")[0]}'s Account is
              Already Activated
            </Typography>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              className={classes.failureButton}
            >
              Close
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FailureDialog;
