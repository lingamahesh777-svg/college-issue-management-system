import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import CreateIssue from './pages/CreateIssue'
import { Routes, Route, useNavigate } from 'react-router-dom'
import GetAllIssues from './pages/GetAllIssues'
import ResolvedIssues from './pages/ResolvedIssues'
import InProgressIssues from './pages/InProgressIssues'
import UpdateIssueStatus from './pages/UpdateIssueStatus'
import AnnouncementPage from './pages/AnnouncementPage'
import Solver from './pages/Solver'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import UserAnnouncementPage from './pages/UserAnnouncementPage'
import Adminpage from './pages/Adminpage'
import AdminLogin from './pages/AdminLogin'
import About from './pages/About'
import Contact from './pages/Contact'
import ProtectedRoute from './pages/ProtectedRoute'
import PublicRoute from './pages/PublicRoute'
import AdminProtectedRoute from './pages/AdminLoginRoute'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const onPop = () => {
      const token = localStorage.getItem('token');
      const isAdmin = localStorage.getItem('admin');
      const path = window.location.pathname;

      // If user is logged out, always redirect to login page
      if (!token) {
        navigate('/', { replace: true });
        return;
      }

      // If logged-in non-admin tries to access admin routes, redirect to home
      if ((path === '/admin' || path.startsWith('/admin')) && !isAdmin) {
        navigate('/home', { replace: true });
      }
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

       <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

        <Route
          path="/issues/open"
          element={
            <ProtectedRoute>
              <GetAllIssues />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues/inprogress"
          element={
            <ProtectedRoute>
              <InProgressIssues />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issues/resolved"
          element={
            <ProtectedRoute>
              <ResolvedIssues />
            </ProtectedRoute>
          }
        />

        <Route
          path="/announcements"
          element={
            <ProtectedRoute>
              <AnnouncementPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-issue"
          element={
            <ProtectedRoute>
              <CreateIssue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-issue"
          element={
            <ProtectedRoute>
              <UpdateIssueStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/solver"
          element={
            <ProtectedRoute>
              <Solver />
            </ProtectedRoute>
          }
        />

        <Route
          path='/UserAnnouncement'
          element={
            <ProtectedRoute>
              <UserAnnouncementPage />
            </ProtectedRoute>
          }
        />

      <Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <Adminpage />
    </AdminProtectedRoute>
  }
/>

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </div>
  )
}

export default App
