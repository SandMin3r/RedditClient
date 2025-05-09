import './Header.css';
import { FaReddit, FaSearch } from "react-icons/fa";

export const Header = () => {
    return (
        <header>
            <div className='redditMinimal-logo'>
                <FaReddit className='reddit-logo' />
                <h1>Reddit<span className='black'>Minimal</span></h1>
            </div>
            <form className='searchbar'>
                <input
                    type="text"
                    placeholder="search"
                ></input>
                <button>
                    <FaSearch className='search-logo' />
                </button>
            </form>
        </header>
    )
};