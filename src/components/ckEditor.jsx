import React, { Component } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Modal, Button } from "react-bootstrap";
import Dragable from "./common/dragableBox";

// import parse from "html-react-parser";

const editorConfiguration = {
  fontFamily: {
    options: [
      "نستعلیق",
      "نیصبوری",
      "طلایی",
      "علی",
      "فرزین",
      "سرای",
      "زنجیر",
      "دارا-جادو",
      "دارا-پیوسته",
      "دارا-زنجیر",
      "مکتب",
      "یگانه",
      "Abiland",
      "mrsmonsterblack",
      "Marlboro",
      "mrsmonsterwhite",
      "bakery",
      "Westhamp_Demo",
      "Sherilla",
      "MalitoFashion",
      "Blackout",
      "Debug",
      "AlotOfLove",
      "BamsGlitchDemoRegular",
      "CalibrationGothicNbpLatin",
      "CfGlitchCityRegular",
      "DaughterOfAGlitch",
      "EctogasmRegular",
      "ElectricShocker",
      "GlitchBold",
      "GlitchInside",
      "GlitchSmasherRegular",
      "MckGlitchRegular",
      "Ninjos",
      "ParametricGlitchBold",
      "RealYoung",
      "SonOfAGlitchItalic",
      "TrinitarianRhapsody",
    ],
    supportAllValues: true,
  },
  fontSize: {
    options: [13, 17, "default", 19, 21, 29, 32, 39, 42, 50, 55, 60],
  },

  toolbar: [
    "bold",
    "italic",
    "fontfamily",
    "fontSize",
    "insertTable",
    "undo",
    "redo",
  ],
};

class Ckeditor extends Component {
  state = {
    textData: "",
    key: this.props.currentKey + 1,
  };

  deleteDragableBox = (key) => {
    this.props.onTextDelete(key);
  };

  handleClose = () => {
    this.props.onShow(false);
  };

  addText = (textData) => {
    // Create an empty array that will hold the final JSX output.
    const { key } = this.state;
    this.setState({ key: key + 1 });

    this.props.onChange(
      <Dragable
        onDelete={this.deleteDragableBox}
        dataKey={this.state.key}
        key={this.state.key}
        text={textData}
      />,
      key
    );
    this.handleClose();
  };

  render() {
    const { textData } = this.state;
    const { show } = this.props;
    return (
      <>
        <Modal show={show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>متن دلخواه با فونت های فارسی و انگلیسی</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CKEditor
              editor={Editor}
              config={editorConfiguration}
              // data="<p>Hello from CKEditor 5!</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ textData: data });
                // console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                // console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                // console.log("Focus.", editor);
              }}
            />
            <button
              onClick={() => this.addText(textData)}
              className="text-button"
            >
              ADD
            </button>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Ckeditor;
