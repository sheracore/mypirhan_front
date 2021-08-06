import React, { Component } from "react";
import { Redirect } from "react-router";
import auth from "../services/authService";
import { Modal, Button } from "react-bootstrap";
import {
  getDesigns,
  getDesign,
  deleteDesign,
  saveDesign,
  apiEndpoint
} from "../services/designService";
import {
  getDesignCategories,
  deleteDesignCategory,
} from "../services/designCategoryService";
import Form from "./common/form";
import Designs from "../mock/mockDesigns";
import Joi from "joi-browser";
import { getCategoryDesigns } from "../mock/mockCategoryDesigns";
import axios from 'axios'
import { toast } from "react-toastify";

class AdminDashboard extends Form {
  state = {
    data: {
      image: null,
      name: "",
      design_append_price_irr: "",
      design_append_category: null,
    },
    errors: {},
    designsCategoty: [],
    designs: [],
    searchQuery: "",
    selectedDesignsCategory: [],
    showPicture: false,
    showUpload: false,
    selectedImage: null,
    selectedImageKey: null,
    selectValue: "",
    preview: null
  };

  schema = {
    name: Joi.string().required().label("نام طرح"),
    design_append_price_irr: Joi.number().integer().required().label("قیمت طرح (ریال)"),
  };

  async componentDidMount() {
    const { data } = await getDesignCategories();
    const designsCategoty = [{ id: "", type_name: "All" }, ...data];
    const { data: designs } = await getDesigns();
    this.setState({ designs, designsCategoty });
  }

  handleClose = () => {
    this.setState({ showPicture: false, showUpload: false });
  };

  handleDeleteDesign = async () => {
    const {designs:originalDesign, selectedImageKey} = this.state;
    const designs = this.state.designs.filter((d) => d._id !== selectedImageKey);
    this.setState({ designs });

    try {
      await deleteDesign(selectedImageKey);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      this.setState({ designs: originalDesign });
    }
    this.setState({ showPicture: false, showUpload: false });
    window.location.reload();
  }

  selectDesign = async (key) => {
    const { data } = await getDesign(key);
    const imageurl = data.image;
    const selectedImage = imageurl;
    const selectedImageKey = key
    this.setState({ selectedImage, selectedImageKey });
    this.setState({ showPicture: true });
  };

  addDesign = () => {
    this.setState({ showUpload: true });
    // const { uploadFlag } = this.state;
    // this.setState({ uploadFlag: !uploadFlag });
    // console.log(this.state.textFlag);
  };

  handleImageChange = (e) => {
    const image = e.target.files[0];
    const { data } = this.state
    data["image"] = image
    this.setState({ data });
    console.log(image, "%%%%");
    this.previewImage(image);
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

  handleSelectChange = (e) => {
    const { data } = this.state
    data['design_append_category'] = e.target.value
    this.setState({data });
  };

  handleSubmit = async () => {
    let form_data = new FormData();
    const { data } = this.state;
    form_data.append("image", data.image)
    form_data.append("design_append_category", data.design_append_category)
    form_data.append("design_append_price_irr", data.design_append_price_irr)
    form_data.append("name", data.name)
    console.log("Here",form_data );
    // await saveDesign(data);
    axios
    .post(apiEndpoint, form_data, {
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

    this.setState({ showPicture: false, showUpload: false });
    window.location.reload();
    
  };

  render() {
    const {
      data,
      designsCategoty,
      designs,
      searchQuery,
      selectedDesignsCategory,
      selectedImage,
      selectedCategory,
    } = this.state;
    if (!auth.getCurrentUser()) return <Redirect to="/login" />;
    return (
      <>
        <Modal
          show={this.state.showPicture}
          onHide={this.handleClose}
          animation={false}
        >
          {/* <Modal.Header closeButton> */}
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ‌<img className="dashboard-desings-img" src={selectedImage}></img>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="btn btn-danger" onClick={this.handleDeleteDesign}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="admin-dashboard-header">طرح ها</div>
        <div className="admin-dashboard-wapper">
          {designs.map((design) => (
            <button
              key={design.id}
              className="modal-desings"
              onClick={() => this.selectDesign(design.id)}
            >
              {/* {this.convertToBase64(design.image)} */}
              {/* {console.log(this.convertToBase64(design.image), "Hereee")} */}
              <img
                className="modal-desings-img"
                src={design.image}
                alt="modal-designs-image"
              />
              {/* <p>{design.name}</p> */}
              {/* {console.log(typeof design.image, design.image)} */}
            </button>
          ))}
        </div>
        <button className="dashboard-add-btn" onClick={() => this.addDesign()}>
          اضافه کردن
        </button>
        <Modal
          show={this.state.showUpload}
          onHide={this.handleClose}
          animation={false}
        >
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>دسته بندی</p>
            <select
              className="dashboart-select"
              value={this.state.selectedCategory}
              onChange={this.handleSelectChange}
            >
              {designsCategoty.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.type_name}
                </option>
              ))}
            </select>
            <form>
              {this.renderInput("name", "نام طرح")}
              {this.renderInput("design_append_price_irr", "قیمت طرح (ریال)")}
            </form>
            <input
              style={{ disply: "none" }}
              type="file"
              id="image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={this.handleImageChange}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-primary" onClick={this.handleSubmit}>
              بارگذاری
            </Button>
            <p>
              <img className="design-img" src={this.state.preview} />
            </p>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AdminDashboard;
