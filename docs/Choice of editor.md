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


Thought dump:

- at it's core, i'm editing html.

implementing style changes:
1. select text (highlighting them) - implement an onSelect event to take note of the current selection
2. apply change (i can toggle or untoggle the change)
3. unselect text


<div>a selected text</div> =(select)> <div><b>a selected text</b></div> =(unselect)> <div>a selected text</div>

to partially unselect:

<div><b>a selected text</b></div> =(unselect)> <div><b>a</b> selected <b>text</b></div>

if my selection has formatted and non formatted text:

<div><b>a selected text</b></div>

# Implementation: Selecting text

Use [`Selection`](https://developer.mozilla.org/en-US/docs/Web/API/Selection) objects

# Implementation: Applying styles

- Displaying styles: there is a difference between what the user sees and what the actual value is
- another way is to use a contenteditable div.

1. creating posts: listen for key changes and add it accordingly.
2. editing posts: inject the content into the div.

Issue: injecting content into the content editable div moves the cursor to the front. this problem happens because the uncontrolled element has a different state than React's state variable. Fixed using: https://dtang.dev/using-content-editable-in-react/

concerns:
1. security?
- since i'm working with html.

this