import React from 'react';
import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import "./App.css";
import {OnlineStatusProvider} from "./contexts/OnlineStatusContext.jsx";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <OnlineStatusProvider>
                <App />
            </OnlineStatusProvider>
        </BrowserRouter>
    </React.StrictMode>
)


// main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// // import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { OnlineStatusProvider } from "./context/OnlineStatusContext";
//
// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <OnlineStatusProvider>
//                 <App />
//             </OnlineStatusProvider>
//         </BrowserRouter>
//     </React.StrictMode>
// );
