import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: ''
        };

        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);

        this.signup = this.signup.bind(this);
        this.close = this.close.bind(this);
    }

    render() {
        return(
            <div className="Login">
                <h1>Register for HealthyEats</h1>
                <Input placeholder='Username' size='big'
                       onChange = {this.usernameChange} id='usernameInput'/>
                <Input placeholder='Password' size='big'
                       onChange={this.passwordChange} id='passwordInput'/>
                <Input placeholder='Username' size='big'
                       onChange = {this.firstNameChange} id='usernameInput'/>
                <Input placeholder='Username' size='big'
                       onChange = {this.lastNameChange} id='usernameInput'/>
                <Button id="signup" onClick={this.signup}>
                    Sign Up
                </Button>
                <Button id="close" onClick={this.close}>
                    Close
                </Button>
            </div>
        )
    }

    // Handler functions
    usernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    passwordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    firstNameChange(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    lastNameChange(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    signup() {
        let username = this.state.username;
        let password = this.state.password;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let postObject = {
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName
        };

        let data = JSON.stringify(postObject);

        let url = '/users';
        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: data
        })
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse.data)
        .then((data) => {
            this.props.history.push({
                pathname: '/recipes'
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    close() {
        this.props.history.push({
            pathname: '/login'
        });
    }
}

export default SignUp
