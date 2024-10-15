
import { PinOff } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removetoWatchList } from '../context/userSlice'
import PropTypes from 'prop-types';

const UnsaveModal = ({ listName, imdbID }) => {
    const dispatch = useDispatch()
    return (
        <PinOff className='cursor-pointer text-white' onClick={() => dispatch(removetoWatchList({ listName, imdbID }))} />
    )
}
UnsaveModal.propTypes = {
    listName: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
};
export default UnsaveModal