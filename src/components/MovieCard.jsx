import { Link } from "react-router-dom";
import SaveModal from "./SaveModal";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import UnsaveModal from "./UnsaveModal";


const MovieCard = ({ movie }) => {
    const watchListItem = useSelector((state) => state.user.user.watchList)
    const transformedArray = watchListItem.map(watchlist => {
        return watchlist.listMovies.map(movie => ({
            listName: watchlist.listName,
            imdbID: movie.imdbID
        }));
    }).flat();
    const isMoviePresent = (movie) => {
        const { imdbID } = movie;
        return transformedArray.some(item => item.imdbID === imdbID);
    };
    const findMovieInLists = (movie) => {
        const { imdbID } = movie;
        const listsWithMovie = transformedArray
            .filter(item => item.imdbID === imdbID)
            .map(item => item.listName);

        return listsWithMovie.length > 0 ? listsWithMovie : null;
    };
    const listsWithMovie = findMovieInLists(movie);
    return (
        <div className='cardGlass rounded-3xl'>
            <img
                src={
                    movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
                className='h-[200px] w-full rounded-t-2xl object-cover'
            />
            <div className='py-2 px-4'>
                <h4 className='text-white text-lg font-[600] '>
                    {movie.Title} ({movie.Year})
                </h4>
                <p className='text-white  text-sm font-[500] '>
                    Type: {movie.Type}{" "}
                </p>
                <div className='flex items-center my-1 justify-between'>
                    <Link
                        to={`/movie-details/${movie.imdbID}`}
                        className='py-1 px-3 bg-[#6126DD] rounded-[5px] cursor-pointer text-sm text-white'
                    >
                        View
                    </Link>
                    {isMoviePresent(movie) ? (
                        <UnsaveModal listName={listsWithMovie ? listsWithMovie[0] : ""} imdbID={movie.imdbID} />
                    ) : (
                        <SaveModal movie={movie} />
                    )}

                </div>
            </div>
        </div>
    );
};
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Poster: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        Type: PropTypes.string.isRequired,
        imdbID: PropTypes.string.isRequired,
    }).isRequired,
};

export default MovieCard;
