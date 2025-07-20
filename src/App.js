import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar.js';
import IntroductionSection from './components/IntroductionSection';
import ProductSection from './components/ProductSection';
import Inventario from './components/Inventario';
import Novedades from './components/Novedades';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ui/ErrorBoundary';
import './App.css';

// Componente de rutas con animaciones
const AppRoutes = () => {
    const { darkMode, loading, error, retryFetch } = useAppContext();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner size="large" darkMode={darkMode} />;
    }

    if (error) {
        return (
            <div className={`error-container ${darkMode ? 'dark' : 'light'}`}>
                <div className="error-content">
                    <div className="error-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <h2>Error al cargar los productos</h2>
                    <p>{error}</p>
                    <div className="error-actions">
                        <button 
                            onClick={retryFetch}
                            className="btn-retry"
                            aria-label="Reintentar carga"
                        >
                            <i className="fas fa-redo"></i>
                            Reintentar
                        </button>
                        <button 
                            onClick={() => window.location.reload()}
                            className="btn-reload"
                            aria-label="Recargar página"
                        >
                            <i className="fas fa-sync-alt"></i>
                            Recargar Página
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <IntroductionSection />
                            <ProductSection />
                        </motion.div>
                    }
                />
                <Route
                    path="/inventario"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Inventario />
                        </motion.div>
                    }
                />
                <Route
                    path="/novedades"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Novedades />
                        </motion.div>
                    }
                />
                <Route
                    path="/contacto"
                    element={
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Contacto />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

// Componente principal de la aplicación
const AppContent = () => {
    const { darkMode, toggleDarkMode } = useAppContext();

    return (
        <div className={`App ${darkMode ? 'dark' : 'light'}`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main className="main-content">
                <ErrorBoundary>
                    <AppRoutes />
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    );
};

// Wrapper principal con el provider
function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

export default App;
