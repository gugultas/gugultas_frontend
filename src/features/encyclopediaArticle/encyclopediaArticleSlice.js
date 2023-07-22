import { apiSlice } from "../api/apiSlice";

export const encyclopediaArticleSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEncyclopediaArticle: builder.mutation({
      query: (reqBody) => ({
        url: "/encyclopediaArticles",
        method: "post",
        body: reqBody,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "EncyclopediaArticle", id: "LIST" }],
    }),
    updateEncyclopediaArticle: builder.mutation({
      query: (reqBody) => ({
        url: "/encyclopediaArticles/updateEncyclopediaArticle/" + reqBody?.id,
        method: "put",
        body: reqBody.body,
      }),
      invalidatesTags: [{ type: "EncyclopediaArticle", id: "LIST" }],
    }),
    deleteEncyclopediaArticle: builder.mutation({
      query: (id) => ({
        url: "/encyclopediaArticles/deleteEncyclopediaArticle/" + id,
        method: "delete",
      }),
      invalidatesTags: [{ type: "EncyclopediaArticle", id: "LIST" }],
    }),
    getEncyclopediaArticles: builder.query({
      query: () => ({
        url: "/encyclopediaArticles",
        method: "get",
      }),
      providesTags: [{ type: "EncyclopediaArticle", id: "LIST" }],
    }),
    getEncyclopediaArticleById: builder.query({
      query: (id) => ({
        url: "/encyclopediaArticles/" + id,
        method: "get",
      }),
      providesTags: [{ type: "EncyclopediaArticle", id: "LIST" }],
    }),
    getLastSevenEncyclopediaArticles: builder.query({
      query: () => ({
        url: "/encyclopediaArticles/getLastSevenEncyclopediaArticle",
        method: "get",
      }),
      providesTags: [{ type: "EncyclopediaArticle", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateEncyclopediaArticleMutation,
  useUpdateEncyclopediaArticleMutation,
  useDeleteEncyclopediaArticleMutation,
  useGetEncyclopediaArticleByIdQuery,
  useGetEncyclopediaArticlesQuery,
  useGetLastSevenEncyclopediaArticlesQuery,
} = encyclopediaArticleSlice;
