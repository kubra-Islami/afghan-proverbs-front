import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavbarSection from "./components/NavbarSection.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddProverb from "./pages/AddProverb.jsx";
import ViewProverb from "./pages/ViewProverb.jsx";
import Footer from "./pages/Footer.jsx";
import OfflineBanner from "./components/OfflineBanner";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarSection />
            {!isOnline && <OfflineBanner />}

            <div className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Home isOnline={isOnline} />} />
                    <Route
                        path="/add-proverb"
                        element={
                            <ProtectedRoute isOnline={isOnline}>
                                <AddProverb />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/view-proverb/:id" element={<ViewProverb />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
}

export default App;
