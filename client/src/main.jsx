import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import  Theme from "./components/Theme.jsx"
import { store,persistor } from './redux/store.js'

import 'react-toastify/dist/ReactToastify.css';
import {Toaster} from "react-hot-toast"
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
    
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Theme>  
        <App></App>
        <Toaster/>
      </Theme>
   </Provider>
  </PersistGate>
  
)
