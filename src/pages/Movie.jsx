import { useState } from "react";
import { useSearchMoviesQuery } from "../context/movieApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import MovieCard from "../components/MovieCard";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const Movie = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useSearchMoviesQuery({
        title: searchTerm,
        page,
    });
    const searchSchema = yup.object().shape({
        title: yup.string().required("Movie title is required"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(searchSchema),
    });

    const onSubmit = data => {
        setSearchTerm(data.title);
    };
    return (
        <section className='w-full h-full cardGlass overflow-y-scroll scrollbar-hide'>
            <div className='p-4'>
                <div className='text-white'>
                    <h1 className='text-4xl golden_text font-bold'>
                        Welcome to Watchlist
                    </h1>
                    <p className='font-semibold text-base'>
                        Browse movies, add them to watchlist and share them with friends.
                    </p>
                    <p className='font-semibold text-base'>
                        {" "}
                        Just click save to add a movie, the poster to see more details and
                        to mark the movie as watched.
                    </p>
                </div>
                <form
                    className=' p-4 flex flex-col gap-4'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        type='text'
                        {...register("title")}
                        placeholder='Search for a movie...'
                        className='w-full outline-none border-none p-2 rounded-lg'
                    />
                    {errors.title && (
                        <p className='text-sm text-red-400'>{errors.title.message}</p>
                    )}
                    <button
                        className='w-full p-2 bg-[#6126DD] rounded font-medium text-sm text-white text-center'
                        type='submit'
                    >
                        Search
                    </button>
                </form>
                <div>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error occurred: {error.message}</p>}
                    {data && (
                        <>
                            <div className='grid grid-cols-1 gap-4 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5'>
                                {data.Search &&
                                    data.Search.map((movie) => {
                                        return <MovieCard key={movie.imdbID} movie={movie} />;
                                    })}
                            </div>
                            <div className='mt-2'>
                                <ResponsivePagination
                                    current={page}
                                    total={Math.floor(data.totalResults / 10)}
                                    onPageChange={setPage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Movie;
