import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./hooks/auth/useAuth";
import { GalleryPage } from "./pages/GalleryPage";

function Router() {
  const { status } = useAuth()
  
  return (
    <Routes>
      {
        (status === 'authenticated') ?
        (
          <>
            <Route path="/" element={ <GalleryPage />} />
            <Route path='/*' element={<Navigate to="/" />} />
          </>

        ) :
        (
          <>
            <Route path="/login" element={<LoginPage /> } />
            <Route path="/register" element={<RegisterPage /> } />
            <Route path='/*' element={<Navigate to="/login" />} />
          </>
        )
      
      }
    </Routes>
  );
}

export default Router;
