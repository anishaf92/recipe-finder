import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setRecipes } from "../actions/recipeActions";
import "../css/search.css";
import "@fortawesome/fontawesome-free/css/all.css";

const Search = (props) => {
  const [keyWord, setKeyWord] = useState("");
  const dispatch = useDispatch();
  // Search recipe using the keyWord state
  const searchRecipe = async () => {
    console.log(keyWord);
    const apiUrl = "https://api.edamam.com/api/recipes/v2";
    const params = {
      type: "public",
      q: keyWord,
      app_id: process.env.REACT_APP_API_ID,
      app_key: process.env.REACT_APP_API_KEY,
    };

    // Convert the params object to a query string
    const queryString = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");

    // Combine the base URL and query string
    const urlWithParams = `${apiUrl}?${queryString}`;

    try {
      const response = await fetch(urlWithParams);
      const data = await response.json();
      console.log(data.hits);
      dispatch(setRecipes(data.hits));
    } catch (err) {
      console.error(err);
    } finally {
      // Clears the input box
      setKeyWord("");
    }
  };
  //Search when enter key is pressed
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

export default Search;
