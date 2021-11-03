// import {
//   Button,
//   Grid,
//   Typography,
//   Stack,
//   Box,
//   InputLabel,
//   IconButton,
//   FormControl,
//   InputAdornment,
//   FilledInput,
// } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { common } from "@mui/material/colors";
// //import { Link } from "react-router-dom";
// import { useHistory } from "react-router";

// import { FunctionComponent, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { VisibilityOff } from "@mui/icons-material";


// import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
// import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

// import { useOktaAuth } from '@okta/okta-react';

// type LoginInputs = {
//   username: string;
//   password: string;
// };

// const Login: FunctionComponent = ({ children }) => {
//   const { oktaAuth, authState } = useOktaAuth();

//   const history = useHistory();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm<LoginInputs>();

 

//   const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
//     console.log(data);

//     const transaction = await oktaAuth.signIn({
//       username: data.username,
//       password: data.password
//     });
//     console.log(transaction)

//     if (transaction.status === 'SUCCESS') {
//       history.push("/");
//     } else {
//       throw new Error('Could not sign in: ' + transaction.status);
//     }

   


//   };
//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => setShowPassword(!showPassword);

//   return (
//     <>
//       <Stack
//         spacing={5}
//         sx={{ height: "100vh" }}
//         justifyContent="center"
//         alignItems="center"
//       >
//         <Grid container justifyContent="center">
//           <Grid item xs={4}>
//             <Grid container justifyContent="center">
//               <Typography variant="h3" sx={{ fontWeight: 500 }}>
//                 Login With...
//               </Typography>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid container justifyContent="center">
//           <Grid item xs={4}>
//             <Box
//               component="form"
//               autoComplete="off"
//               sx={{
//                 border: "1px solid rgba(0, 0, 0, 0.24)",
//                 borderRadius: 2,
//                 p: 8,
//               }}
//             >
//               <Stack spacing={2}>
//                 <FormControl variant="filled">
//                   <InputLabel htmlFor="username">Username</InputLabel>
//                   <FilledInput
//                     {...register("username", { required: true })}
//                     id="username"
//                     type="text"
//                     name="username"
//                     sx={{ mb: 1 }}
//                     disableUnderline={true}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton edge="end">
//                           <AccountCircleIcon />
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                   />
//                 </FormControl>
//                 <FormControl variant="filled">
//                   <InputLabel htmlFor="password">Password</InputLabel>
//                   <FilledInput
//                     {...register("password", { required: true })}
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     sx={{ mb: 2 }}
//                     disableUnderline={true}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                         >
//                           {showPassword ? <Visibility /> : <VisibilityOff />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                   />
//                 </FormControl>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="success"
//                   // component={Link}
//                   // to={`/list`}
//                   onClick={handleSubmit(onSubmit)}
//                   sx={{
//                     p: 1.5,
//                     color: common.white,
//                     fontFamily: "Roboto",
//                     fontSize: "20px",
//                   }}
//                 >
//                   Login
//                 </Button>
//               </Stack>
//             </Box>
//           </Grid>
//         </Grid>
//       </Stack>
//     </>
//   );
// };

// export default Login;
import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget.js';
import { useOktaAuth } from '@okta/okta-react';

const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log('error logging in', err);
  };

  if (!authState) return null;

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <OktaSignInWidget
      config={config}
      onSuccess={onSuccess}
      onError={onError}/>;
};
export default Login;