import React, { Component } from "react";

export default class ChatCompoenent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    };
  }
  // submit on enter onUserInput
  // handleOnChange
  handleSubmit = e => {
    e.preventDefault();
    const { userInput } = this.state;
    if (!userInput) {
      return;
    }
    
    this.props.onUserInput(userInput);
    this.setState({
      userInput: ""
    });
  }

  handleOnChange = () => {
    const { value } = document.querySelector("#userInput");
    this.setState({
      userInput: value
    });
    // console.log(value);
  }

  render() {
    const { userInput } = this.state;
    return (
      <div className="userInput">
        <form onSubmit={this.handleSubmit}>
          <input autoComplete="off"
            id="userInput"
            value={userInput}
            onChange={this.handleOnChange}
            type="text"
            name="userInput"
            pattern="[A-Za-z0-9\s]+"
            placeholder="please type here"
            minLength={2}
            maxLength={70}
            size="70"
            required
        />
        </form>
      </div>
    );
  }
}
