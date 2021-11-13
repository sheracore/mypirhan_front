import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import createImg from "../assets/create.jpeg";
import shopImg from "../assets/shop.jpeg";
import { getAll } from "../services/apiService";
import ListScrollItem from "./common/listScrollItem";

class Home extends Component {
  state = {
    designs: [],
    designsCategoty: [],
    selectedDesignsCategory: [],
    itemScrl: React.createRef(),
    selectItemScrl: React.createRef(),
  };

  componentDidMount() {
    getAll("/billing/designappendcategory/").then(({ data }) => {
      const designsCategoty = [{ id: "", type_name: "همه" }, ...data];
      this.setState({ designsCategoty });
    });

    getAll("/billing/designappend/")
      .then(({ data: designs }) => this.setState({ designs }))
      .catch((err) => console.log(err));
  }

  slide = (shift, scrl) => {
    scrl.current.scrollLeft += shift;
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

  goIntoDesign = (id) => {
    this.props.history.push("/create", { designId: id });
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

  onItemSelect = (category) => {};

  render() {
    const {
      itemScrl,
      selectItemScrl,
      designsCategoty,
      selectedDesignsCategory,
    } = this.state;

    const { totalCount, data: designs } = this.getPagedData();
    const { match, location, history } = this.props;
    console.log("match", match, "Location", location, "History", history);

    return (
      <>
        <div className="row">
          <div className="col-sm-6">
            <div className="main-create-pic">
              <Link to="/create">
                <button className="main-create-pic-button">
                  <img
                    className="create-pic"
                    src={createImg}
                    alt="create-pic"
                  />
                  <span className="text-pic-create">Create</span>
                </button>
              </Link>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="main-shop-pic">
              <Link to="/shop">
                <button className="main-shop-pic-button">
                  <img className="shop-pic" src={shopImg} alt="shop-pic" />
                  <span className="text-pic-shop">Shop</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="home-design-category-scroll-wrapper">
          {/*Left Button */}
          <button
            className="prev-category"
            onClick={() => this.slide(-300, selectItemScrl)}
          >
            <i className="fa fa-angle-left"></i>
          </button>
          <div className="home-design-category-wrapper" ref={itemScrl}>
            <ListScrollItem
              scrl={selectItemScrl}
              items={designsCategoty}
              onItemSelect={this.handleDesignsCategorySelect}
              selectedItem={selectedDesignsCategory}
              textProperty="type_name"
            />
          </div>
          {/*Right Button */}
          <button
            className="next-category"
            onClick={() => this.slide(+300, selectItemScrl)}
          >
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
        <div className="home-design-scroll-wrapper">
          {/*Left Button */}
          <button className="prev" onClick={() => this.slide(-300, itemScrl)}>
            <i className="fa fa-angle-left"></i>
          </button>
          <div className="home-design-wrapper" ref={itemScrl}>
            {designs.map((design) => (
              <button
                onClick={() => this.goIntoDesign(design.id)}
                className="home-design-button"
                key={design.id}
              >
                <img
                  className="home-desings-img"
                  alt="desing"
                  src={design.image}
                />
                <strong>{design.name}</strong>
              </button>
            ))}
          </div>
          {/*Right Button */}
          <button className="next" onClick={() => this.slide(+300, itemScrl)}>
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      </>
    );
  }
}

export default Home;
