import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRecipes } from "../actions/recipeActions";

const withDataFetching = (WrappedComponent, apiUrl) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // Define a function to get dynamic parameters

    const fetchData = async (params) => {
      try {
        if (params && params.allowFetch) {
          const queryString = Object.keys(params.additionalParams)
            .map(
              (key) =>
                encodeURIComponent(key) +
                "=" +
                encodeURIComponent(params.additionalParams[key])
            )
            .join("&");
          // Combine the base URL and query string
          const urlWithParams = `${apiUrl}?${queryString}`;

          await fetch(urlWithParams);
          await fetch(urlWithParams)
            .then((response) => response.json())
            .then((result) => {
              dispatch(setRecipes(result.hits));
              setLoading(false);
            });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <WrappedComponent {...props} loading={loading} fetchData={fetchData} />
    );
  };
};

export default withDataFetching;
