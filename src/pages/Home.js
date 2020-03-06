import React from 'react';
import { Link } from "react-router-dom";

import '../css/home.css';

function Home() {
    return (
        <main className="custom-container custom-container__bg-dark custom-container__flex-box">
            <div className="avatar">
                <div className="text--hover">
                    <Link className="text-item--hover" to={'/blog'}>My Blog</Link>
                </div>
            </div>
            <div className="text">
                I'm Duy Nguyen
            <br />
                <small className="text-description">developer</small>
            </div>
        </main>
    );
}

export default Home;
