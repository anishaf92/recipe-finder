import React, { useState } from "react";
import "../css/search.css";
import "@fortawesome/fontawesome-free/css/all.css";
import withDataFetching from "../hocs/withDataFetching";

const Search = ({ fetchData, setLoading }) => {
  const [keyWord, setKeyWord] = useState("");

  const getSearchParams = () => ({
    type: "public",
    q: keyWord,
    app_id: process.env.REACT_APP_API_ID,
    app_key: process.env.REACT_APP_API_KEY,
  });

  const searchRecipe = async () => {
    setLoading(true); // Update loading state in Home
    await fetchData({
      additionalParams: getSearchParams(),
      allowFetch: true,
      setLoading, // Pass the setLoading callback to Home
    });
    setLoading(false); // Update loading state in Home
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchRecipe();
    }
  };

  return (
    <div>
      <div className="box">
        <label>Find Recipe</label>
        <input
          type="text"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="invisible__btn" onClick={() => searchRecipe()}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default withDataFetching(
  Search,
  process.env.REACT_APP_API_URL
);
