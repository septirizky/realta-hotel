import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { getHotel } from "../../actions/hotelAction";

const Search = (props) => {
  const { search, setSearch } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotel({ keyword: search }));
    // eslint-disable-next-line
  }, [search]);
  return (
    <div>
      <form className="p-2 bd-highlight">
        <div className="input-group mb-3">
          <span className="input-group-text bg-white ">
            <CiSearch size="22" />
          </span>
          <input
            className="form-control border-start-0"
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
