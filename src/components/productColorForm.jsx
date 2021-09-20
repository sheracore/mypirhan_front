import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { create, getAll } from "../services/apiService";

class ProductColorForm extends Form {
  state = {
    data: {
      color: "",
      product_name: "",
    },
    images: {
      image_front: "",
      image_back: "",
      image_side_left: "",
      image_side_right: "",
    },
    products: [],
    errors: {},
  };

  schema = {
    product_name: Joi.number().integer().required().label("محصول"),
    color: Joi.string().required().label("زنگ"),
  };

  componentDidMount() {
    console.log("Hereee");
    getAll("/product/products/")
      .then(({ data: products }) => {
        this.setState({ products });
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

  doSubmit = () => {
    let form_data = new FormData();
    const { data, images } = this.state;
    form_data.append("image_front", images.image_front);
    form_data.append("image_back", images.image_back);
    form_data.append("image_side_left", images.image_side_left);
    form_data.append("image_side_right", images.image_side_right);
    form_data.append("color", data.color);
    form_data.append("product", data.product_name);

    const header = { "content-type": "multipart/form-data" };
    create("/product/productcolors/", form_data, {}, header)
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
    const { products } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          {products.length > 0 &&
            this.renderSelect("product_name", "محصول", products)}
          {this.renderInput("color", "زنگ")}
          {this.renderImgUploadButton("image_front")}
          {this.renderImgUploadButton("image_back")}
          {this.renderImgUploadButton("image_side_left")}
          {this.renderImgUploadButton("image_side_right")}
          {this.renderButton("بارگذاری")}
        </form>
      </>
    );
  }
}

export default ProductColorForm;
