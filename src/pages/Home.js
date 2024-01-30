import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import RecipeCards from "../components/RecipeCards";
import "../css/home.css";
import Loading from "../assets/pizza Loading.gif";
import withDataFetching from '../hocs/withDataFetching';

const Home = ({ fetchData }) => {
  const [loading, setLoading] = useState(false);

  // To fetch initial recipe cards for dessert recipes
  useEffect(() => {
    initialRecipes();
    // eslint-disable-next-line
  }, []);

  const initialRecipes = async () => {
    setLoading(true);
    const getSearchParams = () => ({
      type: 'public',
      q: "dessert",
      app_id: process.env.REACT_APP_API_ID,
      app_key: process.env.REACT_APP_API_KEY,
    });

    await fetchData({
      additionalParams: getSearchParams(),
      allowFetch: true,
      setLoading, // Pass the setLoading callback to Search
    });

    setLoading(false);
  };

  return (
    <div>
      <Search setLoading={setLoading} />
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
export default withDataFetching(Home, process.env.REACT_APP_API_URL);
