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
      company_name: "",
      category_type: "",
      product_brand: "",
      product_name: "",
      color: "",
      weight_gram: "",
      price_irr: "",
      discount: "",
      units_in_stock: "",
      units_on_order_per_day: "",
      size: "",
      product_description: "",
    },
    product_available: false,
    discount_available: false,
    available_size: false,
    available_colors: false,
    images: {
      image_front: "",
      image_back: "",
      image_side_left: "",
      image_side_right: "",
    },
    name: "",
    design_append_price_irr: "",
    design_append_category: null,
    errors: {},
    suppliers: [],
    categories: [],
    searchQuery: "",
    selectedImage: null,
    selectedImageKey: null,
    selectValue: "",
    preview: null,
  };

  schema = {
    product_brand: Joi.string().required().label("نام برند"),
    product_name: Joi.string().required().label("نام محصول"),
    color: Joi.string().required().label("رنگ محصول"),
    weight_gram: Joi.number().integer().required().label("وزن محصول(گرم)"),
    price_irr: Joi.number().integer().required().label("(قیمت)قیمت محصول"),
    discount: Joi.number().integer().required().label("(درصد)تخفیف"),
    units_in_stock: Joi.number().integer().required().label("تعداد در انبار"),
    units_on_order_per_day: Joi.number()
      .integer()
      .required()
      .label("تعداد سفارش در روز"),
    size: Joi.any().valid("XXL", "XL", "L", "M", "S").label("سایز"),
    product_description: Joi.string().required().label("توضیحات محصول"),
    category_type: Joi.number().integer().required().label("دسته بندی محصول"),
    company_name: Joi.number().integer().required().label("شرکت تامیین کننده"),
  };

  async componentDidMount() {
    getAll("/product/suppliers/")
      .then(({ data: suppliers }) => {
        this.setState({ suppliers });
      })
      .catch((err) => console.log(err));

    getAll("/product/categories/")
      .then(({ data: categories }) => {
        this.setState({ categories });
      })
      .catch((err) => console.log(err));
  }

  handleImageChange = (e, name) => {
    const image = e.target.files[0];
    const { images } = this.state;
    images[name] = image;
    this.setState({ images });
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

  handleSelectChange = (e, type) => {
    const { data } = this.state;
    data[type] = e.target.value;
    this.setState({ data });
  };

  doSubmit = async () => {
    console.log("Hereeee");
    let form_data = new FormData();
    const {
      data,
      images,
      product_available,
      discount_available,
      available_size,
      available_colors,
    } = this.state;
    form_data.append("supplier", data.company_name);
    form_data.append("category", data.category_type);
    form_data.append("product_brand", data.product_brand);
    form_data.append("product_name", data.product_name);
    form_data.append("color", data.color);
    form_data.append("weight_gram", data.weight_gram);
    form_data.append("price_irr", data.price_irr);
    form_data.append("discount", data.discount);
    form_data.append("units_in_stock", data.units_in_stock);
    form_data.append("units_on_order_per_day", data.units_on_order_per_day);
    form_data.append("size", data.size);
    form_data.append("product_description", data.product_description);
    form_data.append("image_front", images.image_front);
    form_data.append("image_back", images.image_back);
    form_data.append("image_side_left", images.image_side_left);
    form_data.append("image_side_right", images.image_side_right);
    form_data.append("available_colors", available_colors);
    form_data.append("available_size", available_size);
    form_data.append("discount_available", discount_available);
    form_data.append("product_available", product_available);

    console.log(
      data,
      images,
      product_available,
      discount_available,
      available_size,
      available_colors
    );

    const header = { "content-type": "multipart/form-data" };
    create("/product/products/", form_data, {}, header)
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
    const {
      suppliers,
      categories,
      supplier,
      category,
      data,
      images,
      product_available,
      discount_available,
      available_size,
      available_colors,
    } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("category_type", "دسته بندی", categories)}
          {this.renderSelect("company_name", "تامین کننده", suppliers)}
          {this.renderInput("product_brand", "نام برند")}
          {this.renderInput("product_name", "نام محصول")}
          {this.renderInput("color", "رنگ محصول")}
          {this.renderInput("weight_gram", "وزن محصول(گرم)")}
          {this.renderInput("price_irr", "قیمت محصول(ریال)")}
          {this.renderInput("discount", " (درصد)تخفیف")}
          {this.renderInput("units_in_stock", "تعداد در انبار")}
          {this.renderInput("units_on_order_per_day", "تعداد سفارش در روز")}
          {this.renderInput("size", "سایز")}
          {this.renderInput("product_description", "توضیحات محصول")}
          {this.renderCheckBox("product_available", "موجودی محصول")}
          {this.renderCheckBox("discount_available", "موجودی تخفیف")}
          {this.renderCheckBox("available_size", "سایزبندی")}
          {this.renderCheckBox("available_colors", "رنگبندی")}
          {this.renderImgUploadButton("image_front")}
          {this.renderImgUploadButton("image_back")}
          {this.renderImgUploadButton("image_side_left")}
          {this.renderImgUploadButton("image_side_right")}
          {this.renderButton("بارگذاری")}

          {/* {this.renderSelect("genreId", "Genre", this.state.genres)} */}
        </form>
      </>
    );
  }
}

export default ProductForm;
