import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"; // Import the regular (empty) heart icon
import "../css/card.css";

const Card = ({ recipe, favorite, toggleFavorite }) => {
  const navigate = useNavigate();

  const handleToggleFavorite = () => {
    toggleFavorite();
  };

  return (
    <div>
      <div className="grid">
        <div className="grid__item">
          <div className="card">
            <img
              className="card__img"
              src={recipe.images.SMALL.url}
              alt={recipe.label}
            />
            <div className="card__head">
              <span className="tag tag-blue">{recipe.cuisineType}</span>
              <button className="invisible__btn" onClick={handleToggleFavorite}>
                <FontAwesomeIcon
                  icon={favorite ? faHeart : faHeartRegular}
                  className={favorite ? "favorite" : ""}
                />
              </button>
            </div>

            <div className="card__content">
              <h1 className="card__header" title={recipe.label}>
                <strong>{recipe.label}</strong>
              </h1>
              <button
                className="card__btn"
                //Navigates to dynamic path and carries recipe object  
                onClick={() =>
                  navigate(`/${recipe.label}`, { state: { recipe: recipe } })
                }
              >
                Full Recipe <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
