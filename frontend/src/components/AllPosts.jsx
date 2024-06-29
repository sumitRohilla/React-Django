import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../contexts/LoadingContext";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts/", { signal: signal });

        if (!response.ok) {
          throw new Error(`Error fetching data!! Status : ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (e) {
        if (e.name == "AbortError") {
          console.log("Abort Error!!");
        } else {
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();

    return () => controller.abort();
  }, []);

  return (
    <div className="allpost-container">
      {loading ? (
        <h2>Loading...</h2>
      ) : posts.length == 0 ? (
        <h2>No Posts in Database</h2>
      ) : (
        <>
          <h2>All Posts</h2>

          <div className="posts-container">
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <p className="post-title">{post.title}</p>
                <p rows={5} className="post-body">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllPosts;
