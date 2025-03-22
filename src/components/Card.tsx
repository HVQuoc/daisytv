import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface CardProps {
  id: string;
  data: any;
  media_type: string;
}

const Card: React.FC<CardProps> = (CardProps) => {
  const noImageUrl = import.meta.env.VITE_NO_IMAGE_URL;
  const imagePath = import.meta.env.VITE_IMG_PATH;
  return (
    <motion.div
      className="relative h-86 max-w-[230px] overflow-hidden rounded-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={"/" + CardProps.media_type + "/" + CardProps.data.id}>
        <motion.img
          src={
            CardProps.data.poster_path
              ? `${imagePath}${CardProps.data.poster_path}`
              : noImageUrl
          }
          className="w-full object-cover h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* name of the movie */}
        <div className="p-2 absolute text-white rounded-b-lg h-16 bottom-0 w-full max-w-[230px] bg-gradient-to-t from-gray-900 to-transparent">
          <h2 className="text-ellipsis text-sm lg:text-md">
            {CardProps.data?.title || CardProps.data?.name}
          </h2>
          <div className="text-sm text-neutral-200 flex justify-between">
            {CardProps.data.vote_average && (
              <>
                <p>{CardProps.data.release_date}</p>
                <span className="bg-gray-900 rounded-full px-2 py-1">
                  Rating: {Number(CardProps.data.vote_average).toFixed(1)}
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
