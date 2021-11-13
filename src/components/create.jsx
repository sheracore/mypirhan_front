import React, { Component } from "react";
import { withRouter } from "react-router";
import Ckeditor from "./ckEditor";
import Upload from "./common/uploadImage";
import Dragable from "./common/dragableBox";
import tshirt from "../assets/tshirt2.png";
import DesignModal from "./common/modal";
import ProductModal from "./productModal";
import { getAll, getById } from "../services/apiService";

class Create extends Component {
  state = {
    textData: "test",
    dragElement: [],
    key: 0,
    showCKEditor: false,
    showDesign: false,
    showProduct: false,
    showUploadImage: false,
    productImageMain: "",
    productImages: [],
    allProductColors: [],
    productColors: [],
  };

  componentDidMount() {
    const designImgFromHome = this.props.location.state;
    getAll("/product/productcolors/")
      .then(({ data: allProductColors }) => this.setState({ allProductColors }))
      .catch((err) => console.log(err));

    getAll("/product/products/")
      .then(({ data }) => {
        let {
          productImageMain,
          productImages,
          allProductColors,
          productColors,
        } = this.state;
        const product = data[0];

        productImages = [];
        productImageMain = product.image_front;
        productImages.push(product.image_front);
        productImages.push(product.image_back);
        productImages.push(product.image_side_right);
        productImages.push(product.image_side_left);

        productColors = allProductColors.filter(
          (p) => p.product === product.id
        );
        this.setState({ productImageMain, productImages, productColors });
      })
      .catch((err) => console.log(err));

    if (designImgFromHome) {
      console.log("Here comes :", designImgFromHome.designId);
      this.addDesign(designImgFromHome.designId);
    }
  }

  addDesign = (selectedKey) => {
    const { key, dragElement } = this.state;
    this.setState({ key: key + 1 });

    dragElement.push(
      <Dragable
        key={this.state.key}
        dataKey={this.state.key}
        selectedDesignKey={selectedKey}
        onDelete={this.deleteDragableBox}
      />
    );
    this.setState(dragElement);
  };

  addProduct = (selectedKey) => {
    let { allProductColors, productColors } = this.state;

    getById("/product/products/", selectedKey)
      .then(({ data }) => {
        let { productImages } = this.state;
        productImages = [];
        productImages.push(data.image_front);
        productImages.push(data.image_back);
        productImages.push(data.image_side_right);
        productImages.push(data.image_side_left);
        const productImageMain = data.image_front;
        this.setState({ productImageMain, productImages });
      })
      .catch((err) => console.log(err));

    productColors = allProductColors.filter((p) => p.product === selectedKey);
    this.setState({ productColors });
  };

  handleTextDragElement = (dragableElement, key) => {
    this.setState({ key: key + 1 });
    let { dragElement } = this.state;
    this.setState({ dragElement: [...dragElement, dragableElement] });
  };

  handleUploadImage = (imgUrl) => {
    const { key, dragElement } = this.state;
    this.setState({ key: key + 1 });
    dragElement.push(
      <Dragable
        key={key}
        dataKey={key}
        imageUploadUrl={imgUrl}
        onDelete={this.deleteDragableBox}
      />
    );
    this.setState(dragElement);
  };

  handleShowDesign = () => this.setState({ showDesign: true });
  handleShowProduct = () => this.setState({ showProduct: true });
  handleShowUploadImage = () => this.setState({ showUploadImage: true });
  buttonUploadOnChange = () => this.setState({ showUploadImage: true });
  buttonTextOnChange = () => this.setState({ showCKEditor: true });
  onShowDesignChange = (value) => this.setState({ showDesign: value });
  onShowProductChange = (value) => this.setState({ showProduct: value });
  onShowCkeditorChange = (value) => this.setState({ showCKEditor: value });
  handleShowUploadImageChange = (value) =>
    this.setState({ showUploadImage: value });
  selectedDesign = (key) => this.addDesign(key);
  selectedProduct = (key) => this.addProduct(key);

  deleteDragableBox = (key) => {
    const dragElement = this.state.dragElement.filter(
      (elem) => !(elem.key == key)
    );
    console.log("newDragElement ", dragElement);
    this.setState({ dragElement });
  };

  onProductImageChange = (img) => {
    this.setState({ productImageMain: img });
  };

  onProductImageColorChange = (img) => {
    let { productImages, productImageMain } = this.state;
    productImages = [];
    productImages.push(img.image_front);
    productImages.push(img.image_back);
    productImages.push(img.image_side_right);
    productImages.push(img.image_side_left);
    productImageMain = img.image_front;

    this.setState({ productImages, productImageMain });
  };

  render() {
    const {
      textFlag,
      showDesign,
      showProduct,
      dragElement,
      productImageMain,
      productImages,
      showUploadImage,
      showCKEditor,
      allProductColors,
      productColors,
    } = this.state;

    console.log("props", this.props, this.props.location.state);

    return (
      <>
        <div className="editor-wrapper">
          <div className="editor-col">
            <div className="editor-col-inside">
              <div className="testdiv"> Here first editor-col-inside</div>
            </div>
            <div className="editor-col-inside">
              <button className="col-actions" onClick={this.handleShowProduct}>
                محصولات
              </button>
              <button
                onClick={this.buttonUploadOnChange}
                className="col-actions"
              >
                آپلود
              </button>
              <button className="col-actions" onClick={this.handleShowDesign}>
                طرح
              </button>
              <button onClick={this.buttonTextOnChange} className="col-actions">
                متن
              </button>
              <ProductModal
                show={showProduct}
                onShow={this.onShowProductChange}
                onSelectedProduct={this.selectedProduct}
              />
              <Upload
                show={showUploadImage}
                onShow={this.handleShowUploadImageChange}
                onChange={this.handleUploadDragElement}
                imageUrl={this.handleUploadImage}
              />
              <DesignModal
                show={showDesign}
                onShow={this.onShowDesignChange}
                onSelectedDesign={this.selectedDesign}
              />
              <Ckeditor
                show={showCKEditor}
                onShow={this.onShowCkeditorChange}
                onChange={this.handleTextDragElement}
                currentKey={this.state.key}
                onTextDelete={this.deleteDragableBox}
              />
            </div>
          </div>
          <div className="editor-col">
            <img className="product" src={productImageMain} alt="product" />
            <div>{dragElement}</div>
            <div className="product-sides">
              {productImages.map((img) => (
                <button
                  className="product-btn"
                  key={img}
                  onClick={() => this.onProductImageChange(img)}
                >
                  <img className="product-img" src={img} alt="product imgs" />
                </button>
              ))}
            </div>
          </div>
          <div className="editor-col">
            <div className="product-color-wrapper">
              <h6 className="text-center">رنگبندی</h6>
              {productColors.length > 0 &&
                productColors.map((p) => (
                  <button
                    className="product-colors-btn"
                    key={p.id}
                    onClick={() => this.onProductImageColorChange(p)}
                  >
                    <img
                      className="product-colors-img"
                      src={p.image_front}
                      alt="product img color"
                    />
                  </button>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Create);
