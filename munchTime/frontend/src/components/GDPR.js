import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@material-ui/core/Box";

export default class GDPR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: false,
    };

    this.handleAccept = this.handleAccept.bind(this);
  }

  handleAccept() {
    console.log(this.state);
    //Is this how it should be done? I have no idea. It seems to complicated for turning a boolean into the opposite
    //But I have no idea how any of this works anyway

    if (this.state.accepted == false) {
      console.log("That which is false is now true");
      this.setState({
        accepted: true,
      });
    } else {
      console.log("That which is true is now false");
      this.setState({
        accepted: false,
      });
    }
  }

  render() {
    return (
      <Box mx={30}>
        <Grid container spacing={4} alignItems="center" justify="center">
          <Grid item xs={12} align="left">
            <Typography component="body1" variant="body1">
              <h1>MunchTime GDPR Privacy Policy </h1>

              <h2>This privacy policy will explain how MunchTime uses the personal
              data we collect from you when you use our website.{" "}</h2>

              <h2>What data do we collect? </h2>
              <h3>MunchTime collects the following data:
              <br></br>E-mail address <br></br> Password{" "}</h3> 

              <h2>How do we collect your data?</h2> 
              <h3>You directly provide MunchTime with all of the data we collect. We collect data and
              process data when you: 
              <br></br>Create an account
              <br></br> Contact us via email<br></br>{" "}
              MunchTime does not receive your data indirectly from any source.{" "}</h3>

              <h2>How will we use your data?</h2> 
              <h3>MunchTime collects your data so that we can: 
              <br></br>Offer synchronization of your Fridge, Schedule and Shopping List across different devices</h3>{" "}

              <h2>How do we store your data?</h2> 
              <h3>MunchTime stores your data in our online database, provided by the DigitalOcean service.
              <br></br>
              MunchTime will keep your data until you either contact us to
              remove it or after 6 months of account inactivity. Then we will
              continue to store your data for up to 2 months. Until this time
              period has expired, we will delete your data by removing it from
              our online database. 
              </h3>

              <h2>Cookies</h2>
              <h3>Cookies are text files placed on your computer to collect standard
              Internet log information and visitor behavior information. When
              you visit our websites, we may collect information from you
              automatically through cookies or similar technology For further
              information, visit allaboutcookies.org.</h3>

              <h2>How do we use cookies?</h2> 
              <h3>MunchTime uses cookies in a range of ways to improve your experience on our website, including:
              <br></br>Keeping you signed in
              </h3>{" "}
              
              <h2>
              What types of cookies do we use?
              </h2>
              <h3>There are a number of different types of cookies, however, our
              website uses:
              <br></br>Session cookies – These cookies are temporary and expire
              once you close your browser (or once your session ends). MunchTime
              uses them to keep you signed in while using our website. 
              
              <br></br>
              The cookies MunchTime uses are first-party cookies. These are
              cookies that are put on your device directly by the website you
              are visiting.</h3> 
              
              <h2>Changes to our privacy policy</h2>
              <h3>
              MunchTime keeps its privacy policy under regular review and places
              any updates on this page. This privacy policy was last updated on
              24 March 2022.</h3>
              <h2>How to contact us</h2>
              <h3>
              If you have any questions about MunchTime’s privacy policy, the
              data we hold on you, or you would like to exercise one of your
              data protection rights, please do not hesitate to contact us.
              <br></br>Email us at the following address:
              <br></br>VXS088@student.bham.ac.uk (Data Protection Officer)
              </h3>
            </Typography>
          </Grid>

          <Grid item xs="auto">
            {" "}
            {/* This is the only way it stays centered */}
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={this.handleAccept} />}
                label="I have read and I accept the privacy policy"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              disabled={!this.state.accepted}
              color="primary"
              size="large"
              variant="contained"
              to="/"
              component={Link}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
