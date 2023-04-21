import React from "react";
import axios from "axios";

import Editor from "../components/Editor";
import { useHistory, useParams } from "react-router-dom";
import { fetchPost } from "../loaders/posts";
import Paths from "../utils/paths";
type RouteParams = {
    id: string;
}

export default function Component() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [isDraft, setIsDraft] = React.useState(true);
    const history = useHistory();
    const { id } = useParams<RouteParams>();

    React.useEffect(() => {
        fetchPost(id)
            .then(({ data: { title, content, isDraft } }) => {
                setTitle(title);
                setContent(content);
                setIsDraft(isDraft);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onSubmit = (content: string) => {
        const newPost = {
            title,
            content,
            isDraft: false,
        };

        axios
            .post(
                `/posts/update/${id}`,
                newPost
            );

        history.push(Paths.PostsList);
    }
    const onDelete = () => {
        axios
            .delete(`/posts/${id}`)
            .then(() => history.push(Paths.PostsList));
    }

    const onSave = (content: string) => {
        const newPost = {
            title,
            content: content,
            isDraft,
        };
        axios
            .post(
                `/posts/update/${id}`,
                newPost
            )
            .catch((err) => {
                console.log(err);
            });
    }

    return <div>
        <h3>Edit Post</h3>
        <Editor
            title={title}
            content={content}
            isEdit
            onSubmit={onSubmit}
            onChangeTitle={onChangeTitle}
            onDelete={onDelete}
            onSave={onSave}
        />
    </div>
}