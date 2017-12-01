import React, { Component } from 'react'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        fetch('/users')
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse.data)
            .then ((usersData) => {
                this.setState({
                    users: usersData
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <div className="Login">
                <h1>Welcome to HealthyEats!</h1>
                {this.state.users.map(user =>
                    <div key={user.username}>{user.username}</div>
                )}
            </div>
        )
    }
}

export default Login
