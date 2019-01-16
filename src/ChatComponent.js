import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from 'react-redux';
import safeEval from 'safe-eval';
import { handleConversation, toggleLoader} from './store/actions';
import UserInput from "./UserInput";
import User from "./User";

// const userData = { className: "user", text: "user" };
// const botData = { className: "bot", text: "bot" };

class ChatCompoenent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [userData, botData],
      // loading: false
    };
  }

  translate = (text = "hi, how are you", lang = "en-hi") => {
    const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
    const keyApI =
      "trnsl.1.1.20190114T153205Z.80964e3fbf21708c.aba408b6c69cdd67d82a928a2369c46c77d9fd31";
    const data = "key=" + keyApI + "&text=" + text + "&lang=" + lang;
    return fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(({ code, text }) => {
        if (code === 200){
          //  console.log(code, text[0]);
          // debugger;
          return text[0];
        } else {
          console.error("err", code);
          return `err${code}`;
        }
      })
      .catch(err => {
        console.error('err',err);
        return "err";
      });
  }

  handleUserInput = async input => {

    // const code = '{pid: process.pid, apple: a()}'
    const context = {
      campK12: {
        translate: this.translate
      },
      a: function () { return 'APPLE' }
    }
    // var evaluated = safeEval(code, context) // { pid: 16987, apple: 'APPLE' }

    let result = "...";
    await this.updateConversation({ input, result });
    const { code } = this.props;
    if (!code || !code.includes("function") || !input) {
      // result = input;
      return;
    } else {
      result = await safeEval(`(${code})('${input}')`, context);
    }
    // const result = await this.translate(input, "en-hi"});
    // console.log('result',result);
    this.updateConversation({ input, result });
  }

  updateConversation = ({ input, result}) => {
    let {conversation, loading} = this.props;
    if (result === "...") { // create
      conversation = [...conversation, { className: "user", text: input }, { className: "bot", text: result }]
    } else { // update
      conversation[conversation.length - 1] = { className: "bot", text: result };
    }
    
    // conversation: conversation,
    this.props.handleConversation(conversation);
    if(loading !== (result === "...")){
      this.props.toggleLoader(); 
    }

    setTimeout(() => {
      const elmnt = document.querySelector(".chat");
      elmnt.scrollTop = elmnt.scrollHeight;
      // elmnt.scrollIntoView({
      //   behavior: "smooth"
      // });
    }, 100);
  }

  render() {
    const { conversation } = this.props;
    return (
      <div className="chat-main">
      <div className="chat">
        {/* list conversation user and bot */}
        {/* 
          <User className="user" text="user" />
          <User className="bot" text="bot" /> */}
        {conversation.map(({ className, text }, i) => {
          return <User key={i} className={className} text={text} />;
        })}
      </div>
        <UserInput onUserInput={this.handleUserInput} />
      </div>
    );
  }
}

ChatCompoenent.propTypes = {
  onConversation: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    conversation: state.conversation,
    loading: state.loading,
    code: state.code
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: () => dispatch(toggleLoader()),
    handleConversation: conversation => dispatch(handleConversation(conversation))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatCompoenent);
