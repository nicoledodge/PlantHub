import React, { useState } from "react";
import ReplyModal from "./ReplyModal";

const ReplyComment = (props) => {
  const [replyBox, setReplyBox] = useState(false);
  const replyButton = async (e) => {
    e.preventDefault();
    setReplyBox(true);
  };

  return (
    <div class="actions">
      <ReplyModal onClick={replyButton} postId={props.postId}>
        Reply
      </ReplyModal>
    </div>
  );
};

export default ReplyComment;
