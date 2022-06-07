import React, { Component } from "react";
import Button from '@mui/material/Button';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {Link} from "react-router-dom";
import IndeterminateCheckbox from "./Checkbox";


 
export default class PreferencesPage extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
         <Grid container spacing = {4}>
            <Grid item xs = {12} align = "center">
                <Typography component = 'h3' variant='h3'>
                    Change Preferences. 
                </Typography>
            </Grid>

            <Grid item xs = {12} align = "center">
                <FormControl component = "fieldset">
                    <FormHelperText>
                        <div align = 'center'>
                            <h2>Add Entries Here.</h2>
                        </div>
                    </FormHelperText>

                </FormControl>
            </Grid>
                <Grid item xs = {12} align = "center">
                    <FormControl>
                        <FormHelperText>
                            <div align = "center">
                                <IndeterminateCheckbox/>
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
            <Grid item xs ={12} align = "center">
            <Button color = "primary" variant="contained" to="/calendar" component = {Link}>
                        Back
                    </Button>
            </Grid>
            <Grid item xs ={12} align = "center">
                    <Button color = "success" size= "large" variant="contained" to="/update-fridge" component = {Link}>
                        Next
                    </Button>
            </Grid>
         </Grid>);
    }
}

