import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import ListGroup from "./common/listGroup";
import { getAll } from "../services/apiService";
import SearchBox from "./searchBox";
import _ from "lodash";

class ProductModal extends Component {
  state = {
    productCategories: [],
    products: [],
    selectedProductsCategory: [],
    searchQuery: "",
  };

  componentDidMount() {
    getAll("/product/categories/")
      .then(({ data }) => {
        const productCategories = [{ id: "", category_type: "All" }, ...data];
        this.setState({ productCategories });
      })
      .catch((err) => console.log(err));
    getAll("/product/products/")
      .then(({ data: products }) => {
        this.setState({ products });
      })
      .catch((err) => console.log(err));
  }

  handleClose = () => {
    this.props.onShow(false);
  };

  selectProduct = (key) => {
    this.props.onSelectedProduct(key);
    this.handleClose();
  };

  handleProductsCategorySelect = (product) => {
    this.setState({
      selectedProductsCategory: product,
      searchQuery: "",
    });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedProductsCategory: null });
  };

  getPagedData = () => {
    const {
      selectedProductsCategory,
      searchQuery,
      products: allProducts,
    } = this.state;

    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter((p) =>
        p.product_name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedProductsCategory && selectedProductsCategory.id)
      filtered = allProducts.filter(
        (p) => p.category.id === selectedProductsCategory.id
      );

    return { totalCount: filtered.length, data: filtered };
  };

  render() {
    const { show } = this.props;
    const { searchQuery, productCategories, selectedProductsCategory } =
      this.state;
    // console.log("In modal render", productCategories);

    const { totalCount, data: products } = this.getPagedData();

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
                    items={productCategories}
                    onItemSelect={this.handleProductsCategorySelect}
                    selectedItem={selectedProductsCategory}
                    textProperty="category_type"
                  />
                </div>
              </div>
              <div className="col-sm-8">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                <div>
                  {products.map((product) => (
                    <button
                      key={product.id}
                      className="modal-desings"
                      onClick={() => this.selectProduct(product.id)}
                    >
                      <img
                        className="modal-desings-img"
                        src={product.image_front}
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

export default ProductModal;
