import React from "react";
import MarkdownEditor from "./../images/markdown-editor.png";
import Keyboard from "./../images/keyboard.png";
export function Component() {
    return <div>
        <div>
            <div>Blogger Alternative</div>
            <div>An alternative website for managing Google Blogger Posts</div>
        </div>
        <div>
            <div className="row">
                <div className="text-center text-md-left-col-md-6 mb-1">
                    <h2>Markdown Support</h2>
                    <ul>
                        <li>Code highlighting</li>
                        <li>UML diagram rendering</li>
                        <li>Chart rendering</li>
                    </ul>
                </div>
                <div className="col-md-6 mb-5">
                    <img src={MarkdownEditor} width="410" alt="Markdown editor" />
                </div>
                <div className="row flex-column-reverse flex-md-row">
                    <div className="col-md-6 mb-5">
                        <img src={Keyboard} width="410" alt="Keyboard" />
                    </div>
                    <div className="text-center text-md-left col-md-6 mb-5">
                        <h2>More keyboard shortcuts</h2>
                        <p>Supercharge your blogging with more keyboard shortcuts</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}