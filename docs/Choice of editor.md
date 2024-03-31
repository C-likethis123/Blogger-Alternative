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





concerns:
1. security?
- since i'm working with html.

this