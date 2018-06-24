import React, {Component} from 'react';
import Header from './Content/Pages/Contact/Header.jsx';
import Registration from './Content/Pages/Registration/Registration.jsx';
import DeleteAccount from './Content/Pages/DeleteAccount/DeleteAccount.jsx';
import Contact from './Content/Pages/Contact/Contact.jsx';
import Footer from './Content/Footer.jsx';
import {LayoutDiv} from "./Layout.style.jsx";

export default class Layout extends Component {
    constructor(){
        super();
        this.state={
            page: ''
        };
        this.changePage =  this.changePage.bind(this);
    }

    changePage(e){
        this.setState({page: e.target.name});
    }

    renderPage(){
        switch(this.state.page){
            case "registration":
                return <Registration/>
            case "delete-account":
                return <DeleteAccount/>
            case "contact":
                return <Contact/>
            default:
                return <Registration />
        }
    }
    render(){
        return(
            <LayoutDiv>
                <Header changePage={this.changePage} />
                {this.renderPage()}
                <Footer/>
            </LayoutDiv>
        )
    }
}