import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import RecipeCards from "../components/RecipeCards";
import "../css/home.css";
import { useDispatch } from "react-redux";
import { setRecipes } from "../actions/recipeActions";
import Loading from "../assets/pizza Loading.gif";

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //To fetch initial recipe cards to dessert recipes
  useEffect(() => {
    initialRecipes();
    // eslint-disable-next-line
  },[]);
  const initialRecipes = async () => {
    const apiUrl = "https://api.edamam.com/api/recipes/v2";
    const params = {
      type: "public",
      q: "Dessert",
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

    await fetch(urlWithParams)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setRecipes(data.hits));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <Search />
      {loading ? (
        <div className="center">
          <img src={Loading} alt="loading" />
        </div>
      ) : (
        <RecipeCards />
      )}
    </div>
  );
};

export default Home;
