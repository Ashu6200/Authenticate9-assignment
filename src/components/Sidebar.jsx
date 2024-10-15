import { Home, List, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../context/userSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user);
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logout())
        navigate("/login");

    }
    return (

        <div className=" grid gap-2 tablet:flex tablet:flex-col tablet:h-screen min-w-[250px] p-4 cardGlass ">
            <div className='flex items-center tablet:flex-col tablet:items-start'>
                <h1 className="text-2xl font-bold golden_text">Watchlist</h1>
                <nav className="tablet:flex-1">
                    <ul className="space-y-2 flex items-center tablet:flex-col tablet:items-start">
                        <li>
                            <Link to="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white">
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/watchlist" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white">
                                <List className="w-5 h-5" />
                                <span>Watchlist</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="mt-auto">
                <div className="rounded-lg shadow p-4 flex tablet:flex-col gap-4">
                    <p className="text-sm text-white mb-2">{user?.email}</p>
                    <button
                        className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                        onClick={logoutHandler}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>

                </div>
            </div>
        </div>

    )
}

export default Sidebar