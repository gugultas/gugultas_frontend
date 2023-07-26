import React from "react";
import ProfileLayout from "../layouts/ProfileLayout";
import { useParams } from "react-router-dom";
import { useGetPlaylistsByIdQuery } from "../features/playlist/playlistSlice";
import {
  useGetPostsByPlaylistQuery,
  useGetPostsOfAuthorForPlaylistQuery,
} from "../features/posts/postSlice";
import PlaylistBox from "../components/playlist/PlaylistBox";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../features/auth/authSlice";
import PostsOfPlaylistComp from "../components/playlist/PostsOfPlaylistComp";
import { Helmet } from "react-helmet-async";

const Playlist = () => {
  const { id } = useParams();
  const currentUsername = useSelector(selectCurrentUsername);

  const { data, isLoading } = useGetPlaylistsByIdQuery(id);
  const { data: posts, isLoading: postLdng } = useGetPostsByPlaylistQuery(id);
  const body = {
    username: currentUsername,
    playlistId: id,
  };
  const { data: wholePosts, isLoading: wholePostLdng } =
    useGetPostsOfAuthorForPlaylistQuery(body);

  return (
    <ProfileLayout>
      <Helmet prioritizeSeoTags>
        <title>{data?.title + " | Okuma Listesi"}</title>
        <meta name="description" description={data?.description} />
      </Helmet>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : (
        <PlaylistBox data={data} />
      )}
      {postLdng || wholePostLdng ? (
        <MainLoadingComp isLoading={postLdng || wholePostLdng} />
      ) : (
        <PostsOfPlaylistComp posts={posts} wholePosts={wholePosts} />
      )}
    </ProfileLayout>
  );
};

export default Playlist;
