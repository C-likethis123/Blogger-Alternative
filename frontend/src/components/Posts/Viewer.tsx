import React from "react";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

import "tui-chart/dist/tui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
export default class ViewerComponent extends React.Component {
  rootEl = React.createRef();

  viewerInst = null;

  getRootElement() {
    return this.rootEl.current;
  }

  getInstance() {
    return this.viewerInst;
  }

  bindEventHandlers(props) {
    Object.keys(this.props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        this.viewerInst.off(eventName);
        this.viewerInst.on(eventName, props[key]);
      });
  }

  componentDidMount() {
    const chartOptions = {
      minWidth: 100,
      maxWidth: 600,
      minHeight: 100,
      maxHeight: 300,
    };
    this.viewerInst = new Viewer({
      el: this.rootEl.current,
      ...this.props,
      plugins: [
        [chart, chartOptions],
        [codeSyntaxHighlight, { hljs }],
        tableMergedCell,
        uml,
      ],
    });

    this.bindEventHandlers(this.props);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.initialValue !== nextProps.initialValue) {
      this.viewerInst.setMarkdown(nextProps.initialValue);
    }
    this.bindEventHandlers(nextProps, this.props);

    return false;
  }

  render() {
    return <div ref={this.rootEl} />;
  }
}
