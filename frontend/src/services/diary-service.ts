import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Key } from "react";

interface IDiaryDate {
  _id: Key | null | undefined;
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
    postDiary: build.mutation<IDiary, string>({
      query: (item) => ({
        url: "posts",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
