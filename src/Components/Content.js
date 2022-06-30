import React, { useEffect } from "react";
import "../scss/Content.scss";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const Content = () => {
  const [content, setContent] = useState("");
  const [listItem, setListItem] = useState([]);
  const currentList = useRef([]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && content !== "") {
      setListItem((prev) => [...prev, { name: content, type: false }]);
      currentList.current = [...listItem, { name: content, type: false }];
      setContent("");
    }
  };
  const handleDelete = (index) => {
    // console.log(index);
    let newListItem = [...listItem];
    newListItem.splice(index, 1);
    currentList.current = newListItem;
    setListItem(newListItem);
  };
  const handleCheck = (item, i) => {
    const newListItem = currentList.current.map((list) => {
      if (list.name === item.name) {
        return { ...list, type: !item.type };
      } else {
        return list;
      }
    });
    currentList.current = newListItem;
    setListItem(newListItem);
  };

  const handleType = (status) => {
    const newActive = currentList.current.filter(
      (item) => item.type === !status
    );
    setListItem(newActive);
    // setListItem(currentList.current);
  };
  const handleAll = () => {
    setListItem(currentList.current);
  };

  const handleClear = () => {
    console.log("handleClear");
    currentList.current = listItem.filter((item) => item.type === false);
    // console.log(newActive);
    setListItem(currentList.current);
  };

  return (
    <div className="main-content">
      <div className="input">
        <input
          type="text"
          placeholder="What needs to be done ?"
          className="input-text"
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {/* <button onClick={handleSubmit}>submit</button> */}
      </div>
      <div>
        <div className="list-content">
          {listItem &&
            listItem.length > 0 &&
            listItem.map((list, index) => {
              return (
                <div className="list-content-item" key={index}>
                  <span>
                    <span
                      className="circle"
                      onClick={() => handleCheck(list, index)}
                    >
                      {list.type && <FontAwesomeIcon icon={faCheck} />}
                    </span>
                  </span>
                  <h2 className={list.type ? "text-line-through" : ""}>
                    {list.name}
                  </h2>
                  <span
                    className="icon-delete"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                </div>
              );
            })}
        </div>
        {currentList.current.length > 0 && (
          <div className="footer">
            <span>
              <span className="number-item">{listItem.length}</span>
              Items Left
            </span>
            <div className="actions">
              <span className="tabs-item active" onClick={handleAll}>
                All
              </span>
              <span className="tabs-item" onClick={() => handleType(true)}>
                Active
              </span>
              <span className="tabs-item" onClick={() => handleType(false)}>
                Completed
              </span>
            </div>
            <span onClick={handleClear} className="clear-completed">
              Clear completed
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
