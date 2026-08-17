import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Issue from './pages/Issue';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/issue" element={<Issue />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;