import React, { Component } from "react";
import PropTypes from "prop-types";
import MonacoEditor from "react-monaco-editor";
import { connect } from 'react-redux';
// import safeEval from 'safe-eval';

import { evaluateCode } from './store/actions';
import "./styles/editor.css";

// const code = "// type your code...";

class Editor extends Component {
  constructor(props) {
    super(props);
    const {code} = props;
    this.state = {
      currentTab: 0,
      tabs: [{ title: "main", code }, { title: "new 2", code}],
      tabsCount: 2
    };
  }
  editorDidMount(editor, monaco) {
    // console.log('editorDidMount', editor);
    // editor.focus();
  }
  onChange = (newValue, e) => {
    this.setState(({tabs, currentTab}) => {
      tabs[currentTab].code = newValue
      return { tabs};
    });
    // console.log('onChange', newValue);
  }

  handleTabs = i => e => {
    this.setState({currentTab: i});
  }

  addTab = e => {
    const code = "// type your code..."
    this.setState(({ tabs, tabsCount}) => {
      tabsCount++;
      tabs.push({
        title: `new ${tabsCount}`,
        code
      });
      return { tabs, tabsCount };
    });
  }

  deleteTab = i => e => {
    if(i === 0)
      return;
    this.setState(({ tabs, currentTab }) => {
      tabs.splice(i, 1);
      // debugger;
      return {
        tabs,
        currentTab: currentTab === i ? currentTab-- : currentTab
      };
    });
  }

  applyChanges = () => {
    const {tabs, currentTab} = this.state;
    const { code } = tabs[currentTab];
    if (currentTab !== 0 || !code || !code.includes("function")){
      return;
    }
    // const evaluated = safeEval(`(${code})("inputText")`);
    // console.log(evaluated);
    this.props.evaluateCode(code);
  }

  render() {
    const {currentTab, tabs} = this.state;
    const { code } = tabs[currentTab] || {};
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div className="editor">
        <div className='tabs'>
          {tabs.map(({ title }, i) => {
            const className = currentTab === i ? 'tab active' : 'tab';
            return (
              <div key={i} className={className} onClick={this.handleTabs(i)}>
                {title} <span id="delete" onClick={this.deleteTab(i)}>X</span>
              </div>
            );
          } )}
          <div className='tab tab-plus' onClick={this.addTab}><strong>+</strong></div>
          <button id="apply" onClick={this.applyChanges}
            className={currentTab === 0 ? "" : "disable"}>
            Apply Changes
          </button>
        </div>
          <MonacoEditor
            ref="monaco"
            height="560px"
            width="560px"
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
          />
      </div>
    );
  }
}

Editor.propTypes = {
  onConversation: PropTypes.func,
  onEditor: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    code: state.code
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    evaluateCode: code => dispatch(evaluateCode(code)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
