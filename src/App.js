import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { Header } from './components/header/Header.js';
import { Posts } from './components/posts/Posts.js';
import { Subreddit } from './components/subreddit/Subreddit.js';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className='grid'>
        <main>
          <Posts />
        </main>
        <aside>
          <Subreddit />
        </aside>
      </div>
    </Provider>
  );
}

export default App;
