import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";

export const Reviews = () => {
  // TODO: To fetch reviews from the backend

  const reviews = [
    {
      username: "john_doe",
      imageUrl: "",
      reviewInfo:
        "Excellent service! The hotel staff was very friendly and helpful.",
      reviewStars: 5,
      createdAt: "2023-07-15",
    },
    {
      username: "jane_smith",
      imageUrl: "",
      reviewInfo:
        "The hotel exceeded my expectations. The room was spacious and clean.",
      reviewStars: 4,
      createdAt: "2023-07-14",
    },
    {
      username: "mike_johnson",
      imageUrl: "",
      reviewInfo:
        "Had a great stay at the hotel. The amenities were top-notch.",
      reviewStars: 4.5,
      createdAt: "2023-07-12",
    },
    {
      username: "emily_wilson",
      imageUrl: "",
      reviewInfo:
        "The hotel's location is perfect, close to all the attractions.",
      reviewStars: 4,
      createdAt: "2023-07-10",
    },
    {
      username: "alex_williams",
      imageUrl: "https://example.com/user5.jpg",
      reviewInfo:
        "Friendly staff and comfortable beds. Will definitely come back!",
      reviewStars: 5,
      createdAt: "2023-07-08",
    },
    {
      username: "sarah_adams",
      imageUrl: "",
      reviewInfo:
        "Impressive service and delicious food at the hotel restaurant.",
      reviewStars: 4.5,
      createdAt: "2023-07-05",
    },
    {
      username: "david_smith",
      imageUrl: "",
      reviewInfo:
        "Had a wonderful time during my stay. Everything was perfect.",
      reviewStars: 4.8,
      createdAt: "2023-07-03",
    },
    {
      username: "lisa_brown",
      imageUrl: "",
      reviewInfo: "Great value for money. I highly recommend this hotel.",
      reviewStars: 3.5,
      createdAt: "2023-07-01",
    },
  ];

  return (
    <Fragment>
      <div className="p-4 mt-16">
        <p className="text-center text-lg mb-4">Reviews</p>
        <div className="grid grid-cols-3 gap-4 relative">
          {reviews.map((review, index) => (
            <div
              key={index + 1}
              className="bg-green p-2 rounded shadow-md relative
              before:border-4 before:border-solid before:border-primary-light
              before:border-r-4before:border-r-gray-light-1 before:w-full before:h-[2px]
              before:absolute before:top-[0px] before:left-0 before:rounded-t-md"
            >
              <div className="flex items-center gap-2 mt-1">
                {review.imageUrl && (
                  <img src={review.imageUrl} alt={review.username} />
                )}
                {!review.imageUrl && (
                  <svg className="w-[30px] h-[30px] fill-gray-dark-3">
                    <use href={`${sprite}#icon-person-circle`}></use>
                  </svg>
                )}
                <span>{review.username}</span>
              </div>
              <div className="my-1 italic">{review.reviewInfo}</div>
              <div className="flex items-center justify-between">
                <span>{review.reviewStars}</span>
                <span className="text-sm">{review.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
