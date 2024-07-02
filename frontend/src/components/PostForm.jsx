import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CsrfContext } from "../contexts/CsrfTokenContext";

const PostForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { getCsrfToken } = useContext(CsrfContext);

  useEffect(() => {
    if (isEdit && id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/posts/${id}/`
          );

          if (!response.ok) {
            throw new Error("Error fetching data!!");
          }
          const resData = await response.json();
          console.log(resData);
          setTitle(resData.title);
          setBody(resData.body);
        } catch (e) {
          console.error(e);
        }
      };
      fetchPost();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEdit ? `/api/posts/${id}/` : "/api/posts/";
    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }
      alert(`Post ${isEdit ? "updated" : "created"} successfully`);
      navigate("/manage-posts");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="form-section">
      <h2>{isEdit ? "Edit Post" : "Create Post"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          autoComplete="off"
          required
        />

        <textarea
          rows={5}
          cols={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          autoComplete="off"
          required
        />
        <button type="submit">{isEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default PostForm;
