// import React, { useMemo } from "react";

// import CachedIcon from "@mui/icons-material/Cached";
// import { Button, Grid, Input, Select, Typography } from "@mui/material";

// import { useTable, useGlobalFilter, useFilters, useSortBy } from "react-table";
// import Test_Data from "../../../Components/Table/Test_Data.json";
// import { Columns } from "../../../Components/Table/Columns";
// import "../../../Components/Table/table.css";
// import GlobalFilter from "../../../Components/Table/GlobalFilter";
// import ColumnFilter from "../../../Components/Table/ColumnFilter";
// import SuccessDialog from "../DialogBox/SuccessDialog";
// import FailureDialog from "../DialogBox/FailureDialog";
// import { Link } from "react-router-dom";

// function Lists() {
//   const columns = useMemo(() => Columns, []);
//   const data = useMemo(() => Test_Data, []);

//   //   const defaultColumn = useMemo(() => {
//   //       return {
//   //           Filter : ColumnFilter
//   //       }
//   //   } , [])

//   const tableInstance = useTable(
//     {
//       columns,
//       data,
//       //   defaultColumn
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state,
//     setGlobalFilter,
//   } = tableInstance;

//   const { globalFilter } = state;
//   return (
//     <>
//    <b> Start Date :</b> <br/>
//     <Input type="date" />

//       <Grid
//         container
//         spacing={2}
//         direction="row"
//         mt={4}
//         display="flex"
//         justifyContent="end"
//         mb={2}
//         lg={12}
//       >
//         <Button variant="contained" color="inherit" component={Link} to={`/`}>
//           Logout
//         </Button>
//       </Grid>
//       <Grid container spacing={2} direction="row">
//         <Grid item lg={6}>
//           <Typography variant="h4" sx={{ fontWeight: 500 }}>
//             User List
//             <Button color="primary">
//               <CachedIcon />
//             </Button>
//           </Typography>
//         </Grid>
//         <Grid item lg={6} display="flex" justifyContent="end">
//           <SuccessDialog />
//           {/* <FailureDialog /> */}

//           {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
//         </Grid>
//       </Grid>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {column.render("Header")}
//                   <span>
//                     {column.isSorted
//                       ? column.isSortedDesc
//                         ? " 🔽"
//                         : " 🔼"
//                       : ""}
//                   </span>
//                   {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default Lists;

// import React, { useState, useEffect } from "react";
// import Test_Data from "../../../Components/Table/Test_Data.json";

// import {
//   Alert,
//   Button,
//   FormControl,
//   Grid,
//   Input,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import SuccessDialog from "../DialogBox/SuccessDialog";
// import CachedIcon from "@mui/icons-material/Cached";
// import SortIcon from "@mui/icons-material/ImportExport";
// import FailureDialog from "../DialogBox/FailureDialog";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";
// import { useOktaAuth } from "@okta/okta-react";

// import moment from "moment";

// import {
//   ColumnDirective,
//   ColumnsDirective,
//   Filter,
//   GridComponent,
//   Inject,
//   Sort,
//   Grid as SyncGrid,
// } from "@syncfusion/ej2-react-grids";

// import { authFetch } from "../../../provider/AuthProvider";

// function List() {
//   const { oktaAuth, authState } = useOktaAuth();
//   // useEffect(() => {
//   //   authFetch(
//   //     'https://dev-52092247.okta.com/api/v1/users?search=profile.hireDate Eq "2021-10-30"'
//   //   ).then((res) => console.log(res));
//   // }, []);
//   // const accessToken = authState?.accessToken;
//   // //  global fetch
//   // const response = fetch("https://dev-52092247.okta.com/api/v1/users", {
//   //   method: "GET",
//   //   mode: "no-cors",
//   //   headers: {
//   //     Authorization: `Bearer ${accessToken}`,
//   //   },
//   // }).then((res) => {
//   //   console.log("Okta Response :", res);
//   // });

//   const [data, setData] = useState(Test_Data);

