import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

// Page components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {

  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {/* only show components when authIsReady is true */}
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/"
              element={!user ? <Navigate to="/login" /> : <Home />}
            />
            <Route path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
