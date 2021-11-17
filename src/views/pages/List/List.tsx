import React, { useState } from "react";
import Test_Data from "../../../Components/Table/Test_Data.json";
import "../../../Components/Table/table.css";
import {
  Alert,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SuccessDialog from "../DialogBox/SuccessDialog";
import CachedIcon from "@mui/icons-material/Cached";
import FailureDialog from "../DialogBox/FailureDialog";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import SortIcon from "@mui/icons-material/ImportExport";
import { useOktaAuth } from "@okta/okta-react";

import moment from "moment";

function List() {
  const { oktaAuth, authState } = useOktaAuth();

  const [data, setData] = useState(Test_Data);

  const [startDate, setStartDate] = useState<any>(
    moment(new Date()).format("YYYY-MM-DD")
  );

  const [selectedUser, setSelectedUser] = useState<any>(false);

  const [showStatusModal, setShowStatusModal] = useState<any>({
    isSuccess: false,
    isFailure: false,
  });

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [order, setOrder] = useState("ASC");

  // const accessToken = authState?.accessToken;
  // //  global fetch
  // const response = fetch("https://dev-52092247.okta.com/api/v1/users", {
  //   method: "GET",
  //   mode: "no-cors",
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // }).then((res) => {
  //   console.log("Okta Response :", res);
  // });

  const sortByStatus = (colName, forProfile) => {
    if (order === "ASC") {
      if (forProfile) {
        var sorted = [...data].sort((a, b) =>
          a["profile"][colName].toLowerCase() >
          b["profile"][colName].toLowerCase()
            ? 1
            : -1
        );
      } else {
        var sorted = [...data].sort((a, b) =>
          a[colName].toLowerCase() > b[colName].toLowerCase() ? 1 : -1
        );
      }

      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      if (forProfile) {
        var sorted = [...data].sort((a, b) =>
          a["profile"][colName].toLowerCase() <
          b["profile"][colName].toLowerCase()
            ? 1
            : -1
        );
      } else {
        var sorted = [...data].sort((a, b) =>
          a[colName].toLowerCase() < b[colName].toLowerCase() ? 1 : -1
        );
      }
      setData(sorted);
      setOrder("ASC");
    }
  };

  if (!authState) return null;

  const logout = async () => oktaAuth.signOut();

  const toggleActive = (user) => {
    setShowAlert(false);

    setShowStatusModal({ ...showStatusModal, isSuccess: false });

    if (selectedUser?.id === user.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const changeAccountStatus = () => {
    if (selectedUser.status !== "STAGED") {
      setShowAlert(true);
    } else {
      setShowStatusModal({ ...showStatusModal, isSuccess: true });
    }
  };

  return (
    <>
      {selectedUser && showStatusModal.isSuccess && (
        <SuccessDialog user={selectedUser} />
      )}
      {selectedUser && showStatusModal.isFailure && (
        <FailureDialog user={selectedUser} />
      )}
      {showAlert && (
        <Alert severity="warning">Account can not be activated</Alert>
      )}
      <Grid
        container
        spacing={2}
        direction="row"
        mt={4}
        display="flex"
        justifyContent="end"
        mb={2}
      >
        <Button variant="contained" color="inherit" onClick={logout}>
          Logout
        </Button>
      </Grid>

      <Grid container direction="row">
        <Grid item lg={2}>
          <Typography variant="h4">Filter By</Typography>
        </Grid>
        <Grid item lg={10}>
          <Grid container>
            <Grid item lg={10}>
              <Typography variant="h4">
                User List
                <Button color="primary">
                  <CachedIcon onClick={() => window.location.reload()} />
                </Button>
              </Typography>
            </Grid>
            <Grid item lg={2} display="flex" justifyContent="end">
              <Button
                style={{ marginBottom: "5px" }}
                variant="contained"
                onClick={changeAccountStatus}
                disabled={!selectedUser}
              >
                Active Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="row">
        <Grid item lg={2} mt={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newStartDate) =>
                setStartDate(moment(newStartDate).format("YYYY-MM-DD"))
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <br />
          <br />
        </Grid>
        <Grid item lg={10}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                  <SortIcon
                    onClick={() => sortByStatus("displayName", true)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>

                <TableCell>Work Email (Username)</TableCell>
                <TableCell>Secondary Email</TableCell>
                <TableCell>
                  Status
                  <SortIcon
                    onClick={() => sortByStatus("status", false)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
                <TableCell>Person Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>
                  Department
                  <SortIcon
                    onClick={() => sortByStatus("department", true)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((user) => {
                  // start date filter
                  if (startDate === null) {
                    return user;
                  } else if (user.profile.hireDate.includes(startDate)) {
                    return user;
                  }
                })
                .map((user, id) => (
                  <TableRow
                    id={user.id}
                    style={
                      selectedUser?.id === user.id
                        ? { background: "gray" }
                        : { background: "#f2f2f2" }
                    }
                    key={user.id}
                    onClick={() => toggleActive(user)}
                  >
                    <TableCell>{user.profile.displayName}</TableCell>
                    <TableCell>{user.profile.email}</TableCell>

                    <TableCell>{user.profile.secondEmail}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.profile.employmentStatus}</TableCell>
                    <TableCell>{user.profile.workLocation}</TableCell>
                    <TableCell>{user.profile.hireDate}</TableCell>
                    <TableCell>{user.profile.title}</TableCell>
                    <TableCell>{user.profile.department}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}

export default List;
