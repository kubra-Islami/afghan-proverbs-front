import React from "react";
import {Routes, Route} from "react-router-dom";
import {useOnlineStatus} from "./contexts/OnlineStatusContext";
import NavbarSection from "./components/NavbarSection";
import OfflineBanner from "./components/OfflineBanner";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import AddProverb from "./pages/AddProverb";
import ViewProverb from "./pages/ViewProverb";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const isOnline = useOnlineStatus();

    if (!isOnline) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <NavbarSection/>
                <div className="flex-grow-1">
                    <OfflineBanner/>
                </div>
                <Footer/>
            </div>

        );
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarSection/>
            <div className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route
                        path="/add-proverb"
                        element={
                            <ProtectedRoute>
                                <AddProverb/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/view-proverb/:id" element={<ViewProverb/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}


export default App;
