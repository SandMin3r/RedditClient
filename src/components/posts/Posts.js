import { FaArrowUp, FaArrowDown, FaCommentAlt } from "react-icons/fa";
import './Posts.css';

export const Posts = () => {
    return(
        <div>
            <h2>Reddit post title</h2>
            <form>
                <button>
                    <FaArrowUp />
                </button>
                <p>Nº</p>
                <button>
                    <FaArrowDown />
                </button>
            </form>
            <img src="" alt="optional post image"></img>

            <p>User</p>
            <p>time of post '19 hours ago'</p>
            <div>
                <FaCommentAlt />
                <p>comments</p>
            </div>
        </div>
    )
};