import ListScreen from './components/ListScreen/ListScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import { UserProvider } from './context/UserContex';
import UpdateScreen from './components/UpdateScreen/UpdateScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { isAuthenticated } from './utils/auth'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/users" element={<ListScreen /> }/>
          <Route path="/users/:id/update" element={<UpdateScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
