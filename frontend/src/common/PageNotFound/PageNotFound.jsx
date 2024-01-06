import React from 'react';
import './PageNotFound.css'; 
const PageNotFound = () => {
    return (
        <div className="error-container" style={{marginTop:"5rem"}}>
            <h1 className="error-code">404</h1>
            <p className="error-message">Oops! Page not found.</p>
            <p className="back-home-link">
                <a href="/Products">Go back to the homepage</a>
            </p>
        </div>
    );
};

export default PageNotFound;