//   //const [name, setName] = useState("");

//   const [startDate, setStartDate] = useState<any>(
//     moment(new Date()).format("YYYY-MM-DD")
//   );

//   const [selectedUser, setSelectedUser] = useState<any>(false);

//   const [Selectedrecords, setSelectedrecords] = useState<any>();

//   const [showStatusModal, setShowStatusModal] = useState<any>({
//     isSuccess: false,
//     isFailure: false,
//   });

//   const [showAlert, setShowAlert] = useState<boolean>(false);

//   const [grid, setGrid] = useState<SyncGrid | null>();

//   // const [order, setOrder] = useState("ASC");

//   // const sorting = (col) => {
//   //   if (order === "ASC") {
//   //     const sorted = [...data].sort((a, b) =>
//   //       a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
//   //     );
//   //     setData(sorted);
//   //     setOrder("DSC");
//   //   }
//   //   if (order === "DSC") {
//   //     const sorted = [...data].sort((a, b) =>
//   //       a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
//   //     );
//   //     setData(sorted);
//   //     setOrder("ASC");
//   //   }
//   // };

//   console.log("AuthState", authState);
//   if (!authState) return null;

//   const logout = async () => oktaAuth.signOut();

//   // const toggleActive = (user) => {
//   //   console.log(user);
//   //   setShowAlert(false);

//   //   setShowStatusModal({ ...showStatusModal, isSuccess: false });

//   //   if (selectedUser?.id === user.id) {
//   //     setSelectedUser(null);
//   //   } else {
//   //     setSelectedUser(user);
//   //   }
//   // };

//   const changeAccountStatus = () => {
//     console.log("ddd", Selectedrecords[0].status);
//     if (Selectedrecords[0].status !== "STAGED") {
//       setShowAlert(true);
//       console.log(showAlert);
//     } else {
//       setShowStatusModal({ ...showStatusModal, isSuccess: true });
//       setSelectedUser(false);
//     }
//   };

//   const handleRefresh = () => {
//     console.log("Data Source changed");
//   };

//   const rowSelected = (user) => {
//     console.log("user", user);
//     if (grid) {
//       const selectedrecords: object[] = grid.getSelectedRecords();
//       //alert(JSON.stringify(selectedrecords));
//       setSelectedrecords(JSON.parse(JSON.stringify(selectedrecords)));
//       setSelectedUser(true);
//       console.log(
//         "date",
//         data.filter((item) => {
//           return item.profile.hireDate === startDate;
//         })
//       );
//       setShowAlert(false);
//     }
//   };

//   const handleDate = (newStartDate) => {
//     console.log("select date", moment(newStartDate).format("YYYY-MM-DD"));
//     setStartDate(moment(newStartDate).format("YYYY-MM-DD"));

//     // grid?.filterByColumn(
//     //   "profile.hireDate",
//     //   "equal",
//     //   moment(newStartDate).format("YYYY-MM-DD")
//     // );

//     // setData(
//     //   data.filter((item) => {
//     //     if (newStartDate === startDate) {
//     //       return item;
//     //     } else if (
//     //       item.profile.hireDate.includes(
//     //         moment(newStartDate).format("YYYY-MM-DD")
//     //       )
//     //     ) {
//     //       return item;
//     //     }
//     //   })
//     // );

//     setData(
//       data.filter((item) => {
//         return (
//           //item.profile.hireDate === moment(newStartDate).format("YYYY-MM-DD")
//           item.profile.hireDate.includes(
//             moment(newStartDate).format("YYYY-MM-DD")
//           )
//         );
//       })
//     );
//   };

