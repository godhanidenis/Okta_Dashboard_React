import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

const FailureDialog = (props) => {
  console.log("failure dialog user", props.user);
  const [open, setOpen] = React.useState(true);

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
          <DialogContentText
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              margin: "100px",
            }}
          >
            <Typography variant="h5">
              {props.user.profile.displayName.split(" ")[0]}'s Account is
              Already Activated
            </Typography>
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              style={{ marginTop: "25px" }}
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
