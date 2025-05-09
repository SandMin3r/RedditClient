import './App.css';
import { Header } from './components/header/Header.js';
import { Posts } from './components/posts/Posts.js';
import { Subreddit } from './components/subreddit/Subreddit.js';

function App() {
  return (
    <div>
      <Header />
      <div className='grid'>
        <main>
          <Posts />
        </main>
        <aside>
          <Subreddit />
        </aside>
      </div>
    </div>
  );
}

export default App;
