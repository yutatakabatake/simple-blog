import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import Settings from './components/Settings';
import PublicBlog from './components/PublicBlog';
import PublicPostDetail from './components/PublicPostDetail';
import './App.css'
import type { User } from './types/user';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PublicBlog isAuthenticated={!!currentUser} />}
        />
        <Route
          path="/post/:id"
          element={<PublicPostDetail isAuthenticated={!!currentUser} />}
        />
        <Route
          path="/login"
          element={
            currentUser ?
              <Navigate to="/dashboard" /> :
              <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/register"
          element={
            currentUser ?
              <Navigate to="/dashboard" /> :
              <Register onRegister={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={
            currentUser ?
              <Dashboard currentUser={currentUser} onLogout={handleLogout} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/new-post"
          element={
            currentUser ?
              <NewPost currentUser={currentUser} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/post/:id/edit"
          element={
            currentUser ?
              <EditPost currentUser={currentUser} /> :
              <Navigate to="/login" />
          }
        />
        <Route
          path="/settings"
          element={
            currentUser ?
              <Settings currentUser={currentUser} /> :
              <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App