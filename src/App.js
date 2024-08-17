import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AppContextProvider from './context/AppContextProvider';
import AddProduct from './pages/AddProduct';
import HandleProduct from './pages/ProductHandle';

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/addproduct"} element={<AddProduct />} />
        <Route path={"/productadmin"} element={<HandleProduct />} />
      </Routes>
      <Footer />
    </AppContextProvider>
  );
}

export default App;
