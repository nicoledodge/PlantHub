import React from 'react'
import {Comment, Feed, Icon} from 'semantic-ui-react'


const FeedExampleBasic = (props) => (
    <Feed>
        {props.allPost.map((post) => (
        <Feed.Event>
            <Feed.Label>
                <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>{post.postCreator}</Feed.User>
                    <Feed.Date>{post.createdAt}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                   <p> {post.postText}</p>
                </Feed.Extra>
                <Comment.Group>
                    {post.comments.map((comment) => (
                        <Comment key={`comment = ${comment._id}`}>
                            <Comment.Avatar as="a" src="https://react.semantic-ui.com/images/avatar/small/helen.jpg" />
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
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />4 Likes
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
            ))}

        <Feed.Event>
            <Feed.Label image='/images/avatar/small/helen.jpg' />
            <Feed.Content>
                <Feed.Summary>
                    <a>Helen Troy</a> added <a>2 new illustrations</a>
                    <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                    <a>
                        <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </a>
                    <a>
                        <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </a>
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />1 Like
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Label image='/images/avatar/small/jenny.jpg' />
            <Feed.Content>
                <Feed.Summary
                    date='2 Days Ago'
                    user='Jenny Hess'
                    content='add you as a friend'
                />
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />8 Likes
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Label image='/images/avatar/small/joe.jpg' />
            <Feed.Content>
                <Feed.Summary>
                    <a>Joe Henderson</a> posted on his page
                    <Feed.Date>3 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                    Ours is a life of constant reruns. We're always circling back to where
                    we'd we started, then starting all over again. Even if we don't run
                    extra laps that day, we surely will come back for more of the same
                    another day soon.
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />5 Likes
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Label image='/images/avatar/small/justen.jpg' />
            <Feed.Content>
                <Feed.Summary>
                    <a>Justen Kitsune</a> added <a>2 new photos</a> of you
                    <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
                    <a>
                        <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </a>
                    <a>
                        <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    </a>
                </Feed.Extra>
                <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />
                        41 Likes
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    </Feed>
)

export default FeedExampleBasic