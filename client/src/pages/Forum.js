import React, { useState, useEffect } from "react";
import Posts from "../components/Posts";
import AddComment from "../components/AddComment";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

const Forum = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const allPosts = data?.allPosts || [];

  const [allPost, setAllPost] = useState(allPosts);

  useEffect(() => {
    if (data) {
      setAllPost(data.allPosts);
    }
  }, [data]);

  return (
    <main style={{ margin: "40px", padding: "0em 0em 5em"}}>
      <AddComment setAllPost={setAllPost} allPost={allPost} />
      <Posts allPost={allPost} />
    </main>
  );
};

export default Forum;
