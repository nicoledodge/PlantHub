import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import ReplyTextarea from "./ReplyTextarea";
//import Auth from "../utils/auth";

const ReplyComment = ({ postId }) => {
  const [commentText, setCommentText] = useState("");

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // const handleReplySubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const { data } = await addComment({
  //       variables: {
  //         postId:postId,
  //         commentText: commentText,
  //         commentAuthor:'james',
  //       },
  //     });

  //     setCommentText('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  
  const [replyBox, setReplyBox] = useState(false);
  console.log(replyBox);
  // opens a reply box for user input
  const replyButton = async (e) => {
    e.preventDefault();
    console.log('CLICKED');
    setReplyBox(true);
  }

  return (
    <div class="actions">
      <ReplyTextarea onClick={replyButton}>Reply</ReplyTextarea>

    </div>
     
  );
};

export default ReplyComment;
