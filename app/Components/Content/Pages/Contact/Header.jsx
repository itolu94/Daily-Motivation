import React, {Component} from 'react';
import $ from 'jquery';
import {Dropdown, NavItem, Button} from 'react-materialize';

// TODO Convert to functional component
export default class Header extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div>
                <nav id='header'>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo center">Daily-Motivation</a>
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            <li><a onClick={this.props.changePage} href="#" name="registration">Registration</a></li>
                            <li><a onClick={this.props.changePage} href="#" name="delete-account">Delete Account</a></li>
                            <li><a onClick={this.props.changePage} href="#" name="contact">Contact</a></li>
                        </ul>
                        <ul className="sidenav" id="mobile-demo">
                            <Dropdown id="mobile-demo" trigger={
                                <a href="#" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            }>
                                <li><a onClick={this.props.changePage} href="#" name="registration">Registration</a></li>
                                <li><a onClick={this.props.changePage} href="#" name="delete-account">Delete Account</a></li>
                                <li><a onClick={this.props.changePage} href="#" name="contact">Contact</a></li>
                            </Dropdown>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
};





