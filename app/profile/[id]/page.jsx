"use client";
import Loading from "@app/loading";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const UserProfile = ({params}) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [Posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setloading(true);
        const response = await fetch(`/api/users/${params.id}/posts`);
        const data = await response.json();
        setloading(false);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (params.id) {
      fetchPosts();
    }
  }, []);

  return (
    <motion.div layout>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s profile page. Explore his exceptional prompts and inspire others with the power of your imagination`}
        data={Posts}
      />
      {loading ? <Loading></Loading> : ""}
    </motion.div>
  );
};

export default UserProfile;
