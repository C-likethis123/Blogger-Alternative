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
- Markdown editor (code mirror route or Notion route?)
- Code blocks, with code highlighting, indentation etc
- font size picker, font style picker