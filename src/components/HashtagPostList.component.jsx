import React, { useEffect, useState } from "react";
import TimelinePostItem from "./TimelinePostItem.component";
import useAuth from "../hooks/useAuth";
import axios from "axios";
  
function HashtagPosts({ tagName }) {
  const API_URL = process.env.REACT_APP_API_URL;

  const { token } = useAuth();
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [emptyPage, setEmptyPage] = useState(false);

  console.log(tagName);

  useEffect(() => {
    axios
      .get(`${API_URL}/hashtag/${tagName}`, config)
      .then((res) => {
        console.log(res.data);

        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.error(err);
        setError(true);
        setLoading(false);
        alert(
          "An error occurred while trying to fetch the hashtag's posts, please refresh the page"
        );
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading posts</p>
      ) : (
        posts.map((post) => <TimelinePostItem key={post.id} post={post} />)
      )}
    </div>
  );
}

export default HashtagPosts;
