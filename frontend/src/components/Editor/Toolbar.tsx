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
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";

const handleCommand = (event: React.MouseEvent<HTMLButtonElement>) => {
    const command = event.currentTarget.value;
    if (command) document.execCommand(command, false);
};
// TODO: implement toggle
const handleAddCodeBlock = (event: React.MouseEvent<HTMLButtonElement>) => {
    document.execCommand('formatBlock', false, '<pre>');
};
// TODO: fix font size and style picking
const handleFontSizeSelect = (fontSize: string) => {
    // come up with another command, this doesn't work
    document.execCommand('fontSize', false, fontSize || "");
};
const handleFontStyleSelect = (fontStyle: string) => {
    document.designMode = "on";
    document.execCommand('fontName', false, fontStyle);
    document.designMode = "off";
};

const fontStyles = ['Arial', 'Times New Roman', 'Verdana', 'Courier New', 'Georgia'];

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
        <Dropdown>
            <MenuButton endDecorator={<ArrowDropDown />}>Size</MenuButton>
            <Menu>
                {['10', '12', '14', '16', '18', '20', '24'].map((fontSize) => (
                    <MenuItem key={fontSize} onClick={() => handleFontSizeSelect(fontSize)}>{fontSize}</MenuItem>
                ))}
            </Menu>
        </Dropdown>
        <Dropdown>
            <MenuButton endDecorator={<ArrowDropDown />}>Style</MenuButton>
            <Menu>
                {fontStyles.map((fontStyle) => (
                    <MenuItem key={fontStyle} onClick={() => handleFontStyleSelect(fontStyle)}>{fontStyle}</MenuItem>
                ))}
            </Menu>
        </Dropdown>
    </Box>
}