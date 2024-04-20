import React, { useEffect, useRef, useState } from "react";

import Box from '@mui/joy/Box';
import {
    Link as LinkIcon,
} from '@mui/icons-material';


import IconButton from "@mui/joy/IconButton";
import Modal from "@mui/joy/Modal";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
/**
 * FIXME: think of how to preventDefault when adding the link to the editor
 */
export default function Component() {
    const [linkInput, setLinkInput] = useState('');
    const [isLinkModalOpen, setLinkModalOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectionRange, setSelectionRange] = useState<Range | null>(null);

    useEffect(() => {
        if (isLinkModalOpen) {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                setSelectionRange(selection.getRangeAt(0));
            }
        }
    }, [isLinkModalOpen]);

    const handleAddLink = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            if (!selectionRange) return;
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(selectionRange);
            }
            document.execCommand('createLink', false, linkInput);
            setLinkInput('');
            setLinkModalOpen(false);
        }
    };
    return <>
        <IconButton onClick={() => setLinkModalOpen(true)} value="createlink" key="createlink">
            <LinkIcon />
        </IconButton>
        <Modal open={isLinkModalOpen}
            onClose={() => setLinkModalOpen(false)}>
            <Box padding={2}>
                <FormControl>
                    <FormLabel>Enter URL</FormLabel>
                    <Input
                        ref={inputRef}
                        autoFocus
                        placeholder="Enter URL"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        onKeyDown={handleAddLink}
                    />
                </FormControl>
            </Box>
        </Modal>
    </>
}