import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {
  const watchlist = useSelector(state => state.user.user.watchList);
  const [activeList, setActiveList] = useState(watchlist?.length > 0 ? watchlist[0] : null);
  useEffect(() => {
    if (watchlist?.length > 0) {
      setActiveList(watchlist[0]);
    }
  }, [watchlist]);

  return (
    <section className="w-full h-full cardGlass overflow-y-scroll">
      <div className="p-4">
        <div className="text-white">
          <h1 className="text-4xl golden_text font-bold">All saved movies</h1>
        </div>
        {watchlist && watchlist.length > 0 ? (
          watchlist.map((watchlistItem, key) => (
            <div key={key}>
              <div className="flex flex-wrap gap-4">
                <div
                  onClick={() => setActiveList(watchlistItem)}
                  className={`rounded font-medium text-sm p-2 cursor-pointer ${activeList?.listName === watchlistItem.listName
                    ? "golden_text"
                    : "text-white"
                    }`}
                >
                  List Name: {watchlistItem.listName}
                </div>
              </div>
              <div className="w-full">
                {activeList?.listName === watchlistItem.listName && (
                  <div className='grid grid-cols-1 gap-4 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5'>
                    {activeList.listMovies.map((movie, index) => (
                      <MovieCard key={index} movie={movie} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No watchlists available</p>
        )}
      </div>
    </section>
  );
};

export default Watchlist;
