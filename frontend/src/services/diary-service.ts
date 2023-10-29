import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface IDiaryDate {
  _id: string;
  title: string;
  description: string;
  date: string;
}

interface IDiary {
  date: IDiaryDate[];
  totalItems: number;
}

export const diaryAPI = createApi({
  reducerPath: "diaryAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getAllDiary: build.query<
      IDiary,
      { sort: string; page: number; limit: number }
    >({
      query: ({ sort, page, limit = 6 }) => {
        return {
          url: "posts",
          params: {
            sort: sort,
            page: page,
            limit: limit,
          },
        };
      },
      providesTags: () => ["Post"],
    }),
    getPostById: build.query<IDiaryDate, string>({
      query: (id) => {
        return {
          url: `posts/${id}`,
        };
      },
    }),
    postDiary: build.mutation<IDiary, string>({
      query: (item) => ({
        url: "posts",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePostDiary: build.mutation<IDiary, { id: string; item: IDiaryDate }>({
      query: ({ id, item }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: item,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePostDiary: build.mutation<string, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
