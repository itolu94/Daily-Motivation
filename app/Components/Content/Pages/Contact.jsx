import React, {Component} from 'react';
import API from '../../../Utility/API.jsx';


export default class Contact extends Component {
    constructor(){
        super()
        this.state ={
            email: '',
            message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        let {email, message} = this.state;
        if(email && message){
            let data = {email, message};
            API.contact(data, (response) =>{
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
                <div className="row pages-div">
                    <div className="col m8 offset-m2 center-align">
                        <h3 id='delete-account-header'>Please enter your email and message.</h3>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type='text'
                                name='email'
                                placeholder='Email Address'
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                            <textarea
                                name='message'
                                row="10"
                                columns="30"
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