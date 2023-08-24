import Nav from "../../components/Nav.component";
import TrendingTags from "../../components/TrendingTags.component.jsx";
import {
  UserPageContainer,
  PostsContainer,
  SideBarContainer,
  PostsHeaderContainer,
  FollowButton,
} from "./styled.js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import TimelinePostItem from "../../components/TimelinePostItem.component";
import useAuth from "../../hooks/useAuth";
import useUserContext from "../../hooks/useUserContext";

export default function UserPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (!auth || !Number.isInteger(Number(id))) {
      navigate("/");
      return;
    }

    const promise = api.getUserPosts(auth.token, id);

    promise
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPosts(res.data);
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
          <div>
            <img src={posts[0].profileUrl} alt={posts[0].userName} />
            <h1>{`${posts[0].userName}'s posts`}</h1>
          </div>
        </PostsHeaderContainer>
        {posts.length > 0 ? (
          posts.map((post) =>
            post.link ? (
              <TimelinePostItem data-test="post" key={post.id} post={post} />
            ) : (
              ""
            )
          )
        ) : (
          <h1>This user has no posts yet</h1>
        )}
      </PostsContainer>
      <SideBarContainer>
        {Number(id) !== user.userId && (
          <FollowButton onClick={() => api.followUser(auth.token, id)}>
            <p>Follow</p>
          </FollowButton>
        )}
        <TrendingTags />
      </SideBarContainer>
    </UserPageContainer>
  );
}
