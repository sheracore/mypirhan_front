import React, { Component, useState } from "react";

import { Modal, Button } from "react-bootstrap";
import Ckeditor from "./ckEditor";
import Upload from "./common/uploadImage";
import Dragable from "./common/dragableBox";
import tshirt from "../assets/tshirt2.png";
import DesignModal from "./common/modal";
import ProductModal from "./productModal";
import { getById } from "../services/apiService";

class Create extends Component {
  state = {
    textData: "test",
    dragElement: [],
    key: 0,
    showCKEditor: false,
    showDesign: false,
    showProduct: false,
    showUploadImage: false,
    productImageMain: tshirt,
    productImages: [],
  };

  addDesign = (selectedKey) => {
    // Create an empty array that will hold the final JSX output.
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

  onProductImageChang = (img) => {
    this.setState({ productImageMain: img });
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
    } = this.state;

    console.log("products", productImages);

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
              <Upload
                show={showUploadImage}
                onShow={this.handleShowUploadImageChange}
                onChange={this.handleUploadDragElement}
                imageUrl={this.handleUploadImage}
              />
              <button className="col-actions" onClick={this.handleShowDesign}>
                طرح
              </button>

              <ProductModal
                show={showProduct}
                onShow={this.onShowProductChange}
                onSelectedProduct={this.selectedProduct}
              />
              <DesignModal
                show={showDesign}
                onShow={this.onShowDesignChange}
                onSelectedDesign={this.selectedDesign}
              />
              <button onClick={this.buttonTextOnChange} className="col-actions">
                متن
              </button>
            </div>
          </div>
          <div className="editor-col">
            <img className="product" src={productImageMain} alt="product" />
            <div>{dragElement}</div>
            <div className="product-sides">
              {productImages.map((img) => (
                <button onClick={() => this.onProductImageChang(img)}>
                  <img className="product" src={img} alt="product imgs" />
                </button>
              ))}
            </div>
          </div>
          <div className="editor-col">
            <div className="text-editor">
              <Ckeditor
                show={showCKEditor}
                onShow={this.onShowCkeditorChange}
                onChange={this.handleTextDragElement}
                currentKey={this.state.key}
                onTextDelete={this.deleteDragableBox}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;
