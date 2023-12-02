import React from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

const GetStarRating = (rating) => {
  const fullStars = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    fullStars.push(<IoMdStar key={i} />);
  }

  const halfStar = rating % 1 !== 0 ? <IoMdStarHalf key="half-star" /> : null;

  const emptyStars = [];
  for (let i = 0; i < Math.floor(5 - rating); i++) {
    emptyStars.push(<IoMdStarOutline key={`empty-${i}`} />);
  }

  return (
    <>
      {fullStars}
      {halfStar}
      {emptyStars}
    </>
  );
};
export default GetStarRating;
