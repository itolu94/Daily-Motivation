import React, {Component} from 'react';


export default class Header extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <nav id='header'>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">Daily-Motivation</a>
                </div>
            </nav>
        )
    }
}



