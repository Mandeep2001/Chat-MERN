import React from "react";

function SearchForm() {
  return (
    <div className="search-form d-flex align-items-center">
      <form className="w-100">
        <div className="search-inner-form">
          <input type="text" placeholder="Cerca..." />
          <i className="fas fa-search" aria-hidden="true" />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
