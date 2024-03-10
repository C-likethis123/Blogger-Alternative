import React, { useContext } from "react";
import axios from "axios";

import Editor from "../components/Editor";
import { useHistory, useParams } from "react-router-dom";
import { fetchPost } from "../loaders/posts";
import { Paths } from "../utils/paths";
import BlogContext from "../contexts/BlogContext";
type RouteParams = {
    id: string;
}

export default function Component() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [isDraft, setIsDraft] = React.useState(true);
    const history = useHistory();
    const { id } = useParams<RouteParams>();
    const {selectedBlog:blogId} = useContext(BlogContext);

    React.useEffect(() => {
        fetchPost(blogId, id)
            .then(({ title, content }) => {
                setTitle(title);
                setContent(content);
            })
            .catch((error) => console.log(error));
    }, [blogId, id]);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onSubmit = (content: string) => {
        const newPost = {
            title,
            content,
        };

        axios
            .patch(
                `/api/blogs/${blogId}/posts/${id}`,
                newPost
            ).then(() => history.push(Paths.PostsList));
    }
    const onDelete = () => {
        axios
            .delete(`/posts/${id}`)
            .then(() => history.push(Paths.PostsList));
    }

    const onSave = (content: string) => {
        const newPost = {
            title,
            content,
        };
        axios
            .patch(
                `/api/blogs/${blogId}/posts/${id}`,
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