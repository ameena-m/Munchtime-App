import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default class Login extends Component {

  //The buttons use this variable
  buttonFontSize = "18px";
  textFontSize = "18px";

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      email: "",
      password: "",
      emailIsValid: false,
      passwordIsValid: false,
      tokenIsValid: false,
      loginIsValid: false,
      statusMessage:"Plese enter your username and password and press Verify.",
      loginToken: "",
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.invalidateLogin = this.invalidateLogin.bind(this);
    this.checkToken = this.checkToken.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ 
      email: e.target.value,
    });
    this.invalidateLogin();
    console.log(this.state);
    this.checkEmail();
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
    this.invalidateLogin();
    console.log(this.state);
    this.checkPassword();
  }

  invalidateLogin()
  {
    this.setState({ 
      tokenIsValid: false,
      token: "",
      statusMessage:"Plese enter your username and password and press Verify.",
    });
  }

  checkEmail() {
    console.log("Checking if email is valid...");
    this.setState({
      emailIsValid:
        this.state.email.length > 4 ||
        this.state.email == "admin@munchtime.co.uk", //THIS DOESN'T WORK!
    });
  }
  checkPassword() {
    console.log("Checking if password is valid...");
    this.setState({
      passwordIsValid:
        this.state.password.length > 4 || this.state.password == "admin", //THIS DOESN'T WORK!
    });
  }

  checkToken() {
    console.log("Checking if token is valid...");
    this.setState({
      tokenIsValid:
        this.state.loginToken != "", //if the token is empty then it's invalid
    });
    if (this.state.tokenIsValid==true)
    {
      this.setState({
        statusMessage:
          "Login successful, press Next."
      });
    }
    else
    {
      this.setState({
        statusMessage:
          "Error, try again."
      });
    }
    console.log(this.state.tokenIsValid);
  }

  //THIS IS THE REAL DEAL
  //This function should send the username and password to the API
  //All other functions are smoke and mirrors
  handleLogin() {
    const requestLogin = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
    };
    fetch("/api/login", requestLogin)
      .then((response) => response.json())
      .then((json) => {
        console.log(JSON.stringify(json));
        this.setState({
          items: json,
          DataisLoaded: true,
          jsonData: json,
          loginToken: this.state.items.token,
        });
        this.checkToken();
      });
    console.log(this.state);
  }

  /*
  handleLoginOld() {
    this.emailIsValid();
    this.passwordIsValid();
    if (
      this.state.emailIsValid == true &&
      this.state.passwordIsValid == true &&
      this.state.email != "" &&
      this.state.password != ""
    ) {
      this.props.history.push("/" + data.code); //THIS DOES NOT WORK!
      console.log("OK");
    }
  }*/

  render() {
    return (
      <Grid container spacing={4}>
        {/* Text */}
        <Grid item xs={12} align="center">
          <Typography component="h1" variant="h1">
            Login
          </Typography>
        </Grid>

        {/* Username Field. All mentions of "Email" actually mean "Username"*/}
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
                    label={this.error === "true" ? "Error" : "Username"}
                    defaultValue=""
                    helpertext="Incorrect entry"
                    onChange={this.handleEmailChange}
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
            to="/gdpr"
            component={Link}
            disabled={!this.state.tokenIsValid} 
          >
            Next
          </Button>
        </Grid>

        {/* TESTING THE API */}
        <Grid item xs={12} align="center">
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "#469f74",
              padding: "10px 26px",
              fontSize: this.buttonFontSize,
            }}
            variant="contained"
            onClick={this.handleLogin}
          >
            Verify
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
            to="/signup"
            component={Link}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    );
  }
}
