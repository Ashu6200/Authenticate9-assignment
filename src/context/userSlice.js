import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("loggedInUser")) || null,
        isAuthenticated: !!localStorage.getItem("loggedInUser"),
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("loggedInUser", JSON.stringify(state.user));
        },
        logout: state => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("loggedInUser");
        },
        addtoWatchlist: (state, action) => {
            if (!state.user) {
                return;
            }
            if (!state.user.watchList) {
                state.user.watchList = [{ listName: "My Watchlist", listMovies: [] }];
            }
            const { listName, listMovies } = action.payload;
            const listIndex = state.user.watchList.findIndex(
                watchlist => watchlist.listName === listName
            );
            if (listIndex === -1) {
                state.user.watchList.push({
                    listName: listName,
                    listMovies: [listMovies],
                });
            } else {
                const existingMovies = state.user.watchList[listIndex].listMovies;
                const isMoviePresent = existingMovies.some(
                    movie => movie.imdbId === listMovies.imdbId
                );
                if (!isMoviePresent) {
                    state.user.watchList[listIndex].listMovies = [
                        ...state.user.watchList[listIndex].listMovies,
                        listMovies,
                    ];
                    toast.success("Successfully add to watchlist")
                } else {
                    toast.error("Movie already saved");
                }
            }
            localStorage.setItem("loggedInUser", JSON.stringify(state.user));
            localStorage.setItem("users", JSON.stringify(state.user));
        },
        removetoWatchList: (state, action) => {
            if (!state.user) {
                return;
            }
            if (!state.user.watchList) {
                return;
            }
            const { listName, imdbId } = action.payload;
            const listIndex = state.user.watchList.findIndex(
                watchlist => watchlist.listName === listName
            );
            if (listIndex !== -1) {
                state.user.watchList[listIndex].listMovies = state.user.watchList[
                    listIndex
                ].listMovies.filter(i => i.imdbId !== imdbId);
                // if (state.user.watchList[listIndex].listMovies.length === 0) {
                //     state.user.watchList.splice(listIndex, 1);
                // }
                toast.success("Successfully removed  form watchlist")
                localStorage.setItem("loggedInUser", JSON.stringify(state.user));
                localStorage.setItem("users", JSON.stringify(state.user));
            } else {
                toast.error("not Present");
            }
        },
    },
});

export const { login, logout, addtoWatchlist, removetoWatchList } =
    userSlice.actions;
export default userSlice.reducer;
