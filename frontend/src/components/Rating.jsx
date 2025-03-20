import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      {[...Array(5).keys()].map((n) => (
        <span key={n}>
          {value >= n + 1 ? (
            <FaStar />
          ) : value >= n + 1 - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}

      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
