import React, {Component} from 'react';
import API from '../../../Utility/API.jsx';

export default class DeleteAccount extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            phoneNumber: '',
            response: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        let {email, phoneNumber} = this.state;
        let data = {email, phoneNumber};
        API.deleteAccount(data, (response) =>{
            if(response.status === 200 || response.status === 404) this.setState({response: response.data});
            else this.setState({response: "Oops.. something went wrong.  Please try again later"});
        })
    }
    handleChange(e){
            this.setState({[e.target.name]: e.target.value});
    }
    render(){
        return(
            <div id='delete-account-div' className="container">
                <div className="row pages-div">
                    <div className="col m8 offset-m2 center-align">
                        <h3 id='delete-account-header'>To delete your account, please enter your email address and phone number</h3>
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
                            <input
                                type='text'
                                name='phoneNumber'
                                placeholder='Phone Number'
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                                required
                            />
                            <input className='' type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}