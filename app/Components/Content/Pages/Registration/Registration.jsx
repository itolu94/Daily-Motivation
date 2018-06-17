import React, {Component} from 'react';
import API from '../../../../Utility/API.jsx';
import {RegistrationDiv, RegistrationHeader} from "./Registration.style.jsx";

export default class Registration extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            userName: '',
            email: '',
            phoneNumber: '',
            response: ''
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let {userName, email, phoneNumber} = this.state;
        let newUser = {userName, email, phoneNumber};
        API.createAccount(newUser, (response)=>{
                console.log(response);
                if(response.status === 200 || response.status === 409) this.setState({response: response.data});
                else this.setState({response: "Oops.. something went wrong.  Please try again later"});
        });
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <RegistrationDiv className="container">
                <div className="row pages-div">
                    <div className="col m8 offset-m2 center-align">
                        <RegistrationHeader > Sign up to receive free motivational quotes to start your day</RegistrationHeader>
                        <p>{this.state.response}</p>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                name="userName"
                                placeholder='First Name'
                                value={this.state.userName}
                                onChange={this.handleChange}
                                required

                            />
                            <input
                                type='text'
                                name='email'
                                placeholder='Email Address'
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                            <input
                                type='text'
                                name='phoneNumber'
                                placeholder='Phone Number'
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                                required
                            />
                            <input className='registration-submit' type="submit"/>
                        </form>
                    </div>
                </div>
            </RegistrationDiv>
        )
    }
}