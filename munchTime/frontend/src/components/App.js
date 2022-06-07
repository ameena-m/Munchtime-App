import React, { Component } from "react";
import { render } from "react-dom";
import CalendarPage from "./Calendar";
import FridgePage from "./Fridge";
import MainPage from "./Main";
import PreferencesPage from "./Preferences";
import ShoppingListPage from "./ShoppingList";
import UpdateFridgePage from "./UpdateFridge";
import LoginPage from "./Login";
import GDPRPage from "./GDPR";
import SignupPage from "./Signup";
import { BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom"

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return <Router>
            <Routes>
                <Route exact path='/' element={<MainPage/>} />
                <Route exact path='/fridge' element={<FridgePage />} />
                <Route exact path='/calendar' element={<CalendarPage />}/>
                <Route exact path='/preferences' element={<PreferencesPage/>}/>
                <Route exact path='/shopping-list' element={<ShoppingListPage/>}/>
                <Route exact path='/update-fridge' element={<UpdateFridgePage/>}/>
                <Route exact path='/login' element={<LoginPage/>}/>
                <Route exact path='/gdpr' element={<GDPRPage/>}/>
                <Route exact path='/signup' element={<SignupPage/>}/>
            </Routes>
        </Router> 
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv)