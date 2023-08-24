import Nav from "../../components/Nav.component";
import TrendingTags from "../../components/TrendingTags.component.jsx";
import {
  UserPageContainer,
  PostsContainer,
  SideBarContainer,
  PostsHeaderContainer,
  FollowButton,
  UnFollowButton,
} from "./styled.js";
import { useParams, useNavigate, useFormAction } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
  const { user, following, setFollowingData } = useUserContext();
  const followButton = useRef();
  const unfollowButton = useRef();

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
  }, [following]);

  function followUser() {
    followButton.current.disabled = true;
    const promise = api.followUser(auth.token, id);

    promise
      .then(() => {
        setFollowingData([...following, Number(id)]);
        followButton.current.disabled = false;
      })
      .catch((err) => {
        console.error(err.response.data);
        alert(
          "An error occurred while trying to follow this user, please try again later"
        );
      });
  }

  function unFollowUser() {
    unfollowButton.current.disabled = true;
    const promise = api.unFollowUser(auth.token, id);

    promise
      .then(() => {
        setFollowingData(following.filter((followedId) => followedId !== Number(id)));
        unfollowButton.current.disabled = false;
      })
      .catch((err) => {
        console.error(err.response.data);
        alert(
          "An error occurred while trying to unfollow this user, please try again later"
        );
      });
  }

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
        {Number(id) !== user.userId && !following.includes(Number(id)) ? (
          <FollowButton onClick={followUser} ref={followButton}>
            <p>Follow</p>
          </FollowButton>
        ) : Number(id) !== user.userId && following.includes(Number(id)) ? (
          <UnFollowButton onClick={unFollowUser} ref={unfollowButton}>
            <p>Unfollow</p>
          </UnFollowButton>
        ) : (
          ""
        )}
        <TrendingTags />
      </SideBarContainer>
    </UserPageContainer>
  );
}
