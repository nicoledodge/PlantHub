import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";

//import Auth from "../utils/auth";

const AddBlog = (props) => {
  const [post, setPostText] = useState('')

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const posts = cache.readQuery({ query: QUERY_POSTS });
        console.log(posts)

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { 
              posts: [...posts, addPost] 
            },
        });
      } catch (e) {
        console.error(e);
      }

    // update me object's cache
    //   const { me } = cache.readQuery({ query: QUERY_ME });
    //   cache.writeQuery({
    //     query: QUERY_ME,
    //     data: { me: { ...me, posts: [...me.posts, addPost] } },
    //   });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(post)
    try {
      const { data } = await addPost({
        variables: {
          postText: post,
          postCreator: "BetaTester"
        },
      });
      setPostText('');
      props.setAllPost([data.addPost, ...props.allPost] )
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" ) {
    setPostText(value);
    }
  };

  return (
    <div>
      <h3>Add a post here!</h3>
      <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="postText"
                placeholder="Here's a new thought..."
                value={post}
                className="form-input w-100"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Post
              </button>
            </div>
          </form>
    </div>
  );
};

export default AddBlog;
