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

    const isSingleLine = range.startContainer == range.endContainer;
    const commonAncestor = isSingleLine ? range.commonAncestorContainer.parentNode : range.commonAncestorContainer;
    const parentNode = commonAncestor?.parentNode;
    // Check if the current selection contains a <pre> element (code block)
    const isCodeBlock = commonAncestor instanceof HTMLElement && commonAncestor.tagName.toLowerCase() === 'pre';
    if (isCodeBlock) {
        const commonAncestorClone = commonAncestor.cloneNode(true);
        const fragment = document.createDocumentFragment();

        // Move the child nodes of the original commonAncestor to the fragment
        Array.from(commonAncestorClone.childNodes).forEach(node => {
            fragment.appendChild(node);
        });
        parentNode?.insertBefore(fragment, commonAncestor);
        parentNode?.removeChild(commonAncestor);
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