import React from "react";
import {Link} from "react-router-dom";


const NotFound = ()=>{
    return (
        <>
            <section className="hero-section ptb-100 gradient-overlay full-screen"
                     style={{background: "url(./img/page-not-found.webp) no-repeat center center / cover" }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-9 col-lg-7">
                            <div className="error-content text-center text-white">
                                <div className="notfound-404"><h1 className="text-white">404</h1></div>
                                <h2 className="text-white">Sorry, something went wrong</h2>
                                <Link className="btn outline-white-btn" to="/">Go to Homepage</Link></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NotFound;




