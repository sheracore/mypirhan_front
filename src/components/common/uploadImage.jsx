import React, { Component } from "react";
import axios from "axios";

class Upload extends Component {
  state = {
    image: null,
  };

  handleImageChange = (e) => {
    const image = e.target.files[0];
    this.setState({
      file: null,
      image: image,
      preview: null,
    });
    this.previewImage(image);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append("image", this.state.image, this.state.image.name);
    console.log("Here", this.state.image);
    let url = "http://localhost:8000/api/billing/designupload/";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload Progress" +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  previewImage = (image) => {
    // const image = this.state.image;
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ preview: reader.result });
      };
      reader.readAsDataURL(image);
    } else {
      // this.setState({ preview: null });
    }
  };

  render() {
    const image = this.state;
    console.log("*******");
    return (
      <div className="App">
        {/* <form onSubmit={this.handleSubmit}> */}

        <input
          style={{ disply: "none" }}
          type="file"
          id="image"
          accept="image/png, image/jpeg, image/jpg"
          onChange={this.handleImageChange}
          required
        />

        <p>
          <img className="design-img" src={this.state.preview} />
        </p>
        {image.image ? <button onClick={this.handleSubmit}>Upload</button> : ""}
        {/* <input type="submit" value="Upload"/> */}
        {/* </form> */}
      </div>
    );
  }
}

export default Upload;
