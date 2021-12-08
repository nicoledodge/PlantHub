import ReplyComment from "../components/ReplyComment";
import { Comment, Header } from "semantic-ui-react";

function GetPosts(props) {
  return (
    <Comment.Group threaded size="large">
      <Header as="h3" dividing>
        Comments
      </Header>
      {props.allPost.map((post) => (
        <Comment key={`post = ${post._id}`}>
          <Comment.Avatar as="a" src="/images/avatar/small/elliot.jpg" />
          <Comment.Content>
            <Comment.Author as="a">{post.postCreator}</Comment.Author>
            <Comment.Metadata>
              <span>{post.createdAt}</span>
            </Comment.Metadata>
            <Comment.Text>
              <p>{post.postText}</p>
            </Comment.Text>
            <Comment.Actions>
              <ReplyComment postId={post._id} />
            </Comment.Actions>
          </Comment.Content>

          <Comment.Group>
            {post.comments.map((comment) => (
              <Comment key={`comment = ${comment._id}`}>
                <Comment.Avatar as="a" src="/images/avatar/small/jenny.jpg" />
                <Comment.Content>
                  <Comment.Author as="a">
                    {comment.commentCreator}
                  </Comment.Author>
                  <Comment.Metadata>
                    <span>{comment.createdAt}</span>
                  </Comment.Metadata>
                  <Comment.Text>{comment.commentText}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
        </Comment>
      ))}
    </Comment.Group>
  );
}

export default GetPosts;
