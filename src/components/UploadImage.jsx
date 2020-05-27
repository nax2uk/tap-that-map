import React, { Component } from "react";
import { storage } from "../firebaseInitialise";

class UploadImage extends Component {
  state = {
    image: null,
    url: "",
    progress: 0,
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
        console.log(error);
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
  };

  render() {
    return (
      <div>
        <h2>Upload an (optional) custom marker</h2>
        <p>Your avatar is High Scoring Dan the Duck</p>
        <div>
          <progress value={this.state.progress} max="100" />
        </div>

        <div>
         
            <span>File</span>
            <input type="file" onChange={this.handleChange} />
          
        </div>
        <button
          onClick={this.handleUpload}
        >
          Upload
        </button>
        <br />
        <br />
        <img
          src={
            this.state.url || "https://img.icons8.com/emoji/2x/duck-emoji.png"
          }
          alt="Uploaded Images"
          height="50"
          width="50"
        />
      </div>
    );
  }
}

export default UploadImage;
