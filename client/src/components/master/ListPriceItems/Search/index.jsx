import React from "react";

const SearchItems = (props) => {
  const { kueri1, setKueri1, kueri2, setKueri2, searchData } = props;

  return (
    <div className="my-2 container d-flex justify-content-center">
      <form onSubmit={searchData}>
        <div className="row g-4 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputSearchName" className="col-form-label">
              Search Items
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="inputSearchName"
              className="form-control"
              placeholder="Search Your Items"
              value={kueri1}
              onChange={(e) => setKueri1(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <select
              className="form-select"
              id="type"
              value={kueri2}
              onChange={(e) => setKueri2(e.target.value)}
            >
              <option value="">Type</option>
              <option value="softdrink">Softdrink</option>
              <option value="snack">Snack</option>
              <option value="food">Food</option>
              <option value="facility">Facility</option>
              <option value="service">Service</option>
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-success">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchItems;
