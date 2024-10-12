import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {CssBaseline} from '@mui/material'
import {HelmetProvider} from 'react-helmet-async'
import { store } from './Redux/store.js'
import { Provider } from 'react-redux'
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <CssBaseline/>
      <div onContextMenu={(e)=>e.preventDefault}>
        <Provider store= {store}>
      <App />
        </Provider>

      </div>

    </HelmetProvider>
  </React.StrictMode>,
)
