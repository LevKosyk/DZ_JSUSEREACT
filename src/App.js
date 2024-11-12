import ListScreen from './components/ListScreen/ListScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import UserProvider from './context/UserContext';
import UpdateScreen from './components/UpdateScreen/UpdateScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { isAuthenticated } from './utils/auth'

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path='/users' element={<PrivateRoute><ListScreen /></PrivateRoute>} />
          <Route path='/users/:id/update' element={<PrivateRoute><UpdateScreen /></PrivateRoute>} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
