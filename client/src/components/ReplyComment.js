import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";

//import Auth from "../utils/auth";

const ReplyComment = ({ postId }) => {
  const [commentText, setCommentText] = useState("");

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          postId:postId,
          commentText: commentText,
          commentAuthor:'james',
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div class="actions">
      <a class="reply" onClick={handleFormSubmit}>Reply</a>
    </div>
  );
};

export default ReplyComment;