//   return (
//     <>
//       {!selectedUser && showStatusModal.isSuccess && (
//         <SuccessDialog
//           user={Selectedrecords}
//           set={selectedUser}
//           sSet={setSelectedUser}
//         />
//       )}
//       {!selectedUser && showStatusModal.isFailure && (
//         <FailureDialog
//           user={Selectedrecords}
//           set={selectedUser}
//           sSet={setSelectedUser}
//         />
//       )}
//       {showAlert && (
//         <Alert severity="warning">Account can not be activated</Alert>
//       )}
//       <Grid
//         container
//         spacing={2}
//         direction="row"
//         mt={4}
//         display="flex"
//         justifyContent="end"
//         mb={2}
//         lg={12}
//       >
//         <Button variant="contained" color="inherit" onClick={logout}>
//           Logout
//         </Button>
//       </Grid>

//       <Grid container direction="row">
//         <Grid item lg={2}>
//           <Typography variant="h4">Filter By</Typography>
//         </Grid>
//         <Grid container lg={10}>
//           <Grid item lg={10}>
//             <Typography variant="h4">
//               User List
//               <Button color="primary">
//                 <CachedIcon onClick={() => window.location.reload()} />
//               </Button>
//             </Typography>
//           </Grid>
//           <Grid item lg={2} display="flex" justifyContent="end">
//             <Button
//               style={{ marginBottom: "5px" }}
//               variant="contained"
//               onClick={changeAccountStatus}
//               disabled={!selectedUser}
//             >
//               Active Account
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>

//       <Grid container direction="row">
//         <Grid item lg={2} mt={1}>
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//               label="Start Date"
//               value={startDate}
//               onChange={handleDate}
//               renderInput={(params) => <TextField {...params} />}
//             />
//           </LocalizationProvider>

//           <br />
//           <br />

//           {/* <FormControl>
//             <InputLabel htmlFor="my-input">
//               <b>Name</b>
//             </InputLabel>
//             <Input
//               type="text"
//               onChange={(event) => {
//                 setName(event.target.value);
//               }}
//             />
//           </FormControl> */}

//           <br />
//           <br />
//         </Grid>
//         <Grid item lg={10}>
//           {/* <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell onClick={() => sorting("profile.displayName")}>
//                   Name
//                 </TableCell>

//                 <TableCell>Work Email (Username)</TableCell>
//                 <TableCell>Secondary Email</TableCell>
//                 <TableCell>
//                   Status
//                   <SortIcon
//                     onClick={() => sorting("status")}
//                     style={{ cursor: "pointer" }}
//                   />
//                 </TableCell>
//                 <TableCell>Person Type</TableCell>
//                 <TableCell>Location</TableCell>
//                 <TableCell>Start Date</TableCell>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Department</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data
//                 .filter((user) => {
//                   //StartDate and Name Filter
//                   // if (startDate === null && name === null) {
//                   //   return user;
//                   // } else if (
//                   //   user.profile.hireDate.includes(startDate) &&
//                   //   user.profile.displayName
//                   //     .toLowerCase()
//                   //     .includes(name.toLowerCase())
//                   // ) {
//                   //   return user;
//                   // }

//                   //Name Filter
//                   // if(name === null){
//                   //   return user;

//                   // } else if(user.profile.displayName.toLowerCase().includes(name.toLowerCase())){
//                   //   return user;
//                   // }

//                   //start date filter
//                   if (startDate === null) {
//                     return user;
//                   } else if (user.profile.hireDate.includes(startDate)) {
//                     return user;
//                   }
//                 })
//                 .map((user, id) => (
//                   <TableRow
//                     id={user.id}
//                     style={
//                       selectedUser?.id === user.id
//                         ? { background: "gray" }
//                         : { background: "#f2f2f2" }
//                     }
//                     key={user.id}
//                     onClick={() => toggleActive(user)}
//                   >
//                     <TableCell>{user.profile.displayName}</TableCell>
//                     <TableCell>{user.profile.email}</TableCell>

//                     <TableCell>{user.profile.secondEmail}</TableCell>
//                     <TableCell>{user.status}</TableCell>
//                     <TableCell>{user.profile.employmentStatus}</TableCell>
//                     <TableCell>{user.profile.workLocation}</TableCell>
//                     <TableCell>{user.profile.hireDate}</TableCell>
//                     <TableCell>{user.profile.title}</TableCell>
//                     <TableCell>{user.profile.department}</TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table> */}

