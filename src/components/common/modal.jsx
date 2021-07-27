import React, { Component } from "react"
import { Modal, Button } from "react-bootstrap"
import Designs from "../../mock/mockDesigns"
import ListGroup from "../common/listGroup"
import { getCategoryDesigns } from "../../mock/mockCategoryDesigns"
import SearchBox from "../searchBox"
import _ from "lodash"
import nike from "/home/sheracore/Desktop/myprojects/mypirhan/mypirhan_front/src/assets/nike.png"
import imageToBase64 from "image-to-base64/browser"

class MyModal extends Component {
  state = {
    designsCategoty: [],
    designs: [],
    selectedDesignsCategory: [],
    searchQuery: "",
  }

  componentDidMount() {
    const data = getCategoryDesigns()
    const designsCategoty = [{ id: "", type_name: "All" }, ...data]
    const designs = Designs
    this.setState({ designs, designsCategoty })
  }

  handleClose = () => {
    this.props.onShow(false)
  }

  selectDesign = (key) => {
    console.log(key)
    this.props.onSelectedDesign(key)
    this.handleClose()
  }

  handleDesignsCategorySelect = (category) => {
    this.setState({
      selectedDesignsCategory: category,
      searchQuery: "",
    })
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedDesignsCategory: null })
  }

  getPagedData = () => {
    const {
      selectedDesignsCategory,
      searchQuery,
      designs: allDesigns,
    } = this.state

    console.log(allDesigns, "&&&&&&&&&&&&&&&&&&&")

    let filtered = allDesigns
    if (searchQuery)
      filtered = allDesigns.filter((d) =>
        d.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    else if (selectedDesignsCategory && selectedDesignsCategory.id)
      filtered = allDesigns.filter(
        (d) => d.design_append_category.id === selectedDesignsCategory.id
      )

    console.log(filtered, "***********")

    // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    // const movies = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: filtered }
  }

  // convertToBase64 = (path) => {
  //   let imgBase64 = "";
  //   imageToBase64(path)
  //     .then((response) => {
  //       // console.log(response, "****************");
  //       imgBase64 = response;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log(imgBase64);
  //   return imgBase64;
  // };

  render() {
    const { show } = this.props
    const { searchQuery } = this.state
    // console.log("In modal render", selectedDesignsCategory)

    const { totalCount, data: designs } = this.getPagedData()

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
                      {/* {this.convertToBase64(design.image)} */}
                      {/* {console.log(this.convertToBase64(design.image), "Hereee")} */}
                      <img
                        className="modal-desings-img"
                        src={design.image}
                        alt="modal-designs-image"
                      />
                      {/* <p>{design.name}</p> */}
                      {/* {console.log(typeof design.image, design.image)} */}
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
    )
  }
}

export default MyModal
