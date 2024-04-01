import React, { useEffect, useRef } from "react";

import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';

import {
    FormatItalic as ItalicIcon,
    FormatBold as BoldIcon,
    FormatUnderlined as UnderlineIcon,
    FormatListNumbered as OrderedListIcon,
    FormatListBulleted as UnorderedListIcon,
    FormatStrikethrough as StrikethroughIcon,
    ArrowDropUp,
    ArrowDropDown
} from '@mui/icons-material';
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";

interface EditorProps {
    title?: string;
    content?: string;
    isEdit: boolean;
    onSubmit: () => void;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeContent: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    setContent: Function;
    onSave: (content: string) => void;
}
export default function Component({
    title,
    content = '',
    onChangeTitle,
    onChangeContent,
    setContent,
}: EditorProps) {
    const contentEditableRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (contentEditableRef.current && contentEditableRef.current.innerHTML !== content) {
            contentEditableRef.current.innerHTML = content;
        }
    });
    const handleSelect: React.ReactEventHandler<HTMLDivElement> = (event) => {
        console.log((event.target as HTMLTextAreaElement).selectionStart, (event.target as HTMLTextAreaElement).selectionEnd);
    };
    const handleCommand = (event: React.MouseEvent<HTMLButtonElement>) => {
        const command = event.currentTarget.getAttribute("value");
        if (command) document.execCommand(command, false);
    };

    const handleFontSizeSelect = (fontSize: string) => {
        console.log(fontSize);
        // come up with another command, this doesn't work
        document.execCommand('fontSize', false, fontSize);
    };
    return <Box sx={{
        height: 'calc(100vh - var(--Header-height))',
    }}>
        <Input placeholder="Blog Title" value={title} onChange={onChangeTitle} id="title" name="title" sx={{ my: 2 }} />
        <Box paddingBottom={2}>
            <IconButton onClick={handleCommand} value="bold"><BoldIcon /></IconButton>
            <IconButton onClick={handleCommand} value="italic"><ItalicIcon /></IconButton>
            <IconButton onClick={handleCommand} value="underline"><UnderlineIcon /></IconButton>
            <IconButton onClick={handleCommand} value="strikethrough"><StrikethroughIcon /></IconButton>
            <IconButton onClick={handleCommand} value="orderedList"><OrderedListIcon /></IconButton>
            <IconButton onClick={handleCommand} value="unorderedList"><UnorderedListIcon /></IconButton>
            <IconButton onClick={handleCommand} value="subscript"><ArrowDropDown /></IconButton>
            <IconButton onClick={handleCommand} value="superscript"><ArrowDropUp /></IconButton>
            <Dropdown>
                <MenuButton endDecorator={<ArrowDropDown />}>Size</MenuButton>
                <Menu>
                    {['10', '12', '14', '16', '18', '20', '24'].map((fontSize) => (
                        <MenuItem key={fontSize} onClick={() => handleFontSizeSelect(fontSize)}>{fontSize}</MenuItem>
                    ))}
                </Menu>
            </Dropdown>
        </Box>
        <Box
            ref={contentEditableRef}
            contentEditable
            sx={{
                height: 'calc(100% - 200px)',
                border: '1px solid black',
                borderRadius: '8px', // Add border radius
                padding: '10px', // Add padding
            }}
            onInput={onChangeContent}
        />
    </Box >
}
