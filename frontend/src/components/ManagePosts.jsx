import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CsrfContext } from "../contexts/CsrfTokenContext";
import { AuthContext } from "../contexts/AuthContext";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { getCsrfToken } = useContext(CsrfContext);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPosts = async () => {
      try {
        if (isLoggedIn) {
          const postRes = await fetch("http://localhost:8000/api/user-posts/", {
            signal: signal,
            credentials: "include",
          });

          if (postRes.status === 404) {
            setPosts([]);
          } else if (!postRes.ok) {
            throw new Error("Error fetching user posts");
          } else {
            const postData = await postRes.json();
            setPosts(postData);
          }
        }
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("Abort Error!");
        } else {
          console.error(e);
        }
      }
    };
    fetchPosts();

    return () => controller.abort();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching data!!");
      }

      setPosts((prevPost) => prevPost.filter((post) => post.id != id));
      navigate("/manage-posts");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="manage-post-container">
      {isLoggedIn ? (
        <>
          <button
            className="create-btn"
            onClick={() => navigate(`/posts/edit`)}
          >
            Create
          </button>
          {posts.length === 0 ? (
            <h2>Post not available</h2>
          ) : (
            <div className="post-list">
              <h2>Manage Posts</h2>
              <div className="posts-container">
                {posts.map((post) => (
                  <div key={post.id} className="post-item">
                    <p className="post-title">{post.title}</p>
                    <p rows={5} className="post-body">
                      {post.body}
                    </p>
                    <button
                      className="manage-btn"
                      onClick={() => navigate(`/posts/${post.id}/edit`)}
                    >
                      Update
                    </button>
                    <button
                      className="manage-btn"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="login-register-message">
          <h2 className="not-loggedin">
            Please <Link to="/login">login</Link> or{" "}
            <Link to="/register">register</Link> to manage your posts.
          </h2>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
