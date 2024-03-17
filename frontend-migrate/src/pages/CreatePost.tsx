import React, { useContext } from "react";

import Editor from "../components/Editor";

import { useHistory } from "react-router-dom";
import { Paths } from "../utils/paths";
import BlogContext from "../contexts/BlogContext";

import { createPost, updatePost } from "../loaders/posts";

import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function Component() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isDraft, setIsDraft] = React.useState(true);
  const [id, setId] = React.useState(null);
  const { selectedBlog: blogId } = useContext(BlogContext);

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
    <Sheet sx={{
      mx: 20,
      px: 20,
      py: 2,
      height: '100vh',
      overflow: 'auto',
      borderLeft: '1px solid',
      borderRight: '1px solid',
      borderColor: 'divider'
    }}>
      <Typography level="h3">Create Post</Typography>
      <Editor
        isEdit={false}
        onSubmit={onSubmit}
        title={title}
        content={content}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onSave={onSave}
      />
    </Sheet>
  );
}