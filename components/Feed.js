"use client";
import { Suspense, useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Loading from "@app/loading";
import { motion } from "framer-motion";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <motion.div layout className="mt-16 prompt_layout">
      {data.map((post) => { 
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          ></PromptCard>
        );
      })}
    </motion.div>
  );
};

const Feed = () => {
  const fetchPosts = async () => {
    console.log("first");
    setloading(true);
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setloading(false);
    setPosts(data);
    setNewPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPrompts = (search) => {
    console.log(search)
    setSearchText(search);
    const regex = new RegExp(search, "i");

    const filtered = Posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );

    setNewPosts(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    filteredPrompts(value);
  };

  let [searchText, setSearchText] = useState("");
  const [Posts, setPosts] = useState([]);
  const [loading, setloading] = useState(false);
  const [NewPosts, setNewPosts] = useState([]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search Prompts"
          onChange={handleSearchChange}
          value={searchText}
          className="search_input peer"
        />
      </form>
        {
          loading?
          <Loading></Loading>
          :""
        }
        {searchText ? (
          <PromptCardList
            data={NewPosts}
            handleTagClick={(tag) => {
              console.log("here");
              setSearchText(tag);
              filteredPrompts();
            }}
          ></PromptCardList>
        ) : (
          <PromptCardList
            data={Posts}
            handleTagClick={(tag) => {
              console.log("here");
              filteredPrompts(tag);
            }}
          ></PromptCardList>
        )}
    </section>
  );
};

export default Feed;
