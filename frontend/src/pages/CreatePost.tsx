import React, { useContext } from "react";

import Editor from "../components/Editor";

import { useHistory } from "react-router-dom";
import { Paths } from "../utils/paths";
import BlogContext from "../contexts/BlogContext";

import { createPost, updatePost } from "../loaders/posts";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Sheet from "../components/Sheet";
import useInput from "../hooks/editor/useInput";
import useEditableInput from "../hooks/editor/useEditableInput";

export default function Component() {
  const [title, onChangeTitle,] = useInput("");
  const [content, onChangeContent,] = useEditableInput("");
  const [isDraft, setIsDraft] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState(null);
  const { selectedBlog: blogId, isBlogsLoading, error } = useContext(BlogContext);

  const history = useHistory();

  const onSubmit = () => {
    const newPost = {
      title,
      content,
    };
    setLoading(true);
    if (blogId) {
      if (id) {
        updatePost(blogId, id, newPost)
          .then((res) => console.log(res.data))
          .then(() => history.push(Paths.PostsList));
      } else {
        createPost(blogId, newPost)
          .then(() => history.push(Paths.PostsList));
      }
    }

  }

  const onSave = (content: string) => {
    setLoading(true);
    const newPost = {
      title,
      content,
    };

    if (blogId) {
      if (id) {
        updatePost(blogId, id, newPost)
          .finally(() => setLoading(false));
      } else {
        createPost(blogId, newPost)
          .then((res) => setId(res.data.id))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      }
    }

  }

  return (
    <Sheet isLoading={isBlogsLoading} error={error} sx={{
      mx: 20,
      px: 20,
      py: 2,
      height: 'calc(100vh - var(--Header-height))',
      overflow: 'auto',
      borderLeft: '1px solid',
      borderRight: '1px solid',
      borderColor: 'divider'
    }}>
      <Box display="flex" justifyContent={"space-between"} sx={{ my: 2 }}>
        <Typography level="h3">Create Post</Typography>
        <Button loading={loading} onClick={onSubmit}>Publish</Button>
      </Box>
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