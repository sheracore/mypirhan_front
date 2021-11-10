import React from "react";

const ListScrollItem = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
  scrl,
}) => {
  return (
    <>
      <div className="home-design-category-wrapper" ref={scrl}>
        {items.map((category) => (
          <button
            className="home-design-button"
            key={category.id}
            onClick={() => onItemSelect(category)}
          >
            {console.log(category[textProperty])}
            {category[textProperty]}
          </button>
        ))}
      </div>

      {/* <ul className="list-group">
        {items.map((item) => (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => onItemSelect(item)}
            key={item[textProperty]}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default ListScrollItem;
