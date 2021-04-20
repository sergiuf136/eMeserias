import React from 'react';

const Hero = ({handleLogout}) => {

    return(
        <section className="hero">
            <nav>
                
                <h2><img src="icon2.png" alt="eMeserias Logo" width="30" height="30"/>eMeseriaș</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            
        </section>
    )
}

export default Hero;