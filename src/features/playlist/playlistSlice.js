import { apiSlice } from "../api/apiSlice";

export const playlistSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPlaylist: builder.mutation({
      query: (reqBody) => ({
        url: "/playlists",
        method: "post",
        body: reqBody,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "Playlist", id: "LIST" }],
    }),
    updatePlaylist: builder.mutation({
      query: (reqBody) => ({
        url: "/playlists/updatePlaylist/" + reqBody.id,
        method: "put",
        body: reqBody.body,
      }),
      invalidatesTags: [{ type: "Playlist", id: "LIST" }],
    }),
    deletePlaylist: builder.mutation({
      query: (id) => ({
        url: "/playlists/deletePlaylist/" + id,
        method: "delete",
      }),
      invalidatesTags: [{ type: "Playlist", id: "LIST" }],
    }),
    getPlaylistsByAuthor: builder.query({
      query: (username) => ({
        url: "/playlists/allPlaylistByAuthor/" + username,
        method: "get",
      }),
      providesTags: [{ type: "Playlist", id: "LIST" }],
    }),
    getPlaylistsById: builder.query({
      query: (id) => ({
        url: "/playlists/getPlaylistById/" + id,
        method: "get",
      }),
      providesTags: [{ type: "Playlist", id: "LIST" }],
    }),
    addPostToPlaylist: builder.mutation({
      query: (reqBody) => ({
        url: "/playlists/addPostToPlaylist",
        method: "put",
        body: reqBody,
      }),
      invalidatesTags: [{ type: "Playlist", id: "LIST" }],
    }),
    removePostToPlaylist: builder.mutation({
      query: (reqBody) => ({
        url: "/playlists/removePostFromPlaylist",
        method: "put",
        body: reqBody,
      }),
      invalidatesTags: [{ type: "Playlist", id: "LIST" }],
    }),
  }),
});

export const {
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
  useGetPlaylistsByAuthorQuery,
  useGetPlaylistsByIdQuery,
  useAddPostToPlaylistMutation,
  useRemovePostToPlaylistMutation,
} = playlistSlice;
