import React, { Component } from "react";
import { auth } from "../firebaseInitialise";
import {
  Paper,
  Button,
  Typography,
  TextField,
  FormGroup,
} from "@material-ui/core";
import UploadImage from "./UploadImage";

class UserNameForm extends Component {
  state = {
    nickname: "",
    userImage: "https://img.icons8.com/emoji/2x/duck-emoji.png",
    error: null,
  };

  updateUser = () => {
    const { updateUserNameAndImage } = this.props;
    const { nickname, userImage } = this.state;
    let user = auth.currentUser;
    user
      .updateProfile({
        displayName: nickname,
        photoURL: userImage,
      })
      .then(() => {
        console.log(nickname, userImage);
        updateUserNameAndImage(nickname, userImage);
      })
      .catch((error) => {
        this.setState({ error: error.message })
      });
  };

  handleChange = (event) => {

    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();
    this.updateUser();
  };

  updateMarker = (URL) => {
    this.setState({
      userImage: URL,
    });
  };

  render() {
    const { error } = this.state;
    return (

      <Paper elevation={3} id="username-form-wrapper">
        <Typography variant="h2" align="center">
          Enter Username
          </Typography>
        <FormGroup id="username-form">
          <TextField
            label="nickname"
            variant="outlined"
            margin="normal"
            id="nickname"
            name="nickname"
            type="nickname"
            error={error !== null}
            helperText={error}
            value={this.state.nickname}
            onChange={this.handleChange}
            required
          />
          <UploadImage updateMarker={this.updateMarker} />
          <Button variant="contained" color="primary" onClick={this.submit}>
            Submit
            </Button>
        </FormGroup>
      </Paper>

    );
  }
}

export default UserNameForm;
