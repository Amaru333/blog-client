import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

//Card Components
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import CardActions from "@material-ui/core/CardActions";

//Form Components
import TextField from "@material-ui/core/TextField";

//Password and toggle visibility components
import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

//CSS
import "../styles/Login.css";

//Card components CSS
const useStyles = makeStyles({
  root: {
    minWidth: 355,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    paddingTop: "20px",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SignUp() {
  //useHistory
  let history = useHistory();

  //Context
  const { authState } = useContext(AuthContext);

  //If user already logged in, redirect to homepage
  if (authState.status) {
    window.location.href = "/";
  }

  //Card style
  const classes = useStyles();

  //States to hold sign up variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //States to hold errors
  const [emailError, setEmailError] = useState();
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();

  //Set fullName
  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  //Set email
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  //Set password and function to toggle view password
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Submitting the form details
  const submit = () => {
    setEmailError(null);
    setUsernameError(null);
    setPasswordError(null);
    axios
      .post("https://blog-amaru.herokuapp.com/user/add", {
        fullName: fullName,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        //Email already exists
        if (response.data.status === 101) {
          setEmailError("Email already in use");
        }

        //Email ID invalid/empty
        if (response.data.status === 102) {
          setEmailError("Please enter a valid email ID");
        }

        //Full name invalid/empty
        if (response.data.status === 103) {
          setUsernameError("Please enter a valid name");
        }

        //Password invalid/empty
        if (response.data.status === 104) {
          setPasswordError("Password must be atleast 6 characters");
        }

        //Data is valid
        if (response.data.status === 100) {
          setEmailError(null);
          setUsernameError(null);
          setPasswordError(null);
          history.push("/login");
        }
      });
  };

  return (
    <div className="blog_login">
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>Sign Up</Typography>

          {/* Input section */}
          <Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "30px",
              }}
            >
              {/* Full Name field */}
              <TextField
                error={usernameError}
                id="outlined-textarea"
                label="Full Name"
                variant="outlined"
                onChange={handleFullName}
                style={{ marginBottom: "20px" }}
                helperText={usernameError ? `${usernameError}` : ""}
              />

              {/* Email field */}
              <TextField
                error={emailError}
                id="outlined-textarea"
                label="Email ID"
                variant="outlined"
                onChange={handleEmail}
                style={{ marginBottom: "20px" }}
                helperText={emailError ? `${emailError}` : ""}
              />

              {/* Password field */}
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                {/* Password label */}
                <InputLabel
                  error={passwordError}
                  htmlFor="outlined-adornment-password"
                >
                  Password
                </InputLabel>

                {/* Password field */}
                <OutlinedInput
                  error={passwordError}
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </div>
            {passwordError && (
              <p
                style={{
                  fontSize: "12px",
                  padding: "5px 0px 0px 10px",
                  margin: "0px",
                  textAlign: "left",
                  color: "#f44336",
                }}
              >
                Password must be atleast 6 characters
              </p>
            )}
          </Typography>
        </CardContent>

        {/*Submit*/}
        <div>
          <button onClick={submit}>Create an account</button>
        </div>
        <div>
          <Typography
            color="textSecondary"
            gutterBottom
            style={{ fontSize: "14px", paddingBottom: "20px" }}
          >
            Already have an account? <a href="/login">Click here</a> to login.
          </Typography>
        </div>
      </Card>
    </div>
  );
}
