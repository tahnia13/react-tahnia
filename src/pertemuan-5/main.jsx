import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './pages/Dashboard';
// Import semua CSS dari folder assets
import './assets/tailwind.css';
import './assets/fonts.css';
import './assets/sidebar.css';
import './assets/header.css';
import './assets/pageheader.css';
import './assets/dashboard.css';
import './assets/darkmode.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Dashboard />
    </React.StrictMode>
);