import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './middleware/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />

            {/* Rotas protegidas */}
            <Route path="/" element={<ProtectedRoute />}>
              {/* <Route index element={<HomePage />} /> */}
              {/* outras rotas protegidas podem vir aqui */}
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
