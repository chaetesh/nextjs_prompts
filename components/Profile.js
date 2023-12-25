import React from 'react'
import PromptCard from './PromptCard';
import { motion } from "framer-motion";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <motion.div layout className="w-full">
      <h2 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h2>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Profile