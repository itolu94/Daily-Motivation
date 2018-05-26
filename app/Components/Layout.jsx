import React, {Component} from 'react';
import Header from './Content/Header.jsx';
import Registration from './Content/Registration.jsx'
import Footer from './Content/Footer.jsx';

export default class Layout extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <div id='content' >
                <Header/>
                <Registration/>
                <Footer/>
            </div>
        )
    }
}