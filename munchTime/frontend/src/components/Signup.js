import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default class Signup extends Component {
  //The buttons use this variable
  buttonFontSize = "18px";
  textFontSize = "18px";

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      usernameIsValid: false,
      emailIsValid: false,
      passwordIsValid: false,
      statusMessage: "Enter an email, username and password."
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
    console.log(this.state);
    this.usernameIsValid();
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
    console.log(this.state);
    this.emailIsValid();
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
    console.log(this.state);
    this.passwordIsValid();
  }

  emailIsValid() {
    console.log("Checking if email is valid...");
    this.setState({
      emailIsValid:
        this.state.email.length > 4 ||
        this.state.email == "admin@munchtime.co.uk", //THIS DOESN'T WORK!
    });
  }

  usernameIsValid() {
    console.log("Checking if username is valid...");
    this.setState({
      usernameIsValid:
        this.state.username.length > 4 || this.state.password == "admin", //THIS DOESN'T WORK!
    });
  }

  passwordIsValid() {
    console.log("Checking if password is valid...");
    this.setState({
      passwordIsValid:
        this.state.password.length > 4 || this.state.password == "admin", //THIS DOESN'T WORK!
    });
  }

  handleSignup() {
    const requestLogin = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
        email: this.state.email,
      }),
    };
    fetch("/api/create-user", requestLogin)
      .then((response) => response.json())
      .then((json) => {
        console.log(JSON.stringify(json));
        this.setState({
          items: json,
          jsonData: json,
          statusMessage: "Account created successfully. Go to Login."
        });
      });
    console.log(this.state);
  }

  render() {
    return (
      <Grid container spacing={4}>
        {/* Text */}
        <Grid item xs={12} align="center">
          <Typography component="h1" variant="h1">
            Sign up
          </Typography>
        </Grid>

        {/* Email Field */}
        <Grid item xs={12} align="center">
          <FormControl>
            <FormHelperText>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "60ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required={true}
                    error={!this.state.emailIsValid && this.state.email != ""}
                    id={
                      this.error === "true"
                        ? "outlined-required"
                        : "outlined-error-helper-text"
                    }
                    label={this.error === "true" ? "Error" : "Email address"}
                    defaultValue=""
                    helpertext="Incorrect entry"
                    onChange={this.handleEmailChange}
                  />
                </div>
              </Box>
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Username Field */}
        <Grid item xs={12} align="center">
          <FormControl>
            <FormHelperText>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "60ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required={true}
                    error={
                      !this.state.usernameIsValid && this.state.username != ""
                    }
                    id={
                      this.error === "true"
                        ? "outlined-required"
                        : "outlined-error-helper-text"
                    }
                    label={this.error === "true" ? "Error" : "Username"}
                    defaultValue=""
                    helpertext="Incorrect entry"
                    onChange={this.handleUsernameChange} //!!!MUST BE CHANGED TO handleUsernameChange!!!
                  />
                </div>
              </Box>
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* Password Field */}
        <Grid item xs={12} align="center">
          <FormControl>
            <FormHelperText>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "60ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required={true}
                    error={
                      !this.state.passwordIsValid && this.state.password != ""
                    }
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    helpertext="Incorrect entry"
                    autoComplete="current-password"
                    onChange={this.handlePasswordChange}
                  />
                </div>
              </Box>
            </FormHelperText>
          </FormControl>
        </Grid>

        {/* This button doesn't work yet. Thus it has been commented out
          <Button
            color="success"
            size="large"
            variant="contained"
            onClick={this.handleLogin}
          >
            Next
        </Button> */}

        {/* STATUS TEXT - shows if there is an error*/}
        <Grid item xs={12} align="center">
          <Typography component="h6" variant="h6">
          {this.state.statusMessage}
          </Typography>
        </Grid>

        {/* Next Button (mostly works) */}
        <Grid item xs={12} align="center">
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "#469f74",
              padding: "10px 26px",
              fontSize: this.buttonFontSize,
            }}
            variant="contained"
            onClick={this.handleSignup}
          >
            Create Account
          </Button>
        </Grid>

        {/* This buttons should work */}
        <Grid item xs={12} align="center">
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "#2572b2",
              padding: "10px 26px",
              fontSize: this.buttonFontSize,
            }}
            variant="contained"
            to="/"
            component={Link}
          >
            Back
          </Button>
        </Grid>

        {/* This buttons should work */}
        <Grid item xs={12} align="center">
        <Button
            style={{
              borderRadius: 10,
              backgroundColor: "#2572b2",
              padding: "10px 26px",
              fontSize: this.buttonFontSize,
            }}
            variant="contained"
            to="/login"
            component={Link}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }
}
