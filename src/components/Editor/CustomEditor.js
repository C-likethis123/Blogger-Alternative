import React from "react";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";

import Editor from "@toast-ui/editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import "tui-chart/dist/tui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";
import "tui-color-picker/dist/tui-color-picker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
export default class CustomEditor extends React.Component {
  rootEl = React.createRef();

  editorInst = null;

  getRootElement() {
    return this.rootEl.current;
  }

  getInstance() {
    return this.editorInst;
  }

  getHtml() {
    return this.editorInst.getHtml();
  }

  getValue() {
    return this.editorInst.getMarkdown();
  }

  bindEventHandlers(props) {
    Object.keys(this.props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        this.editorInst.off(eventName);
        this.editorInst.on(eventName, props[key]);
      });
  }

  componentDidMount() {
    const chartOptions = {
      minWidth: 100,
      maxWidth: 600,
      minHeight: 100,
      maxHeight: 300,
    };
    this.editorInst = new Editor({
      el: this.rootEl.current,
      previewStyle: "vertical",
      height: "600px",
      initialEditType: "markdown",
      usageStatistics: false,
      useCommandShortcut: true,
      plugins: [
        [chart, chartOptions],
        [codeSyntaxHighlight, { hljs }],
        colorSyntax,
        tableMergedCell,
        uml,
      ],
    });

    this.bindEventHandlers(this.props);
  }

  shouldComponentUpdate(nextProps) {
    const instance = this.getInstance();
    const { height, previewStyle } = nextProps;

    if (this.props.height !== height) {
      instance.height(height);
    }

    if (this.props.previewStyle !== previewStyle) {
      instance.changePreviewStyle(previewStyle);
    }

    this.bindEventHandlers(nextProps, this.props);

    return false;
  }

  render() {
    return <div ref={this.rootEl} />;
  }
}
