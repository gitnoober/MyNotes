import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/ResgisterPage';
import NotePage from './pages/NotePage';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="container dark">
      <div className='app'>
        <Router>
          <AuthProvider>
          <Header />
            <ToastContainer autoClose={5000}/>
            <PrivateRoute component={HomePage} path="/" exact />
            <Route component={LoginPage} path="/login" />
            <Route component={RegisterPage} path="/register" />
            <PrivateRoute component={NotePage} path="/note/:id" />
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
