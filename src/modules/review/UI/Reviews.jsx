import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import roomImage from "../../../assets/Images/room1.png";
import { StarRating } from "./StarRating";

export const Reviews = () => {
  // TODO: To fetch reviews from the backend

  const reviews = [
    {
      username: "john_doe",
      imageUrl: "",
      reviewInfo:
        "Excellent service! The hotel staff was very friendly and helpful. The room was clean and comfortable, and the amenities were great. I had a fantastic stay and would highly recommend this hotel to anyone visiting the area.",
      reviewStars: 5,
      createdAt: "2023-07-15",
      role: "client",
    },
    {
      username: "jane_smith",
      imageUrl: "",
      reviewInfo:
        "The hotel exceeded my expectations. The room was spacious and clean. The staff was attentive, and the location was perfect for exploring the city. I had a wonderful time and would definitely stay here again.",
      reviewStars: 2,
      createdAt: "2023-07-14",
      role: "client",
    },
    {
      username: "mike_johnson",
      imageUrl: "",
      reviewInfo:
        "Had a great stay at the hotel. The amenities were top-notch. The hotel restaurant served delicious food, and the pool area was relaxing. The staff was friendly and accommodating. Overall, it was a fantastic experience.",
      reviewStars: 4.5,
      createdAt: "2023-07-12",
      role: "client",
    },
    {
      username: "emily_wilson",
      imageUrl: "",
      reviewInfo:
        "The hotel's location is perfect, close to all the attractions. The room had a stunning view, and the bed was comfortable. The check-in process was smooth, and the staff was helpful throughout my stay. Highly recommended!",
      reviewStars: 4,
      createdAt: "2023-07-10",
      role: "client",
    },
    {
      username: "alex_williams",
      imageUrl: roomImage,
      reviewInfo:
        "Friendly staff and comfortable beds. Will definitely come back! The hotel's spa and wellness center were fantastic, and the breakfast buffet had a great selection. This was one of the best hotels I've stayed in.",
      reviewStars: 5,
      createdAt: "2023-07-08",
      role: "client",
    },
    {
      username: "sarah_adams",
      imageUrl: "",
      reviewInfo:
        "Impressive service and delicious food at the hotel restaurant. The room decor was elegant, and the hotel's ambiance was relaxing. I thoroughly enjoyed my stay and would highly recommend this hotel to anyone.",
      reviewStars: 4.5,
      createdAt: "2023-07-05",
      role: "client",
    },
    {
      username: "david_smith",
      imageUrl: "",
      reviewInfo:
        "Had a wonderful time during my stay. Everything was perfect. The hotel's staff went above and beyond to make me feel welcome. The room was spotless, and the hotel's facilities were top-notch. I'll definitely be back!",
      reviewStars: 1,
      createdAt: "2023-07-03",
      role: "client",
    },
    {
      username: "lisa_brown",
      imageUrl: "",
      reviewInfo:
        "Great value for money. I highly recommend this hotel. The room was spacious and well-equipped, and the hotel's location was convenient. The staff was friendly and provided excellent service throughout my stay.",
      reviewStars: 3,
      createdAt: "2023-07-01",
      role: "client",
    },
  ];

  const capitalizeFirstLetter = (word) => {
    if (typeof word !== "string" || word.length === 0) {
      throw new Error("Input must be a non-empty string");
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <Fragment>
      <div className="p-4 mt-16">
        <p className="text-center text-lg mb-4">Reviews</p>
        <div className="grid grid-cols-3 gap-4 relative">
          {reviews.map((review, index) => (
            <div
              key={index + 1}
              className="p-4 rounded-lg shadow-lg border-[1px] border-solid border-gray-light-2"
            >
              <div className="">
                <StarRating numStars={review.reviewStars} />
              </div>
              <div className="py-4">"{review.reviewInfo}"</div>
              <div className="flex align-center justify-between border-t-[1px] pt-4">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{review.username}</span>
                  <span className="text-gray-dark-2 text-sm">
                    {capitalizeFirstLetter(review.role)}
                  </span>
                </div>
                {review.imageUrl && (
                  <div className="bg-gray-light-3 flex items-center justify-center w-12 h-12 rounded-[50%]">
                    <img
                      src={review.imageUrl}
                      alt={review.username}
                      className="w-full  h-full rounded-[50%]"
                    />
                  </div>
                )}
                {!review.imageUrl && (
                  <div className="bg-gray-light-3 flex items-center justify-center w-12 h-12 rounded-[50%]">
                    <svg className="w-[36px] h-[36px] fill-gray-dark-1">
                      <use href={`${sprite}#icon-person-filled`}></use>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
