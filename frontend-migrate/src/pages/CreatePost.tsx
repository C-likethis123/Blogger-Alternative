import React, { useContext } from "react";

import Editor from "../components/Editor";

import { useHistory } from "react-router-dom";
import { Paths } from "../utils/paths";
import BlogContext from "../contexts/BlogContext";

import { createPost, updatePost } from "../loaders/posts";

export default function Component() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isDraft, setIsDraft] = React.useState(true);
  const [id, setId] = React.useState(null);
  const {selectedBlog : blogId} = useContext(BlogContext);

  const history = useHistory();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const onSubmit = () => {
    const newPost = {
      title,
      content,
    };

    if (id) {
      updatePost(blogId, id, newPost)
        .then((res) => console.log(res.data))
        .then(() => history.push(Paths.PostsList));
    } else {
      createPost(blogId, newPost)
        .then((res) => setId(res.data.id))
        .then(() => history.push(Paths.PostsList));
    }
  }

  const onSave = (content: string) => {
    const newPost = {
      title,
      content,
    };

    if (id) {
      updatePost(blogId, id, newPost);
    } else {
      createPost(blogId, newPost)
        .then((res) => setId(res.data.id))
        .catch((err) => console.log(err));
    }
  }

  return (
    <React.Fragment>
      <h3>Create Post</h3>
      <Editor
        isEdit={false}
        onSubmit={onSubmit}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onSave={onSave}
      />
    </React.Fragment>
  );
}