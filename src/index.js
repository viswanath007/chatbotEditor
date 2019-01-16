import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import ChatComponent from "./ChatComponent";
import Editor from "./Editor";
import { configureStore } from './store/index';
import "./styles.css";

const store = configureStore();

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <div className="header">
            <span className="AI-playground">AI playground</span>
            <span className="learn-ai">Learn AI</span>
            <span className="docs">Docs</span>
            <span className="account">Account</span>
          </div>
          <div className="main">
            <Editor />
            <ChatComponent />
          </div>
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
