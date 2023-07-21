import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";

export const StarRating = ({ numStars }) => {
  const generateStarIcons = (numStars) => {
    if (typeof numStars !== "number" || numStars < 1 || numStars > 5) {
      throw new Error("Input must be a number between 1 and 5 (inclusive)");
    }

    const filledStar =
      '<svg fill="#FFD700" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2L9.53 8.15 2.29 9.82 7.42 15 6 21l6.12-3.16L18 21l-1.42-5L22 9.82 14.47 8.15z"/></svg>';
    const unfilledStar =
      '<svg fill="#ced4da" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2L9.53 8.15 2.29 9.82 7.42 15 6 21l6.12-3.16L18 21l-1.42-5L22 9.82 14.47 8.15z"/></svg>';

    let stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < numStars) {
        stars += filledStar;
      } else {
        stars += unfilledStar;
      }
    }

    return stars;
  };

  const starIcons = generateStarIcons(numStars);

  return (
    <Fragment>
      <div
        dangerouslySetInnerHTML={{ __html: starIcons }}
        className="flex align-center justify-start"
      />
    </Fragment>
  );
};
