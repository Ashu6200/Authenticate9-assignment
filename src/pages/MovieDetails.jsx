import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../context/movieApi";
import { Star, Clock, Calendar, Film, Globe, Award } from "lucide-react";

const MovieDetails = () => {
    const { id } = useParams();
    const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);
    if (isLoading) return <p className="">Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;
    return (
        <section className='relative w-full mx-auto overflow-hidden rounded-lg shadow-lg overflow-y-scroll cardGlass'>
            <div className='relative z-10 flex flex-col md:flex-row p-6'>
                <img
                    src={
                        movie?.Poster && movie?.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/300x450"
                    }
                    alt={movie.Title || "Movie poster"}
                    className='w-full md:w-80 h-auto rounded-lg shadow-md'
                />
                <div className='flex-1 md:ml-6 mt-4 md:mt-0'>
                    <h1 className='text-3xl font-bold text-white mb-2'>
                        {movie.Title || "Unknown Title"}
                    </h1>
                    <div className='flex items-center mb-4'>
                        <Star className='w-6 h-6 text-yellow-400 mr-1' />
                        <span className='text-xl font-semibold text-white'>
                            {movie.imdbRating || "N/A"}
                        </span>
                        <span className='text-sm text-white ml-2'>/ 10</span>
                    </div>
                    <p className='text-white mb-4'>
                        {movie.Plot || "No plot available"}
                    </p>
                    <div className='grid grid-cols-2 gap-4 text-sm text-white'>
                        <div className='flex items-center'>
                            <Clock className='w-4 h-4 mr-2 text-white' />
                            <span>{movie.Runtime || "Unknown"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Calendar className='w-4 h-4 mr-2 text-white' />
                            <span>{movie.Year || "Unknown"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Film className='w-4 h-4 mr-2 text-white' />
                            <span>{movie.Genre || "Unknown"}</span>
                        </div>
                        <div className='flex items-center'>
                            <Globe className='w-4 h-4 mr-2 text-white' />
                            <span>{movie.Language || "Unknown"}</span>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h2 className='text-xl font-semibold text-white mb-2'>Cast</h2>
                        <p className='text-white'>{movie.Actors || "Unknown"}</p>
                    </div>
                    <div className='mt-4'>
                        <h2 className='text-xl font-semibold text-white mb-2'>Director</h2>
                        <p className='text-white'>{movie.Director || "Unknown"}</p>
                    </div>
                    <div className='mt-4 flex items-center'>
                        <Award className='w-6 h-6 text-yellow-400 mr-2' />
                        <p className='text-white'>
                            {movie.Awards || "No awards information available"}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieDetails;
