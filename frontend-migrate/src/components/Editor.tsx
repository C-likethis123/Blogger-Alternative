interface EditorProps {
    title?: string;
    content?: string;
    isEdit: boolean;
    onSubmit: (content: string) => void; 
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onDelete: () => void; 
    onSave: (content: string) => void;
}
export default function Editor(props: EditorProps) {
    return <div>Editor</div>
}