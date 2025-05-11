import './Subreddit.css';
import { FaReddit } from 'react-icons/fa';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const Subreddit = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const currentSubreddit = useSelector(selectCurrentSubreddit);

    useEffect(() => {
        dispatch(getPopularSubreddits());
    }, [dispatch]);

    const handleSubredditClick = (subreddit) => {
        dispatch(setCurrentSubreddit(subreddit));
        dispatch(getSubredditPosts(subreddit));
    };

    return (
        <div className="subreddit-container">
            <h2>Subreddits</h2>
            <div className="subreddit-list">
                {subreddits.map((sub) => (
                    <div 
                        key={sub.id} 
                        className={`subreddit-item ${currentSubreddit === sub.display_name ? 'active' : ''}`}
                        onClick={() => handleSubredditClick(sub.display_name)}
                    >
                        {sub.icon_img ? <img src={sub.icon_img} alt='' className='subreddit-icon' /> : <FaReddit className='subreddit-icon' />}
                        <p>r/{sub.display_name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};