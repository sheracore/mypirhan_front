import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

import { Redirect } from "react-router";
import auth from "../services/authService";
import { Modal, Button } from "react-bootstrap";
import {
  getDesigns,
  getDesign,
  deleteDesign,
  saveDesign,
  apiEndpoint,
} from "../services/designService";
import {
  getDesignCategories,
  deleteDesignCategory,
} from "../services/designCategoryService";
import { create, getAll } from "../services/apiService";
import Designs from "../mock/mockDesigns";
import { getCategoryDesigns } from "../mock/mockCategoryDesigns";
import axios from "axios";
import { toast } from "react-toastify";

class ProductForm extends Form {
  state = {
    data: {
      name: "",
      design_append_price_irr: "",
      type_name: "",
    },
    image: null,
    errors: {},
    designsCategoty: [],
    designs: [],
    searchQuery: "",
    selectedDesignsCategory: [],
    selectedImage: null,
    selectedImageKey: null,
    selectValue: "",
    preview: null,
  };

  schema = {
    name: Joi.string().required().label("نام طرح"),
    type_name: Joi.number().integer().required().label("دسته بندی"),
    design_append_price_irr: Joi.number()
      .integer()
      .required()
      .label("قیمت طرح (ریال)"),
  };

  async componentDidMount() {
    getAll("/billing/designappendcategory/")
      .then(({ data: designsCategoty }) => {
        this.setState({ designsCategoty });
      })
      .catch((err) => console.log(err));
  }

  handleImageChange = (e) => {
    const image = e.target.files[0];
    // const { data } = this.state;
    // data["image"] = image;
    this.setState({ image });
    // console.log(image, "%%%%");
    this.previewImage(image);
  };

  previewImage = (image) => {
    // const image = this.state.image;
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ preview: reader.result });
        this.props.previewImage(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      // this.setState({ preview: null });
    }
  };

  handleSelectChange = (e) => {
    const { data } = this.state;
    data["design_append_category"] = e.target.value;
    this.setState({ data });
  };

  doSubmit = () => {
    console.log("Befor api service...");
    let form_data = new FormData();
    const { data, image } = this.state;
    form_data.append("image", image);
    form_data.append("design_append_category", data.type_name);
    form_data.append("design_append_price_irr", data.design_append_price_irr);
    form_data.append("name", data.name);
    console.log("Here", form_data);

    const header = { "content-type": "multipart/form-data" };
    create("/billing/designappend/", form_data, {}, header)
      .then((res) => {
        if (res) {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));

    // this.setState({ showPicture: false, showUpload: false });
    window.location.reload();
  };

  render() {
    const { designsCategoty, data } = this.state;
    console.log("data :", data);

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          {designsCategoty.length > 0 &&
            this.renderSelect("type_name", "دسته بندی", designsCategoty)}
          {this.renderInput("name", "نام طرح")}
          {this.renderInput("design_append_price_irr", "قیمت طرح (ریال)")}
          {this.renderImgUploadButton("image")}
          {this.renderButton("بارگذاری")}
        </form>
      </>
    );
  }
}

export default ProductForm;
