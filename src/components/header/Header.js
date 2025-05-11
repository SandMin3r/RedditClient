import './Header.css';
import { FaReddit, FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSubredditPosts, searchRedditPosts } from '../../store/postsSlice';

export const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchTerm.startsWith('r/')) {
            const subreddit = searchTerm.split('r/')[1];
            dispatch(getSubredditPosts(subreddit));
        } else {
            dispatch(searchRedditPosts(searchTerm));
        }
        setSearchTerm('');
    };

    return (
        <header>
            <div className='redditMinimal-logo'>
                <FaReddit className='reddit-logo' />
                <h1>Reddit<span className='black'>Minimal</span></h1>
            </div>
            <form className='searchbar' onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                    <FaSearch className='search-logo' />
                </button>
            </form>
        </header>
    )
};