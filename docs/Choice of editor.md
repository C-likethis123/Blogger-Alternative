# Choice of editor

The ideal editor is a Markdown clone. Importantly, I want:
- headings
- hyperlinks
- code blocks
- conversion to HTML

# Evaluation of top choices

## [BlockNote](https://github.com/TypeCellOS/BlockNote)

Pros:
- supports headings, hyperlinks
- might support custom blocks

Cons:
- does not support HTML, content is currently in JSON. a JSON to html thing is fairly straightforward, let's see how they do it. 
- not sure if they support code blocks - feature was asked over a year ago. they aren't super active in merging MRs.

## Yopta

Cons:
- content is in JSON
- does not support code blocks.

# Self development route

Features:
- Markdown editor (code mirror route or Notion route? Maybe Notion route)
- Code blocks, with code highlighting, indentation etc
- font size picker, font style picker

# Implementation: Creating and Editing posts
- Displaying styles: there is a difference between what the user sees and what the actual value is
- another way is to use a contenteditable div.

1. creating posts: listen for key changes and add it accordingly.
2. editing posts: inject the content into the div.

Issue: injecting content into the content editable div moves the cursor to the front. this problem happens because the uncontrolled element has a different state than React's state variable. Fixed using: https://dtang.dev/using-content-editable-in-react/

# Implementation: Selecting text

Use [`Selection`](https://developer.mozilla.org/en-US/docs/Web/API/Selection) objects

# Implementation: Applying styles

1. Buttons
2. Keyboard shortcuts

## Buttons
1. When I edit the text directly, it's inserted as plaintext.
I have to insert a BOLD node instead

Relevant DOM APIs:
- https://stackoverflow.com/questions/60581285/execcommand-is-now-obsolete-whats-the-alternative
- decided to use execCommand for now since there is no alternative

Applying styles: get the current selection, wrap them in a BOLD tag.
Toggling styles: check if it's bold. Remove the bold tag.

Issue:
1. partial bold first: this text is <strong>bolded</strong>
2. bold the entire sentence: <strong>this text is <strong>bolded</strong></strong>
3. Bug 1: unbold it: it will still not be unbolded
4. Bug 2: if I unbold the text in 1), the entire text in 2 will be unbolded
5. Bug 3: if I focus on something else other than the editor, then unbold the entire sentence, it gets unbolded

Reason and solutions:
1. when i insert a new node, the selection does not include the 'strong' tag

## Keyboard shortcuts
- Inbuilt: `execCommand` supports keyboard shortcuts in Chrome, but not in Safari: bold, underline, italics
- Implementation: listen out for keyboard events

concerns:
1. security?
- since i'm working with html.

this