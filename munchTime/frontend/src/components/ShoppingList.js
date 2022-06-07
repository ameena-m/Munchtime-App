import React, { Component } from "react";
import Button from '@mui/material/Button';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {Link} from "react-router-dom";


 
export default class ShoppingListPage extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
         <Grid container spacing = {4}>
            <Grid item xs = {12} align = "center">
                <Typography component = 'h3' variant='h3'>
                    Shopping List. 
                </Typography>
            </Grid>

            <Grid item xs = {12} align = "center">
                <FormControl component = "fieldset">
                    <FormHelperText>
                        <div align = 'center'>
                            <h2>Food items & recipe specific quantities displayed here</h2>
                        </div>
                    </FormHelperText>

                </FormControl>
            </Grid>
                <Grid item xs = {12} align = "center">
                    <FormControl>
                        
                        <FormHelperText>
                            <div align = "center">
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
                    <Button color = "primary" variant="contained">
                        Save shopping list
                    </Button>
            </Grid>
         </Grid>);
    }
}