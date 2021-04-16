import React, { useState, useEffect, useCallback, Component } from "react";
import "./index.scss";

const Autocomplete = (props) => {
  const [allToDoData, setAllToDoData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(null);

  useEffect(() => {
    searchTodo(searchKeyword);
  }, [props.searchedResult]);

  const searchTodo = () => {
    const { options } = props;
    const userInput = searchKeyword;

    const filteredOptions = options && options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setFilteredData(filteredOptions);
  };

  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  var callDebounce = useCallback(
    debounceFunction((nextValue) => props.searchValueProps(), 500),
    []
  );

  const onValueChange = (e) => {
    if (!e.target.value) {
      return setFilteredData(null);
    }
    setSearchKeyword(e.target.value);
    if(props.options){
        return searchTodo();
    }
    callDebounce();
  };

  const getSearchedListJSX = () => {
    if (filteredData && filteredData.length) {
      return (
        <ul
          className={`${
            filteredData && filteredData.length
              ? "searched__list_modify__border searched__list"
              : "searched__list"
          }`}
        >
          {filteredData &&
            filteredData.map((ele, i) => {
              return <li key={i}>{ele}</li>;
            })}
        </ul>
      );
    } else {
      return (
        <div className="no-options">
          <em>No Option!</em>
        </div>
      );
    }
  };

  return (
    <>
      <div className="search__body">
        <input
          type="text"
          onChange={onValueChange}
          className={`${
            filteredData && filteredData.length
              ? "modify__input__border"
              : "null"
          }`}
        ></input>
        {getSearchedListJSX()}
      </div>        
    </>
  );
};

export default Autocomplete;
