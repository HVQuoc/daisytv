import React from "react";
import { Link } from "react-router-dom";

export interface CardProps {
  id: string;
  data: any;
  media_type: string;
}

const Card: React.FC<CardProps> = (CardProps) => {
  return (
    <div className="relative h-86 w-[230px] overflow-hidden rounded-lg hover:scale-105 transition-all">
      <Link to={"/" + CardProps.media_type + "/" + CardProps.data.id}>
        <img
          src={`${import.meta.env.VITE_IMG_PATH}${CardProps.data.poster_path}`}
          className="w-full object-cover h-full"
        />

        {/* name of the movie */}
        <div className="p-2 absolute text-white rounded-b-lg h-16 bottom-0 w-full max-w-[230px] bg-gradient-to-t from-gray-900 to-transparent">
          <h2 className="text-ellipsis line-clamp-1">
            {CardProps.data?.title || CardProps.data?.name}
          </h2>
          <div className="text-sm text-neutral-200 flex justify-between">
            <p>{CardProps.data.release_date}</p>
            <span className="bg-gray-900 rounded-full px-2 py-">
              Rating: {Number(CardProps.data.vote_average).toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
