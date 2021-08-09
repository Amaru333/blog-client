import React, { useState, useContext } from "react";

//Context
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
import axios from "axios";

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

export default function Login() {
  //Card Style
  const classes = useStyles();

  //Context
  const { authState, setAuthState } = useContext(AuthContext);

  //If user has already logged in, redirect to homepage
  if (authState.status) {
    window.location.href = "/";
  }

  //States to hold login variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //States to hold login errors
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

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

  //Login function
  const login = () => {
    setEmailError(null);
    setPasswordError(null);
    axios
      .post("https://blog-amaru.herokuapp.com/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 111) {
          setEmailError("Email doesn't exist");
        } else if (response.data.status === 112) {
          setPasswordError("Wrong email & password combination");
        } else if (response.data.status === 110) {
          setEmailError(null);
          setPasswordError(null);
          localStorage.setItem("accessToken", response.data.accessToken);
          setAuthState({
            email: response.data.email,
            id: response.data.id,
            name: response.data.name,
            status: true,
          });
        }
      });
  };

  return (
    <div className="blog_login">
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>Login</Typography>

          {/* Input section */}
          <Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "30px",
              }}
            >
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
                Incorrect Password
              </p>
            )}
          </Typography>
        </CardContent>
        <div>
          <button onClick={login}>Sign In</button>
        </div>
        <div>
          <Typography
            color="textSecondary"
            gutterBottom
            style={{ fontSize: "14px", paddingBottom: "20px" }}
          >
            Don't have an account? <a href="/signup">Click here</a> to sign up.
          </Typography>
        </div>
      </Card>
    </div>
  );
}
