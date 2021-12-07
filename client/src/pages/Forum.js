import React, { useState, useEffect } from "react";
import BlogForum from "../components/BlogForum";
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
    console.log(data);
  }, [data]);

  //console.log(allPosts);
  return (
    <main>
        <AddComment setAllPost={setAllPost} allPost={allPost} />
      <Posts allPost={allPost}/>
      {/*<BlogForum allPost={allPost} />*/}
    </main>
  );
};

export default Forum;
