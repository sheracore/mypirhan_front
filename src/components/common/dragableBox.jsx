import React, { Component } from "react";
// import { getDesign } from "../../mock/mockDesigns";
import { getDesign } from "../../services/designService";
import drag from "../../services/dragable";
import parse from "html-react-parser";

class Dragable extends Component {
  state = {
    textFlag: false,
    text: "",
    design: "",
    imageUploadUrl: null,
  };

  async componentDidMount() {
    drag("mydiv");
    if ("selectedDesignKey" in this.props) {
      const { selectedDesignKey } = this.props;
      const { data } = await getDesign(selectedDesignKey);
      this.setState({ design: data.image });
    }
    if ("text" in this.props) {
      const { text } = this.props;
      this.setState({ text });
      this.setState({ textFlag: true });
    }
    if ("imageUploadUrl" in this.props) {
      const { imageUploadUrl: design } = this.props;
      this.setState({ design });
    }
  }

  deleteBox = () => {
    const { dataKey } = this.props;
    this.props.onDelete(dataKey);
  };

  render() {
    const { textFlag, text, design } = this.state;
    console.log(textFlag, text, design);
    return (
      <>
        <div className="mydiv">
          <div className="mydivheader">Move</div>
          <div className="design">
            {textFlag ? (
              <span className="design-text">{parse(text)}</span>
            ) : (
              <img className="design-img" src={design} alt="logo" />
            )}
          </div>
          <button className="design-delete-button" onClick={this.deleteBox}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </>
    );
  }
}

export default Dragable;
