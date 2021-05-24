import React, {useState} from 'react';
import fire from './fire.js';

const Hero = ({ handleLogout, showAuth, setShowAuth, user }) => {
    const [props, setProps] = useState('');
    //const [name, setName] = useState('');

    if (user === '')
        return (
            <section className="hero">
                <nav>
                    <h2><img src="icon2.png" alt="eMeserias Logo" width="30" height="30" />eMeseriaș</h2>
                    <p id="signUp" onClick={() => setShowAuth(!showAuth)}> Sign Up / Sign in </p>
                </nav>

            </section>
        )
    else {
        const userId = fire.auth().currentUser.uid;
        fire.database().ref('/users/' + userId).once('value', snap => {
            let p = [];
            snap.forEach(child => {
                if(child.key !== "incomingOffers" && 
                    child.key !== "pendingOffers")
                    p.push(child.val());
            });
            //console.log(p);
            if(!props){
                setProps(p);
            };
        });

        function refreshPage () {
            setTimeout(function () {
                window.location.reload(true);
                }, 0);
        }

        return (
            <section className="hero">
                <nav>
                    <div className="homepage" onClick={refreshPage}>
                        <img src="icon2.png" alt="eMeserias Logo" width="30" height="30"/>
                        <h2>eMeseriaș</h2>
                    </div>
                    <h2>Salut, {props[1]} {props[2]}</h2>

                    <button onClick={handleLogout}>Logout</button>
                </nav>

            </section>
        )

    }


}

export default Hero;