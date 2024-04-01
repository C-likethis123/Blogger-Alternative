import React, { useEffect, useRef } from "react";

import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Button from "@mui/joy/Button";

interface EditorProps {
    title?: string;
    content?: string;
    isEdit: boolean;
    onSubmit: () => void;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeContent: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    onSave: (content: string) => void;
}
export default function Component({
    title,
    content = '',
    onChangeTitle,
    onChangeContent,
    onSubmit,
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

    const unwrapBold = (node: Node | null) => {
        while (node && node.parentNode) {
            const parent = node.parentNode;
            if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'STRONG') {
                while (node.firstChild) {
                    parent.insertBefore(node.firstChild, node);
                }
                parent.removeChild(node);
                break;
            }
            node = parent;
        }
    };
    const handleBold = () => {
        const selection = window.getSelection();
        console.log(selection)
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        console.log('selected text: ', selectedText);
        const boldTag = document.createElement('strong');

        // Check if selected text is already bold
        const isBold = range.commonAncestorContainer.parentElement && range.commonAncestorContainer.parentElement.tagName === 'STRONG';

        if (isBold) {
           unwrapBold(range.commonAncestorContainer);
        } else {
            // Bold the selected text
            boldTag.appendChild(document.createTextNode(selectedText));
            range.deleteContents();
            range.insertNode(boldTag);
            console.log(contentEditableRef.current?.innerHTML);
        }
    };
    return <Box sx={{
        height: 'calc(100vh - var(--Header-height))',
    }}>
        <Input placeholder="Blog Title" value={title} onChange={onChangeTitle} id="title" name="title" sx={{ my: 2 }} />
        <Button onClick={handleBold}>Bold</Button>
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
