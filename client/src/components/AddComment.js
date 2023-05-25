import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS } from "../utils/queries";
import { Form, Button } from "semantic-ui-react";

import Auth from "../utils/auth";

const AddComment = (props) => {
  const [postText, setPostText] = useState("");

  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const posts = cache.readQuery({ query: QUERY_POSTS });
        cache.writeQuery({
          query: QUERY_POSTS,
          data: {
            posts: [...posts, addPost],
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addPost({
        variables: {
          postText: postText,
          postCreator: Auth.getProfile().data.username,
        },
      });
      setPostText("");
      props.setAllPost([data.addPost, ...props.allPost]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText") {
      setPostText(value);
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: "Oswald, sans-serif" }}>
        Leaf a Thought &#127807;
      </h1>
      {Auth.loggedIn() ? (
        <>
          <Form reply onSubmit={handleFormSubmit}>
            <Form.TextArea
              name="postText"
              placeholder="Leaf a Thought..."
              value={postText}
              className="form-input w-100"
              onChange={handleChange}
            />
            <Button
              style={{
                marginBottom: "20px",
                backgroundColor: "rgba(79,89,2,0.93)",
              }}
              content="Post"
              labelPosition="left"
              icon="edit"
              primary
              type="submit"
            />
          </Form>
        </>
      ) : (
        <p>You need to be logged in to add a comment</p>
      )}
    </div>
  );
};

export default AddComment;