//           <GridComponent
//             dataSource={data}
//             //allowFiltering={true}
//             allowSorting={true}
//             dataSourceChanged={handleRefresh}
//             rowSelected={rowSelected}
//             ref={(g) => setGrid(g)}
//           >
//             <ColumnsDirective>
//               <ColumnDirective field="profile.displayName" headerText="Name" />
//               <ColumnDirective
//                 field="profile.email"
//                 headerText="WorkEmail(Okta Username)"
//               />
//               <ColumnDirective
//                 field="profile.secondEmail"
//                 headerText="Secondary Email "
//               />
//               <ColumnDirective field="status" headerText="Status" />

//               <ColumnDirective
//                 field="profile.employmentStatus"
//                 headerText="Person Type"
//               />
//               <ColumnDirective
//                 field="profile.workLocation"
//                 headerText="Location"
//               />
//               <ColumnDirective
//                 field="profile.hireDate"
//                 headerText="Start Date"
//               />
//               <ColumnDirective field="profile.title" headerText="Title" />
//               <ColumnDirective
//                 field="profile.department"
//                 headerText="Department"
//               />
//             </ColumnsDirective>
//             <Inject services={[Sort, Filter]} />
//           </GridComponent>
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default List;

import React, { useState, useEffect } from "react";
import Test_Data from "../../../Components/Table/Test_Data.json";
import "../../../Components/Table/table.css";
import {
  Alert,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
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

import { authFetch } from "../../../provider/AuthProvider";

function List() {
  const { oktaAuth, authState } = useOktaAuth();
  // useEffect(() => {
  //   authFetch(
  //     'https://dev-52092247.okta.com/api/v1/users?search=profile.hireDate Eq "2021-10-30"'
  //   ).then((res) => console.log(res));
  // }, []);

  const accessToken = authState?.accessToken;
  console.log("access token : " , accessToken?.accessToken)
  //  global fetch
  const response = fetch("https://dev-52092247.okta.com/api/v1/users", {
    method: "GET",
    //mode: "no-cors",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => {
    console.log("Okta Response :", res);
  });

  const [data, setData] = useState(Test_Data);

  //const [name, setName] = useState("");

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

  const sortByStatus = (colName, forProfile) => {
    console.log("data", [...data]);
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

  console.log("AuthState", authState);
  if (!authState) return null;

  const logout = async () => oktaAuth.signOut();

  const toggleActive = (user) => {
    console.log(user);
    setShowAlert(false);

    setShowStatusModal({ ...showStatusModal, isSuccess: false });

    if (selectedUser?.id === user.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  const changeAccountStatus = () => {
    console.log("ddd", selectedUser.status);
    if (selectedUser.status !== "STAGED") {
      setShowAlert(true);
      console.log(showAlert);
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
        lg={12}
      >
        <Button variant="contained" color="inherit" onClick={logout}>
          Logout
        </Button>
      </Grid>

      <Grid container direction="row">
        <Grid item lg={2}>
          <Typography variant="h4">Filter By</Typography>
        </Grid>
        <Grid container lg={10}>
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

          {/* <FormControl>
            <InputLabel htmlFor="my-input">
              <b>Name</b>
            </InputLabel>
            <Input
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </FormControl> */}

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
                  //StartDate and Name Filter
                  // if (startDate === null && name === null) {
                  //   return user;
                  // } else if (
                  //   user.profile.hireDate.includes(startDate) &&
                  //   user.profile.displayName
                  //     .toLowerCase()
                  //     .includes(name.toLowerCase())
                  // ) {
                  //   return user;
                  // }

                  //Name Filter
                  // if(name === null){
                  //   return user;

                  // } else if(user.profile.displayName.toLowerCase().includes(name.toLowerCase())){
                  //   return user;
                  // }

                  //start date filter
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
