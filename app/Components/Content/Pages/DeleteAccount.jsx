import React, {Component} from 'react';
import API from '../../../Utility/API.jsx';

export default class DeleteAccount extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            phoneNumber: '',
        };
        this.deleteAccount = this.deleteAccount.bind(this);
    }
    deleteAccount(e){
        e.preventDefault();
        let {email, phoneNumber} = this.state;
        if(email && phoneNumber){
            let data = {email, phoneNumber};
            API.deleteAccount(data, (response) =>{
              console.log(respone);
            })
        }
    }
    handleChange(e){
            this.setState({[e.target.name]: e.target.value});
    }
    render(){
        return(
            <div id='delete-account-div' className="container">
                <div className="row login">
                    <div className="col m8 offset-m2 center-align">
                        <h3 id='delete-account-header'>To delete your account, please enter your email address and phone number</h3>
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
                                value={this.props.phoneNumber}
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