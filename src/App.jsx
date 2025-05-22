import React from "react";
import NavbarSection from "./components/NavbarSection.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddProverb from "./pages/AddProverb.jsx";
import ViewProverb from "./pages/ViewProverb.jsx";
import {Route, Routes} from "react-router-dom";
import Footer from "./pages/Footer.jsx";

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarSection />

            <div className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-proverb" element={<AddProverb />} />
                    <Route path="/view-proverb/:id" element={<ViewProverb />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
}

export default App;
