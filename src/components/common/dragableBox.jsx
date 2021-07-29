// import React, { Component } from "react";
import { getDesign } from "../../mock/mockDesigns";
// import free from "../../assets/free.png";
// import nike from "../../assets/nike.png";
import drag from "../../services/dragable";
import parse from "html-react-parser";

class Dragable extends Component {
  state = {
    textFlag: false,
    text: "",
    design: "",
  };

  componentDidMount() {
    drag("mydiv");
    if ("selectedDesignKey" in this.props) {
      const { selectedDesignKey } = this.props;
      const { image: design } = getDesign(selectedDesignKey);
      this.setState({ design });
    }
    if ("text" in this.props) {
      const { text } = this.props;
      this.setState({ text });
      this.setState({ textFlag: true });
    }
  }

  deleteBox = () => {
    const { dataKey } = this.props;
    this.props.onDelete(dataKey);
  };

  retu;

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
