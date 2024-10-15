import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
    reducerPath: "movie",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.omdbapi.com/",
    }),
    endpoints: builder => ({
        searchMovies: builder.query({
            query: ({ title, page = 1 }) => `?apikey=dbeb4407&s=${title}&page=${page}&r=json`,
        }),
        getMovieById: builder.query({
            query: (imdbID) => `?apikey=dbeb4407&i=${imdbID}&r=json`,
        }),
    }),
});


export const { useSearchMoviesQuery, useGetMovieByIdQuery, useGetMovieByTitleQuery } = movieApi