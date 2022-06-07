import React, { Component } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {Link} from "react-router-dom";
import { DateRangeOutlined } from "@material-ui/icons";
import ListDividers from "./Divider";
import IndeterminateCheckbox from "./Checkbox";



export default class CalendarPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false,
            buttonPressed: "B",
        };
       
        this.handleFillButtonPressed = this.handleFillButtonPressed.bind(this);
        this.handleBreakfastPressed = this.handleBreakfastPressed.bind(this);
        this.handleLunchPressed = this.handleLunchPressed.bind(this);
        this.handleDinnerPressed = this.handleDinnerPressed.bind(this);
    }

    handleFillButtonPressed(){
        const requestCalendarFill = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('/api/autofill', requestCalendarFill)
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                this.setState({
                    items: json,
                    DataisLoaded: true,
                });
            })
        
    }

    handleBreakfastPressed(){
        this.setState({
            buttonPressed: "B",
        });
    }

    handleLunchPressed(){
        this.setState({   
            buttonPressed: "L",
        });
    }

    handleDinnerPressed(){
        this.setState({
            buttonPressed: "D",
        });
    }

    render(){
        const { DataisLoaded, items } = this.state;
        const jsonObj = JSON.stringify(this.state.items);

        return (
         <Grid container spacing = {4}>
            <Grid item xs = {12} align = "center">
                <Typography component = 'h2' variant='h2'>
                    Create your calendar here 
                </Typography>
            </Grid>
            
            <Grid item xs = {12} align = "center">
                <FormControl component = "fieldset">
                    <FormHelperText>
                        <div align = 'center'>
                            <h2>Weekly plan of meals</h2>
                        </div>
                    </FormHelperText>
                    
                    <div align = 'center'>
                    <ButtonGroup color="success" size="large" aria-label="large button group">
                        <Button key= "breakfast" onClick = {this.handleBreakfastPressed}>Breakfast</Button>
                        <Button key = "lunch" onClick = {this.handleLunchPressed}>Lunch</Button>
                        <Button key= "dinner" onClick = {this.handleDinnerPressed}>Dinner</Button>
                    </ButtonGroup>

                    <ListDividers items={this.state.items} buttonPressed={this.state.buttonPressed}/>
                    </div>
                </FormControl>
            </Grid>
            <Grid item xs ={12} align = "center">
                    <Button style=
                    {{
                        borderRadius: 10,
                        backgroundColor: "#469f74",
                        padding: "10px 26px",
                        fontSize: this.buttonFontSize,
                        }}  variant="contained" onClick = {this.handleFillButtonPressed}>
                        Autofill My Calendar.
                    </Button>
            </Grid>
            <Grid item xs ={12} align = "center">
                    <Button style=
                    {{
                        borderRadius: 10,
                        backgroundColor: "#2572b2",
                        padding: "10px 26px",
                        fontSize: this.buttonFontSize,
                        }}  variant="contained" align = "center" to="/preferences" component = {Link} >Change my preferences</Button>
            </Grid>
            <Grid item xs ={12} align = "center">
                    <Button style=
                    {{
                        borderRadius: 10,
                        backgroundColor: "#2572b2",
                        padding: "10px 26px",
                        fontSize: this.buttonFontSize,
                        }}  variant="contained" to="/" component = {Link}>
                        Back to Main
                    </Button>
            </Grid>
            <Grid item xs ={12} align = "center">
                    <Button style=
                    {{
                        borderRadius: 10,
                        backgroundColor: "#2572b2",
                        padding: "10px 26px",
                        fontSize: this.buttonFontSize,
                        }}  variant="contained" to="/shopping-list" component = {Link}>
                        Weekly Shopping List
                    </Button>
            </Grid>
           
         </Grid>);
    }
}


