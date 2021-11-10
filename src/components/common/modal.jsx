import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import ListGroup from "../common/listGroup";
import { getAll } from "../../services/apiService";
import SearchBox from "../searchBox";
import _ from "lodash";

class DesignModal extends Component {
  state = {
    designsCategoty: [],
    designs: [],
    selectedDesignsCategory: [],
    searchQuery: "",
  };

  async componentDidMount() {
    getAll("/billing/designappendcategory/")
      .then(({ data }) => {
        const designsCategoty = [{ id: "", type_name: "All" }, ...data];
        this.setState({ designsCategoty });
      })
      .catch((err) => console.log(err));
    getAll("/billing/designappend/")
      .then(({ data: designs }) => {
        this.setState({ designs });
      })
      .catch((err) => console.log(err));
  }

  handleClose = () => {
    this.props.onShow(false);
  };

  selectDesign = (key) => {
    console.log(key);
    this.props.onSelectedDesign(key);
    this.handleClose();
  };

  handleDesignsCategorySelect = (category) => {
    this.setState({
      selectedDesignsCategory: category,
      searchQuery: "",
    });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedDesignsCategory: null });
  };

  getPagedData = () => {
    const {
      selectedDesignsCategory,
      searchQuery,
      designs: allDesigns,
    } = this.state;

    let filtered = allDesigns;
    if (searchQuery)
      filtered = allDesigns.filter((d) =>
        d.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedDesignsCategory && selectedDesignsCategory.id)
      filtered = allDesigns.filter(
        (d) => d.design_append_category.id === selectedDesignsCategory.id
      );

    return { totalCount: filtered.length, data: filtered };
  };

  render() {
    const { show } = this.props;
    const { searchQuery } = this.state;
    // console.log("In modal render", selectedDesignsCategory)

    const { totalCount, data: designs } = this.getPagedData();

    return (
      <>
        <Modal show={show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-4">
                <div>
                  <ListGroup
                    items={this.state.designsCategoty}
                    onItemSelect={this.handleDesignsCategorySelect}
                    selectedItem={this.state.selectedDesignsCategory}
                    textProperty="type_name"
                  />
                </div>
              </div>
              <div className="col-sm-8">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                <div>
                  {designs.map((design) => (
                    <button
                      key={design.id}
                      className="modal-desings"
                      onClick={() => this.selectDesign(design.id)}
                    >
                      <img
                        className="modal-desings-img"
                        src={design.image}
                        alt="modal-designs-pic"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DesignModal;
