import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/page_layout/Header';
import Main from './components/page/Main';
import WishList from './components/page/wishlist';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path='/' element={<Main />} />
          <Route path='/wishlist' element={<WishList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
