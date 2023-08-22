import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header';
import RoutesApp from './Routes';
import Footer from './components/Footer';
import UserProvider from './Contexts/user';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  return (
    <BrowserRouter>
      <UserProvider>
        <ToastContainer autoClose={3000} />
        <Header />
        <RoutesApp />
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
