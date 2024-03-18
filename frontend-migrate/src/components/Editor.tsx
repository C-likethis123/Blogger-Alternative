import React from "react";

import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import FormLabel from '@mui/joy/FormLabel';

interface EditorProps {
    title?: string;
    content?: string;
    isEdit: boolean;
    onSubmit: () => void;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSave: (content: string) => void;
}
export default function Component({
    title,
    content = '',
    onChangeTitle,
    onChangeContent,
    onSubmit,
}: EditorProps) {
    return <Box sx={{
        height: '100vh',
    }}>
        <FormLabel htmlFor="title" >Title</FormLabel>
        <Input placeholder="Blog Title" value={title} onChange={onChangeTitle} id="title" name="title" />
        <Button onClick={onSubmit}>Publish</Button>
        <Textarea sx={{ 
            resize: 'both',
            overflow: 'auto',
            width: '100%',
            height: 'calc(100% - 200px)'
        }} value={content} onChange={onChangeContent}></Textarea>

    </Box>
}
