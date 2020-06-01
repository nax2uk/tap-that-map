import React, { Component } from "react";
import { storage } from "../firebaseInitialise";
import { Button, Typography, Box, LinearProgress, Avatar, Input } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

class UploadImage extends Component {
  state = {
    image: null,
    url: "",
    progress: 0,
    error: null
  };

  handleChange = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = (event) => {
    event.preventDefault();
    const { image } = this.state;
    if (image === null) { this.setState({ error: "Please choose an image" }) }
    else {

      const { updateMarker } = this.props;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        (error) => {
          // Error function ...
          this.setState({ error: error.message });
        },
        () => {
          // complete function ...

          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              this.setState({ url });
              updateMarker(url);
            });

        }
      );
    }
  };

  render() {
    const { progress, url, error } = this.state;
    return (
      <>
        <Typography variant="h4">Choose a custom marker</Typography>
        <Input type="file" onChange={this.handleChange} />
        <Button
          onClick={this.handleUpload}
          variant="contained"
          color="primary"
        >
          Upload
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        <LinearProgress variant="determinate" value={progress} max="100" />
        <Box className="two-item-box">
          <Typography variant="h4">Current marker:</Typography>
          <Avatar
            src={url || "https://img.icons8.com/emoji/2x/duck-emoji.png"}
            alt="Uploaded Images"
            height="50"
            width="50"
          />
        </Box>
      </>
    );
  }
}

export default UploadImage;
