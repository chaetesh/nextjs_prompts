"use client";
import Loading from "@app/loading";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MyProfile = () => {
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete?");

    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = Posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { data: session } = useSession();
  const [Posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setloading(true);
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setloading(false);
        console.log("data: ", session);

        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  return (
    <motion.div layout>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        data={Posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {
        loading?<Loading></Loading>:""
      }
      
    </motion.div>
  );
};

export default MyProfile;
