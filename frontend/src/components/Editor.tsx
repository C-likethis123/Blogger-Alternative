import React, { useEffect, useRef } from "react";

import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';

import {
    FormatItalic as ItalicIcon,
    FormatBold as BoldIcon,
    FormatUnderlined as UnderlineIcon,
    FormatListNumbered as OrderedListIcon,
    FormatListBulleted as UnorderedListIcon,
} from '@mui/icons-material';
import IconButton from "@mui/joy/IconButton";

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
    const handleBold = () => {
        document.execCommand('bold', false);
    };
    const handleItalic = () => {
        document.execCommand('italic', false);
    };
    const handleUnderline = () => {
        document.execCommand('underline', false);
    };
    const handleOrderedList = () => {
        document.execCommand('insertOrderedList', false);
    }
    const handleUnorderedList = () => {
        document.execCommand('insertUnorderedList', false);
    }
    return <Box sx={{
        height: 'calc(100vh - var(--Header-height))',
    }}>
        <Input placeholder="Blog Title" value={title} onChange={onChangeTitle} id="title" name="title" sx={{ my: 2 }} />
        <IconButton onClick={handleBold}><BoldIcon /></IconButton>
        <IconButton onClick={handleItalic}><ItalicIcon /></IconButton>
        <IconButton onClick={handleUnderline}><UnderlineIcon /></IconButton>
        <IconButton onClick={handleOrderedList}><OrderedListIcon /></IconButton>
        <IconButton onClick={handleUnorderedList}><UnorderedListIcon /></IconButton>
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
