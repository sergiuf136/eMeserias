import React, {useState} from 'react';
import fire from './fire';

const OffersFeed = (user) => {
    const [pr, setPr] = useState([]);
    const objs = [];


    if (user && fire.auth().currentUser) {
        const userId = fire.auth().currentUser.uid;
        console.log(userId);
        fire.database().ref('/users/' + userId + '/incomingOffers').once('value', snap => {
            let p = [];
            snap.forEach(child => {
                p.push(child.val());
            });
            if(pr.length === 0)
                setPr(p);
            
        }).then(() =>{
            console.log(pr);

        })
    }

    for (let i = 0; i < pr.length; i++) {
        for (const offer of Object.values(pr[i])) {
            console.log(offer.title);
            objs.push(
                <div className="feedContainer" key={i}>
                    <label>
                        {offer.title}
                    </label>
                    <label className="price">
                        Preț: {offer.price}
                    </label>
                    <label className="meta">
                    {offer.description}<br/><br/>
                    Primit de la: <text id="author">{offer.name}</text> <br/>la data de: {offer.posttime}.
                    </label>
                    <label id="phone">contact: {offer.telno}</label>
                    
                </div>
            );
            //<button onClick={() => {editButton(i)}} > Editează Anunț </button>
        }
    }

    console.log(objs);


    return (

        <>
            <div className="feed">
                Vezi ofertele primite:
            {objs}
            </div>
        </>
    )

}

export default OffersFeed;