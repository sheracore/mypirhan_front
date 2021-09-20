import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { create } from "../../services/apiService";

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

  handleClose = () => {
    this.props.onShow(false);
  };

  handleSubmit = () => {
    let form_data = new FormData();
    form_data.append("image", this.state.image, this.state.image.name);
    const header = {};
    create("/billing/designupload/", form_data, {}, header)
      .then(({ data }) => {
        console.log(data);
        this.props.imageUrl(data.image);
        this.handleClose();
      })
      .catch((err) => console.log(err));
    console.log("Here form_data", form_data);
  };

  previewImage = (image) => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ preview: reader.result });
      };
      reader.readAsDataURL(image);
    } else {
    }
  };

  render() {
    const { show } = this.props;
    const image = this.state;
    console.log(show);
    return (
      <>
        <Modal show={show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="App">
              <input
                style={{ disply: "none" }}
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={this.handleImageChange}
                required
              />
              <p>
                <img
                  className="design-img"
                  src={this.state.preview}
                  alt="design-img"
                />
              </p>
              {image.image ? (
                <button onClick={this.handleSubmit}>Upload</button>
              ) : (
                ""
              )}
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Upload;
