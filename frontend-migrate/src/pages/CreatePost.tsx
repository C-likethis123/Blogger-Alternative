import React, { useContext } from "react";
import axios from "axios";

import EditorForm from "../components/Editor";

import { useHistory } from "react-router-dom";
import { Paths } from "../utils/paths";
import BlogContext from "../contexts/BlogContext";

export default function Component() {
  const [title, setTitle] = React.useState("");
  const [isDraft, setIsDraft] = React.useState(true);
  const [id, setId] = React.useState(null);
  const {selectedBlog : blogId} = useContext(BlogContext);

  const history = useHistory();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const onSubmit = (content: string) => {
    const newPost = {
      title,
      content,
      isDraft: false,
    };

    if (id) {
      axios
        .post(`/posts/update/${id}`, newPost)
        .then((res) => console.log(res.data));
    } else {
      axios
        .post(`/api/blogs/${blogId}/posts`, newPost)
        .then((res) => setId(res.data.id));
    }
    history.push(Paths.PostsList);
  }

  const onSave = (content: string) => {
    const newPost = {
      title,
      content,
      isDraft,
    };

    if (id) {
      axios
        .post(`/posts/update/${id}`, newPost)
    } else {
      axios
        .post(`/api/blogs/${blogId}/posts`, newPost)
        .then((res) => {
          setId(res.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const onDelete = () => {
    if (id) {
      axios
        .delete(`/api/blogs/${blogId}/posts/${id}`)
        .then(() => history.push(Paths.PostsList));
    } else {
      history.push(Paths.PostsList);
    };
  }

  return (
    <React.Fragment>
      <h3>Create Post</h3>
      <EditorForm
        isEdit={false}
        onSubmit={onSubmit}
        onChangeTitle={onChangeTitle}
        onDelete={onDelete}
        onSave={onSave}
      />
    </React.Fragment>
  );
}