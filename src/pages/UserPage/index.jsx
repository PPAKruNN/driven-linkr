import Nav from "../../components/Nav.component";
import TrendingTags from "../../components/TrendingTags.component.jsx";
import {
  UserPageContainer,
  PostsContainer,
  SideBarContainer,
  PostsHeaderContainer,
} from "./styled.js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import TimelinePostItem from "../../components/TimelinePostItem.component";
import useAuth from "../../hooks/useAuth";


export default function UserPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !Number.isInteger(Number(id))) {
      navigate("/");
      return;
    };

    const promise = api.getUserPosts(auth.token, id);

    promise
      .then((res) => {
        if (Array.isArray(res.data.results)) {
          setPosts(res.data.results);
          setLoading(false);
        } else {
          console.error(res.data);
          setError(true);
          setLoading(false);
          alert(
            "An error occurred while trying to fetch the posts, please refresh the page"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
        alert(
          "An error occurred while trying to fetch the posts, please refresh the page"
        );
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <UserPageContainer>
      <Nav />
      <PostsContainer>
        <PostsHeaderContainer>
          <img src={posts[0].profileUrl} alt={posts[0].userName} />
          <h1>{`${posts[0].userName}'s posts`}</h1>
        </PostsHeaderContainer>
        {posts.length >= 2 ? posts.map((post) => post.link ? (
          <TimelinePostItem data-test="post" key={post.id} post={post} />
        ) 
        :
        ("")) : <h1>This user has no posts yet</h1>}
      </PostsContainer>
      <SideBarContainer>
        <TrendingTags />
      </SideBarContainer>
    </UserPageContainer>
  );
}
