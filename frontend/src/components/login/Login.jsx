import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };

        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    render() {
        return(
            <div className="Login">
                <h1>HealthyEats</h1>
                <Input placeholder='Username' size='big'
                       onChange = {this.usernameChange} id='usernameInput'/>
                <Input placeholder='Password' size='big'
                       onChange={this.passwordChange} id='passwordInput'/>
                <Button id="login" onClick={this.login}>
                    Login
                </Button>
                <h4>Don't have an account?</h4>
                <Button id="signup" onClick={this.signup}>
                    Sign Up
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

    login() {
        let username = this.state.username;
        let password = this.state.password;

        let url = '/users/' + username;
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse.data)
            .then((user) => {
                if (password === user[0].password) {
                    this.props.history.push({
                        pathname: '/recipes'
                    });
                } else {
                    console.log('login unsuccessful');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    signup() {
        this.props.history.push({
            pathname: '/signup'
        });
    }
}

export default Login