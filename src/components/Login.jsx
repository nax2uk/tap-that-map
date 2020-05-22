import React, { Component } from 'react';
import { auth } from '../firebaseInitialise'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    login = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then()
            .catch(error => {
                console.log(error);
            })

    }

    signup = (event) => {
        event.preventDefault();
        auth
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then()
            .catch(error => { console.log(error); })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ email: "", password: "" });
    }

    handleChange = (event) => {
        console.log(event);
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    render() {
        return (
            <div id="login">
                <form id="login-form">
                    <label>Email address</label>
                    <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} required />
                    <label>Password</label>
                    <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} required />
                    <button type="submit" onClick={this.login}>Login</button>
                    <button type="submit" onClick={this.signup}>Sign Up</button>
                </form>
            </div >
        );
    }
}

export default Login;