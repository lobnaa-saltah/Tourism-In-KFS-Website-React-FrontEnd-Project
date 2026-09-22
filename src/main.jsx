import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-navy flex items-center justify-center text-gold font-bold">Loading Kafr El Sheikh Portal...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
)




