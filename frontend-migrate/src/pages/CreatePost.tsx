import React from "react";
import axios from "axios";

import EditorForm from "../components/Editor";

import { useNavigate } from "react-router-dom";

export function Component() {
  const [title, setTitle] = React.useState("");
  const [isDraft, setIsDraft] = React.useState(true);
  const [id, setId] = React.useState(null);

  const navigate = useNavigate();

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
        .post("/posts/add", newPost)
        .then((res) => setId(res.data.post._id));
    }
    navigate('/posts');
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
        .post("/posts/add", newPost)
        .then((res) => {
          setId(res.data.post._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const onDelete = () => {
    if (id) {
      axios
        .delete(`/posts/${id}`)
        .then(() => navigate('/posts'));
    } else {
      navigate('/posts');
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