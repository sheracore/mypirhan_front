import React, { Component, useState } from "react";

import { Modal, Button } from "react-bootstrap";
import Ckeditor from "./ckEditor";
import Upload from "./common/uploadImage";
// import Designs from "../mock/mockDesigns"
import Dragable from "./common/dragableBox";
import tshirt from "../assets/tshirt2.png";
import DesignModal from "./common/modal";
import ProductModal from "./productModal";
import { getById } from "../services/apiService";

class Create extends Component {
  state = {
    textData: "test",
    dragElement: [],
    // This key should given by design id from backend
    key: 0,
    textFlag: 0,
    uploadFlag: 0,
    showDesign: false,
    showProduct: false,
    productImage: tshirt,
  };

  addDesign = (selectedKey) => {
    // Create an empty array that will hold the final JSX output.
    const { key, dragElement } = this.state;
    this.setState({ key: key + 1 });

    console.log("****************", key);

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
    // Create an empty array that will hold the final JSX output.
    // const { key, dragElement } = this.state;
    // this.setState({ key: key + 1 });

    getById("/product/products/", selectedKey)
      .then(({ data }) => {
        console.log(data);
        const productImage = data.image_front;
        this.setState({ productImage });
      })
      .catch((err) => console.log(err));
    console.log("****************", selectedKey);

    // dragElement.push(
    //   <Dragable
    //     key={this.state.key}
    //     dataKey={this.state.key}
    //     selectedDesignKey={selectedKey}
    //     onDelete={this.deleteDragableBox}
    //   />
    // );
    // this.setState(dragElement);
  };

  buttonTextOnChange = () => {
    const { textFlag } = this.state;
    this.setState({ textFlag: !textFlag });
    // console.log(this.state.textFlag);
  };

  buttonUploadOnChange = () => {
    const { uploadFlag } = this.state;
    this.setState({ uploadFlag: !uploadFlag });
    // console.log(this.state.textFlag);
  };

  handleTextDragElement = (dragableElement, key) => {
    // console.log("ckEditor key ", key);
    this.setState({ key: key + 1 });
    let { dragElement } = this.state;
    this.setState({ dragElement: [...dragElement, dragableElement] });
  };

  // handleUploadDragElement = (dragableElement, key) => {
  //   // console.log("ckEditor key ", key);
  //   this.setState({ key: key + 1 });
  //   let { dragElement } = this.state;
  //   this.setState({ dragElement: [...dragElement, dragableElement] });
  // };
  hanleUploadImage = (imgUrl) => {
    const { key, dragElement } = this.state;
    this.setState({ key: key + 1 });

    console.log("****************", key);

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
  onShowDesignChange = (value) => this.setState({ showDesign: value });
  handleShowProduct = () => this.setState({ showProduct: true });
  onShowProductChange = (value) => this.setState({ showProduct: value });
  selectedDesign = (key) => this.addDesign(key);
  selectedProduct = (key) => this.addProduct(key);

  deleteDragableBox = (key) => {
    const dragElement = this.state.dragElement.filter(
      (elem) => !(elem.key == key)
    );
    console.log("newDragElement ", dragElement);
    this.setState({ dragElement });
  };

  render() {
    const {
      textFlag,
      uploadFlag,
      showDesign,
      showProduct,
      dragElement,
      productImage,
    } = this.state;
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
              {uploadFlag ? (
                <Upload
                  onChange={this.handleUploadDragElement}
                  imageUrl={this.hanleUploadImage}
                />
              ) : (
                ""
              )}
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
            <img className="product" src={productImage} alt="product" />
            <div>{dragElement}</div>
          </div>
          <div className="editor-col">
            <div className="text-editor">
              {textFlag ? (
                <Ckeditor
                  onChange={this.handleTextDragElement}
                  currentKey={this.state.key}
                  onTextDelete={this.deleteDragableBox}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Create;
