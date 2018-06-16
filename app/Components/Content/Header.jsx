import React, {Component} from 'react';


// TODO Convert to functional component
class Header extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <nav id='header'>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">Daily-Motivation</a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a onClick={this.props.changePage} href="#" name="registration">Registration</a></li>
                        <li><a onClick={this.props.changePage} href="#" name="delete-account">Delete Account</a></li>
                        <li><a onClick={this.props.changePage} href="#" name="contact">Contact</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
};

export default Header;



