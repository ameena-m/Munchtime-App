import React, { Component } from "react";
import Button from '@mui/material/Button';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

 
export default class FridgePage extends Component {
    defaultUser = " ";
    buttonFontSize = "18px";
    textFontSize = "18px";

    constructor(props){
        super(props);
        this.state = {
            userId: this.defaultUser,
        }
     
    }

    render(){
        return (
         <Grid container spacing = {4}>
            <Grid item xs = {12} align = "center">
                
                <Typography component = 'h1' variant='h1'>
                    Munchtime.
                </Typography>
            </Grid>
            <Grid item xs = {12} align = "center">
                <Typography component = 'h6' variant='h6'>
                    Automated tailoring of preference based weekly eats and a shopping list that covers what you need. 
                </Typography>
            </Grid>
            <Grid item xs = {12} align = "center">
                <Typography component = 'h6' variant='h6'>
                    Discover new ways of using your food in nourishing recipes. 
                </Typography>
            </Grid>
                <Grid item xs ={12} align = "center">
                    <Button style=
                    {{
                        borderRadius: 10,
                        backgroundColor: "#469f74",
                        padding: "10px 26px",
                        fontSize: this.buttonFontSize,
                        }} 
                        variant="contained" 
                        to="/calendar" 
                        component = {Link}>
                        My Calendar
                    </Button>
                </Grid>
                <Grid item xs ={12} align = "center">
                    <Button style=
                    {{
                        borderRadius: 10,
                        backgroundColor: "#2572b2",
                        padding: "10px 26px",
                        fontSize: this.buttonFontSize,
                        }} 
                        variant="contained" 
                        to="/fridge" 
                        component = {Link}>
                        My Fridge
                    </Button>
                </Grid>
            </Grid>);
    }
}