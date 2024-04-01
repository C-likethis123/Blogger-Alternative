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
        const command = event.currentTarget.value;
        if (command) document.execCommand(command, false);
    };
    // TODO: implement toggle
    const handleAddCodeBlock = (event: React.MouseEvent<HTMLButtonElement>) => {
        document.execCommand('formatBlock', false, '<pre>');
    };
    // TODO: implement font size picking
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
            <IconButton onClick={handleCommand} value="insertOrderedList"><OrderedListIcon /></IconButton>
            <IconButton onClick={handleCommand} value="insertUnorderedList"><UnorderedListIcon /></IconButton>
            <IconButton onClick={handleCommand} value="subscript"><ArrowDropDown /></IconButton>
            <IconButton onClick={handleCommand} value="superscript"><ArrowDropUp /></IconButton>
            <IconButton onClick={handleCommand} value="justifyLeft"><AlignLeftIcon /></IconButton>
            <IconButton onClick={handleCommand} value="justifyCenter"><AlignCenterIcon /></IconButton>
            <IconButton onClick={handleCommand} value="justifyRight"><AlignRightIcon /></IconButton>
            <Dropdown>
                <MenuButton endDecorator={<ArrowDropDown />}>Size</MenuButton>
                <Menu>
                    {['10', '12', '14', '16', '18', '20', '24'].map((fontSize) => (
                        <MenuItem key={fontSize} onClick={() => handleFontSizeSelect(fontSize)}>{fontSize}</MenuItem>
                    ))}
                </Menu>
            </Dropdown>
            <IconButton onClick={handleCommand} value="indent"><IndentIncreaseIcon /></IconButton>
            <IconButton onClick={handleCommand} value="outdent"><IndentDecreaseIcon /></IconButton>
            <IconButton onClick={handleAddCodeBlock}><CodeIcon /></IconButton>
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
