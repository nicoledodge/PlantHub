import React from "react";
import { Comment, Feed, Button } from "semantic-ui-react";
import ReplyComment from "./ReplyComment";
import Likes from "./Likes";

const FeedExampleBasic = (props) => (
  <Feed>
    {props.allPost.map((post) => (
      <Feed.Event>
        <Feed.Label>
          <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"  alt="Semantic UI Avatar placeholder"/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User style={{ color: "rgba(79,89,2,0.93)" }}>
              {post.postCreator}
            </Feed.User>
            <Feed.Date>{post.createdAt}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            <p> {post.postText}</p>
          </Feed.Extra>
          <Comment.Group>
            {post.comments.map((comment) => (
              <Comment key={`comment = ${comment._id}`}>
                <Comment.Avatar
                  as="a"
                  src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
                  alt="Semantic UI Avatar placeholder"
                />
                <Comment.Content>
                  <Comment.Author as="a">
                    {comment.commentCreator}
                  </Comment.Author>
                  <Comment.Metadata>
                    <span>{comment.createdAt}</span>
                  </Comment.Metadata>
                  <Comment.Text>{comment.commentText}</Comment.Text>
                  <Comment.Actions>
                    {/* <ReplyComment commentId={comment._id} /> */}
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
          <Feed.Meta style={{ display: "flex", flexDirection: "row", float: 'left' }}>
            <Feed.Like>
              <Likes />
            </Feed.Like>
            {/*<Comment.Actions>*/}
            <ReplyComment postId={post._id} />
            {/*</Comment.Actions>*/}
          </Feed.Meta>
          <Feed.Meta style={{ display: "flex", flexDirection: "row", justifyContent:'center' }}>

              <Button circular color='facebook' icon='facebook'
                      className="ml-3"
                      onClick={() => {
                        // generateRandomFact(facts);
                        window.open(
                            "http://www.facebook.com/sharer/sharer.php" +
                            encodeURIComponent(post.postText)
                        );
                      }}
                      type="submit"/>

              <Button circular color='twitter' icon='twitter'
                      className="ml-3"
                      onClick={() => {
                        // generateRandomFact(facts);
                        window.open(
                            "https://twitter.com/intent/tweet/?text=" +
                            encodeURIComponent(post.postText)
                        );
                      }}
                      type="submit"/>
              <Button circular color='linkedin' icon='linkedin'
                      className="ml-3"
                      onClick={() => {
                        // generateRandomFact(facts);
                        window.open(
                            "https://www.linkedin.com/shareArticle?" +
                            encodeURIComponent(post.postText)
                        );
                      }}
                      type="submit"/>
              <Button circular color='google plus' icon='google plus'
                      className="ml-3"
                      onClick={() => {
                        // generateRandomFact(facts);
                        window.open(
                            "https://twitter.com/intent/tweet/?text=" +
                            encodeURIComponent(post.postText)
                        );
                      }}
                      type="submit"/>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    ))}
  </Feed>
);

export default FeedExampleBasic;
