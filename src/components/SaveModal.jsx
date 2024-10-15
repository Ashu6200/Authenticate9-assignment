import { CircleX, Save } from "lucide-react";
import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { addtoWatchlist } from "../context/userSlice";
import PropTypes from 'prop-types';


const SaveModal = ({ movie }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const watchListItem = useSelector((state) => state.user.user.watchList)
    const [watchlistName, setWatchlistName] = useState(null)
    const [watchList, setWatchList] = useState(watchListItem)
    const hanlderList = (selectedOption) => {
        if (selectedOption) {
            setWatchlistName(selectedOption.listName);
        } else {
            setWatchlistName(null);
        }
    };
    const createNewWatchlist = (newListName) => {
        const newWatchlist = { listName: newListName, listMovies: [] };
        setWatchList((prevWatchList) => [...prevWatchList, newWatchlist]);
        setWatchlistName(newListName);
    };
    const saveMovieHanlder = (e) => {
        e.preventDefault();
        dispatch(addtoWatchlist({ listName: watchlistName, listMovies: movie }));
        setOpen(false);
    }
    return (
        <>
            <Save onClick={onOpenModal} className='cursor-pointer text-white' />
            <Modal
                open={open}
                onClose={onCloseModal}
                center
                closeIcon={<CircleX className='cursor-pointer text-white' />}
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                }}
            >
                <h1 className='golden_text font-bold'>Save your movie in list</h1>
                <div className='mt-2'>
                    <form className="flex flex-col gap-2">
                        <div className='flex flex-col gap-1'>
                            <label className='text-white text-lg font-semibold'>Select watch list</label>
                            <CreatableSelect
                                className="basic-single"
                                classNamePrefix="select"
                                name="watchlist"
                                isSearchable
                                isClearable
                                options={watchList}
                                defaultValue={watchList[0]}
                                value={watchlistName ? { listName: watchlistName } : null}
                                onChange={hanlderList}
                                onCreateOption={createNewWatchlist}
                                getOptionLabel={(option) => option.listName}
                                getOptionValue={(option) => option.listName}
                            />
                        </div>
                        <button className='w-full p-2 bg-[#6126DD] rounded font-medium text-sm text-white text-center' onClick={saveMovieHanlder}>
                            Save
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
};
SaveModal.propTypes = {
    movie: PropTypes.object.isRequired,
};
export default SaveModal;
