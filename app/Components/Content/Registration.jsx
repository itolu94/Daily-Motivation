import React, {Component} from 'react';


export default class Registration extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            firstName: '',
            email: '',
            phoneNumber: '',
        }
    }

    handleSubmit(e){
        e.preventDefault();
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <div id='registration-div' className="container">
                <div className="row login">
                    <div className="col m8 offset-m2 center-align">
                        <h3 id='registration-header'> Sign up to receive free motivational quotes to start your day</h3>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder='First Name'
                                value={this.state.firstName}
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
                                value={this.props.phoneNumber}
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