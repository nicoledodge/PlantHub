import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";
import { Form, Button } from 'semantic-ui-react'

//import Auth from "../utils/auth";

const AddComment = (props) => {
  const [postText, setPostText] = useState("");

  // addPost mutation
  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const posts = cache.readQuery({ query: QUERY_POSTS });
        //console.log(posts);
        cache.writeQuery({
          query: QUERY_POSTS,
          data: {
            posts: [...posts, addPost],
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

  // on submit the addPost mutation is ran, using both of the required variables
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //console.log(post);
    try {
      const { data } = await addPost({
        variables: {
          postText: postText,
          postCreator: "BetaTester",
        },
      });
      setPostText("");
      // gets the data that we want to pass to other components
      props.setAllPost([data.addPost, ...props.allPost]);
    } catch (err) {
      console.error(err);
    }
  };

  // gets the value entered in the textarea
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText") {
      setPostText(value);
    }
  };

  return (
    <div>
      <h1>Leave a Leaf &#127807;</h1>
      <Form reply onSubmit={handleFormSubmit}>
        <Form.TextArea name="postText"
            placeholder="Leaf a Thought..."
            value={postText}
            className="form-input w-100"
            onChange={handleChange}/>
        <Button style={{marginBottom:'20px', backgroundColor: 'rgba(79,89,2,0.93)'}} content="Post" labelPosition="left" icon="edit" primary type="submit"/>
      </Form>
    </div>
  );
};

export default AddComment;
