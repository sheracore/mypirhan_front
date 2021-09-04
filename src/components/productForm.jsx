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
import create from "../services/apiService";
import Designs from "../mock/mockDesigns";
import { getCategoryDesigns } from "../mock/mockCategoryDesigns";
import axios from "axios";
import { toast } from "react-toastify";

class ProductForm extends Form {
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
    preview: null,
  };

  schema = {
    name: Joi.string().required().label("نام طرح"),
    design_append_price_irr: Joi.number()
      .integer()
      .required()
      .label("قیمت طرح (ریال)"),
  };

  async componentDidMount() {
    const { data } = await getDesignCategories();
    const designsCategoty = [{ id: "", type_name: "All" }, ...data];
    const { data: designs } = await getDesigns();
    this.setState({ designs, designsCategoty });
  }

  handleImageChange = (e) => {
    const image = e.target.files[0];
    const { data } = this.state;
    data["image"] = image;
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

  handleSubmit = async () => {
    let form_data = new FormData();
    const { data } = this.state;
    form_data.append("image", data.image);
    form_data.append("design_append_category", data.design_append_category);
    form_data.append("design_append_price_irr", data.design_append_price_irr);
    form_data.append("name", data.name);
    console.log("Here", form_data);

    console.log(data);
    // **********************************************
    // create();
    // **********************************************

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
    const { designsCategoty } = this.state;

    return (
      <>
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
        <Button variant="btn btn-primary" onClick={this.handleSubmit}>
          کنید بارگذاری
        </Button>
      </>
    );
  }
}

export default ProductForm;
