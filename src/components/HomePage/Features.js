import React from "react";
import { Container } from "reactstrap";
import MarkdownEditor from "./../../images/markdown-editor.png";
import Keyboard from "./../../images/keyboard.png";
function Features() {
  return (
    <Container>
      <div style={{ display: "flex" }}>
        <div className="col-6 mb-1">
          <h2>Markdown support</h2>
          With TUI editor plugins, enjoy:
          <ul>
            <li>Code highlighting</li>
            <li>UML diagram rendering</li>
            <li>Chart rendering</li>
          </ul>
        </div>
        <div className="col-6 mb-5">
          <img src={MarkdownEditor} width="410" alt="Markdown editor" />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="col-6 mb-5">
          <img src={Keyboard} width="410" alt="Keyboard" />
        </div>
        <div className="col-6 mb-5">
          <h2>More keyboard shortcuts</h2>
          <p>Supercharge your blogging with more keyboard shortcuts</p>
        </div>
      </div>
    </Container>
  );
}

export default Features;
