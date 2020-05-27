import React, { Component } from "react";
import { auth } from "../firebaseInitialise";
import { Button, TextField, Typography } from "@material-ui/core";
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
      <>
        <Typography variant="h2" align="center">
          Enter Username
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
          <UploadImage updateMarker={this.updateMarker} />
          <Button variant="contained" color="secondary" onClick={this.submit}>
            Submit
          </Button>
        </form>
      </>
    );
  }
}

export default UserNameForm;
