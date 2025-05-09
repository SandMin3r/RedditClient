import './Subreddit.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectSubreddits, 
    getPopularSubreddits,
    getSubredditPosts
} from '../../store/redditSlice';

export const Subreddit = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);

    useEffect(() => {
        dispatch(getPopularSubreddits());
    }, [dispatch]);

    const handleSubredditClick = (subreddit) => {
        dispatch(getSubredditPosts(subreddit));
    };

    return (
        <div className="subreddit-container">
            <h2>Subreddits</h2>
            <div className="subreddit-list">
                {subreddits.map((sub) => (
                    <div 
                        key={sub.id} 
                        className="subreddit-item"
                        onClick={() => handleSubredditClick(sub.display_name)}
                    >
                        <img 
                            src={sub.icon_img || 'https://via.placeholder.com/30'} 
                            alt="subreddit logo" 
                            className="subreddit-icon"
                        />
                        <p>r/{sub.display_name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};