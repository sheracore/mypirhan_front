import React, { Component } from "react";
import { Redirect } from "react-router";
import auth from "../services/authService";
import { Modal, Button } from "react-bootstrap";
import { getDesigns, getDesign, deleteDesign } from "../services/designService";
import { getAll, remove, getById } from "../services/apiService";
import {
  getProducts,
  getProduct,
  deleteProduct,
} from "../services/productService";
import { getDesignCategories } from "../services/designCategoryService";
import Form from "./common/form";
import Joi from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
import DesignForm from "./designForm";
import ProductForm from "./productForm";

class AdminDashboard extends Component {
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
    products: [],
    searchQuery: "",
    selectedDesignsCategory: [],
    showPicture: false,
    showUpload: false,
    selectedImage: null,
    selectedImageFront: null,
    selectedImageBack: null,
    selectedImageLeft: null,
    selectedImageRight: null,
    selectedImageKey: null,
    productFlag: null,
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

  componentDidMount() {
    getAll("/billing/designappend/")
      .then((res) => {
        const designs = res.data;
        this.setState({ designs });
      })
      .catch((err) => console.log(err, "!!!!!!!!!"));

    getAll("/product/products/")
      .then((res) => {
        const products = res.data;
        this.setState({ products });
      })
      .catch((err) => console.log(err, "!!!!!!!!!"));
  }

  handleClose = () => {
    this.setState({ showPicture: false, showUpload: false });
  };

  handleDeleteDesign = () => {
    const { selectedImageKey } = this.state;
    remove("/billing/designappend/", selectedImageKey)
      .then((res) => {
        const designs = this.state.designs.filter(
          (d) => d.id !== selectedImageKey
        );
        this.setState({ designs });
        console.log("In adminDashboard design deleted");
      })
      .catch((err) => console.log(err, "This design has already been deleted"));
    this.setState({ showPicture: false, showUpload: false });
  };

  handleDeleteProduct = () => {
    const { selectedImageKey } = this.state;
    remove("/product/products/", selectedImageKey)
      .then((res) => {
        const products = this.state.products.filter(
          (d) => d.id !== selectedImageKey
        );
        this.setState({ products });
        console.log("In adminDashboard a product deleted");
      })
      .catch((err) =>
        console.log(err, "This product has already been deleted")
      );
    this.setState({ showPicture: false, showUpload: false });
  };

  selectDesign = (key) => {
    getById("/billing/designappend/", key)
      .then(({ data }) => {
        console.log("In adminDashboard design getById");
        const imageurl = data.image;
        const selectedImage = imageurl;
        const selectedImageKey = key;
        this.setState({ selectedImage, selectedImageKey });
      })
      .catch((err) => console.log(err));
    this.setState({ showPicture: true, productFlag: false });
  };

  addDesign = () => this.setState({ showUpload: true, productFlag: false });

  selectProduct = (key) => {
    // const { data } = getProduct(key);
    getById("/product/products/", key)
      .then(({ data }) => {
        const selectedImageFront = data.image_front;
        const selectedImageBack = data.image_back;
        const selectedImageLeft = data.image_side_left;
        const selectedImageRight = data.image_side_right;
        const selectedImageKey = key;
        this.setState({
          selectedImageFront,
          selectedImageBack,
          selectedImageLeft,
          selectedImageRight,
          selectedImageKey,
        });
        this.setState({ showPicture: true, productFlag: true });
      })
      .catch((err) => console.log(err));
  };

  addProduct = () => this.setState({ showUpload: true, productFlag: true });

  handlePreviewImage = (imageUrl) => {
    this.setState({ preview: imageUrl });
  };

  render() {
    const {
      data,
      designsCategoty,
      designs,
      searchQuery,
      selectedDesignsCategory,
      selectedImage,
      selectedImageFront,
      selectedImageBack,
      selectedImageLeft,
      selectedImageRight,
      selectedCategory,
      products,
      productFlag,
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
            {productFlag ? (
              <div className="product_img_wrapper">
                <img
                  className="dashboard-products-img"
                  src={selectedImageFront}
                  alt="product img front"
                ></img>
                <img
                  className="dashboard-products-img"
                  src={selectedImageBack}
                  alt="product img back"
                ></img>
                <img
                  className="dashboard-products-img"
                  src={selectedImageLeft}
                  alt="product img left"
                ></img>
                <img
                  className="dashboard-products-img"
                  src={selectedImageRight}
                  alt="product img right"
                ></img>
              </div>
            ) : (
              <img
                className="dashboard-desings-img"
                src={selectedImage}
                alt="design img"
              ></img>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="btn btn-danger"
              onClick={
                productFlag ? this.handleDeleteProduct : this.handleDeleteDesign
              }
            >
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
                alt="modal-designs-img"
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
            {productFlag ? (
              <ProductForm previewImage={this.handlePreviewImage} />
            ) : (
              <DesignForm previewImage={this.handlePreviewImage} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <p>
              <img className="design-img" src={this.state.preview} />
            </p>
          </Modal.Footer>
        </Modal>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="admin-dashboard-header">محصولات</div>
        <div className="admin-dashboard-wapper">
          {products.map((product) => (
            <button
              key={product.id}
              className="modal-desings"
              onClick={() => this.selectProduct(product.id)}
            >
              <img
                className="modal-desings-img"
                src={product.image_front}
                alt="modal-products-image"
              />
            </button>
          ))}
        </div>
        <button className="dashboard-add-btn" onClick={() => this.addProduct()}>
          اضافه کردن
        </button>
      </>
    );
  }
}

export default AdminDashboard;
