import Sidebar from '../components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import Movie from './Movie';
import Watchlist from './Watchlist';

const Home = () => {

    return (
        <main className='w-full h-lvh'>
            <div className='p-2 tablet:flex gap-2 w-full h-full'>
                <Sidebar />
                <Routes>
                    <Route path='/' element={<Movie />} />
                    <Route path='/watchlist' element={<Watchlist />} />
                    <Route path='/movie-details/:id' element={<MovieDetails />} />
                </Routes>
            </div>
        </main>
    )
}

export default Home