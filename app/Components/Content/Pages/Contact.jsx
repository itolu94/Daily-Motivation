import React, {Component} from 'react';
import API from '../../../Utility/API.jsx';


export default class Contact extends Component {
    constructor(){
        super();
        this.state ={
            email: '',
            message: '',
            response: '',
            option: "Select One",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        let {email, message, option} = this.state;
        if(option !== "Select One"){
            let data = {email, message, option};
            API.contact(data, (response) =>{
                if(response.status=== 200) this.setState({response: response.data});
                else this.setState({response: "Oops.. something went wrong.  Please try again later"});
            });
        } else {
            this.setState({response: "Please select an option"});
        }
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        return(
            <div id='delete-account-div' className="container">
                <div className="row pages-div">
                    <div className="col m8 offset-m2 center-align">
                        <h3 id='delete-account-header'>Please enter your email and message.</h3>
                        <p>{this.state.response}</p>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type='text'
                                name='email'
                                placeholder='Email Address'
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                            <select name="option" value={this.state.option} onChange={this.handleChange}>
                                <option value="Select One">Select One</option>
                                <option value="New Quote">New Quote</option>
                                <option value="Registration Error">Registration Error</option>
                                <option value="Delete Account">Delete Account</option>
                                <option value="Other">Other</option>
                            </select>
                            <textarea
                                name='message'
                                row="10"
                                columns="30"
                                maxLength="200"
                                placeholder='Enter your message'
                                value={this.state.message}
                                onChange={this.handleChange}
                                required
                            />
                            <input className='' type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}