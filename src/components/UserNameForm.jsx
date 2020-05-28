import React, { Component } from "react";
import { auth } from "../firebaseInitialise";
import {
  Paper,
  Button,
  Typography,
  TextField,
  FormGroup,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../resources/theme.jsx";
import UploadImage from "./UploadImage";

class UserNameForm extends Component {
  state = {
    nickname: "",
    userImage: "https://img.icons8.com/emoji/2x/duck-emoji.png",
    error: null,
  };

  // UID = auth.currentUser.UID

  // storageRef = storage.ref();
  // imagesRef = this.storageRef.child(`images`)
  // userAvatar = this.imagesRef.child(this.UID)

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
  };

  updateMarker = (URL) => {
    this.setState({
      userImage: URL,
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    );
  }
}

export default UserNameForm;
