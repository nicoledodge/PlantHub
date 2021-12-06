import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_COMMENT } from "../utils/mutations";
import { QUERY_POSTS, QUERY_POST } from "../utils/queries";

//import Auth from "../utils/auth";

const AddComment = ({ postId }) => {
  // when i click the reply button I want a another form to popup that's associated with the postID
  const replyButton = () => {
    <form
      className="flex-row justify-center justify-space-between-md align-center"
      onSubmit
    >
      <div className="col-12 col-lg-9">
        <textarea
          name="postText"
          placeholder="Here's a new thought..."
          value
          className="form-input w-100"
          onChange
        ></textarea>
      </div>
      <div className="col-12 col-lg-3">
        <button className="btn btn-primary btn-block py-3" type="submit">
          Add Comment
        </button>
      </div>
    </form>;
  };

  //   const [commentText, setCommentText] = useState("");

  //   const [addComment, { error }] = useMutation(ADD_COMMENT);

  //   const handleFormSubmit = async (event) => {
  //     event.preventDefault();

  //     try {
  //       const { data } = await addComment({
  //         variables: {
  //           postId: postId,
  //           commentText: commentText,
  //           commentCreator: "Christa",
  //         },
  //       });

  //       setCommentText("");
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   const handleChange = (event) => {
  //     const { name, value } = event.target;

  //     if (name === "commentText") {
  //       setCommentText(value);
  //     }
  //   };

  return (
    <div class="actions">
      <a class="reply" onClick={replyButton}>
        Reply
      </a>
    </div>
  );
};

export default AddComment;
