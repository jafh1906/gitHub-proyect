// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './supabase/client';

createRoot(document.getElementById('root')).render(
  <SessionContextProvider supabaseClient={supabase}>
    <App />
  </SessionContextProvider>,
)
