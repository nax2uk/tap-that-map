import React, { Component } from 'react';
import { auth } from "../firebaseInitialise";
import { Button, TextField, ThemeProvider, Paper, Typography } from "@material-ui/core";
import theme from "../resources/theme.jsx";

class UserNameForm extends Component {
    state = {
        error: null
    };

    updateUser = () => {
        const { updateUserNameAndImage } = this.props;
        let user = auth.currentUser;
        const { nickname, userImage } = this.state;

        user
            .updateProfile({
                displayName: nickname,
                photoURL: userImage,
            })
            .then(() => {
                updateUserNameAndImage(nickname, userImage);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleChange = (event) => {
        // console.log(event);
        const { name, value } = event.target;
        this.setState({ [name]: value });
        // this.updateUser()
    };

    submit = (event) => {
        event.preventDefault();
        this.updateUser();
    }

    render() {
        return (
            <>
                <Typography variant="h2" align="center">
                    Enter Username and PhotoID URL
                </Typography>
                <form id="username-form">
                    <TextField
                        label="nickname"
                        variant="outlined"
                        margin="normal"
                        id="nickname"
                        name="nickname"
                        type="nickname"
                        value={this.state.nickname}
                        onChange={this.handleChange}
                        required
                    />
                    <TextField
                        label="image url"
                        variant="outlined"
                        margin="normal"
                        id="image url"
                        name="image url"
                        type="image url"
                        value={this.state.update}
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" color="secondary" onClick={this.submit}>
                        Submit
                </Button>
                </form>
            </>
        );
    }
}

export default UserNameForm;