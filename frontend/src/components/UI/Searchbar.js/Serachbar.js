import './Searchbar.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Serachbar(props) {
    return(
        <div className="search">
            <div className='search-icon'><i className='bi bi-search'></i></div>
            <form action='/search' method='get'>
                <input type='text' className='search-input' name='search' placeholder='Search'></input>
            </form>
            <span className='clear-text-search'></span>
        </div>
    )
};
