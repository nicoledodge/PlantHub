import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

function GetPosts() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const [post, setPost] = useState([]);

  //waits for the data to be received
  useEffect(() => {
    if (data) {
      // to allow data to appear on the front-end
      setPost(data.allPosts);
    }
    console.log(data);
    // useEffect will run when there's change to the data
  }, [data]);

  return (
    <div class="ui minimal comments">
      <h3 class="ui dividing header">Comments</h3>
      {post.map((val) => (
        <div class="comment" key={`post = ${val._id}`}>
          <div class="content post">
            <a class="author">{val.postCreator}</a>
            <div class="metadata">
              <span class="date">{val.createdAt}</span>
            </div>
            <div class="text">{val.postText}</div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetPosts;
