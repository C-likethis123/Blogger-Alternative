import React from "react";

import Box from '@mui/joy/Box';
import {
    FormatItalic as ItalicIcon,
    FormatBold as BoldIcon,
    FormatUnderlined as UnderlineIcon,
    FormatListNumbered as OrderedListIcon,
    FormatListBulleted as UnorderedListIcon,
    FormatStrikethrough as StrikethroughIcon,
    ArrowDropUp,
    ArrowDropDown,
    FormatAlignLeft as AlignLeftIcon,
    FormatAlignCenter as AlignCenterIcon,
    FormatAlignRight as AlignRightIcon,
    FormatIndentIncrease as IndentIncreaseIcon,
    FormatIndentDecrease as IndentDecreaseIcon,
    Code as CodeIcon,
} from '@mui/icons-material';


import IconButton from "@mui/joy/IconButton";

const handleCommand = (event: React.MouseEvent<HTMLButtonElement>) => {
    const command = event.currentTarget.value;
    if (command) document.execCommand(command, false);
};
const handleAddCodeBlock = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selection = window.getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);
    const currentNode = range.commonAncestorContainer.parentElement;

    // Check if the current selection contains a <pre> element (code block)
    const isCodeBlock = currentNode instanceof HTMLElement && currentNode.tagName.toLowerCase() === 'pre';
    console.log(isCodeBlock);
    if (isCodeBlock) {
        // Remove the <pre> element (code block)
        const parent = currentNode.parentElement;
        if (parent) {
            parent.removeChild(currentNode);
            range.deleteContents();
            const fragment = document.createDocumentFragment();
            currentNode.childNodes.forEach(node => fragment.appendChild(node));
            range.insertNode(fragment);
        }
    } else {
        // Add a <pre> element (code block) around the current selection
        document.execCommand('formatBlock', false, '<pre>');
    }
};

type ToolbarButton = {
    Icon: typeof BoldIcon;
    value: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const toolbarButtons: ToolbarButton[] = [
    { Icon: BoldIcon, value: 'bold' },
    { Icon: ItalicIcon, value: 'italic' },
    { Icon: UnderlineIcon, value: 'underline' },
    { Icon: StrikethroughIcon, value: 'strikethrough' },
    { Icon: OrderedListIcon, value: 'insertOrderedList' },
    { Icon: UnorderedListIcon, value: 'insertUnorderedList' },
    { Icon: ArrowDropDown, value: 'subscript' },
    { Icon: ArrowDropUp, value: 'superscript' },
    { Icon: AlignLeftIcon, value: 'justifyLeft' },
    { Icon: AlignCenterIcon, value: 'justifyCenter' },
    { Icon: AlignRightIcon, value: 'justifyRight' },
    { Icon: IndentIncreaseIcon, value: 'indent' },
    { Icon: IndentDecreaseIcon, value: 'outdent' },
    { Icon: CodeIcon, value: 'codeblock', onClick: handleAddCodeBlock },
];

export default function Component() {
    return <Box paddingBottom={2}>
        {
            toolbarButtons.map(({ Icon, value, onClick = handleCommand }) => <IconButton onClick={onClick} value={value} key={value}>
                <Icon />
            </IconButton>)
        }
    </Box>
}