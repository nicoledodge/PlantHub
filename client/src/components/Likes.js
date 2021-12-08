import React from "react";
import { Icon } from "semantic-ui-react";

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      updated: false,
    };
  }

  updateLikes = () => {
    if (!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes + 1,
          updated: true,
        };
      });
    } else {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          updated: false,
        };
      });
    }
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p onClick={this.updateLikes}>
          <Icon name="like" />
        </p>
        <p>{this.state.likes}</p>
      </div>
    );
  }
}

export default Likes;
