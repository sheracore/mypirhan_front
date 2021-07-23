import React, { Component, useState } from "react"

import { Modal, Button } from "react-bootstrap"
import Ckeditor from "./ckEditor"

import Designs from "../mock/mockDesigns"
import Dragable from "./common/dragableBox"
import tshirt from "../assets/tshirt2.png"
import MyModal from "./common/modal"

class Create extends Component {
  state = {
    textData: "test",
    dragElement: [],
    // This key should given by design id from backend
    key: 1,
    textFlag: 0,
    show: false,
  }

  addDesign = (selectedKey) => {
    // Create an empty array that will hold the final JSX output.
    const { key } = this.state
    this.setState({ key: key + 1 })
    const { dragElement } = this.state

    dragElement.push(
      <Dragable
        key={this.state.key}
        dataKey={this.state.key}
        selectedDesignKey={selectedKey}
        onDelete={this.deleteDragableBox}
      />
    )
    this.setState(dragElement)
  }

  buttonTextOnChange = () => {
    const { textFlag } = this.state
    this.setState({ textFlag: !textFlag })
    // console.log(this.state.textFlag);
  }

  handleTextDragElement = (dragableElement, key) => {
    // console.log("ckEditor key ", key);
    this.setState({ key: key + 1 })
    let { dragElement } = this.state
    this.setState({ dragElement: [...dragElement, dragableElement] })
  }

  handleShow = () => this.setState({ show: true })
  onShowChange = (value) => this.setState({ show: value })
  selectedDesign = (key) => this.addDesign(key)

  deleteDragableBox = (key) => {
    const dragElement = this.state.dragElement.filter(
      (elem) => !(elem.key == key)
    )
    console.log("newDragElement ", dragElement)
    this.setState({ dragElement })
  }

  render() {
    const { textFlag, show, dragElement } = this.state
    return (
      <>
        <div className="editor-wrapper">
          <div className="editor-col">
            <div className="editor-col-inside">
              <div className="testdiv"> Here first editor-col-inside</div>
            </div>
            <div className="editor-col-inside">
              <button className="col-actions">محصولات</button>
              <button className="col-actions">آپلود</button>
              <button onClick={() => this.addDesign()} className="col-actions">
                طرح
              </button>
              <Button variant="primary" onClick={this.handleShow}>
                طرح
              </Button>

              <MyModal
                show={show}
                onShow={this.onShowChange}
                onSelectedDesign={this.selectedDesign}
              />
              <button onClick={this.buttonTextOnChange} className="col-actions">
                متن
              </button>
            </div>
          </div>
          <div className="editor-col">
            <img className="product" src={tshirt} alt="product" />
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
    )
  }
}

export default Create
